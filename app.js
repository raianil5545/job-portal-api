const express = require("express")
require("dotenv").config()


const applicantAuthRoute = require("./route/authApplicant")
const applicantProfileRoute = require("./route/applicantProfile")
const app = express();


// connecting to the database
require("../job-portal-api/config/dbConnection")

// convert req into json objects
app.use(express.json())

//  applicant user-endpoint
app.use("/api/jobseeker", applicantAuthRoute)
app.use("/api/jobseeker", applicantProfileRoute)

// error handler
app.use((err, req, res, next) => {
    if (err.name == "JsonWebTokenError"){
        res.status(401).send({
            msg: "Invalid Credentials"
        })
    }
    else if(err.name == "ValidationError"){
        res.status(400).send({
            msg: err.message
        })
    }
    else{
        res.status(500).send({
            msg: "Internal Server error"
        })
    }
})

app.listen(process.env.PORT, (err, data) => {
    if (err){
        console.log(err)
    }
    else{
        console.log("... listening ....")
    }
})