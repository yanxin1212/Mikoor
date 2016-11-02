(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----成本科目-----
    */
    fm.costsubject = function () {
        var obj = new fm.costsubject.fn.init();
        return obj;
    };
    fm.costsubject.fn = {
        /* 构造函数 */
        init: function () {
            this.CostSubject_Id;
            this.ParentCostSubject_Id;
            this.Seq;
            this.Layer;
            this.CostSubjectName;
            this.CostSubjectIndexs;
        },

        /* 新增成本科目 */
        newCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCostSubject", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改成本科目 */
        modifyCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCostSubject", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改成本科目的序号 */
        modifyCostSubjectSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCostSubjectSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除成本科目 */
        deleteCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteCostSubject", { CostSubject_Id: this.CostSubject_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取成本科目 */
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

        /* 获取所有成本科目 */
        getAllCostSubjects: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllCostSubject");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.costsubject.fn.init.prototype = fm.costsubject.fn;
    /*-------------------------------*/

})(window);
