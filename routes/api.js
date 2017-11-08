const express = require('express');
const router = express.Router();

const userController = require('../controller/user.js');
const listController = require('../controller/list.js')
const typeController = require('../controller/type.js')
const productController = require('../controller/product.js')
const goodslistController = require('../controller/goods_list.js');
const upload = require('../utils/uploadimage.js');

router.get('/users/findusername',userController.finduser)
router.get('/users/islogin',userController.islogin)
router.post('/users/register',userController.register)
router.post('/users/login',userController.login)
router.post('/users/signout',userController.signout)

router.post('/users/showUser',userController.showUser)
router.post('/users/shearchUser',userController.shearchUser)

router.post('/list/getGender',listController.getGender)
router.post('/list/addgender',listController.addgender)
router.post('/list/delgender',listController.delgender)

router.post('/type/gettypes',typeController.gettypes)
router.post('/type/addtypes',typeController.addtypes)

router.post('/pro/getPro',productController.getPro)

router.get('/goods_list/getlist',goodslistController.getlist)
router.get('/goods_list/getone',goodslistController.getone)
router.post('/goods_list/add',upload.single('default_images'),goodslistController.add)
router.post('/goods_list/update',upload.single('default_images'),goodslistController.update)
router.post('/goods_list/removeone',goodslistController.removeone)

 module.exports=router
