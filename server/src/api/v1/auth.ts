import * as express from 'express';
import EmailAlreadyVerifiedException from '../../exception/auth/EmailAlreadyVerifiedException';
import { TokenExpiredError } from 'jsonwebtoken';
import AuthService from '../../service/AuthService';
import HttpException from '../../exception/common/HttpException';
import asyncRouter from '../../middleware/async-router';
import * as svgCaptcha from 'svg-captcha';
import { ValidationError } from 'sequelize';

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
  '/signup',
  asyncRouter(async (req, res) => {
    const { email, password, nickname } = req.body;
    try {
      const account = await AuthService.signUp(email, password, nickname);
      const authBag = await AuthService.login(account.email, password);
      res.json({
        auth: authBag,
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new HttpException(409, '이미 존재하는 이메일입니다.');
      }
      throw e;
    }
  }),
);

router.post(
  '/email-verification',
  asyncRouter(async (req, res) => {
    const { verifyToken } = req.body;
    if (!verifyToken) {
      throw new HttpException(400, '잘못된 요청입니다.');
    }
    try {
      const verified = await AuthService.verifyEmail(verifyToken);
      res.json({ verified });
    } catch (e) {
      if (e instanceof EmailAlreadyVerifiedException) {
        throw new HttpException(409, '이미 인증되었습니다.');
      } else if (e instanceof TokenExpiredError) {
        throw new HttpException(401, '만료된 토큰입니다.');
      }
      throw new HttpException(400, '잘못된 요청입니다.');
    }
  }),
);

export default router;
