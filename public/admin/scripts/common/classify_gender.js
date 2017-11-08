const styles = function(container,gender){
	this.container = container || $('.list');
	this.gender = gender;
	//console.log('gender')
	this.init();
}
$.extend(styles.prototype,{
	init:function(){
		this.createDom()
		this.gettypes();
	},
	createDom:function(){
		var addtypesModal = new EJS({url:'/admin/views/modal/addtypes.ejs'}).render({})
		$('body').append(addtypesModal)
//		this.container.find('.section').children().remove()
//		var html = new EJS({url:'/admin/views/classify_gender.ejs'}).render({
//			gendertype,
//			gender
//		})
//		this.container.find('.section').html(html)
//		this.bindEvents()
	},
	bindEvents(){
		$("#addtypes").on('click',this.addtypes.bind(this))
	},
	addtypes(){
		$('#addtypesmodal').modal('show')
		//$('#typesSave').on('click',this.SaveBtn.bind(this))
		//不应该直接添加到数据库，应该跳转到添加pro页面
		$('#typesSave').on('click',this.openProPage.bind(this))
	},
	openProPage(){
		new product(this.container, this.gender, this.typestyle)
	},
	SaveBtn(){
		this.typestyle = $('#typestyle').val()
		$('#addtypesmodal').modal('hide')
		//new product(this.container, gender, typestyle)		
		$.ajax({
			url:'/api/type/addtypes',
			type:'post',
			data:{
				typestyle:this.typestyle,
				gender:this.gender
			},
			success:this.handleAddtypeSucc.bind(this)
		})
	},
	handleAddtypeSucc(res){
		//console.log(res)
		if(res.data.isSave){
			window.location.reload()
		}else{
			alert('添加失败')
		}
	},
	//ok
	gettypes(){			//获得数据库中的styles
		$.ajax({
			url:'/api/type/gettypes',
			type:'post',
			success:this.getbackSucc.bind(this)
		})
	},
	getbackSucc(res){		//获得后端数据之后判断是否为空，进行判断，
		if(res.data.exitTypes){			//不为空时进行渲染
			//this.createDom(this.type,res);
		}else{				//为空时，直接跳出添加页面
			this.addtypes()
		}
		//console.log(res.data)
		//this.createDom(this.type,res);
		
	}
	
})
