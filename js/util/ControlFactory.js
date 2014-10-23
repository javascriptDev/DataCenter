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
                label = opt.label || opt.key || '',
                key = opt.key || '',
                value = opt.value || '',
                data = opt.data || {},
                ph = opt.placeHolder || '',
                checked = opt.checked || '',
                selected = opt.select || '',
                className = 'vl-' + key,
                isRequired = '',
                required = opt.required || false;
            required && (isRequired = 'required=required');
            var html = '<div class="input-group" ' + isRequired + '><label class="input-group-addon">' + label + '</label>';

            switch (type) {
                case controlType.text:
                    var h = '<input type="text" data-role="' + key + '" class="form-control ' + className + '" value="' + (value || '') + '" placeholder="' + ph + '">';
                    html += h;
                    break;
                case controlType.radio:
                    html += '<div class="' + className + '"> ';
                    if (checked) {
                        html += '<div>是 <input name="check" checked  type="radio" class="t"></div><div>否<input name="check" type="radio" class="f"></div>';
                    } else {
                        html += '<div>是 <input name="check"  type="radio" class="t"></div><div>否<input checked name="check" type="radio" class="f"></div>';
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