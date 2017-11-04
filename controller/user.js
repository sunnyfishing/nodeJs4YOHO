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
          	roles:'1'
        })
        console.log(willSaveUser)
        willSaveUser.save().then(() => {
        	res.json(getParam({state: true,use:'register'}))
        })
   /* })*/
}
const finduser = function(req,res){
	let username = req.query.username;
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
const login = function(req,res){
	const {username,password} = req.body
	User.findOne({username})
	.then((result)=>{
		var data = {
			use:'login',
			state:true,
			content:''
		}
		if(result){
			// bcrypt.compare(password,result.password)
			// .then((bool)=>{
				if(password == result.password){
					if(result.roles == '1'){
						data.state = true
						data.content = '登录成功！'
						req.session.username = username
					}else{
						data.state = false
						data.content = '权限不够，请登录用户端！'
					}
				}else{
					data.state = false
					data.content = '用户名或密码错误！'
				}
			// })
		}else{
			data.state = false
			data.content = '用户名或密码错误！'
		}
		res.json(getParam(data))
	})
}
const islogin = function(req,res){
	res.json(getParam({
		state:req.session.username ? true : false,
		use:'islogin',
		username:req.session.username
	}))
}
const signout = function(req,res){
	req.session.username=null;
	res.json(getParam({
		state:true,
		use:'signout',
	}))
}
module.exports={register,finduser,login,islogin,signout}
