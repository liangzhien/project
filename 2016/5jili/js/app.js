
var $win =$(window);
var $winW = $win.width();
var $main = $(".main");
var ismobile;
if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) 
    || /Android/i.test(navigator.userAgent) 
    || /BlackBerry/i.test(navigator.userAgent) 
    || /IEMobile/i.test(navigator.userAgent) 
    || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
        if(/iPad/i.test(navigator.userAgent)){
        	
        }else{
           ismobile = true;
        }
    }else{

}
function set(){
	var w  = 10000-$win.width();
	$winW =  $win.width();
	$(".bg_box").css("width",w)
	if(ismobile){
		TweenMax.set($main,{x:$winW/2,scale:0.5});
	}else{
		TweenMax.set($main,{x:$winW/2});
	}
	
}	
set();
$(window).resize(function(){
	set()
});
var num = 0;
TweenMax.set($(".bg_box"),{x:0});
var arr=[
	{"minNum":0,"maxNum":240,"y":0},
	{"minNum":240,"maxNum":300,"y":-20},
	{"minNum":300,"maxNum":400,"y":-30,"rotating":10},
	{"minNum":400,"maxNum":480,"y":-80}
];
var $carBox = $('.car_box');
this.BACKGROUND_WIDTH  = 10;
this._speed =1;
isScroll =false;

$win.on('mousewheel',function(e,d){
//  if(!canMove){
//      return;
//  }
    if(isScroll){
    	//return;
    }
    isScroll = true;
    e.preventDefault();
    if(d>0){
       
	   if(num>=0){
       	num  = 0;
       }else{
       	 num+=50;
       }
    }else{
	  if(Math.abs(num)>=8050){
	  	num = 0;
	  	//num-=50;
	  }else{
	  	num-=50;
	  }
    }
    for(var i=0;i<arr.length;i++ ){
    	if(Math.abs(num)>arr[i]["minNum"]  && Math.abs(num) < arr[i].maxNum  ){
    		//TweenMax.to($carBox,.5,{css:{y:arr[i]["y"]}});
    	}
    }

     TweenMax.to($(".bg_box"),.5,{css:{x:num}});

	
});   
//	var tl = new TimelineMax();
//	console.log(tl);
//	tl.to($carBox, 1, {
//      bezier: {
//          type: "cu",
//          values: [{x:150, y:0}, {x:340, y:0}, {x:420, y:-90}, {x:540, y:-90}],
//          autoRotate: !0
//      },
//      force3D: !0,
//      ease: Linear.easeNone
//  }, 0);

