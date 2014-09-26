/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/page/init',
    [
        'DataCenter/js/components/leaf',
        'DataCenter/js/components/node',
        'DataCenter/js/components/repeatLeaf'
    ], function (require, exports) {

        window.cache = {};
        var Leaf = require('DataCenter/js/components/leaf'),
            Node = require('DataCenter/js/components/node'),
            RepeatLeaf = require('DataCenter/js/components/repeatLeaf');

        var left = $('.left-inner'),
            right = $('.right'),
            center = $('article'),
            height = document.documentElement.clientHeight,
            leftItem = [
                {name: 'node', text: '容器'},
                {name: 'leaf', text: '数据节点'},
                {name: 'rLeaf', text: '可重复数据节点'}
            ],
            struck = {
                node: Node,
                leaf: Leaf,
                rLeaf: RepeatLeaf
            }
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
                var eo = e.originalEvent,
                    oel = eo.srcElement;

                if (oel.className !== 'content') return;

                var type = eo.dataTransfer.getData('type');
                var o = new struck[type]().init();   //Object.create(struct[type]);
                //dom 对应 object
                var index = 'a' + Object.keys(cache).length;
                o.el.setAttribute('data-id', index);
                cache[index] = o;
                oel.appendChild(o.el);
                cache[oel.parentNode.getAttribute('data-id')].childs.push(o);
            })
            center.on('dragover', function (e) {
                e.preventDefault();
            })
        }

        //初始化工作区
        function initCenter() {
            var o = new struck['node']().init(); //Object.create(struct['node']);
            var index = 'a' + Object.keys(cache).length;
            o.el.setAttribute('data-id', index);
            cache[index] = o;
            center.append(o.el);

        }

        function recursive(par, o) {
            if (par.childs && par.childs.length > 0) {
                for (var i = 0, len = par.childs.length; i < len; i++) {
                    recursive(par.childs[i]);
                }
            } else {
                console.log(par);
            }
        }

        $('.sub').click(function () {
            var items = cache['a0'];
            var o = {};
            recursive(items, o);

        });
    })