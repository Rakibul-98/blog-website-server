import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { UserModel } from '../modules/user/user.models';



const auth = (...requiredRoles : string []) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers.authorization;

        // check the token sent or not
        if (!accessToken) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        // validate the token
        const decoded: any = jwt.verify(accessToken, config.jwt_access_secret as string);

        // get logged in user
        const loggedinUser = await UserModel.findOne({ email: decoded.user });
        if (!loggedinUser) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'User not found!');
        }

        // differentiated and secured roles
        if (requiredRoles && !requiredRoles.includes(decoded.role)) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'Unauthorized access!',
            );
          }

        req.user = loggedinUser;
        next();
    });
};

export default auth;