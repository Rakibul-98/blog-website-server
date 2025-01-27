import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    isBlocked: boolean;
    isDeleted: boolean;
}

export interface User extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}