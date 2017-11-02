const { getParam } = require('../utils/utils.js')
const signUp = function(req,res){
	console.log(req.body.username)
}

module.exports={signUp}
