(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----站点-----
    */
    sm.salesite = function () {
        var obj = new sm.salesite.fn.init();
        return obj;
    };
    sm.salesite.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增站点 */
        newSaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改站点 */
        modifySaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除站点 */
        deleteSaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSaleSite", { SalePlatform_Id: this.SalePlatform_Id, SaleSite_Id: this.SaleSite_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /*  */
        compareGlobalAreas: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CompareGlobalAreas", { SalePlatform_Id: this.SalePlatform_Id, SaleSite_Id: this.SaleSite_Id, GlobalArea_Ids: this.GlobalArea_Ids });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.salesite.fn.init.prototype = sm.salesite.fn;
    /*-------------------------------*/

})(window);
