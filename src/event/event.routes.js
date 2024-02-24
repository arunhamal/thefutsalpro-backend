import express from 'express';

import * as eventController from './event.controller.js';

const router = express.Router();

router.route('/').post(eventController.add)
router.route('/list').post(eventController.list)
router.route('/update-request').post(eventController.updateRequest)
router.route('/update').post(eventController.update)
router.route('/register/list').post(eventController.registerList)
router.route('/register/:id').get(eventController.registerDetail)


router.route('/web/list').post(eventController.webList)
router.route('/web/register').post(eventController.webRegister)


export default router;