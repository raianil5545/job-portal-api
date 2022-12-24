const Job = require("../../model/jobs/Jobs");


const createJob = (req, res, next) => {
    const user = req.user;
    if (req.body["job_location"]){
        req.body["job_location"] = JSON.parse(req.body["job_location"]);
    }
    if (user.role == "employer"){
        try {
            Job.create({...req.body, employer_id: user.id }, (err, data) => {
                if(err){
                    return next(err);
                }
                return res.send({msg: "Job Posted"});
            });
        }
        catch(err){
            return next(err);
        }
    }
    else {
        res.status(403).send({msg: "Unauthorized"});
    }
}


const showEmployerJobs = (req, res, next) => {
    const user = req.user;
    if (user.role == "employer"){

        try {
            Job.find({employer_id: user.id}, (err, data) => {
                if(err){
                    return next(err);
                }
                return res.send(data);
               
            });
        }
        catch(err){
            return next(err);
        }
    }
    else {
        res.status(403).send({msg: "Unauthorized"});
    }
}

const updateJob = (req, res, next) => {
    const user = req.user;
    if (req.body["job_location"]){
        req.body["job_location"] = JSON.parse(req.body["job_location"]);
    }
    if (user.role == "employer"){
        try {
            Job.findByIdAndUpdate(req.params.id, {...req.body}, (err, data) => {
                if(err){
                    return next(err);
                }
                return res.send({msg: "Job updated"});
            });
        }
        catch(err){
            return next(err);
        }
    }
    else {
        res.status(403).send({msg: "Unauthorized"});
    }
}

const deleteJob = (req, res, next) => {
    const user = req.user;
    Job.find({_id: req.params.id}, (err, data) => {
        if (data){
            if (user.id === data[0]?.employer_id.toString()){
                Job.deleteOne({employer_id: user.id}, (err, data)=> {
                    if (data){
                        console.log(data)
                        res.send({data: "job deleted"})
                    }
                    else {
                        res.send.status(500).send(err)
                    }
                })
               }
            else {
                res.status(400).send({error: "bad request"})
               }
        }
        else {
            res.status(401).send({error: "unauthoried"})
        }
    })
}

module.exports = {
    createJob,
    showEmployerJobs,
    updateJob,
    deleteJob
};