const multer = require('multer')


exports.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './assets')

        },
        filename: (req, file, cb)=>{
            const uniqueSuffix = "groupwork"
            console.log(file)
            cb(null, file.fieldname + '.' + file.mimetype.split("/")[1])

        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 40
    },
    fileFilter: (req, file, cb)=>{
        if(!file.mimetype.startsWith('image/')){
            cb(new ERROR ('only image files are allowed'))
        }
        else{
            cb(null, true)
        }
    }



})