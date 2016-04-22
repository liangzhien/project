/**
	可选省市  空数组时"[]" 表示全部	如
	var only_province=['河北','河南'];
	var only_city=['石家庄','郑州'];
	**/
var only_province = [];
var only_city = [];

//媒体来源代码 
//<------------粘贴开始
function Request(strName, defaultValue) {
    var strHref = location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return defaultValue;
}

$('#utm_source').val(Request('utm_source',''));
$('#utm_medium').val(Request('utm_medium',''));
$('#utm_campaign').val(Request('utm_campaign',''));
$('#utm_utmcmd').val(Request('utm_utmcmd',''));
$('#utm_content').val(Request('utm_content',''));
//--------------> 媒体来源代码  粘贴结束

//在线订车UVPV
function createUVPV1(name,phone,provice,city,time,dealer){
	var axel = Math.random() + "";
	//把那些信息传值过来，电话号码取后四位或六位即可
	var a = axel * 10000000000000;
	$("body").append('<iframe src="http://3500956.fls.doubleclick.net/activityi;src=3500956;type=siskq0;cat=2016a00;u1=['+name+'];u2=['+phone+'];u3=['+provice+'];u4=['+city+'];u5=['+time+'];u6=['+dealer+'];ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');


	 axel = Math.random() + "";
	 a = axel * 10000000000000;
	$("body").append('<iframe src="http://3500956.fls.doubleclick.net/activityi;src=3500956;type=siskq0;cat=2016a00;u1=['+name+'];u2=['+phone+'];u3=['+provice+'];u4=['+city+'];u5=['+time+'];u6=['+dealer+'];ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');


}


$(function() {


	var _api = new Api_dealer.act('province', 'city', 'dealer');

	global_base_url = Api_dealer.uri.base_url;
	// //省份
	_api.get_province('', function() {

		if (only_province.length > 0) {
			//将不存在的option删掉！！
			$.each($('#province option'), function(k, v) {
				var _s = $(v).text();
				if ($.inArray(_s, only_province) == -1) {
					$(v).remove();
				}
			});
		}
		_api.get_city('', function() {

			//将不存在的option删掉！！
			if (only_city.length > 0) {
				$.each($('#city option'), function(k, v) {
					var _s = $(v).text();
					if ($.inArray(_s, only_city) == -1) {
						$(v).remove();
					}
				});
			}

			_api.get_dealer('', function() {
				// $('#dealer').change();
				// $('#dealer_phone').html ( $('#dealer option:selected').attr('phone') );

				$('#province option').each(function() {
					var _this = $(this);
					if (_this.text().indexOf(remote_ip_info.province) != -1) {
						// _this.attr('selected',true);
						_this[0].selected = true;
						$('#province').change();
					}
				});
			});
		});

	});

	$('#province').change(function() {
		if (only_province.length > 0) {
			//将不存在的option删掉！！
			$.each($('#province option'), function(k, v) {
				var _s = $(v).text();
				if ($.inArray(_s, only_province) == -1) {
					$(v).remove();
				}
			});
		}

		_api.get_city('', function() {
			//将不存在的option删掉！！
			if (only_city.length > 0) {
				$.each($('#city option'), function(k, v) {
					var _s = $(v).text();
					if ($.inArray(_s, only_city) == -1) {
						$(v).remove();
					}
				});
			}
			_api.get_dealer('', function() {

				$('#city option').each(function() {
					var _this = $(this);
					if (_this.text().indexOf(remote_ip_info.city) != -1) {
						// _this.attr('selected', true);
						_this[0].selected = true;
						$('#city').change();
					}
				});


				$('#dealer').change();
			});
		});
	});

	$('#city').change(function() {
		_api.get_dealer('', function() {
			$('#dealer').change();
		});
	});
function pyRegisterCvt(_orderno){
	var w=window,d=document,e=encodeURIComponent;
	var b=location.href,c=d.referrer,f,g=d.cookie,h=g.match(/(^|;)\s*ipycookie=([^;]*)/),i=g.match(/(^|;)\s*ipysession=([^;]*)/);
	if (w.parent!=w){f=b;b=c;c=f;};u='//stats.ipinyou.com/cvt?a='+e('MKs.k2s.GfIzCR62XWlz_dfZ_qaIg_')+'&c='+e(h?h[2]:'')+'&s='+e(i?i[2].match(/jump\%3D(\d+)/)[1]:'')+'&u='+e(b)+'&r='+e(c)+'&rd='+(new Date()).getTime()+'&OrderNo='+e(_orderno)+'&e=';
	(new Image()).src=u;
}
	var uploadlock = false;
	$('#btnsbt').click(function(event) {
		// return;
		if(uploadlock)return;
		uploadlock = true;
	    ga('send','event','C02_Conversion','con_订车提交','dfax-7wap_con_Order-Submit');
	    _smq.push(['custom','dfAX7M','dfAX7M-buy']);
		if ($.trim($('#realname').val()) == '') {
			alert('姓名不可为空');
			uploadlock = false;
			return false;
		}
		if ($.trim($('#mobile').val()) == '') {
			alert('电话不可为空');
			uploadlock = false;
			return false;
		} else if (!/^(13|14|15|17|18|19)[0-9]{9}$/.test($('#mobile').val())) {
			alert('电话号码格式不对');
			uploadlock = false;
			return false;
		}
		if ($('#buyplan').val() === '你的购车计划') {
			alert('请选择意向购车时间');
			uploadlock = false;
			return false;
		}
		var p = $('#frm').serialize();
		p += '&model=东风风神AX7';
		pyRegisterCvt($('#mobile').val());
		$.post(global_base_url + 'api/add_order?jp=1', p, function(json) {
			if (json.code != '200') {
				alert(json.msg);
			} else {
				ga('send','pageview', '/VP/dfax-7wap/在线订车成功',{'dimension2': $('#realname').val()+'_'+$('#mobile').val().substr(-4,11)+'_'+ $('#province').val()+ '_' + $('#city').val()+'_'+ $('#buyplan').val() +'_'+$('#dealer').val()});
				createUVPV1($('#realname').val(),$('#mobile').val(),$('#province').val(),$('#city').val(),$('#buyplan').val(),$('#dealer').val());
				var str = $('#realname').val()+'_'+$('#mobile').val().substr(-4,11)+'_'+$('#province').val()+'_'+$('#city').val()+'_'+$('#buyplan').val()+'_'+$('#dealer').val() ;
				_smq.push(['custom','dfAX7M','dfAX7M-buy-submit-success','{'+str+'}']);
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

