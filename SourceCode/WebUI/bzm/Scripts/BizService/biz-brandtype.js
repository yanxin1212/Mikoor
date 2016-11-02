(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }

    /*
    -----Ʒ�Ʒ���-----
    */
    pdm.brandtype = function () {
        var obj = new pdm.brandtype.fn.init();
        return obj;
    };
    pdm.brandtype.fn = {
        /* ���캯�� */
        init: function () { },

        /* ����Ʒ�Ʒ��� */
        newBrandType: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewBrandType", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸�Ʒ�Ʒ��� */
        modifyBrandType: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyBrandType", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ��Ʒ�Ʒ��� */
        deleteBrandType: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteBrandType", { BrandType_Id: this.BrandType_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡƷ�Ʒ��� */
        readBrandType: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadBrandType", { BrandType_Id: this.BrandType_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ����Ʒ�Ʒ��� */
        getAllBrandTypes: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllBrandType");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.brandtype.fn.init.prototype = pdm.brandtype.fn;
    /*-------------------------------*/

})(window);
