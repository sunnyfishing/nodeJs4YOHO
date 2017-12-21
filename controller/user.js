/*const bcrypt = require('bcrypt')*/
const User = require('../model/user.js')
const { getParam } = require('../utils/utils.js')
const async=require('async')

var pageSize=1
const register = function(req,res){
	const {username,password,roles,phone,createTime} = req.body;
	/*bcrypt.hash(password, 10)
    .then((password) => {*/
        const willSaveUser = new User({
          	username,
         		password,
          	roles:!!roles?roles:'1',
						phone,
						createTime
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

const showUser=function(req,res,next){
  const {pageNo} =req.body
  async.parallel([
    function(cb){
      User.find({})
        .then((re) => {
          cb(null,Math.ceil(re.length/pageSize))
        })
    },
    function(cb){
      User.find({})
        .limit(pageSize)
        .then((result) => {
          cb(null,result)
        })
    }
  ],function(err,re){
    if(!!err){
      console.log(err);
    }else {
      res.json(getParam({
        result:re[1],
        pageCount:re[0],
        pageNo,
				totalPage:re[0]*pageSize
      }))
    }
  })
}

const deleteUser=function(req,res,next){
	const {id} = req.body
	User.findOneAndRemove(id)
		.then((re) => {
			if(!!re){
				res.json(true)
			}else{
				res.json('删除失败！')
			}
		})
}

const shearchUser=function(req,res,next){
  const {vital,term,pageNo,pageSize,id} = req.body
	if(!!id){
		User.findOneAndRemove(id)
			.then((re) => {
				if(!!re){
					res.json(getParam({
            isSearched:true,
            result:re[0].slice((pageNo-1)*pageSize,pageNo*pageSize),
            pageNo:1,
            pageCount:Math.ceil(re[0].length/pageSize),
            vital,
						totalPage:re[0].length
          }))
				}else{
					res.json('删除失败！')
				}
			})
	}
  if(!!vital){
    async.series([
      function(cb){
        User.find({})
          .then((re) => {
            if(!!re){
              let res_arr=re.filter((item) => {
                return (item[term]+'').indexOf(vital)!=-1
              })
              cb(null,res_arr)
            }else{
              res.json({isSearched:false,re:[]})
              return
            }
          })
      }
    ],function(err,re){
      if(err){
        console.log(err);
      }else{
        if(re[0].length<=pageSize){
          res.json(getParam({
            isSearched:true,
            result:re[0],
            pageNo:1,
            pageCount:Math.ceil(re[0].length/pageSize),
            vital,
						totalPage:re[0].length
          }))
        }else{
          res.json(getParam({
            isSearched:true,
            result:re[0].slice((pageNo-1)*pageSize,pageNo*pageSize),
            pageNo:1,
            pageCount:Math.ceil(re[0].length/pageSize),
            vital,
						totalPage:re[0].length
          }))
        }
      }
    })
  }else{
     async.parallel([
       function(cb){
         User.find({})
          .then((re) => {
            cb(null,re.length)
          })
       },
       function(cb){
         User.find({})
         .skip(pageSize*(pageNo-1))
         .limit(pageSize)
         .then((re) => {
           cb(null,re)
         })
       }
     ],function(err,re){
       if(err){
         console.log(err);
       }else{
         res.json(getParam({
           result:re[1],
           pageNo,
           pageCount:Math.ceil(re[0]/pageSize),
					 totalPage:re[0]
         }))
       }
     })
  }
}

module.exports={register,finduser,login,islogin,signout,showUser,shearchUser}
