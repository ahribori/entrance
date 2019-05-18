import * as express from 'express';
import authRouter from './auth';
import accountRouter from './account';
import authMiddleware from '../../middleware/auth-middleware';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/account', authMiddleware, accountRouter);

export default router;
