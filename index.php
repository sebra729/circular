<!DOCTYPE HTML>
<html lang="en">

<!-- Dom container for the words -->
<div id="dom-words" style="display: none;">
  
  <?php
      include_once("filehandeler.php");
      $wordArr = readWords("words.txt");
      if($wordArr){
        echo $wordArr;
      }else{
        $nullWord = array_fill(0, 9, 'NoWord');
        echo json_encode($nullWord);
      }
      
  ?>
</div>

<!-- Dom container for the answers -->
<div id="dom-answers" style="display: none;">
  <?php
      include_once("filehandeler.php");
      $answerArr = readJSON("answers.txt");
      if($answerArr){
        echo $answerArr;
      }else{
        $nullAnswer["answer"] = "Choose Black";
        $nullAnswer["color"] = "#000000";
        echo json_encode($nullAnswer);
      }
  ?>
</div>

<head>
  <title>Cirular</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=400, height=400, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<!-- <link href="style.css" media="all" rel="stylesheet" /> -->
</head>

<body>
  <div id="gameView">
    <canvas id="gameCanvas"></canvas>
  </div>

  <script type="text/javascript" src="circular.js"> </script>
</body>
</html>