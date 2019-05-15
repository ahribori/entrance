import { NextFunction, Request, Response } from 'express';
import HttpException from '../exception/common/HttpException';
import RequestParamException from '../exception/common/RequestParamException';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpException) {
    if (err.status === 500) {
      return res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
    return res.status(err.status).json(err);
  } else if (err instanceof RequestParamException) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      validationErrors: err.validationErrors,
    });
  }
  return res.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
};
