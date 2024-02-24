import express from "express";

import { futsalModel } from '../futsal.model.js';
import { futsalBookedModel } from "../futsal.booking.modal.js";

export const webFutsalDetail = async (id, res, next) => {
  try {
    let res = await futsalModel.find().where({_id: id});
    return {res};
  } catch (error) {
    throw error;
  }
};
