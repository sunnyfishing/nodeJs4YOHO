const gender = function(container,type){
	this.container = container || $('.list');
	this.type = type;
	this.init();
}
$.extend(gender.prototype,{
	init:function(){
		//console.log(this.type)
		this.gettypes();
	},
	createDom:function(gender, gendertype){
		var addtypesModal = new EJS({url:'/admin/views/modal/addtypes.ejs'}).render({})
		$('body').append(addtypesModal)
		this.container.find('.section').children().remove()
		var html = new EJS({url:'/admin/views/classify_gender.ejs'}).render({
			gendertype,
			gender
		})
		this.container.find('.section').html(html)
		this.bindEvents()
	},
	bindEvents(){
		$("#addtypes").on('click',this.addtypes.bind(this))
	},
	addtypes(){
		$('#addtypesmodal').modal('show')
		$('#typesSave').on('click',this.SaveBtn.bind(this))
	},
	SaveBtn(){
		$('#addtypesmodal').modal('hide')
		var typestyle = $('#typestyle').val()
		var typeimage = $('#typeimage').val()
		var descrption = $('#descrption').val()
		$.ajax({
			url:'/api/type/addtypes',
			type:'post',
			data:{
				typestyle,
				typeimage,
				descrption
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
	gettypes(){
		this.getfromback();
		
	},
	getfromback(){
		$.ajax({
			url:'/api/type/gettypes',
			type:'post',
			data:{
				types:this.type
			},
			success:this.getbackSucc.bind(this)
		})
	},
	getbackSucc(res){
		//console.log(res.data)
		this.createDom(this.type,res);
		
	}
	
})
