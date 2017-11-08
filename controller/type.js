const Genders = require('../model/list.js');
const { getParam } = require('../utils/utils.js');

const gettypes = function(req, res){
	//const { styles } = req.body
	//查找数据库
	Genders.find()
		.then((result)=>{
			if(result.length != 0){		//当数据库中有styles时
				res.json(getParam({exitTypes:true}))
			}else{			//数据库中没有对应的styles时，返回false
				res.json(getParam({exitTypes:false}))
			}
		})
}
const addtypes = function(req, res){
	const { typestyle, gender} = req.body
	
	
//	Genders.update({'types': { $elemMatch:{ typestyle : typestyle } }})
//		.then((result)=>{
//			if(!result){
//				console.log(1)
//				res.json(getParam({isSave:true}))
//			}else{
//				console.log(0)
//				res.json(getParam({isSave:false}))
//			}
//		})
}

module.exports = {gettypes, addtypes}