const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');
router.post('/users/signUp',userController.signUp)
 module.exports=router