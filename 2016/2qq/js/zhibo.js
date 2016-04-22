txv.common.initPage();
var video = new tvp.VideoInfo();

//点播播放调用
function play1(vid){
	video.setVid(vid);
	var myplayer = new tvp.Player();
	myplayer.create({
	    width: 1062,
	    height: 520,
	    type: 2,//type=1 直播  type=2 点播
	    video: video,
	    modId: "mod_player",
	    flashWmode:"transparent",
	    flashVersionTag:new Date().getTime(),
	    autoplay: true,
	    list:2,
	    vodFlashExtVars: {
			bullet: 1, //是否显示弹幕，默认不显示。0为隐藏，1为显示
			advbullet: 1, //是否显示高级图片弹幕，默认不显示。0为隐藏，1为显示
		}

	});
	
	//myplayer.nextplay(vid)
}
//直播播放调用
function play2(curChannelId,registid){//curChannelId  100003600 直播频道id; registid 直播频道对应评论id  1071240629
	video.setChannelId(curChannelId);
	var myplayer = new tvp.Player();
	myplayer.create({
	    width: 762,
	    height: 520,
	    type: 1,
	    video: video,
	    modId: "mod_player",
	    flashWmode:"transparent",
	    flashVersionTag:new Date().getTime(),
	    autoplay: true,
	    liveFlashExtVars: {
	        bullet: 1,
	        advbullet: 1,
	        registid: registid
	    }
	});
}

//flash 登录方法
window.__flashplayer_openLogin=function(){
    Live.login.openLogin();
}

//登录、退出回调
Live.login.addLoginCallback(function(){
    myplayer.flashobj&&myplayer.flashobj.updateLoginStatus && myplayer.flashobj.updateLoginStatus(1);
    registerCoralEvent.publicLogined&&registerCoralEvent.publicLogined();
    
});
Live.login.addLogoutCallback(function(){
    myplayer.flashobj&&myplayer.flashobj.updateLoginStatus && myplayer.flashobj.updateLoginStatus(0);
    registerCoralEvent.publicLogout&&registerCoralEvent.publicLogout();
});

