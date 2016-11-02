(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----网站商品导航-----
    */
    sm.salepdcnavigation = function () {
        var obj = new sm.salepdcnavigation.fn.init();
        return obj;
    };
    sm.salepdcnavigation.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增网站商品导航 */
        newSalePdcNavigation: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSalePdcNavigation", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改网站商品导航 */
        modifySalePdcNavigation: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySalePdcNavigation", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改修改网站商品导航的序号 */
        modifyPdcNavSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcNavSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除网站商品导航 */
        deleteSalePdcNavigation: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSalePdcNavigation", { ProdCategory_Id: this.ProdCategory_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 获取网站商品导航 */
        querySalePdcNav: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySalePdcNav", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    sm.salepdcnavigation.fn.init.prototype = sm.salepdcnavigation.fn;
    /*-------------------------------*/

})(window);
