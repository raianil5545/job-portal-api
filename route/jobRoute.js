const express = require("express");

const { validateToken } = require("../middleware/authValidateToken");
const { createJob, showEmployerJobs, updateJob, deleteJob } = require("../controller/employers/jobs");
const { jobValidator } = require("../middleware/validators/jobs");


const router = express.Router();

router.post("/job/post", validateToken, jobValidator, createJob);
router.get("/jobs", validateToken, showEmployerJobs);
router.put("/job/update/:id", validateToken, updateJob);
router.delete("/job/delete/:id", validateToken, deleteJob)

module.exports = router;