(function (window) {

    if (!window.whm) {
        window.whm = {};
    }
    /*
    -----������¼-----
    */
    whm.inoutstock = function () {
        var obj = new whm.inoutstock.fn.init();
        return obj;
    };
    whm.inoutstock.fn = {
        /* ���캯�� */
        init: function () { },

        /* ���������¼ */
        handlerInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlerInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ��������¼ */
        deleteInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ������¼ */
        readInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadInOutStock", { InOutStock_Id: this.InOutStock_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ������¼ */
        queryInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ����������¼ */
        exportInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    whm.inoutstock.fn.init.prototype = whm.inoutstock.fn;
    /*-------------------------------*/

})(window);
