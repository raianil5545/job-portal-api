const express = require("express");
const { createProfile, updateProfile } = require("../controller/applicants/profile");
const { validateToken } = require("../middleware/authValidateToken");
const upload = require("../utils/mutler")

const router = express.Router();

router.post("/profile", validateToken, upload.single("profile_pic"), createProfile)
router.put("/profile", validateToken,  upload.single("profile_pic"), updateProfile)


module.exports = router