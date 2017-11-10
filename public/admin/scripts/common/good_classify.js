var Good_classify = function(con){
	this.con=con||$('.list')
	this.init()
}
$.extend(Good_classify.prototype,{
	init(){
		this.getGender();
	},
	//ok
	createModal(){
		var modal = new EJS({url:'/admin/views/modal/addModal.ejs'}).render({})
		$("body").append(modal)
		var modal = new EJS({url:'/admin/views/modal/delModal.ejs'}).render({})
		$("body").append(modal)
	},
	createDOM(gender){
		this.con.find('.section').children().remove()
    	var html = new EJS({url:'/admin/views/good_classify.ejs'}).render({
			list:gender
    	})

    	this.con.find('.section').append(html)

    	this.bindEvents()
	},
	bindEvents(){
		$("#addgender").unbind().on('click',this.clickaddModel.bind(this));
		$('.delgender').unbind().on('click',this.clickdelGender.bind(this));
		$('.types').unbind().on('click', this.click2types.bind(this));
	},
	click2types(e){		//点击gender名，到gender对应的下一个目录
		this.types = $(e.target).text()
		new styles(this.con, this.types)
	},
	//ok
	clickaddModel(){
		$("#addModal").modal("show")
		//进行到这里应该是--从数据库中读取gender，看是否有重复---不对，现在是以数据库为空时的调用。所以可以直接打开style页面
		$("#genderSave").unbind().on('click',this.openStylePage.bind(this))
	},
	openStylePage(){
		this.gender = $("#gender").val()
		$("#addModal").modal("hide")
		new styles(this.con, this.gender)
	},
	clickdelGender(e){
		this.gendertext = $(e.target).prev().text()	//获得点击对象的前一个按钮的值，并传递各后端
		//console.log(this.gendertext)
		$("#delgendermodal").modal("show")
		$("#delGenderYes").unbind().on('click',this.delGender.bind(this))
	},
	delGender(){//删除，请求后端数据库
		$("#delgendermodal").modal("hide")
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
			window.location.reload()
			//new Good_classify()
		}else{
			console.log("删除失败")
		}
	},
	//ok
	addGender(){
		//添加成功后跳转到添加款式界面。
		this.gender = $("#gender").val()
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
			new styles(this.con, gender)
		}else{
			alert("款型已存在")
		}
	},
	//获取数据库中的所有gender
	getGender(){			//显示所有的gender
		 $.ajax({
		 	url:'/api/list/getGender',
		 	type:'post',
		 	success:this.handleGetGender.bind(this)
		 })
	},
	//处理从数据库中得到的数据
	handleGetGender(res){		
		this.createModal()
		if(res.data.getres){		//当数据库中存在数据时，进行判断是否为重复的gender，若重复跳过
			var genderArr=[]
			var getArr = res.data.getres
			for(var i=0; i<getArr.length; i++){
				for(var j=0; j<=genderArr.length; j++){
					if(genderArr[j]==getArr[i].gender){		//有重复，不添加
						break
					}else{									//无重复，添加
						genderArr.push(getArr[i].gender)
						break
					}
				}
			}
			this.createDOM(genderArr)
		}else{						//当数据库为空时,直接调用添加框
			this.clickaddModel()
		}
	}
});
