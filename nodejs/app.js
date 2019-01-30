var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ejs = require('ejs');
var session = require('express-session');
var fs = require('fs');
var marked = require('marked');

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

// sessionの利用宣言
app.use(session({
    secret : 'hoge',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 10000
    }
}));

// 試しにセッションを使ってみる
app.get('/test_session',function(req, res){
    // セッションの取得
    var cnt = req.session.cnt == undefined ? 0 : req.session.cnt;
    cnt++;
    // セッションの保存
    req.session.cnt = cnt;

    res.render('temp.ejs',{
        cnt : cnt
    });
});

// テスト
app.get('/test',function(req, res){
    res.render('test.ejs',{
        test : 'hello world'
    });
})
// ルーティングてすと
app.get('/contents/:sourcedata',function(req, res){

    fs.readFile(`${__dirname}/public/sourcecode/${req.params.sourcedata}.md`,'utf8',
    function(err, data){
        if(err){
            console.log('eeerrr');
            var html = '<p> not found </p>'
        }else{
            // メタデータを取得 (独自関数)
            var [meta_json, data2] = getMeta(data);
            // markdownをhtmlに変換
            var html = marked(data2);
            
        }

        res.render('test.ejs',{
            test : html,
            title : meta_json.title,
            tags : meta_json.tags,
            author : meta_json.author
        })
    })
})


/**
 * "md形式のデータから'---'で囲われているメタ情報(json形式)"と、
 * "元データからメタ情報を省いたデータ"の２つを配列で返すメソッド
 * 
 * @param {String} md_data　md形式のデータ 
 * @return {String} [json, md_data] 
 */
function getMeta(data){


    // 返り値(1)
    var json;
    // 返り値(2)
    var md;
    var title;
    var tags;
    var author;

    try{
        // '---'で囲まれた文字列を取得
        // String.match()で正規表現を使った際は戻り値が "配列で返ってくる"ので注意
        // 正規表現の改行は環境によって変わるので'\r\n|\n|\r'を使う
        json = data.match(/---[\r\n|\n|\r][\s\S]+---[\r\n|\n|\r]/)[0];
    
        // '---'で囲まれた文字列を排除したデータを取得
        md = data.replace(/---[\r\n|\n|\r][\s\S]+---[\r\n|\n|\r]/,'');
    
        // メタデータの各プロパティを取得
        title = json.match(/title:\s.+/)[0].replace(/title:\s/,'');
        tags = json.match(/tags:\s.+/)[0].replace(/tags:\s/,'');
        author = json.match(/author:\s.+/)[0].replace(/author:\s/,'');
    
    }catch(e){

        console.log(e);
        title = null;
        tags = null;
        author = null;
        md = data;
    }finally{

        json = {
            title : title,
            tags : tags,
            author : author
        }
        return [json, md]
    }
  }

