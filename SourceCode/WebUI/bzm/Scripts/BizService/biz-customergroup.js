(function (window) {

    if (!window.cm) {
        window.cm = {};
    }
    /*
    -----客户分组-----
    */
    cm.customergroup = function () {
        var obj = new cm.customergroup.fn.init();
        return obj;
    };
    cm.customergroup.fn = {
        /* 构造函数 */
        init: function () {
            this.CustomerGroup_Id;
            this.Seq;
            this.CustomerGroupName;
            this.Remark;
        },

        /* 新增客户分组 */
        newCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCustomerGroup", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改客户分组 */
        modifyCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCustomerGroup", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除客户分组 */
        deleteCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteCustomerGroup", { CustomerGroup_Id: this.CustomerGroup_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取客户分组 */
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

        /* 获取客户分组 */
        queryCustomerGroups: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCustomerGroups");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    cm.customergroup.fn.init.prototype = cm.customergroup.fn;
    /*-------------------------------*/

})(window);
