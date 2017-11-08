const Genders = require('../model/list.js');
const { getParam } = require('../utils/utils.js');

const getPro =function(req, res){
	//const { pro } = req.body
	
	Genders.find()
		.then((result)=>{
			if(result.length != 0){			//当数据库中存在pro产品时
				res.json(getParam({exitPro:true}))
			}else{
				res.json(getParam({exitPro:false}))
			}
		})
}

module.exports = { getPro }
