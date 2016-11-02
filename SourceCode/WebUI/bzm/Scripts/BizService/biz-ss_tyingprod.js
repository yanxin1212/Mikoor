(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----搭售商品-----
    */
    sm.ss_tyingprod = function () {
        var obj = new sm.ss_tyingprod.fn.init();
        return obj;
    };
    sm.ss_tyingprod.fn = {
        /* 构造函数 */
        init: function () {
            this.SS_TyingProd_Id;
            this.SalePlatform_Id;
            this.SaleSite_Id;
            this.SS_Product_Id;
            this.Seq;
            this.TyingProd;
            this.Discount;
        },

        /* 新增搭售商品 */
        newSS_TyingProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSS_TyingProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改搭售商品 */
        modifySS_TyingProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySS_TyingProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除搭售商品 */
        deleteSS_TyingProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSS_TyingProd", { SS_TyingProd_Id: this.SS_TyingProd_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取搭售商品 */
        readSS_TyingProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSS_TyingProd", { SS_TyingProd_Id: this.SS_TyingProd_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有搭售商品 */
        getAllSS_TyingProds: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSS_TyingProd");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.ss_tyingprod.fn.init.prototype = sm.ss_tyingprod.fn;
    /*-------------------------------*/

})(window);
