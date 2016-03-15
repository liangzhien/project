var wxData = {
	imgUrl: 'http://midea.sobox.tv/act1212/images/share.jpg',
	link: 'http://midea.sobox.tv/act1212/',
	desc: '美的即滤即饮201净水器邀你来砍价',
	title: "美的即滤即饮普及风暴，高端净水器0元带回家",
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
	//alert(JSON.stringify(res));
});