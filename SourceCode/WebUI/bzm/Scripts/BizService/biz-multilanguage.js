(function (window) {

    if (!window.bizmlm) {
        window.bizmlm = {};
    }
    /*
    -----多语言-----
    */
    bizmlm.multilanguage = function () {
        var obj = new bizmlm.multilanguage.fn.init();
        return obj;
    };
    bizmlm.multilanguage.fn = {
        /* 构造函数 */
        init: function () {
        },

        /* 获取多语言分析数据 */
        getLanResStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetLanResStat");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出多语言资源 */
        exportResourceByLRCode: function (tableName, lrCodes, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportResourceByLRCode", { TableName: tableName, LRCodes: lrCodes });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入多语言资源 */
        importLanResource: function (tableName, fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportLanResource", { TableName: tableName });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    bizmlm.multilanguage.fn.init.prototype = bizmlm.multilanguage.fn;
    /*-------------------------------*/

})(window);
