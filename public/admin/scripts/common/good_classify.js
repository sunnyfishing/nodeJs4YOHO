var Good_classify = function(con){
	this.con=con||$('.list')
	this.init()
}
$.extend(Good_classify.prototype,{
	init(){
		//this.createdom()
		this.getGender();
	},
	createdom(res){
		var modal = new EJS({url:'/admin/views/modal/addModal.ejs'}).render({})
		$("body").append(modal)
		var modal = new EJS({url:'/admin/views/modal/delgenderModal.ejs'}).render({})
		$("body").append(modal)
		this.con.find('.section').children().remove()
    	var html = new EJS({url:'/admin/views/good_classify.ejs'}).render({
			list:res.data.getres
    	})
    	
    	this.con.find('.section').append(html)
    	
    	this.bindEvents()    	
	},
	bindEvents(){
		$("#addgender").on('click',this.clickaddModel.bind(this));
		$('.delgender').on('click',this.clickdelGender.bind(this));
		$('.types').on('click', this.click2types.bind(this));
	},
	click2types(e){
		this.types = $(e.target).text()
		new gender(this.con, this.types)
	},
	clickaddModel(){
		$("#addModal").modal("show")
		$("#genderSave").on('click',this.addGender.bind(this))
	},
	clickdelGender(e){
		this.gendertext = $(e.target).prev().text()	//获得点击对象的前一个按钮的值，并传递各后端
		$("#delgendermodal").modal("show")
		$("#delGenderYes").on('click',this.delGender.bind(this))
				
	},
	delGender(){//删除，请求后端数据库
		$.ajax({
			url:'/api/list/delgender',
			type:'post',
			data:{
				gendertext:this.gendertext
			},
			success:this.delGenderSucc.bind(this)
		})		
	},
	delGenderSucc(res){
		if(res.data.delgender){
			$("#delgendermodal").modal("hide")
			window.location.reload()
		}else{
			console.log("删除失败")
		}
		
	},
	addGender(){
		var gendertype = $("#gender").val()
		$("#gender").val('')
		$.ajax({
			url:'/api/list/addgender',
			type:'post',
			data:{
				gendertype
			},
			success:this.addGenderSucc.bind(this)
		})
	},
	addGenderSucc(res){
		if(res.data.save){
			this.getGender();
			$("#addModal").modal("hide")	//BUG 保存后页面仍为黑色
		}else{
			alert("用户名已存在")
		}
	},
	getGender(){
		$.ajax({
			url:'/api/list/gender',
			type:'post',
			success:this.handleGetGender.bind(this)
		})
	},
	handleGetGender(res){
		this.createdom(res);
	}
});
