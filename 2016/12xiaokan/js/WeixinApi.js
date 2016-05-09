'use strict';
document.write('<script src="http://hyms.hylinkgz.cn/jsapi.php?url=' + encodeURIComponent(location.href) + '" type="text/javascript"></script>');
var wxData = {
	imgUrl: 'http://xiaokang.hylinkgz.cn/superhome/images/share.jpg',
	link: location.href,
	desc: '',
	title: "风光580《出击吧！超级家庭！》",
	share: function() {
		//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		wx.onMenuShareTimeline({
			title: '东风风光580震撼激战《出击吧！超级家庭！》超燃首发，iPad mini4等你拿',
			link: wxData.link,
			imgUrl: wxData.imgUrl,
			success: function() {
				wxData.success();
				wxData.callback();
			},
			cancel: function() {

			}
		});

		//获取“分享给朋友”按钮点击状态及自定义分享内容接口
		wx.onMenuShareAppMessage({
			title: wxData.title,
			desc: '东风风光580超燃激战，还有iPad mini4等你拿',
			link: wxData.link,
			imgUrl: wxData.imgUrl,
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				wxData.success();
				wxData.callback();
			},
			cancel: function() {

			}
		});
	},
	success: function() {

	},
	callback: function() {

	}
};


wx.ready(function() {
	wxData.share();
});
wx.error(function(res) {
	alert(JSON.stringify(res));
});