(function (window) {

    if (!window.othm) {
        window.othm = {};
    }
    /*
    -----货币汇率-----
    */
    othm.syscurrrate = function () {
        var obj = new othm.syscurrrate.fn.init();
        return obj;
    };
    othm.syscurrrate.fn = {
        /* 构造函数 */
        init: function () { },

        /* 设置货币汇率 */
        setSysCurrRate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SetSysCurrRate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取货币汇率 */
        readRate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadRate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有货币汇率 */
        querySysCurrRate: function (sysCurrency_Id, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysCurrRate", { SysCurrency_Id: sysCurrency_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取货币汇率 */
        querySysCurrBRate: function (sysCurrency_Id, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysCurrBRate", { SysCurrency_Id: sysCurrency_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    othm.syscurrrate.fn.init.prototype = othm.syscurrrate.fn;
    /*-------------------------------*/

})(window);
