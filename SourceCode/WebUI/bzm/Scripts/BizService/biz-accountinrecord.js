(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----��������-----
    */
    fm.accountinrecord = function () {
        var obj = new fm.accountinrecord.fn.init();
        return obj;
    };
    fm.accountinrecord.fn = {
        /* ���캯�� */
        init: function () { },

        /* ������������ */
        handlerAccountInRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlerAccountInRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ����Paypal��Ŀ */
        importAIFromPaypal: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportAIFromPaypal", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* ��������ͨ��Ŀ */
        importAIFromAliExpress: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportAIFromAliExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* �����Ա���Ŀ */
        importAIFromTaobao: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportAIFromTaobao", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* �����˵� */
        importReceiveBill: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportReceiveBill", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* ������������ */
        cancelAccountInRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CancelAccountInRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        batchCancelAIR: function (keyword, airType, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("BatchCancelAIR", { Keyword: keyword, AIRType: airType, SalePlatformId: shoppingSiteId,
                SaleSite_Id: salesite_id, SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        abortAccountInRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AbortAccountInRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�������� */
        readAccountInRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadAccountInRecord", { AccountInRecord_Id: this.AccountInRecord_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ�������� */
        queryAccountInRecord: function (keyword, airType, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            page, pageNum, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAccountInRecord", { Keyword: keyword, AIRType: airType, SalePlatformId: shoppingSiteId,
                SaleSite_Id: salesite_id, SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime, Page: page, PageNum: pageNum,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ������������ */
        exportAccountInRecord: function (keyword, airType, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAccoutInRecord", { Keyword: keyword, AIRType: airType, SalePlatformId: shoppingSiteId,
                SaleSite_Id: salesite_id, SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime, 
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��������ʽ� */
        getWaitingReceive: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitingReceive", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.accountinrecord.fn.init.prototype = fm.accountinrecord.fn;
    /*-------------------------------*/

})(window);
