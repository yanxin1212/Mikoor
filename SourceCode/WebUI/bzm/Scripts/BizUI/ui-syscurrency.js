
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(function () { fillCurrList($("#ddlCurrency")); });

/* 页面变量 */
window.pageVariable = {

    /* 货币数据源 */
    currSource: null,

    /* 货币列表 */
    currList: null,

    /* 新增或修改货币的窗体 */
    handlerCurrFrm: null,

    /* 删除货币的窗体 */
    delCurrFrm: null,

    /* 汇率列表 */
    rateList: null,

    /* 汇率设置窗体 */
    handlerRateFrm: null,

    /* 汇率数据源 */
    rateSource: null
};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#rateTag").click(function () {
        fillCurrList($("#ddlCurrency"));
    });
    $("#currTag").click(function () {
        loadCurrency();
    });

    $("#ddlCurrency").change(function () {
        pageVariable.rateSource = null;
        loadRate();
    });

    $("#btNewCurr").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
}

/* 设置页面布局 */
function setLayout() {

    $("#btNewCurr").click(openNewCurrFrm);

    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#currForm").css("height", mainFormHeight);

    if (pageVariable.currList) {
        var currFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.currList.resize(currFormHeight - 2);
    }
}

/* 加载货币 */
function loadCurrency() {
    if (!pageVariable.currList) {
        var currFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.currList = new uicontrol.tableList("currList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: currFormHeight,
                                         keyColumn: "SysCurrency_Id",
                                         columns: [{ display: mlm.C0135, name: "CurrName", width: 200, align: 'center' },
                                                   { display: mlm.C0136, name: "CurrCode", width: 200, align: 'center' },
                                                   { display: mlm.C0202, name: "CurrSymbol", width: 200, align: 'center' },
                                                   { display: mlm.C0019, name: "", width: 120, align: 'center', adjust: true, modifiedFunc: "openModifyCurrFrm", deletedFunc: "openDelCurrFrm"}]
                                     });
    }

    if (!pageVariable.currSource) {
        var syscurrency = new othm.syscurrency();
        syscurrency.getAllSysCurrencys(function (source) {
            pageVariable.currList.bindDataSource(source);
        });
    }
    else {
        pageVariable.currList.bindDataSource(pageVariable.currSource);
    }
}

/* 打开新增货币的窗体 */
function openNewCurrFrm() {
    if (!pageVariable.handlerCurrFrm) {
        pageVariable.handlerCurrFrm = new uicontrol.dialog("handlerCurrFrm", "", { width: 800, height: 186 }, saveCurr);
    }

    $("#txtSeq").attr("disabled", "disabled").val(mlm.C0142);
    pageVariable.handlerCurrFrm.syscurrency_id = 0;
    pageVariable.handlerCurrFrm.action = "New";

    $("#txtCurrName").val("");
    $("#txtCurrCode").val("");
    $("#txtCurrSymbol").val("");

    pageVariable.handlerCurrFrm.setTitle(mlm.C0134);
    pageVariable.handlerCurrFrm.show();
}

/* 打开修改货币的窗体 */
function openModifyCurrFrm(currId) {
    if (!pageVariable.handlerCurrFrm) {
        pageVariable.handlerCurrFrm = new uicontrol.dialog("handlerCurrFrm", "", { width: 800, height: 186 }, saveCurr);
    }

    pageVariable.handlerCurrFrm.syscurrency_id = $(this).attr("tag");

    var m_currency = pageVariable.currList.getItem(pageVariable.handlerCurrFrm.syscurrency_id);

    $("#txtSeq").attr("disabled", false).val(m_currency.Seq);
    pageVariable.handlerCurrFrm.action = "Modify";

    $("#txtCurrName").val(m_currency.CurrName);
    $("#txtCurrCode").val(m_currency.CurrCode);
    $("#txtCurrSymbol").val(m_currency.CurrSymbol);

    pageVariable.handlerCurrFrm.setTitle(mlm.C0141);
    pageVariable.handlerCurrFrm.show();
}

/* 打开删除货币的窗体 */
function openDelCurrFrm() {
    if (!pageVariable.delCurrFrm) {
        pageVariable.delCurrFrm = new uicontrol.confirmDelete(deleteCurr);
    }

    pageVariable.delCurrFrm.syscurrency_id = $(this).attr("tag");
    var m_currency = pageVariable.currList.getItem(pageVariable.delCurrFrm.syscurrency_id);

    pageVariable.delCurrFrm.showConfirm(mlm.C0143 + "(" + m_currency.CurrName + ") ?");
}

/* 新增或修改货币 */
function saveCurr() {
    var currName = $.trim($("#txtCurrName").val());
    if (!currName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0144);
        return;
    }

    var currCode = $.trim($("#txtCurrCode").val());
    if (!currCode) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0145);
        return;
    }

    var currSymbol = $.trim($("#txtCurrSymbol").val());
    if (!currSymbol) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0203);
        return;
    }

    var syscurrency = new othm.syscurrency();
    syscurrency.SysCurrency_Id = pageVariable.handlerCurrFrm.syscurrency_id;
    syscurrency.CurrCode = currCode;
    syscurrency.CurrName = currName;
    syscurrency.CurrSymbol = currSymbol;

    if (pageVariable.handlerCurrFrm.action == "New") {
        syscurrency.newSysCurrency(function (paramObj) {
            pageVariable.currList.addData(paramObj.SysCurrency_Id, paramObj);
            pageVariable.handlerCurrFrm.close();
            pageVariable.currSource = null;
            pageVariable.rateSource = null;
        });
    }
    else {

        syscurrency.Seq = $("#txtSeq").val();
        if (!syscurrency.Seq) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0057);
            return;
        }

        syscurrency.modifySysCurrency(function () {

            var m_oldSeq = pageVariable.currList.getItemSeq(syscurrency.SysCurrency_Id);

            /* 序号是否改变 */
            if (m_oldSeq == syscurrency.Seq) {
                pageVariable.currList.modifyData(syscurrency.SysCurrency_Id, syscurrency);
                pageVariable.handlerCurrFrm.close();
            }
            else {
                loadCurrency();
                pageVariable.handlerCurrFrm.close();
            }

            pageVariable.currSource = null;
            pageVariable.rateSource = null;
        });
    }
}

/* 删除货币 */
function deleteCurr() {
    var syscurrency = new othm.syscurrency();
    syscurrency.SysCurrency_Id = pageVariable.delCurrFrm.syscurrency_id;
    syscurrency.deleteSysCurrency(function () {
        pageVariable.currList.deleteData(syscurrency.SysCurrency_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        pageVariable.delCurrFrm.close();
        pageVariable.currSource = null;
        pageVariable.rateSource = null;
    });
}

/* 填充货币的下拉列表 */
function fillCurrList(currList, selectedCurr) {

    if (!pageVariable.currSource) {
        var syscurrency = new othm.syscurrency();
        syscurrency.getAllSysCurrencys(function (source) {
            pageVariable.currSource = source;

            var m_currSource = datastruct.convertion.tableToJson(source);
            var m_currentCurrCode = currList.val();
            currList.empty();
            $.each(m_currSource, function () {
                currList.append("<option value='" + this.SysCurrency_Id + "'>" + this.CurrName + "</option>");
            });
            currList.val(m_currentCurrCode);

            loadRate();
        });
    }
}

/* 加载汇率 */
function loadRate() {
    if (!pageVariable.rateList) {
        var currFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.rateList = new uicontrol.tableList("rateList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: currFormHeight,
                                         keyColumn: "SysCurrency_Id",
                                         columns: [{ display: mlm.C0131, name: "CurrName", width: 200, align: 'center' },
                                                   { display: mlm.C0132, name: "Rate", width: 200, align: 'center', adjust: true, createCell: constructRateCell },
                                                   { display: mlm.C0146, name: "RateDateStr", width: 200, align: 'center', adjust: true, createCell: constructDateCell },
                                                   { display: mlm.C0019, name: "", width: 120, align: 'center', adjust: true, modifiedFunc: "openSetRateFrm"}]
                                     });
    }

    var sysCurrency_Id = $("#ddlCurrency").val();
    if (sysCurrency_Id) {
        if (!pageVariable.rateSource) {
            var syscurrrate = new othm.syscurrrate();
            syscurrrate.querySysCurrRate(sysCurrency_Id, function (source) {
                pageVariable.rateSource = source;
                pageVariable.rateList.bindDataSource(source);
            });
        }
    }
}
/* 构造汇率列 */
function constructRateCell(key, cellValue) {
    if (cellValue) {
        return Number(cellValue).toFixed(4);
    }
}
/* 构造日期列 */
function constructDateCell(key, cellValue) {
    return commoncore.func.getTimeStrCell(cellValue);
}

/* 打开设置汇率的窗体 */
function openSetRateFrm() {
    if (!pageVariable.handlerRateFrm) {
        pageVariable.handlerRateFrm = new uicontrol.dialog("handlerRateFrm", mlm.C0147, { width: 800, height: 143 }, setRate);
    }

    pageVariable.handlerRateFrm.SysCurrency_Id = $(this).attr("tag");

    var m_rate = pageVariable.rateList.getItem(pageVariable.handlerRateFrm.SysCurrency_Id);
    var currName_A = $("#ddlCurrency option:selected").text();

    $("#lbCurrName_A").text(currName_A);
    $("#lbCurrName_B").text(m_rate.CurrName);
    $("#txtRate").val(m_rate.Rate);

    pageVariable.handlerRateFrm.sysCurrency_Id_A = $("#ddlCurrency").val();
    pageVariable.handlerRateFrm.sysCurrency_Id_B = m_rate.SysCurrency_Id;
    pageVariable.handlerRateFrm.show();
}

/* 设置汇率 */
function setRate() {
    var m_rate = $("#txtRate").val();
    if (!m_rate) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0148);
        return;
    }

    var syscurrrate = new othm.syscurrrate();
    syscurrrate.SysCurrency_Id_A = pageVariable.handlerRateFrm.sysCurrency_Id_A;
    syscurrrate.SysCurrency_Id_B = pageVariable.handlerRateFrm.sysCurrency_Id_B;
    syscurrrate.Rate = m_rate;

    syscurrrate.setSysCurrRate(function (paramObj) {
        paramObj.SysCurrency_Id = pageVariable.handlerRateFrm.SysCurrency_Id;
        paramObj.RateDateStr = paramObj.OtherProps.RateDateStr;
        paramObj.CurrName = $("#lbCurrName_B").text();
        pageVariable.rateList.modifyData(pageVariable.handlerRateFrm.SysCurrency_Id, paramObj);
        pageVariable.handlerRateFrm.close();
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 货币 */
    $("#lbCurrTag").text(mlm.C0131);
    /* 汇率 */
    $("#lbRateTag, #lbRate").text(mlm.C0132);
    /* 货币列表 */
    $("#lbCurrTitle").text(mlm.C0133);
    /* 新增货币 */
    $("#btNewCurr").val(mlm.C0134);
    /* 货币名称 */
    $("#lbCurrName").text(mlm.C0135 + ":");
    /* 序号 */
    $("#lbSeq").text(mlm.C0041 + ":");
    /* 货币简写 */
    $("#lbCurrCode").text(mlm.C0136 + ":");
    /* 货币符号 */
    $("#lbCurrSymbol").text(mlm.C0202 + ":");
    /* 对 */
    $("#lbSpan1").text(mlm.C0137);
    /* 的汇率 */
    $("#lbSpan2").text(mlm.C0138 + ":");
    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_3").text(mlm.C0049);

    /* ECMS-货币及汇率 */
    document.title = mlm.C0139;

}