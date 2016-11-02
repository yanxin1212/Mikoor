(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售订单-----
    */
    sm.saleorder = function () {
        var obj = new sm.saleorder.fn.init();
        return obj;
    };
    sm.saleorder.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增销售订单 */
        newSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改销售订单 */
        modifySaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 客户确认 */
        custConfirmSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CustConfirmSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 生效订单 */
        submitSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SubmitSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        resendSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReSendSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除销售订单 */
        deleteSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 撤消销售订单 */
        cancelSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CancelSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        closeSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CloseSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取销售订单 */
        readSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSaleOrder", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取销售订单 */
        readFullSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadFullSaleOrder", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询销售订单 */
        querySaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySaleOrderForAS: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySaleOrderForAS", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSaleOrderStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleOrderStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },


        /*  */
        exportSaleOrderForSubmit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSaleOrderForSubmit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /*  */
        importSubmitSaleOrder: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSubmitSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        importSTMSaleOrder: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSTMSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        importTaobaoSaleOrder: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportTaobaoSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        getSaleOrderForPrint: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleOrderForPrint", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySMTShipLable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySMTShipLable", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        generateSMTShipLable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSMTShipLable", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTShipLableErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTShipLableErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySMTTrackingNumber: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySMTTrackingEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        generateSMTTrackingNumber: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSMTTrackingNumber", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTTrackingNumberErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTTrackingNumberErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        generateSMTShipLablePDF: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSMTShipLablePDF", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTShipLablePDFErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTShipLablePDFErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySMTSaleOrderForShipState: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySMTSaleOrderForShipState", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        modifyShipStateInSMT: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyShipStateInSMT", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportModifyShipStateInSMTErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportModifyShipStateInSMTErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSMTSaleOrderList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSMTSaleOrderList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSMTSaleOrderDetailList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSMTSaleOrderDetailList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        handleSMTSaleOrders: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandleSMTSaleOrders", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySMTSaleOrderForConfirmMessage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySMTSaleOrderForConfirmMessage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        sendSMTSOConfirmMessage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SendSMTSOConfirmMessage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSendSMTSOConfirmMessageErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSendSMTSOConfirmMessageErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSMTEvaluationOrderList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSMTEvaluationOrderList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        evaluationSMTOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("EvaluationSMTOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportEvaluationSMTOrderErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportEvaluationSMTOrderErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTTaskInfos: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTTaskInfos", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTMessage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTMessage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importSMTMessage: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSMTMessage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    sm.saleorder.fn.init.prototype = sm.saleorder.fn;
    /*-------------------------------*/

})(window);