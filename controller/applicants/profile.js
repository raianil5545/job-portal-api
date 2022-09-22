const Profile = require("../../model/users/ApplicantProfile")
const fs = require('fs');
const path = require('path');


const createProfile = (req, res, next) => {
    let user = req.user
    if(user.isApplicant){
        try{
            Profile.find({applicant_id: user.id}, (err, data) => {
                if(err){
                    return next(err)
                }                
                if (data.length !== 0){
                    return res.status(403).send({msg: "Profile exist already."})
                }
                let profilePic = "uploads/" + req.file.filename
                Profile.create({...req.body, applicant_id: user.id, profile_pic: profilePic }, (err, data) => {
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

const updateProfile = async (req, res, next) => {
    let user = req.user
    if (user.isApplicant){
        try {
            Profile.find({applicant_id: user.id}, (err, data) => {
                if (err){
                    return next(err)
                } 
                let profileID = data[0].id
                let directoryPath = __basedir + "/public/" + data[0].profile_pic 
                
                // deleting the old profile pic and upadting with new

                fs.unlink(directoryPath, (err, data) => {
                    if (err){
                        return next(err)
                    }
                    let profilePic = "uploads/" + req.file.filename
                    Profile.findByIdAndUpdate(profileID, {...req.body, applicant_id: user.id, profile_pic: profilePic}, (err, data) => {
                    if (err){
                        return next(err)
                    }
                    console.log(data)
                    return res.send(data)
            })
                })
                })
        }
        catch(err){
            return next(err)
        }
    }
}


module.exports = {
    createProfile,
    updateProfile
}