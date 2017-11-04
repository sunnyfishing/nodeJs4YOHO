var Users = function(con){
	this.con=con||$('.list')
	this.init()
	this.bindEvents()
}
$.extend(Users.prototype,{
	init(){
		this.createdom();
	},
	createdom(){
		this.con.find('.section').children().remove()
    var html = new EJS({url:'/admin/views/users.ejs'}).render({

    })
    this.con.find('.section').append(html)
	},
	bindEvents(){

	}
});
