(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----��Ʒ-----
    */
    sm.ss_gift = function () {
        var obj = new sm.ss_gift.fn.init();
        return obj;
    };
    sm.ss_gift.fn = {
        /* ���캯�� */
        init: function () { },

        /* ������Ʒ */
        newSS_Gift: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSS_Gift", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸���Ʒ */
        modifySS_Gift: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySS_Gift", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ����Ʒ */
        deleteSS_Gift: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSS_Gift", { SS_Gift_Id: this.SS_Gift_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.ss_gift.fn.init.prototype = sm.ss_gift.fn;
    /*-------------------------------*/

})(window);
