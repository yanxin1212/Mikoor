(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----��ʱ�ϴ�ͼƬ-----
    */
    pdm.tempuploadpic = function () {
        var obj = new pdm.tempuploadpic.fn.init();
        return obj;
    };
    pdm.tempuploadpic.fn = {
        /* ���캯�� */
        init: function () {
            this.TempUploadPic_Id;
            this.Seq;
            this.PicUrl;
            this.IsMain;
            this.Color;
            this.User_Id;
            this.SalePlatform_Id;
            this.SaleSite_Id;
        },

        /* �޸���ʱ�ϴ�ͼƬ */
        modifyTempUploadPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyTempUploadPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ����ʱ�ϴ�ͼƬ */
        deleteTempUploadPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteTempUploadPic", { TempUploadPic_Id: this.TempUploadPic_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ����ʱ�ϴ�ͼƬ */
        clearTempUploadPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ClearTempUploadPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��ʱ�ϴ�ͼƬ */
        getTempUploadPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTempUploadPics", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    successFunc(paramObj);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.tempuploadpic.fn.init.prototype = pdm.tempuploadpic.fn;
    /*-------------------------------*/

})(window);
