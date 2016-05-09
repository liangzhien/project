var loaderStart = new En.Loading();	
var curPage=0,nextLock=false,prevPage=0,$page = $(".page"),l  =$page.length;
var $page4 = $('.page4');
var winH = $(window).height();
function set(){
	$page.css({height:$(window).height()});
}
set();
//$(window).resize(set)
loaderStart.init({
    imgs:[],		  
     searchBgs :{
    	type:'bg'
    },
    enterCallback:function(){
        var per = this.count/this.length*100>>0;
        var h = per/100*winH-124;
        var h2 = per/100*winH-174;
        if(h2<0){
        	h2=0;
        }
        $('.loading .line').height(h);
       	$('.loading .btn_box').css({"top":h2});
        $('.loading .btn_box p').text(per+"%");
    },
    callback:function(){
    	setTimeout(function(){
	        $(".loading").hide();
	     	loadSec();
	     	start();
	     	getData();   		
    	},400);

    // nextPage(1)
    }
});
;(function(){
    var $btnMusic = $(".btn_music");
    var $music= document.getElementById('music');
    var isOff = localStorage.getItem("music");
    var isOneTouch = true;
    if(isOff){
        $btnMusic.addClass('on');
    }else{
        $music.play();
    }    
    $("body").on("touchend",function(){
        if(!isOff&&isOneTouch&&App.isAndroid){
            $music.play();
            isOneTouch = false;
        }
    });  
    $btnMusic.on("click",function(){
        var self = $(this);
        if(!self.hasClass('on')){
            $(this).addClass('on');
             $music.pause();
             localStorage.setItem("music",true);
        }else{

            $(this).removeClass('on');
             $music.play();    
             localStorage.removeItem("music");       
        }
    }); 
})();

var slide = (function(){
	var i = 0,l=2,timer;
	var $box=  $(".page1 .slide img");
	var play = function(){
		setInterval(function(){
			if(i<l-1){
				i++;
			}else{
				i=0;
			}
			$box.eq(i).show().siblings().fadeOut();
		},3300);
	}
	var reset = function(){
		
	}
	return {
		'play': play,
		'reset' : reset
	}
})();
$("#btn_nvh").on("click",function(){
	$(this).hide();
	$page4.find(".bd2 .con").eq(0).hide();
	$page4.find(".bd2 .con").eq(1).show();
	setTimeout(function(){
		nextPage(1);
	},2200);
});

//page2
var $per = $('.page .per');

$('.gas').bind('touchstart',function(ev) {
	TweenMax.to($per,1,{width:640});
	$(this).addClass('on');
	$('.page2').addClass('touch');
	ev.preventDefault();

}).bind('touchend',function(ev) {
	

	
		

	setTimeout(function(){
		$(".page2").addClass('next');
	},1000);
	setTimeout(function(){
		nextPage(1);
	},1600);			
	
	setTimeout(function(){
		TweenMax.to($per,0,{width:180});
	},2000);


	$(this).removeClass('on');
	ev.preventDefault();
}).bind('touchmove',function(ev) {
	ev.preventDefault();
	
});

//page6
var frame1 = new Frame({
	'box':'#frame',
	'callBack' : function(){
		setTimeout(function(){
			nextPage(1);
		},1000);
	}
});
$("#btn_eps").on("click",function(){
	$(this).hide();
	$(".page6 .i2_4").fadeIn();
	frame1.play();
});
//page8
$("#btn_find").on("click",function(){
	$('.page8 .bd2 .con').eq(0).hide();
	$('.page8 .bd2 .con').eq(1).show();
	setTimeout(function(){
		nextPage(1)
	},5500);
});
//page11
App.isOne = true;
$(".btn_box2 img").eq(0).on("click",function(){
	$(".pop_rule").fadeIn();
	rule();
	App.isOne = false;
});
var $popGood = $(".pop_good");
$(".btn_box2 img").eq(1).on("click",function(){
	$popGood.fadeIn();
});
$(".pop_good a").eq(0).on("click",function(){
	$popGood.fadeOut();
});
$(".pop_good a").eq(1).on("click",function(){
	$popGood.fadeOut();
	curPage=1;
	nextPage(-1);
});
$popGood.find('.inner').on('scroll',function(e){
	console.log(e)
});
$(".btn_close").on("click",function(){
	$(".pop_rule").fadeOut();
});
$(".pop_sue .bd").on('click',function(){
	$('.pop_sue').fadeOut();
	$popGood.show();
});
function nextPage(i){
       if(nextLock){
            return;
       }  
        curPage+=i;
       if(curPage<0){
            curPage = 0;
            return;
       }else if(curPage>l-1){
            curPage = l-1;
            return;        
       }
       
       nextLock =true;
   
       $page.eq(prevPage).css({zIndex: 2, opacity: 1}).transit({opacity: 0}, function(){
            $(this).css({zIndex: 1}).addClass('hide').removeClass('active'); 
            prevPage = curPage;
      });      

      $page.eq(curPage).css({opacity: 1, zIndex: 1}).removeClass('hide');
      setTimeout(function(){
      	$page.eq(curPage).addClass('active');
      },10);
      setTimeout(function(){
         nextLock = false;
      },800);
	  console.log(curPage)
      switch(curPage){
      	case 4 :
      		break;      		
      }
      if(curPage!=4){
      	setTimeout(function(){
	      	$("#btn_nvh").show();
	      	$page4.find(".bd2 .con").eq(1).hide();
			$page4.find(".bd2 .con").eq(0).show();	      		
      	},300);
      }	

      if(curPage!=1){
      	setTimeout(function(){
	      	$(".page2").removeClass('next')     		
      	},300);
      }	      
      if(curPage!=6){
      	setTimeout(function(){
	      	$("#btn_eps").show();
	      	frame1.reset();  
	      	$(".page6 .i2_4").hide();
      	},300);
      }	 
      if(curPage!=7){
      	setTimeout(function(){
			$('.page8 .bd2 .con').eq(1).hide();
			$('.page8 .bd2 .con').eq(0).show(); 
			
      	},300);
      }
      if(curPage==8){
      	scene9.play();
      }else{
      	scene9.reset();
      }
      if(curPage==0){
      	$(".ico_notice").show();
      }else{
      	$(".ico_notice").hide();
      }
}
function start(){
    var swipe = new En.Swipe();
    swipe.init({
        dom: document.getElementsByClassName("wrap")[0],
        callback: function(type) {
            if (type === 'up') {
            	if(curPage==1||curPage==4||curPage==6||curPage==7){
            		return;
            	}
                nextPage(1)
            } else if (type === 'down') {
                nextPage(-1);                
            }

        }
    });
    $page.eq(0).addClass('active');
  	$page.eq(0).removeClass('hide');
  	slide.play();
} 
function loadSec(){
	var loaderSec = new En.Loading();	
	loaderSec.init({
	    imgs:[],	
	    searchImgs:{
			dom:$("body")[0],
			type:'src2'
		},
	     searchBgs :{
	    	type:'bg2'
	    }
	});
}
var scene9  =(function(){
	var $bg = $('.page9 .i1');
	var $car = $(".page9 .car_box");
	var $light =$('.page9 .i2_3');
	var $boom = $('.boom');
	var maxMove = 1832-640;
	var tlBg =new TimelineMax();
	var tlCar = new TimelineMax();
	var tlLight = new TimelineMax();
	var timer;
	var $carLuo= $('.page9 .i2_4');
	var i  = 0;
	function play(){

		 setTimeout(function(){
	 		tlBg.to($bg,2.6,{x:maxMove,ease: Power0.easeNone});
			tlCar.to($car,2.6,{scale:1.5,x:300,y:340});
			tlCar.to($car,1.6,{scale:1.7,x:230,y:430,onComplete:function(){
				clearInterval(timer);
			}});
			$light.delay(1000).fadeIn(50);
			$boom.delay(1000).fadeIn(250);	
			timer = setInterval(function(){
				if(i==0){
					i++;
					$carLuo.hide();
				}else{
					i=0;
					$carLuo.show();
				}
				
			},60);
		 },300);

	}
	function reset(){
		setTimeout(function(){
			//tlBg.kill();
			//tlCar.kill();
			
			tlBg.to($bg,0,{x:0});
			tlCar.to($car,0,{scale:.4,x:0,y:0});				
			

			$light.hide();
			$boom.hide();			
		},400);

	}
	return {
		'play': play,
		'reset' : reset
	}
}());

function rule(){
	if(!App.isOne){return;}
	$(".pop_rule .inner").jScrollPane();
}
function Frame(o){
	this.box = $(o.box);
	this.time = o.time||700;
	this.callBack = o.callBack;
	this.w = o.w||640;
	this.maxFrame= o.maxFrame||4;
	this.timer;
	this.i=0;
}

Frame.prototype.play = function(){
	var self = this;
	this.timer = setInterval(function(){
		if(self.i<self.maxFrame-1){
			self.i++;
		}else{
			clearInterval(self.timer);
			self.callBack && self.callBack();
		}
		self.box.css({'left':-self.w*self.i});
	},this.time);
}
Frame.prototype.reset = function(){
	this.i = 0;
	this.box.css({'left':0});
}
