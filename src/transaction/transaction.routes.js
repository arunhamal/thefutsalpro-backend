import express from 'express';

import * as transactionController from './transaction.controller.js';

const router = express.Router();

router.route('/').post(transactionController.create)


export default router;