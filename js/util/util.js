/**
 * Created by a2014 on 14/10/21.
 */

/**
 * Created by a2014 on 14/10/21.*/
fml.define('DataCenter/js/util/util',
    function (require, exports) {
        var uuid = (function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return function () {
                return s4() + s4() + '-' + s4() + '-' + s4();// + '-' +
                //s4() + '-' + s4() + s4() + s4();
            };
        })();

        return {
            uuid: uuid
        }

    }
)
