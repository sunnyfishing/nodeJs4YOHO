var Header = function(con){
	this.con=con||$('body')
	this.init()
}
$.extend(Header.prototype,{
	init(){
		this.createdom();
		this.bindEvents()
	},
	createdom(){
		var html = new EJS({url:'../../views/header.ejs'}).render({
			username:'admin',
			isLogin:false,
			signUp:false
		})
		this.con.prepend(html);
		this.textregister=$('.hearder_register');
		this.textlogin=$('.hearder_login');
	},
	bindEvents(){
		/*this.textregister.on('click',$.proxy(this.toLogin,this))
		this.textlogin.on('click',$.proxy(this.toRegister,this))*/
	},
});