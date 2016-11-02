/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadInventoryMoney);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btExportInvMoney").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
    $("#btExportInvMoney").click(function () {
        exportInventoryMoney.call(this, 0);
    });
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#pageContentForm").css("height", mainFormHeight);

    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
    if (pageVariable.inventorystatList) {
        pageVariable.inventorystatList.resize(mainFormHeight);
    }
}

/* 加载仓库资金 */
function loadInventoryMoney(event) {
    if (!pageVariable.inventorystatList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
        pageVariable.inventorystatList = new uicontrol.tableList("inventorystatList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "ProdCategory_Id",
                                         height: mainFormHeight,
                                         columns: [{ display: mlm.C0090, name: "PdcName", width: 450, align: 'left', adjust: true, createCell: constructPdcCell },
                                                   { display: mlm.C1616, name: "TotalCost", width: 180, align: 'right', adjust: true, createCell: constructCostCell },
                                                   { display: mlm.C1618, name: "Percent", width: 120, align: 'right', adjust: true, createCell: constructPercentCell },
                                                   { display: mlm.C0019, name: "", width: 90, align: 'center', adjust: true, createCell: constructOperaCell}]
                                     });
    }

    var m_inventory = new whm.inventory();
    m_inventory.queryInventoryMoneyStat(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        pageVariable.pdcojbs = [];

        pageVariable.pdcdict = new datastruct.dictionary();
        $.each(m_jsonobjs, function () {

            var m_pdcid = this.ProdCategory_Id.toString();

            var m_obj = this;
            m_obj.Children = [];

            pageVariable.pdcdict.setItem(m_obj.ProdCategory_Id.toString(), m_obj);

            var m_parentpdc = pageVariable.pdcdict.getItem(m_obj.ParentPdc_Id.toString());
            if (m_parentpdc) {
                m_parentpdc.Children.push(m_obj);
            }
            else {
                pageVariable.pdcojbs.push(m_obj);
            }
        });

        var m_objList = [];
        generatePdcList(m_objList, pageVariable.pdcojbs);

        pageVariable.totalcost = 0;
        $.each(pageVariable.pdcojbs, function () {
            pageVariable.totalcost += Number(this.TotalCost);
        });

        $("#lbTotalMoney").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, pageVariable.totalcost));

        pageVariable.inventorystatList.bindDataSource(m_objList);
    });
}
/*  */
function generatePdcList(objList, pdcobjs) {
    $.each(pdcobjs, function () {
        objList.push(this);

        generatePdcList(objList, this.Children);
    });
}
/*  */
function constructPdcCell(key, cellValue) {
    var m_splitstr = "";
    if (this.keyObj.Layer == 1) {
        m_splitstr = "----";
    }
    else if (this.keyObj.Layer == 2) {
        m_splitstr = "--------";
    }
    else if (this.keyObj.Layer == 3) {
        m_splitstr = "------------";
    }
    else if (this.keyObj.Layer == 4) {
        m_splitstr = "----------------";
    }
    else if (this.keyObj.Layer == 5) {
        m_splitstr = "--------------------";
    }

    var m_css = "";
    if (this.keyObj.EnableFlag == "0") {
        m_css = "color: #DD0000";
    }

    if (this.keyObj.Children.length > 0) {
        this.keyObj.IsExpand = true;
        if (this.keyObj.IsExpand) {
            var m_html = "<div style='float: left; margin: 0px 0px 0px 10px; padding: 0px; " + m_css + "'>" + m_splitstr + "</div>";
            return m_html + "<span id='pdcIcon_" + key + "' class='ui-icon ui-icon-circle-minus' style='float: left; margin: 1px 2px 0px 0px; cursor: pointer;' onmouseover='hoverBillType.call(this);' onmouseout='leaveBillType.call(this);' onclick='openOrCloseRows.call(this, \"" + key + "\");'></span><span style='float: left; " + m_css + "'>" + cellValue + "</span>";
        }
        else {
            var m_html = "<div style='float: left; margin: 0px 0px 0px 10px; padding: 0px; " + m_css + "'>" + m_splitstr + "</div>";
            return m_html + "<span id='pdcIcon_" + key + "' class='ui-icon ui-icon-circle-plus' style='float: left; margin: 1px 2px 0px 0px; cursor: pointer;' onmouseover='hoverBillType.call(this);' onmouseout='leaveBillType.call(this);' onclick='openOrCloseRows.call(this, \"" + key + "\");'></span><span style='float: left; " + m_css + "'>" + cellValue + "</span>";
        }
    }
    else {
        return "<div style='float: left; margin: 0px 0px 0px 10px; padding: 0px; " + m_css + "'>" + m_splitstr + "</div><span id='pdcIcon_" + key + "' class='ui-icon ui-icon-circle-minus' style='float: left; margin: 1px 2px 0px 0px;'></span><span style='float: left; " + m_css + "'>" + cellValue + "</span>";
    }
}
/* 鼠标事件 */
function hoverBillType() {
    $(this).addClass("hover-bt");
}
function leaveBillType() {
    $(this).removeClass("hover-bt");
}
/* 扩展或折叠行 */
function openOrCloseRows(key) {

    var m_obj = pageVariable.inventorystatList.getItem(key);

    if (m_obj.IsExpand) {
        m_obj.IsExpand = null;
        $(this).removeClass("ui-icon-circle-minus");
        $(this).addClass("ui-icon-circle-plus");

        $.each(m_obj.Children, function () {
            $("#row" + this.ProdCategory_Id).hide();
        });
    }
    else {
        m_obj.IsExpand = true;
        $(this).addClass("ui-icon-circle-minus");
        $(this).removeClass("ui-icon-circle-plus");

        $.each(m_obj.Children, function () {
            $("#row" + this.ProdCategory_Id).show();
        });
    }
}
/* 构建成本列 */
function constructCostCell(key, cellValue) {
    return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue);
}
/*  */
function constructPercentCell(key, cellValue) {
    return (Number(cellValue) * 100).toFixed(2) + "%";
}
/* 创建操作列 */
function constructOperaCell(key, cellvalue) {
    return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='exportInventoryMoney.call(this, \"" + key + "\");'>" + mlm.C0987 + mlm.C1193 + "</a>";
}

/*  */
function exportInventoryMoney(key) {
    var m_inventory = new whm.inventory();
    m_inventory.PdcId = key;
    m_inventory.exportInventoryMoneyStat(function (paramObj) {
        window.open(paramObj);
    });
}

/* 填充语言资源 */
function fillPageLanRes() {
    /* 库存资金 */
    $("#lbInventoryStatTag").text(mlm.C1616);
    /* 库存资金统计 */
    $("#lbInventoryStatitle").text(mlm.C1616 + mlm.C1617 + ":");
    /* 导出库存 */
    $("#btExportInvMoney").val(mlm.C0987 + mlm.C1193);

    /* ECMS-库存资金 */
    document.title = mlm.C1616;
}