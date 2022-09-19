const Applicant = require("../../model/users/Applicant");
const bcrypt = require("bcrypt");


const register = (req, res, next) => {
    try{
        let hash_password = bcrypt.hashSync(req.body.password, 10);
        req["body"]["password"] = hash_password;
        let applicant = Applicant.create(req.body, (err, data) => {
            if (err){
                return next(err)
            } 
            applicant = data.toObject();
            delete applicant.password;
            return res.send({data});
        })
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    register
}