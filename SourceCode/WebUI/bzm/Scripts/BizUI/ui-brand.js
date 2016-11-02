
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadBrands);

/* 页面变量 */
window.pageVariable = {
    /* 重新加载品牌 */
    reLoadBrands: false,

    /* 加载品牌种类的下拉列表 */
    loadBdtDll: true
};

/* 初始化界面 */
function initPage() {

    setLayout();
    pageframe.layout.resizeEventList.push(setLayout, function () { pageVariable.brandGroupCtrl.resize(); });

    $("#btNewBdt, #btNewBrand").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
    $("#brandTag").click(function () {
        if (pageVariable.reLoadBrands) {
            loadBrands();
            pageVariable.reLoadBrands = false;
        }
    }); 
    $("#brandTypeTag").click(function () {
        loadBrandTypes([bindBdtList]);
    }); 
    $("#btNewBdt").click(openNewBdtFrm);
    $("#btNewBrand").click(openNewBrandFrm);
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#brandForm").css("height", mainFormHeight);
    $("#brandGroupList").css("height", mainFormHeight - 2);

    if (pageVariable.brandTypeList) {
        var brandTypeFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.brandTypeList.resize(brandTypeFormHeight);
    }
}

/* 加载品牌 */
function loadBrands() {
    if (!pageVariable.brandGroupCtrl) {
        pageVariable.brandGroupCtrl = new uicontrol.groupList("brandGroupList",
                                                              { groupKey: "BrandType_Id", groupName: "BrandTypeName", itemKey: "Brand_Id", seqProp: "Seq",
                                                                constructItemFunc: constructBrandItem });
    }

    var m_brand = new pdm.brand();
    m_brand.getAllBrands(function (brands) {
        pageVariable.brandGroupCtrl.bindSource(brands)
    });
}

/* 加载品牌分类 */
function loadBrandTypes(bindEvents) {
    if (!pageVariable.brandTypeSource) {
        pageVariable.brandTypeSource = {};
        var brandType = new pdm.brandtype();
        brandType.getAllBrandTypes(function (source) {

            if (source) {
                pageVariable.brandTypeSource.table = source;
                pageVariable.brandTypeSource.json = datastruct.convertion.tableToJson(source);
            }

            $.each(bindEvents, function () {
                this();
            });
        });
    }
    else {
        $.each(bindEvents, function () {
            this();
        });
    }
}

/* 绑定品牌种类的下拉列表 */
function bindBtdDll() {
    if (pageVariable.brandTypeSource.json && pageVariable.loadBdtDll) {

        $("#ddlBdt").empty();

        $("#ddlBdt").append("<option value='0'></option>");
        $.each(pageVariable.brandTypeSource.json, function () {
            $("#ddlBdt").append("<option value=\"" + this.BrandType_Id + "\">" + this.BrandTypeName + "</option>");
        });

        pageVariable.loadBdtDll = false;
    }
}

/* 绑定品牌分类列表 */
function bindBdtList() {

    if (!pageVariable.brandTypeList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.brandTypeList = new uicontrol.tableList("brandTypeList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "BrandType_Id",
                                         height: mainFormHeight,
                                         columns: [{ display: mlm.C0044, name: "BrandTypeName", width: 500, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, modifiedFunc: "openModifyBdtFrm", deletedFunc: "openDelBdtFrm" }]
                                     });
    }

    if (pageVariable.brandTypeSource.table) {
        pageVariable.brandTypeList.bindDataSource(pageVariable.brandTypeSource.table);
    }
}

/* 打开新增品牌分类的窗体 */
function openNewBdtFrm() {
    if (!pageVariable.updateBdtFrm) {
        pageVariable.updateBdtFrm = new uicontrol.dialog("handlerBdtFrm", "", { width: 800 }, updateBdt);
    }

    $("#dvSeq").hide();
    pageVariable.updateBdtFrm.brandtype_id = 0;
    pageVariable.updateBdtFrm.action = "New";

    $("#txtBdt").val("");

    pageVariable.updateBdtFrm.setTitle(mlm.C0048);
    pageVariable.updateBdtFrm.show();
}
/* 打开修改品牌分类的窗体 */
function openModifyBdtFrm() {
    if (!pageVariable.updateBdtFrm) {
        pageVariable.updateBdtFrm = new uicontrol.dialog("handlerBdtFrm", "", { width: 800 }, updateBdt);
    }

    $("#dvSeq").show();
    pageVariable.updateBdtFrm.brandtype_id = $(this).attr("tag");
    pageVariable.updateBdtFrm.action = "Modify";

    var m_pdtObj = pageVariable.brandTypeList.getItem(pageVariable.updateBdtFrm.brandtype_id);
    $("#txtBdt").val(m_pdtObj.BrandTypeName);
    $("#txtSeq").val(m_pdtObj.Seq);

    pageVariable.updateBdtFrm.setTitle(mlm.C0054);
    pageVariable.updateBdtFrm.show();
}
/* 打开删除品牌分类的窗体 */
function openDelBdtFrm() {
    if (!pageVariable.delBdtFrm) {
        pageVariable.delBdtFrm = new uicontrol.confirmDelete(deleteBdt);
    }

    pageVariable.delBdtFrm.brandtype_id = $(this).attr("tag");
    var m_pdtObj = pageVariable.brandTypeList.getItem(pageVariable.delBdtFrm.brandtype_id);

    pageVariable.delBdtFrm.showConfirm(mlm.C0055 + "(" + m_pdtObj.BrandTypeName + ") ?");
}
/* 新增或修改品牌分类 */
function updateBdt() {
    var bdtName = $.trim($("#txtBdt").val());
    if (!bdtName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0056);
        return;
    }

    var brandType = new pdm.brandtype();

    if (pageVariable.updateBdtFrm.action == "Modify") {
        var seq = $("#txtSeq").val();
        if (!seq) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0057);
            return;
        }
        brandType.Seq = seq;
    }

    brandType.BrandType_Id = pageVariable.updateBdtFrm.brandtype_id;
    brandType.BrandTypeName = bdtName;
    
    if (pageVariable.updateBdtFrm.action == "New") {
        brandType.newBrandType(function (paramObj) {
            pageVariable.brandTypeList.addData(paramObj.BrandType_Id, paramObj);

            pageVariable.reLoadBrands = true;
            pageVariable.brandTypeSource = null;
            pageVariable.loadBdtDll = true;
            pageVariable.updateBdtFrm.close();
        });
    }
    else {
        brandType.modifyBrandType(function () {

            var m_oldSeq = pageVariable.brandTypeList.getItemSeq(brandType.BrandType_Id);

            /* 序号是否改变 */
            if (m_oldSeq == brandType.Seq) {
                pageVariable.brandTypeList.modifyData(brandType.BrandType_Id, brandType);
                pageVariable.reLoadBrands = true;
                pageVariable.brandTypeSource = null;
                pageVariable.loadBdtDll = true;
                pageVariable.updateBdtFrm.close();
            }
            else {
                pageVariable.reLoadBrands = true;
                pageVariable.brandTypeSource = null;
                pageVariable.loadBdtDll = true;

                loadBrandTypes([bindBdtList, function () {
                    pageVariable.updateBdtFrm.close();
                } ]);
            }
        });
    }
}
/* 删除品牌分类 */
function deleteBdt() {
    var brandType = new pdm.brandtype();
    brandType.BrandType_Id = pageVariable.delBdtFrm.brandtype_id;
    brandType.deleteBrandType(function () {
        pageVariable.brandTypeList.deleteData(brandType.BrandType_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        pageVariable.reLoadBrands = true;
        pageVariable.brandTypeSource = null;
        pageVariable.loadBdtDll = true;
        pageVariable.delBdtFrm.close();
    });
}

/* 打开新增品牌的窗体 */
function openNewBrandFrm() {
    if (!pageVariable.updateBrandFrm) {
        pageVariable.updateBrandFrm = new uicontrol.dialog("handlerBrandFrm", "", { width: 800 }, saveBrand);
    }

    pageVariable.updateBrandFrm.brand_id = 0;
    pageVariable.updateBrandFrm.action = "New";

    loadBrandTypes([bindBtdDll]);

    $("#txtBrandSeq").attr("disabled", "disabled").val(mlm.C0142);
    $("#txtBrandName").val("");
    $("#txtWebsite").val("");
    $("#txtRemark").val("");

    pageVariable.updateBrandFrm.setTitle(mlm.C0046);
    pageVariable.updateBrandFrm.show();
}
/* 打开修改品牌的窗体 */
function openModifyBrandFrm(bdtId, brandId) {
    if (!pageVariable.updateBrandFrm) {
        pageVariable.updateBrandFrm = new uicontrol.dialog("handlerBrandFrm", "", { width: 800 }, saveBrand);
    }

    var m_brand = pageVariable.brandGroupCtrl.getItem(bdtId, brandId);
    pageVariable.updateBrandFrm.bdt_id = bdtId;
    pageVariable.updateBrandFrm.brand_id = brandId;
    pageVariable.updateBrandFrm.action = "Modify";

    loadBrandTypes([bindBtdDll, function () { $("#ddlBdt").val(bdtId); } ]);
    
    $("#txtBrandSeq").attr("disabled", false).val(m_brand.Seq);
    $("#txtBrandName").val(m_brand.BrandName);
    $("#txtWebsite").val(m_brand.WebSite);
    $("#txtRemark").val(m_brand.Remark);

    pageVariable.updateBrandFrm.setTitle(mlm.C0058);
    pageVariable.updateBrandFrm.show();
}
/* 打开删除品牌的窗体 */
function openDeleteBrandFrm(bdtId, brandId) {
    if (!pageVariable.delBrandFrm) {
        pageVariable.delBrandFrm = new uicontrol.confirmDelete(deleteBrand);
    }

    pageVariable.delBrandFrm.bdt_id = bdtId;
    pageVariable.delBrandFrm.brand_id = brandId;
    var m_brand = pageVariable.brandGroupCtrl.getItem(bdtId, brandId);

    pageVariable.delBrandFrm.showConfirm(mlm.C0059 + "(" + m_brand.BrandName + ") ?");
}
/* 新增或修改品牌 */
function saveBrand() {

    if (!pageVariable.logoCtrl) {
        pageVariable.logoCtrl = new uicontrol.file("logoFile");
    }

    var brandName = $.trim($("#txtBrandName").val());
    if (!brandName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0060);
        return;
    }

    var brand = new pdm.brand();

    if (pageVariable.updateBrandFrm.action == "Modify") {
        var seq = $("#txtBrandSeq").val();
        if (!seq) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0057);
            return;
        }
        brand.Seq = seq;
    }

    brand.Brand_Id = pageVariable.updateBrandFrm.brand_id;
    brand.BrandName = brandName;
    brand.BrandType_Id = $("#ddlBdt").val();
    if (!brand.BrandType_Id) {
        brand.BrandType_Id = 0;
    }

    brand.WebSite = $.trim($("#txtWebsite").val());
    brand.Remark = $.trim($("#txtRemark").val());

    if (pageVariable.updateBrandFrm.action == "New") {
        brand.newBrand(pageVariable.logoCtrl, function (retObj) {
            retObj.BrandTypeName = $("#ddlBdt").find("option:selected").text();

            if (pageVariable.brandGroupCtrl.getGroupItem(brand.BrandType_Id)) {
                pageVariable.brandGroupCtrl.addData(retObj);
            }
            else {
                //重新加载品牌
                loadBrands();
            }

            pageVariable.updateBrandFrm.close();
        });
    }
    else {
        brand.modifyBrand(pageVariable.logoCtrl, function (retObj) {

            var m_oldbrand = pageVariable.brandGroupCtrl.getItem(pageVariable.updateBrandFrm.bdt_id, retObj.Brand_Id);

            if (m_oldbrand.Seq != retObj.Seq || pageVariable.updateBrandFrm.bdt_id != retObj.BrandType_Id) {
                //重新加载品牌
                loadBrands();
            }
            else {
                retObj.BrandTypeName = $("#ddlBdt").find("option:selected").text();
                pageVariable.brandGroupCtrl.modifyData(retObj);
            }

            pageVariable.updateBrandFrm.close();
        });
    }
}
/* 删除品牌 */
function deleteBrand() {
    var brand = new pdm.brand();
    brand.Brand_Id = pageVariable.delBrandFrm.brand_id;

    brand.deleteBrand(function () {
        brand.BrandType_Id = pageVariable.delBrandFrm.bdt_id;
        var m_brand = pageVariable.brandGroupCtrl.getItem(brand.BrandType_Id, brand.Brand_Id);
        brand.Seq = m_brand.Seq;
        pageVariable.brandGroupCtrl.deleteData(brand);

        pageVariable.delBrandFrm.close();
    });
}

/* 创建品牌单元格 */
function constructBrandItem(brand) {

    var m_html = [];
    m_html.push("<img src='" + brand.LogoUrl + "' style='cursor: pointer; height: 60px' onclick='openViewBrandFrm(\"" + brand.BrandType_Id + "\", \"" + brand.Brand_Id + "\");' />");

    m_html.push("<div class='brand-item'><a class='brand-link' href='javascript:void(\"0\")' onclick='openViewBrandFrm(\"" + brand.BrandType_Id + "\", \"" + brand.Brand_Id + "\");'>" + brand.BrandName.replace("-", "<br/>") + "</a></div>");
    m_html.push("<div><a href='javascript:void(\"0\")' class='bt-link' onclick='openModifyBrandFrm(\"" + brand.BrandType_Id + "\", \"" + brand.Brand_Id + "\");'>" + mlm.C0061 + "</a><a href='javascript:void(\"0\")' class='bt-link' onclick='openDeleteBrandFrm(\"" + brand.BrandType_Id + "\", \"" + brand.Brand_Id + "\");'>" + mlm.C0062 + "</a></div>");

    var brand = $(m_html.join(""));

    return brand;
}

/* 查看品牌信息 */
function openViewBrandFrm(bdtId, brandId) {
    if (!pageVariable.viewBrandFrm) {
        pageVariable.viewBrandFrm = new uicontrol.dialog("viewBrandFrm", mlm.C0411, { width: 800 });
    }

    var m_brand = pageVariable.brandGroupCtrl.getItem(bdtId, brandId);
    $("#lbBrandName_v").text(m_brand.BrandName);
    $("#lbBdtFbrand_v").text(m_brand.BrandTypeName);
    $("#lbWebsite_v").text(m_brand.WebSite);

    var m_website = "'#'";

    if (m_brand.WebSite) {
        if (m_brand.WebSite.indexOf("http://") > -1) {
            m_website = m_brand.WebSite;
        }
        else {
            m_website = "http://" + m_brand.WebSite;
        }
    }

    $("#lbWebsite_v").attr("href", m_website);
    $("#lbRemark_v").text(m_brand.Remark);

    pageVariable.viewBrandFrm.show();
}

/* 填充语言资源 */
function fillPageLanRes() {
    /* 商品品牌 */
    $("#lbBrandTag").text(mlm.C0043);
    /* 品牌分类 */
    $("#lbBrandTypeTag").text(mlm.C0044);
    $("#lbBdt, #lbBdtFbrand, #lbBdtFbrandSymbol_v").text(mlm.C0044 + ":");
    /* 品牌列表 */
    $("#lbBrandTitle").text(mlm.C0045);
    /* 新增品牌 */
    $("#btNewBrand").val(mlm.C0046);
    /* 品牌分类列表 */
    $("#lbBrandTypeTitle").text(mlm.C0047);
    /* 新增品牌分类 */
    $("#btNewBdt").val(mlm.C0048);
    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2").text(mlm.C0049);
    /* 序号： */
    $("#lbSeq, #lbBrandSeq").text(mlm.C0041 + ":");
    /* 品牌名称 */
    $("#lbBrandName, #lbBrandNameSymbol_v").text(mlm.C0050 + ":");
    /* 品牌Logo */
    $("#lbLogo").text(mlm.C0051 + ":");
    /* 官方网址 */
    $("#lbWebsite, #lbWebsiteSymbol_v").text(mlm.C0052 + ":"); 
    /* 备注 */
    $("#lbRemarkSymbol_v, #lbRemarkSymbol").text(mlm.C0073 + ":");

    /* ECMS-商品品牌 */
    document.title = mlm.C0053;
}