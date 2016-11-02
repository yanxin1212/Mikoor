(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }

    /*
    -----品牌分类-----
    */
    pdm.brandtype = function () {
        var obj = new pdm.brandtype.fn.init();
        return obj;
    };
    pdm.brandtype.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增品牌分类 */
        newBrandType: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewBrandType", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改品牌分类 */
        modifyBrandType: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyBrandType", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除品牌分类 */
        deleteBrandType: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteBrandType", { BrandType_Id: this.BrandType_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取品牌分类 */
        readBrandType: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadBrandType", { BrandType_Id: this.BrandType_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有品牌分类 */
        getAllBrandTypes: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllBrandType");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.brandtype.fn.init.prototype = pdm.brandtype.fn;
    /*-------------------------------*/

})(window);
