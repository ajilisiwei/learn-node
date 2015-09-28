var myUtil = require('../myUtil.js');
var cheerio = require('cheerio');

exports.index = function (req, res) {
  var url = 'http://localhost:8080';
  // var url = 'http://movie.douban.com/subject/25911595/?from=showing';
  myUtil.get(url, function (content, status) {
    var $ = cheerio.load(content);
    var data = '';
    $('.bcz-nav-right ul li a').each(function(i, e) {
        data += e.children[0].data + '<br/>';
    });
    res.send(data);
  });
};
