const Job = require("../model/jobs/Jobs");
const EmployerProfile = require("../model/users/EmployerProfile");


const showJobs = (req, res, next) => {
    Job.find({}).exec().then(function (jobs) {
        let employer_ids = jobs.map((job) => {
            return job.employer_id
        });

        return Promise.all([
            jobs,
            EmployerProfile.find({
                employer_id: {
                    $in: employer_ids
                }
            }).exec()
        ]);
    }).then(function (results){
        var jobs = results[0];
        var profiles = results[1];
        const employer_ids = profiles.map((profile) => {
            return profile.employer_id.toString()
        });
        let response = []
        for (var i=0; i<jobs.length; i++){
            for (var j=0; j<profiles.length; j++){
                if (profiles[j].employer_id.toString() == jobs[i].employer_id.toString()){
                    response.push({...jobs[i].toObject(), logo: profiles[j].logo})
                }
            }
        }

        res.send({ data: response })
    }).catch(err => {
        next(err)
    })
}
module.exports = {
    showJobs
}