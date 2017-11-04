var Guanli2 = function(con){
	this.con=con||$('.list')
	this.init()
	this.bindEvents()
}
$.extend(Guanli2.prototype,{
	init(){
		this.createdom();
	},
	createdom(){
		this.con.find('.section').children().remove()
    var html = new EJS({url:'/admin/views/guanli2.ejs'}).render({

    })
    this.con.find('.section').append(html)
	},
	bindEvents(){

	}
});
