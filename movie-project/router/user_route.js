var User=require('../models/user');

var emptyUser={
    name:"",
    password:"",
    gender:"",
    age:"",
    addr:""
};

module.exports=function (app) {

     // 添加用户界面
    app.get('/admin/newuser',function (req,res) {
        res.render('./user/newuser',{title: '用户-用户添加页',user: emptyUser});
    });

    // 添加用户
    app.post('/admin/control/newuser',function (req,res) {
          var userObj=req.body.user;
          var id=userObj._id;
          var _user;
          if (id != 'undefined' ){
              User.findById(id,function (err,user) {
                  if (err){
                      console.log(err);
                  }
                  _user=_.extend(user,userObj);
                  _user.save(function (err,user) {
                      if (err){
                          console.log(err);
                      }
                      res.redirect('/admin/control/newuser');
                  });
              });
          }
          else {
              _user = new User({
                  name:userObj.name,
                  password:userObj.password,
                  gender:userObj.gender,
                  age:userObj.age,
                  addr:userObj.addr
              });
              console.log(userObj.name);
              console.log(_user);
              _user.save(function (err,user) {
                  if(err){
                      console.log(err);
                  }
                  res.redirect('/admin/control/newuser');
              });
          }
      });

    // 用户登录界面
    app.get('/login',function (req,res) {
        res.render('./user/login',{title: '用户-用户登录',user:emptyUser});
    });

    app.post('/admin/login',function (req,res) {
        var userObjet=req.body.user;

        res.redirect('./user/login');
    });

};