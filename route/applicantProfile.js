const express = require("express");
const { createProfile } = require("../controller/applicants/profile");
const { validateToken } = require("../middleware/authValidateToken")

const router = express.Router();

router.post("/profile", validateToken, createProfile)


module.exports = router