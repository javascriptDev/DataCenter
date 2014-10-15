/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/node',
    [
        'DataCenter/js/components/base'
    ], function (require, exports) {
        var Base = require('DataCenter/js/components/base'),
            constructor = Base.ct,
            controlType = Base.type;

        function Node() {
            this.childs = [];
        }

        var proto = Node.prototype = Object.create(new constructor());
        proto.class += ' node';
        proto.appearanceCls += ' app-node';
        proto.inner = '<div class="title">目录节点</div><div class="content"></div>';
        proto.isR = true;


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


        return Node;
    })
