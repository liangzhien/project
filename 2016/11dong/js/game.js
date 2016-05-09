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
     	loadSec();
     	
    }
});
var $step1 = $("#step1"),$step2 = $("#step2"),$step3 = $("#step3"),$step4 = $("#step4"),$step5 = $("#step5"),$step6 = $("#step6");
var type = 0,resultImg;
var bgLayer,bgLayer2,carLayer;
$("#btn >img").on("click",function(){
	type = $(this).index();
	$step1.find('.pic_box .img').eq(type).show().siblings().hide();

});
$("#btn_next1").on('click',function(){
	if(type!=3){
		$step3.show();
		slide();
		bgLayer = editor.addImage({'img': $step1.find(".img").eq(type).find('img')[0], 'pos': [0, 0],disable:true,dismove:true});
		carLayer = editor.addImage({'img': $("#car")[0], 'pos': [244, 460],disable:true,dismove:true});
	}else{
		$step2.show();
	}
	$step1.hide();
	
});
//上一步
$("#btn_prev").on('click',function(){
	if(type!=3){
		$step1.show();
	}else{
		$step2.show();
	}
	
	$step3.hide();
	
	bgLayer && eidtor.stage.removeChild(bgLayer);
    carLayer && eidtor.stage.removeChild(carLayer);	
});
//提交
$("#btn_save").on('click',function(){

	editor.toDataURL(function(data){
		$step3.hide();
		$step4.show();
		resultImg = data;
		$('.result_img').attr("src",resultImg);
	});	
});
//留资
$("#btn_msg").on("click",function(){
	$step4.hide();
	$step5.show();	
});
//留资提交
$("#btn_msg_save").on('click',function(){
	$step5.hide();
	$step6.show();
});
var editor = new mo.ImageEditor({
    trigger: $('#file'),
    container: $('#imgedit'),
    width: 705,
    height: 711,
    stageX:  $('#imgedit')[0].offsetLeft,
	iconScale: {
		url: 'images/icon.png',
		rect: [300, 300, 25, 25]
	},
	iconClose: {
		url: 'images/icon.png',
		rect: [400, 300, 25, 25]
	}

});
$(".pop_share").on("click",function(){
	$(this).fadeOut();
});
$('.btn_home').on("click",function(){
	location.href = 'index.php'
});

$(".wrap").on("click",".slide li span",function(){
	var $img = $(this).find('img')[0]; 
	editor.addImage({'img': $img,'pos':[40,40]});
	carLayer && editor.stage.removeChild(carLayer);	
	carLayer = editor.addImage({'img': $("#car")[0], 'pos': [244, 460],disable:true,dismove:true});
});
var sketchpad = new Sketchpad({
  element: '#sketchpad',
  width: 705,
  height: 711
});
$("#btn_re").on("click",function(){
	sketchpad.undo();
});
$(".write_weight span").on("click",function(){
	$(this).addClass('on').siblings().removeClass('on');
	var size =parseInt( $(this).find('i').text());
	sketchpad.penSize = size;
});
$(".write_color i").on("click",function(){
	$(this).addClass('on').siblings().removeClass('on');
	var color = $(this).css('background-color');
	console.log(color)
	sketchpad.color  = color;
});	
$("#btn_next").on("click",function(){
	var resultImg =  $('#sketchpad')[0].toDataURL();
	var img = new Image();
	bgLayer2 = editor.addImage({'img': $("#write_bg")[0],disable:true,dismove:true});
	
	img.onload = function(){
		
		editor.addImage({img: img,disable:true,dismove:true });
		$step2.hide();
		$step3.show();
		slide();
		carLayer = editor.addImage({'img': $("#car")[0], 'pos': [244, 460],disable:true,dismove:true});
	}
	img.src = resultImg;	

});
var isOne =true;
function slide(){
	if(!isOne){return;}
	isOne = false;
	TouchSlide({ slideCell:"#slide" });
}

function loadSec(){
	var loaderStart = new En.Loading();	
	loaderStart.init({
	    imgs:[],	
	    searchImgs:{
			dom:$("body")[0],
			type:'src2'
		},
	     searchBgs :{
	    	type:'bg2'
	    }
	});
}
