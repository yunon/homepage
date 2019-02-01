var express = require('express');
var router = express.Router();

/**
 * ログアウト処理
 * http://localhost:3000/logout
 */
router.get('/',function(req, res){
    delete req.session.loginStatus;
    delete req.session.loginData;

    res.redirect();
})

module.exports = router;