(function (window) {

    if (!window.sys) {
        window.sys = {};
    }
    /*
    -----临时上传文件-----
    */
    sys.tempuploadfile = function () {
        var obj = new sys.tempuploadfile.fn.init();
        return obj;
    };
    sys.tempuploadfile.fn = {
        /* 构造函数 */
        init: function () {
            this.TempUploadFile_Id;
            this.Object;
            this.FileUrl;
            this.SysUser_Id;
        },

        /* 新增临时上传文件 */
        newTempUploadFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewTempUploadFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改临时上传文件 */
        modifyTempUploadFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyTempUploadFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除临时上传文件 */
        deleteTempUploadFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteTempUploadFile", { TempUploadFile_Id: this.TempUploadFile_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取临时上传文件 */
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

        /* 获取所有临时上传文件 */
        getTempUploadFiles: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTempUploadFiles", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sys.tempuploadfile.fn.init.prototype = sys.tempuploadfile.fn;
    /*-------------------------------*/

})(window);
