import * as express from 'express';
import asyncRouter from '../../middleware/async-router';
import AccountService from '../../service/AccountService';

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


export default router;
