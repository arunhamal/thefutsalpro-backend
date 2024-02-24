import express from 'express';

import * as challengesController from './challenges.controller.js';

const router = express.Router();
router.route('/').post(challengesController.add)
router.route('/:id/list').get(challengesController.list)
router.route('/accept').post(challengesController.accept)
router.route('/:id/count').get(challengesController.count)


export default router;