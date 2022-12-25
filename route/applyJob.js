const express = require("express");

const { applyJob } = require("../controller/applyJobs");
const { validateToken } = require("../middleware/authValidateToken");

const router = express.Router();

router.post("/apply/:id", validateToken, applyJob);

module.exports = router