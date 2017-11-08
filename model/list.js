const db = require('../utils/database.js')
var schema = new db.Schema({
	gender:{				//men  women  kids
		type:String, 
		required:true
	},
	styles:{				//上衣，裤子
		type:String,
		required:true
	},
	pro:{
		type:String,
		required:true
	},
//	img:{
//		type:String,
//		required:false
//	},
//	des:{
//		type:String,
//		required:false
//	}
})

var Genders = db.model('genders',schema)

module.exports = Genders
