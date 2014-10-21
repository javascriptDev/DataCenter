/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/leaf',
    [
        'DataCenter/js/components/base',
        'DataCenter/js/util/ControlFactory'
    ]
    , function (require, exports) {
        var Base = require('DataCenter/js/components/base'),
            constructor = Base.ct,
            factory = require('DataCenter/js/util/ControlFactory'),
            controlType = factory.controlType;

        function Leaf(opt) {
            this.opt = opt || {};
            this.text = this.opt.label || '不可重复子节点';
            this.inner = factory.create(this.opt);
        }

        var proto = Leaf.prototype = Object.create(new constructor());
        proto.class += ' leaf';
        proto.appearanceCls += ' app-leaf';

        var prop = [
            {
                type: controlType.text,
                label: '数据字段',
                key: 'key',
                placeHolder: '生成json key',
                required: 1
            },
            {
                type: controlType.select,
                label: '数据类型',
                key: 'datatype',
                data: controlType
            },
            {
                type: controlType.text,
                label: '字段名',
                key: 'label',
                placeHolder: '填数据表单label',
                required: 1

            },
            {
                type: controlType.text,
                label: '正则验证',
                key: 'regExp',
                placeHolder: '正则表达式'
            }
        ]
        prop.forEach(function (item) {
            proto.configurableProperties.push(item);
        })
        return Leaf;
    })