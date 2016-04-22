function loadImg(imgUrl,loadComplete,progress){
	var len = imgUrl.length;
	var num = 0;
	var checkLoad = function(){
		num++;
		var percent=parseInt(num/len*100);
		if(progress){
			progress(percent);
		}
		if( num == len ){
			loadComplete();
		}
	}
	var checkImg = function(url){
		var val= url;
		var img=new Image();
		if(img.readyState){
			img.onreadystatechange = function(){
				if(img.readyState=="complete"||img.readyState=="loaded"){
					checkLoad();
				}
			}
		}else{
			img.onload=function(){
				if(img.complete==true){
					checkLoad();
				}
			}
		}
		img.src=val;
	}
	for( var i = 0; i < len; i++ ){
		checkImg(imgUrl[i]);
	}
}

$(".btnshare").on("click",function(){
	$(".bg,.pop").show();
})
$(".pop").on("click",function(){
	$(".bg,.pop").hide();
})
