const express = require("express");
require("dotenv").config();
bodyParser  = require('body-parser');
const cors = require('cors')



const applicantAuthRoute = require("./route/authApplicant");
const applicantProfileRoute = require("./route/applicantProfile");
const employerProfileroute = require("./route/employerProfile");
const jobRoute = require("./route/jobRoute")
const app = express();
global.__basedir = __dirname;


// connecting to the database
require("../job-portal-api/config/dbConnection")

// cors middleware
app.use(cors());

// convert req into json objects
app.use(express.json())

app.use(express.static("public"))
app.use( bodyParser({ extended: false }) )


//  applicant user-endpoint
app.use("/api/user", applicantAuthRoute)
app.use("/api/applicant", applicantProfileRoute)
app.use("/api/employer", employerProfileroute)
app.use("/api/employer", jobRoute)

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