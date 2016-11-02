(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----商品分类-属性-----
    */
    pdm.pdcproperty = function () {
        var obj = new pdm.pdcproperty.fn.init();
        return obj;
    };
    pdm.pdcproperty.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增商品分类-属性 */
        newPdcProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewPdcProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改商品分类-属性 */
        modifyPdcProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除商品分类-属性 */
        deletePdcProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeletePdcProperty", { PdcProperty_Id: this.PdcProperty_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取商品分类-属性 */
        readPdcProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadPdcProperty", { PdcProperty_Id: this.PdcProperty_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品分类的属性 */
        getPdcProps: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetPdcProps", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    pdm.pdcproperty.fn.init.prototype = pdm.pdcproperty.fn;
    /*-------------------------------*/

})(window);
