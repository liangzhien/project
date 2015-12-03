'use strict';
document.write('<script src="http://promotion.geely.com/mlsjs/jsapi.php?act=get_ticket&url='+encodeURIComponent(location.href)+'" type="text/javascript"></script>');
var wxData = {
	imgUrl: 'http://promotion.geely.com/yjzheye/images/share.jpg',
	link: 'http://promotion.geely.com/yjzheye/index.html',
	title: '吉利新远景电子杂志',
	desc: '吉利新远景 让幸福更进一步',
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
				
			}
		});
		wx.onMenuShareQQ({
			title: wxData.title,
			desc: wxData.desc,
			link: wxData.link,
			imgUrl: wxData.imgUrl,
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});		
	},
	callback:function(){
		
	}
};

wx.ready(function() {
	wxData.share();
});
wx.error(function(res) {
	//alert(JSON.stringify(res));
});