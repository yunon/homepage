var express = require('express');
var router = express.Router();

/**
 * ログアウト処理
 * http://localhost:3000/logout
 */
router.get('/',function(req, res){
    // セッションを削除
    delete req.session.loginStatus;
    delete req.session.loginData;
    // リダイレクト
    res.redirect(`http://localhost:3000${req.query.redirect}`);
})

module.exports = router;