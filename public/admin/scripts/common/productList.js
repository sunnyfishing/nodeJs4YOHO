// const product = function(container, gender, type){
// 	this.container = container
// 	this.gender = gender
// 	this.type = type
// 	this.init()
// }
//
// $.extend(product.prototype,{
// 	init(){
// 		this.createDOM()
// 		this.getProduct()
// 	},
// 	createDOM(){
// 		var addpro = new EJS({url:'/admin/views/modal/addpro.ejs'}).render({})
// 		$('body').append(addpro)
// //		this.container.find('.section').children().remove()
// //		var html = new EJS({url:'/admin/views/productList.ejs'}).render({})
// //		this.container.find('.section').html(html)
// //		this.bindEvent()
// 	},
// 	bindEvent(){
// 		$('#addpro').on('click',this.addpro)
// 	},
// 	getProduct(){
// 		$.ajax({
// 			url:'/api/pro/getPro',
// 			type:'post',
// 			success:this.handleGetproSucc.bind(this)
// 		})
// 	},
// 	handleGetproSucc(res){
// 		if(res.data.exitPro){			//如果能从后端返回结果，则去渲染DOM
// 			console.log(1)
// 		}else{				//否则弹出模态框进行添加
// 			//this.addpro()
// 			console.log(0)
// 		}
// 	},
// 	addpro(){
// 		$('#addprosmodal').modal('show')
// 		$('#prosSave').on('click',this.savePros.bind(this))
// 	},
// 	savePros(){
// 		var prostyle = $('#prostyle').val()
// 		var prosimage = $('#prosimage').val()
// 		var descrption = $('#descrption').val()
// 		$.ajax({
// 			url:'',
// 			type:'post',
// 			data:{
// 				prostyle
// 				prosimage
// 				descrption
// 			},
// 			success:this.handlesaveProsSucc.bind(this)
// 		})
// 	},
// 	handlesaveProsSucc(res){
// 		if(true){				//后端成功将数据保存到数据库,进行渲染DOM
// 			this.createDOM()
// 		}else{
// 			console.log(false)
// 		}
// 	}
// })
