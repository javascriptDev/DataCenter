/**
 * Created by a2014 on 14-9-28.
 */
fml.define('DataCenter/js/lib/ps', function (require, exports) {
    var events = {};
    var EventEmitter = {
        pub: function (name,scope, param) {
            if (!events.hasOwnProperty(name))return;
            events[name].forEach(function (fun) {
                fun.call(scope, param);
            })
        },
        sub: function (name, fn) {
            if (events.hasOwnProperty(name)) {
                events[name].push(fn);
            } else {
                events[name] = [];
                events[name].push(fn);
            }
        },
        unSub: function () {

        }
    }


    return {
        pub: EventEmitter.pub,
        sub: EventEmitter.sub,
        unSub: EventEmitter.unSub
    };

})