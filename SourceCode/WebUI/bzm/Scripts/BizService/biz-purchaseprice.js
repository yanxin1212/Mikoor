(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----�ɹ��۸�-----
    */
    pom.purchaseprice = function () {
        var obj = new pom.purchaseprice.fn.init();
        return obj;
    };
    pom.purchaseprice.fn = {
        /* ���캯�� */
        init: function () { },

        /* �����ɹ��۸� */
        newPurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewPurchasePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸Ĳɹ��۸� */
        modifyPurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPurchasePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ���ɹ��۸� */
        deletePurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeletePurchasePrice", { PurchasePrice_Id: this.PurchasePrice_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�ɹ��۸� */
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

        /* ��ѯδ������Ʒ */
        queryUnQuotedProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryUnQuotedProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ������Ʒ */
        queryQuotedProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryQuotedProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯSku�ɹ��۸� */
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

        /* �����ɹ����� */
        exportPurchasePrices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPurchasePrices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ����ɹ����� */
        importPurchasePrice: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPurchasePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    pom.purchaseprice.fn.init.prototype = pom.purchaseprice.fn;
    /*-------------------------------*/

})(window);
