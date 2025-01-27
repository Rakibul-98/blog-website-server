import { userServices } from './user.service';
import catchAsync from "../../utils/catchAsync";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req, res) => {
    const { user } = req.body;


    const result = await userServices.createUserIntoDB(user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created succesfully',
        data: result,
    });
});

export const userControllers = {
    createStudent,
}