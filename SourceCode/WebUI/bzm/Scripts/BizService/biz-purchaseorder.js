(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----�ɹ�����-----
    */
    pom.purchaseorder = function () {
        var obj = new pom.purchaseorder.fn.init();
        return obj;
    };
    pom.purchaseorder.fn = {
        /* ���캯�� */
        init: function () { },

        /* �����ɹ����� */
        newPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewPurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸Ĳɹ����� */
        modifyPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        submitPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SubmitPurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ���ɹ����� */
        deletePurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeletePurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        closePurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ClosePurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�ɹ����� */
        readPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadPurchaseOrder", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�ɹ����� */
        simpleReadPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SimpleReadPurchaseOrder", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryPurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getPOStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetPOStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getProductsByPOForRev: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetProductsByPOForRev", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPurchaseOrderForHD: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPurchaseOrderForHD", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importPurchaseOrderForHD: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPurchaseOrderForHD", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        exportPOProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPOProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPOProdList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPOProdList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPOUnRevProdList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPOUnRevProdList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportUnRevProdList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportUnRevProdList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pom.purchaseorder.fn.init.prototype = pom.purchaseorder.fn;
    /*-------------------------------*/

})(window);