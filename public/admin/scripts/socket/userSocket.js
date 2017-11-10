function userSocket(newcontainer){
  const container=!!newcontainer || $('body')
  var new_res_count=0
  var ws =new  WebSocket('ws://localhost:7000')
  ws.onopen=function(){
    console.log('我在userSocket的连接时触发');
  }
  ws.onmessage=function(data){
    new_res_count++
    render_user_pao()
  }
  ws.onerror=function(err){
    console.log(err)
  }
  ws.onclose=function(){
    console.log('我关闭了')
  }
  function render_user_pao(){
    let new_res_ly=new_res_count
    if(!new_res_count){
      new_res_ly=''
    }else{
      var ele =container.find('.user_badge').text(new_res_ly)
      badge_animation(container.find('.user_badge'))
    }
  }
  function badge_animation(ele){
    var timer_badge=setInterval(()=>{
      container.find('.user_badge').toggleClass('animated bounceIn')
    },2000)
  }
}
