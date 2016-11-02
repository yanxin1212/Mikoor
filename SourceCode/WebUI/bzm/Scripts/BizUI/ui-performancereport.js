
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadFRTimes);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    pageVariable.activetab = "operationstat";
    $("#operationStatTag").click(function () { pageVariable.activetab = "operationstat"; loadTotalFunds(); });
    $("#billStatTag").click(function () { pageVariable.activetab = "billstat"; loadTotalBill(); });
    $("#accountStatTag").click(function () { pageVariable.activetab = "accountstat"; loadTotalAccount(); });
    $("#fundStatTag").click(function () { pageVariable.activetab = "fundstat"; loadFund(); });
    $("#waitOverStatTag").click(function () { pageVariable.activetab = "waitover"; loadWaitOver(); });

    $("#lkExportReport").click(exportReport);
}

/* 设置页面布局 */
function setLayout() {
    var m_height = pageframe.layout.getTableHeightInForm();
    if (pageVariable.accountBalanceList) {
        pageVariable.accountBalanceList.resize(m_height);
    }

    if (pageVariable.totalBillList) {
        pageVariable.totalBillList.resize(m_height);
    }

    if (pageVariable.totalAccountList) {
        pageVariable.totalAccountList.resize(m_height);
    }

    if (pageVariable.totalFundList) {
        pageVariable.totalFundList.resize(m_height);
    }

    if (pageVariable.waitOverList) {
        pageVariable.waitOverList.resize(m_height);
    }
}

/* 获取财务时间段 */
function loadFRTimes() {

    var m_reportTypeCtrl = $("#ddlReportType");
    m_reportTypeCtrl.append("<option value='1'>" + mlm.C0939 + "</option>");
    m_reportTypeCtrl.append("<option value='2'>" + mlm.C0940 + "</option>");
    m_reportTypeCtrl.append("<option value='3'>" + mlm.C0941 + "</option>");
    m_reportTypeCtrl.change(controlReport);

    var m_monthCtrl = $("#ddlMonth");
    m_monthCtrl.append("<option value='1'>1" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='2'>2" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='3'>3" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='4'>4" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='5'>5" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='6'>6" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='7'>7" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='8'>8" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='9'>9" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='10'>10" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='11'>11" + mlm.C0864 + "</option>");
    m_monthCtrl.append("<option value='12'>12" + mlm.C0864 + "</option>");

    var m_reasonCtrl = $("#ddlReason");
    m_reasonCtrl.append("<option value='1,2,3'>" + mlm.C0942 + "</option>");
    m_reasonCtrl.append("<option value='4,5,6'>" + mlm.C0943 + "</option>");
    m_reasonCtrl.append("<option value='7,8,9'>" + mlm.C0944 + "</option>");
    m_reasonCtrl.append("<option value='10,11,12'>" + mlm.C0945 + "</option>");

    var m_financereport = new fm.financereport();
    m_financereport.getFRTimes(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        if (m_jsonobjs.length == 0) {
            m_jsonobjs.push({ Year: (new Date()).getFullYear() });
        }

        var m_yearCtrl = $("#ddlYear");
        var m_timeDict = new datastruct.dictionary();
        $.each(m_jsonobjs, function () {
            if (!m_timeDict.containKey(this.Year)) {
                m_yearCtrl.append("<option value='" + this.Year + "'>" + this.Year + mlm.C0863 + "</option>");
                m_timeDict.setItem(this.Year, null);
            }
        });

        var m_now = new Date();
        var m_nowyear = m_now.getFullYear();
        var m_nowmonth = m_now.getMonth() + 1;
        m_yearCtrl.val(m_nowyear);
        m_monthCtrl.val(m_nowmonth);

        $("#ddlYear, #ddlMonth, #ddlReason").change(loadReportStat);

        controlReport();
    });
}
/* 控制报表方式 */
function controlReport() {
    var m_reportType = $("#ddlReportType").val();
    if (m_reportType == "1") {
        $("#ddlMonth, #ddlYear").show();
        $("#ddlReason").hide();
        pageVariable.timeStr = mlm.C0864;
    }
    else if (m_reportType == "2") {
        $("#ddlReason, #ddlYear").show();
        $("#ddlMonth").hide();
        pageVariable.timeStr = mlm.C0946;
    }
    else {
        $("#ddlYear").show();
        $("#ddlMonth, #ddlReason").hide();
        pageVariable.timeStr = mlm.C0863;
    }

    loadReportStat();
}
/* 获取月数 */
function getReportMonths() {

    var m_reportmonths = [];
    
    var m_reportType = $("#ddlReportType").val();
    if (m_reportType == "1") {
        m_reportmonths.push($("#ddlMonth").val());
    }
    else if (m_reportType == "2") {
        m_reportmonths = $("#ddlReason").val().split(",");
    }
    else {
        m_reportmonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    return m_reportmonths;
}
/* 加载报表数据 */
function loadReportStat() {
    var m_reportType = $("#ddlReportType").val();
    if (m_reportType == "1") {
        pageVariable.timeNameStr = $("#ddlMonth").find("option:selected").text();
    }
    else if (m_reportType == "2") {
        pageVariable.timeNameStr = $("#ddlReason").find("option:selected").text();
    }
    else {
        pageVariable.timeNameStr = $("#ddlYear").find("option:selected").text();
    }

    /* 下月待结金额 */
    $("#lbWaitOverStatTag").text(mlm.C0960 + pageVariable.timeStr + mlm.C0980);
    /* 下月待结金额列表 */
    $("#lbWaitOverTitle").text(mlm.C0960 + pageVariable.timeStr + mlm.C0980 + mlm.C0463);

    pageVariable.shoppingStruct = null;

    pageVariable.totalstatTable = null;
    loadTotalFunds();

    pageVariable.totalbills = null;
    loadTotalBill();

    pageVariable.totalAccounts = null;
    loadTotalAccount();

    pageVariable.waitOvers = null;
    loadWaitOver();

    pageVariable.fundTable = null;
    loadFund();
}
/* 加载财务总体情况 */
function loadTotalFunds() {

    if (pageVariable.activetab != "operationstat") {
        return;
    }

    if (!pageVariable.totalFundList) {

        pageVariable.loadTotalStat = function () {

            if (pageVariable.totalstatTable) {
                return;
            }
            /* 展示进度 */
            pageframe.control.processCtrl.showOperaProcess();

            pageVariable.balanceobjs = [];
            pageVariable.balanceobjs.push({ BillKey: "T2", BillSeq: "1", Type: mlm.C0948, Flag: "", Layer: 1, HasChild: false });
            pageVariable.balanceobjs.push({ BillKey: "T15", BillSeq: "2", Type: mlm.C1085, Flag: "", Layer: 1, HasChild: true, IsExpand: true });

            if (!pageVariable.shoppingStruct) {
                var m_financereport = new fm.financereport();
                m_financereport.Year = $("#ddlYear").val();
                m_financereport.Months = getReportMonths();
                m_financereport.querySaleSitesInFinance(function (shoppingSource) {

                    pageVariable.shoppingSites = datastruct.convertion.tableToJson(shoppingSource);
                    pageVariable.shoppingStruct = new datastruct.dictionary();

                    var m_i = 1;
                    $.each(pageVariable.shoppingSites, function () {

                        var m_ssobj = pageVariable.shoppingStruct.getItem(this.SalePlatform_Id);
                        if (m_ssobj) {
                            m_ssobj.SaleSites.push(this);
                        }
                        else {
                            var m_ssobj = { SalePlatform_Id: this.SalePlatform_Id, SPfName: this.SPfName, SaleSites: [] };
                            m_ssobj.SaleSites.push(this);
                            pageVariable.shoppingStruct.setItem(m_ssobj.SalePlatform_Id, m_ssobj);
                        }

                        pageVariable.balanceobjs.push({ BillKey: "T_Site_" + this.SaleSite_Id, BillSeq: "2." + m_i, Type: this.SPfName + "-" + this.SaleSiteName, Flag: "", Layer: 2, Indexs: "#T15#", ParentKey: "T15" });
                        m_i++;
                    });

                    pageVariable.balanceobjs.push({ BillKey: "T_Site_0", BillSeq: "2." + m_i, Type: mlm.C0966, Flag: "", Layer: 2, Indexs: "#T15#", ParentKey: "T15" });

                    pageVariable.balanceobjs.push({ BillKey: "T3", BillSeq: "3", Type: mlm.C0949, Flag: "", Layer: 1, HasChild: false });
                    pageVariable.balanceobjs.push({ BillKey: "T13", BillSeq: "4", Type: mlm.C0960 + pageVariable.timeStr + mlm.C0950, Flag: "", Layer: 1, HasChild: false });
                    pageVariable.balanceobjs.push({ BillKey: "T14", BillSeq: "5", Type: mlm.C0960 + pageVariable.timeStr + mlm.C0952, Flag: "", Layer: 1, HasChild: false });

                    loadTotalFundSource();
                });
            }
            else {
                var m_i = 1;
                $.each(pageVariable.shoppingSites, function () {

                    var m_ssobj = pageVariable.shoppingStruct.getItem(this.SalePlatform_Id);
                    if (m_ssobj) {
                        m_ssobj.SaleSites.push(this);
                    }
                    else {
                        var m_ssobj = { SalePlatform_Id: this.SalePlatform_Id, SPfName: this.SPfName, SaleSites: [] };
                        m_ssobj.SaleSites.push(this);
                        pageVariable.shoppingStruct.setItem(m_ssobj.SalePlatform_Id, m_ssobj);
                    }

                    pageVariable.balanceobjs.push({ BillKey: "T_Site_" + this.SaleSite_Id, BillSeq: "2." + m_i, Type: this.SPfName + "-" + this.SaleSiteName, Flag: "", Layer: 2, Indexs: "#T15#", ParentKey: "T15" });
                    m_i++;
                });

                pageVariable.balanceobjs.push({ BillKey: "T_Site_0", BillSeq: "2." + m_i, Type: mlm.C0966, Flag: "", Layer: 2, Indexs: "#T15#", ParentKey: "T15" });

                pageVariable.balanceobjs.push({ BillKey: "T3", BillSeq: "3", Type: mlm.C0949, Flag: "", Layer: 1, HasChild: false });
                pageVariable.balanceobjs.push({ BillKey: "T13", BillSeq: "4", Type: mlm.C0960 + pageVariable.timeStr + mlm.C0950, Flag: "", Layer: 1, HasChild: false });
                pageVariable.balanceobjs.push({ BillKey: "T14", BillSeq: "5", Type: mlm.C0960 + pageVariable.timeStr + mlm.C0952, Flag: "", Layer: 1, HasChild: false });

                loadTotalFundSource();
            }

        };

        pageVariable.currencySymbolStruct = new datastruct.dictionary();

        var m_fillTableFunc = function () {
            var m_balanceColumns = [];

            m_balanceColumns.push({ display: mlm.C0041, name: "BillSeq", width: 50, align: 'left' });
            m_balanceColumns.push({ display: mlm.C0961, name: "Type", width: 200, align: 'left', adjust: true, createCell: constructBillTypeCell });
            m_balanceColumns.push({ display: mlm.C0962, name: "BalanceSum", width: 120, align: 'right', adjust: true, createCell: constructBalanceSumCell });
            $.each(pageVariable.currencySource, function () {
                m_balanceColumns.push({ display: this.CurrName, name: this.SysCurrency_Id, width: 120, align: 'right', adjust: true, createCell: constructFundCell });

                pageVariable.currencySymbolStruct.setItem(this.SysCurrency_Id, this.CurrSymbol);
            });

            pageVariable.accountBalanceList = new uicontrol.tableList("accountBalanceList",
                                     { isPaging: false,
                                         autoSeq: false,
                                         height: pageframe.layout.getTableHeightInForm(),
                                         keyColumn: "BillKey",
                                         columns: m_balanceColumns
                                     });

                                     pageVariable.loadTotalStat();
        };

        loadCurrency(m_fillTableFunc);
    }
    else {
        pageVariable.loadTotalStat();
    }
}
function loadTotalFundSource() {
    var m_financereport = new fm.financereport();

    m_financereport.Year = $("#ddlYear").val();
    m_financereport.Months = getReportMonths();
    m_financereport.getTotalBalanceByTime(function (retTable) {

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        pageVariable.totalstatTable = m_jsonobjs;

        $.each(m_jsonobjs, function () {
            pageVariable.balanceobjs[0][this.SysCurrency_Id] = Number(this.CurrMonthBalance);
            pageVariable.balanceobjs[1][this.SysCurrency_Id] = Number(this.TotalSaleProfit);

            var m_obj = this;
            var m_i = 2;
            $.each(pageVariable.shoppingSites, function () {
                var m_salereceive = 0;
                if (m_obj["CurrSaleReceive_" + this.SaleSite_Id]) {
                    m_salereceive = Number(m_obj["CurrSaleReceive_" + this.SaleSite_Id]);
                }

                var m_salelosed = 0;
                if (m_obj["CurrSaleLosed_" + this.SaleSite_Id]) {
                    m_salelosed = Number(m_obj["CurrSaleLosed_" + this.SaleSite_Id]);
                }

                var m_salepayout = 0;
                if (m_obj["CurrSalePayout_" + this.SaleSite_Id]) {
                    m_salepayout = Number(m_obj["CurrSalePayout_" + this.SaleSite_Id]);
                }

                var m_productcost = 0;
                if (m_obj["CurrProductCost_" + this.SaleSite_Id]) {
                    m_productcost = Number(m_obj["CurrProductCost_" + this.SaleSite_Id]);
                } 

                var m_giftcost = 0;
                if (m_obj["CurrGiftCost_" + this.SaleSite_Id]) {
                    m_giftcost = Number(m_obj["CurrGiftCost_" + this.SaleSite_Id]);
                }

                var m_aspprodcost = 0;
                if (m_obj["CurrASPProdCost_" + this.SaleSite_Id]) {
                    m_aspprodcost = Number(m_obj["CurrASPProdCost_" + this.SaleSite_Id]);
                }

                pageVariable.balanceobjs[m_i][m_obj.SysCurrency_Id] = Number(m_salereceive - m_salelosed - m_salepayout - m_productcost - m_giftcost - m_aspprodcost).toFixed(2);
                
                m_i++;
            });

            var m_salereceive = 0;
            if (m_obj["CurrSaleReceive_0"]) {
                m_salereceive = Number(m_obj["CurrSaleReceive_0"]);
            }

            var m_salelosed = 0;
            if (m_obj["CurrSaleLosed_0"]) {
                m_salelosed = Number(m_obj["CurrSaleLosed_0"]);
            }

            var m_salepayout = 0;
            if (m_obj["CurrSalePayout_0"]) {
                m_salepayout = Number(m_obj["CurrSalePayout_0"]);
            }

            pageVariable.balanceobjs[m_i][m_obj.SysCurrency_Id] = Number(m_salereceive - m_salelosed - m_salepayout).toFixed(2);

            pageVariable.balanceobjs[m_i + 1][this.SysCurrency_Id] = Number(this.CurrMonthFundBalance);
            pageVariable.balanceobjs[m_i + 2][this.SysCurrency_Id] = Number(this.NextPayFund);
            pageVariable.balanceobjs[m_i + 3][this.SysCurrency_Id] = Number(this.NextReceiveFund);
        });

        calculateByCurr(pageVariable.balanceobjs, function () {

            pageVariable.accountBalanceList.bindDataSource(pageVariable.balanceobjs);

            handlerFundStyle(pageVariable.accountBalanceList);
            controlBillRows();

            /* 隐藏进度 */
            pageframe.control.processCtrl.hideOperaProcess();
        });
    });
}
/* 构建资金列 */
function constructFundCell(key, cellValue, colume) {

    if (!cellValue || Number(cellValue) == 0) {
        cellValue = "";
    }
    else {
        cellValue = commoncore.func.getCurrHtml(pageVariable.currencySymbolStruct.getItem(colume), cellValue);
    }

    return cellValue;
}
/* 处理表样式 */
function handlerBillStyle(billtablelist) {
    $.each(billtablelist.dataSource.items.arrValues, function () {

        var m_row = $("#row" + this.BillKey);
        var m_tds = m_row.find("td");
        if (this.Layer == "1") {
            m_tds.css("background-color", "#ECF3FF");
            m_tds.css("border-width", "1px");
            m_tds.css("border-style", "solid");
            m_tds.css("border-top-color", "#C0C0C0");
        }
        else if (this.Layer == "2") {
            m_tds.css("background-color", "#FFFFFF");
            m_tds.css("border-width", "1px");
            m_tds.css("border-style", "solid");
            m_tds.css("border-top-color", "#C0C0C0");
        }
        else if (this.ShoppingArea) {
            m_tds.css("background-color", "#EBEBEB");
            m_tds.css("border-width", "1px");
            m_tds.css("border-style", "solid");
            m_tds.css("border-top-color", "#C0C0C0");
        }
        else {
            m_tds.css("background-color", "#F7F7F7");
            m_tds.css("border-width", "1px");
            m_tds.css("border-style", "solid");
            m_tds.css("border-top-color", "#C0C0C0");
        }
    });
}
/* 加载货币 */
function loadCurrency(event) {
    if (!pageVariable.currencySource) {
        var m_syscurrency = new othm.syscurrency();
        m_syscurrency.getAllSysCurrencys(function (tableSource) {
            pageVariable.currencySource = datastruct.convertion.tableToJson(tableSource);
            if (event) {
                event();
            }
        });
    }
    else {
        if (event) {
            event();
        }
    }
}

/* 加载财务支出收入账单 */
function loadTotalBill() {

    if (pageVariable.activetab != "billstat") {
        return;
    }
    
    if (!pageVariable.totalBillList) {

        var m_fillTableFunc = function () {
            var m_columns = [];
            m_columns.push({ display: mlm.C0041, name: "BillSeq", width: 60, align: 'left' });
            m_columns.push({ display: mlm.C0961, name: "BillType", width: 260, align: 'left', adjust: true, createCell: constructBillTypeCell });
            m_columns.push({ display: mlm.C0962, name: "BalanceSum", width: 102, align: 'right', adjust: true, createCell: constructBalanceSumCell });

            $.each(pageVariable.currencySource, function () {
                m_columns.push({ display: this.CurrName, name: this.SysCurrency_Id, width: 120, align: 'right', adjust: true, createCell: constructFundCell });

                pageVariable.currencySymbolStruct.setItem(this.SysCurrency_Id, this.CurrSymbol);
            });

            var m_height = pageframe.layout.getTableHeightInForm();
            pageVariable.totalBillList = new uicontrol.tableList("totalBillList",
                                     { isPaging: false,
                                         autoSeq: false,
                                         height: pageframe.layout.getTableHeightInForm(),
                                         keyColumn: "BillKey",
                                         columns: m_columns
                                     });

            loadBillDataRows();
        };

        loadCurrency(m_fillTableFunc);
    }
    else {
        if (!pageVariable.totalbills) {
            loadBillDataRows();
        }
    }
}
/* 构建账目列 */
function constructBillTypeCell(key, cellvalue) {
    var m_obj = null;
    if (pageVariable.activetab == "operationstat") {
        m_obj = pageVariable.accountBalanceList.getItem(key);
    }
    else if (pageVariable.activetab == "billstat") {
        m_obj = pageVariable.totalBillList.getItem(key);
    }
    else if (pageVariable.activetab == "accountstat") {
        m_obj = pageVariable.totalAccountList.getItem(key);
    }
    else if (pageVariable.activetab == "waitover") {
        m_obj = pageVariable.waitOverList.getItem(key);
    }
    else {
        m_obj = pageVariable.totalFundList.getItem(key);
    }

    var m_splitstr = "";
    if (m_obj.Layer == 2) {
        m_splitstr = "----";
    }
    else if (m_obj.Layer == 3) {
        m_splitstr = "--------";
    }
    else if (m_obj.Layer == 4) {
        m_splitstr = "------------";
    }
    else if (m_obj.Layer == 5) {
        m_splitstr = "----------------";
    }
    else if (m_obj.Layer == 6) {
        m_splitstr = "--------------------";
    }

    if (m_obj.HasChild) {
        if (m_obj.IsExpand) {
            var m_html = "<div style='float: left; margin: 0px 0px 0px 10px; padding: 0px'>" + m_splitstr + "</div>";
            return m_html + "<span id='billIcon_" + key + "' class='ui-icon ui-icon-circle-minus' style='float: left; margin: 1px 2px 0px 0px; cursor: pointer;' onmouseover='hoverBillType.call(this);' onmouseout='leaveBillType.call(this);' onclick='openOrCloseRows.call(this, \"" + key + "\");'></span><span style='float: left'>" + cellvalue + "</span>";
        }
        else {
            var m_html = "<div style='float: left; margin: 0px 0px 0px 10px; padding: 0px'>" + m_splitstr + "</div>";
            return m_html + "<span id='billIcon_" + key + "' class='ui-icon ui-icon-circle-plus' style='float: left; margin: 1px 2px 0px 0px; cursor: pointer;' onmouseover='hoverBillType.call(this);' onmouseout='leaveBillType.call(this);' onclick='openOrCloseRows.call(this, \"" + key + "\");'></span><span style='float: left'>" + cellvalue + "</span>";
        }
    }
    else {
        return "<div style='float: left; margin: 0px 0px 0px 10px; padding: 0px'>" + m_splitstr + "</div><span id='billIcon_" + key + "' class='ui-icon ui-icon-circle-minus' style='float: left; margin: 1px 2px 0px 0px;'></span><span style='float: left;'>" + cellvalue + "</span>";
    }
}
/* 构建折合人民币列 */
function constructBalanceSumCell(key, cellvalue) {
    return "<span style='color: #003366'>" + cellvalue + "</span>";
}
/* 支出收入账目的鼠标事件 */
function hoverBillType() {
    $(this).addClass("hover-bt");
}
function leaveBillType() {
    $(this).removeClass("hover-bt");
}
/* 控制收入支出账目行 */
function controlBillRows() {

    var m_tableList = null;
    var items = null;
    if (pageVariable.activetab == "operationstat") {
        m_tableList = pageVariable.accountBalanceList;
        items = pageVariable.balanceobjs;
    }
    else if (pageVariable.activetab == "billstat") {
        m_tableList = pageVariable.totalBillList;
        items = pageVariable.totalbills;
    }
    else if (pageVariable.activetab == "accountstat") {
        m_tableList = pageVariable.totalAccountList;
        items = pageVariable.totalAccounts;
    }
    else if (pageVariable.activetab == "waitover") {
        m_tableList = pageVariable.waitOverList;
        items = pageVariable.waitOvers;
    }
    else {
        m_tableList = pageVariable.totalFundList;
        items = pageVariable.fundTable;
    }

    $.each(items, function () {

        if (this.Layer > 1) {
            var m_parent = m_tableList.getItem(this.ParentKey);
            var m_row = $("#row" + this.BillKey);
            if (!m_parent.IsExpand) {
                m_row.hide();
            }
            else {
                m_row.show();
            }
        }
    });
}
/* 扩展或折叠行 */
function openOrCloseRows(key) {

    var m_items = null;
    var m_tableList = null;
    if (pageVariable.activetab == "operationstat") {
        m_tableList = pageVariable.accountBalanceList;
        m_items = pageVariable.balanceobjs;
    }
    else if (pageVariable.activetab == "billstat") {
        m_tableList = pageVariable.totalBillList;
        m_items = pageVariable.totalbills;
    }
    else if (pageVariable.activetab == "accountstat") {
        m_tableList = pageVariable.totalAccountList;
        m_items = pageVariable.totalAccounts;
    }
    else if (pageVariable.activetab == "waitover") {
        m_tableList = pageVariable.waitOverList;
        m_items = pageVariable.waitOvers;
    }
    else {
        m_tableList = pageVariable.totalFundList;
        m_items = pageVariable.fundTable;
    }

    var m_obj = m_tableList.getItem(key);

    if (m_obj.IsExpand) {
        m_obj.IsExpand = null;
        $(this).removeClass("ui-icon-circle-minus");
        $(this).addClass("ui-icon-circle-plus");

        $.each(m_items, function () {
            if (this.Indexs && this.Indexs.indexOf("#" + m_obj.BillKey + "#") > -1) {
                $("#row" + this.BillKey).hide();
            }
        });
    }
    else {
        m_obj.IsExpand = true;
        $(this).addClass("ui-icon-circle-minus");
        $(this).removeClass("ui-icon-circle-plus");

        $.each(m_items, function () {
            if (this.Indexs && this.Indexs.indexOf("#" + m_obj.BillKey + "#") > -1) {

                if (this.ParentKey == m_obj.BillKey) {
                    $("#row" + this.BillKey).show();
                }
                else {
                    var m_parentobj = m_tableList.getItem(this.ParentKey);

                    if (this.Layer > m_obj.Layer + 2) {

                        var m_isexpand = true;
                        var m_parentKeys = m_parentobj.Indexs.replaceAll("#", "").split(",");
                        m_parentKeys.push(m_parentobj.BillKey);
                        $.each(m_parentKeys, function () {
                            var m_item = m_tableList.getItem(this);
                            if (!m_item.IsExpand) {
                                m_isexpand = false;
                            }
                        });

                        if (m_isexpand) {
                            $("#row" + this.BillKey).show();
                        }
                    }
                    else {
                        if (m_parentobj.IsExpand) {
                            $("#row" + this.BillKey).show();
                        }
                    }
                }
            }
        });
    }
}
/* 加载账目数据行 */
function loadBillDataRows() {
    if (!pageVariable.totalbills) {

        /* 展示进度 */
        pageframe.control.processCtrl.showOperaProcess();
        
        pageVariable.totalbills = [];
        pageVariable.currmon_TotalPay = { BillKey: "Bill_1", BillSeq: "1", BillType: mlm.C0955, Layer: 1, HasChild: true, IsExpand: true };
        pageVariable.totalbills.push(pageVariable.currmon_TotalPay);
        pageVariable.lastmon_Pay = { BillKey: "Bill_2", BillSeq: "1.1", BillType: mlm.C0951 + pageVariable.timeStr + mlm.C0963, Layer: 2, Indexs: "#Bill_1#", ParentKey: "Bill_1", HasChild: true };
        pageVariable.totalbills.push(pageVariable.lastmon_Pay);

        var m_event_4 = function () {

            calculateByCurr(pageVariable.totalbills, function () {

                pageVariable.totalBillList.bindDataSource(pageVariable.totalbills);
                handlerBillStyle(pageVariable.totalBillList);

                controlBillRows();

                /* 隐藏进度 */
                pageframe.control.processCtrl.hideOperaProcess();
            });
        };

        var m_event_3 = function () {

            pageVariable.totallosedfund = { BillKey: "Bill_4", BillSeq: "3", BillType: mlm.C0959, Layer: 1, Indexs: "", HasChild: true };
            pageVariable.totalbills.push(pageVariable.totallosedfund);

            fillLostdFunds();
            m_event_4();
        };

        var m_event_2 = function () {
            $.each(pageVariable.currencySource, function () {

                var m_lasttotalpay = pageVariable.lastmon_Pay[this.SysCurrency_Id];
                if (!m_lasttotalpay) {
                    m_lasttotalpay = 0;
                }

                var m_totalpay = pageVariable.currmon_Pay[this.SysCurrency_Id];
                if (!m_totalpay) {
                    m_totalpay = 0;
                }

                pageVariable.currmon_TotalPay[this.SysCurrency_Id.toString()] = (Number(m_lasttotalpay) * 100 + Number(m_totalpay) * 100) / 100;
            });

            pageVariable.totalreceivebill = { BillKey: "Bill_5", BillSeq: "2", BillType: mlm.C0956, Layer: 1, HasChild: true, IsExpand: true };
            pageVariable.totalbills.push(pageVariable.totalreceivebill);

            pageVariable.lasttotalRvbill = { BillKey: "Bill_6", BillSeq: "2.1", BillType: mlm.C0951 + pageVariable.timeStr + mlm.C0964, Layer: 2, Indexs: "#Bill_5#", ParentKey: "Bill_5", HasChild: true };
            pageVariable.totalbills.push(pageVariable.lasttotalRvbill);

            pageVariable.lastsaleRvbill = { BillKey: "Bill_Last_8", BillSeq: "2.1.1", BillType: mlm.C0506, AIRType: "1", Layer: 3, Indexs: "#Bill_5#,#Bill_6#", ParentKey: "Bill_6" };
            pageVariable.lastproRefundRvbill = { BillKey: "Bill_Last_9", BillSeq: "2.1.2", BillType: mlm.C0854, AIRType: "3", Layer: 3, Indexs: "#Bill_5#,#Bill_6#", ParentKey: "Bill_6" };
            pageVariable.lastrefundRvbill = { BillKey: "Bill_Last_10", BillSeq: "2.1.3", BillType: mlm.C0855, AIRType: "4", Layer: 3, Indexs: "#Bill_5#,#Bill_6#", ParentKey: "Bill_6" };
            pageVariable.lastotherRvbill = { BillKey: "Bill_Last_11", BillSeq: "2.1.4", BillType: mlm.C0627, Layer: 3, AIRType: "5", Indexs: "#Bill_5#,#Bill_6#", ParentKey: "Bill_6" };
            
            loadBillReceive("lastreceive", "Bill_Last_Rv",
                            [pageVariable.lastsaleRvbill,
                              pageVariable.lastproRefundRvbill,
                              pageVariable.lastrefundRvbill,
                              pageVariable.lastotherRvbill], pageVariable.lasttotalRvbill,
                            function () {
                                pageVariable.totalcurrRvbill = { BillKey: "Bill_7", BillSeq: "2.2", BillType: pageVariable.timeNameStr + mlm.C0956, Layer: 2, Indexs: "#Bill_5#", ParentKey: "Bill_5", HasChild: true, IsExpand: true };
                                pageVariable.totalbills.push(pageVariable.totalcurrRvbill);

                                pageVariable.saleRvbill = { BillKey: "Bill_8", BillSeq: "2.2.1", BillType: mlm.C0506, AIRType: "1", Layer: 3, Indexs: "#Bill_5#,#Bill_7#", ParentKey: "Bill_7" };
                                pageVariable.proRefundRvbill = { BillKey: "Bill_9", BillSeq: "2.2.2", BillType: mlm.C0854, AIRType: "3", Layer: 3, Indexs: "#Bill_5#,#Bill_7#", ParentKey: "Bill_7" };
                                pageVariable.refundRvbill = { BillKey: "Bill_10", BillSeq: "2.2.3", BillType: mlm.C0855, AIRType: "4", Layer: 3, Indexs: "#Bill_5#,#Bill_7#", ParentKey: "Bill_7" };
                                pageVariable.otherRvbill = { BillKey: "Bill_11", BillSeq: "2.2.4", BillType: mlm.C0627, Layer: 3, AIRType: "5", Indexs: "#Bill_5#,#Bill_7#", ParentKey: "Bill_7" };
                                
                                loadBillReceive("currreceive", "Bill_Rv", [pageVariable.saleRvbill, pageVariable.proRefundRvbill, pageVariable.refundRvbill, pageVariable.otherRvbill], pageVariable.totalcurrRvbill,
                                                    function () {

                                                        $.each(pageVariable.currencySource, function () {
                                                            var m_lastreceive = pageVariable.lasttotalRvbill[this.SysCurrency_Id];
                                                            if (!m_lastreceive) {
                                                                m_lastreceive = 0;
                                                            }

                                                            var m_currreceive = pageVariable.totalcurrRvbill[this.SysCurrency_Id];
                                                            if (!m_currreceive) {
                                                                m_currreceive = 0;
                                                            }

                                                            pageVariable.totalreceivebill[this.SysCurrency_Id] = m_lastreceive + m_currreceive;
                                                        });

                                                        m_event_3();
                                                    });
                            });
        };

        var m_event_1 = function () {
            pageVariable.currmon_Pay = { BillKey: "Bill_3", BillSeq: "1.2", BillType: pageVariable.timeNameStr + mlm.C0955, Layer: 2, Indexs: "#Bill_1#", ParentKey: "Bill_1", HasChild: true, IsExpand: true };
            pageVariable.totalbills.push(pageVariable.currmon_Pay);
            loadCostSubjects("clearing", "Bill_CS", pageVariable.currmon_Pay, pageVariable.currmon_TotalPay, pageVariable.totalbills, m_event_2);
        };

        loadCostSubjects("lastclearing", "Bill_LCS", pageVariable.lastmon_Pay, pageVariable.currmon_TotalPay, pageVariable.totalbills, m_event_1);
    }
}
/* 加载成本科目 */
function loadCostSubjects(datasourcetype, prekey, parentbillobj, totalpaybillobj, itemlist, event) {
    var m_costsubject = new fm.costsubject();
    m_costsubject.getAllCostSubjects(function (source) {

        var costsubjects = datastruct.convertion.tableToJson(source);

        if (!pageVariable.shoppingStruct) {
            var m_financereport = new fm.financereport();
            m_financereport.Year = $("#ddlYear").val();
            m_financereport.Months = getReportMonths();
            m_financereport.querySaleSitesInFinance(function (shoppingSource) {

                pageVariable.shoppingSites = datastruct.convertion.tableToJson(shoppingSource);
                pageVariable.shoppingStruct = new datastruct.dictionary();
                $.each(pageVariable.shoppingSites, function () {

                    var m_ssobj = pageVariable.shoppingStruct.getItem(this.SalePlatform_Id);
                    if (m_ssobj) {
                        m_ssobj.SaleSites.push(this);
                    }
                    else {
                        var m_ssobj = { SalePlatform_Id: this.SalePlatform_Id, SPfName: this.SPfName, SaleSites: [] };
                        m_ssobj.SaleSites.push(this);
                        pageVariable.shoppingStruct.setItem(m_ssobj.SalePlatform_Id, m_ssobj);
                    }
                });

                fillCostSubjectAndSSArea(datasourcetype, prekey, costsubjects, parentbillobj, totalpaybillobj, itemlist, event);
            });
        }
        else {
            fillCostSubjectAndSSArea(datasourcetype, prekey, costsubjects, parentbillobj, totalpaybillobj, itemlist, event);
        }
    });
}
/* 填充详细支出信息 */
function fillCostSubjectAndSSArea(datasourcetype, prekey, costsubjects, parentbillobj, totalpaybillobj, itemlist, event) {

    var m_fillevent = function (source, datasourcetype, prekey, parentbillobj, event) {
        pageVariable.specshopdict = new datastruct.dictionary();
        pageVariable.specareadict = new datastruct.dictionary();
        pageVariable.costdict = new datastruct.dictionary();

        var m_jsonobjs = datastruct.convertion.tableToJson(source);
        $.each(m_jsonobjs, function () {
            pageVariable.specshopdict.setItem(this.CostSubject_Id + "-" + this.SalePlatform_Id, null);
            pageVariable.specareadict.setItem(this.CostSubject_Id + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id, null);
            pageVariable.costdict.setItem(this.CostSubject_Id + "-" + this.SysCurrency_Id + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id, this);
        });

        var m_parentDict = new datastruct.dictionary();

        var m_objList = [];
        var m_objDict = new datastruct.dictionary();
        $.each(costsubjects, function () {
            if (this.CostSubjectName == mlm.C0965) {
                this.ParentCostSubject_Id = 0;
                this.Layer = 0;
                this.CostSubjectIndexs = "";
                pageVariable.WaitTransferFundOut = this;
                return;
            }

            if (this.ParentCostSubject_Id == "0") {
                m_objList.push(this);
            }
            else {
                var m_parentobj = m_objDict.getItem(this.ParentCostSubject_Id);
                if (m_parentobj) {
                    if (!m_parentobj.children) {
                        m_parentobj.children = [];
                    }
                    m_parentobj.children.push(this);
                }
            }

            m_objDict.setItem(this.CostSubject_Id, this);
        });

        if (datasourcetype == "waitpay") {
            m_objList.push(pageVariable.WaitTransferFundOut);
        }

        var m_func = function (items) {
            if (items) {
                var _seq = 0;
                $.each(items, function () {
                    var m_pcs_id = this.ParentCostSubject_Id;
                    var m_parent_seq = 0;
                    _seq++;

                    if (m_pcs_id == "0") {
                        this.ParentCostSubject_Id = parentbillobj.BillKey;
                        m_parent_seq = parentbillobj.BillSeq + "." + _seq;
                    }
                    else {
                        this.ParentCostSubject_Id = prekey + this.ParentCostSubject_Id.toString();

                        var m_prt_obj = m_objDict.getItem(m_pcs_id);
                        m_parent_seq = m_prt_obj.BillSeq + "." + _seq;
                    }

                    var m_indexarr = [];
                    if (totalpaybillobj) {
                        m_indexarr.push("#" + totalpaybillobj.BillKey + "#");
                    }
                    m_indexarr.push("#" + parentbillobj.BillKey + "#");
                    if (this.CostSubjectIndexs) {
                        var m_items = this.CostSubjectIndexs.split(",");
                        $.each(m_items, function () {
                            m_indexarr.push("#" + prekey + this.replaceAll("#", "") + "#");
                        });
                    }

                    this.BillSeq = m_parent_seq;
                    var m_costsubject_id = this.CostSubject_Id.toString();
                    var m_item = { BillKey: prekey + m_costsubject_id,
                        BillSeq: m_parent_seq,
                        BillType: this.CostSubjectName,
                        Layer: parentbillobj.Layer + Number(this.Layer) + 1,
                        Indexs: m_indexarr.join(","),
                        ParentKey: this.ParentCostSubject_Id
                    };

                    $.each(pageVariable.currencySource, function () {
                        var m_cost = pageVariable.costdict.getItem(m_costsubject_id + "-" + this.SysCurrency_Id + "--1--1");
                        if (m_cost) {
                            m_item[this.SysCurrency_Id.toString()] = m_cost.Paidout;

                            if (m_pcs_id == "0") {
                                var m_t_pay = parentbillobj[this.SysCurrency_Id.toString()];
                                if (!m_t_pay) {
                                    m_t_pay = 0;
                                }

                                parentbillobj[this.SysCurrency_Id.toString()] = Math.round(Number(m_t_pay) * 100 + Number(m_cost.Paidout * 100)) / 100;
                            }
                        }
                    });

                    m_parentDict.setItem(m_item.BillKey, m_item);
                    var m_parentObj = m_parentDict.getItem(m_item.ParentKey.toString());
                    if (m_parentObj) {
                        m_parentObj.HasChild = true;
                    }

                    itemlist.push(m_item);

                    if (this.CostSubjectName == mlm.C0965) {
                        return;
                    }

                    if (this.children) {
                        m_func(this.children);
                    }
                    else {
                        if (pageVariable.shoppingStruct) {

                            var m_waitshops = [];
                            $.each(pageVariable.shoppingStruct.arrValues, function () {
                                if (!pageVariable.specshopdict.containKey(m_costsubject_id + "-" + this.SalePlatform_Id)) {
                                    return;
                                }

                                m_waitshops.push(this);
                            });
                            if (pageVariable.specareadict.containKey(m_costsubject_id + "-0-0")) {
                                m_waitshops.push({ SalePlatform_Id: 0, SPfName: mlm.C0966, SaleSites: [] });
                            }

                            if (m_waitshops.length > 0) {
                                if (m_waitshops.length == 1) {
                                    var m_shptr = m_waitshops[0].SPfName;
                                    if (m_shptr != mlm.C0966) {
                                        m_item.BillType += "(" + m_shptr + ")";
                                    }
                                }
                                else {
                                    m_item.HasChild = true;

                                    var _shopseq = 0;
                                    $.each(m_waitshops, function () {
                                        _shopseq++;
                                        var m_SalePlatform_Id = this.SalePlatform_Id.toString();
                                        //成本科目-销售平台程度
                                        var m_shop_item = { BillKey: m_item.BillKey + "Bill_Shop" + m_SalePlatform_Id,
                                            BillSeq: m_item.BillSeq + "." + _shopseq,
                                            BillType: this.SPfName,
                                            Layer: m_item.Layer + 1,
                                            Indexs: m_item.Indexs + ",#" + m_item.BillKey + "#",
                                            ParentKey: m_item.BillKey,
                                            ShoppingArea: true
                                        };
                                        $.each(pageVariable.currencySource, function () {
                                            var m_cost = pageVariable.costdict.getItem(m_costsubject_id + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "--1");
                                            if (m_cost) {
                                                m_shop_item[this.SysCurrency_Id.toString()] = m_cost.Paidout;
                                            }
                                        });

                                        var m_hasundefinearea = pageVariable.specareadict.containKey(m_costsubject_id + "-" + this.SalePlatform_Id + "-0");
                                        if ((!this.SaleSites || this.SaleSites.length == 1) && !m_hasundefinearea) {
                                            if (this.SaleSites.length == 1) {
                                                var m_pricearea_id = this.SaleSites[0].SaleSite_Id;
                                                m_shop_item.BillType += "(" + this.SaleSites[0].SaleSiteName + ")";
                                                $.each(pageVariable.currencySource, function () {
                                                    var m_cost = pageVariable.costdict.getItem(m_costsubject_id + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "-0");
                                                    if (m_cost) {
                                                        m_shop_item[this.SysCurrency_Id.toString()] = m_cost.Paidout;
                                                    }
                                                });
                                            }
                                            else {
                                                $.each(pageVariable.currencySource, function () {
                                                    var m_cost = pageVariable.costdict.getItem(m_costsubject_id + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "-0");
                                                    if (m_cost) {
                                                        m_shop_item[this.SysCurrency_Id.toString()] = m_cost.Paidout;
                                                    }
                                                });
                                            }

                                            itemlist.push(m_shop_item);
                                        }
                                        else {
                                            itemlist.push(m_shop_item);

                                            var m_waitpriceareas = [];
                                            $.each(this.SaleSites, function () {
                                                if (!pageVariable.specareadict.containKey(m_costsubject_id + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id)) {
                                                    return;
                                                }
                                                m_waitpriceareas.push(this);
                                            });

                                            if (m_hasundefinearea) {
                                                m_waitpriceareas.push({ SaleSite_Id: 0, SaleSiteName: mlm.C0966 });
                                            }

                                            if (m_waitpriceareas.length > 0) {
                                                if (m_waitpriceareas.length == 1) {
                                                    var m_pnstr = m_waitpriceareas[0].SaleSiteName;
                                                    if (m_pnstr != mlm.C0966) {
                                                        m_shop_item.BillType += "(" + m_pnstr + ")";
                                                    }
                                                }
                                                else {
                                                    m_shop_item.HasChild = true;

                                                    var _areaseq = 0;
                                                    //成本科目-销售平台-区域程度
                                                    $.each(m_waitpriceareas, function () {
                                                        var m_salesite_id = "0";
                                                        _areaseq++;

                                                        if (this.SaleSite_Id) {
                                                            m_salesite_id = this.SaleSite_Id.toString();
                                                        }
                                                        var m_pricearea_item = { BillKey: m_shop_item.BillKey + "_Area" + m_salesite_id,
                                                            BillSeq: m_shop_item.BillSeq + "." + _areaseq,
                                                            BillType: this.SaleSiteName,
                                                            Layer: m_shop_item.Layer + 1,
                                                            Indexs: m_shop_item.Indexs + ",#" + m_shop_item.BillKey + "#",
                                                            ParentKey: m_shop_item.BillKey,
                                                            ShoppingArea: true
                                                        };
                                                        $.each(pageVariable.currencySource, function () {
                                                            var m_cost = pageVariable.costdict.getItem(m_costsubject_id + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "-" + m_salesite_id);
                                                            if (m_cost) {
                                                                m_pricearea_item[this.SysCurrency_Id.toString()] = m_cost.Paidout;
                                                            }
                                                        });

                                                        itemlist.push(m_pricearea_item);
                                                    });
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                });
            }
        };

        m_func(m_objList);

        if (event) {
            event();
        }
    };

    var m_financereport = new fm.financereport();
    
    m_financereport.Year = $("#ddlYear").val();
    m_financereport.Months = getReportMonths();

    if (datasourcetype == "clearing") {
        m_financereport.getTotalPayBillByTime(function (source) {
            m_fillevent(source, datasourcetype, prekey, parentbillobj, event);
        });
    }
    else if (datasourcetype == "currpayaccount") {
        m_financereport.getTotalPayAccountByTime(function (source) {
            m_fillevent(source, datasourcetype, prekey, parentbillobj, event);
        });
    }
    else if (datasourcetype == "waitpay") {
        m_financereport.getWaitPayByTime(function (source) {
            m_fillevent(source, datasourcetype, prekey, parentbillobj, event);
        });
    }
    else {
        m_financereport.getLastTotalPayBillByTime(function (source) {
            m_fillevent(source, datasourcetype, prekey, parentbillobj, event);
        });
    }
}
/* 填充损失 */
function fillLostdFunds() {
    pageVariable.rvLosed = { BillKey: "Bill_RvLose", BillSeq: "3.1", BillType: mlm.C0967, Layer: 2, Indexs: "#Bill_4#", ParentKey: "Bill_4" };
    pageVariable.totalbills.push(pageVariable.rvLosed);
    loadShopSiteAndArea("10001", pageVariable.rvLosed, pageVariable.totallosedfund);

    pageVariable.payLosed = { BillKey: "Bill_PayLose", BillSeq: "3.2", BillType: mlm.C0968, Layer: 2, Indexs: "#Bill_4#", ParentKey: "Bill_4" };
    pageVariable.totalbills.push(pageVariable.payLosed);
    loadShopSiteAndArea("10000", pageVariable.payLosed, pageVariable.totallosedfund);

    pageVariable.transLosed = { BillKey: "Bill_TransLose", BillSeq: "3.3", BillType: mlm.C0969, Layer: 2, Indexs: "#Bill_4#", ParentKey: "Bill_4" };
    pageVariable.totalbills.push(pageVariable.transLosed);
    loadShopSiteAndArea("10002", pageVariable.transLosed, pageVariable.totallosedfund);
}
/* 加载销售区域 */
function loadShopSiteAndArea(billkey, parentbillobj, totalbillobj) {
    if (pageVariable.shoppingStruct) {

        var m_waitshops = [];
        $.each(pageVariable.shoppingStruct.arrValues, function () {
            if (!pageVariable.specshopdict.containKey(billkey + "-" + this.SalePlatform_Id)) {
                return;
            }

            m_waitshops.push(this);
        });
        if (pageVariable.specareadict.containKey(billkey+ "-0-0")) {
            m_waitshops.push({ SalePlatform_Id: 0, SPfName: mlm.C0966, SaleSites: [] });
        }

        if (m_waitshops.length > 1) {
            parentbillobj.HasChild = true;
        }
        else if (m_waitshops.length == 1) {
            var m_shptr = m_waitshops[0].SPfName;
            if (m_shptr != mlm.C0966) {
                parentbillobj.BillType += "(" + m_shptr + ")";
            }
        }

        $.each(m_waitshops, function () {
            var m_SalePlatform_Id = this.SalePlatform_Id.toString();
            var m_shop_item = { BillKey: parentbillobj.BillKey + "_" + m_SalePlatform_Id,
                BillSeq: "2.2.1",
                BillType: this.SPfName,
                Layer: parentbillobj.Layer + 1,
                Indexs: parentbillobj.Indexs + ",#" + parentbillobj.BillKey + "#",
                ParentKey: parentbillobj.BillKey,
                ShoppingArea: true
            };
            $.each(pageVariable.currencySource, function () {
                var m_cost = pageVariable.costdict.getItem(billkey + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "--1");
                if (m_cost) {
                    m_shop_item[this.SysCurrency_Id.toString()] = m_cost.Payout;

                    var m_fund = parentbillobj[this.SysCurrency_Id.toString()];
                    if (!m_fund) {
                        m_fund = 0;
                    }

                    parentbillobj[this.SysCurrency_Id.toString()] = (Number(m_fund) * 100 + Number(m_cost.Payout) * 100) / 100;

                    var m_totalfund = totalbillobj[this.SysCurrency_Id.toString()];
                    if (!m_totalfund) {
                        m_totalfund = 0;
                    }
                    totalbillobj[this.SysCurrency_Id.toString()] = (Number(m_totalfund) * 100 + Number(m_cost.Payout) * 100) / 100;
                }
            });
            pageVariable.totalbills.push(m_shop_item);
        });
    }
}
/* 加载详细收入信息 */
function loadBillReceive(datasourcetype, prekey, receivebillobjs, parentrvbillobj, event) {

    var m_func = function (source) {
        pageVariable.receivesshopdict = new datastruct.dictionary();
        pageVariable.recceiveareadict = new datastruct.dictionary();
        pageVariable.receivedict = new datastruct.dictionary();

        var m_jsonobjs = datastruct.convertion.tableToJson(source);
        $.each(m_jsonobjs, function () {
            if (Number(this.ReceivedIn) > 0) {
                pageVariable.receivesshopdict.setItem(this.AIRType + "-" + this.SalePlatform_Id, null);
                pageVariable.recceiveareadict.setItem(this.AIRType + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id, null);
                pageVariable.receivedict.setItem(this.AIRType + "-" + this.SysCurrency_Id + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id, this);
            }
        });

        $.each(receivebillobjs, function () {
            var m_airtype = this.AIRType;
            var m_item = this;

            $.each(pageVariable.currencySource, function () {
                var m_receive = pageVariable.receivedict.getItem(m_airtype + "-" + this.SysCurrency_Id + "--1--1");
                if (m_receive) {
                    m_item[this.SysCurrency_Id.toString()] = m_receive.ReceivedIn;

                    var m_t_receive = parentrvbillobj[this.SysCurrency_Id.toString()];
                    if (!m_t_receive) {
                        m_t_receive = 0;
                    }
                    parentrvbillobj[this.SysCurrency_Id.toString()] = Math.round(Number(m_t_receive) * 100 + Number(m_receive.ReceivedIn * 100)) / 100;
                }
            });

            pageVariable.totalbills.push(m_item);

            if (pageVariable.shoppingStruct) {

                var m_waitshops = [];
                $.each(pageVariable.shoppingStruct.arrValues, function () {
                    if (!pageVariable.receivesshopdict.containKey(m_airtype + "-" + this.SalePlatform_Id)) {
                        return;
                    }

                    m_waitshops.push(this);
                });
                if (pageVariable.receivesshopdict.containKey(m_airtype + "-0")) {
                    m_waitshops.push({ SalePlatform_Id: 0, SPfName: mlm.C0966, SaleSites: [] });
                }

                if (m_waitshops.length > 0) {
                    if (m_waitshops.length == 1) {
                        if (m_waitshops[0].SPfName != mlm.C0966) {
                            m_item.HasChild = true;
                        }
                    }
                    else {
                        m_item.HasChild = true;
                    }
                }

                var _shopseq = 0;
                $.each(m_waitshops, function () {
                    _shopseq++;
                    var m_SalePlatform_Id = this.SalePlatform_Id.toString();
                    var m_shop_item = { BillKey: m_item.BillKey + "_" + m_SalePlatform_Id,
                        BillSeq: m_item.BillSeq + "." + _shopseq,
                        BillType: this.SPfName,
                        Layer: m_item.Layer + 1,
                        Indexs: m_item.Indexs + ",#" + m_item.BillKey + "#",
                        ParentKey: m_item.BillKey,
                        ShoppingArea: true
                    };
                    $.each(pageVariable.currencySource, function () {
                        var m_rv = pageVariable.receivedict.getItem(m_airtype + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "--1");
                        if (m_rv) {
                            m_shop_item[this.SysCurrency_Id.toString()] = m_rv.ReceivedIn;
                        }
                    });
                    pageVariable.totalbills.push(m_shop_item);

                    var m_waitpriceareas = [];
                    $.each(this.SaleSites, function () {
                        if (!pageVariable.recceiveareadict.containKey(m_airtype + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id)) {
                            return;
                        }
                        m_waitpriceareas.push(this);
                    });
                    if (pageVariable.recceiveareadict.containKey(m_airtype + "-" + this.SalePlatform_Id + "-0")) {
                        m_waitpriceareas.push({ SaleSite_Id: 0, SaleSiteName: mlm.C0966 });
                    }

                    if (m_waitpriceareas.length > 0) {
                        if (m_waitpriceareas.length == 1) {
                            var m_pnstr = m_waitpriceareas[0].SaleSiteName;
                            if (m_pnstr != mlm.C0966) {
                                m_shop_item.BillType += "(" + m_pnstr + ")";
                            }
                        }
                        else {
                            m_shop_item.HasChild = true;

                            var _priceseq = 0;
                            $.each(m_waitpriceareas, function () {
                                _priceseq++;
                                var m_salesite_id = "0";
                                if (this.SaleSite_Id) {
                                    m_salesite_id = this.SaleSite_Id.toString();
                                }
                                var m_pricearea_item = { BillKey: m_shop_item.BillKey + "_Area" + m_salesite_id,
                                    BillSeq: m_shop_item.BillSeq + "." + _priceseq,
                                    BillType: this.SaleSiteName,
                                    Layer: m_shop_item.Layer + 1,
                                    Indexs: m_shop_item.Indexs + ",#" + m_shop_item.BillKey + "#",
                                    ParentKey: m_shop_item.BillKey,
                                    ShoppingArea: true
                                };
                                $.each(pageVariable.currencySource, function () {
                                    var m_rv = pageVariable.receivedict.getItem(m_airtype + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "-" + m_salesite_id);
                                    if (m_rv) {
                                        m_pricearea_item[this.SysCurrency_Id.toString()] = m_rv.ReceivedIn;
                                    }
                                });

                                pageVariable.totalbills.push(m_pricearea_item);
                            });
                        }
                    }
                });
            }
        });

        if (event) {
            event();
        }
    };

    var m_financereport = new fm.financereport();
    
    m_financereport.Year = $("#ddlYear").val();
    m_financereport.Months = getReportMonths();

    if (datasourcetype == "currreceive") {
        m_financereport.getTotalReceiveBillByTime(function (source) {
            m_func(source);
        });
    }
    else {
        m_financereport.getLastTotalRvBillByTime(function (source) {
            m_func(source);
        });
    }
}

/* 加载财务应收应付账单 */
function loadTotalAccount() {
    if (pageVariable.activetab != "accountstat") {
        return;
    }

    if (!pageVariable.totalAccountList) {

        var m_fillTableFunc = function () {
            var m_columns = [];
            m_columns.push({ display: mlm.C0041, name: "BillSeq", width: 60, align: 'left' });
            m_columns.push({ display: mlm.C0961, name: "BillType", width: 240, align: 'left', adjust: true, createCell: constructBillTypeCell });
            m_columns.push({ display: mlm.C0962, name: "BalanceSum", width: 120, align: 'right', adjust: true, createCell: constructBalanceSumCell });

            $.each(pageVariable.currencySource, function () {
                m_columns.push({ display: this.CurrName, name: this.SysCurrency_Id, width: 120, align: 'right', adjust: true, createCell: constructFundCell });

                pageVariable.currencySymbolStruct.setItem(this.SysCurrency_Id, this.CurrSymbol);
            });

            var m_height = pageframe.layout.getTableHeightInForm();
            pageVariable.totalAccountList = new uicontrol.tableList("totalAccountList",
                                     { isPaging: false,
                                         autoSeq: false,
                                         height: pageframe.layout.getTableHeightInForm(),
                                         keyColumn: "BillKey",
                                         columns: m_columns
                                     });

            loadAccountDataRows();
        };

        loadCurrency(m_fillTableFunc);
    }
    else {
        if (!pageVariable.totalAccounts) {
            loadAccountDataRows();
        }
    }
}
/* 加载应收应付账目数据行 */
function loadAccountDataRows() {
    if (!pageVariable.totalAccounts) {
        /* 展示进度 */
        pageframe.control.processCtrl.showOperaProcess();

        pageVariable.totalAccounts = [];
        pageVariable.totalPay = { BillKey: "Account_1", BillSeq: "1", BillType: mlm.C0953, Layer: 1, HasChild: true, IsExpand: true };
        pageVariable.totalAccounts.push(pageVariable.totalPay);

        var m_event_4 = function () {

            pageVariable.totalReceive = { BillKey: "Account_2", BillSeq: "2", BillType: mlm.C0954, Layer: 1, HasChild: true, IsExpand: true };
            pageVariable.totalAccounts.push(pageVariable.totalReceive);

            pageVariable.saleRvaccount = { BillKey: "Account_8", BillSeq: "2.1", BillType: mlm.C0506, AIRType: "1", Layer: 2, Indexs: "#Account_2#", ParentKey: "Account_2" };
            pageVariable.proRefundRvbill = { BillKey: "Account_9", BillSeq: "2.2", BillType: mlm.C0854, AIRType: "3", Layer: 2, Indexs: "#Account_2#", ParentKey: "Account_2" };
            pageVariable.refundRvbill = { BillKey: "Account_10", BillSeq: "2.3", BillType: mlm.C0855, AIRType: "4", Layer: 2, Indexs: "#Account_2#", ParentKey: "Account_2" };
            pageVariable.otherRvbill = { BillKey: "Account_11", BillSeq: "2.4", BillType: mlm.C0627, Layer: 2, AIRType: "5", Indexs: "#Account_2#", ParentKey: "Account_2" };
            
            loadAccountReceive("currreceiveaccount", "AccountRv_", [pageVariable.saleRvaccount,
                                                  pageVariable.proRefundRvbill,
                                                  pageVariable.refundRvbill,
                                                  pageVariable.otherRvbill],
                                                  pageVariable.totalReceive,
                                                  function () {
                                                      calculateByCurr(pageVariable.totalAccounts, function () {

                                                          pageVariable.totalAccountList.bindDataSource(pageVariable.totalAccounts);
                                                          handlerBillStyle(pageVariable.totalAccountList);

                                                          controlBillRows();

                                                          /* 隐藏进度 */
                                                          pageframe.control.processCtrl.hideOperaProcess();
                                                      });
                                                  });
        };

        loadCostSubjects("currpayaccount", "Account_Pay_", pageVariable.totalPay, null, pageVariable.totalAccounts, m_event_4);
    }
}
/* 加载收入信息 */
function loadAccountReceive(datasourcetype, prekey, receiveaccountobjs, parentrvaccountobj, event) {

    var m_func = function (source) {
        pageVariable.rvaccountsshopdict = new datastruct.dictionary();
        pageVariable.rvaccountareadict = new datastruct.dictionary();
        pageVariable.rvaccountdict = new datastruct.dictionary();

        var m_jsonobjs = datastruct.convertion.tableToJson(source);
        $.each(m_jsonobjs, function () {
            if (Number(this.Receive) > 0) {
                pageVariable.rvaccountsshopdict.setItem(this.AIRType + "-" + this.SalePlatform_Id, null);
                pageVariable.rvaccountareadict.setItem(this.AIRType + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id, null);
                pageVariable.rvaccountdict.setItem(this.AIRType + "-" + this.SysCurrency_Id + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id, this);
            }
        });

        $.each(receiveaccountobjs, function () {
            var m_airtype = this.AIRType;
            var m_item = this;

            $.each(pageVariable.currencySource, function () {
                var m_receive = pageVariable.rvaccountdict.getItem(m_airtype + "-" + this.SysCurrency_Id + "--1--1");
                if (m_receive) {
                    m_item[this.SysCurrency_Id.toString()] = m_receive.Receive;

                    var m_t_receive = parentrvaccountobj[this.SysCurrency_Id.toString()];
                    if (!m_t_receive) {
                        m_t_receive = 0;
                    }
                    parentrvaccountobj[this.SysCurrency_Id.toString()] = Math.round(Number(m_t_receive) * 100 + Number(m_receive.Receive * 100)) / 100;
                }
            });

            pageVariable.totalAccounts.push(m_item);

            if (pageVariable.shoppingStruct) {

                var m_waitshops = [];
                $.each(pageVariable.shoppingStruct.arrValues, function () {
                    if (!pageVariable.rvaccountsshopdict.containKey(m_airtype + "-" + this.SalePlatform_Id)) {
                        return;
                    }

                    m_waitshops.push(this);
                });
                if (pageVariable.rvaccountsshopdict.containKey(m_airtype + "-0")) {
                    m_waitshops.push({ SalePlatform_Id: 0, SPfName: mlm.C0966, SaleSites: [] });
                }

                if (m_waitshops.length > 0) {
                    if (m_waitshops.length == 1) {
                        if (m_waitshops[0].SPfName != mlm.C0966) {
                            m_item.HasChild = true;
                        }
                    }
                    else {
                        m_item.HasChild = true;
                    }
                }

                var _shopseq = 0;
                $.each(m_waitshops, function () {
                    _shopseq++;
                    var m_SalePlatform_Id = this.SalePlatform_Id.toString();
                    var m_shop_item = { BillKey: m_item.BillKey + "_" + m_SalePlatform_Id,
                        BillSeq: m_item.BillSeq + "." + _shopseq,
                        BillType: this.SPfName,
                        Layer: m_item.Layer + 1,
                        Indexs: m_item.Indexs + ",#" + m_item.BillKey + "#",
                        ParentKey: m_item.BillKey,
                        ShoppingArea: true
                    };
                    $.each(pageVariable.currencySource, function () {
                        var m_rv = pageVariable.rvaccountdict.getItem(m_airtype + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "--1");
                        if (m_rv) {
                            m_shop_item[this.SysCurrency_Id.toString()] = m_rv.Receive;
                        }
                    });
                    pageVariable.totalAccounts.push(m_shop_item);

                    var m_waitpriceareas = [];
                    $.each(this.SaleSites, function () {
                        if (!pageVariable.rvaccountareadict.containKey(m_airtype + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id)) {
                            return;
                        }
                        m_waitpriceareas.push(this);
                    });
                    if (pageVariable.rvaccountareadict.containKey(m_airtype + "-" + this.SalePlatform_Id + "-0")) {
                        m_waitpriceareas.push({ SaleSite_Id: 0, SaleSiteName: mlm.C0966 });
                    }

                    if (m_waitpriceareas.length > 0) {
                        if (m_waitpriceareas.length == 1) {
                            var m_pnstr = m_waitpriceareas[0].SaleSiteName;
                            if (m_pnstr != mlm.C0966) {
                                m_shop_item.BillType += "(" + m_pnstr + ")";
                            }
                        }
                        else {
                            m_shop_item.HasChild = true;

                            var _priceseq = 0;
                            $.each(m_waitpriceareas, function () {
                                _priceseq++;
                                var m_salesite_id = "0";
                                if (this.SaleSite_Id) {
                                    m_salesite_id = this.SaleSite_Id.toString();
                                }
                                var m_pricearea_item = { BillKey: m_shop_item.BillKey + "_Area" + m_salesite_id,
                                    BillSeq: m_shop_item.BillSeq + "." + _priceseq,
                                    BillType: this.SaleSiteName,
                                    Layer: m_shop_item.Layer + 1,
                                    Indexs: m_shop_item.Indexs + ",#" + m_shop_item.BillKey + "#",
                                    ParentKey: m_shop_item.BillKey,
                                    ShoppingArea: true
                                };
                                $.each(pageVariable.currencySource, function () {
                                    var m_rv = pageVariable.rvaccountdict.getItem(m_airtype + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "-" + m_salesite_id);
                                    if (m_rv) {
                                        m_pricearea_item[this.SysCurrency_Id.toString()] = m_rv.Receive;
                                    }
                                });

                                pageVariable.totalAccounts.push(m_pricearea_item);
                            });
                        }
                    }
                });
            }
        });

        if (event) {
            event();
        }
    };

    var m_financereport = new fm.financereport();
    
    m_financereport.Year = $("#ddlYear").val();
    m_financereport.Months = getReportMonths();

    m_financereport.getTotalReceiveAccountByTime(function (source) {
        m_func(source);
    });
}

/* 加载下月待结账单 */
function loadWaitOver() {
    if (pageVariable.activetab != "waitover") {
        return;
    }

    if (!pageVariable.waitOverList) {

        var m_fillTableFunc = function () {
            var m_columns = [];
            m_columns.push({ display: mlm.C0041, name: "BillSeq", width: 60, align: 'left' });
            m_columns.push({ display: mlm.C0961, name: "BillType", width: 240, align: 'left', adjust: true, createCell: constructBillTypeCell });
            m_columns.push({ display: mlm.C0962, name: "BalanceSum", width: 120, align: 'right', adjust: true, createCell: constructBalanceSumCell });

            $.each(pageVariable.currencySource, function () {
                m_columns.push({ display: this.CurrName, name: this.SysCurrency_Id, width: 120, align: 'right', adjust: true, createCell: constructFundCell });

                pageVariable.currencySymbolStruct.setItem(this.SysCurrency_Id, this.CurrSymbol);
            });

            var m_height = pageframe.layout.getTableHeightInForm();
            pageVariable.waitOverList = new uicontrol.tableList("waitOverList",
                                     { isPaging: false,
                                         autoSeq: false,
                                         height: pageframe.layout.getTableHeightInForm(),
                                         keyColumn: "BillKey",
                                         columns: m_columns
                                     });

            loadWaitoverRows();
        };

        loadCurrency(m_fillTableFunc);
    }
    else {
        if (!pageVariable.waitOvers) {
            loadWaitoverRows();
        }
    }
}
/* 加载待结算数据行 */
function loadWaitoverRows() {
    if (!pageVariable.waitOvers) {
        /* 展示进度 */
        pageframe.control.processCtrl.showOperaProcess();

        pageVariable.waitOvers = [];
        pageVariable.totalWaitPay = { BillKey: "Wait_1", BillSeq: "1", BillType: mlm.C0960 + pageVariable.timeStr + mlm.C0950, Layer: 1, HasChild: true, IsExpand: true };
        pageVariable.waitOvers.push(pageVariable.totalWaitPay);

        var m_event_4 = function () {

            pageVariable.waitReceive = { BillKey: "Wait_2", BillSeq: "2", BillType: mlm.C0960 + pageVariable.timeStr + mlm.C0952, Layer: 1, HasChild: true, IsExpand: true };
            pageVariable.waitOvers.push(pageVariable.waitReceive);

            pageVariable.waitSaleRv = { BillKey: "Wait_8", BillSeq: "2.1", BillType: mlm.C0506, AIRType: "1", Layer: 2, Indexs: "#Wait_2#", ParentKey: "Wait_2" };
            pageVariable.waitProRefundRv = { BillKey: "Wait_9", BillSeq: "2.2", BillType: mlm.C0854, AIRType: "3", Layer: 2, Indexs: "#Wait_2#", ParentKey: "Wait_2" };
            pageVariable.waitRefundRv = { BillKey: "Wait_10", BillSeq: "2.3", BillType: mlm.C0855, AIRType: "4", Layer: 2, Indexs: "#Wait_2#", ParentKey: "Wait_2" };
            pageVariable.waitOtherRv = { BillKey: "Wait_11", BillSeq: "2.4", BillType: mlm.C0627, Layer: 2, AIRType: "5", Indexs: "#Wait_2#", ParentKey: "Wait_2" };
            pageVariable.waitInitRv = { BillKey: "Wait_12", BillSeq: "2.5", BillType: mlm.C0507, Layer: 2, AIRType: "2", Indexs: "#Wait_2#", ParentKey: "Wait_2" };

            pageVariable.waitTransferIn = { BillKey: "Wait_13", BillSeq: "2.6", BillType: mlm.C0970, Layer: 2, AIRType: "2", Indexs: "#Wait_2#", ParentKey: "Wait_2" };

            loadWaitReceive("waitreceive", "WaitRv_", [pageVariable.waitSaleRv,
                                                  pageVariable.waitProRefundRv,
                                                  pageVariable.waitRefundRv,
                                                  pageVariable.waitOtherRv,
                                                  pageVariable.waitInitRv],
                                                  pageVariable.waitReceive,
                                                  function () {

                                                      var m_financereport = new fm.financereport();
                                                      
                                                      m_financereport.Year = $("#ddlYear").val();
                                                      m_financereport.Months = getReportMonths();

                                                      m_financereport.getWaitFundTransferInByTime(function (source) {

                                                          var m_jsonobjs = datastruct.convertion.tableToJson(source);
                                                          if (m_jsonobjs && m_jsonobjs.length > 0) {
                                                              $.each(pageVariable.currencySource, function () {
                                                                  if (this.SysCurrency_Id == m_jsonobjs[0].InSysCurrency_Id) {
                                                                      var m_infund = m_jsonobjs[0].InFund;

                                                                      var m_rv = pageVariable.waitTransferIn[this.SysCurrency_Id];
                                                                      if (!m_rv) {
                                                                          m_rv = 0;
                                                                      }
                                                                      pageVariable.waitTransferIn[this.SysCurrency_Id] = Math.round((Number(m_rv) * 100 + Number(m_infund) * 100)) / 100;

                                                                      var m_totalrv = pageVariable.waitReceive[this.SysCurrency_Id];
                                                                      if (!m_totalrv) {
                                                                          m_totalrv = 0;
                                                                      }

                                                                      pageVariable.waitReceive[this.SysCurrency_Id] = Math.round((Number(m_totalrv) * 100 + Number(m_rv) * 100 + Number(m_infund) * 100)) / 100;
                                                                  }
                                                              });
                                                          }
                                                          pageVariable.waitOvers.push(pageVariable.waitTransferIn);

                                                          calculateByCurr(pageVariable.waitOvers, function () {

                                                              pageVariable.waitOverList.bindDataSource(pageVariable.waitOvers);
                                                              handlerBillStyle(pageVariable.waitOverList);

                                                              controlBillRows();

                                                              /* 隐藏进度 */
                                                              pageframe.control.processCtrl.hideOperaProcess();
                                                          });
                                                      });
                                                  });
        };

        loadCostSubjects("waitpay", "Wait_Pay_", pageVariable.totalWaitPay, null, pageVariable.waitOvers, m_event_4);
    }
}
/* 加载待收入信息 */
function loadWaitReceive(datasourcetype, prekey, waitreceiveobjs, parenwaittrvobj, event) {

    var m_func = function (source) {
        pageVariable.waitrvsshopdict = new datastruct.dictionary();
        pageVariable.waitrvareadict = new datastruct.dictionary();
        pageVariable.waitrvdict = new datastruct.dictionary();

        var m_jsonobjs = datastruct.convertion.tableToJson(source);
        $.each(m_jsonobjs, function () {
            if (Number(this.WaitReceive) > 0) {
                pageVariable.waitrvsshopdict.setItem(this.AIRType + "-" + this.SalePlatform_Id, null);
                pageVariable.waitrvdict.setItem(this.AIRType + "-" + this.SysCurrency_Id + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id, this);
                pageVariable.waitrvareadict.setItem(this.AIRType + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id, null);
            }
        });

        $.each(pageVariable.currencySource, function () {
            var m_value = pageVariable.waitrvdict.getItem("10-" + this.SysCurrency_Id + "--1--1");
            if (m_value) {
                pageVariable.waitTransferIn[this.SysCurrency_Id] = m_value.WaitReceive;
                pageVariable.waitReceive[this.SysCurrency_Id] = m_value.WaitReceive;
            }
        });

        $.each(waitreceiveobjs, function () {
            var m_airtype = this.AIRType;
            var m_item = this;

            $.each(pageVariable.currencySource, function () {
                var m_receive = pageVariable.waitrvdict.getItem(m_airtype + "-" + this.SysCurrency_Id + "--1--1");
                if (m_receive) {
                    m_item[this.SysCurrency_Id.toString()] = m_receive.WaitReceive;

                    var m_t_receive = parenwaittrvobj[this.SysCurrency_Id.toString()];
                    if (!m_t_receive) {
                        m_t_receive = 0;
                    }
                    parenwaittrvobj[this.SysCurrency_Id.toString()] = Math.round(Number(m_t_receive) * 100 + Number(m_receive.WaitReceive * 100)) / 100;
                }
            });

            pageVariable.waitOvers.push(m_item);

            if (pageVariable.shoppingStruct) {

                var m_waitshops = [];
                $.each(pageVariable.shoppingStruct.arrValues, function () {
                    if (!pageVariable.waitrvsshopdict.containKey(m_airtype + "-" + this.SalePlatform_Id)) {
                        return;
                    }

                    m_waitshops.push(this);
                });
                if (pageVariable.waitrvsshopdict.containKey(m_airtype + "-0")) {
                    m_waitshops.push({ SalePlatform_Id: 0, SPfName: mlm.C0966, SaleSites: [] });
                }

                if (m_waitshops.length > 0) {
                    if (m_waitshops.length == 1) {
                        if (m_waitshops[0].SPfName != mlm.C0966) {
                            m_item.HasChild = true;
                        }
                    }
                    else {
                        m_item.HasChild = true;
                    }
                }

                var _shopseq = 0;
                $.each(m_waitshops, function () {
                    _shopseq++;
                    var m_SalePlatform_Id = this.SalePlatform_Id.toString();
                    var m_shop_item = { BillKey: m_item.BillKey + "_" + m_SalePlatform_Id,
                        BillSeq: m_item.BillSeq + "." + _shopseq,
                        BillType: this.SPfName,
                        Layer: m_item.Layer + 1,
                        Indexs: m_item.Indexs + ",#" + m_item.BillKey + "#",
                        ParentKey: m_item.BillKey,
                        ShoppingArea: true
                    };
                    $.each(pageVariable.currencySource, function () {
                        var m_rv = pageVariable.waitrvdict.getItem(m_airtype + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "--1");
                        if (m_rv) {
                            m_shop_item[this.SysCurrency_Id.toString()] = m_rv.WaitReceive;
                        }
                    });
                    pageVariable.waitOvers.push(m_shop_item);

                    var m_waitpriceareas = [];
                    $.each(this.SaleSites, function () {
                        if (!pageVariable.waitrvareadict.containKey(m_airtype + "-" + this.SalePlatform_Id + "-" + this.SaleSite_Id)) {
                            return;
                        }
                        m_waitpriceareas.push(this);
                    });
                    if (pageVariable.waitrvareadict.containKey(m_airtype + "-" + this.SalePlatform_Id + "-0")) {
                        m_waitpriceareas.push({ SaleSite_Id: 0, SaleSiteName: mlm.C0966 });
                    }

                    if (m_waitpriceareas.length > 0) {
                        if (m_waitpriceareas.length == 1) {
                            var m_pnstr = m_waitpriceareas[0].SaleSiteName;
                            if (m_pnstr != mlm.C0966) {
                                m_shop_item.BillType += "(" + m_pnstr + ")";
                            }
                        }
                        else {
                            m_shop_item.HasChild = true;

                            var _priceseq = 0;
                            $.each(m_waitpriceareas, function () {
                                _priceseq++;
                                var m_salesite_id = "0";
                                if (this.SaleSite_Id) {
                                    m_salesite_id = this.SaleSite_Id.toString();
                                }
                                var m_pricearea_item = { BillKey: m_shop_item.BillKey + "_Area" + m_salesite_id,
                                    BillSeq: m_shop_item.BillSeq + "." + _priceseq,
                                    BillType: this.SaleSiteName,
                                    Layer: m_shop_item.Layer + 1,
                                    Indexs: m_shop_item.Indexs + ",#" + m_shop_item.BillKey + "#",
                                    ParentKey: m_shop_item.BillKey,
                                    ShoppingArea: true
                                };
                                $.each(pageVariable.currencySource, function () {
                                    var m_rv = pageVariable.waitrvdict.getItem(m_airtype + "-" + this.SysCurrency_Id + "-" + m_SalePlatform_Id + "-" + m_salesite_id);
                                    if (m_rv) {
                                        m_pricearea_item[this.SysCurrency_Id.toString()] = m_rv.WaitReceive;
                                    }
                                });

                                pageVariable.waitOvers.push(m_pricearea_item);
                            });
                        }
                    }
                });
            }
        });

        if (event) {
            event();
        }
    };

    var m_financereport = new fm.financereport();
    
    m_financereport.Year = $("#ddlYear").val();
    m_financereport.Months = getReportMonths();

    m_financereport.getWaitReceiveByTime(function (source) {
        m_func(source);
    });
}

/* 加载资金进出 */
function loadFund() {

    if (pageVariable.activetab != "fundstat") {
        return;
    }

    if (!pageVariable.totalFundList) {
        var m_columns = [];
        m_columns.push({ display: mlm.C0041, name: "BillSeq", width: 50, align: 'left' });
        m_columns.push({ display: mlm.C0510, name: "BillType", width: 240, align: 'left', adjust: true, createCell: constructBillTypeCell });
        m_columns.push({ display: mlm.C0962, name: "BalanceSum", width: 105, align: 'right', adjust: true, createCell: constructBalanceSumCell });
        $.each(pageVariable.currencySource, function () {
            m_columns.push({ display: this.CurrName, name: this.SysCurrency_Id, width: 120, align: 'right', adjust: true, createCell: constructFundCell });
        });

        var m_height = pageframe.layout.getTableHeightInForm();
        pageVariable.totalFundList = new uicontrol.tableList("totalFundList",
                                     { isPaging: false,
                                         autoSeq: false,
                                         height: pageframe.layout.getTableHeightInForm(),
                                         keyColumn: "BillKey",
                                         columns: m_columns
                                     });
    }

    if (!pageVariable.fundTable) {
        /* 展示进度 */
        pageframe.control.processCtrl.showOperaProcess();

        var m_financereport = new fm.financereport();
        
        m_financereport.Year = $("#ddlYear").val();
        m_financereport.Months = getReportMonths();
        m_financereport.getTotalFundsByTime(function (fundTable) {

            var m_fundDict = new datastruct.dictionary();

            var m_totalfundObj = { BillKey: "TotalFund_" + this.FundAccount, BillSeq: m_i, BillType: mlm.C0971, Layer: 1 };
            m_totalfundObj.FundAccount = mlm.C0971;

            var m_i = 0;
            var m_funds = datastruct.convertion.tableToJson(fundTable);
            $.each(m_funds, function () {

                this.BalanceSum = 0;
                var m_fundObj = null;
                if (m_fundDict.containKey(this.FundAccount)) {
                    m_fundObj = m_fundDict.getItem(this.FundAccount);
                }
                else {
                    m_i++;
                    m_fundObj = { BillKey: "Fund_" + this.FundAccount_Id, BillSeq: m_i, BillType: this.FundAccount, Layer: 1, HasChild: true, FundAccount_Id: this.FundAccount_Id };
                    m_fundObj.FundAccount = this.FundAccount;
                    m_fundDict.setItem(m_fundObj.FundAccount, m_fundObj);
                }
                m_fundObj[this.SysCurrency_Id] = this.FlowFund;

                if (!m_totalfundObj[this.SysCurrency_Id]) {
                    m_totalfundObj[this.SysCurrency_Id] = 0;
                }
                m_totalfundObj[this.SysCurrency_Id] += Number(this.FlowFund);
            });
            m_fundDict.setItem(m_totalfundObj.FundAccount, m_totalfundObj);

            m_totalfundObj.BillSeq = m_i + 1;

            //资金走向
            var m_fundflowDict = new datastruct.dictionary();
            m_financereport.getFundFlowByTime(function (fundTable) {
                var m_jsonobjs = datastruct.convertion.tableToJson(fundTable);

                $.each(m_jsonobjs, function () {
                    var m_key = this.FundAccount_Id + "-" + this.Action;
                    var m_valueobj = m_fundflowDict.getItem(m_key);
                    if (!m_valueobj) {
                        m_valueobj = {};
                        m_fundflowDict.setItem(this.FundAccount_Id + "-" + this.Action, m_valueobj);
                    }

                    m_valueobj[this.SysCurrency_Id] = this.Fund;
                });

                var m_items = [];
                $.each(m_fundDict.arrValues, function () {
                    m_items.push(this);

                    if (this.BillType == mlm.C0971) {
                        return;
                    }
                    var m_key = this.FundAccount_Id + "-LastFund";
                    var m_lastFund = { BillKey: m_key, BillSeq: this.BillSeq + ".1", BillType: mlm.C0951 + pageVariable.timeStr + mlm.C0972, Layer: 2, Indexs: "#" + this.BillKey + "#", ParentKey: this.BillKey };
                    var m_fund = m_fundflowDict.getItem(m_key);
                    if (m_fund) {
                        $.each(pageVariable.currencySource, function () {
                            m_lastFund[this.SysCurrency_Id] = m_fund[this.SysCurrency_Id];
                        });
                    }
                    m_items.push(m_lastFund);

                    m_key = this.FundAccount_Id + "-Out";
                    var m_outFund = { BillKey: m_key, BillSeq: this.BillSeq + ".2", BillType: pageVariable.timeNameStr + mlm.C0973, Layer: 2, Indexs: "#" + this.BillKey + "#", ParentKey: this.BillKey };
                    m_fund = m_fundflowDict.getItem(m_key);
                    if (m_fund) {
                        $.each(pageVariable.currencySource, function () {
                            m_outFund[this.SysCurrency_Id] = m_fund[this.SysCurrency_Id];
                        });
                    }
                    m_items.push(m_outFund);

                    m_key = this.FundAccount_Id + "-In";
                    var m_InFund = { BillKey: m_key, BillSeq: this.BillSeq + ".3", BillType: pageVariable.timeNameStr + mlm.C0974, Layer: 2, Indexs: "#" + this.BillKey + "#", ParentKey: this.BillKey };
                    m_fund = m_fundflowDict.getItem(m_key);
                    if (m_fund) {
                        $.each(pageVariable.currencySource, function () {
                            m_InFund[this.SysCurrency_Id] = m_fund[this.SysCurrency_Id];
                        });
                    }
                    m_items.push(m_InFund);

                    m_key = this.FundAccount_Id + "-TransferOut";
                    var m_TransferOutFund = { BillKey: m_key, BillSeq: this.BillSeq + ".4", BillType: pageVariable.timeNameStr + mlm.C0965, Layer: 2, Indexs: "#" + this.BillKey + "#", ParentKey: this.BillKey };
                    m_fund = m_fundflowDict.getItem(m_key);
                    if (m_fund) {
                        $.each(pageVariable.currencySource, function () {
                            m_TransferOutFund[this.SysCurrency_Id] = m_fund[this.SysCurrency_Id];
                        });
                    }
                    m_items.push(m_TransferOutFund);

                    m_key = this.FundAccount_Id + "-TransferIn";
                    var m_TransferInFund = { BillKey: m_key, BillSeq: this.BillSeq + ".5", BillType: pageVariable.timeNameStr + mlm.C0970, Layer: 2, Indexs: "#" + this.BillKey + "#", ParentKey: this.BillKey };
                    m_fund = m_fundflowDict.getItem(m_key);
                    if (m_fund) {
                        $.each(pageVariable.currencySource, function () {
                            m_TransferInFund[this.SysCurrency_Id] = m_fund[this.SysCurrency_Id];
                        });
                    }
                    m_items.push(m_TransferInFund);
                });

                calculateByCurr(m_items, function () {


                    pageVariable.fundTable = m_items;
                    pageVariable.totalFundList.bindDataSource(m_items);

                    handlerFundStyle(pageVariable.totalFundList);
                    controlBillRows();

                    /* 隐藏进度 */
                    pageframe.control.processCtrl.hideOperaProcess();
                });
            });
        });
    }
}
/* 处理资金表样式 */
function handlerFundStyle(totalFundList) {
    $.each(totalFundList.dataSource.items.arrValues, function () {

        var m_row = $("#row" + this.BillKey);
        var m_tds = m_row.find("td");
        if (this.Layer == "1") {
            m_tds.css("background-color", "#FFFFFF");
            m_tds.css("border-width", "1px");
            m_tds.css("border-style", "solid");
            m_tds.css("border-top-color", "#C0C0C0");
        }
        else {
            m_tds.css("background-color", "#F7F7F7");
            m_tds.css("border-width", "1px");
            m_tds.css("border-style", "solid");
            m_tds.css("border-top-color", "#C0C0C0");
        }
    });
}

/* 货币换算 */
function calculateByCurr(items, event) {

    if (!pageVariable.calculateRateFunc) {
        pageVariable.calculateRateFunc = function (items, currsymbol, rateDict, event) {
            $.each(items, function () {

                var m_obj = this;
                m_obj.BalanceSum = "";
                $.each(pageVariable.currencySource, function () {
                    if (m_obj.BalanceSum != mlm.C0975) {
                        var m_value = m_obj[this.SysCurrency_Id];
                        if (m_value && Number(m_value) != 0) {

                            var m_rate = 1;
                            if (this.SysCurrency_Id != window.keycontext.keyparam.syscurrency) {
                                m_rate = rateDict.getItem(this.SysCurrency_Id);
                            }
                            if (m_rate) {
                                m_obj.BalanceSum = Math.round((Number(m_obj.BalanceSum) + Number(m_value) * m_rate) * 100) / 100;
                            }
                            else {
                                m_obj.BalanceSum = mlm.C0975;
                            }
                        }
                    }
                });

                if (m_obj.BalanceSum != mlm.C0975 && Number(m_obj.BalanceSum) != 0) {
                    m_obj.BalanceSum = commoncore.func.getCurrHtml(currsymbol, m_obj.BalanceSum);
                }
            });

            if (event) {
                event();
            }
        };
    }

    var m_currsymbol = pageVariable.currencySymbolStruct.getItem(window.keycontext.keyparam.syscurrency);
    if (!pageVariable.rateDict) {
        var m_syscurrrate = new othm.syscurrrate();
        m_syscurrrate.querySysCurrBRate(window.keycontext.keyparam.syscurrency, function (source) {

            pageVariable.rateDict = new datastruct.dictionary();
            var m_jsonobjs = datastruct.convertion.tableToJson(source);
            $.each(m_jsonobjs, function () {
                pageVariable.rateDict.setItem(this.SysCurrency_Id, Number(this.Rate));
            });

            pageVariable.calculateRateFunc(items, m_currsymbol, pageVariable.rateDict, event);
        });
    }
    else {
        pageVariable.calculateRateFunc(items, m_currsymbol, pageVariable.rateDict, event);
    }
}

/* 获取当前月数 */
function getCurrMonth() {
    var m_now = new Date();
    return "(" + m_now.getFullYear() + "-" + (Number(m_now.getMonth()) + 1) + ")";
}

/* 导出报表 */
function exportReport() {
    var m_financereport = new fm.financereport();

    m_financereport.Year = $("#ddlYear").val();
    m_financereport.Months = getReportMonths();
    m_financereport.exportFinanceReport(function (paramObj) {
        window.open(paramObj);
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 财务总体情况 */
    $("#lbOperationStatTag, #lbAccountBalanceTitle").text(mlm.C0976);
    /* 财务账目明细 */
    $("#lbAccountStatTag").text(mlm.C0977);
    /* 财务账目结算明细 */
    $("#lbBillStatTag").text(mlm.C0978);
    /* 资金进出明细 */
    $("#lbFundStatTag").text(mlm.C0979);
    /* 财务账目明细列表 */
    $("#lbAccountStatTitle").text(mlm.C0977 + mlm.C0463);
    /* 财务结算明细列表 */
    $("#lbBillTitle").text(mlm.C0978 + mlm.C0463);
    /* 资金进出列表 */
    $("#lbFundTitle").text(mlm.C0979 + mlm.C0463);
    /* 下载报表 */
    $("#lkExportReport").text(mlm.C0981); 
    /* 下月待结金额 */
    $("#lbWaitOverStatTag").text(mlm.C0960 + mlm.C0864 + mlm.C0980);
    /* 下月待结金额列表 */
    $("#lbWaitOverTitle").text(mlm.C0960 + mlm.C0864 + mlm.C0980 + mlm.C0463);

    /* ECMS-财务统计分析 */
    document.title = mlm.C0489;
}