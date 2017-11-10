<<<<<<< HEAD
const product = function(container, gender, typestyle){
	this.container = container
	this.gender = gender
	this.typestyle = typestyle
	this.init()
}

$.extend(product.prototype,{
	init(){
		this.getProduct()
	},
	//向body添加模态框
	createModal(){
		var addpro = new EJS({url:'/admin/views/modal/addpro.ejs'}).render({})
		$('body').append(addpro)		
	},
	//将数据模板添加到body上
	createDOM(prosArr){
		this.container.find('.section').children().remove()
		var html = new EJS({url:'/admin/views/productList.ejs'}).render({
			prosArr,
			gender:this.gender,
			type:this.typestyle
		})
		this.container.find('.section').html(html)
		this.bindEvent()
	},
	//点击事件
	bindEvent(){
		$('#addprobtn').on('click',this.toaddpro.bind(this))
		$('#back2style').on('click',this.back2Style.bind(this))
		$('.back2gender').on('click',this.back2gender.bind(this))
		$('.delpro').on('click',this.click2Delpro.bind(this))
		$('.updatepro').on('click',this.click2update.bind(this))
	},
	//修改数据
	click2update(e){
		this.prostyle = $(e.target).parent().parent().find('.prostyle').text()
		this.getsinglePro()
	},
	//获得单个数据的信息
	getsinglePro(){
		$.ajax({
			url:'/api/pro/getSingl',
			type:'get',
			data:{
				prostyle:this.prostyle,
				gender:this.gender,
				typestyle:this.typestyle 
			},
			success:this.handleGetSingSucc.bind(this)
		})
	},
	//单个数据获得成功
	handleGetSingSucc(res){
		//console.log(res)
		this.createModal(true)
		$('#addprosmodal').modal('show')
		$('#prostyle').val(res.data.getSing.prostyle)
		$('#descrption').val(res.data.getSing.descrption)
		this.prosimage = res.data.getSing.prosimage
		$('#prosSave').on('click',this.chanPros.bind(this))
	},
	chanPros(){
		$('#addprosmodal').modal('hide')
		this.prostyle = $('#prostyle').val()
		this.descrption = $('#descrption').val()
		$.ajax({
			url:'/api/pro/updatePro',
			type:'post',
			data:{
				prosimage:this.prosimage,
				prostyle:this.prostyle,
				descrption:this.descrption,
				gender:this.gender,
				typestyle:this.typestyle
			},
			success:this.handleupdateSucc.bind(this)
		})
	},
	handleupdateSucc(res){
		console.log(res)		//可以成功获得保存后的数据
		new product(this.container, this.gender, this.typestyle)
	},
	//点击删除按钮
	click2Delpro(e){
		//console.log(1)
		this.protext = $(e.target).parent().parent().find('.prostyle').text()	//获得点击对象的前一个按钮的值，并传递各后端
		$("#delgendermodal").modal("show")
		$("#delGenderYes").on('click',this.delPro.bind(this))
	},
	//隐藏删除框并删除数据
	delPro(){
		$("#delgendermodal").modal("hide")
		$.ajax({
			url:'/api/pro/delPro',
			type:'post',
			data:{
				protext:this.protext
			},
			success:this.delProSucc.bind(this)
		})
	},
	//删除成功
	delProSucc(res){
		if(!res.data.delgender){
			new product(this.container, this.gender, this.typestyle)
		}else{
			console.log("删除失败")
		}
	},
	//返回到style
	back2Style(){
		new styles(this.container,this.gender)
	},
	//返回到gender
	back2gender(){
		new Good_classify()
	},
	//获得商品列表
	getProduct(){
		$.ajax({
			url:'/api/pro/getPro',
			type:'post',
			data:{
				gender:this.gender,
				typestyle:this.typestyle 
			},
			success:this.handleGetproSucc.bind(this)
		})
	},
	//获得商品信息
	handleGetproSucc(res){
		this.createModal()
		if(!res.data.exitPro){		//false	数据库为空
			this.toaddpro()
		}else{						//true 数据库有数据
			var arr = res.data.exitPro
			for(var i=0; i<arr.length; i++){
				arr[i].prosimage = '/admin/images/'+arr[i].prosimage
			}
			this.createDOM(res.data.exitPro)
		}
	},
	//显示添加模态框
	toaddpro(){
		$('#addprosmodal').modal('show')
		$('#prostyle').val('')
		$('#prosimage').val('')
		$('#descrption').val('')
		$('#prosSave').on('click',this.savePros.bind(this))
	},
	//添加数据
	savePros(){
		this.prostyle = $('#prostyle').val()
		this.descrption = $('#descrption').val()
		this.prosimage = $('#prosimage').get(0).files[0].name
		$.ajax({
			url:'/api/pro/addPro',
			type:'post',
			data:{
				prosimage:this.prosimage,
				prostyle:this.prostyle,
				descrption:this.descrption,
				gender:this.gender,
				typestyle:this.typestyle
			},
			success:this.handlesaveProsSucc.bind(this)
		})
	},
	//成功添加数据
	handlesaveProsSucc(res){
		if(res.data.addpro){				//后端成功将数据保存到数据库,调用get函数获取数据库中的数据
			this.doModal()
			this.getProduct()
		}else{
			//console.log('添加失败')
		}
	},
	//隐藏之前添加的模态框
	doModal(){
		$('#addprosmodal').modal('hide')
		$('#addtypesmodal').modal('hide')
		$('#addModal').modal('hide')
		$('#gender').val('')
		$('#typestyle').val('')
		$('#prostyle').val('')
		$('#prosimage').val('')
		$('#descrption').val('')
	}
})