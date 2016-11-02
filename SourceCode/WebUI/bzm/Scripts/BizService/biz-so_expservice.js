(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----���۶�������-----
    */
    sm.so_expservice = function () {
        var obj = new sm.so_expservice.fn.init();
        return obj;
    };
    sm.so_expservice.fn = {
        /* ���캯�� */
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

        /* �������۶������� */
        newSO_ExpService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSO_ExpService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸����۶������� */
        modifySO_ExpService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySO_ExpService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ�����۶������� */
        deleteSO_ExpService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSO_ExpService", { SO_ExpService_Id: this.SO_ExpService_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���۶������� */
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

        /* ��ȡ�������۶������� */
        getAllSO_ExpServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSO_ExpService");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.so_expservice.fn.init.prototype = sm.so_expservice.fn;
    /*-------------------------------*/

})(window);
