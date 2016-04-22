/**
 * @authors bennyzhao (bennyzhaorice@gmail.com)
 * @date    2014-07-09 19:04:03
 * @version $Id$
 */
(function(ctx, $, undefined) {

    function SelChain(data, objs, opts) {
        this.data = data;

        // -> init()
        var it = this;
        var opts = $.extend({
            def: true
        }, opts)
        // 是否加入默认选项
        this.defOpt = opts.def;

        // province > city > dealer
        this.obj_arr = [];
        for (var i = 0, len = objs.length; i < len; i++) {
            var obj = objs[i];
            var name;
            if (obj['name']) {
                name = 'chain_' + obj['name'];
            } else {
                name = 'chain_' + i;
            }
            this[name] = obj;
            this.obj_arr[i] = name;
            this[name].callback = this[name].callback || function() {};
            if ( !! this.defOpt && obj.el.html() == '') {
                obj.el.append('<option value>' + obj.def + '</option>');
            }
        }

        $.each(objs, function(i, obj) {
            if (obj['child'] && (obj['child'] != 'none' || obj['child'] != '')) {
                it[it.obj_arr[i]].childObj = it.getObj(obj['child']);
            }
        })

        // -> initDom()
        var data = this.data,
            obj_arr = this.obj_arr,
            it = this;

        var initObj = {
            childObj: this[obj_arr[0]],
            arr: [data],
            name: 'selChainParent'
        };

        onChange(initObj, true, it);

        $.each(this.obj_arr, function(i, e) {
            var obj = it[e];
            var dom = obj.el;
            (function(o, itt) {
                dom.on('change.selchain', function() {
                    onChange.call(this, o, false, itt);
                });
            })(obj, it)
        })
    };
    var sp = SelChain.prototype;
    sp.queue = [];
    /**
     * public: getObj   获取Chain对象
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    sp.getObj = function(name) {
        return this['chain_' + name];
    }
    /**
     * public: change   改变某个Chain对象的dom的值(当根节点没有默认值时而当前chain对象是子节点则不会进行赋值)
     * @param  {String} name  [用于获得chain obj的名字,也就是开始传入的数组中对象的name]
     * @param  {String} val   [表单的值,(option的id)]
     */
    sp.change = function(name, val) {
        var it = this;
        var o = this.getObj(name);
        if ($.inArray('chain_' + name, it.obj_arr) === 0) {
            o.el.val(val);
        } else {
            this.queue.unshift({
                obj: o,
                val: val
            });
        }
        o.el.trigger('change.selchain');
    }
    /**
     * [onChange description]
     * @param  {[type]} o    [chain obj]
     * @param  {[type]} init [是否是初始化]
     * @param  {[type]} it   [selChain ]
     */
    function onChange(o, init, it) {
        var val;
        if (init) {
            val = 0;
        } else {
            if (it.queue.length > 0) {
                var q = it.queue;
                for (var j = q.length - 1; j >= 0; j--) {
                    if (q[j].obj.name == o.name) {
                        o.el.val(q[j]['val']);
                        q.splice(j, 1);
                    }
                }
            }
            val = $(this).find('option:selected').index();
            if ( !! it.defOpt) {
                val = val - 1;
            }
            if (val != -1) {
                // 选择有效选项
                o.callback(o.name_arr[val], o.arr[val], val, o);
            } else {
                // 选择了默认选项
                o.callback(o.def, null, val, o);
            }
        }

        // 子集响应
        var child = o.childObj;
        if (!child) return;
        var el = child.el;
        el.children().remove();
        if ( !! it.defOpt) {
            el.append('<option value>' + child.def + '</option>');
        }

        if (o.arr && o.arr[val]) {
            if (init) {
                child.arr = o.arr[val];
            } else {
                child.arr = o.arr[val][o.child];
            }
            child.name_arr = [];
            $.each(child.arr, function(i, v) {
                var check = $.isFunction(child['check']) ? child['check']() : child['check']
                child.name_arr[i] = v[check];
                if (child.optid) {
                    $('<option value="' + v[child['optid']] + '">' + v[check] + '</option>').appendTo(el);
                } else {
                    $('<option value="' + i + '">' + v[check] + '</option>').appendTo(el);
                }
            })
            if (child.arr.length == 1) {
                if ( !! it.defOpt) {
                    el.find('option').eq(1).prop('selected', true);
                } else {
                    el.find('option').eq(0).prop('selected', true);
                }
            }
        }
        el.trigger('change.selchain');
    }
    ctx.SelChain = SelChain;
    $.bj = $.bj || {};
    $.bj.SelChain = SelChain;

}(window, jQuery));