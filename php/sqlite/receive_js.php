<?php
    
    header('Content-type: application/json ');

    try{
        
        $num = @$_POST['num'];

        $filter = $_POST["filter"];
        $colname = "time";
        $word; 
        $searchtype = $_POST["searchtype"];

        if($searchtype == 0){
            $word = '(SELECT id FROM sourcedata WHERE title LIKE "%'.$_POST["word"].'%")';
        }else{
            $word = '(SELECT id FROM tagJoin Where tagname="'.$_POST["word"].'")';
        }

        if($filter == "new"){
            $filter = "ASC";
        }else if($filter == "old"){
            $filter = "DESC";
        }else{
            $colname = "title";
            $filter = "DESC";
        }

        $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION );

        $pdo = new PDO("sqlite:sourcedata.sqlite", "", "", $options);

        $result = $pdo->query("SELECT id, title, time, group_concat(tagname) AS 'tagname'".
        " FROM sourceTagJoin WHERE id IN ".$word."GROUP BY id ORDER BY ".$colname." ".$filter." LIMIT ".$num.", 10;")->fetchAll(PDO::FETCH_ASSOC);
    
        // jsonエンコード
        echo json_encode($result);

    }catch(PDOException $e){
        echo 'Connection failed: '. $e->getMessage();
        exit;
    }

?>