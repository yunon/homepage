<?php
    
    // おまじない？
    header('Content-type: application/json ');

    /*
    if(isset($_POST['userid']) && isset($_POST['passward'])){
        $id = $_POST['userid'];
        $pas = $_POST['passward'];
        $str = "AJAX REQUEST SUCCESS\nuserid:".$id."\npassward:".$pas."\n";
        $result = nl2br($str);
        echo $result;
    }else{
        echo 'FAIL TO AJAX REQUEST';
    }
    */

    try{

        $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION );
        $pdo = new PDO("sqlite:sourcedata.sqlite", "", "", $options);

        $sql1 = "SELECT * FROM sourcedata ORDER BY create_time DESC LIMIT 5;";
        // SQLの実行結果をfetchAll関数でresultに取り出す
        $result = $pdo->query($sql1)->fetchAll(PDO::FETCH_ASSOC);
        // jsonエンコード
        echo json_encode($result);

    }catch(PDOException $e){
        echo 'Connection failed: '. $e->getMessage();
        exit;
    }

?>