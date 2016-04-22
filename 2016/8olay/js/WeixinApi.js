document.write('<script src="http://wxapp.wemediacn.com:9191/share/act.aspx?type=wxjsconfig&token=olay&url='+encodeURIComponent(location.href)+'" type="text/javascript"></script>');
var wxData = {
	imgUrl: 'http://bos.bj.baidubce.com/we-gd/olay/love419/images/share.jpg',
	link: 'http://campaign.olay.com.cn/love419/',
	desc: '马上为爱发声，即有机会让你的祝福登上Olay官微520最美情诗榜，更可能出现在史上最浪漫的花海现场，让你的浪漫耀目全城！',
	title: "Olay邀请您送上爱的祝福",
	share:function(){
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
	success:function(){
		
	},
	callback:function(){
		
	}
};
wx.ready(function() {
	wxData.share();
});
wx.error(function(res) {
	alert(JSON.stringify(res));
});