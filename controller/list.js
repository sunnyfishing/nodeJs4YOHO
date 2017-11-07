const Genders = require('../model/list.js')
const { getParam }= require('../utils/utils.js')

const getGender = function(req, res){
	Genders.find()
		.then((result)=>{
			if(result){
				res.json(getParam({getres:result}))
			}else{
				res.json(getParam({getres:false}))
			}
		})
}
const addgender = function(req,res){
	const {gendertype} = req.body
	//console.log(gendertype)
	Genders.findOne({sex:gendertype})
		.then((result)=>{
			if(result){
				res.json(getParam({save : false}))
			}else{
				var gender = new Genders({
					//sex:gendertype
					sex:gendertype{}
				})			
				gender.save().then(()=>{
					res.json(getParam({save:true}))
				})
			}
		})
}

const delgender= function(req, res){
	const {gendertext} = req.body
	Genders.remove({sex : gendertext})
		.then((result)=>{
			if(result){
				res.json(getParam({delgender:true}))
			}else{
				res.json(getParam({delgender:false}))
			}
		})
}

module.exports = { getGender, addgender, delgender}
