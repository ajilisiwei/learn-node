var myUtil = require('../myUtil.js');
var cheerio = require('cheerio');

exports.index = function (req, res) {
  var url = 'http://movie.douban.com/subject/25911595/?from=showing';
  myUtil.get(url, function (content, status) {
    var $ = cheerio.load(content);
    res.send($('#content h1 span')[0].children[0].data);
  });
};
