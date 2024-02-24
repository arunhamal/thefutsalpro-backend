import express from "express";

import { futsalModel } from "../futsal.model.js";
import { futsalBookedModel } from "../futsal.booking.modal.js";
import { notify } from "../../shared/notify.js";
import { userModel } from "../../auths/auth.model.js";
import { futsalReservedModel } from "../futsal.reserved.model.js";
import { futsalRateModel } from "../futsal.rate.model.js";

export const updateRequest = async (payload, res, next) => {
  try {
    const res = await futsalModel.find().where({ _id: payload?.id });
    return { res, message: "Futsal added successfully" };
  } catch (error) {
    throw error;
  }
};

export const update = async (payload, res, next) => {
  try {
    // Update futsalModel
    await futsalModel.updateOne({ _id: payload?.id }, { $set: payload });

    // Use Promise.all to wait for all promises in the map to resolve
    await Promise.all(
      payload?.time_rate?.map(async (item) => {
        // Use await with findOneAndUpdate directly
        await futsalBookedModel.findOneAndUpdate(
          { timing: item?.timing, futsal_id: payload?.id },
          { $set: item },
          { upsert: true, new: true, useFindAndModify: false }
        );
      })
    );

    return { message: "Futsal updated successfully" };
  } catch (error) {
    // Instead of rethrowing, you might want to handle the error appropriately
    console.error(error);
    throw error;
  }
};

export const deleteFutsal = async (payload, res, next) => {
  try {
    const { id, email } = payload;
    await futsalModel.deleteOne({ _id: id });
    await userModel.deleteOne({ email: email });
    await futsalBookedModel.deleteMany({ futsal_id: id });
    await futsalRateModel.deleteMany({ futsal_id: id });
    await futsalReservedModel.deleteMany({ futsal_id: id });
    return { message: "Futsal deleted successfully" };
  } catch (error) {
    // Instead of rethrowing, you might want to handle the error appropriately
    console.error(error);
    throw error;
  }
};

export const updateBookingDetails = async (payload, id, next) => {
  try {
    const {
      user_id,
      name,
      email,
      phone_no,
      timing,
      futsal_id,
      booking_date,
      futsal_book_list_id,
    } = payload;
    const checkDuplicateEntry = await futsalReservedModel.find().where({
      futsal_book_list_id: futsal_book_list_id,
      user_id: user_id,
      booking_date: booking_date,
    });
    const futsalInfo = await futsalModel.find().where({ _id: futsal_id });
    const rates = futsalInfo?.[0]?.time_rate?.filter(
      (item) => item?.timing === timing
    );
    const params = {
      to: futsalInfo?.[0]?.email,
      subject: `You have new booking`,
      html: `<h4>You have new booking!</h4> <br> 
      <strong>Name:</strong> ${name} <br> <strong>Email:</strong> ${email} <br> 
      <strong>Phone No:</strong> ${phone_no} <br> 
      <strong>Timing:</strong> ${timing} <br>
      <Table style="border-collapse: collapse">
      <tr>
        <th style="border: 1px solid black; padding: 10px">Description</th>
        <th style="border: 1px solid black; padding: 10px">Quantity</th>
        <th style="border: 1px solid black; padding: 10px">Price</th>
        <th style="border: 1px solid black; padding: 10px">Total</th>
      </tr>
      <tr>
        <td style="border: 1px solid black; padding: 10px">Futsal Court Booking</td>
        <td style="border: 1px solid black; padding: 10px">1</td>
        <td style="border: 1px solid black; padding: 10px">RS ${rates?.[0]?.rate}/hour</td>
        <td style="border: 1px solid black; padding: 10px">RS ${rates?.[0]?.rate}</td>
      </tr>
      </Table>`,
    };
    if (checkDuplicateEntry?.length === 0) {
      await futsalReservedModel({
        name: name,
        // address: address,
        user_id: user_id,
        email: email,
        phone_no: phone_no,
        timing: timing,
        futsal_id: futsal_id,
        // rate: rate,
        futsal_book_list_id: id,
        booking_date: booking_date,
      }).save(async (err, db) => {
        await futsalBookedModel.updateOne(
          { futsal_id: payload?.futsal_id, timing: payload?.timing },
          { $set: { status: "Booked" } }
        );
        if (err) {
          console.log("error", err.message);
        }
      });
      await notify(params);
    }
    return { message: "Futsal updated successfully" };
  } catch (error) {
    throw error;
  }
};

export const bookingRelease = async (id, next) => {
  try {
    await futsalBookedModel.updateOne(
      { _id: id },
      { $set: { status: "Available" } }
    );
    await futsalReservedModel.deleteMany({futsal_book_list_id: id })
    return { message: "Futsal updated successfully" };
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (payload, res, next) => {
  console.log(
    ":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
  );
  console.log("🚀 ~ cancelBooking ~ payload:", payload);
  const { futsal_id, user_id, booking_date, futsal_book_list_id } = payload;
  try {
    const res = await futsalReservedModel.deleteMany({
      futsal_id: futsal_id,
      booking_date: booking_date,
      futsal_book_list_id: futsal_book_list_id,
      user_id: user_id,
    });
    return { message: "Futsal cancelled successfully" };
  } catch (error) {
    throw error;
  }
};
