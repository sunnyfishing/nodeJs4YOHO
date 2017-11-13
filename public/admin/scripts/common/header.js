var Header = function(con){
	this.con=con||$('body')
	this.init()
	this.bindEvents()
}
$.extend(Header.prototype,{
	init(){
		this.createdom();
	},
	createdom(){
		this.isLogin()
	},
	bindEvents(){
		// $(window).on('unload',$.proxy(this.close,this))
	},
	close(event){
		if(event.clientX>document.body.clientWidth&&event.clientY<0||event.altKey){
			$.ajax({
				type:'post',
				url:'/api/users/signout',
				success:$.proxy(this.signoutSuc,this)
			})
		}else if(event.clientY > document.body.clientHeight || event.altKey){

		}

	},
	signoutuser(){
		$.ajax({
			type:'post',
			url:'/api/users/signout',
			success:$.proxy(this.signoutSuc,this)
		})
	},
	signoutSuc(data){
		if(data.data.state){
			location.href='/admin/'
		}
	},
	isLogin(){
		$.ajax({
			type:'get',
			url:'/api/users/islogin',
			success:$.proxy(this.rerender,this)
		})
	},
	rerender(data){
		if(data.data.state&&location.pathname=='/admin/admin.html'){
			var html = new EJS({url:'views/header.ejs'}).render({
				username:data.data.username,
				isLogin:data.data.state,
				signUp:false
			})
			this.con.prepend(html);
			this.signout = $('.yessignout')
			this.signout.on('click',$.proxy(this.signoutuser,this))
		}
		if(location.pathname!='/admin/admin.html'&&!(data.data.state)){
			var html = new EJS({url:'views/header.ejs'}).render({
				username:data.data.username,
				isLogin:data.data.state,
				signUp:false
			})
			this.con.prepend(html);
			new signIn();
		}
		if(data.data.state&&location.pathname!='/admin/admin.html'){
			location.href='/admin/admin.html'
		}
		if(location.pathname=='/admin/admin.html'&&!(data.data.state)){
			location.href='/admin/index.html'
		}
	}
});
