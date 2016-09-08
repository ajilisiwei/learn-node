var crypto=require('crypto');

exports.ecrypt=function (secret,cb) {
    const cryptsecret=crypto.createHmac('sha256',secret)
        .update('wei')
        .digest('hex');
    cb(cryptsecret);
};