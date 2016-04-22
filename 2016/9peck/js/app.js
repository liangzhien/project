  //插入视频函数
  function playAnimation(flash,callBack,w,h){

      var w = w||637;
      var h = h||360;
      var swfPlayer=[];      

      swfPlayer.push('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width='+w+' height='+h+' id="player" align="middle">');
      swfPlayer.push('<param name="movie" value="video/player.swf" />');
      swfPlayer.push('<param name="allowfullscreen" value="true" /> ');
      swfPlayer.push('<param name="FlashVars" value='+flash+' />');
      swfPlayer.push('<param name="quality" value="high" />');
      swfPlayer.push('<param name="bgcolor" value="#000000" />');
      swfPlayer.push('<param name="play" value="true" />');
      swfPlayer.push('<param name="loop" value="true" />');
      swfPlayer.push('<param name="wmode" value="opaque" />');
      swfPlayer.push('<param name="scale" value="showall" />');
      swfPlayer.push('<param name="menu" value="true" />');
      swfPlayer.push('<param name="devicefont" value="false" />');
      swfPlayer.push('<param name="salign" value="" />');
      swfPlayer.push('<param name="allowScriptAccess" value="sameDomain" />');
      swfPlayer.push('<!--[if !IE]>-->');
      swfPlayer.push('<object type="application/x-shockwave-flash" data="video/player.swf"  width='+w+' height='+h+' id="player" align="middle">');
      swfPlayer.push('<param name="movie" value="video/player.swf" />');
      swfPlayer.push('<param name="FlashVars" value='+flash+' />');
      swfPlayer.push('<param name="quality" value="high" />');
      swfPlayer.push('<param name="bgcolor" value="#000000" />');
      swfPlayer.push('<param name="play" value="true" />');
      swfPlayer.push('<param name="loop" value="true" />');
      swfPlayer.push('<param name="wmode" value="opaque" />');
      swfPlayer.push('<param name="scale" value="showall" />');
      swfPlayer.push('<param name="menu" value="true" />');
      swfPlayer.push('<param name="devicefont" value="false" />');
      swfPlayer.push('<param name="salign" value="" />');
      swfPlayer.push('<param name="allowScriptAccess" value="sameDomain" />');
      swfPlayer.push('<!--<![endif]-->');
      swfPlayer.push('<a href="http://www.adobe.com/go/getflash">');
      swfPlayer.push('http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="获得 Adobe Flash Player');
      swfPlayer.push('</a>');
      swfPlayer.push('<!--[if !IE]>-->');
      swfPlayer.push('</object>');
      swfPlayer.push('<!--<![endif]-->');
      swfPlayer.push('</object>');        
      callBack && callBack(swfPlayer);
  }
   var $popVideo = $(".pop_video");
  	$(".page1 .video_box").on("click",function(){
  		  
  		  if($(this).hasClass('video_box2')){
  		  	 $popVideo.removeClass('v2');
  		  	 $popVideo.addClass("v1");
  		  }else{
  		  	 $popVideo.removeClass('v1');
  		  	 $popVideo.addClass("v2");
  		  }
  		  $popVideo.show();
	   	  var url = $(this).attr("data-video");
	      playAnimation(url,function(swfPlayer){
	           $(".video").html(swfPlayer.join(''));
	      }); 		
  	});
	$(".btn_close").on("click",function(){
		$popVideo.hide();
		$(".video").html('');
	});
