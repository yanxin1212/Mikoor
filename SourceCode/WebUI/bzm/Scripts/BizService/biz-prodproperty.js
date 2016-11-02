(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----商品属性-----
    */
    pdm.prodproperty = function () {
        var obj = new pdm.prodproperty.fn.init();
        return obj;
    };
    pdm.prodproperty.fn = {
        /* 构造函数 */
        init: function () {
            this.ProdProperty_Id;
            this.ProdPropName;
            this.PValueIdRange;
            this.PropValues;
            this.Product_Id;
        },

        /* 新增商品属性 */
        newProdProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewProdProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改商品属性 */
        modifyProdProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProdProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);


            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除商品属性 */
        deleteProdProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProdProperty", { ProdProperty_Id: this.ProdProperty_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);


            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取商品属性 */
        readProdProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProdProperty", { ProdProperty_Id: this.ProdProperty_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有商品属性 */
        getAllProdPropertys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllProdProperty");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品属性 */
        queryPropValueByProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryPropValueByProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 上传商品属性图片 */
        uploadPropPic: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("UploadPropPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    pdm.prodproperty.fn.init.prototype = pdm.prodproperty.fn;
    /*-------------------------------*/

})(window);
