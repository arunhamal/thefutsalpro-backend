import express from 'express';

import * as futsalController from './futsal.controller.js';

const router = express.Router();

router.route('/').post(futsalController.list)
router.route('/add').post(futsalController.add)
router.route('/update-request').post(futsalController.updateRequest)
router.route('/update').post(futsalController.update)
router.route('/delete').post(futsalController.deleteFutsal)
router.route('/booking/release/list').post(futsalController.bookingReleaseList)
router.route('/booking/release/:id').post(futsalController.bookingRelease)

router.route('/web/list/home').post(futsalController.webFutsalList)
router.route('/web/list/all').post(futsalController.webFutsalListAll)
router.route('/web/:id').get(futsalController.webFutsalDetail)
router.route('/web/futsal/booking').post(futsalController.webFutsalBooking)
router.route('/web/futsal/booking/:id/:day').get(futsalController.webBookingFutsalList)
router.route('/web/futsal/booking/:id').post(futsalController.updateBookingDetails)
router.route('/web/futsal/show/booking/:id').post(futsalController.showBooking)
router.route('/web/futsal/cancel/booking').post(futsalController.cancelBooking)

router.route('/web/futsal/rate').post(futsalController.webFutsalRate)
router.route('/web/futsal/rate/count').post(futsalController.futsalRateCount)

export default router;