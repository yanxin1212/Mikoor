(function (window) {

    if (!window.bizmlm) {
        window.bizmlm = {};
    }
    /*
    -----语言资源-----
    */
    bizmlm.lanresource = function () {
        var obj = new bizmlm.lanresource.fn.init();
        return obj;
    };
    bizmlm.lanresource.fn = {
        /* 构造函数 */
        init: function () {
        },

        /* 获取所有语言资源 */
        getAllSysLanguages: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAllSysLanguages");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    bizmlm.lanresource.fn.init.prototype = bizmlm.lanresource.fn;
    /*-------------------------------*/

})(window);
