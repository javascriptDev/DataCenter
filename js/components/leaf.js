/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/leaf',
    [
        'DataCenter/js/components/base',
        'DataCenter/js/util/ControlFactory'
    ], function (require, exports) {
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
                label: 'key',
                key: 'key'
            },
            {
                type: controlType.select,
                label: 'datatype',
                key: 'datatype',
                data: controlType
            },
            {
                type: controlType.text,
                label: 'label',
                key: 'label'
            },
            {
                type: controlType.text,
                label: 'regExp',
                key: 'regExp',
                key: 'regExp'
            }
        ]
        prop.forEach(function (item) {
            proto.configurableProperties.push(item);
        })
        return Leaf;
    })