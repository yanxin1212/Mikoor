(function (window) {

    if (!window.cm) {
        window.cm = {};
    }
    /*
    -----�ͻ�����-----
    */
    cm.customergroup = function () {
        var obj = new cm.customergroup.fn.init();
        return obj;
    };
    cm.customergroup.fn = {
        /* ���캯�� */
        init: function () {
            this.CustomerGroup_Id;
            this.Seq;
            this.CustomerGroupName;
            this.Remark;
        },

        /* �����ͻ����� */
        newCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCustomerGroup", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸Ŀͻ����� */
        modifyCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCustomerGroup", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ���ͻ����� */
        deleteCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteCustomerGroup", { CustomerGroup_Id: this.CustomerGroup_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�ͻ����� */
        readCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadCustomerGroup", { CustomerGroup_Id: this.CustomerGroup_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�ͻ����� */
        queryCustomerGroups: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCustomerGroups");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    cm.customergroup.fn.init.prototype = cm.customergroup.fn;
    /*-------------------------------*/

})(window);
