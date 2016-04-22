;(function(W,D){
	W.App = W.App || {
		wxShare: false,
		domain:"",
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
        this.bg = $(".page2");
        this.pop;    
    }
    Dialog.prototype = {
        init : function(){
            var self = this;
             $("body").on("click",".btn_pop",function(e){
                self.show($(this).attr("data-pop"));
            });

            this.close.on("click",function(){
                $(this).parents(".pop").fadeOut().removeClass("on");
                self.bg.hide();
                $(".wrap").show();
            });   
        },
        show : function(name,callBack){
            var self  = this;
            this.pop = this.pops.filter(".pop_"+name);
            this.pop.show().siblings(".pop").hide();
            $(".wrap").hide();
            self.bg.show();   
            callBack && callBack();       
            if(name=="step1"){
            	window.removeEventListener('shake', shakeEventDidOccur, false);     
				//myShakeEvent.stop();
            }
        },
        hide : function(name){
            this.pop = this.pops.filter(".pop_"+name);
            this.pop.hide();
            this.bg.hide();   
            $(".wrap").show();

        }
    } 	
	
    $(function(){
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
})(window,document);    

