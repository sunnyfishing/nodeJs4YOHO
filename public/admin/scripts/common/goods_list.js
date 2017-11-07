var Goods_list = function(con){
	this.con=con||$('.list')
	this.init()
}
$.extend(Goods_list.prototype,{
	init(){
		this.createdom();
    new Goods_list_table();
		this.bindEvents()
	},
	createdom(){
		this.con.find('.section').children().remove()
    var html = new EJS({url:'/admin/views/goods_list.ejs'}).render({})
    this.con.find('.section').append(html)
    this.loading = $('.loading')
    this.table = $('.table')
		this.add = $('.add')
		this.search = $('.search')
		this.mohusearch = $('.mohusearch')
		this.all = $('.all')
		this.primary = $('.primary')
		this.term = $('.term')
    this.add.popover({
      html:true,
    })
		this.button = $('button')
	},
	bindEvents(){
		this.button.on('click',$.proxy(this.preventDefault,this))
		this.primary.on('focus',$.proxy(this.removeerror,this))
		this.add.on('shown.bs.popover',$.proxy(this.popshown,this))
		this.search.on('click',$.proxy(this.searchinfo,this))
		this.mohusearch.on('click',$.proxy(this.searchinfo,this))
		this.all.on('click',$.proxy(this.getall,this))
	},
	preventDefault(e){
		e.preventDefault();
	},
	getall(){
		new Goods_list_table()
		this.primary.val('')
	},
	searchinfo(e){
		console.log($(e.target).hasClass('search'));
		if(this.primary.val()==''){
			this.primary.closest('.form-group').addClass('has-error')
		}else{
			for(var i=0;i<this.term.children().length;i++){
				if(this.term.children().eq(i).text()==this.term.val()){
					var tiao = this.term.children().eq(i).attr('name')
				}
			}
			var term = {}
			if(Number(this.primary.val())){
				term[tiao]=this.primary.val()
			}else{
				if($(e.target).hasClass('search')){
					term[tiao]=eval("/^"+this.primary.val()+"$/")
				}else{
					term[tiao]=eval("/"+this.primary.val()+"/")
				}
			}
			console.log(term);
			new Goods_list_table(term)
		}
	},
	//弹出框 弹出后
	popshown(){
		this.fileinput = $('.fileinput')
		this.cancel = $('.cancel')
		this.submit = $('.submit')
		this.addinput = $('.addinput')
		this.addinput.eq(0).on('change',$.proxy(this.showimg,this))
		this.addinput.on('focus',$.proxy(this.removeerror,this))
		this.submit.on('click',$.proxy(this.submitadd,this))
		this.cancel.on('click',(e)=>{this.add.trigger('click');e.preventDefault();})
		this.fileinput.on('click',()=>{this.addinput.eq(0).trigger('click')})
	},
	showimg(){
		var img = this.addinput.eq(0).get(0).files[0];
		// var reader = new FileReader;
	  // var url = reader.readAsDataURL(img);
	  // reader.onload = function() {
	  //   this.addinput.eq(0).prev().attr("src" ,reader.result)
	  // }.bind(this)
		var url = window.URL.createObjectURL(img);
    this.addinput.eq(0).prev().attr("src" ,url)
	},
	removeerror(e){
		$(e.target).closest('.form-group').removeClass('has-error')
	},
	submitadd(e){
		e.preventDefault();
		var empt=false
		for(var i=0;i<this.addinput.length;i++){
			if(this.addinput.eq(i).val().trim()==''){
				empt = true;
				this.addinput.eq(i).parents('.form-group').addClass('has-error')
			}
		}
		if(!empt){
			this.submit.text('提交中').attr('disabled','disabled')
			this.cancel.attr('disabled','disabled')
			var file=new FormData();
      file.append('default_images',this.addinput.eq(0).get(0).files[0]);
			file.append('product_name',this.addinput.eq(1).val());
			file.append('sales_price',this.addinput.eq(2).val());
			file.append('market_price',this.addinput.eq(3).val());
			file.append('small_sort_name',this.addinput.eq(4).val());
			file.append('product_id',this.addinput.eq(5).val());
			file.append('product_skn',this.addinput.eq(6).val());
			file.append('edit_time',new Date().getFullYear() + '-' + parseInt(new Date().getMonth()+1) + '-' + new Date().getDate());
			$.ajax({
				type : 'post',
				url : '/api/goods_list/add',
				processData: false, /* 告诉jQuery不要去处理发送的数据*/
				contentType: false,
				data : file,
				success : $.proxy(this.addSuc,this)
			})
		}
	},
	addSuc(data){
		if(data.data.state){
			this.submit.text('提交成功')
		}else{
			this.submit.text('提交失败')
		}
		setTimeout(function(){
			this.submit.text('提交').removeAttr('disabled')
			this.cancel.removeAttr('disabled')
			this.add.trigger('click')
			new Goods_list_table();
		}.bind(this),2000)
	}
});
