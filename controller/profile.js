const fs = require('fs');
const path = require('path');

const userModelSelector = require("../utils/userModelSelector");


const createProfile = (req, res, next) => {
    const user = req.user;
    if (Object.keys({...req.body}).includes("headquarter_address")){
        req.body["headquarter_address"] = JSON.parse(req.body["headquarter_address"]);
    }
    if (Object.keys({...req.body}).includes("current_address")){
        req.body["current_address"] = JSON.parse(req.body["current_address"]);
    }
    if (Object.keys({...req.body}).includes("expected_salary")){
        req.body["expected_salary"] = JSON.parse(req.body["expected_salary"]);
    }
    if(user.role){
        const model = userModelSelector(user, res);
        const query = (user.role == "applicant") ? {applicant_id: user.id}: {employer_id: user.id};
        try{
            model.find(query, (err, data) => {
                if(err){
                    return next(err);
                }                
                if (data.length !== 0){
                    return res.status(403).send({msg: "Profile exist already."});
                }
                let files = {}
                Promise.all(req.files.map(file => {
                    files[file.fieldname] = "uploads/" + file.fieldname + "/" + file.filename;
                }))
                model.create({...req.body, ...query, ...files }, (err, data) => {
                    if (err){
                        return next(err)
                    }
                    return res.send(data)
                });
            });
        }
        catch(err){
            return next(err);
        }
    }
    else {
        return res.status.send({msg: "Missing user role"});
    }
}

const updateProfile = async (req, res, next) => {
    const user = req.user;
    if (req.body["current_address"]){
        req.body["current_address"] = JSON.parse(req.body["current_address"]);
    }
    if (req.body["expected_salary"]){
        req.body["expected_salary"] = JSON.parse(req.body["expected_salary"]);
    }
    if (req.body["headquarter_address"]){
        req.body["headquarter_address"] = JSON.parse(req.body["headquarter_address"]);
    }
    
    if (user.role){
        try {
            const model = userModelSelector(user, res);
            const query = (user.role == "applicant") ? {applicant_id: user.id}: {employer_id: user.id};
            model.find(query, (err, data) => {
                if (err){
                    return next(err);
                } 
                let profileID = data[0].id;
                let files = {};
                Promise.all(req.files.map(file => {
                    files[file.fieldname] = "uploads/" + file.fieldname + "/" + file.filename;
                    let directoryPath = __basedir + "/public/" + data[0][file.fieldname];
                    fs.unlink(directoryPath, (err, data) =>{
                        if(err) {
                            return next(err)
                        }
                    });
                }))
                model.findByIdAndUpdate(profileID, {...req.body, ...query, ...files}, (err, data) => {
                    if (err){
                        return next(err);
                    }
                    return res.send({msg: data});
                })
            })
        }
        catch(err){
            return next(err);
        }
    }
    else {
        res.status(403).send({msg: "Missing user role"});
    }
}

const showProfile = (req, res, next) => {
    const user = req.user;

    const model = userModelSelector(user, res);
    const query = (user.role == "applicant") ? {applicant_id: user.id}: {employer_id: user.id}
    try {
        model.find(query, (err, data) => {
            if (err){
                return next(err);
            }
            return res.send(data);
        })
    }
    catch (err){
        return next(err);
    }
}


module.exports = {
    createProfile,
    updateProfile,
    showProfile
};