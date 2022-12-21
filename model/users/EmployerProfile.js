const mongoose = require("mongoose");
const { province } = require("../../constant/userEnum");


let schema = mongoose.Schema;
let ObjectId = schema.ObjectId;


const employerProfileSchema = new mongoose.Schema({
    founded_year: {
        type: Date,
        required: true
    },
    website_url: {
        type: String,
        lower:  true
    },
    logo: {
        type: String
    },
    headquarter_address: {
        street: {
            type: String, 
            required: [true, "Street address is required field in an address."]
        },
        city: {
            type: String, 
            required: [true, "City is required field in an address."]
        },
        province: {
            type: String,
            enum: province,
            required: [true, "Province is required field in an address"]
        }
    }, 
    locations: {
        type: Array
    },
    employer_id: {
        type: ObjectId,
        ref: "User"
    }},
    {
        timestamps: true
});

let employerProfile = mongoose.model("EmployerProfile", employerProfileSchema);
module.exports = employerProfile;
