const mongoose = require("mongoose");


let options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

mongoose.connect(process.env.dbUrl, options).then(() => {
    console.log("db.connected")
}).catch((err)=> {
    console.log(err)
});