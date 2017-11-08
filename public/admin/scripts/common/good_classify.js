var Good_classify = function(con){
	this.con=con||$('.list')
	this.init()
}
$.extend(Good_classify.prototype,{
	init(){
		this.createdom()
		this.getGender();
	},
	//ok
	createdom(){
		var modal = new EJS({url:'/admin/views/modal/addModal.ejs'}).render({})
		$("body").append(modal)
//		var modal = new EJS({url:'/admin/views/modal/delgenderModal.ejs'}).render({})
//		$("body").append(modal)
//		this.con.find('.section').children().remove()
//  	var html = new EJS({url:'/admin/views/good_classify.ejs'}).render({
//			list:res.data.getres
//  	})
//
//  	this.con.find('.section').append(html)

    	//this.bindEvents()
	},
	bindEvents(){
		$("#addgender").on('click',this.clickaddModel.bind(this));
		$('.delgender').on('click',this.clickdelGender.bind(this));
		//$('.types').on('click', this.click2types.bind(this));
	},
	click2types(e){
		this.types = $(e.target).text()
		//new gender(this.con, this.types)
	},
	//ok
	clickaddModel(){
		$("#addModal").modal("show")
		//进行到这里应该是--从数据库中读取gender，看是否有重复---不对，现在是以数据库为空时的调用。所以可以直接打开style页面
		//$("#genderSave").on('click',this.addGender.bind(this))
		$("#genderSave").on('click',this.openStylePage.bind(this))
	},
	openStylePage(){
		new styles(this.con, gender)
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
	//ok
	addGender(){
		//添加成功后跳转到添加款式界面。
		this.gender = $("#gender").val()
		//$("#addModal").modal("hide")
		console.log('ok')
		$.ajax({
			url:'/api/list/addgender',
			type:'post',
			data:{
				gender:this.gender
			},
			success:this.addGenderSucc.bind(this)
		})
	},
	//ok
	addGenderSucc(res){
		if(res.data.save){
			$("#addModal").modal("hide")	
			//this.getGender();
			new styles(this.con, gender)
		}else{
			alert("款型已存在")
		}
	},
	getGender(){			//显示所有的gender
		 $.ajax({
		 	url:'/api/list/getGender',
		 	type:'post',
		 	success:this.handleGetGender.bind(this)
		 })
	},
	//ok
	handleGetGender(res){		
		//console.log(res.data.getres)
		//this.createdom()
		if(res.data.getres){		
			console.log(1)
		}else{						//当数据库为空时,直接调用添加框
			console.log(0)
			this.clickaddModel()
		}
		//this.createdom(res);
	}
});
