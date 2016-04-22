'use strict';
document.write('<script src="http://hyms.sinaapp.com/jsapi.php?url='+encodeURIComponent(location.href)+'" type="text/javascript"></script>');
var wxData = {
	imgUrl: 'http://relax.hylinkgz.cn/2016cny/mobile/images/share.jpg',
	link: 'http://relax.hylinkgz.cn/2016cny/mobile/index.html',
	title: '过年饮珠啤·梗系齐欢畅！',
	desc: '过年饮珠啤·梗系齐欢畅！',
	share:function(){
		//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		wx.onMenuShareTimeline({
			title: wxData.desc,
			link: wxData.link,
			imgUrl: wxData.imgUrl,
			success: function() {				
				wxData.callback();				
			},
			cancel: function() {
				$(".wrapper").removeClass("on");
			}
		});
		
		//获取“分享给朋友”按钮点击状态及自定义分享内容接口
		wx.onMenuShareAppMessage({
			title: wxData.title,
			desc: wxData.desc,
			link: wxData.link,
			imgUrl: wxData.imgUrl,
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				wxData.callback();
			},
			cancel: function() {
				$(".wrapper").removeClass("on");				
			}
		});
	},
	callback:function(){
		$(".bg,.pop").hide();
		$(".wrapper").addClass("on");
	}
};

wx.ready(function() {
	wxData.share();
});
wx.error(function(res) {
	//alert(JSON.stringify(res));
});