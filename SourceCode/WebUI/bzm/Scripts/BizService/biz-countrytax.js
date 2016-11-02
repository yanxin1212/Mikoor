(function (window) {

    if (!window.lstm) {
        window.lstm = {};
    }
    /*
    -----国家税务-----
    */
    lstm.countrytax = function () {
        var obj = new lstm.countrytax.fn.init();
        return obj;
    };
    lstm.countrytax.fn = {
        /* 构造函数 */
        init: function () {
            this.CountryTax_Id;
            this.GlobalArea_Id;
            this.TaxLimit;
            this.Remark;
        },

        /* 新增国家税务 */
        newCountryTax: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCountryTax", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改国家税务 */
        modifyCountryTax: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCountryTax", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有国家税务 */
        getAllCountryTaxs: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllCountryTax", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    lstm.countrytax.fn.init.prototype = lstm.countrytax.fn;
    /*-------------------------------*/

})(window);
