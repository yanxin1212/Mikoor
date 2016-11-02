(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----产品库存单元-----
    */
    pdm.skuproduct = function () {
        var obj = new pdm.skuproduct.fn.init();
        return obj;
    };
    pdm.skuproduct.fn = {
        /* 构造函数 */
        init: function () {
            this.SkuProduct_Id;
            this.Product_Id;
            this.ProdCode;
            this.SkuPropValues;
            this.Quotiety;
            this.Stock;
        },

        /* 新增产品库存单元 */
        newSkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSkuProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改产品库存单元 */
        modifySkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySkuProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除产品库存单元 */
        deleteSkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSkuProduct", { SkuProduct_Id: this.SkuProduct_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取产品库存单元 */
        readSkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSkuProduct", { SkuProduct_Id: this.SkuProduct_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有产品库存单元 */
        getAllSkuProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSkuProduct");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.skuproduct.fn.init.prototype = pdm.skuproduct.fn;
    /*-------------------------------*/

})(window);
