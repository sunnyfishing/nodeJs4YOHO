var signUp = function(con){
	this.con=con||$('body')
	this.init()
}
$.extend(signUp.prototype ,{
	init(){
		this.createDom()
		this.bindEvents()
	},
	createDom(){
		var html = new EJS({url:'/admin/views/signUp.ejs'}).render({});
		this.con.append(html);
		this.login=$('.login');
		this.register=$('.register');
		this.textlogin=$('.header_login');
		this.username=$('input:eq(0)');
		this.password=$('input:eq(1)');
		this.repassword=$('input:eq(2)');
	},
	bindEvents(){
		this.login.on('click',$.proxy(this.toLogin,this))
		this.textlogin.on('click',$.proxy(this.toLogin,this))
		this.register.on('click',$.proxy(this.postregister,this))
		this.username.on('blur',$.proxy(this.findusername,this))
		this.password.on('blur',$.proxy(this.checkpassword,this))
		this.repassword.on('blur',$.proxy(this.checkrepassword,this))
		this.username.on('focus',$.proxy(this.cleartip,this))
		this.password.on('focus',$.proxy(this.cleartip,this))
		this.repassword.on('focus',$.proxy(this.cleartip,this))
	},
	toLogin(){
		this.con.find('.signup').remove();
		var html = new EJS({url:'/admin/views/header.ejs'}).render({
			username:'admin',
			isLogin:false,
			signUp:false
		})
		this.con.find('.navbar').remove();
		this.con.prepend(html);
		new signIn();
	},
	cleartip(e){
		$(e.target).next().hide().end().siblings('.help-block').css('visibility','hidden')
	},
	checkpassword(){
		if(this.password.val().length<6||this.password.val().length>18){
			this.password.next().show().attr('class','glyphicon glyphicon-remove form-control-feedback').css('color','#D9534F');
			this.password.siblings('.help-block').css('visibility','visible')
		}else{
			this.password.next().show().attr('class','glyphicon glyphicon-ok form-control-feedback').css('color','#414141');
			this.password.attr('state','1')
			this.showablebutton()
		}
	},
	checkrepassword(){
		if(this.password.val()==this.repassword.val()){
			this.repassword.next().show().attr('class','glyphicon glyphicon-ok form-control-feedback').css('color','#414141');
			this.repassword.attr('state','1')
			this.showablebutton()
		}else{
			this.repassword.next().show().attr('class','glyphicon glyphicon-remove form-control-feedback').css('color','#D9534F');
			this.repassword.siblings('.help-block').css('visibility','visible')
		}
	},
	findusername(){
		var value=this.username.val();
		if(value.trim()!=''){
			$.ajax({
				type:'get',
				url:'/api/users/findusername',
				data:{
					username:value
				},
				success:$.proxy(this.findusernameSuc,this)
			})
		}
	},
	findusernameSuc(data){
		if(data.data.state){
			this.username.next().show().attr('class','glyphicon glyphicon-ok form-control-feedback').css('color','#414141');
			this.username.attr('state','1')
			this.showablebutton()
		}else{
			this.username.next().show().attr('class','glyphicon glyphicon-remove form-control-feedback').css('color','#D9534F');
			this.username.siblings('.help-block').css('visibility','visible')
		}
	},
	showablebutton(){
		var input1 = this.username.attr('state');
		var input2 = this.password.attr('state');
		var input3 = this.repassword.attr('state');
		if(input1=='1'&&input2=='1'&&input3=='1'){
			this.register.removeAttr('disabled')
		}
	},
	postregister(e){
		e.preventDefault();
		$(e.target).text('注册中...').attr('disabled','disabled')
		$.ajax({
			type:'post',
			url:'/api/users/register',
			data:{
				username:this.username.val(),
				password:this.password.val()
			},
			success:$.proxy(this.registerRes,this)
		})
	},
	registerRes(data){
		if(data.data.state){
			this.register.text('注册成功，跳转中...')
			setTimeout(function(){
				window.location.reload()
			},1000)
		}
	}
});
