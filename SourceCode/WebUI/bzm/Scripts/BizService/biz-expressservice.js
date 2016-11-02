(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----���ͷ���-----
    */
    sm.expressservice = function () {
        var obj = new sm.expressservice.fn.init();
        return obj;
    };
    sm.expressservice.fn = {
        /* ���캯�� */
        init: function () { },

        /* �������ͷ��� */
        newExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸����ͷ��� */
        modifyExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ�����ͷ��� */
        deleteExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteExpressService", { ExpressService_Id: this.ExpressService_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ���ͷ��� */
        readExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadExpressService", { ExpressService_Id: this.ExpressService_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ���ͷ��� */
        queryExpressServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ���ͷ��� */
        queryAreaExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAreaExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ�����еķ������� */
        queryExpServiceCountByArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpServiceCountByArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            //��ȡ����
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* �������ͷ���ɱ� */
        exportAnalyFixExpress: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAnalyFixExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �������ͷ��� */
        exportAnalyExpress: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAnalyExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���ͷ���Ĳ����˷� */
        getCalFixExpress: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetCalFixExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �������ͷ��� */
        exportExpServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �������ͷ��� */
        importExpServices: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ���ͷ���۸� */
        getExpServicePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetExpServicePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.expressservice.fn.init.prototype = sm.expressservice.fn;
    /*-------------------------------*/

})(window);
