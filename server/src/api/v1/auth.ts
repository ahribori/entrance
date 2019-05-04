import * as express from 'express';
import asyncRouter from '../middleware/async-router';

const router = express.Router();

router.get(
  '/',
  asyncRouter(async (req, res) => {
    return res.json('hello, world!');
  }),
);

export default router;
