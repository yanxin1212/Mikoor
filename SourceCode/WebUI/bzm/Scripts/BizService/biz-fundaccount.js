(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----�ʽ��˺�-----
    */
    fm.fundaccount = function () {
        var obj = new fm.fundaccount.fn.init();
        return obj;
    };
    fm.fundaccount.fn = {
        /* ���캯�� */
        init: function () {
            this.FundAccount_Id;
            this.Seq;
            this.Account;
            this.BankName;
            this.Owner;
            this.Remark;
        },

        /* �����ʽ��˺� */
        newFundAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewFundAccount", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸��ʽ��˺� */
        modifyFundAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyFundAccount", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ���ʽ��˺� */
        deleteFundAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteFundAccount", { FundAccount_Id: this.FundAccount_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�����ʽ��˺� */
        getAllFundAccounts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllFundAccount");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.fundaccount.fn.init.prototype = fm.fundaccount.fn;
    /*-------------------------------*/

})(window);
