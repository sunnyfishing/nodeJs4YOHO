var Good_details = function(con){
	this.con=con||$('.list')
	this.init()
	this.bindEvents()
}
$.extend(Good_details.prototype,{
	init(){
		this.createdom();
	},
	createdom(){
		this.con.find('.section').children().remove()
    var html = new EJS({url:'/admin/views/good_details.ejs'}).render({

    })
    this.con.find('.section').append(html)
	},
	bindEvents(){

	}
});
