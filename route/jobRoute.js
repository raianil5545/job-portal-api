const express = require("express");
const { validateToken } = require("../middleware/authValidateToken");
const { createJob, showEmployerJobs, updateJob } = require("../controller/employers/jobs");
const { jobValidator } = require("../middleware/validators/jobs")



let router = express.Router();

// router.post("/job/post", validateToken, jobValidator, createJob);
router.get("/jobs", validateToken, showEmployerJobs)
router.put("/job/update/:id", validateToken, updateJob)

module.exports = router;