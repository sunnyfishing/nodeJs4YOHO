var Good_classify = function(con){
	this.con=con||$('.list')
	this.init()
}
$.extend(Good_classify.prototype,{
	init(){
		this.getGender();
	},
	createdom(res){
		this.con.find('.section').children().remove()
    	var html = new EJS({url:'/admin/views/good_classify.ejs'}).render({
			list:res.data
    	})
    	this.con.find('.section').append(html)
    	this.bindEvents()
	},
	bindEvents(){
		//console.log(this.con);
		//$("#addgender").on('click',this.addGender.bind(this));
	},
	addGender(){
		$.ajax({
			url:'api/'
		})
	},

	getGender(){
		$.ajax({
			url:'/api/list/gender',
			type:'post',
			success:this.handleGetGender.bind(this)
		})
	},
	handleGetGender(res){
		this.createdom(res);
	}
});
