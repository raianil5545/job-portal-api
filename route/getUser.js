const express = require("express");
const { validateToken } = require("../middleware/authValidateToken");
const {getUser} = require("../controller/auth");


const router = express.Router();

router.get("/get-user", validateToken, getUser);

module.exports = router;