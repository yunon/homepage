var express = require('express');
var router = express.Router();
var fs = require('fs');

/**
 *  ホームページ
 *  http://localhost:3000/
 */
router.get('/',function(req, res){


    // ログイン状態の管理
    if(req.session.loginStatus){


        var login = (function(){/*
            <p> :name </p>
            <button id="logout">logout</button>
            <script>
                $("#logout").on("click",()=>{
                    
                })
            </script>
        */}).toString().match(/\/\*([^]*)\*\//)[1].replace(':name',req.session.loginData.name);
        res.render('homepage.ejs',{
            loginStatus: login
        })
    }else{
        fs.readFile(`${__dirname}/../public/loginStatus.html`,'utf8',function(err,data){
            if(err)console.log(err);
            res.render('homepage.ejs',{
                loginStatus : data
            });
        })
    }
});

// 試しにクッキーを使ってみる
router.get('/test_cookie',function(req, res){
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
router.get('/test_session',function(req, res){
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
router.get('/test',function(req, res){
    res.render('test.ejs',{
        test : 'hello world'
    });
})
module.exports = router;