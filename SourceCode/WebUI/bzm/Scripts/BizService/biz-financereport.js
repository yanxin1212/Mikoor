(function (window) {

    if (!window.fm) {
        window.fm = {};
    }

    /*
    -----财务统计报表-----
    */
    fm.financereport = function () {
        var obj = new fm.financereport.fn.init();
        return obj;
    };
    fm.financereport.fn = {
        /* 构造函数 */
        init: function () { },

        /* 获取运行情况的统计报表 */
        queryTotalOperateReport: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryTotalOperateReport");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /* 获取时间 */
        getFRTimes: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetFRTimes");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取账单站点 */
        querySaleSitesInFinance: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySaleSitesInFinance", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 账目资金列表 */
        getTotalFundsByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalFundsByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 账目收支平衡 */
        getTotalBalanceByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalBalanceByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取财务收入支出明细 */
        getTotalPayBillByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalPayBillByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取上月财务收入支出明细 */
        getLastTotalPayBillByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetLastTotalPayBillByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取财务收入明细 */
        getTotalReceiveBillByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalReceiveBillByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取上月财务收入明细 */
        getLastTotalRvBillByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetLastTotalRvBillByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取财务应收账目 */
        getTotalPayAccountByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalPayAccountByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取财务应收账目 */
        getTotalReceiveAccountByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalReceiveAccountByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取待支付费用 */
        getWaitPayByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitPayByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取待收资金 */
        getWaitReceiveByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitReceiveByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取资金走向 */
        getFundFlowByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetFundFlowByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取下月待收转账资金 */
        getWaitFundTransferInByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitFundTransferInByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出报表 */
        exportFinanceReport: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportFinanceReport", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.financereport.fn.init.prototype = fm.financereport.fn;
    /*-------------------------------*/
})(window);