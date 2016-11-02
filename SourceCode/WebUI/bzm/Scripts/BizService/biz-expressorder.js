(function (window) {

    if (!window.lstm) {
        window.lstm = {};
    }
    /*
    -----配送单-----
    */
    lstm.expressorder = function () {
        var obj = new lstm.expressorder.fn.init();
        return obj;
    };
    lstm.expressorder.fn = {
        /* 构造函数 */
        init: function () { },

        /* 打包 */
        packageExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("PackageExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        rePackageExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("RePackageExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        shipSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ShipSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        finishDelivery: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("FinishDelivery", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        loseEO: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("LoseEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        returnEO: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReturnEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        receiveEORet: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReceiveEORet", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        saveShipCost: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SaveShipCost", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        saveTrackingNumber: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SaveTrackingNumber", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        combinExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CombinExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        splitExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SplitExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        cancelEO: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CancelEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取配送单 */
        readExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadExpressOrder", { ExpressOrder_Id: this.ExpressOrder_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getEOStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetEOStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryExpressOrderForCombin: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpressOrderForCombin", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryEOProductForPackage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryEOProductForPackage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportEOProductForPackage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportEOProductForPackage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importExpressOrder: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        getDeliveryStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetDeliveryStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportDeliveryEO: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportDeliveryEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importDeliveryEO: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportDeliveryEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        importPre4PXEO: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPre4PXEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        exportSMTTrackingNumber: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTTrackingNumber", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importEOCostBySMT: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportEOCostBySMT", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        importEOCostBy4PX: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportEOCostBy4PX", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        exportEOCharge: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportEOCharge", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPackageExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPackageExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportShippingLable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportShippingLable", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    lstm.expressorder.fn.init.prototype = lstm.expressorder.fn;
    /*-------------------------------*/

})(window);