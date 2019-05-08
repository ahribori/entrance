import * as express from 'express';
import * as requestIp from 'request-ip';
import v1 from './v1';

const router = express.Router();

router.use(requestIp.mw()); // Will set req.clientIp

router.use('/v1', v1);

export default router;
