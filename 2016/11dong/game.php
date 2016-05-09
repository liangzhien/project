<?php include "include/header.php"; ?>
    <div class="wrap  game hide" > 
    	<div class="bd " id="step1">
    		<div class="scale">
    			<div class="pic_box">
    				<div class="con">
    					<div class="img">
    						<img data-src="images/game/1/1.png" class="i1">
    						<img data-src="images/game/1/4_1.png" class="ico ico_car" id="car">
    						<img src="images/game/1/bg.png" alt="" class="ico out_bg" />
    					</div>
    					<div class="img hide" >
    						<img data-src="images/game/1/2.png" class="i1">
    						<img src="images/game/1/4_1.png" class="ico ico_car">
    						<img src="images/game/1/bg.png" alt="" class="ico out_bg" />
    					</div>
     					<div class="img hide" >
    						<img data-src="images/game/1/3.png" class="i1">
    						<img src="images/game/1/4_1.png" class="ico ico_car">
    						<img src="images/game/1/bg.png" alt="" class="ico out_bg" />
    					</div>
    					<div class="img hide" >
    						<!-- <img data-src="images/game/1/5-.png"> -->
                            <img data-src="images/game/1/5.png" class="i1">
                            <img src="images/game/1/4_1.png" class="ico ico_car">
                            <img src="images/game/1/bg.png" alt="" class="ico out_bg" />    						
    					</div>    					   						
    				</div>
    			</div>

    			<div class="btn_box" id="btn">
    				<img data-src="images/game/1/1_1.png">
    				<img data-src="images/game/1/1_2.png">
     				<img data-src="images/game/1/1_3.png">
    				<img data-src="images/game/1/1_4.png">   					
    			</div>
    			<div class="btn_box" id="btn_next1">
					<img src="images/ico7.png">
				</div>
    		</div>
    	</div>
    	<div class="bd hide write_box" id="step2">
    		<div class="scale">
    			<div class="pic_box">
    				<div class="con">
    					
    					<img src="images/game/1/4.png" class="ico img1 hide " id="write_bg"/>
    					
    					<canvas id="sketchpad"></canvas>	
    					<img src="images/game/1/4_1.png" class="ico ico_car " />
    				</div>
    			</div>
				<div class="write_weight">
					<span><i>5</i></span>
					<span><i>15</i></span>
					<span><i>25</i></span>
					<span><i>30</i></span>
				</div>
				<div class="write_color">
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
				</div>
    			<div class="btn_box">
					<img src="images/ico8.png" id="btn_re">
					<img src="images/ico9.png"  id="btn_next">
				</div>
    		</div>
    	</div>  
     	<div class="bd hide write_box2" id="step3">
    		<div class="scale">
    			<div class="pic_box">
    				
					<div id="imgedit">
			
					</div>
  
    			</div>
    			<input type="file" name="file" id="file" value="" class="hide" />
				<div class="slide" id="slide">
					<img data-src2="images/game/3/ico1.png" class="ico prev"/>
					<ul class="bd">
						<li>
							<span><img data-src2="images/game/3/pic1.png" /></span>
							<span><img data-src2="images/game/3/pic2.png" /></span>
							<span><img data-src2="images/game/3/pic3.png" /></span>
							<span><img data-src2="images/game/3/pic4.png" /></span>
						</li>
						<li>
							<span><img data-src2="images/game/3/pic5.png" /></span>
							<span><img data-src2="images/game/3/pic6.png" /></span>
							<span><img data-src2="images/game/3/pic7.png" /></span>
							<span><img data-src2="images/game/3/pic8.png" /></span>
						</li>
						<li>
							<span><img data-src2="images/game/3/pic9.png" /></span>
							<span><img data-src2="images/game/3/pic10.png" /></span>
							<span><img data-src2="images/game/3/pic11.png" /></span>
							<span><img data-src2="images/game/3/pic12.png" /></span>
						</li>
						<li>
							<span><img data-src2="images/game/3/pic13.png" /></span>
							<span><img data-src2="images/game/3/pic14.png" /></span>
							<span><img data-src2="images/game/3/pic15.png" /></span>
							<span><img data-src2="images/game/3/pic16.png" /></span>
						</li>	
						<li>
							<span><img data-src2="images/game/3/pic17.png" /></span>
							<span><img data-src2="images/game/3/pic18.png" /></span>
							<span><img data-src2="images/game/3/pic19.png" /></span>
							<span><img data-src2="images/game/3/pic20.png" /></span>
						</li>
						<li>
							<span><img data-src2="images/game/3/pic21.png" /></span>
							<span><img data-src2="images/game/3/pic22.png" /></span>
							<span><img data-src2="images/game/3/pic23.png" /></span>
							<span><img data-src2="images/game/3/pic24.png" /></span>
						</li>																			
					</ul>
					<img data-src2="images/game/3/ico2.png" class="ico next"/>
				</div>
				<img src="images/game/3/1.png" class="i1">
    			<div class="btn_box">
					<img data-src2="images/ico10.png" id="btn_prev">
					<img data-src2="images/ico11.png" id="btn_save">
				</div>
    		</div>
    	</div>   
      	<div class="bd hide  upload_box" id="step4">
    		<div class="scale">
    			<div class="pic_box">
    				<div class="con">
    					<img class="result_img" >	
    					<img src="images/game/1/bg.png" alt="" class="ico out_bg" />
    				</div>
    			</div>

				<img data-src2="images/game/4/1.png" class="i1">
    			<div class="btn_box">
					<img data-src2="images/ico12.png"  id="btn_msg">
				</div>
    		</div>
    	</div>  
      	<div class="bd hide info_box" id="step5" >
    		<div class="scale">
				<div class="form">
					<div class="con" data-bg2='images/game/5/bg.png'>
						<input type="text" />
						<input type="text" />
					</div>
	    			<div class="btn_box">
						<img data-src2="images/ico13.png"  id="btn_msg_save" >
					</div>					
				</div>
    		</div>
    	</div>   
    	<div class="bd hide sale_box" id="step6">
    		<div class="scale">
    			<div class="pic_box pic_box2">
    				<img class="result_img" >
    				<img src="images/game/1/bg.png" alt="" class="ico out_bg" />
    			</div>
    			<img data-src2="images/game/6/1.png"/>
    			<div class="btn_box btn_box2">
    				<img data-src2="images/ico14.png"  data-pop="share" class="btn_pop">
    				<img data-src2="images/ico15.png" class="btn_home">
    			</div>

    		</div>
    	</div>    	  	   		  	
    </div> 
    <div class="pop pop_share">
    	<div class="bd">
    		<img data-src2="images/pic_share.png">
    	</div>
    </div>      
    <script src="lib/loading.js" type="text/javascript"></script>
    <script src="lib/imagedit.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="lib/TouchSlide.1.1.js" type="text/javascript" charset="utf-8"></script>
    <script src="lib/sketchpad.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="js/game.js"></script>
	
<?php include "include/footer.php"; ?>