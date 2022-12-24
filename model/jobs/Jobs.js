const mongoose = require("mongoose");


let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const jobsSchema = new Schema({
    job_name: {
        type: String,
        required: true,
        lower: true
    },
    job_category: {
        type: String,
        required: true,
        lower: true
    },
    job_level: {
        type: String,
        required: true,
        lower: true
    },
    no_of_vacancy: {
        type: Number,
        min: 1,
        required: true
    },
    employment_type: {
        type: String,
        required: true,
        lower: true
    },
    job_location: {
        street_address:{
            type: String,
            required: [true, "Street Address is required field in Job location."]
        },
        city: {
            type: String,
            required: [true, "City is required field in Job location."]
        }
    },
    offered_salary: {
        type: String,
        required: true
    },
    application_dead_line: {
        type: Date,
        required: true
    },
    education_level: {
        type: String,
        required: true,
        lower: true
    },
    experience_level: {
        type: String,
        required: true,
        lower: true
    },
    skills_required: {
        type: Array,
        required: true,
        lower: true
    },
    other_specification: {
        type: Array
    },
    job_description: {
        type: Array,
        required: true
    },
    employer_id: {
        type: ObjectId,
        required: true
    }},
    {
        timestamps: true
    });


let jobModel = mongoose.model("Jobs", jobsSchema);

module.exports = jobModel;