import express from 'express';

import * as listUsecase from './usecases/list.js';
import * as addUsecase from './usecases/add.js';
import * as updateUsecase from './usecases/update.js';
import * as detailUsecase from './usecases/detail.js';

export const list = (req, res, next) => {
    listUsecase.list(req.body, req.headers).then((data) => res.send(data)).catch((err) => next(err))
}

export const add = (req, res, next) => {
    addUsecase.add(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const updateRequest = (req, res, next) => {
    updateUsecase.updateRequest(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const update = (req, res, next) => {
    updateUsecase.update(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const deleteFutsal = (req, res, next) => {
    updateUsecase.deleteFutsal(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const webFutsalList = (req, res, next) => {
    listUsecase.webFutsalList(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const webFutsalListAll = (req, res, next) => {
    listUsecase.webFutsalListAll(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const webFutsalDetail = (req, res, next) => {
    detailUsecase.webFutsalDetail(req.params.id).then((data) => res.send(data)).catch((err) => next(err))
}

export const webFutsalBooking = (req, res, next) => {
    addUsecase.webFutsalBooking(req.body).then((data) => res.send(data)).catch((err) => next(err))
}
export const webBookingFutsalList = (req, res, next) => {
    listUsecase.webBookingFutsalList(req.params.id, req.params.day).then((data) => res.send(data)).catch((err) => next(err))
}

export const updateBookingDetails = (req, res, next) => {
    updateUsecase.updateBookingDetails(req.body, req.params.id).then((data) => res.send(data)).catch((err) => next(err))
}

export const bookingReleaseList = (req, res, next) => {
    listUsecase.bookingReleaseList(req.body, req.headers).then((data) => res.send(data)).catch((err) => next(err))
}

export const bookingRelease = (req, res, next) => {
    updateUsecase.bookingRelease(req.params.id).then((data) => res.send(data)).catch((err) => next(err))
}

export const webFutsalRate = (req, res, next) => {
    addUsecase.webFutsalRate(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const futsalRateCount = (req, res, next) => {
    listUsecase.futsalRateCount(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const cancelBooking = (req, res, next) => {
    updateUsecase.cancelBooking(req.body, res).then((data) => res.send(data)).catch((err) => next(err))
}

export const showBooking = (req, res, next) => {
    listUsecase.showBooking(req.params.id, res).then((data) => res.send(data)).catch((err) => next(err))
}