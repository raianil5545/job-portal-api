const { body, check } = require("express-validator");
const validate = require("../../utils/validate");
const Applicant = require("../../model/users/Applicant")

const applicantValidator = validate(
    [
        body("name").notEmpty().withMessage("Name is required Field."),
        body("email").isEmail().withMessage("Invalid Email address"),
        body("email").custom(value => {
            return Applicant.countDocuments({email: value}).then(count => {
                if (count){
                    return Promise.reject('E-mail already in use');
                }
            })
        }),
        body("mobile_number").custom(value => {
            let mobileNumber = /^\d{10}$/;
            if (!value.match(mobileNumber)){
                return Promise.reject("Invalid Phone Number");
            }
            return true
        }),
        check("password")
            .isLength({min: 8})
            .withMessage("must be at least 8 characters long.")
            .matches(/\d/)
            .withMessage("must contain a number")
            .matches(/[a-z]/)
            .withMessage("must contain a smaller letter")
            .matches(/[A-Z]/)
            .withMessage("must contain a Capital letter")
            .matches(/[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/)
            .withMessage("must contain a special characters")
    ]
)

const loginApplicantValidator = validate(
    [
        body("email").isEmail().withMessage("Invalid Email address"),
        body("email").custom(value => {
            return Applicant.countDocuments({email: value}).then(count => {
                if (!count){
                    return Promise.reject("Email doesn't exist")
                }
            })
        }),
        check("password")
            .isLength({min: 8})
            .withMessage("must be at least 8 characters long.")
            .matches(/\d/)
            .withMessage("must contain a number")
            .matches(/[a-z]/)
            .withMessage("must contain a smaller letter")
            .matches(/[A-Z]/)
            .withMessage("must contain a Capital letter")
            .matches(/[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/)
            .withMessage("must contain a special characters")
    ]
)

module.exports = {
    applicantValidator, 
    loginApplicantValidator
}
