<?php

function readWords($fileName)
{
	if(file_exists($fileName))
	{
		$string = file_get_contents($fileName);
		$string = explode("\r\n", $string);
		return json_encode($string);
	}
	else{
		return false;
	}
}

function readJSON($fileName)
{
	if(file_exists($fileName))
	{
		$string = file_get_contents($fileName);
		return $string;
	}
	else{
		return false;
	}
}

// function readWords($fileName)
// {
// 	if(file_exists($fileName))
// 	{
// 		$file = file_get_contents($fileName);
// 		return $file;
// 	}
// 	else{
// 		return "no file: $fileName";
// 	}
// }
?>