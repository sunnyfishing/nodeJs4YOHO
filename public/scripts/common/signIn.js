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
		var html = new EJS({url:'/views/signIn.ejs'}).render({});
		this.con.append(html);
		this.register=$('.register')
		this.textregister=$('.hearder_register');
	},
	bindEvents(){
		this.register.on('click',$.proxy(this.toRegister,this))
		this.textregister.on('click',$.proxy(this.toRegister,this))
	},
	toRegister(){
		this.con.find('.signin').remove();
		var html = new EJS({url:'../../views/header.ejs'}).render({
			username:'admin',
			isLogin:false,
			signUp:true
		})
		this.con.find('.navbar').remove();
		this.con.prepend(html);
		new signUp()
	}
});
