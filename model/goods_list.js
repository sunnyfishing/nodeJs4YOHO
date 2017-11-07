const db = require('../utils/database.js')
const schema = new db.Schema({
  default_images:{
    type:String,
    required:true
  },
  product_name:{
    type:String,
    required:true
  },
  sales_price:{
    type:Number,
    required:true
  },
  market_price:{
    type:Number,
    required:true
  },
  small_sort_name:{
    type:String,
    required:true
  },
  product_skn:{
    type:Number,
    required:true
  },
  product_id:{
    type:Number,
    required:true
  },
  edit_time:{
    type:String,
    required:true
  }
})
const Goods_list = db.model('goods_lists',schema)
module.exports = Goods_list
