/*  time : 2016.3.6
*   参数配置
*    defaults.wrapArr  】 格式 ：【数组】 [{box:$(".scrollbox").eq(0),maxVal:0.15},{box:$(".scrollbox").eq(1),maxVal:0.2}];
     box 需要滚动的jquery对象;
     maxVal滚动的最大值,根据next同级元素重叠marginTop的值来设置
*    defaults.reset 格式：【函数】  浏览器发生变化时重置元素的状态的方法 默认为null 
*/

; (function ($, W, D, undefined) {
    "use strict";
    var $win  = $(W);
    var $html = $("html,body");
    var height = $win.height();
    var width = $win.width();
    var box ;
    $win.scroll(function(e){
        e.preventDefault();
        box.scroll();
    });
    $win.resize(function(){
        box.init();
    });   
    $win.on('mousewheel',function(e,d){
        e.preventDefault();
        if(d>0){
            $html.stop(true).animate({"scrollTop":"-="+250+"px"},1200,"easeOutCubic",function(){});
        }else{
            $html.stop(true).animate({"scrollTop":"+="+300+"px"},1200,"easeOutCubic",function(){});
        }
    });   
    var defaults = {
        wrapArr :[{box:$(".scrollbox").eq(0),maxVal:0.15},{box:$(".scrollbox").eq(1),maxVal:0.2}],
        reset : null
    };

    function Box(options) {
        this.options = options = $.extend(defaults, options || {});
        this.init();
    }
    Box.prototype = {
        constructor: Box,
        init: function () {
            var options = this.options;
            this.boxLen = options.wrapArr.length;
            height = $win.height(),width = $win.width();
            this.scroll();
            this.reset();
        },
        scroll : function(){
            var t = $win.scrollTop() ;
            for(var i = 0;i<this.boxLen;i++){
                var maxY = this.options.wrapArr[i]["maxVal"]*width;
                var $box = this.options.wrapArr[i]["box"];
                var yTop = function(maxY,$box){
                    var offsetTop = $box.offset().top;
                    var boxHeight = $box.outerHeight();
                    var minScroll = offsetTop - height; //元素在不可视区域底部的最小值，
                    var maxScroll =  offsetTop+boxHeight;//元素在不可视区域顶部的最大值
                    var y  =0;
                    if( (t<minScroll) ){
                       return  y = 0;
                    }else{
                        y = (t-minScroll)/(maxScroll-minScroll)*maxY;
                        if(y>maxY){
                            return y = maxY;
                        }
                        return y ;
                    }
                }  
                TweenMax.set($box,{y:-yTop(maxY,$box)});              
            }          
        },
        reset : function(){
            this.options.reset &&this.options.reset();
        }
 
    };
    $.scrollBox = function (options) {
        options = $.extend(defaults, options || {});
        box =  new Box(options);
    }
})(jQuery, window, document);