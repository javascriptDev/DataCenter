/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/base', function (require, exports) {
    var ControlType = {
        text: 'text',
        check: 'check'
    }

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

    var menu = '<div class="menu"><div class="menu-x">x</div>' +
        '<div class="menu-item">删除</div>' +
        '<div class="menu-item">上移</div>' +
        '<div class="menu-item">保存</div>' +
        '<div class="menu-item">下移</div>' +
        '</div>';
    Base.prototype = {
        menu: function () {

            $(menu).onclick(function () {
                alert(1);
            })

        },
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
                e.stopPropagation();
                var html = '';
                for (var i = 0, len = me.configurableProperties.length; i < len; i++) {
                    (function (index) {
                        var item = me.configurableProperties[index];
                        html += me.createElByName(item.type, item.name, item.value);
                    }(i))
                }
                container.html(html);
                var x = e.clientX, y = e.clientY;
                $('body').append(me.menu.css({'top': y, 'left': x}));
            };

            $(this.el).on('click', evt);
            $(this.appEl).on('click', evt);
        },
        createElByName: function (type, label, value) {
            var html = '<div>' + label;
            switch (type) {
                case ControlType.text:
                    html += '<input type="text" value="' + (value || '') + '">';
                    break;
                case ControlType.check:
                    html += ' true <input type="checkbox" class="t"> false<input type="checkbox" class="f">';
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