
<!-- フォームからの入力を受け取ってデータベースに登録する -->

<!doctype html>
<html lang="ja">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>

    <div class="container">
      
      <h1> test </h1>

      <?php

          $sourcecode = $_POST["sourcecode"];
          $title = $_POST["title"];

          try {
            $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
            $pdo = new PDO('sqlite:sourcedata.sqlite','' ,'' ,$options);

            // $result = $pdo->query("select * from sourcedata;");


            // ---  重複しない10桁のランダムな英数字を作成 ---------------

            $str_r;
            $sts = true;
            while($sts){
              // 10桁のランダムな英数字を取得
              $str = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUQRSTUVWXYZ";
              $str_r = substr(str_shuffle($str), 0, 10);
              
              $sql1 = "SELECT COUNT(*) AS 'count' FROM sourcedata WHERE id = '".$str_r."';";

              $result1 = $pdo->query($sql1);  
              
              foreach($result1 as $row){
                if($row["count"] == 0) $sts = false;
              }    
            }


            // ---------- sqliteにデータを追加 -----------------

            $sql1 = "INSERT INTO sourcedata(id, title) VALUES(:id, :title);";
            $result1 = $pdo->prepare($sql1);
            $result1->bindParam(':id', $str_r);
            $result1->bindParam(':title', $title);
            $result1->execute();

            
            // ファイル作成
            $dir = "../sourcecode/";
            file_put_contents($dir.$str_r.".html" ,$sourcecode);

            /*
              //元のページにリダイレクト？
              header("Location: http:");

            */

            echo "sucessfull!! <br>";
            echo "タイトル : ", $title, "<br>";
            echo "ファイル名 : ", $str_r, "<br>";

          } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            exit;
          }         
      ?>

    </div>
  
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
</html>