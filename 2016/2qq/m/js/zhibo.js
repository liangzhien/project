var videoBoxW = $(".video_box .bd").width();
var videoBoxH = $(".video_box .bd").height();
//点播播放调用
function play1(vid){
	var video = new tvp.VideoInfo();
	video.setVid(vid);
	var player = new tvp.Player();
	var myplayer = new tvp.Player();
	myplayer.create({
	    width: videoBoxW,
	    height: videoBoxH,
	    type: 2,//type=1 直播  type=2 点播
	    video: video,
	    modId: "video",
	    autoplay: true
	});
}
//直播播放调用
function play2(curChannelId){//curChannelId  100003600 直播频道id;
	var video = new tvp.VideoInfo();
	video.setChannelId(curChannelId);
	var player = new tvp.Player();
	player.create({
	  width  : videoBoxW,
	  height : videoBoxH,
	  video  : video,
	  modId  : "video",
	  playerType: 'html5',
	  type: 1
	});
}

