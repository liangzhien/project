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
		location.href="http://promotion.geely.com/xindihao/m/gs.html";
	}
    var $win  = $(W);
    var doc = D;
    var $html = $("html,body");
    var $body = $('body');
    var height = $win.height();
    var width = $win.width();
    var isClick= false,isClick2= false;
    var $nav1 = $(".car_nav2").eq(0),$nav2 = $(".car_nav2").eq(1),$header = $("header"),$mark = $('.mark');
    var $section0 = $(".section0"),$section2 = $(".section2"),$section3 = $(".section4"),$section4 = $(".section6");//要滚动的容器
    var $ico1  = $(".section2 .ico1"),$ico2  = $(".section2 .ico2"),$ico3  = $(".section2 .ico3"),$ico4  = $(".section2 .ico4");
    var curLeft1 = '51.875%',curLeft2 = '57.816%';
    var canMove = false;
    var clearOuttime;
    var imgListStart = ["images/load1.png","images/load2.png"];
    var imgLoadStart  = new ImgLoader(imgListStart,function(a,b){
             //加载入口
            var imgList = [];
            var $loads = $(".loads");
            var l = $loads.length;
            for(var i=0;i<l;i++){
                imgList.push($loads.eq(i).attr("src"));
            }
            var imgLoad  = new ImgLoader(imgList,function(a,b){ 
                canMove = true;
                secLoad();
                $('.loading').fadeOut();
                if(App.ua().isMac){
                    $body.removeClass("on");
                }
                var box = new Box();
                box.scroll();
                box.main();
                $(W).resize(function(){
                    if(clearOuttime){clearTimeout(clearOuttime)};
                    clearOuttime = setTimeout(function(){
                        box.init()
                    },100);
                });    
                
              
                $win.scroll(function(e){
                    e.preventDefault();
                    box.scroll();
                });
                if(!App.ua().isMac){
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
                
                }
            },function(a,b){
                $(".loading span").text(a+"%");
                $(".load b").css({"width":a+"%"});
                $(".load img").eq(1).css({"opacity":a/100});
            });       
    },function(){});


    function secLoad(){
        $(".load").each(function(){
            var self = $(this);
            if(self.attr('data-src')){
                var src = self.attr("data-src");
                self.attr("src",src);
                self.removeAttr("data-src");
            }
        });
    }

    function Box(){
        this.l = $('.part').length;
        this.$nav = $("#nav1 li");
        this.$nav2 = $("#nav2 li");
        this.init();
    }
    Box.prototype = {
        init :function(){
            this.getTopP();
            this.scroll();
            this.reset();
        },
        main : function(){
            self = this;
            //设计理念
            $(".left_cover").hover(function(e){
                $mark.stop(true).animate({"width":"90%"},function(){
                    $ico4.fadeIn();
                    $ico2.show();
                });
                $ico2.stop(true).animate({"left":"77.76%"},300);
                $ico1.hide();
            },function(){
                $mark.stop(true).animate({"width":"57%"},function(){
                    $ico1.show();
                    $ico2.show();
                });
                $ico2.stop(true).animate({"left":curLeft2});
                $ico4.hide();
            });
            $(".right_cover").hover(function(e){
                $mark.stop(true).animate({"width":"29%"},function(){
                    $ico3.fadeIn();
                    $ico1.show();
                });
                $ico1.stop(true).animate({"left":"23.958%"});
                $ico2.hide();

            },function(){
                $mark.stop(true).animate({"width":"57%"},function(){
                    $ico1.show();
                    $ico2.show();
                });
                $ico1.stop(true).animate({"left":curLeft1});
                $ico3.hide();
            });

            //导航点击
            this.$nav.bind("click", function(){
                var i = $(this).index();
                goNav(i);
                isClick = isClick2 = true;
            })
            this.$nav2.bind("click", function(){
                if($(this).hasClass("active")){
                    return;
                }
                var i = $(this).index();
                goNav(i);
                isClick  = isClick2 = true;
            });
            function goNav(i){
                self.$nav2.eq(i).addClass("active").siblings().removeClass("active");
                $html.animate({scrollTop: self.arr[i]+20},600,function(){
                    self.scroll();
                    isClick = false;
                });
                return false;
            }
        },
        scroll : function(){
            var self = this;
            height = $win.height(),width = $win.width();
            var t = $win.scrollTop() ;
            var maxY1= width*0.12;//0.9 = 30-23 maxY1:$section0滚动最大值 23 是next元素要叠加23%marginTop
            var maxY2= width*0.18;
            var maxY3= width*0.18;
            var yTop1 = function(maxY,$box){  //因为第一个元素比较特殊 ，重新定义一个函数
                var offsetTop = $box.offset().top;
                var boxHeight = $box.outerHeight();
                var minScroll = offsetTop ; //元素在不可视区域底部的最小值，
                var maxScroll =  offsetTop+boxHeight-80;//元素在不可视区域顶部的最大值
                var y  =0;
                if( (t<minScroll) ){
                   return  y = 0;
                }else{
                    y = (t-minScroll)/(maxScroll-minScroll)*maxY;
                    if(y>maxY){
                        return y = maxY;
                    }
                    return y ;
                }
            }        
            var yTop = function(maxY,$box){
                var offsetTop = $box.offset().top;
                var boxHeight = $box.outerHeight();
                var minScroll = offsetTop - height; //元素在不可视区域底部的最小值，
                var maxScroll =  offsetTop+boxHeight;//元素在不可视区域顶部的最大值
                var y  =0;
                if( (t<minScroll) ){
                   return  y = 0;
                }else{
                    y = (t-minScroll)/(maxScroll-minScroll)*maxY;
                    if(y>maxY){
                        return y = maxY;
                    }
                    return y ;
                }
            }
            TweenMax.set($section0,{y:-yTop1(maxY1,$section0)});
            TweenMax.set($section2,{y:-yTop(maxY2,$section2)});
            TweenMax.set($section3,{y:-yTop(maxY3,$section3)});
            TweenMax.set($section4,{y:-yTop(maxY3,$section4)});

            //导航
            if(t<60){
                $nav1.show();
                $header.show();
                $nav2.hide();
            }else{
                $nav2.show();
                $header.hide();
                $nav1.hide();
            }
            if(isClick ) return;
            if( t < self.arr[0] ){
                this.$nav.removeClass("active");
                this.$nav2.removeClass("active");
                return;
            }
            //导航条位置
            for( var i=0; i<this.l; i++ ){
                if( i < this.l - 1 ){
                    if(  t >= this.arr[i] &&  t < this.arr[i+1] ){
                        if(!isClick2){
                            this.$nav.eq(i).addClass("active").siblings().removeClass("active");
                            this.$nav2.eq(i).addClass("active").siblings().removeClass("active");
                        }
                        if(i==0){
                        	$(".section0 .ico2").addClass("rotate");
                        	$(".section2 .ico_jiao2").addClass("rotate2");
                        }
                         if(i==1){
                        	$(".section2 .ico_jiao").addClass("rotate");
                        	
                        }if(i==2){
                        	$(".section4 .ico2").addClass("rotate2");
                        }if(i==3){
                        	$(".section6 .ico2").addClass("rotate2");
                        }
                    }
                }else{
                    if(  t >= this.arr[i] ){
                        if(!isClick2){
                            this.$nav.eq(i).addClass("active").siblings().removeClass("active");
                            this.$nav2.eq(i).addClass("active").siblings().removeClass("active");
                        }
                    }
                }
            }
            setTimeout(function(){
                isClick2 = false;
            },600);
        },
        reset : function(){
            $(".mark .pic").css({"width":$win.width()});
            $ico1.css({'left':"51.875%"});
            $ico2.css({'left':"57.816%"});
         	setPop();
        },
        getTopP : function(){
            var myTop,self = this;
            this.arr = [];
            $(".part").each(function(i){
                myTop = $(this).offset().top-70;
                switch(i){
                    case 2:
                        myTop=myTop-90;
                        break;                      
                    case 3:
                        myTop=myTop-90;
                        break;                    
                   // case 4:
                      //  myTop=myTop+280;
                       // break;
                    case 4:
                        myTop=myTop-20;
                        break;  
                     case 5:
                        myTop=myTop-20;
                        break;                                               
                }

                self.arr.push(myTop);
            });
        }
    };
//  //kv轮播
//  $(".scroll").slide({
//  	"effect" :"fold",
//  	"mainCell" : '.bd',
//  	"autoPlay": true,
//  	"autoPage" :true,
//  	"interTime" :4000,
//  	"delayTime" : 600,
//  	'titCell' :".hd ul"
//  });
    //五大卖点 
    !(function(){

        $(".section4 .info").hover(function(){
            var self = $(this).find(".img2");
            var x = "-40%";
            if($(this).index()==5){
            	x = "-20%";
            }
            TweenMax.to(self,2,{css:{x:x}},function(){});
        },function(){
            var self = $(this).find(".img2");
            TweenMax.to(self,2,{css:{x:"0%"}},function(){

            });
        });
    })();
    //车型欣赏轮播
    !(function(){
        var $box = $(".picBox"),$btnPrev = $('.btn_prev'),$btnNext = $('.btn_next'),l = $box.children().length,curIndex = 0,prevIndex=curIndex,isClick=false;
        $btnNext.on('click',function(){
            if(isClick){
                return;
            }
            isClick = true;
            if(curIndex<l-1){
                curIndex++;
            }else{
                curIndex = 0;
            }
            move();
        });
        $btnPrev.on('click',function(){
            if(isClick){
                return;
            }
            isClick = true;            
            if(curIndex>0){
                curIndex--;
            }else{
                curIndex = l-1;
            }
            move();
        });
        function move(){
            var $prevBox = $box.children().eq(prevIndex);
            var $curBox = $box.children().eq(curIndex);
            TweenMax.to($prevBox,0.5,{css:{y:-100,x:500,alpha:0,scale:0.9}},function(){
                 $(this).hide();
                 TweenMax.set($(this),{y:0,x:0,alpha:1,scale:1});
            });
            prevIndex = curIndex;
            TweenMax.set($curBox,{x:"-40%",y:0,alpha:0,scale:0.1});
            $curBox.show();
            TweenMax.to($curBox,0.6,{x:"0%",alpha:1,scale:1,onComplete:function(){
                //TweenMax.to($curBox,0.4,{css:{scale:1,alpha:1}},function(){});
            }});
            setTimeout(function(){
                isClick = false;  
            },500);

        }
        // var $cover1 = $('.section6 .left_cover1 img');
        //     TweenMax.to($cover1,1.1,{y:"-90%",onComplete:function(){
        //         TweenMax.to($cover1,0.2,{css:{y:"0%"}},function(){});
        //     }});
    })();
    //媒体新闻
    ;(function(){
        var $box = $('#list1 ul');
        $.ajax({
            url:App.domain+'type=1',
            type:"GET",
            dataType:"json",
            error: function() {
                // alert('服务器超时，请稍后再试');
            },
            success:function(data){
                var data = data;
                var l = data.data.length;
                if(data.result == 1){
                    if(data.data.length>6){
                        $(".pager").pager({
                            itemCount: l,
                            onPageChanged : function(curPage){
                                innerHtml(data.data,curPage)
                            }
                        });
                    }
                }
            }
        });
        function innerHtml(data,curPage){
            var html ='';
            var maxLen = data.length;
            var curLen = curPage*6+6>maxLen ? maxLen:curPage*6+6;
            for(var i= 6*curPage;i<curLen;i++){
                html+='<li data-src='+data[i]["link"]+'> <div class="img"><img src='+data[i]["imgname"]+' alt=""></div><div class="cover"></div><div class="txt_box"> <h4>'+data[i]["title"]+'</h4> <h5>'+data[i]["content"]+'</h5> <a href="">查看更多>></a> </div> </li>'
            }
            $box.empty().append(html);
           // box.init();
        }
        $box.on("click","li",function(){
            var href = $(this).attr('data-src');
            window.open(href)
            return false;
        });
    })();
    //活动新闻
    ;(function(){
        $.ajax({
            url:App.domain+'type=2',
            type:"GET",
            dataType:"json",
            error: function() {
               // alert('服务器超时，请稍后再试');
            },
            success:function(data){
                var data = data;
                var html1 = '';
                var html2 = '';
                var html3 = '';
                if(data.result == 1){
                    for(var i=0;i<data.data.length;i++){
                        var html = '<li style="cursor: pointer;"  data-src='+data.data[i]["link"]+' ><a target="_blank"class="pic"><img src='+data.data[i]["imgname"]+' alt=""></a><div class="txt_box"><a target="_blank"  ><img src="images/ico_btn1.jpg" alt=""></a><div class="bd"><h4>'+data.data[i]["title"]+'</h4> <h5>'+data.data[i]["content"]+'</h5> </div> </div> </li>';
                        if(i%3==0){
                            html1+=html;
                        }else if(i%3==1){
                            html2+=html;
                        }else if(i%3==2){
                            html3+=html;
                        }
                    }
                    $('#left_box').append(html1);
                    $('#center_box').append(html2);
                    $('#right_box').append(html3);
			         $(".list2").on("click","li",function(){
			            var href = $(this).attr('data-src');
			            window.open(href)
			            return false;
			        });                   
                }
            }
        });
    })();
    !(function(){
		var html='<div class="bd"><li><img src="images/pic/1.jpg" alt="" /><img src="images/pic/1_1.png" class="ico ico2" alt="" /></li><li><img src="images/pic/4.jpg" alt=""  /><img src="images/pic/4_1.png" class="ico ico2" alt="" /></li><li><img src="images/pic/3.jpg" alt="" /><img src="images/pic/3_1.png" class="ico ico2" alt="" /></li><li><img src="images/pic/2.jpg" alt=""/><img src="images/pic/2_1.png" class="ico ico2" alt="" /></li><li><img src="images/pic/5.jpg" alt="" /><img src="images/pic/5_1.png" class="ico ico2" alt="" /></li></div>';
		var $popPic = $(".pop_pic");
		var $scrollbox = $('.scrollbox');
		$('.section4 .info').on("click",function(){
			canMove = false;
			setPop();
			$popPic.show();
			var index = $(this).index()-1;
			$scrollbox.append(html);
		     $('.pop_pic .scrollbox').slide({
		    	"effect" :"fold",
		    	"mainCell" : '.bd',
		    	"autoPlay": true,
		    	"autoPage" :true,
		    	"interTime" :4000,
		    	"prevCell":".btn_prev2",
		    	"nextCell":".btn_next2",
		    	"delayTime" : 600,
		    	"defaultIndex" :index
		    }); 			
		});
		$(".pop_pic .btn_close").on("click",function(){
			$popPic.hide();
			$popPic.find('.bd').remove();
			canMove = true;
		});
 		
    })();
 	function setPop(){
		scaleB = $win.width()/1920;
		TweenMax.set($('.pop_pic .scrollbox'),{scale:scaleB});
	}  
})(window,document);
