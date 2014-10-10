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
//            this.data = {
//                key: '',
//                type: '',
//                label: '',
//                regExp: ''
//            }

        }

        var proto = Leaf.prototype = Object.create(new constructor());
        proto.class += ' leaf';
        proto.appearanceCls += ' app-leaf';
        proto.inner = '<input class="value">';
        proto.text = '不可重复子节点';


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