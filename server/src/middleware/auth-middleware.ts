import { Request, Response, NextFunction } from 'express';
import HttpException from '../exception/common/HttpException';
import TokenService from '../service/TokenService';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    throw new HttpException(401, '잘못된 토큰입니다.');
  }
  try {
    (req as any).tokenPayload = TokenService.verifyToken(accessToken);
    next();
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      throw new HttpException(401, '잘못된 토큰입니다.');
    } else if (e instanceof TokenExpiredError) {
      throw new HttpException(403, '만료된 토큰입니다.');
    }
    throw e;
  }
};

export default authMiddleware;
