const Genders = require('../model/list.js');
const { getParam } = require('../utils/utils.js');

const gettypes = function(req, res){
	const { gender } = req.body
	//查找数据库
	Genders.find({gender})
		.then((result)=>{
			if(result.length != 0){		//当数据库存在对应的gender时
				res.json(getParam({exitTypes:result}))
			}else{			//数据库中没有传入的gender时
				res.json(getParam({exitTypes:false}))
			}
		})
}
const addtypes = function(req, res){
	console.log(req.body)
	
	const { typestyle, gender} = req.body
	
	Genders.findOne({gender, typestyle })
		.then((result)=>{
			if(result){				//如果在数据库中有gender, typestyle, prostyle相同的
				res.json(getParam({addtypes:false}))
			}else{
				var willSavePro = new Genders({
					gender, 
					typestyle
				})
				willSavePro.save().then(()=>{
					res.json(getParam({addtypes:true}))
				})
			}
		})
}
const deltypes = function(req, res){
	const {styletext} = req.body
	console.log(styletext)
   	Genders.remove({typestyle : styletext})
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
module.exports = {gettypes, addtypes, deltypes}