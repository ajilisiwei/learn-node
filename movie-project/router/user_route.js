var User=require('../models/user');
var Crypto=require('../util/encrypthelper');

var emptyUser={
    name:"",
    password:"",
    gender:"",
    age:"",
    addr:""
};

module.exports=function (app) {

      //hello
     // 添加用户界面
    app.get('/admin/newuser',function (req,res) {
        res.render('./user/newuser',{title: '用户-用户添加页',user: emptyUser});
    });

    // 添加用户
    app.post('/admin/control/newuser',function (req,res) {
          var userObj=req.body.user;
          var _user;

          User.findByUserName(userObj.name,function (err,user) {
              if (err){
                  console.log(err);
              }
              if (user){
                  console.log('用户名已被注册！');
                  res.redirect('/admin/newuser');
              }else {
                  _user = new User({
                      name:userObj.name,
                      password:userObj.password,
                      gender:userObj.gender,
                      age:userObj.age,
                      addr:userObj.addr
                  });
                  _user.save(function (err,user) {
                      if(err){
                          console.log(err);
                      }
                      res.redirect('/admin/newuser');
                  });
              }
          });
      });

    // 用户登录界面
    app.get('/login',function (req,res) {
        res.render('./user/login',{title: '用户-用户登录',user:emptyUser});
    });

    app.post('/user/login',function (req,res) {
        var userObjet=req.body.user;
        User.findByUserName(userObjet.name,function (err,user) {
            if (err){
                console.log(err);
            }
            if (user==null){
                console.log('用户不存在');
            }
            if (user){
                User.findByPassword(user.name,user.password,function (err,user) {
                    if(err){
                        console.log(err)
                    }
                    if(user==null){
                        console.log('密码错误！');
                    }
                    console.log('登录成功!');
                })
            }
            res.redirect('/user/login');
        });
    });

};