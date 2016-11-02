(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----账号资金-----
    */
    fm.accountfund = function () {
        var obj = new fm.accountfund.fn.init();
        return obj;
    };
    fm.accountfund.fn = {
        /* 构造函数 */
        init: function () { },

        /* 获取所有账号资金 */
        getAllAccountFunds: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllAccountFund");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有账号资金 */
        queryAllAccountFundTable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllAccountFundTable");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取有效账号资金 */
        queryAvaiAccountFundTable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAvaiAccountFundTable");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有账号 */
        getAllAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAllAccount");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取有效的账号 */
        getAvailableAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAvailableAccount");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取统计资金 */
        queryTotalFund: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryTotalFund");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.accountfund.fn.init.prototype = fm.accountfund.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----财务收入-----
    */
    fm.accountinrecord = function () {
        var obj = new fm.accountinrecord.fn.init();
        return obj;
    };
    fm.accountinrecord.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增财务收入 */
        handlerAccountInRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlerAccountInRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入Paypal账目 */
        importAIFromPaypal: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportAIFromPaypal", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导入速卖通账目 */
        importAIFromAliExpress: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportAIFromAliExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导入淘宝账目 */
        importAIFromTaobao: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportAIFromTaobao", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导入账单 */
        importReceiveBill: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportReceiveBill", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 撤消财务收入 */
        cancelAccountInRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CancelAccountInRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        batchCancelAIR: function (keyword, airType, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("BatchCancelAIR", { Keyword: keyword, AIRType: airType, SalePlatformId: shoppingSiteId,
                SaleSite_Id: salesite_id, SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        abortAccountInRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AbortAccountInRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取财务收入 */
        readAccountInRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadAccountInRecord", { AccountInRecord_Id: this.AccountInRecord_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询财务收入 */
        queryAccountInRecord: function (keyword, airType, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            page, pageNum, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAccountInRecord", { Keyword: keyword, AIRType: airType, SalePlatformId: shoppingSiteId,
                SaleSite_Id: salesite_id, SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime, Page: page, PageNum: pageNum,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 到处财务收入 */
        exportAccountInRecord: function (keyword, airType, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAccoutInRecord", { Keyword: keyword, AIRType: airType, SalePlatformId: shoppingSiteId,
                SaleSite_Id: salesite_id, SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取待收入的资金 */
        getWaitingReceive: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitingReceive", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.accountinrecord.fn.init.prototype = fm.accountinrecord.fn;
    /*-------------------------------*/

})(window);


(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----财务支出-----
    */
    fm.accountoutrecord = function () {
        var obj = new fm.accountoutrecord.fn.init();
        return obj;
    };
    fm.accountoutrecord.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增财务支出 */
        handlerAccountOutRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlerAccountOutRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        abortAccountOutRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AbortAccountOutRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入账单 */
        importPayBill: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPayBill", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 撤消财务支出 */
        cancelAccountOutRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CancelAccountOutRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 批量撤消财务支出 */
        batchCancelAOR: function (keyword, costSubjectId, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth, 
            successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("BatchCancelAOR", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取财务支出 */
        readAccountOutRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadAccountOutRecord", { AccountOutRecord_Id: this.AccountOutRecord_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询财务支出 */
        queryAccountOutRecord: function (keyword, costSubjectId, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            page, pageNum, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAccountOutRecord", { Keyword: keyword, CostSubjectId: costSubjectId, SalePlatform_Id: shoppingSiteId, SaleSite_Id: salesite_id,
                SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime, Page: page, PageNum: pageNum,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出财务支出 */
        exportAccoutOutRecord: function (keyword, costSubjectId, shoppingSiteId, salesite_id, sysCurrency_Id, state, fromTime, toTime, accountYear, accountMonth,
            successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAccoutOutRecord", { Keyword: keyword, CostSubjectId: costSubjectId, SalePlatform_Id: shoppingSiteId, SaleSite_Id: salesite_id,
                SysCurrency_Id: sysCurrency_Id, State: state, FromTime: fromTime, ToTime: toTime,
                AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取待支付的资金 */
        getWaitingPaid: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitingPaid", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.accountoutrecord.fn.init.prototype = fm.accountoutrecord.fn;
    /*-------------------------------*/

})(window);


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

(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----成本科目-----
    */
    fm.costsubject = function () {
        var obj = new fm.costsubject.fn.init();
        return obj;
    };
    fm.costsubject.fn = {
        /* 构造函数 */
        init: function () {
            this.CostSubject_Id;
            this.ParentCostSubject_Id;
            this.Seq;
            this.Layer;
            this.CostSubjectName;
            this.CostSubjectIndexs;
        },

        /* 新增成本科目 */
        newCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCostSubject", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改成本科目 */
        modifyCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCostSubject", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改成本科目的序号 */
        modifyCostSubjectSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCostSubjectSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除成本科目 */
        deleteCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteCostSubject", { CostSubject_Id: this.CostSubject_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取成本科目 */
        readCostSubject: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadCostSubject", { CostSubject_Id: this.CostSubject_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有成本科目 */
        getAllCostSubjects: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllCostSubject");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.costsubject.fn.init.prototype = fm.costsubject.fn;
    /*-------------------------------*/

})(window);
(function (window) {

    if (!window.cm) {
        window.cm = {};
    }
    /*
    -----客户-----
    */
    cm.customer = function () {
        var obj = new cm.customer.fn.init();
        return obj;
    };
    cm.customer.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增客户 */
        newCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCustomer", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改客户 */
        modifyCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCustomer", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除客户 */
        deleteCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteCustomer", { Customer_Id: this.Customer_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取客户 */
        readCustomer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadCustomer", { Customer_Id: this.Customer_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取客户 */
        queryCustomers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCustomers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    cm.customer.fn.init.prototype = cm.customer.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.cm) {
        window.cm = {};
    }
    /*
    -----客户分组-----
    */
    cm.customergroup = function () {
        var obj = new cm.customergroup.fn.init();
        return obj;
    };
    cm.customergroup.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增客户分组 */
        newCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewCustomerGroup", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改客户分组 */
        modifyCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyCustomerGroup", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除客户分组 */
        deleteCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteCustomerGroup", { CustomerGroup_Id: this.CustomerGroup_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取客户分组 */
        readCustomerGroup: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadCustomerGroup", { CustomerGroup_Id: this.CustomerGroup_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取客户分组 */
        queryCustomerGroups: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCustomerGroups");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    cm.customergroup.fn.init.prototype = cm.customergroup.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----配送服务-----
    */
    sm.expressservice = function () {
        var obj = new sm.expressservice.fn.init();
        return obj;
    };
    sm.expressservice.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增配送服务 */
        newExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改配送服务 */
        modifyExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除配送服务 */
        deleteExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteExpressService", { ExpressService_Id: this.ExpressService_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取配送服务 */
        readExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadExpressService", { ExpressService_Id: this.ExpressService_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询配送服务 */
        queryExpressServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询配送服务 */
        queryAreaExpressService: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAreaExpressService", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询区域中的服务数量 */
        queryExpServiceCountByArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpServiceCountByArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            //读取缓存
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 导出配送服务成本 */
        exportAnalyFixExpress: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAnalyFixExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出配送服务 */
        exportAnalyExpress: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportAnalyExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取配送服务的测算运费 */
        getCalFixExpress: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetCalFixExpress", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出配送服务 */
        exportExpServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入配送服务 */
        importExpServices: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 获取配送服务价格 */
        getExpServicePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetExpServicePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.expressservice.fn.init.prototype = sm.expressservice.fn;
    /*-------------------------------*/

})(window);


(function (window) {

    if (!window.fm) {
        window.fm = {};
    }

    /*
    -----财务统计报表-----
    */
    fm.financereport = function () {
        var obj = new fm.financereport.fn.init();
        return obj;
    };
    fm.financereport.fn = {
        /* 构造函数 */
        init: function () { },

        /* 获取运行情况的统计报表 */
        queryTotalOperateReport: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryTotalOperateReport");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /* 获取时间 */
        getFRTimes: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetFRTimes");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取账单站点 */
        querySaleSitesInFinance: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySaleSitesInFinance", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 账目资金列表 */
        getTotalFundsByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalFundsByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 账目收支平衡 */
        getTotalBalanceByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalBalanceByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取财务收入支出明细 */
        getTotalPayBillByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalPayBillByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取上月财务收入支出明细 */
        getLastTotalPayBillByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetLastTotalPayBillByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取财务收入明细 */
        getTotalReceiveBillByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalReceiveBillByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取上月财务收入明细 */
        getLastTotalRvBillByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetLastTotalRvBillByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取财务应收账目 */
        getTotalPayAccountByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalPayAccountByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取财务应收账目 */
        getTotalReceiveAccountByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTotalReceiveAccountByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取待支付费用 */
        getWaitPayByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitPayByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取待收资金 */
        getWaitReceiveByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitReceiveByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取资金走向 */
        getFundFlowByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetFundFlowByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取下月待收转账资金 */
        getWaitFundTransferInByTime: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWaitFundTransferInByTime", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出报表 */
        exportFinanceReport: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportFinanceReport", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.financereport.fn.init.prototype = fm.financereport.fn;
    /*-------------------------------*/
})(window);

(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----资金账号-----
    */
    fm.fundaccount = function () {
        var obj = new fm.fundaccount.fn.init();
        return obj;
    };
    fm.fundaccount.fn = {
        /* 构造函数 */
        init: function () {
            this.FundAccount_Id;
            this.Seq;
            this.Account;
            this.BankName;
            this.Owner;
            this.Remark;
        },

        /* 新增资金账号 */
        newFundAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewFundAccount", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改资金账号 */
        modifyFundAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyFundAccount", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除资金账号 */
        deleteFundAccount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteFundAccount", { FundAccount_Id: this.FundAccount_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有资金账号 */
        getAllFundAccounts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllFundAccount");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.fundaccount.fn.init.prototype = fm.fundaccount.fn;
    /*-------------------------------*/

})(window);
(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----资金流动记录-----
    */
    fm.fundflowrecord = function () {
        var obj = new fm.fundflowrecord.fn.init();
        return obj;
    };
    fm.fundflowrecord.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增资金流动记录 */
        newFundFlowRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewFundFlowRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取资金流动记录 */
        readFundFlowRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadFundFlowRecord", { FundFlowRecord_Id: this.FundFlowRecord_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取资金流动记录 */
        queryFundFlowRecord: function (keyword, action, fundAccountId, fromTime, toTime, accountYear, accountMonth, page, pageNum, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryFundFlowRecord", { Keyword: keyword, Action: action, FundAccountId: fundAccountId,
                FromTime: fromTime, ToTime: toTime, AccountYear: accountYear, AccountMonth: accountMonth, Page: page, PageNum: pageNum
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取资金流动记录 */
        getPayFundFlowRecords: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetPayFundFlowRecords", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出资金流动记录 */
        exportFundFlowRecord: function (keyword, action, fundAccountId, fromTime, toTime, accountYear, accountMonth, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportFundFlowRecord", { Keyword: keyword, Action: action, FundAccountId: fundAccountId,
                FromTime: fromTime, ToTime: toTime, AccountYear: accountYear, AccountMonth: accountMonth
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.fundflowrecord.fn.init.prototype = fm.fundflowrecord.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.fm) {
        window.fm = {};
    }
    /*
    -----资金转账-----
    */
    fm.fundtransferrecord = function () {
        var obj = new fm.fundtransferrecord.fn.init();
        return obj;
    };
    fm.fundtransferrecord.fn = {
        /* 构造函数 */
        init: function () {
            this.FundTransferRecord_Id;
            this.OutFundAccount_Id;
            this.OutSysCurrency_Id;
            this.OutFund;
            this.InFundAccount_Id;
            this.InSysCurrency_Id;
            this.InFund;
            this.LosedFund;
            this.Rate;
        },

        /* 新增资金转账 */
        newFundTransferRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewFundTransferRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 到账处理 */
        overFundTransfer: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("OverFundTransfer", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 撤消资金转账 */
        deleteFundTransferRecord: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteFundTransferRecord", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取资金转账 */
        queryFundTransferRecord: function (keyword, outfundaccount_id, outsyscurrency_id, infundaccount_id, insyscurrency_id, fromTime, toTime, page, pageNum, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryFundTransferRecord", { Keyword: keyword, OutFundAccount_Id: outfundaccount_id,
                OutSysCurrency_Id: outsyscurrency_id,
                InFundAccount_Id: infundaccount_id,
                InSysCurrency_Id: insyscurrency_id,
                FromTime: fromTime, ToTime: toTime, Page: page, PageNum: pageNum
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 到处资金转账 */
        exportFundTransferRecord: function (keyword, outfundaccount_id, outsyscurrency_id, infundaccount_id, insyscurrency_id, fromTime, toTime, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportFundTransferRecord", { Keyword: keyword, OutFundAccount_Id: outfundaccount_id,
                OutSysCurrency_Id: outsyscurrency_id,
                InFundAccount_Id: infundaccount_id,
                InSysCurrency_Id: insyscurrency_id,
                FromTime: fromTime, ToTime: toTime
            });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    fm.fundtransferrecord.fn.init.prototype = fm.fundtransferrecord.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.othm) {
        window.othm = {};
    }
    /*
    -----区域-----
    */
    othm.globalarea = function () {
        var obj = new othm.globalarea.fn.init();
        return obj;
    };
    othm.globalarea.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增区域 */
        newGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewGlobalArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改区域 */
        modifyGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyGlobalArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除区域 */
        deleteGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteGlobalArea", { GlobalArea_Id: this.GlobalArea_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取区域 */
        readGlobalArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadGlobalArea", { GlobalArea_Id: this.GlobalArea_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有区域 */
        getAllGlobalAreas: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllGlobalArea");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 获取国家和内部区域 */
        queryCountryAndInnerRegion: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCountryAndInnerRegion");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 获取所有国家 */
        queryCountries: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryCountries");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 获取所有片区 */
        queryRegions: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryRegions");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 获取片区和国家 */
        queryRegionAndCountries: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryRegionAndCountries");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 查询国家下的区域 */
        queryGlobalAreaByCountries: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryGlobalAreaByCountries", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 查询销售区域下的区域 */
        queryGlobalAreaBySaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryGlobalAreaBySaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    othm.globalarea.fn.init.prototype = othm.globalarea.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizmlm) {
        window.bizmlm = {};
    }
    /*
    -----语言资源-----
    */
    bizmlm.lanresource = function () {
        var obj = new bizmlm.lanresource.fn.init();
        return obj;
    };
    bizmlm.lanresource.fn = {
        /* 构造函数 */
        init: function () {
        },

        /* 获取所有语言资源 */
        getAllSysLanguages: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAllSysLanguages");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    bizmlm.lanresource.fn.init.prototype = bizmlm.lanresource.fn;
    /*-------------------------------*/

})(window);
(function (window) {

    if (!window.bizmlm) {
        window.bizmlm = {};
    }
    /*
    -----多语言-----
    */
    bizmlm.multilanguage = function () {
        var obj = new bizmlm.multilanguage.fn.init();
        return obj;
    };
    bizmlm.multilanguage.fn = {
        /* 构造函数 */
        init: function () {
        },

        /* 获取多语言分析数据 */
        getLanResStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetLanResStat");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出多语言资源 */
        exportResourceByLRCode: function (tableName, lrCodes, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportResourceByLRCode", { TableName: tableName, LRCodes: lrCodes });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入多语言资源 */
        importLanResource: function (tableName, fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportLanResource", { TableName: tableName });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    bizmlm.multilanguage.fn.init.prototype = bizmlm.multilanguage.fn;
    /*-------------------------------*/

})(window);

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


(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----商品分类-----
    */
    pdm.prodcategory = function () {
        var obj = new pdm.prodcategory.fn.init();
        return obj;
    };
    pdm.prodcategory.fn = {
        /* 构造函数 */
        init: function () {
            this.ProdCategory_Id;
            this.ParentPdc_Id;
            this.Seq;
            this.Layer;
            this.PdcName;
            this.PdcIndexs;
            this.BrowserPicWidth;
            this.BrowserPicHeight;
            this.PdcCode;
            this.Direction;
        },

        /* 新增商品分类 */
        newProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewProdCategory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改商品分类 */
        modifyProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProdCategory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改商品分类编码 */
        modifyPdcCode: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcCode", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改商品分类的序号 */
        modifyPdcSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除商品分类 */
        deleteProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProdCategory", { ProdCategory_Id: this.ProdCategory_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取商品分类 */
        readProdCategory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProdCategory", { ProdCategory_Id: this.ProdCategory_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有商品分类 */
        getAllProdCategorys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllProdCategory");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    pdm.prodcategory.fn.init.prototype = pdm.prodcategory.fn;
    /*-------------------------------*/

})(window);

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


(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----商品基本信息-----
    */
    pdm.product = function () {
        var obj = new pdm.product.fn.init();
        return obj;
    };
    pdm.product.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增商品基本信息 */
        newProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改商品基本信息 */
        modifyProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 上传商品图片 */
        uploadProdPicFile: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("UploadProdPicFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 添加商品图片 */
        addProdPicFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AddProdPicFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 添加商品图片 */
        addProdPicFile: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AddProdPicFile", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除商品基本信息 */
        deleteProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProduct", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取商品基本信息 */
        readProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProduct", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取商品基本信息 */
        readProductWithQuotedPrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadProductWithQuotedPrice", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品序号数量 */
        getProdSeqCount: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetProdSeqCount", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询商品基本信息 */
        queryProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryProdSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProdSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询商品Sku */
        getSkuProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSkuProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 清理商品图片 */
        clearProdPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ClearProdPics", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品图片 */
        modifyProdPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyProdPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除商品图片 */
        deleteProdPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteProdPic", { Product_Pic_Id: this.Product_Pic_Id, Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品图片 */
        getProdPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetProdPics", { Product_Id: this.Product_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /* 导出商品 */
        exportProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入商品 */
        importProducts: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },
        
        /* 导出商品序号 */
        exportProductSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入商品序号 */
        importProductSeq: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导出商品图片 */
        exportProductPicture: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductPicture", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 标准化图片 */
        covertStandProdPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CovertStandProdPics", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.product.fn.init.prototype = pdm.product.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售平台-----
    */
    sm.saleplatform = function () {
        var obj = new sm.saleplatform.fn.init();
        return obj;
    };
    sm.saleplatform.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增销售平台 */
        newSalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSalePlatform", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改销售平台 */
        modifySalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySalePlatform", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除销售平台 */
        deleteSalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSalePlatform", { SalePlatform_Id: this.SalePlatform_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取销售平台 */
        readSalePlatform: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSalePlatform", { SalePlatform_Id: this.SalePlatform_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 根据权限来获取站点 */
        queryAvaiSaleSites: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAvaiSaleSites");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /* 根据权限来获取销售平台 */
        querySalePlatforms: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySalePlatforms");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /*  */
        publishSaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("PublishSaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.saleplatform.fn.init.prototype = sm.saleplatform.fn;
    /*-------------------------------*/

})(window);


(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----产品库存单元-----
    */
    pdm.skuproduct = function () {
        var obj = new pdm.skuproduct.fn.init();
        return obj;
    };
    pdm.skuproduct.fn = {
        /* 构造函数 */
        init: function () {
            this.SkuProduct_Id;
            this.Product_Id;
            this.ProdCode;
            this.SkuPropValues;
            this.Quotiety;
            this.Stock;
        },

        /* 新增产品库存单元 */
        newSkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSkuProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改产品库存单元 */
        modifySkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySkuProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除产品库存单元 */
        deleteSkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSkuProduct", { SkuProduct_Id: this.SkuProduct_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取产品库存单元 */
        readSkuProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSkuProduct", { SkuProduct_Id: this.SkuProduct_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有产品库存单元 */
        getAllSkuProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSkuProduct");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.skuproduct.fn.init.prototype = pdm.skuproduct.fn;
    /*-------------------------------*/

})(window);
(function (window) {

    if (!window.spm) {
        window.spm = {};
    }
    /*
    -----站点-----
    */
    sm.salesite = function () {
        var obj = new sm.salesite.fn.init();
        return obj;
    };
    sm.salesite.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增站点 */
        newSaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改站点 */
        modifySaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySaleSite", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除站点 */
        deleteSaleSite: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSaleSite", { SalePlatform_Id: this.SalePlatform_Id, SaleSite_Id: this.SaleSite_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /*  */
        compareGlobalAreas: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CompareGlobalAreas", { SalePlatform_Id: this.SalePlatform_Id, SaleSite_Id: this.SaleSite_Id, GlobalArea_Ids: this.GlobalArea_Ids });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.salesite.fn.init.prototype = sm.salesite.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.othm) {
        window.othm = {};
    }
    /*
    -----货币-----
    */
    othm.syscurrency = function () {
        var obj = new othm.syscurrency.fn.init();
        return obj;
    };
    othm.syscurrency.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增货币 */
        newSysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSysCurrency", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改货币 */
        modifySysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySysCurrency", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除货币 */
        deleteSysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSysCurrency", { SysCurrency_Id: this.SysCurrency_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取货币 */
        readSysCurrency: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSysCurrency", { SysCurrency_Id: this.SysCurrency_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有货币 */
        getAllSysCurrencys: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSysCurrency");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    othm.syscurrency.fn.init.prototype = othm.syscurrency.fn;
    /*-------------------------------*/

})(window);


(function (window) {

    if (!window.othm) {
        window.othm = {};
    }
    /*
    -----货币汇率-----
    */
    othm.syscurrrate = function () {
        var obj = new othm.syscurrrate.fn.init();
        return obj;
    };
    othm.syscurrrate.fn = {
        /* 构造函数 */
        init: function () { },

        /* 设置货币汇率 */
        setSysCurrRate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SetSysCurrRate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取货币汇率 */
        readRate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadRate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取所有货币汇率 */
        querySysCurrRate: function (sysCurrency_Id, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysCurrRate", { SysCurrency_Id: sysCurrency_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取货币汇率 */
        querySysCurrBRate: function (sysCurrency_Id, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysCurrBRate", { SysCurrency_Id: sysCurrency_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    othm.syscurrrate.fn.init.prototype = othm.syscurrrate.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.spm) {
        window.spm = {};
    }
    /*
    -----系统关键参数-----
    */
    spm.syskeyparam = function () {
        var obj = new spm.syskeyparam.fn.init();
        return obj;
    };
    spm.syskeyparam.fn = {
        /* 构造函数 */
        init: function () { },

        /* 修改系统关键参数 */
        modifySysKeyParam: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySysKeyParam", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 读取系统关键参数 */
        readSysKeyParam: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSysKeyParam");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取重量单位 */
        getWeightUnits: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWeightUnits");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },
        
        /* 获取重量比例 */
        getWeightRate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetWeightRate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        },

        /*  */
        getAllPrintTemplate: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetAllPrintTemplate", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        authoriseSMT: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("AuthoriseSMT", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    spm.syskeyparam.fn.init.prototype = spm.syskeyparam.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.um) {
        window.um = {};
    }
    /*
    -----系统角色-----
    */
    um.sysrole = function () {
        var obj = new um.sysrole.fn.init();
        return obj;
    };
    um.sysrole.fn = {
        /* 构造函数 */
        init: function () {
        },

        /* 获取所有系统角色 */
        queryAllSysRoles: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllSysRoles");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    um.sysrole.fn.init.prototype = um.sysrole.fn;
    /*-------------------------------*/

})(window);
(function (window) {

    if (!window.um) {
        window.um = {};
    }
    /*
    -----系统用户-----
    */
    um.sysuser = function () {
        var obj = new um.sysuser.fn.init();
        return obj;
    };
    um.sysuser.fn = {
        /* 构造函数 */
        init: function () {
            this.SysUser_Id;
            this.FullName;
            this.Email;
            this.Pwd;
            this.Tel;
            this.ContactInfo;
            this.Remark;
            this.LastLoginTime;
            this.RoleIds;
            this.SalePlatformIds;
            this.AreaIds;
        },

        /* 新增系统用户 */
        newSysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSysUser", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改系统用户 */
        modifySysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySysUser", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除系统用户 */
        deleteSysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSysUser", { SysUser_Id: this.SysUser_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取系统用户 */
        readSysUser: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSysUser", { SysUser_Id: this.SysUser_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取系统用户 */
        querySysUsers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysUsers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    um.sysuser.fn.init.prototype = um.sysuser.fn;
    /*-------------------------------*/

})(window);
(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }
    /*
    -----临时上传图片-----
    */
    pdm.tempuploadpic = function () {
        var obj = new pdm.tempuploadpic.fn.init();
        return obj;
    };
    pdm.tempuploadpic.fn = {
        /* 构造函数 */
        init: function () {
            this.TempUploadPic_Id;
            this.Seq;
            this.PicUrl;
            this.IsMain;
            this.Color;
            this.User_Id;
            this.SalePlatform_Id;
            this.SaleSite_Id;
        },

        /* 修改临时上传图片 */
        modifyTempUploadPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyTempUploadPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除临时上传图片 */
        deleteTempUploadPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteTempUploadPic", { TempUploadPic_Id: this.TempUploadPic_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除临时上传图片 */
        clearTempUploadPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ClearTempUploadPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取临时上传图片 */
        getTempUploadPics: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTempUploadPics", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    successFunc(paramObj);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pdm.tempuploadpic.fn.init.prototype = pdm.tempuploadpic.fn;
    /*-------------------------------*/

})(window);

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
            this.Seq;
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

(function (window) {

    if (!window.lstm) {
        window.lstm = {};
    }
    /*
    -----物流解决方案-----
    */
    lstm.lstsolution = function () {
        var obj = new lstm.lstsolution.fn.init();
        return obj;
    };
    lstm.lstsolution.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增物流解决方案 */
        newLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改物流解决方案 */
        modifyLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除物流解决方案 */
        deleteLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteLstSolution", { LstSolution_Id: this.LstSolution_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取物流解决方案 */
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

        /* 查询物流解决方案 */
        queryLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询运费 */
        queryLstCharge: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryLstCharge", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询运费 */
        queryOptimalLstSolution: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryOptimalLstSolution", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取运费详细条目 */
        getLstSolutionItems: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetLstSolutionItems", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 新增物流解决方案明细 */
        newLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewLstSolutionItem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改物流解决方案明细 */
        modifyLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyLstSolutionItem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除物流解决方案明细 */
        deleteLstSolutionItem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteLstSolutionItem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出运费价格 */
        exportLstSolutionPrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportLstSolutionPrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入运费价格 */
        importLstSolutionPrice: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportLstSolutionPrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导出运费 */
        exportLstCharges: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportLstCharges", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    lstm.lstsolution.fn.init.prototype = lstm.lstsolution.fn;
    /*-------------------------------*/

})(window);

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

(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----供应商-----
    */
    pom.supplier = function () {
        var obj = new pom.supplier.fn.init();
        return obj;
    };
    pom.supplier.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增供应商 */
        newSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSupplier", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改供应商 */
        modifySupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySupplier", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除供应商 */
        deleteSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSupplier", { Supplier_Id: this.Supplier_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取供应商 */
        readSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSupplier", { Supplier_Id: this.Supplier_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取供应商 */
        querySuppliers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySuppliers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询报价供应商 */
        queryQuotedSupplier: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryQuotedSupplier", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 输出供应商 */
        exportSuppliers: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSuppliers", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入供应商排序 */
        importSuppSeqs: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSuppSeqs", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    pom.supplier.fn.init.prototype = pom.supplier.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----供应商联系人-----
    */
    pom.supplierlinker = function () {
        var obj = new pom.supplierlinker.fn.init();
        return obj;
    };
    pom.supplierlinker.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增供应商联系人 */
        newSupplierLinker: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSupplierLinker", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改供应商联系人 */
        modifySupplierLinker: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySupplierLinker", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除供应商联系人 */
        deleteSupplierLinker: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSupplierLinker", { SupplierLinker_Id: this.SupplierLinker_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pom.supplierlinker.fn.init.prototype = pom.supplierlinker.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售商品-----
    */
    sm.ss_product = function () {
        var obj = new sm.ss_product.fn.init();
        return obj;
    };
    sm.ss_product.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增销售商品 */
        newSS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSS_Product", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改销售商品 */
        modifySS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySS_Product", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改销售商品图片序号 */
        modifySSProdPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySSProdPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 上传商品图片 */
        uploadSSProdPic: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("UploadSSProdPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 删除销售商品 */
        deleteSS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSS_Product", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 导出配送价格 */
        exportProductExpServices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入商品 */
        importSSProducts: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 导入商品序号 */
        importSSProductSeq: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSSProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 导入配送价格 */
        importProductExpServices: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportProductExpServices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /* 读取销售商品 */
        readSS_Product: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSS_Product", { SS_Product_Id: this.SS_Product_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询销售商品 */
        querySSProductByInnerProd: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySSProductByInnerProd", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 分页查询销售商品 */
        querySSProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出商品 */
        exportSSProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出Wish商品 */
        exportWishProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportWishProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出商品序号 */
        exportSSProductSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSSProductSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出商品利润 */
        exportProductProfit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportProductProfit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询利润 */
        queryProdProfit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProdProfit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySSProdSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySSProdSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        refreshProdProfit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("RefreshProdProfit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        syncSSProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SyncSSProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importSSProductByPicture: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSSProductByPicture", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSMTGroupAndProperty: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSMTGroupAndProperty", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        syncSMTProductList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SyncSMTProductList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        generateSSProdRemark: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSSProdRemark", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readSSProductRemark: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSSProductRemark", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readSSProductPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSSProductPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readSSProductWithMainPic: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSSProductWithMainPic", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        publishSMTProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("PublishSMTProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        checkSMTProductProhibitedWords: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CheckSMTProductProhibitedWords", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        batchPublishSMTProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("BatchPublishSMTProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        checkProhibitedWords: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CheckProhibitedWords", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    sm.ss_product.fn.init.prototype = sm.ss_product.fn;
    /*-------------------------------*/

})(window);


(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----网站商品导航-----
    */
    sm.salepdcnavigation = function () {
        var obj = new sm.salepdcnavigation.fn.init();
        return obj;
    };
    sm.salepdcnavigation.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增网站商品导航 */
        newSalePdcNavigation: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSalePdcNavigation", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改网站商品导航 */
        modifySalePdcNavigation: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySalePdcNavigation", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改修改网站商品导航的序号 */
        modifyPdcNavSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPdcNavSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除网站商品导航 */
        deleteSalePdcNavigation: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSalePdcNavigation", { ProdCategory_Id: this.ProdCategory_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 获取网站商品导航 */
        querySalePdcNav: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySalePdcNav", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    sm.salepdcnavigation.fn.init.prototype = sm.salepdcnavigation.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----采购价格-----
    */
    pom.purchaseprice = function () {
        var obj = new pom.purchaseprice.fn.init();
        return obj;
    };
    pom.purchaseprice.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增采购价格 */
        newPurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewPurchasePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改采购价格 */
        modifyPurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPurchasePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除采购价格 */
        deletePurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeletePurchasePrice", { PurchasePrice_Id: this.PurchasePrice_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取采购价格 */
        readPurchasePrice: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadPurchasePrice", { PurchasePrice_Id: this.PurchasePrice_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询未报价商品 */
        queryUnQuotedProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryUnQuotedProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询报价商品 */
        queryQuotedProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryQuotedProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询Sku采购价格 */
        querySkuQuotedPrices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySkuQuotedPrices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSuppQuotedPrices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSuppQuotedPrices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出采购报价 */
        exportPurchasePrices: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPurchasePrices", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入采购报价 */
        importPurchasePrice: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPurchasePrice", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    pom.purchaseprice.fn.init.prototype = pom.purchaseprice.fn;
    /*-------------------------------*/

})(window);


(function (window) {

    if (!window.whm) {
        window.whm = {};
    }
    /*
    -----仓库-----
    */
    whm.warehouse = function () {
        var obj = new whm.warehouse.fn.init();
        return obj;
    };
    whm.warehouse.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增仓库 */
        newWarehouse: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewWarehouse", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改仓库 */
        modifyWarehouse: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyWarehouse", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 修改仓库排序 */
        modifyWarehouseSeq: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyWarehouseSeq", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 删除仓库 */
        deleteWarehouse: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteWarehouse", { Warehouse_Id: this.Warehouse_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();
        },

        /* 获取所有仓库 */
        getAllWarehouses: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryAllWarehouse");
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.loadCacheData(handlerObj, context);
        }
    };
    whm.warehouse.fn.init.prototype = whm.warehouse.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.whm) {
        window.whm = {};
    }
    /*
    -----出入库记录-----
    */
    whm.inoutstock = function () {
        var obj = new whm.inoutstock.fn.init();
        return obj;
    };
    whm.inoutstock.fn = {
        /* 构造函数 */
        init: function () { },

        /* 处理出入库记录 */
        handlerInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlerInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除出入库记录 */
        deleteInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取出入库记录 */
        readInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadInOutStock", { InOutStock_Id: this.InOutStock_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询出入库记录 */
        queryInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出出入库记录 */
        exportInOutStock: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportInOutStock", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    whm.inoutstock.fn.init.prototype = whm.inoutstock.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.whm) {
        window.whm = {};
    }
    /*
    -----商品库存-----
    */
    whm.inventory = function () {
        var obj = new whm.inventory.fn.init();
        return obj;
    };
    whm.inventory.fn = {
        /* 构造函数 */
        init: function () { },
        
        /* 获取商品库存 */
        queryProdInventory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryProdInventory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 获取商品库存 */
        queryInventory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryInventory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导出商品库存 */
        exportInventory: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportInventory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 导入 */
        importInitInventory: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportInitInventory", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        queryInventoryMoneyStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryInventoryMoneyStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportInventoryMoneyStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportInventoryMoneyStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    whm.inventory.fn.init.prototype = whm.inventory.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----销售订单-----
    */
    sm.saleorder = function () {
        var obj = new sm.saleorder.fn.init();
        return obj;
    };
    sm.saleorder.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增销售订单 */
        newSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改销售订单 */
        modifySaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifySaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 客户确认 */
        custConfirmSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CustConfirmSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 生效订单 */
        submitSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SubmitSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        resendSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReSendSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除销售订单 */
        deleteSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 撤消销售订单 */
        cancelSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CancelSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        closeSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CloseSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取销售订单 */
        readSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadSaleOrder", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取销售订单 */
        readFullSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadFullSaleOrder", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 查询销售订单 */
        querySaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySaleOrderForAS: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySaleOrderForAS", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSaleOrderStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleOrderStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },


        /*  */
        exportSaleOrderForSubmit: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSaleOrderForSubmit", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /*  */
        importSubmitSaleOrder: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSubmitSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        importSTMSaleOrder: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSTMSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        importTaobaoSaleOrder: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportTaobaoSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        getSaleOrderForPrint: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleOrderForPrint", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySMTShipLable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySMTShipLable", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        generateSMTShipLable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSMTShipLable", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTShipLableErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTShipLableErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySMTTrackingNumber: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySMTTrackingEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        generateSMTTrackingNumber: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSMTTrackingNumber", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTTrackingNumberErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTTrackingNumberErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        generateSMTShipLablePDF: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSMTShipLablePDF", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTShipLablePDFErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTShipLablePDFErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySMTSaleOrderForShipState: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySMTSaleOrderForShipState", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        modifyShipStateInSMT: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyShipStateInSMT", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportModifyShipStateInSMTErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportModifyShipStateInSMTErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSMTSaleOrderList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSMTSaleOrderList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSMTSaleOrderDetailList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSMTSaleOrderDetailList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        handleSMTSaleOrders: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandleSMTSaleOrders", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySMTSaleOrderForConfirmMessage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySMTSaleOrderForConfirmMessage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        sendSMTSOConfirmMessage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SendSMTSOConfirmMessage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSendSMTSOConfirmMessageErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSendSMTSOConfirmMessageErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSMTEvaluationOrderList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSMTEvaluationOrderList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        evaluationSMTOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("EvaluationSMTOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportEvaluationSMTOrderErrors: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportEvaluationSMTOrderErrors", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTTaskInfos: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTTaskInfos", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTMessage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTMessage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importSMTMessage: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSMTMessage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    sm.saleorder.fn.init.prototype = sm.saleorder.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.sm) {
        window.sm = {};
    }
    /*
    -----售后问题-----
    */
    sm.as_problem = function () {
        var obj = new sm.as_problem.fn.init();
        return obj;
    };
    sm.as_problem.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增售后问题 */
        newAS_Problem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewAS_Problem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改售后问题 */
        modifyAS_Problem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyAS_Problem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除售后问题 */
        deleteAS_Problem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteAS_Problem", { AS_Problem_Id: this.AS_Problem_Id });
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 生效 */
        submitASProblem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SubmitASProblem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        loseReceiveRet: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("LoseReceiveRet", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        closeASProblem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CloseASProblem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readASProblemForModify: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadASProblemForModify", { AS_Problem_Id: this.AS_Problem_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readASProblem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadASProblem", { AS_Problem_Id: this.AS_Problem_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSOGProductForASP: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSOGProductForASP", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryASProblem: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryASProblem", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryASProductForReceive: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryASProductForReceive", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getASProblemStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetASProblemStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    sm.as_problem.fn.init.prototype = sm.as_problem.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.lstm) {
        window.lstm = {};
    }
    /*
    -----配送单-----
    */
    lstm.expressorder = function () {
        var obj = new lstm.expressorder.fn.init();
        return obj;
    };
    lstm.expressorder.fn = {
        /* 构造函数 */
        init: function () { },

        /* 打包 */
        packageExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("PackageExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        rePackageExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("RePackageExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        shipSaleOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ShipSaleOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        finishDelivery: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("FinishDelivery", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        loseEO: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("LoseEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        returnEO: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReturnEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        receiveEORet: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReceiveEORet", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        saveShipCost: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SaveShipCost", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        saveTrackingNumber: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SaveTrackingNumber", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        combinExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CombinExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        splitExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SplitExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        cancelEO: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("CancelEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取配送单 */
        readExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadExpressOrder", { ExpressOrder_Id: this.ExpressOrder_Id });
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getEOStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetEOStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryExpressOrderForCombin: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryExpressOrderForCombin", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryEOProductForPackage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryEOProductForPackage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportEOProductForPackage: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportEOProductForPackage", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importExpressOrder: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        getDeliveryStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetDeliveryStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportDeliveryEO: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportDeliveryEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importDeliveryEO: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportDeliveryEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        importPre4PXEO: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPre4PXEO", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        exportSMTTrackingNumber: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTTrackingNumber", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importEOCostBySMT: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportEOCostBySMT", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        importEOCostBy4PX: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportEOCostBy4PX", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        exportEOCharge: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportEOCharge", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPackageExpressOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPackageExpressOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportShippingLable: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportShippingLable", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    lstm.expressorder.fn.init.prototype = lstm.expressorder.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    ----------
    */
    pom.purchaseproduct = function () {
        var obj = new pom.purchaseproduct.fn.init();
        return obj;
    };
    pom.purchaseproduct.fn = {
        /* 构造函数 */
        init: function () { },

        /*  */
        handlePurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("HandlePurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },
        
        /*  */
        importPurchaseProduct: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        generatePurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GeneratePurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* */
        readPurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadPurchaseProduct", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryPurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryPurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSuppPurchaseProduct: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSuppPurchaseProduct", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pom.purchaseproduct.fn.init.prototype = pom.purchaseproduct.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.pom) {
        window.pom = {};
    }
    /*
    -----采购订单-----
    */
    pom.purchaseorder = function () {
        var obj = new pom.purchaseorder.fn.init();
        return obj;
    };
    pom.purchaseorder.fn = {
        /* 构造函数 */
        init: function () { },

        /* 新增采购订单 */
        newPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("NewPurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 修改采购订单 */
        modifyPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ModifyPurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        submitPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SubmitPurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 删除采购订单 */
        deletePurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeletePurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        closePurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ClosePurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取采购订单 */
        readPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadPurchaseOrder", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /* 读取采购订单 */
        simpleReadPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SimpleReadPurchaseOrder", this);
            var context = new webhandler.bizExeContext(function (paramObj) {
                if (successFunc) {
                    $.extend(this, paramObj);
                    successFunc(this);
                }
            }, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        queryPurchaseOrder: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QueryPurchaseOrder", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getPOStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetPOStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getProductsByPOForRev: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetProductsByPOForRev", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPurchaseOrderForHD: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPurchaseOrderForHD", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importPurchaseOrderForHD: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportPurchaseOrderForHD", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        exportPOProducts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPOProducts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPOProdList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPOProdList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportPOUnRevProdList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportPOUnRevProdList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportUnRevProdList: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportUnRevProdList", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    pom.purchaseorder.fn.init.prototype = pom.purchaseorder.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.pdm) {
        window.pdm = {};
    }

    /*
    -----邮件处理-----
    */
    spm.sysemail = function () {
        var obj = new spm.sysemail.fn.init();
        return obj;
    };
    spm.sysemail.fn = {
        /* 构造函数 */
        init: function () { },

        /*  */
        generateReceiveRemindEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateReceiveRemindEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        deleteSysEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("DeleteSysEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySysEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySysEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        readEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ReadEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSysEmailStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSysEmailStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        sendEmail: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("SendEmail", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        }
    };
    spm.sysemail.fn.init.prototype = spm.sysemail.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.pdm) {
        window.sm = {};
    }

    /*
    -----销售统计分析-----
    */
    sm.salereport = function () {
        var obj = new sm.salereport.fn.init();
        return obj;
    };
    sm.salereport.fn = {
        /* 构造函数 */
        init: function () { },

        /*  */
        generateSaleReport: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GenerateSaleReport", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        getStatTimeX: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetStatTimeX", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSaleSiteStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleSiteStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySaleAnalysisObjs: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySaleAnalysisObjs", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSAOProduts: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOProduts", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSaleAnalysisObjs: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSaleAnalysisObjs", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importSaleAnalysisObjs: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportSaleAnalysisObjs", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        querySAOSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySAOSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySAOSaleByDateStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySAOSaleByDateStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySAOSaleByAreaStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySAOSaleByAreaStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSAOOrderCountStatByHour: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOOrderCountStatByHour", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSAOOrderCountStatByArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOOrderCountStatByArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        querySAOSkuProdSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("QuerySAOSkuProdSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSaleSiteQtyStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleSiteQtyStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSaleSiteProfitStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSaleSiteProfitStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getSAOTotalSaleStatByArea: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOTotalSaleStatByArea", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportMarketingCost: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportMarketingCost", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        importMarketingCost: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ImportMarketingCost", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        },

        /*  */
        getSAOTypes: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetSAOTypes", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSAOSaleStat: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSAOSaleStat", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        getTrackTimes: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("GetTrackTimes", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        trackSaleAnalysis: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("TrackSaleAnalysis", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportTrackSaleAnalysis: function (successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportTrackSaleAnalysis", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        /*  */
        exportSMTSearchAnalysis: function (fileCtrl, successFunc, errorFunc) {
            var handlerObj = new webhandler.webTransferObj("ExportSMTSearchAnalysis", this);
            var context = new webhandler.bizExeContext(successFunc, errorFunc);

            fileCtrl.uploadFile(handlerObj, context);
        }
    };
    sm.salereport.fn.init.prototype = sm.salereport.fn;
    /*-------------------------------*/

})(window);
