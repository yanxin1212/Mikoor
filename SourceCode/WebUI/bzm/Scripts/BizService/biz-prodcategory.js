(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----商品分类-----
    */
    pdm.prodcategory = function () {
        var obj = new pdm.prodcategory.fn.init();
        return obj;
    };
    pdm.prodcategory.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增商品分类 */
        newProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewProdCategory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改商品分类 */
        modifyProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProdCategory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改商品分类编码 */
        modifyPdcCode: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcCode", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改商品分类的序号 */
        modifyPdcSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除商品分类 */
        deleteProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProdCategory", { ProdCategory_Id: this.ProdCategory_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取商品分类 */
        readProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProdCategory", { ProdCategory_Id: this.ProdCategory_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有商品分类 */
        getAllProdCategorys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllProdCategory");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    pdm.prodcategory.fn.init.prototype = pdm.prodcategory.fn;
    /*-------------------------------*/

})(window);
