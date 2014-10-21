/**
 * Created by a2014 on 14/10/21.
 */
/**
 * Created by a2014 on 14/10/21.
 */
/**
 * Created by a2014 on 14/10/20.
 */
fml.define('DataCenter/js/util/cache',
    function (require, exports) {
        var cache = {},
            help = {
                query: function (id) {
                    for (var i in cache) {
                        if (cache[i].id == id) {
                            return cache[i];
                        }
                    }
                },
                del: function (id, cb) {
                    $.each(cache, function (key, value) {
                        (value.id == id) && (delete cache[key]);
                        cb && cb();
                        return;
                    });
                },
                modify: function (id, opt) {
                }
            }

        return {
            cache: cache,
            help: help
        }

    }
)