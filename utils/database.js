const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/YOHO'
mongoose.connect(url,{
	useMongoClient:true
}).then(()=>{
	console.log('数据库连接成功')
}).catch((err)=>{
	console.log('ERROR:'+err)
})
module.exports=mongoose
