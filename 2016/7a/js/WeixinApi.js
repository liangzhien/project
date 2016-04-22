(function(){
	var _title = '东风风神AX7 2016款配置再升级，新增1.4T发动机，智豪上市！';
    var _desc = '东风风神AX7 2016款配置再升级，新增1.4T发动机，智豪上市！';
    
    var _link = window.location.href;
    var _imgUrl = 'images/share.jpg';
	
	var url = window.location.href.split("#")[0];
    var signPackage;
    var info = {
                    appId: '',
                    secret: '',
                    url: url
                }
 
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://app.hocodo.com/webapps/qixiaoshi/weixinservice.php?callback=?",         
		data: { "param": JSON.stringify(info) },
        async: false,
        success: function (data) {
		    wx.config({
				//debug: true,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: [
				  // 所有要调用的 API 都要加到这个列表中	  
				   'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'hideMenuItems',
					'showMenuItems',
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',					
					'getNetworkType',
					'openLocation',
					'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'closeWindow'
					]
			});
			
		wx.ready(function () {
    // 在这里调用 API
    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    
        wx.onMenuShareAppMessage({
            title: _title,
            desc: _desc,
            link: _link,
            imgUrl: _imgUrl,
            trigger: function (res) {
                //alert('用户点击发送给朋友');
            },
            success: function (res) {
                //alert('已分享');
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
        

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  
        wx.onMenuShareTimeline({
            title: _title,
            link: _link,
            imgUrl: _imgUrl,
            trigger: function (res) {
               // alert('用户点击分享到朋友圈');
            },
            success: function (res) {
               // alert('已分享');
            },
            cancel: function (res) {
               // alert('已取消');
            },
            fail: function (res) {
               // alert(JSON.stringify(res));
            }
        });
			
			
		})	//end of wx.ready 
			
		}
	})
})();
