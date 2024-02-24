import express from "express";
import jwt from "jsonwebtoken";

import { eventRegisterModel } from "../event.register.model.js";
import { eventModel } from "../event.model.js";

export const add = async (req, headers, next) => {
  console.log("🚀 ~ add ~ req:", req)
  try {
    const {
        event_name,
        futsal_name,
        start_date,
        end_date,
        description,
        file
    } = req;
    const token = headers?.authorization?.split(" ")?.[1];
    const userInfo = jwt.verify(token, "ECOMMERCE_TEST");
    await eventModel({
        event_name: event_name,
        futsal_name: futsal_name,
        futsal_id: userInfo?.id,
        start_date: start_date,
        end_date: end_date,
        event_img: file,
        description: description
    }).save(async(err, db) => {
      if (err) {
        console.log("error",err.message)
      } else {
        return { message: "Event added sucessfully" };
      }
    });
  } catch (error) {
    throw error;
  }
};

export const webRegister = async (req, res, next) => {
  try {
    const checkDuplicate = await eventRegisterModel.find({user_id: req?.user_id, event_id: req?.event_id})
    if (checkDuplicate?.length > 0) {
      res.status(403).json({ success: false, message: 'You Already Registered for this event' })
    } else {
      await eventRegisterModel({...req}).save(async(err, db) => {
        if (err) {
          console.log("error",err.message)
        }
      });
      return { message: "Event Registered sucessfully" }
    }

  } catch (error) {
    throw error;
  }
};