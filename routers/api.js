const express = require('express');
const router = express('router');

const userController = require('../controller/user.js');

router.post('/users/signUp',userController);

module.exports = router;