var List = function(con){
	this.con=con||$('body')
	this.init()
}
$.extend(List.prototype,{
	init(){
		this.createdom();
		this.bindEvents();
		userSocket();
	},
	createdom(){
    var html = new EJS({url:'views/list.ejs'}).render({
		})
		this.con.append(html);
		this.asidebtnn = $('.aside .btnn');
		this.phonebtnn = $('.phone .btnn');
		this.aside = $('.aside');
		this.phone = $('.phone');
		this.iframe = $('iframe')
		this.li = $('.list-group-item');
		this.refresh = $(".refresh")
	},
	bindEvents(){
		this.asidebtnn.on('click',$.proxy(this.asidemove,this))
		this.phonebtnn.on('click',$.proxy(this.phonemove,this))
		this.refresh.on('click',$.proxy(this.refreshiframe,this))
		this.li.on('click',$.proxy(this.addsection,this))
		this.aside.on('mousemove',$.proxy(this.asideenter,this))
		this.aside.on('mouseleave',$.proxy(this.asideleave,this))
		this.phone.on('mousemove',$.proxy(this.phoneenter,this))
		this.phone.on('mouseleave',$.proxy(this.phoneleave,this))
	},
	refreshiframe(){
		this.iframe.attr('src','http://localhost:4000/')
	},
	asideenter(){
		this.asidebtnn.stop().fadeIn()
	},
	asideleave(){
			this.asidebtnn.stop().fadeOut()
	},
	phoneenter(){
		this.phonebtnn.stop().fadeIn()
	},
	phoneleave(){
			this.phonebtnn.stop().fadeOut()
	},
	addsection(e){
		var name = $(e.target).closest('li').attr('to');
		eval('new '+name+'()')
	},
	asidemove(){
		if(this.aside.width()!=0){
			this.aside.animate({width:0,paddingRight:0},500,function(){
				this.asidebtnn.find('span').css('transition','all ease .5s').css('transform','rotate(180deg)')
			}.bind(this))
		}else{
			this.aside.animate({width:240,paddingRight:10},500,function(){
				this.asidebtnn.find('span').css('transition','all ease .5s').css('transform','rotate(0deg)')
			}.bind(this))
			if(this.phone.width()!=0){
				this.phone.animate({width:0,paddingLeft:0},500,function(){
					this.phonebtnn.find('span').css('transition','all ease .5s').css('transform','rotate(0deg)')
				}.bind(this))
			}
		}
	},
	phonemove(){
		if(this.phone.width()!=0){
			this.phone.animate({width:0,paddingLeft:0},500,function(){
				this.phonebtnn.find('span').css('transition','all ease .5s').css('transform','rotate(0deg)')
			}.bind(this))
		}else{
			this.phone.animate({width:335,paddingLeft:10},500,function(){
				this.phonebtnn.find('span').css('transition','all ease .5s').css('transform','rotate(180deg)')
			}.bind(this))
			if(this.aside.width()!=0){
				this.aside.animate({width:0,paddingRight:0},500,function(){
					this.asidebtnn.find('span').css('transition','all ease .5s').css('transform','rotate(180deg)')
				}.bind(this))
			}
		}
	}
});
