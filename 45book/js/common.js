;(function(W,D){
	W.App = W.App || {
		wxShare: false,
		domain:"",
		debug: false
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
        this.bg = $(".bg2");
        this.pop;    
    }
    Dialog.prototype = {
        init : function(){
            var self = this;
            
             $("body").on("click",".btn_pop",function(e){
                var dataPop = $(this).attr("data-pop")

                self.show(dataPop);
                if(dataPop=="share"){
                    _hmt.push(['_trackPageview', "/modal/邀请好友帮我砍价"]);
                }else if(dataPop=="pro"){
                    _hmt.push(['_trackPageview', "/modal/产品介绍"]);
                }
            });

            this.close.on("click",function(){
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
		document.write('<script src="http://qcdn.smswx.org/midea/act1212/121701/js/debug.js" type="text/javascript" charset="utf-8"><\/script>');
	}
	// if(W.App.isWeiXin && W.App.wxShare){
	// 	document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"><\/script><script src="js/WeixinApi.js" type="text/javascript" charset="utf-8"><\/script>');
	// }    
})(window,document);    

