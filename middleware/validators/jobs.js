const { body, check } = require("express-validator");

const validate = require("../../utils/validate");


const jobValidator = validate([
    body("job_category").notEmpty().withMessage("Job Category is requied Field."),
    body("job_level").notEmpty().withMessage("Job Level is required Field."),
    body("no_of_vacancy").notEmpty().withMessage("No of Vacancy is required Filed."),
    body("employment_type").notEmpty().withMessage("Employment Type is required Field."),
    body("offered_salary").notEmpty().withMessage("Salary offered is required Field."),
    body("application_dead_line").notEmpty().withMessage("Application deadline is required Field."),
    body("education_level").notEmpty().withMessage("Education Level is required Field."),
    body("experience_level").notEmpty().withMessage("Experience Level is required Field."),
    body("skills_required").notEmpty().withMessage("Skills required is necessary Filed."),
    body("job_description").notEmpty().withMessage("Job description is required Field.")
]);


module.exports = {
    jobValidator
};