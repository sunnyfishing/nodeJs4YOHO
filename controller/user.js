const {getParam} = require('../utils/utils.js');

const signUp = function(req,res){
	const username = req.body.userName
	const password = req.body.password
	const email = req.body.email
	
	res.json(getParam({username ,success:true}))
}

module.exports = {signUp};
