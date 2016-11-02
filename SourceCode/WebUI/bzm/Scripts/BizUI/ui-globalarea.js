
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadAreaList);

/* 页面变量 */
window.pageVariable = { };

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btNewGlobalArea").click(openNewGlobalAreaFrm);
    $("#btModifyGlobalArea").click(openModifyGlobalAreaFrm);
    $("#btDeleteGlobalArea").click(openDelGlobalAreaFrm);
    $("#txtParentAreaName").change(changeParentArea);
    $("#btManageInnerArea").click(openManageInnerAreaFrm);
    $("#btNewGlobalArea, #btModifyGlobalArea, #btDeleteGlobalArea, #btManageInnerArea, #btNewInnerArea, #btModifyInnerArea, #btDeleteInnerArea").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();

    $("#globalAreaFrm").css("height", mainFormHeight - 2);
    $("#dvAllGArea").css("height", mainFormHeight - 120);
}

/* 加载区域列表 */
function loadAreaList() {

    if (!pageVariable.globalAreaSource) {

        pageframe.control.processCtrl.showOperaProcess();

        pageVariable.globalAreaSource = {};

        var globalarea = new othm.globalarea();
        globalarea.queryRegionAndCountries(function (source) {

            pageVariable.globalAreaSource.tableList = source;
            pageVariable.globalAreaSource.objList = datastruct.convertion.tableToJson(source);

            pageVariable.globalAreaTable = new uicontrol.treeView($("#globalAreaTable"), pageVariable.globalAreaSource.tableList, chooseGlobalAres,
                                                        { displayModel: "inline", sourceFormat: "table",
                                                            keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                            constructDisplayTxt: constructGAreaTxt
                                                        });
            pageVariable.globalAreaTable.loadSource();

            var m_importantCount = 0;
            var m_importantCountryCtrl = $("#importantGAreaTable");
            m_importantCountryCtrl.empty();
            $.each(pageVariable.globalAreaSource.objList, function () {
                if (this.IsImportant == "1") {
                    if (Number(this.SonAreaCount) == 0) {
                        m_importantCountryCtrl.append("<li tag='" + this.GlobalArea_Id + "'>" + this.GlobalAreaName + "</li>");
                    }
                    else {
                        m_importantCountryCtrl.append("<li tag='" + this.GlobalArea_Id + "'>" + this.GlobalAreaName + "(" + this.SonAreaCount + ")" + "</li>");
                    }

                    m_importantCount++;
                }
            });

            /* 单击事件 */
            $("#importantGAreaTable").find("li").click(function () {
                var m_thisobj = $(this);
                m_importantCountryCtrl.find("li").removeClass('tv_bt_click');
                m_thisobj.addClass('tv_bt_click');

                pageVariable.selectedTvItem = m_thisobj.attr("tag");
                pageVariable.globalAreaTable.selTvItem(pageVariable.selectedTvItem);
            });

            $("#lbImportsCount").text(m_importantCount);
            $("#lbAllsCount").text(pageVariable.globalAreaSource.objList.length);
            if (pageVariable.selectedTvItem) {
                pageVariable.globalAreaTable.selTvItem(pageVariable.selectedTvItem);
                var m_importantLi = $("#importantGAreaTable").find("li[tag='" + pageVariable.selectedTvItem + "']");
                if (m_importantLi) {
                    m_importantLi.trigger("click");
                }
            }

            pageframe.control.processCtrl.hideOperaProcess();
        });
    }
}
/* 构建区域显示 */
function constructGAreaTxt(objitem) {
    if (Number(objitem.tag.SonAreaCount) == 0) {
        return objitem.tag.GlobalAreaName;
    }
    else {
        return objitem.tag.GlobalAreaName + "(" + objitem.tag.SonAreaCount + ")";
    }
}
/* 选择全球区域 */
function chooseGlobalAres() {
    var m_importantCountryCtrl = $("#importantGAreaTable");
    var m_importantLi = m_importantCountryCtrl.find("li[tag='" + pageVariable.globalAreaTable.selectedItem.tag.GlobalArea_Id + "']");
    if (m_importantLi.length > 0) {
        m_importantLi.trigger("click");
    }
    else {
        m_importantCountryCtrl.find("li").removeClass('tv_bt_click');
    }
    pageVariable.selectedTvItem = pageVariable.globalAreaTable.selectedItem.tag.GlobalArea_Id;
}

/* 初始化处理区域的窗体 */
function initHandlerGlobalAreaFrm(areaObj) {
    if (!pageVariable.handlerGlobalAreaFrm) {
        pageVariable.handlerGlobalAreaFrm = new uicontrol.dialog("handlerGlobalAreaFrm", "", { width: 800 }, saveGlobalArea);
        var m_areaCtrl = $("#ddlAreaType");
        m_areaCtrl.append("<option value='0'>" + mlm.C0780 + "</option>");
        m_areaCtrl.append("<option value='1'>" + mlm.C0240 + "</option>");

        m_areaCtrl.change(changeAreaType);

        pageVariable.chkIsImportant = new uicontrol.selectbox("chkIsImportant", "radio");
        pageVariable.chkIsImportant.bindSource([{ key: "1", value: mlm.C0108 }, { key: "0", value: mlm.C0109}]);
    }
}
/* 打开新增区域的窗体 */
function openNewGlobalAreaFrm() {

    initHandlerGlobalAreaFrm();

    $("#txtAreaName").val("");
    $("#txtGACode").val("");
    pageVariable.chkIsImportant.setSelectedItem([{ key: "0"}]);

    var m_parentAreaCtrl = $("#txtParentAreaName");
    if (pageVariable.globalAreaTable.selectedItem) {
        m_parentAreaCtrl.val(pageVariable.globalAreaTable.selectedItem.value);
        m_parentAreaCtrl.attr("parentAreaId", pageVariable.globalAreaTable.selectedItem.key);
        m_parentAreaCtrl.attr("areatype", pageVariable.globalAreaTable.selectedItem.tag.AreaType)
    }
    else {
        m_parentAreaCtrl.val("");
        m_parentAreaCtrl.attr("parentAreaId", "0");
        m_parentAreaCtrl.attr("areatype", "0");
    }
    m_parentAreaCtrl.attr("disabled", null);

    $("#ddlAreaType").trigger("change");
    pageVariable.handlerGlobalAreaFrm.globalArea_Id = 0;
    pageVariable.handlerGlobalAreaFrm.action = "New";
    pageVariable.handlerGlobalAreaFrm.setTitle(mlm.C0215);
    pageVariable.handlerGlobalAreaFrm.show();
}
/* 打开修改区域的窗体 */
function openModifyGlobalAreaFrm() {

    var m_area = pageVariable.globalAreaTable.selectedItem;
    if (!m_area) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0234);
        return;
    }

    initHandlerGlobalAreaFrm(m_area);

    $("#txtAreaName").val(m_area.value);
    $("#txtGACode").val(m_area.tag.GACode);
    $("#ddlAreaType").val(m_area.tag.AreaType);
    pageVariable.chkIsImportant.setSelectedItem([{ key: m_area.tag.IsImportant}]);
    $("#ddlPY").val(m_area.tag.PYType);

    var m_parentAreaCtrl = $("#txtParentAreaName");
    m_parentAreaCtrl.val(pageVariable.globalAreaTable.getTextValue(m_area.tag.ParentArea_Id));
    m_parentAreaCtrl.attr("parentAreaId", m_area.tag.ParentArea_Id);
    m_parentAreaCtrl.attr("disabled", "disabled");

    $("#ddlAreaType").trigger("change");
    pageVariable.handlerGlobalAreaFrm.globalArea_Id = m_area.key;
    pageVariable.handlerGlobalAreaFrm.action = "Modify";
    pageVariable.handlerGlobalAreaFrm.setTitle(mlm.C0216);
    pageVariable.handlerGlobalAreaFrm.show();
}
/* 打开删除区域的窗体 */
function openDelGlobalAreaFrm() {
    if (!pageVariable.delGlobalAreaFrm) {
        pageVariable.delGlobalAreaFrm = new uicontrol.confirmDelete(deleteGlobalArea);
    }

    if (!pageVariable.globalAreaTable.selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0234);
        return;
    }

    pageVariable.delGlobalAreaFrm.globalArea_Id = pageVariable.globalAreaTable.selectedItem.key;
    pageVariable.delGlobalAreaFrm.showConfirm(mlm.C0235 + "(" + pageVariable.globalAreaTable.selectedItem.value + ") ?");
}
/* 保存区域 */
function saveGlobalArea() {
    var m_areaName = $.trim($("#txtAreaName").val());
    if (!m_areaName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0236);
        return;
    }
    
    var globalarea = new othm.globalarea();
    globalarea.GlobalAreaName = m_areaName;
    globalarea.GlobalArea_Id = pageVariable.handlerGlobalAreaFrm.globalArea_Id;
    globalarea.AreaType = $("#ddlAreaType").val();
    globalarea.IsImportant = pageVariable.chkIsImportant.getSelectedItem()[0];
    globalarea.PYType = $("#ddlPY").val();
    globalarea.GACode = $("#txtGACode").val();

    if (pageVariable.handlerGlobalAreaFrm.action == "New") {

        var m_parentAreaCtrl = $("#txtParentAreaName");
        var m_parentAreaType = m_parentAreaCtrl.attr("areatype");
        if (m_parentAreaType == "1") {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0773);
            return;
        }

        var parentAreaId = m_parentAreaCtrl.attr("parentAreaId");
        if (!parentAreaId) {
            globalarea.ParentArea_Id = 0;
        }
        else {
            globalarea.ParentArea_Id = parentAreaId;
        }

        globalarea.newGlobalArea(function (retObj) {
            pageVariable.globalAreaSource = null;
            loadAreaList();

            pageVariable.handlerGlobalAreaFrm.close();
        });
    }
    else {
        globalarea.modifyGlobalArea(function (obj) {

            pageVariable.globalAreaSource = null;
            loadAreaList();

            pageVariable.handlerGlobalAreaFrm.close();
        });
    }
}
/* 删除区域 */
function deleteGlobalArea() {
    var globalarea = new othm.globalarea();
    globalarea.GlobalArea_Id = pageVariable.delGlobalAreaFrm.globalArea_Id;
    globalarea.deleteGlobalArea(function () {

        pageVariable.globalAreaSource = null;
        loadAreaList();

        pageVariable.delGlobalAreaFrm.close();
    });
}

/* 改变上级区域 */
function changeParentArea() {
    
    var m_this = $(this);

    var m_inputName = m_this.val();

    if (m_inputName) {
        var m_area = null;
        $.each(pageVariable.globalAreaSource.objList, function () {
            if (this.GlobalAreaName.indexOf(m_inputName) > -1) {
                m_area = this;
                return false;
            }
        });

        if (!m_area) {
            pageframe.control.alertDialog.showAlertInfo(m_inputName + mlm.C0233);
            m_this.val("");
            m_this.attr("parentAreaId", "0");
            return;
        }

        m_this.val(m_area.GlobalAreaName);
        m_this.attr("parentAreaId", m_area.ParentArea_Id);
        m_this.attr("areatype", m_area.AreaType);
        $("#ddlAreaType").val(m_area.AreaType);
    }
    else {
        m_this.val("");
        m_this.attr("parentAreaId", "0");
        m_this.attr("areatype", "0");
        $("#ddlAreaType").val("0");
    }
}
function changeInnerParentArea() {

    var m_this = $(this);

    var m_inputName = m_this.val();

    if (m_inputName) {
        var m_area = null;
        $.each(pageVariable.innerAreaTable._sourceObj, function () {
            if (this.tag.GlobalAreaName.indexOf(m_inputName) > -1) {
                m_area = this;
                return false;
            }
        });

        if (!m_area) {
            pageframe.control.alertDialog.showAlertInfo(m_inputName + mlm.C0774);

            m_this.val(pageVariable.globalAreaTable.selectedItem.value);
            m_this.attr("parentAreaId", pageVariable.globalAreaTable.selectedItem.key);
            return;
        }

        m_this.val(m_area.tag.GlobalAreaName);
        m_this.attr("parentAreaId", m_area.tag.ParentArea_Id);
    }
    else {
        m_this.val(pageVariable.globalAreaTable.selectedItem.value);
        m_this.attr("parentAreaId", pageVariable.globalAreaTable.selectedItem.key);
    }
}
/* 改变区域类型 */
function changeAreaType() {
    var m_type = $("#ddlAreaType").val();
    if (m_type == 1) {
        $("#dvAreaImport").show();
    }
    else {
        $("#dvAreaImport").hide();
    }
}

/* 打开维护内部区域的窗体 */
function openManageInnerAreaFrm() {

    var m_area = pageVariable.globalAreaTable.selectedItem;
    if (!m_area) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0234);
        return;
    }

    if (m_area.tag.AreaType == "0") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0775);
        return;
    }

    if (!pageVariable.ManageInnerAreaFrm) {
        pageVariable.ManageInnerAreaFrm = new uicontrol.dialog("ManageInnerAreaFrm", "", { width: 800, position: ["auto", 15] });

        $("#btNewInnerArea").click(openNewInnerAreaFrm);
        $("#btModifyInnerArea").click(openModifyInnerAreaFrm);
        $("#btDeleteInnerArea").click(openDelInnerAreaFrm);
    }

    loadInnerAreas();

    pageVariable.ManageInnerAreaFrm.setTitle(mlm.C0776 + "(" + m_area.tag.GlobalAreaName + ")");
    pageVariable.ManageInnerAreaFrm.show();
}
/* 加载内部区域 */
function loadInnerAreas() {
    var globalarea = new othm.globalarea();
    var m_countryids = [];
    m_countryids.push(pageVariable.globalAreaTable.selectedItem.tag.GlobalArea_Id);

    globalarea.GlobalArea_Ids = m_countryids;
    globalarea.queryGlobalAreaByCountries(function (tableSource) {

        var m_innerareas = [];
        var m_itemList = datastruct.convertion.tableToJson(tableSource);
        $.each(m_itemList, function () {
            if (this.GlobalArea_Id != pageVariable.globalAreaTable.selectedItem.tag.GlobalArea_Id) {
                m_innerareas.push(this);
            }
        });

        pageVariable.innerAreaTable = new uicontrol.treeView($("#innerAreaTable"), m_innerareas, null,
                                                        { displayModel: "inline", sourceFormat: "json",
                                                            keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName"
                                                        });
        pageVariable.innerAreaTable.loadSource();
    });
}

/* 打开新增内部区域的窗体 */
function openNewInnerAreaFrm() {
    var m_parentAreaCtrl = $("#txtInnerParentArea");

    if (!pageVariable.handlerInnerAreaFrm) {
        pageVariable.handlerInnerAreaFrm = new uicontrol.dialog("handlerInnerAreaFrm", "", { width: 800, position: ["auto", 25] }, saveInnerArea);
        m_parentAreaCtrl.change(changeInnerParentArea);
    }

    $("#txtInnerAreaName").val("");

    if (pageVariable.innerAreaTable.selectedItem) {
        m_parentAreaCtrl.val(pageVariable.innerAreaTable.selectedItem.value);
        m_parentAreaCtrl.attr("parentAreaId", pageVariable.innerAreaTable.selectedItem.key);
    }
    else {
        m_parentAreaCtrl.val(pageVariable.globalAreaTable.selectedItem.tag.GlobalAreaName);
        m_parentAreaCtrl.attr("parentAreaId", pageVariable.globalAreaTable.selectedItem.key);
    }
    m_parentAreaCtrl.attr("disabled", null);

    pageVariable.handlerInnerAreaFrm.globalArea_Id = 0;
    pageVariable.handlerInnerAreaFrm.action = "New";
    pageVariable.handlerInnerAreaFrm.setTitle(mlm.C0461 + mlm.C0772);
    pageVariable.handlerInnerAreaFrm.show();
}
/* 打开修改内部区域的窗体 */
function openModifyInnerAreaFrm() {

    if (!pageVariable.innerAreaTable.selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0234);
        return;
    }

    var m_parentAreaCtrl = $("#txtInnerParentArea");

    if (!pageVariable.handlerInnerAreaFrm) {
        pageVariable.handlerInnerAreaFrm = new uicontrol.dialog("handlerInnerAreaFrm", "", { width: 800, position: ["auto", 25] }, saveInnerArea);
        m_parentAreaCtrl.change(changeInnerParentArea);
    }

    $("#txtInnerAreaName").val(pageVariable.innerAreaTable.selectedItem.value);
    m_parentAreaCtrl.val(pageVariable.innerAreaTable.getTextValue(pageVariable.innerAreaTable.selectedItem.tag.ParentArea_Id));
    m_parentAreaCtrl.attr("parentAreaId", pageVariable.innerAreaTable.selectedItem.tag.ParentArea_Id);
    m_parentAreaCtrl.attr("disabled", "disabled");

    pageVariable.handlerInnerAreaFrm.globalArea_Id = pageVariable.innerAreaTable.selectedItem.key;
    pageVariable.handlerInnerAreaFrm.action = "Modify";
    pageVariable.handlerInnerAreaFrm.setTitle(mlm.C0061 + mlm.C0772);
    pageVariable.handlerInnerAreaFrm.show();
}
/* 打开删除内部区域的窗体 */
function openDelInnerAreaFrm() {

    if (!pageVariable.innerAreaTable.selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0234);
        return;
    }

    if (!pageVariable.delInnerAreaFrm) {
        pageVariable.delInnerAreaFrm = new uicontrol.confirmDelete(deleteInnerArea);
    }

    if (!pageVariable.innerAreaTable.selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0234);
        return;
    }

    pageVariable.delInnerAreaFrm.globalArea_Id = pageVariable.innerAreaTable.selectedItem.key;
    pageVariable.delInnerAreaFrm.showConfirm(mlm.C0235 + "(" + pageVariable.innerAreaTable.selectedItem.value + ") ?");
}
/* 保存内部区域 */
function saveInnerArea() {
    var m_areaName = $.trim($("#txtInnerAreaName").val());
    if (!m_areaName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0236);
        return;
    }

    var globalarea = new othm.globalarea();
    globalarea.GlobalAreaName = m_areaName;
    globalarea.GlobalArea_Id = pageVariable.handlerInnerAreaFrm.globalArea_Id;
    globalarea.AreaType = "2";
    globalarea.IsImportant = "0";

    var m_parentAreaCtrl = $("#txtInnerParentArea");
    var parentAreaId = m_parentAreaCtrl.attr("parentAreaId");
    if (!parentAreaId) {
        globalarea.ParentArea_Id = 0;
    }
    else {
        globalarea.ParentArea_Id = parentAreaId;
    }

    if (pageVariable.handlerInnerAreaFrm.action == "New") {
        globalarea.newGlobalArea(function (retObj) {

            pageVariable.innerAreaTable.addChildItem([{ key: retObj.GlobalArea_Id, value: retObj.GlobalAreaName, parentKey: retObj.ParentArea_Id, tag: retObj, children: []}]);

            var m_globalarea = pageVariable.globalAreaTable.selectedItem;
            if (retObj.ParentArea_Id == m_globalarea.key) {
                m_globalarea.tag.SonAreaCount = Number(m_globalarea.tag.SonAreaCount) + 1;
                pageVariable.globalAreaTable.modifyChildItem(m_globalarea.key, m_globalarea.GlobalAreaName, m_globalarea.tag);

                if (m_globalarea.tag.SonAreaCount > 0) {
                    $("#importantGAreaTable").find("li[tag='" + m_globalarea.key + "']").text(m_globalarea.tag.GlobalAreaName + "(" + m_globalarea.tag.SonAreaCount + ")");
                }
                else {
                    $("#importantGAreaTable").find("li[tag='" + m_globalarea.key + "']").text(m_globalarea.tag.GlobalAreaName);
                }
            }

            pageVariable.handlerInnerAreaFrm.close();
        });
    }
    else {
        globalarea.modifyGlobalArea(function (retObj) {
            pageVariable.innerAreaTable.modifyChildItem(globalarea.GlobalArea_Id, globalarea.GlobalAreaName, globalarea);

            pageVariable.handlerInnerAreaFrm.close();
        });
    }
}
/* 删除内部区域 */
function deleteInnerArea() {
    var globalarea = new othm.globalarea();
    globalarea.GlobalArea_Id = pageVariable.delInnerAreaFrm.globalArea_Id;
    globalarea.deleteGlobalArea(function () {

        loadInnerAreas();

        var m_globalarea = pageVariable.globalAreaTable.selectedItem;
        if (pageVariable.innerAreaTable.selectedItem.tag.ParentArea_Id == m_globalarea.key) {
            m_globalarea.tag.SonAreaCount = Number(m_globalarea.tag.SonAreaCount) - 1;
            pageVariable.globalAreaTable.modifyChildItem(m_globalarea.key, m_globalarea.GlobalAreaName, m_globalarea.tag);

            if (m_globalarea.tag.SonAreaCount > 0) {
                $("#importantGAreaTable").find("li[tag='" + m_globalarea.key + "']").text(m_globalarea.tag.GlobalAreaName + "(" + m_globalarea.tag.SonAreaCount + ")");
            }
            else {
                $("#importantGAreaTable").find("li[tag='" + m_globalarea.key + "']").text(m_globalarea.tag.GlobalAreaName);
            }
        }

        pageVariable.delInnerAreaFrm.close();
    });
}

/* 填充语言资源 */
function fillPageLanRes() {
    /* 全球区域列表 */
    $("#lbGlobalAreaTitle").text(mlm.C0214);
    /* 全球区域 */
    $("#lbGlobalAreaTag").text(mlm.M0043);
    /* 重点运营国家 */
    $("#lbImportAreaTitle").text(mlm.C0767);
    /* 所有国家 */
    $("#lbAllAreaTitle").text(mlm.C0768);
    /* 内部区域列表 */
    $("#lbInnerAreaTitle").text(mlm.C0771);

    /* 新增片区/国家 */
    $("#btNewGlobalArea").val(mlm.C0215);
    /* 修改片区/国家 */
    $("#btModifyGlobalArea").val(mlm.C0216);
    /* 删除片区/国家 */
    $("#btDeleteGlobalArea").val(mlm.C0217);
    /* 维护内部区域 */
    $("#btManageInnerArea").val(mlm.C0770);
    /* 新增区域 */
    $("#btNewInnerArea").val(mlm.C0461 + mlm.C0772);
    /* 修改区域 */
    $("#btModifyInnerArea").val(mlm.C0061 + mlm.C0772);
    /* 删除区域 */
    $("#btDeleteInnerArea").val(mlm.C0062 + mlm.C0772);

    /* 区域名称 */
    $("#lbAreaName, #lbInnerAreaNameSymbol").text(mlm.C0220 + ":");
    /* 上级区域 */
    $("#lbParentAreaSymbol, #lbInnerParentAreaSymbol").text(mlm.C0221 + ":");
    /* 区域类型 */
    $("#lbAreaTypeSymbol").text(mlm.C0239 + ":");
    /* 货币 */
    $("#lbCurrSymbol").text(mlm.C0131 + ":");
    /* 语言 */
    $("#lbLanguageSymbol").text(mlm.C0413 + ":");
    /* 重点运营 */
    $("#lbIsImportantSymbol").text(mlm.C0769 + ":");
    /* 拼音分类 */
    $("#lbPYSymbol").text(mlm.C0779 + ":");
    /* 简写 */
    $("#lbGACodeSymbol").text(mlm.C1717 + ":");
    
    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_7").text(mlm.C0049);

    /* ECMS-全球区域 */
    document.title = mlm.C0273;
}