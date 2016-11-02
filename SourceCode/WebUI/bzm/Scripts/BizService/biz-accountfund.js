(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----�˺��ʽ�-----
    */
    fm.accountfund = function () {
        var obj = new fm.accountfund.fn.init();
        return obj;
    };
    fm.accountfund.fn = {
        /* ���캯�� */
        init: function () {
            this.AccountFund_Id;
            this.FundAccount_Id;
            this.SysCurrency_Id;
            this.Fund;
            this.WaitPayFund;
            this.WaitReceiveFund;
            this.FundBalance;
        },

        /* ��ȡ�����˺��ʽ� */
        getAllAccountFunds: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllAccountFund");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�����˺��ʽ� */
        queryAllAccountFundTable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllAccountFundTable");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��Ч�˺��ʽ� */
        queryAvaiAccountFundTable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAvaiAccountFundTable");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�����˺� */
        getAllAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAllAccount");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��Ч���˺� */
        getAvailableAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAvailableAccount");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡͳ���ʽ� */
        queryTotalFund: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryTotalFund");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.accountfund.fn.init.prototype = fm.accountfund.fn;
    /*-------------------------------*/

})(window);
