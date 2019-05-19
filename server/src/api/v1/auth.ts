import * as express from 'express';
import { body, validationResult } from 'express-validator/check';
import EmailAlreadyVerifiedException from '../../exception/auth/EmailAlreadyVerifiedException';
import AccountAlreadyExistException from '../../exception/account/AccountAlreadyExistException';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import AuthService from '../../service/AuthService';
import HttpException from '../../exception/common/HttpException';
import RequestParamException from '../../exception/common/RequestParamException';
import asyncRouter from '../../middleware/async-router';
import * as svgCaptcha from 'svg-captcha';
import TokenService from '../../service/TokenService';
import AccountNotFoundException from '../../exception/account/AccountNotFoundException';
import PasswordNotMatchedException from '../../exception/auth/PasswordNotMatchedException';
import AccountService from '../../service/AccountService';

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
  [
    body('email')
      .exists()
      .withMessage('')
      .isEmail()
      .withMessage('이메일 형식이 아닙니다.'),
    body('password')
      .trim()
      .matches(/^.{6,30}$/)
      .withMessage('비밀번호는 6-30자 사이입니다.'),
  ],
  asyncRouter(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestParamException(errors);
    }

    const { email, password, nickname } = req.body;
    try {
      const account = await AuthService.signUp(email, password, nickname);
      const authBag = await AuthService.login(account.email, password);
      res.json({
        auth: authBag,
      });
    } catch (e) {
      if (e instanceof AccountAlreadyExistException) {
        throw new HttpException(409, '이미 사용중인 이메일입니다.');
      }
      throw e;
    }
  }),
);

router.post(
  '/login',
  [
    body('email')
      .exists()
      .withMessage('')
      .isEmail()
      .withMessage('이메일 형식이 아닙니다.'),
    body('password')
      .trim()
      .matches(/^.{6,30}$/)
      .withMessage('비밀번호는 6-30자 사이입니다.'),
  ],
  asyncRouter(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestParamException(errors);
    }

    const { email, password } = req.body;
    try {
      const authBag = await AuthService.login(email, password);
      res.json({
        auth: authBag,
      });
    } catch (e) {
      if (e instanceof AccountNotFoundException) {
        throw new HttpException(401, '가입된 계정이 아닙니다.');
      } else if (e instanceof PasswordNotMatchedException) {
        throw new HttpException(401, '비밀번호가 틀렸습니다.');
      }
      throw e;
    }
  }),
);

router.post(
  '/verify',
  asyncRouter(async (req, res) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      throw new HttpException(400, '엑세스 토큰이 없습니다.');
    }
    try {
      const verified = TokenService.verifyToken(accessToken);
      res.json(verified);
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new HttpException(401, '올바른 형식이 아닙니다.');
      } else if (e instanceof TokenExpiredError) {
        throw new HttpException(403, '만료된 토큰입니다.');
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


router.post(
  '/send-password-reset-code',
  asyncRouter(async (req, res) => {
    const { email } = req.body;
    const account = await AccountService.findAccountByEmail(email);
    if (!account) {
      throw new HttpException(404, '가입된 계정이 아닙니다.');
    }
    const passwordResetCode = TokenService.issuePasswordResetToken({
      accountId: account.id,
    });
    // 메일 보내기
    res.json(passwordResetCode);
  }),
);

export default router;
