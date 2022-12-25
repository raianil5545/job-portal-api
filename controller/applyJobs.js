const ApplyJob = require("../model/jobs/AppliedJob");
const User = require("../model/users/User");
const sendMail = require("../utils/nodeMailer")

const applyJob = (req, res, next) => {
    const user = req.user;
    if (user.role === "applicant"){
        const applicant_id = user.id;
        const body = req.body;
        const job_id = req.params.id;
        const applicant_email = user.email;
        body["job_id"] =  job_id;
        body["applicant_id"] = applicant_id;
        const employer_id = body.employer_id;
        const applicant_msg = {msg: "Job posted Sucessfully"};
        const employer_msg = {
            applicant_email: applicant_email,
            applicant_resume: body.resume
        }
        delete body.resume;
        User.findById(employer_id, (err, data) => {
            if (err){
                res.status(500).send(err);
            }
            const employer_email = data.email;
            ApplyJob.create({...body}, (err, data) => {
                if (data) {
                    sendMail(applicant_email, "Job applied", applicant_msg)
                    sendMail(employer_email, "receive job applocation", employer_msg)
                }
                else {
                    res.status(500).send(err);
                }
            })
        })
        res.send({data: "success"})

    }
    else {
        res.status(401).send({error: "Forbidden"})
    }
}

module.exports = {
    applyJob
}