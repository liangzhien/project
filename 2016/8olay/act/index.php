<?php
	 $type = strip_tags(trim($_REQUEST['type']));
	// $str = '{"result": "0", "msg": "错误信息"}';
	 switch ($type) {
		case "getNickname":
			$str = '{"result": "0/40000/40001", "msg": "错误信息", "nickname": "昵称"}';
			break;
		case "submit":
			$str = 	'{"result": "0", "msg": "错误信息"}';
			break;		

	 }
 	 echo $str;
?>