const Job = require("../../model/jobs/Jobs");
const Profile = require("../../model/users/EmployerProfile")


const createJob = (req, res, next) => {
    let user = req.user;
    if (user.role == "employer"){
        try {
            let job = Job.create({...req.body, employer_id: user.id }, (err, data) => {
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


module.exports = {
    createJob
}