<?php
    
    header('Content-type: application/json ');

    try{
        if(@$_POST['num'] == "") $num = 6;
        else $num = @$_POST['num'];

        $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION );

        $pdo = new PDO("sqlite:sourcedata.sqlite", "", "", $options);

        $result = $pdo->query("SELECT * FROM sourcedata ORDER BY create_time DESC LIMIT ".$num.", 5".";")->fetchAll(PDO::FETCH_ASSOC);
        
        // jsonエンコード
        echo json_encode($result);

    }catch(PDOException $e){
        echo 'Connection failed: '. $e->getMessage();
        exit;
    }

?>