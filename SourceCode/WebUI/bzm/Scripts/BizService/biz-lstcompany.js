(function (window) {

    if (!window.lstm) {
        window.lstm = {};
    }
    /*
    -----������˾-----
    */
    lstm.lstcompany = function () {
        var obj = new lstm.lstcompany.fn.init();
        return obj;
    };
    lstm.lstcompany.fn = {
        /* ���캯�� */
        init: function () {
            this.LstCompany_Id;
            this.LstCompanyName;
            this.WebAddress;
        },

        /* ����������˾ */
        newLstCompany: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewLstCompany", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸�������˾ */
        modifyLstCompany: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyLstCompany", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ��������˾ */
        deleteLstCompany: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteLstCompany", { LstCompany_Id: this.LstCompany_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ������˾ */
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

        /* ��ȡ����������˾ */
        getAllLstCompanys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllLstCompany");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    lstm.lstcompany.fn.init.prototype = lstm.lstcompany.fn;
    /*-------------------------------*/

})(window);
