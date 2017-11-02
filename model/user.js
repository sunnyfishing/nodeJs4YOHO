const db = require('../utils/database.js')

const schema = new db.Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
})
const User = db.model('users',schema)
module.exports=User
