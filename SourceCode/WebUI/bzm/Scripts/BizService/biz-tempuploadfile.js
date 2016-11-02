(function (window) {

    if (!window.sys) {
        window.sys = {};
    }
    /*
    -----��ʱ�ϴ��ļ�-----
    */
    sys.tempuploadfile = function () {
        var obj = new sys.tempuploadfile.fn.init();
        return obj;
    };
    sys.tempuploadfile.fn = {
        /* ���캯�� */
        init: function () {
            this.TempUploadFile_Id;
            this.Object;
            this.FileUrl;
            this.SysUser_Id;
        },

        /* ������ʱ�ϴ��ļ� */
        newTempUploadFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewTempUploadFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸���ʱ�ϴ��ļ� */
        modifyTempUploadFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyTempUploadFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ����ʱ�ϴ��ļ� */
        deleteTempUploadFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteTempUploadFile", { TempUploadFile_Id: this.TempUploadFile_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ��ʱ�ϴ��ļ� */
        readTempUploadFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadTempUploadFile", { TempUploadFile_Id: this.TempUploadFile_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ������ʱ�ϴ��ļ� */
        getTempUploadFiles: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTempUploadFiles", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sys.tempuploadfile.fn.init.prototype = sys.tempuploadfile.fn;
    /*-------------------------------*/

})(window);
