(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----�ۺ�����-----
    */
    sm.as_problem = function () {
        var obj = new sm.as_problem.fn.init();
        return obj;
    };
    sm.as_problem.fn = {
        /* ���캯�� */
        init: function () { },

        /* �����ۺ����� */
        newAS_Problem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewAS_Problem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸��ۺ����� */
        modifyAS_Problem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyAS_Problem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ���ۺ����� */
        deleteAS_Problem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteAS_Problem", { AS_Problem_Id: this.AS_Problem_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��Ч */
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