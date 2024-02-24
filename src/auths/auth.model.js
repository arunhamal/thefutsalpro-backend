import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_no: { type: String },
    is_owner: { type: Boolean, required: true },
    is_verified: { type: Boolean, required: true },
    verification_key: { type: String, required: true },
    super_admin: { type: Boolean },
})

export const userModel = mongoose.model('authModel', authSchema)