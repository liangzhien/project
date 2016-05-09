<?php include "include/header.php"; ?> 
    <div class="wrap rule hide">
    	<div class="inner">
    		<h3><img data-src="images/home/6.png"></h3>
    		<div class="rule_box">
    			<img  data-src="images/home/rule.jpg">
    		</div>
    		<img src="images/home/8.png" class="ico i1" title="箭头">
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