(function (window) {

    if (!window.cm) {
        window.cm = {};
    }
    /*
    -----客户-----
    */
    cm.customer = function () {
        var obj = new cm.customer.fn.init();
        return obj;
    };
    cm.customer.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增客户 */
        newCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCustomer", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改客户 */
        modifyCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCustomer", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除客户 */
        deleteCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteCustomer", { Customer_Id: this.Customer_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取客户 */
        readCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadCustomer", { Customer_Id: this.Customer_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取客户 */
        queryCustomers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCustomers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    cm.customer.fn.init.prototype = cm.customer.fn;
    /*-------------------------------*/

})(window);
