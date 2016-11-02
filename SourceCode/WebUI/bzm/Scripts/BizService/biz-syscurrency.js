(function (window) {

    if (!window.othm) {
        window.othm = {};
    }
    /*
    -----货币-----
    */
    othm.syscurrency = function () {
        var obj = new othm.syscurrency.fn.init();
        return obj;
    };
    othm.syscurrency.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增货币 */
        newSysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSysCurrency", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改货币 */
        modifySysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySysCurrency", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除货币 */
        deleteSysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSysCurrency", { SysCurrency_Id: this.SysCurrency_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取货币 */
        readSysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSysCurrency", { SysCurrency_Id: this.SysCurrency_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有货币 */
        getAllSysCurrencys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSysCurrency");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    othm.syscurrency.fn.init.prototype = othm.syscurrency.fn;
    /*-------------------------------*/

})(window);
