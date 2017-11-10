const Genders = require('../model/list.js');
const { getParam } = require('../utils/utils.js');

const getPro =function(req, res){
	const { gender,typestyle} = req.body
	//console.log(111)
	Genders.find({ gender,typestyle})
		.then((result)=>{
			if(result.length != 0){			//当数据库中存在pro产品时
				res.json(getParam({exitPro:result}))
			}else{
				res.json(getParam({exitPro:false}))
			}
		})
}
const getSingl = function(req, res){
	const { gender,typestyle, prostyle} = req.query
	Genders.findOne({gender,typestyle, prostyle})
	.then((result)=>{
		if(!result){
			res.json(getParam({getSing:false}))
		}else{
			res.json(getParam({getSing:result}))
		}
	})
}
const addPro = function(req, res){		
	const { prostyle,descrption,gender, typestyle, prosimage} = req.body
	Genders.findOne({ gender, typestyle, prostyle})
		.then((result)=>{
			if(result){				//如果在数据库中有gender, typestyle, prostyle相同的
				res.json(getParam({addpro:false}))
			}else{
				var willSavePro = new Genders({
					prosimage,
					prostyle,
					descrption,
					gender, 
					typestyle
				})
				willSavePro.save().then(()=>{
					res.json(getParam({addpro:true}))
				})
			}
		})
		
}
const updatePro = function(req, res){
	const { prostyle,descrption,gender, typestyle, prosimage} = req.body
	Genders.update({gender, typestyle, prostyle}, {descrption})
		.then(()=>{
			console.log(true)
			res.json(getParam({ prostyle,descrption,gender, typestyle, prosimage}))			
		})
}
const delPro = function(req, res){
	const {protext} = req.body
	console.log(protext)
   	Genders.remove({prostyle : protext})
   		.then((result)=>{
   			if(!result){
   				//console.log(result)
   				res.json(getParam({delstyle:true}))
   			}else{
   				//console.log(false)
   				res.json(getParam({delstyle:false}))
   			}
   		})
}
module.exports = { getPro, addPro, delPro, getSingl, updatePro}
