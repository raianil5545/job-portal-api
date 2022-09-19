// level, skills, experience, date_of_birth, gender, salary expected: above below , equals,
// current address, job location, applicant_id, resume

const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const applicantProfileSchema = new Schema({
    level: {
        type: String, 
        enum: ["entry level", "mid level", "senior level", "top level"]
    }, 
    skills: {
        type: Array
    },
    experience: {
        type: String
    },
    date_of_birth: {
        type: Date
    },
    gender: {
        type: String, 
        enum: ["male", "female"]
    },
    expected_salary: {
        amount: {
            type: Number
        },
        condition: {
            type: String,
            enum: ["greater", "equal", "small"]
        }
    },
    current_address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        province:{
            type: String,
            enum: []
        }
    },
    job_location: {
        type: Array
    },
    applicant_id: {
        type: ObjectId, 
        ref: "Applicant"
    }},
    {
        timestamps: true
    })

let applicantProfileModel = mongoose.model("ApplicantProfile", applicantProfileSchema)
module.exports = applicantProfileModel