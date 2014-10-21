/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/page/init',
    [
        'DataCenter/js/util/componentFactory',
        'DataCenter/js/lib/ps'
    ], function (require, exports) {
        cache = {},
            help = {
                query: function (id) {
                    for (var i in cache) {
                        if (cache[i].id == id) {
                            return cache[i];
                        }
                    }
                },
                del: function (id, cb) {
                    $.each(cache, function (key, value) {
                        (value.id == id) && (delete cache[key]);
                        cb && cb();
                        return;
                    });
                },
                modify: function (id, opt) {
                }
            },
            factory = require('DataCenter/js/util/componentFactory'),
            EventEmitter = require('DataCenter/js/lib/ps'),
            uuid = (function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return function () {
                    return s4() + s4() + '-' + s4() + '-' + s4();// + '-' +
                    //s4() + '-' + s4() + s4() + s4();
                };
            })();

        var left = $('.left-inner'),
            right = $('.right'),
            center = $('article'),
            height = document.documentElement.clientHeight,
        // 节点类型枚举
            leftItem = [
                {name: 'node', text: '容器'},
                {name: 'leaf', text: '数据节点'},
                {name: 'rLeaf', text: '可重复数据节点'}
            ];

        initPubSub();
        initLayout();
        initLeft(leftItem);
        initDrag();
        initCenter();

        //初始化界面布局
        function initLayout() {
            left.height(height);
            right.height(height);
            center.height(height);
        }

        //初始化左边框
        function initLeft(item) {
            var html = '';
            item.forEach(function (node) {
                html += '<div draggable=true class="' + node.name + '">' + node.text + '</div>'
            })
            left.append(html);
        }

        //初始化拖拽事件
        function initDrag() {
            left.delegate('div', 'dragstart', function (e) {
                var type = this.className;
                e.originalEvent.dataTransfer.setData('type', type);
            })

            center.on('drop', function (e) {
                EventEmitter.pub('add', center, e);

            })
            center.on('dragover', function (e) {
                e.preventDefault();
            })
        }

        //初始化工作区
        function initCenter() {
            var o = factory.create('node'); //Object.create(struct['node']);
            var index = 'a' + Object.keys(cache).length;
            o.el.setAttribute('data-id', index);
            o.id = uuid();
            cache[index] = o;
            o.el.id = o.id;
            o.type = 'node';
            center.append(o.el);
            o.menu.click(function (e) {
//                console.log(o.menu.target)
                    var tar = e.originalEvent.srcElement,
                        cls = tar.className,
                        id = o.menu.target.id;

                    switch (cls.split(' ')[1]) {
                        case 'i-mup':
                            ;
                            break;
                        case 'i-mdown':
                            ;
                            break;
                        case 'i-save':
                            var to = help.query(id);
                            var label = $('.vl-label').val(),
                                type = $('.vl-datatype option:selected').text(),
                                key = $('.vl-key').val(),
                                regExp = $('.vl-regExp').val(),
                                isRepeat = $('.vl-repeat input:checked').attr('class') == 't' ? true : false;
                            to.data = {
                                key: key,
                                label: label,
                                type: type,
                                regExp: regExp,
                                isRepeat: isRepeat
                            }
                            $('.menu').hide();
                            $(to.appEl).addClass('ok');
                            $(to.el).addClass('ok');

                            break;
                        case 'i-del':
                            var to = help.query(id);
                            to.el.parentNode.removeChild(to.el);
                            to.appEl.parentNode.removeChild(to.appEl);
                            help.del(id, function () {
                                $('.menu').hide();
                            });
                            break;
                        case 'i-close':
                            $('.menu').hide();
                            break;
                        default :

                            break;
                    }
                }
            )
        }

        //递归 child
        function recursive(par, o) {
            par.data.ctype = par.type;
            if (par.childs && par.childs.length > 0) {
                var container = [];
                if (isArray(o)) {
                    o.push({
                        data: par.data,
                        items: container
                    })
                } else {
                    o.data = par.data;
                    o.items = container;
                }
                //复制控件类型到数据表述对象，便于生成表单判断节点类型

                for (var i = 0, len = par.childs.length; i < len; i++) {
                    recursive(par.childs[i], container);
                }
            } else {
                o.push(par.data);
            }
        }

        $('.sub').click(function () {
            var items = cache['a0'];
            var o = {};
            recursive(items, o);
            console.log(o);
            localStorage.setItem('a', JSON.stringify(o));
        });

        $('.fill').click(function () {
            var data = localStorage.getItem('a');
            parseData(JSON.parse(data));
        })

        function isArray(a) {
            return a && Object.prototype.toString.call(a) == '[object Array]';
        }

        //解析模板
        function parseData(data) {
            document.body.innerHTML = '';
            var div = document.createElement('div');
            parseRecursive(data, div);
            document.body.innerHTML = div.outerHTML;
        }

        //根据模板生成表单
        function parseRecursive(data, domContainer) {
            if (data.data) {//有子集
                var el = factory.create(data.data.ctype, data, data).el;
                domContainer.appendChild(el);
                for (var i = 0; i < data.items.length; i++) {
                    parseRecursive(data.items[i], el);
                }
            } else {
                domContainer.appendChild(factory.create(data.ctype, data).el);
            }
        }

        function initPubSub() {
            EventEmitter.sub('add', function (e) {
                var eo = e.originalEvent,
                    oel = eo.srcElement;
                if (oel.className !== 'content') return;
                var type = eo.dataTransfer.getData('type');
                //创建组件
                var o = factory.create(type);   //Object.create(struct[type]);
                //dom 对应 object
                var index = 'a' + Object.keys(cache).length;
                var targetEl = o.appEl;

                //如果是node就渲染el
                (type == 'node') && (targetEl = o.el);
                targetEl.setAttribute('data-id', index);
                o.id = uuid();
                targetEl.id = o.id;
                cache[index] = o;
                o.type = type;
                oel.appendChild(targetEl);
                cache[oel.parentNode.getAttribute('data-id')].childs.push(o);
            });
        }
    })
