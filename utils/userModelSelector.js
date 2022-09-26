const ApplicantProfile = require("../model/users/ApplicantProfile");
const EmployerProfile = require("../model/users/EmployerProfile")


const userModelSelector = (user, res) => {
    if (user.role == "applicant"){
        return ApplicantProfile
    }
    else if (user.role == "employer"){
        return EmployerProfile
    }
    else {
        res.status(403).send({msg: "Invalid Role"})
    }
}

module.exports = userModelSelector