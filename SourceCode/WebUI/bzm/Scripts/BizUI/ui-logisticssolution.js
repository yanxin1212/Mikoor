/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadGlobalAreaTree);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    pageVariable.calculateParam = {};

    $("#lstCompanyTag").click(function () { loadLstCompanies(); });
    $("#btNewLstCompany").click(openNewLstCompanyFrm); 
    $("#btNewLstSolution").click(openNewLstSolutionFrm);
    $("#btAddLstSoluItem").click(openNewLstSoluItemFrm);
    $("#lstSolutionTag").click(loadlstSolutionList);
    $("#btCalCharge").click(openQueryLstChargeFrm);
    $("#conutryTaxTag").click(loadConutryTax);
    $("#btExpLstPriceItem").click(exportLstSolutionPrice);
    $("#btImpLstPriceItem").click(openImpLstSolutionPriceFrm);
    $("#btAddLsCharge").click(addLsCharge);
    $("#btExportLstCharge").click(exportLstCharges);
    $("#lstChargeTag").click(function () {
        var m_width = $("#areaTreeFrm")[0].offsetWidth + 15;
        $("#lstChargeFrm").css("width", pageframe.layout.width - m_width);
    });

    pageVariable.viewLstSolutionFrm = new bizcontrol.viewlstsolution();

    $("#btNewLstCompany, #btNewLstSolution, #btAddLstSoluItem, #btCalCharge, #btImpLstPriceItem, #btExportLstCharge, #btExpLstPriceItem, #btAddLsCharge").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

    pageVariable.isLoadLstSolution = true;
}
/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#areaTreeFrm, #lstChargeFrm").css("height", mainFormHeight + 15);

    var m_width = $("#areaTreeFrm")[0].offsetWidth + 15;
    $("#lstChargeFrm").css("width", pageframe.layout.width - m_width);

    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
    if (pageVariable.lstCompanyList) {
        pageVariable.lstCompanyList.resize(mainFormHeight);
    }

    if (pageVariable.lstSolutionList) {
        pageVariable.lstSolutionList.resize(mainFormHeight);
    }

    if (pageVariable.lstChargeList) {
        pageVariable.lstChargeList.resize(mainFormHeight);
    }
}

/* 加载全球区域 */
function loadGlobalAreaTree() {

    if (!pageVariable.loadareaTree) {

        pageframe.control.processCtrl.showOperaProcess();

        var m_queryFunc = function () {

            var m_areaObj = pageVariable.areaTree.selectedItem;
            pageVariable.calculateParam.GlobalAreaIds = [m_areaObj.key];

            if (pageVariable.chkCalGlobalArea) {
                pageVariable.chkCalGlobalArea.setObj({ globalAreaNames: m_areaObj.tag.GlobalAreaName, globalArea_Ids: m_areaObj.key });
            }

            calcuateLtsCharge(1, pageVariable.lstChargeList.pageNumber);
        };

        var globalarea = new othm.globalarea();
        globalarea.queryCountryAndInnerRegion(function (source) {
            pageVariable.areaTree = new uicontrol.treeView($("#areaTree"), source, m_queryFunc,
                                                        { sourceFormat: "table",
                                                            keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                            constructDisplayTxt: null, isCollapse: true, expandEvent: setLayout,
                                                            collapseEvent: setLayout
                                                        });

            pageVariable.areaTree.loadSource();
            pageVariable.loadareaTree = true;

            var m_width = $("#areaTreeFrm")[0].offsetWidth + 15;
            $("#lstChargeFrm").css("width", pageframe.layout.width - m_width);

            setLayout();

            if (!pageVariable.lstChargeList) {
                var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
                pageVariable.lstChargeList = new uicontrol.tableList("lstChargeList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "LstChargeKey",
                                         height: mainFormHeight,
                                         pageQueryHandler: calcuateLtsCharge,
                                         columns: [{ display: mlm.C0783, name: "LstSolutionName", width: 195, align: 'left', adjust: true, createCell: constructLstSoluChargeCell },
                                                   { display: mlm.C0799, name: "", width: 95, align: 'left', adjust: true, createCell: constructLstAvaiTimeCell },
                                                   { display: mlm.C0810, name: "TrackWebAddress", width: 60, align: 'center', adjust: true, createCell: constructTrackWebCell },
                                                   { display: mlm.C1274, name: "WarehouseNames", width: 100, align: 'left', adjust: true, createCell: constructWHCell },
                                                   { display: mlm.C0291, name: "GlobalAreaName", width: 100, align: 'left' },
                                                   { display: mlm.C0806, name: "", width: 85, align: 'left', adjust: true, createCell: constructCalWeightCell },
                                                   { display: mlm.C0839, name: "", width: 225, align: 'left', adjust: true, createCell: constructChargeCell}]
                                     });
            }

            pageframe.control.processCtrl.hideOperaProcess();
        });
    }
}
/* 构建解决方案列 */
function constructLstSoluChargeCell(key, cellValue) {
    var m_obj = this.keyObj;
    return "<div style='margin: 0px; padding: 0px'><a onclick='openViewLstSolution.call(this, \"" + m_obj.LstSolution_Id + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a></div>" +
           "<div class='lb-symbol' style='margin: 3px 0px 0px 0px; padding: 0px'>" + m_obj.LstCompanyName + "</div>";
}
/* 构建参考时效列 */
function constructLstAvaiTimeCell(key, cellvalue) {
    var m_obj = this.keyObj;
    if (m_obj.MinAvaiTime) {
        return m_obj.MinAvaiTime + "-" + m_obj.MaxAvaiTime + mlm.C0984;
    }
}
/* 构建测算重量列 */
function constructCalWeightCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (m_obj.CalculateModel == 1 || Number(m_obj.Weight) == Number(pageVariable.calculateParam.Weight)) {
        return Number(m_obj.Weight).toFixed(3) + " " + m_obj.WUnit;
    }
    else {
        return "<div style='margin: 0px; padding: 0px'>" + Number(m_obj.Weight).toFixed(3) + " " + m_obj.WUnit + "</div>" +
                "<div class='lb-symbol' style='margin: 2px 0px 0px 0px; padding: 0px'>" + "(" + mlm.C1255 + ")" + "</div>";
    }
}
/* 构建运费列 */
function constructChargeCell(key, cellvalue) {
    var m_obj = this.keyObj;

    var m_arr = [];
    m_arr.push(commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_obj.TotalCharge));

    if (Number(m_obj.VATCharge) > 0) {
        m_arr.push(commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_obj.VATCharge) + "(" + mlm.C0988 + ")");
    }

    if (Number(pageVariable.calculateParam.Tax) > Number(m_obj.TaxLimit)) {
        m_arr.push(mlm.C0995);
    }

    if (m_arr.length > 0) {
        return m_arr.join("+");
    }
}
/* 构建进度跟踪列 */
function constructTrackWebCell(key, cellvalue) {
    if ($.trim(cellvalue)) {
        return mlm.C0811;
    }
}
/* 构建配送中心列 */
function constructWHCell(key, cellvalue) {
    var m_len = cellvalue.getBytesCount();
    if (m_len > 30) {
        var m_str = cellvalue.substringByBytes(30) + "...";
        return "<span id='lbWH_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
    }
    else {
        return cellvalue;
    }
}

/* 打开测算资费的窗体 */
function openQueryLstChargeFrm() {
    if (!pageVariable.queryLstChargeFrm) {
        pageVariable.queryLstChargeFrm = new uicontrol.dialog("queryLstChargeFrm", mlm.C0812, { width: 800, position: ["auto", 5] }, function () {

            pageVariable.calculateParam.Weight = $("#txtCalWeight").val();

            var m_calwunitCtrl = $("#ddlCalWUnit");
            pageVariable.calculateParam.SysWeightUnit_Id = m_calwunitCtrl.val();
            pageVariable.calculateParam.SysWUnit = m_calwunitCtrl.find("option:selected").text();

            pageVariable.calculateParam.CLength = $("#txtLength").val();
            pageVariable.calculateParam.Length = $("#txtWidth").val();
            pageVariable.calculateParam.Height = $("#txtHeight").val();

            var m_calcurrCtrl = $("#ddlCalCurr");
            pageVariable.calculateParam.SysCurrency_Id = m_calcurrCtrl.val();
            pageVariable.calculateParam.SysCurrSymbol = m_calcurrCtrl.find("option:selected").attr("tag");

            pageVariable.calculateParam.Tax = $("#txtLtsValue").val();
            var m_caltaxcurrCtrl = $("#ddlCalTaxCurr");
            pageVariable.calculateParam.TaxSysCurrency_Id = m_caltaxcurrCtrl.val();
            pageVariable.calculateParam.TaxSysCurrSymbol = m_caltaxcurrCtrl.find("option:selected").attr("tag");

            var m_areaObj = pageVariable.chkCalGlobalArea.getObj();
            if (m_areaObj && m_areaObj.globalArea_Ids) {
                pageVariable.calculateParam.GlobalAreaIds = m_areaObj.globalArea_Ids.split(',');

                if (pageVariable.calculateParam.GlobalAreaIds.length > 1) {
                    pageVariable.areaTree.clearSelectedItem();
                }
                else {
                    pageVariable.areaTree.selTvItem(pageVariable.calculateParam.GlobalAreaIds[0]);
                }
            }
            else {
                pageVariable.calculateParam.GlobalAreaIds = null;
                pageVariable.areaTree.clearSelectedItem();
            }

            var m_lstsolus = $("#chkCalLstSolution").attr("tag");
            if (m_lstsolus) {
                pageVariable.calculateParam.LstSolutionIds = m_lstsolus.split(',');
            }
            else {
                pageVariable.calculateParam.LstSolutionIds = null;
            }

            calcuateLtsCharge(1, pageVariable.lstChargeList.pageNumber);
        });
        $("#txtLength, #txtWidth, #txtHeight").val("10");
        $("#txtLtsValue").val("0.00");
        $("#txtCalWeight").val("0.000");

        loadWUnitOptions($("#ddlCalWUnit"));
        loadCurrOptions($("#ddlCalCurr"));
        loadCurrOptions($("#ddlCalTaxCurr"));
        pageVariable.chkCalGlobalArea = new bizcontrol.selectglobalarea("chkCalGlobalArea", null, null, commoncore.func.constructGAreaTxt);
        pageVariable.selectWH = new bizcontrol.selectwarehouse($("#selectWH"), null, 1);

        var m_selLstSoluCtrl = $("#btSelectLstSolution");
        m_selLstSoluCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
        m_selLstSoluCtrl.click(openSelectLstSolution);
        $("#chkCalLstSolution").change(inputLstSolution);
    }

    var m_areaObj = pageVariable.areaTree.selectedItem;
    if (m_areaObj) {
        pageVariable.chkCalGlobalArea.setObj({ globalAreaNames: m_areaObj.tag.GlobalAreaName, globalArea_Ids: m_areaObj.key });
    }

    pageVariable.queryLstChargeFrm.show();
}
/* 资费测算 */
function calcuateLtsCharge(page, pagenum) {

    var m_wunitCtrl = $("#ddlCalWUnit");
    var m_wunit = m_wunitCtrl.find("option:selected").text();

    var m_currCtrl = $("#ddlCalCurr");
    var m_currSymbol = m_currCtrl.find("option:selected").attr("tag");

    var m_lstsolution = new lstm.lstsolution();
    m_lstsolution.Weight = pageVariable.calculateParam.Weight;
    m_lstsolution.SysWeightUnit_Id = pageVariable.calculateParam.SysWeightUnit_Id;
    m_lstsolution.Length = pageVariable.calculateParam.CLength;
    m_lstsolution.Width = pageVariable.calculateParam.Length;
    m_lstsolution.Height = pageVariable.calculateParam.Height;
    m_lstsolution.SysCurrency_Id = pageVariable.calculateParam.SysCurrency_Id;
    m_lstsolution.Tax = pageVariable.calculateParam.Tax;
    m_lstsolution.TaxSysCurrency_Id = pageVariable.calculateParam.TaxSysCurrency_Id;
    m_lstsolution.GlobalAreaIds = pageVariable.calculateParam.GlobalAreaIds;
    m_lstsolution.LstSolutionIds = pageVariable.calculateParam.LstSolutionIds;
    if (pageVariable.selectWH) {
        m_lstsolution.Warehouse_Id = pageVariable.selectWH.warehouse_id;
    }
    m_lstsolution.Page = page;
    m_lstsolution.PageNum = pagenum;
    m_lstsolution.queryLstCharge(function (retTable) {
        pageVariable.lstChargeList.bindDataSource(retTable);

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            var m_itemCtrl = $("#lbWH_" + this.LstChargeKey);
            m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
        });

        if (pageVariable.queryLstChargeFrm) {
            pageVariable.queryLstChargeFrm.close();
        }
    });
}
/* 打开选择解决方案的窗体 */
function openSelectLstSolution() {
    if (!pageVariable.selectLstSolutionFrm) {
        pageVariable.selectLstSolutionFrm = new uicontrol.dialog("selectLstSolutionFrm", mlm.C0814, { width: 800, position: ["auto", 15] }, selectLstSolution);

        pageVariable.queryLstFunc = function (page, pagenum) {
            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.Page = page;
            m_lstsolution.PageNum = pagenum;
            m_lstsolution.queryLstSolution(function (retTable) {
                pageVariable.lstSolutionQueryList.bindDataSource(retTable);

                var m_tag = $("#chkCalLstSolution").attr("tag");
                if (m_tag) {
                    var m_selecteditems = m_tag.split(",");

                    var m_dict = new datastruct.dictionary();
                    $.each(m_selecteditems, function () {
                        m_dict.setItem(this, null);
                    });
                    pageVariable.lstSolutionQueryList.setSelectedItems(m_dict);
                }
            });
        };
        pageVariable.lstSolutionQueryList = new uicontrol.tableList("lstSolutionQueryList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "LstSolution_Id",
                                         height: 300,
                                         selectModel: "2",
                                         pageQueryHandler: pageVariable.queryLstFunc,
                                         columns: [{ display: mlm.C0783, name: "LstSolutionName", width: 160, align: 'left' },
                                                   { display: mlm.C0784, name: "LstCompanyName", width: 130, align: 'left' },
                                                   { display: mlm.C0785, name: "LstSolutionType", width: 90, align: 'left', adjust: true, createCell: constructLstSoluTypeCell },
                                                   { display: mlm.C0786, name: "CalculateModel", width: 90, align: 'left', adjust: true, createCell: constructCalModelCell}]
                                     });

        pageVariable.selectLstSolutionFrm.show();
    }
    else {
        pageVariable.selectLstSolutionFrm.show();
    }

    pageVariable.queryLstFunc(1, pageVariable.lstSolutionQueryList.pageNumber);
}
/* 选择解决方案 */
function selectLstSolution() {
    var m_selecteditems = pageVariable.lstSolutionQueryList.getSelectedItems();

    var m_lstsolution_ids = [];
    var m_lstsolution_names = [];
    $.each(m_selecteditems, function () {
        m_lstsolution_ids.push(this.LstSolution_Id);
        m_lstsolution_names.push(this.LstSolutionName);
    });

    var m_ctrl = $("#chkCalLstSolution");
    m_ctrl.text(m_lstsolution_names.join(", "));
    m_ctrl.attr("tag", m_lstsolution_ids.join(","));

    pageVariable.selectLstSolutionFrm.close();
}
/* 输入解决方案 */
function inputLstSolution() {
    var m_input = $("#chkCalLstSolution").val();

    var m_func = function () {

        var m_lstSolutionDict = new datastruct.dictionary();

        var m_ctrl = $("#chkCalLstSolution");

        if ($.trim(m_input)) {
            var m_items = m_input.split(",");
            $.each(m_items, function () {
                var m_itemstr = this;
                $.each(pageVariable.lstSolutions, function () {
                    if ((this.LstSolutionName + "-" + this.LstCompanyName).indexOf($.trim(m_itemstr)) > -1 && !m_lstSolutionDict.containKey(this.LstSolution_Id)) {
                        m_lstSolutionDict.setItem(this.LstSolution_Id, this.LstSolutionName);
                    }
                });
            });
            m_ctrl.text(m_lstSolutionDict.arrValues.join(", "));
            m_ctrl.attr("tag", m_lstSolutionDict.arrKeys.join(","));
        }
        else {
            m_ctrl.text("");
            m_ctrl.attr("tag", "");
        }

    };

    if (!pageVariable.lstSolutions) {
        var m_lstsolution = new lstm.lstsolution();
        m_lstsolution.Page = 1;
        m_lstsolution.PageNum = 1000;
        m_lstsolution.queryLstSolution(function (retTable) {
            pageVariable.lstSolutions = datastruct.convertion.tableToJson(retTable);
            $.each(pageVariable.lstSolutions, function () {
                this.GlobalAreaName = "";
                this.CalculateModelStr = "";
                this.Charge = "";
                this.WeightLimit = "";
            });

            m_func();
        });
    }
    else {
        m_func();
    }
}

/* 加载解决方案 */
function loadlstSolutionList() {
    if (!pageVariable.lstSolutionList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 4;
        pageVariable.lstSolutionList = new uicontrol.tableList("lstSolutionList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "LstSolution_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryLstSolutions,
                                         columns: [{ display: mlm.C0783, name: "LstSolutionName", width: 200, align: 'left', adjust: true, createCell: constructLstSolutionCell },
                                                   { display: mlm.C0816, name: "LstCompanyName", width: 100, align: 'left' },
                                                   { display: mlm.C0785, name: "LstSolutionType", width: 60, align: 'left', adjust: true, createCell: constructLstSoluTypeCell },
                                                   { display: mlm.C0786, name: "CalculateModel", width: 80, align: 'left', adjust: true, createCell: constructCalModelCell },
                                                   { display: mlm.C0810, name: "TrackWebAddress", width: 60, align: 'left', adjust: true, createCell: constructTrackWebCell },
                                                   { display: mlm.C0989, name: "", width: 75, align: 'left', adjust: true, createCell: constructVATLimitCell },
                                                   { display: mlm.C0988, name: "VATValue", width: 60, align: 'left', adjust: true, createCell: constructVATRateCell },
                                                   { display: mlm.C0338, name: "SPfNames", width: 150, align: 'left', adjust: true, createCell: constructSPfNamesCell },
                                                   { display: mlm.C1274, name: "WarehouseNames", width: 150, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, modifiedFunc: "openModifyLstSolutionFrm", deletedFunc: "openDelLstSolutionFrm"}]
                                     });
    }

    if (pageVariable.isLoadLstSolution) {
        queryLstSolutions(1, pageVariable.lstSolutionList.pageNumber);
        pageVariable.isLoadLstSolution = false;
    }
}
/* 分页查询解决方案 */
function queryLstSolutions(page, pagenum) {

    //展示进度
    pageframe.control.processCtrl.showOperaProcess();

    var m_lstsolution = new lstm.lstsolution();
    m_lstsolution.Page = page;
    m_lstsolution.PageNum = pagenum;
    m_lstsolution.queryLstSolution(function (retTable) {
        pageVariable.lstSolutionList.bindDataSource(retTable);

        //隐藏进度
        pageframe.control.processCtrl.hideOperaProcess();
    });
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
/* 构建计费模式列 */
function constructCalModelCell(key, cellvalue) {
    if (cellvalue == "1") {
        return mlm.C0801;
    }
    else {
        return mlm.C0802;
    }
}
/* 构建VAT税率列 */
function constructVATRateCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (Number(cellvalue) > 0) {
        return "<span>" + Number(cellvalue) * 100 + "</span>%";
    }
} 
/* 构建VAT起征点列 */
function constructVATLimitCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (Number(m_obj.VATLimit) > 0) {
        return commoncore.func.getExactCurrHtml(m_obj.VAT_CurrSymbol, m_obj.VATLimit);
    }
}
/* 构建前端销售平台列 */
function constructSPfNamesCell(key, cellvalue) {
    if (!cellvalue) {
        return mlm.C1140;
    }
    else {
        return cellvalue;
    }
}

/* 初始化物流解决方案的窗体 */
function initLstSolutionFrm() {

    if (!pageVariable.handlerLstSolutionFrm) {
        pageVariable.handlerLstSolutionFrm = new uicontrol.dialog("handlerLstSolutionFrm", "", { width: 1025, position: ["auto", 5] }, saveLstSolution);
        pageVariable.lstSolutionTabs = $("#lstSolutionTabs").tabs();

        var m_calculateCtrl = $("#dllCalculate");
        m_calculateCtrl.append("<option value='" + "1" + "'>" + mlm.C0801 + "</option>");
        m_calculateCtrl.append("<option value='" + "2" + "'>" + mlm.C0802 + "</option>");
        m_calculateCtrl.change(changeLstCalculate);

        $("#dvVolumnArea").hide();

        var m_lstSoluTypeCtrl = $("#ddlLstSoluType");
        m_lstSoluTypeCtrl.append("<option value='" + "1" + "'>" + mlm.C0803 + "</option>");
        m_lstSoluTypeCtrl.append("<option value='" + "2" + "'>" + mlm.C0804 + "</option>");
        m_lstSoluTypeCtrl.append("<option value='" + "3" + "'>" + mlm.C0805 + "</option>");
        m_lstSoluTypeCtrl.append("<option value='" + "4" + "'>" + mlm.C0815 + "</option>");

        pageVariable.ulSalePlatforms = new uicontrol.selectbox("ulSalePlatforms", "checkbox");
        pageVariable.ulWarehouses = new uicontrol.selectbox("ulWarehouses", "checkbox");

        pageVariable.handlerLstSolutionFrm.show();
        pageVariable.lstSoluItemList = new uicontrol.tableList("lstSoluItemList",
                                     { autoSeq: true,
                                         keyColumn: "LstSolutionItem_Id",
                                         height: 340,
                                         columns: [{ display: mlm.C0291, name: "GlobalAreaNames", width: 265, align: 'left' },
                                                   { display: mlm.C1268, name: "LstSolutionItemName", width: 70, align: 'left' },
                                                   { display: mlm.C0985, name: "WeightRange", width: 150, align: 'left', adjust: true, createCell: constructWeightRange },
                                                   { display: mlm.C0444, name: "StartWeightCharge", width: 75, align: 'left', adjust: true, createCell: constructWeightChargeCell },
                                                   { display: mlm.C0789, name: "OtherItemCharge", width: 65, align: 'left', adjust: true, createCell: constructWeightChargeCell },
                                                   { display: mlm.C0799, name: "", width: 95, align: 'left', adjust: true, createCell: constructAvaiTimeCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, modifiedFunc: "openModifyLstSoluItemFrm", deletedFunc: "openDelLstSoluItemFrm"}]
                                     });
    }

    if (pageVariable.handlerLstSoluItemFrm) {
        pageVariable.handlerLstSoluItemFrm.__key = 10000;
    }
}
/* 构建重量区间列 */
function constructWeightRange(key, cellvalue) {
    var m_obj = pageVariable.lstSoluItemList.getItem(key);
    var m_wunit = $("#ddlWUnit").find("option:selected").text();

    return "<span>" + Number(m_obj.StartWeight).toFixed(3) + "</span> " + m_wunit + " - " + "<span>" + Number(m_obj.WeightLimit).toFixed(3) + "</span> " + m_wunit;
}
/* 构建重量运费列 */
function constructWeightChargeCell(key, cellvalue) {
    return commoncore.func.getExactCurrHtml(m_currSymbol, cellvalue);
}
/* 构建参考时效列 */
function constructAvaiTimeCell(key, cellvalue) {
    var m_obj = pageVariable.lstSoluItemList.getItem(key);

    return m_obj.MinAvaiTime + "-" + m_obj.MaxAvaiTime + mlm.C0984;
}
/* 构建重量列 */
function constructWeightLimitCell(key, cellvalue) {
    return Number(cellvalue).toFixed(3);
}
/* 打开新增物流解决方案的窗体 */
function openNewLstSolutionFrm() {
    
    initLstSolutionFrm();

    pageVariable.handlerLstSolutionFrm.show();

    loadCurrOptions($("#ddlCurrOptions"));
    loadCurrOptions($("#ddlVATCurr"));
    loadWUnitOptions($("#ddlWUnit"));
    loadLstCompanyOptions($("#ddlLstCompany"));
    loadSalePlatformOptions(function () {
        pageVariable.ulSalePlatforms.clear();
        var m_keys = [];
        $.each(pageVariable.saleplatforms, function () {
            m_keys.push({ key: this.SalePlatform_Id });
        });
        pageVariable.ulSalePlatforms.setSelectedItem(m_keys);
    });
    loadWarehouseOptions();
    $("#txtVolumnCal").val("0");
    $("#txtTrackWeb").val("");
    $("#txtLstSolution").val("");
    $("#txtVATLimit").val("0.00");
    $("#txtVATValue").val("0");

    pageVariable.lstSoluItemList.bindDataSource(null);

    pageVariable.handlerLstSolutionFrm.maxItemKey = 10000;
    pageVariable.handlerLstSolutionFrm.lstsolution_id = 0;
    pageVariable.handlerLstSolutionFrm.action = "New";
    pageVariable.handlerLstSolutionFrm.setTitle(mlm.C0461 + mlm.M0053);
}
/* 打开修改物流解决方案的窗体 */
function openModifyLstSolutionFrm() {

    initLstSolutionFrm();

    var m_key = $(this).attr("tag");

    var m_lstsolution = new lstm.lstsolution();
    m_lstsolution.LstSolution_Id = m_key;

    /* 判断加载对象的事件计数器 */
    pageVariable.handlerLstSolutionFrm.loadobj_event = 1;
    /* 展示进度 */
    pageframe.control.processCtrl.showOperaProcess();

    loadCurrOptions($("#ddlCurrOptions"));
    loadCurrOptions($("#ddlVATCurr"));
    loadWUnitOptions($("#ddlWUnit"));
    loadLstCompanyOptions($("#ddlLstCompany"));
    loadSalePlatformOptions();
    loadWarehouseOptions();

    var m_innerevent = setInterval(function () {

        if (pageVariable.handlerLstSolutionFrm.loadobj_event == 7) {

            clearInterval(m_innerevent);

            m_lstsolution.readLstSolution(function (retObj) {

                pageVariable.handlerLstSolutionFrm.show();

                $("#txtLstSolution").val(retObj.LstSolutionName);
                $("#ddlLstCompany").val(retObj.LstCompany_Id);
                $("#ddlWUnit").val(retObj.SysWeightUnit_Id);
                $("#ddlCurrOptions").val(retObj.SysCurrency_Id);
                $("#txtVATLimit").val(Number(retObj.VATLimit).toFixed(2));
                $("#txtVATValue").val((Number(retObj.VATValue) * 100));
                $("#ddlVATCurr").val(Number(retObj.VAT_SysCurrency_Id));
                $("#txtLstSoluRemark").val(retObj.LstSoluRemark);

                var m_keys = [];
                pageVariable.ulSalePlatforms.clear();
                if (retObj.SalePlatform_Ids.length == 0) {
                    $.each(pageVariable.saleplatforms, function () {
                        m_keys.push({ key: this.SalePlatform_Id });
                    });
                }
                else {
                    $.each(retObj.SalePlatform_Ids, function () {
                        m_keys.push({ key: this });
                    });
                }
                pageVariable.ulSalePlatforms.setSelectedItem(m_keys);

                var m_whkeys = [];
                pageVariable.ulWarehouses.clear();
                $.each(retObj.Warehouse_Ids, function () {
                    m_whkeys.push({ key: this });
                });
                pageVariable.ulWarehouses.setSelectedItem(m_whkeys);

                var m_calCtrl = $("#dllCalculate");
                m_calCtrl.val(retObj.CalculateModel);
                m_calCtrl.trigger("change");

                $("#ddlLstSoluType").val(retObj.LstSolutionType);
                $("#txtVolumnCal").val(retObj.VolumnForCal);
                $("#txtTrackWeb").val(retObj.TrackWebAddress);

                $.each(retObj.Items, function () {
                    if (this.OtherProps.GlobalAreaNames) {
                        this.GlobalAreaNames = this.OtherProps.GlobalAreaNames;
                    }
                    else {
                        this.GlobalAreaNames = mlm.C0421;
                    }

                    var m_fstLstCharge = this.Charges[0];
                    this.StartWeight = m_fstLstCharge.StartWeight;
                    this.StartWeightCharge = m_fstLstCharge.IncreaseWeightCharge;
                    this.OtherItemCharge = m_fstLstCharge.OtherItemCharge;
                    var m_lastLstCharge = this.Charges[this.Charges.length - 1];
                    this.WeightLimit = m_lastLstCharge.WeightLimit;

                    $.each(this.Charges, function () {
                        this.islastitem = false;
                    });
                    m_lastLstCharge.islastitem = true;
                });

                pageVariable.lstSoluItemList.bindDataSource(retObj.Items);

                pageVariable.handlerLstSolutionFrm.lstsolution_id = m_key;

                /* 隐藏进度 */
                pageframe.control.processCtrl.hideOperaProcess();
            });
        }

    }, 1000);

    pageVariable.handlerLstSolutionFrm.action = "Modify";
    pageVariable.handlerLstSolutionFrm.setTitle(mlm.C0061 + mlm.M0053);
}
/* 打开删除物流解决方案的窗体 */
function openDelLstSolutionFrm() {
    if (!pageVariable.delLstSolutionFrm) {
        pageVariable.delLstSolutionFrm = new uicontrol.confirmDelete(deleteLstSolution);
    }

    pageVariable.delLstSolutionFrm.lstsolution_id = $(this).attr("tag");
    var m_obj = pageVariable.lstSolutionList.getItem(pageVariable.delLstSolutionFrm.lstsolution_id);

    pageVariable.delLstSolutionFrm.showConfirm(mlm.C0464 + mlm.M0053 + "（" + m_obj.LstSolutionName + "）?");
}
/* 保存物流解决方案 */
function saveLstSolution() {

    var m_lstSolution = $.trim($("#txtLstSolution").val());
    if (!m_lstSolution) {
        pageframe.control.alertDialog.showAlertInfo(mlm.M0053 + mlm.C0451);
        return;
    }
    
    var m_lstCompanyCtrl = $("#ddlLstCompany");
    var m_wunitCtrl = $("#ddlWUnit");
    var m_varCurrCtrl = $("#ddlVATCurr");

    var m_lstsolution = new lstm.lstsolution();
    m_lstsolution.LstSolution_Id = pageVariable.handlerLstSolutionFrm.lstsolution_id;
    m_lstsolution.LstSolutionName = $.trim($("#txtLstSolution").val());
    m_lstsolution.LstCompany_Id = m_lstCompanyCtrl.val();
    m_lstsolution.SysWeightUnit_Id = m_wunitCtrl.val();
    m_lstsolution.SysCurrency_Id = $("#ddlCurrOptions").val();
    m_lstsolution.CalculateModel = $("#dllCalculate").val();
    m_lstsolution.LstSolutionType = $("#ddlLstSoluType").val();
    m_lstsolution.TrackWebAddress = $.trim($("#txtTrackWeb").val());
    m_lstsolution.VolumnForCal = $("#txtVolumnCal").val();
    m_lstsolution.VATLimit = $("#txtVATLimit").val();
    m_lstsolution.VATValue = Number($("#txtVATValue").val()) / 100;
    m_lstsolution.VAT_SysCurrency_Id = m_varCurrCtrl.val();
    m_lstsolution.LstSoluRemark = $.trim($("#txtLstSoluRemark").val()).replace(/"/g, "^").replace(/'/g, "^");

    var m_vatcurr = m_varCurrCtrl.find("option:selected");

    var m_selectedsites = pageVariable.ulSalePlatforms.getSelectedItem();
    if (m_selectedsites.length != pageVariable.saleplatforms.length) {
        m_lstsolution.SalePlatform_Ids = m_selectedsites;
    }
    m_lstsolution.Warehouse_Ids = pageVariable.ulWarehouses.getSelectedItem();
    if (!m_lstsolution.Warehouse_Ids || m_lstsolution.Warehouse_Ids.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1274 + mlm.C0713);
        return;
    }

    var m_selectedsites = pageVariable.ulSalePlatforms.getSelectedItemText();
    var m_whnamearr = pageVariable.ulWarehouses.getSelectedItemText();
    if (pageVariable.handlerLstSolutionFrm.action == "New") {

        var m_selectedarea = pageVariable.areaTree.selectedItem;

        m_lstsolution.Items = [];
        $.each(pageVariable.lstSoluItemList.dataSource.items.arrValues, function () {
            var m_item = {};
            m_item.LstAreaIds = this.LstAreaIds;
            m_item.LstSolutionItemName = this.LstSolutionItemName;
            m_item.MinAvaiTime = this.MinAvaiTime;
            m_item.MaxAvaiTime = this.MaxAvaiTime;
            m_item.Charges = this.Charges;
            m_lstsolution.Items.push(m_item);
        });

        m_lstsolution.newLstSolution(function (retObj) {
            retObj.LstCompanyName = m_lstCompanyCtrl.find("option:selected").text();
            if (m_selectedsites.length != pageVariable.saleplatforms.length) {
                retObj.SPfNames = m_selectedsites.join(", ");
            }
            retObj.VAT_CurrSymbol = m_vatcurr.attr("tag");
            retObj.WarehouseNames = m_whnamearr.join(", ");
            pageVariable.lstSolutionList.addData(retObj.LstSolution_Id, retObj);

            pageVariable.handlerLstSolutionFrm.close();
        });
    }
    else {
        m_lstsolution.modifyLstSolution(function (retObj) {

            m_lstsolution.LstCompanyName = m_lstCompanyCtrl.find("option:selected").text();
            if (m_selectedsites.length != pageVariable.saleplatforms.length) {
                m_lstsolution.SPfNames = m_selectedsites.join(", ");
            }

            m_lstsolution.VAT_CurrSymbol = m_vatcurr.attr("tag");
            m_lstsolution.WarehouseNames = m_whnamearr.join(", ");
            pageVariable.lstSolutionList.modifyData(m_lstsolution.LstSolution_Id, m_lstsolution);

            pageVariable.handlerLstSolutionFrm.close();
        });
    }

    pageVariable.isLoadLstSolution = true;
}
/* 删除物流解决方案 */
function deleteLstSolution() {
    var m_lstsolution = new lstm.lstsolution();
    m_lstsolution.LstSolution_Id = pageVariable.delLstSolutionFrm.lstsolution_id;
    m_lstsolution.deleteLstSolution(function () {
        pageVariable.lstSolutionList.deleteData(m_lstsolution.LstSolution_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        pageVariable.delLstSolutionFrm.close();
        pageVariable.isLoadLstSolution = true;
    });
}

/* 初始化物流解决明细的窗体 */
function initLstSoluItemFrm() {
    if (!pageVariable.handlerLstSoluItemFrm) {
        pageVariable.handlerLstSoluItemFrm = new uicontrol.dialog("handlerLstSoluItemFrm", "", { width: 800, position: ["auto", 15] }, saveLstSoluItem);
        pageVariable.chkGlobalArea = new bizcontrol.selectglobalarea("chkGlobalArea", null, null, commoncore.func.constructGAreaTxt);

        pageVariable.handlerLstSoluItemFrm.__key = 10000;

        pageVariable.handlerLstSoluItemFrm.show();
        pageVariable.lsChargeTable = new uicontrol.tableList("lsChargeTable",
                                     { autoSeq: true,
                                         keyColumn: "LstSolutionItem_Charge_Id",
                                         height: 110,
                                         columns: [{ display: mlm.C0985, name: "", width: 180, align: 'left', adjust: true, createCell: constructlscWeightRangeCell },
                                                   { display: mlm.C0797, name: "", width: 190, align: 'left', adjust: true, createCell: constructlscIncWeightChargeCell },
                                                   { display: mlm.C0789, name: "OtherItemCharge", width: 75, align: 'left', adjust: true, createCell: constructStOtherChargeCell },
                                                   { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, createCell: constructlscOperaCell}]
                                     });
    }
    else {
        pageVariable.handlerLstSoluItemFrm.show();
    }
}
/* 打开新增物流解决明细的窗体*/
function openNewLstSoluItemFrm() {

    initLstSoluItemFrm();

    pageVariable.chkGlobalArea.clearObj();
    $("#txtWeightLimit").val("0.000");
    $("#txtMinAvaiTime").val("0");
    $("#txtMaxAvaiTime").val("0");
    $("#txtLstSolutionItemName").val("");

    pageVariable.lsChargeTable.bindDataSource(null);
    addLsCharge();

    pageVariable.handlerLstSoluItemFrm.lstsolutionitem_id = 0;
    pageVariable.handlerLstSoluItemFrm.action = "New";
    pageVariable.handlerLstSoluItemFrm.setTitle(mlm.C0461 + mlm.C0818);
}
/* 构建重量区间列 */
function constructlscWeightRangeCell(key, cellvalue) {
    var m_obj = pageVariable.lsChargeTable.getItem(key);
    var m_wunit = $("#ddlWUnit").find("option:selected").text();

    if (m_obj.islastitem) {
        if (pageVariable.lsChargeTable.dataSource.items.count > 1) {
            return "<span>" + Number(m_obj.StartWeight).toFixed(3) + "</span> " + m_wunit + " - "
                   + "<input id='txtLscMaxWeight_" + key + "' type='text' class='text-input' onchange='changeLsWeight.call(this, \"WeightLimit\", \"" + key + "\");' onkeypress='uicontrol.func.checkInputNumber(event);' style='width: 55px' value='" + Number(m_obj.WeightLimit).toFixed(3) + "' /> " + m_wunit;
        }
        else {
            return "<input id='txtLscStWeight_" + key + "' type='text' class='text-input' onchange='changeLsWeight.call(this, \"StartWeight\", \"" + key + "\");' onkeypress='uicontrol.func.checkInputNumber(event);' style='width: 55px' value='" + Number(m_obj.StartWeight).toFixed(3) + "' /> " + m_wunit + " - "
                   + "<input id='txtLscMaxWeight_" + key + "' type='text' class='text-input' onchange='changeLsWeight.call(this, \"WeightLimit\", \"" + key + "\");' onkeypress='uicontrol.func.checkInputNumber(event);' style='width: 55px' value='" + Number(m_obj.WeightLimit).toFixed(3) + "' /> " + m_wunit;
        }
    }
    else {
        return "<span>" + Number(m_obj.StartWeight).toFixed(3) + "</span> " + m_wunit + " - " + "<span>" + Number(m_obj.WeightLimit).toFixed(3) + "</span> " + m_wunit;
    }
}
/* 构建其他运费列 */
function constructStOtherChargeCell(key, cellvalue) {
    var m_currSymbol = $("#ddlCurrOptions").find("option:selected").attr("tag");

    return m_currSymbol + "<input id='txtStOtherCharge_" + key + "' type='text' class='text-input' onchange='changeLsCharge.call(this, \"OtherItemCharge\", \"" + key + "\");' onkeypress='uicontrol.func.checkInputNumber(event);' style='width: 55px' value='" + Number(cellvalue).toFixed(2) + "' />";
}
/* 构建续重运费列 */
function constructlscIncWeightChargeCell(key, cellvalue) {
    var m_obj = pageVariable.lsChargeTable.getItem(key);
    var m_wunit = $("#ddlWUnit").find("option:selected").text();
    var m_currSymbol = $("#ddlCurrOptions").find("option:selected").attr("tag");

    return m_currSymbol + "<input id='txtLscIncWeightCharge_" + key + "' type='text' class='text-input' onchange='changeLsCharge.call(this, \"IncreaseWeightCharge\", \"" + key + "\");' onkeypress='uicontrol.func.checkInputNumber(event);' style='width: 55px' value='" + Number(m_obj.IncreaseWeightCharge).toFixed(3) + "' />" + " / "
            + "<input id='txtLscIncWeight_" + key + "' type='text' class='text-input' onchange='changeLsWeight.call(this, \"IncreaseWeight\", \"" + key + "\");' onkeypress='uicontrol.func.checkInputNumber(event);' style='width: 55px' value='" + Number(m_obj.IncreaseWeight).toFixed(3) + "' /> (" + m_wunit + ")";
}
/* 构建运费操作列 */
function constructlscOperaCell(key, cellvalue) {
    var m_obj = pageVariable.lsChargeTable.getItem(key);
    if (m_obj.islastitem && pageVariable.lsChargeTable.dataSource.items.count > 1) {
        return "<a href='javascript:void(\"0\")' class='bt-link' onclick='deleteLsCharge.call(this, \"" + key + "\");'>" + mlm.C0062 + "</a>";
    }
    else {
        return "";
    }
}
/* 改变相关重量 */
function changeLsWeight(prop, key) {
    var m_obj = pageVariable.lsChargeTable.getItem(key);

    var m_oldvalue = m_obj[prop];
    m_obj[prop] = $(this).val();

    if (Number(m_obj.IncreaseWeight) > 0) {
        var m_weightrange = Math.round(Number(m_obj.WeightLimit) * 1000 - Number(m_obj.StartWeight) * 1000);
        if (m_weightrange > 0) {
            var intrule = /^[1-9]+[0-9]*]*$/;
            if (Number(m_obj.IncreaseWeight) > 0 && !intrule.test(m_weightrange / Math.round(Number(m_obj.IncreaseWeight) * 1000))) {
                m_obj[prop] = m_oldvalue;
                $(this).val(Number(m_oldvalue).toFixed(3));
            }
        }
        else {
            m_obj[prop] = m_oldvalue;
            $(this).val(Number(m_oldvalue).toFixed(3));
        }
    }
    else {
        if (!m_obj[prop]) {
            m_obj[prop] = 0;
            $(this).val("0.000");
        }
    }
}
/* 改变相关运费 */
function changeLsCharge(prop, key) {
    var m_obj = pageVariable.lsChargeTable.getItem(key);

    m_obj[prop] = $(this).val();
    if (!m_obj[prop]) {
        m_obj[prop] = 0;
        $(this).val("0.0000");
    }
}
/* 打开修改物流解决明细的窗体*/
function openModifyLstSoluItemFrm() {

    initLstSoluItemFrm();
    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.lstSoluItemList.getItem(m_key);

    pageVariable.chkGlobalArea.setObj({ globalAreaNames: m_obj.GlobalAreaNames, globalArea_Ids: m_obj.LstAreaIds });
    $("#txtMinAvaiTime").val(m_obj.MinAvaiTime);
    $("#txtMaxAvaiTime").val(m_obj.MaxAvaiTime);
    $("#txtLstSolutionItemName").val(m_obj.LstSolutionItemName);

    pageVariable.lsChargeTable.bindDataSource(m_obj.Charges);

    pageVariable.handlerLstSoluItemFrm.lstsolutionitem_id = m_key;
    pageVariable.handlerLstSoluItemFrm.action = "Modify";
    pageVariable.handlerLstSoluItemFrm.setTitle(mlm.C0061 + mlm.C0818);
}
/* 打开删除物流解决明细的窗体 */
function openDelLstSoluItemFrm() {
    if (!pageVariable.delLstSoluItemFrm) {
        pageVariable.delLstSoluItemFrm = new uicontrol.confirmDelete(deleteLstSoluItem);
    }

    pageVariable.delLstSoluItemFrm.lstsolutionitem_id = $(this).attr("tag");
    var m_obj = pageVariable.lstSoluItemList.getItem(pageVariable.delLstSoluItemFrm.lstsolutionitem_id);

    pageVariable.delLstSoluItemFrm.showConfirm(mlm.C0464 + mlm.C0818 + "(" + m_obj.GlobalAreaNames + ")?");
}
/* 检测重复区域 */
function checkAndHandlerArea(m_lstsoluitem) {
    var m_areaObj = pageVariable.chkGlobalArea.getObj();
    m_lstsoluitem.LstAreaIds = m_areaObj.globalArea_Ids.split(',');

    var isBreak = false;
    var m_areaNameArr = m_areaObj.globalAreaNames.split(",");
    var m_areaDict = new datastruct.dictionary();
    var i = 0;
    $.each(m_lstsoluitem.LstAreaIds, function () {
        m_areaDict.setItem(this, m_areaNameArr[i]);
        i++;
    });

    if (m_areaObj.globalArea_Ids) {
        $.each(pageVariable.lstSoluItemList.dataSource.items.arrValues, function () {
            if (this.LstSolutionItem_Id != m_lstsoluitem.LstSolutionItem_Id) {

                if (isBreak || (m_lstsoluitem.LstAreaIds.length > 0 && (this.LstAreaIds.length == 0 || !this.LstAreaIds[0]))) {
                    pageframe.control.alertDialog.showAlertInfo(mlm.C0997);
                    isBreak = true;
                }

                if (!isBreak) {
                    $.each(this.LstAreaIds, function () {
                        if (isBreak || m_areaDict.containKey(this.toString())) {
                            pageframe.control.alertDialog.showAlertInfo(mlm.C0291 + "(" + $.trim(m_areaDict.getItem(this.toString())) + ")" + mlm.C0819);
                            isBreak = true;
                        }
                    });
                }
            }
        });
    }
    else {
        if (pageVariable.handlerLstSoluItemFrm.action == "New") {
            if (pageVariable.lstSoluItemList.dataSource.items.arrValues.length > 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C0820);
                isBreak = true;
            }
        }
        else {
            if (pageVariable.lstSoluItemList.dataSource.items.arrValues.length > 1) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C0820);
                isBreak = true;
            }
        }
    }

    if (m_areaObj.globalAreaNames) {
        m_lstsoluitem.GlobalAreaNames = m_areaObj.globalAreaNames;
    }
    else {
        m_lstsoluitem.GlobalAreaNames = mlm.C0421;
    }

    if (isBreak) {
        return true;
    }

    return false;
}
/* 保存物流解决明细 */
function saveLstSoluItem(){

    if (pageVariable.handlerLstSoluItemFrm.action == "New") {
        var m_lstsoluitem = {};

        if (checkAndHandlerArea(m_lstsoluitem)) {
            return;
        }

        m_lstsoluitem.MinAvaiTime = $("#txtMinAvaiTime").val();
        if (!m_lstsoluitem.MinAvaiTime) {
            m_lstsoluitem.MinAvaiTime = 0;
        }
        m_lstsoluitem.MaxAvaiTime = $("#txtMaxAvaiTime").val();
        if (!m_lstsoluitem.MaxAvaiTime) {
            m_lstsoluitem.MaxAvaiTime = 0;
        }
        m_lstsoluitem.LstSolutionItemName = $.trim($("#txtLstSolutionItemName").val());
        var m_fstLstCharge = pageVariable.lsChargeTable.dataSource.items.arrValues[0];
        m_lstsoluitem.StartWeight = m_fstLstCharge.StartWeight;
        m_lstsoluitem.StartWeightCharge = m_fstLstCharge.IncreaseWeightCharge;
        m_lstsoluitem.OtherItemCharge = m_fstLstCharge.OtherItemCharge;
        var m_lschargelen = pageVariable.lsChargeTable.dataSource.items.count;
        m_lstsoluitem.WeightLimit = pageVariable.lsChargeTable.dataSource.items.arrValues[m_lschargelen - 1].WeightLimit;
        m_lstsoluitem.Charges = pageVariable.lsChargeTable.dataSource.items.arrValues;

        if (pageVariable.handlerLstSolutionFrm.action == "New") {

            m_lstsoluitem.LstSolutionItem_Id = pageVariable.handlerLstSolutionFrm.maxItemKey;
            pageVariable.lstSoluItemList.addData(m_lstsoluitem.LstSolutionItem_Id, m_lstsoluitem);

            pageVariable.handlerLstSolutionFrm.maxItemKey++;
            pageVariable.handlerLstSoluItemFrm.close();
        }
        else {
            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.LstSolution_Id = pageVariable.handlerLstSolutionFrm.lstsolution_id;
            m_lstsolution = $.extend(m_lstsolution, m_lstsoluitem);
            m_lstsolution.newLstSolutionItem(function (retObj) {
                retObj.GlobalAreaNames = m_lstsolution.GlobalAreaNames;
                retObj.LstSolutionItemName = m_lstsolution.LstSolutionItemName;

                var m_fstLstCharge = retObj.Charges[0];
                retObj.StartWeight = m_fstLstCharge.StartWeight;
                retObj.StartWeightCharge = m_fstLstCharge.IncreaseWeightCharge;
                retObj.OtherItemCharge = m_fstLstCharge.OtherItemCharge;
                var m_lastLstCharge = retObj.Charges[retObj.Charges.length - 1];
                retObj.WeightLimit = m_lastLstCharge.WeightLimit;

                $.each(retObj.Charges, function () {
                    this.islastitem = false;
                });
                m_lastLstCharge.islastitem = true;
                pageVariable.lstSoluItemList.addData(retObj.LstSolutionItem_Id, retObj);
            });

            pageVariable.handlerLstSoluItemFrm.close();
        }
    }
    else {
        var m_lstsoluitem = pageVariable.lstSoluItemList.getItem(pageVariable.handlerLstSoluItemFrm.lstsolutionitem_id);

        if (checkAndHandlerArea(m_lstsoluitem)) {
            return;
        }

        m_lstsoluitem.MinAvaiTime = $("#txtMinAvaiTime").val();
        if (!m_lstsoluitem.MinAvaiTime) {
            m_lstsoluitem.MinAvaiTime = 0;
        }
        m_lstsoluitem.MaxAvaiTime = $("#txtMaxAvaiTime").val();
        if (!m_lstsoluitem.MaxAvaiTime) {
            m_lstsoluitem.MaxAvaiTime = 0;
        }
        m_lstsoluitem.LstSolutionItemName = $.trim($("#txtLstSolutionItemName").val());
        var m_fstLstCharge = pageVariable.lsChargeTable.dataSource.items.arrValues[0];
        m_lstsoluitem.StartWeight = m_fstLstCharge.StartWeight;
        m_lstsoluitem.StartWeightCharge = m_fstLstCharge.IncreaseWeightCharge;
        m_lstsoluitem.OtherItemCharge = m_fstLstCharge.OtherItemCharge;
        var m_lschargelen = pageVariable.lsChargeTable.dataSource.items.count;
        m_lstsoluitem.WeightLimit = pageVariable.lsChargeTable.dataSource.items.arrValues[m_lschargelen - 1].WeightLimit;
        m_lstsoluitem.Charges = pageVariable.lsChargeTable.dataSource.items.arrValues;

        if (pageVariable.handlerLstSolutionFrm.action == "New") {

            pageVariable.lstSoluItemList.modifyData(m_lstsoluitem.LstSolutionItem_Id, m_lstsoluitem);

            pageVariable.handlerLstSolutionFrm.maxItemKey++;
            pageVariable.handlerLstSoluItemFrm.close();
        }
        else {
            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution = $.extend(m_lstsolution, m_lstsoluitem);
            m_lstsolution.LstAreaIds = m_lstsolution.LstAreaIds.join(",");
            m_lstsolution.modifyLstSolutionItem(function () {
                pageVariable.lstSoluItemList.modifyData(m_lstsoluitem.LstSolutionItem_Id, m_lstsoluitem);
                pageVariable.handlerLstSoluItemFrm.close();
            });
        }
    }
}
/* 删除物流解决明细 */
function deleteLstSoluItem() {

    if (pageVariable.handlerLstSolutionFrm.action == "New") {
        pageVariable.lstSoluItemList.deleteData(pageVariable.delLstSoluItemFrm.lstsolutionitem_id);

        pageVariable.delLstSoluItemFrm.close();
    }
    else {
        var m_lstsolution = new lstm.lstsolution();
        m_lstsolution.LstSolutionItem_Id = pageVariable.delLstSoluItemFrm.lstsolutionitem_id;
        m_lstsolution.deleteLstSolutionItem(function () {
            pageVariable.lstSoluItemList.deleteData(pageVariable.delLstSoluItemFrm.lstsolutionitem_id);
            pageVariable.delLstSoluItemFrm.close();
        });
    }
}
/* 添加详细运费 */
function addLsCharge() {

    var m_lastlscharge = null;
    var m_len = pageVariable.lsChargeTable.dataSource.items.arrValues.length;
    if (m_len > 0) {
        m_lastlscharge = pageVariable.lsChargeTable.dataSource.items.arrValues[m_len - 1];
    }

    var m_lscharge = {};
    m_lscharge.LstSolution_Id = 0;
    m_lscharge.LstSolutionItem_Charge_Id = pageVariable.handlerLstSoluItemFrm.__key;
    m_lscharge.LstSolutionItem_Id = 0;
    m_lscharge.WeightLimit = 2;

    var m_lstSoluType = $("#ddlLstSoluType").val();
    if (m_lstSoluType == "2" || m_lstSoluType == "4") {
        m_lscharge.IncreaseWeight = 0.5;
    }
    else if (m_lstSoluType == "3") {
        m_lscharge.IncreaseWeight = 1;
    }
    else {
        m_lscharge.IncreaseWeight = 0.001;
    }

    m_lscharge.IncreaseWeightCharge = 0;
    m_lscharge.OtherItemCharge = 0;
    m_lscharge.islastitem = true;
    if (m_lastlscharge) {
        m_lscharge.StartWeight = m_lastlscharge.WeightLimit;
        m_lscharge.WeightLimit = Math.round(Number(m_lastlscharge.WeightLimit) * 1000 + Number(m_lastlscharge.IncreaseWeight) * 1000) / 1000;
        m_lastlscharge.islastitem = false;
        pageVariable.lsChargeTable.modifyData(m_lastlscharge.LstSolutionItem_Charge_Id, m_lastlscharge);
    }
    else {
        m_lscharge.StartWeight = 0;
    }

    pageVariable.lsChargeTable.addData(m_lscharge.LstSolutionItem_Charge_Id, m_lscharge);
    pageVariable.handlerLstSoluItemFrm.__key++;
}
/* 删除详细运费 */
function deleteLsCharge(key) {
    var m_lastlscharge = null;
    var m_len = pageVariable.lsChargeTable.dataSource.items.arrValues.length - 1;
    if (m_len > 0) {
        m_lastlscharge = pageVariable.lsChargeTable.dataSource.items.arrValues[m_len - 1];
    }

    pageVariable.lsChargeTable.deleteData(key);

    if (m_lastlscharge) {
        m_lastlscharge.islastitem = true;
        pageVariable.lsChargeTable.modifyData(m_lastlscharge.LstSolutionItem_Charge_Id, m_lastlscharge);
    }
}

/* 计费模式改变事件 */
function changeLstCalculate() {
    var m_calculateModel = $(this).val();

    if (m_calculateModel == "2") {
        $("#dvVolumnArea").show();
    }
    else {
        $("#dvVolumnArea").hide();
    }
}

/* 加载物流合作公司 */
function loadLstCompanies(event) {
    if (!pageVariable.lstCompanyList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 4;
        pageVariable.lstCompanyList = new uicontrol.tableList("lstCompanyList",
                                     { autoSeq: true,
                                         keyColumn: "LstCompany_Id",
                                         height: mainFormHeight,
                                         columns: [{ display: mlm.C0816, name: "LstCompanyName", width: 300, align: 'left' },
                                                   { display: mlm.C0817, name: "WebAddress", width: 300, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, modifiedFunc: "openModifyLstCompanyFrm", deletedFunc: "openDelLstCompanyFrm"}]
                                     });
    }

    if (!pageVariable.lstCompanySource) {
        var m_lstcompany = new lstm.lstcompany();
        m_lstcompany.getAllLstCompanys(function (retTable) {

            pageVariable.lstCompanySource = {};
            pageVariable.lstCompanySource.table = retTable;
            pageVariable.lstCompanySource.objList = datastruct.convertion.tableToJson(retTable);

            pageVariable.lstCompanyList.bindDataSource(retTable);

            if (event) {
                event();
            }
        });
    }
    else {
        pageVariable.lstCompanyList.bindDataSource(pageVariable.lstCompanySource.table);
    }
}
/* 加载物流合作公司选项 */
function loadLstCompanyOptions(lstCompanyCtrl, event, isNeedEmpty) {

    if (!pageVariable.lstCompanySource) {

        loadLstCompanies(function () {

            lstCompanyCtrl.empty();

            if (isNeedEmpty) {
                lstCompanyCtrl.append("<option></option>");
            }

            $.each(pageVariable.lstCompanySource.objList, function () {
                lstCompanyCtrl.append("<option value='" + this.LstCompany_Id + "'>" + this.LstCompanyName + "</option>");
            });

            if (event) {
                event();
            }

            if (pageVariable.handlerLstSolutionFrm) {
                pageVariable.handlerLstSolutionFrm.loadobj_event++;
            }
        });
    }
    else {
        if (lstCompanyCtrl.find("option").length == 0) {

            if (isNeedEmpty) {
                lstCompanyCtrl.append("<option></option>");
            }
            $.each(pageVariable.lstCompanySource.objList, function () {
                lstCompanyCtrl.append("<option value='" + this.LstCompany_Id + "'>" + this.LstCompanyName + "</option>");
            });
        }

        if (pageVariable.handlerLstSolutionFrm) {
            pageVariable.handlerLstSolutionFrm.loadobj_event++;
        }
    }

    if (event) {
        event();
    }
}

/* 打开新增物流公司的窗体 */
function openNewLstCompanyFrm() {
    if (!pageVariable.handlerLstCompanyFrm) {
        pageVariable.handlerLstCompanyFrm = new uicontrol.dialog("handlerLstCompanyFrm", "", { width: 800, position: ["auto", 5] }, saveLstCompanyFrm);
    }

    $("#txtSeq").attr("disabled", "disabled").val(mlm.C0142);
    $("#txtLstCompanyName").val("");
    $("#txtWebAddress").val("");

    pageVariable.handlerLstCompanyFrm.lstcompany_id = 0;
    pageVariable.handlerLstCompanyFrm.action = "New";
    pageVariable.handlerLstCompanyFrm.setTitle(mlm.C0461 + mlm.C0816);
    pageVariable.handlerLstCompanyFrm.show();
}
/* 打开修改物流公司的窗体 */
function openModifyLstCompanyFrm() {
    if (!pageVariable.handlerLstCompanyFrm) {
        pageVariable.handlerLstCompanyFrm = new uicontrol.dialog("handlerLstCompanyFrm", "", { width: 800, position: ["auto", 5] }, saveLstCompanyFrm);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.lstCompanyList.getItem(m_key);

    $("#txtLstCompanyName").val(m_obj.LstCompanyName);
    $("#txtWebAddress").val(m_obj.WebAddress);
    $("#txtSeq").attr("disabled", null).val(m_obj.Seq);

    pageVariable.handlerLstCompanyFrm.lstcompany_id = m_key;
    pageVariable.handlerLstCompanyFrm.action = "Modify";
    pageVariable.handlerLstCompanyFrm.setTitle(mlm.C0061 + mlm.C0816);
    pageVariable.handlerLstCompanyFrm.show();
}
/* 打开删除物流公司的窗体 */
function openDelLstCompanyFrm() {
    if (!pageVariable.delLstCompanyFrm) {
        pageVariable.delLstCompanyFrm = new uicontrol.confirmDelete(deleteLstCompany);
    }

    pageVariable.delLstCompanyFrm.lstcompany_id = $(this).attr("tag");
    var m_obj = pageVariable.lstCompanyList.getItem(pageVariable.delLstCompanyFrm.lstcompany_id);

    pageVariable.delLstCompanyFrm.showConfirm(mlm.C0464 + mlm.C0816 + "（" + m_obj.LstCompanyName + "）?");
}
/* 保存物流公司 */
function saveLstCompanyFrm() {

    var m_lstCompanyName = $.trim($("#txtLstCompanyName").val());
    if (!m_lstCompanyName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0816 + mlm.C0451);
        return;
    }

    var m_lstcompany = new lstm.lstcompany();
    m_lstcompany.LstCompany_Id = pageVariable.handlerLstCompanyFrm.lstcompany_id;
    m_lstcompany.LstCompanyName = m_lstCompanyName;
    m_lstcompany.WebAddress = $.trim($("#txtWebAddress").val());

    if (pageVariable.handlerLstCompanyFrm.action == "New") {
        m_lstcompany.newLstCompany(function (retObj) {
            pageVariable.lstCompanyList.addData(retObj.LstCompany_Id, retObj);

            pageVariable.lstCompanySource = null;
            pageVariable.handlerLstCompanyFrm.close();
        });
    }
    else {
        var m_oldSeq = pageVariable.lstCompanyList.getItem(pageVariable.handlerLstCompanyFrm.lstcompany_id).Seq;
        m_lstcompany.Seq = $.trim($("#txtSeq").val());

        m_lstcompany.modifyLstCompany(function () {

            pageVariable.lstCompanySource = null;

            if (m_oldSeq == m_lstcompany.Seq) {
                pageVariable.lstCompanyList.modifyData(m_lstcompany.LstCompany_Id, m_lstcompany);
            }
            else {
                loadLstCompanies();
            }

            pageVariable.handlerLstCompanyFrm.close();
        });
    }
}
/* 删除物流公司 */
function deleteLstCompany() {
    var m_lstcompany = new lstm.lstcompany();
    m_lstcompany.LstCompany_Id = pageVariable.delLstCompanyFrm.lstcompany_id;
    m_lstcompany.deleteLstCompany(function () {
        pageVariable.lstCompanyList.deleteData(m_lstcompany.LstCompany_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        pageVariable.lstCompanySource = null;
        pageVariable.delLstCompanyFrm.close();
    });
}

/* 加载国家税务 */
function loadConutryTax() {
    if (!pageVariable.countryTaxList) {
        
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
        pageVariable.countryTaxList = new uicontrol.tableList("countryTaxList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "GlobalArea_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryCountryTax,
                                         columns: [{ display: mlm.C0240, name: "GlobalAreaName", width: 150, align: 'left' },
                                                   { display: mlm.C0821, name: "TaxLimit", width: 120, align: 'left', adjust: true, createCell: constructTaxLimitCell },
                                                   { display: mlm.C0073, name: "Remark", width: 500, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: constructOperaCell}]
                                     });
    }

    if (!pageVariable.countryTaxSource) {
        queryCountryTax(1, pageVariable.countryTaxList.pageNumber)
    }
}
/* 分页查询国家税务 */
function queryCountryTax(page, pagenum) {
    var m_countrytax = new lstm.countrytax();
    m_countrytax.Page = page;
    m_countrytax.PageNum = pagenum;
    m_countrytax.getAllCountryTaxs(function (retTable) {
        pageVariable.countryTaxSource = retTable;
        pageVariable.countryTaxList.bindDataSource(retTable);
    });
}
/* 构建征税临界点列 */
function constructTaxLimitCell(key, cellvalue) {
    var m_obj = pageVariable.countryTaxList.getItem(key);

    return commoncore.func.getCurrHtml(m_obj.CurrSymbol, cellvalue);
}
/* 构建设置列 */
function constructOperaCell(key, cellvalue) {
    return "<a onclick='openSetCountryTaxFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0611 + "</a>";
}
/* 打开设置税务的窗体 */
function openSetCountryTaxFrm(key) {
    if (!pageVariable.handlerCountryTaxFrm) {
        pageVariable.handlerCountryTaxFrm = new uicontrol.dialog("handlerCountryTaxFrm", mlm.C0611 + mlm.C0822, { width: 800, position: ["auto", 15] }, saveCountryTax);
    }

    var m_obj = pageVariable.countryTaxList.getItem(key);
    loadCurrOptions($("#ddlTaxCurr"), function () {
        if (m_obj.TaxLimit) {
            $("#txtCountryTax").val(m_obj.TaxLimit);
        }
        else {
            $("#txtCountryTax").val("0");
        }

        if (m_obj.SysCurrency_Id) {
            $("#ddlTaxCurr").val(m_obj.SysCurrency_Id);
        }
        $("#txtCTRemark").val(m_obj.Remark);
    });

    pageVariable.handlerCountryTaxFrm.globalarea_id = m_obj.GlobalArea_Id;
    pageVariable.handlerCountryTaxFrm.globalareaname = m_obj.GlobalAreaName;
    pageVariable.handlerCountryTaxFrm.countrytax_id = m_obj.CountryTax_Id;
    pageVariable.handlerCountryTaxFrm.setTitle(mlm.C0611 + mlm.C0822 + "(" + m_obj.GlobalAreaName + ")");
    pageVariable.handlerCountryTaxFrm.show();
}
/* 保存税务 */
function saveCountryTax() {

    var m_countrytax = new lstm.countrytax();
    m_countrytax.GlobalArea_Id = pageVariable.handlerCountryTaxFrm.globalarea_id;
    m_countrytax.GlobalAreaName = pageVariable.handlerCountryTaxFrm.globalareaname;
    m_countrytax.TaxLimit = $("#txtCountryTax").val();

    var m_currCtrl = $("#ddlTaxCurr");
    var m_currSelectedOption = m_currCtrl.find("option:selected");
    m_countrytax.SysCurrency_Id = m_currCtrl.val();
    m_countrytax.CurrSymbol = m_currSelectedOption.attr("tag");

    m_countrytax.Remark = $.trim($("#txtCTRemark").val());
    if (!pageVariable.handlerCountryTaxFrm.countrytax_id || pageVariable.handlerCountryTaxFrm.countrytax_id == "0") {
        m_countrytax.newCountryTax(function (retObj) {
            m_countrytax.CountryTax_Id = retObj.CountryTax_Id;

            pageVariable.countryTaxList.modifyData(m_countrytax.GlobalArea_Id, m_countrytax);
            pageVariable.handlerCountryTaxFrm.close();
        });
    }
    else {
        m_countrytax.CountryTax_Id = pageVariable.handlerCountryTaxFrm.countrytax_id;
        m_countrytax.modifyCountryTax(function () {
            pageVariable.countryTaxList.modifyData(m_countrytax.GlobalArea_Id, m_countrytax);
            pageVariable.handlerCountryTaxFrm.close();
        });
    }
}

/* 获取所有货币 */
function loadCurrOptions(currencyCtrl, event) {

    if (currencyCtrl.find("option").length == 0) {
        if (!pageVariable.currsSource) {

            var syscurrency = new othm.syscurrency();
            syscurrency.getAllSysCurrencys(function (source) {
                pageVariable.currsSourc = datastruct.convertion.tableToJson(source);
                $.each(pageVariable.currsSourc, function () {
                    currencyCtrl.append("<option value='" + this.SysCurrency_Id + "' tag='" + this.CurrSymbol + "'>" + this.CurrName + "</option>");
                });

                if (pageVariable.handlerLstSolutionFrm) {
                    pageVariable.handlerLstSolutionFrm.loadobj_event++;
                }

                if (event) {
                    event();
                }
            });
        }
        else {
            $.each(pageVariable.currSource, function () {
                currencyCtrl.append("<option value='" + this.SysCurrency_Id + "' tag='" + this.CurrSymbol + "'>" + this.CurrName + "</option>");
            });

            if (pageVariable.handlerLstSolutionFrm) {
                pageVariable.handlerLstSolutionFrm.loadobj_event++;
            }

            if (event) {
                event();
            }
        }
    }
    else {
        if (pageVariable.handlerLstSolutionFrm) {
            pageVariable.handlerLstSolutionFrm.loadobj_event++;
        }

        if (event) {
            event();
        }
    }
}
/* 获取所有重量单位 */
function loadWUnitOptions(wunitCtrl) {

    if (wunitCtrl.find("option").length == 0) {
        if (!pageVariable.wunitSource) {

            var m_syskeyparam = new spm.syskeyparam();
            m_syskeyparam.getWeightUnits(function (source) {
                pageVariable.wunitSource = datastruct.convertion.tableToJson(source);
                $.each(pageVariable.wunitSource, function () {
                    wunitCtrl.append("<option value='" + this.SysWeightUnit_Id + "'>" + this.WUnit + "</option>");
                });

                if (pageVariable.handlerLstSolutionFrm) {
                    pageVariable.handlerLstSolutionFrm.loadobj_event++;
                }
            });
        }
        else {
            $.each(pageVariable.wunitSource, function () {
                wunitCtrl.append("<option value='" + this.SysWeightUnit_Id + "'>" + this.WUnit + "</option>");
            });

            if (pageVariable.handlerLstSolutionFrm) {
                pageVariable.handlerLstSolutionFrm.loadobj_event++;
            }
        }
    }
    else {
        if (pageVariable.handlerLstSolutionFrm) {
            pageVariable.handlerLstSolutionFrm.loadobj_event++;
        }
    }
}
/* 获取所有销售平台 */
function loadSalePlatformOptions(event) {

    if (!pageVariable.saleplatforms) {
        var m_saleplatform = new sm.saleplatform();
        m_saleplatform.querySalePlatforms(function (retTable) {
            pageVariable.saleplatforms = datastruct.convertion.tableToJson(retTable);
            var items = [];
            $.each(pageVariable.saleplatforms, function () {
                items.push({ key: this.SalePlatform_Id, value: this.SPfName });
            });
            pageVariable.ulSalePlatforms.bindSource(items);

            if (event) {
                event();
            }

            if (pageVariable.handlerLstSolutionFrm) {
                pageVariable.handlerLstSolutionFrm.loadobj_event++;
            }
        });
    }
    else {
        if (event) {
            event();
        }

        if (pageVariable.handlerLstSolutionFrm) {
            pageVariable.handlerLstSolutionFrm.loadobj_event++;
        }
    }
}
/* 获取出货仓库 */
function loadWarehouseOptions() {
    if (!pageVariable.warehouseSource) {
        var m_warehouse = new whm.warehouse();
        m_warehouse.getAllWarehouses(function (source) {

            pageVariable.warehouseSource = source;
            var items = [];
            var m_jsonobjs = datastruct.convertion.tableToJson(source);
            $.each(m_jsonobjs, function () {
                items.push({ key: this.Warehouse_Id, value: this.WarehouseName });
            });
            pageVariable.ulWarehouses.bindSource(items);

            pageVariable.handlerLstSolutionFrm.loadobj_event++;
        });
    }
    else {
        pageVariable.handlerLstSolutionFrm.loadobj_event++;
    }
}

/* 查看物流解决方案窗体 */
function openViewLstSolution(key) {
    pageVariable.viewLstSolutionFrm.show(key);
}

/* 导出运费 */
function exportLstSolutionPrice() {
    var m_lstsolution = new lstm.lstsolution();
    m_lstsolution.LstSolution_Id = pageVariable.handlerLstSolutionFrm.lstsolution_id;
    m_lstsolution.exportLstSolutionPrice(function (paramObj) {
                                               window.open(paramObj);
                                           });
}
/* 导出测算运费 */
function exportLstCharges() {

    if (!pageVariable.calculateParam || !pageVariable.calculateParam.Weight) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0996);
        return;
    }

    var m_lstsolution = new lstm.lstsolution(); 
    m_lstsolution.Weight = pageVariable.calculateParam.Weight;
    m_lstsolution.SysWeightUnit_Id = pageVariable.calculateParam.SysWeightUnit_Id;
    m_lstsolution.SysWUnit = pageVariable.calculateParam.SysWUnit;
    m_lstsolution.Length = pageVariable.calculateParam.CLength;
    m_lstsolution.Width = pageVariable.calculateParam.Length;
    m_lstsolution.Height = pageVariable.calculateParam.Height;
    m_lstsolution.SysCurrency_Id = pageVariable.calculateParam.SysCurrency_Id;
    m_lstsolution.SysCurrSymbol = pageVariable.calculateParam.SysCurrSymbol;
    m_lstsolution.Tax = pageVariable.calculateParam.Tax;
    m_lstsolution.TaxSysCurrency_Id = pageVariable.calculateParam.TaxSysCurrency_Id;
    m_lstsolution.TaxSysCurrSymbol = pageVariable.calculateParam.TaxSysCurrSymbol;
    m_lstsolution.GlobalAreaIds = pageVariable.calculateParam.GlobalAreaIds;
    m_lstsolution.LstSolutionIds = pageVariable.calculateParam.LstSolutionIds;
    if (pageVariable.selectWH) {
        m_lstsolution.Warehouse_Id = pageVariable.selectWH.warehouse_id;
    }
    m_lstsolution.exportLstCharges(function (paramObj) {
        window.open(paramObj);
    });
}

/* 打开导入运费的窗体 */
function openImpLstSolutionPriceFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", mlm.C0986 + mlm.C0807, { width: 800 }, importLstSolutionPrice);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.show();
}
/* 导入运费 */
function importLstSolutionPrice() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    var mfunc = function (retObj) {
        if (retObj) {
            window.open(retObj);
        }

        //展示进度
        pageframe.control.processCtrl.showOperaProcess();

        m_lstsolution.getLstSolutionItems(function (retObj) {
            var m_items = retObj;
            $.each(m_items, function () {
                if (this.OtherProps.GlobalAreaNames) {
                    this.GlobalAreaNames = this.OtherProps.GlobalAreaNames;
                }
                else {
                    this.GlobalAreaNames = mlm.C0421;
                }
            });

            $.each(m_items, function () {
                var m_fstLstCharge = this.Charges[0];
                this.StartWeight = m_fstLstCharge.StartWeight;
                this.StartWeightCharge = m_fstLstCharge.IncreaseWeightCharge;
                this.OtherItemCharge = m_fstLstCharge.OtherItemCharge;
                var m_lastLstCharge = this.Charges[this.Charges.length - 1];
                this.WeightLimit = m_lastLstCharge.WeightLimit;

                $.each(this.Charges, function () {
                    this.islastitem = false;
                });
                m_lastLstCharge.islastitem = true;
            });

            pageVariable.lstSoluItemList.bindDataSource(m_items);

            //隐藏进度
            pageframe.control.processCtrl.hideOperaProcess();
        });

        pageVariable.handlerImportFrm.close();
    };

    var m_lstsolution = new lstm.lstsolution();
    m_lstsolution.LstSolution_Id = pageVariable.handlerLstSolutionFrm.lstsolution_id;
    m_lstsolution.importLstSolutionPrice(pageVariable.importFile, mfunc);
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 资费查询 */
    $("#lbLstCharge").text(mlm.C0818 + mlm.C0562);
    /* 物流解决方案 */
    $("#lbLstSolution").text(mlm.M0053);
    /* 物流合作公司 */
    $("#lbLstCompany").text(mlm.C0824);
    /* 国家税务信息 */
    $("#lbConutryTax").text(mlm.C0825);
    /* 资费列表 */
    $("#lbLstChargeTitle").text(mlm.C0818 + mlm.C0463);
    /* 资费测算 */
    $("#btCalCharge").val(mlm.C0812);
    /* 物流解决方案列表 */
    $("#lbLstSolutionTitle").text(mlm.M0053 + mlm.C0463);
    /* 新增解决方案 */
    $("#btNewLstSolution").val(mlm.C0461 + mlm.C0783);
    /* 新增物流公司 */
    $("#btNewLstCompany").val(mlm.C0461 + mlm.C0816);
    /* 物流公司列表 */
    $("#lbLstCompanyTitle").text(mlm.C0816 + mlm.C0463);
    /* 国家税务列表 */
    $("#lbCountryTaxTitle").text(mlm.C0822 + mlm.C0463);
    /* 物流公司 */
    $("#lbLstCompanyNameSymbol").text(mlm.C0816 + ":");
    /* 序号 */
    $("#lbSeqSymbol").text(mlm.C0041 + ":");
    /* 官方网站 */
    $("#lbWebAddressSymbol").text(mlm.C0817 + ":");
    /* 基本信息 */
    $("#lbLstSoluInfoSymbol").text(mlm.C0781);
    /* 详细运费信息 */
    $("#lbLstSoluChargeSymbol").text(mlm.C0782);
    /* 解决方案 */
    $("#lbLstSolutionSymbol").text(mlm.C0783 + ":");
    /* 合作公司 */
    $("#lbLstCompanySymbol").text(mlm.C0784 + ":");
    /* 快递类型 */
    $("#lbLstSoluTypeSymbol").text(mlm.C0785 + ":");
    /* 计费模式 */
    $("#lbCalculateSymbol").text(mlm.C0786 + ":");
    /* 重量单位 */
    $("#lbWUnit").text(mlm.C0669 + ":");
    /* 货币 */
    $("#lbESCurrSymbol").text(mlm.C0131 + ":");
    /* 其他费用 */
    $("#lbOtherItemChargeSymbol").text(mlm.C0789 + ":");
    /* 体积重量换算 */
    $("#lbVolumnWeightSymbol").text(mlm.C0790 + ":");
    /* 长(cm)*宽(cm)*高(cm) */
    $("#lbVolumn_1").text(mlm.C0791);
    /* 物流进度查询 */
    $("#lbTrackWebSymbol").text(mlm.C0792 + ":");
    /* VAT起征点 */
    $("#lbVATTaxLimitSymbol").text(mlm.C0989 + ":");
    /* VAT货币 */
    $("#lbVATCurrSymbol").text(mlm.C0827 + ":");
    /* VAT税率 */
    $("#lbVATValueSymbol").text(mlm.C0988 + ":");
    /* 运费列表 */
    $("#lbLstSoluItemTitle").text(mlm.C0807 + mlm.C0463);
    /* 添加资费 */
    $("#btAddLstSoluItem").val(mlm.C0530 + mlm.C0818);
    /* 目的地 */
    $("#lbGlobalAreaSymbol, #lbCalGlobalAreaSymbol").text(mlm.C0291 + ":");
    /* 如果以下区域为空，则默认为全球 */
    $("#lbAreaAlertSymbol, #lbAreaAlertSymbol_1").text(mlm.C0828);
    /* 首重运费 */
    $("#lbStWeightChargeSymbol").text(mlm.C0444 + ":");
    /* 续重运费 */
    $("#lbIncreaWeightChargeSymbol").text(mlm.C0797 + ":");
    /* 重量限制 */
    $("#lbWeightLimitSymbol").text(mlm.C0798 + ":");
    /* 参考时效 */
    $("#lbAvaiTimeSymbol").text(mlm.C0799 + ":");
    /* (工作日) */
    $("#lbDaySymbol").text("(" + mlm.C0983 + ")");
    /* 包裹重量 */
    $("#lbCalWeightSymbol").text(mlm.C0829 + ":");
    /* 体积(cm³) */
    $("#lbVolumnSymbol").text(mlm.C1031 + "(cm³)" + ":");
    /* 长 */
    $("#lbLengthSymbol").text(mlm.C0831);
    /* 宽 */
    $("#lbWeightSymbol").text(mlm.C0832);
    /* 高 */
    $("#lbHeightSymbol").text(mlm.C0833);
    /* 测算货币 */
    $("#lbCalCurrSymbol").text(mlm.C0834 + ":");
    /* 报关价值 */
    $("#lbLtsValueSymbol").text(mlm.C0835 + ":");
    /* 物流解决方案 */
    $("#lbCalLstSolutionSymbol").text(mlm.M0053 + ":");
    /* 如果以下为空，则默认为所有解决方案 */
    $("#lbSoluAlertSymbol").text(mlm.C0837);
    /* 征税临界点 */
    $("#lbCountryTaxSymbol").text(mlm.C0821 + ":");
    /* 货币 */
    $("#lbTaxCurrSymbol").text(mlm.C0131 + ":");
    /* 备注 */
    $("#lbCTRemarkSymbol").text(mlm.C0073 + ":");
    /* 注意事项 */
    $("#lbLstSoluRemarkSymbol").text(mlm.C0840);
    /* 运费列表 */
    $("#lbLsChargeTitle").text(mlm.C0796);
    /* 添加运费 */
    $("#btAddLsCharge").val(mlm.C0530 + mlm.C0807);
    /* 导入运费 */
    $("#btImpLstPriceItem").val(mlm.C0986 + mlm.C0807);
    /* 导出运费 */
    $("#btExpLstPriceItem").val(mlm.C0987 + mlm.C0807);

    /* 导入文件 */
    $("#lbImportFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
    /* 导入模板 */
    $("#lbFileTemplateSymbol").text(mlm.C0754 + ":");
    $("#lkFileTemplate").text(mlm.C0876);

    /* 导出运费 */
    $("#btExportLstCharge").val(mlm.C0987 + mlm.C0807); 
    /* 前端销售平台 */
    $("#lbShopSymbol").text(mlm.C0338 + ":");
    /* 配送中心 */
    $("#lbWarehouseSymbol, #lbWHSymbol").text(mlm.C1274 + ":");
    /* 资费区域 */
    $("#lbLstSolutionItemName").text(mlm.C1268 + ":");

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_3").text(mlm.C0049);

    /* ECMS-物流解决方案 */
    document.title = mlm.C0823;
}