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
        var me = this;
        this.configurableProperties = [];
    }

    Base.prototype = {
        init: function () {
            var html = '<div class="' + this.class + '">' + this.inner + '</div>';
            this.el = $(html)[0];
            this.addEvent();
            return this;
        },
        addEvent: function () {
            var container = $('.right');
            var me = this;
            $(this.el).on('click', function (e) {
                e.stopPropagation();
                var html = '';
                for (var i = 0, len = me.configurableProperties.length; i < len; i++) {
                    (function (index) {
                        var item = me.configurableProperties[index];
                        html += me.createElByName(item.type, item.name, item.value);
                    }(i))
                }
                container.html(html);
            })
        },
        createElByName: function (type, label, value) {
            var html = '<div>' + label;
            switch (type) {
                case ControlType.text:
                    html += '<input type="text" value="' + (value || '') + '">';
                    break;
                case ControlType.check:
                    html += ' true<input type="checkbox" class="t"> false<input type="checkbox" class="f">';
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