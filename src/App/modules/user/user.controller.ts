import { userServices } from './user.service';
import catchAsync from "../../utils/catchAsync";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
    const userData = req.body;
    const result = await userServices.createUserIntoDB(userData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

const blockUser = catchAsync(async (req, res) => {
    const { userId } = req.params;

    const result = await userServices.blockUserIntoDB(userId);

    if (!result) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'User not found!',
            data: {}
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User blocked successfully',
        data: {},
    })
})

export const userControllers = {
    createUser,
    blockUser,
}