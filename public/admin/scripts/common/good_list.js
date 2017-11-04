var Good_list = function(con){
	this.con=con||$('.list')
	this.init()
	this.bindEvents()
}
$.extend(Good_list.prototype,{
	init(){
		this.createdom();
	},
	createdom(){
		this.con.find('.section').children().remove()
    var html = new EJS({url:'/admin/views/good_list.ejs'}).render({

    })
    this.con.find('.section').append(html)
	},
	bindEvents(){

	}
});
