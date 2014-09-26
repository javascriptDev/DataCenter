/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/repeatLeaf', ['DataCenter/js/components/base'], function (require, exports) {

    var Base = require('DataCenter/js/components/base'),
        constructor = Base.ct;

    function RepeatLeaf() {
    }

    var proto = RepeatLeaf.prototype = Object.create(new constructor());
    proto.class += ' rleaf';
    proto.inner = '<input class="value">';

    return RepeatLeaf;
})