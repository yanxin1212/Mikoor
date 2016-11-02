(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售商品-----
    */
    sm.ss_product = function () {
        var obj = new sm.ss_product.fn.init();
        return obj;
    };
    sm.ss_product.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增销售商品 */
        newSS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSS_Product", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改销售商品 */
        modifySS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySS_Product", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改销售商品图片序号 */
        modifySSProdPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySSProdPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 上传商品图片 */
        uploadSSProdPic: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("UploadSSProdPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 删除销售商品 */
        deleteSS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSS_Product", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 导出配送价格 */
        exportProductExpServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入商品 */
        importSSProducts: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 导入商品序号 */
        importSSProductSeq: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSSProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导入配送价格 */
        importProductExpServices: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportProductExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 读取销售商品 */
        readSS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSS_Product", { SS_Product_Id: this.SS_Product_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询销售商品 */
        querySSProductByInnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySSProductByInnerProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 分页查询销售商品 */
        querySSProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出商品 */
        exportSSProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出Wish商品 */
        exportWishProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportWishProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出商品序号 */
        exportSSProductSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSSProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出商品利润 */
        exportProductProfit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductProfit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询利润 */
        queryProdProfit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProdProfit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySSProdSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySSProdSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        refreshProdProfit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("RefreshProdProfit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        syncSSProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SyncSSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importSSProductByPicture: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSSProductByPicture", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSMTGroupAndProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSMTGroupAndProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        syncSMTProductList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SyncSMTProductList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        generateSSProdRemark: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSSProdRemark", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readSSProductRemark: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSSProductRemark", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readSSProductPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSSProductPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readSSProductWithMainPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSSProductWithMainPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        publishSMTProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("PublishSMTProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        checkSMTProductProhibitedWords: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CheckSMTProductProhibitedWords", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        batchPublishSMTProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("BatchPublishSMTProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        checkProhibitedWords: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CheckProhibitedWords", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    sm.ss_product.fn.init.prototype = sm.ss_product.fn;
    /*-------------------------------*/

})(window);
