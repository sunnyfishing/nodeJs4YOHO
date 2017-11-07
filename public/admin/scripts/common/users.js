var Users = function(con){
	this.con=con||$('.list')
	this.init()
}
$.extend(Users.prototype,{
	init(){
    this.getUserInfo();
	},
	createdom(re){
		this.con.find('.section').children().remove()
    var html = new EJS({url:'/admin/views/users.ejs'}).render({
      result:re.result,
      pageNo:re.pageNo,
      pageCount:re.pageCount
    })
    this.con.find('.section').append(html)
	},
	bindEvents(pageNo){
    $('#search_btn').unbind('click').on('click',this.pageUser.bind(this,pageNo))
    $('#pageItems').unbind('click').on('click',this.pageUser.bind(this,pageNo))
	},
  //接受不到参数
  pageUser(pageNo,e){
    let pageClick=$(e.target).closest('li').attr('id')
    let pageLength=$('#pageItems').find('li').length-2
    // console.log(pageLength);
    console.log(this.pageCount);
    let oldPageNo=pageNo
    let newPageNo=0
    if(pageClick=='back'){
      newPageNo=--oldPageNo==0?1:oldPageNo
    }else if(pageClick=='next'){
      newPageNo=++oldPageNo>pageLength?pageLength:oldPageNo
    }else{
      newPageNo=pageClick
    }
    if(typeof newPageNo =='undefined'){
      newPageNo=oldPageNo
    }
    this.searchUser(Number(newPageNo))
  },
  searchUser(pageNo){
    let vital=$('#vital').val()
    let term = $('#term').val()
    $.ajax({
      url:'/api/users/shearchUser',
      data:{
        vital,
        term,
        pageNo
      },
      type:'post',
      success:(re) => {
        this.createdom(re.data);
        this.bindEvents(re.data.pageNo)
        this.pageCount=re.data.pageCount
        $('#vital').val(re.data.vital)
      }
    })
  },
  getUserInfo(){
    $.ajax({
      url:'/api/users/showUser',
      type:'post',
      data:{
        pageNo:1
      },
      success:(result) => {
        this.createdom(result.data);
        this.bindEvents(result.data.pageNo)
        this.pageCount=result.data.pageCount
      }
    })
  }
});
