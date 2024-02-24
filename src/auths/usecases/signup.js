import express from "express";
import bcrypt from "bcrypt";

import { userModel } from "../auth.model.js";
import { uuid } from "../../shared/common.js";
import Boom from "@hapi/boom";
import { futsalModel } from "../../futsal/futsal.model.js";
import { notify } from "../../shared/notify.js";
import { forgetPasswordModel } from "../forget.password.model.js";
import axios from "axios";

export const addUser = async (req, res, next) => {
  try {
    const { email, password, is_owner, name, phone_no } = req;
    const hasedPassword = await bcrypt.hash(password, 10);
    const userExsist = await userModel.find({ email: email });
    if (userExsist?.length > 0) {
      res.status(403).json({ success: false, message: "User Already Exists." });
    }
    const verificationKey = uuid();
    await userModel({
      email: email,
      password: hasedPassword,
      is_owner: is_owner,
      name: name,
      phone_no: phone_no,
      is_verified: false,
      verification_key: verificationKey,
    }).save(async (err, db) => {
      if (err) {
        console.log("error", err.message);
        res.send();
      } else {
        // if (is_owner) {
        //   await futsalModel({
        //     name: name,
        //     email: email,
        //     futsal_id: db?._id
        //   }).save()
        // }
        const params = {
          to: email,
          subject: "Verify Email For FutsalPro Registration",
          html: `<h1>Welcome and thank you for registering with TheFutsalPro! We need to Verify your email to complete the registration process. Please Click on the link below to Verify your account.</h1> <br/> <a href="http://localhost:3000/verify/${verificationKey}">Click Here</a>`,
        };
        await notify(params);
        return { message: "User Register Sucessfull" };
      }
    });
    return { message: "User Register Sucessfull" };
  } catch (error) {
    throw error;
  }
};

export const contactUs = async (req, res, next) => {
  try {
    const { name, email, message } = req;
    const params = {
      from: email,
      to: "thefutsalpro@gmail.com",
      subject: `Contact From ${email}`,
      html: `<h4>Contact From</h4> <br> 
      <strong>Name:</strong> ${name} <br> 
      <strong>Email:</strong> ${email} <br> 
      <strong>Message:</strong> ${message}`,
    };
    await notify(params);
    return { message: "Contact Registered Successfully" };
  } catch (error) {
    throw error;
  }
};

export const update = async (req, id, next) => {
  try {
    await userModel.updateOne({ _id: id }, { $set: req });
    return { message: "User updated Sucessfull" };
  } catch (error) {
    throw error;
  }
};

export const forgetPassword = async ({ email }, res, next) => {
  try {
    const userResponse = await userModel.find({ email: email });
    const verificationKey = uuid();
    if (userResponse?.length > 0 && userResponse?.[0]?.is_verified) {
      await forgetPasswordModel({
        name: userResponse?.[0]?.name,
        user_id: userResponse?.[0]?._id,
        email: userResponse?.[0]?.email,
        phone_no: userResponse?.[0]?.phone_no,
        is_owner: userResponse?.[0]?.is_owner,
        is_verified: userResponse?.[0]?.is_verified,
        verification_key: verificationKey,
        verification_status: true,
      }).save(async (err, db) => {
        if (err) {
          console.log("::::::::::::::::::", err);
        } else {
          const params = {
            to: email,
            subject: "Verify Email For Reset Password",
            html: `<h1>"Please click on the link below to reset your password."</h1> <br/> <a href="http://localhost:3000/forget-password/verify/${verificationKey}">Reset Password</a>`,
          };
          await notify(params);
        }
      });
      return {
        success: true,
        message: "Password Reset link send successfully",
      };
    } else {
      return { success: false, message: "User Not Found" };
    }
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (payload, res, next) => {
  try {
    const { verification_key, new_password } = payload;
    const hasedPassword = await bcrypt.hash(new_password, 10);
    const userResponse = await forgetPasswordModel.find({
      verification_key: verification_key,
    });
    if (!userResponse?.[0]?.verification_status) {
      res
        .status(403)
        .json({ success: false, message: "Password Already changed" });
    } else {
      await userModel.updateOne(
        { _id: userResponse?.[0]?.user_id },
        { $set: { password: hasedPassword } }
      );
      await forgetPasswordModel.updateOne(
        { _id: userResponse?.[0]?._id },
        { $set: { verification_status: false } }
      );
      return { success: true, message: "Password reset successfull" };
    }
  } catch (error) {
    throw error;
  }
};

export const sendSMS = async ({payload}, res, next) => {
  try {
    await axios.post("https://api.sparrowsms.com/v2/sms", {...payload})
    return {success: true, message: 'SMS Send Successfully'}
  } catch (error) {
    throw error;
  }
};
