const Profile = require("../../model/users/ApplicantProfile")
const fs = require('fs');
const path = require('path');


const createProfile = (req, res, next) => {
    let user = req.user
    if(user.role == "applicant"){
        try{
            Profile.find({applicant_id: user.id}, (err, data) => {
                if(err){
                    return next(err)
                }                
                if (data.length !== 0){
                    return res.status(403).send({msg: "Profile exist already."})
                }
                let files = {}
                req.files.map(file => {
                    files[file.fieldname] = "uploads/" + file.fieldname + "/" + file.filename
                })
                Profile.create({...req.body, applicant_id: user.id, ...files }, (err, data) => {
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
    if (user.role == "applicant"){
        try {
            Profile.find({applicant_id: user.id}, (err, data) => {
                if (err){
                    return next(err)
                } 
                let profileID = data[0].id
                let files = {}
                Promise.all(req.files.map(file => {
                    files[file.fieldname] = "uploads/" + file.fieldname + "/" + file.filename
                    let directoryPath = __basedir + "/public/" + data[0][file.fieldname]
                    fs.unlink(directoryPath, (err, data) =>{
                        if(err) {
                            return next(err)
                        }
                    })
                }))
                Profile.findByIdAndUpdate(profileID, {...req.body, applicant_id: user.id, ...files}, (err, data) => {
                    if (err){
                        return next(err)
                    }
                    return res.send({msg: "Profile  Successfully updated"})
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