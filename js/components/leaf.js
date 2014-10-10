/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/leaf',
    [
        'DataCenter/js/components/base',
        'DataCenter/js/config/controlType'
    ], function (require, exports) {
        var Base = require('DataCenter/js/components/base'),
            constructor = Base.ct,
            controlType = require('DataCenter/js/config/controlType');

        function Leaf() {
        }
        var proto = Leaf.prototype = Object.create(new constructor());
        proto.class += ' leaf';
        proto.appearanceCls += ' app-leaf';
        proto.inner = '<input class="value">';
        proto.text = '不可重复子节点';

        var prop = [
            {
                type: controlType.text,
                name: 'key',
                key: 'key'
            },
            {
                type: controlType.select,
                name: 'dataType',
                key: 'dataType',
                data: controlType
            },
            {
                type: controlType.text,
                name: 'label',
                key: 'label'
            },
            {
                type: controlType.text,
                name: 'regExp',
                key: 'reg'
            }
        ]
        prop.forEach(function (item) {
            proto.configurableProperties.push(item);
        })
        return Leaf;
    })