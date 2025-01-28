import { TUser } from "./user.interface";
import { UserModel } from "./user.models";


const createUserIntoDB = async ( user:TUser)=>{
    const newUser = await UserModel.create(user);
    return newUser;
}

const blockUserIntoDB = async (_id: string) => {
    const updatedUser = await UserModel.findByIdAndUpdate(
        { _id, isDeleted: { $ne: true } },
        { isBlocked: true },
        { new: true }
    );
    return updatedUser;
};

export const userServices = {
    createUserIntoDB,
    blockUserIntoDB
}