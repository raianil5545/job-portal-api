const express = require("express")
require("dotenv").config()
bodyParser  = require( 'body-parser' )


const applicantAuthRoute = require("./route/authApplicant")
const applicantProfileRoute = require("./route/applicantProfile")
const app = express();
global.__basedir = __dirname;


// connecting to the database
require("../job-portal-api/config/dbConnection")

// convert req into json objects
app.use(express.json())

app.use(express.static("public"))
app.use( bodyParser({ extended: false }) )


//  applicant user-endpoint
app.use("/api/jobseeker", applicantAuthRoute)
app.use("/api/jobseeker", applicantProfileRoute)

// error handler
app.use((err, req, res, next) => {
    console.log(err)
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