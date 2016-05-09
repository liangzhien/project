<?php include "include/header.php"; ?>
    <div class="wrap home main " id="step1"> 
    	<div class="bd ">
	    	<a href="rule.php"><img data-src="images/home/1.png" class="ico i1" title="活动详情"></a>
	    	<div class="msg_box">
	    		<div class="pic "><img src="images/tem/1.png"></div>
	    		<p><span>恩恩</span>邀请您参与此次拍卖会</p>
	    		 
	    	</div>
	    	<div class="scale">
		    	<img data-src="images/home/3.png" class="ico i2" title="我和贵士的一天">
		    	<img data-src="images/home/4.png" class="ico i3" title="童画">
		    	<img data-src="images/home/5.png" class="ico i5" title="背景">
		    	<img data-src="images/home/2.png" class="ico i4" title="车">
		    	<div class="tit ico">
		    		<img data-src="images/main/1.png">
		    		<p><span>1000</span>星币</p>
		    	</div>
		    	<a href="javascript:;" class='ico btn_game'><img data-src="images/ico1.png"></a>
	    	</div>
    	</div>

    </div> 
    <div class="wrap hide"  id="step2">
    	<div class="bd" >
    		<div class="scale">
    			<div class="pic_box">
    				<img src="images/tem/2.png">
    			</div>
    			<div class="form_box">
    				<div class="con"  data-bg="images/main/bg1.png">
    					<p class="ico num">13</p>
    					<p class="ico num2"><span>2000</span>星币</p>
    					<p class="ico num3"><span>2000</span></p>
    					<div class="type">
    						<a href="javascript:;">100星币</a>
    						<a href="javascript:;">200星币</a>
    						<a href="javascript:;">300星币</a>
    					</div>
    				</div>
    			</div>
    			<div class="btn_box">
    				<img src="images/ico2.png" id="btn_ok">
    			</div>
    			<img src="images/main/2.png">
    		</div>
    	</div>
    </div>
    <div class="wrap hide"  id="step3">
    	<div class="bd" >
    		<div class="scale">
    			<div class="pic_box pic_box2">
    				<img src="images/tem/2.png">
    			</div>
    			<div class="form_box form_box2 ">
    				<div class="con"  data-bg="images/main/bg2.png">
    					<p class="ico num"><span>1222</span>星币</p>
    				</div>
    			</div>
    			<div class="btn_box btn_box2">
    				<a href="index.php"><img src="images/ico3.png"></a>
    				<img src="images/ico4.png" data-pop='share' class="btn_pop">
    			</div>
    		</div>
    	</div>
    </div>  
    <div class="pop pop_share">
    	<div class="bd">
    		<img data-src="images/pic_share.png">
    	</div>
    </div>  
    <script src="lib/loading.js" type="text/javascript"></script>
    <script type="text/javascript">
	    var loaderStart = new En.Loading();	
		loaderStart.init({
		    imgs:[],
		    searchBgs :{
		    	type:'bg'
		    },
		    enterCallback:function(){
		        var per = this.count/this.length*100>>0;
		        $('.loading .per').height(per+'%')
		    },
		    callback:function(){
		        $(".loading").hide();
		        $(".wrap").eq(0).show();
		        $(".pop_share").on("click",function(){
		        	$(this).fadeOut();
		        });
                $(".btn_game").on("click",function(){
                    $("#step1").hide();
                    $("#step2").fadeIn();
                    return false;
                });
                $("#btn_ok").on("click",function(){
                    $("#step2").hide();
                    $("#step3").fadeIn();
                    return false;
                });
                $(".type a").on("click",function(){
                    $(this).addClass('on').siblings().removeClass('on');
                    return false;
                });
		    }
		});
    </script>
<?php include "include/footer.php"; ?>