var Page = function(){
	this.init();
}
$.extend(Page.prototype,{
	init(){
		this.createheader();
		this.createlist();
	},
	createheader(){
		new Header();
	},
	createlist(){
		new List();
	}
});
