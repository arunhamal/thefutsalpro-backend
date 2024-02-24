import express from 'express';

import * as addUsecase from './usecases/add.js';
import * as listUsecase from './usecases/list.js';
import * as updateUsecase from './usecases/update.js';

export const add = (req, res, next) => {
    addUsecase.add(req.body, req.headers).then((data) => res.send(data)).catch((err) => next(err))
}

export const list = (req, res, next) => {
    listUsecase.list(req.body, req.headers).then((data) => res.send(data)).catch((err) => next(err))
}

export const updateRequest = (req, res, next) => {
    updateUsecase.updateRequest(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const update = (req, res, next) => {
    updateUsecase.update(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const registerList = (req, res, next) => {
    listUsecase.registerList(req.body, req.headers).then((data) => res.send(data)).catch((err) => next(err))
}

export const registerDetail = (req, res, next) => {
    listUsecase.registerDetail(req.params.id).then((data) => res.send(data)).catch((err) => next(err))
}

export const webList = (req, res, next) => {
    listUsecase.webList(req.body, req.headers).then((data) => res.send(data)).catch((err) => next(err))
}

export const webRegister = (req, res, next) => {
    addUsecase.webRegister(req.body, res).then((data) => res.send(data)).catch((err) => next(err))
}