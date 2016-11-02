(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----������Ʒ-----
    */
    sm.ss_product = function () {
        var obj = new sm.ss_product.fn.init();
        return obj;
    };
    sm.ss_product.fn = {
        /* ���캯�� */
        init: function () { },

        /* ����������Ʒ */
        newSS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSS_Product", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸�������Ʒ */
        modifySS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySS_Product", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸�������ƷͼƬ��� */
        modifySSProdPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySSProdPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �ϴ���ƷͼƬ */
        uploadSSProdPic: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("UploadSSProdPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* ɾ��������Ʒ */
        deleteSS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSS_Product", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �������ͼ۸� */
        exportProductExpServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ������Ʒ */
        importSSProducts: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ������Ʒ��� */
        importSSProductSeq: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSSProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* �������ͼ۸� */
        importProductExpServices: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportProductExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* ��ȡ������Ʒ */
        readSS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSS_Product", { SS_Product_Id: this.SS_Product_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ������Ʒ */
        querySSProductByInnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySSProductByInnerProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ҳ��ѯ������Ʒ */
        querySSProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ������Ʒ */
        exportSSProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ����Wish��Ʒ */
        exportWishProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportWishProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ������Ʒ��� */
        exportSSProductSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSSProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ������Ʒ���� */
        exportProductProfit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductProfit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ���� */
        queryProdProfit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProdProfit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySSProdSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySSProdSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        refreshProdProfit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("RefreshProdProfit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        syncSSProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SyncSSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importSSProductByPicture: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSSProductByPicture", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSMTGroupAndProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSMTGroupAndProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        syncSMTProductList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SyncSMTProductList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        generateSSProdRemark: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSSProdRemark", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readSSProductRemark: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSSProductRemark", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readSSProductPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSSProductPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readSSProductWithMainPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSSProductWithMainPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        publishSMTProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("PublishSMTProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        checkSMTProductProhibitedWords: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CheckSMTProductProhibitedWords", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        batchPublishSMTProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("BatchPublishSMTProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        checkProhibitedWords: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CheckProhibitedWords", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    sm.ss_product.fn.init.prototype = sm.ss_product.fn;
    /*-------------------------------*/

})(window);
