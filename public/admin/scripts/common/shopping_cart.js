var Shopping_cart = function(con){
	this.con=con||$('.list')
	this.init()
	this.bindEvents()
}
$.extend(Shopping_cart.prototype,{
	init(){
		this.createdom();
	},
	createdom(){
		this.con.find('.section').children().remove()
    var html = new EJS({url:'/admin/views/shopping_cart.ejs'}).render({

    })
    this.con.find('.section').append(html)
	},
	bindEvents(){

	}
});
