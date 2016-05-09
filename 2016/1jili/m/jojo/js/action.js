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

function updateTDSelector(name, obj, i, e) {
    if (obj) {
        e.el.next('div').text(name).removeClass('select-default');
    } else {
        e.el.next('div').text(name).addClass('select-default');
    }
}
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
            provincename: $('#province'),
            cityname: $('#city'),
            dealerid: $('#dealer'),
            addr: $('#address'),
            dealertip: $('#dealertip'),
            form: $('#order form'),
            btn: $('#order .form-submit'),
            repo: $('#order .form-result')
        }
        var url = 'http://promotion.geely.com/xindihao/js/dealer_gs.txt';//
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
      		callback : updateTDSelector
        }, {
            name: 'city',
            optid: 'id',
            def: '请选择市',
            el: city,
            check: 'name',
            child: 'dealer',
            callback : updateTDSelector
        }, {
            name: 'dealer',
            optid: 'id',
            def: '请选择经销商',
            el: dealer,
            check: 'name',
            child: 'none',
	      	callback : function(name, obj, i, e) {
		          updateTDSelector(name, obj, i, e);
		          console.log(obj);
		          if (obj) {
		              $('.add>p').html(obj.address).removeClass('default');
		          } else {
		              $('.add>p').html('请先选择地区与经销商').addClass('default');
		          }
      		}
        }], {
            def: true
        });
	  $('form .select').click(function(e) {
	      var elem = $(this).prev('select');
	      if (document.createEvent) {
	          var e = document.createEvent("MouseEvents");
	          e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	          elem[0].dispatchEvent(e);
	      } else if (element.fireEvent) {
	          elem[0].fireEvent("onmousedown");
	      }
	  });
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
	pt.setStr = function(str){
    	var resultStr='';
    	if(str.slice(-1)=='省'||str.slice(-1)=='市'){
    		resultStr =str.substring(0,str.length-1);
    	}else{
    		resultStr = str;
    	}
    	return resultStr;
    }

    pt.initForm = function() {
        var btn = it.doms.btn;
        
        btn.data('enable', true);
        btn.on('click', function() {
            var originalleadid =  Date.parse(new Date())+randomWord(true,3,3); 
            it.doms.repo.hide();
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
			if(it.doms.provincename.val() === '' ||
				it.doms.cityname.val() === '' ||
				it.doms.dealerid.val() === ''){
				alert('请先选择地区与经销商');    
				return;
			}

            
            btn.data('enable', false);	      
            var obj = {
                mt: 'gsguanwang', //媒体的唯一编号【必填】
                qd: '试驾', //媒体内部的分类
                leadtype: 2, //线索类型【必填】
                brandid: 1, //DMS品牌编号
                seriesid: "dhgs", //DMS车系编号
                provincename: pt.setStr(it.doms.provincename.find("option:selected").text()), //DMS省(根据中文匹配（不带省字）)
                cityname: pt.setStr(it.doms.cityname.find("option:selected").text()), //DMS城市(根据中文匹配（不带市字）)
                dealerid: it.doms.dealerid.val(), //DMS经销商编号
                name: it.doms.username.val(), //用户姓名【必填】
                phone: it.doms.phone.val(), //用户手机/电话【必填】
                originalleadid : originalleadid
            }
            $.post('/api/test_drive/post2.php',obj,
                function(data) {

                    btn.data('enable', true);
                    if (parseInt(data.status) == 1 ) {
                        it.doms.repo.css('backgroundImage', 'url(./assets/icon-success.png)').show();
                        it.doms.repo.find('span').html('预约成功');
                        alert('恭喜您，预约成功了。');
                        _smq.push(['custom','预约试驾','预约成功',originalleadid]);
                        it.resetForm();
                    } else {
                        it.doms.repo.css('backgroundImage', 'url(./assets/icon-fail.png)').show();
                        it.doms.repo.find('span').html('预约失败,请再试一遍');
                        
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
































