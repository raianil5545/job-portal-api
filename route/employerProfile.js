const express = require("express");

const { createProfile, updateProfile, showProfile } = require("../controller/applicants/profile");
const { validateToken } = require("../middleware/authValidateToken")
const upload = require("../utils/mutler")



const router = express.Router()

router.post("/profile", validateToken, upload.any(), createProfile)
router.put("/profile", validateToken, upload.any(), updateProfile)
router.get("/profile", validateToken, showProfile)


module.exports = router
