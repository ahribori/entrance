import * as express from 'express';
import EmailAlreadyVerifiedException from '../../exception/auth/EmailAlreadyVerifiedException';
import { TokenExpiredError } from 'jsonwebtoken';
import AuthService from '../../service/AuthService';
import HttpException from '../../exception/common/HttpException';
import asyncRouter from '../../middleware/async-router';
import * as svgCaptcha from 'svg-captcha';

const router = express.Router();

router.get(
  '/',
  asyncRouter(async (req, res) => {
    return res.json('hello, world!');
  }),
);

router.get(
  '/captcha',
  asyncRouter(async (req, res) => {
    const captcha = svgCaptcha.create({ noise: 2, ignoreChars: '0o1iljJ' });
    res.json(captcha);
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
      const verified = await AuthService.verifyEmail(verifyToken);
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
