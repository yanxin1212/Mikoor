(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----�ʽ�������¼-----
    */
    fm.fundflowrecord = function () {
        var obj = new fm.fundflowrecord.fn.init();
        return obj;
    };
    fm.fundflowrecord.fn = {
        /* ���캯�� */
        init: function () { },

        /* �����ʽ�������¼ */
        newFundFlowRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewFundFlowRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�ʽ�������¼ */
        queryFundFlowRecord: function (keyword, action, fundAccountId, fromTime, toTime, accountYear, accountMonth, page, pageNum, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryFundFlowRecord", { Keyword: keyword, Action: action, FundAccountId: fundAccountId,
                FromTime: fromTime, ToTime: toTime, AccountYear: accountYear, AccountMonth: accountMonth, Page: page, PageNum: pageNum
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�ʽ�������¼ */
        getPayFundFlowRecords: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetPayFundFlowRecords", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �����ʽ�������¼ */
        exportFundFlowRecord: function (keyword, action, fundAccountId, fromTime, toTime, accountYear, accountMonth, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportFundFlowRecord", { Keyword: keyword, Action: action, FundAccountId: fundAccountId,
                FromTime: fromTime, ToTime: toTime, AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.fundflowrecord.fn.init.prototype = fm.fundflowrecord.fn;
    /*-------------------------------*/

})(window);
