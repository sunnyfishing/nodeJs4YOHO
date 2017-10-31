const express = require("express");
const app=express();
const path = require('path');
const bodyParser = require('body-parser'); 

const apiRouter = require('./router/api.js');

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api',apiRouter);

app.listen(process.env.PORT || '3000');
