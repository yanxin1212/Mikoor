
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadSalePlatforms);

/* 页面变量 */
window.pageVariable = { };

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btNewSalePlatform").click(openNewSalePlatformFrm);
    $("#btAddPriceArea").click(openNewPirceAreaFrm);

    $("#btNewSalePlatform, #btAddPriceArea").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#pageContentForm").css("height", mainFormHeight);

    var ssFormHeight = pageframe.layout.getTableHeightInForm();

    if (pageVariable.shoppingSiteList) {
        pageVariable.shoppingSiteList.resize(ssFormHeight);
    }

    if (pageVariable.expStartAddressList) {
        pageVariable.expStartAddressList.resize(ssFormHeight);
    }
}

/* 加载销售平台 */
function loadSalePlatforms() {
    var saleplatform = new sm.saleplatform();
    saleplatform.querySalePlatforms(bindSalePlatformList);
}

/* 绑定销售平台数据源 */
function bindSalePlatformList(source) {

    var mainFormHeight = pageframe.layout.getTableHeightInForm();
    pageVariable.shoppingSiteList = new uicontrol.tableList("shoppingSiteList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "SalePlatform_Id",
                                         height: mainFormHeight,
                                         columns: [{ display: mlm.C0338, name: "SPfName", width: 150, align: 'left', adjust: true, createCell: constructSPfName },
                                                   { display: "发布时间", name: "", width: 120, align: 'center' },
                                                   { display: mlm.C0019, name: "", width: 120, align: 'center', adjust: true, createCell: constructOpera }]
                                     });
    pageVariable.shoppingSiteList.bindDataSource(source);
}

/* 构造网站名称列 */
function constructSPfName(key, cellValue) {
    return "<a onclick='openViewShopFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
}
/* 构造运行状态列 */
function constructState(key, cellValue) {
    if (cellValue == "0") {
        return mlm.C0351;
    }
    else {
        return "";
    }
}
/* 构造操作列 */
function constructOpera(key, cellValue) {
    return "<a onclick='publishSaleSite.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + mlm.C0350 + "</a>" +
            "<a onclick='openModifySalePlatformFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + mlm.C0061 + "</a>" +
            "<a onclick='openDelSalePlatformFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0062 + "</a>";
}

/* 查看网站情况 */
function openViewShopFrm(SalePlatform_Id) {
    if (!pageVariable.viewSalePlatformFrm) {
        pageVariable.viewSalePlatformFrm = new uicontrol.dialog("viewSalePlatformFrm", mlm.C0352, { width: 1025, position: ["auto", 5] });
        pageVariable.handlerViewSSTabs = $("#handlerViewSSTabs").tabs();
    }

    $("#lbViewSSInfo").trigger("click");

    var m_saleplatform = new sm.saleplatform();
    m_saleplatform.SalePlatform_Id = SalePlatform_Id;
    m_saleplatform.readSalePlatform(function (obj) {
        $("#lbSPfName_view").text(obj.SPfName);
        $("#lbShopTemplate_view").text(obj.ShopTemplateName);

        var m_currStr = [];
        loadCurrSource(function () {
            $.each(obj.SysCurrency_Ids, function (i, item) {
                var m_curr = item;
                $.each(pageVariable.currsSource, function () {
                    if (m_curr == this.key && this.value != obj.OtherProps.CurrName) {
                        var m_str = this.value;
                        if (obj.SysCurrency_Ids.length - 1 != i) {
                            m_str = m_str + ",";
                        }

                        m_currStr.push("<span style='margin: 0px 5px 0px 0px;'>" + m_str + "</span>");
                    }
                });
            });

            $("#lbSysCurrency_Ids_view").html(m_currStr.join(""));
        });

        $("#lbWebAddress_view").text(obj.WebAddress);
        $("#lbFilePath_view").text(obj.FilePath);
        $("#lbFtpUser_view").text(obj.FtpUser);

        $.each(obj.SaleSites, function () {
            this.Countries = !this.OtherProps.Countries ? mlm.C0421 : this.OtherProps.Countries;
            this.CurrName = this.OtherProps.CurrName;
            this.StartAddress = this.OtherProps.StartAddress;
            this.WUnit = this.OtherProps.WUnit;
            this.GlobalArea_Ids = this.GlobalArea_Ids.join(',');
        });
        loadPriceAreaForView(datastruct.convertion.jsonToTable(obj.SaleSites));
    });

    pageVariable.viewSalePlatformFrm.show();
}

/* 初始化销售平台的处理窗体 */
function initHandlerSalePlatformFrm() {
    if (!pageVariable.handlerSalePlatformFrm) {
        pageVariable.handlerSalePlatformFrm = new uicontrol.dialog("handlerSalePlatformFrm", "", { width: 1025, position: ["auto", 5] }, saveSalePlatform);
        pageVariable.handlerSSTabs = $("#handlerSSTabs").tabs();
    }
}
/* 打开新增销售平台的窗体 */
function openNewSalePlatformFrm() {

    initHandlerSalePlatformFrm();

    pageVariable.handlerSalePlatformFrm.show();
    loadPriceArea();

    loadSysCurrency_Ids();

    $("#txtSPfName").val("");
    $("#txtWebAddress").val("");
    $("#txtFilePath").val("");
    $("#txtFtpUser").val("");
    $("#txtFtpPwd").val("");
    pageVariable.handlerSalePlatformFrm.shoppingSite = null;

    $("#lbSSInfo").trigger("click");

    pageVariable.reloadExpress = true;
    pageVariable.handlerSalePlatformFrm.SalePlatform_Id = 0;
    pageVariable.handlerSalePlatformFrm.action = "New";
    pageVariable.handlerSalePlatformFrm.setTitle(mlm.C0336);
}
/* 打开修改销售平台的窗体 */
function openModifySalePlatformFrm(key) {

    initHandlerSalePlatformFrm();

    pageVariable.reloadExpress = true;
    pageVariable.handlerSalePlatformFrm.SalePlatform_Id = key;
    pageVariable.handlerSalePlatformFrm.action = "Modify";

    var m_saleplatform = new sm.saleplatform();
    m_saleplatform.SalePlatform_Id = key;
    m_saleplatform.readSalePlatform(function (obj) {

        $("#txtSPfName").val(obj.SPfName);
        $("#ddlShopTemplate").val(obj.ShopTemplate_Id);
        $("#txtWebAddress").val(obj.WebAddress);
        $("#txtFilePath").val(obj.FilePath);
        $("#txtFtpUser").val(obj.FtpUser);
        $("#txtFtpPwd").val(obj.FtpPwd);

        loadSysCurrency_Ids(obj);

        $.each(obj.SaleSites, function () {
            this.Countries = !this.OtherProps.Countries ? mlm.C0421 : this.OtherProps.Countries;
            this.CurrName = this.OtherProps.CurrName;
            this.StartAddress = this.OtherProps.StartAddress;
            this.WUnit = this.OtherProps.WUnit;
            this.GlobalArea_Ids = this.GlobalArea_Ids.join(',');
        });
        pageVariable.handlerSalePlatformFrm.show();
        loadPriceArea(datastruct.convertion.jsonToTable(obj.SaleSites));

        pageVariable.handlerSalePlatformFrm.shoppingSite = obj;
    });

    $("#lbSSInfo").trigger("click");

    pageVariable.handlerSalePlatformFrm.setTitle(mlm.C0353);
}
/*  */
function publishSaleSite(key) {
    var m_saleplatform = new sm.saleplatform();
    m_saleplatform.SalePlatform_Id = key;
    m_saleplatform.publishSaleSite(function () { 
        
    });
}

/* 获取所有货币 */
function loadCurrSource(event) {

    if (!pageVariable.currsSource) {
        pageVariable.currsSource = [];

        var syscurrency = new othm.syscurrency();
        syscurrency.getAllSysCurrencys(function (source) {

            var m_currs = datastruct.convertion.tableToJson(source);

            $.each(m_currs, function () {
                pageVariable.currsSource.push({ key: this.SysCurrency_Id, value: this.CurrName });
            });

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
/* 加载结算货币 */
function loadSysCurrency_Ids(saleplatform) {
    /* 支持的语言 */
    if (!pageVariable.ulCurrs) {
        pageVariable.ulCurrs = new uicontrol.selectbox("ulCurrs", "checkbox", "checkSelectCurrEvent");

        loadCurrSource(function () {
            pageVariable.ulCurrs.bindSource(pageVariable.currsSource);

            if (saleplatform) {
                var m_selectedItems = [];
                $.each(saleplatform.SysCurrency_Ids, function () {
                    m_selectedItems.push({ key: this });
                });

                pageVariable.ulCurrs.setSelectedItem(m_selectedItems);
            }
        });
    }
    else {
        if (saleplatform) {
            var m_selectedItems = [];
            $.each(saleplatform.SysCurrency_Ids, function () {
                m_selectedItems.push({ key: this });
            });

            pageVariable.ulCurrs.setSelectedItem(m_selectedItems);
        }
        else {
            pageVariable.ulCurrs.setSelectedItem([]);
        }
    }
}

/* 检测选择结算货币事件 */
function checkSelectCurrEvent() {

    if (!$(this).attr("checked")) {
        var m_currKey = $(this).val();

        var m_iscontinue = true;
        $.each(pageVariable.saleSiteList.dataSource.items.arrValues, function () {

            if (this.SysCurrency_Id == m_currKey) {
                m_iscontinue = false;
            }
        });

        if (!m_iscontinue) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0422);
            return;
        }
    }
}

/* 打开删除销售平台的窗体 */
function openDelSalePlatformFrm(key) {

    if (!pageVariable.delSalePlatformFrm) {
        pageVariable.delSalePlatformFrm = new uicontrol.confirmDelete(deleteSalePlatform);
    }

    pageVariable.delSalePlatformFrm.SalePlatform_Id = key;
    var m_saleplatform = pageVariable.shoppingSiteList.getItem(pageVariable.delSalePlatformFrm.SalePlatform_Id);

    pageVariable.delSalePlatformFrm.showConfirm(mlm.C0354 + "(" + m_saleplatform.SPfName + ") ?");
}

/* 打开发布网站的窗体 */
function openPublishFrm() {

}

/* 新增或修改销售平台 */
function saveSalePlatform() {
    var SPfName = $.trim($("#txtSPfName").val());
    if (!SPfName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0355);
        return;
    }

    var m_saleplatform = new sm.saleplatform();
    m_saleplatform.SalePlatform_Id = pageVariable.handlerSalePlatformFrm.SalePlatform_Id;
    m_saleplatform.SPfName = SPfName;
    m_saleplatform.ShopTemplate_Id = $("#ddlShopTemplate").val();
    m_saleplatform.WebAddress = $.trim($("#txtWebAddress").val());
    m_saleplatform.FilePath = $.trim($("#txtFilePath").val());
    m_saleplatform.FtpUser = $.trim($("#txtFtpUser").val());
    m_saleplatform.FtpPwd = $.trim($("#txtFtpPwd").val());
    m_saleplatform.SysCurrency_Ids = pageVariable.ulCurrs.getSelectedItem();

    /* 新增 */
    if (pageVariable.handlerSalePlatformFrm.action == "New") {

        m_saleplatform.SaleSites = [];
        $.each(pageVariable.saleSiteList.dataSource.items.arrValues, function () {

            var m_countryArr = [];
            if (this.GlobalArea_Ids) {
                m_countryArr = this.GlobalArea_Ids;
            }

            m_saleplatform.SaleSites.push(
                { SaleSite_Id: 0,
                    SalePlatform_Id: this.SalePlatform_Id,
                    SaleSiteName: this.SaleSiteName,
                    SysCurrency_Id: this.SysCurrency_Id,
                    GlobalArea_Ids: m_countryArr,
                    SysWeightUnit_Id: this.SysWeightUnit_Id
                });
        });

        m_saleplatform.newSalePlatform(function (obj) {

            pageVariable.shoppingSiteList.addData(obj.SalePlatform_Id, obj);
            pageVariable.handlerSalePlatformFrm.close();
        });
    }
    else {
        m_saleplatform.modifySalePlatform(function (obj) {

            pageVariable.shoppingSiteList.modifyData(obj.SalePlatform_Id, obj);
            pageVariable.handlerSalePlatformFrm.close();
        });
    }
}
/* 删除销售平台 */
function deleteSalePlatform() {
    var m_saleplatform = new sm.saleplatform();
    m_saleplatform.SalePlatform_Id = pageVariable.delSalePlatformFrm.SalePlatform_Id;

    m_saleplatform.deleteSalePlatform(function () {
        pageVariable.shoppingSiteList.deleteData(m_saleplatform.SalePlatform_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        pageVariable.delSalePlatformFrm.close();
    });
}

/* 加载定价区间 */
function loadPriceArea(saleSiteSource) {

    if (!pageVariable.saleSiteList) {
        pageVariable.saleSiteList = new uicontrol.tableList("saleSiteList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "SaleSite_Id",
                                         height: 200,
                                         columns: [{ display: mlm.C0416, name: "SaleSiteName", width: 120, align: 'left' },
                                                   { display: mlm.C0777, name: "Countries", width: 480, align: 'left' },
                                                   { display: mlm.C0419, name: "CurrName", width: 70, align: 'center' },
                                                   { display: mlm.C0669, name: "WUnit", width: 70, align: 'center' },
                                                   { display: mlm.C0019, name: "", width: 68, align: 'center', adjust: true, modifiedFunc: "openModifyPirceAreaFrm", deletedFunc: "openDeletePirceAreaFrm"}]
                                     });
                                 }

    pageVariable.saleSiteList.bindDataSource(saleSiteSource);
}
/* 加载定价区间视图 */
function loadPriceAreaForView(saleSiteSource) {

    if (!pageVariable.saleSiteList_view) {
        pageVariable.saleSiteList_view = new uicontrol.tableList("saleSiteList_view",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "SaleSite_Id",
                                         height: 200,
                                         columns: [{ display: mlm.C0416, name: "SaleSiteName", width: 120, align: 'left' },
                                                   { display: mlm.C0777, name: "Countries", width: 550, align: 'left' },
                                                   { display: mlm.C0419, name: "CurrName", width: 70, align: 'center' },
                                                   { display: mlm.C0669, name: "WUnit", width: 70, align: 'center' },]
                                     });
    }

    pageVariable.saleSiteList_view.bindDataSource(saleSiteSource);
}

/* 打开新增定价区间的窗体 */
function openNewPirceAreaFrm() {
    if (!pageVariable.handlerPirceAreaFrm) {
        pageVariable.handlerPirceAreaFrm = new uicontrol.dialog("handlerPirceAreaFrm", "", { width: 800, position: ["auto", 15] }, savePriceArea);

        loadWUnit();
        loadCurrenies();

        pageVariable.chkGlobalArea = new bizcontrol.selectglobalarea("chkGlobalArea", null, "country");
    }

    $("#txtPriceArea").val("");
    pageVariable.chkGlobalArea.clearObj();

    pageVariable.handlerPirceAreaFrm.salesite_id = 0;
    pageVariable.handlerPirceAreaFrm.action = "New";
    pageVariable.handlerPirceAreaFrm.setTitle(mlm.C0415);
    pageVariable.handlerPirceAreaFrm.show();
}
/* 打开修改定价区间的窗体 */
function openModifyPirceAreaFrm() {

    var m_key = $(this).attr("tag");
    var m_func = function () {
        var m_saleSite = pageVariable.saleSiteList.getItem(m_key);
        $("#txtPriceArea").val(m_saleSite.SaleSiteName);

        $("#ddlCurrency").val(m_saleSite.SysCurrency_Id.toString());
        $("#ddlWUnit").val(m_saleSite.SysWeightUnit_Id.toString());
        pageVariable.chkGlobalArea.setObj({ globalAreaNames: m_saleSite.Countries, globalArea_Ids: m_saleSite.GlobalArea_Ids });
    };

    if (!pageVariable.handlerPirceAreaFrm) {
        pageVariable.handlerPirceAreaFrm = new uicontrol.dialog("handlerPirceAreaFrm", "", { width: 800, position: ["auto", 15] }, savePriceArea);
        pageVariable.chkGlobalArea = new bizcontrol.selectglobalarea("chkGlobalArea", null, "country");

        /* 判断加载对象的事件计数器 */
        pageVariable.handlerPirceAreaFrm.loadobj_event = 1;

        /* 展示进度 */
        pageframe.control.processCtrl.showOperaProcess();

        loadWUnit();
        loadCurrenies();

        var m_innerevent = setInterval(function () {

            if (pageVariable.handlerPirceAreaFrm.loadobj_event == 3) {

                m_func();
                m_func = null;
                clearInterval(m_innerevent);
                m_innerevent = null;

                /* 隐藏进度 */
                pageframe.control.processCtrl.hideOperaProcess();
            }

        }, 1500);
    }
    else {
        m_func();
        m_func = null;
    }

    pageVariable.handlerPirceAreaFrm.salesite_id = m_key;
    pageVariable.handlerPirceAreaFrm.action = "Modify";
    pageVariable.handlerPirceAreaFrm.setTitle(mlm.C0424);
    pageVariable.handlerPirceAreaFrm.show();
}
/* 打开删除定价区间的窗体 */
function openDeletePirceAreaFrm() {
    if (!pageVariable.delPriceAreaFrm) {
        pageVariable.delPriceAreaFrm = new uicontrol.confirmDelete(deletePriceArea);
    }

    pageVariable.delPriceAreaFrm.salesite_id = $(this).attr("tag");
    var m_saleSite = pageVariable.saleSiteList.getItem(pageVariable.delPriceAreaFrm.salesite_id);

    pageVariable.delPriceAreaFrm.showConfirm(mlm.C0425 + "(" + m_saleSite.SaleSiteName + ") ?");
}
/* 保存定价区间 */
function savePriceArea() {

    var m_SaleSiteName = $.trim($("#txtPriceArea").val());
    if (!m_SaleSiteName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0426);
        return;
    }

    var m_saleSite = {};
    
    var m_nameCheckStruct = new datastruct.dictionary();
    var m_countryCheckStruct = new datastruct.dictionary();

    if (pageVariable.handlerPirceAreaFrm.action == "New") {
        m_saleSite.SaleSite_Id = m_SaleSiteName;

        $.each(pageVariable.saleSiteList.dataSource.items.arrValues, function () {
            m_nameCheckStruct.setItem(this.SaleSiteName, null);
        });
    }
    else {
        m_saleSite.SaleSite_Id = pageVariable.handlerPirceAreaFrm.salesite_id;

        $.each(pageVariable.saleSiteList.dataSource.items.arrValues, function () {

            if (this.SaleSite_Id != m_saleSite.SaleSite_Id) {
                m_nameCheckStruct.setItem(this.SaleSiteName, null);
            }
        });
    }

    if (m_nameCheckStruct.containKey(m_SaleSiteName)) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0427);
        return;
    }

    var m_areaObj = pageVariable.chkGlobalArea.getObj();
 
    var m_currCtrl = $("#ddlCurrency");

    
    m_saleSite.SaleSiteName = m_SaleSiteName;
    m_saleSite.SysCurrency_Id = m_currCtrl.val();

    if (m_areaObj.globalArea_Ids.length > 0) {
        m_saleSite.GlobalArea_Ids = m_areaObj.globalArea_Ids.split(',');
    }
    m_saleSite.CurrName = m_currCtrl.find("option:selected").text();

    var m_wunitCtrl = $("#ddlWUnit");
    m_saleSite.SysWeightUnit_Id = m_wunitCtrl.val();
    m_saleSite.WUnit = m_wunitCtrl.find("option:selected").text();

    if (m_saleSite.GlobalArea_Ids && m_saleSite.GlobalArea_Ids.length > 0) {

        var m_globalareas = new datastruct.dictionary();

        $.each(m_areaObj.globalAreaNames.split(","), function () {
            var m_countrystr = $.trim(this);
            if (!m_globalareas.containKey(m_countrystr)) {
                m_globalareas.setItem(m_countrystr, null);
            }
        });

        m_saleSite.Countries = m_globalareas.arrKeys.join(", ");
    }
    else {
        m_saleSite.Countries = mlm.C0421;
    }

    var m_selectedCurrs = pageVariable.ulCurrs.getSelectedItemObj();
    m_selectedCurrs.push({ key: m_saleSite.SysCurrency_Id });
    pageVariable.ulCurrs.setSelectedItem(m_selectedCurrs);

    if (pageVariable.handlerSalePlatformFrm.action == "New") {

        if (pageVariable.handlerPirceAreaFrm.action == "New") {
            pageVariable.saleSiteList.addData(m_saleSite.SaleSite_Id, m_saleSite);
        }
        else {
            pageVariable.saleSiteList.modifyData(m_saleSite.SaleSite_Id, m_saleSite);
        }

        pageVariable.handlerPirceAreaFrm.close();
    }
    else {

        var m_SaleSite = new sm.salesite();

        m_SaleSite.SalePlatform_Id = pageVariable.handlerSalePlatformFrm.SalePlatform_Id;
        m_SaleSite.SaleSiteName = m_saleSite.SaleSiteName;
        m_SaleSite.SysCurrency_Id = m_saleSite.SysCurrency_Id;
        m_SaleSite.ExpStartAddress_Id = m_saleSite.ExpStartAddress_Id;
        m_SaleSite.SysWeightUnit_Id = m_saleSite.SysWeightUnit_Id;

        if (m_saleSite.GlobalArea_Ids) {
            m_SaleSite.GlobalArea_Ids = m_saleSite.GlobalArea_Ids;
        }

        if (pageVariable.handlerPirceAreaFrm.action == "New") {
            m_SaleSite.newSaleSite(function (retObj) {
                m_saleSite.SaleSite_Id = retObj.SaleSite_Id;

                pageVariable.saleSiteList.addData(m_saleSite.SaleSite_Id, m_saleSite);

                pageVariable.handlerPirceAreaFrm.close();
            });
        }
        else {

            m_SaleSite.SaleSite_Id = m_saleSite.SaleSite_Id;
            m_SaleSite.modifySaleSite(function () {

                pageVariable.saleSiteList.modifyData(m_saleSite.SaleSite_Id, m_saleSite);

                pageVariable.handlerPirceAreaFrm.close();
            });
        }
    }
}
/* 删除站点 */
function deletePriceArea() {

    var m_SaleSite = new sm.salesite();
    m_SaleSite.SalePlatform_Id = pageVariable.handlerSalePlatformFrm.SalePlatform_Id;
    m_SaleSite.SaleSite_Id = pageVariable.delPriceAreaFrm.salesite_id;
    m_SaleSite.deleteSaleSite(function () {

        pageVariable.saleSiteList.deleteData(pageVariable.delPriceAreaFrm.salesite_id);
        pageVariable.delPriceAreaFrm.close();
    });
}

/* 加载货币列表 */
function loadCurrenies() {
    var m_currCtrl = $("#ddlCurrency");

    $.each(pageVariable.currsSource, function () {
        m_currCtrl.append("<option value='" + this.key + "'>" + this.value + "</option>");
    });

    pageVariable.handlerPirceAreaFrm.loadobj_event++;
}
/* 加载商品重量单位 */
function loadWUnit() {
    var m_syskeyparam = new spm.syskeyparam();
    m_syskeyparam.getWeightUnits(function (retTable) {

        var m_wunitCtrl = $("#ddlWUnit");
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        $.each(m_jsonobjs, function () {
            m_wunitCtrl.append("<option value='" + this.SysWeightUnit_Id + "'>" + this.WUnit + "</option>")
        });

        pageVariable.handlerPirceAreaFrm.loadobj_event++;
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 销售平台 */
    $("#lbSalePlatformTag").text(mlm.M0038);
    /* 网站模板 */
    $("#lbShopTemplateTag").text(mlm.C0334);
    /* 销售平台列表 */
    $("#lbSSTable").text(mlm.C0335);

    /* 新增销售平台 */
    $("#btNewSalePlatform").val(mlm.C0336);

    /* 基本信息 */
    $("#lbSSInfo, #lbViewSSInfo").text(mlm.C0286);
    /* 服务器设置 */
    $("#lbServerSetting, #lbViewServerSetting").text(mlm.C0337);

    /* 销售平台名称 */
    $("#lbSPfName, #lbSPfNameSymbol").text(mlm.C0338 + ":"); 
    /* 网站模板 */
    $("#lbShopTemplate, #lbShopTemplateSymbol").text(mlm.C0334 + ":");
    /* 支持的货币 */
    $("#lbSysCurrency_Ids, #lbSysCurrency_IdsSymbol").text(mlm.C0340 + ":");
    /* 网址 */
    $("#lbWebAddress, #lbWebAddressSymbol").text(mlm.C0344 + ":");
    /* 网站存放路径 */
    $("#lbFilePathSymbol, #lbFilePath").text(mlm.C0345 + ":");
    /* Ftp访问用户 */
    $("#lbFtpUser, #lbFtpUserSymbol").text(mlm.C0346 + ":");
    /* Ftp访问密码 */
    $("#lbFtpPwd").text(mlm.C0347 + ":");
    /* 销售市场列表 */
    $("#lbPriceAreaTitle, #lbPriceAreaTitle_view").text(mlm.C0414);
    /* 添加站点 */
    $("#btAddPriceArea").val(mlm.C0415);

    /* 站点 */
    $("#lbPriceAreaSymbol").text(mlm.C0416 + ":");
    /* 可配送区域 */
    $("#lbGlobalAreaSymbol").text(mlm.C0777 + ":");
    /* 定价货币 */
    $("#lbCurrSymbol").text(mlm.C0419 + ":");

    /* 重量单位 */
    $("#lbWUnitSymbol").text(mlm.C0669 + ":");

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_7").text(mlm.C0049);

    /* ECMS-销售平台 */
    document.title = mlm.C0199;
}