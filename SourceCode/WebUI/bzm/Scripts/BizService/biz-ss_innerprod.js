(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售单元-----
    */
    sm.ss_innerprod = function () {
        var obj = new sm.ss_innerprod.fn.init();
        return obj;
    };
    sm.ss_innerprod.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增销售单元 */
        newSS_InnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSS_InnerProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改销售单元 */
        modifySS_InnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySS_InnerProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除销售单元 */
        deleteSS_InnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSS_InnerProd", { SS_InnerProd_Id: this.SS_InnerProd_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取销售单元 */
        readSS_InnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSS_InnerProd", { SS_InnerProd_Id: this.SS_InnerProd_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有销售单元 */
        getAllSS_InnerProds: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSS_InnerProd");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.ss_innerprod.fn.init.prototype = sm.ss_innerprod.fn;
    /*-------------------------------*/

})(window);
