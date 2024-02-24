import express from 'express';

import * as loginUsecase from './usecases/login.js';
import * as signupUsecase from './usecases/signup.js';


export const login = (req, res, next) => {
    loginUsecase.loginUser(req.body, res).then((data) => res.status(200).json(data)).catch((err) => next(err))
}

export const signup = (req, res, next) => {
    signupUsecase.addUser(req.body, res).then((data) => res.status(200).json(data)).catch((err) => next(err))
}

export const update = (req, res, next) => {
    signupUsecase.update(req.body, req.params.id).then((data) => res.status(200).json(data)).catch((err) => next(err))
}

export const verify = (req, res, next) => {
    loginUsecase.verify(req.params.id, res).then((data) => res.status(200).json(data)).catch((err) => next(err))
}

export const contactUs = (req, res, next) => {
    signupUsecase.contactUs(req.body, res).then((data) => res.status(200).json(data)).catch((err) => next(err))
}

export const profile = (req, res, next) => {
    loginUsecase.profile(req.body, res).then((data) => res.status(200).json(data)).catch((err) => next(err))
}

export const forgetPassword = (req, res, next) => {
    signupUsecase.forgetPassword(req.body, res).then((data) => res.status(200).json(data)).catch((err) => next(err))
}

export const updatePassword = (req, res, next) => {
    signupUsecase.updatePassword(req.body, res).then((data) => res.status(200).json(data)).catch((err) => next(err))
}
export const sendSMS = (req, res, next) => {
    signupUsecase.sendSMS(req.body, res).then((data) => res.status(200).json(data)).catch((err) => next(err))
}