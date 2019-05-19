import * as express from 'express';
import asyncRouter from '../../middleware/async-router';
import AccountService from '../../service/AccountService';

const router = express.Router();

router.get(
  '/me',
  asyncRouter(async (req, res) => {
    const accountId = req.accountId || 0;
    const account = await AccountService.findAccountById(accountId);
    res.json(account);
  }),
);


export default router;
