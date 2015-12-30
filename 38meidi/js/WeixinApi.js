
var wxData = {
	imgUrl: 'http://xtep-zgqyh.event.smartapi.cn/images/share.jpg',
	link: 'http://xtep-zgqyh.event.smartapi.cn',
	desc: '谁将成为特步青训营的指力健将！？憋废话！多指教！',
	title: "谁将成为特步青训营的指力健将！？憋废话！多指教！",
	share: function() {
		//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		wx.onMenuShareTimeline({
			title: wxData.desc,
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
			desc: wxData.desc,
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