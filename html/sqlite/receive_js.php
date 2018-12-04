<?php
    
    header('Content-type: application/json ');

    try{
        
        $num = @$_POST['num'];

        $filter = $_POST["filter"];
        $colname = "create_time";
        $word = $_POST["word"];

        if($filter == "new"){
            $filter = "DESC";
        }else if($filter == "old"){
            $filter = "ASC";
        }else{
            $colname = "title";
            $filter = "ASC";
        }

        $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION );

        $pdo = new PDO("sqlite:sourcedata.sqlite", "", "", $options);

        $result = $pdo->query("SELECT id,title,strftime('%s', datetime(CURRENT_TIMESTAMP))- strftime('%s', create_time) AS 'time' FROM sourcedata WHERE title LIKE '%".$word."%' ORDER BY ".$colname." ".$filter." LIMIT ".$num.", 5;")->fetchAll(PDO::FETCH_ASSOC);
    
        // jsonエンコード
        echo json_encode($result);

    }catch(PDOException $e){
        echo 'Connection failed: '. $e->getMessage();
        exit;
    }

?>