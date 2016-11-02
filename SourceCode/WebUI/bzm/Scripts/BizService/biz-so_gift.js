(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售订单-赠品-----
    */
    sm.so_gift = function () {
        var obj = new sm.so_gift.fn.init();
        return obj;
    };
    sm.so_gift.fn = {
        /* 构造函数 */
        init: function () {
            this.SO_Gift_Id;
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

        /* 新增销售订单-赠品 */
        newSO_Gift: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSO_Gift", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改销售订单-赠品 */
        modifySO_Gift: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySO_Gift", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除销售订单-赠品 */
        deleteSO_Gift: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSO_Gift", { SO_Gift_Id: this.SO_Gift_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取销售订单-赠品 */
        readSO_Gift: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSO_Gift", { SO_Gift_Id: this.SO_Gift_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有销售订单-赠品 */
        getAllSO_Gifts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSO_Gift");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.so_gift.fn.init.prototype = sm.so_gift.fn;
    /*-------------------------------*/

})(window);
