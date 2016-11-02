(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----���۵�Ԫ-----
    */
    sm.ss_innerprod = function () {
        var obj = new sm.ss_innerprod.fn.init();
        return obj;
    };
    sm.ss_innerprod.fn = {
        /* ���캯�� */
        init: function () { },

        /* �������۵�Ԫ */
        newSS_InnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSS_InnerProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸����۵�Ԫ */
        modifySS_InnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySS_InnerProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ�����۵�Ԫ */
        deleteSS_InnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSS_InnerProd", { SS_InnerProd_Id: this.SS_InnerProd_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���۵�Ԫ */
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

        /* ��ȡ�������۵�Ԫ */
        getAllSS_InnerProds: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSS_InnerProd");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.ss_innerprod.fn.init.prototype = sm.ss_innerprod.fn;
    /*-------------------------------*/

})(window);
