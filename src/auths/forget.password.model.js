import mongoose from "mongoose";

const forgetPasswordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    user_id: {type: String, required: true},
    phone_no: { type: String },
    is_owner: { type: Boolean, required: true },
    is_verified: { type: Boolean, required: true },
    verification_key: { type: String, required: true },
    verification_status: { type: Boolean }
})

export const forgetPasswordModel = mongoose.model('forgetPasswordModel', forgetPasswordSchema)