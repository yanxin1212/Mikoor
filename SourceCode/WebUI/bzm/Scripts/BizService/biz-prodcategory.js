(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----��Ʒ����-----
    */
    pdm.prodcategory = function () {
        var obj = new pdm.prodcategory.fn.init();
        return obj;
    };
    pdm.prodcategory.fn = {
        /* ���캯�� */
        init: function () { },

        /* ������Ʒ���� */
        newProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewProdCategory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸���Ʒ���� */
        modifyProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProdCategory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸���Ʒ������� */
        modifyPdcCode: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcCode", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸���Ʒ�������� */
        modifyPdcSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ����Ʒ���� */
        deleteProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProdCategory", { ProdCategory_Id: this.ProdCategory_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ��Ʒ���� */
        readProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProdCategory", { ProdCategory_Id: this.ProdCategory_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ������Ʒ���� */
        getAllProdCategorys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllProdCategory");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    pdm.prodcategory.fn.init.prototype = pdm.prodcategory.fn;
    /*-------------------------------*/

})(window);
