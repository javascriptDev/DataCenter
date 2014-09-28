/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/repeatLeaf', ['DataCenter/js/components/leaf'], function (require, exports) {
    var constructor = require('DataCenter/js/components/leaf');

    function RepeatLeaf() {
    }

    var proto = RepeatLeaf.prototype = Object.create(new constructor());
    proto.class += ' rleaf';
    proto.inner = '<input class="value">';
    proto.text = '可重复子节点'
    proto.appearanceCls += ' app-rLeaf';
    return RepeatLeaf;
})