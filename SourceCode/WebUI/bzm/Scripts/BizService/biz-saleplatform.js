(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售平台-----
    */
    sm.saleplatform = function () {
        var obj = new sm.saleplatform.fn.init();
        return obj;
    };
    sm.saleplatform.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增销售平台 */
        newSalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSalePlatform", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改销售平台 */
        modifySalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySalePlatform", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除销售平台 */
        deleteSalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSalePlatform", { SalePlatform_Id: this.SalePlatform_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取销售平台 */
        readSalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSalePlatform", { SalePlatform_Id: this.SalePlatform_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 根据权限来获取站点 */
        queryAvaiSaleSites: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAvaiSaleSites");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 根据权限来获取销售平台 */
        querySalePlatforms: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySalePlatforms");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /*  */
        publishSaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("PublishSaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.saleplatform.fn.init.prototype = sm.saleplatform.fn;
    /*-------------------------------*/

})(window);
