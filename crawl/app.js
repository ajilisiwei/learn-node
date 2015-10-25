var express = require('express');
var index = require('./routes/index.js');
var app = express();

app.set('view engine', 'ejs');

app.use(function respond (req, res, next) {
   index.index(req, res);
})

app.listen(4000);
console.log('server started: http://localhost:4000/');