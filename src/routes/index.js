import express from 'express';

import auths from '../auths/auth.routes.js';
import futsal from '../futsal/futsal.routes.js';
import users from '../users/users.routes.js';
import challenge from '../challenges/challenges.routes.js';
import event from '../event/event.routes.js';
import transaction from '../transaction/transaction.routes.js';

const router = express.Router();
router.use('/auths', auths)
router.use('/futsal', futsal)
router.use('/web/user', users)
router.use('/challenge', challenge)
router.use('/event', event)
router.use('/transaction', transaction)


export default router;