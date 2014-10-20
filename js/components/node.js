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

        function Node(opt) {
            this.childs = [];
            this.opt = opt || {};
            this.inner = '<div class="title">' + (this.opt.label || "目录节点") + '</div><div class="content"></div>';
        }

        var proto = Node.prototype = Object.create(new constructor());
        proto.class += ' node';
        proto.appearanceCls += ' app-node';
        proto.isR = true;


        var prop = [
            {
                type: controlType.text,
                label: 'key',
                key: 'key'
            },
            {
                type: controlType.text,
                label: 'label',
                key: 'label'
            }
        ]
        prop.forEach(function (item) {
            proto.configurableProperties.push(item);
        })


        return Node;
    })
