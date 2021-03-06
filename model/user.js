const db = require('../utils/database.js')

const schema = new db.Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	phone:{
		type:Number,
		required:false
	},
	roles:{
		type:String,
		required:true
	},
	createTime:{
		type:String,
		required:true
	}
})
const User = db.model('users',schema)
module.exports=User
