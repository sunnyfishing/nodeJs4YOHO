const express = require('express');
const path = require('path');
const apiRoute = require('./routes/api.js')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const ws = require('./socket/registerSocketServer.js');
const app = express();
const  websocket = require('express-ws')(app)
//设置访问静态资源的路径
app.use(express.static(path.join(__dirname,'public')))

//配置body解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//websocket
var i = 0
var clientMap = {}
app.ws('/ws',(ws,req)=>{
	ws.name = ++i;
	clientMap[ws.name] = ws
	for(var val in clientMap){
		console.log(val);
	}
	console.log('aaaaaaa');
	ws.on('message',(data)=>{
		for(var val in clientMap){
			clientMap[val].send(data)
		}
	})
	ws.on('close',(data)=>{
		delete clientMap[ws.name]
	})
})

//cookieSession
app.use(cookieSession({
	name:'session',
	secret:'yoho',
	maxAge:1000*60*60*24
}))

//使用路由
app.use('/api',apiRoute)

//监听端口
app.listen(process.env.PORT || 5000)
