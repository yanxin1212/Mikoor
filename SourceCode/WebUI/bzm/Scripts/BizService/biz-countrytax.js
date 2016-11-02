(function (window) {

    if (!window.lstm) {
        window.lstm = {};
    }
    /*
    -----����˰��-----
    */
    lstm.countrytax = function () {
        var obj = new lstm.countrytax.fn.init();
        return obj;
    };
    lstm.countrytax.fn = {
        /* ���캯�� */
        init: function () {
            this.CountryTax_Id;
            this.GlobalArea_Id;
            this.TaxLimit;
            this.Remark;
        },

        /* ��������˰�� */
        newCountryTax: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCountryTax", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* �޸Ĺ���˰�� */
        modifyCountryTax: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCountryTax", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* ��ȡ���й���˰�� */
        getAllCountryTaxs: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllCountryTax", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    lstm.countrytax.fn.init.prototype = lstm.countrytax.fn;
    /*-------------------------------*/

})(window);
