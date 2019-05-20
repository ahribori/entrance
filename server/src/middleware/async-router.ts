import { NextFunction, Request, Response } from 'express';
import { VerifiedPayload } from '../service/TokenService';

interface EnhancedRequest extends Request {
  clientIp?: string;
  tokenPayload?: VerifiedPayload;
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
