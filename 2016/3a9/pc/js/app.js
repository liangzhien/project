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
       console.log(self)
       self.go();
    }
    pt.go = function(){
        this.doms.name.hide();
    }
    App.Test  =Test;
})(window,document);
var test = new App.Test.init();
