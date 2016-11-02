(function (window) {

    if (!window.pdm) {
        window.sm = {};
    }

    /*
    -----销售统计分析-----
    */
    sm.salereport = function () {
        var obj = new sm.salereport.fn.init();
        return obj;
    };
    sm.salereport.fn = {
        /* 构造函数 */
        init: function () { },

        /*  */
        generateSaleReport: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSaleReport", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        getStatTimeX: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetStatTimeX", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSaleSiteStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleSiteStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySaleAnalysisObjs: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySaleAnalysisObjs", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSAOProduts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOProduts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSaleAnalysisObjs: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSaleAnalysisObjs", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importSaleAnalysisObjs: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSaleAnalysisObjs", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        querySAOSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySAOSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySAOSaleByDateStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySAOSaleByDateStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySAOSaleByAreaStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySAOSaleByAreaStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSAOOrderCountStatByHour: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOOrderCountStatByHour", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context); 
        },

        /*  */
        getSAOOrderCountStatByArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOOrderCountStatByArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySAOSkuProdSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySAOSkuProdSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSaleSiteQtyStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleSiteQtyStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSaleSiteProfitStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleSiteProfitStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSAOTotalSaleStatByArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOTotalSaleStatByArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportMarketingCost: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportMarketingCost", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importMarketingCost: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportMarketingCost", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        getSAOTypes: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOTypes", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSAOSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSAOSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getTrackTimes: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTrackTimes", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        trackSaleAnalysis: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("TrackSaleAnalysis", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportTrackSaleAnalysis: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportTrackSaleAnalysis", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTSearchAnalysis: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTSearchAnalysis", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    sm.salereport.fn.init.prototype = sm.salereport.fn;
    /*-------------------------------*/

})(window);
