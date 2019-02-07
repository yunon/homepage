const express = require('express');
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

/**
 *  ログイン画面の表示
 *  http://localhost:3000/login
 */
router.get('/',(req, res)=>{
    let html = (()=>{/*

        <form action='/login' method='post' name="form" id="form1">
            <fieldset>
                :message
                <p>NAME <input type="text" name="name" required><p>
                <p>PASSWORD <input type="text" name="pass" required></p>
                <input type="hidden" name="redirect" id="rd">
                <button class="btn btn-primary" id="login">login</button>
            </fieldset>
        </form>
        
        <script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
        <script>
            $('#rd').attr('value',getParam('redirect'));

            function getParam(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
        </script>



    */}).toString().match(/\/\*([^]*)\*\//)[1];

    // エラーメッセージ処理
    if(req.query.err){
        html = html.replace(':message','<p>エラー： ログインできません <p><br>');
    }else{
        html = html.replace(':message', '');
    }
    res.render('contents_temp.ejs',{
        title: 'ログイン画面',
        meta : null,
        main: html,
        loginStatus : null
    });

});

/**
 *  ポストを受けてログイン処理
 *  http://localhost:3000/login
 */
router.post('/',(req, res)=>{
    // ポストリクエストを取得
    let name = req.body.name;
    let pass = req.body.pass;

    // データベースオープン
    const db = new sqlite3.Database("./public/sqlite/sourcedata.sqlite");

    db.serialize(()=>{
        let sql = `select name, pass, icon from user where name = "${name}"`;
        db.get(sql,(err,data)=>{
            if(err || data == undefined){
                console.log(err);
                db.close();
                // TODO エラーならログイン画面に戻ってエラーメッセージを表示
                res.redirect(`/login?redirect=${req.body.redirect}&err=true`);
            }else
            // パスワードが一致しているかを確認
            if(data.pass != pass){
                
                console.log(err);
                db.close();
                // TODO エラーならログイン画面へ
                res.redirect(`/login?redirect=${req.body.redirect}&err=true`);         
            }else{
                // ログイン成功時
                // セッションの登録
                req.session.loginStatus = true;
                req.session.loginData = {
                    name: name,
                    pass: pass,
                    icon: data.icon
                }
                db.close();
                // リダイレクト
                res.redirect(req.body.redirect);
            }
        })
    })
    
});

module.exports = router;