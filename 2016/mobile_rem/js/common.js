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

	
	if (!Date.now) {
		Date.now = function() {
			return new Date().getTime();
		};
	}
	/**       
	 * 对Date的扩展，将 Date 转化为指定格式的String       
	 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符       
	 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)       
	 * eg:       
	 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423       
	 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04       
	 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04       
	 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04       
	 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18       
	 */
	Date.prototype.format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份           
			"d+": this.getDate(), //日           
			"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
			"H+": this.getHours(), //小时           
			"m+": this.getMinutes(), //分           
			"s+": this.getSeconds(), //秒           
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度           
			"S": this.getMilliseconds() //毫秒           
		};
		var week = {
			"0": "日",
			"1": "一",
			"2": "二",
			"3": "三",
			"4": "四",
			"5": "五",
			"6": "六"
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if (/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}
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

 	function Dialog(){
        this.pops = $(".pop");
        this.len  = this.pops.length;
        this.close = $(".btn_close");
        this.btn = $(".btn_pop");
        this.bg = $(".bg");
        this.pop;    
    }
    Dialog.prototype = {
        init : function(){
            var self = this;
             $("body").on("touchend",".btn_pop",function(e){
                self.show($(this).attr("data-pop"));
            });

            this.close.on("touchend",function(){
                $(this).parents(".pop").fadeOut().removeClass("on");
                self.bg.hide();
            });   
        },
        show : function(name,callBack){
            var self  = this;
            this.pop = this.pops.filter(".pop_"+name);
            this.pop.show().siblings(".pop").hide();
            this.pop.find("#bd").css({"marginTop":-(this.pop.find("#bd").height())/2});
            self.bg.show();          
            callBack && callBack();         
        },
        hide : function(name){
            this.pop = this.pops.filter(".pop_"+name);
            this.pop.hide();
            this.bg.hide();   
        }
    } 	
    function _showAnim(_box,_self) {
        var $animateDom = $(_box);
        var $element = _self ? $animateDom : $animateDom.find('[data-animation]');
        $element.css({
            '-webkit-animation': 'none',
            'display': 'none'
        });
      $element.each(function(index, element){
            var $element    = $(element),
                $animation  = $element.attr('data-animation'),
                $duration   = $element.attr('data-duration') || 500,
                $timfunc    = $element.attr('data-timing-function') || 'ease',
                $delay      = $element.attr('data-delay') ?  $element.attr('data-delay') : 0,
                $iterate    = $element.attr('data-iterate') ? $element.attr('data-iterate') : 1;
            $element.css({
                'display': 'block',
                '-webkit-animation-name': $animation,
                '-webkit-animation-duration': $duration + 'ms',
                '-webkit-animation-timing-function': 'ease',
                '-webkit-animation-timing-function': $timfunc,
                '-webkit-animation-delay': $delay + 'ms',
                '-webkit-animation-iteration-count': $iterate,
                '-webkit-animation-fill-mode': 'both'
            });

        });

        return $animateDom;
    }	
    $(function(){
        //_showAnim(".wrap");
         /*start Dialog*/
        App.dialog = new Dialog();
        App.dialog.init();       
    });	
	if(App.debug || App.getUrl('debug')){
		document.write('<script src="lib/debug.js" type="text/javascript" charset="utf-8"><\/script>');
	}
	if(App.isWeiXin && App.wxShare){
		document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"><\/script><script src="js/WeixinApi.js" type="text/javascript" charset="utf-8"><\/script>');
	}        
})(window,document);    

