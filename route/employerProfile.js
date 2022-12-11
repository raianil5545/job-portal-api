const express = require("express");

const { createProfile, updateProfile, showProfile } = require("../controller/profile");
const { validateToken } = require("../middleware/authValidateToken")
const upload = require("../utils/mutler")



const router = express.Router()

router.post("/profile/create", validateToken, upload.any(), createProfile)
router.put("/profile/update", validateToken, upload.any(), updateProfile)
router.get("/profile", validateToken, showProfile)


module.exports = router
