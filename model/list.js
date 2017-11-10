const db = require('../utils/database.js')
var schema = new db.Schema({
	gender:{				//men  women  kids
		type:String, 
		required:true
	},
	typestyle:{				//上衣，裤子
		type:String,
		required:true
	},
	prostyle:{
		type:String,
		required:true
	},
	prosimage:{
		type:String,
		required:true
	},
	descrption:{
		type:String,
		required:true
	},
})

var Genders = db.model('genders',schema)

module.exports = Genders
