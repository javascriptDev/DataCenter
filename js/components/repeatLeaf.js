/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/repeatLeaf',
    [
        'DataCenter/js/components/leaf',
        'DataCenter/js/util/ControlFactory'

    ],
    function (require, exports) {
        var constructor = require('DataCenter/js/components/leaf'),
            factory = require('DataCenter/js/util/ControlFactory');

        function RepeatLeaf(opt) {
            this.opt = opt || {};
            this.text = this.opt.label || '可重复子节点';
            this.inner = '<div class="repeat-c">' + factory.create(this.opt) + '<i>+</i></div>';

        }

        var proto = RepeatLeaf.prototype = Object.create(new constructor());
        proto.class += ' rleaf';

        proto.appearanceCls += ' app-rLeaf';
        return RepeatLeaf;
    })