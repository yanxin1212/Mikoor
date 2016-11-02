(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----��Ʒ��浥Ԫ-----
    */
    pdm.skuproduct = function () {
        var obj = new pdm.skuproduct.fn.init();
        return obj;
    };
    pdm.skuproduct.fn = {
        /* ���캯�� */
        init: function () {
            this.SkuProduct_Id;
            this.Product_Id;
            this.ProdCode;
            this.SkuPropValues;
            this.Quotiety;
            this.Stock;
        },

        /* ������Ʒ��浥Ԫ */
        newSkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSkuProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸Ĳ�Ʒ��浥Ԫ */
        modifySkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySkuProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ����Ʒ��浥Ԫ */
        deleteSkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSkuProduct", { SkuProduct_Id: this.SkuProduct_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��Ʒ��浥Ԫ */
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

        /* ��ȡ���в�Ʒ��浥Ԫ */
        getAllSkuProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSkuProduct");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.skuproduct.fn.init.prototype = pdm.skuproduct.fn;
    /*-------------------------------*/

})(window);
