let express = require("express");
const { validateToken } = require("../middleware/authValidateToken")
let {getUser} = require("../controller/auth")


let router = express.Router()

router.get("/get-user", validateToken, getUser)

module.exports = router