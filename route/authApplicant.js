const express = require("express");
const { register, login } = require("../controller/applicants/auth")
const { applicantValidator, loginApplicantValidator } = require("../middleware/validators/auth")

const router = express.Router();

router.post("/signup", applicantValidator, register)
router.post("/login",loginApplicantValidator, login)

module.exports = router