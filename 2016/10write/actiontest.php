<?php
   $act = strip_tags(trim($_REQUEST['act']));
  // $str = '{"result": "0", "msg": "错误信息"}';
   switch ($act) {
    case "get_carname":
      $str = '{"result" :1,"datas" : [{"zhimu" :"A","list" :[{"carname":"1","carlogo":"111.jpg"},{"carname":"2","carlogo":"111.jpg"}]},{"zhimu" :"B","list" :[{"carname":"1","carlogo":"111.jpg"},{"carname":"2","carlogo":"111.jpg"}]} ]}';
      break;
    case "get_carname":
         $str = '{"result" :1,datas : [{"zhimu" :"A","list" :[{"carname":"1","carlogo":"111.jpg"},{"carname":"2","carlogo":"111.jpg"}]},{"zhimu" :"B","list" :[{"carname":"3","carlogo":"111.jpg"},{"carname":"4","carlogo":"111.jpg"}]}]}';
      break;      
   }
   echo $str;
?>