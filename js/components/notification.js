/**
 * Created by a2014 on 14/10/21.
 */
/**
 * Created by a2014 on 14-9-26.
 */
fml.define('DataCenter/js/components/notification',
    [

    ],
    function (require, exports) {
        function Notification(opt) {
            this.content = opt && opt.content || '';
            this.init();
        }

        Notification.prototype = {
            init: function () {
                this.el = $('<div class="notification">' + this.content + '</div>')
                    .css({position: 'absolute', top: '100px', right: '-100px', transition: '.5s right', background: '#428bca', color: 'white', height: '30px', lineHeight: '30px', padding: '10px 30px'});
                $('body').append(this.el);
            },
            show: function (text) {
                text && this.el.text(text);
                this.el.css('right', '0px');
                var me = this;
                setTimeout(function () {
                    me.hide()
                }, 2000)
            },
            hide: function () {
                this.el.css('right', '-160px');
            }
        };

        return Notification;
    })