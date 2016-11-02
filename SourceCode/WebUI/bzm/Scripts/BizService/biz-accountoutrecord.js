(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----财务支出-----
    */
    fm.accountoutrecord = function () {
        var obj = new fm.accountoutrecord.fn.init();
        return obj;
    };
    fm.accountoutrecord.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增财务支出 */
        handlerAccountOutRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlerAccountOutRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        abortAccountOutRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AbortAccountOutRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入账单 */
        importPayBill: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPayBill", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 撤消财务支出 */
        cancelAccountOutRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CancelAccountOutRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 批量撤消财务支出 */
        batchCancelAOR: function (keyword, costSubjectId, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth, 
            successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("BatchCancelAOR", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取财务支出 */
        readAccountOutRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadAccountOutRecord", { AccountOutRecord_Id: this.AccountOutRecord_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询财务支出 */
        queryAccountOutRecord: function (keyword, costSubjectId, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            page, pageNum, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAccountOutRecord", { Keyword: keyword, CostSubjectId: costSubjectId, SalePlatform_Id: shoppingSiteId, SaleSite_Id: salesite_id,
                SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime, Page: page, PageNum: pageNum,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出财务支出 */
        exportAccoutOutRecord: function (keyword, costSubjectId, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAccoutOutRecord", { Keyword: keyword, CostSubjectId: costSubjectId, SalePlatform_Id: shoppingSiteId, SaleSite_Id: salesite_id,
                SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取待支付的资金 */
        getWaitingPaid: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitingPaid", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.accountoutrecord.fn.init.prototype = fm.accountoutrecord.fn;
    /*-------------------------------*/

})(window);
