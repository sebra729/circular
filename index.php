<!DOCTYPE HTML>
<html lang="en">

<div id="dom-target" style="display: none;">
  <?php
      include_once("filehandeler.php");
      $wordArr = readWords("words.txt");
      echo $wordArr;
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
    <div class="controls">
      <a href="#" id="leftButton">&laquo;</a>
      <a href="#" id="rightButton">&raquo;</a>
    </div>
  </div>

  <script type="text/javascript" src="circular.js"> </script>
</body>
</html>