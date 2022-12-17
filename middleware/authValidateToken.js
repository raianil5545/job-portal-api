const jwt = require('jsonwebtoken');


const validateToken = (req, res, next) => {
    let token = req?.headers?.authorization?.split(" ")[1]
    if (!token){
        res.status(401).send({msg: "Missing credentials."})
    }
    try {
        let decoded = jwt.verify(token, process.env.jwtSecret)
        req["user"] = {email: decoded.email, id:decoded.id, role: decoded.role, name: decoded.name}
        next()
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    validateToken
}