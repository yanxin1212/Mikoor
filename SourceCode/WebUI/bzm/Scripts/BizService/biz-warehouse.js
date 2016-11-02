(function (window) {

    if (!window.whm) {
        window.whm = {};
    }
    /*
    -----仓库-----
    */
    whm.warehouse = function () {
        var obj = new whm.warehouse.fn.init();
        return obj;
    };
    whm.warehouse.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增仓库 */
        newWarehouse: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewWarehouse", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改仓库 */
        modifyWarehouse: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyWarehouse", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改仓库排序 */
        modifyWarehouseSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyWarehouseSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除仓库 */
        deleteWarehouse: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteWarehouse", { Warehouse_Id: this.Warehouse_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 获取所有仓库 */
        getAllWarehouses: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllWarehouse");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    whm.warehouse.fn.init.prototype = whm.warehouse.fn;
    /*-------------------------------*/

})(window);
