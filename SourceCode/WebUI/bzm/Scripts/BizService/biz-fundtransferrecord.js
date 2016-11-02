(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----资金转账-----
    */
    fm.fundtransferrecord = function () {
        var obj = new fm.fundtransferrecord.fn.init();
        return obj;
    };
    fm.fundtransferrecord.fn = {
        /* 构造函数 */
        init: function () {
            this.FundTransferRecord_Id;
            this.OutFundAccount_Id;
            this.OutSysCurrency_Id;
            this.OutFund;
            this.InFundAccount_Id;
            this.InSysCurrency_Id;
            this.InFund;
            this.LosedFund;
            this.Rate;
        },

        /* 新增资金转账 */
        newFundTransferRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewFundTransferRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 到账处理 */
        overFundTransfer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("OverFundTransfer", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 撤消资金转账 */
        deleteFundTransferRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteFundTransferRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取资金转账 */
        queryFundTransferRecord: function (keyword, outfundaccount_id, outsyscurrency_id, infundaccount_id, insyscurrency_id, fromTime, toTime, page, pageNum, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryFundTransferRecord", { Keyword: keyword, OutFundAccount_Id: outfundaccount_id,
                OutSysCurrency_Id: outsyscurrency_id,
                InFundAccount_Id: infundaccount_id,
                InSysCurrency_Id: insyscurrency_id,
                FromTime: fromTime, ToTime: toTime, Page: page, PageNum: pageNum
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 到处资金转账 */
        exportFundTransferRecord: function (keyword, outfundaccount_id, outsyscurrency_id, infundaccount_id, insyscurrency_id, fromTime, toTime, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportFundTransferRecord", { Keyword: keyword, OutFundAccount_Id: outfundaccount_id,
                OutSysCurrency_Id: outsyscurrency_id,
                InFundAccount_Id: infundaccount_id,
                InSysCurrency_Id: insyscurrency_id,
                FromTime: fromTime, ToTime: toTime
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.fundtransferrecord.fn.init.prototype = fm.fundtransferrecord.fn;
    /*-------------------------------*/

})(window);
