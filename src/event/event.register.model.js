import mongoose from "mongoose";

const eventRegisterSchema = new mongoose.Schema({
    event_name: { type: String, required: true },
    event_id: { type: String, required: true },
    start_date: {type: Date, required: true },
    end_date: {type: Date, required: true },
    futsal_name: {type: String, required: true },
    futsal_id: {type: String, required: true },
    player1: { type: String, required: true },
    user_id: {type: String, required: true },
    phone_number: {type: String, required: true },
    email: {type: String, required: true },
    profile1: { type: String, required: true },
    player2: { type: String, required: true },
    profile2: { type: String, required: true },
    player3: { type: String, required: true },
    profile3: { type: String, required: true },
    player4: { type: String, required: true },
    profile4: { type: String, required: true },
    player5: { type: String, required: true },
    profile5: { type: String, required: true },
    player6: { type: String },
    profile6: { type: String },
    player7: { type: String },
    profile7: { type: String },

})

export const eventRegisterModel = mongoose.model('eventRegister', eventRegisterSchema)