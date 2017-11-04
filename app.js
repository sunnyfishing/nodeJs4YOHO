const express = require('express');
const path = require('path');
const apiRoute = require('./routes/api.js')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const app = express();
//设置访问静态资源的路径
app.use(express.static(path.join(__dirname,'public')))

//配置body解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//cookie session 中间件
app.use(cookieSession({
	name:'session',
	secret:'some random charactors',
	maxAge:1000*60*60*24
}))

//cookieSession
app.use(cookieSession({
	name:'session',
	secret:'yoho',
	maxAge:1000*60*60*24
}))

//使用路由
app.use('/api',apiRoute)

//监听端口
app.listen(process.env.PORT || 4000)
