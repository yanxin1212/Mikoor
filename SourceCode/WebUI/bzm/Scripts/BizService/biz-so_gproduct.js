(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售订单-内部产品-----
    */
    sm.so_gproduct = function () {
        var obj = new sm.so_gproduct.fn.init();
        return obj;
    };
    sm.so_gproduct.fn = {
        /* 构造函数 */
        init: function () {
            this.SO_GProduct_Id;
            this.SO_Product_Id;
            this.SaleOrder_Id;
            this.Product_Id;
            this.SkuProduct_Id;
            this.SkuProdCode;
            this.ProdName;
            this.ProdUnit;
            this.SkuProps;
            this.Qty;
            this.Cost;
            this.Weight;
        },

        /* 新增销售订单-内部产品 */
        newSO_GProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSO_GProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改销售订单-内部产品 */
        modifySO_GProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySO_GProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除销售订单-内部产品 */
        deleteSO_GProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSO_GProduct", { SO_GProduct_Id: this.SO_GProduct_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取销售订单-内部产品 */
        readSO_GProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSO_GProduct", { SO_GProduct_Id: this.SO_GProduct_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有销售订单-内部产品 */
        getAllSO_GProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSO_GProduct");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.so_gproduct.fn.init.prototype = sm.so_gproduct.fn;
    /*-------------------------------*/

})(window);
