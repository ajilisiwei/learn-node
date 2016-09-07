var Movie = require('../models/movie');

var emptyMovie = {
    title: "",
    doctor: "",
    country: "",
    language: "",
    year: "",
    poster: "",
    summary: ""
};

module.exports=function (app) {

    // 电影首页
    app.get('/', function (req, res) {
        Movie.fetch(function (err, movies) {
            if (err) {
                console.log(err);
            }
            res.render('./movie/index', {title:'电影-首页', movies: movies});
        });
    });

    // 电影列表
    app.get('/list', function (req, res) {
        Movie.fetch(function (err, movies) {
            if (err) {
                console.log(err);
            }
            res.render('./movie/list', {title:'电影-列表', movies: movies});
        });
    });

    //电影详情
    app.get('/detail/:id', function (req, res) {
        var id = req.params.id;

        Movie.findById(id, function (err, movie) {
            res.render('./movie/detail', {title: '电影-详情', movie: movie});
        })
    });

    // 录入电影页面
    app.get('/admin/new', function (req, res) {
        res.render('./movie/new', {title: '电影-后台录入页', movie: emptyMovie});
    });

    // 逻辑控制:插入
    app.post('/admin/control/new', function (req, res) {
        var movieObj = req.body.movie;
        var id = movieObj._id;
        var _movie;
        console.log(id);
        if (id != 'undefined' ) {
            Movie.findById(id, function (err, movie) {
                if (err) {
                    console.log(err);
                }
                _movie = _.extend(movie, movieObj);
                _movie.save(function (err, movie) {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/detail/' + movie._id);
                });
            });
        } else {
            _movie = new Movie({
                doctor: movieObj.doctor,
                title: movieObj.title,
                country: movieObj.country,
                language: movieObj.language,
                year: movieObj.year,
                poster: movieObj.poster,
                summary: movieObj.summary,
                flash: movieObj.flash
            });
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/detail/' + movie._id);
            });
        }
    });

    // 逻辑控制:更新
    app.get('/admin/control/update/:id', function (req, res) {
        var id = req.params.id;

        if (id) {
            Movie.findById(id, function (err, movie) {
                res.render('new', {
                    title: '后台更新页',
                    movie: movie
                })
            })
        }
    });

    // 逻辑控制:删除
    app.delete('/admin/control/delete', function (req, res) {
        var id = req.query.id;

        if (id) {
            Movie.remove({_id: id}, function (err, movie) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({success: true});
                }
            });
        }
    });

};