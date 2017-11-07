const db = require('../utils/database.js')
var schema = new db.Schema({
	sex:{
		type:Array,
		required:true
	},
	types:{
		type:Array,
		required:true
	},
	styles:{
		type:Object,
		required:true
	},
	typestyle:{
		type:String,
		required:true
	},
	typeimage:{
		type:String,
		required:false		
	},
	descrption:{
		type:String,
		required:true
	}
})

var Genders = db.model('genders',schema)

module.exports = Genders
