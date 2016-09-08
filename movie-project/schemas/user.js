var mongoose=require('mongoose');

var UserSchema=new mongoose.Schema({
    name: String,
    password: String,
    gender: String,
    age: Number,
    addr: String,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.pre('save',function (next) {
    if (this.isNew){
        this.meta.createdAt=this.meta.updateAt=Date.now();
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
});



UserSchema.statics= {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    },
    findByUserName:function (username,cb) {
        return this
            .findOne({name:username})
            .exec(cb);
    },
    findByPassword:function (username,psd,cb) {
        return this
            .findOne([{name:username},{password:psd}])
            .exec(cb);
    }
};

module.exports = UserSchema;