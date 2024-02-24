import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    event_name: { type: String, required: true },
    futsal_name: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    futsal_id: { type: String, required: true},
    description: { type: String, required: true },
    event_img: { type: String, required: true }
})

export const eventModel = mongoose.model('eventModel', eventSchema)