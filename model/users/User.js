const mongoose = require("mongoose");

const { role } = require("../../constant/userEnum");

let Schema = mongoose.Schema;

const applicantSchema = new Schema({
    name: {
        type: String,
        required: true,
        lower: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: String,
        enum: role,
        required: true,
        lowercase: true,
    },
    is_active: {
        type: Boolean,
        default: true
    }}, {
        timestamps: true
    });

const userModel = mongoose.model("User", applicantSchema);
module.exports = userModel;