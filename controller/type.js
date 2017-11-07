const Genders = require('../model/list.js');
const { getParam } = require('../utils/utils.js');

const gettypes = function(req, res){
	//console.log(req.body.type)
	const { types } = req.body
	//查找数据库
	Genders.findOne({types})
		.then((result)=>{
			if(!result){		//当查找的gender文档不存在时
				res.json(getParam({exitTypes:false}))
			}else{
				const obj = result.types
				res.json(getParam({exitTypes:true, types:obj}))
			}
		})
}
const addtypes = function(req, res){
	const {typestyle, typeimage, descrption} = req.body
	
	//console.log(typestyle)
	Genders.update({'types': { $elemMatch:{ typestyle : typestyle } }})
		.then((result)=>{
			if(!result){
				console.log(1)
				res.json(getParam({isSave:true}))
			}else{
				console.log(0)
				res.json(getParam({isSave:false}))
			}
		})
}

module.exports = {gettypes, addtypes}