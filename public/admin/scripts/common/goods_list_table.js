const Goods_list_table = function(primary){
  this.nowprimary = primary
  this.init();
}
$.extend(Goods_list_table.prototype,{
  init(primary){
    this.table = $('.table')
    this.loading = $('.loading')
    this.createdom(1,this.nowprimary)
  },
  createdom(page,term){
    var page = page || 1
    var term = term || {}
    var pageSize = 5
		this.table.find('tbody').remove();
		this.table.find('tfoot').remove();
		this.loading.show();
    $.ajax({
      type : 'get',
      url : '/api/goods_list/getlist',
      data : {
        page,
        pageSize,
        term
      },
      success : $.proxy(this.getlistSuc,this)
    })
  },
  getlistSuc(data){
    this.loading.hide();
    var html = new EJS({url:'./views/goods_list_table.ejs'}).render({
      data : data.data.data
    });
    this.table.append(html).fadeIn()
    this.change = $('.change')
    this.remove = $('.remove')
    this.yesremove = $('.yesremoveone')
    this.pagination = $('.pagination')
    this.change.popover({
      html:true,
    })
    this.bindEvents()
  },
  bindEvents(){
    this.yesremove.on('click',$.proxy(this.removeone,this))
    this.remove.on('click',$.proxy(this.removeid,this))
    this.pagination.on('click',$.proxy(this.changepage,this))
    this.change.on('shown.bs.popover',$.proxy(this.popshown,this))
    this.change.on('show.bs.popover',$.proxy(this.popshow,this))
  },
  changepage(e){
    var li = $(e.target).closest('li')
    var nowpage = $(e.target).closest('ul').attr('page')
    var totle = $(e.target).closest('ul').attr('totle')
    if(li.attr('tip')=='pre'){
      if(nowpage!=1){
        this.createdom(parseInt(nowpage)-1)
      }
    }
    if(li.attr('tip')=='next'){
      if(nowpage!=totle){
        this.createdom(parseInt(nowpage)+1)
      }
    }
    if(li.attr('tip')=='pagenum'){
      if(li.attr('class')!='active'){
        this.createdom(parseInt(li.find('a').text()))
      }
    }
  },
  //弹出框 弹出前
  popshow(e){
    this.tr = $(e.target).closest('tr')
    this.id = this.tr.attr('id');
    this.nowpage = this.pagination.attr('page')
    $.ajax({
      type : 'get',
      url : '/api/goods_list/getone',
      data : {
        _id : this.id
      },
      success : $.proxy(this.getoneSuc,this)
    })
  },
  getoneSuc(data){
    if(data.data.state){
      var changeinput = this.tr.find('.popover').find('.changeinput')
      console.log(changeinput);
      changeinput.eq(0).siblings('.startimg').attr('src','/admin/images/'+data.data.data[0].default_images)
      changeinput.eq(1).val(data.data.data[0].product_name)
      changeinput.eq(2).val(data.data.data[0].sales_price)
      changeinput.eq(3).val(data.data.data[0].market_price)
      changeinput.eq(4).val(data.data.data[0].small_sort_name)
      changeinput.eq(5).val(data.data.data[0].product_id)
      changeinput.eq(6).val(data.data.data[0].product_skn)
    }
  },
  //弹出框 弹出后
	popshown(event){
		this.cancel = $('.cancelchange')
		this.submit = $('.submitchange')
		this.changeinput = $('.changeinput')
    this.fileinput = $('.fileinput')
    this.fileinput.on('click',()=>{this.changeinput.eq(0).trigger('click')})
		this.changeinput.on('focus',$.proxy(this.removeerror,this))
    this.changeinput.eq(0).on('change',$.proxy(this.showimg,this))
		this.submit.on('click',$.proxy(this.submitadd,this))
		this.cancel.on('click',(e)=>{$(event.target).trigger('click');e.preventDefault();})
	},
  showimg(){
		var img = this.changeinput.eq(0).get(0).files[0];
		// var reader = new FileReader;
	  // var url = reader.readAsDataURL(img);
	  // reader.onload = function() {
	  //   this.addinput.eq(0).prev().attr("src" ,reader.result)
	  // }.bind(this)
		var url = window.URL.createObjectURL(img);
    this.changeinput.eq(0).prev().attr("src" ,url)
	},
	removeerror(e){
		$(e.target).closest('.form-group').removeClass('has-error')
	},
	submitadd(e){
		e.preventDefault();
		var empt=false
		for(var i=1;i<this.changeinput.length;i++){
			if(this.changeinput.eq(i).val().trim()==''){
				empt = true;
				this.changeinput.eq(i).closest('.form-group').addClass('has-error')
			}
		}
		if(!empt){
			this.submit.text('提交中').attr('disabled','disabled')
			this.cancel.attr('disabled','disabled')
			var file=new FormData();
      if(this.changeinput.eq(0).val()){
        file.append('default_images',this.changeinput.eq(0).get(0).files[0]);
      }
      file.append('_id',this.id);
			file.append('product_name',this.changeinput.eq(1).val());
			file.append('sales_price',this.changeinput.eq(2).val());
			file.append('market_price',this.changeinput.eq(3).val());
			file.append('small_sort_name',this.changeinput.eq(4).val());
			file.append('product_id',this.changeinput.eq(5).val());
			file.append('product_skn',this.changeinput.eq(6).val());
			file.append('edit_time',new Date().getFullYear() + '-' + parseInt(new Date().getMonth()+1) + '-' + new Date().getDate());
			$.ajax({
				type : 'post',
				url : '/api/goods_list/update',
				processData: false, /* 告诉jQuery不要去处理发送的数据*/
				contentType: false,
				data : file,
				success : $.proxy(this.updateSuc,this)
			})
		}
	},
  updateSuc(data){
    if(data.data.state){
			this.submit.text('提交成功')
		}else{
			this.submit.text('提交失败')
		}
		setTimeout(function(){
			this.submit.text('提交').removeAttr('disabled')
			this.cancel.removeAttr('disabled')
			this.change.trigger('click')
			this.createdom(this.nowpage,this.nowprimary)
		}.bind(this),2000)
  },
  removeid(e){
    this.id = $(e.target).closest('tr').attr('id')
    this.nowpage = this.pagination.attr('page')
  },
  removeone(){
    $.ajax({
      type : 'post',
      url : '/api/goods_list/removeone',
      data : {
        id : this.id
      },
      success : $.proxy(this.removeSuc,this)
    })
  },
  removeSuc(data){
    if(data.data.state){
      this.createdom(this.nowpage,this.nowprimary)
    }
  }
})
