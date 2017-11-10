var Users = function(con){
	this.con=con||$('.list')
	this.init()
}
$.extend(Users.prototype,{
	init(){
    this.getUserInfo();
		this.user_badge();
	},
	user_badge(){
		$('body').find('.user_badge').attr('class','animated rotateOut user_badge badge')
		let timer_lelay=setTimeout(function(){
			$('body').find('.user_badge').text('').attr('class','animated bounceIn user_badge badge')
		},1000)
	},
	createdom(re){
		this.con.find('.section').children().remove()
    var html = new EJS({url:'/admin/views/users.ejs'}).render({
      result:re.result,
      pageNo:re.pageNo,
      pageCount:re.pageCount,
			pageSize:!!this.pageSize?this.pageSize:1,
			totalPage:this.totalPage
    })
    this.con.find('.section').append(html)
	},
	bindEvents(pageNo){
    $('#search_btn').unbind('click').on('click',this.pageUser.bind(this,pageNo))
    $('#pageItems').unbind('click').on('click',this.pageUser.bind(this,pageNo))
		$('#pageSize').unbind('click').on('click',$.proxy(this.pageSizeEvent,this))
		$('#tableInfo').unbind('click').on('click',$.proxy(this.deleteEvent,this))
	},
	pageSizeEvent(e){
		if($(e.target).parent('ul')){
			let pageSize=$(e.target).text()
			$('.showPageSize').html(pageSize+' <span class="caret"></span>')
			this.pageSize=pageSize
			this.searchUser()
		}
	},
	deleteEvent(e){
		if($(e.target).text().indexOf('删除')!=-1){
			let id=$(e.target).closest('tr').find('td').eq(0).text()
			this.deleteUser(id)
		}
	},
	deleteUser(id){
		this.searchUser(this.pageNo,id)
	},
  pageUser(pageNo,e){
    let pageClick=$(e.target).closest('li').attr('id')
    let pageLength=$('#pageItems').find('li').length-2
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
  searchUser(pageNo,id){
    let vital=$('#vital').val()
    let term = $('#term').val()
    $.ajax({
      url:'/api/users/shearchUser',
      data:{
        vital,
        term,
        pageNo,
				pageSize:!!this.pageSize?this.pageSize:3,
				id:!!id?id:''
      },
      type:'post',
      success:(re) => {
				console.log(re);
				this.totalPage=re.data.totalPage
				this.pageCount=re.data.pageCount
				this.pageNo=re.data.pageNo
        this.createdom(re.data);
        this.bindEvents(re.data.pageNo)
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
				this.totalPage=result.data.totalPage
				this.pageCount=result.data.pageCount
				this.pageNo=result.data.pageNo
        this.createdom(result.data);
        this.bindEvents(result.data.pageNo)
      }
    })
  }
});
