(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    ----------
    */
    pom.purchaseproduct = function () {
        var obj = new pom.purchaseproduct.fn.init();
        return obj;
    };
    pom.purchaseproduct.fn = {
        /* ¹¹Ôìº¯Êý */
        init: function () { },

        /*  */
        handlePurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlePurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importPurchaseProduct: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        generatePurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GeneratePurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* */
        readPurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadPurchaseProduct", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryPurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryPurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSuppPurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSuppPurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pom.purchaseproduct.fn.init.prototype = pom.purchaseproduct.fn;
    /*-------------------------------*/

})(window);