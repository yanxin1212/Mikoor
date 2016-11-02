(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----配送服务-----
    */
    sm.expressservice = function () {
        var obj = new sm.expressservice.fn.init();
        return obj;
    };
    sm.expressservice.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增配送服务 */
        newExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改配送服务 */
        modifyExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除配送服务 */
        deleteExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteExpressService", { ExpressService_Id: this.ExpressService_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取配送服务 */
        readExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadExpressService", { ExpressService_Id: this.ExpressService_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询配送服务 */
        queryExpressServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询配送服务 */
        queryAreaExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAreaExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询区域中的服务数量 */
        queryExpServiceCountByArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpServiceCountByArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            //读取缓存
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 导出配送服务成本 */
        exportAnalyFixExpress: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAnalyFixExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出配送服务 */
        exportAnalyExpress: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAnalyExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取配送服务的测算运费 */
        getCalFixExpress: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetCalFixExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出配送服务 */
        exportExpServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入配送服务 */
        importExpServices: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 获取配送服务价格 */
        getExpServicePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetExpServicePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.expressservice.fn.init.prototype = sm.expressservice.fn;
    /*-------------------------------*/

})(window);
