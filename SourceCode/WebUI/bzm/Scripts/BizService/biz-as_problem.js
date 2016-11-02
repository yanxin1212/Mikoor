(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----售后问题-----
    */
    sm.as_problem = function () {
        var obj = new sm.as_problem.fn.init();
        return obj;
    };
    sm.as_problem.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增售后问题 */
        newAS_Problem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewAS_Problem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改售后问题 */
        modifyAS_Problem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyAS_Problem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除售后问题 */
        deleteAS_Problem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteAS_Problem", { AS_Problem_Id: this.AS_Problem_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 生效 */
        submitASProblem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SubmitASProblem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        loseReceiveRet: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("LoseReceiveRet", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        closeASProblem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CloseASProblem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readASProblemForModify: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadASProblemForModify", { AS_Problem_Id: this.AS_Problem_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readASProblem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadASProblem", { AS_Problem_Id: this.AS_Problem_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSOGProductForASP: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSOGProductForASP", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryASProblem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryASProblem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryASProductForReceive: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryASProductForReceive", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getASProblemStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetASProblemStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.as_problem.fn.init.prototype = sm.as_problem.fn;
    /*-------------------------------*/

})(window);