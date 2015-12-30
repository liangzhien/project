<?php include "include/header.php"; ?>
    <div class="loading">
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
        <div class="loading_data">LOADING</div>
    </div>

    <div class="wrap home hide" > 
        <div class="bg"></div>
        <div class="bd">
            <h1 data-animation="fadeInDown" data-duration="600"><img src="images/logo.jpg" alt=""></h1>
            <div class="txt" data-animation="fadeInDown" data-duration="600">
                现有<span>xxxx</span>人在砍价热抢美的MRO201净水器
            </div>
            <img src="images/ico1.png" class="ico ico1" alt="" data-delay="100" data-animation="fadeInDown" data-duration="600">
            <div class="box2" data-delay="100" data-animation="fadeInUp" data-duration="600">
                <img src="images/ico3.png" class="ico " alt="" >
                <img src="images/ico2.png" class="ico " alt="" >
            </div>
            <div class="btnbox"  data-delay="400" data-animation="fadeInUp" data-duration="600">
                <div class="p">
                     <img src="images/ico_btn1.png" alt=""  class='btn_pop' data-pop="make">
                    <img src="images/ico_btn2.png" alt="" class='btn_pop' data-pop="pro">                   
                </div>
                <div class="p">
                     <img src="images/ico_btn3.png" alt="" style="margin-right:20px;"  class='btn_pop' data-pop="share">
                     <img src="images/ico_btn6.png" alt="" >                    
                </div>
            </div>
            <div class="price_box"  data-delay="500" data-animation="fadeInUp" data-duration="600">
                <p>恭喜你<span>XXX</span>，现在已经成功砍掉了<span>XXX</span>元</p>
                <div class="line">
                    <div class="w" style="width: 30%;"></div>
                </div>
            </div>
        </div>
        <div class="bd2"  data-delay="600" data-animation="fadeInUp" data-duration="600">
            <img src="images/pic1.jpg" alt="">
            <div class="list"> 
                <table>
                    <tr>
                        <td><img src="images/tem.jpg" alt=""></td>
                        <td>xxxxx</td>
                        <td>-1元</td>
                    </tr>
                     <tr>
                        <td><img src="images/tem.jpg" alt=""></td>
                        <td>xxxxx</td>
                        <td>-12元</td>
                    </tr>                   
                </table>
            </div>
        </div>
    </div>
    <?php include "include/dialog.php"; ?>
    <script>
		var imgList = ["images/bg1.jpg","images/ico1.png","images/ico2.png","images/ico3.png"];
        App.loadImg(imgList,function(){
          $(".loading").remove();
          $(".wrap").fadeIn(200);
           $(".load").each(function(){
            var self = $(this);
            if(self.attr('data-src')){
                var src = self.attr("data-src");
                self.attr("src",src);
                self.removeAttr("data-src");
            }
          }); 
          $(".pop_share").on("touchend",function(){
             $(this).fadeOut();

          });
        },progress);
        function progress (_per) {
        	$(".loading").find(".loading_data").html(_per+"%");
        }

    </script>
<?php include "include/footer.php"; ?>