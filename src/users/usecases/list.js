import express from "express";
import jwt from "jsonwebtoken";

import { userModel } from "../../auths/auth.model.js";

export const list = async (id, headers, next) => {
  try {
    if (headers?.authorization) {
      const token = headers?.authorization?.split(" ")?.[1];
      const userInfo = jwt.verify(token, "ECOMMERCE_TEST");
      const res = await userModel.find({
        is_owner: false,
        _id: { $ne: userInfo?.id },
      });
      return { res };
    }

    if (!headers?.authorization) {
      const res = await userModel.find().where({ is_owner: false });
      return { res };
    }
  } catch (error) {
    throw error;
  }
};

export const userList = async (id, headers, next) => {
  try {
    const res = await userModel.find({ super_admin: { $ne: true } });
    return { res };
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id, headers, next) => {
  try {
    const res = await userModel.deleteOne({ _id: id });
    return { res, message: 'User Deleted Successfully', success: true };
  } catch (error) {
    throw error;
  }
};
