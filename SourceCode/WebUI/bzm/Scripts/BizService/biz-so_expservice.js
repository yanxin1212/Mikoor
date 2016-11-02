(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售订单配送-----
    */
    sm.so_expservice = function () {
        var obj = new sm.so_expservice.fn.init();
        return obj;
    };
    sm.so_expservice.fn = {
        /* 构造函数 */
        init: function () {
            this.SO_ExpService_Id;
            this.SaleOrder_Id;
            this.Weight;
            this.Length;
            this.Width;
            this.Height;
            this.ExpressService_Id;
            this.ExpressServiceName;
            this.ExpServicePrice;
            this.ShipFromTime;
            this.ShipToTime;
            this.LstSolution_Id;
            this.LstCompanyName;
            this.LstSolutionName;
            this.ExpServiceCost;
            this.DeliveryCompany;
            this.TrackingNumber;
            this.RvFullName;
            this.RvTel;
            this.GlobalArea_Id;
            this.RvCountry;
            this.RvProvince;
            this.RvCity;
            this.RvPostCode;
            this.RvAddress_1;
            this.RvAddress_2;
        },

        /* 新增销售订单配送 */
        newSO_ExpService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSO_ExpService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改销售订单配送 */
        modifySO_ExpService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySO_ExpService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除销售订单配送 */
        deleteSO_ExpService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSO_ExpService", { SO_ExpService_Id: this.SO_ExpService_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取销售订单配送 */
        readSO_ExpService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSO_ExpService", { SO_ExpService_Id: this.SO_ExpService_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有销售订单配送 */
        getAllSO_ExpServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSO_ExpService");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.so_expservice.fn.init.prototype = sm.so_expservice.fn;
    /*-------------------------------*/

})(window);
