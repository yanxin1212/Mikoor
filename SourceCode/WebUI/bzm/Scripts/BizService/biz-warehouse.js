(function (window) {

    if (!window.whm) {
        window.whm = {};
    }
    /*
    -----�ֿ�-----
    */
    whm.warehouse = function () {
        var obj = new whm.warehouse.fn.init();
        return obj;
    };
    whm.warehouse.fn = {
        /* ���캯�� */
        init: function () { },

        /* �����ֿ� */
        newWarehouse: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewWarehouse", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸Ĳֿ� */
        modifyWarehouse: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyWarehouse", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* �޸Ĳֿ����� */
        modifyWarehouseSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyWarehouseSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ɾ���ֿ� */
        deleteWarehouse: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteWarehouse", { Warehouse_Id: this.Warehouse_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* ����������������� */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* ��ȡ���вֿ� */
        getAllWarehouses: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllWarehouse");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    whm.warehouse.fn.init.prototype = whm.warehouse.fn;
    /*-------------------------------*/

})(window);
