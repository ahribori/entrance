import * as express from 'express';
import EmailAlreadyVerifiedException from '../../exception/auth/EmailAlreadyVerifiedException';
import { TokenExpiredError } from 'jsonwebtoken';
import AuthService from '../../service/AuthService';
import HttpException from '../../exception/common/HttpException';
import asyncRouter from '../../middleware/async-router';

const router = express.Router();

const authService = AuthService.getInstance();

router.get(
  '/',
  asyncRouter(async (req, res) => {
    return res.json('hello, world!');
  }),
);

router.post(
  '/email-verification',
  asyncRouter(async (req, res, next) => {
    const { verifyToken } = req.body;
    if (!verifyToken) {
      return next(new HttpException(400, '잘못된 요청입니다.'));
    }
    try {
      const verified = await authService.verifyEmail(verifyToken);
      res.json({ verified });
    } catch (e) {
      if (e instanceof EmailAlreadyVerifiedException) {
        return next(new HttpException(409, '이미 인증되었습니다.'));
      } else if (e instanceof TokenExpiredError) {
        return next(new HttpException(401, '만료된 토큰입니다.'));
      }
      return next(new HttpException(400, '잘못된 요청입니다.'));
    }
  }),
);

export default router;
