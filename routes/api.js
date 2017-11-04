const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');
router.get('/users/findusername',userController.finduser)
router.get('/users/islogin',userController.islogin)
router.post('/users/register',userController.register)
router.post('/users/login',userController.login)
router.post('/users/signout',userController.signout)
 module.exports=router
