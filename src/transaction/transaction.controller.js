import express from 'express';

import * as addUsecase from './usecases/create.js';

export const create = (req, res, next) => {
    addUsecase.create(req.body, res).then((data) => res.send(data)).catch((err) => next(err))
}