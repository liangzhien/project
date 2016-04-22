;(function(W,D){
	W.App = W.App || {
		wxShare: true,
		domain:"",
		debug: true,
        windowWidth : 0
	};
	W.App.getUrl = function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
    }
	W.App.id = function(dom) {
		return document.getElementById(dom);
	}
    W.App.loadImg = _loadImg;
    function _loadImg(imgUrl,loadComplete,progress){
        var len = imgUrl.length;
        var num = 0;
        var checkLoad = function(){
            num++;
            var percent=parseInt(num/len*100);
            if(progress){
                progress(percent);
            }
            if( num == len ){
                loadComplete();
            }
        }
        var checkImg = function(url){
            var val= url;
            var img=new Image();
            if(img.readyState){
                img.onreadystatechange = function(){
                    if(img.readyState=="complete"||img.readyState=="loaded"){
                        checkLoad();
                    }
                }
            }else{
                img.onload=function(){
                    if(img.complete==true){
                        checkLoad();
                    }
                }
            }
            img.src=val;
        }
        for( var i = 0; i < len; i++ ){
            checkImg(imgUrl[i]);
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
                self.bg.fadeOut();
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
        _showAnim(".wrap");
         /*start Dialog*/
        App.dialog = new Dialog();
        App.dialog.init();       
    });


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

	if(W.App.debug || W.App.getUrl('debug')){
		document.write('<script src="js/debug.js" type="text/javascript" charset="utf-8"><\/script>');
	}
	if(W.App.isWeiXin && W.App.wxShare){
		document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"><\/script><script src="js/WeixinApi.js" type="text/javascript" charset="utf-8"><\/script>');
	}    
    !(function() {
        var config = {
                windowWidth: 0,
                windowHeight: 0
            },
            scr = document.getElementsByTagName('script'),
            config_width = +scr[scr.length - 1].dataset.width || 640,
            timeout, setSize = function() {
                config.windowWidth = document.documentElement.clientWidth || window.innerWidth;
                config.windowHeight = document.documentElement.clientHeight || window.itimeoutnnerHeight;
                document.documentElement.style.cssText += 'font-size:' + config.windowWidth * 100 / config_width + 'px!important;';
            }
        setSize();
        document.addEventListener('DOMContentLoaded', function() {
            window.addEventListener('resize', function() {
                clearTimeout(timeout);
                timeout = setTimeout(setSize, 50);
            }, false);
        }, false);
    })();
    // !function(a) {
    //         function d() {
    //             var c = b.getBoundingClientRect().width;
    //             a.rem = c / 6.4 > 100 ? 100 : 50 > c / 6.4 ? 50 : c / 6.4, b.style.fontSize = a.rem + "px"
    //         }
    //         var c, b = a.document.documentElement;
    //         a.addEventListener("resize", function() {
    //             clearTimeout(c), c = setTimeout(d, 300)
    //         }, !1), a.addEventListener("pageshow", function(a) {
    //             a.persisted && (clearTimeout(c), c = setTimeout(d, 300))
    //         }, !1), d()
    //     }(window);
})(window,document);    

