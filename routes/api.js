const express = require('express');
const router = express.Router();

const userController = require('../controller/user.js');
const listController = require('../controller/list.js') 
const typeController = require('../controller/type.js')

router.get('/users/findusername',userController.finduser)
router.get('/users/islogin',userController.islogin)
router.post('/users/register',userController.register)
router.post('/users/login',userController.login)
router.post('/users/signout',userController.signout)

router.post('/list/gender',listController.getGender)
router.post('/list/addgender',listController.addgender)
router.post('/list/delgender',listController.delgender)

router.post('/type/gettypes',typeController.gettypes)
router.post('/type/addtypes',typeController.addtypes)

 module.exports=router
