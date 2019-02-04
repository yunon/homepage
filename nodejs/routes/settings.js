var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();
var async = require('async');
var myfunc = require('../myfunc.js');
var fs = require('fs');
// multipart/form-dataを受け取るときに使う
var multer = require('multer');
var upload = multer({dest: `./public/image/user_icon`});

/**
 * 設定画面の表示
 * http://localhost:3000/settings
 */
router.get('/',function(req, res){
    //ログインしていない時
    if(!req.session.loginStatus){
        res.redirect(`/login/?redirect=/settings`);
    }
    // ログインしている時
    else{
        var data = req.session.loginData;
        var html = (function(){/*
            <form method='post' action="/settings" enctype='multipart/form-data'>
                <fieldset>
                    :error
                    icon : <img id="icon" src="/image/user_icon/:icon">
                    <input type="file" name="icon" accept="image/*"><br>
                    name : <input type="text" value=":name" name="name"><br>
                    <button id="change_prof">更新する</button>
                </fieldset>
            </form>
            <style>
                #icon{
                    width: 70px;
                    heigt: 70px;
                }
                #change_prof{
                    margin-top: 10px;
                }
            </style>
            <script>

            </script>
        */}).toString().match(/\/\*([^]*)\*\//)[1].replace(/:name/,data.name)
        .replace(/:icon/,data.icon);

        if(req.query.err){
            html = html.replace(':error','その名前は既に登録されています<br>');
        }else{
            html = html.replace(':error','');
        }

        // 設定画面を表示
        res.render('settings.ejs',{
            title : '設定',
            main : html,
            loginStatus : myfunc.login_html(req.session)
        });
    }
});
/**
 * 設定の変更を反映する
 * http://localhost:3000/settings
 */
router.post('/', upload.single('icon'),function(req, res){
    //セッションの確認
    if(!req.session.loginStatus){
        res.redirect('/login?redirect=/');
    }else{
        // アイコンが置いてあるurl
        var url_icon = './public/image/user_icon/';
        // リクエストの取得
        var name = req.body.name;
        // ファイルアップロードがない時の処理
        if(req.file == undefined){
            var icon = req.session.loginData.icon;
        }else{
            var icon = `${req.file.filename}.jpg`;
            // アイコン更新時、元のアイコン画像データを削除。デフォルト画像の場合は削除しない
            if(req.session.loginData.icon != 'user.jpg'){
                fs.unlink(`${url_icon}${req.session.loginData.icon}`,(err)=>{
                    if(err)console.log(err);
                })
            }
            // ファイルに拡張子jpgをつける
            fs.rename(url_icon + req.file.filename,`${url_icon}${icon}`,(err)=>{
                if(err)console.log(err);
            })
        }

        // TODO 入力チェック

        // データベースオープン
        var db = new sqlite3.Database("./public/sqlite/sourcedata.sqlite");

        db.serialize(function(){
            var sql = `UPDATE user SET name = "${name}", icon = "${icon}" WHERE name = "${req.session.loginData.name}"`;
            db.run(sql,function(err){
                if(err){
                    // エラーの時(ユーザ名が既に登録されている時)
                    console.log(err);
                    // エラー文付きの設定ページへ
                    res.redirect('/settings?err=true');
                }else{
                    // セッションの変更
                    req.session.loginData = {
                        name : name,
                        pass : req.session.loginData.pass,
                        icon : icon
                    }
                    res.redirect('/settings');
                }
            })
        })
        
    }
})

module.exports = router;