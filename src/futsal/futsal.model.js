import mongoose from "mongoose";

const futsalSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    email: {type: String},
    start_time: { type: String },
    end_time: {type: String},
    description: { type: String },
    futsal_map: { type: String },
    futsal_img: { type: String },
    time_rate: { type: Array },
    futsal_id: {type: String},
})

export const futsalModel = mongoose.model('futsal', futsalSchema)