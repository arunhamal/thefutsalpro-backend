import express from 'express';

import * as addUsecase from './usecases/add.js';
import * as listUsecase from './usecases/list.js';

export const add = (req, res, next) => {
    addUsecase.add(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const accept = (req, res, next) => {
    addUsecase.accept(req.body).then((data) => res.send(data)).catch((err) => next(err))
}

export const list = (req, res, next) => {
    listUsecase.list(req.params.id).then((data) => res.send(data)).catch((err) => next(err))
}

export const count = (req, res, next) => {
    listUsecase.count(req.params.id).then((data) => res.send(data)).catch((err) => next(err))
}