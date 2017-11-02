var Page = function(){
	this.init();
}
$.extend(Page.prototype,{
	init(){
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
