(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----����ƽ̨-----
    */
    sm.saleplatform = function () {
        var obj = new sm.saleplatform.fn.init();
        return obj;
    };
    sm.saleplatform.fn = {
        /* ���캯�� */
        init: function () { },

        /* ��������ƽ̨ */
        newSalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSalePlatform", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸�����ƽ̨ */
        modifySalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySalePlatform", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ������ƽ̨ */
        deleteSalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSalePlatform", { SalePlatform_Id: this.SalePlatform_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ����ƽ̨ */
        readSalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSalePlatform", { SalePlatform_Id: this.SalePlatform_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* ����Ȩ������ȡվ�� */
        queryAvaiSaleSites: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAvaiSaleSites");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* ����Ȩ������ȡ����ƽ̨ */
        querySalePlatforms: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySalePlatforms");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /*  */
        publishSaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("PublishSaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.saleplatform.fn.init.prototype = sm.saleplatform.fn;
    /*-------------------------------*/

})(window);
