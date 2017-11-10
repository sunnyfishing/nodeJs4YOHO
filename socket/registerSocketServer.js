var webSocket = require('ws').Server
var ws=new webSocket({port:7000})

var clientMap=new Object()
var id=0

ws.on('connection',function(ws){
  ws.name=++id
  clientMap[ws.name]=ws

  ws.on('message',(data)=>{
    console.log(data)
    broadcast(data)
  })
  ws.on('close',function(data){
    delete clientMap[ws.name]
  })
})

function broadcast(data) {
  for (var value in clientMap) {
    clientMap[value].send('用户<'+ data + '>刚刚注册了账号！')
  }
}
