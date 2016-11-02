(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----财务收入-----
    */
    fm.accountinrecord = function () {
        var obj = new fm.accountinrecord.fn.init();
        return obj;
    };
    fm.accountinrecord.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增财务收入 */
        handlerAccountInRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlerAccountInRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入Paypal账目 */
        importAIFromPaypal: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportAIFromPaypal", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导入速卖通账目 */
        importAIFromAliExpress: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportAIFromAliExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导入淘宝账目 */
        importAIFromTaobao: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportAIFromTaobao", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导入账单 */
        importReceiveBill: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportReceiveBill", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 撤消财务收入 */
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

        /* 读取财务收入 */
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

        /* 查询财务收入 */
        queryAccountInRecord: function (keyword, airType, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            page, pageNum, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAccountInRecord", { Keyword: keyword, AIRType: airType, SalePlatformId: shoppingSiteId,
                SaleSite_Id: salesite_id, SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime, Page: page, PageNum: pageNum,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 到处财务收入 */
        exportAccountInRecord: function (keyword, airType, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAccoutInRecord", { Keyword: keyword, AIRType: airType, SalePlatformId: shoppingSiteId,
                SaleSite_Id: salesite_id, SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime, 
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取待收入的资金 */
        getWaitingReceive: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitingReceive", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.accountinrecord.fn.init.prototype = fm.accountinrecord.fn;
    /*-------------------------------*/

})(window);
