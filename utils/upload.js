const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    },
    destination: (req, file, cb) => {
        const dest = "uploads"
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest)
        }
        cb(null, dest)
    }
})
module.exports = multer({ storage }).single("hero")
