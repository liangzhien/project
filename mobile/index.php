<?php include "include/header.php"; ?>
	<div class="loading">
		
	</div>
    <div class="wrap home hide">
        
    </div>
    <script>
		var imgList = ["images/loading.gif"]
        App.loadImg(imgList,function(){
          $(".loading").hide();
          $(".wrap").show();
        },progress);
        function progress (argument) {
        	// body...
        }
    </script>
<?php include "include/footer.php"; ?>