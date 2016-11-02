(function (window) {

    if (!window.um) {
        window.um = {};
    }
    /*
    -----系统用户-----
    */
    um.sysuser = function () {
        var obj = new um.sysuser.fn.init();
        return obj;
    };
    um.sysuser.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增系统用户 */
        newSysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSysUser", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改系统用户 */
        modifySysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySysUser", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除系统用户 */
        deleteSysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSysUser", { SysUser_Id: this.SysUser_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取系统用户 */
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

        /* 获取系统用户 */
        querySysUsers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysUsers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    um.sysuser.fn.init.prototype = um.sysuser.fn;
    /*-------------------------------*/

})(window);
