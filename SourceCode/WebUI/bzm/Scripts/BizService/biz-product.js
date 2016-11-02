(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----��Ʒ������Ϣ-----
    */
    pdm.product = function () {
        var obj = new pdm.product.fn.init();
        return obj;
    };
    pdm.product.fn = {
        /* ���캯�� */
        init: function () { },

        /* ������Ʒ������Ϣ */
        newProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸���Ʒ������Ϣ */
        modifyProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �ϴ���ƷͼƬ */
        uploadProdPicFile: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("UploadProdPicFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* �����ƷͼƬ */
        addProdPicFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AddProdPicFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �����ƷͼƬ */
        addProdPicFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AddProdPicFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ����Ʒ������Ϣ */
        deleteProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProduct", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ��Ʒ������Ϣ */
        readProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProduct", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��Ʒ������Ϣ */
        readProductWithQuotedPrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProductWithQuotedPrice", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��Ʒ������� */
        getProdSeqCount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetProdSeqCount", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ��Ʒ������Ϣ */
        queryProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryProdSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProdSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ��ƷSku */
        getSkuProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSkuProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ������ƷͼƬ */
        clearProdPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ClearProdPics", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��ƷͼƬ */
        modifyProdPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProdPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ����ƷͼƬ */
        deleteProdPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProdPic", { Product_Pic_Id: this.Product_Pic_Id, Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��ƷͼƬ */
        getProdPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetProdPics", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /* ������Ʒ */
        exportProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ������Ʒ */
        importProducts: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },
        
        /* ������Ʒ��� */
        exportProductSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ������Ʒ��� */
        importProductSeq: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* ������ƷͼƬ */
        exportProductPicture: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductPicture", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        covertStandProdPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CovertStandProdPics", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.product.fn.init.prototype = pdm.product.fn;
    /*-------------------------------*/

})(window);
