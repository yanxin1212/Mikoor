(function (window) {

    if (!window.spm) {
        window.spm = {};
    }
    /*
    -----ϵͳ�ؼ�����-----
    */
    spm.syskeyparam = function () {
        var obj = new spm.syskeyparam.fn.init();
        return obj;
    };
    spm.syskeyparam.fn = {
        /* ���캯�� */
        init: function () { },

        /* �޸�ϵͳ�ؼ����� */
        modifySysKeyParam: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySysKeyParam", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡϵͳ�ؼ����� */
        readSysKeyParam: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSysKeyParam");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ������λ */
        getWeightUnits: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWeightUnits");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* ��ȡ�������� */
        getWeightRate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWeightRate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /*  */
        getAllPrintTemplate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAllPrintTemplate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        authoriseSMT: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AuthoriseSMT", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    spm.syskeyparam.fn.init.prototype = spm.syskeyparam.fn;
    /*-------------------------------*/

})(window);
