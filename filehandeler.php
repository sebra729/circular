<?php

// function readWords($fileName)
// {
// 	if(file_exists($fileName))
// 	{
// 		$file = file($fileName);
// 		return json_encode($file);
// 	}
// 	else{
// 		return json_encode(["no file: $fileName"]);
// 	}
// }

// function readWords($fileName)
// {
// 	if(file_exists($fileName))
// 	{
// 		$file = file($fileName);
// 		return $file;
// 	}
// 	else{
// 		return ["no file: $fileName"];
// 	}
// }

function readWords($fileName)
{
	if(file_exists($fileName))
	{
		$file = file_get_contents($fileName);
		return $file;
	}
	else{
		return "no file: $fileName";
	}
}
?>