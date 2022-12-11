const express = require("express");


const { createProfile, updateProfile, showProfile } = require("../controller/profile");
const { validateToken } = require("../middleware/authValidateToken");
const upload = require("../utils/mutler")
const { applicantValidator } = require("../middleware/validators/profile")

const router = express.Router();

router.put("/profile/update", validateToken,  upload.any(), updateProfile)
router.post("/profile/create", validateToken, upload.any(), applicantValidator, createProfile)
router.get("/profile", validateToken, showProfile)


module.exports = router