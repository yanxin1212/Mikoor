
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(function () { loadFundState(); });

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#fundAccountTag").click(loadFundAccount);
    $("#btNewFundAccount").click(openNewFundAccountFrm);
    $("#fundStateTag").click(loadFundState);
    $("#fundTransferTag").click(loadFundTransfers);
    $("#btTransfer").click(openFundTransferFrm);
    $("#btQueryTransfer").click(openQueryFundTransferFrm);
    $("#btExportTransfer").click(exportFundTransferFrm);

    $("#btNewFundAccount, #btTransfer, #btQueryTransfer, #btExportTransfer").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
};

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight() - 20;
    $("#fundStateForm").css("height", mainFormHeight);

    var m_height = pageframe.layout.getTableHeightInForm();
    if (pageVariable.fundStateList) {
        var currFormHeight = m_height - 50;
        pageVariable.fundStateList.resize(currFormHeight);
    }

    if (pageVariable.fundTransferList) {
        pageVariable.fundTransferList.resize(m_height);
    }

    if (pageVariable.fundAccountList) {
        pageVariable.fundAccountList.resize(m_height);
    }
}

/* 加载资金列表 */
function loadFundState() {
    if (!pageVariable.fundStateList) {
        var currFormHeight = pageframe.layout.getTableHeightInForm() - 50;
        pageVariable.fundStateList = new uicontrol.tableList("fundStateList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: currFormHeight,
                                         keyColumn: "AccountFund_Id",
                                         columns: [{ display: mlm.C0510, name: "FundAccount", width: 250, align: 'left' },
                                                   { display: mlm.C0567, name: "BankName", width: 200, align: 'left' },
                                                   { display: mlm.C0502, name: "CurrName", width: 100, align: 'left' },
                                                   { display: mlm.C0569, name: "Fund", width: 150, align: 'right', adjust: true, createCell: constructMoneyCell}]
                                     });
    }

    var m_accountfund = new fm.accountfund();
    m_accountfund.queryAvaiAccountFundTable(function (tableSource) {

        var m_funds = datastruct.convertion.tableToJson(tableSource);

        pageVariable.fundStateList.bindDataSource(tableSource);

        var m_totalFunds = new datastruct.dictionary();
        var m_totalFundStr = [];
        var m_totalBalanceStr = [];

        $.each(m_funds, function () {
            if (m_totalFunds.containKey(this.CurrSymbol)) {

                var m_obj = m_totalFunds.getItem(this.CurrSymbol);

                m_totalFunds.setItem(this.CurrSymbol, { totalFund: Number(m_obj.totalFund) + Number(this.Fund) });
            }
            else {
                m_totalFunds.setItem(this.CurrSymbol, { totalFund: Number(this.Fund) });
            }
        });

        $.each(m_totalFunds.arrKeys, function () {

            var m_obj = m_totalFunds.getItem(this);

            m_totalFundStr.push("<a href='javascript:void(0)'>" + this + datastruct.convertion.convertToMoney(m_obj.totalFund.toFixed(2)) + "</a>");
        });

        $("#lbTotalFund").html(m_totalFundStr.join(" ,  "));
    });
}

/* 构建货币列 */
function constructMoneyCell(key, cellValue) {
    var m_obj = pageVariable.fundStateList.getItem(key);

    return commoncore.func.getCurrHtml(m_obj.CurrSymbol, cellValue);
}

/* 加载资金账号列表 */
function loadFundAccount() {
    if (!pageVariable.fundAccountList) {
        var currFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.fundAccountList = new uicontrol.tableList("fundAccountList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: currFormHeight,
                                         keyColumn: "FundAccount_Id",
                                         columns: [{ display: mlm.C0510, name: "FundAccount", width: 250, align: 'left' },
                                                   { display: mlm.C0567, name: "BankName", width: 150, align: 'left' },
                                                   { display: mlm.C0568, name: "Owner", width: 150, align: 'left' },
                                                   { display: mlm.C0073, name: "Remark", width: 350, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, modifiedFunc: "openModifyFundAccountFrm", deletedFunc: "openDeleteFundAccountFrm"}]
                                     });
    }

    var m_fundaccount = new fm.fundaccount();
    m_fundaccount.getAllFundAccounts(function (tableSource) {
        pageVariable.fundAccountList.bindDataSource(tableSource);
    });
}

/* 打开新增资金账号的窗体 */
function openNewFundAccountFrm() {
    if (!pageVariable.handlerFundAccountFrm) {
        pageVariable.handlerFundAccountFrm = new uicontrol.dialog("handlerFundAccountFrm", "", { width: 800 }, saveFundAccount);
    }

    $("#txtSeq").attr("disabled", "disabled").val(mlm.C0142);
    $("#txtFundAccount").val("");
    $("#txtBankName").val("");
    $("#txtOwner").val("");
    $("#txtRemark").val("");

    pageVariable.handlerFundAccountFrm.fundaccount_id = 0;
    pageVariable.handlerFundAccountFrm.action = "New";
    pageVariable.handlerFundAccountFrm.setTitle(mlm.C0461 + mlm.C0510);
    pageVariable.handlerFundAccountFrm.show();
}
/* 打开修改资金账号的窗体 */
function openModifyFundAccountFrm() {
    if (!pageVariable.handlerFundAccountFrm) {
        pageVariable.handlerFundAccountFrm = new uicontrol.dialog("handlerFundAccountFrm", "", { width: 800 }, saveFundAccount);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.fundAccountList.getItem(m_key);

    $("#txtSeq").attr("disabled", null).val(m_obj.Seq);
    $("#txtFundAccount").val(m_obj.FundAccount);
    $("#txtBankName").val(m_obj.BankName);
    $("#txtOwner").val(m_obj.Owner);
    $("#txtRemark").val(m_obj.Remark);

    pageVariable.handlerFundAccountFrm.fundaccount_id = m_key;
    pageVariable.handlerFundAccountFrm.action = "Modify";
    pageVariable.handlerFundAccountFrm.setTitle(mlm.C0462 + mlm.C0510);
    pageVariable.handlerFundAccountFrm.show();
}
/* 打开删除资金账号的窗体 */
function openDeleteFundAccountFrm() {
    if (!pageVariable.delFundAccountFrm) {
        pageVariable.delFundAccountFrm = new uicontrol.confirmDelete(deleteFundAccount);
    }

    pageVariable.delFundAccountFrm.fundaccount_id = $(this).attr("tag");
    var m_obj = pageVariable.fundAccountList.getItem(pageVariable.delFundAccountFrm.fundaccount_id);

    pageVariable.delFundAccountFrm.showConfirm(mlm.C0464 + mlm.C0510 + "(" + m_obj.FundAccount + ") ?");
}
/* 保存资金账号 */
function saveFundAccount() {
    var fundAccount = $.trim($("#txtFundAccount").val());
    if (!fundAccount) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0570);
        return;
    }

    var bankName = $.trim($("#txtBankName").val());
    if (!bankName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0571);
        return;
    }

    var owner = $.trim($("#txtOwner").val());
    if (!owner) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0572);
        return;
    }

    var m_fundaccount = new fm.fundaccount();
    m_fundaccount.FundAccount_Id = pageVariable.handlerFundAccountFrm.fundaccount_id;
    
    m_fundaccount.Remark = $("#txtRemark").val();
    m_fundaccount.Account = fundAccount;
    m_fundaccount.BankName = bankName;
    m_fundaccount.Owner = owner;

    if (pageVariable.handlerFundAccountFrm.action == "New") {
        m_fundaccount.newFundAccount(function (retObj) {

            retObj.FundAccount = retObj.Account;
            pageVariable.fundAccountList.addData(retObj.FundAccount_Id, retObj);

            pageVariable.handlerFundAccountFrm.close();
        });
    }
    else {
        var m_oldSeq = m_fundaccount.Seq;
        m_fundaccount.Seq = $("#txtSeq").val();
        m_fundaccount.modifyFundAccount(function () {

            if (m_oldSeq == m_fundaccount.Seq) {
                m_fundaccount.FundAccount = m_fundaccount.Account;
                pageVariable.fundAccountList.modifyData(m_fundaccount.FundAccount_Id, m_fundaccount);
            }
            else {
                pageVariable.fundAccounts = null;
                loadFundAccount();
            }

            pageVariable.handlerFundAccountFrm.close();
        });
    }

    pageVariable.fundAccounts = null;
    pageVariable.allFundAccounts = null;
    $("#ddlInAccount, #ddlOutAccount, #ddlOutAccountForQ, #ddlInAccountForQ").empty();
}
/* 删除资金账号 */
function deleteFundAccount() {
    var m_fundaccount = new fm.fundaccount();
    m_fundaccount.FundAccount_Id = pageVariable.delFundAccountFrm.fundaccount_id;

    m_fundaccount.deleteFundAccount(function () {

        pageVariable.fundAccountList.deleteData(m_fundaccount.FundAccount_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        pageVariable.fundAccounts = null;
        pageVariable.allFundAccounts = null;
        $("#ddlInAccount, #ddlOutAccount, #ddlOutAccountForQ, #ddlInAccountForQ").empty();

        pageVariable.delFundAccountFrm.close();
    });
}

/* 加载资金转账记录 */
function loadFundTransfers() {
    if (!pageVariable.fundTransferList) {
        var currFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.fundTransferList = new uicontrol.tableList("fundTransferList",
                                     { isPaging: true,
                                         autoSeq: true,
                                         height: currFormHeight,
                                         keyColumn: "FundTransferRecord_Id",
                                         pageQueryHandler: innerQueryFundTransfer,
                                         columns: [{ display: mlm.C0494, name: "FTRCode", width: 70, align: 'left' },
                                                   { display: mlm.C0881, name: "OutFundTimeStr", width: 80, align: 'left', adjust: true, createCell: commoncore.func.constructDateTimeCell },
                                                   { display: mlm.C0599, name: "OutFundAccount", width: 180, align: 'left' },
                                                   { display: mlm.C0601, name: "OutFund", width: 110, align: 'right', adjust: true, createCell: constructOutFundCell },
                                                   { display: mlm.C0882, name: "InFundTimeStr", width: 80, align: 'left', adjust: true, createCell: commoncore.func.constructDateTimeCell },
                                                   { display: mlm.C0602, name: "InFundAccount", width: 180, align: 'left' },
                                                   { display: mlm.C0605, name: "LosedFund", width: 70, align: 'right', adjust: true, createCell: constructInFundCell },
                                                   { display: mlm.C0604, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0606, name: "InFund", width: 110, align: 'right', adjust: true, createCell: constructInFundCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructFTOperaCell}]
                                     });
    }


    var m_now = new Date();
    var m_fromtime = m_now.getFullYear() + "-" + (Number(m_now.getMonth()) + 1) + "-01";

    pageVariable.queryFTRCondition = {
        Keyword: "",
        OutFundAccount_Id: "",
        OutSysCurrency_Id: "",
        InFundAccount_Id: "",
        InSysCurrency_Id: "",
        FromTime: m_fromtime,
        ToTime: ""
    };
    innerQueryFundTransfer(1, pageVariable.fundTransferList.pageNumber);
}
/* 构建转账操作列 */
function constructFTOperaCell(key, cellValue) {
    var m_obj = pageVariable.fundTransferList.getItem(key);

    var m_str = "";
    if (!m_obj.InFundTimeStr) {
        m_str = "<a onclick='openOverTransferFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0883 + "</a>";
        m_str += "<a onclick='openDelTransferFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 3px'>" + mlm.C0538 + "</a>";
    }


    return m_str;
}
/* 查询资金转账记录 */
function queryFundTransfer() {

    var m_keyword = $("#txtKeyword").val();
    var m_outfundaccount_id = $("#ddlOutAccountForQ").val();
    var m_outsyscurrency_id = $("#ddlOACurrencyForQ").val();
    var m_infundaccount_id = $("#ddlInAccountForQ").val();
    var m_insyscurrency_id = $("#ddlInCurrencyForQ").val();
    var m_fromtime = $("#txtfromTimeForQ").val();
    var m_totime = $("#txtToTimeForQ").val();

    pageVariable.queryFTRCondition = {
        Keyword: m_keyword,
        OutFundAccount_Id: m_outfundaccount_id,
        OutSysCurrency_Id: m_outsyscurrency_id,
        InFundAccount_Id: m_infundaccount_id,
        InSysCurrency_Id: m_insyscurrency_id,
        FromTime: m_fromtime,
        ToTime: m_totime
    };

    pageVariable.fundTransferSource = null;
    innerQueryFundTransfer(1, pageVariable.fundTransferList.pageNumber);

    pageVariable.queryFundTransferFrm.close();
}
/* 查询资金转账记录 */
function innerQueryFundTransfer(pageNum, pageCount) {
    if (!pageVariable.fundTransferSource) {
        var m_fundtransferrecord = new fm.fundtransferrecord();
        m_fundtransferrecord.queryFundTransferRecord(pageVariable.queryFTRCondition.Keyword,
                                             pageVariable.queryFTRCondition.OutFundAccount_Id,
                                             pageVariable.queryFTRCondition.OutSysCurrency_Id,
                                             pageVariable.queryFTRCondition.InFundAccount_Id,
                                             pageVariable.queryFTRCondition.InSysCurrency_Id,
                                             pageVariable.queryFTRCondition.FromTime,
                                             pageVariable.queryFTRCondition.ToTime, pageNum, pageCount, function (tableSource) {

                                                 pageVariable.fundTransferSource = tableSource;
                                                 pageVariable.fundTransferList.dataSource.page = pageNum;
                                                 pageVariable.fundTransferList.bindDataSource(tableSource);
                                             });
    }
}
/* 构建转出资金列 */
function constructOutFundCell(key, cellValue) {
    var m_obj = pageVariable.fundTransferList.getItem(key);

    return commoncore.func.getCurrHtml(m_obj.OutCurrSymbol, cellValue);
}
/* 构建转入资金列 */
function constructInFundCell(key, cellValue) {
    var m_obj = pageVariable.fundTransferList.getItem(key);

    return commoncore.func.getCurrHtml(m_obj.InCurrSymbol, cellValue);
}

/* 打开资金转账的窗体 */
function openFundTransferFrm() {
    if (!pageVariable.handlerFundTransferFrm) {
        pageVariable.handlerFundTransferFrm = new uicontrol.dialog("handlerFundTransferFrm", mlm.C0598, { width: 800 }, transferFund);

        loadCurrenies($("#ddlOACurrency, #ddlIACurrency"));
        $("#txtOutFund, #txtRate, #txtFundLosed").change(calculateInFund);

        $("#ddlOACurrency, #ddlIACurrency").change(function () {
            var m_syscurrrate = new othm.syscurrrate();
            m_syscurrrate.SysCurrency_Id_A = $("#ddlOACurrency").val();
            m_syscurrrate.SysCurrency_Id_B = $("#ddlIACurrency").val();

            if (m_syscurrrate.SysCurrency_Id_A != m_syscurrrate.SysCurrency_Id_B) {
                m_syscurrrate.readRate(function (retObj) {
                    $("#txtRate").val(retObj);
                    calculateInFund();
                });
            }
            else {
                $("#txtRate").val("1.0000");
                calculateInFund();
            }
        });

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtOutFundTime").datepicker();
        $("#txtOutFundTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        $("#txtInFundTime").datepicker();
        $("#txtRate").val("1.0000");
    }

    loadAllAccount($("#ddlInAccount, #ddlOutAccount"));

    pageVariable.handlerFundTransferFrm.show();
}
/* 资金转账 */
function transferFund() {

    var m_outfundaccount_id = $("#ddlOutAccount").val();
    var m_infundaccount_id = $("#ddlInAccount").val();

    var m_fundtransferrecord = new fm.fundtransferrecord();
    m_fundtransferrecord.OutFundAccount_Id = m_outfundaccount_id;
    m_fundtransferrecord.InFundAccount_Id = m_infundaccount_id;
    m_fundtransferrecord.OutFund = $("#txtOutFund").val();
    m_fundtransferrecord.InSysCurrency_Id = $("#ddlIACurrency").val();
    m_fundtransferrecord.OutSysCurrency_Id = $("#ddlOACurrency").val();
    m_fundtransferrecord.LosedFund = $("#txtFundLosed").val();
    m_fundtransferrecord.Rate = $("#txtRate").val();
    m_fundtransferrecord.OutFundTime = $("#txtOutFundTime").val();
    m_fundtransferrecord.InFundTime = $("#txtInFundTime").val();
    m_fundtransferrecord.newFundTransferRecord(function (retObj) {

        retObj.OutFundAccount = retObj.OtherProps.OutFundAccount;
        retObj.OutCurrSymbol = retObj.OtherProps.OutCurrSymbol;
        retObj.InFundAccount = retObj.OtherProps.InFundAccount;
        retObj.InCurrSymbol = retObj.OtherProps.InCurrSymbol; 
        retObj.FullName = retObj.OtherProps.FullName;
        retObj.OutFundTimeStr = retObj.OtherProps.OutFundTime;
        retObj.InFundTimeStr = retObj.OtherProps.InFundTime;
        retObj.OutCurrName = retObj.OtherProps.OutCurrName;
        retObj.InCurrName = retObj.OtherProps.InCurrName;

        pageVariable.fundTransferList.addData(retObj.FundTransferRecord_Id, retObj);

        pageVariable.fundAccounts = null;

        pageVariable.handlerFundTransferFrm.close();
    });
}
/* 打开到账的窗体 */
function openOverTransferFrm(key) {
    if (!pageVariable.handlerFundOverFrm) {
        pageVariable.handlerFundOverFrm = new uicontrol.dialog("handlerFundOverFrm", mlm.C0883 + mlm.C0884, { width: 800 }, overTransfer);

        $("#txtInFundTime_over").datepicker();
    }

    var m_obj = pageVariable.fundTransferList.getItem(key);
    $("#lbOutAccount_over").text(m_obj.OutFundAccount);
    $("#lbOutFund_over").html(commoncore.func.getCurrHtml(m_obj.OutCurrSymbol, m_obj.OutFund));
    $("#lbOutFundTime_over").html(commoncore.func.getTimeStrCell(m_obj.OutFundTimeStr));
    $("#lbInAccount_over").text(m_obj.InFundAccount);
    $("#lbInFund_over").html(commoncore.func.getCurrHtml(m_obj.OutCurrSymbol, m_obj.InFund));
    $("#lbRate_over").text(m_obj.Rate);
    $("#lbFundLosed_over").html(commoncore.func.getCurrHtml(m_obj.OutCurrSymbol, m_obj.LosedFund));

    var m_now = new Date();
    var m_year = m_now.getFullYear();
    var m_month = Number(m_now.getMonth()) + 1;
    $("#txtInFundTime_over").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

    pageVariable.handlerFundOverFrm.fundtransferrecord = m_obj;
    pageVariable.handlerFundOverFrm.fundtransferrecord_id = key;
    pageVariable.handlerFundOverFrm.show();
}
/* 到账 */
function overTransfer() {
    var m_fundtransferrecord = new fm.fundtransferrecord();
    m_fundtransferrecord.FundTransferRecord_Id = pageVariable.handlerFundOverFrm.fundtransferrecord_id;
    m_fundtransferrecord.InFundTime = $("#txtInFundTime_over").val();

    if (!m_fundtransferrecord.InFundTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0882 + mlm.C0451);
        return;
    }

    m_fundtransferrecord.overFundTransfer(function () {

        pageVariable.handlerFundOverFrm.fundtransferrecord.InFundTimeStr = m_fundtransferrecord.InFundTime;
        pageVariable.fundTransferList.modifyData(pageVariable.handlerFundOverFrm.fundtransferrecord_id, pageVariable.handlerFundOverFrm.fundtransferrecord);

        pageVariable.handlerFundOverFrm.close();
    });
}
/* 打开资金转账撤消的窗体 */
function openDelTransferFrm(key) {
    if (!pageVariable.delTransferFrm) {
        pageVariable.delTransferFrm = new uicontrol.confirmDelete(deleteTransfer);
    }

    pageVariable.delTransferFrm.fundtransferrecord_id = key;
    var m_obj = pageVariable.fundTransferList.getItem(pageVariable.delTransferFrm.fundtransferrecord_id);

    pageVariable.delTransferFrm.showConfirm(mlm.C0464 + mlm.C0598 + "(" + m_obj.FTRCode + ") ?");
}
/* 撤消资金转账 */
function deleteTransfer() {
    var m_fundtransferrecord = new fm.fundtransferrecord();
    m_fundtransferrecord.FundTransferRecord_Id = pageVariable.delTransferFrm.fundtransferrecord_id;

    m_fundtransferrecord.deleteFundTransferRecord(function () {

        pageVariable.fundTransferList.deleteData(pageVariable.delTransferFrm.fundtransferrecord_id);

        pageVariable.delTransferFrm.close();
    });
}

/* 加载所有资金账号 */
function loadAllAccount(accountCtrl, isallownull, event) {

    if (accountCtrl.find("option").length == 0) {
        if (!pageVariable.allFundAccounts) {
            var m_accountfund = new fm.accountfund();
            m_accountfund.getAllAccount(function (tableSource) {

                pageVariable.allFundAccounts = datastruct.convertion.tableToJson(tableSource);
                accountCtrl.empty();

                if (isallownull) {
                    accountCtrl.append("<option></option>");
                }

                $.each(pageVariable.allFundAccounts, function () {
                    accountCtrl.append("<option value='" + this.FundAccount_Id + "'>" + this.FundAccount + "</option>");
                });

                if (event) {
                    event();
                }
            });
        }
        else {
            if (isallownull) {
                accountCtrl.append("<option></option>");
            }

            $.each(pageVariable.allFundAccounts, function () {
                accountCtrl.append("<option value='" + this.FundAccount_Id + "'>" + this.FundAccount + "</option>");
            });

            if (event) {
                event();
            }
        }
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
                currencyCtrl.append("<option value='" + this.key + "' tag='" + this.value.CurrSymbol + "' cc='" + this.value.CurrCode + "'>" + this.value.CurrName + "</option>");
            });
        });
    }
    else {
        currencyCtrl.empty();

        if (isallownull) {
            currencyCtrl.append("<option></option>");
        }

        $.each(pageVariable.currsSource, function () {
            currencyCtrl.append("<option value='" + this.key + "' tag='" + this.value.CurrSymbol + "' cc='" + this.value.CurrCode + "'>" + this.value.CurrName + "</option>");
        });
    }
}

/* 计算转入资金 */
function calculateInFund() {

    var m_outFund = $("#txtOutFund").val();
    var m_rate = $("#txtRate").val();
    var m_losedFund = $("#txtFundLosed").val();


    $("#txtInFund").val(Number(m_outFund) * Number(m_rate) - Number(m_losedFund));
}

/* 打开查询资金转账的窗体 */
function openQueryFundTransferFrm() {
    if (!pageVariable.queryFundTransferFrm) {
        pageVariable.queryFundTransferFrm = new uicontrol.dialog("queryFundTransferFrm", mlm.C0562 + mlm.C0598, { width: 800 }, queryFundTransfer);

        $("#txtfromTimeForQ").datepicker();
        $("#txtToTimeForQ").datepicker();

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        var m_day = new Date(m_year, m_month, 0);
        $("#txtfromTimeForQ").datepicker("setDate", m_year + "-" + m_month + "-01");
        $("#txtToTimeForQ").datepicker("setDate", m_year + "-" + m_month + "-" + m_day.getDate());

        loadCurrenies($("#ddlOACurrencyForQ, #ddlInCurrencyForQ"), true);
    }

    loadAllAccount($("#ddlOutAccountForQ, #ddlInAccountForQ"), true);

    pageVariable.queryFundTransferFrm.show();
}

/* 导出资金转账 */
function exportFundTransferFrm() {
    var m_fundtransferrecord = new fm.fundtransferrecord();
    m_fundtransferrecord.exportFundTransferRecord(pageVariable.queryFTRCondition.Keyword,
                                             pageVariable.queryFTRCondition.OutFundAccount_Id,
                                             pageVariable.queryFTRCondition.OutSysCurrency_Id,
                                             pageVariable.queryFTRCondition.InFundAccount_Id,
                                             pageVariable.queryFTRCondition.InSysCurrency_Id,
                                             pageVariable.queryFTRCondition.FromTime,
                                             pageVariable.queryFTRCondition.ToTime,
                                         function (paramObj) {
                                             window.open(paramObj);
                                         });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 资金情况 */
    $("#lbFundStateTag").text(mlm.C0564);
    /* 资金账号 */
    $("#lbFundAccountTag").text(mlm.C0510);
    $("#lbFundAccountSymbol").text(mlm.C0510 + ":");
    /* 账内资金合计 */
    $("#lbTotalFundSymbol").text(mlm.C0565 + ":");
    /* 资金列表 */
    $("#lbFundStateTitle").text(mlm.C0566);
    /* 资金账号列表 */
    $("#lbFundAccountTitle").text(mlm.C0510 + mlm.C0463);
    /* 新增资金账号 */
    $("#btNewFundAccount").val(mlm.C0461 + mlm.C0510);
    /* 所属银行 */
    $("#lbBankNameSymbol").text(mlm.C0567 + ":");
    /* 账号所有人 */
    $("#lbOwnerSymbol").text(mlm.C0568 + ":");
    /* 序号 */
    $("#lbSeq").text(mlm.C0041 + ":");
    /* 备注 */
    $("#lbRemarkSymbol").text(mlm.C0073 + ":");
    /* 内部转账 */
    $("#lbFundTransferTag").text(mlm.C0596);
    /* 转账记录 */
    $("#lbFundTransferTitle").text(mlm.C0597);
    /* 查询转账记录 */
    $("#btQueryTransfer").val(mlm.C0562 + mlm.C0597);
    /* 资金转账 */
    $("#btTransfer").val(mlm.C0598);
    /* 转出账号 */
    $("#lbOutAccountSymbol, #lbOutAccountForQSymbol, #lbOutAccount_over_Symbol").text(mlm.C0599 + ":");
    /* 转出币种 */
    $("#lbOACurrencySymbol, #lbOACurrencyForQSymbol").text(mlm.C0600 + ":");
    /* 转出资金 */
    $("#lbOutFundSymbol, #lbOutFund_over_Symbol").text(mlm.C0601 + ":");
    /* 转入账号 */
    $("#lbInAccountSymbol, #lbInAccountForQSymbol, #lbInAccount_over_Symbol").text(mlm.C0602 + ":");
    /* 转入币种 */
    $("#lbIACurrencySymbol, #lbInCurrencyForQSymbol").text(mlm.C0603 + ":");
    /* 转换汇率 */
    $("#lbRateSymbol, #lbRate_over_Symbol").text(mlm.C0604 + ":");
    /* 转账损失 */
    $("#lbFundLosedSymbol, #lbFundLosed_over_Symbol").text(mlm.C0605 + ":");
    /* 转入资金 */
    $("#lbInFundSymbol, #lbInFund_over_Symbol").text(mlm.C0606 + ":");
    /* 导出转账记录 */
    $("#btExportTransfer").val(mlm.C0607);

    /* 关键字 */
    $("#lbKeywordSymbol").text(mlm.C0184 + ":");
    /* 日期 */
    $("#lbFTRTimeForQSymbol").text(mlm.C0146 + ":");
    /* 到 */
    $("#lbtoTimeForQSymbol").text(mlm.C0412);
    /* 转入日期 */
    $("#lbInFundTime_over_Symbol, #lbInFundTimeSymbol").text(mlm.C0882 + ":");
    /* 转出日期 */
    $("#lbOutFundTime_over_Symbol, #lbOutFundTimeSymbol").text(mlm.C0881 + ":");

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_3").text(mlm.C0049);

    /* ECMS-财务管理 */
    document.title = mlm.C0485;
}