/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/base'
    , [
        'DataCenter/js/lib/ps',
        'DataCenter/js/util/ControlFactory'
    ]
    , function (require, exports) {

        var EventEmitter = require('DataCenter/js/lib/ps'),
            factory = require('DataCenter/js/util/ControlFactory'),
            ControlType = factory.controlType;

        function inherit(subclass, superclass) {
            var F = function () {
                },
                subclassProto = subclass.prototype,
                superclassProto = superclass.prototype;

            F.prototype = superclassProto;
            subclass.prototype = new F();
            subclass.prototype.constructor = subclass;
            subclass.superclass = superclassProto;

            if (superclassProto.constructor === Object.constructor) {
                superclassProto.constructor = superclass;
            }
            var subProtoMethod = Object.keys(subclassProto);

            jex.each(subProtoMethod, function (item) {
                if (subclassProto.hasOwnProperty(item)) {
                    if (jex.isFunction(subclassProto[item])) {
                        subclass.prototype[item] = subclassProto[item];
                    }
                }
            });
            return subclass;
        }

        function Base() {
            this.class = 'c';
            this.inner = '';
            this.appearanceCls = 'app-c'

            this.configurableProperties = [];
        }

        var menu = '<div class="menu"><div class="menu-x i-close">x</div>' +
            '<div class="menu-item i-del">删除</div>' +
            '<div class="menu-item i-mup">上移</div>' +
            '<div class="menu-item i-save">保存</div>' +
            '<div class="menu-item i-mdown">下移</div>' +
            '</div>';

        Base.prototype = {
            menu: $(menu),
            init: function () {
                var html = '<div class="' + (this.class || '') + ' ' + (this.appearanceCls || '') + '"></div>';
                this.appEl = $(html).text((this.text || ''))[0];
                this.el = $(html).append(this.inner)[0];

                this.addEvent();
                this.initalized = true;
                return this;
            },
            addEvent: function () {
                var container = $('.right');
                var me = this;
                var evt = function (e) {
                    e && e.stopPropagation();
                    var html = '';

                    for (var i = 0, len = me.configurableProperties.length; i < len; i++) {
                        (function (index) {
                            var item = me.configurableProperties[index];
                            var value = '';
                            //初始化
                            me.data && (value = me.data[item.key]);
                            !item.value && (item.value = value);

                            if (item.type == ControlType.select && me.data) { //被赋值的组件 才有data属性。
                                item.select = me.data.type;
                            }
                            html += factory.create(item);
                        }(i))
                    }
                    container.html(html);
                    var x = e.clientX, y = e.clientY;
                    $('body').append(me.menu.css({'top': y, 'left': x}));
                    me.menu.show();
                    $('.selected').removeClass('selected');
                    $(this).addClass('selected');
                    me.menu.target = this;
                };

                $(this.el).on('click', evt);
                $(this.appEl).on('click', evt);
            }

        }
        return  { ct: Base, type: ControlType};
    })