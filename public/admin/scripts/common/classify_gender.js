const styles = function(container,gender){
	this.container = container || $('.list');
	this.gender = gender;
	this.init();
}
$.extend(styles.prototype,{
	init:function(){
		this.gettypes();
	},
	//添加模态框
	createModal(){
		var addtypesModal = new EJS({url:'/admin/views/modal/addtypes.ejs'}).render({})
		$('body').append(addtypesModal)
		var modal = new EJS({url:'/admin/views/modal/delModal.ejs'}).render({})
		$("body").append(modal)
	},
	//添加模板
	createDom(gender,gendertype){
		this.container.find('.section').children().remove()
		var html = new EJS({url:'/admin/views/classify_gender.ejs'}).render({
			gendertype,
			gender
		})
		this.container.find('.section').html(html)
		this.bindEvents()
	},
	//事件
	bindEvents(){
		$("#addtypes").on('click',this.addtypes.bind(this))
		$(".checkpro").on('click',this.checkpros.bind(this))
		$('.back2gender').on('click',this.back2Gender.bind(this))
		$('.delstyle').on('click',this.clickDelStyle.bind(this))
	},
	//点击删除
	clickDelStyle(e){
		this.styletext = $(e.target).parent().prev().text()	//获得点击对象的前一个按钮的值，并传递各后端
		//console.log(this.styletext)
		$("#delgendermodal").modal("show")
		$("#delGenderYes").on('click',this.delStyle.bind(this))
	},
	//删除数据库
	delStyle(){
		$("#delgendermodal").modal("hide")
		$.ajax({
			url:'/api/type/deltypes',
			type:'post',
			data:{
				styletext:this.styletext
			},
			success:this.delStyleSucc.bind(this)
		})
	},
	//删除成功，刷新页面
	delStyleSucc(res){
		if(!res.data.delgender){
			window.location.reload()
			//new styles(this.con, this.gender)
		}else{
			console.log("删除失败")
		}
	},
	//刷新页面
	back2Gender(){
		new Good_classify()
	},
	//添加product
	checkpros(e){
		this.styleName = $(e.target).parent().prev().text()
		new product(this.container, this.gender, this.styleName)
	},
	//添加types
	addtypes(){
		$('#addtypesmodal').modal('show')
		//不应该直接添加到数据库，应该跳转到添加pro页面
		$('#typesSave').on('click',this.openProPage.bind(this))
	},
	//打开product页面
	openProPage(){
		this.typestyle = $('#typestyle').val()
		//console.log(this.typestyle)
		$('#addtypesmodal').modal('hide')
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
			data:{
				gender:this.gender
			},
			success:this.getbackSucc.bind(this)
		})
	},
	getbackSucc(res){		//获得后端数据之后判断是否为空，进行判断，
		this.createModal()
		if(!res.data.exitTypes){		//数据库为空时，返回false，然后判断条件就是true		
			this.addtypes()
		}else{
			var genderArr=[]
			var getArr = res.data.exitTypes
			for(var i=0; i<getArr.length; i++){
				for(var j=0; j<=genderArr.length; j++){
					if(genderArr[j]==getArr[i].typestyle){		//有重复，不添加
						break
					}else{									//无重复，添加
						genderArr.push(getArr[i].typestyle)
						break
					}
				}
			}
			console.log(genderArr)
			this.createDom(this.gender,genderArr);
		}
	}
})
