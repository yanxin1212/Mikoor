(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----��Ӧ��-----
    */
    pom.supplier = function () {
        var obj = new pom.supplier.fn.init();
        return obj;
    };
    pom.supplier.fn = {
        /* ���캯�� */
        init: function () { },

        /* ������Ӧ�� */
        newSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSupplier", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸Ĺ�Ӧ�� */
        modifySupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySupplier", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ����Ӧ�� */
        deleteSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSupplier", { Supplier_Id: this.Supplier_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��Ӧ�� */
        readSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSupplier", { Supplier_Id: this.Supplier_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��Ӧ�� */
        querySuppliers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySuppliers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ���۹�Ӧ�� */
        queryQuotedSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryQuotedSupplier", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �����Ӧ�� */
        exportSuppliers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSuppliers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ���빩Ӧ������ */
        importSuppSeqs: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSuppSeqs", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    pom.supplier.fn.init.prototype = pom.supplier.fn;
    /*-------------------------------*/

})(window);
