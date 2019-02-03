/**
 * req.sessionを受け取り、それに応じたlogin画面のhtmlをString型で返す
 * 
 * @param {} session req.sessionを受け取る
 * @return {String} htmlを返す
 */
exports.login_html = function(session){
    if(session.loginStatus){
        // ログインしている時
        return (function(){/*
            <div style='display:flex'>
                <img id="icon2" src="image/user_icon/:icon">
                <div id="prof">:name </div>
            </div>
            <div style='display:flex'>
                <button id="logout">ログアウト</button>
                <button id="setting">設定</button>
            </div>
            <style>
                #logout,#setting,#prof{
                    width : 120px;
                    cursor : pointer;
                    margin-left: 0;
                }
                #icon2{
                    width: 30px;
                    height: 30px;
                    cursor : pointer;
                }
            </style>
            <script>
                $("#logout").on("click",()=>{
                    window.location.href = '/logout?redirect='+location.pathname;
                })
                $("#prof,#icon2").on("click",()=>{
                    window.location.href = '/:name';
                })
                $('#setting').on('click',()=>{
                    window.location.href = '/settings';
                })
            </script>
        */}).toString().match(/\/\*([^]*)\*\//)[1].replace(/:name/g,session.loginData.name)
        .replace(/:icon/,session.loginData.icon);
    }else{
        // ログインしていない時
        return (function(){/*
            <button id="loginBtn">ログイン</button>
            <button id="signBtn">サインアップ</button>
            <style>
                #loginBtn,#signBtn{
                    width : 120px;
                    cursor : pointer
                }
            </style>
            <script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
            <script>
                $('#loginBtn').on('click',function(){
                    window.location.href = "/login?redirect="+location.pathname;
                })
                $('#signBtn').on('click',function(){
                    window.location.href = "/signup?redirect="+location.pathname;
                })
            </script>
        */}).toString().match(/\/\*([^]*)\*\//)[1]
    }
}