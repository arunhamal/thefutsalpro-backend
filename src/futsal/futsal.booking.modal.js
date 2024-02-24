import mongoose from "mongoose";

const futsalBookingSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  email: { type: String },
  phone_no: { type: String },
  timing: { type: String },
  status: { type: String },
  futsal_id: { type: String },
  rate: { type: String },
  // day: { type: [String] },
  booking_date: { type: [String] },
});

export const futsalBookedModel = mongoose.model("futsalBooked",futsalBookingSchema);
