var express = require('express');
const app = express();
const controller = require("../../controllers/private/file.controller");
const multer = require('multer')
const fs = require('fs')
const { slugify } = require('../../helpers/methods')

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirname = 'public'
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true })
    }
    cb(null, dirname)
  },
  filename: async function (req, file, cb) {
    let mime = file.mimetype.split('/')[1]
    mime = '.' + mime

    let filename = file.originalname
    filename = filename.replace(mime, '')
    filename = slugify(filename)

    let fileExist = await db['file'].findOne({ filename: filename + mime })
    if (fileExist || !filename) {
        filename = Date.now() + "-" + filename
    }

    filename += mime

    cb(null, filename)
  }
})
 
var upload = multer({ storage: storage })

app.post("/", upload.single('upload'), controller.upload)
app.post("/collection", controller.getCollection)
app.delete("/:id", controller.delete);

module.exports = app;
