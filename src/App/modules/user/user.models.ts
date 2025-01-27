import { model, Schema } from 'mongoose';
import { TUserName, TUser } from './user.interface';


const nameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [20, 'Must less than 20 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [20, 'Must less than 20 characters']
    }
})

const userSchema = new Schema<TUser>({
    name: {
        type: nameSchema,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: true
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

export const UserModel = model<TUser>('User', userSchema);