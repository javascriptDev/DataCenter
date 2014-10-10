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

        proto.configurableProperties.push({
            type: controlType.check,
            label: 'isR',
            value: true
        });
        return Node;
    })
