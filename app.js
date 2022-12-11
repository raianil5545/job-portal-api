const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser')
const cors = require('cors')
const formData = require("express-form-data");
const os = require("os");




const applicantAuthRoute = require("./route/authApplicant");
const applicantProfileRoute = require("./route/applicantProfile");
const employerProfileroute = require("./route/employerProfile");
const jobRoute = require("./route/jobRoute")
const getUserRoute = require("./route/getUser")

const app = express();
global.__basedir = __dirname;

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };
  
// connecting to the database
require("../job-portal-api/config/dbConnection")

// cors middleware
app.use(cors());

app.use(express.json())

// convert req into json objects
var jsonParser = bodyParser.json({ type: 'application/*+json' })


// parse data with connect-multiparty. 
// app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
// app.use(formData.format());

// change the file objects to fs.ReadStream 
// app.use(formData.stream());
// union the body and the files
// app.use(formData.union());




app.use(express.static("public"))

//  applicant user-endpoint
app.use("/api/user", applicantAuthRoute)
app.use("/api/applicant", applicantProfileRoute)
app.use("/api/employer", employerProfileroute)
app.use("/api/employer", jobRoute)
app.use("/api/users", getUserRoute)

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