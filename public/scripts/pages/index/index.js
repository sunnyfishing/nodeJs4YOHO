var Page = function(){
	this.init();
}
$.extend(Page.prototype,{
	init(){
		console.log(1)
		this.createheader();
		this.createsignIn();
	},
	createheader(){
		new Header();
	},
	createsignIn(){
		new signIn();
	}
});
