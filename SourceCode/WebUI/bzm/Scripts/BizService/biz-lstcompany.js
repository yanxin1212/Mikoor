(function (window) {

    if (!window.lstm) {
        window.lstm = {};
    }
    /*
    -----物流公司-----
    */
    lstm.lstcompany = function () {
        var obj = new lstm.lstcompany.fn.init();
        return obj;
    };
    lstm.lstcompany.fn = {
        /* 构造函数 */
        init: function () {
            this.LstCompany_Id;
            this.LstCompanyName;
            this.WebAddress;
        },

        /* 新增物流公司 */
        newLstCompany: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewLstCompany", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改物流公司 */
        modifyLstCompany: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyLstCompany", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除物流公司 */
        deleteLstCompany: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteLstCompany", { LstCompany_Id: this.LstCompany_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取物流公司 */
        readLstCompany: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadLstCompany", { LstCompany_Id: this.LstCompany_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有物流公司 */
        getAllLstCompanys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllLstCompany");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    lstm.lstcompany.fn.init.prototype = lstm.lstcompany.fn;
    /*-------------------------------*/

})(window);
