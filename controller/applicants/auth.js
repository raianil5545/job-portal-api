const User = require("../../model/users/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const register = (req, res, next) => {
    try {
        let hash_password = bcrypt.hashSync(req.body.password, 10);
        req["body"]["password"] = hash_password;
        let user = User.create(req.body, (err, data) => {
            if (err) {
                return next(err)
            }
            user = data.toObject();
            delete user.password;
            return res.send({ user });
        })
    }
    catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        let email = req.body.email;
        let user = await User.findOne({ email }).select("password email id is_active role");

        if (user.is_active) {
            let jwtUserObj = {
                id: user.id,
                email: user.email, 
                role: user.role
            }
            let isvalidUser = bcrypt.compareSync(req.body.password, user.password)
            if (isvalidUser) {
                let token = jwt.sign(jwtUserObj, process.env.jwtSecret);
                return res.send({
                    accessToken: token,
                    role: user.role
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