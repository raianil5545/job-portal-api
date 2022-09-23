const multer  = require('multer')
const path = require("path")
const fs = require("fs")



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname == "profile_pic"){
        const dir = 'public/uploads/profile_pic'
        fs.exists(dir, exist => {
          if (!exist) {
            return fs.mkdir(dir, error => cb(error, dir))
          }
          return cb(null, dir)
          })
      }
      if (file.fieldname == "resume"){
        const dir = 'public/uploads/resume'
        fs.exists(dir, exist => {
          if (!exist) {
            return fs.mkdir(dir, error => cb(error, dir))
          }
          return cb(null, dir)
          })
      }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })


const upload = multer({ storage: storage })


module.exports = upload