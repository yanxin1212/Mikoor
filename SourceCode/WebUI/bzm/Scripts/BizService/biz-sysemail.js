(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }

    /*
    -----邮件处理-----
    */
    spm.sysemail = function () {
        var obj = new spm.sysemail.fn.init();
        return obj;
    };
    spm.sysemail.fn = {
        /* 构造函数 */
        init: function () { },

        /*  */
        generateReceiveRemindEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateReceiveRemindEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        deleteSysEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSysEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySysEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSysEmailStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSysEmailStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        sendEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SendEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    spm.sysemail.fn.init.prototype = spm.sysemail.fn;
    /*-------------------------------*/

})(window);
