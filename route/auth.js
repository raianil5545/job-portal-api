const express = require("express");
const { register } = require("../controller/user/auth")


const router = express.Router();

router.post("/signup", register)
// router.post("/login", login)

module.exports = router