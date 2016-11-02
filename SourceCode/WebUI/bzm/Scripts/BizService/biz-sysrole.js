(function (window) {

    if (!window.um) {
        window.um = {};
    }
    /*
    -----系统角色-----
    */
    um.sysrole = function () {
        var obj = new um.sysrole.fn.init();
        return obj;
    };
    um.sysrole.fn = {
        /* 构造函数 */
        init: function () {
        },

        /* 获取所有系统角色 */
        queryAllSysRoles: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSysRoles");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    um.sysrole.fn.init.prototype = um.sysrole.fn;
    /*-------------------------------*/

})(window);