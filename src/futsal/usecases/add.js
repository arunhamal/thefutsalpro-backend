import express from "express";

import { futsalModel } from '../futsal.model.js';
import { futsalBookedModel } from "../futsal.booking.modal.js";
import { futsalRateModel } from "../futsal.rate.model.js";
import { userModel } from "../../auths/auth.model.js";

export const add = async (payload, res, next) => {
  try {
    const {
        name,
        address,
        start_time,
        description,
        time_rate,
        email,
        futsal_map,
        futsal_img
      } = payload;
      const searchFutsal = await userModel.find().where({name: name});
      await futsalModel({
        name: name,
        address: address,
        start_time: start_time,
        description: description,
        time_rate: time_rate,
        email: email,
        futsal_id: searchFutsal?.[0]?._id,
        futsal_map: futsal_map,
        futsal_img: futsal_img
      }).save(async (err, db) => {
        console.log("🚀 ~ add ~ searchFutsal:", searchFutsal)
        time_rate?.map( async (item) => {
          await futsalBookedModel({
            futsal_id: searchFutsal?.[0]?._id,
            timing: item?.timing,
            rate: item?.rate,
            // day: item?.day,
            status: 'Available'
          }).save((err, db) => {
            console.log("🚀 ~ time_rate?.map ~ db:", db)
            if (err) {
              console.log("error",err.message)
            }
          });
        })
        if (err) {
          console.log("error",err.message)
        }
      });

      return { message: "Futsal added successfully" };
  } catch (error) {
    throw error;
  }
};

export const webFutsalBooking = async (payload, res, next) => {
  try {
    const {
      user_id,
      name,
      address,
      email,
      phone_no,
      timing,
      futsal_id,
      status,
      rate
      } = payload;

      await futsalBookedModel({
        user_id: user_id,
        name: name,
        address: address,
        email: email,
        phone_no: phone_no,
        timing: timing,
        futsal_id: futsal_id,
        status: status,
        rate: rate
      }).save((err, db) => {
        if (err) {
          console.log("error",err.message)
        }
      });
      return { message: "Futsal booked successfully" };
  } catch (error) {
    throw error;
  }
};

export const webFutsalRate = async (payload, res, next) => {
  try {
      await futsalRateModel({...payload}).save((err, db) => {
        if (err) {
          console.log("error",err.message)
        }
      });
      return { message: "Futsal Rated successfully" };
  } catch (error) {
    throw error;
  }
};