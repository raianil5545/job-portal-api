const express = require("express");
const { createProfile, updateProfile } = require("../controller/applicants/profile");
const { validateToken } = require("../middleware/authValidateToken");
const upload = require("../utils/mutler")

const router = express.Router();

router.post("/profile", validateToken, upload.any(), createProfile)
router.put("/profile", validateToken,  upload.any(), updateProfile)


module.exports = router