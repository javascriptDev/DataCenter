/**
 * Created by a2014 on 14/10/21.
 */
/**
 * Created by a2014 on 14/10/20.
 */
fml.define('DataCenter/js/util/componentFactory',
    [
        'DataCenter/js/components/leaf',
        'DataCenter/js/components/node',
        'DataCenter/js/components/repeatLeaf',
    ],
    function (require, exports) {


        var Leaf = require('DataCenter/js/components/leaf'),
            Node = require('DataCenter/js/components/node'),
            RepeatLeaf = require('DataCenter/js/components/repeatLeaf'),

        //节点构造函数
            struck = {
                node: Node,
                leaf: Leaf,
                rLeaf: RepeatLeaf
            },
            componentList = [
                {
                    name: 'node',
                    text: '容器'
                },
                {
                    name: 'leaf',
                    text: '不可重复节点'
                },
                {
                    name: 'rLeaf',
                    text: '可重复节点'
                }
            ]

        var create = function (type, cfg) {
            return new struck[type](cfg).init()
        }
        return {create: create, cl: componentList};

    }
)