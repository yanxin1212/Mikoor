
/* 页面变量 */
window.pageVariable = {

    /* 语言资源的导入窗体 */
    lanResImportFrm: null,

    /* 语言资源文件处理控件 */
    lanResFileCtrl: null,

    /* 多语言列表 */
    mlmList: null,

    /* 语言资源的导出窗体 */
    exportLanResFrm: null,

    /* 语言种类选项 */
    ulLanguages: null
};

/* 初始化界面 */
function initPage() {
    pageframe.layout.resizeEventList.push(setLayout);

    var multilanguage = new mlm.multilanguage();
    multilanguage.getLanResStat(bindmlmList);
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getTableHeightInForm();
    pageVariable.mlmList.resize(mainFormHeight);
}

/* 绑定多语言数据源 */
function bindmlmList(source) {

    var mainFormHeight = pageframe.layout.getTableHeightInForm();
    pageVariable.mlmList = new uicontrol.tableList("mlmStarList",
                                     { isPaging: false,
                                         keyColumn: "TableName",
                                         height: mainFormHeight,
                                         columns: [{ display: mlm.C0022, name: "TableName", width: 200, align: 'center', adjust: true, createCell: createLanTableCell },
                                                   { display: mlm.C0149, name: "LanResCount", width: 200, align: 'center' },
                                                   { display: mlm.C0019, name: "", width: 200, align: 'center', adjust: true, createCell: createMlmOperaCell}]
                                     });
    pageVariable.mlmList.bindDataSource(source);
}

/* 创建多语言列表的数据表列 */
function createLanTableCell(key, value) { 
    return mlm[value];
}

/* 创建多语言列表的操作列 */
function createMlmOperaCell(key) {
    return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openExportLanResFrm.call(this);'>" + mlm.C0020 + "</a><a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openImportLanRes.call(this);'>" + mlm.C0021 + "</a>";
}

/* 打开语言资源的导出窗体 */
function openExportLanResFrm() {
    if (!pageVariable.exportLanResFrm) {
        pageVariable.exportLanResFrm = new uicontrol.dialog("exportLanResFrm", mlm.C0150, { width: 800, height: 137 }, function () { exportLanRes(); });
        pageVariable.ulLanguages = new uicontrol.selectbox("ulLanguages", "checkbox");

        var items = [];
        $.each(mlm.languages, function () {
            items.push({ key: this.LRCode, value: this.LRName });
        });

        pageVariable.ulLanguages.bindSource(items);
    }

    pageVariable.exportLanResFrm.tableName = $(this).attr("tag");

    pageVariable.exportLanResFrm.show();
}

/* 导出语言资源 */
function exportLanRes() {

    var m_lrCodes = [];
    var m_selectedlrCodes = pageVariable.ulLanguages.getSelectedItem();
    $.each(m_selectedlrCodes, function () {
        m_lrCodes.push("@" + this + "@");
    });
    
    var multilanguage = new mlm.multilanguage();
    multilanguage.exportResourceByLRCode(pageVariable.exportLanResFrm.tableName, m_lrCodes.join(","), function (paramObj) {
        window.open(paramObj);
    });
}

/* 打开导入语言资源的窗体 */
function openImportLanRes() {
    if (!pageVariable.lanResImportFrm) {
        pageVariable.lanResImportFrm = new uicontrol.dialog("importLanResFrm", mlm.C0025, { width: 700, height: 150 }, importLanRes);
    }

    pageVariable.lanResImportFrm.tableName = $(this).attr("tag");

    pageVariable.lanResImportFrm.show();
}

/* 导入语言资源 */
function importLanRes(tableName) {
    if (!pageVariable.lanResFileCtrl) {
        pageVariable.lanResFileCtrl = new uicontrol.file("lanResFile");
    }

    var multilanguage = new mlm.multilanguage();
    multilanguage.importLanResource(pageVariable.lanResImportFrm.tableName, pageVariable.lanResFileCtrl, function () { 
    
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    $("#lbLangSymbol").text(mlm.C0150 + ":");
    /* 多语言维护 */
    $("#lbLanguageTag").text(mlm.C0015);
    /* 多语言统计数据 */
    $("#lbMlmStar").text(mlm.C0016);
    /* 语言资源文件 */
    $("#lbLanResFile").text(mlm.C0026);
    
    //"ECMS-多语言维护
    document.title = mlm.C0027;
}