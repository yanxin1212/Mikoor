(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----采购价格-----
    */
    pom.purchaseprice = function () {
        var obj = new pom.purchaseprice.fn.init();
        return obj;
    };
    pom.purchaseprice.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增采购价格 */
        newPurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewPurchasePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改采购价格 */
        modifyPurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPurchasePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除采购价格 */
        deletePurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeletePurchasePrice", { PurchasePrice_Id: this.PurchasePrice_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取采购价格 */
        readPurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadPurchasePrice", { PurchasePrice_Id: this.PurchasePrice_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询未报价商品 */
        queryUnQuotedProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryUnQuotedProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询报价商品 */
        queryQuotedProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryQuotedProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询Sku采购价格 */
        querySkuQuotedPrices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySkuQuotedPrices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSuppQuotedPrices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSuppQuotedPrices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出采购报价 */
        exportPurchasePrices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPurchasePrices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入采购报价 */
        importPurchasePrice: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPurchasePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    pom.purchaseprice.fn.init.prototype = pom.purchaseprice.fn;
    /*-------------------------------*/

})(window);
