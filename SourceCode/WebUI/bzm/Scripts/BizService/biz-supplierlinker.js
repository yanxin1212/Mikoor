(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----��Ӧ����ϵ��-----
    */
    pom.supplierlinker = function () {
        var obj = new pom.supplierlinker.fn.init();
        return obj;
    };
    pom.supplierlinker.fn = {
        /* ���캯�� */
        init: function () { },

        /* ������Ӧ����ϵ�� */
        newSupplierLinker: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSupplierLinker", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸Ĺ�Ӧ����ϵ�� */
        modifySupplierLinker: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySupplierLinker", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ����Ӧ����ϵ�� */
        deleteSupplierLinker: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSupplierLinker", { SupplierLinker_Id: this.SupplierLinker_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pom.supplierlinker.fn.init.prototype = pom.supplierlinker.fn;
    /*-------------------------------*/

})(window);
