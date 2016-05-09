function getData(){
	var $province=$("#province"),$city=$("#city"),$dealer =$("#dealer");
	var $name = $("#name"),$mobile = $("#mobile");
	var provinceId,cityId,dealerId;
    $.ajax({
	     type: "GET",
	     url: App.domain+'get_province_list',
	     dataType: "jsonp",
	     jsonp: "jsoncallback",
	     success: function(data){
	     	var html = '';
			var data = data;
	     	if(parseInt(data.code) ==200){
	     		html+='<option value="">请选择省份</option>';
	     		for(var i=0;i<data.data.length;i++){
	     			html+='<option value='+data.data[i]["id"]+'>'+data.data[i]["name"]+'</option>';
	     		}
	     		$province.empty().append(html)	
	     	}else{
	     		alert(data.msg)
	     	}
	        
	     }
 	});
 	$province.on("change",function(){
 		if($(this).find("option:selected").text()=='请选择省份'){
 			return;
 		}
 		provinceId = parseInt($(this).find("option:selected").val());
 		
 		getCity(provinceId);
 	});
  	$city.on("change",function(){
 		if($(this).find("option:selected").text()=='请选择城市'){
 			return;
 		}
 		cityId= parseInt($(this).find("option:selected").val());
 		getDealer(provinceId,cityId);
 		
 	});	
  	$dealer.on("change",function(){
 		dealerId= $(this).find("option:selected").val();
 	});	 	
 	$(".btn_form").on('click',function(){
		if ($.trim($name.val()) == '') {
			alert('姓名不可为空');
			return false;
		}
		if ($.trim($mobile.val()) == '') {
			alert('电话不可为空');
			return false;
		} else if (!/^(13|14|15|17|18|19)[0-9]{9}$/.test($mobile.val())) {
			alert('电话号码格式不对');
			return false;
		} 	
		if ($province.find("option:selected").text() == '请选择省份') {
			alert('请选择省份');
			return false;
		}	
		if ($city.find("option:selected").text() == '请选择城市') {
			alert('请选择城市');
			return false;
		}	
		if ($dealer.find("option:selected").text() == '请选择经销商') {
			alert('请选择经销商');
			return false;
		}				
 		 if(App.isClick){return;}
 		 App.isClick = true;
// 		 var obj ={
// 		 	'customer':18, //标识(int)
// 		 	'product' :'no',     //车型代码(String)
// 		 	'name' :$name.val(),  //用户姓名(String)
// 		 	'mobile': $mobile.val(), //手机号(String)
// 		 	'dealer_province' :provinceId,//经销商所在省(通过选择经销商时可以记录)(int)
// 		 	'dealer_city' :cityId, //经销商所在市(int)
// 		 	'dealer' :dealerId,//	经销商所在市(String)
// 		 	'way' :56,  //56：在线收集(int)
// 		 	'channel' : 177,//177：移动专题(int)
// 		 	'ctype':122 //125：服务咨询  (对应型录索取)126：在线订单 （对应在线购车）122：预约试驾（对应预约试驾）
//
// 		 };
		var dataStr ='dcad=utm_source:|utm_content:|utm_medium:|utm_campaign:&dcev=customer:18|product:14585|pattern:|name:'+$name.val()+'|sex:1|mobile:'+$mobile.val()+'|dealer_province:'+provinceId+'|dealer_city:'+cityId+'|dealer_area:|dealer:'+dealerId+'|ctype:122|way:56|channel:177|email:|activity:331|remarks:|media';
 	     $.ajax({
		     type: "GET",
		     url: App.domain+'index?'+dataStr,
		     dataType: "jsonp",
		     jsonp: "jsoncallback",
		     success: function(data){
		     	App.isClick = false;
		     	if(parseInt(data.code) ==200){
		     		$('.pop_sue').fadeIn();
					
		     	}else{
		     		alert(data.msg);
		     	}
		        
		     },
		     error : function(){
		     	alert(data.msg);
		     }
	 	});			
 	});
 	function getCity(id){
	     $.ajax({
		     type: "GET",
		     url: App.domain+'get_city_list'+'?is_dealer=1',
		     dataType: "jsonp",
		     jsonp: "jsoncallback",
		     data :{'p_id':id},
		     success: function(data){
		     	
		     	var html = '';
				var data = data;
		     	if(parseInt(data.code) ==200){
		     		console.log(data);
		     		html+='<option value="">请选择城市</option>';
		     		for(var i=0;i<data.data.length;i++){
		     			html+='<option value='+data.data[i]["id"]+'>'+data.data[i]["name"]+'</option>';
		     		}
		     		$city.empty().append(html)

		     	}else{
		     		alert(data.msg)
		     	}
		        
		     }
	 	});		
 	}
 	function getDealer(provinceid,cityid){
	     $.ajax({
		     type: "GET",
		     url: App.domain+'get_dealer_list',
		     dataType: "jsonp",
		     jsonp: "jsoncallback",
		     data :{'provinceid':provinceid,'cityid':cityid},
		     success: function(data){
		     	
		     	var html = '';
				var data = data;
		     	if(parseInt(data.code) ==200){
		     		console.log(data);
		     		html+='<option value="">请选择经销商</option>';
		     		for(var i=0;i<data.data.length;i++){
		     			html+='<option value='+data.data[i]["dea_id"]+'>'+data.data[i]["dea_name"]+'</option>';
		     		}
		     		$dealer.empty().append(html);

		     	}else{
		     		alert(data.msg)
		     	}
		        
		     }
	 	});		
 	} 	
}
