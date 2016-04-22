
;(function(){
	window._pt_lt = new Date().getTime();
	
	
})();
;(function(W,D){
	W.App = W.App || {
		wxShare: false,
		domain:"actiontest.php",
		debug: false,
        windowWidth : 0
	};
	W.App.getUrl = function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
    }
	W.App.id = function(dom) {
		return document.getElementById(dom);
	}
	;(function() {
		App.ua = navigator.userAgent.toLowerCase();
		App.isAndroid = App.ua.match(/android/i) == "android";
		App.isIOS = App.ua.match(/iphone os/i) == "iphone os";
		App.isIpad = App.ua.match(/ipad/i) == "ipad";
		App.isWM = App.ua.match(/windows ce/i) == "windows ce" || App.ua.match(/windows mobile/i) == "windows mobile";
		var isMidp = App.ua.match(/midp/i) == "midp";
		var isUc7 = App.ua.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var isUc = App.ua.match(/ucweb/i) == "ucweb";
		App.isMobile = App.isAndroid || App.isIOS || App.isIpad || App.isWM || isMidp || isUc7 || isUc;
		App.isWeiXin = App.ua.match(/MicroMessenger/i) == "micromessenger";
		App.isWebKit = App.ua.match(/webkit/i) == "webkit";
		App.isChrome = App.ua.match(/Chrome/i) == "chrome";
		if (App.ua.indexOf('ucbrowser') > -1) {
			var control = navigator.control || {};
			if (control.gesture) {
				control.gesture(false);
			}
		}
	})();
    !(function() {
    	var config  ={};
		var src = document.getElementsByTagName('script'),
			html = document.documentElement,
			body,
			dataset = src[0].dataset,
			config_width = +dataset.width || 0,
			config_height = +dataset.height || 0,
			delay, setSize = function() {
				config.windowWidth = html.clientWidth || window.innerWidth || html.getBoundingClientRect().width;
				config.windowHeight = html.clientHeight || window.innerHeight || html.getBoundingClientRect().height;
				config.aspectRatio = config.windowWidth / config.windowHeight;

				if (!config_width || config.aspectRatio > config_width / config_height) {
					config.windowScale = config_height / config.windowHeight;
					html.style.cssText += 'font-size:' + config.windowHeight * 100 / config_height + 'px!important;';
				} else {
					config.windowScale = config_width / config.windowWidth;
					html.style.cssText += 'font-size:' + config.windowWidth * 100 / config_width + 'px!important;';
				}
				html.offsetWidth;
				if (App.ua.isAndroid && App.ua.isUc && !!body) {
					body.style.visibility = 'hidden';
					body.offsetHeight;
					body.style.visibility = 'visible';
				}
			}
		if (!config_height && !config_width) {
			config_width = 640;
		}
		setSize();
        document.addEventListener('DOMContentLoaded', function() {
            window.addEventListener('resize', function() {
                clearTimeout(delay);
                delay = setTimeout(setSize, 50);
            }, false);
        }, false);
    })();

	if(window.Audio){
		Audio.prototype.autoPlay = function(callback){
			var audio = this;
			audio.play();
			if(audio.paused){
				var ev = function() {
					document.removeEventListener('touchstart', ev, true);
					audio.play();
					callback && callback();
				}
				if (/MicroMessenger/i.test(navigator.userAgent)) {
					if (window.WeixinJSBridge) {
						WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
							audio.play();
							callback && callback();
						});
					} else {
						document.addEventListener("WeixinJSBridgeReady", function() {
							WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
								audio.play();
								callback && callback();
							});
						}, false);
					}
				} else {
					document.addEventListener('touchstart', ev, true);
				}
			}else{
				callback && callback();
			}
		}
	}

	if(App.debug || App.getUrl('debug')){
		document.write('<script src="http://bos.bj.baidubce.com/we-gd/olay/booking_test/js/debug.js" type="text/javascript" charset="utf-8"><\/script>');
	}
     
})(window,document);    

