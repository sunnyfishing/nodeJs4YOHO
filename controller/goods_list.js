const Goods_list = require('../model/goods_list.js');
const {getParam} = require('../utils/utils.js');
const async = require('async')
const getlist = function(req,res){
  const {page,pageSize,term} = req.query
  var termm = term || {}
  if(typeof termm == 'object'){
    for(var val in termm){
      var value = termm[val]
      var key = val
    }
    var obj = {}
    obj[key] = eval(value)
  }else{
    var obj = JSON.parse(termm)
  }
  console.log(obj)
  async.parallel([
    function(cb){
      Goods_list.find(obj)
      .sort({_id:-1})
      .skip(pageSize*(page-1))
      .limit(parseInt(pageSize))
      .then((result)=>{
        cb(null,result)
      })
    },
    function(cb){
      Goods_list.find(obj)
      .count()
      .then((result)=>{
        cb(null,result)
      })
    }
  ],function(err,ress){
    res.json(getParam({
      state : true,
      data : {
        result : ress[0],
        pageSize : 5,
        page,
        count : ress[1]
      }
    }))
  })
}
const getone = function(req,res){
      Goods_list.find(req.query)
      .then((result)=>{
        res.json(getParam({
          state : true,
          data : result
        })
      )
    })
}
const add = function(req,res){
  const {product_name,sales_price,market_price,small_sort_name,product_id,product_skn,edit_time} = req.body
  const goods = new Goods_list({
    default_images : req.file.filename,
    product_name,
    sales_price : parseInt(sales_price),
    market_price : parseInt(market_price),
    small_sort_name,
    product_id : parseInt(product_id),
    product_skn : parseInt(product_skn),
    edit_time
  })
  goods.save().then((result)=>{
    if(result){
      res.json(getParam({
        state : true ,
        use : 'add'
      }))
    }
  })
}
const removeone = function(req,res){
  const {id} = req.body
  Goods_list.findByIdAndRemove(id)
  .then((result)=>{
    if(result){
      res.json(getParam({
        state : true ,
        use : 'removeone'
      }))
    }
  })
}
const update = function(req,res){
  const {_id,product_name,sales_price,market_price,small_sort_name,product_id,product_skn,edit_time} = req.body
  if(req.file){
    const default_images = req.file.filename
    var updatejson = {
      product_name,sales_price,market_price,small_sort_name,product_id,product_skn,edit_time,default_images
    }
  }else{
    var updatejson = {
      product_name,sales_price,market_price,small_sort_name,product_id,product_skn,edit_time
    }
  }
  Goods_list.findByIdAndUpdate(_id,{$set:updatejson})
  .then((result)=>{
    if(result){
      res.json(getParam({
        state : true ,
        use : 'update'
      }))
    }
  })
}
module.exports = {getlist,add,removeone,update,getone}
