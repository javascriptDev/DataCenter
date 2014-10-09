/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/base', ['DataCenter/js/lib/ps', 'DataCenter/js/config/controlType'], function (require, exports) {

    var EventEmitter = require('DataCenter/js/lib/ps');
    var ControlType = require('DataCenter/js/config/controlType');

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

        var me = this;
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
            var html = '<div class="' + (this.class || '') + ' ' + (this.appearanceCls || '') + '">' + (this.text || '') + '</div>';
            this.appEl = $(html)[0];
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
                        html += me.createElByName(item.type, item.name, item.value, item.data);
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
        },
        createElByName: function (type, label, value, data) {
            var html = '<div>' + label;
            switch (type) {
                case ControlType.text:
                    html += '<input type="text" value="' + (value || '') + '">';
                    break;
                case ControlType.check:
                    html += ' true <input type="checkbox" class="t"> false<input type="checkbox" class="f">';
                    break;
                case ControlType.select:
                    html += '<select>';
                    for (var obj in data) {
                        html += '<option>' + data[obj] + '</option>';
                    }
                    html += '</select>';
                    break;
                default :
                    return '';
                    break;
            }
            html += '</div>';
            return html;
        }
    }
    return  { ct: Base, type: ControlType};
})