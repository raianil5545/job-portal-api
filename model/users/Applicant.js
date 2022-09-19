const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const applicantSchema = new Schema({
    name: {
        type: String,
        required: true
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
    is_active: {
        type: Boolean,
        default: true
    }}, {
        timestamps: true
    })

const applicantModel = mongoose.model("Applicant", applicantSchema);
module.exports = applicantModel