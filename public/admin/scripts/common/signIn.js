var signIn = function(con){
	this.con=con||$('body')
	this.init()
}
$.extend(signIn.prototype ,{
	init(){
		this.createDom()
		this.bindEvents()
	},
	createDom(){
		var html = new EJS({url:'/admin/views/signIn.ejs'}).render({});
		this.con.append(html);
		this.register=$('.register');
		this.textregister=$('.hearder_register');
		this.login = $('.login');
		this.username=$('input:eq(0)');
		this.password=$('input:eq(1)');
	},
	bindEvents(){
		this.register.on('click',$.proxy(this.toRegister,this))
		this.textregister.on('click',$.proxy(this.toRegister,this))
		this.login.on('click',$.proxy(this.userLogin,this))
		this.username.on('input',$.proxy(this.checkclear,this))
		this.password.on('input',$.proxy(this.checkclear,this))
	},
	checkclear(){
		if(this.username.val().trim()!=''&&this.password.val().trim()!=''){
			this.login.removeAttr('disabled')
		}
	},
	toRegister(){
		this.con.find('.signin').remove();
		var html = new EJS({url:'/admin/views/header.ejs'}).render({
			username:'admin',
			isLogin:false,
			signUp:true
		})
		this.con.find('.navbar').remove();
		this.con.prepend(html);
		new signUp()
	},
	userLogin(e){
		e.preventDefault();
		this.login.text('登录中...').attr('disabled','disabled')
		$.ajax({
			type:'post',
			url:'/api/users/login',
			data:{
				username : this.username.val(),
				password : this.password.val()
			},
			success:$.proxy(this.userloginSuc,this)
		})
	},
	userloginSuc(data){
		if(data.data.state){
			location.href='/admin/admin.html'
		}else{
			this.login.text(data.data.content)
			setTimeout(function(){
				this.login.text('登录').removeAttr('disabled')
			}.bind(this),2000)
		}
	}
});
