import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import handleValidationError from '../errors/handleValidationError';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodValidationError from '../errors/handleZodValidationError';
import mongooseCastError from '../errors/mongooseCastError';
import duplicateUserError from '../errors/duplicateUserError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Sorry, Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    // errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    // errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = mongooseCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    // errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = duplicateUserError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    // errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: err?.issues,
    stack: config.node_env === 'development' ? err?.stack : null,
  });

  return undefined;
  
};

export default globalErrorHandler;