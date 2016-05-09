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
        this.bg = $(".bg2");
        this.pop;    
    }
    Dialog.prototype = {
        init : function(){
            var self = this;
            
             $("body").on("click",".btn_pop",function(e){
                var dataPop = $(this).attr("data-pop")

                self.show(dataPop);
            });

            this.close.on("click",function(){
                if($(this).attr("data-url")){
                    location.href= $(this).attr("data-url");
                    return false
                };
                $(this).parents(".pop").fadeOut().removeClass("on");
                self.bg.fadeOut();
            });   
        },
        show : function(name,callBack){
            var self  = this;
            this.pop = this.pops.filter(".pop_"+name);
            this.pop.show().siblings(".pop").hide();

            self.bg.show();          
            callBack && callBack();       

        },
        hide : function(name){
            this.pop = this.pops.filter(".pop_"+name);
            this.pop.hide(10);
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
         /*start Dialog*/
        App.dialog = new Dialog();
        App.dialog.init(); 
        _showAnim(".wrap");
    });
	if(App.debug || App.getUrl('debug')){
		document.write('<script src="js/debug.js" type="text/javascript" charset="utf-8"><\/script>');
	}
     
})(window,document);    

