(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----��Ʒ����-----
    */
    pdm.prodproperty = function () {
        var obj = new pdm.prodproperty.fn.init();
        return obj;
    };
    pdm.prodproperty.fn = {
        /* ���캯�� */
        init: function () {
            this.ProdProperty_Id;
            this.ProdPropName;
            this.PValueIdRange;
            this.PropValues;
            this.Product_Id;
        },

        /* ������Ʒ���� */
        newProdProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewProdProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸���Ʒ���� */
        modifyProdProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProdProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);


            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ����Ʒ���� */
        deleteProdProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProdProperty", { ProdProperty_Id: this.ProdProperty_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);


            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ��Ʒ���� */
        readProdProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProdProperty", { ProdProperty_Id: this.ProdProperty_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ������Ʒ���� */
        getAllProdPropertys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllProdProperty");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��Ʒ���� */
        queryPropValueByProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryPropValueByProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �ϴ���Ʒ����ͼƬ */
        uploadPropPic: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("UploadPropPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    pdm.prodproperty.fn.init.prototype = pdm.prodproperty.fn;
    /*-------------------------------*/

})(window);
