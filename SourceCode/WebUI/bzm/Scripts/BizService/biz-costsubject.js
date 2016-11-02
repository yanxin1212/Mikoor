(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----�ɱ���Ŀ-----
    */
    fm.costsubject = function () {
        var obj = new fm.costsubject.fn.init();
        return obj;
    };
    fm.costsubject.fn = {
        /* ���캯�� */
        init: function () {
            this.CostSubject_Id;
            this.ParentCostSubject_Id;
            this.Seq;
            this.Layer;
            this.CostSubjectName;
            this.CostSubjectIndexs;
        },

        /* �����ɱ���Ŀ */
        newCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCostSubject", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸ĳɱ���Ŀ */
        modifyCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCostSubject", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸ĳɱ���Ŀ����� */
        modifyCostSubjectSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCostSubjectSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ���ɱ���Ŀ */
        deleteCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteCostSubject", { CostSubject_Id: this.CostSubject_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�ɱ���Ŀ */
        readCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadCostSubject", { CostSubject_Id: this.CostSubject_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���гɱ���Ŀ */
        getAllCostSubjects: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllCostSubject");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.costsubject.fn.init.prototype = fm.costsubject.fn;
    /*-------------------------------*/

})(window);
