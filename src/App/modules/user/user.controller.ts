import { userServices } from './user.service';
import catchAsync from "../../utils/catchAsync";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
    const  userData  = req.body;
    const result = await userServices.createUserIntoDB(userData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

export const userControllers = {
    createUser,
}