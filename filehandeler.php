<?php
/*Read word list from file 
Use line 11 for Windows
Use line 12 for Linux
*/
function readWords($fileName)
{
	if(file_exists($fileName))
	{
		$string = file_get_contents($fileName);
		// $string = explode("\r\n", $string);
		$string = explode("\n", $string);
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
?>