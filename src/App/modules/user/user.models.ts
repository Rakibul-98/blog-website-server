import { model, Schema } from 'mongoose';
import { TUser, User } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';


const userSchema = new Schema<TUser, User>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [30, 'Must less than 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,

    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
    },
);


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

userSchema.pre('find', async function (next) {
    this.select('-password');
    next();
});

userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await this.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TUser, User>('User', userSchema);