;(function(W,D){
    W.App = W.App || {
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
 
})(window,document);    

