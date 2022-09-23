const { body, check } = require("express-validator");


const validate = require("../../utils/validate");
const { jobLevel, gender } = require("../../constant/applicantEnum")


const applicantValidator = validate([
    check("level").notEmpty().withMessage("Career Level is required field.")
        .toLowerCase().isIn(jobLevel).withMessage("Invalid Level"),
    body("skills").notEmpty().withMessage("Skills is required field."),
    body("experience").exists().withMessage("Experience is required field."),
    body("date_of_birth").notEmpty().withMessage("Date of Birth is required field."),
    check("gender").exists().withMessage("Candidate gender is required field.")
        .toLowerCase().isIn(gender).withMessage("Inavlid Gender"),
    body("job_location").exists().withMessage("Preferred job location is required field.")
])

module.exports = {
    applicantValidator
}