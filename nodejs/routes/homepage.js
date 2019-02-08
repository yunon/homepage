const express = require('express');
const router = express.Router();
const fs = require('fs');
const marked = require('marked');
const sqlite3 = require("sqlite3").verbose();
const myfunc = require('../myfunc.js');

/**
 *  ホームページ
 *  http://localhost:3000/
 */
router.get('/',(req, res)=>{

    res.render('homepage.ejs',{
        loginStatus : myfunc.login_html(req.session)
    })
});
/**
 * ユーザーのプロフィールページを返す
 */
router.get('/:user',(req, res, next)=>{

    const db = new sqlite3.Database("./public/sqlite/sourcedata.sqlite");
    let temp = (function(){/*
         <img src="/image/user_icon/:icon" style='width:50px;heigh:50px;'><br>
         名前 : 
         :name <br>
         登録日 : 
         :time <br>
    */}).toString().match(/\/\*([^]*)\*\//)[1];

    db.serialize(()=>{
        let sql = `select name, pass, date, icon from user where name = "${req.params.user}"`;
        db.get(sql,(err,data)=>{

            if(err){
                console.log(err);
            }else if(data == undefined){
                next();
            }else{
                // プロフィール画面を表示
                res.render('profile.ejs',{
                    title : `${data.name}さんのプロフィール`,
                    main : temp.replace(':name',data.name).replace(':time',data.date).replace(':icon',data.icon),
                    loginStatus : myfunc.login_html(req.session),
                });        
            }   
        })
    })
});
/**
 *  urlに応じて、表示するページを変える
 *  ここでmdファイルをhtmlに変換する
 *  url: http://localhost:3000/contents/*
 **/
router.get('/:sourcedata',(req, res)=>{

    // publicからmdファイルを読み込む
    fs.readFile(`${__dirname}/../public/sourcecode/${req.params.sourcedata}.md`,'utf8',
    function(err, data){
        let title, tags, author, html, meta;
        // 見つからなかった時
        if(err){
            html = '<p> not found </p>';
            title = tags = author = 'not found';
        }else{
            // メタデータを取得 (独自関数)
            let [meta_json, data2] = getMeta(data);
            data2 = addLineForImg(data2);
            // markdownをhtmlに変換
            html = marked(data2);

            title = meta_json.title;
            tags = `tags  :    ${meta_json.tags}`;
            author = `Author  :      ${meta_json.author}<br>`;
            meta = author+tags;
        }

        res.render('contents_temp.ejs',{
            main : html,
            title: title,
            meta : meta,
            loginStatus : myfunc.login_html(req.session)
        })
    })
});

// ---  関数定義 --- //
/**
 * "md形式のデータから'---'で囲われているメタ情報(json形式)"と、
 * "元データからメタ情報を省いたデータ"の２つを配列で返すメソッド
 * 
 * @param {String} md_data md形式のデータ 
 * @return {String} [json, md_data] 
 */
function getMeta(data){

    // 返り値(1)
    let json;
    // 返り値(2)
    let md;

    let title, tags, author;

    try{
        // '---'で囲まれた文字列を取得
        // String.match()で正規表現を使った際は戻り値が "配列で返ってくる"ので注意
        // 正規表現の改行は環境によって変わるので'\r\n|\n|\r'を使う
        json = data.match(/---[\r\n|\n|\r][\s\S]+---[\r\n|\n|\r]/)[0];
    
        // '---'で囲まれた文字列を排除したデータを取得
        md = data.replace(/title:\s.+[\r\n|\n|\r]/,'');
        md = md.replace(/tags:\s.+[\r\n|\n|\r]/,'');
        md = md.replace(/author:\s.+[\r\n|\n|\r]/,'');
        md = md.replace(/slide:\s.+[\r\n|\n|\r]/,'');
    
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

/**
 * "md形式のデータの<img>タグの後に<br>を付け加えて返す
 * 
 * @param {String} md_data md形式のデータ 
 * @return {String} md_data
 */
function addLineForImg(data){
    data = data.replace(/>/,'></p>');
    data = data.replace(/<img/,'<p><img');
    data = data.replace('![','<p>![');
    data = data.replace('.gif)','.gif</p>');
    
    return data;
}
module.exports = router;