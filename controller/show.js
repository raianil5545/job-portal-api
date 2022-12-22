const Job = require("../model/jobs/Jobs");
const EmployerProfile = require("../model/users/EmployerProfile");
const ApplicantProfile = require("../model/users/ApplicantProfile");


const showJobs = async (req, res, next) => {
    if (req?.user?.role === "applicant") {
        let skills = await ApplicantProfile.find({ applicant_id: req.user.id }).exec().then((profile) => {
            return profile[0]?.skills;
        });

        await Job.aggregate([
            {
                $match: {
                    $or: [
                        {
                            skills_required: {
                                $in: skills
                            }
                        }
                    ]
                }
            }
        ]).exec().then(
            function (jobs) {
                let employer_ids = jobs.map((job) => {
                    return job.employer_id;
                });

                return Promise.all([
                    jobs,
                    EmployerProfile.find({
                        employer_id: {
                            $in: employer_ids
                        }
                    }).exec()
                ]);
            }
        ).then(function (results) {
            var jobs = results[0];
            var profiles = results[1];
            let response = [];
            for (var i = 0; i < jobs.length; i++) {
                for (var j = 0; j < profiles.length; j++) {
                    if (profiles[j].employer_id.toString() == jobs[i].employer_id.toString()) {
                        response.push({ ...jobs[i], logo: profiles[j].logo });
                    }
                }
            }
            res.send(response);
        });
    }
    else {
        let search_term = req.query.search_term;
        await Job.aggregate(
            [
                {
                    $match: {
                        $or: [
                            { job_category: { $regex: RegExp(search_term, "i") } },
                            { job_name: { $regex: RegExp(search_term, "i") } },
                            { skills_required: { $regex: RegExp(search_term, "i") } },
                        ]
                    }
                }
                
            ]
        ).exec().then(function (jobs) {
            let employer_ids = jobs.map((job) => {
                return job.employer_id;
            });

            return Promise.all([
                jobs,
                EmployerProfile.find({
                    employer_id: {
                        $in: employer_ids
                    }
                }).exec()
            ]);
        }).then(function (results) {
            var jobs = results[0];
            var profiles = results[1];
            const employer_ids = profiles.map((profile) => {
                return profile.employer_id.toString();
            });
            let response = []
            for (var i = 0; i < jobs.length; i++) {
                for (var j = 0; j < profiles.length; j++) {
                    if (profiles[j].employer_id.toString() == jobs[i].employer_id.toString()) {
                        response.push({ ...jobs[i], logo: profiles[j].logo });
                    }
                }
            }

            res.send(response);
        }).catch(err => {
            next(err);
        })
    }
}
module.exports = {
    showJobs
}