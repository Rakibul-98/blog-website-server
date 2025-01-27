import Jwt from 'jsonwebtoken';
import { UserModel } from "../user/user.models";
import { TLoginUser } from "./auth.interface";
import config from '../../config';


const loginUser = async (payload: TLoginUser) => {

    const existingUser = await UserModel.isUserExistsByEmail(payload.email);

    // checking if the user exists in the database
    if (!existingUser) {
        throw new Error('User not found');
    }

    // checking if the user is blocked by the admin
    const isUserBlocked = existingUser.isBlocked;
    if (isUserBlocked) {
        throw new Error('User is blocked');
    }

    // checking if the user is already deleted or not
    const isUserDeleted = existingUser.isDeleted;
    if (isUserDeleted) {
        throw new Error('User is not available');
    }

    // checking if the password matches with the stored password
    if (! await UserModel.isPasswordMatched(payload?.password, existingUser?.password)) {
        throw new Error('Invalid password');
    }

    const jwtPayload = {
        user: existingUser.email,
        role: existingUser.role
    }

    const accessToken = Jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        { expiresIn: '10d' }
    )
    return {
        accessToken
    };
}

export const authServices = {
    loginUser
}