const express = require("express");
require("dotenv").config();
const cors = require('cors')


const applicantAuthRoute = require("./route/authApplicant");
const applicantProfileRoute = require("./route/applicantProfile");
const employerProfileroute = require("./route/employerProfile");
const jobRoute = require("./route/jobRoute");
const getUserRoute = require("./route/getUser")
const showRoute = require("./route/showRoute");


const app = express();
  
// connecting to the database
require("../job-portal-api/config/dbConnection");

// cors middleware
app.use(cors());

app.use(express.json());

app.use(express.static("public"));

//  applicant user-endpoint
app.use("/api/user", applicantAuthRoute);
app.use("/api/applicant", applicantProfileRoute);
app.use("/api/employer", employerProfileroute);
app.use("/api/employer", jobRoute);
app.use("/api", showRoute);
app.use("/api/users", getUserRoute);
app.use("/api/user", showRoute);

// error handler
app.use((err, req, res, next) => {
    console.log(err);
    if (err.name == "JsonWebTokenError"){
        res.status(401).send({
            msg: "Invalid Credentials"
        });
    }
    else if(err.name == "ValidationError"){
        res.status(400).send({
            msg: err.message
        });
    }
    else{
        res.status(500).send({
            msg: "Internal Server error"
        });
    }
})

app.listen(process.env.PORT, (err, data) => {
    if (err){
        console.log(err);
    }
    else{
        console.log("... listening ....");
    }
})