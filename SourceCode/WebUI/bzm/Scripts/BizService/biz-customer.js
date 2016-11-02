(function (window) {

    if (!window.cm) {
        window.cm = {};
    }
    /*
    -----�ͻ�-----
    */
    cm.customer = function () {
        var obj = new cm.customer.fn.init();
        return obj;
    };
    cm.customer.fn = {
        /* ���캯�� */
        init: function () { },

        /* �����ͻ� */
        newCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCustomer", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸Ŀͻ� */
        modifyCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCustomer", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ���ͻ� */
        deleteCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteCustomer", { Customer_Id: this.Customer_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�ͻ� */
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

        /* ��ȡ�ͻ� */
        queryCustomers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCustomers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    cm.customer.fn.init.prototype = cm.customer.fn;
    /*-------------------------------*/

})(window);
