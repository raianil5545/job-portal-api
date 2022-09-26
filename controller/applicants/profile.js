const userModelSelector = require("../../utils/userModelSelector")


const fs = require('fs');
const path = require('path');


const createProfile = (req, res, next) => {
    let user = req.user
    if(user.role){
        model = userModelSelector(user, res)
        let query = (user.role == "applicant") ? {applicant_id: user.id}: {employer_id: user.id}
        console.log(query)
        try{
            model.find(query, (err, data) => {
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
                model.create({...req.body, ...query, ...files }, (err, data) => {
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
    else {
        return res.status.send({msg: "Missing user role"})
    }
}

const updateProfile = async (req, res, next) => {
    let user = req.user
    if (user.role){
        try {
            model = userModelSelector(user, res)
            let query = (user.role == "applicant") ? {applicant_id: user.id}: {employer_id: user.id}
            console.log(query)
            model.find(query, (err, data) => {
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
                model.findByIdAndUpdate(profileID, {...req.body, ...query, ...files}, (err, data) => {
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
    else {
        res.status(403).send({msg: "Missing user role"})
    }
}

const showProfile = (req, res, next) => {
    let user = req.user;
    let model = userModelSelector(user, res);
    let query = (user.role == "applicant") ? {applicant_id: user.id}: {employer_id: user.id}
    try {
        model.find(query, (err, data) => {
            if (err){
                return next(err)
            }
            return res.send(data)
        })
    }
    catch (err){
        return next(err)
    }
}


module.exports = {
    createProfile,
    updateProfile,
    showProfile
}