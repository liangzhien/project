!(function(W){
	var loaderStart = new En.Loading();
	loaderStart.init({
	    imgs:[],
	    enterCallback:function(){
	        var per = this.count/this.length*100>>0;
	        $('.loading .per').height(per+'%')
	    },
	    callback:function(){
	        $(".loading").hide();
			start();
			secLoad();
			ga('send','pageview', '/VP/dfax-7wap/首页');
			_smq.push(['custom','dfAX7M','dfDX7M-nav-home',,,1]);
	    }
	});
	var nextLock  = false;
	var curPage = 0,prevPage=0,$page = $(".page"),l  =$page.length,$nav = $('.nav_left i') ;
	var start = function(){
	    var swipe = new En.Swipe();
	    swipe.init({
	        dom: document.getElementsByClassName("wrap")[0],
	        callback: function(type) {
	            if (type === 'up') {
	                nextPage(1)
	            } else if (type === 'down') {
	                nextPage(-1);                
	            }
	
	        }
	    });
	    $page.eq(0).addClass('active');
	} 
	function secLoad(){
		var loaderSec = new En.Loading();
		loaderSec.init({
		    imgs:['images/2/pic1.jpg','images/2/pic2.jpg','images/2/pic3.jpg','images/2/pic4.jpg'],
		    callback:function(){

		    }
		});		
	}	
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
	      $nav.removeClass('on');
	      $nav.eq(curPage).addClass('on');
	      setTimeout(function(){
	         nextLock = false;
	      },800);
	      if(curPage>=l-1){
	      	$(".ico_notice").hide();
	      }else{
	      	$(".ico_notice").show();
	      }
	      switch(curPage){
	      	case 0 :
	      		ga('send','pageview', '/VP/dfax-7wap/首页');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-home',,,1]);
	      		break;
	      	case 1:
	      		ga('send','pageview', '/VP/dfax-7wap/造型');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-zaoxing']);
	      		break;
	      	case 2:
	      		ga('send','pageview', '/VP/dfax-7wap/安全');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-anquan']);
	      		break;	
	      	case 3:
	      		ga('send','pageview', '/VP/dfax-7wap/驾控');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-jiakong']);
	      		break;	
	      	case 4:
	      		ga('send','pageview', '/VP/dfax-7wap/科技');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-keji']);
	      		break;		
	      	case 5:
	      		ga('send','pageview', '/VP/dfax-7wap/空间');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-kongjian']);
	      		break;		      		
	      }
	}	
	var picArr = [
	   {'file':2,'maxNum':4},{'file':3,'maxNum':4},{'file':4,'maxNum':3},{'file':5,'maxNum':5},{'file':6,'maxNum':3}
	];
	$popShow = $(".pop_show"),$slide =$popShow.find(".scroll"),curNum=0;
	$page.find(".btn_show").on("click",function(){
		curNum = $(this).parent().index()-1;
		
		popShow(curNum);
		switch(curNum){
	      	case 0 :
	      		ga('send','event','C02_Conversion','con_造型查看','dfax-7wap_con_Modeling');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-zaoxing-check']);
	      		break;
	      	case 1:
	      		ga('send','event','C02_Conversion','con_安全查看','dfax-7wap_con_Safety');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-anquan-check']);
	      		break;
	      	case 2:
	      		ga('send','event','C02_Conversion','con_驾控查看','dfax-7wap_con_Driving');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-jiakong-check']);
	      		break;	
	      	case 3:
	      		ga('send','event','C02_Conversion','con_科技查看','dfax-7wap_con_Technology');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-keji-check']);
	      		break;	
	      	case 4:
	      		ga('send','event','C02_Conversion','con_空间查看','dfax-7wap_con_Space');
	      		_smq.push(['custom','dfAX7M','dfDX7M-nav-kongjian-check']);
	      		break;	
			
		}
	});
	function popShow(curNum){
		var html = '';
		var className = "pop_show"+(curNum+1);
		html+='<ul class="bd">';
		for(var i=0;i<picArr[curNum]['maxNum'];i++ ){
			var src1 = "images/"+picArr[curNum]["file"]+"/pic"+(i+1)+'.jpg';
			var src2 = "images/"+picArr[curNum]["file"]+"/ico_txt"+(i+1)+'.png';
			html+='<li><img src='+src1+' alt="" class="w100 pic" /><img src='+src2+'  alt="" class="w100 tit" /></li>';
		}
		html+='</ul><ul class="hd"></ul><img src="images/ico_pre.png" class="ico prev" alt="" /><img src="images/ico_next.png" class="ico next" alt="" />';
		$slide.empty().append(html);
		$popShow.addClass(className).fadeIn();
		TouchSlide({
			slideCell:"#scroll",
			mainCell:".bd",
			autoPage:true,
			titCell :".hd",
			effect:"leftLoop",
			startFun : function(i){
				if(curNum==0){
					switch(i){
				      	case 0 :
				      		ga('send','pageview', '/VP/dfax-7wap/造型/前格栅');
				      		break;
				      	case 1:
				      		ga('send','pageview', '/VP/dfax-7wap/造型/流畅车身');
				      		break;
				      	case 2:
				      		ga('send','pageview', '/VP/dfax-7wap/造型/排气管');
				      		break;	
				      	case 3:
				      		ga('send','pageview', '/VP/dfax-7wap/造型/轮毂');
				      		break;							
					}
				}else if(curNum==1){
					switch(i){
				      	case 0 :
				      		ga('send','pageview', '/VP/dfax-7wap/安全/电子稳定系统ESC');
				      		break;
				      	case 1:
				      		ga('send','pageview', '/VP/dfax-7wap/安全/HAS坡道起步辅助');
				      		break;
				      	case 2:
				      		ga('send','pageview', '/VP/dfax-7wap/安全/360°全景影像');
				      		break;	
				      	case 3:
				      		ga('send','pageview', '/VP/dfax-7wap/安全/胎压监测');
				      		break;							
					}
				}else if(curNum==2){
					switch(i){
				      	case 0 :
				      		ga('send','pageview', '/VP/dfax-7wap/驾控/变速箱');
				      		break;
				      	case 1:
				      		ga('send','pageview', '/VP/dfax-7wap/驾控/悬架');
				      		break;
				      	case 2:
				      		ga('send','pageview', '/VP/dfax-7wap/驾控/发动机');
				      		break;							
					}
				}else if(curNum==3){
					switch(i){
				      	case 0 :
				      		ga('send','pageview', '/VP/dfax-7wap/科技/电子驻车EPB');
				      		break;
				      	case 1:
				      		ga('send','pageview', '/VP/dfax-7wap/科技/一键启动');
				      		break;
				      	case 2:
				      		ga('send','pageview', '/VP/dfax-7wap/科技/定速巡航');
				      		break;		
				      	case 3:
				      		ga('send','pageview', '/VP/dfax-7wap/科技/电动记忆座椅');
				      		break;
				      	case 4:
				      		ga('send','pageview', '/VP/dfax-7wap/科技/WindLink');
				      		break;					      		
					}
				}else if(curNum==4){
					switch(i){
				      	case 0 :
				      		ga('send','pageview', '/VP/dfax-7wap/空间/仪表盘');
				      		break;
				      	case 1:
				      		ga('send','pageview', '/VP/dfax-7wap/空间/水转印面板、中控装饰条');
				      		break;
				      	case 2:
				      		ga('send','pageview', '/VP/dfax-7wap/空间/行李箱容积');
				      		break;					      		
					}
				}					
			},
			endFun : function(i){

			}
		});
	}
	$popShow.find('.btn_close').on("click",function(){
		$popShow.fadeOut();
		$slide.empty();
	});
	$(".btn_close").on("click",function(){
		$('.pop ').fadeOut();
	});
	var $h3 = $(".testdrive h3");
	$("#btn_test2").on("click",function(){
		$("#pop_buy").fadeIn();
		ga('send','event','C02_Conversion','con_在线订车','dfax-7wap_con_Order');
		_smq.push(['custom','dfAX7M','dfAX7M-buy']);
	});
	$("#btn_test1").on("click",function(){
		$("#pop_testdrive").fadeIn();
		ga('send','event','C02_Conversion','con_预约试驾','dfax-7wap_con_TestDrive');
		_smq.push(['custom','dfAX7M','dfAX7M-drive']);
	});	
	
	$(".logo").on("click",function(){
		ga('send','event','C01_Nav','nav_左上角LOGO','dfax-7wap_nav_Left-Logo');
		setTimeout(function(){
			location.href='http://www.dfpv.com.cn/';
		},100);
		
	});
})(window);
