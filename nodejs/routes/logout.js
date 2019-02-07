const express = require('express');
const router = express.Router();

/**
 * ログアウト処理
 * http://localhost:3000/logout
 */
router.get('/',(req, res)=>{
    // セッションを削除
    delete req.session.loginStatus;
    delete req.session.loginData;
    // リダイレクト
    res.redirect(req.query.redirect);
})

module.exports = router;