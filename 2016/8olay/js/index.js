;(function(){
	var height = $(window).height();
	var $page1 = $('.page1'),
		$page2 = $('.page2'),
		$page3 = $('.page3'),
		$name = $('#name'),
		$name2 = $('#name2'),
		$info = $('#info'),
		$textarea = $(".pop_text textarea"),
		$popText = $(".pop_text");
	$(".page").css({height:height});
	$('#btnOk').on("touchend",function(){
		_gaq.push(['_trackEvent', 'Apply','Click', 'Apply']);
		 if($name.text().length==''){
		   alert('请输入对方昵称');
		   return; 
		 }
		 if($name.text().length>10){
		   alert('对方昵称不能超过10个字');
		   return; 
		 }		 
		 if($.trim($info.text().length)<5||$info.text()=='输入祝福语'){
		   alert('祝福语不少于5个字');
		   return; 
		 }			 
		 if($.trim($name2.val())==''){
		   alert('请输入你的昵称');
		   $name2.focus();
		   return; 
		 }		 
		 $page2.show();
		 
	});
//	$(".txt").on('focus',function(){
//		if(App.isAndroid){
//			$page1.css({height:height});
//			
//		}
//		alert($page1.height())
//	});
//	$(".txt").on('blur',function(){
//		if(App.isAndroid){
//			$page1.css({height:"100%"});
//		}
//	});	
	$info.on("click",function(){
		$popText.show();
		$textarea.focus();
	});
	$('#btnBox > img').eq(0).on('click',function(){
		$page2.hide();
		_gaq.push(['_trackEvent', 'submit','Click', 'Try again']);
	});
	$popText.find(".btn1").on('click',function(){
		$popText.hide();
	});
	$popText.find(".btn2").on('click',function(){
		 if($textarea.val().length<5){
		   alert('祝福语不少于5个字');
		   return; 
		 }	
		 var str = $textarea.val().slice(1,30)+'...';
		 $info.text($textarea.val())
		$popText.hide();
	});	
	$.ajax({
		type:"GET",
		dataType :'json',
		url:App.domain+'act/?type=getNickname',
		success : function(data){
			
		}
	});	
	$('#btnBox > img').eq(1).on('click',function(){
		var info = {
			'senderName' :$name.text(),
			'receiverName' :$name2.val(),
			'blessText' :$info.text(),
		}
		if(App.isClick){
			return;
		}
		$.ajax({
			type:"GET",
			dataType :'json',
			beforeSend : function(){
				App.isClick = true;
			},
			data :info,
			url:App.domain+'act/?type=submit',
			success : function(data){
				var data = data;
				if(parseInt(data.result)==0){
					$page3.show();
				}else{
					alert(data.msg);
				}
				App.isClick = false;
			}
		});
		_gaq.push(['_trackEvent', 'submit','Click', 'submit']);
		
	});	
})();
