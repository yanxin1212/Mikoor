(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----供应商-----
    */
    pom.supplier = function () {
        var obj = new pom.supplier.fn.init();
        return obj;
    };
    pom.supplier.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增供应商 */
        newSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSupplier", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改供应商 */
        modifySupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySupplier", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除供应商 */
        deleteSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSupplier", { Supplier_Id: this.Supplier_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取供应商 */
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

        /* 获取供应商 */
        querySuppliers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySuppliers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询报价供应商 */
        queryQuotedSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryQuotedSupplier", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 输出供应商 */
        exportSuppliers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSuppliers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入供应商排序 */
        importSuppSeqs: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSuppSeqs", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    pom.supplier.fn.init.prototype = pom.supplier.fn;
    /*-------------------------------*/

})(window);
