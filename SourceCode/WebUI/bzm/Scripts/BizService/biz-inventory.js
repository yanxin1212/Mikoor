(function (window) {

    if (!window.whm) {
        window.whm = {};
    }
    /*
    -----商品库存-----
    */
    whm.inventory = function () {
        var obj = new whm.inventory.fn.init();
        return obj;
    };
    whm.inventory.fn = {
        /* 构造函数 */
        init: function () { },

        /* 获取商品库存 */
        queryProdInventory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProdInventory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品库存 */
        queryInventory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryInventory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出商品库存 */
        exportInventory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportInventory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入 */
        importInitInventory: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportInitInventory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        queryInventoryMoneyStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryInventoryMoneyStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportInventoryMoneyStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportInventoryMoneyStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    whm.inventory.fn.init.prototype = whm.inventory.fn;
    /*-------------------------------*/

})(window);
