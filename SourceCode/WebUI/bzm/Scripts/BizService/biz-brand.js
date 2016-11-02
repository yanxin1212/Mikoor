(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }

    /*
    -----Ʒ��-----
    */
    pdm.brand = function () {
        var obj = new pdm.brand.fn.init();
        return obj;
    };
    pdm.brand.fn = {
        /* ���캯�� */
        init: function () { },

        /* ����Ʒ�� */
        newBrand: function (fileCtrl, successFunc, errorFunc) {

            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            if (!$("#" + fileCtrl.ctrlId).val()) {
                var handlerObj = new webhandler.webTransferObj("NewBrand", this);
                webhandler.ajaxHandler.bizRequest(handlerObj, context);
            }
            else {
                var handlerObj = new webhandler.webTransferObj("NewBrandForFile", this);
                fileCtrl.uploadFile(handlerObj, context);
            }

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸�Ʒ�� */
        modifyBrand: function (fileCtrl, successFunc, errorFunc) {

            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            if (!$("#" + fileCtrl.ctrlId).val()) {
                var handlerObj = new webhandler.webTransferObj("ModifyBrand", this);
                webhandler.ajaxHandler.bizRequest(handlerObj, context);
            }
            else {
                var handlerObj = new webhandler.webTransferObj("ModifyBrandForFile", this);
                fileCtrl.uploadFile(handlerObj, context);
            }

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ��Ʒ�� */
        deleteBrand: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteBrand", { Brand_Id: this.Brand_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡƷ�� */
        readBrand: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadBrand", { Brand_Id: this.Brand_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ����Ʒ�� */
        getAllBrands: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllBrand");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    pdm.brand.fn.init.prototype = pdm.brand.fn;
    /*-------------------------------*/

})(window);
