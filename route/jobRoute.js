const express = require("express");
const { validateToken } = require("../middleware/authValidateToken");
const { createJob } = require("../controller/employers/jobs");
const { jobValidator } = require("../middleware/validators/jobs")



let router = express.Router();

router.post("/jobs", validateToken, jobValidator, createJob);

module.exports = router;