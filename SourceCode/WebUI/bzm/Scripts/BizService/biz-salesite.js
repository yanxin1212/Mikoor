(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----վ��-----
    */
    sm.salesite = function () {
        var obj = new sm.salesite.fn.init();
        return obj;
    };
    sm.salesite.fn = {
        /* ���캯�� */
        init: function () { },

        /* ����վ�� */
        newSaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸�վ�� */
        modifySaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ��վ�� */
        deleteSaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSaleSite", { SalePlatform_Id: this.SalePlatform_Id, SaleSite_Id: this.SaleSite_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /*  */
        compareGlobalAreas: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CompareGlobalAreas", { SalePlatform_Id: this.SalePlatform_Id, SaleSite_Id: this.SaleSite_Id, GlobalArea_Ids: this.GlobalArea_Ids });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.salesite.fn.init.prototype = sm.salesite.fn;
    /*-------------------------------*/

})(window);
