
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadSalePlatform);

/* 页面变量 */
window.pageVariable = { };

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btNewExpressService").click(openNewExpressServiceFrm);
    $("#btExportExpService").click(exportExpService); 
    $("#btImportExpService").click(openImportExpService);
    $("#btAddLstSolution").click(openSelLstSolutionFrm); 
    $("#btAnalyFixCharge").click(openAnalyFixExpress);
    $("#btAnalyWeightCharge").click(exportAnalyExpress);

    pageVariable.viewExpServiceFrm = new bizcontrol.viewexpressservice();
    pageVariable.viewLstSolutionFrm = new bizcontrol.viewlstsolution();

    pageframe.control.multiButtion.init("btAnalyExpress", "dvAnaly");

    $("#btNewExpressService, #btAnalyExpress, #btExportExpService, #btImportExpService, #btAddLstSolution").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
}

/* 设置页面布局 */
function setLayout() {

    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#areaTreeFrm, #expServiceFrm").css("height", mainFormHeight + 15);

    var m_width = $("#areaTreeFrm")[0].offsetWidth + 15;
    $("#expServiceFrm").css("width", pageframe.layout.width - m_width);

    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
    if (pageVariable.expressServiceList) {
        pageVariable.expressServiceList.resize(mainFormHeight);
    }
}

/* 加载销售平台 */
function loadSalePlatform() {

    window.saleplatform.loadSaleSites(function () {

        /* 对销售平台为空的处理 */
        window.saleplatform.checkSalePlatform();

        loadExpServiceArea();
    });
}

/* 加载配送服务区域 */
function loadExpServiceArea() {
    pageframe.control.processCtrl.showOperaProcess();

    loadGlobalAreaTree();
    loadExpressService();

    pageVariable.initExpServiceFrm = true;
    setLayout();
}
/* 加载全球区域 */
function loadGlobalAreaTree() {
    var globalarea = new othm.globalarea();
    globalarea.SaleSite_Id = saleplatform.currSaleSite_Id;
    globalarea.queryGlobalAreaBySaleSite(function (source) {

        var m_expressservice = new sm.expressservice();
        m_expressservice.SaleSite_Id = saleplatform.currSaleSite_Id;
        m_expressservice.queryExpServiceCountByArea(function (retTable) {
            
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            pageVariable.expservicecountDict = new datastruct.dictionary();
            $.each(m_jsonobjs, function () {
                pageVariable.expservicecountDict.setItem(this.GlobalArea_Id, this.ExpCount);
            });

            pageVariable.areaTree = new uicontrol.treeView($("#areaTree"), source, loadExpressService,
                                                        { sourceFormat: "table",
                                                            keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                            constructDisplayTxt: constructGAreaTxt, isCollapse: true, expandEvent: setLayout,
                                                            collapseEvent: setLayout
                                                        });

            pageVariable.areaTree.loadSource();

            pageVariable.globalareasource = source;
            if (pageVariable.chkGlobalArea) {
                pageVariable.chkGlobalArea.globalAreaSource = {};
                pageVariable.chkGlobalArea.globalAreaSource.originSource = pageVariable.globalareasource;
                pageVariable.chkGlobalArea.globalAreaSource.objList = datastruct.convertion.tableToJson(pageVariable.globalareasource);
            }

            var m_width = $("#areaTreeFrm")[0].offsetWidth + 15;
            $("#expServiceFrm").css("width", pageframe.layout.width - m_width);

            //隐藏进度
            pageframe.control.processCtrl.hideOperaProcess();
        });
    });
}
/* 构建区域显示 */
function constructGAreaTxt(objitem) {
    var m_expcount = pageVariable.expservicecountDict.getItem(objitem.tag.GlobalArea_Id);
    if (Number(m_expcount) > 0) {
        return "<span>" + objitem.tag.GlobalAreaName + "(" + m_expcount + ")" + "</span>";
    }
    else {
        return "<span class='lb-symbol'>" + objitem.tag.GlobalAreaName + "</span>";
    }
}
/* 加载配送服务 */
function loadExpressService() {

    if (!pageVariable.expressServiceList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
        pageVariable.expressServiceList = new uicontrol.tableList("expressServiceList",
                                     { autoSeq: true,
                                         keyColumn: "ExpressService_Id",
                                         height: mainFormHeight,
                                         columns: [{ display: mlm.C0436, name: "ExpressServiceName", width: 220, align: 'left', adjust: true, createCell: constructESName },
                                                   { display: mlm.C1274, name: "WarehouseName", width: 90, align: 'left' },
                                                   { display: mlm.C0291, name: "GlobalAreaNames", width: 150, align: 'left', adjust: true, createCell: constructGlobalAreaCell },
                                                   { display: mlm.C0844, name: "ESType", width: 70, align: 'left', adjust: true, createCell: constructESTypeCell },
                                                   { display: mlm.C0438, name: "FromWeight", width: 60, align: 'right', adjust: true, createCell: constructESWeightCell },
                                                   { display: mlm.C0444, name: "FromPrice", width: 60, align: 'right', adjust: true, createCell: constructFromPriceStrCell },
                                                   { display: mlm.C0439, name: "IncreaseWeight", width: 60, align: 'right', adjust: true, createCell: constructESWeightCell },
                                                   { display: mlm.C0445, name: "IncreasePrice", width: 60, align: 'right', adjust: true, createCell: constructIncreaPriceStrCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructESOperaCell}]
                                     });
    }

    var m_globalarea_id = null;

    if (pageVariable.areaTree && pageVariable.areaTree.selectedItem) {
        m_globalarea_id = pageVariable.areaTree.selectedItem.key;
    }

    if (m_globalarea_id) {
        var m_expressservice = new sm.expressservice();
        m_expressservice.GlobalArea_Id = m_globalarea_id;
        m_expressservice.SaleSite_Id = saleplatform.currSaleSite_Id;
        m_expressservice.queryExpressServices(function (retTable) {
            pageVariable.expressServiceSource = retTable;
            pageVariable.expressServiceList.bindDataSource(retTable);

            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            $.each(m_jsonobjs, function () {
                var m_itemCtrl = $("#lbGA_" + this.ExpressService_Id);
                m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            });
        });
    }
    else {
        pageVariable.expressServiceList.bindDataSource(null);
    }
}

/* 构造配送服务名称列 */
function constructESName(key, cellValue) {
    return "<a onclick='openViewExpressServiceFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
}
/* 构件运费模式 */
function constructESTypeCell(key, cellValue) {
    if (cellValue == "1") {
        return mlm.C1014;
    }
    else if (cellValue == "2") {
        return mlm.C1015;
    }
    else {
        return mlm.C1016;
    }
}
/* 构建目的地列 */
function constructGlobalAreaCell(key, cellvalue) {

    var m_len = cellvalue.getBytesCount();
    if (m_len > 20) {
        var m_str = cellvalue.substringByBytes(20) + "...";
        return "<span id='lbGA_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
    }
    else {
        return cellvalue;
    }
}
/* 构建快递重量列 */
function constructESWeightCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (m_obj.ESType == "1") {
        return "<span>" + Number(cellvalue).toFixed(3) + " " + saleplatform.currObj.WUnit + "</span>";
    }
}
/* 构建最大重量列 */
function constructMaxWeightCell(key, cellvalue) {
    var m_obj = this.keyObj;
    return "<span>" + Number(cellvalue).toFixed(3) + " " + saleplatform.currObj.WUnit + "</span>";
}
/* 构建快递运费列 */
function constructFromPriceStrCell(key, cellvalue) {
    var m_obj = this.keyObj;
    if (m_obj.ESType == "1" || m_obj.ESType == "3") {
        return commoncore.func.getFullExactCurrHtml(saleplatform.currObj.CurrSymbol, cellvalue);
    }
}
/* 构建递增快递运费列 */
function constructIncreaPriceStrCell(key, cellvalue) {
    var m_obj = this.keyObj;
    if (m_obj.ESType == "1") {
        return commoncore.func.getFullExactCurrHtml(saleplatform.currObj.CurrSymbol, cellvalue);
    }
}
/* 构建配送服务操作列 */
function constructESOperaCell(key, cellvalue) {

    var m_html = "";

    var m_esObj = this.keyObj;

    if (!pageVariable.areaTree || (m_esObj.keepOpera || !pageVariable.areaTree.selectedItem)) {
        m_html = "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openModifyExpressServiceFrm.call(this);'>" + mlm.C0061 + "</a>" +
                     "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDelExpressServiceFrm.call(this);'>" + mlm.C0062 + "</a>";
    }
    else {
        var m_str = "#" + pageVariable.areaTree.selectedItem.key + "#";

        if (m_esObj.GlobalArea_Ids.indexOf(m_str) > -1) {
            m_html = "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openModifyExpressServiceFrm.call(this);'>" + mlm.C0061 + "</a>" +
                     "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDelExpressServiceFrm.call(this);'>" + mlm.C0062 + "</a>";
        }
    }

    return m_html;
}

/* 初始化配送服务 */
function initExpressServiceFrm(eventFunc) {
    if (!pageVariable.handlerExpressServiceFrm) {
        pageVariable.handlerExpressServiceFrm = new uicontrol.dialog("handlerExpressServiceFrm", "", { width: 925, position: ["auto", 5] }, saveExpressService);
        pageVariable.chkGlobalArea = new bizcontrol.selectglobalarea("chkGlobalArea", null, "country", commoncore.func.constructGAreaTxt, null, { txtclass: "multitext-input-a" });
        pageVariable.chkGlobalArea.globalAreaSource = {};
        pageVariable.chkGlobalArea.globalAreaSource.originSource = pageVariable.globalareasource;
        pageVariable.chkGlobalArea.globalAreaSource.objList = datastruct.convertion.tableToJson(pageVariable.globalareasource);
        pageVariable.expServiceTabs = $("#expServiceTabs").tabs({ show: showExpServiceTab });
        pageVariable.selectWH = new bizcontrol.selectwarehouse($("#selectWH"), function () {

            pageVariable.handlerExpressServiceFrm.expressservice.LstSolutionTable = null;
            if (pageVariable.lstSolutionList) {
                pageVariable.lstSolutionList.bindDataSource(null);
            }
        }, 1);

        var m_estypeCtrl = $("#ddlESType");
        m_estypeCtrl.append("<option value='1'>" + mlm.C1014 + "</option>");
        m_estypeCtrl.append("<option value='2'>" + mlm.C1015 + "</option>");
        m_estypeCtrl.append("<option value='3'>" + mlm.C1016 + "</option>");
        m_estypeCtrl.change(changeEsType);

        var m_trackCtrl = $("#ddlTrack");
        m_trackCtrl.append("<option value='0'></option>");
        m_trackCtrl.append("<option value='1'>" + mlm.C0811 + "</option>");
    }

    pageVariable.handlerExpressServiceFrm.show();
}
/* 展示新增或修改配送服务窗体的Tab */
function showExpServiceTab(event, ui) {

    if (ui.index == 1) {
        if (!pageVariable.lstSolutionList) {
            pageVariable.lstSolutionList = new uicontrol.tableList("lstSolutionList",
                                     { autoSeq: true,
                                         keyColumn: "LstSolution_Id",
                                         height: 270,
                                         columns: [{ display: mlm.C0783, name: "LstSolutionName", width: 200, align: 'left', adjust: true, createCell: constructLstSolutionCell },
                                                   { display: mlm.C0784, name: "LstCompanyName", width: 120, align: 'left' },
                                                   { display: mlm.C0785, name: "LstSolutionType", width: 100, align: 'left', adjust: true, createCell: constructLstSoluTypeCell },
                                                   { display: mlm.C0810, name: "TrackWebAddress", width: 100, align: 'left', adjust: true, createCell: constructTrackWebCell },
                                                   { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, deletedFunc: "deleteLstSolution"}]
                                     });
        }

        var m_expservice = pageVariable.handlerExpressServiceFrm.expressservice;
        if (pageVariable.lstSolutionList.dataSource.items.arrValues.length == 0 && m_expservice) {
            pageVariable.lstSolutionList.bindDataSource(m_expservice.LstSolutionTable);
        }
    }
}
/* 构建解决方案列 */
function constructLstSolutionCell(key, cellValue) {
    return "<a onclick='openViewLstSolution.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a>";
}
/* 构建快递类型列 */
function constructLstSoluTypeCell(key, cellvalue) {
    if (cellvalue == "1") {
        return mlm.C0803;
    }
    else if (cellvalue == "2") {
        return mlm.C0804;
    }
    else if (cellvalue == "3") {
        return mlm.C0805;
    }
    else {
        return mlm.C0815;
    }
}
/* 构建进度跟踪列 */
function constructTrackWebCell(key, cellvalue) {
    if ($.trim(cellvalue)) {
        return mlm.C0811;
    }
}
/* 改变运费模式事件 */
function changeEsType() {
    var m_estype = $("#ddlESType").val();

    if (m_estype == "1") {
        $("#dvWeightCal").show();
        $("#dvFixCal").hide();
    }
    else if (m_estype == "2") {
        $("#dvWeightCal").hide();
        $("#dvFixCal").hide();
    }
    else {
        $("#dvWeightCal").hide();
        $("#dvFixCal").show();
    }
}
/* 打开新增配送服务的窗体 */
function openNewExpressServiceFrm() {
    initExpressServiceFrm();

    $("#lbExpServiceSymbol").trigger("click");

    $("#txtESName").val("");
    $("#txtDeliverTime").val("");
    $("#txtFromWeight").val("0.000");
    $("#txtIncreaseWeight").val("0.000");
    $("#txtMaxWeight").val("0.000");
    $("#txtFromPrice").val("0.000");
    $("#txtFixedPrice").val("0.00");
    $("#txtIncreasePrice").val("0.000");
    $("#lbWUnit_1, #lbWUnit_2, #lbWUnit_3").text(saleplatform.currObj.WUnit);
    $("#lbCurr_1, #lbCurr_2, #lbCurr_3").text(saleplatform.currObj.CurrCode);
    $("#txtESRemark").val("");
    $("#txtMinDeliverTime").val("");
    $("#txtMaxDeliverTime").val("");
    pageVariable.chkGlobalArea.clearObj();

    changeEsType();

    pageVariable.handlerExpressServiceFrm.expressservice = {};

    if (pageVariable.lstSolutionList) {
        pageVariable.lstSolutionList.bindDataSource(null);
    }

    if (pageVariable.areaTree.selectedItem) {
        pageVariable.chkGlobalArea.setObj({ globalArea_Ids: pageVariable.areaTree.selectedItem.key, globalAreaNames: pageVariable.areaTree.selectedItem.value });
    }

    pageVariable.handlerExpressServiceFrm.expressservice_id = 0;
    pageVariable.handlerExpressServiceFrm.action = "New";
    pageVariable.handlerExpressServiceFrm.setTitle(mlm.C0447);
}
/* 打开修改配送服务的窗体 */
function openModifyExpressServiceFrm() {
    initExpressServiceFrm();

    $("#lbExpServiceSymbol").trigger("click");

    var m_expressservice = new sm.expressservice();
    m_expressservice.ExpressService_Id = $(this).attr("tag");
    m_expressservice.readExpressService(function (obj) {
        $("#txtESName").val(obj.ExpressServiceName);
        $("#txtDeliverTime").val(obj.DeliverTime);
        $("#txtFromWeight").val(Number(obj.FromWeight).toFixed(3));
        $("#txtIncreaseWeight").val(Number(obj.IncreaseWeight).toFixed(3));
        $("#txtMaxWeight").val(Number(obj.MaxWeight).toFixed(3));
        $("#txtFromPrice").val(Number(obj.FromPrice).toFixed(3));
        $("#txtFixedPrice").val(Number(obj.FromPrice).toFixed(2));
        $("#txtIncreasePrice").val(Number(obj.IncreasePrice).toFixed(3));
        $("#txtESRemark").val(obj.Remark);
        $("#ddlESType").val(obj.ESType);
        $("#ddlTrack").val(obj.IsTrack);
        $("#txtMinDeliverTime").val(obj.MinDeliveryTime);
        $("#txtMaxDeliverTime").val(obj.MaxDeliveryTime);
        $("#lbWUnit_1, #lbWUnit_2, #lbWUnit_3").text(saleplatform.currObj.WUnit);
        $("#lbCurr_1, #lbCurr_2, #lbCurr_3").text(saleplatform.currObj.CurrCode);
        pageVariable.selectWH.setWarehouse({ Warehouse_Id: obj.Warehouse_Id, WarehouseName: obj.OtherProps.WarehouseName });

        changeEsType();

        if (pageVariable.lstSolutionList) {
            pageVariable.lstSolutionList.bindDataSource(null);
        }

        pageVariable.handlerExpressServiceFrm.expressservice = obj;

        pageVariable.chkGlobalArea.setObj({ globalAreaNames: obj.OtherProps.GlobalAreaNames, globalArea_Ids: obj.GlobalArea_Ids });
    });

    pageVariable.handlerExpressServiceFrm.expressservice_id = m_expressservice.ExpressService_Id;
    pageVariable.handlerExpressServiceFrm.action = "Modify";
    pageVariable.handlerExpressServiceFrm.setTitle(mlm.C0448);
}
/* 打开删除配送服务的窗体 */
function openDelExpressServiceFrm(key) {
    if (!pageVariable.delExpressServiceFrm) {
        pageVariable.delExpressServiceFrm = new uicontrol.confirmDelete(deleteExpressService);
    }

    pageVariable.delExpressServiceFrm.expressservice_id = $(this).attr("tag");
    var m_obj = pageVariable.expressServiceList.getItem(pageVariable.delExpressServiceFrm.expressservice_id);

    pageVariable.delExpressServiceFrm.showConfirm(mlm.C0449 + "(" + m_obj.ExpressServiceName + ")?");
}
/* 查看配送服务 */
function openViewExpressServiceFrm(key) {
    pageVariable.viewExpServiceFrm.show(key);
}

/* 保存配送服务 */
function saveExpressService() {

    var m_esName = $.trim($("#txtESName").val());
    if (!m_esName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0436 + mlm.C0451);
        return;
    }

    var m_warehouse_id = pageVariable.selectWH.warehouse_id;
    if (!m_warehouse_id || m_warehouse_id == "0") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1274 + mlm.C0713);
        return;
    }

    var m_mintime = $.trim($("#txtMinDeliverTime").val());
    if (!m_mintime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0441 + mlm.C0193);
        return;
    }

    var m_maxtime = $.trim($("#txtMaxDeliverTime").val());
    if (!m_maxtime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0441 + mlm.C0193);
        return;
    }

    var m_areaObj = pageVariable.chkGlobalArea.getObj();
    if (!m_areaObj.globalArea_Ids) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0291 + mlm.C0451);
        return;
    }

    var m_expressservice = new sm.expressservice();
    m_expressservice.ExpressService_Id = pageVariable.handlerExpressServiceFrm.expressservice_id;
    m_expressservice.ExpressServiceName = m_esName;
    m_expressservice.Warehouse_Id = m_warehouse_id;
    m_expressservice.GlobalArea_Ids = m_areaObj.globalArea_Ids.split(',');
    var m_maxWeight = Number($("#txtMaxWeight").val());
    m_expressservice.ESType = $("#ddlESType").val();
    if (m_expressservice.ESType == "1") {

        var m_fromWeight = Number($("#txtFromWeight").val());
        var m_increaseWeight = Number($("#txtIncreaseWeight").val());
        if (m_maxWeight < m_fromWeight + m_increaseWeight) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0452);
            return;
        }

        m_expressservice.FromWeight = m_fromWeight;
        m_expressservice.IncreaseWeight = m_increaseWeight;
        m_expressservice.FromPrice = $("#txtFromPrice").val();
        m_expressservice.IncreasePrice = $("#txtIncreasePrice").val();

        if (Number(m_expressservice.FromWeight) == 0 || Number(m_expressservice.IncreaseWeight) == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1185);
            return;
        }
    }
    else {
        m_expressservice.FromPrice = $("#txtFixedPrice").val();
    }

    m_expressservice.SysWeightUnit_Id = saleplatform.currObj.SysWeightUnit_Id;
    m_expressservice.MaxWeight = m_maxWeight;
    m_expressservice.SysCurrency_Id = saleplatform.currObj.SysCurrency_Id;
    m_expressservice.Remark = $.trim($("#txtESRemark").val());
    m_expressservice.SalePlatform_Id = saleplatform.currSalePlatformId;
    m_expressservice.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_expressservice.MinDeliveryTime = m_mintime; 
    m_expressservice.MaxDeliveryTime = m_maxtime;
    m_expressservice.IsTrack = $("#ddlTrack").val();
    m_expressservice.LstSolution_Ids = pageVariable.handlerExpressServiceFrm.expressservice.LstSolution_Ids;

    if (pageVariable.handlerExpressServiceFrm.action == "New") {
        m_expressservice.newExpressService(function (obj) {

            obj.GlobalAreaNames = m_areaObj.globalAreaNames;
            obj.keepOpera = true;
            obj.StartAddress = obj.OtherProps.StartAddress;
            obj.WUnit = obj.OtherProps.WUnit;
            obj.CurrSymbol = obj.OtherProps.CurrSymbol;
            obj.WarehouseName = pageVariable.selectWH.warehousename;

            pageVariable.expressServiceList.addData(obj.ExpressService_Id, obj);

            pageVariable.handlerExpressServiceFrm.close();
        });
    }
    else {
        m_expressservice.modifyExpressService(function (obj) {

            obj.GlobalAreaNames = m_areaObj.globalAreaNames;
            obj.keepOpera = true;
            obj.StartAddress = obj.OtherProps.StartAddress;
            obj.WUnit = obj.OtherProps.WUnit;
            obj.CurrSymbol = obj.OtherProps.CurrSymbol;
            obj.WarehouseName = pageVariable.selectWH.warehousename;

            pageVariable.expressServiceList.modifyData(obj.ExpressService_Id, obj);

            pageVariable.handlerExpressServiceFrm.close();
        });
    }
}
/* 删除配送服务 */
function deleteExpressService() {
    var m_expressservice = new sm.expressservice();
    m_expressservice.ExpressService_Id = pageVariable.delExpressServiceFrm.expressservice_id;
    m_expressservice.deleteExpressService(function () {
        pageVariable.expressServiceList.deleteData(pageVariable.delExpressServiceFrm.expressservice_id);

        pageVariable.delExpressServiceFrm.close();
    });
}

/* 查看物流解决方案窗体 */
function openViewLstSolution(key) {
    pageVariable.viewLstSolutionFrm.show(key);
}

/* 打开物流成本预算 */
function openAnalyFixExpress() {
    if (!pageVariable.analyFixExpressFrm) {
        pageVariable.analyFixExpressFrm = new uicontrol.dialog("analyFixExpressFrm", mlm.C0998, { width: 900, position: ["auto", 5] }, exportAnalyFixExpress);
        $("#lbCalWUnit").text(saleplatform.currObj.WUnit);
        $("#lbLtsValueCurr").text(saleplatform.currObj.CurrCode);
        $("#txtLength, #txtWidth, #txtHeight").val("10");
        $("#txtCalWeight, #txtLtsValue").val("0.000");
    }

    pageVariable.analyFixExpressFrm.show();
}
/* 导出按件成本测算 */
function exportAnalyFixExpress() {
    var m_expressservice = new sm.expressservice();
    if (pageVariable.areaTree && pageVariable.areaTree.selectedItem) {
        m_expressservice.GlobalArea_Id = pageVariable.areaTree.selectedItem.key;
    }
    m_expressservice.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_expressservice.SysWeightUnit_id = saleplatform.currObj.SysWeightUnit_Id;
    m_expressservice.SysCurrency_id = saleplatform.currObj.SysCurrency_Id;
    m_expressservice.Weight = Number($("#txtCalWeight").val());
    m_expressservice.Tax = $("#txtLtsValue").val();
    m_expressservice.Volumn = Number($("#txtLength").val()) * Number($("#txtWidth").val()) * Number($("#txtHeight").val());

    if (m_expressservice.Weight == 0 || m_expressservice.Volumn == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0999);
        return;
    }

    m_expressservice.exportAnalyFixExpress(function (paramObj) {
        window.open(paramObj);

        pageVariable.analyFixExpressFrm.close();
    });
}
/* 导出按重量成本测算 */
function exportAnalyExpress() {
    var m_expressservice = new sm.expressservice();
    if (pageVariable.areaTree && pageVariable.areaTree.selectedItem) {
        m_expressservice.GlobalArea_Id = pageVariable.areaTree.selectedItem.key;
    }
    m_expressservice.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_expressservice.SysWeightUnit_id = saleplatform.currObj.SysWeightUnit_Id;
    m_expressservice.SysCurrency_id = saleplatform.currObj.SysCurrency_Id;

    m_expressservice.exportAnalyExpress(function (paramObj) {
        window.open(paramObj);
    });
}

/*  导出配送服务*/
function exportExpService() {
    var m_expressservice = new sm.expressservice();
    m_expressservice.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_expressservice.exportExpServices(function (paramObj) {
        window.open(paramObj);
    });
}
/*  打开导入配送服务的窗体 */
function openImportExpService() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", mlm.C0986 + mlm.C0436, { width: 800 }, importExpService);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.show();
}
/*  导入配送服务 */
function importExpService() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    var m_expressservice = new sm.expressservice();
    m_expressservice.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_expressservice.importExpServices(pageVariable.importFile, function (retObj) {
        if (retObj) {
            window.open(retObj);
        }

        loadExpressService();

        pageVariable.handlerImportFrm.close();
    });
}

/* 打开选择物流解决方案的窗体 */
function openSelLstSolutionFrm() {
    if (!pageVariable.selLstSolutionFrm) {
        pageVariable.selLstSolutionFrm = new bizcontrol.selectlstsolution(selectLstSolution);
    }

    var m_warehouse_id = pageVariable.selectWH.warehouse_id;
    if (!m_warehouse_id || m_warehouse_id == "0") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1274 + mlm.C0713);
        return;
    }

    var m_lstsolution_ids = [];
    $.each(pageVariable.lstSolutionList.dataSource.items.arrValues, function () {
        m_lstsolution_ids.push(this.LstSolution_Id);
    });
    pageVariable.selLstSolutionFrm.show(m_lstsolution_ids, saleplatform.currSalePlatformId, m_warehouse_id);
}
/* 选择物流解决方案 */
function selectLstSolution(lstsolutions) {
    $.each(lstsolutions, function () {
        if (!pageVariable.lstSolutionList.getItem(this.LstSolution_Id)) {
            pageVariable.lstSolutionList.addData(this.LstSolution_Id, this);
        }
    });

    pageVariable.handlerExpressServiceFrm.expressservice.LstSolution_Ids = pageVariable.lstSolutionList.dataSource.items.arrKeys;
}
/* 删除物流解决方案 */
function deleteLstSolution() {
    pageVariable.lstSolutionList.deleteData($(this).attr("tag"), function (leavedItem) {
        leavedItem.Seq = leavedItem.Seq - 1;
    });
    pageVariable.handlerExpressServiceFrm.expressservice.LstSolution_Ids = pageVariable.lstSolutionList.dataSource.items.arrKeys;
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 商品配送服务 */
    $("#lbExpressService").text(mlm.C0431);
    /* 配送服务列表 */
    $("#lbExpressServiceTitle").text(mlm.C0432);
    /* 新增配送服务 */
    $("#btNewExpressService").val(mlm.C0434);
    /* 基本信息 */
    $("#lbESInfoTab").text(mlm.C0286);
    /* 配送服务 */
    $("#lbESNameSymbol").text(mlm.C0436 + ":"); 
    /* 配送地点 */
    $("#lbStartAddressSymbol_q, #lbExpStartAddressSymbol").text(mlm.C0437 + ":");
    
    /* 目的地 */
    $("#lbGlobalAreaIdsSymbol, #lbGlobalAreaIdsSymbol_q").text(mlm.C0291 + ":");
    /* 商品首重限制 */
    $("#lbFromWeightSymbol").text(mlm.C0438 + ":");
    /* 增重 */
    $("#lbIncreaseWeightSymbol").text(mlm.C0439 + ":");
    /* 最大重量限制 */
    $("#lbMaxWeightSymbol").text(mlm.C0440 + ":");
    /* 配送时效 */
    $("#lbDeliverTimeSymbol").text(mlm.C0441 + ":");
    /* 首重运费 */
    $("#lbFromPriceSymbol").text(mlm.C0444 + ":");
    /* 增重运费 */
    $("#lbIncreasePriceSymbol").text(mlm.C0445 + ":");
    /* 备注 */
    $("#lbESRemarkSymbol").text(mlm.C0073 + ":");

    /* (工作日) */
    $("#lbDaySymbol").text("(" + mlm.C0983 + ")");
    /* 包裹重量 */
    $("#lbCalWeightSymbol").text(mlm.C0829 + ":");
    /* 体积 */
    $("#lbVolumnSymbol").text(mlm.C1031 + "(cm³)" + ":");
    /* 报关价值 */
    $("#lbLtsValueSymbol").text(mlm.C0835 + ":");
    /* 配送成本测算 */
    $("#btAnalyExpress").val(mlm.C0998);

    /* 销售区域 */
    $("#lbSaleSiteSymbol").text(mlm.C1011 + ":");
    /* 计费模式 */
    $("#lbESType").text(mlm.C0844 + ":");
    /* 每单运费 */
    $("#lbFixedPrice").text(mlm.C1017 + ":"); 
    /* 进度跟踪 */
    $("#lbTrackSymbol").text(mlm.C0810 + ":");
    /* 配送中心 */
    $("#lbWHSymbol").text(mlm.C1274 + ":");
    /* 按件运费测算 */
    $("#btAnalyFixCharge").text(mlm.C1183);
    /* 按重量运费测算 */
    $("#btAnalyWeightCharge").text(mlm.C1184);

    /* 导入文件 */
    $("#lbImportFileSymbol, #lbCheckFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
    /* 导出配送服务 */
    $("#btExportExpService").val(mlm.C0987 + mlm.C0436);
    /* 导入配送服务 */
    $("#btImportExpService").val(mlm.C0986 + mlm.C0436);
    /* 基本信息 */
    $("#lbExpServiceSymbol").text(mlm.C0286);
    /* 绑定的物流解决方案 */
    $("#lbLstSolutionSymbol").text(mlm.C1143);
    /* 物流解决方案列表 */
    $("#lbLstSolutionTitle").text(mlm.M0053 + mlm.C0463);
    /* 添加解决方案 */
    $("#btAddLstSolution").val(mlm.C0530 + mlm.C0783);

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_3, #lbSymbol_4, #lbSymbol_5, #lbSymbol_6, #lbSymbol_8, #lbSymbol_9, #lbSymbol_11, #lbSymbol_12").text(mlm.C0049);

    /* ECMS-Customer */
    document.title = mlm.C0430;
}
