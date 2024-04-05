const path = require('path')
const multer = require('multer')

var profile = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/profile-pics') // location where file is uploaded
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
})

var uploadProfile = multer ({
    storage: profile,
    fileFilter: function(req, file, callback) {
        if( file.mimetype == "image/png" || file.mimetype == "image/jpg") {
            callback(null, true)
        } else {
            console.log('only jpg and png files are supported!')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = uploadProfile;