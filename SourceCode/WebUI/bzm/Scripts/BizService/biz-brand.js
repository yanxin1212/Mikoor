(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }

    /*
    -----品牌-----
    */
    pdm.brand = function () {
        var obj = new pdm.brand.fn.init();
        return obj;
    };
    pdm.brand.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增品牌 */
        newBrand: function (fileCtrl, successFunc, errorFunc) {

            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            if (!$("#" + fileCtrl.ctrlId).val()) {
                var handlerObj = new webhandler.webTransferObj("NewBrand", this);
                webhandler.ajaxHandler.bizRequest(handlerObj, context);
            }
            else {
                var handlerObj = new webhandler.webTransferObj("NewBrandForFile", this);
                fileCtrl.uploadFile(handlerObj, context);
            }

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改品牌 */
        modifyBrand: function (fileCtrl, successFunc, errorFunc) {

            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            if (!$("#" + fileCtrl.ctrlId).val()) {
                var handlerObj = new webhandler.webTransferObj("ModifyBrand", this);
                webhandler.ajaxHandler.bizRequest(handlerObj, context);
            }
            else {
                var handlerObj = new webhandler.webTransferObj("ModifyBrandForFile", this);
                fileCtrl.uploadFile(handlerObj, context);
            }

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除品牌 */
        deleteBrand: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteBrand", { Brand_Id: this.Brand_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取品牌 */
        readBrand: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadBrand", { Brand_Id: this.Brand_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有品牌 */
        getAllBrands: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllBrand");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    pdm.brand.fn.init.prototype = pdm.brand.fn;
    /*-------------------------------*/

})(window);
