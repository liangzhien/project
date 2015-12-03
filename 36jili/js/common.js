;(function(W,D){
	W.App = W.App || {
		wxShare: false,
		domain:"",
        domain:"",
		debug: false
	};
	W.App.getUrl = function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
    }
	W.App.id = function(dom) {
		return document.getElementById(dom);
	}
    
    W.App.loadImg = _loadImg;
    function _loadImg(imgUrl,loadComplete,progress){
        var len = imgUrl.length;
        var num = 0;
        var checkLoad = function(){
            num++;
            var percent=parseInt(num/len*100);
            if(progress){
                progress(percent);
            }
            if( num == len ){
                loadComplete();
            }
        }
        var checkImg = function(url){
            var val= url;
            var img=new Image();
            if(img.readyState){
                img.onreadystatechange = function(){
                    if(img.readyState=="complete"||img.readyState=="loaded"){
                        checkLoad();
                    }
                }
            }else{
                img.onload=function(){
                    if(img.complete==true){
                        checkLoad();
                    }
                }
            }
            img.src=val;
        }
        for( var i = 0; i < len; i++ ){
            checkImg(imgUrl[i]);
        }
    }


    function _showAnim(_box,_self) {
        var $animateDom = $(_box);
        var $element = _self ? $animateDom : $animateDom.find('[data-animation]');
        $element.css({
            '-webkit-animation': 'none',
            'display': 'none'
        });
        $element.each(function(index, element){
            var $element    = $(element),
                $animation  = $element.attr('data-animation'),
                $duration   = $element.attr('data-duration') || 500,
                $timfunc    = $element.attr('data-timing-function') || 'ease',
                $delay      = $element.attr('data-delay') ?  $element.attr('data-delay') : 0,
                $iterate    = $element.attr('data-iterate') ? $element.attr('data-iterate') : 1;
            $element.css({
                'display': 'block',
                '-webkit-animation-name': $animation,
                '-webkit-animation-duration': $duration + 'ms',
                '-webkit-animation-timing-function': 'ease',
                '-webkit-animation-timing-function': $timfunc,
                '-webkit-animation-delay': $delay + 'ms',
                '-webkit-animation-iteration-count': $iterate,
                '-webkit-animation-fill-mode': 'both'
            });

        });
  
        return $animateDom;
    }	

     _showAnim("body");
 
})(window,document);    

