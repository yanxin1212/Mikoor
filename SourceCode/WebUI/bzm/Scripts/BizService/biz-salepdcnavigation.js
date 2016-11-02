(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----��վ��Ʒ����-----
    */
    sm.salepdcnavigation = function () {
        var obj = new sm.salepdcnavigation.fn.init();
        return obj;
    };
    sm.salepdcnavigation.fn = {
        /* ���캯�� */
        init: function () { },

        /* ������վ��Ʒ���� */
        newSalePdcNavigation: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSalePdcNavigation", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸���վ��Ʒ���� */
        modifySalePdcNavigation: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySalePdcNavigation", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸��޸���վ��Ʒ��������� */
        modifyPdcNavSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcNavSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ����վ��Ʒ���� */
        deleteSalePdcNavigation: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSalePdcNavigation", { ProdCategory_Id: this.ProdCategory_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ��վ��Ʒ���� */
        querySalePdcNav: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySalePdcNav", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    sm.salepdcnavigation.fn.init.prototype = sm.salepdcnavigation.fn;
    /*-------------------------------*/

})(window);
