/**
 * Created by a2014 on 14/10/20.
 */
fml.define('DataCenter/js/util/ControlFactory',
    function (require, exports) {


        var controlType = {
            text: 'text',
            radio: 'radio',
            select: 'select'
        };


        var create = function (opt/*type, label, key, value, data*/) {
            if (!opt)return '';

            var type = opt.type || '',
                label = opt.label || '',
                key = opt.key || '',
                value = opt.value || '',
                data = opt.data || {},
                html = '<div>' + label,
                checked = opt.checked || '',
                selected = opt.select || '',
                className = 'vl-' + key;

            switch (type) {
                case controlType.text:
                    html += '<input type="text" class="' + className + '" value="' + (value || '') + '" />';
                    break;
                case controlType.radio:
                    html += '<div class="' + className + '"> ';
                    if (checked) {
                        html += 'true <input name="check" checked  type="radio" class="t">false<input name="check" type="radio" class="f">';
                    } else {
                        html += 'true <input name="check"  type="radio" class="t">false<input checked name="check" type="radio" class="f">';
                    }
                    html += '</div>';
                    break;
                case controlType.select:
                    html += '<select class="' + className + '">';
                    for (var obj in data) {
                        if (data[obj] == selected) {
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