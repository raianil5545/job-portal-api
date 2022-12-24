const express = require("express");

const {showJobs} = require("../controller/show");
const {validateToken} = require("../middleware/authValidateToken");

const router = express.Router();

router.get("/jobs", showJobs);
router.get("/applicant/jobs", validateToken, showJobs);

module.exports = router;