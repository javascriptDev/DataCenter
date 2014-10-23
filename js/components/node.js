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
            this.configurableProperties = [];
            this.setCfg();
        }

        var proto = Node.prototype = Object.create(new constructor());
        proto.class += ' node';
        proto.appearanceCls += ' app-node';
        proto.setCfg = function () {
            var me = this;
            var prop = [
                {
                    type: controlType.text,
                    label: '数据字段',
                    key: 'key',
                    placeHolder: '生成json key',
                    required: 1
                },
                {
                    type: controlType.text,
                    label: '字段名',
                    key: 'label',
                    placeHolder: '填数据表单label'
                },
                {
                    type: controlType.radio,
                    label: '可重复',
                    key: 'repeat'
                }
            ]
            prop.forEach(function (item) {
                me.configurableProperties.push(item);
            })
        }
        return Node;
    })
