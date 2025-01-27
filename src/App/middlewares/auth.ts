import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';


const auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.headers.authorization;

        // check the token sent or not
        if (!accessToken) {
            throw new Error('Unauthorized Access!');
        }

        // validate the token
        jwt.verify(accessToken, config.jwt_access_secret as string, function (err, decoded) {
            if (err) {
                throw new Error('Unauthorized Access!');
            }
            req.user = decoded as JwtPayload;
            next();
        });
    });
};

export default auth;