const express = require("express");
const router = express.Router();
const {showJobs} = require("../controller/show")

router.get("/jobs", showJobs)

module.exports = router