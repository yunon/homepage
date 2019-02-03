var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ejs = require('ejs');
var session = require('express-session');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// cookie-parser(クッキーを利用する際に必要)
app.use(cookieParser());

// body-parser(POSTでリクエストを取得するのに必要)
app.use(bodyParser());

// テンプレートエンジンはEJSを使うよと宣言？
app.engine('ejs', ejs.renderFile);

// sessionの利用宣言
app.use(session({
    secret : 'hoge',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000*60*60
    }
}));

// 静的ファイル置き場
app.use(express.static('public'));
// ルーティング
app.use('/settings', require('./routes/settings'));
app.use('/article', require('./routes/article'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/signup', require('./routes/signup'));
app.use('/', require('./routes/homepage'));


// サーバー起動
app.listen(3000);
