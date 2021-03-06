var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var krishighscore = require('./models/krishighscore.js');
var easyhighscore = require('./models/easyhighscore.js');
var mediumhighscore = require('./models/mediumhighscore.js');
var hardhighscore = require('./models/hardhighscore.js');
var insanehighscore = require('./models/insanehighscore.js');
var impossiblehighscore = require('./models/impossiblehighscore.js');
var kogahighscore = require('./models/kogahighscore.js');

var port = process.env.PORT || 5000;

//mongo setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Set up and connect to mongo database
mongoose.connect(
    'mongodb://mazerunner:mazeadmin123@ds039850.mlab.com:39850/mazehighscores',
    function(err) {
        if (err) return console.log(err);
        else {
            console.log('Connection Succesful');
        }
        //connect to server
        app.listen(port, function() {
            console.log('listening on port ' + port);
        });
    }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));

var highScoresToPopulate = {};

app.get('/', function(req, res) {
    Promise.all([
        krishighscore
            .find({})
            .sort({ score: 1 })
            .limit(10)
            .exec(),
        easyhighscore
            .find({})
            .sort({ score: 1 })
            .limit(10)
            .exec(),
        mediumhighscore
            .find({})
            .sort({ score: 1 })
            .limit(10)
            .exec(),
        hardhighscore
            .find({})
            .sort({ score: 1 })
            .limit(10)
            .exec(),
        insanehighscore
            .find({})
            .sort({ score: 1 })
            .limit(10)
            .exec(),
        impossiblehighscore
            .find({})
            .sort({ score: 1 })
            .limit(10)
            .exec(),
        kogahighscore
            .find({})
            .sort({ score: 1 })
            .limit(10)
            .exec()
    ]).then(results => {
        highScoresToPopulate.kris = results[0];
        highScoresToPopulate.easy = results[1];
        highScoresToPopulate.medium = results[2];
        highScoresToPopulate.hard = results[3];
        highScoresToPopulate.insane = results[4];
        highScoresToPopulate.impossible = results[5];
        highScoresToPopulate.koga = results[6];
        res.render('./index.ejs', { scores: highScoresToPopulate });
    });
});

//post handler
app.post('/krishighscore', function(req, res) {
    var post = new krishighscore();
    post.name = req.body.name;
    post.score = req.body.score;

    post.save(function(err) {
        if (err) res.send(err);
        res.send('Thanks ' + req.body.name + ', your score has been submitted');
    });
});

app.post('/easyhighscore', function(req, res) {
    var post = new easyhighscore();
    post.name = req.body.name;
    post.score = req.body.score;

    post.save(function(err) {
        if (err) res.send(err);
        res.send('Thanks ' + req.body.name + ', your score has been submitted');
    });
});

app.post('/mediumhighscore', function(req, res) {
    var post = new mediumhighscore();
    post.name = req.body.name;
    post.score = req.body.score;

    post.save(function(err) {
        if (err) res.send(err);
        res.send('Thanks ' + req.body.name + ', your score has been submitted');
    });
});

app.post('/hardhighscore', function(req, res) {
    var post = new hardhighscore();
    post.name = req.body.name;
    post.score = req.body.score;

    post.save(function(err) {
        if (err) res.send(err);
        res.send('Thanks ' + req.body.name + ', your score has been submitted');
    });
});

app.post('/insanehighscore', function(req, res) {
    var post = new insanehighscore();
    post.name = req.body.name;
    post.score = req.body.score;

    post.save(function(err) {
        if (err) res.send(err);
        res.send('Thanks ' + req.body.name + ', your score has been submitted');
    });
});

app.post('/impossiblehighscore', function(req, res) {
    var post = new impossiblehighscore();
    post.name = req.body.name;
    post.score = req.body.score;

    post.save(function(err) {
        if (err) res.send(err);
        res.send('Thanks ' + req.body.name + ', your score has been submitted');
    });
});

app.post('/kogahighscore', function(req, res) {
    var post = new kogahighscore();
    post.name = req.body.name;
    post.score = req.body.score;

    post.save(function(err) {
        if (err) res.send(err);
        res.send('Thanks ' + req.body.name + ', your score has been submitted');
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { error: err });
});

module.exports = app;
