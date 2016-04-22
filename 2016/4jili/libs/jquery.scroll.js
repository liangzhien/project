    
 !(function($){
        $.setNav = function(b){
            var defaults = {
               mainCell  : ".part",
               titCell :".nav_ul li",
               num :-74,
               innerTime : 600,
               isClick : false 
            }
          var c = $.extend({},defaults,b);
          var _setNav = function(){
               this.arr = [];
               this.init();
          } 
          _setNav.prototype = {
              init : function(){
                var _that = this;
                this.l = $(c.mainCell).length;
                this.win = $(window);
                this.getTopP();
                this.scroll();
                this.sTop ;
                $(".ico_con").on("click",function(){
                  setTimeout(function(){
                      _that.getTopP();
                  },800)
                });
                $(c.titCell).bind("click", function(){
                   var i = $(this).index();
                   c.isClick = true;
                   $(this).addClass("active").siblings().removeClass("active");
                   $("html, body").animate({scrollTop: _that.arr[i]+10},c.innerTime,function(){
                         c.isClick  = false;
                         _that.scroll();
                   });
                   return false;
                });
                 $(window).bind("scroll", function(){
                    if(c.isClick ) return;
                    if( _that.win.scrollTop() < _that.arr[0] ){
                      $(c.titCell).removeClass("active");
                      return;
                    }   
                    _that.scroll();                
                });     
                var timer;
                $(window).resize(function(){
                	clearTimeout(timer);
                	timer = setTimeout(function(){
                		_that.getTopP();
                	},100);
                });
              },
              getTopP : function(){
                  var myTop,
                      _that = this;
                      this.arr = [];
                  $(c.mainCell).each(function(i){
                      myTop = $(this).offset().top+c.num;
                      _that.arr.push(myTop);
                  });
              },
              scroll : function(){
                  for( var i=0; i<this.l; i++ ){
                    if( i < this.l - 1 ){
                      if(  this.win.scrollTop() >= this.arr[i] &&  this.win.scrollTop() < this.arr[i+1] ){
                        $(c.titCell).eq(i).addClass("active").siblings().removeClass("active");
                         //$(c.mainCell).removeClass("active")
                         $(c.mainCell).eq(i).addClass("active");
                        
                      }
                    }else{
                      if(  this.win.scrollTop() >= this.arr[i] ){
                        //$(c.mainCell).removeClass("active")
                         $(c.mainCell).eq(i).addClass("active");
                      }
                    }
                  }              
              }
          }
          new _setNav();
       } 
    })(jQuery);