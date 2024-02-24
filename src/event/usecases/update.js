import express from "express";

import { eventModel } from "../event.model.js";

export const updateRequest = async (payload, res, next) => {
  try {
    const res = await eventModel.find().where({ _id: payload?.id });
    return { res };
  } catch (error) {
    throw error;
  }
};

export const update = async (payload, res, next) => {
    try {
      await eventModel.updateOne({ _id: payload?.id }, { $set: payload });
      return { message: "Event updated successfully" };
    } catch (error) {
      throw error;
    }
  };