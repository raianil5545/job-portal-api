const Applicant = require("../../model/users/Applicant");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const register = (req, res, next) => {
    try {
        let hash_password = bcrypt.hashSync(req.body.password, 10);
        req["body"]["password"] = hash_password;
        let applicant = Applicant.create(req.body, (err, data) => {
            if (err) {
                return next(err)
            }
            applicant = data.toObject();
            delete applicant.password;
            return res.send({ applicant });
        })
    }
    catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        let email = req.body.email;
        let user = await Applicant.findOne({ email }).select("password email id is_active")

        if (user.is_active) {
            let jwtUserObj = {
                id: user.id,
                email: user.email, 
                isApplicant: true
            }
            let isvalidUser = bcrypt.compareSync(req.body.password, user.password)
            if (isvalidUser) {
                let token = jwt.sign(jwtUserObj, process.env.jwtSecret);
                return res.send({
                    accessToken: token,
                    isApplicant: true
                })
            }
            else {
                return res.status(401).send({
                    msg: "Invalid Credentials"
                })
            }
        }
        else {
            return res.status(403).send({
                msg: "Inactive acoount"
            })
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login
}