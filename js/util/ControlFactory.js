/**
 * Created by a2014 on 14/10/20.
 */
fml.define('DataCenter/js/util/ControlFactory',
    function (require, exports) {


        var controlType = {
            text: 'text',
            check: 'check',
            select: 'select'
        };


        var create = function (opt/*type, label, key, value, data*/) {

            var type = opt.type || '',
                label = opt.label || '',
                key = opt.key || '',
                value = opt.value || '',
                data = opt.data || {},
                html = '<div>' + label,
                className = 'vl-' + key;

            switch (type) {
                case controlType.text:
                    html += '<input type="text" class="' + className + '" value="' + (value || '') + '" />';
                    break;
                case controlType.check:
                    html += '<div class="' + className + '"> true <input  type="checkbox" class="t"> false<input type="checkbox" class="f"></div>';
                    break;
                case controlType.select:
                    html += '<select class="' + className + '">';
                    for (var obj in data) {
                        if (data[obj] == type) {
                            html += '<option selected>' + data[obj] + '</option>';
                        } else {
                            html += '<option>' + data[obj] + '</option>';
                        }
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
        return {create: create, controlType: controlType};

    }
)