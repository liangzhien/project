/**
 * Created by zhien.liang on 2016/3/4.
 */

; (function ($, W, D, undefined) {
    "use strict";
    var defaults = {
        scrollWrap : [{"box":'.section0'},{"box":'.section2'}] //滚动容器对象集
    };
    var $win  = $(W);
    var $html = $("html,body"),box;
    var height = $win.height(), width = $win.width();

    function Box(options) {
        this.options = options = $.extend(defaults, options || {});
        this.$scrollBox1 =$(options.scrollWrap[0]["box"]);
        this.$scrollBox2 =$(options.scrollWrap[1]["box"]);
        console.log(this.$scrollBox1)
        this.init();
    }
    Box.prototype = {
        constructor: Box,
        init: function () {
            var options = this.options;
        },
        scroll : function(){
            var self = this;
            height = $win.height(),width = $win.width();
            var t = $win.scrollTop() ;
            var sH1 = this.$scrollBox1.height()-100,offsetT1 = this.$scrollBox1.offset().top,maxY1= width*0.09,y1;//0.9 = 32-23 maxY1:$section0滚动最大值
            var sH2 = this.$scrollBox2.height()-100,offsetT2 = this.$scrollBox2.offset().top,maxY2= width*0.2,y2;//0.9 = 32-23 maxY1:$section2滚动最大值
            var s = t+height;
            y1 = function(maxY){
                var y = (sH1+offsetT1 - s)*(maxY/(height+maxY));
                if(y>0){
                    return y = 0;
                }else if(y<-maxY){
                    return -maxY;
                }else{
                    return y;
                }
            }(maxY1);
            y2 = function(maxY){
                var y = (sH2+offsetT2 - s)*(maxY/(height+maxY));
                if(y>0){
                    return y = 0;
                }else if(y<-maxY){
                    return -maxY;
                }else{
                    return y;
                }
            }(maxY2);
            TweenMax.set(this.$scrollBox1,{y:y1});
            TweenMax.set(this.$scrollBox2,{y:y2});
        },
        reset : function(){

        }
    }
    $.scrollBox = function (options) {
        options = $.extend(defaults, options || {});
        box = new Box(options);
    }

})(jQuery, window, document);