(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----供应商联系人-----
    */
    pom.supplierlinker = function () {
        var obj = new pom.supplierlinker.fn.init();
        return obj;
    };
    pom.supplierlinker.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增供应商联系人 */
        newSupplierLinker: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSupplierLinker", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改供应商联系人 */
        modifySupplierLinker: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySupplierLinker", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除供应商联系人 */
        deleteSupplierLinker: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSupplierLinker", { SupplierLinker_Id: this.SupplierLinker_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pom.supplierlinker.fn.init.prototype = pom.supplierlinker.fn;
    /*-------------------------------*/

})(window);
