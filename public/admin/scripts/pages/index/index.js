var Page = function(){
	this.init();
}
$.extend(Page.prototype,{
	init(){
		this.createheader();
	},
	createheader(){
		new Header();
	}
});
