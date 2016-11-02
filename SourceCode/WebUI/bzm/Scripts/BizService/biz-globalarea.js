(function (window) {

    if (!window.othm) {
        window.othm = {};
    }
    /*
    -----区域-----
    */
    othm.globalarea = function () {
        var obj = new othm.globalarea.fn.init();
        return obj;
    };
    othm.globalarea.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增区域 */
        newGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewGlobalArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改区域 */
        modifyGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyGlobalArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除区域 */
        deleteGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteGlobalArea", { GlobalArea_Id: this.GlobalArea_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取区域 */
        readGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadGlobalArea", { GlobalArea_Id: this.GlobalArea_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有区域 */
        getAllGlobalAreas: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllGlobalArea");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 获取国家和内部区域 */
        queryCountryAndInnerRegion: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCountryAndInnerRegion");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 获取所有国家 */
        queryCountries: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCountries");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 获取所有片区 */
        queryRegions: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryRegions");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 获取片区和国家 */
        queryRegionAndCountries: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryRegionAndCountries");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 查询国家下的区域 */
        queryGlobalAreaByCountries: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryGlobalAreaByCountries", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 查询销售区域下的区域 */
        queryGlobalAreaBySaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryGlobalAreaBySaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    othm.globalarea.fn.init.prototype = othm.globalarea.fn;
    /*-------------------------------*/

})(window);
