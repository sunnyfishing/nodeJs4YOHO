var Guanli1 = function(con){
	this.con=con||$('.list')
	this.init()
	this.bindEvents()
}
$.extend(Guanli1.prototype,{
	init(){
		this.createdom();
	},
	createdom(){
		this.con.find('.section').children().remove()
    var html = new EJS({url:'/admin/views/guanli1.ejs'}).render({

    })
    this.con.find('.section').append(html)
	},
	bindEvents(){

	}
});
