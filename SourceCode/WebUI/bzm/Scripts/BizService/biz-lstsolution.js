(function (window) {

    if (!window.lstm) {
        window.lstm = {};
    }
    /*
    -----物流解决方案-----
    */
    lstm.lstsolution = function () {
        var obj = new lstm.lstsolution.fn.init();
        return obj;
    };
    lstm.lstsolution.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增物流解决方案 */
        newLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改物流解决方案 */
        modifyLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除物流解决方案 */
        deleteLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteLstSolution", { LstSolution_Id: this.LstSolution_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取物流解决方案 */
        readLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadLstSolution", { LstSolution_Id: this.LstSolution_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadLstSolutionItem", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询物流解决方案 */
        queryLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /* 查询运费 */
        queryLstCharge: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryLstCharge", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询运费 */
        queryOptimalLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryOptimalLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取运费详细条目 */
        getLstSolutionItems: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetLstSolutionItems", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 新增物流解决方案明细 */
        newLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewLstSolutionItem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改物流解决方案明细 */
        modifyLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyLstSolutionItem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除物流解决方案明细 */
        deleteLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteLstSolutionItem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出运费价格 */
        exportLstSolutionPrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportLstSolutionPrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入运费价格 */
        importLstSolutionPrice: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportLstSolutionPrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导出运费 */
        exportLstCharges: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportLstCharges", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    lstm.lstsolution.fn.init.prototype = lstm.lstsolution.fn;
    /*-------------------------------*/

})(window);
