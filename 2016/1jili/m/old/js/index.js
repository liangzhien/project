
var imgList = [
  "images/0_1.png",
  "images/0_2.png",
  "images/1.jpg",
  "images/bgdown.png",
  "images/down.png",
  "images/load1.jpg",
  "images/load2.jpg",
  "images/logo1.png",
  "images/logo2.png",
  "images/menu.png",
  "images/nav_in.png",
  "images/nav_on.png",
  "images/p0.png",
  "images/2-1.png",
  "images/2-2.png",
  "images/p2_1.png",
  "images/p2_2.png",
  "images/3.jpg",
  "images/4.png",
];
var imgList2 = [

  "images/5.jpg",
  "images/6.png"
]
loadImg(imgList,loadComplete,progress);
 
function progress(num){
   $(".loading_span").html(parseInt(num)+"%"); 
   $(".loading .load .img").css({"opacity":parseInt(num)/100}); 
   $(".loading .line p").css({"width":parseInt(num)+'%'}); 
}
function loadComplete(e){
  $("img.load").each(function(){
    var self = $(this);
    if(self.attr("data-src")){
        self.attr("src",self.attr("data-src"));
        self.removeAttr("data-src");
    }
  });
  loadImg(imgList2,function(){},function(){});
  setTimeout(function(){
      $(".loading").fadeOut();
      //$(".wrapper").show();
      picshow();
  },800)
}

var isScroll = false,isMove = false;
var startX=0, startY=0; endX = 0; endY = 0,lineW= 0,isSlide = false;
var curIndex = 0;
var $bg = $(".bgTop");
var arrsum = [0,$(".page2").offset().top-90,$(".page2").offset().top-90,$(".page4").offset().top-60,$(".page6").offset().top-90];
console.log(arrsum);
var $page4 = $(".page4 .box"),$page6 = $(".page6 .box");
$(".main").on("webkitTransitionEnd",function(e){
    //isMove =false; 
    //isScroll = false;
      
 });
 $bg.on("touchmove",function(e){
      e.preventDefault();    
});

$(".main").on({
    "touchstart": function(e){
        startX = e.originalEvent.changedTouches[0].pageX;
        startY = e.originalEvent.changedTouches[0].pageY;

            if(curIndex==3 && $page4.scrollTop()==0 ){
              // isScroll = true;
              $page4.scrollTop(1)
            }
            if(curIndex==4 && $page6.scrollTop()==0 ){
              // isScroll = true;
              $page6.scrollTop(1)
            }
    },
    "touchmove" : function(e){
        endX = e.originalEvent.changedTouches[0].pageX - startX;
        endY = e.originalEvent.changedTouches[0].pageY - startY; 
//      if(curIndex==4&&$page6.scrollTop()<=0&&endY<-20){
//        isScroll = true;
//      }else{
//        //isScroll =true;
//      }    

         if(curIndex==3 && $page4.scrollTop()>=0){
           isScroll = true;
          	alert("isScroll"+isScroll+",endY:"+endY)  
         }  else{
            isScroll = false;
          	alert("isScroll"+isScroll+",endY:"+endY)          	
         }
          if(curIndex==4 && $page6.scrollTop()>=0){
            isScroll = true;
          	alert("isScroll44"+isScroll+",endY:"+endY)  
         }  else{
            //isScroll = false;
          	alert("isScroll44"+isScroll+",endY:"+endY)          	
         }         	
        if(!isScroll){
            e.preventDefault(); 
        }
        if(isMove){
           e.preventDefault(); 
        }
    },
    "touchend" : function(e){
        //判断
	    	if(curIndex==3&&endY <-150 ){
           if($page4[0].scrollHeight-$(".page4 ").height()-$page4.scrollTop()<60){
              isScroll = false;
           }
	    	}else if(curIndex==3&&endY >150){
			 			if($page4.scrollTop()<=0){
              isScroll = false;
            }
	    	}
        if(curIndex==4&&endY >150){
            if($page6.scrollTop()<=0){
              isScroll = false;
            }
        } 

        if(!isMove){
            if(endY >50 ){
               if (!isScroll) {
                   $bg.show()
                    if(curIndex>0){                       
                        curIndex--;
                    }   

                    move(curIndex,"up"); 
               };                
            }
            if(endY<-50 ){
                console.log("down");   
                if (!isScroll) {
                  $bg.show();
                  if(curIndex<4){
                      curIndex++;
                      move(curIndex,"down"); 
                  }else{ 
                      $bg.hide();
                  }   
                }                             
            }
            if(curIndex<1){
                $(".menu li").eq(curIndex).addClass("on").siblings().removeClass("on");
                $(".bgdown").show();
            }else if(curIndex==1||curIndex==2){
                $(".menu li").eq(1).addClass("on").siblings().removeClass("on");
                $(".bgdown").fadeOut();
            }else{
                $(".menu li").eq(curIndex-1).addClass("on").siblings().removeClass("on");
                $(".bgdown").fadeOut();
            }
            endY =0;      
            //isMove = true;  
           // console.log("isScroll:"+isScroll);
            //console.log("当前页数:"+curIndex);
        }
    }
});

var j = 0;
var maxheight = $(".page4 .box div").height()-$(window).height()-10;
var maxheight2 = $(".page6 .box div").height()-$(window).height()-10;
function move(i,dir){
     //isMove = true;
     isScroll = false;
    if(i==1){
      setTimeout(function(){
          $bg.hide();
      },1200);
    }else if(i==2){
      setTimeout(function(){
          $bg.hide();
      },1000);
    }else if(i==4){
       $bg.hide();
    }else{
      setTimeout(function(){
          $bg.hide();
      },1000);                   
    }

     if(dir=="down"){
          if(i === 1){
              //$(".page0").css("-webkit-transform","translateY(-230px) ");
              $(".page0").transit({translate:"0,-230px"},800);
              setTimeout(function(){
                 //$(".page2 .box1 .title").css({"-webkitTransform":"translateY(-100px)","transform":"translateY(-100px)","opacity":"1"});
                 $(".page2 .box1 .title").transit({translate:"0,-100px",opacity:1},500);
              },1500)
              
          }
          if(i === 2){
              //$(".page2 .box1 .title").css({"-webkitTransform":"translateY(-440px)","transform":"translateY(-440px)","opacity":"0"});
              //$(".page2 .box1 ").css("height","0");
              $(".page2 .box1 .title").transit({translate:"0,-440px",opacity:0},800);
              $(".page2 .box1").transit({height:0},800);
              setTimeout(function(){
                  $(".page2 .box2 .title").transit({translate:"0,-100px",opacity:1},800);
              },1000)
              
            // canMove = false;
          }
          if(i === 3){
              //$(".page2").css("-webkit-transform","translateY(-200px)");
              $(".page4").addClass("on");
             // $(".page4").css("-webkit-transform","translateY(-100px)");
              $(".page2").transit({translate:"0,-200px"});
              $(".page4").transit({translate:"0,-50px"});
              isScroll = true;
//            $(".page4 .box").scroll(function(){
//                 if($(".page4 .box").scrollTop()>= maxheight){
//                    isScroll = false;
//                 }
//            });
          }
          if(i === 4){
             // $(".page4").css("-webkit-transform","translateY(-200px)");
              //$(".page6").css("-webkit-transform","translateY(-100px)");
              $(".page4").transit({translate:"0,-200px"});
              $(".page6").transit({translate:"0,-50px"});
              $(".page6").addClass("on");
              isScroll = true;
              /*$(".page6 .box").scroll(function(){
                   if($(".page6 .box").scrollTop()== 0){
                      isScroll = false;
                   }
              })*/
          }
     }else if(dir=="up"){
        if(i === 0){
             //$(".page0,.page2").css("-webkit-transform","translateY(0px)");
             //$(".page2 .box1 .title").css({"-webkitTransform":"translateY(0px)","transform":"translateY(0px)","opacity":"0"});
             $(".page0,.page2").transit({translate:"0,0px"});
             $(".page2 .box1 .title").transit({translate:"0,0px",opacity:0});
          }
          if(i === 1){
              //$(".page2").css("-webkit-transform","translateY(0px)");
              //$(".page2 .box1 ").css("height","100%");
              $(".page2").transit({translate:"0,0px"});
              $(".page2 .box1").transit({height:"100%"});
              setTimeout(function(){
                  //$(".page2 .box1 .title").css({"-webkitTransform":"translateY(-100px)","transform":"translateY(-100px)","opacity":"1"});
                  $(".page2 .box1 .title").transit({translate:"0,-100px",opacity:1});
              },800)
              
              $(".page2 .box2 ").removeClass("on");
          }
          if(i === 2){
             // $(".page2").css("-webkit-transform","translateY(0px)");
              //$(".page4").css("-webkit-transform","translateY(0px)");
              $(".page2,.page4").transit({translate:"0,0px"});

          }
          if(i === 3){
           // $(".page4").css("-webkit-transform","translateY(-100px)");  
            $(".page4").transit({translate:"0,0px"}); 
            $(".page6").transit({translate:"0,0px"});    
             isScroll = true;        
          }
          if(i === 4){
            //$(".page6").css("-webkit-transform","translateY(0px)");
            $(".page6").transit({translate:"0,0px"});
              //   $(".page6 .box").scroll(function(){
              //      if($(".page6 .box").scrollTop()==0){
              //         isScroll = false;                 
              //      }
              // })
          }
     }  
     $(".main")[0].style.webkitTransform = 'translate3d(0,-'+(arrsum[curIndex])+'px,0)';
     //$(".main").transit({translate:"0,-"+(arrsum[curIndex])+"px"},1800);
     setTimeout(function(){
        closemenu();
     },1500);     
}

//kv轮播
//图片自动左右滚动
function picshow(){
  var $box = $(".page0 .box");
  var obj = $box.children("img");
  var len = obj.length;
  var i = 0 , fnsi;
  //obj.eq(0).show();
  function getNext(){
    i<len-1?i++:i=0;
    obj.eq(i).stop(true,true).fadeIn("slow").siblings().fadeOut("slow");
  }
  var setInt = function(){
        clearInt();
        fnsi = setInterval(function(){
            getNext();
        },1500)
    }
    var clearInt = function(){
        if(fnsi){
            clearInterval(fnsi);
        }
    }
    setInt();   
}





//导航
function openmenu(){
    $('.menubox').css({opacity:0}).removeClass('hide');
    $('.menu').css("-webkit-transform","translateX(-100%)");
    $('.menubox').animate({opacity:1},500);
    $('.menu').css("-webkit-transform","translateX(0)");
    //isMove = true;
}
function closemenu(){
    $('.menu').css("-webkit-transform","translateX(-100%)");
    $('.menubox').animate({opacity:0},500,function(){
       $('.menubox').addClass('hide');
    });
    //isMove = false;
}

$('.menubtn').on('click',function(){
    openmenu();
});

$('.menubox').on('click',function(e){
    if($(e.target).hasClass('menubox'))closemenu();
});

$(".menu li").on("touchstart",function(){
      var index = $(this).index();
      $(this).addClass("on").siblings().removeClass("on");
      
      if(index>=curIndex){ 
        if(index>=2){
          curIndex=index+1;
        }else{
            curIndex=index;
        }    
        
        move(curIndex,"down");    
      }else if(index<curIndex){
        if(index>=2){
          curIndex=index+1;
        }else{
            curIndex=index;
        }  
        move(curIndex,"up"); 
     }
    // console.log("index:"+index)
     //console.log("curIndex:"+curIndex)
})

$(".page6 .box .top").on("touchstart",function(){
   curIndex=0;
   $page4.scrollTop(0);
   $page6.scrollTop(0);
   move(curIndex,"up"); 
})