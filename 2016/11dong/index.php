<?php include "include/header.php"; ?>
    <div class="wrap home hide" > 
    	<div class="bd">
	    	<a href="rule.php"><img data-src="images/home/1.png" class="ico i1" title="活动详情"></a>
	    	<div class="scale">
		    	<img data-src="images/home/3.png" class="ico i2" title="我和贵士的一天">
		    	<img data-src="images/home/4.png" class="ico i3" title="童画">
		    	<img data-src="images/home/5.png" class="ico i5" title="背景">
		    	<img data-src="images/home/2.png" class="ico i4" title="车">
		    	<a href="game.php" class='ico btn_game'><img data-src="images/home/ico1.png"></a>
	    	</div>

    	</div>
    </div> 
    <script src="lib/loading.js" type="text/javascript"></script>
    <script type="text/javascript">
	    var loaderStart = new En.Loading();	
		loaderStart.init({
		    imgs:[],
		    enterCallback:function(){
		        var per = this.count/this.length*100>>0;
		        $('.loading .per').height(per+'%')
		    },
		    callback:function(){
		        $(".loading").hide();
		        $(".wrap").show();
		    }
		});
    </script>
<?php include "include/footer.php"; ?>