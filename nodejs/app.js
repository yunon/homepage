var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ejs = require('ejs');

// cookie-parser(クッキーを利用する際に必要)
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// body-parser(POSTでリクエストを取得するのに必要)
var bodyParser = require('body-parser');
app.use(bodyParser());

// テンプレートエンジンはEJSを使うよと宣言？
app.engine('ejs', ejs.renderFile);


var database = require('./routes/database');


app.listen(3000);

// publicディレクトリを公開
app.use(express.static('public'));

app.use('/database', database);

// 試しにクッキーを使ってみる
app.get('/test_cookie',function(req, res){
    // クッキーの取得
    var cnt = req.cookies.cnt == undefined ? 0 : req.cookies.cnt;
    cnt++;

    // クッキーの送信
    res.cookie('cnt',cnt,{maxAge:60000});
    // EJSを返す
    res.render('temp.ejs',{
        cnt: cnt
    });
});

