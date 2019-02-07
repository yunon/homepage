<?php

  $sourcecode = $_POST["sourcecode"];
  $title = $_POST["title"];

  try {
    $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO('sqlite:sourcedata.sqlite','' ,'' ,$options);

    // ---  重複しない10桁のランダムな英数字を作成 ---------------

    $str_r;
    $sts = true;
    while($sts){
      // 10桁のランダムな英数字を取得
      $str = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUQRSTUVWXYZ";
      $str_r = substr(str_shuffle($str), 0, 10);
      
      // idが一致するレコードの数を出力するSQL文
      $sql1 = "SELECT COUNT(*) AS 'count' FROM sourcedata WHERE id = '".$str_r."';";

      $result1 = $pdo->query($sql1);  
      
      foreach($result1 as $row){
        if($row["count"] == 0) $sts = false;
      }    
    }

    // タグを分けて配列に保存
    $arrTg= preg_split("/[\s|\x{3000}]+/u", $_POST["tag"]);
    // 配列の中の重複を排除する
    $arrTg= array_unique($arrTg);
    //配列の中の空要素を削除する
    $arrTg = array_filter($arrTg, "strlen"); 
    //添字を振り直す
    $arrTg = array_values($arrTg);

    // ---- タグをデータベースに登録する --------
    foreach($arrTg as $i){
      
      $sql1 = "SELECT COUNT(*) AS 'count' FROM tagdata WHERE tagname='".$i."';";
      $result1 = $pdo->query($sql1);
      foreach($result1 as $row){
        if($row["count"] == 0){
          $pdo->query("INSERT INTO tagdata(tagname) VALUES('".$i."');");
        }
      }
      $result1 = $pdo->query("SELECT tagID FROM tagdata WHERE tagname='".$i."';");
      foreach($result1 as $i){
        $res = $i["tagID"];
      }
      $st = $pdo->prepare("INSERT INTO tag VALUES(:id, :tagID);");
      $st->bindParam(":id", $str_r);
      $st->bindParam(":tagID", $res);
      $st->execute();
    }
    
    // ---------- idとtitleをデータベースに登録する -----------------
    
    $sql1 = "INSERT INTO sourcedata(id, title) VALUES(:id, :title);";
    $st = $pdo->prepare($sql1);
    $st->bindParam(':id', $str_r);
    $st->bindParam(':title', $title);
    $st->execute();

    // ファイル作成
    $dir = "../sourcecode/";
    file_put_contents($dir.$str_r.".html" ,$sourcecode);

    // リダイレクト
    header("Location: ../index.html");

  } catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit;
  }         
?>
