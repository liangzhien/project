var global = global || {};
var module = module || {};
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
};
var ww,wh,coverProfile,customDebug;
var $temp,temps;

var IMAGE_WIDTH=1440,IMAGE_HEIGHT=810,TABLE_EXTRA_HEIGHT=200,
TWEEN_PAGE_TIME=800,TWEEN_SLOGEN_TIME=400,TWEEN_NAVI_TIME=400,
MOUSE_WHEEL_INTERVAL=1200;
HASHES=['home','detail','detail','detail','detail','config','preserve'];
var grabMouseWheel=false,lockMouseWheel=false,lock=true,panMark=false;
	
var remote_ip_info = {"ret":1,"start":-1,"end":-1,"country":"\u4e2d\u56fd","province":"\u4e0a\u6d77","city":"\u4e0a\u6d77","district":"","isp":"","type":"","desc":""};
var startTime = new Date().getTime()-MOUSE_WHEEL_INTERVAL;
/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
*/
 
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
///=== 预约试驾 =======================================================================================================///
(function(module, $) {
    var it,pt;

    function Order() {};
    Order.instance = null;
    Order.init = function() {
        if (Order.instance != null) return Order.instance;
        Order.instance = new Order();
        Order.instance.init();
        return Order.instance;
    };
    pt = Order.prototype;
    pt.data = null;
    pt.init = function() {


        it = this;
        this.dom = $('#order');
        this.id = 100;
        this.$bg = $('#bg4');
        this.doms = {
            username: $('#username'),
            phone: $('#phone'),
            modelid: $('#model'),
            provincename: $('#province'),
            cityname: $('#city'),
            dealerid: $('#dealer'),
            addr: $('#address'),
            dealertip: $('#dealertip'),
            form: $('#order form'),
            btn: $('#order .form-submit'),
            repo: $('#order .form-result')
        }
        var url = 'js/dealer.txt';
        $.getJSON(url).success(initData).error(function(e) {
            console.log('error', e);
        })

        function initData(data) {
            it.data = data;
            it.initUI();
           // console.log("ues")
        }
    };
    pt.initUI = function() {
        var data = this.data,
            dom = this.doms,
            prov = dom.provincename,
            city = dom.cityname,
            dealer = dom.dealerid,
            addr = dom.addr;

		it.$bg.data('imageURL','assets/bg-4.jpg');
		
        this.select = new SelChain(data, [{
            name: 'province',
            optid: 'id',
            def: '请选择省',
            el: prov,
            check: 'name',
            child: 'city',
        }, {
            name: 'city',
            optid: 'id',
            def: '请选择市',
            el: city,
            check: 'name',
            child: 'dealer'
        }, {
            name: 'dealer',
            optid: 'id',
            def: '请选择经销商',
            el: dealer,
            check: 'name',
            child: 'none',
            callback: function(name, obj, i, e) {
                if (obj) {
                    addr.html('' + obj.address);
                    it.doms.dealertip.hide();
                } else {
                    addr.html('请先选择地区与经销商');
                    it.doms.dealertip.show();
                }
            }
        }], {
            def: true
        })

        var wro = window.remote_ip_info || {};
        var cur_prov = wro.province;
        var cur_city = wro.city;
        if (cur_prov && cur_city) {
            setDefault();
        }

        function setDefault() {
            var p = it.select.getObj('province');
            var ifp = false;
            var len = cur_prov.length;
            $.each(p.arr, function(i, e) {
                var n = e.name.substr(0, len);
                if (n == cur_prov) {
                    ifp = true;
                    it.select.change('province', e.id, true);
                    return false;
                }
            })
            if (!ifp) return;

            var c = p.childObj;
            len = cur_city.length;
            $.each(c.arr, function(i, e) {
                var n = e.name.substr(0, len);
                if (n == cur_city) {
                    it.select.change('city', e.id);
                    return false;
                }
            })
        }

        this.initForm();
    };
    pt.resetForm =function(){
		it.select.change('province', '');
		it.doms.username.val('');
		it.doms.phone.val('');
		it.doms.dealertip.show();
    }

    pt.initForm = function() {
        var btn = it.doms.btn;
        
        btn.data('enable', true);
        btn.on('click', function() {
            var originalleadid =  Date.parse(new Date())+randomWord(true,3,3); 
            it.doms.repo.hide();
          //  _smq.push(['custom','预约试驾','立即预约']);
            if (btn.data('enable') == false) return;
            
            if(it.doms.username.val() === ''){
				alert('请输入您的姓名');
				document.getElementById('username').focus();
				return;
			}
			if(it.doms.phone.val() === ''){
				alert('请输入您的联系电话');
				document.getElementById('phone').focus();
				return;
			}
			if(!validMobile(it.doms.phone.val())){
				alert('联系电话输入有误,请重新输入');
				document.getElementById('phone').focus();
				return;
			}
			if(it.doms.modelid.val() === '' ){
				alert('请选择意向车型');    
				return;
			}			
			if(it.doms.provincename.val() === '' ||
				it.doms.cityname.val() === '' ||
				it.doms.dealerid.val() === ''){
				alert('请先选择地区与经销商');    
				return;
			}
			

            btn.data('enable', false);
      
            var obj = {
                mt: '2016xinyuanjing', //媒体的唯一编号【必填】
                qd: '试驾', //媒体内部的分类
                leadtype: 2, //线索类型【必填】
                brandid: 1, //LMS品牌编号
                seriesid: "357561", //LMS车系编号
                modelid: it.doms.modelid.val(), //LMS车型的编号
                provincename: it.doms.provincename.val(), //LMS省ID
                cityname: it.doms.cityname.val(), //LMS城市ID
                dealerid: it.doms.dealerid.val(), //LMS经销商编号
                name: it.doms.username.val(), //用户姓名【必填】
                phone: it.doms.phone.val(), //用户手机/电话【必填】
                originalleadid : originalleadid
            }
            $.post('/api/test_drive/post1.php',obj,
                function(data) {

                    // 前台控制
                    btn.data('enable', true);
                    if (data.success == '1' || data.success == '2') {
                      //  it.doms.repo.css('backgroundImage', 'url(./assets/icon-success.png)').show();
                        it.doms.repo.find('span').html('预约成功');

                        alert('恭喜您，预约成功了。');
                        //_smq.push(['custom','预约试驾','预约成功',originalleadid]);
                        it.resetForm();
                    } else {
                       // it.doms.repo.css('backgroundImage', 'url(./assets/icon-fail.png)').show();
                       // it.doms.repo.find('span').html('预约失败,请再试一遍');
                        
                        alert('很抱歉，您预约失败了。');
                    }
                }, 'json')
              .error(function(e) {
                	btn.data('enable', true);
                	it.doms.repo.css('backgroundImage', 'url(./assets/icon-fail.png)').show();
                	it.doms.repo.find('span').html('预约失败,请再试一遍');
                	
                	//alert('很抱歉，您预约失败了。');
                	console.log(e.statusText)});
        })
    };
    pt.enterInnerPage = function(){}
    pt.resize = function() {
    	setCoverBG(it.$bg,it.$bg.data('imageURL'));
    };
    pt.open = function() {};
    pt.close = function() {};

	//验证手机号码 
	function validMobile(value){
		return /^0?1[3|5|7|8][0-9]\d{8}$/.test(value) ? true : /^0?194\d{8}$/.test(value);
	};
	
    module.Order = Order;
})(module, jQuery);
module.Order.init();

































