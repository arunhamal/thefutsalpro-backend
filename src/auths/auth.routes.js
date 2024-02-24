import express from 'express';

import * as authController from './auth.controller.js';

const router = express.Router();

router.route('/login').post(authController.login)
router.route('/signup').post(authController.signup)
router.route('/contact').post(authController.contactUs)
router.route('/verify/:id').get(authController.verify)
router.route('/web/:id/update').post(authController.update)
router.route('/web/forget-password').post(authController.forgetPassword)
router.route('/web/update-password').post(authController.updatePassword)
router.route('/web/send-sms').post(authController.sendSMS)

router.route('/web/profile').post(authController.profile)

export default router;