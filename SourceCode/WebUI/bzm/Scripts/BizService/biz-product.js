(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----商品基本信息-----
    */
    pdm.product = function () {
        var obj = new pdm.product.fn.init();
        return obj;
    };
    pdm.product.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增商品基本信息 */
        newProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改商品基本信息 */
        modifyProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 上传商品图片 */
        uploadProdPicFile: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("UploadProdPicFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 添加商品图片 */
        addProdPicFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AddProdPicFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 添加商品图片 */
        addProdPicFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AddProdPicFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除商品基本信息 */
        deleteProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProduct", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取商品基本信息 */
        readProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProduct", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取商品基本信息 */
        readProductWithQuotedPrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProductWithQuotedPrice", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品序号数量 */
        getProdSeqCount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetProdSeqCount", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询商品基本信息 */
        queryProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryProdSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProdSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询商品Sku */
        getSkuProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSkuProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 清理商品图片 */
        clearProdPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ClearProdPics", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品图片 */
        modifyProdPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProdPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除商品图片 */
        deleteProdPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProdPic", { Product_Pic_Id: this.Product_Pic_Id, Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品图片 */
        getProdPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetProdPics", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /* 导出商品 */
        exportProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入商品 */
        importProducts: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },
        
        /* 导出商品序号 */
        exportProductSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入商品序号 */
        importProductSeq: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导出商品图片 */
        exportProductPicture: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductPicture", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        covertStandProdPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CovertStandProdPics", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.product.fn.init.prototype = pdm.product.fn;
    /*-------------------------------*/

})(window);
