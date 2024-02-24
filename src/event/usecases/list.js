import express from "express";
import moment from "moment";
import jwt from "jsonwebtoken";

import { eventModel } from "../event.model.js";
import { eventRegisterModel } from "../event.register.model.js";
import { userModel } from "../../auths/auth.model.js";

export const list = async (req, headers, next) => {
    try {
      const token = headers?.authorization?.split(" ")?.[1];
      const userInfo = jwt.verify(token, "ECOMMERCE_TEST");
      const [{ super_admin, _id }] = await userModel.find({
        _id: userInfo?.id,
      });
      if (super_admin) {
        const res = await eventModel.find();
        return {res}
      }
      if (!super_admin) {
        const res = await eventModel.find({futsal_id: _id});
        return {res}
      }
    } catch (error) {
      throw error;
    }
  };

  export const registerList = async (req, headers, next) => {
    try {
      const token = headers?.authorization?.split(" ")?.[1];
      const userInfo = jwt.verify(token, "ECOMMERCE_TEST");
      const [{ super_admin, _id }] = await userModel.find({
        _id: userInfo?.id,
      });
      if (super_admin) {
        const res = await eventRegisterModel.find();
        return {res}
      }
      if (!super_admin) {
        const res = await eventRegisterModel.find({futsal_id: _id});
        return {res}
      }
    } catch (error) {
      throw error;
    }
  };

  export const registerDetail = async (req, res, next) => {
    try {
      const res = await eventRegisterModel.find({_id: req});
      return {res}
    } catch (error) {
      throw error;
    }
  };

  export const webList = async (req, headers, next) => {
    try {
      const res = await eventModel.find({end_date: { $gt: moment().format('YYYY-MM-DD') }});
      return {res}
    } catch (error) {
      throw error;
    }
  };