(function (window) {

    if (!window.othm) {
        window.othm = {};
    }
    /*
    -----����-----
    */
    othm.globalarea = function () {
        var obj = new othm.globalarea.fn.init();
        return obj;
    };
    othm.globalarea.fn = {
        /* ���캯�� */
        init: function () { },

        /* �������� */
        newGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewGlobalArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸����� */
        modifyGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyGlobalArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ������ */
        deleteGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteGlobalArea", { GlobalArea_Id: this.GlobalArea_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ���� */
        readGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadGlobalArea", { GlobalArea_Id: this.GlobalArea_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�������� */
        getAllGlobalAreas: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllGlobalArea");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* ��ȡ���Һ��ڲ����� */
        queryCountryAndInnerRegion: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCountryAndInnerRegion");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* ��ȡ���й��� */
        queryCountries: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCountries");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* ��ȡ����Ƭ�� */
        queryRegions: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryRegions");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* ��ȡƬ���͹��� */
        queryRegionAndCountries: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryRegionAndCountries");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* ��ѯ�����µ����� */
        queryGlobalAreaByCountries: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryGlobalAreaByCountries", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* ��ѯ���������µ����� */
        queryGlobalAreaBySaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryGlobalAreaBySaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    othm.globalarea.fn.init.prototype = othm.globalarea.fn;
    /*-------------------------------*/

})(window);
