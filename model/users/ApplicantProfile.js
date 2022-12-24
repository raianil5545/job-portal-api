const mongoose = require("mongoose");


const {jobLevel, gender, salaryCondition, province} = require("../../constant/userEnum");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const applicantProfileSchema = new Schema({
    level: {
        type: String, 
        enum: jobLevel,
        required: true,
        lower: true
    }, 
    skills: {
        type: Array,
        required: true,
        lower: true
    },
    experience: {
        type: String,
        required: true,
        lower: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        lower: true,
        enum: gender
    },
    profile_pic: {
        type: String
    },
    resume: {
        type: String
    },
    expected_salary: {
        amount: {
            type: Number,
            required: [true, "Expected  Amount is required."]
        },
        condition: {
            type: String,
            enum: salaryCondition,
            lower: true      
        }
    },
    current_address: {
        street: {
            type: String,
            required: [true, "Street of current address is required"],
            lower: true
        },
        city: {
            type: String,
            required: [true, "City is required in current adress."]
        },
        province:{
            type: String,
            enum: province,
            required: [true, "Province is required in current Address."]
        }
    },
    job_location: {
        type: Array,
        required: [true, "Preferred Job location is required."]
    },
    applicant_id: {
        type: ObjectId, 
        ref: "User"
    }},
    {
        timestamps: true
    });

let applicantProfileModel = mongoose.model("ApplicantProfile", applicantProfileSchema);
module.exports = applicantProfileModel;