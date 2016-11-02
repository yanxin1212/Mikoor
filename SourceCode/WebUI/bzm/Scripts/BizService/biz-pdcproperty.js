(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----��Ʒ����-����-----
    */
    pdm.pdcproperty = function () {
        var obj = new pdm.pdcproperty.fn.init();
        return obj;
    };
    pdm.pdcproperty.fn = {
        /* ���캯�� */
        init: function () { },

        /* ������Ʒ����-���� */
        newPdcProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewPdcProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸���Ʒ����-���� */
        modifyPdcProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ����Ʒ����-���� */
        deletePdcProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeletePdcProperty", { PdcProperty_Id: this.PdcProperty_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ��Ʒ����-���� */
        readPdcProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadPdcProperty", { PdcProperty_Id: this.PdcProperty_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��Ʒ��������� */
        getPdcProps: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetPdcProps", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    pdm.pdcproperty.fn.init.prototype = pdm.pdcproperty.fn;
    /*-------------------------------*/

})(window);
