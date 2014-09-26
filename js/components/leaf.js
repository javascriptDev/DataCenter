/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/leaf',
    [
        'DataCenter/js/components/base'
    ], function (require, exports) {
        var Base = require('DataCenter/js/components/base'),
            constructor = Base.ct,
            controlType = Base.type;


        function Leaf() {

        }

        var proto = Leaf.prototype = Object.create(new constructor());
        proto.class += ' leaf';
        proto.inner = '<input class="value">';

        var prop = [
            {
                type: controlType.text,
                name: 'key值',
                key: 'key'
            },
            {
                type: controlType.text,
                name: '字段',
                key: 'field'
            },
            {
                type: controlType.text,
                name: '正则',
                key: 'reg'
            }
        ]

        prop.forEach(function (item) {
            proto.configurableProperties.push(item);
        })

        return Leaf;
    })