import { NextFunction, Request, Response } from 'express';

const asyncRouter = (
  asyncFunction: (req: Request, res: Response, next: NextFunction) => {},
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await asyncFunction(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
};

export default asyncRouter;
