var List = function(con){
	this.con=con||$('body')
	this.init()
}
$.extend(List.prototype,{
	init(){
		this.createdom();
		this.bindEvents();
	},
	createdom(){
    var html = new EJS({url:'views/list.ejs'}).render({
		})
		this.con.append(html);
		this.btnn = $('.btnn');
		this.aside = $('.aside');
		this.li = $('.list-group-item')
	},
	bindEvents(){
		this.btnn.on('click',$.proxy(this.asidemove,this))
		this.li.on('click',$.proxy(this.addsection,this))
		this.aside.on('mousemove',$.proxy(this.enter,this))
		this.aside.on('mouseleave',$.proxy(this.leave,this))
	},
	enter(){
		this.btnn.stop().fadeIn()
	},
	leave(){
			this.btnn.stop().fadeOut()
	},
	addsection(e){
		var name = $(e.target).closest('li').attr('to');
		eval('new '+name+'()')
	},
	asidemove(){
		if(this.aside.width()!=0){
			this.aside.animate({width:0,paddingRight:0},500,function(){
				this.btnn.find('span').css('transition','all ease .5s').css('transform','rotate(180deg)')
			}.bind(this))
		}else{
			this.aside.animate({width:240,paddingRight:10},500,function(){
				this.btnn.find('span').css('transition','all ease .5s').css('transform','rotate(0deg)')
			}.bind(this))
		}
	}
});
