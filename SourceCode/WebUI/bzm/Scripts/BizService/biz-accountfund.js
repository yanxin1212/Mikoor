(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----账号资金-----
    */
    fm.accountfund = function () {
        var obj = new fm.accountfund.fn.init();
        return obj;
    };
    fm.accountfund.fn = {
        /* 构造函数 */
        init: function () {
            this.AccountFund_Id;
            this.FundAccount_Id;
            this.SysCurrency_Id;
            this.Fund;
            this.WaitPayFund;
            this.WaitReceiveFund;
            this.FundBalance;
        },

        /* 获取所有账号资金 */
        getAllAccountFunds: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllAccountFund");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有账号资金 */
        queryAllAccountFundTable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllAccountFundTable");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取有效账号资金 */
        queryAvaiAccountFundTable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAvaiAccountFundTable");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有账号 */
        getAllAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAllAccount");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取有效的账号 */
        getAvailableAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAvailableAccount");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取统计资金 */
        queryTotalFund: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryTotalFund");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.accountfund.fn.init.prototype = fm.accountfund.fn;
    /*-------------------------------*/

})(window);
