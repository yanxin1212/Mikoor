(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----���۶���-������Ϣ-----
    */
    sm.so_costum = function () {
        var obj = new sm.so_costum.fn.init();
        return obj;
    };
    sm.so_costum.fn = {
        /* ���캯�� */
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

        /* �������۶���-������Ϣ */
        newSO_Costum: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSO_Costum", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸����۶���-������Ϣ */
        modifySO_Costum: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySO_Costum", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ�����۶���-������Ϣ */
        deleteSO_Costum: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSO_Costum", { SO_Costum_Id: this.SO_Costum_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���۶���-������Ϣ */
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

        /* ��ȡ�������۶���-������Ϣ */
        getAllSO_Costums: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSO_Costum");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.so_costum.fn.init.prototype = sm.so_costum.fn;
    /*-------------------------------*/

})(window);
