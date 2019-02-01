var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ejs = require('ejs');
var session = require('express-session');
var fs = require('fs');

// cookie-parser(クッキーを利用する際に必要)
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// body-parser(POSTでリクエストを取得するのに必要)
var bodyParser = require('body-parser');
app.use(bodyParser());

// テンプレートエンジンはEJSを使うよと宣言？
app.engine('ejs', ejs.renderFile);


var database = require('./routes/database');
var contents = require('./routes/contents')

app.listen(3000);

// 静的ファイル置き場
app.use(express.static('public'));

app.use('/database', database);
app.use('/contents', contents);

// sessionの利用宣言
app.use(session({
    secret : 'hoge',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 10000
    }
}));

//　ホームページ
app.get('/',function(req, res){
    var loginStatus = req.session.login;
    var html = '';
    if(loginStatus == undefined){
        html = '<button>login</button><button>sign up</button>';
    }
    res.render('homepage.ejs',{
        loginStatus : html
    });
})

// 試しにクッキーを使ってみる
app.get('/test_cookie',function(req, res){
    // クッキーの取得
    var cnt = req.cookies.cnt == undefined ? 0 : req.cookies.cnt;
    cnt++;

    // クッキーの送信
    res.cookie('cnt',cnt,{maxAge:60000});
    // EJSを返す
    res.render('test.ejs',{
        cnt: cnt
    });
});



// 試しにセッションを使ってみる
app.get('/test_session',function(req, res){
    // セッションの取得
    var cnt = req.session.cnt == undefined ? 0 : req.session.cnt;
    cnt++;
    // セッションの保存
    req.session.cnt = cnt;

    res.render('test.ejs',{
        cnt : cnt
    });
});

// テスト
app.get('/test',function(req, res){
    res.render('test.ejs',{
        test : 'hello world'
    });
})
