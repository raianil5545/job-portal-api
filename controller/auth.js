const User = require("../model/users/User");
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
        let user = await User.findOne({ email }).select("password email id is_active role name");
        console.log(user)

        if (user.is_active) {
            let jwtUserObj = {
                id: user.id,
                email: user.email, 
                role: user.role,
                name: user.name            
            }
            let isvalidUser = bcrypt.compareSync(req.body.password, user.password)
            if (isvalidUser) {
                let token = jwt.sign(jwtUserObj, process.env.jwtSecret);
                return res.send({
                    accessToken: token,
                    user: jwtUserObj               
                })
            }
            else {
                return res.status(401).send({errors: [
                    {
                        msg: "Invalid Credentials",
                        param: "password"
                    }
                ]})
            }
        }
        else {
            return res.status(403).send({
                msg: "Inactive account"
            })
        }
    }
    catch (err) {
        next(err)
    }
}

const getUser = (req, res, next) => {
    res.send(req.user)
}

module.exports = {
    register,
    login,
    getUser
}