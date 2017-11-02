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
		var html = new EJS({url:'/views/signUp.ejs'}).render({});
		this.con.append(html);
		this.login=$('.login')
		this.textlogin=$('.header_login');
	},
	bindEvents(){
		this.login.on('click',$.proxy(this.toLogin,this))
		this.textlogin.on('click',$.proxy(this.toLogin,this))
	},
	toLogin(){
		this.con.find('.signup').remove();
		var html = new EJS({url:'../../views/header.ejs'}).render({
			username:'admin',
			isLogin:false,
			signUp:false
		})
		this.con.find('.navbar').remove();
		this.con.prepend(html);
		new signIn();
	}
});
