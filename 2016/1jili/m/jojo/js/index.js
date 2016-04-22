
var imgList = [
  "jojo/images/0_1.png",
  "jojo/images/0.png",
  "jojo/images/0_2.png",
  "jojo/images/1.jpg",
  "jojo/images/bgdown.png",
  "jojo/images/down.png",
  "jojo/images/load1.jpg",
  "jojo/images/load2.jpg",
  "jojo/images/logo1.png",
  "jojo/images/logo2.png",
  "jojo/images/menu.png",
  "jojo/images/nav_in.png",
  "jojo/images/nav_on.png",
  "jojo/images/p0.png",
  "jojo/images/2-1.png",
  "jojo/images/2-2.png",
  "jojo/images/p2_1.png",
  "jojo/images/p2_2.png",
  "jojo/images/3.jpg",
  "jojo/images/4.png",
  "jojo/images/5.jpg",
  "jojo/images/6.png",
  "jojo/images/gobuy.png"
];
var imgList2 = [

 
]
loadImg(imgList,loadComplete,progress);
var arrsum=[];
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
     // alert("开始")
      //$(".wrapper").show();
      //picshow();
      arrsum = [0,$(".page2").offset().top-90-190,$(".page2").offset().top-90-190,$(".page4").offset().top-90-150,$(".page6").offset().top-90-150];
      //alert(arrsum);
  },800)
}

var isScroll = false,isMove = false;
var startX=0, startY=0; endX = 0; endY = 0,lineW= 0,isSlide = false;
var curIndex = 0;
var $bg = $(".bgTop");

var myScroll,myScroll2;
window.onload = function(){
      myScroll = new iScroll('box',{bounce:false,hScrollbar:false,onScrollMove:function(){
         //myScroll.maxScrollXmyScroll.maxScrollY       
           if(this.y>=0){
                isScroll = false;
                console.log("top")
          }else if(this.y<=(this.maxScrollY)){           
              isScroll = false;
              //move(curIndex+1,"up");
           }           
       }});
       myScroll2 = new iScroll('box2',{bounce:false,hScrollbar:false,onScrollMove:function(){
         //myScroll.maxScrollXmyScroll.maxScrollY
           if(this.y>=0){
                isScroll = false;
                //move(curIndex-1,"up"); 
                console.log("top")
            }             
      }});
}

$(".main").on("webkitTransitionEnd",function(e){
    //isMove =false; 
    //isScroll = false;
      
 });
 $bg.on("touchmove",function(e){
      //e.stopPropagation();
      e.preventDefault();    
});
$(".main").on({
    "touchstart": function(e){
        startX = e.originalEvent.changedTouches[0].pageX;
        startY = e.originalEvent.changedTouches[0].pageY;
 
    },
    "touchmove" : function(e){
        if(!isScroll){
            e.preventDefault(); 
        }
        if(isMove){
            e.stopPropagation();
           // e.preventDefault(); 
        }
        endX = e.originalEvent.changedTouches[0].pageX - startX;
        endY = e.originalEvent.changedTouches[0].pageY - startY;

    },
    "touchend" : function(){
       
        if(!isMove){
            if(endY >150 ){
               console.log("up")
               /*if(curIndex===3){
                    isScroll = true;
                   if($(".page4 .box").scrollTop()<= 0){
                        isScroll = false;
                        move(curIndex-1,"up"); 
                    }
                }  
                if(curIndex===4){
                    //alert(4)
                    isScroll = true;
                    if($(".page6 .box").scrollTop()<= 0){
                        isScroll = false;
                        move(curIndex-1,"up"); 
                    }
                }*/    
               if (!isScroll) {
                   $bg.show()
                    if(curIndex>0){                       
                        curIndex--;
                    }   

                    move(curIndex,"up"); 
               };                
            }

            if(endY<-150 ){
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
            console.log("isScroll:"+isScroll);
            console.log("当前页数:"+curIndex);
        }
    }
});

var j = 0;
var maxheight = $(".page4 .box div").height()-$(window).height()-10;
var maxheight2 = $(".page6 .box div").height()-$(window).height()-10;
function move(i,dir,func){
     //isMove = true;
     isScroll = false;
    if(i==1 || i==2){
      setTimeout(function(){
          $bg.hide();
      },1200);
    }else if(i==4){
       $bg.hide();
    }else{
      setTimeout(function(){
          $bg.hide();
      },1200);                   
    }

     if(dir=="down"){
          if(i === 1){
              //$(".page0").css("-webkit-transform","translateY(-230px) ");
              $(".page0").transit({translate:"0,-100px"},1600,function(){
                $(".page2").transit({translate:"0,-200px"},1000);
                setTimeout(function(){
                   //$(".page2 .box1 .title").css({"-webkitTransform":"translateY(-100px)","transform":"translateY(-100px)","opacity":"1"});
                   $(".page2 .box1 .title").transit({translate:"0,-100px",opacity:1},800);
                },1000)
              });
              
              
          }
          if(i === 2){
              //$(".page2 .box1 .title").css({"-webkitTransform":"translateY(-440px)","transform":"translateY(-440px)","opacity":"0"});
              //$(".page2 .box1 ").css("height","0");

              $(".page2 .box1 .title").transit({translate:"0,-440px",opacity:0},800);             
              setTimeout(function(){
                   $(".page2 .box1").transit({height:0},800);
                  setTimeout(function(){
                      $(".page2 .box2 .title").transit({translate:"0,-100px",opacity:1},800);
                  },400)                 
              },400)
              
            // canMove = false;
          }
          if(i === 3){
              //$(".page2").css("-webkit-transform","translateY(-200px)");
              //$(".page4").addClass("on");
             // $(".page4").css("-webkit-transform","translateY(-100px)");
              isScroll = true;
              $(".page2").transit({translate:"0,-300px"},1600,function(){
                  $(".page4").transit({translate:"0,-200px"},1000);
              });
              
              
              /*$(".page4 .box").scroll(function(){
                   if($(".page4 .box").scrollTop()>= maxheight){
                      isScroll = false;
                   }
              })*/
          }
          if(i === 4){
             // $(".page4").css("-webkit-transform","translateY(-200px)");
              //$(".page6").css("-webkit-transform","translateY(-100px)");
              isScroll = true;
              $(".page4").transit({translate:"0,-300px"},1600,function(){
                  $(".page6").transit({translate:"0,-200px"},1000);
              });
              
              //$(".page6").addClass("on");
              
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
             $(".page0,.page2").transit({translate:"0,0px"},1000);
             $(".page2 .box1 .title").transit({translate:"0,0px",opacity:0},800);
          }
          if(i === 1){
              //$(".page2").css("-webkit-transform","translateY(0px)");
              //$(".page2 .box1 ").css("height","100%");
              //$(".page2").transit({translate:"0,0px"});
              $(".page2 .box1").transit({height:"100%"},800);
              setTimeout(function(){
                  //$(".page2 .box1 .title").css({"-webkitTransform":"translateY(-100px)","transform":"translateY(-100px)","opacity":"1"});
                  $(".page2 .box1 .title").transit({translate:"0,-100px",opacity:1},800);
              },300)
              $(".page2 .box2 .title").transit({translate:"0,0px",opacity:0},800);
          }
          if(i === 2){
             // $(".page2").css("-webkit-transform","translateY(0px)");
              //$(".page4").css("-webkit-transform","translateY(0px)");
              $(".page2").transit({translate:"0,-200px"},800);
              $(".page4").transit({translate:"0,0px"},800);
              $(".page2 .box1 .title").transit({opacity:0},800);
              //$(".page2 .box1 .title").transit({translate:"0,-100px",opacity:1},800);

          }
          if(i === 3){
           // $(".page4").css("-webkit-transform","translateY(-100px)");  
            $(".page4").transit({translate:"0,-200px"},800); 
            $(".page6").transit({translate:"0,0px"},1000);        
          }
          if(i === 4){
            //$(".page6").css("-webkit-transform","translateY(0px)");
            //$(".page6").transit({translate:"0,0px"});
            /*$(".page6 .box").scroll(function(){
               if($(".page6 .box").scrollTop()==0){
                  isScroll = false;                 
               }
            })*/
          }
     }  
     //$(".main")[0].style.webkitTransform = 'translate3d(0,-'+(arrsum[curIndex])+'px,0)';
     $(".main").transit({translate:"0,-"+(arrsum[curIndex])+"px"},1500,"ease-out",function(){
        func&&func();
     });
     //alert(arrsum[curIndex]);
}
if(curIndex<1){
   $(".bgdown").show();
}else{
    $(".bgdown").fadeOut();
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
        },2500)
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
    $('.menubox').transit({opacity:1},500);
    $('.menu').transit({translate:"0,0"},800);
    //isMove = true;
}
function closemenu(){
    $('.menu').transit({translate:"-100%,0"},500);
    $('.menubox').transit({opacity:0},500,function(){
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
        
        move(curIndex,"down",function(){
          closemenu();
        });    
      }else if(index<curIndex){
          if(index>=2){
            curIndex=index+1;
          }else{
              curIndex=index;
          }  
          move(curIndex,"up",function(){
            closemenu();
          });     
      }
      if(index<1){
         $(".bgdown").show();
      }else{
          $(".bgdown").fadeOut();
      }


})

$(".page6 .box .top").on("click",function(){
   curIndex=0;
   move(curIndex,"up"); 
   $(".page2 .box1").css({height:"100%"});
   $(".page2 .box1 .title").transit({translate:"0,0px",opacity:0});
})



$(".gobuy").click("click",function(){
    $(".bg,.popbox").show();
})

$(".btnclose,.bg").click("click",function(){
    $(".bg,.popbox").hide();
})

function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

function updateTDSelector(name, obj, i, e) {
    if (obj) {
        e.el.next('div').text(name).removeClass('select-default');
    } else {
        e.el.next('div').text(name).addClass('select-default');
    }
}


$.getJSON("js/dealer_gs.txt", function(data) {
      this.select = new SelChain(data, [{
      name : 'province',
      optid : 'id',
      def : '请选择省/直辖市',
      el : $('#prov'),
      check : 'name',
      child : 'city',
      callback : updateTDSelector
  }, {
      name : 'city',
      optid : 'id',
      def : '请选择市',
      el : $('#city'),
      check : 'name',
      child : 'dealer',
      callback : updateTDSelector
  }, {
      name : 'dealer',
      optid : 'id',
      def : '请选择经销商',
      el : $('#dealer'),
      check : 'name',
      child : 'none',
      callback : function(name, obj, i, e) {
          updateTDSelector(name, obj, i, e);
          console.log(obj);
          if (obj) {
              $('.add>p').html(obj.address).removeClass('default');
          } else {
              $('.add>p').html('请先选择地区与经销商').addClass('default');
          }
      }
  }], {
      def : true
  });
  $('form .select').click(function(e) {
      var elem = $(this).prev('select');
      if (document.createEvent) {
          var e = document.createEvent("MouseEvents");
          e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          elem[0].dispatchEvent(e);
      } else if (element.fireEvent) {
          elem[0].fireEvent("onmousedown");
      }
  });
  var waiting = false;
/*function setStr = function(str){
    var resultStr='';
    if(str.slice(-1)=='省'||str.slice(-1)=='市'){
        resultStr =str.substring(0,str.length-1);
    }else{
        resultStr = str;
    }
    return resultStr;
};*/
  $('form').submit(function(e) {
      e.preventDefault();
      // _smq.push(['custom','预约试驾','立即预约']);
      // admaster_click("/testdrive", "立即预约");
      // cv(10023);
      if (waiting)
          return;
      if ($('input[name=name]').val() == "") {
          alert("请输入您的姓名。");
          $('input[name=name]').focus();
          return;
      }
      var mo = $('input[name=phone]').val();
      if (mo == "" || !mo.match(/^[0-9]{11}$/g)) {
          alert("请输入正确的手机号码。");
          $('input[name=phone]').focus();
          return;
      }
      if ($('[name=dealerid]').val() == "") {
          alert("请选择一个经销商。");
          return;
      }
      waiting = true;
      $('[name=originalcreatetime]').val((new Date).getTime());
      var originalleadid = Date.parse(new Date())+randomWord(true,3,3);
      $("[name=originalleadid]").val(originalleadid);
      $.post("http://promotion.geely.com/api/test_drive/post1.php", $(this).serialize(), function(data) {
          if (data.success == "1" || data.success == "2") {
              // admaster_click("/testdrive", "预约成功");
              // _smq.push(['custom','预约试驾','预约成功',originalleadid]);
              setTimeout(function(){
                  alert("预约成功！");
                  
                  $('form')[0].reset();
              },1000);
          } else {
              alert("发生错误，请重试！");
          }
      }, 'json').fail(function(jqXHR, textStatus, errorThrown) {
          alert("无法连接服务器！");
      }).always(function() {
          waiting = false;
      });
  });
});


