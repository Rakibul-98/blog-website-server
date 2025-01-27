import { TUser } from "./user.interface";
import { UserModel } from "./user.models";


const createUserIntoDB = async ( user:TUser)=>{
    const newUser = await UserModel.create(user);
    return newUser;
}

export const userServices = {
    createUserIntoDB
}