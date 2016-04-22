!(function(W,D){
    var self,pt;
    function Test(){}
    Test.instance = null;
    Test.init = function() {
        if (Test.instance != null) return Test.instance;
        Test.instance = new Test();
        Test.instance.init();
        return Test.instance;
    };
    pt = Test.prototype;    


    pt.init = function(){
       self = this;
       this.doms = {
         'name' : $('.wrap')
       }
       self.go();
    }
    pt.go = function(){
       // this.doms.name.hide();
    }
    App.Test  =Test;
})(window,document);
var test = new App.Test.init();
function set(){
	var scale = 1680/860;
	var winW =$(window).width();
	var winH = $(window).height();
	var state = (winW/winH) > (1680/860) ? 1 : 2;
	if (state === 1) {
		var h = winW / (1680/860);
		$(".img,.box2").css({
			width: '100%',
			height: h,
			left: 0,
			top:(winH - h) / 2
		});
	} else {
		var w = winH / (860/1680);
		$(".img,.box2").css({
			height: '100%',
			width: w,
			left: (winW - w) / 2,
			top:0
		});
	}
	///$(".box2").css({"left":(347/1680)*100+"%",marginTop:(477/1680)*100+"%"})
	//$(".img2").css({"left":(347/1680)*100+"%",marginTop:(477/1680)*100+"%"})
}
$(window).on('resize', set);
set();	