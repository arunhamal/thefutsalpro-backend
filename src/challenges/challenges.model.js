import mongoose from "mongoose";

const challengesSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    from_name: { type: String, required: true },
    from_email: { type: String, required: true },
    from_phone_no: { type: String, required: true },
    is_accepted: { type: Boolean, required: true }
})

export const challengesModel = mongoose.model('challengesModel', challengesSchema)