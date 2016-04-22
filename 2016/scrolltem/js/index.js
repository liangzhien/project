!(function(W){
    var system =  {
        domain:"",
    	ua: function() {
            var ua = navigator.userAgent,
                obj = {
                    name: ua,
                    isAndroid: /android/i.test(ua),
                    isIOS: /iphone os/i.test(ua),
                    isIpad: /ipad/i.test(ua),
                    isWM: /windows ce/i.test(ua) || /windows mobile/i.test(ua),
                    isMidp: /midp/i.test(ua),
                    isUc7: /rv:1.2.3.4/i.test(ua),
                    isUc: /ucweb/i.test(ua),
                    isWeiXin: /MicroMessenger/i.test(ua),
                    isWebKit: /webkit/i.test(ua),
                    isChrome: /Chrome/i.test(ua)
                }
            obj.isMobile = obj.isAndroid || obj.isIOS || obj.isIpad || obj.isWM || obj.isMidp || obj.isUc7 || obj.isUc;
            obj.isMac = /macintosh|mac os x/i.test(navigator.userAgent);
            if (ua.toLocaleLowerCase().indexOf('ucbrowser') > -1) {
                var control = navigator.control || {};
                if (control.gesture) {
                    control.gesture(false);
                }
            }
            return obj;
        }
    };
    
	if( system.ua().isMobile){
		
	}
    var $win  = $(W);
    var $html = $("html,body");
    var $body = $('body');	
    var canMove = true;
	var loaderStart = new En.Loading();
	loaderStart.init({
	    imgs:[],
	    enterCallback:function(){
	        var per = this.count/this.length*100>>0;
	        $('.loading .per').height(per+'%')
	    },
	    callback:function(){
	    	setTimeout(function(){
	    		$(".loading").hide();
	    	},300);
	    	$.setNav(); 
			start();
			secLoad();
	    }
	});
	function secLoad(){
		var loaderSec = new En.Loading();
		loaderSec.init({
		    imgs:[],
		    searchImgs:{
				dom:$('body')[0],
					type:'src2'
				},
		    callback:function(){

		    }
		});		
	}		
	var start = function(){
        $win.scroll(function(e){
            e.preventDefault();
        });
        if(!system.ua().isMac){
            $win.on('mousewheel',function(e,d){
                if(!canMove){
                    return;
                }
                e.preventDefault();
                if(d>0){
                    $html.stop(true).animate({"scrollTop":"-="+250+"px"},1200,"easeOutCubic",function(){});
                }else{
                    $html.stop(true).animate({"scrollTop":"+="+300+"px"},1200,"easeOutCubic",function(){});
                }
            });
          
        }else{
        	  $body.addClass("on");
        }
		sceneBox();
	
	}
	function sceneBox(){
		//场景
        var controller = new ScrollMagic.Controller();
		var tl2 = new TimelineMax();
		var  tl0 = TweenMax.fromTo("#trigger", 0.5, {y: 0}, {y: -$(window).width()*.1,ease: Linear.easeNone});
		var  tl2 = TweenMax.fromTo("#trigger2", 0.5, {y: 0}, {y: -$(window).width()*.2,ease: Linear.easeNone});		
		var  tl2_2 = TweenMax.fromTo(".box", 0.5, {left: 0}, {left:200,ease: Linear.easeNone});	
		var scene1 = new ScrollMagic.Scene({
							triggerElement: "#trigger",
							triggerHook: 0,
        					duration: $(".page1").height()
						})
						.setTween(tl0)
						.addTo(controller);	
		var scene2 = new ScrollMagic.Scene({
							triggerElement: "#trigger2",
							triggerHook: 1,
        					duration: $(".page3").height() +$(window).height()
						})
						.setTween(tl2) // trigger a TweenMax.to tween
						.addIndicators({name: "1 (duration: 1)"}) // add indicators (requires plugin)
						.addTo(controller);							
		var scene2_2 = new ScrollMagic.Scene({
							triggerElement: "#trigger2 .scene",
							triggerHook: .2,
        					duration: 200
						})
						.setTween(tl2_2) 
						.addIndicators({name: "1 (duration: 1)"}) // add indicators (requires plugin)
						.addTo(controller);
	}
})(window);
