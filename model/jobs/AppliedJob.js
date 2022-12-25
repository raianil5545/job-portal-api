const moongose = require("mongoose");

const Schema = moongose.Schema;
const ObjectId = Schema.ObjectId;

const applyJobSchema = new Schema({
    job_id: {
        type: ObjectId,
        required: true
    },
    applicant_id: {
        type: ObjectId,
        required: true
    },
    job_name: {
        type: String,
        lower: true,
        required: true
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
    employment_type: {
        type: String,
        required: true,
        lower: true
    },
    employer_id: {
        type: ObjectId,
        required: true
    }}, {
        timestamps: true
    });

const applyJobModel = moongose.model("AppliedJobs", applyJobSchema);
module.exports = applyJobModel;