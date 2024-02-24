import express from 'express';

import * as usersController from './users.controller.js';

const router = express.Router();

router.route('/').post(usersController.list)
router.route('/list').post(usersController.userList)
router.route('/delete/:id').get(usersController.deleteUser)


export default router;