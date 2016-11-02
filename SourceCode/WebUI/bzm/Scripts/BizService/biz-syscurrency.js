(function (window) {

    if (!window.othm) {
        window.othm = {};
    }
    /*
    -----����-----
    */
    othm.syscurrency = function () {
        var obj = new othm.syscurrency.fn.init();
        return obj;
    };
    othm.syscurrency.fn = {
        /* ���캯�� */
        init: function () { },

        /* �������� */
        newSysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSysCurrency", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸Ļ��� */
        modifySysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySysCurrency", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ������ */
        deleteSysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSysCurrency", { SysCurrency_Id: this.SysCurrency_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ���� */
        readSysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSysCurrency", { SysCurrency_Id: this.SysCurrency_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���л��� */
        getAllSysCurrencys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSysCurrency");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    othm.syscurrency.fn.init.prototype = othm.syscurrency.fn;
    /*-------------------------------*/

})(window);
