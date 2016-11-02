(function (window) {

    if (!window.spm) {
        window.spm = {};
    }
    /*
    -----系统关键参数-----
    */
    spm.syskeyparam = function () {
        var obj = new spm.syskeyparam.fn.init();
        return obj;
    };
    spm.syskeyparam.fn = {
        /* 构造函数 */
        init: function () { },

        /* 修改系统关键参数 */
        modifySysKeyParam: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySysKeyParam", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取系统关键参数 */
        readSysKeyParam: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSysKeyParam");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取重量单位 */
        getWeightUnits: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWeightUnits");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 获取重量比例 */
        getWeightRate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWeightRate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /*  */
        getAllPrintTemplate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAllPrintTemplate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        authoriseSMT: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AuthoriseSMT", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    spm.syskeyparam.fn.init.prototype = spm.syskeyparam.fn;
    /*-------------------------------*/

})(window);
