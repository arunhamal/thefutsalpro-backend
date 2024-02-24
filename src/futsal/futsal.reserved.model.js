import mongoose from "mongoose";

const futsalReservedSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  email: { type: String },
  phone_no: { type: String },
  timing: { type: String },
  user_id: { type: String },
  futsal_id: { type: String },
  futsal_book_list_id: {type: String},
  rate: { type: String },
  booking_date: { type: String },
});

export const futsalReservedModel = mongoose.model("futsalReserved",futsalReservedSchema);
