import express from "express";

import { challengesModel } from '../challenges.model.js';

export const list = async (id, res, next) => {
    try {
      const res = await challengesModel.find().where({to: id, is_accepted: false});
      return {res}
    } catch (error) {
      throw error;
    }
  };

export const count = async (id, res, next) => {
  try {
    const res = await challengesModel.countDocuments().where({to: id, is_accepted: false});
    return {res}
  } catch (error) {
    throw error;
  }
};
