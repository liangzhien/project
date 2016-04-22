/**
 * Created by zhien.liang on 2016/3/3.
 */
!(function(W,D){
    W.App = W.App || {
        domain:"http://promotion.geely.com/dhgs/gxaction.php?act=get_data&",
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
	if( W.App.ua().isMobile){
		//location.href="http://promotion.geely.com/dhgs/m/";
	}
    var $win  = $(W);
    var doc = D;
    var $html = $("html,body");
    var $body = $('body');
    var winHeight = $win.height();
    var winWidth = $win.width();
    var startWidth = 1920;
    var startHeight = 1080;
    var timer;
     //加载入口
    var imgList = [];
    var $loads = $(".loads");
    var l = $loads.length;
    for(var i=0;i<l;i++){
        imgList.push($loads.eq(i).attr("src"));
    }
    var imgLoad  = new ImgLoader(imgList,function(a,b){ 
        $('.loading').fadeOut();
        $body.addClass("on");
		$.setNav();  
		loadNextImg({'box':'.load2'});
		$(".t2").jScrollPane({"autoReinitialise":true});
    },function(a,b){
        $(".loading span").text(a+"%");
        $(".loading i").css({"width":a+"%"});
    });  
    function loadNextImg(o){
    	var $load  = $(o.box);
       $load.each(function(){
        var self = $(this);
        if(self.attr('data-src')){
            var src = self.attr("data-src");
            self.attr("src",src);
            self.removeAttr("data-src");
        }
      });        	 
    }    
    function reset(){
    	winWidth = $win.width();
    	var lineW = (1129/startWidth)*winWidth;
    	var lineW2 = (1580/startWidth)*winWidth;
    	$(".ico_line >img").css({"width":lineW});
    	$("#img2_2 >img").css({"width":lineW2});
    }
    
    $(window).resize(function(){
    	timer && clearTimeout(timer);
    	timer = setTimeout(function(){
    		reset();
    	},200);
    });
    
    //智美
    !(function(){
    	var $part2_2 = $('#part2_2'),$part2_3 = $('#part2_3');
	    $(".part2 .bd").slide({
	    	"effect" :"fold",
	    	"mainCell" : '.inner',
	    	"interTime" :4000,
	    	"delayTime" : 600,
	    	'titCell' :".see_ul li",
	    	'defaultIndex' : 1,
	    	'trigger' :'click',
	    	startFun : function(i){
	    		if(i==0){
	    			startSlide();
	    			isOne = false;
	    		}
	    	}
	    });
	    //外观
	    var lineW = (1129/startWidth)*winWidth;
	    var lineWp =  (1129/startWidth)*100 +'%';
	    $(".ico_line >img").css({"width":lineW});	  
	    $('#btn2_2').on("click",function(){
	    	$(this).fadeOut();
	    	$(".ico_line").animate({"width":lineWp},1000,function(){
	    		$part2_2.find('.play>img').eq(1).fadeIn(1000,function(){
	    			$part2_2.find(".points_box2").fadeIn();
	    		});   		
	    	});
	    });
	    //内饰
 	    $('#btn2_3,.btn_notice2').on("click",function(){
	    	$('#btn2_3').fadeOut();
    		$part2_3.find('.play>img').eq(1).fadeIn(1000,function(){
    			$part2_3.find(".points_box").fadeIn(function(){
    				
    			});
    		});   		

	    });   	
    	//中欧
	    var lineW2 = (1580/startWidth)*winWidth;
	    var lineWp2 =  (1570/startWidth)*100 +'%';
	    $("#img2_2 >img").css({"width":lineW2});	    	
    	var $play2_1 = $("#part2_1"),$navBox = $(".nav_box");
    	var timer ,timer2,isOne=true;
    	function startSlide(){
    		if(isOne){
		     	 $("#part2_1").slide({
			    	"effect" :"fold",
			    	"mainCell" : ' .slide',
			    	"interTime" :4000,
			    	"delayTime" : 600,
			    	'titCell' :".nav_box li",
			    	'defaultIndex' :0,
			    	'trigger' :'click',
			    	endFun : function(i){
			    		timer2 && clearTimeout(timer2);
			    		if(i==0){
			    			setTimeout(function(){
			    				$("#img1_2").removeClass('hide');
			    			},200);
			    			
			    			timer2 =setTimeout(function(){
				    			$("#img1").removeClass('hide').css('opacity', 0).transition({
									opacity:1
								}, 2000,function(){
								});
								$("#img1_2").addClass('hide');
			    			},1400);
			    		}else if(i==1){

			    			timer2 =setTimeout(function(){
						    	$("#img2_2").animate({"width":lineWp2},1200,function(){
					    			$("#img2").removeClass('hide').css('opacity', 0).transition({opacity:1},2000,function(){}); 		
						    	});
			    			},100);	    			
			    		}else if(i==2){
			    			$("#img3_2").removeClass('hide');
			    			timer2 =setTimeout(function(){
				    			$("#img3").removeClass('hide').css('opacity', 0).transition({
									opacity:1
								}, 2000,function(){

								});
			    			},1200);		    			
			    		}
			    	},
			    	startFun : function(){
			    		timer && clearTimeout(timer);
			    		timer = setTimeout(function(){
			    			$("#img1,#img1_2,#img2,#img3").addClass('hide');
			    		},100)
			    		$("#img2_2").css({"width":0})
			    	}
			    });   			
    		}
    	}


    })();
    //智奴
    !(function(){
    	var $car1 = $(".part3 .car1"), $car2 = $(".part3 .car2");
    	var timer ;
	    $(".part3 .bd").slide({
	    	"effect" :"fold",
	    	"mainCell" : '.inner',
	    	"delayTime" : 600,
	    	'titCell' :".nav_box2 li",
	    	'defaultIndex' : 0,
	    	'trigger' :'click',
	    	startFun : function(i){
    			if(i!=2){
	    			setTimeout(function(){
		    			TweenMax.set($car1,{"x":"-150%",y:"104%"});
		    			TweenMax.set($car1.find(".car_lu1"),{"rotation":0});
		    			TweenMax.set($car1.find(".car_lu2"),{"rotation":0});
		    			TweenMax.set($car2,{"x":"-40%",y:"-24%",opacity:0});
		    			TweenMax.set($car2.find(".car_lu1"),{"rotation":0});
		    			TweenMax.set($car2.find(".car_lu2"),{"rotation":0});	
		    			$(".part3 .tit_box2").hide(); 	
						$('#tit2').addClass('hide');
						$(".part3 .tit_box1").hide(); 	
		    		},610);	    				
    			}
	    	},
	    	endFun : function(i){
	    		timer &&clearTimeout(timer);
	    		if(i==2){
		    		timer = setTimeout(function(){
		    			carGo();
		    		},100);	    			
	    		}

	    	}
	    });    	
	    
	    //底盘
		var rX, rY, mX, mY, eX, eY, isDown = false,step2=50;  
		var $tit = 	$(".part3 .con2 .ico1");
		var $road2 = $("#roadbox2"), $road1 = $("#roadbox1"),$btnRoad1 = $("#btn_road1"),$btnRoad2 = $("#btn_road2"),zIndex=1;
	    $(".part3 .move").on({
			mousedown: function(e) {
				isDown = true;
				rX = e.pageX;
				rY = e.pageY;
			},
			mouseup: function(e) {
				isDown = false;
				mX = e.pageX;
				mY = e.pageY;				
				if (mX - rX > step2) {
					
			    	if($btnRoad2.hasClass("on")){return};
			    	$btnRoad2.addClass("on");
			    	$btnRoad1.removeClass("on");
			    	$road2.transition({'opacity':0});
			    	$('.part3 .ico_box1').fadeOut();
			    	$tit.eq(0).hide();
			    	$tit.eq(1).show();
			    	console.log($tit)
			    	$road1.removeClass('hide').css({'opacity':0}).transition({
						opacity:1
					}, 1200,function(){
						$('.part3 .ico_box2').fadeIn();
					});
				
				} else if (mX - rX < -step2) {
					
			    	if($btnRoad1.hasClass("on")){return};
			    	$btnRoad1.addClass("on");
			    	$btnRoad2.removeClass("on");
			    	$road1.transition({'opacity':0});
			    	$('.part3 .ico_box2').fadeOut();
			    	$tit.eq(1).hide();
			    	$tit.eq(0).show();			    	
			    	$road2.removeClass('hide').css({'opacity':0}).transition({
						opacity:1
					}, 1200,function(){
						$('.part3 .ico_box1').fadeIn();
					});
				}				
				rX =mX = mY = 0;
				rY = 0;
				
			}
		});
    	$("#btn_road0").on("click",function(){
    		$btnRoad2.removeClass("on");
    		$btnRoad1.removeClass("on");
    		$('.part3 .ico_box').hide();
    		$road1.transition({
					opacity:0
				}, 1200,function(){
					
			});
    		$road2.transition({
					opacity:0
				}, 1200,function(){
					
			});	
	    	$tit.eq(1).hide();
	    	$tit.eq(0).show();					
    	});
    	//esp 
    	function carGo(){
    		TweenMax.to($car1.find(".car_lu1"),3,{css:{rotation:360},delay:.4});
    		TweenMax.to($car1.find(".car_lu2"),3,{css:{rotation:360},delay:.4});
    		var a = TweenMax.to($car1,2.8,{css:{x:"0%",y:'0%'},delay:.5,onComplete:function(){
    			$(".part3 .tit_box1").fadeIn(); 	
    			$('#tit2').removeClass('hide');
	    		TweenMax.to($car2.find(".car_lu1"),2,{css:{rotation:360},delay:1.5});
	    		TweenMax.to($car2.find(".car_lu2"),2,{css:{rotation:360},delay:1.5});
	    		TweenMax.to($car2,1.9,{css:{x:"0%",y:'0%',opacity:1},delay:1.4});
	    		setTimeout(function(){
		    		$(".part3 .tit_box2").fadeIn(); 
		    	},2200);
    		}}); 	
    	}

    })();
    //智能
    ;(function(){
    	$("#part4").slide({
	    	"effect" :"fold",
	    	"mainCell" : '.inner',
	    	"delayTime" : 600,
	    	'titCell' :".nav_box3 li",
	    	'defaultIndex' : 0,
	    	'trigger' :'click',
	    	startFun : function(i){

	    	}    		
    	});
    	
    	//智能安全
     	 $("#part4_1").slide({
	    	"effect" :"fold",
	    	"mainCell" : ' .slide',
	    	"interTime" :4000,
	    	"delayTime" : 600,
	    	'titCell' :".nav_box li",
	    	'defaultIndex' :0,
	    	'trigger' :'click',
	    	endFun : function(i){
			
	    	},
	    	startFun : function(){

	    	}
	    }); 
    	//智能互联
    	var $part4_2 = $("#part4_2");
     	 $("#part4_2").slide({
	    	"effect" :"fold",
	    	"mainCell" : '.slide',
	    	"interTime" :4000,
	    	"delayTime" : 600,
	    	'titCell' :".nav_box li",
	    	'defaultIndex' :0,
	    	'trigger' :'click',
	    	endFun : function(i){
			
	    	},
	    	startFun : function(){

	    	}
	    }); 	    
	    $("#btn_4").on('click',function(){
	    	$(this).hide();
	    	$part4_2.find('.ico1_4').fadeIn();
	    	setTimeout(function(){
	    		$part4_2.find('.ico1_2').fadeIn();
	    		$part4_2.find('.ico1_4').hide();
	    	},1000);
	    	
	    });
    	//智能舒适
     	 $("#part4_3").slide({
	    	"effect" :"fold",
	    	"mainCell" : '.slide',
	    	"interTime" :4000,
	    	"delayTime" : 600,
	    	'titCell' :".nav_box li",
	    	'defaultIndex' :0,
	    	'trigger' :'click',
	    	endFun : function(i){
			
	    	},
	    	startFun : function(){

	    	}
	    }); 	 

	    
	    //acc自适应巡航
	    $("#btn_car").on("click",function(){
	    	$(this).hide();
	    	carMove.play();
	    });
	    var $car1 = $('#part4_1 .car1'),$car2 = $('#part4_1 .car2');
	    var carMove  = (function(){
	    	var play = function(){
//	    		$car1.find(".car_lu1").delay(100).transition({ rotate:2080},5500,'ease-in-out');   
//	    		$car1.find(".car_lu2").delay(100).transition({ rotate:2080},5500,'ease-in-out');     		
//				$car1.delay(300).transition({ translate: ["95%",0] },1500,'easeInOutQuad');
//				$car1.transition({ translate: ["420%",0] },5500);
//				
//	    		$car2.find(".car_lu1").delay(400).transition({ rotate:2080},7000);   
//	    		$car2.find(".car_lu2").delay(400).transition({ rotate:2080},7000); 
//	    		$car2.delay(600).transition({translate: ["430%",0], opacity:1},9000,"ease",function(){
//		    		$car1.css({ translate: ["-150%",0] }).delay(500).transition({ translate: [0,0] },2000);
//		    		$car2.css({ translate: ["-260%",0] }).delay(200).transition({ translate: [0,0] },2000);
//		    		$car1.find(".tit").addClass('hide');
//		    		$car1.find(".tit").removeClass('on');	 
//		    		$("#btn_car").delay(2000).fadeIn();
//		    		$car1.find(".car_lu1").css({ rotate:-360}).delay(400).transition({ rotate:0},2200,'ease-in-out');  
//		    		$car1.find(".car_lu2").css({ rotate:-360}).delay(400).transition({ rotate:0},2200,'ease-in-out');  
//		    		$car2.find(".car_lu1").css({ rotate:-360}).transition({ rotate:0},2200,'ease-in-out');  
//		    		$car2.find(".car_lu2").css({ rotate:-360}).transition({ rotate:0},2200,'ease-in-out');  
//	    		});
		    	setTimeout(function(){
		    		$car1.find(".tit").removeClass('hide')
		    	},0);	   
		    	setTimeout(function(){
		    		$car1.find(".tit").addClass('on')
		    	},600);	
		    	setTimeout(function(){
		    		$car1.find(".tit").removeClass('on')
		    	},1700);
				TweenMax.to($car1,1,{css:{x:"100%",y:'0%'},delay:.1,ease:Strong.easeInCubic})
				TweenMax.to($car1,4.2,{css:{x:"430%",y:'0%'},delay:0.8,ease:'linear'});
				TweenMax.to($car1.find(".car_lu1"),5.5,{css:{rotation:2280},delay:.1,ease:'linear'});
				TweenMax.to($car1.find(".car_lu2"),5.5,{css:{rotation:2280},delay:.1,ease:'linear'});
				
	    		TweenMax.to($car2.find(".car_lu1"),5,{css:{rotation:2280},delay:.4,ease:'linear'});
	    		TweenMax.to($car2.find(".car_lu2"),5,{css:{rotation:2280},delay:.4});
	    		TweenMax.to($car2,5,{css:{x:"480%",y:'0%',opacity:1},ease:'linear',delay:.4,onComplete: function(){
	    			reset();
	    		}});
	    	},reset = function(){
	    		$car1.find(".tit").addClass('hide');
	    		$car1.find(".tit").removeClass('on');	 
	    		$("#btn_car").delay(2000).fadeIn();	  
	    		TweenMax.set($car1,{x:"-150%"});
	    		TweenMax.to($car1,2,{css:{x:"0%"},delay:.5})
				TweenMax.set($car1.find(".car_lu1"),{"rotation":-360});
				TweenMax.to($car1.find(".car_lu1"),2,{css:{rotation:0},delay:.4});
    			TweenMax.set($car1.find(".car_lu2"),{"rotation":-360});
    			TweenMax.to($car1.find(".car_lu2"),2,{css:{rotation:0},delay:.4});
    			
 	    		TweenMax.set($car2,{x:"-260%"});
	    		TweenMax.to($car2,2,{css:{x:"0%"},delay:.2})
				TweenMax.set($car2.find(".car_lu1"),{"rotation":-360});
				TweenMax.to($car2.find(".car_lu1"),2,{css:{rotation:0},delay:.2});
    			TweenMax.set($car2.find(".car_lu2"),{"rotation":-360});
    			TweenMax.to($car2.find(".car_lu2"),2,{css:{rotation:0},delay:.2});   			
	    	}
	    	
	    	return {
	    		play : play,
	    		reset : reset
	    	}
	    }());
	    
	     $("#part4_3  .play3").slide({
	    	"effect" :"fold",
	    	"mainCell" : '.tab_box',
	    	"interTime" :4000,
	    	"delayTime" : 100,
	    	'titCell' :".tab_menu  li",
	    	'defaultIndex' :0,
	    	'trigger' :'click',
	    	endFun : function(i){
				
	    	},
	    	startFun : function(i){
				if(i!=1){
					carMove.reset();
				}
	    	}
	    }); 	
    })();
    
    //买点弹框展示
    !(function(){
    	var $popShow = $(".pop_show"),$innerBox =$popShow.find(".bd"),$btnShow = $(".btn_show"),html;
    	$popShow.on("click",function(){
    		$(this).fadeOut();
    	});
    	$btnShow.on("click",function(){
    		var tit = $(this).attr("data-tit");
    		var img = $(this).attr("data-innerimg");
    		popShow({
    			'img' :img,
    			'tit' : tit
    		});
    	});
    	function popShow(o){
    		var o = o ||{};
    		o.img = o.img;
    		o.tit = o.tit;
    		html='';
    		html='<img src="images/ico_close.png" class="ico btn_close" /><div class="img"><img src='+o.img+' alt="" /></div><p>'+o.tit+'</p>';
			$innerBox.empty().append(html);
			$popShow.fadeIn();
    	}
    })();
    
    $('.t3 p').on('click',function(){
    	var self = $(this);
    	if(!self.hasClass('on')){
    		self.addClass("on");
    		$(".t2").find('.same').hide();
    	}else{
    		self.removeClass('on');
    		$(".t2").find('.same').show();
    	}
    });
    $(".t2 h1").on("click",function(){
     	var self = $(this);
    	if(!self.hasClass('on')){
    		self.addClass("on");
    		self.next().hide();
    	}else{
    		self.removeClass('on');
    		self.next().show();
    	}   	
    });
    var $btnDrive = $('#btn_drive'),$btnDrive2 = $('#btn_drive2');
    $btnDrive.on('click',function(){
    	$(this).hide();
    	$btnDrive2.show();
    	$(".part5 .form").removeClass('hide');
    });
    $('#btn_drive2').on('click',function(){
    	$(this).hide();
    	$btnDrive.show();
    	$(".part5 .form").addClass('hide');
    });    
})(window,document);
