(function (window) {

    if (!window.um) {
        window.um = {};
    }
    /*
    -----ϵͳ�û�-----
    */
    um.sysuser = function () {
        var obj = new um.sysuser.fn.init();
        return obj;
    };
    um.sysuser.fn = {
        /* ���캯�� */
        init: function () { },

        /* ����ϵͳ�û� */
        newSysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSysUser", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸�ϵͳ�û� */
        modifySysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySysUser", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ��ϵͳ�û� */
        deleteSysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSysUser", { SysUser_Id: this.SysUser_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡϵͳ�û� */
        readSysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSysUser", { SysUser_Id: this.SysUser_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡϵͳ�û� */
        querySysUsers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysUsers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    um.sysuser.fn.init.prototype = um.sysuser.fn;
    /*-------------------------------*/

})(window);
