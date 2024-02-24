import express from "express";
import jwt from "jsonwebtoken";

import { futsalModel } from "../futsal.model.js";
import { futsalBookedModel } from "../futsal.booking.modal.js";
import { futsalRateModel } from "../futsal.rate.model.js";
import { futsalReservedModel } from "../futsal.reserved.model.js";
import { userModel } from "../../auths/auth.model.js";

export const list = async (id, headers, next) => {
  try {
    const token = headers?.authorization?.split(" ")?.[1];
    const userInfo = jwt.verify(token, "ECOMMERCE_TEST");
    const [{ super_admin, email }] = await userModel.find({
      _id: userInfo?.id,
    });

    if (super_admin) {
      const superAdminRes = await futsalModel.find();
      return { res: superAdminRes };
    }
    if (!super_admin) {
      const adminRes = await futsalModel.find({ email: email });
      return { res: adminRes };
    }
  } catch (error) {
    throw error;
  }
};

export const webFutsalList = async (req, res, next) => {
  try {
    const res = await futsalModel.find().limit(6);
    return { res };
  } catch (error) {
    throw error;
  }
};

export const webFutsalListAll = async (req, res, next) => {
  try {
    const res = await futsalModel.find();
    return { res };
  } catch (error) {
    throw error;
  }
};

export const webBookingFutsalList = async (id, day, next) => {
  try {
    const data = await futsalBookedModel.find({futsal_id: id})
    
    const promises = data.map(async (item) => {
      const response = await futsalReservedModel.find().where({
        futsal_id: id,
        booking_date: day,
        futsal_book_list_id: item?._id,
      });
      return {
        _id: item?._id,
        timing: item?.timing,
        __v: item?.__v,
        rate: item?.rate,
        futsal_id: item?.futsal_id,
        status: response?.length > 0 ? "Booked" : "Available",
      };
    });

    const res = await Promise.all(promises);

    return { res };
  } catch (error) {
    throw error;
  }
};

export const bookingReleaseList = async (payload, headers, next) => {
  try {
    const token = headers?.authorization?.split(" ")?.[1];
    const userInfo = jwt.verify(token, "ECOMMERCE_TEST");
    const [{ super_admin, _id }] = await userModel.find({ _id: userInfo?.id });
    if (super_admin) {
      const res = await futsalBookedModel.find().where({ status: "Booked" });
      return { res };
    }
    if (!super_admin) {
      const res = await futsalBookedModel.find().where({ status: "Booked", futsal_id: _id });
      return { res };
    }
  } catch (error) {
    throw error;
  }
};

export const futsalRateCount = async (payload, res, next) => {
  try {
    const res = await futsalRateModel.aggregate([
      {
        $match: {
          futsal_id: payload?.futsal_id,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$rate" },
          totalCount: { $sum: 1 },
          averageRate: { $avg: "$rate" },
        },
      },
    ]);
    const remarks = await futsalRateModel.find({futsal_id: payload?.futsal_id})
    return { rate: res?.[0]?.averageRate, res: remarks};
  } catch (error) {
    throw error;
  }
};

export const showBooking = async (id, res, next) => {
  try {
    const data = await futsalReservedModel.find().where({ user_id: id });
    const res = data.filter((obj, index) => {
      return (
        index ===
        data.findIndex(
          (o) =>
            obj.futsal_book_list_id === o.futsal_book_list_id &&
            obj.booking_date === o.booking_date
        )
      );
    });
    return { res };
  } catch (error) {
    throw error;
  }
};
