<?php include "include/header.php"; ?>
    <div class="wrap  my hide" > 
    	<div class="bd" >
    		<div class="scale">
    			<div class="pic_box pic_box2">
    				<img src="images/tem/2.png">
    			</div>
    			<div class="form_box form_box2">
    				<div class="con"  data-bg="images/my/bg1.png">
    					<p class="ico num">13</p>
    					<p class="ico num2"><span>2000</span>星币</p>
    					<p class="ico num3"><span>2000</span>星币</p>

    				</div>
    			</div>
    			<div class="btn_box">
    				<img src="images/ico5.png">
    				<img src="images/ico6.png">
    			</div>

    		</div>
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
		        $(".wrap").show();
		        $(".btn_box img").eq(1).on("click",function(){
		        	location.href = "index.php"
		        })
		    }
		});
    </script>
<?php include "include/footer.php"; ?>