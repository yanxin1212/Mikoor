(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----资金账号-----
    */
    fm.fundaccount = function () {
        var obj = new fm.fundaccount.fn.init();
        return obj;
    };
    fm.fundaccount.fn = {
        /* 构造函数 */
        init: function () {
            this.FundAccount_Id;
            this.Seq;
            this.Account;
            this.BankName;
            this.Owner;
            this.Remark;
        },

        /* 新增资金账号 */
        newFundAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewFundAccount", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改资金账号 */
        modifyFundAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyFundAccount", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除资金账号 */
        deleteFundAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteFundAccount", { FundAccount_Id: this.FundAccount_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有资金账号 */
        getAllFundAccounts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllFundAccount");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.fundaccount.fn.init.prototype = fm.fundaccount.fn;
    /*-------------------------------*/

})(window);
