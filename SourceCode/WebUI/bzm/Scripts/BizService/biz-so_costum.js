(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售订单-报关信息-----
    */
    sm.so_costum = function () {
        var obj = new sm.so_costum.fn.init();
        return obj;
    };
    sm.so_costum.fn = {
        /* 构造函数 */
        init: function () {
            this.SO_Costum_Id;
            this.SaleOrder_Id;
            this.Product_Id;
            this.CustomProdName;
            this.CustomValue;
            this.CustomCode;
            this.FactoryCountry;
            this.CustomMaterial;
        },

        /* 新增销售订单-报关信息 */
        newSO_Costum: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSO_Costum", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改销售订单-报关信息 */
        modifySO_Costum: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySO_Costum", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除销售订单-报关信息 */
        deleteSO_Costum: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSO_Costum", { SO_Costum_Id: this.SO_Costum_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取销售订单-报关信息 */
        readSO_Costum: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSO_Costum", { SO_Costum_Id: this.SO_Costum_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有销售订单-报关信息 */
        getAllSO_Costums: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSO_Costum");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.so_costum.fn.init.prototype = sm.so_costum.fn;
    /*-------------------------------*/

})(window);
