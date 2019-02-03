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
             :name <br>
            <div style='display:flex'>
                <button id="logout">ログアウト</button>
                <button id="prof">プロフィール</button>
            </div>
            <style>
                #logout,#prof{
                    width : 120px;
                    cursor : pointer;
                }
            </style>
            <script>
                $("#logout").on("click",()=>{
                    window.location.href = 'http://localhost:3000/logout?redirect='+location.pathname;
                })
                $("#prof").on("click",()=>{
                    window.location.href = 'http://localhost:3000/'+':name';
                })
            </script>
        */}).toString().match(/\/\*([^]*)\*\//)[1].replace(/:name/,session.loginData.name);
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
                    window.location.href = "http://localhost:3000/login?redirect="+location.pathname;
                })
                $('#signBtn').on('click',function(){
                    window.location.href = "http://localhost:3000/signup?redirect="+location.pathname;
                })
            </script>
        */}).toString().match(/\/\*([^]*)\*\//)[1]
    }
}