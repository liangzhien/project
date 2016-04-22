
$('#utm_source2').val(Request('utm_source',''));
$('#utm_medium2').val(Request('utm_medium',''));
$('#utm_campaign2').val(Request('utm_campaign',''));
$('#utm_utmcmd2').val(Request('utm_utmcmd',''));
$('#utm_content2').val(Request('utm_content',''));
//--------------> 媒体来源代码  粘贴结束
//预约UVPV
function createUVPV2(name,phone,provice,city,time){
	var axel = Math.random() + "";
	//把那些信息传值过来，电话号码取后四位或六位即可
	var a = axel * 10000000000000;
	$("body").append('<iframe src="http://3500956.fls.doubleclick.net/activityi;src=3500956;type=wfdci0;cat=2016a000;u1=['+name+'];u2=['+phone+'];u3=['+provice+'];u4=['+city+'];u5=['+time+'];ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');

	axel = Math.random() + "";
	a = axel * 10000000000000;
	$("body").append('<iframe src="http://3500956.fls.doubleclick.net/activityi;src=3500956;type=wfdci0;cat=2016a00;u1=['+name+'];u2=['+phone+'];u3=['+provice+'];u4=['+city+'];u5=['+time+'];ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');


}

$(function() {


	var _api = new Api_dealer.act('province2', 'city2', 'dealer2');

	global_base_url = Api_dealer.uri.base_url;
	// //省份
	_api.get_province('', function() {

		if (only_province.length > 0) {
			//将不存在的option删掉！！
			$.each($('#province2 option'), function(k, v) {
				var _s = $(v).text();
				if ($.inArray(_s, only_province) == -1) {
					$(v).remove();
				}
			});
		}
		_api.get_city('', function() {

			//将不存在的option删掉！！
			if (only_city.length > 0) {
				$.each($('#city2 option'), function(k, v) {
					var _s = $(v).text();
					if ($.inArray(_s, only_city) == -1) {
						$(v).remove();
					}
				});
			}

			_api.get_dealer('', function() {
				// $('#dealer').change();
				// $('#dealer_phone').html ( $('#dealer option:selected').attr('phone') );

				$('#province2 option').each(function() {
					var _this = $(this);
					if (_this.text().indexOf(remote_ip_info.province) != -1) {
						// _this.attr('selected',true);
						_this[0].selected = true;
						$('#province2').change();
					}
				});
			});
		});

	});

	$('#province2').change(function() {
		if (only_province.length > 0) {
			//将不存在的option删掉！！
			$.each($('#province2 option'), function(k, v) {
				var _s = $(v).text();
				if ($.inArray(_s, only_province) == -1) {
					$(v).remove();
				}
			});
		}

		_api.get_city('', function() {
			//将不存在的option删掉！！
			if (only_city.length > 0) {
				$.each($('#city2 option'), function(k, v) {
					var _s = $(v).text();
					if ($.inArray(_s, only_city) == -1) {
						$(v).remove();
					}
				});
			}
			_api.get_dealer('', function() {

				$('#city2 option').each(function() {
					var _this = $(this);
					if (_this.text().indexOf(remote_ip_info.city) != -1) {
						// _this.attr('selected', true);
						_this[0].selected = true;
						$('#city2').change();
					}
				});


				$('#dealer2').change();
			});
		});
	});

	$('#city2').change(function() {
		_api.get_dealer('', function() {
			$('#dealer2').change();
		});
	});
function pyRegisterCvt(_orderno){
	var w=window,d=document,e=encodeURIComponent;
	var b=location.href,c=d.referrer,f,g=d.cookie,h=g.match(/(^|;)\s*ipycookie=([^;]*)/),i=g.match(/(^|;)\s*ipysession=([^;]*)/);
	if (w.parent!=w){f=b;b=c;c=f;};u='//stats.ipinyou.com/cvt?a='+e('MKs.k2s.GfIzCR62XWlz_dfZ_qaIg_')+'&c='+e(h?h[2]:'')+'&s='+e(i?i[2].match(/jump\%3D(\d+)/)[1]:'')+'&u='+e(b)+'&r='+e(c)+'&rd='+(new Date()).getTime()+'&OrderNo='+e(_orderno)+'&e=';
	(new Image()).src=u;
}
	var uploadlock = false;
	$('#btnsbt2').click(function(event) {
		// return;
		if(uploadlock)return;
		uploadlock = true;
		ga('send','event','C02_Conversion','con_试驾提交','dfax-7wap_con_TestDrive-Submit');
		_smq.push(['custom','dfAX7M','dfAX7M-drive-submit']);
		if ($.trim($('#realname2').val()) == '') {
			alert('姓名不可为空');
			uploadlock = false;
			return false;
		}
		if ($.trim($('#mobile2').val()) == '') {
			alert('电话不可为空');
			uploadlock = false;
			return false;
		} else if (!/^(13|14|15|17|18|19)[0-9]{9}$/.test($('#mobile2').val())) {
			alert('电话号码格式不对');
			uploadlock = false;
			return false;
		}
		if ($('#buyplan2').val() === '你的购车计划') {
			alert('请选择意向购车时间');
			uploadlock = false;
			return false;
		}
		var p = $('#frm2').serialize();
		p += '&model=东风风神AX7';
		pyRegisterCvt($('#mobile2').val());
		$.post(global_base_url + 'api/add_order?jp=1', p, function(json) {
			if (json.code != '200') {
				alert(json.msg);
			} else {
				ga('send','pageview', '/VP/dfax-7wap/预约试驾成功',{'dimension1': $('#realname2').val()+'_'+$('#mobile2').val().substr(-4,11)+'_'+ $('#province2').val()+ '_' + $('#city2').val()+'_'+ $('#buyplan2').val() });
				createUVPV2($('#realname2').val(),$('#mobile2').val(),$('#province2').val(),$('#city2').val(),$('#buyplan2').val());
				var str = $('#realname2').val()+'_'+$('#mobile2').val().substr(-4,11)+'_'+$('#province2').val()+'_'+$('#city2').val()+'_'+$('#buyplan2').val() ;
				_smq.push(['custom','dfAX7M','dfAX7M-drive-submit-success','{'+str+'}']);
				alert('提交成功');
			}
			uploadlock = false;
		}, 'jsonp').error(function(){
			uploadlock = false;
			alert('网络错误，请重试');
		});
	});
		// console.log(remote_ip_info);
}); //endof $ ready

