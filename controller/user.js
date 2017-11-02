const url = require('url')
/*const bcrypt = require('bcrypt')*/
const User = require('../model/user.js')
const { getParam } = require('../utils/utils.js')

const register = function(req,res){
	const {username,password} = req.body;
	/*bcrypt.hash(password, 10)
    .then((password) => {*/
        const willSaveUser = new User({
          	username,
         	password,
         	phone:8888,
          	roles:'1'
        })
        console.log(willSaveUser)
        willSaveUser.save().then(() => {
        	console.log(1)
        	res.json(getParam({state: true,use:'register'}))
        })
   /* })*/
}
const finduser = function(req,res){
	let username = url.parse(req.url,true,true).query.username;
	User.findOne({username})
	.then((result)=>{
		var data = {};
		if(result){
			data={
				state:false,
				use:'finduser'
			}
		}else{
			data={
				state:true,
				use:'finduser'
			}
		}
		res.json(getParam(data))
	})
}
module.exports={register,finduser}
