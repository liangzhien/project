<?php
	 $type = strip_tags(trim($_REQUEST['mod']));
	// $str = '{"result": "0", "msg": "错误信息"}';
	 switch ($type) {
		case "game":
			$str = '{"ok": 1, "type": 0}';
			break;
	 }
 	 echo $str;
?>