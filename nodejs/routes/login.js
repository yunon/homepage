var express = require('express');
var router = express.Router();
var fs = require('fs');
var sqlite3 = require("sqlite3").verbose();
var async = require('async');

/**
 *  ログイン画面の表示
 *  http://localhost:3000/login
 */
router.get('/',function(req, res){
    var html = (function() {/*

        <form action='http://localhost:3000/login' method='post' name="form" id="form1">
            <fieldset>
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

 
    if(req.session.login){
        
    }else{

        res.render('contents_temp.ejs',{
            title: 'ログイン画面',
            meta : null,
            main: html,
            loginStatus : null
        });
    }

});

/**
 *  ポストを受けてログイン処理
 *  http://localhost:3000/login
 */
router.post('/',function(req, res){
    

    console.log(req.body.name);
    res.redirect(`http://localhost:3000${req.body.redirect}`);
});

module.exports = router;