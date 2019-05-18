import { NextFunction, Request, Response } from 'express';

interface EnhancedRequest extends Request {
  clientIp?: string;
  accountId?: number;
}

const asyncRouter = (
  asyncFunction: (
    req: EnhancedRequest,
    res: Response,
    next: NextFunction,
  ) => {},
) => {
  return async (req: EnhancedRequest, res: Response, next: NextFunction) => {
    try {
      return await asyncFunction(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
};

export default asyncRouter;
