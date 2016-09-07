var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var _ = require('underscore');
var userRouter=require('./router/user_route');
var movieRouter=require('./router/movie_route');

// 静态资源请求路径
var path = require('path');
var bodyParser= require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
app.locals.moment = require('moment');

// movie为mongodb的一个数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/movie');

app.set('views', './views/pages');
app.set('view engine', 'jade');
// 静态资源请求路径
app.use(express.static(path.join(__dirname, 'public/')));

// 表单数据格式化
app.use(bodyParser());

// 路由
userRouter(app); //用户相关路由
movieRouter(app); //电影相关路由

app.listen(port); // 监听端口
console.log('server started on port: ' + port);