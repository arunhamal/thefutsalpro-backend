import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userModel } from "../auth.model.js";
import { challengesModel } from "../../challenges/challenges.model.js";

export const loginUser = async (payload, res, next) => {
  try {
    const { email, password } = payload;
    const SECRET_KEY = "ECOMMERCE_TEST";
    let response = await userModel.find().where({ email: email });
    let checkChallenged = await challengesModel
      .find()
      .where({ to: response?.[0]?._id });
    if (!response[0]) {
      res.status(403).json({ success: false, message: "User Not Found." });
    } else {
      if (!response?.[0]?.is_verified) {
        res.status(403).json({ success: false, message: "Please verify your email." });
      }
      const checkPassword = await bcrypt.compare(
        password,
        response[0]?.password
      );
      if (checkPassword) {
        const token = jwt.sign(
          {
            email: response[0]?.email,
            id: response[0]?.id,
            is_owner: response[0]?.is_owner,
          },
          SECRET_KEY
        );
        delete response[0]?.password;
        response[0].token = token;
        checkChallenged.length > 0 &&
          (response[0].challenge = `You have ${checkChallenged.length} new challenges`);
        return { ...response[0], token, message: "User loggedin sucessfull" };
      } else {
        res.status(403).json({ success: false, message: "Invalid Credential" });
      }
    }
  } catch (error) {
    throw error;
  }
};

export const verify = async (id, res, next) => {
  try {
    const payload = {
      is_verified: true
    }
    await userModel.updateOne({ verification_key: id }, { $set: payload });
    return {message: 'Your email has been verified'}
  } catch (error) {
    throw error;
  }
};

export const profile = async (payload, res, next) => {
  try {
    const { id } = payload;
    let [{email, name, phone_no}] = await userModel.find().where({ _id: id });

    return { data: {email, name, phone_no} };
  } catch (error) {
    throw error;
  }
};
