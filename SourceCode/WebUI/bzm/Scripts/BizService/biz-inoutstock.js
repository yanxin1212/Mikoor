(function (window) {

    if (!window.whm) {
        window.whm = {};
    }
    /*
    -----出入库记录-----
    */
    whm.inoutstock = function () {
        var obj = new whm.inoutstock.fn.init();
        return obj;
    };
    whm.inoutstock.fn = {
        /* 构造函数 */
        init: function () { },

        /* 处理出入库记录 */
        handlerInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlerInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除出入库记录 */
        deleteInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取出入库记录 */
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

        /* 查询出入库记录 */
        queryInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出出入库记录 */
        exportInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    whm.inoutstock.fn.init.prototype = whm.inoutstock.fn;
    /*-------------------------------*/

})(window);
