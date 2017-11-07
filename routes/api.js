const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');
const goodslistController = require('../controller/goods_list.js');
const upload = require('../utils/uploadimage.js');
router.get('/users/findusername',userController.finduser)
router.get('/users/islogin',userController.islogin)
router.post('/users/register',userController.register)
router.post('/users/login',userController.login)
router.post('/users/signout',userController.signout)
router.get('/goods_list/getlist',goodslistController.getlist)
router.get('/goods_list/getone',goodslistController.getone)
router.post('/goods_list/add',upload.single('default_images'),goodslistController.add)
router.post('/goods_list/update',upload.single('default_images'),goodslistController.update)
router.post('/goods_list/removeone',goodslistController.removeone)
module.exports=router
