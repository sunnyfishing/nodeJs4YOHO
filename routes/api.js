const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');
router.get('/users/findusername',userController.finduser)
router.post('/users/register',userController.register)
 module.exports=router