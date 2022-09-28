const Job = require("../../model/jobs/Jobs");


const createJob = (req, res, next) => {
    let user = req.user;
    if (user.role == "employer"){
        try {
            Job.create({...req.body, employer_id: user.id }, (err, data) => {
                if(err){
                    return next(err)
                }
                return res.send({msg: "Job Posted"})
            })
        }
        catch(err){
            return next(err)
        }
    }
    else {
        res.status(403).send({msg: "Unauthorized"});
    }
}


const showEmployerJobs = (req, res, next) => {
    let user = req.user;
    if (user.role == "employer"){
        try {
            Job.find({employer_id: user.id}, (err, data) => {
                if(err){
                    return next(err)
                }
                return res.send(data)
               
            })
        }
        catch(err){
            return next(err)
        }
    }
    else {
        res.status(403).send({msg: "Unauthorized"})
    }
}

const updateJob = (req, res, next) => {
    let user = req.user;
    if (user.role == "employer"){
        try {
            Job.findByIdAndUpdate(req.params.id, {...req.body}, (err, data) => {
                if(err){
                    return next(err)
                }
                return res.send({msg: "Job updated"})
            })
        }
        catch(err){
            return next(err)
        }
    }
    else {
        res.status(403).send({msg: "Unauthorized"})
    }
}


module.exports = {
    createJob,
    showEmployerJobs,
    updateJob
}