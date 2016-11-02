(function (window) {

    if (!window.othm) {
        window.othm = {};
    }
    /*
    -----���һ���-----
    */
    othm.syscurrrate = function () {
        var obj = new othm.syscurrrate.fn.init();
        return obj;
    };
    othm.syscurrrate.fn = {
        /* ���캯�� */
        init: function () { },

        /* ���û��һ��� */
        setSysCurrRate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SetSysCurrRate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���һ��� */
        readRate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadRate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���л��һ��� */
        querySysCurrRate: function (sysCurrency_Id, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysCurrRate", { SysCurrency_Id: sysCurrency_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���һ��� */
        querySysCurrBRate: function (sysCurrency_Id, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysCurrBRate", { SysCurrency_Id: sysCurrency_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    othm.syscurrrate.fn.init.prototype = othm.syscurrrate.fn;
    /*-------------------------------*/

})(window);
