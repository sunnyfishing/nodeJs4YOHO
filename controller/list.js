const Genders = require('../model/list.js')
const { getParam }= require('../utils/utils.js')

const getGender = function(req, res){		//显示所有
  	//const { gender } = req.body
  	Genders.find()
   		.then((result)=>{
   			//console.log(result)
   			if(result.length != 0){
   				//console.log(1)
   				res.json(getParam({getres:result}))
   			}else{
   				//console.log(0)
   				res.json(getParam({getres:false}))
   			}
   		})
}
const addgender = function(req,res){
  	const { gender } = req.body
   	Genders.findOne({ gender })
   		.then((result)=>{
   			if(result){		//当查找到数据库中存在相同的标识时
   				console.log(0)
   				//res.json(getParam({save : false}))
   			}else{			//当无相同数据时，将该数据存入数据库
   				console.log(1)
   				const willSaveGender = new Genders({
   					gender
   				})
   				console.log(willSaveGender)
   				willSaveGender.save().then(()=>{
   					console.log(2)
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
