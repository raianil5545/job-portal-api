const express = require("express")
require("dotenv").config()


const auth_route = require("./route/authApplicant")
const app = express();


// connecting to the database
require("../job-portal-api/config/dbConnection")

// convert req into json objects
app.use(express.json())

// endpoint
// user-endpoint
app.use("/api/jobseeker", auth_route)

// error handler
app.use((err, req, res, next) => {
    if (err){
        res.status(500).send({
            msg: err.message
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