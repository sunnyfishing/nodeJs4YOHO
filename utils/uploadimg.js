const multer = require('multer')
const mime = require('mime')
const crypto = require('crypto')
const storage = multer.diskStorage({
  destination(req,file,cb){
    cb(null,'./public/')
  },
  filename(req,file,cb){
    crypto.pseudoRandomBytes(16,(err,raw)=>{
      cb(null,raw.toString('hex')+new Date().getTime()+'.'+mime.extension(file.mimetype))
    })
  }
})
module.exports=multer({storage})
