import express from "express";

import { notify } from "../../shared/notify.js";
import { challengesModel } from "../challenges.model.js";
import { userModel } from "../../auths/auth.model.js";
export const add = async (req, res, next) => {
  try {
    const { from, from_name, from_email, from_phone_no, to } = req;
    await challengesModel({
      from: from,
      to: to,
      from_name: from_name,
      from_email: from_email,
      from_phone_no: from_phone_no,
      is_accepted: false,
    }).save(async (err, db) => {
      if (err) {
        console.log("error", err.message);
      } else {
        const sendTo = await userModel.find({ _id: to });
        const params = {
          from: from_email,
          to: sendTo?.[0]?.email,
          subject: `${from_name} have challenged you`,
          html: `<h4>Challenger Details</h4> <br> 
          <strong>Name:</strong> ${from_name}
          <strong>Email:</strong> ${from_email}
          <strong>Phone No:</strong> ${from_phone_no}`,
        };
        await notify(params);
        return { message: "Challenged sucessfully" };
      }
    });
    return { message: "Challenged sucessfully" };
  } catch (error) {
    throw error;
  }
};

export const accept = async (payload, res, next) => {
  const { id } = payload;
  try {
    const res = await challengesModel.find({ _id: id });
    const userInfo = await userModel.find({ _id: res?.[0]?.to });
    await challengesModel.updateOne(
      { _id: id },
      { $set: { is_accepted: true } }
    );
    if (userInfo?.length > 0) {
      const params = {
        to: res?.[0]?.from_email,
        subject: `${res?.[0]?.from_name} accepted your challenge`,
        html: `<h4>Challenge Accepted</h4> <br> 
    <strong>Name:</strong> ${userInfo?.[0]?.name}
    <strong>Email:</strong> ${userInfo?.[0]?.email}
    <strong>Phone No:</strong> ${userInfo?.[0]?.phone_no}`,
      };
      await notify(params);
      return {success: true, message: "Challenge accepted succesfully"}
    }
  } catch (error) {
    throw error;
  }
};
