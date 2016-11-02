(function (window) {

    if (!window.lstm) {
        window.lstm = {};
    }
    /*
    -----�����������-----
    */
    lstm.lstsolution = function () {
        var obj = new lstm.lstsolution.fn.init();
        return obj;
    };
    lstm.lstsolution.fn = {
        /* ���캯�� */
        init: function () { },

        /* ��������������� */
        newLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸������������ */
        modifyLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ������������� */
        deleteLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteLstSolution", { LstSolution_Id: this.LstSolution_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ����������� */
        readLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadLstSolution", { LstSolution_Id: this.LstSolution_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadLstSolutionItem", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ����������� */
        queryLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /* ��ѯ�˷� */
        queryLstCharge: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryLstCharge", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ѯ�˷� */
        queryOptimalLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryOptimalLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ�˷���ϸ��Ŀ */
        getLstSolutionItems: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetLstSolutionItems", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �����������������ϸ */
        newLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewLstSolutionItem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸��������������ϸ */
        modifyLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyLstSolutionItem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ɾ���������������ϸ */
        deleteLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteLstSolutionItem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �����˷Ѽ۸� */
        exportLstSolutionPrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportLstSolutionPrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �����˷Ѽ۸� */
        importLstSolutionPrice: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportLstSolutionPrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* �����˷� */
        exportLstCharges: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportLstCharges", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    lstm.lstsolution.fn.init.prototype = lstm.lstsolution.fn;
    /*-------------------------------*/

})(window);
