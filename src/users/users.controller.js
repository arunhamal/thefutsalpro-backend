import express from 'express';

import * as listUsecase from './usecases/list.js';

export const list = (req, res, next) => {
    listUsecase.list(req.body, req.headers).then((data) => res.send(data)).catch((err) => next(err))
}

export const userList = (req, res, next) => {
    listUsecase.userList(req.body, req.headers).then((data) => res.send(data)).catch((err) => next(err))
}

export const deleteUser = (req, res, next) => {
    listUsecase.deleteUser(req.params.id, req.headers).then((data) => res.send(data)).catch((err) => next(err))
}