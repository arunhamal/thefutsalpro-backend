import mongoose from "mongoose";

const futsalRateSchema = new mongoose.Schema({
  name: { type: String },
  futsal_id: { type: String },
  rate: { type: Number },
  remarks: {type: String},
});

export const futsalRateModel = mongoose.model("futsalRate", futsalRateSchema);
