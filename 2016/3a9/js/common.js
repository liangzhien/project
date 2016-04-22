;(function(W,D){
    W.App = W.App || {
        domain:"",
        debug: false,
		isClick: false,
		debug: false,
		isIE7: !'1'[0],
		isIE8: !window.addEventListener,
		isIE9: !!window.addEventListener && !document.documentElement.classList,
		windowWidth: 0,  
		windowHeight: 0
    };
    W.App.getUrl = function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
    }
    W.App.id = function(dom) {
        return document.getElementById(dom);
    }
 	if (App.isIE8) {
		document.write('<script src="lib/html5.js" type="text/javascript" charset="utf-8"><\/script>');
	}	
})(window,document);    

