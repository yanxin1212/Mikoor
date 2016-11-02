
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadFRTimes);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#accountOutTag").click(function () { pageVariable.activetab = "accountout"; loadAccountOut(); });
    $("#accountInTag").click(function () { pageVariable.activetab = "accountin"; loadAccountIn(); });
    $("#fundRecordTag").click(function () { pageVariable.activetab = "fundrecord"; loadFundRecords(); });

    $("#btNewOutRecord").click(openNewAccountOutFrm);
    $("#btNewInRecord").click(openNewReceiveFrm);
    $("#btQueryOutRecord").click(openQueryPayoutFrm);
    $("#btQueryInRecord").click(openQueryAccoutInFrm);
    $("#btQueryFundRecord").click(openQueryFundFlowRecordFrm);
    $("#btExportInRecord").click(exportAccountInRecord);
    $("#btExportFundRecord").click(exportFundFlowRecord);
    $("#btExportOutRecord").click(exportAccountOutRecord);

    pageVariable.activetab = "accountout";

    $("#btImportTaobao, #btImportAirExpress, #btImportSMTAOR, #btImport4PXAOR, #lbImportAOR, #btImportReceveBill").click(openImportFrm);

    $("#btQueryOutRecord, #btNewOutRecord, #btQueryInRecord, #btNewInRecord, #btQueryFundRecord, #btNewFundRecord, #btAddPaid, #btExportFundRecord, #btAddPaidForPay, #btExportOutRecord, #btNewFundReceive, #btNewFundReceiveForM, #btBatchAOR").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

    pageframe.control.multiButtion.init("btBatchAOR", "dvImportOutRecords");
    pageframe.control.multiButtion.init("btBatchInRecord", "dvImportInRecords");
}

/* 设置页面布局 */
function setLayout() {

    var m_height = pageframe.layout.getTableHeightInForm();
    var currFormHeight = m_height - 33;

    if (pageVariable.accountOutList) {
        pageVariable.accountOutList.resize(currFormHeight);
    }

    if (pageVariable.accountInList) {
        pageVariable.accountInList.resize(currFormHeight);
    }

    if (pageVariable.fundRecordList) {
        pageVariable.fundRecordList.resize(m_height);
    }
}

/* 获取财务时间段 */
function loadFRTimes() {
    var m_financereport = new fm.financereport();
    m_financereport.getFRTimes(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        var m_frtimeCtrl = $("#ddlAccoutTime");
        var m_timeDict = new datastruct.dictionary();
        $.each(m_jsonobjs, function () {
            var m_timestr = this.Year + mlm.C0863 + " - " + this.Month + mlm.C0864;
            m_timeDict.setItem(m_timestr, null);
        });

        var m_now = new Date();
        var m_nowyear = m_now.getFullYear();
        var m_nowmonth = m_now.getMonth() + 1;
        var m_nowtimestr = m_nowyear + mlm.C0863 + " - " + m_nowmonth + mlm.C0864;

        if (!m_timeDict.containKey(m_nowtimestr)) {
            m_frtimeCtrl.append("<option value='" + m_nowyear + "-" + m_nowmonth + "'>" + m_nowtimestr + "</option>");
        }

        $.each(m_jsonobjs, function () {
            var m_timestr = this.Year + mlm.C0863 + " - " + this.Month + mlm.C0864;
            m_frtimeCtrl.append("<option value='" + this.Year + "-" + this.Month + "'>" + m_timestr + "</option>");
        });

        m_frtimeCtrl.val(m_nowyear + "-" + m_nowmonth);

        loadDataFromTabs();
        m_frtimeCtrl.change(loadDataFromTabs);
    });
}

/* 加载支出列表 */
function loadAccountOut() {

    if (!pageVariable.accountOutList) {
        var currFormHeight = pageframe.layout.getTableHeightInForm() - 33;
        pageVariable.accountOutList = new uicontrol.tableList("accountOutList",
                                     { isPaging: true,
                                         autoSeq: true,
                                         height: currFormHeight,
                                         keyColumn: "AccountOutRecord_Id",
                                         pageQueryHandler: innerQueryAccountOutRecord,
                                         columns: [{ display: mlm.C0751, name: "", width: 75, align: 'left', adjust: true, createCell: constructAORCell },
                                                   { display: mlm.C0750, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: constructDateCell },
                                                   { display: mlm.C0497, name: "CostSubjectName", width: 90, align: 'left' },
                                                   { display: mlm.C0675, name: "PayObject", width: 170, align: 'left', adjust: true, createCell: constructPayObjectCell },
                                                   { display: mlm.C0676, name: "BizContent", width: 280, align: 'left', adjust: true, createCell: constructPayBizConentCell },
                                                   { display: mlm.C0722, name: "Payout", width: 125, align: 'right', adjust: true, createCell: constructPayoutCell },
                                                   { display: mlm.C0500, name: "State", width: 160, align: 'left', adjust: true, createCell: constructStateCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructAOOperaCell}]
                                     });
    }

    if (!pageVariable.accountOutSource) {
        var m_dateitems = null;
        var m_date = $("#ddlAccoutTime").val();
        if (m_date) {
            m_dateitems = m_date.split("-");
            pageVariable.queryAORCondition = { Keyword: "",
                CostSubjectId: "",
                SysCurrency_Id: "",
                State: "",
                FromTime: "",
                ToTime: "",
                AccountYear: m_dateitems[0],
                AccountMonth: m_dateitems[1]
            };

            $("#lbTotalUnOutSymbol").text(mlm.C0521 + "(" + mlm.C0865 + m_date + ") :");
        }
        else {
            pageVariable.queryAORCondition = { Keyword: "",
                CostSubjectId: "",
                SysCurrency_Id: "",
                State: "",
                FromTime: "",
                ToTime: ""
            };
        }

        //innerQueryAccountOutRecord(1, pageVariable.accountOutList.pageNumber);

        calculateTotalPayout();
    }
}
/* 查询应付账目 */
function queryAccountOutRecord(pageNum, pageCount) {

    var m_keyword = $("#txtPayKeyword").val();
    var m_costSubjectId;
    if (pageVariable.selectCostSubjectForQ) {
        var m_selectedSubject = pageVariable.selectCostSubjectForQ.getObj();
        if (m_selectedSubject) {
            m_costSubjectId = m_selectedSubject.costSubject_Ids;
        }
    }
    var m_sysCurrency_Id = $("#ddlOutCurrencyForQ").val();
    var m_state = $("#ddlPayStateForQ").val();
    var m_fromtime = $("#fromDatePickerForPay").val();
    var m_totime = $("#toDatePickerForPay").val();
    var m_shoppingSiteId = $("#ddlSalePlatformForQ").val();
    var m_salesite_id = $("#ddlSaleAreaForQ").val();

    pageVariable.queryAORCondition = { Keyword: m_keyword,
        CostSubjectId: m_costSubjectId,
        SalePlatform_Id: m_shoppingSiteId,
        SaleSite_Id: m_salesite_id,
        SysCurrency_Id: m_sysCurrency_Id,
        State: m_state,
        FromTime: m_fromtime,
        ToTime: m_totime,
        AccountYear: "",
        AccountMonth: ""
    };

    var m_fromstr = "";
    if (!m_fromtime) {
        m_fromstr = mlm.C0866;
    }
    else {
        m_fromstr = m_fromtime;
    }

    var m_tostr = "";
    if (!m_totime) {
        m_tostr = mlm.C0867;
    }
    else {
        m_tostr = m_totime;
    }

    $("#lbTotalUnOutSymbol").text(mlm.C0521 + "(" + m_fromstr + mlm.C0412 + m_tostr + ") :");
    $("#ddlAccoutTime").val("");
    pageVariable.accountOutSource = null;
    innerQueryAccountOutRecord(1, pageVariable.accountOutList.pageNumber);

    calculateTotalPayout();
}
/* 查询待付款的应付账目 */
function queryWaitingPayAORecord(syscurrency_id) {

    pageVariable.queryAORCondition = { Keyword: "",
        CostSubjectId: "",
        SysCurrency_Id: syscurrency_id,
        SalePlatform_Id: "",
        SaleSite_Id: "",
        State: 100,
        FromTime: "",
        ToTime: "",
        AccountYear: "",
        AccountMonth: ""
    };

    pageVariable.accountOutSource = null;
    innerQueryAccountOutRecord(1, pageVariable.accountOutList.pageNumber);
}
/* 查询应付账目 */
function innerQueryAccountOutRecord(pageNum, pageCount) {

    /* 展示进度 */
    pageframe.control.processCtrl.showOperaProcess();

    var m_accountoutrecord = new fm.accountoutrecord();
    m_accountoutrecord.queryAccountOutRecord(pageVariable.queryAORCondition.Keyword,
                                             pageVariable.queryAORCondition.CostSubjectId,
                                             pageVariable.queryAORCondition.SalePlatform_Id,
                                             pageVariable.queryAORCondition.SaleSite_Id,
                                             pageVariable.queryAORCondition.SysCurrency_Id,
                                             pageVariable.queryAORCondition.State,
                                             pageVariable.queryAORCondition.FromTime,
                                             pageVariable.queryAORCondition.ToTime,
                                             pageVariable.queryAORCondition.AccountYear,
                                             pageVariable.queryAORCondition.AccountMonth, pageNum, pageCount, function (tableSource) {

                                                 pageVariable.accountOutSource = tableSource;
                                                 pageVariable.accountOutList.dataSource.page = pageNum;
                                                 pageVariable.accountOutList.bindDataSource(tableSource);

                                                 /* 隐藏进度 */
                                                 pageframe.control.processCtrl.hideOperaProcess();
                                             });

}
/* 计算总支付费用 */
function calculateTotalPayout() {
    var m_accountoutrecord = new fm.accountoutrecord();
    m_accountoutrecord.Keyword = pageVariable.queryAORCondition.Keyword;
    m_accountoutrecord.CostSubjectId = pageVariable.queryAORCondition.CostSubjectId;
    m_accountoutrecord.SysCurrency_Id = pageVariable.queryAORCondition.SysCurrency_Id;
    m_accountoutrecord.SalePlatformId = pageVariable.queryAORCondition.SalePlatformId;
    m_accountoutrecord.SaleSite_Id = pageVariable.queryAORCondition.SaleSite_Id;
    m_accountoutrecord.State = 100;
    m_accountoutrecord.FromTime = pageVariable.queryAORCondition.FromTime;
    m_accountoutrecord.ToTime = pageVariable.queryAORCondition.ToTime;
    m_accountoutrecord.AccountYear = pageVariable.queryAORCondition.AccountYear;
    m_accountoutrecord.AccountMonth = pageVariable.queryAORCondition.AccountMonth;
    m_accountoutrecord.getWaitingPaid(function (tableSource) {

        var m_waitingPaids = datastruct.convertion.tableToJson(tableSource);

        var m_waitingStr = [];

        $.each(m_waitingPaids, function () {
            if (this.WaitingPaid > 0) {
                m_waitingStr.push("<a href='javascript:void(0)' onclick='queryWaitingPayAORecord(" + this.SysCurrency_Id + ")'>" + commoncore.func.getCurrHtml(this.CurrSymbol, this.WaitingPaid) + "</a>");
            }
        });
        $("#lbTotalUnOut").html(m_waitingStr.join("<span style='margin: 0px 10px 0px 5px'>,</span>"));
    });
}

/* 构建日期列 */
function constructDateCell(key, cellValue) {
    return commoncore.func.getTimeStrCell(cellValue);
}
/* 构建账单列 */
function constructAORCell(key, cellValue) {
    var m_obj = this.keyObj;
    var m_codestr = "<a onclick='viewAccountOut.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + m_obj.AORCode + "</a>";
    return m_codestr;
}
/* 构建交易对方列 */
function constructPayObjectCell(key, cellValue) {

    var m_arr = [];

    if (this.keyObj.Customer_Id && this.keyObj.Customer_Id != "0") {
        m_arr.push("<div style='padding: 0px'>" + this.keyObj.CustName + "</div>");
    }
    else if (this.keyObj.Supplier_Id && this.keyObj.Supplier_Id != "0") {
        m_arr.push("<div style='padding: 0px'>" + this.keyObj.SuppName + "</div>");
    }
    else {
        m_arr.push("<div style='padding: 0px'>" + cellValue + "</div>");
    }

    if (this.keyObj.SPfName) {
        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + this.keyObj.SPfName);
        if (this.keyObj.SaleSiteName) {
            m_arr.push("-" + this.keyObj.SaleSiteName);
        }
        m_arr.push(")</div>");
    }

    return m_arr.join("");
}
/* 构建业务内容列 */
function constructPayBizConentCell(key, cellvalue) {

    var m_arr = [];
    
    if (this.keyObj.SaleOrder_Id && this.keyObj.SaleOrder_Id != "0") {
        if (this.keyObj.AS_Problem_Id && this.keyObj.AS_Problem_Id != "0") {
            m_arr.push("<span>" + mlm.C1546 + ": </span><span>" + this.keyObj.ASPCode + "</span>");
        }
        else {
            m_arr.push("<span>" + mlm.C1404 + ": </span><span>" + this.keyObj.SOCode + "</span>");
        }
    }
    else if (this.keyObj.PurchaseOrder_Id && this.keyObj.PurchaseOrder_Id != "0") {
        m_arr.push("<span>" + mlm.C0893 + ": </span><span>" + this.keyObj.POCode + "</span>");
    }
    else if (this.keyObj.ExpressOrder_Id && this.keyObj.ExpressOrder_Id != "0") {
        m_arr.push("<span>" + mlm.C1316 + ": </span><span>" + this.keyObj.EOCode + "</span>");
        m_arr.push("(<span>" + this.keyObj.LstSolutionName + "</span>, ");

        if (this.keyObj.TrackingNumber) {
            m_arr.push("<span>" + this.keyObj.TrackingNumber + "</span>)");
        }
        else {
            if (this.keyObj.OutEOCode) {
                m_arr.push("<span>" + this.keyObj.OutEOCode + "</span>)");
            }
            else {
                m_arr.push("<span>" + mlm.C1291 + mlm.C1322 + "</span>)");
            }
        }
    }
    else {
        var m_len = cellvalue.getBytesCount();
        if (m_len > 100) {
            var m_str = cellvalue.substringByBytes(100) + "...";
            m_arr.push("<span id='lbRevBizCon_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>");
        }
        else {
            m_arr.push(cellvalue);
        }
    }

    

    return m_arr.join("");
}
/* 构建费用支出列 */
function constructPayoutCell(key, cellValue) {
    var m_obj = this.keyObj;
    return commoncore.func.getCurrHtml(m_obj.CurrSymbol, cellValue);
}
/* 构建状态列 */
function constructStateCell(key, cellValue) {

    var m_arr = [];
    var m_obj = this.keyObj;

    if (cellValue == "1") {
        m_arr.push("<div style='padding: 0px'>" + mlm.C0490 + "</div>");
    }
    else if (cellValue == "2") {
        m_arr.push("<div style='padding: 0px'>" + mlm.C0491 + "</div>");
        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + mlm.C0868 + ": " + commoncore.func.getCurrHtml(m_obj.CurrSymbol, (Number(m_obj.Payout) - Number(m_obj.Paidout))) + ")</div>");
    }
    else if (cellValue == "3") {
        m_arr.push("<div style='padding: 0px'>" + mlm.C0492 + "</div>");
    }
    else {
        m_arr.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
    }

    return m_arr.join("");
}
/* 构建支出操作列 */
function constructAOOperaCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_str = "";
    if (m_obj.State == "1" || m_obj.State == "2") {
        m_str = "<a onclick='openModifyAccountOutFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0537 + "</a>";
    }

    if ((!m_obj.SaleOrder_Id || m_obj.SaleOrder_Id == "0") && (!m_obj.PurchaseOrder_Id || m_obj.PurchaseOrder_Id == "0") && (!m_obj.ExpressOrder_Id || m_obj.ExpressOrder_Id == "0")) {
        if (m_obj.State == "1") {
            m_str += "<a onclick='openCancelAccountOutFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 3px'>" + mlm.C0062 + "</a>";
        } 
        else if (m_obj.State == "2") {
            m_str += "<a onclick='openAbortAccountOutRecordFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 3px'>" + mlm.C1548 + "</a>";
        }
    }

    return m_str;
}
/* 计算总收入费用 */
function calculateTotalReceive() {
    var m_accountinrecord = new fm.accountinrecord();
    m_accountinrecord.Keyword = pageVariable.queryAIRCondition.Keyword;
    m_accountinrecord.AIRType = pageVariable.queryAIRCondition.AIRType;
    m_accountinrecord.SalePlatformId = pageVariable.queryAIRCondition.SalePlatformId;
    m_accountinrecord.SaleSite_Id = pageVariable.queryAIRCondition.SaleSite_Id;
    m_accountinrecord.SysCurrency_Id = pageVariable.queryAIRCondition.SysCurrency_Id;
    m_accountinrecord.State = 100;
    m_accountinrecord.FromTime = pageVariable.queryAIRCondition.FromTime;
    m_accountinrecord.ToTime = pageVariable.queryAIRCondition.ToTime;
    m_accountinrecord.AccountYear = pageVariable.queryAIRCondition.AccountYear;
    m_accountinrecord.AccountMonth = pageVariable.queryAIRCondition.AccountMonth;
    m_accountinrecord.getWaitingReceive(function (tableSource) {

        var m_waitingReceives = datastruct.convertion.tableToJson(tableSource);

        var m_waitingStr = [];

        $.each(m_waitingReceives, function () {
            if (this.WaitingReceive > 0) {
                m_waitingStr.push("<a href='javascript:void(0)' onclick='queryWaitingReceiveRecord(" + this.SysCurrency_Id + ")'>" + commoncore.func.getCurrHtml(this.CurrSymbol, this.WaitingReceive) + "</a>");
            }
        });
        $("#lbTotalReceive").html(m_waitingStr.join("<span style='margin: 0px 10px 0px 5px'>,</span>"));
    });
}

/* 加载数据 */
function loadDataFromTabs() {

    pageVariable.accountOutSource = null;
    pageVariable.accountInSource = null;

    if (pageVariable.activetab == "accountout") {
        loadAccountOut();
    }
    else if (pageVariable.activetab == "accountin") {
        loadAccountIn();
    }
    else {
        loadFundRecords();
    }
}
/* 加载收入列表 */
function loadAccountIn() {

    if (!pageVariable.accountInList) {
        var currFormHeight = pageframe.layout.getTableHeightInForm() - 33;
        pageVariable.accountInList = new uicontrol.tableList("accountInList",
                                     { isPaging: true,
                                         autoSeq: true,
                                         height: currFormHeight,
                                         keyColumn: "AccountInRecord_Id",
                                         pageQueryHandler: innerQueryAccountInRecord,
                                         columns: [{ display: mlm.C0751, name: "AIRCode", width: 75, align: 'left', adjust: true, createCell: constructAICell },
                                                   { display: mlm.C0750, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: constructDateCell },
                                                   { display: mlm.C0503, name: "", width: 80, align: 'left', adjust: true, createCell: constructRvTypeCell },
                                                   { display: mlm.C0675, name: "RvObject", width: 175, align: 'left', adjust: true, createCell: constructRvObjectCell },
                                                   { display: mlm.C0676, name: "BizContent", width: 280, align: 'left', adjust: true, createCell: constructRevBizConentCell },
                                                   { display: mlm.C0722, name: "Receive", width: 125, align: 'right', adjust: true, createCell: constructReceiveCell },
                                                   { display: mlm.C0500, name: "State", width: 170, align: 'left', adjust: true, createCell: constructReceiveStateCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructFIOperaCell}]
                                     });
    }

    if (!pageVariable.accountInSource) {
        var m_dateitems = null;
        var m_date = $("#ddlAccoutTime").val();
        if (m_date) {
            m_dateitems = m_date.split("-");
            pageVariable.queryAIRCondition = {
                Keyword: "",
                AIRType: "",
                SalePlatformId: "",
                SaleSite_Id: "",
                SysCurrency_Id: "",
                State: "",
                FromTime: "",
                ToTime: "",
                AccountYear: m_dateitems[0],
                AccountMonth: m_dateitems[1]
            };

            $("#lbTotalReceiveSymbol").text(mlm.C0525 + "(" + mlm.C0865 + m_date + ") :");
        }
        else {
            pageVariable.queryAIRCondition = {
                Keyword: "",
                AIRType: "",
                SalePlatformId: "",
                SaleSite_Id: "",
                SysCurrency_Id: "",
                State: "",
                FromTime: "",
                ToTime: ""
            };
        }

        //innerQueryAccountInRecord(1, pageVariable.accountInList.pageNumber);

        calculateTotalReceive();
    }
}
/* 查询应收账目 */
function queryAccountInRecord(pageNum, pageCount) {
    var m_keyword = $("#txtRvKeywordForQ").val();
    var m_airType = $("#ddlAIRTypeForQ").val();
    var m_shoppingSiteId = $("#ddlSalePlatformForRvForQ").val();
    var m_salesite_id = $("#ddlSaleAreaForRvForQ").val();
    var m_sysCurrency_Id = $("#ddlCurrencyForRvForQ").val();
    var m_state = $("#ddlReceiveStateForQ").val();
    var m_fromtime = $("#fromDatePickerForReceive").val();
    var m_totime = $("#toDatePickerForReceive").val();

    pageVariable.queryAIRCondition = {
        Keyword: m_keyword,
        AIRType: m_airType,
        SalePlatformId: m_shoppingSiteId,
        SaleSite_Id: m_salesite_id,
        SysCurrency_Id: m_sysCurrency_Id,
        State: m_state,
        FromTime: m_fromtime,
        ToTime: m_totime,
        AccountYear: "",
        AccountMonth: ""
    };

    var m_fromstr = "";
    if (!m_fromtime) {
        m_fromstr = mlm.C0866;
    }
    else {
        m_fromstr = m_fromtime;
    }

    var m_tostr = "";
    if (!m_totime) {
        m_tostr = mlm.C0867;
    }
    else {
        m_tostr = m_totime;
    }

    $("#lbTotalReceiveSymbol").text(mlm.C0525 + "(" + m_fromstr + mlm.C0412 + m_tostr + ") :");
    $("#ddlAccoutTime").val("");
    pageVariable.accountInSource = null;
    innerQueryAccountInRecord(1, pageVariable.accountOutList.pageNumber);

    calculateTotalReceive();
}
/* 查询待收款的应收账目 */
function queryWaitingReceiveRecord(syscurrency_id) {

    pageVariable.queryAIRCondition = {
        Keyword: "",
        AIRType: "",
        SalePlatformId: "",
        SaleSite_Id: "",
        SysCurrency_Id: syscurrency_id,
        State: 100,
        FromTime: "",
        ToTime: ""
    };

    pageVariable.accountInSource = null;
    innerQueryAccountInRecord(1, pageVariable.accountOutList.pageNumber);
}
/* 查询应收账目 */
function innerQueryAccountInRecord(pageNum, pageCount) {

    /* 展示进度 */
    pageframe.control.processCtrl.showOperaProcess();

    var m_accountinrecord = new fm.accountinrecord();
    m_accountinrecord.queryAccountInRecord(pageVariable.queryAIRCondition.Keyword,
                                           pageVariable.queryAIRCondition.AIRType,
                                           pageVariable.queryAIRCondition.SalePlatformId,
                                           pageVariable.queryAIRCondition.SaleSite_Id,
                                           pageVariable.queryAIRCondition.SysCurrency_Id,
                                           pageVariable.queryAIRCondition.State,
                                           pageVariable.queryAIRCondition.FromTime,
                                           pageVariable.queryAIRCondition.ToTime,
                                           pageVariable.queryAIRCondition.AccountYear,
                                           pageVariable.queryAIRCondition.AccountMonth, pageNum, pageCount,
                                           function (tableSource) {

                                               pageVariable.accountInSource = tableSource;
                                               pageVariable.accountInList.dataSource.page = pageNum;

                                               pageVariable.accountInList.bindDataSource(tableSource);

                                               var m_jsonobjs = datastruct.convertion.tableToJson(tableSource);
                                               $.each(m_jsonobjs, function () {
                                                   var m_itemCtrl = $("#lbRevBizCon_" + this.AccountInRecord_Id);
                                                   m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
                                               });

                                               /* 隐藏进度 */
                                               pageframe.control.processCtrl.hideOperaProcess();
                                           });

}

/* 构建账单列 */
function constructAICell(key, cellValue) {
    var m_obj = this.keyObj;
    var m_codestr = "<a onclick='viewReceiveIn.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + m_obj.AIRCode + "</a>";
    return m_codestr;
}
/* 构建账单类别列 */
function constructRvTypeCell(key, cellValue) {
    var m_type = "";
    if (this.keyObj.AIRType == "1") {
        m_type = mlm.C0506;
    }
    else if (this.keyObj.AIRType == "3") {
        m_type = mlm.C0854;
    }
    else if (this.keyObj.AIRType == "4") {
        m_type = mlm.C0855;
    }
    else if (this.keyObj.AIRType == "5") {
        m_type = mlm.C0627;
    }
    else if (this.keyObj.AIRType == "10") {
        m_type = mlm.C0891;
    }

    return m_type;
}
/* 构建交易对方列 */
function constructRvObjectCell(key, cellValue) {

    var m_arr = [];

    if (this.keyObj.Customer_Id && this.keyObj.Customer_Id != "0") {
        m_arr.push("<div style='padding: 0px'>" + this.keyObj.CustName + "</div>");
    }
    else if (this.keyObj.Supplier_Id && this.keyObj.Supplier_Id != "0") {
        m_arr.push("<div style='padding: 0px'>" + this.keyObj.SuppName + "</div>");
    }
    else {
        m_arr.push("<div style='padding: 0px'>" + cellValue + "</div>");
    }

    if (this.keyObj.SPfName) {
        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + this.keyObj.SPfName);
        if (this.keyObj.SaleSiteName) {
            m_arr.push("-" + this.keyObj.SaleSiteName);
        }
        m_arr.push(")</div>");
    }

    return m_arr.join("");
}
/* 构建费用收入列 */
function constructReceiveCell(key, cellValue) {

    var m_obj = this.keyObj;

    return commoncore.func.getCurrHtml(m_obj.CurrSymbol, cellValue);
}
/* 构建业务内容列 */
function constructRevBizConentCell(key, cellvalue) {

    if (this.keyObj.SaleOrder_Id && this.keyObj.SaleOrder_Id != "0") {
        if (this.keyObj.AS_Problem_Id && this.keyObj.AS_Problem_Id != "0") {
            return "<span>" + mlm.C1546 + ": </span><span>" + this.keyObj.ASPCode + "</span>";
        }
        else {
            return "<span>" + mlm.C0938 + ": </span><span>" + this.keyObj.SOCode + "</span>";
        }
    }
    else if (this.keyObj.PurchaseOrder_Id && this.keyObj.PurchaseOrder_Id != "0") {
        return "<span>" + mlm.C0893 + ": </span><span>" + this.keyObj.POCode + "</span>";
    }
    else {
        var m_len = cellvalue.getBytesCount();
        if (m_len > 100) {
            var m_str = cellvalue.substringByBytes(100) + "...";
            return "<span id='lbRevBizCon_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
        }
        else {
            return cellvalue;
        }
    }
}
/* 构建状态列 */
function constructReceiveStateCell(key, cellValue) {

    var m_obj = this.keyObj;

    var m_htmls = [];
    if (cellValue == "1") {
        m_htmls.push("<div style='padding: 0px'>" + mlm.C0508 + "</div>");
    }
    else if (cellValue == "2") {
        m_htmls.push("<div style='padding: 0px'>" + mlm.C0509 + "</div>");

        var m_freezeprfund = Number(m_obj.FreezePRFund);
        if (m_freezeprfund > 0) {
            m_htmls.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0869 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_freezeprfund) + "</span>)</div>");
        }
        var m_unfund = Number((Number(m_obj.Receive) - Number(m_obj.ReceivedIn) - Number(m_obj.FreezePRFund)).toFixed(2));
        if (m_unfund > 0) {
            m_htmls.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0757 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_unfund) + "</span>)</div>");
        }
    }
    else if (cellValue == "3") {
        m_htmls.push("<div style='padding: 0px'>" + mlm.C0539 + "</div>");
    }
    else {
        m_htmls.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
    }

    return m_htmls.join("");
}
/* 构建收款操作列 */
function constructFIOperaCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_str = "";
    if (m_obj.State == "1" || m_obj.State == "2") {
        m_str = "<a onclick='openModifyAccountInFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0540 + "</a>";
    }

    if ((!m_obj.SaleOrder_Id || m_obj.SaleOrder_Id == "0") && (!m_obj.PurchaseOrder_Id || m_obj.PurchaseOrder_Id == "0")) {
        if (m_obj.State == "1") {
            m_str += "<a onclick='openCancelAccountInFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 5px'>" + mlm.C0062 + "</a>";
        }
        else if (m_obj.State == "2") {
            if (Number(m_obj.Receive) > Number(m_obj.ReceivedIn) + Number(m_obj.FreezePRFund)) {
                m_str += "<a onclick='openAbortAccountInRecordFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 3px'>" + mlm.C1548 + "</a>";
            }
        }
    }

    return m_str;
}

/* 构建执行动作列 */
function constructFlowActionCell(key, cellValue) {
    var m_obj = this.keyObj;

    if (cellValue && cellValue != "0") {
        return mlm.C0541;
    }
    else {
        return mlm.C0542;
    }
}
/* 构建资金列 */
function constructFundFlowCell(key, cellValue) {
    var m_obj = this.keyObj;

    return commoncore.func.getCurrHtml(m_obj.CurrSymbol, cellValue);
}
/* 构建账目结算金额列 */
function constructPRFundCell(key, cellValue) {
    var m_obj = this.keyObj;
    return commoncore.func.getCurrHtml(m_obj.AORCurrSymbol, cellValue);
}
/* 构建费用支出列 */
function constructFundForPayCell(key, cellValue) {
    return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
}
/* 构建支出/收入列 */
function constructObjCodeCell(key, cellValue) {
    var m_obj = this.keyObj;

    if (m_obj.AccountOutRecord_Id && m_obj.AccountOutRecord_Id != "0") {
        return "<a onclick='viewAccountOut.call(this, \"" + m_obj.AccountOutRecord_Id + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a>";
    }
    else {
        return "<a onclick='viewReceiveIn.call(this, \"" + m_obj.AccountInRecord_Id + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a>";
    }
}
/* 构建账目结算金额列 */
function constructPRFundForPayCell(key, cellValue) {
    return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
}
/* 构建结算账目操作列 */
function constructPRFundForPayOperaCell(key, cellValue) {
    var m_str;
    if (!this.keyObj.ReadOnly) {
        m_str = "<a onclick='openModifyFundForAOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0061 + "</a>" +
                "<a onclick='openDeleteFundForAOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 5px'>" + mlm.C0062 + "</a>";
    }

    return m_str;
}

/* 打开添加财务支出的窗体 */
function openNewAccountOutFrm() {

    pageVariable.handFundFlowForPay = "1";

    if (!pageVariable.handlerAccountOutFrm) {
        pageVariable.handlerAccountOutFrm = new uicontrol.dialog("handlerAccountOutFrm", mlm.C0530 + mlm.C0543, { width: 1000, position: ["auto", 5] }, saveAccountOut);

        var m_currCtrl = $("#ddlOutCurrency");
        m_currCtrl.change(function () { pageVariable.paidfundList.bindDataSource(null) });
        loadCurrenies(m_currCtrl, null);

        loadSalePlatforms($("#ddlSalePlatform"), $("#ddlSaleArea"));
        pageVariable.selectcostsubject = new bizcontrol.selectcostsubject("selectCostSubject");

        $("#btAddPaid").click(function () {
            openNewFundForAOFrm();
        });

        pageVariable.handlerAccountOutFrm.show();

        pageVariable.paidfundList = new uicontrol.tableList("paidfundList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 100,
                                         keyColumn: "FundFlowRecord_Id",
                                         columns: [
                                                   { display: mlm.C0518, name: "PRFund", width: 125, align: 'right', adjust: true, createCell: constructPRFundForPayCell },
                                                   { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                   { display: mlm.C0529, name: "FlowFund", width: 125, align: 'right', adjust: true, createCell: constructFundForPayCell },
                                                   { display: mlm.C0532, name: "LosedFund", width: 100, align: 'right', adjust: true, createCell: constructFundForPayCell },
                                                   { display: mlm.C0517, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0860, name: "OperateTime", width: 80, align: 'left', adjust: true, createCell: commoncore.func.constructDateTimeCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructPRFundForPayOperaCell}]
                                     });

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtAOOperateTime").datepicker();
        $("#txtAOOperateTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());
    }
    else {
        pageVariable.handlerAccountOutFrm.show();
    }

    $("#txtPayout").val("0.00");
    $("#txtAOutRemark").val("");
    $("#txtPayObject").val("");
    $("#txtBizContent").val("");
    $("#lbAOOperatedby").text($("#userInfo").text());
    pageVariable.paidfundList.bindDataSource(null);

    pageVariable.handlerAccountOutFrm.action = "New";
}
/* 打开修改财务支出的窗体 */
function openModifyAccountOutFrm(key) {

    pageVariable.handFundFlowForPay = "2";
    if (pageVariable.handerFundForAOFrm) {
        pageVariable.handerFundForAOFrm.fundflowrecord_id = "0";
    }

    if (!pageVariable.handlerPayoutFrm) {
        pageVariable.handlerPayoutFrm = new uicontrol.dialog("handlerPayoutFrm", mlm.C0537, { width: 1000, position: ["auto", 5] }, payForAccountOut);

        $("#btAddPaidForPay").click(function () {
            openNewFundForAOFrm();
        });

        pageVariable.handlerPayoutFrm.show();

        pageVariable.paidfundForPayList = new uicontrol.tableList("paidfundForPayList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 150,
                                         keyColumn: "FundFlowRecord_Id",
                                         columns: [{ display: mlm.C0518, name: "PRFund", width: 125, align: 'right', adjust: true, createCell: constructPRFundForPayCell },
                                                   { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                   { display: mlm.C0529, name: "FlowFund", width: 125, align: 'right', adjust: true, createCell: constructFundForPayCell },
                                                   { display: mlm.C0532, name: "LosedFund", width: 100, align: 'right', adjust: true, createCell: constructFundForPayCell },
                                                   { display: mlm.C0517, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0860, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: constructDateCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructPRFundForPayOperaCell}]
                                     });
    }

    var m_accountoutrecord = new fm.accountoutrecord();
    m_accountoutrecord.AccountOutRecord_Id = key;
    m_accountoutrecord.readAccountOutRecord(function (retObj) {

        $("#lbCostSubjectForPay").text(retObj.OtherProps.CostSubjectName);
        $("#lbPayoutForPay").html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.Payout));
        $("#lbAOutRemarkForPay").text(retObj.Remark);

        var m_payobject = "";
        if (retObj.Customer_Id && retObj.Customer_Id != "0") {
            m_payobject = retObj.OtherProps.CustName;
        }
        if (retObj.Supplier_Id && retObj.Supplier_Id != "0") {
            m_payobject = retObj.OtherProps.SuppName;
        }
        else {
            m_payobject = retObj.PayObject;
        }
        $("#lbPayObjectForPay").text(m_payobject);

        var m_bizcontent = "";
        if (retObj.SaleOrder_Id && retObj.SaleOrder_Id != "0") {
            if (retObj.AS_Problem_Id && retObj.AS_Problem_Id != "0") {
                m_bizcontent = mlm.C1546 + ": " + retObj.OtherProps.ASPCode;
            }
            else {
                m_bizcontent = mlm.C0938 + ": " + retObj.OtherProps.SOCode;
            }
        }
        if (retObj.PurchaseOrder_Id && retObj.PurchaseOrder_Id != "0") {
            m_bizcontent = mlm.C0893 + ": " + retObj.OtherProps.POCode;
        }
        else if (retObj.ExpressOrder_Id && retObj.ExpressOrder_Id != "0") {
            m_bizcontent = mlm.C1316 + ": " + retObj.OtherProps.EOCode + "(" + retObj.OtherProps.LstSolutionName + ", ";

            if (retObj.OtherProps.TrackingNumber) {
                m_bizcontent += retObj.OtherProps.TrackingNumber + ")";
            }
            else {
                m_bizcontent += retObj.OtherProps.OutEOCode ? retObj.OtherProps.OutEOCode : mlm.C1291 + mlm.C1322 + ")";
            }
        }
        else {
            m_bizcontent = retObj.BizContent;
        }
        $("#lbBizContentForPay").text(m_bizcontent);

        if (retObj.OtherProps.SaleSiteName) {
            $("#lbAOPriceArea").text(retObj.OtherProps.SPfName + "-" + retObj.OtherProps.SaleSiteName);
        }
        else {
            $("#lbAOPriceArea").text(retObj.OtherProps.SPfName);
        }

        $("#lbAORCodeForPay").text(retObj.AORCode);
        $("#lbOperateTimeForPay").text(commoncore.func.getTimeStrCell(retObj.OtherProps.OperateTimeStr));

        $.each(retObj.PaidFunds, function () {
            this.FundAccount = this.OtherProps.FundAccount;
            this.CurrName = this.OtherProps.CurrName;
            this.FundAccount = this.OtherProps.FundAccount;
            this.CurrSymbol = this.OtherProps.CurrSymbol;
            this.AORCurrName = retObj.OtherProps.CurrName;
            this.AORCurrSymbol = retObj.OtherProps.CurrSymbol;
            this.OperateTimeStr = this.OtherProps.OperateTimeStr;
            this.ReadOnly = true;
        });

        var m_tablesource = datastruct.convertion.jsonToTable(retObj.PaidFunds);

        pageVariable.paidfundForPayList.bindDataSource(m_tablesource);

        pageVariable.handlerPayoutFrm.accountOutRecourd = retObj;

        calRemainPay();

        pageVariable.handlerPayoutFrm.accountoutrecord_id = key;
        pageVariable.handlerPayoutFrm.show();
    });
}
/* 计算待付金额（支付） */
function calRemainPay() {

    if (pageVariable.handFundFlowForPay == "2") {
        var m_totalpaid = 0;
        $.each(pageVariable.paidfundForPayList.dataSource.items.arrValues, function () {
            m_totalpaid += Number(this.PRFund);
        });
        var m_remaind = Number(pageVariable.handlerPayoutFrm.accountOutRecourd.Payout) - m_totalpaid;
        pageVariable.handlerPayoutFrm.accountOutRecourd.PayRemaid = m_remaind;

        $("#lbRemainPay").show();
        $("#lbRemainPay").html("(" + mlm.C0757 + ":" + commoncore.func.getCurrHtml(pageVariable.handlerPayoutFrm.accountOutRecourd.OtherProps.CurrSymbol, m_remaind) + ")");

    }
}
/* 初始化资金支出的窗体 */
function initFundForAOFrm(event) {
    var m_fundPaidCtrl = $("#txtFundPaidForAO");
    var m_fundLosedCtrl = $("#txtFundLosed");
    var m_RateCtrl = $("#txtRateForAO");
    var m_outFundCtrl = $("#txtOutFundForAO");

    if (!pageVariable.handerFundForAOFrm) {
        pageVariable.handerFundForAOFrm = new uicontrol.dialog("handerFundForAOFrm", mlm.C0530 + mlm.C0529, { width: 800, position: ["auto", 15] }, saveFundOutRecord);

        var m_calFunc = function () {
            m_outFundCtrl.val((Number(m_RateCtrl.val()) * (Number(m_fundPaidCtrl.val() - (Number(m_fundLosedCtrl.val()))))).toFixed(2));
        };

        m_fundPaidCtrl.change(m_calFunc);
        m_RateCtrl.change(m_calFunc);
        m_fundLosedCtrl.change(m_calFunc);

        m_outFundCtrl.change(function () {
            m_fundPaidCtrl.val((Number($(this).val()) / Number(m_RateCtrl.val()) + Number(m_fundLosedCtrl.val())).toFixed(2));
        });

        var currencyCtrl = $("#ddlCurrencyForAO");
        pageVariable.currChangeFuncForAO = function () {

            var m_ourcurrencyCtrl = $("#ddlOutCurrency");
            var m_outCurrName;
            var m_outSysCurrency_Id;
            if (pageVariable.handFundFlowForPay == "1") {
                m_outCurrName = m_ourcurrencyCtrl.find("option:selected").text();
                m_outSysCurrency_Id = m_ourcurrencyCtrl.val();
            }
            else {
                m_outCurrName = pageVariable.handlerPayoutFrm.accountOutRecourd.OtherProps.CurrName;
                m_outSysCurrency_Id = pageVariable.handlerPayoutFrm.accountOutRecourd.SysCurrency_Id;
            }

            if (currencyCtrl.val() == getCurrId()) {
                $("#dvRateForAO").hide();
                $("#txtRateForAO").val("1.0000");
            }
            else {
                $("#dvRateForAO").show();
                $("#lbRateForAOAlert").text(currencyCtrl.find("option:selected").text() + "对" + m_outCurrName);
            }
        };
        currencyCtrl.change(pageVariable.currChangeFuncForAO);

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtOutFundTime").datepicker();
        $("#txtOutFundTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        loadAllAccount($("#ddlFundAccountForAO"), null, function () {
            loadCurrenies($("#ddlCurrencyForAO"), null, event);
        });
    }
    else {
        event();
    }
}
/* 打开新增资金支出的窗体 */
function openNewFundForAOFrm() {

    initFundForAOFrm(fillFundForAOCtrl);
    pageVariable.handerFundForAOFrm.fundflowrecord_id = 0;

    

    pageVariable.handerFundForAOFrm.action = "New";
    pageVariable.handerFundForAOFrm.show();
}
/* 打开修改资金支出的窗体 */
function openModifyFundForAOFrm(key) {

    pageVariable.handerFundForAOFrm.fundflowrecord_id = key;

    initFundForAOFrm(fillFundForAOCtrl);

    pageVariable.handerFundForAOFrm.action = "Modify";
    pageVariable.handerFundForAOFrm.show();
}
/* 填充资金支出数据 */
function fillFundForAOCtrl() {

    if (pageVariable.handerFundForAOFrm.fundflowrecord_id == "0") {
        $("#txtFundLosed").val("0.00");
        $("#txtRateForAO").val("1.0000");

        if (pageVariable.handFundFlowForPay == "1") {
            $("#txtFundPaidForAO").val($("#txtPayout").val());
            $("#txtOutFundForAO").val($("#txtPayout").val());
            $("#ddlCurrencyForAO").val($("#ddlOutCurrency").val());
        }
        else {
            $("#txtFundPaidForAO").val(pageVariable.handlerPayoutFrm.accountOutRecourd.PayRemaid);
            $("#txtOutFundForAO").val(pageVariable.handlerPayoutFrm.accountOutRecourd.PayRemaid);
            $("#ddlCurrencyForAO").val(pageVariable.handlerPayoutFrm.accountOutRecourd.SysCurrency_Id);
        }
    }
    else {
        var m_selectItem;

        //付款
        if (pageVariable.handFundFlowForPay == "1") {
            m_selectItem = pageVariable.paidfundList.getItem(pageVariable.handerFundForAOFrm.fundflowrecord_id);
        }
        else {
            m_selectItem = pageVariable.paidfundForPayList.getItem(pageVariable.handerFundForAOFrm.fundflowrecord_id);
        }

        $("#ddlFundAccountForAO").val(m_selectItem.FundAccount_Id);
        $("#ddlCurrencyForAO").val(m_selectItem.SysCurrency_Id);
        $("#txtFundPaidForAO").val(Number(m_selectItem.FlowFund).toFixed(2));
        $("#txtFundLosed").val(Number(m_selectItem.LosedFund).toFixed(2));
        $("#txtRateForAO").val(Number(m_selectItem.Rate).toFixed(4));
        $("#txtOutFundForAO").val(Number(m_selectItem.Paidout).toFixed(2));
        $("#txtOutFundTime").text(commoncore.func.constructDateTimeCell(null, m_selectItem.OperateTime).toString());
    }

    pageVariable.currChangeFuncForAO();
}
/* 打开删除资金支出的窗体 */
function openDeleteFundForAOFrm(key) {
    if (!pageVariable.delFundForAOFrm) {
        pageVariable.delFundForAOFrm = new uicontrol.confirmDelete(deleteFundOutRecord);
    }

    pageVariable.delFundForAOFrm.fundflowrecord_id = key;
    pageVariable.delFundForAOFrm.showConfirm(mlm.C0464 + mlm.C0529 + "?");
}
/* 保存资金支出 */
function saveFundOutRecord() {

    var m_accountCtrl = $("#ddlFundAccountForAO");
    var m_fundaccount_id = m_accountCtrl.val();

    if (!m_fundaccount_id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0551);
        return;
    }

    var m_currCtrl = $("#ddlCurrencyForAO");

    var m_fundoutrecord = {};

    m_fundoutrecord.FundAccount_Id = m_fundaccount_id;
    m_fundoutrecord.FundAccount = m_accountCtrl.find("option:selected").text();
    m_fundoutrecord.SysCurrency_Id = m_currCtrl.val();

    var m_selectedCurr = m_currCtrl.find("option:selected");

    m_fundoutrecord.CurrName = m_selectedCurr.text();
    m_fundoutrecord.CurrSymbol = m_selectedCurr.attr("tag");

    m_fundoutrecord.FlowFund = Number($("#txtFundPaidForAO").val());
    m_fundoutrecord.LosedFund = Number($("#txtFundLosed").val());
    m_fundoutrecord.Rate = Number($("#txtRateForAO").val());
    m_fundoutrecord.Paidout = Number($("#txtOutFundForAO").val());
    m_fundoutrecord.OperateTime = $("#txtOutFundTime").val();
    m_fundoutrecord.ReadOnly = false;
    m_fundoutrecord.PRFund = $("#txtOutFundForAO").val();

    //付款处理
    var m_tableCtrl;
    var m_tid;
    var m_pay = 0;
    if (pageVariable.handFundFlowForPay == "1") {
        var m_outCurrCtrl = $("#ddlOutCurrency").find("option:selected");
        m_pay = Number($("#txtPayout").val());
        m_tableCtrl = pageVariable.paidfundList;
        m_tid = pageVariable.paidfundList.dataSource.totalCount;
        m_fundoutrecord.AORCurrName = m_outCurrCtrl.text();
        m_fundoutrecord.AORCurrSymbol = m_outCurrCtrl.attr("tag");
    }
    else {
        m_pay = pageVariable.handlerPayoutFrm.accountOutRecourd.Payout;
        m_tableCtrl = pageVariable.paidfundForPayList;
        m_tid = pageVariable.paidfundForPayList.dataSource.totalCount;
        m_fundoutrecord.AORCurrName = pageVariable.handlerPayoutFrm.accountOutRecourd.OtherProps.CurrName;
        m_fundoutrecord.AORCurrSymbol = pageVariable.handlerPayoutFrm.accountOutRecourd.OtherProps.CurrSymbol;
    }

    var m_payout = m_fundoutrecord.Paidout;
    $.each(m_tableCtrl.dataSource.items.arrValues, function () {
        if (this.FundFlowRecord_Id != pageVariable.handerFundForAOFrm.fundflowrecord_id) {
            m_payout += Number(this.PRFund);
        }
    });

    if (m_fundoutrecord.Paidout == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0545);
        return;
    }

    if (m_payout > m_pay) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0552);
        return;
    }

    if (m_fundoutrecord.Rate == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0553);
        return;
    }

    m_fundoutrecord.OperateTimeStr = m_fundoutrecord.OperateTime;

    if (pageVariable.handerFundForAOFrm.action == "New") {

        m_fundoutrecord.FundFlowRecord_Id = m_fundaccount_id + "-" + m_fundoutrecord.SysCurrency_Id + "-" + m_tid;
        m_tableCtrl.addData(m_fundoutrecord.FundFlowRecord_Id, m_fundoutrecord);
    }
    else {
        m_fundoutrecord.FundFlowRecord_Id = pageVariable.handerFundForAOFrm.fundflowrecord_id;
        m_tableCtrl.modifyData(m_fundoutrecord.FundFlowRecord_Id, m_fundoutrecord);
    }

    calRemainPay();

    pageVariable.handerFundForAOFrm.close();
}
/* 删除资金支付记录 */
function deleteFundOutRecord() {

    //付款
    if (pageVariable.handFundFlowForPay == "1") {
        pageVariable.paidfundList.deleteData(pageVariable.delFundForAOFrm.fundflowrecord_id);
    }
    else {
        pageVariable.paidfundForPayList.deleteData(pageVariable.delFundForAOFrm.fundflowrecord_id);
    }

    calRemainPay();

    pageVariable.delFundForAOFrm.close();
}
/* 保存财务支出 */
function saveAccountOut() {

    var m_payobject = $.trim($("#txtPayObject").val());
    if (!m_payobject) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0675 + mlm.C0451);
        return;
    }

    var m_costsubject = pageVariable.selectcostsubject.getObj();
    if (!m_costsubject.costSubject_Ids) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0544);
        return;
    }

    var m_bizcontent = $.trim($("#txtBizContent").val());
    if (!m_bizcontent) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0676 + mlm.C0451);
        return;
    }

    var m_payout = $.trim($("#txtPayout").val());
    if (!m_payout || Number(m_payout) == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0758);
        return;
    }

    var m_accountoutrecord = new fm.accountoutrecord();
    m_accountoutrecord.AccountOutRecord_Id = 0;
    m_accountoutrecord.CostSubject_Id = m_costsubject.costSubject_Ids;
    m_accountoutrecord.SysCurrency_Id = $("#ddlOutCurrency").val();
    m_accountoutrecord.Payout = m_payout;
    m_accountoutrecord.Remark = $("#txtAOutRemark").val();
    m_accountoutrecord.SalePlatform_Id = $("#ddlSalePlatform").val();
    m_accountoutrecord.SaleSite_Id = $("#ddlSaleArea").val();
    m_accountoutrecord.PayObject = m_payobject;
    m_accountoutrecord.BizContent = m_bizcontent;
    m_accountoutrecord.OperateTime = $("#txtAOOperateTime").val();

    m_accountoutrecord.PaidFunds = [];

    $.each(pageVariable.paidfundList.dataSource.items.arrValues, function () {
        var m_fundflowrecord = {};
        m_fundflowrecord.FundFlowRecord_Id = 0;
        m_fundflowrecord.AccountOutRecord_Id = 0;
        m_fundflowrecord.FlowFund = this.FlowFund;
        m_fundflowrecord.LosedFund = this.LosedFund;
        m_fundflowrecord.FundAccount_Id = this.FundAccount_Id;
        m_fundflowrecord.SysCurrency_Id = this.SysCurrency_Id;
        m_fundflowrecord.Rate = this.Rate; 
        m_fundflowrecord.PRFund = this.PRFund;
        m_fundflowrecord.OperateTime = this.OperateTime;

        m_accountoutrecord.PaidFunds.push(m_fundflowrecord);
    });

    m_accountoutrecord.handlerAccountOutRecord(function (retObj) {

        var m_obj = pageVariable.accountOutList.getItem(retObj.AccountOutRecord_Id);
        retObj.SPfName = retObj.OtherProps.SPfName;
        retObj.SaleSiteName = retObj.OtherProps.SaleSiteName;
        retObj.CostSubjectName = retObj.OtherProps.CostSubjectName;
        retObj.CurrSymbol = retObj.OtherProps.CurrSymbol;
        retObj.FullName = retObj.OtherProps.FullName;
        retObj.OperateTimeStr = m_accountoutrecord.OperateTime;

        pageVariable.accountOutList.addData(retObj.AccountOutRecord_Id, retObj);

        calculateTotalPayout();

        pageVariable.handlerAccountOutFrm.close();
    });
}
/* 付款 */
function payForAccountOut() {
    var m_accountoutrecord = new fm.accountoutrecord();
    m_accountoutrecord.AccountOutRecord_Id = pageVariable.handlerPayoutFrm.accountoutrecord_id;

    m_accountoutrecord.PaidFunds = [];

    $.each(pageVariable.paidfundForPayList.dataSource.items.arrValues, function () {

        if (!this.ReadOnly) {
            var m_fundflowrecord = {};
            m_fundflowrecord.FundFlowRecord_Id = 0;
            m_fundflowrecord.AccountOutRecord_Id = 0;
            m_fundflowrecord.FlowFund = this.FlowFund;
            m_fundflowrecord.LosedFund = this.LosedFund;
            m_fundflowrecord.FundAccount_Id = this.FundAccount_Id;
            m_fundflowrecord.SysCurrency_Id = this.SysCurrency_Id;
            m_fundflowrecord.Rate = this.Rate;
            m_fundflowrecord.PRFund = this.PRFund;
            m_fundflowrecord.OperateTime = this.OperateTime;

            m_accountoutrecord.PaidFunds.push(m_fundflowrecord);
        }
    });

    if (m_accountoutrecord.PaidFunds.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0545);
        return;
    }

    m_accountoutrecord.handlerAccountOutRecord(function (retObj) {

        var m_obj = pageVariable.accountOutList.getItem(retObj.AccountOutRecord_Id);
        retObj.SPfName = retObj.OtherProps.SPfName;
        retObj.SaleSiteName = retObj.OtherProps.SaleSiteName;
        retObj.CostSubjectName = retObj.OtherProps.CostSubjectName;
        retObj.CurrSymbol = retObj.OtherProps.CurrSymbol;
        retObj.FullName = retObj.OtherProps.FullName;
        retObj.OperateTime = retObj.OtherProps.OperateTime;
        retObj.Customer_Id = m_obj.Customer_Id;
        retObj.CustName = m_obj.CustName;
        retObj.SuppName = m_obj.SuppName;
        retObj.SaleOrder_Id = m_obj.SaleOrder_Id;
        retObj.SOCode = m_obj.SOCode;
        retObj.OperateTimeStr = m_obj.OperateTimeStr;
        retObj.POCode = m_obj.POCode;
        retObj.ASPCode = m_obj.ASPCode;

        pageVariable.accountOutList.modifyData(retObj.AccountOutRecord_Id, retObj);

        calculateTotalPayout();

        pageVariable.handlerPayoutFrm.close();
    });
}
/* 打开撤消财务支出的窗体 */
function openCancelAccountOutFrm(key) {
    if (!pageVariable.handlerCancelAccountOutFrm) {
        pageVariable.handlerCancelAccountOutFrm = new uicontrol.dialog("handlerCancelAccountOutFrm", mlm.C1548 + mlm.C1500, { width: 800 }, cancelAccountOut);
    }

    var m_obj = pageVariable.accountOutList.getItem(key);

    $("#lbAlertForCancelSymbol").html(mlm.C1545 + "(" + m_obj.AORCode + ")?");

    pageVariable.handlerCancelAccountOutFrm.accountoutrecord_id = key;
    pageVariable.handlerCancelAccountOutFrm.show();
}
/* 撤消财务支出 */
function cancelAccountOut() {
    var m_accountoutrecord = new fm.accountoutrecord();
    m_accountoutrecord.AccountOutRecord_Id = pageVariable.handlerCancelAccountOutFrm.accountoutrecord_id;
    m_accountoutrecord.cancelAccountOutRecord(function () {

        pageVariable.accountOutList.deleteData(m_accountoutrecord.AccountOutRecord_Id);

        calculateTotalPayout();

        pageVariable.handlerCancelAccountOutFrm.close();
    });
}
/*   */
function openAbortAccountOutRecordFrm(key) {
    if (!pageVariable.handlerAbortAccountOutFrm) {
        pageVariable.handlerAbortAccountOutFrm = new uicontrol.dialog("handlerAbortAccountOutFrm", mlm.C0546, { width: 800 }, abortAccountOutRecord);
    }

    var m_obj = pageVariable.accountOutList.getItem(key);

    $("#lbAlertForAbortSymbol").html(mlm.C0759 + "(" + m_obj.AORCode + ")?");

    pageVariable.handlerAbortAccountOutFrm.accountoutrecord_id = key;
    pageVariable.handlerAbortAccountOutFrm.show();
}
/*  */
function abortAccountOutRecord() {
    var m_accountoutrecord = new fm.accountoutrecord();
    m_accountoutrecord.AccountOutRecord_Id = pageVariable.handlerAbortAccountOutFrm.accountoutrecord_id;
    m_accountoutrecord.abortAccountOutRecord(function () {

        var m_obj = pageVariable.accountOutList.getItem(m_accountoutrecord.AccountOutRecord_Id);
        m_obj.State = 3;
        m_obj.Payout = m_obj.Paidout;
        pageVariable.accountOutList.modifyData(m_obj.AccountOutRecord_Id, m_obj);

        calculateTotalPayout();

        pageVariable.handlerAbortAccountOutFrm.close();
    });
}
/* 查看财务支出 */
function viewAccountOut(key) {
    if (!pageVariable.viewAccountOutFrm) {
        pageVariable.viewAccountOutFrm = new bizcontrol.viewaccountoutrecord();
    }
    pageVariable.viewAccountOutFrm.show(key);
}

/* 加载销售平台 */
function loadSalePlatforms(shoppingSiteCtrl, saleSiteCtrl, isnotnull) {

    if (!pageVariable.shoppingSiteSource) {

        pageVariable.shoppingSiteSource = {};
        pageVariable.shoppingSiteSource.shoppingList = [];
        pageVariable.shoppingSiteSource.shoppingSaleSites = new datastruct.dictionary();

        var m_saleplatform = new sm.saleplatform();
        m_saleplatform.queryAvaiSaleSites(function (tableSource) {

            var m_shoppingSiteAreas = datastruct.convertion.tableToJson(tableSource);
            $.each(m_shoppingSiteAreas, function () {
                if (!pageVariable.shoppingSiteSource.shoppingSaleSites.containKey(this.SalePlatform_Id)) {
                    pageVariable.shoppingSiteSource.shoppingList.push({ key: this.SalePlatform_Id, value: this.SPfName });

                    pageVariable.shoppingSiteSource.shoppingSaleSites.setItem(this.SalePlatform_Id, [{ key: this.SaleSite_Id, value: this.SaleSiteName}]);
                }
                else {
                    pageVariable.shoppingSiteSource.shoppingSaleSites.getItem(this.SalePlatform_Id).push({ key: this.SaleSite_Id, value: this.SaleSiteName });
                }
            });

            shoppingSiteCtrl.empty();

            if (!isnotnull) {
                shoppingSiteCtrl.append("<option></option>");
            }
            $.each(pageVariable.shoppingSiteSource.shoppingList, function () {
                shoppingSiteCtrl.append("<option value='" + this.key + "'>" + this.value + "</option>");
            });
            shoppingSiteCtrl.change(function () {
                var m_SalePlatform_Id = $(this).val();

                if (saleSiteCtrl) {
                    if (!m_SalePlatform_Id) {
                        saleSiteCtrl.empty();
                        return;
                    }

                    var m_saleSites = pageVariable.shoppingSiteSource.shoppingSaleSites.getItem(m_SalePlatform_Id);

                    saleSiteCtrl.empty();

                    if (!isnotnull) {
                        saleSiteCtrl.append("<option></option>");
                    }

                    $.each(m_saleSites, function () {
                        saleSiteCtrl.append("<option value='" + this.key + "'>" + this.value + "</option>");
                    });
                }
            });

            shoppingSiteCtrl.trigger("change");
        });
    }
    else {
        shoppingSiteCtrl.empty();

        if (!isnotnull) {
            shoppingSiteCtrl.append("<option></option>");
        }
        $.each(pageVariable.shoppingSiteSource.shoppingList, function () {
            shoppingSiteCtrl.append("<option value='" + this.key + "'>" + this.value + "</option>");
        });
        shoppingSiteCtrl.change(function () {
            var m_SalePlatform_Id = $(this).val();

            if (saleSiteCtrl) {
                if (!m_SalePlatform_Id) {
                    saleSiteCtrl.empty();
                    return;
                }

                var m_saleSites = pageVariable.shoppingSiteSource.shoppingSaleSites.getItem(m_SalePlatform_Id);

                saleSiteCtrl.empty();

                if (!isnotnull) {
                    saleSiteCtrl.append("<option></option>");
                }
                $.each(m_saleSites, function () {
                    saleSiteCtrl.append("<option value='" + this.key + "'>" + this.value + "</option>");
                });
            }
        });

        shoppingSiteCtrl.trigger("change");
    }
}
/* 加载货币 */
function loadCurrenies(currencyCtrl, isallownull, event) {

    if (!pageVariable.currsSource) {

        pageVariable.currsSource = [];
        var syscurrency = new othm.syscurrency();
        syscurrency.getAllSysCurrencys(function (source) {

            var m_currs = datastruct.convertion.tableToJson(source);
            $.each(m_currs, function () {
                pageVariable.currsSource.push({ key: this.SysCurrency_Id, value: this });
            });

            currencyCtrl.empty();

            if (isallownull) {
                currencyCtrl.append("<option></option>");
            }

            $.each(pageVariable.currsSource, function () {
                currencyCtrl.append("<option value='" + this.key + "' tag='" + this.value.CurrSymbol + "'>" + this.value.CurrName + "</option>");
            });

            if (event) {
                event();
            }
        });
    }
    else {
        currencyCtrl.empty();

        if (isallownull) {
            currencyCtrl.append("<option></option>");
        }

        $.each(pageVariable.currsSource, function () {
            currencyCtrl.append("<option value='" + this.key + "' tag='" + this.value.CurrSymbol + "'>" + this.value.CurrName + "</option>");
        });

        if (event) {
            event();
        }
    }
}

/* 获取货币(用于付款) */
function getCurrId() {
    var m_ourcurrencyCtrl = $("#ddlOutCurrency");

    var m_outSysCurrency_Id;
    if (pageVariable.handFundFlowForPay == "1") {
        m_outSysCurrency_Id = m_ourcurrencyCtrl.val();
    }
    else {
        m_outSysCurrency_Id = pageVariable.handlerPayoutFrm.accountOutRecourd.SysCurrency_Id;
    }

    return m_outSysCurrency_Id;
}

/* 打开添加收入账目的窗体 */
function openNewReceiveFrm() {

    pageVariable.handFundFlowForReceive = "1";

    if (!pageVariable.handlerReceiveFrm) {
        pageVariable.handlerReceiveFrm = new uicontrol.dialog("handlerReceiveFrm", mlm.C0530 + mlm.C0519, { width: 1100, position: ["auto", 5] }, saveReceiveIncome);

        $("#btNewFundReceive").click(openNewFundIncomeFrm);

        var m_currCtrl = $("#ddlCurrencyForRv");
        m_currCtrl.change(function () { pageVariable.fundReceiveList.bindDataSource(null) });

        loadCurrenies(m_currCtrl, null);
        loadSalePlatforms($("#ddlSalePlatformForRv"), $("#ddlSaleAreaForRv"));

        var m_airTypeCtrl = $("#ddlAIRType");
        m_airTypeCtrl.append("<option value='1'>" + mlm.C0506 + "</option>");
        m_airTypeCtrl.append("<option value='3'>" + mlm.C0854 + "</option>");
        m_airTypeCtrl.append("<option value='4'>" + mlm.C0855 + "</option>");
        m_airTypeCtrl.append("<option value='5'>" + mlm.C0627 + "</option>");
        m_airTypeCtrl.append("<option value='10'>" + mlm.C0891 + "</option>");
        m_airTypeCtrl.change(function () {

            var m_airtType = m_airTypeCtrl.val();
            
            if (m_airtType == "1" || m_airtType == "3") {
                $("#lbAlert_1, #lbAlert_2").show();
                $("#lbSymbol_8, #lbSymbol_9").show();
            }
            else {
                $("#lbAlert_1, #lbAlert_2").hide();
                $("#lbSymbol_8, #lbSymbol_9").hide();
            }

            if (m_airtType == "2") {
                $("#dvSaleAreaForAI").hide();
            }
            else {
                $("#dvSaleAreaForAI").show();
            }

        });

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtAROperateTime").datepicker();
        $("#txtAROperateTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        pageVariable.handlerReceiveFrm.show();

        pageVariable.fundReceiveList = new uicontrol.tableList("fundReceiveList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 100,
                                         keyColumn: "FundFlowRecord_Id",
                                         columns: [{ display: mlm.C0518, name: "PRFund", width: 125, align: 'right', adjust: true, createCell: constructPRFundForReceiveCell },
                                                   { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                   { display: mlm.C0555, name: "FlowFund", width: 125, align: 'right', adjust: true, createCell: constructFundForReceiveCell },
                                                   { display: mlm.C0536, name: "LosedFund", width: 100, align: 'right', adjust: true, createCell: constructFundForReceiveCell },
                                                   { display: mlm.C0517, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0861, name: "OperateTime", width: 80, align: 'left', adjust: true, createCell: commoncore.func.constructDateTimeCell },
                                                   { display: mlm.C0367, name: "State", width: 60, align: 'left', adjust: true, createCell: constructFundReceiveStateCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructPRFundForReceiveOperaCell}]
                                     });
    }
    else {
        pageVariable.handlerReceiveFrm.show();
    }

    $("#txtReceive").val("0.00");
    $("#txtRvRemark").val("");
    $("#txtReceiveObject").val("");
    $("#txtRvBizContent").val("");
    $("#lbAROperatedby").text($("#userInfo").text());
    pageVariable.fundReceiveList.bindDataSource(null);
}
/* 打开修改资金收入的窗体 */
function openModifyAccountInFrm(key) {

    pageVariable.handFundFlowForReceive = "2";

    if (!pageVariable.handlerReceiveInFrm) {
        pageVariable.handlerReceiveInFrm = new uicontrol.dialog("handlerReceiveInFrm", mlm.C0540, { width: 1100, position: ["auto", 5] }, receiveForAccountIn);

        $("#btNewFundReceiveForM").click(openNewFundIncomeFrm);

        pageVariable.fundReceiveForMList = new uicontrol.tableList("fundReceiveForMList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 100,
                                         keyColumn: "FundFlowRecord_Id",
                                         columns: [{ display: mlm.C0518, name: "PRFund", width: 125, align: 'right', adjust: true, createCell: constructPRFundForReceiveCell },
                                                   { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                   { display: mlm.C0555, name: "FlowFund", width: 125, align: 'right', adjust: true, createCell: constructFundForReceiveCell },
                                                   { display: mlm.C0536, name: "LosedFund", width: 100, align: 'right', adjust: true, createCell: constructFundForReceiveCell },
                                                   { display: mlm.C0517, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0861, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: constructDateCell },
                                                   { display: mlm.C0367, name: "State", width: 60, align: 'left', adjust: true, createCell: constructFundReceiveStateCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructPRFundForReceiveOperaCell}]
                                     });
    }

    var m_accountinrecord = new fm.accountinrecord();
    m_accountinrecord.AccountInRecord_Id = key;
    m_accountinrecord.readAccountInRecord(function (retObj) {

        $("#lbARCode").text(retObj.AIRCode);
        $("#lbARCreateTime").text(commoncore.func.getTimeStrCell(retObj.OtherProps.OperateTimeStr));

        if (retObj.AIRType == "1") {
            $("#lbRSubjectTypeForM").text(mlm.C0506);
            $("#dvARPriceArea").show();
        }
        else if (retObj.AIRType == "3") {
            $("#lbRSubjectTypeForM").text(mlm.C0854);
            $("#dvARPriceArea").show();
        }
        else if (retObj.AIRType == "4") {
            $("#lbRSubjectTypeForM").text(mlm.C0855);
            $("#dvARPriceArea").show();
        }
        else if (retObj.AIRType == "5") {
            $("#lbRSubjectTypeForM").text(mlm.C0627);
            $("#dvARPriceArea").show();
        }
        else if (retObj.AIRType == "10") {
            $("#lbRSubjectTypeForM").text(mlm.C0891);
            $("#dvARPriceArea").hide();
        }

        if (retObj.OtherProps.SaleSiteName) {
            $("#lbARPriceArea").text(retObj.OtherProps.SPfName + "-" + retObj.OtherProps.SaleSiteName);
        }
        else {
            $("#lbARPriceArea").text(retObj.OtherProps.SPfName);
        }

        $("#lbReceiveForM").html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.Receive));
        $("#lbRvRemarkForM").text(retObj.Remark);

        var m_rvobject = "";
        if (retObj.Customer_Id && retObj.Customer_Id != "0") {
            m_rvobject = retObj.OtherProps.CustName;
        }
        if (retObj.Supplier_Id && retObj.Supplier_Id != "0") {
            m_rvobject = retObj.OtherProps.SuppName;
        }
        else {
            m_rvobject = retObj.RvObject;
        }
        $("#lbRvObject").text(m_rvobject);

        var m_bizcontent = "";
        if (retObj.SaleOrder_Id && retObj.SaleOrder_Id != "0") {
            m_bizcontent = mlm.C0938 + ": " + retObj.OtherProps.SOCode;
        }
        if (retObj.PurchaseOrder_Id && retObj.PurchaseOrder_Id != "0") {
            m_bizcontent = mlm.C0893 + ": " + retObj.OtherProps.POCode;
        }
        else {
            m_bizcontent = retObj.BizContent;
        }
        $("#lbRIBizContent").text(m_bizcontent);

        var m_fundreceiveitems = [];
        var m_freezeReceive = 0;
        $.each(retObj.PreviewFundReceives, function () {
            var m_flowitem = {};
            m_flowitem.FundFlowRecord_Id = 10000 + Number(this.PreviewFundFlowRecord_Id);
            m_flowitem.FundAccount_Id = this.FundAccount_Id;
            m_flowitem.SysCurrency_Id = this.SysCurrency_Id;
            m_flowitem.PRFund = this.PRFund;
            m_flowitem.FlowFund = this.FlowFund;
            m_flowitem.LosedFund = this.LosedFund;
            m_flowitem.Rate = this.Rate;
            m_flowitem.CurrName = this.OtherProps.CurrName;
            m_flowitem.FundAccount = this.OtherProps.FundAccount;
            m_flowitem.CurrSymbol = this.OtherProps.CurrSymbol;
            m_flowitem.AORCurrName = retObj.OtherProps.CurrName;
            m_flowitem.AORCurrSymbol = retObj.OtherProps.CurrSymbol;
            m_flowitem.OperateTimeStr = this.OtherProps.OperateTimeStr;
            m_flowitem.ReadOnly = false;
            m_flowitem.State = "Freeze";

            m_freezeReceive += Number(this.PRFund);
            m_fundreceiveitems.push(m_flowitem);
        });
        $.each(retObj.FundReceives, function () {
            var m_flowitem = {};
            m_flowitem.FundFlowRecord_Id = this.FundFlowRecord_Id;
            m_flowitem.FundAccount_Id = this.FundAccount_Id;
            m_flowitem.SysCurrency_Id = this.SysCurrency_Id;
            m_flowitem.PRFund = this.PRFund;
            m_flowitem.FlowFund = this.FlowFund;
            m_flowitem.LosedFund = this.LosedFund;
            m_flowitem.Rate = this.Rate;
            m_flowitem.CurrName = this.OtherProps.CurrName;
            m_flowitem.FundAccount = this.OtherProps.FundAccount;
            m_flowitem.CurrSymbol = this.OtherProps.CurrSymbol;
            m_flowitem.AORCurrName = retObj.OtherProps.CurrName;
            m_flowitem.AORCurrSymbol = retObj.OtherProps.CurrSymbol;
            m_flowitem.OperateTimeStr = this.OtherProps.OperateTimeStr;
            m_flowitem.ReadOnly = true;
            m_flowitem.State = "";
            m_fundreceiveitems.push(m_flowitem);
        });
        var m_tablesource = datastruct.convertion.jsonToTable(m_fundreceiveitems);
        pageVariable.fundReceiveForMList.bindDataSource(m_tablesource);

        pageVariable.handlerReceiveInFrm.accountInRecourd = retObj;

        calRemainReceive();

        pageVariable.handlerReceiveInFrm.accountinrecord_id = key;
        pageVariable.handlerReceiveInFrm.show();
    });
}
/* 构建实收金额列 */
function constructFundForReceiveCell(key, cellValue) {
    return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
}
/* 构建账目结算金额列 */
function constructPRFundForReceiveCell(key, cellValue) {
    return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
}
/* 构建结算账目操作列 */
function constructPRFundForReceiveOperaCell(key, cellValue) {
    var m_str;
    if (!this.keyObj.ReadOnly) {
        m_str = "<a onclick='openModifyFundIncomeFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0061 + "</a>" +
                "<a onclick='openDeleteFundIncomeFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 5px'>" + mlm.C0062 + "</a>";
    }
    else {
        if (this.keyObj.State == "Freeze") {
            m_str = "<a onclick='openHandlerFreezeFundFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0871 + "</a>";
        }
    }

    return m_str;
}
/* 查看财务收入 */
function viewReceiveIn(key) {
    if (!pageVariable.viewAIRFrm) {
        pageVariable.viewAIRFrm = new bizcontrol.viewaccountinrecord();
    }
    pageVariable.viewAIRFrm.show(key);
}
/* 构建收款状态列 */
function constructFundReceiveStateCell(key, cellvalue) {
    if (cellvalue == "Freeze") {
        return mlm.C0872;
    }
    else {
        return mlm.C0873;
    }
}

/* 保存收入账目 */
function saveReceiveIncome() {

    var m_receiveobject = $.trim($("#txtReceiveObject").val());
    if (!m_receiveobject) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0675 + mlm.C0663);
        return;
    }

    var m_rvbizcontent = $.trim($("#txtRvBizContent").val());
    if (!m_rvbizcontent) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0676 + mlm.C0663);
        return;
    }

    var m_receive = $("#txtReceive").val();
    if (!m_receive || Number(m_receive) == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0758);
        return;
    }

    var m_accountinrecord = new fm.accountinrecord();
    

    var m_aitype = $("#ddlAIRType").val();
    if (m_aitype == "1" || m_aitype == "3") {

        m_accountinrecord.SaleSite_Id = $("#ddlSaleAreaForRv").val();
        if (!m_accountinrecord.SaleSite_Id) {

            if (m_aitype == "1" || m_aitype == "3") {
                pageframe.control.alertDialog.showAlertInfo(mlm.C0874);
                return;
            }

            m_accountinrecord.SaleSite_Id = 0;
        }

        m_accountinrecord.SalePlatform_Id = $("#ddlSalePlatformForRv").val();
        if (!m_accountinrecord.SalePlatform_Id) {
            m_accountinrecord.SalePlatform_Id = 0;
        }
    }
    else {
        if (m_aitype != "2") {
            m_accountinrecord.SalePlatform_Id = $("#ddlSalePlatformForRv").val();
            if (!m_accountinrecord.SalePlatform_Id) {
                m_accountinrecord.SalePlatform_Id = 0;
            }

            m_accountinrecord.SaleSite_Id = $("#ddlSaleAreaForRv").val();
            if (!m_accountinrecord.SaleSite_Id) {
                m_accountinrecord.SaleSite_Id = 0;
            }
        }
    }
    
    m_accountinrecord.AccountInRecord_Id = 0;
    m_accountinrecord.AIRType = m_aitype;
    m_accountinrecord.SysCurrency_Id = $("#ddlCurrencyForRv").val();
    m_accountinrecord.Receive = m_receive;
    m_accountinrecord.Remark = $("#txtRvRemark").val();
    m_accountinrecord.RvObject = m_receiveobject;
    m_accountinrecord.BizContent = m_rvbizcontent;
    m_accountinrecord.OperateTime = $("#txtAROperateTime").val();

    m_accountinrecord.FundReceives = [];

    var m_freezeprfund = 0;
    $.each(pageVariable.fundReceiveList.dataSource.items.arrValues, function () {
        
        if (this.State == "Freeze") {
            m_freezeprfund += Number(this.PRFund);
        }

        var m_fundflowrecord = {};
        m_fundflowrecord.FundFlowRecord_Id = 0;
        m_fundflowrecord.AccountInRecord_Id = 0;
        m_fundflowrecord.FlowFund = this.FlowFund;
        m_fundflowrecord.LosedFund = this.LosedFund;
        m_fundflowrecord.FundAccount_Id = this.FundAccount_Id;
        m_fundflowrecord.SysCurrency_Id = this.SysCurrency_Id;
        m_fundflowrecord.Rate = this.Rate;
        m_fundflowrecord.PRFund = this.PRFund;
        m_fundflowrecord.OperateTime = this.OperateTime;
        m_fundflowrecord.FundInType = this.FundInType;

        m_accountinrecord.FundReceives.push(m_fundflowrecord);
    });

    m_accountinrecord.handlerAccountInRecord(function (retObj) {

        var m_obj = pageVariable.accountInList.getItem(retObj.AccountInRecord_Id);
        retObj.SPfName = retObj.OtherProps.SPfName;
        retObj.SaleSiteName = retObj.OtherProps.SaleSiteName;
        retObj.CurrSymbol = retObj.OtherProps.CurrSymbol;
        retObj.FullName = retObj.OtherProps.FullName;
        retObj.OperateTimeStr = m_accountinrecord.OperateTime;
        retObj.FreezePRFund = m_freezeprfund;
        retObj.OperateTimeStr = m_accountinrecord.OperateTime;

        pageVariable.accountInList.addData(retObj.AccountInRecord_Id, retObj);

        calculateTotalReceive();

        pageVariable.handlerReceiveFrm.close();
    });
}
/* 收款 */
function receiveForAccountIn() {
    var m_accountinrecord = new fm.accountinrecord();
    m_accountinrecord.AccountInRecord_Id = pageVariable.handlerReceiveInFrm.accountinrecord_id;

    m_accountinrecord.FundReceives = [];
    m_accountinrecord.FreezeFundReceives = [];

    var m_freezeprfund = 0;
    $.each(pageVariable.fundReceiveForMList.dataSource.items.arrValues, function () {

        if (this.State == "Freeze") {
            m_freezeprfund += Number(this.PRFund);
        }

        if (!this.ReadOnly || this.WaitUpdate) {
            var m_fundflowrecord = {};
            m_fundflowrecord.FundFlowRecord_Id = "0";
            m_fundflowrecord.AccountInRecord_Id = "0";
            m_fundflowrecord.FlowFund = this.FlowFund.toString();
            m_fundflowrecord.LosedFund = this.LosedFund.toString();
            m_fundflowrecord.FundAccount_Id = this.FundAccount_Id.toString();
            m_fundflowrecord.SysCurrency_Id = this.SysCurrency_Id.toString();
            m_fundflowrecord.Rate = this.Rate.toString();
            m_fundflowrecord.PRFund = this.PRFund.toString();
            m_fundflowrecord.OperateTime = this.OperateTime;
            m_fundflowrecord.FundInType = this.FundInType.toString();

            m_accountinrecord.FundReceives.push(m_fundflowrecord);
        }

        if (this.WaitUpdate) {
            var m_fundflowrecord = {};
            m_fundflowrecord.PreviewFundFlowRecord_Id = (Number(this.FundFlowRecord_Id) - 10000).toString();
            m_accountinrecord.FreezeFundReceives.push(m_fundflowrecord);
        }
    });

    if (m_accountinrecord.FundReceives.length == 0 && m_accountinrecord.FreezeFundReceives.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0556);
        return;
    }

    m_accountinrecord.handlerAccountInRecord(function (retObj) {

        var m_obj = pageVariable.accountInList.getItem(retObj.AccountInRecord_Id);
        retObj.SPfName = retObj.OtherProps.SPfName;
        retObj.SaleSiteName = retObj.OtherProps.SaleSiteName;
        retObj.CurrSymbol = retObj.OtherProps.CurrSymbol;
        retObj.FullName = retObj.OtherProps.FullName;
        retObj.OperateTimeStr = m_obj.OperateTimeStr;
        retObj.FreezePRFund = m_freezeprfund;
        retObj.CustName = m_obj.CustName;
        retObj.SOCode = m_obj.SOCode;
        retObj.SuppName = m_obj.SuppName;
        retObj.POCode = m_obj.POCode;

        pageVariable.accountInList.modifyData(retObj.AccountInRecord_Id, retObj);

        calculateTotalReceive();

        pageVariable.handlerReceiveInFrm.close();
    });
}
/* 计算待收金额（收入） */
function calRemainReceive() {
    var m_totalreceive = 0;
    var m_remaind = 0;
    var m_curr = "";
    if (pageVariable.handFundFlowForReceive == "1") {
        $.each(pageVariable.fundReceiveList.dataSource.items.arrValues, function () {
            if (this.State != "Freeze") {
                m_totalreceive += Number(this.PRFund);
            }
        });
        m_remaind = Number(Number($("#txtReceive").val()) - m_totalreceive).toFixed(2);
        m_curr = $("#ddlCurrencyForRv").find("option:selected").attr("tag");
        $("#lbRemainReceive_1").html("(" + mlm.C0757 + ":" + commoncore.func.getCurrHtml(m_curr, m_remaind) + ")");
        $("#lbRemainReceive_1").attr("tag", m_remaind);
    }
    else {
        $.each(pageVariable.fundReceiveForMList.dataSource.items.arrValues, function () {
            if (this.State != "Freeze") {
                m_totalreceive += Number(this.PRFund);
            }
        });
        m_remaind = Number(Number(pageVariable.handlerReceiveInFrm.accountInRecourd.Receive) - m_totalreceive).toFixed(2);
        m_curr = pageVariable.handlerReceiveInFrm.accountInRecourd.OtherProps.CurrSymbol;
        $("#lbRemainReceive").html("(" + mlm.C0757 + ":" + commoncore.func.getCurrHtml(m_curr, m_remaind) + ")");
        $("#lbRemainReceive").attr("tag", m_remaind);

        pageVariable.handlerReceiveInFrm.accountInRecourd.ReceiveRemaid = m_remaind;
    }

}

/* 初始化资金收入窗体 */
function initFundIncomeFrm(operaModel, key, event) {
    if (!pageVariable.handlerFundIncomeFrm) {
        pageVariable.handlerFundIncomeFrm = new uicontrol.dialog("handlerFundIncomeFrm", mlm.C0530 + mlm.C0540, { width: 800, position: ["auto", 15] }, saveFundIncome);

        pageVariable.handlerFundIncomeFrm.fundflowrecord_id = key;
        if (operaModel == "1") {
            pageVariable.handlerFundIncomeFrm.action = "New";
        }
        else {
            pageVariable.handlerFundIncomeFrm.action = "Modify";
        }

        var currencyCtrl = $("#ddlCurrencyForFI");
        pageVariable.currChangeFuncForFI = function () {
            if (currencyCtrl.val() == getCurrIdForFI()) {
                $("#dvRateForFI").hide();
                $("#dvRateForFI").removeClass("last-item");
                $("#dvFundPaidForFI").addClass("last-item");
                $("#txtRvRateForFI").val("1.0000");
            }
            else {
                $("#dvRateForFI").show();
                $("#dvFundPaidForFI").removeClass("last-item");
                $("#dvRateForFI").addClass("last-item");

                var m_currname;
                if (pageVariable.handFundFlowForReceive == "1") {
                    m_currname = $("#ddlCurrencyForRv").find("option:selected").text();
                }
                else {
                    m_currname = pageVariable.handlerReceiveInFrm.accountInRecourd.OtherProps.CurrName;
                }

                $("#lbRvRateForFIAlert").text(currencyCtrl.find("option:selected").text() + "对" + m_currname);

            }

            $("#txtReceiveFundForFI").trigger("change");
        };

        currencyCtrl.change(pageVariable.currChangeFuncForFI);

        loadAllAccount($("#ddlFundAccountForFI"), null, function () {
            loadCurrenies(currencyCtrl, null, event);
        });

        var m_fundReceiveCtrl = $("#txtReceiveFundForFI");
        var m_rvLosedCtrl = $("#txtRvLosedForFI");
        var m_RateCtrl = $("#txtRvRateForFI");
        var m_checkRvCtrl = $("#txtCheckRvSum");

        var m_calFunc = function () {
            m_checkRvCtrl.val((Number(m_RateCtrl.val()) * (Number(m_fundReceiveCtrl.val()) + (Number(m_rvLosedCtrl.val())))).toFixed(2));
        };

        m_fundReceiveCtrl.change(m_calFunc);
        m_RateCtrl.change(m_calFunc);
        m_rvLosedCtrl.change(m_calFunc);

        m_checkRvCtrl.change(function () {
            m_fundReceiveCtrl.val((Number($(this).val()) / Number(m_RateCtrl.val()) + Number(m_rvLosedCtrl.val())).toFixed(2));
        });

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtFundIncomeTime").datepicker();
        $("#txtFundIncomeTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        var m_fundInTypeCtrl = $("#ddlFundInType");
        m_fundInTypeCtrl.append("<option value='1'>" + mlm.C0857 + "</option>");
        m_fundInTypeCtrl.append("<option value='2'>" + mlm.C0856 + "</option>");
    }
    else {
        if (event) {
            pageVariable.handlerFundIncomeFrm.fundflowrecord_id = key;
            if (operaModel == "1") {
                pageVariable.handlerFundIncomeFrm.action = "New";
            }
            else {
                pageVariable.handlerFundIncomeFrm.action = "Modify";
            }
            event();
        }
    }
}
/* 打开添加资金收入的窗体 */
function openNewFundIncomeFrm() {

    initFundIncomeFrm("1", 0, fillFundIncomeCtrl);
    pageVariable.handlerFundIncomeFrm.show();
}
/* 打开修改资金收入的窗体 */
function openModifyFundIncomeFrm(key) {

    initFundIncomeFrm("2", key, fillFundIncomeCtrl);
    pageVariable.handlerFundIncomeFrm.show();
}
/* 填充资金收入的窗体 */
function fillFundIncomeCtrl(key) {
    if (pageVariable.handlerFundIncomeFrm.action == "New") {
        $("#txtRvLosedForFI").val("0.00");
        $("#txtRvRateForFI").val("1.0000");

        if (pageVariable.handFundFlowForReceive == "1") {
            $("#ddlCurrencyForFI").val($("#ddlCurrencyForRv").val());

            var m_remain = Number($("#txtReceive").val());
            $.each(pageVariable.fundReceiveList.dataSource.items.arrValues, function () {
                m_remain -= this.PRFund;
            });
            m_remain = m_remain.toFixed(2);

            $("#txtReceiveFundForFI").val(m_remain);
            $("#txtCheckRvSum").val(m_remain);
        }
        else {
            $("#ddlCurrencyForFI").val(pageVariable.handlerReceiveInFrm.accountInRecourd.SysCurrency_Id);
            
            var m_remain = Number(pageVariable.handlerReceiveInFrm.accountInRecourd.ReceiveRemaid);
            $.each(pageVariable.fundReceiveForMList.dataSource.items.arrValues, function () {
                if (this.State == "Freeze") {
                    m_remain -= Number(this.PRFund);
                }
            });
            m_remain = m_remain.toFixed(2);
            $("#txtReceiveFundForFI").val(m_remain);
            $("#txtCheckRvSum").val(m_remain);
        }
    }
    else {
        var m_obj;
        if (pageVariable.handFundFlowForReceive == "1") {
            m_obj = pageVariable.fundReceiveList.getItem(pageVariable.handlerFundIncomeFrm.fundflowrecord_id);
        }
        else {
            m_obj = pageVariable.fundReceiveForMList.getItem(pageVariable.handlerFundIncomeFrm.fundflowrecord_id);
        }

        $("#ddlFundInType").val(m_obj.FundInType);
        $("#ddlFundAccountForFI").val(m_obj.FundAccount_Id);
        $("#ddlCurrencyForFI").val(m_obj.SysCurrency_Id);
        $("#txtReceiveFundForFI").val(m_obj.FlowFund.toFixed(2));
        $("#txtRvLosedForFI").val(m_obj.LosedFund.toFixed(2));
        $("#txtRvRateForFI").val(m_obj.Rate);
        $("#txtCheckRvSum").val(m_obj.PRFund);
        $("#txtFundIncomeTime").text(commoncore.func.constructDateTimeCell(null, m_obj.OperateTime).toString());
    }

    pageVariable.currChangeFuncForFI();
}
/* 打开删除资金收入的窗体 */
function openDeleteFundIncomeFrm(key) {
    if (!pageVariable.delFundForFIFrm) {
        pageVariable.delFundForFIFrm = new uicontrol.confirmDelete(deleteFundIncome);
    }

    pageVariable.delFundForFIFrm.fundflowrecord_id = key;
    pageVariable.delFundForFIFrm.showConfirm(mlm.C0464 + mlm.C0533 + "?");
}
/* 保存资金收入 */
function saveFundIncome() {
    var m_accountCtrl = $("#ddlFundAccountForFI");
    var m_fundaccount_id = m_accountCtrl.val();

    if (!m_fundaccount_id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0551);
        return;
    }

    var m_currCtrl = $("#ddlCurrencyForFI");

    var m_fundinrecord = {};

    m_fundinrecord.FundAccount_Id = m_fundaccount_id;
    m_fundinrecord.FundAccount = m_accountCtrl.find("option:selected").text();
    m_fundinrecord.SysCurrency_Id = m_currCtrl.val();

    var m_selectedCurr = m_currCtrl.find("option:selected");

    m_fundinrecord.CurrName = m_selectedCurr.text();
    m_fundinrecord.CurrSymbol = m_selectedCurr.attr("tag");

    m_fundinrecord.FlowFund = Number($("#txtReceiveFundForFI").val());
    m_fundinrecord.LosedFund = Number($("#txtRvLosedForFI").val());
    m_fundinrecord.Rate = Number($("#txtRvRateForFI").val());
    m_fundinrecord.OperateTime = $("#txtFundIncomeTime").val();
    m_fundinrecord.ReadOnly = false;
    m_fundinrecord.FundInType = $("#ddlFundInType").val(); 
    m_fundinrecord.PRFund = $("#txtCheckRvSum").val();

    if (m_fundinrecord.FundInType == "1") {
        m_fundinrecord.State = "Freeze";
    }

    var m_receive = 0;
    var m_received = 0;
    var m_tableCtrl;
    var m_tid;
    if (pageVariable.handFundFlowForReceive == "1") {

        var m_receiveCurrCtrl = $("#ddlCurrencyForRv").find("option:selected");

        m_tableCtrl = pageVariable.fundReceiveList;
        m_tid = pageVariable.fundReceiveList.dataSource.totalCount;
        m_fundinrecord.AORCurrName = m_receiveCurrCtrl.text();
        m_fundinrecord.AORCurrSymbol = m_receiveCurrCtrl.attr("tag");

        m_receive = $("#txtReceive").val();
        $.each(pageVariable.fundReceiveList.dataSource.items.arrValues, function () {
            if (this.FundFlowRecord_Id != pageVariable.handlerFundIncomeFrm.fundflowrecord_id) {
                m_received += Number(this.PRFund);
            }
        });
    }
    else {
        m_tableCtrl = pageVariable.fundReceiveForMList;
        m_tid = pageVariable.fundReceiveForMList.dataSource.totalCount;
        m_fundinrecord.AORCurrName = pageVariable.handlerReceiveInFrm.accountInRecourd.OtherProps.CurrName;
        m_fundinrecord.AORCurrSymbol = pageVariable.handlerReceiveInFrm.accountInRecourd.OtherProps.CurrSymbol;

        m_receive = pageVariable.handlerReceiveInFrm.accountInRecourd.Receive;
        $.each(pageVariable.fundReceiveForMList.dataSource.items.arrValues, function () {
            if (this.FundFlowRecord_Id != pageVariable.handlerFundIncomeFrm.fundflowrecord_id) {
                m_received += Number(this.PRFund);
            }
        });
    }

    if (Number(m_fundinrecord.FlowFund) == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0535 + mlm.C1351);
        return;
    }

    if (Number(m_fundinrecord.PRFund) > Number(Number(m_receive) - m_received).toFixed(2)) {
        pageframe.control.alertDialog.showAlertInfo(mlm.E0047);
        return;
    }

    if (m_fundinrecord.Rate == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0553);
        return;
    }

    if (pageVariable.handlerFundIncomeFrm.action == "New") {

        m_fundinrecord.OperateTimeStr = m_fundinrecord.OperateTime;
        m_fundinrecord.FundFlowRecord_Id = m_fundaccount_id + "-" + m_fundinrecord.SysCurrency_Id + "-" + m_tid;
        m_tableCtrl.addData(m_fundinrecord.FundFlowRecord_Id, m_fundinrecord);
    }
    else {
        m_fundinrecord.OperateTimeStr = m_fundinrecord.OperateTime;
        m_fundinrecord.FundFlowRecord_Id = pageVariable.handlerFundIncomeFrm.fundflowrecord_id;
        m_tableCtrl.modifyData(m_fundinrecord.FundFlowRecord_Id, m_fundinrecord);
    }

    calRemainReceive();

    pageVariable.handlerFundIncomeFrm.close();
}
/* 删除资金收入 */
function deleteFundIncome() {
    //收款
    if (pageVariable.handFundFlowForReceive == "1") {
        pageVariable.fundReceiveList.deleteData(pageVariable.delFundForFIFrm.fundflowrecord_id);
    }
    else {
        pageVariable.fundReceiveForMList.deleteData(pageVariable.delFundForFIFrm.fundflowrecord_id);
    }

    calRemainReceive();

    pageVariable.delFundForFIFrm.close();
}
/* 打开撤消财务收款的窗体 */
function openCancelAccountInFrm(key) {
    if (!pageVariable.handlerCancelAccountInFrm) {
        pageVariable.handlerCancelAccountInFrm = new uicontrol.dialog("handlerCancelAccountInFrm", mlm.C0558, { width: 800 }, cancelAccountIn);
    }

    var m_obj = pageVariable.accountInList.getItem(key);

    $("#lbAlertForCancelRvSymbol").html(mlm.C0764 + "(" + m_obj.AIRCode + ")");

    pageVariable.handlerCancelAccountInFrm.accountinrecord_id = key;
    pageVariable.handlerCancelAccountInFrm.show();
}
/* 撤消财务收款 */
function cancelAccountIn() {
    var m_accountinrecord = new fm.accountinrecord();
    m_accountinrecord.AccountInRecord_Id = pageVariable.handlerCancelAccountInFrm.accountinrecord_id;
    m_accountinrecord.cancelAccountInRecord(function () {

        pageVariable.accountInList.deleteData(m_accountinrecord.AccountInRecord_Id);
        calculateTotalReceive();

        pageVariable.handlerCancelAccountInFrm.close();
    });
}
/*   */
function openAbortAccountInRecordFrm(key) {
    if (!pageVariable.handlerAbortAccountInFrm) {
        pageVariable.handlerAbortAccountInFrm = new uicontrol.dialog("handlerAbortAccountInFrm", mlm.C1548 + mlm.C1499, { width: 800 }, abortAccountInRecord);
    }

    var m_obj = pageVariable.accountInList.getItem(key);

    $("#lbAlertForAbortAIRSymbol").html(mlm.C1549 + "(" + m_obj.AIRCode + ")?");

    pageVariable.handlerAbortAccountInFrm.accountinrecord_id = key;
    pageVariable.handlerAbortAccountInFrm.show();
}
/*  */
function abortAccountInRecord() {
    var m_accountinrecord = new fm.accountinrecord();
    m_accountinrecord.AccountInRecord_Id = pageVariable.handlerAbortAccountInFrm.accountinrecord_id;
    m_accountinrecord.abortAccountInRecord(function () {

        var m_obj = pageVariable.accountInList.getItem(m_accountinrecord.AccountInRecord_Id);

        var m_freezeprfund = Number(m_obj.FreezePRFund);
        if (m_freezeprfund == 0) {
            m_obj.State = 3;
            m_obj.Receive = Number(m_obj.ReceivedIn);
        }
        else {
            m_obj.Receive = Number(m_obj.ReceivedIn) + Number(m_obj.FreezePRFund);
        }
        
        pageVariable.accountInList.modifyData(m_obj.AccountInRecord_Id, m_obj);

        calculateTotalReceive();

        pageVariable.handlerAbortAccountInFrm.close();
    });
}
/* 打开资金解冻的窗体 */
function openHandlerFreezeFundFrm(key) {
    if (!pageVariable.handlerFreezeFundFrm) {
        pageVariable.handlerFreezeFundFrm = new uicontrol.dialog("handlerFreezeFundFrm", mlm.C0871, { width: 800, position: ["auto", 15] }, handlerFreezeFund);

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtFreezeFundTime").datepicker();
        $("#txtFreezeFundTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());
    }

    pageVariable.handlerFreezeFundFrm.fundflowrecord_id = key;
    pageVariable.handlerFreezeFundFrm.show();
}
/* 解冻资金 */
function handlerFreezeFund() {
    var m_obj = null;
    if (pageVariable.handFundFlowForReceive == "1") {

        m_obj = pageVariable.fundReceiveList.getItem(pageVariable.handlerFreezeFundFrm.fundflowrecord_id);
        m_obj.OperateTime = $("#txtFreezeFundTime").val();
        m_obj.OperateTimeStr = m_obj.OperateTime;
        m_obj.FundInType = "2";
        m_obj.State = null;
        m_obj.WaitUpdate = true;
        pageVariable.fundReceiveList.modifyData(pageVariable.handlerFreezeFundFrm.fundflowrecord_id, m_obj);
    }
    else {
        m_obj = pageVariable.fundReceiveForMList.getItem(pageVariable.handlerFreezeFundFrm.fundflowrecord_id);
        m_obj.OperateTime = $("#txtFreezeFundTime").val();
        m_obj.OperateTimeStr = m_obj.OperateTime;
        m_obj.FundInType = "2";
        m_obj.State = null;
        m_obj.WaitUpdate = true;
        pageVariable.fundReceiveForMList.modifyData(pageVariable.handlerFreezeFundFrm.fundflowrecord_id, m_obj);
    }

    calRemainReceive();

    pageVariable.handlerFreezeFundFrm.close();
}

/* 获取货币(用于收款) */
function getCurrIdForFI() {
    var m_ourcurrencyCtrl = $("#ddlCurrencyForRv");

    var m_outSysCurrency_Id;
    if (pageVariable.handFundFlowForReceive == "1") {
        m_outSysCurrency_Id = m_ourcurrencyCtrl.val();
    }
    else {
        m_outSysCurrency_Id = pageVariable.handlerReceiveInFrm.accountInRecourd.SysCurrency_Id;
    }

    return m_outSysCurrency_Id;
}
/* 加载所有资金账号 */
function loadAllAccount(accountCtrl, isallownull, event) {

    var m_accountfund = new fm.accountfund();
    m_accountfund.getAllAccount(function (tableSource) {
        
        var m_fundAccounts = datastruct.convertion.tableToJson(tableSource);
        accountCtrl.empty();

        if (isallownull) {
            accountCtrl.append("<option></option>");
        }

        $.each(m_fundAccounts, function () {
            accountCtrl.append("<option value='" + this.FundAccount_Id + "'>" + this.FundAccount + "</option>");
        });

        if (event) {
            event();
        }
    });
}

/* 收款状态改变事件 */
function changeReceiveState() {
    if ($(this).val() == "1") {
        $("#dvRvRemark").addClass("last-item");
        $("#dvFundReceive").removeClass("last-item");
        $("#dvFundReceive").hide();
    }
    else {
        $("#dvRvRemark").removeClass("last-item");
        $("#dvFundReceive").addClass("last-item");
        $("#dvFundReceive").show();
    }
}

/* 打开应付账目的查询窗体 */
function openQueryPayoutFrm() {
    if (!pageVariable.queryPayoutFrm) {
        pageVariable.queryPayoutFrm = new uicontrol.dialog("queryPayoutFrm", mlm.C0562 + mlm.C0543, { width: 800 }, function () {

            $("#lbAOMonth").text("");

            queryAccountOutRecord(1, pageVariable.accountOutList.pageNumber);
            pageVariable.queryPayoutFrm.close();
        });

        var m_stateCtrl = $("#ddlPayStateForQ");
        m_stateCtrl.append("<option></option>");
        m_stateCtrl.append("<option value='1'>" + mlm.C0490 + "</option>");
        m_stateCtrl.append("<option value='2'>" + mlm.C0491 + "</option>");
        m_stateCtrl.append("<option value='3'>" + mlm.C0492 + "</option>");

        loadSalePlatforms($("#ddlSalePlatformForQ"), $("#ddlSaleAreaForQ"));

        pageVariable.selectCostSubjectForQ = new bizcontrol.selectcostsubject("selectCostSubjectForQ");

        loadCurrenies($("#ddlOutCurrencyForQ"), true);

        $("#fromDatePickerForPay").datepicker();
        $("#toDatePickerForPay").datepicker();

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        var m_day = new Date(m_year, m_month, 0);
        $("#fromDatePickerForPay").datepicker("setDate", m_year + "-" + m_month + "-01");
        $("#toDatePickerForPay").datepicker("setDate", m_year + "-" + m_month + "-" + m_day.getDate());
    }

    pageVariable.queryPayoutFrm.show();
}
/* 打开应收账目的查询窗体 */
function openQueryAccoutInFrm() {
    if (!pageVariable.queryAccoutInFrm) {
        pageVariable.queryAccoutInFrm = new uicontrol.dialog("queryAccoutInFrm", mlm.C0562 + mlm.C0519, { width: 800 }, function () {

            $("#lbAIMonth").text("");

            queryAccountInRecord(1, pageVariable.accountInList.pageNumber);
            pageVariable.queryAccoutInFrm.close();
        });

        loadSalePlatforms($("#ddlSalePlatformForRvForQ"), $("#ddlSaleAreaForRvForQ"));

        var m_stateCtrl = $("#ddlReceiveStateForQ");
        m_stateCtrl.append("<option></option>");
        m_stateCtrl.append("<option value='1'>" + mlm.C0508 + "</option>");
        m_stateCtrl.append("<option value='2'>" + mlm.C0509 + "</option>");
        m_stateCtrl.append("<option value='3'>" + mlm.C0539 + "</option>");
        m_stateCtrl.append("<option value='4'>" + mlm.C0493 + "</option>");

        var m_airTypeCtrl = $("#ddlAIRTypeForQ");
        m_airTypeCtrl.append("<option></option>");
        m_airTypeCtrl.append("<option value='1'>" + mlm.C0506 + "</option>");
        m_airTypeCtrl.append("<option value='3'>" + mlm.C0854 + "</option>");
        m_airTypeCtrl.append("<option value='4'>" + mlm.C0855 + "</option>");
        m_airTypeCtrl.append("<option value='5'>" + mlm.C0627 + "</option>");
        m_airTypeCtrl.append("<option value='10'>" + mlm.C0891 + "</option>");

        loadCurrenies($("#ddlCurrencyForRvForQ"), true);

        $("#fromDatePickerForReceive").datepicker();
        $("#toDatePickerForReceive").datepicker();

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        var m_day = new Date(m_year, m_month, 0);
        $("#fromDatePickerForReceive").datepicker("setDate", m_year + "-" + m_month + "-01");
        $("#toDatePickerForReceive").datepicker("setDate", m_year + "-" + m_month + "-" + m_day.getDate());
    }

    pageVariable.queryAccoutInFrm.show();
}
/* 打开查询资金流动的查询窗体 */
function openQueryFundFlowRecordFrm() {
    if (!pageVariable.queryFundFlowRecordFrm) {
        pageVariable.queryFundFlowRecordFrm = new uicontrol.dialog("queryFundFlowRecordFrm", mlm.C0562 + mlm.C0520, { width: 800 }, function () {

            $("#lbFRMonth").text("");

            queryFundRecords(1, pageVariable.fundRecordList.pageNumber);
            pageVariable.queryFundFlowRecordFrm.close();
        });

        var m_ffrActionCtrl = $("#ddlFFRAction");
        m_ffrActionCtrl.append("<option></option>");
        m_ffrActionCtrl.append("<option value='1'>" + mlm.C0541 + "</option>");
        m_ffrActionCtrl.append("<option value='2'>" + mlm.C0542 + "</option>");

        loadAllAccount($("#ddlFFRFundAccountForQ"), true);

        $("#fromDatePickerForFFR").datepicker();
        $("#toDatePickerForFFR").datepicker();

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        var m_day = new Date(m_year, m_month, 0);
        $("#fromDatePickerForFFR").datepicker("setDate", m_year + "-" + m_month + "-01");
        $("#toDatePickerForFFR").datepicker("setDate", m_year + "-" + m_month + "-" + m_day.getDate());
    }

    pageVariable.queryFundFlowRecordFrm.show();
}

/* 导出应付账目 */
function exportAccountOutRecord() {

    var m_accountoutrecord = new fm.accountoutrecord();
    m_accountoutrecord.exportAccoutOutRecord(pageVariable.queryAORCondition.Keyword,
                                             pageVariable.queryAORCondition.CostSubjectId,
                                             pageVariable.queryAORCondition.SalePlatformId,
                                             pageVariable.queryAORCondition.SaleSite_Id,
                                             pageVariable.queryAORCondition.SysCurrency_Id,
                                             pageVariable.queryAORCondition.State,
                                             pageVariable.queryAORCondition.FromTime,
                                             pageVariable.queryAORCondition.ToTime,
                                             pageVariable.queryAORCondition.AccountYear,
                                             pageVariable.queryAORCondition.AccountMonth, function (paramObj) {
                                                 window.open(paramObj);
                                             });
}
/* 导出应收账目 */
function exportAccountInRecord() {

    var m_accountinrecord = new fm.accountinrecord();
    m_accountinrecord.exportAccountInRecord(pageVariable.queryAIRCondition.Keyword,
                                           pageVariable.queryAIRCondition.AIRType,
                                           pageVariable.queryAIRCondition.SalePlatformId,
                                           pageVariable.queryAIRCondition.SaleSite_Id,
                                           pageVariable.queryAIRCondition.SysCurrency_Id,
                                           pageVariable.queryAIRCondition.State,
                                           pageVariable.queryAIRCondition.FromTime,
                                           pageVariable.queryAIRCondition.ToTime,
                                           pageVariable.queryAIRCondition.AccountYear,
                                           pageVariable.queryAIRCondition.AccountMonth,
                                           function (paramObj) {
                                               window.open(paramObj);
                                           });
}
/* 导出资金记录 */
function exportFundFlowRecord() {
    var m_fundflowrecord = new fm.fundflowrecord();
    m_fundflowrecord.exportFundFlowRecord(pageVariable.queryFFRCondition.Keyword,
                                         pageVariable.queryFFRCondition.Action,
                                         pageVariable.queryFFRCondition.FundAccountId,
                                         pageVariable.queryFFRCondition.FromTime,
                                         pageVariable.queryFFRCondition.ToTime,
                                         pageVariable.queryFFRCondition.AccountYear,
                                         pageVariable.queryFFRCondition.AccountMonth, 
                                         function (paramObj) {
                                             window.open(paramObj);
                                         });
}

/* 导入支付账目窗体 */
function openImportFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importFinance);
        pageVariable.importFile = new uicontrol.file("importFile");

        var m_smtSaleSiteCtrl = $("#ddlSMTSaleSite");
        var m_zfbSaleSiteCtrl = $("#ddlZFBSaleSite");

        var m_saleplatform = new sm.saleplatform();
        m_saleplatform.queryAvaiSaleSites(function (retTable) {
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

            $.each(m_jsonobjs, function () {
                if (this.SalePlatform_Id == "5") {
                    m_smtSaleSiteCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
                }
                else if (this.SalePlatform_Id == "7") {
                    m_zfbSaleSiteCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
                }
            });
        });
    }

    var m_type = $(this).attr("tag");
    pageVariable.handlerImportFrm.operaType = m_type;
    if (m_type == "airexpress-receive") {
        pageVariable.handlerImportFrm.setTitle(mlm.C0859);

        $("#dvAliExpress").show();
        $("#dvZhifubao").hide();
    }
    else if (m_type == "zhifubao-receive") {
        pageVariable.handlerImportFrm.setTitle(mlm.C0744);

        $("#dvAliExpress").hide();
        $("#dvZhifubao").show();
    }
    else if (m_type == "importsmtcharge") {
        $("#dvZhifubao").hide();
        $("#dvAliExpress").show();
        pageVariable.handlerImportFrm.setTitle(mlm.C1647);
    }
    else if (m_type == "import4pxcharge") {
        $("#dvZhifubao").hide();
        $("#dvAliExpress").hide();
        pageVariable.handlerImportFrm.setTitle(mlm.C1648);
    }
    else if (m_type == "importaor") {
        $("#dvZhifubao").hide();
        $("#dvAliExpress").hide();
        pageVariable.handlerImportFrm.setTitle(mlm.C0745);
    }
    else if (m_type == "receivebill") {
        $("#dvZhifubao").hide();
        $("#dvAliExpress").hide();
        pageVariable.handlerImportFrm.setTitle(mlm.C0745);
    }

    pageVariable.handlerImportFrm.show();
}
/* 导入支出/收入账单 */
function importFinance() {

    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    if (pageVariable.handlerImportFrm.operaType == "airexpress-receive") {
        var m_accountinrecord = new fm.accountinrecord();
        m_accountinrecord.SaleSite_Id = $("#ddlSMTSaleSite").val();
        m_accountinrecord.importAIFromAliExpress(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            pageVariable.accountInSource = null;
            loadAccountIn();

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.operaType == "zhifubao-receive") {
        var m_aaccountinrecord = new fm.accountinrecord();
        m_aaccountinrecord.SaleSite_Id = $("#ddlZFBSaleSite").val();
        m_aaccountinrecord.importAIFromTaobao(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            pageVariable.accountInSource = null;
            loadAccountIn();

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.operaType == "importsmtcharge") {
        var expressorder = new lstm.expressorder();
        expressorder.SaleSite_Id = $("#ddlSMTSaleSite").val();
        expressorder.importEOCostBySMT(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            pageVariable.accountOutSource = null;
            loadAccountOut();

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.operaType == "import4pxcharge") {
        var expressorder = new lstm.expressorder();
        expressorder.importEOCostBy4PX(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            pageVariable.accountOutSource = null;
            loadAccountOut();

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.operaType == "importaor") {
        var m_aaccountoutrecord = new fm.accountoutrecord();
        m_aaccountoutrecord.importPayBill(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            pageVariable.accountOutSource = null;
            loadAccountOut();

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.operaType == "receivebill") {
        var m_aaccountinrecord = new fm.accountinrecord();
        m_aaccountinrecord.importReceiveBill(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            pageVariable.accountInSource = null;
            loadAccountIn();

            pageVariable.handlerImportFrm.close();
        });
    }
}

/* 加载资金记录 */
function loadFundRecords() {

    if (!pageVariable.fundRecordList) {
        var currFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.fundRecordList = new uicontrol.tableList("fundRecordList",
                                     { isPaging: true,
                                         autoSeq: true,
                                         height: currFormHeight,
                                         keyColumn: "FundFlowRecord_Id",
                                         pageQueryHandler: innerQueryFundRecords,
                                         columns: [{ display: mlm.C0494, name: "FFRCode", width: 80, align: 'left' },
                                                   { display: mlm.C0146, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: constructDateCell },
                                                   { display: mlm.C0510, name: "FundAccount", width: 170, align: 'left' },
                                                   { display: mlm.C0511, name: "AccountOutRecord_Id", width: 60, align: 'left', adjust: true, createCell: constructFlowActionCell },
                                                   { display: mlm.C0513, name: "FlowFund", width: 125, align: 'right', adjust: true, createCell: constructFundFlowCell },
                                                   { display: mlm.C0514, name: "LosedFund", width: 100, align: 'right', adjust: true, createCell: constructFundFlowCell },
                                                   { display: mlm.C0880, name: "ObjCode", width: 75, align: 'left', adjust: true, createCell: constructObjCodeCell },
                                                   { display: mlm.C0517, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0518, name: "PRFund", width: 125, align: 'right', adjust: true, createCell: constructPRFundCell },
                                                   { display: mlm.C0501, name: "FullName", width: 70, align: 'left'}]
                                     });
    }


    var m_dateitems = null;
    var m_date = $("#ddlAccoutTime").val();
    if (m_date) {
        $("#lbFRMonth").text("(" + m_date + ")");
        m_dateitems = m_date.split("-");

        pageVariable.queryFFRCondition = {
            Keyword: "",
            Action: "",
            FundAccountId: "",
            FromTime: "",
            ToTime: "",
            AccountYear: m_dateitems[0],
            AccountMonth: m_dateitems[1]
        };

        innerQueryFundRecords(1, pageVariable.fundRecordList.pageNumber);
    }
}
/* 查询资金记录 */
function queryFundRecords(pageNum, pageCount) {
    var m_keyword = $("#txtFFRKeywordForQ").val();
    var m_action = $("#ddlFFRAction").val();
    var m_fundaccount_id = $("#ddlFFRFundAccountForQ").val();
    var m_fromtime = $("#fromDatePickerForFFR").val();
    var m_totime = $("#toDatePickerForFFR").val();

    pageVariable.queryFFRCondition = {
        Keyword: m_keyword,
        Action: m_action,
        FundAccountId: m_fundaccount_id,
        FromTime: m_fromtime,
        ToTime: m_totime
    };

    var m_fromstr = "";
    if (!m_fromtime) {
        m_fromstr = mlm.C0866;
    }
    else {
        m_fromstr = m_fromtime;
    }

    var m_tostr = "";
    if (!m_totime) {
        m_tostr = mlm.C0867;
    }
    else {
        m_tostr = m_totime;
    }
    $("#lbFRMonth").text("(" + m_fromstr + mlm.C0412 + m_tostr + ")");
    $("#ddlAccoutTime").val("");

    innerQueryFundRecords(1, pageVariable.fundRecordList.pageNumber);
}
/* 查询资金记录 */
function innerQueryFundRecords(pageNum, pageCount) {
    var m_fundflowrecord = new fm.fundflowrecord();
    m_fundflowrecord.queryFundFlowRecord(pageVariable.queryFFRCondition.Keyword,
                                         pageVariable.queryFFRCondition.Action,
                                         pageVariable.queryFFRCondition.FundAccountId,
                                         pageVariable.queryFFRCondition.FromTime,
                                         pageVariable.queryFFRCondition.ToTime,
                                         pageVariable.queryFFRCondition.AccountYear,
                                         pageVariable.queryFFRCondition.AccountMonth, pageNum, pageCount, function (tableSource) {
                                             pageVariable.fundRecordList.dataSource.page = pageNum;
                                             pageVariable.fundRecordList.bindDataSource(tableSource);
                                         });
                                     }

/* 填充语言资源 */
function fillPageLanRes() {

    /* 应付账目 */
    $("#lbAccountOutTag").text(mlm.C0543);
    /* 应收账目 */
    $("#lbAccountInTag").text(mlm.C0519);
    /* 资金记录 */
    $("#lbFundRecordTag").text(mlm.C0520);
    /* 应付账目列表 */
    $("#lbAccountOutTitle").text(mlm.C0543 + mlm.C0463);
    /* 查询账目 */
    $("#btQueryOutRecord, #btQueryInRecord").val(mlm.C0522);
    /* 添加账目 */
    $("#btNewOutRecord, #btNewInRecord").val(mlm.C0523);
    /* 导出账目 */
    $("#btExportInRecord, #btExportOutRecord").text(mlm.C0524);
    /* 累计待收金额合计 */
    $("#lbTotalReceiveSymbol").text(mlm.C0525 + ":");
    /* 应收账目列表 */
    $("#lbAccountInTitle").text(mlm.C0519 + mlm.C0463);
    /* 资金记录列表 */
    $("#lbFundRecordTitle").text(mlm.C0520 + mlm.C0463);
    /* 查询资金记录 */
    $("#btQueryFundRecord").val(mlm.C0526);
    /* 导出资金记录 */
    $("#btExportFundRecord").val(mlm.C0527);
    /* 成本科目 */
    $("#lbCostSubjectSymbol, #lbCostSubjectForPaySymbol, #lbCostSubjectForQSymbol").text(mlm.C0497 + ":");
    /* 状态 */
    $("#lbPayStateForQSymbol, #lbReceiveStateForQSymbol").text(mlm.C0367 + ":");
    /* 销售平台 */
    $("#lbSalePlatformForPaySymbol, #lbSalePlatformSymbol, #lbAOPriceAreaSymbol, #lbSalePlatformSymbolForQ, #lbSalePlatformForRvSymbol, #lbSalePlatformForRvForMSymbol, #lbSalePlatformForRvForQSymbol, #lbSalePlatform_ImportSymbol").text(mlm.M0038 + ":");
    /* 站点 */
    $("#lbSaleAreaForPaySymbol, #lbSaleAreaForRvSymbol, #lbSaleAreaSymbol, #lbSaleAreaForRvForMSymbol, #lbSaleAreaForRvForQSymbol, #lbSaleAreaSymbolForQ, #lbPriceArea_ImportSymbol, #lbZFBArea_ImportSymbol").text(mlm.C0496 + ":");
    /* 币种 */
    $("#lbOutCurrencySymbol, #lbCurrencyForRvSymbol, #lbOutCurrencyForQSymbol, #lbCurrencyForRvForQSymbol").text(mlm.C0502 + ":");
    /* 账目总金额 */
    $("#lbReceiveSymbol, #lbReceiveForMSymbol").text(mlm.C0722 + ":");
    /* 备注 */
    $("#lbAOutRemarkSymbol, #lbAOutRemarkForPaySymbol, #lbRvRemarkSymbol, #lbRvRemarkForMSymbol").text(mlm.C0073 + ":");
    /* 支付资金 */
    $("#lbPaidTitle, #lbPaidForPayTitle, #lbFundPaidForAOSymbol").text(mlm.C0529);
    /* 添加 */
    $("#btAddPaid, #btAddPaidForPay, #btNewFundReceive, #btNewFundReceiveForM").val(mlm.C0530);
    /* 资金账号 */
    $("#lbFundAccountForAOSymbol, #lbFundAccountForFISymbol, #lbFFRFundAccountForQSymbol").text(mlm.C0510 + ":");
    /* 支付货币 */
    $("#lbCurrencyForAOSymbol").text(mlm.C0531 + ":");
    /* 支付损失 */
    $("#lbFundLosedForAOSymbol").text(mlm.C0532 + ":");
    /* 结算汇率 */
    $("#lbRateForAOSymbol, #lbRvRateForFISymbol").text(mlm.C0517 + ":");
    /* 账目结算金额 */
    $("#lbOutFundForAOSymbol, #lbCheckRvSumSymbol").text(mlm.C0518 + ":");
    /* 账目类别 */
    $("#lbAIRTypeSymbol, #lbRSubjectTypeForMSymbol, #lbRSubjectTypeForQSymbol").text(mlm.C0503 + ":");
    /* 资金收入 */
    $("#lbFundReceiveTitle").text(mlm.C0533);
    $("#lbFundReceiveForMTitle").text(mlm.C0533);
    /* 实收货币 */
    $("#lbCurrencyForFISymbol").text(mlm.C0534 + ":");
    /* 实际金额 */
    $("#lbReceiveFundForFISymbol").text(mlm.C0535 + ":");
    /* 收款损失 */
    $("#lbRvLosedForFISymbol").text(mlm.C0536 + ":");
    /* 关键字 */
    $("#lbPayKeywordSymbol, #lbRvKeywordForQSymbol, #lbFFRKeywordForQSymbol").text(mlm.C0184 + ":");
    /* 日期 */
    $("#lbPayTimeForQSymbol, #lbReceiveTimeForQSymbol, #lbFFRTimeForQSymbol").text(mlm.C0146 + ":");
    /* 发生动作 */
    $("#lbFFRActionSymbol").text(mlm.C0511 + ":");

    /* 到 */
    $("#lbToSymbol, #lbFFRToSymbol, #lbReceiveToSymbol").text(mlm.C0412);

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_3, #lbSymbol_4, #lbSymbol_5, #lbSymbol_6, #lbSymbol_7, #lbSymbol_8, #lbSymbol_9").text(mlm.C0049);

    /* 批处理账单 */
    $("#btBatchAOR, #btBatchInRecord").val(mlm.C0747);
    /* 导入支付宝账单 */
    $("#btImportTaobao").text(mlm.C0744);
    /* 交易对方 */
    $("#lbPayObjectSymbol, #lbPayObjectForPaySymbol, #lbReceiveObjectSymbol, #lbRvObjectSymbol").text(mlm.C0675 + ":");
    /* 业务内容 */
    $("#lbBizContentSymbol, #lbBizContentForPaySymbol, #lbRvBizContentSymbol, #lbRIBizContentSymbol").text(mlm.C0676 + ":");
    /* 账目总金额 */
    $("#lbPayoutSymbol, #lbPayoutForPaySymbol, #lbReceiveForMSymbol").text(mlm.C0749 + ":");
    /* 操作人 */
    $("#lbAOOperatedbySymbol, #lbAROperatedbySymbol").text(mlm.C0501 + ":");
    /* 账单日期 */
    $("#lbAOOperateTimeSymbol, #lbOperateTimeForPaySymbol, #lbAROperateTimeSymbol, #lbARCreateTimeSymbol").text(mlm.C0750 + ":");
    /* 账单号 */
    $("#lbAORCodeForPaySymbol, #lbARCodeSymbol").text(mlm.C0751 + ":");
    /* 销售站点/区域 */
    $("#lbARPriceAreaSymbol").text(mlm.C0313 + ":");
    /* 导入文件 */
    $("#lbImportFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
    /* 导入速卖通账单 */
    $("#btImportAirExpress").text(mlm.C0859);
    /* 付款日期 */
    $("#lbOutFundSymbol").text(mlm.C0860 + ":");
    /* 到账日期 */
    $("#lbFundIncomeSymbol, #lbFreezeFundTimeSymbol").text(mlm.C0861 + ":");
    /* 资金状态 */
    $("#lbFundInType").text(mlm.C0862 + ":");
    /* 导入SMT运费 */
    $("#btImportSMTAOR").text(mlm.C1647); 
    /* 导入4PX运费 */
    $("#btImport4PXAOR").text(mlm.C1648);
    /* 导入账单 */
    $("#lbImportAOR, #btImportReceveBill").text(mlm.C0745);

    /* ECMS-财务收入支出 */
    document.title = mlm.C0488;
}