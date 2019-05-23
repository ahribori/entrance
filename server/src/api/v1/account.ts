import * as express from 'express';
import asyncRouter from '../../middleware/async-router';
import AccountService from '../../service/AccountService';
import { body, validationResult } from 'express-validator/check';
import RequestParamException from '../../exception/common/RequestParamException';
import { TokenType } from '../../service/TokenService';
import HttpException from '../../exception/common/HttpException';

const router = express.Router();

router.get(
  '/me',
  asyncRouter(async (req, res) => {
    if (!req.tokenPayload) return;
    const accountId = Number(req.tokenPayload.accountId);
    const account = await AccountService.findAccountById(accountId);
    res.json(account);
  }),
);

router.post(
  '/reset-password',
  [
    body('password')
      .trim()
      .matches(/^.{6,30}$/)
      .withMessage('비밀번호는 6-30자 사이입니다.'),
  ],
  asyncRouter(async (req, res) => {
    const { tokenPayload } = req;
    if (!tokenPayload) {
      throw new Error('토큰 정보가 없습니다.');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestParamException(errors);
    }
    if (tokenPayload.sub !== TokenType.PASSWORD_RESET_TOKEN) {
      throw new HttpException(403, '패스워드 재설정 토큰이 필요합니다.');
    }
    const { password } = req.body;
    try {
      await AccountService.changePassword(
        Number(tokenPayload.accountId),
        password,
      );
      res.sendStatus(200);
    } catch (e) {
      throw new Error(e);
    }
  }),
);

export default router;
