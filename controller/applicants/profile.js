const Profile = require("../../model/users/ApplicantProfile")

const createProfile = (req, res, next) => {
    let user = req.user
    if(user.isApplicant){
        try{
            Profile.find({applicant_id: user.id}, (err, data) => {
                if(err){
                    return next(err)
                }
                if (data){
                    return res.status(403).send({msg: "Profile exist already."})
                }
                Profile.create({...req.body, applicant_id: user.id }, (err, data) => {
                    if (err){
                        return next(err)
                    }
                    return res.send(data)
                })
            })
        }
        catch(err){
            return next(err)
        }
    }
}


module.exports = {
    createProfile
}