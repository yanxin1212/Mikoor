
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadPdcs, initProductList);

/* 页面变量 */
window.pageVariable = { 

    queryPropValues: new datastruct.dictionary()
};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btNewProd").click(openNewProductFrm);
    $("#txtUnit").change(function () {
        $("span[tag='unit']").text($(this).val());
    });
    $("#btQueryProd").click(openQueryProdFrm);
    $("#btUploadPic").click(openUploadPicFrm);
    $("#btClearPic").click(openDelUploadPicFrm);
    $("#btExportPic").click(exportProductPicture);
    $("#btUploadSSPic").click(openUploadPicFrm);
    $("#btClearSSPic").click(openDelUploadPicFrm);
    $("#lkViewListForBD, #lkViewList_MD").click(openSelectGbomFrm);
    $("#btExportProdSeq").click(exportProductSeq); 
    $("#btImportProdSeq").click(openImportProdSeqFrm);
    $("#btExportProduct").click(exportProduct);
    $("#btImportProduct").click(openImportProductFrm);
    $("#btConvertPic").click(covertStandProdPics);

    pageVariable.maxPvGuid = 1000000;
    pageVariable.viewExpServiceFrm = new bizcontrol.viewexpressservice();

    pageframe.control.multiButtion.init("btManageProdSeq", "dvMProdSeq");
    pageframe.control.multiButtion.init("btBatchModifyProd", "dvBatchModifyProd");
    $("#btNewProd, #btQueryProd, #btUploadPic, #btClearPic, #btAddQueryProp, #btImportExpPrice, #btExportExpPrice, #btViewRemarkPic, #btPreview, #btAddProp, #btAddProdPValue, #btClearSSPic, #btUploadSSPic, #btViewSS_RemarkPic, #btSSPreview, #btAddGiftItem, #btAddGift, #btBatchSetSalePrice, #btAddExpService, #btAddEsTemplate, #btRefreshExpPrice, #btManageProdSeq, #btSetSSProdBox, #btBatchModifyProd, #btExportPic, #btConvertPic").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

    authoriseUser();
}
/* 用户权限控制 */
function authoriseUser() {
    if (!pageVariable.user) {
        pageVariable.user = userpopedom["user_" + m_usertoken];

        if (pageVariable.user.SysUser_Id != "1" && pageVariable.user.RoleIds.indexOf("#1#") == -1) {
            $("#btConvertPic").hide();

            if (pageVariable.user.RoleIds.indexOf("#8#") == -1) {
                $("#btBatchModifyProd, #btManageProdSeq, #btNewProd").hide();
            }

            pageVariable.user.isadmin = false;
        }
        else {
            pageVariable.user.isadmin = true;
        }
    }

    return pageVariable.user.isauthorise;
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#pdcTreeFrm, #productFrm").css("height", mainFormHeight + 15);

    var m_width = $("#pdcTreeFrm")[0].offsetWidth + 32;
    if (m_width) {
        $("#productFrm").css("width", pageframe.layout.width - m_width);
    }

    if (pageVariable.productList) {
        var productFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.productList.resize(productFormHeight);
    }
}

/* 加载商品种类 */
function loadPdcs() {
    var prodcategory = new pdm.prodcategory();
    prodcategory.getAllProdCategorys(function (source) {
        pageVariable.pdcTree = new uicontrol.treeView($("#pdcTree"), source, selectPdcEvent,
                                                        { sourceFormat: "table",
                                                            keyColumn: "ProdCategory_Id", parentKeyColumn: "ParentPdc_Id", displayColumn: "PdcName",
                                                            constructDisplayTxt: constructPdcTxt
                                                        });

        pageVariable.pdcTree.loadSource();

        var m_width = $("#pdcTreeFrm")[0].offsetWidth + 32;
        $("#productFrm").css("width", pageframe.layout.width - m_width);
    });
}
/* 构建种类显示 */
function constructPdcTxt(objitem) {
    if (Number(objitem.tag.ProdCount) == 0) {
        return "<span class='lb-symbol'>" + objitem.tag.PdcName + "</span>";
    }
    else {
        return "<span>" + objitem.tag.PdcName + "(" + objitem.tag.ProdCount + ")</span>";
    }
}

/* 选择商品分类后的事件 */
function selectPdcEvent() {

    if (pageVariable.selQueryPdc) {
        pageVariable.selQueryPdc.setPdc({ ProdCategory_Id: [pageVariable.pdcTree.selectedItem.key], PdcName: pageVariable.pdcTree.selectedItem.value });
    }
    if (pageVariable.queryProdFrm) {
        pageVariable.queryProdFrm.isLoad = false;
    }

    queryProduct(1, pageVariable.productList.pageNumber);
}

/* 初始化商品列表 */
function initProductList() {

    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
    pageVariable.productList = new uicontrol.tableList("productList",
                                     { isPaging: true,
                                         autoSeq: true,
                                         height: mainFormHeight,
                                         keyColumn: "Product_Id",
                                         pageQueryHandler: queryProduct,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C0734, name: "ProdName", width: 240, align: 'left', adjust: true, createCell: constructProdNameCell },
                                                   { display: mlm.C1063, name: "PdcName", width: 120, align: 'left', adjust: true, createCell: constructPdcCell },
                                                   { display: mlm.C1247, name: "Weight", width: 65, align: 'right', adjust: true, createCell: constructProdWeightCell },
                                                   { display: mlm.C1064, name: "", width: 75, align: 'right', adjust: true, createCell: constructProdCostCell },
                                                   { display: mlm.C0634, name: "TotalStock", width: 60, align: 'right', adjust: true, createCell: constructTotalStockCell },
                                                   { display: mlm.C1248, name: "CMonthSaleCount", width: 60, align: 'right', adjust: true, createCell: constructSaleCountCell },
                                                   { display: mlm.C1249, name: "AllSaleCount", width: 60, align: 'right', adjust: true, createCell: constructSaleCountCell },
                                                   { display: mlm.C0019, name: "", width: 65, align: 'center', adjust: true, createCell: constructProdOperaCell}]
                                     });
}
/* 构建商品图片列 */
function constructProdPicCell(key, cellValue) {

    var m_obj = this.keyObj;

    var m_src = "";
    if (cellValue) {
        if (cellValue.indexOf("http://") == -1) {
            m_src = window.webLocation + cellValue;
        }
        else {
            m_src = cellValue;
        }
    }
    else {
        m_src = window.webLocation + "BZM/Css/Images/nopic.png";
    }

    return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 70);' onerror='commoncore.func.failLoadImg.call(this, 70);' onclick='viewProduct.call(this, \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
}
/* 构建商品名称列 */
function constructProdNameCell(key, cellValue) {

    var m_obj = this.keyObj;

    var m_html_items = [];

    var m_css = "";
    if (m_obj.State == 0) {
        m_css = "style='color: #747474'";
    }
    if (m_obj.EnableFlag == "0") {
        m_css = "style='color: #DD0000'"
    }

    m_html_items.push("<div style='padding: 0px'><a " + m_css + " onclick='viewProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a></div>");
    if (Number(m_obj.SkuProdCount) > 1) {
        m_html_items.push("<div style='margin: 2px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.SkuProdCount + mlm.C1066 + "</div>");
    }

    return m_html_items.join("");
}
/* 构建商品分类列 */
function constructPdcCell(key, cellValue) {

    var m_obj = this.keyObj;

    var m_html_items = [];

    var m_css = "";
    if (m_obj.State == 0) {
        m_css = "color: #747474"
    }

    var m_items = [];
    var m_len = m_obj.PdcName.getBytesCount();
    if (m_len > 30) {
        cellValue = m_obj.PdcName.substringByBytes(30) + "...";
    }
    m_html_items.push("<div style='padding: 0px;" + m_css + "'>" + cellValue + "</div>");

    if (m_obj.BrandName) {
        m_html_items.push("<div style='margin: 2px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + m_obj.BrandName + "</div>");
    }

    return m_html_items.join("");
}
/* 构建包裹重量列 */
function constructProdWeightCell(key, cellValue) {

    var m_css = "";
    if (this.keyObj.State == 0) {
        m_css = "color: #747474"
    }

    var m_arr = [];
    m_arr.push("<div style='padding: 0px;" + m_css + "'>" + Number(cellValue).toFixed(3) + " " + keycontext.keyparam.WUnit + "</div>");

    return m_arr.join("");
}
/* 构建采购成本列 */
function constructProdCostCell(key, cellValue) {
    if (pageVariable.user.isadmin || pageVariable.user.RoleIds.indexOf("#8#") > -1) {
        var m_arr = [];

        var m_css = "";
        if (this.keyObj.State == 0) {
            m_css = "color: #747474"
        }

        if (this.keyObj.MaxCost && Number(this.keyObj.MaxCost) > 0) {
            if (Number(this.keyObj.MinCost) == Number(this.keyObj.MaxCost)) {
                m_arr.push("<div style='padding: 0px;" + m_css + "'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinCost) + "</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px;" + m_css + "'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinCost) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MaxCost) + "</div>");
            }
        }
        return m_arr.join("");
    }
}
/*  */
function constructTotalStockCell(key, cellValue) {
    if (pageVariable.user.isadmin) {
        var m_css = "";
        if (this.keyObj.State == 0) {
            m_css = "color: #747474";
        }

        if (cellValue) {
            return "<div style='padding: 0px;" + m_css + "'>" + commoncore.func.constructQtyCell(key, cellValue) + "</div>";
        } 
    }
}
/* 构建出货量列 */
function constructSaleCountCell(key, cellValue) {

    if (pageVariable.user.isadmin) {
        var m_qty = Number(cellValue);
        if (m_qty > 0) {
            var m_css = "";
            if (this.keyObj.State == 0) {
                m_css = "style='color: #747474'";
            }

            return "<a " + m_css + " onclick='viewProdSaleStatFrm.call(this, \"" + this.keyObj.Product_Id + "\")' href='javascript:void(\"0\");'>" + m_qty + "</a>";
        }
    }
} 
/* 创建商品操作设置列 */
function constructProdOperaCell(key, cellvalue) {

    var m_css = "";
    if (this.keyObj.State == 0) {
        m_css = "style='color: #747474'";
    }

    if (pageVariable.user.isadmin || (pageVariable.user.RoleIds.indexOf("#8#") > -1 && (this.keyObj.State == 0 || this.keyObj.State == 1))) {
        return "<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openModifyProductFrm.call(this);'>" + mlm.C0061 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openDelProductFrm.call(this);'>" + mlm.C0062 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + this.keyObj.Product_Id + "' onclick='openViewSSProdListFrm.call(this);'>" + mlm.C1033 + "</a>";
    }
}

/* 初始化处理产品的窗体 */
function initHandlerProductFrom(pdcId, fillProductEvent) {

    if (!pageVariable.handlerProductFrm) {
        pageVariable.handlerProductFrm = new uicontrol.dialog("handlerProductFrm", "", { width: 1125, position: ["auto", 10] }, saveProduct);

        $("#btViewRemarkPic").click(function () {
            previewProdDesc($("#prodHtmlTool"));
        });
        $("#btAddProp").click(openAddPropFrm);
        $("#lbInnerWUnit").text(keycontext.keyparam.WUnit);

        pageVariable.chkFactoryCountry = new bizcontrol.selectglobalarea("chkFactoryCountry", true, "country");

        var m_150_pic = $("#lk_150_Picname");
        var m_480_pic = $("#lk_480_Picname");
        var m_800_pic = $("#lk_800_Picname");

        var m_clickviewFunc = function () {

            m_480_pic.removeClass("lb-light-alert");
            m_150_pic.removeClass("lb-light-alert");
            m_800_pic.removeClass("lb-light-alert");

            $(this).addClass("lb-light-alert");

            $("#imgProdPic").attr("src", $(this).attr("tag"));
        };

        m_150_pic.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
        m_150_pic.click(m_clickviewFunc);

        m_480_pic.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
        m_480_pic.click(m_clickviewFunc);

        m_800_pic.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
        m_800_pic.click(m_clickviewFunc);

        pageVariable.newProdTabs = $("#newProdTabs").tabs({ show: showProdTab });
        pageVariable.selBrand = new bizcontrol.selectbrand($("#selBrand"));
        pageVariable.selPdc = new bizcontrol.selectpdc($("#selPdc"), true, null, null, function () {
            fillProps(pageVariable.propList, pageVariable.selPdc.pdcId);
        });
        pageVariable.picList = new uicontrol.simpleTableList("dvPicList",
                                                            { keyColumn: "TempUploadPic_Id",
                                                                isPaging: false,
                                                                itemCss: "picture-item",
                                                                constructTableFunc: constructPicTable,
                                                                events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                    onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                    ondblclick: function () {
                                                                        var m_key = $(this).attr("tag");
                                                                        var m_obj = pageVariable.picList.getItem(m_key);

                                                                        if (!pageVariable.viewProdPicFrm) {
                                                                            pageVariable.viewProdPicFrm = new uicontrol.dialog("viewProdPicFrm", mlm.C0648, { width: 1000, position: ["auto", 25] });
                                                                        }

                                                                        var m_picUrl = m_obj.PicUrl;
                                                                        var m_browserUrl = m_obj.BrowsePicUrl;
                                                                        var m_sourceUrl = m_obj.SourcePicUrl;
                                                                        if (m_obj.PicUrl.indexOf("http://") == -1) {
                                                                            m_picUrl = window.webLocation + m_obj.PicUrl;
                                                                            m_browserUrl = window.webLocation + m_obj.BrowsePicUrl;
                                                                            m_sourceUrl = window.webLocation + m_obj.SourcePicUrl;
                                                                        }

                                                                        m_480_pic.text(m_picUrl);
                                                                        m_480_pic.attr("tag", m_picUrl);

                                                                        if (m_obj.BrowsePicUrl && m_obj.BrowsePicUrl != m_obj.PicUrl) {
                                                                            m_150_pic.text(m_browserUrl + " (150x150" + mlm.C0667 + ")");
                                                                            m_150_pic.attr("tag", m_browserUrl);
                                                                            m_150_pic.show();
                                                                        }
                                                                        else {
                                                                            m_150_pic.hide();
                                                                        }

                                                                        if (m_obj.SourcePicUrl && m_obj.SourcePicUrl != m_obj.PicUrl) {
                                                                            m_800_pic.text(m_sourceUrl + " (800x800" + mlm.C0667 + ")");
                                                                            m_800_pic.attr("tag", m_sourceUrl);
                                                                            m_800_pic.show();
                                                                        }
                                                                        else {
                                                                            m_800_pic.hide();
                                                                        }

                                                                        $("#imgProdPic").attr("src", m_picUrl);

                                                                        pageVariable.viewProdPicFrm.show();
                                                                    }
                                                                }
                                                            });
    }

    if (pageVariable.newProdTabs) {
        $("#lbBasicProdInfo").trigger("click");
    }

    if (!pageVariable.propList) {
        pageVariable.handlerProductFrm.show();
        pageVariable.propList = new uicontrol.tableList("propList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ProdProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 90, align: 'left' },
                                                { display: mlm.C0070, name: "IsSku", width: 80, align: 'left', adjust: true, createCell: constructIsSkuCell },
                                                { display: mlm.C0071, name: "ProdPValueRange", width: 450, align: 'left', adjust: true, createCell: constructProdPropValueCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: constructPropOperaCell}]
                                    });
    }
    else {
        pageVariable.handlerProductFrm.show();
    }

    if (pageVariable.skuProdList) {
        pageVariable.skuProdList.bindDataSource(null);
    }

    pageVariable.picList.bindSource([]);

    pageVariable.definedProps = {};
    pageVariable.prodPValueCache = new datastruct.dictionary();

    pageVariable.isloadSkuProd = true;
    pageVariable.isloadProdPic = true;
    pageVariable.isloadskuprodpic = true;
    pageVariable.hasdeleteditems = null;
    pageVariable.prodPicSource = null;
    pageVariable.isSSProds = false;
}
/* 加载商品属性 */
function fillProps(tableList, prodcategory_ids) {

    var prodcategory_ids = prodcategory_ids;

    var m_pdcproperty = new pdm.pdcproperty();

    if (pageVariable.isSSProds) {

        m_pdcproperty.SS_ProdCategory_Ids = [];

        if (!(prodcategory_ids instanceof Array)) {
            m_pdcproperty.SS_ProdCategory_Ids = [prodcategory_ids];
        }
        else {
            $.each(prodcategory_ids, function () {
                m_pdcproperty.SS_ProdCategory_Ids.push(this.toString());
            });
        }
    }
    else {
        m_pdcproperty.ProdCategory_Ids = [];

        if (!(prodcategory_ids instanceof Array)) {
            m_pdcproperty.ProdCategory_Ids = [prodcategory_ids];
        }
        else {
            $.each(prodcategory_ids, function () {
                m_pdcproperty.ProdCategory_Ids.push(this.toString());
            });
        }
    }

    m_pdcproperty.getPdcProps(function (retTable) {

        var m_tempStruct = new datastruct.dictionary();
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        var m_items = [];

        $.each(m_jsonobjs, function () {
            m_tempStruct.setItem(this.ProdProperty_Id, null);
            m_items.push(this);
        });

        $.each(tableList.dataSource.items.arrValues, function () {
            m_items.push(this);
        });

        $.each(m_items, function () {
            if (!tableList.getItem(this.ProdProperty_Id)) {
                tableList.addData(this.ProdProperty_Id, this);
            }
        });
    });
}

/* 创建属性类型的单元格 */
function constructIsSkuCell(key, cellValue) {

    var m_retvalue = "";
    if (cellValue == "1") {
        m_retvalue = mlm.C0128;
    }
    else {
        m_retvalue = mlm.C0125;
    }

    return m_retvalue;
}
/* 创建商品属性值单元格 */
function constructProdPropValueCell(key, cellValue) {
    if (!cellValue) {
        return "";
    }
    else {
        return cellValue;
    }
}
/* 创建属性设置列 */
function constructPropOperaCell(key, cellvalue) {
    return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openSetPropValueFrm.call(this);'>" + mlm.C0611 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDeletePropFrm.call(this);'>" + mlm.C0062 + "</a>";
}

/* 打开新增商品的窗体 */
function openNewProductFrm() {

    if (!pageVariable.pdcTree.selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0189);
        return;
    }
    var m_pdcKey = pageVariable.pdcTree.selectedItem.key;

    initHandlerProductFrom();

    var m_pdcproperty = new pdm.pdcproperty();
    m_pdcproperty.ProdCategory_Id = m_pdcKey;
    m_pdcproperty.getPdcProps(function (retObj) {
        pageVariable.propList.bindDataSource(retObj);

        pageVariable.handlerProductFrm.product_id = 0;
        pageVariable.handlerProductFrm.skuProducts = null;
        pageVariable.handlerProductFrm.product = {};
        pageVariable.handlerProductFrm.product.SKUProducts = {};
        generateSkuProducts();
    });

    pageVariable.selPdc.setPdc({ ProdCategory_Id: [ m_pdcKey ], PdcName: pageVariable.pdcTree.getTextValue(m_pdcKey, true) });
    $("#txtProdName").val("");
    $("#txtWeight").val("0.00");
    $("#prodHtmlTool").val("");
    pageVariable.chkFactoryCountry.clearObj();
    $("#txtCustomMaterial").val("");
    $("#txtCustomProdName").val("");
    $("#txtCustomProdName_CN").val("");
    $("#txtCustomValue").val("0.00");
    $("#txtCustomCode").val("");
    $("#btExportPic").hide();
    pageVariable.handlerProductFrm.action = "New";
    pageVariable.handlerProductFrm.setTitle(mlm.C0170);
    pageVariable.handlerProductFrm.show();
}
/* 打开修改商品的窗体 */
function openModifyProductFrm() {

    var m_product = new pdm.product();

    var m_key = $(this).attr("tag");

    m_product.Product_Id = m_key.split("-")[0];
    m_product.readProduct(function (prodObj) {

        initHandlerProductFrom(prodObj.PdcObjs[0].ProdCategory_Id, function () { setProductCtrl(prodObj); });

        $("#btExportPic").show();

        fillProductUIfromObj(prodObj);

        var m_pdcIds = [];
        var m_pdcKey = null;
        if (pageVariable.pdcTree.selectedItem) {
            m_pdcKey = pageVariable.pdcTree.selectedItem.key;
        }
        $.each(pageVariable.handlerProductFrm.product.PdcObjs, function () {
            m_pdcIds.push(this.ProdCategory_Id);
        });

        pageVariable.selPdc.setPdc({ ProdCategory_Id: m_pdcIds, PdcName: prodObj.OtherProps.PdcName });
        pageVariable.selBrand.setBrand({ Brand_Id: prodObj.Brand_Id, BrandName: prodObj.OtherProps.BrandName });
        $("#txtProdName").val(prodObj.ProdName);
        $("#txtUnit").val(prodObj.Unit);
        $("#txtWeight").val(Number(prodObj.Weight).toFixed(3));
        $("#prodHtmlTool").val(prodObj.Remark.replace(/\^/g, "\"").replace(/\~/g, "\'"));

        pageVariable.chkFactoryCountry.setObj({ globalArea_Ids: prodObj.GlobalArea_Id, globalAreaNames: prodObj.OtherProps.GlobalAreaName });
        $("#txtCustomMaterial").val(prodObj.CustomMaterial); 
        $("#txtCustomProdName").val(prodObj.CustomProdName);
        $("#txtCustomProdName_CN").val(prodObj.CustomProdName_CN);
        $("#txtCustomValue").val(prodObj.CustomValue.toFixed(2));
        $("#txtCustomCode").val(prodObj.CustomCode);

        pageVariable.handlerProductFrm.prodkey = m_key;
        pageVariable.handlerProductFrm.action = "Modify";
        pageVariable.handlerProductFrm.setTitle(mlm.C0190);
    });
}
/* 填充商品界面对象 */
function fillProductUIfromObj(prodObj) {
    pageVariable.handlerProductFrm.product = prodObj;
    pageVariable.handlerProductFrm.product_id = prodObj.Product_Id;

    var m_picdict = new datastruct.dictionary();
    $.each(pageVariable.handlerProductFrm.product.ProdPics, function () {
        m_picdict.setItem(this.Product_Pic_Id, this);
    });

    $.each(pageVariable.handlerProductFrm.product.SKUProducts, function () {
        if (this.OtherProps && this.PropValues) {
            this.SkuProps = this.OtherProps.SkuProps;
            this.SkuProd_Key = this.PropValues;
            this.deletedFlag = null;
        }

        if (this.Product_Pic_Id != "0") {
            var m_pic = m_picdict.getItem(this.Product_Pic_Id);
            if (m_pic) {
                this.BrowsePicUrl = m_pic.BrowsePicUrl;
            }
            else {
                this.Product_Pic_Id = 0;
            }
        }
    });
    var j = 1;
    $.each(pageVariable.handlerProductFrm.product.PropTable, function () {
        this.sourceFrom = 1;
        this.Seq = j;
        j++;
    });

    pageVariable.propList.bindDataSource(pageVariable.handlerProductFrm.product.PropTable);
}
/* 打开删除商品的窗体 */
function openDelProductFrm() {
    if (!pageVariable.delProductFrm) {
        pageVariable.delProductFrm = new uicontrol.confirmDelete(deleteProduct);
    }

    var m_key = $(this).attr("tag");
    pageVariable.delProductFrm.product_id = m_key.split("-")[0];
    var m_product = pageVariable.productList.getItem(m_key);

    pageVariable.delProductFrm.showConfirm(mlm.C0192 + "(" + m_product.ProdName + ") ?");
}

/* 初始化属性值的窗体 */
function initPropValueFrm() {
    if (!pageVariable.handlerPropFrm) {
        pageVariable.handlerPropFrm = new uicontrol.dialog("handlerPropFrm", "", { width: 800, position: ["auto", 25] }, saveProdProp);

        pageVariable.handlerPropFrm.show();

        $("#btAddProdPValue").click(openNewPValueFrm);

        pageVariable.prodPValueList = new uicontrol.tableList("prodPValueList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 270,
                                        selectModel: "2",
                                        keyColumn: "PropValue_Id",
                                        columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 90, align: 'center', adjust: true, createCell: constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'left' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 180, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: createPValueOperaCell}]
                                    });

        var m_propTypeCtrl = $("#ddlPropType");
        m_propTypeCtrl.append("<option value='1'>" + mlm.C0128 + "</option>");
        m_propTypeCtrl.append("<option value='2'>" + mlm.C0125 + "</option>");
    }
    else {
        pageVariable.handlerPropFrm.show();
    }
}
/* 构建属性值的操作列 */
function createPValueOperaCell(key, cellValue) {
    var m_obj = pageVariable.prodPValueList.getItem(key);
    if ((!m_obj.Product_Id || m_obj.Product_Id == "0") && (!m_obj.SS_Product_Id || m_obj.SS_Product_Id == "0")) {
        return "";
    }
    else {
        return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openModifyPValueFrm.call(this);'>" + mlm.C0061 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDeletePValueFrm.call(this);'>" + mlm.C0062 + "</a>";
    }
}
/* 构建属性值图片列 */
function constructPropPicCell(key, cellValue) {

    if ($.trim(cellValue)) {
        var m_src = window.webLocation + cellValue;
        return "<img class='product-list-img-sl' src='" + m_src + "' />";
    }
    else {
        return "";
    }
}
/* 打开设置属性的窗体 */
function openSetPropValueFrm() {

    initPropValueFrm();

    $("#dvPV_1").hide();
    $("#dvPV_Seq").show();
    $("#dvPV_2").addClass("first-item");

    var m_key = $(this).attr("tag");
    loadPValues(m_key);

    var m_obj = null;
    if (pageVariable.isSSProds) {
        m_obj = pageVariable.ssPropList.getItem(m_key);
    }
    else {
        m_obj = pageVariable.propList.getItem(m_key);
    }
    $("#txtPropSeq").val(m_obj.Seq);

    pageVariable.handlerPropFrm.setTitle(mlm.C0611 + mlm.C0608);
    pageVariable.handlerPropFrm.prodproperty_id = m_key;
    pageVariable.handlerPropFrm.action = "Modify";

}
/* 打开选择属性的窗体 */
function openAddPropFrm() {

    var m_currProps = null;

    if (pageVariable.isSSProds) {
        m_currProps = pageVariable.ssPropList.dataSource.items.arrValues;
    }
    else {
        m_currProps = pageVariable.propList.dataSource.items.arrValues;
    }


    $("#txtPropSeq").val(m_currProps.length + 1);

    var m_currPropDict = new datastruct.dictionary();
    $.each(m_currProps, function () {
        m_currPropDict.setItem(this.ProdProperty_Id);
    });

    var m_propCtrl = $("#ddlProp");
    if (!pageVariable.allProperties) {
        var m_prodproperty = new pdm.prodproperty();
        m_prodproperty.getAllProdPropertys(function (tableSource) {
            pageVariable.allProperties = datastruct.convertion.tableToJson(tableSource);

            $.each(pageVariable.allProperties, function () {
                if (!m_currPropDict.containKey(this.ProdProperty_Id)) {
                    m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
                }
            });

            m_propCtrl.change(function () {
                var m_prodproperty_id = m_propCtrl.val();
                loadPValues(m_prodproperty_id);
                pageVariable.handlerPropFrm.prodproperty_id = m_prodproperty_id;
            });

            var m_prodproperty_id = m_propCtrl.val();
            loadPValues(m_prodproperty_id);

            if (!m_prodproperty_id) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C0632);
                return;
            }
            initPropValueFrm();

            pageVariable.handlerPropFrm.prodproperty_id = m_prodproperty_id;
            pageVariable.handlerPropFrm.setTitle(mlm.C0075);
            pageVariable.handlerPropFrm.action = "New";
        });
    }
    else {
        m_propCtrl.empty();
        $.each(pageVariable.allProperties, function () {
            if (!m_currPropDict.containKey(this.ProdProperty_Id)) {
                m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
            }
        });

        var m_prodproperty_id = m_propCtrl.val();
        loadPValues(m_propCtrl.val());

        if (!m_prodproperty_id) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0632);
            return;
        }
        initPropValueFrm();

        pageVariable.handlerPropFrm.prodproperty_id = m_prodproperty_id;
        pageVariable.handlerPropFrm.setTitle(mlm.C0075);
        pageVariable.handlerPropFrm.action = "New";
    }

    $("#dvPV_1").show();
    $("#dvPV_Seq").hide();
    $("#dvPV_2").removeClass("first-item");
}
/* 加载属性值 */
function loadPValues(prodproperty_id) {

    if (!prodproperty_id) {
        return;
    }

    var m_propvalue = null;

    var m_cachekey = "";
    if (pageVariable.isSSProds) {
        m_cachekey = prodproperty_id + "-S" + (pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id == 0 ? -1 : pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id);
        m_propvalue = pageVariable.ssPropList.getItem(prodproperty_id);
    }
    else {
        m_cachekey = prodproperty_id + "-P" + (pageVariable.handlerProductFrm.product_id == 0 ? -1 : pageVariable.handlerProductFrm.product_id);
        m_propvalue = pageVariable.propList.getItem(prodproperty_id);
    }

    var m_selectStruct = new datastruct.dictionary();

    if (m_propvalue) {
        var m_prodPValueIds = m_propvalue.ProdPValueIdRange ? m_propvalue.ProdPValueIdRange.split(",") : null;
        if (m_prodPValueIds) {
            $.each(m_prodPValueIds, function () {
                m_selectStruct.setItem(this);
            });
        }
    }

    if (!pageVariable.prodPValueCache.containKey(m_cachekey)) {
        var m_prodproperty = new pdm.prodproperty();
        m_prodproperty.ProdProperty_Id = prodproperty_id;
        if (pageVariable.isSSProds) {
            if (Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) < 1000000) {
                m_prodproperty.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
            }
        }
        else {
            m_prodproperty.Product_Id = pageVariable.handlerProductFrm.product_id;
        }

        m_prodproperty.queryPropValueByProd(function (tableSource) {

            pageVariable.prodPValueList.bindDataSource(tableSource);

            /* 新增销售商品的时候 */
            if (pageVariable.isSSProds && Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) > 1000000) {
                $.each(pageVariable.definedProps, function () {
                    pageVariable.prodPValueList.addData(this.PropValue_Id, this);
                });
            }

            var m_objs = pageVariable.prodPValueList.dataSource.items.arrValues;
            pageVariable.prodPValueCache.setItem(m_cachekey, m_objs);

            if (m_prodPValueIds) {
                pageVariable.prodPValueList.setSelectedItems(m_selectStruct);
            }
        });
    }
    else {
        var m_objs = pageVariable.prodPValueCache.getItem(m_cachekey);

        pageVariable.prodPValueList.bindDataSource(m_objs);

        if (m_prodPValueIds) {
            pageVariable.prodPValueList.setSelectedItems(m_selectStruct);
        }
    }
}
/* 保存商品属性值 */
function saveProdProp() {
    innerSaveProdProp();
    pageVariable.handlerPropFrm.close();
}
function innerSaveProdProp() {
    var m_property_id = pageVariable.handlerPropFrm.prodproperty_id;
    var m_pvalueIds = [];
    var m_pvalues = [];

    var m_selectItems = pageVariable.prodPValueList.getSelectedItems();
    $.each(m_selectItems, function () {
        m_pvalueIds.push(this.PropValue_Id);
        m_pvalues.push(this.PValue);
    });

    var m_obj = null;
    if (pageVariable.isSSProds) {
        m_obj = pageVariable.ssPropList.getItem(m_property_id);
    }
    else {
        m_obj = pageVariable.propList.getItem(m_property_id);
    }

    if (m_obj) {
        m_obj.ProdPValueIdRange = m_pvalueIds.join(",");
        m_obj.ProdPValueRange = m_pvalues.join(",");

        if (pageVariable.isSSProds) {

            var m_itemsource = pageVariable.ssPropList.dataSource.items.arrValues;
            var m_seq = $("#txtPropSeq").val();

            if (m_seq > 0 && m_seq < m_itemsource.length) {
                var m_oldseq = m_obj.Seq;
                $.each(m_itemsource, function () {
                    if (m_seq > 0 && this.Seq == m_seq) {
                        m_obj.Seq = this.Seq;
                        this.Seq = m_oldseq;
                        m_seq = 0;
                    }
                });
                m_itemsource.sort(sortProdProp);
            }

            pageVariable.handlerSSProdFrm.ss_product.PropTable = m_itemsource;
            pageVariable.ssPropList.bindDataSource(m_itemsource);

            generateSSInnerProds();
            generateSSSalePrice();

            generateSSSkuPic();
        }
        else {
            var m_itemsource = pageVariable.propList.dataSource.items.arrValues;
            var m_seq = $("#txtPropSeq").val();

            if (m_seq > 0 && m_seq < m_itemsource.length) {
                var m_oldseq = m_obj.Seq;
                $.each(m_itemsource, function () {
                    if (m_seq > 0 && this.Seq == m_seq) {
                        m_obj.Seq = this.Seq;
                        this.Seq = m_oldseq;
                        m_seq = 0;
                    }
                });
                m_itemsource.sort(sortProdProp);
            }

            pageVariable.propList.bindDataSource(m_itemsource);

            //刷新图片列表
            loadProdPicsFromPage();
            pageVariable.isloadProdPic = true;

            pageVariable.hasdeleteditems = generateSkuProducts();

            generateSkuPic();
        }
    }
    else {
        var m_propCtrl = $("#ddlProp");

        m_obj = {};
        m_obj.ProdProperty_Id = m_propCtrl.val();
        m_obj.ProdPropName = m_propCtrl.find("option:selected").text();
        m_obj.IsSku = $("#ddlPropType").val();
        m_obj.ProdPValueIdRange = m_pvalueIds.join(",");
        m_obj.ProdPValueRange = m_pvalues.join(",");
        m_obj.Seq = $("#txtPropSeq").val();

        m_obj.sourceFrom = 2;

        if (pageVariable.isSSProds) {
            pageVariable.ssPropList.addData(m_obj.ProdProperty_Id, m_obj);

            pageVariable.handlerSSProdFrm.ss_product.PropTable = pageVariable.ssPropList.dataSource.items.arrValues;
            generateSSInnerProds();
            generateSSSalePrice();

            generateSSSkuPic();
        }
        else {
            pageVariable.propList.addData(m_obj.ProdProperty_Id, m_obj);

            //刷新图片列表
            loadProdPicsFromPage();
            pageVariable.isloadProdPic = true;

            pageVariable.hasdeleteditems = generateSkuProducts();

            generateSkuPic();
        }
    }
}
/* 属性排序 */
function sortProdProp(prop1, prop2) {
    return Number(prop1.Seq) > Number(prop2.Seq) ? 1 : -1;
}
/* 打开删除属性的窗体 */
function openDeletePropFrm() {
    if (!pageVariable.delPropFrm) {
        pageVariable.delPropFrm = new uicontrol.confirmDelete(deleteProp);
    }

    var m_key = $(this).attr("tag");
    var m_obj = null;
    if (pageVariable.isSSProds) {
        m_obj = pageVariable.ssPropList.getItem(m_key);
    }
    else {
        m_obj = pageVariable.propList.getItem(m_key);
    }

    pageVariable.delPropFrm.prodproperty_id = m_key;
    pageVariable.delPropFrm.showConfirm(mlm.C0464 + mlm.C0165 + "(" + m_obj.ProdPropName + ") ?");
}
/* 删除属性 */
function deleteProp() {
    if (pageVariable.isSSProds) {
        pageVariable.ssPropList.deleteData(pageVariable.delPropFrm.prodproperty_id);

        pageVariable.handlerSSProdFrm.ss_product.PropTable = pageVariable.ssPropList.dataSource.items.arrValues;
        generateSSInnerProds();
        generateSSSalePrice();

        generateSSSkuPic();
    }
    else {
        pageVariable.propList.deleteData(pageVariable.delPropFrm.prodproperty_id);

        //刷新图片列表
        loadProdPicsFromPage();
        pageVariable.isloadProdPic = true;
        pageVariable.hasdeleteditems = generateSkuProducts();

        generateSkuPic();
    }

    pageVariable.delPropFrm.close();
}

/* 打开添加商品属性值的窗体 */
function openNewPValueFrm() {
    if (!pageVariable.handlerPValueFrm) {
        pageVariable.handlerPValueFrm = new uicontrol.dialog("handlerPValueFrm", "", { width: 800, position: ["auto", 35] }, savePValue);
    }

    $("#txtPValue").val("");
    $("#txtPValueCode").val("");

    pageVariable.handlerPValueFrm.prodpvalue_id = 0;
    pageVariable.handlerPValueFrm.action = "New";
    pageVariable.handlerPValueFrm.setTitle(mlm.C0061 + mlm.C0608);
    pageVariable.handlerPValueFrm.show();
}
/* 打开修改商品属性值的窗体 */
function openModifyPValueFrm() {
    if (!pageVariable.handlerPValueFrm) {
        pageVariable.handlerPValueFrm = new uicontrol.dialog("handlerPValueFrm", "", { width: 800, position: ["auto", 35] }, savePValue);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.prodPValueList.getItem(m_key);
    $("#txtPValue").val(m_obj.PValue);
    $("#txtPValueCode").val(m_obj.PValueCode);

    pageVariable.handlerPValueFrm.prodpvalue_id = m_key;
    pageVariable.handlerPValueFrm.action = "Modify";
    pageVariable.handlerPValueFrm.setTitle(mlm.C0061 + mlm.C0608);
    pageVariable.handlerPValueFrm.show();
}
/* 保存商品属性值 */
function savePValue() {

    var m_pvalueStr = $.trim($("#txtPValue").val());
    if (!m_pvalueStr) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0620);
        return;
    }

    var m_pvalue = {};
    m_pvalue.ProdProperty_Id = pageVariable.handlerPropFrm.prodproperty_id;
    m_pvalue.PValue = m_pvalueStr;
    m_pvalue.PValueCode = $.trim($("#txtPValueCode").val());
    if (pageVariable.isSSProds) {
        m_pvalue.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id == 0 ? -1 : pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
    }
    else {
        m_pvalue.Product_Id = pageVariable.handlerProductFrm.product_id == 0 ? -1 : pageVariable.handlerProductFrm.product_id;
    }
    var m_selectStruct = new datastruct.dictionary();
    var m_selectedItems = pageVariable.prodPValueList.getSelectedItems();
    $.each(m_selectedItems, function () {
        m_selectStruct.setItem(this.PropValue_Id, null);
    });

    if (pageVariable.handlerPValueFrm.action == "New") {

        pageVariable.maxPvGuid++;
        m_pvalue.PropValue_Id = pageVariable.maxPvGuid;

        pageVariable.prodPValueList.addData(m_pvalue.PropValue_Id, m_pvalue);

        m_selectStruct.setItem(m_pvalue.PropValue_Id);
        pageVariable.prodPValueList.setSelectedItems(m_selectStruct);
    }
    else {

        m_pvalue.PropValue_Id = pageVariable.handlerPValueFrm.prodpvalue_id;

        /*  修改前的数据 */
        var m_oldPValue = pageVariable.prodPValueList.getItem(m_pvalue.PropValue_Id).PValue;

        pageVariable.prodPValueList.modifyData(m_pvalue.PropValue_Id, m_pvalue);
        pageVariable.prodPValueList.setSelectedItems(m_selectStruct);
    }

    //待更新的属性值
    pageVariable.definedProps[m_pvalue.PropValue_Id] = m_pvalue;

    var m_cachekey;
    if (pageVariable.isSSProds) {
        m_cachekey = m_pvalue.ProdProperty_Id + "-S" + m_pvalue.SS_Product_Id;
    }
    else {
        m_cachekey = m_pvalue.ProdProperty_Id + "-P" + m_pvalue.Product_Id;
    }
    pageVariable.prodPValueCache.setItem(m_cachekey, pageVariable.prodPValueList.dataSource.items.arrValues);

    innerSaveProdProp();

    pageVariable.handlerPValueFrm.close();
}
/* 打开删除商品属性值的窗体 */
function openDeletePValueFrm() {
    if (!pageVariable.delPValueFrm) {
        pageVariable.delPValueFrm = new uicontrol.confirmDelete(deletePValue);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.prodPValueList.getItem(m_key);

    pageVariable.delPValueFrm.m_key = m_obj.ProdProperty_Id + "-" + m_obj.Product_Id;
    pageVariable.delPValueFrm.prodpvalue_id = m_key;
    pageVariable.delPValueFrm.showConfirm(mlm.C0464 + mlm.C0608 + "(" + m_obj.PValue + ") ?");
}
/* 删除商品属性值 */
function deletePValue() {
    pageVariable.prodPValueList.deleteData(pageVariable.delPValueFrm.prodpvalue_id);

    innerSaveProdProp();
    pageVariable.prodPValueCache.setItem(pageVariable.delPValueFrm.m_key, pageVariable.prodPValueList.dataSource.items.arrValues);

    //从待更新的属性值中移除
    pageVariable.prodPValueCache.removeItem(pageVariable.delPValueFrm.m_key);

    pageVariable.delPValueFrm.close();
}

/* 展示新增或修改产品窗体的Tab */
function showProdTab(event, ui) {

    pageVariable.isSSProds = null;

    if (ui.index == 1) {
        if (pageVariable.isloadProdPic) {
            if (pageVariable.handlerProductFrm.product_id == "0") {
                loadTempUploadPics();
            }
            else {
                loadProdPics();
            }

            pageVariable.isloadProdPic = false;
        }
    }
    else if (ui.index == 3) {

        loadSkuProducts();
    }
}
/* 生成Sku单元 */
function generateSkuProducts() {

    var hasdeleteditems = false;
    var m_skudict = new datastruct.dictionary();
    $.each(pageVariable.handlerProductFrm.product.SKUProducts, function () {
        m_skudict.setItem(this.SkuProd_Key, this);
    });

    var m_skuObjs = generateSkuObjs(pageVariable.propList.dataSource.items.arrValues);
    if (m_skuObjs.length > 0) {
        if (m_skuObjs.length == 1 && pageVariable.handlerProductFrm.product.SKUProducts["default"]) {
            var m_default = pageVariable.handlerProductFrm.product.SKUProducts["default"];
            var m_skuitem = m_skuObjs[0];

            var m_obj = {};
            m_obj.SkuProd_Key = m_skuitem.SkuKey;
            m_obj.PropValues = m_skuitem.SkuKey;
            m_obj.SkuProps = m_skuitem.SkuProps;
            m_obj.PV_Txt = m_skuitem.PV_Txt;
            m_obj.ProdCode = m_default.ProdCode;
            m_obj.Cost = m_default.Cost;
            m_obj.SafetyStock = m_default.SafetyStock;
            m_obj.SkuProduct_Id = m_default.SkuProduct_Id;
            m_obj.Product_Pic_Id = m_default.Product_Pic_Id;
            m_obj.BrowsePicUrl = m_default.BrowsePicUrl;

            pageVariable.handlerProductFrm.product.SKUProducts = {};
            pageVariable.handlerProductFrm.product.SKUProducts[m_obj.SkuProd_Key] = m_obj;
        }
        else {
            //当首次添加产品的时候,避免出现多余的SKU
            var m_defaultsku = pageVariable.handlerProductFrm.product.SKUProducts["default"];
            if (m_defaultsku && (!$.trim(m_defaultsku.ProdCode) || m_defaultsku.ProdCode == "自动生成")) {
                pageVariable.handlerProductFrm.product.SKUProducts = {};
            }

            var m_newitems = new datastruct.dictionary();

            $.each(m_skuObjs, function () {
                /* 构建Sku库存单元 */
                var m_obj = m_skudict.getItem(this.SkuKey);
                if (!m_obj) {
                    m_obj = {};
                    m_obj.SkuProd_Key = this.SkuKey.toString();
                    m_obj.PropValues = this.SkuKey;
                    m_obj.ProdCode = mlm.C0142; 
                    m_obj.Cost = 0;
                    m_obj.SafetyStock = 0;
                    pageVariable.handlerProductFrm.product.SKUProducts[m_obj.SkuProd_Key] = m_obj;
                }
                m_obj.SkuProps = this.SkuProps;
                m_obj.PV_Txt = this.PV_Txt;

                m_newitems.setItem(this.SkuKey);
            });

            $.each(pageVariable.handlerProductFrm.product.SKUProducts, function () {
                if (!m_newitems.containKey(this.SkuProd_Key)) {
                    /* 用于支持记录是否显示删除线 */
                    this.deletedFlag = true;
                    hasdeleteditems = true;
                }
                else {
                    this.deletedFlag = false;
                }
            });
        }
    }
    else {
        if (pageVariable.propList.dataSource.items.arrValues.length == 0) {
            if (!m_skudict.getItem("default")) {
                m_obj = {};
                m_obj.SkuProd_Key = "default";
                m_obj.PropValues = "";
                m_obj.ProdCode = mlm.C0142;
                m_obj.SkuProps = ""; 
                m_obj.Cost = 0;
                m_obj.SafetyStock = 0;
                pageVariable.handlerProductFrm.product.SKUProducts["default"] = m_obj;
            }

            $.each(pageVariable.handlerProductFrm.product.SKUProducts, function () {
                if (this.SkuProd_Key != "default") {
                    this.deletedFlag = true;
                    hasdeleteditems = true;
                }
                else {
                    this.deletedFlag = false;
                }
            });
        }
    }

    pageVariable.isloadSkuProd = true;

    return hasdeleteditems;
}
/* 加载Sku单元 */
function loadSkuProducts() {

    if (!pageVariable.skuProdList) {
        pageVariable.skuProdList = new uicontrol.tableList("skuProdList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 350,
                                         keyColumn: "SkuProd_Key",
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: constructSkuProdPicCell },
                                                { display: mlm.C0128, name: "SkuProps", width: 160, align: 'left', adjust: true, createCell: createSkuPropsCell },
                                                { display: mlm.C1205, name: "ProdCode", width: 120, align: 'center', adjust: true, createCell: createProdCodeCell },
                                                { display: mlm.C1619, name: "SafetyStock", width: 80, align: 'center', adjust: true, createCell: createSafetyStockCell },
                                                { display: mlm.C1064, name: "Cost", width: 100, align: 'center', adjust: true, createCell: createCostCell },
                                                { display: mlm.C1652, name: "InventoryCost", width: 80, align: 'right', adjust: true, createCell: function (key, cellValue) { return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue); } }]
                                     });
    }

    if (pageVariable.isloadSkuProd) {
        pageVariable.skuProdList.bindDataSource(pageVariable.handlerProductFrm.product.SKUProducts);
        pageVariable.isloadSkuProd = false;
    }
}
/* 构建商品图片列 */
function constructSkuProdPicCell(key, cellValue) {

    var m_obj = this.keyObj;

    var m_src = "";
    if (cellValue) {
        if (cellValue.indexOf("http://") == -1) {
            m_src = window.webLocation + cellValue;
        }
        else {
            m_src = cellValue;
        }
    }
    else {
        m_src = window.webLocation + "BZM/Css/Images/nopic.png";
    }

    return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
}
/* 生成Sku对象 */
function generateSkuObjs(propObjs) {

    var m_skuObjs = [];

    /* 支持属性值组合按序号显示 */
    pageVariable.m_propSeqs = new datastruct.dictionary();

    /* 获取商品Sku属性和详细信息 */
    var m_skuProps = [];

    var i = 1;
    $.each(propObjs, function () {
        if (this.IsSku == "1") {
            m_skuProps.push(this);
        }

        pageVariable.m_propSeqs.setItem(this.ProdProperty_Id, i);
        i++;
    });
    /* Sku属性集合 */
    pageVariable.temp_skuProps = m_skuProps;

    if (!pageVariable.propSeqFunc) {
        /* 属性值排序算法 */
        pageVariable.propSeqFunc = function (a, b) {
            return Number(pageVariable.m_propSeqs.getItem(a.ProdProperty_Id)) > Number(pageVariable.m_propSeqs.getItem(b.ProdProperty_Id)) ? 1 : -1;
        };
        /* 属性Id排序算法 */
        pageVariable.compSeqFunc = function (a, b) {
            return Number(a) > Number(b) ? 1 : -1;
        };
    }

    /* Sku单元列表 */
    var m_skuObjects = [];
    if (m_skuProps.length > 0) {

        constructSkuProd(m_skuObjects, 0, {});

        var m_newitems = new datastruct.dictionary();
        $.each(m_skuObjects, function () {

            var m_objArr = [];
            /* 属性值顺序 */
            var m_valueArr = [];
            /* 属性Id顺序 */
            var m_keyArr = [];
            $.each(this, function () {
                m_objArr.push(this);
            });

            /* 属性排序 */
            m_objArr.sort(pageVariable.propSeqFunc);
            $.each(m_objArr, function () {
                m_keyArr.push(this.key);
                m_valueArr.push(this.value);
            });

            var m_pv_txt = m_keyArr.join("_");

            /* 关键属性产品的主键排序(关键) */
            m_keyArr.sort(pageVariable.compSeqFunc);
            var m_key = m_keyArr.join("_");

            /* 构建Sku单元 */
            var m_obj = {};
            m_obj.SkuKey = m_key;
            m_obj.PV_Txt = m_pv_txt;
            m_obj.SkuProps = m_valueArr.join("-");

            m_skuObjs.push(m_obj);
        });
    }

    return m_skuObjs;
}
/* 构造关键属性产品组合列表 */
function constructSkuProd(skuProds, currCount, propValue) {
    var m_prop = pageVariable.temp_skuProps[currCount];

    if (!m_prop.ProdPValueIdRange) {
        return;
    }

    var m_pvalueIds = m_prop.ProdPValueIdRange.split(",");
    var m_pvalues = m_prop.ProdPValueRange.split(",");
    var m_propValues = [];

    var i = 0;
    $.each(m_pvalueIds, function () {
        m_propValues.push({ key: m_pvalueIds[i], value: m_pvalues[i] });
        i++;
    });

    if (currCount == pageVariable.temp_skuProps.length - 1) {

        $.each(m_propValues, function () {
            var m_skuProd = {};
            this.ProdProperty_Id = m_prop.ProdProperty_Id;
            m_skuProd[m_prop.ProdProperty_Id] = this;
            $.extend(m_skuProd, propValue);

            skuProds.push(m_skuProd);
        });

        propValue = {};
        currCount = 0;
    }
    else {
        currCount++;
        $.each(m_propValues, function () {
            this.ProdProperty_Id = m_prop.ProdProperty_Id;
            propValue[m_prop.ProdProperty_Id] = this;

            constructSkuProd(skuProds, currCount, propValue);
        });
    }
}
/* 构建Sku商品编码单元格 */
function createProdCodeCell(key, cellValue) {
    var m_obj = this.keyObj;
    if (m_obj.deletedFlag) {
        return "<span style='text-decoration: line-through'>" + cellValue + "</span>";
    }
    else {
        return "<input id='txtProdCode_" + key + "' tag='" + key + "' type='text' class='text-input' style='width: 110px;' onclick='clickProdCode.call(this);' onblur='leaveProdCode.call(this);' onkeypress='uicontrol.func.checkInput(event);' value='" + cellValue + "' onchange='changeProdCode.call(this);' />";
    }
}
/* 构建安全库存单元格 */
function createSafetyStockCell(key, cellValue) {
    var m_obj = this.keyObj;
    if (m_obj.deletedFlag) {
        return "<span style='text-decoration: line-through'>" + m_obj.SafetyStock + "</span>";
    }
    else {
        return "<input id='txtSafetyStock_" + key + "' tag='" + key + "' type='text' class='text-input' style='width: 70px;' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + m_obj.SafetyStock + "' onchange='changeSafetyStock.call(this);' />";
    }
}
/* 构建采购成本单元格 */
function createCostCell(key, cellValue) {
    var m_obj = this.keyObj;
    if (m_obj.deletedFlag) {
        return "<span style='text-decoration: line-through'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue) + "</span>";
    }
    else {
        return keycontext.keyparam.syscurrsymbol + " <input id='txtCost_" + key + "' tag='" + key + "' type='text' class='text-input' style='width: 70px;' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + Number(cellValue).toFixed(2) + "' onchange='changeSkuCost.call(this);' />";
    }
}
/* 构建Sku属性单元格 */
function createSkuPropsCell(key, cellValue) {
    var m_obj = this.keyObj;
    if (m_obj.deletedFlag) {
        return "<span style='text-decoration: line-through'>" + cellValue + "</span>";
    }
    else {
        return "<span'>" + cellValue + "</span>";
    }
}

/* 点击商品编码 */
function clickProdCode() {
    var m_prodcode = $.trim($(this).val());
    if (m_prodcode == mlm.C0142) {
        $(this).val("");
    }
}
/* 离开商品编码 */
function leaveProdCode() {
    var m_prodcode = $.trim($(this).val());
    if (m_prodcode == "") {
        $(this).val(mlm.C0142);
    }
}
/* 改变商品编码事件 */
function changeProdCode() {
    var m_ctrl = $(this);
    var m_key = m_ctrl.attr("tag");
    var m_prodcode = $.trim(m_ctrl.val());
    var m_obj = pageVariable.skuProdList.getItem(m_key);

    var m_break = false;
    var m_skuitems = pageVariable.skuProdList.dataSource.items.arrValues;
    $.each(m_skuitems, function () {

        if (m_break) {
            return;
        }

        if (!this.deletedFlag) {
            if (m_prodcode && this.ProdCode != mlm.C0142 && this.ProdCode == m_prodcode) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C0635 + "(" + m_prodcode + ")" + mlm.C0636);
                m_ctrl.val("");
                m_break = true;
            }
        }
    });

    if (m_break) {
        return;
    }

    $.each(m_skuitems, function () {
        if (this.deletedFlag) {
            if (this.ProdCode == m_prodcode) {
                m_obj.ProdCode = m_prodcode;
                m_obj.Cost = this.Cost;
                m_obj.SkuProduct_Id = this.SkuProduct_Id;
                m_obj.Product_Pic_Id = this.Product_Pic_Id;
                m_obj.BrowsePicUrl = this.BrowsePicUrl;

                pageVariable.skuProdList.modifyData(m_obj.SkuProd_Key, m_obj);
            }
        }
    });

    if (!m_break) {
        m_obj.ProdCode = m_prodcode;
    }
}
/* 改变安全库存事件 */
function changeSafetyStock() {
    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.skuProdList.getItem(m_key);

    m_obj.SafetyStock = $(this).val();
}
/* 改变成本事件 */
function changeSkuCost() {
    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.skuProdList.getItem(m_key);

    m_obj.Cost = $(this).val();
}

/* 构建商品图片的表格 */
function constructPicTable(dataItem) {

    var m_picKey = null;
    if (pageVariable.isSSProds) {
        m_picKey = dataItem.Product_Pic_Id;
    }
    else {
        m_picKey = dataItem.TempUploadPic_Id ? dataItem.TempUploadPic_Id : dataItem.Product_Pic_Id;
    }

    var m_picUrl = "";
    if (dataItem.PicUrl.indexOf("http://") == -1) {
        m_picUrl = window.webLocation + dataItem.PicUrl;
    }
    else {
        m_picUrl = dataItem.PicUrl;
    }

    var m_ctrl = $("<div></div>");

    var m_html = [];
    m_html.push("<div class='product-pic'>");
    m_html.push("<img src='" + m_picUrl + "' class='product-pic-img' onload='commoncore.func.positionCenterImg.call(this);' onerror='commoncore.func.failLoadImg.call(this);' />");
    m_html.push("</div>");

    m_ctrl.append(m_html.join(""));

    var m_str = "";

    if (dataItem.OtherProps && dataItem.OtherProps.RelPValues) {
        m_str = dataItem.OtherProps.RelPValues;
    }
    else {
        if (dataItem.IsMain == "1") {
            m_str = mlm.C0262;
        }
        else {
            m_str = mlm.C0263;
        }
    }

    var m_lb_ctrl = $("<div class='lb-gray-symbol' style='margin: 2px' tag='" + m_str + "'></div>");
    var m_len = m_str.getBytesCount();
    if (m_len > 12) {
        m_str = m_str.substringByBytes(12) + "...";
        m_lb_ctrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
    }

    m_lb_ctrl.text(m_str);
    m_ctrl.append(m_lb_ctrl);

    m_ctrl.append("<div><a href='javascript:void(\"0\")' class='bt-link' onclick='openModifyPicFrm(\"" + m_picKey + "\");'>" + mlm.C0061 + "</a><a href='javascript:void(\"0\")' class='bt-link' onclick='openDelPicFrm(\"" + m_picKey + "\");'>" + mlm.C0062 + "</a></div>");

    return m_ctrl;
}

/* 设置属性到商品中 */
function setPropToProduct(m_product, m_props) {
    m_product.SKUProps = {};
    m_product.ExpandProps = {};

    var m_prodproperty_ids = [];
    $.each(m_props, function () {
        if (this.IsSku == "1") {
            m_product.SKUProps[this.ProdProperty_Id] = this.ProdPValueIdRange;
        }
        else {
            m_product.ExpandProps[this.ProdProperty_Id] = this.ProdPValueIdRange;
        }

        m_prodproperty_ids.push(this.ProdProperty_Id);
    });
    if (m_prodproperty_ids.length > 0) {
        m_product.ProdProperty_Ids = ";" + m_prodproperty_ids.join(";") + ";";
    }
    m_product.DefinedProps = pageVariable.definedProps;
}
/* 新增或修改商品 */
function saveProduct(isCloseFrm, modifiedEvent) {

    var m_prodName = $.trim($("#txtProdName").val());
    if (!m_prodName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0195);
        $("#lbBasicProdInfo").trigger("click");
        return false;
    }

    if (m_prodName.lengthByBytes() > 80) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1074);
        $("#lbBasicProdInfo").trigger("click");
        return false;
    }

    var m_unit = $.trim($("#txtUnit").val());
    if (m_unit.lengthByBytes() > 10) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1075);
        $("#lbBasicProdInfo").trigger("click");
        return false;
    }

    var m_weight = Number($("#txtWeight").val());
    if (!m_weight || m_weight == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1076);
        $("#lbBasicProdInfo").trigger("click");
        return false;
    }

    var m_abort = false;
    var m_props = pageVariable.propList.dataSource.items.arrValues;
    $.each(m_props, function () {
        if (m_abort) {
            return;
        }

        if (this.IsSku == "1") {
            var m_propValues = this.ProdPValueIdRange;
            if (!m_propValues || m_propValues.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(this.ProdPropName + mlm.C0193);
                $("#lbBasicProdInfo").trigger("click");
                m_abort = true;
            }
        }
    });

    if (m_abort) {
        return false;
    }

    if (pageVariable.hasdeleteditems) {
        
        pageframe.control.alertDialog.showAlertInfo(mlm.C0637);
        $("#lbSkuList").trigger("click");
        pageVariable.hasdeleteditems = null;
        return false;
    }

    var m_product = new pdm.product();
    m_product.Product_Id = pageVariable.handlerProductFrm.product_id;
    m_product.ProdName = m_prodName;
    m_product.Brand_Id = !pageVariable.selBrand.brandId ? 0 : pageVariable.selBrand.brandId;
    m_product.Unit = m_unit;
    m_product.Weight = m_weight;
    m_product.Remark = $.trim($("#prodHtmlTool").val()).replace(/"/g, "^").replace(/'/g, "~");
    m_product.CustomMaterial = $.trim($("#txtCustomMaterial").val());
    m_product.CustomProdName = $.trim($("#txtCustomProdName").val());
    m_product.CustomProdName_CN = $.trim($("#txtCustomProdName_CN").val());
    m_product.CustomValue = $("#txtCustomValue").val();
    m_product.CustomCode = $.trim($("#txtCustomCode").val());

    var m_factorycountry = pageVariable.chkFactoryCountry.getObj().globalArea_Ids;
    m_product.GlobalArea_Id = !m_factorycountry ? 0 : m_factorycountry;
    m_product.DefinedProps = pageVariable.definedProps;

    m_product.PdcObjs = [];

    if (pageVariable.selPdc.pdcId instanceof Array) {
        $.each(pageVariable.selPdc.pdcId, function () {
            var m_pdcSeqItem = { Product_Id: m_product.Product_Id, ProdCategory_Id: Number(this) };
            m_product.PdcObjs.push(m_pdcSeqItem);
        });
    }
    else {
        var m_pdcSeqItem = { Product_Id: m_product.Product_Id, ProdCategory_Id: pageVariable.selPdc.pdcId };
        m_product.PdcObjs.push(m_pdcSeqItem);
    }

    setPropToProduct(m_product, m_props);

    if (pageVariable.skuProdList && pageVariable.skuProdList.dataSource.items.arrValues.length > 0) {
        m_product.SKUProducts = {};
        $.each(pageVariable.skuProdList.dataSource.items.arrValues, function () {
            if (!this.deletedFlag) {
                var m_skuobj = this;
                var m_prodCode = $.trim($("#txtProdCode_" + this.SkuProd_Key).val());
                if (m_prodCode != mlm.C0142) {
                    m_skuobj.ProdCode = m_prodCode;
                }
                else {
                    m_skuobj.ProdCode = "";
                }
                m_skuobj.Product_Pic_Id = this.Product_Pic_Id;
                m_skuobj.PropValues = this.SkuProd_Key;
                m_skuobj.PV_Txt = this.PV_Txt;
                m_skuobj.Cost = $("#txtCost_" + this.SkuProd_Key).val();
                m_skuobj.SafetyStock = $("#txtSafetyStock_" + this.SkuProd_Key).val();
                m_product.SKUProducts[this.SkuProd_Key] = m_skuobj;
            }
        });
    }

    if (pageVariable.handlerProductFrm.action == "New") {

        m_product.newProduct(function (retTable) {

            var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
            pageVariable.productList.addData(m_jsonobj.Product_Id, m_jsonobj);

            clearPicList();
            pageVariable.definedProps = {};
            pageVariable.handlerProductFrm.close();
        });
    }
    else {
        m_product.modifyProduct(function (retTable) {

            var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
            pageVariable.productList.modifyData(m_jsonobj.Product_Id, m_jsonobj);

            pageVariable.definedProps = {};
            pageVariable.handlerProductFrm.close();
        }, function (error) {
            pageframe.control.alertDialog.showAlertInfo(error.Message);
        });
    }
}
/* 删除商品 */
function deleteProduct() {
    var m_product = new pdm.product();
    m_product.Product_Id = pageVariable.delProductFrm.product_id;

    m_product.getProdSeqCount(function (retObj) {
        if (retObj == "1") {
            m_product.Product_Id = pageVariable.delProductFrm.product_id;
            m_product.deleteProduct(function () {
                $.each(pageVariable.productList.dataSource.items.arrValues, function () {
                    if (this.Product_Id == m_product.Product_Id) {
                        pageVariable.productList.deleteData(this.Product_Id, function (leavedItem) {
                            leavedItem.Seq = leavedItem.Seq - 1;
                        });
                    }
                });
            });
        }
        else {
            if (!pageVariable.delProductAlertFrm) {
                pageVariable.delProductAlertFrm = new uicontrol.confirmDelete(function () {
                    m_product.Product_Id = pageVariable.delProductFrm.product_id;
                    m_product.deleteProduct(function () {

                        var m_deletedIds = [];

                        $.each(pageVariable.productList.dataSource.items.arrValues, function () {
                            if (this.Product_Id == m_product.Product_Id) {
                                m_deletedIds.push(this.Product_Id);
                            }
                        });

                        $.each(m_deletedIds, function () {
                            pageVariable.productList.deleteData(this, function (leavedItem) {
                                leavedItem.Seq = leavedItem.Seq - 1;
                            });
                        });

                        pageVariable.delProductAlertFrm.close();
                    });
                });
            }

            var m_key = $(this).attr("tag");
            pageVariable.delProductAlertFrm.product_id = m_product.Product_Id;

            pageVariable.delProductAlertFrm.showConfirm(mlm.C0333);
        }

        pageVariable.delProductFrm.close();
    });
}

/* 打开查询商品的窗体 */
function openQueryProdFrm() {
    if (!pageVariable.queryProdFrm) {
        pageVariable.queryProdFrm = new uicontrol.dialog("queryProdFrm", mlm.C0171, { width: 825, position: ["auto", 15] },
                                        function () { queryProduct(1, pageVariable.productList.pageNumber); });

        pageVariable.ulProdStates = new uicontrol.selectbox("ulProdStates", "radio");
        var items = [];
        items.push({ key: "-1", value: mlm.C0403 });
        items.push({ key: "0", value: mlm.C1150 });
        items.push({ key: "1", value: mlm.C1149 });
        pageVariable.ulProdStates.bindSource(items);
        pageVariable.ulProdStates.setSelectedItem([{ key: "-1"}]);

        pageVariable.selQueryPdc = new bizcontrol.selectpdc($("#selQueryPdc"), true, null, null);
        pageVariable.selBrand_q = new bizcontrol.selectbrand($("#selBrand_q"));
        pageVariable.queryProdTabs = $("#queryProdTabs").tabs({ show: showQueryTabs });

        $("#btAddQueryProp").click(openAddQueryPropFrm);

        if (pageVariable.pdcTree.selectedItem) {
            pageVariable.selQueryPdc.setPdc({ ProdCategory_Id: [pageVariable.pdcTree.selectedItem.key], PdcName: pageVariable.pdcTree.selectedItem.value });
        }
    }

    var m_pdcKey = 0;
    if (pageVariable.pdcTree.selectedItem) {
        m_pdcKey = pageVariable.pdcTree.selectedItem.key;
    }
    else {
        $("#queryPropArea").empty();
    }

    pageVariable.queryProdFrm.pdcId = m_pdcKey;
    pageVariable.queryProdFrm.show();
}
/* 展示查询Tab */
function showQueryTabs(event, ui) {
    if (ui.index == 1) {
        if (!pageVariable.queryPropList) {
            pageVariable.queryPropList = new uicontrol.tableList("queryPropList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ProdProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 90, align: 'left' },
                                                { display: mlm.C0071, name: "ProdPValueRange", width: 450, align: 'left', adjust: true, createCell: constructProdPropValueCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: createQueryOperaCell}]
                                    });
        }
        fillProps(pageVariable.queryPropList, pageVariable.selQueryPdc.pdcId);
    }
}
/* 创建属性设置列 */
function createQueryOperaCell(key, cellvalue) {
    return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openModifyQueryPropFrm.call(this);'>" + mlm.C0611 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='deleteQueryProp.call(this);'>" + mlm.C0062 + "</a>";
}
/* 填充关键属性 */
function fillQueryPropCtrl(props) {
    var m_queryPropArea = $("#queryPropArea");
    m_queryPropArea.empty();

    $("#dvQB").addClass("last-item");

    pageVariable.queryPropValues.clear();

    if (pageVariable.queryProdFrm) {
        pageVariable.queryProdFrm.isLoad = true;
    }

    var m_lastExpandTr;

    /* 循环所有属性 */
    $.each(props, function () {
        /* 关键属性 */
        if (this.IsKeyAttribute == "1") {

            /* 属性的键值对 */
            var m_valueSource = [];

            var m_valueList = this.ValueRange.split(",");
            var m_valueIdList = this.ValueRangeIds.split(",");

            $.each(m_valueList, function (i, item) {
                m_valueSource.push({ key: m_valueIdList[i], value: item });
            });

            /* 创建行 */
            var m_tr = $("<div class='submitForm-tr'></div>");
            m_tr.append("<span class='title'>" + this.ProdPropName + ":</span>");
            var m_rightspan = $("<span class='queryprop-item'></span>");

            var m_propCtrl = $(commoncore.func.generatePropCtrl("query_" + this.ProdProperty_Id, m_valueSource));
            m_rightspan.append(m_propCtrl);
            m_tr.append(m_rightspan);
            m_queryPropArea.append(m_tr);

            var m_propObj = { ProdProperty_Id: this.ProdProperty_Id, PropCtrl: m_propCtrl };
            pageVariable.queryPropValues.setItem(this.ProdProperty_Id, m_propObj);

            m_lastExpandTr = m_tr;
        }
    });

    if (m_lastExpandTr) {
        $("#dvQB").removeClass("last-item");
        m_lastExpandTr.addClass("last-item");
    }
}
/* 打开选择属性的窗体 */
function openAddQueryPropFrm() {
    if (!pageVariable.selectPropFrm) {
        pageVariable.selectPropFrm = new uicontrol.dialog("selectPropFrm", mlm.C0087, { width: 800, position: ["auto", 25] }, selectQueryPValue);

        $("#ddlSelProp").change(loadQueryPValue);
    }

    $("#dvSelProp").show();

    var m_currPropDict = new datastruct.dictionary();
    $.each(pageVariable.queryPropList.dataSource.items.arrValues, function () {
        m_currPropDict.setItem(this.ProdProperty_Id);
    });

    var m_prodproperty = new pdm.prodproperty();
    if (!pageVariable.allProperties) {
        m_prodproperty.getAllProdPropertys(function (tableSource) {
            pageVariable.allProperties = datastruct.convertion.tableToJson(tableSource);

            var m_propCtrl = $("#ddlSelProp");
            $.each(pageVariable.allProperties, function () {
                if (!m_currPropDict.containKey(this.ProdProperty_Id)) {
                    m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
                }
            });

            if (!$("#ddlSelProp").val()) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1112);
                return;
            }

            loadQueryPValue();
            pageVariable.selectPropFrm.show();
        });
    }
    else {
        var m_propCtrl = $("#ddlSelProp");
        m_propCtrl.empty();
        $.each(pageVariable.allProperties, function () {
            if (!m_currPropDict.containKey(this.ProdProperty_Id)) {
                m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
            }
        });

        if (!$("#ddlSelProp").val()) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1112);
            return;
        }

        loadQueryPValue();
        pageVariable.selectPropFrm.show();
    }

    pageVariable.selectPropFrm.action = "New";
}
/* 打开设置属性的窗体 */
function openModifyQueryPropFrm() {
    if (!pageVariable.selectPropFrm) {
        pageVariable.selectPropFrm = new uicontrol.dialog("selectPropFrm", mlm.C0087, { width: 800, position: ["auto", 25] }, selectQueryPValue);

        $("#ddlSelProp").change(loadQueryPValue);
    }

    var m_key = $(this).attr("tag");
    $("#dvSelProp").hide();
    var m_propvalue = pageVariable.queryPropList.getItem(m_key);
    var m_selectStruct = new datastruct.dictionary();
    if (m_propvalue) {
        var m_prodPValueIds = m_propvalue.ProdPValueIdRange ? m_propvalue.ProdPValueIdRange.split(",") : null;
        if (m_prodPValueIds) {
            $.each(m_prodPValueIds, function () {
                m_selectStruct.setItem(this);
            });
        }
    }

    var m_prodproperty = new pdm.prodproperty();
    if (!pageVariable.allProperties) {
        m_prodproperty.getAllProdPropertys(function (tableSource) {
            pageVariable.allProperties = datastruct.convertion.tableToJson(tableSource);

            var m_propCtrl = $("#ddlSelProp");
            $.each(pageVariable.allProperties, function () {
                m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
            });

            m_propCtrl.val(m_key);
            loadQueryPValue(m_selectStruct);
        });
    }
    else {
        var m_propCtrl = $("#ddlSelProp");
        m_propCtrl.empty();
        $.each(pageVariable.allProperties, function () {
            m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
        });

        m_propCtrl.val(m_key);
        loadQueryPValue(m_selectStruct);
    }

    pageVariable.selectPropFrm.action = "Modify";
    pageVariable.selectPropFrm.show();
}
/* 删除属性 */
function deleteQueryProp() {
    pageVariable.queryPropList.deleteData($(this).attr("tag"));
}
/* 加载查询的属性值 */
function loadQueryPValue(selectStruct) {

    if (!pageVariable.selPValueList) {
        pageVariable.selPValueList = new uicontrol.tableList("selPValueList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 270,
                                        selectModel: "2",
                                        keyColumn: "PropValue_Id",
                                        columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 90, align: 'center', adjust: true, createCell: constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'left' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 180, align: 'left'}]
                                    });
    }

    var m_prodproperty = new pdm.prodproperty();
    m_prodproperty.ProdProperty_Id = $("#ddlSelProp").val();

    if (!pageVariable.queryPValueCache) {
        pageVariable.queryPValueCache = new datastruct.dictionary();
    }

    if (!pageVariable.queryPValueCache.containKey(m_prodproperty.ProdProperty_Id)) {

        m_prodproperty.queryPropValueByProd(function (tableSource) {

            pageVariable.selPValueList.bindDataSource(tableSource);
            pageVariable.queryPValueCache.setItem(m_prodproperty.ProdProperty_Id, tableSource);
            if (selectStruct) {
                pageVariable.selPValueList.setSelectedItems(selectStruct);
            }
        });
    }
    else {
        pageVariable.selPValueList.bindDataSource(pageVariable.queryPValueCache.getItem(m_prodproperty.ProdProperty_Id));
        if (selectStruct) {
            pageVariable.selPValueList.setSelectedItems(selectStruct);
        }
    }
}
/* 选择关键属性值 */
function selectQueryPValue() {

    var m_selectItems = pageVariable.selPValueList.getSelectedItems();
    var m_pvalueIds = [];
    var m_pvalues = [];
    $.each(m_selectItems, function () {
        m_pvalueIds.push(this.PropValue_Id);
        m_pvalues.push(this.PValue);
    });

    var m_propCtrl = $("#ddlSelProp");
    var m_obj = {};
    m_obj.ProdProperty_Id = m_propCtrl.val();
    m_obj.ProdPropName = m_propCtrl.find("option:selected").text();
    m_obj.ProdPValueIdRange = m_pvalueIds.join(",");
    m_obj.ProdPValueRange = m_pvalues.join(",");

    if (pageVariable.selectPropFrm.action == "New") {
        pageVariable.queryPropList.addData(m_obj.ProdProperty_Id, m_obj);
    }
    else {
        pageVariable.queryPropList.modifyData(m_obj.ProdProperty_Id, m_obj);
    }

    pageVariable.selectPropFrm.close();
}
/* 获取商品查询条件 */
function getQueryCondition() {

    var m_conditionObj = {};

    m_conditionObj.keyWord = $.trim($("#txtKeyWord_q").val());
    m_conditionObj.skuProdCode = $.trim($("#txtSkuProdCode_q").val());

    m_conditionObj.pdcIds = [];
    if (pageVariable.selQueryPdc) {
        if (pageVariable.selQueryPdc.pdcId instanceof Array) {
            $.each(pageVariable.selQueryPdc.pdcId, function () {
                m_conditionObj.pdcIds.push(this.toString());
            });
        }
        else {
            if (pageVariable.selQueryPdc.pdcId) {
                m_conditionObj.pdcIds.push(pageVariable.selQueryPdc.pdcId.toString());
            }
        }
    }
    else if (pageVariable.pdcTree.selectedItem) {
        m_conditionObj.pdcIds.push(pageVariable.pdcTree.selectedItem.key);
    }

    m_conditionObj.brandId = 0;
    if (pageVariable.selBrand_q) {
        m_conditionObj.brandId = pageVariable.selBrand_q.brandId;
    }

    m_conditionObj.propValueIds = "";
    if (pageVariable.queryPropList) {
        var propValueIds = [];
        $.each(pageVariable.queryPropList.dataSource.items.arrValues, function () {
            if (this.ProdPValueIdRange) {
                $.each(this.ProdPValueIdRange.split(","), function () {
                    propValueIds.push(this);
                });
            }
        });

        if (propValueIds.length > 0) {
            m_conditionObj.propValueIds = propValueIds.join(",");
        }
    }

    if (pageVariable.ulProdStates) {
        m_conditionObj.prodState = pageVariable.ulProdStates.getSelectedItem()[0];
    }

    return m_conditionObj;
}
/* 查询商品 */
function queryProduct(pageNum, pageCount) {
    var m_conditionObj = getQueryCondition();

    var m_product = new pdm.product();
    m_product.PdcIds = m_conditionObj.pdcIds;
    m_product.BrandId = m_conditionObj.brandId;
    m_product.Key = m_conditionObj.keyWord;
    m_product.SkuProdCode = m_conditionObj.skuProdCode;
    m_product.PropValueIds = m_conditionObj.propValueIds;
    m_product.State = m_conditionObj.prodState;
    m_product.Page = pageNum;
    m_product.PageNum = pageCount;
    m_product.queryProducts(function (source) {
                                pageVariable.productList.dataSource.page = pageNum;
                                pageVariable.productList.bindDataSource(source);

                                if (pageVariable.queryProdFrm) {
                                    pageVariable.queryProdFrm.close();
                                }
                            });
}

/* 打开设置关联SKU相关属性的窗体 */
function openSetRelPValueFrm() {
    if (!pageVariable.setRelPValueFrm) {
        pageVariable.setRelPValueFrm = new uicontrol.dialog("setRelPValueFrm", mlm.C0611 + mlm.C1042, { width: 800 }, setRelPValue);

        pageVariable.setRelPValueFrm.show();
        pageVariable.relPValueList = new uicontrol.tableList("relPValueList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        selectModel: "2",
                                        keyColumn: "PropValue_Id",
                                        columns: [{ display: mlm.C0631, name: "ProdPropName", width: 120, align: 'center' },
                                                { display: mlm.C0608, name: "PValue", width: 200, align: 'center'}]
                                    });
    }
    else {
        pageVariable.setRelPValueFrm.show();
    }

    var m_skuProps = [];
    var m_props = null;
    var m_relpvalues = $("#txtRelPValue").attr("tag");

    if (pageVariable.isSSProds) {
        m_props = pageVariable.ssPropList.dataSource.items.arrValues;
    }
    else {
        m_props = pageVariable.propList.dataSource.items.arrValues;
    }

    $.each(m_props, function () {
        if (this.IsSku == "1" && this.ProdPValueIdRange) {
            var m_pvalueids = this.ProdPValueIdRange.split(",");
            var m_pvalues = this.ProdPValueRange.split(",");

            var m_prop = this;
            var i = 0;
            $.each(m_pvalueids, function () {
                if (Number(this) > 1000000) {
                    return;
                }

                m_skuProps.push({ PropValue_Id: this, PValue: m_pvalues[i], ProdPropName: m_prop.ProdPropName });
                i++;
            });
        }
    });

    pageVariable.relPValueList.bindDataSource(null);
    $.each(m_skuProps, function () {
        pageVariable.relPValueList.addData(this.PropValue_Id, this);
    });

    var m_selecteditems = new datastruct.dictionary();
    if (m_relpvalues) {
        m_relpvalues = m_relpvalues.split(",");
        $.each(m_relpvalues, function () {
            m_selecteditems.setItem(this);
        });

        pageVariable.relPValueList.setSelectedItems(m_selecteditems);
    }
}
/* 设置关联SKU相关属性 */
function setRelPValue() {

    var m_selectItems = pageVariable.relPValueList.getSelectedItems();

    var m_pvalueIds = [];
    var m_pvalues = [];
    $.each(m_selectItems, function () {
        m_pvalueIds.push(this.PropValue_Id);
        m_pvalues.push(this.PValue);
    });

    $("#txtRelPValue").val(m_pvalues.join(","));
    $("#txtRelPValue").attr("tag", m_pvalueIds.join(","));

    pageVariable.setRelPValueFrm.close();
}

/* 打开图片上传的窗体 */
function openUploadPicFrm() {
    if (!pageVariable.uploadPicFrm) {
        pageVariable.uploadPicFrm = new uicontrol.dialog("uploadPicFrm", mlm.C0252, { width: 800 }, uploadPic);
        pageVariable.prodPicFile = new uicontrol.file("prodPicFile");
        pageVariable.ulPicFrom = new uicontrol.selectbox("ulPicFrom", "radio", "changePicHandlerEvent");
        var items = [];
        items.push({ key: "0", value: mlm.C1135 });
        items.push({ key: "1", value: mlm.C1136 });
        pageVariable.ulPicFrom.bindSource(items);
        pageVariable.ulPicFrom.setSelectedItem([{ key: "0"}]);

        var m_picHandlerCtrl = $("#ddlPicHandler");
        m_picHandlerCtrl.append("<option value='1'>" + mlm.C1080 + "</option>");
        m_picHandlerCtrl.append("<option value='2'>" + mlm.C1081 + "(480px*480px" + mlm.C1082 + "150px*150px)" + "</option>");
    }

    pageVariable.uploadPicFrm.show();
}
/* 图片处理切换事件 */
function changePicHandlerEvent() {
    var m_pichandler = pageVariable.ulPicFrom.getSelectedItem()[0];
    if (m_pichandler == "0") {
        $("#dvPicUpload").show();
        $("#dvPicSetUrl").hide();
    }
    else {
        $("#dvPicUpload").hide();
        $("#dvPicSetUrl").show();
    }
}
/* 上传图片 */
function uploadPic() {
    var m_pichandler = pageVariable.ulPicFrom.getSelectedItem()[0];

    if (pageVariable.isSSProds) {

        if (m_pichandler == "0") {
            if (!$("#prodPicFile").val()) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1083);
                return;
            }

            var m_ss_product = new sm.ss_product();
            m_ss_product.PicHandler = $("#ddlPicHandler").val();
            m_ss_product.GBom_ProdCode = pageVariable.handlerProductFrm.product.ProdCode;
            m_ss_product.SS_Product_Id = Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) > 1000000 ? "0" : pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
            m_ss_product.SalePlatform_Id = pageVariable.handlerSSProdFrm.ss_product.SalePlatform_Id.toString();
            m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id.toString();

            m_ss_product.uploadSSProdPic(pageVariable.prodPicFile, function (pics) {
                addPicsToSSPicList(pics);
                generateSSSkuPic();
            });
        }
        else {
            var m_picurl = $.trim($("#txtProdPicUrl").val());
            var m_browserpicurl = $.trim($("#txtBrowserPicUrl").val());
            var m_sourcepicurl = $.trim($("#txtSourcePicUrl").val());
            if (!m_picurl || !m_browserpicurl || !m_sourcepicurl) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1134 + mlm.C0713);
                return;
            }
            var pics = [{ PicUrl: m_picurl, BrowsePicUrl: m_browserpicurl, SourcePicUrl: m_sourcepicurl, OtherProps: {}}];
            addPicsToSSPicList(pics);
            generateSSSkuPic();
        }
    }
    else {
        var m_product = new pdm.product();

        m_product.Product_Id = pageVariable.handlerProductFrm.product_id;
        if (m_pichandler == "0") {
            if (!$("#prodPicFile").val()) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1083);
                return;
            }

            m_product.PicHandler = $("#ddlPicHandler").val();
            m_product.uploadProdPicFile(pageVariable.prodPicFile, function (pics) {

                if (pics) {
                    $.each(pics, function () {
                        this.TempUploadPic_Id = this.TempUploadPic_Id ? this.TempUploadPic_Id : this.Product_Pic_Id;

                        if (!this.TempUploadPic_Id) {
                            return;
                        }

                        pageVariable.picList.addData(this);
                    });

                    pageVariable.prodPicSource = pageVariable.picList.dataSource.items.arrValues;

                    reSetProdBrowserPic(pageVariable.prodPicSource);
                    generateSkuPic();
                }
            });
        }
        else {
            m_product.PicUrl = $.trim($("#txtProdPicUrl").val());
            m_product.BrowsePicUrl = $.trim($("#txtBrowserPicUrl").val());
            m_product.SourcePicUrl = $.trim($("#txtSourcePicUrl").val());
            if (!m_product.PicUrl || !m_product.BrowsePicUrl || !m_product.SourcePicUrl) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1134 + mlm.C0713);
                return;
            }

            m_product.addProdPicFile(function (pic) {
                pic.TempUploadPic_Id = pic.TempUploadPic_Id ? pic.TempUploadPic_Id : pic.Product_Pic_Id;

                if (!pic.TempUploadPic_Id) {
                    return;
                }

                pageVariable.picList.addData(pic); 
                pageVariable.prodPicSource = pageVariable.picList.dataSource.items.arrValues;
                reSetProdBrowserPic(pageVariable.prodPicSource);
                generateSkuPic();
            });
        }
    }

    pageVariable.uploadPicFrm.close();
}
/* 重新设置产品列表的略缩图 */
function reSetProdBrowserPic(pics) {
    //修改商品列表的略缩图
    if (pics && pics.length > 0 && pageVariable.handlerProductFrm.product_id) {
        $.each(pageVariable.productList.dataSource.items.arrValues, function () {
            if (this.Product_Id == pageVariable.handlerProductFrm.product_id) {

                var m_mainPic = pics[0];
                if (m_mainPic.IsMain == "1") {
                    this.BrowsePicUrl = m_mainPic.BrowsePicUrl;
                }

                pageVariable.productList.modifyData(this.Product_Id, this);
            }
        });
    }
}
/* 添加图片到列表中 */
function addPicsToSSPicList(pics) {
    if (pics) {
        var m_length = pics.length;

        $.each(pics, function () {
            this.Seq = pageVariable.ssPicList.dataSource.items.arrValues.length + 1;
            this.Product_Pic_Id = 1000000 + this.Seq;
            this.IsMain = this.Seq == "1" ? "1" : "2";
            pageVariable.ssPicList.addData(this);
        });

        pageVariable.prodPicSource = pageVariable.ssPicList.dataSource.items.arrValues;
        pageVariable.handlerSSProdFrm.ss_product.ProdPics = pageVariable.prodPicSource;

        if (Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) < 1000000 && m_length > 0) {
            //修改商品列表的略缩图
            var m_ss_product = pageVariable.ssProdList.getItem(pageVariable.handlerSSProdFrm.ss_product_id);
            m_ss_product.BrowsePicUrl = pageVariable.prodPicSource[0].BrowsePicUrl;

            pageVariable.ssProdList.modifyData(pageVariable.handlerSSProdFrm.ss_product_id, m_ss_product);
        }
    }
}
/* 加载上传的图片 */
function loadTempUploadPics(event) {
    clearPicList();

    if (!pageVariable.prodPicSource) {
        var m_tempuploadpic = new pdm.tempuploadpic();
        m_tempuploadpic.getTempUploadPics(function (pics) {
            pageVariable.prodPicSource = pics;
            loadProdPicsFromPage();
            if (event) {
                event();
            }
        });
    }
    else {
        loadProdPicsFromPage();
        if (event) {
            event();
        }
    }
}
/* 加载商品图片 */
function loadProdPics(event) {
    if (!pageVariable.prodPicSource) {
        var m_product = new pdm.product();
        m_product.Product_Id = pageVariable.handlerProductFrm.product_id;
        m_product.getProdPics(function (pics) {
            pageVariable.prodPicSource = pics;
            loadProdPicsFromPage();

            if (event) {
                event();
            }
        });
    }
    else {
        loadProdPicsFromPage();

        if (event) {
            event();
        }
    }
}
function loadProdPicsFromPage() {

    var pics = pageVariable.prodPicSource;
    if (!pics) {
        pics = pageVariable.handlerProductFrm.product.ProdPics;
    }
    var m_pvStruct = new datastruct.dictionary();
    var m_skuProps = [];

    var m_props = null;
    if (pageVariable.isSSProds) {
        m_props = pageVariable.ssPropList.dataSource.items.arrValues;
    }
    else {
        m_props = pageVariable.propList.dataSource.items.arrValues;
    }

    $.each(m_props, function () {
        if (this.IsSku == "1") {
            m_skuProps.push(this);
        }

        if (this.ProdPValueIdRange) {
            var m_pvids = this.ProdPValueIdRange.split(",");
            var m_pvs = this.ProdPValueRange.split(",");

            var i = 0;
            $.each(m_pvids, function () {
                m_pvStruct.setItem(this, m_pvs[i]);
                i++;
            });
        }
    });

    var m_picList = [];
    if (pics) {
        $.each(pics, function () {
            if (!this.TempUploadPic_Id) {
                this.TempUploadPic_Id = this.Product_Pic_Id;
            }

            if (this.RelPValueIds) {
                var m_lastrelpvids = this.RelPValueIds;
                var m_relpv = [];
                var m_relpvids = [];
                $.each(m_lastrelpvids, function () {

                    var m_str = this.toString();
                    if (m_str) {
                        if (m_pvStruct.containKey(m_str)) {
                            m_relpv.push(m_pvStruct.getItem(m_str));
                            m_relpvids.push(m_str);
                        }
                    }
                });

                this.RelPValueIds = m_relpvids;
                this.OtherProps.RelPValues = m_relpv.join(",");
            }
            m_picList.push(this);
        });

        if (pageVariable.isSSProds) {
            if (pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id && Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) < 1000000) {
                var m_ssprod = pageVariable.ssProdList.getItem(pageVariable.handlerSSProdFrm.ss_product_id);
                if (pics.length > 0) {
                    m_ssprod.BrowsePicUrl = pics[0].BrowsePicUrl;
                }
                else {
                    m_ssprod.BrowsePicUrl = "";
                }
                pageVariable.ssProdList.modifyData(pageVariable.handlerSSProdFrm.ss_product_id, m_ssprod);
            }
        }
        else {
            reSetProdBrowserPic(pics);
        }
    }

    if (pageVariable.isSSProds) {
        pageVariable.ssPicList.bindSource(m_picList);
    }
    else {
        pageVariable.picList.bindSource(m_picList);
    }
}
/* 打开修改上传图片的窗体 */
function openModifyPicFrm(key) {

    if (!pageVariable.modifyPicFrm) {
        pageVariable.modifyPicFrm = new uicontrol.dialog("modifyPicFrm", mlm.C0264, { width: 825 }, modifyPic);

        var m_setRelPValueCtrl = $("#btSetRelPValue");
        m_setRelPValueCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
        m_setRelPValueCtrl.click(openSetRelPValueFrm);
        $("#txtRelPValue").change(function () {
            var m_value = $.trim($(this).val());
            if (!m_value) {
                $(this).attr("tag", "");
            }
            else {
                var m_selectItems = null;

                if (pageVariable.isSSProds) {
                    m_selectItems = pageVariable.ssPropList.dataSource.items.arrValues;
                }
                else {
                    m_selectItems = pageVariable.propList.dataSource.items.arrValues;
                }

                var m_pvStruct = new datastruct.dictionary();
                $.each(m_selectItems, function () {
                    if (this.IsSku == "1") {
                        var m_pvalueids = this.ProdPValueIdRange.split(",");
                        var m_pvalues = this.ProdPValueRange.split(",");

                        var m_prop = this;
                        var i = 0;
                        $.each(m_pvalueids, function () {
                            if (Number(this) > 1000000) {
                                return;
                            }

                            m_pvStruct.setItem(m_pvalues[i].toUpperCase(), this);
                            i++;
                        });
                    }
                });

                var m_pvaluearr = [];
                var m_pvalueidarr = [];

                var m_pvs = m_value.split(",");
                $.each(m_pvs, function () {

                    var m_str = $.trim(this);
                    if (m_pvStruct.containKey(m_str.toUpperCase())) {
                        m_pvaluearr.push(m_str);
                        m_pvalueidarr.push(m_pvStruct.getItem(m_str.toUpperCase()));
                    }
                });

                $(this).val(m_pvaluearr.join(","));
                $(this).attr("tag", m_pvalueidarr.join(","));
            }
        });
    }

    var m_pic = null;
    if (pageVariable.isSSProds) {
        m_pic = pageVariable.ssPicList.getItem(key);
    }
    else {
        m_pic = pageVariable.picList.getItem(key);
    }

    $("#txtPicSeq").val(m_pic.Seq);

    if (m_pic.OtherProps) {
        var m_relpvCtrl = $("#txtRelPValue");
        m_relpvCtrl.val(m_pic.OtherProps.RelPValues);

        if (m_pic.RelPValueIds) {
            m_relpvCtrl.attr("tag", m_pic.RelPValueIds.join(","));
        }
        else {
            m_relpvCtrl.attr("tag", "");
        }
    }

    pageVariable.modifyPicFrm.tempUploadPic_Id = key;
    pageVariable.modifyPicFrm.show();
}
/* 修改上传图片 */
function modifyPic() {

    if (pageVariable.isSSProds) {

        var m_pic = pageVariable.ssPicList.getItem(pageVariable.modifyPicFrm.tempUploadPic_Id);
        var m_rpvid = $("#txtRelPValue").attr("tag");
        if (m_rpvid) {
            m_pic.RelPValueIds = m_rpvid.split(",");
            m_pic.OtherProps.RelPValues = $("#txtRelPValue").val();
        }
        else {
            m_pic.RelPValueIds = [];
            m_pic.OtherProps.RelPValues = "";
        }

        var m_pics = pageVariable.ssPicList.dataSource.items.arrValues;
        var m_seq = Number($("#txtPicSeq").val());

        if (m_seq > 0 && m_seq < m_pics.length + 1) {
            $.each(m_pics, function () {
                var m_thisSeq = Number(this.Seq);
                if (m_thisSeq > Number(m_pic.Seq)) {
                    this.Seq = m_thisSeq - 1;
                }
            });

            $.each(m_pics, function () {
                var m_thisSeq = Number(this.Seq);
                if (m_thisSeq > m_seq || m_thisSeq == m_seq) {
                    this.Seq = m_thisSeq + 1;
                }
            });

            m_pic.Seq = m_seq;

            if (!pageVariable.picSeqFunc) {
                pageVariable.picSeqFunc = function (a, b) {
                    return Number(a.Seq) > Number(b.Seq) ? 1 : -1;
                };
            }
            m_pics.sort(pageVariable.picSeqFunc);

            var i = 0;
            $.each(m_pics, function () {
                if (i == 0) {
                    this.IsMain = 1;
                }
                else {
                    this.IsMain = 2;
                }
                i++;
            });
        }

        pageVariable.prodPicSource = m_pics;
        pageVariable.isloadskuprodpic = true;
        pageVariable.handlerSSProdFrm.ss_product.ProdPics = pageVariable.prodPicSource;

        loadProdPicsFromPage();

        generateSSSkuPic();
        
        pageVariable.modifyPicFrm.close();
    }
    else {
        if (!pageVariable.handlerProductFrm.product_id) {

            var m_tempuploadpic = new pdm.tempuploadpic();
            m_tempuploadpic.TempUploadPic_Id = pageVariable.modifyPicFrm.tempUploadPic_Id;
            m_tempuploadpic.Seq = $("#txtPicSeq").val();

            var m_rpvid = $("#txtRelPValue").attr("tag");
            if (m_rpvid) {
                m_tempuploadpic.RelPValueIds = m_rpvid.split(",");
            }
            else {
                m_tempuploadpic.RelPValueIds = [];
            }

            m_tempuploadpic.modifyTempUploadPic(function () {
                pageVariable.prodPicSource = null;
                loadTempUploadPics(generateSkuPic);
                pageVariable.modifyPicFrm.close();
            });
        }
        else {
            var m_product = new pdm.product();
            m_product.Product_Pic_Id = pageVariable.modifyPicFrm.tempUploadPic_Id;
            m_product.Seq = $("#txtPicSeq").val();

            var m_rpvid = $("#txtRelPValue").attr("tag");
            if (m_rpvid) {
                m_product.RelPValueIds = m_rpvid.split(",");
            }

            m_product.modifyProdPic(function () {
                pageVariable.prodPicSource = null;
                loadProdPics(generateSkuPic);
                pageVariable.modifyPicFrm.close();
            });
        }

    }
}
/* 打开删除图片列表的窗体 */
function openDelUploadPicFrm() {
    if (!pageVariable.delUploadPicFrm) {
        pageVariable.delUploadPicFrm = new uicontrol.confirmDelete(deleteUploadPics);
    }

    pageVariable.delUploadPicFrm.showConfirm(mlm.C0265);
}
/* 删除图片列表 */
function deleteUploadPics() {

    if (pageVariable.isSSProds) {
        clearPicList();
        pageVariable.prodPicSource = null;
        pageVariable.isloadskuprodpic = true;
        pageVariable.handlerSSProdFrm.ss_product.ProdPics = pageVariable.prodPicSource;

        generateSSSkuPic();
        
        pageVariable.delUploadPicFrm.close();
    }
    else {
        if (!pageVariable.handlerProductFrm.product_id) {

            var m_tempuploadpic = new pdm.tempuploadpic();
            m_tempuploadpic.deleteByParam(function () {
                clearPicList();
                pageVariable.prodPicSource = null;
                pageVariable.isloadskuprodpic = true;
                generateSkuPic();

                pageVariable.delUploadPicFrm.close();
            });
        }
        else {
            var m_product = new pdm.product();
            m_product.Product_Id = pageVariable.handlerProductFrm.product_id;
            m_product.clearProdPics(function () {
                clearPicList();
                pageVariable.prodPicSource = null;
                pageVariable.isloadskuprodpic = true;
                generateSkuPic();

                pageVariable.delUploadPicFrm.close();
            });
        }
    }
}
/* 清理图片列表(商品编辑窗体) */
function clearPicList() {

    if (pageVariable.isSSProds) {
        pageVariable.ssPicList.bindSource(null);

        //修改商品列表的略缩图
        if (pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id && Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) < 1000000) {
            var m_product = pageVariable.ssProdList.getItem(pageVariable.handlerSSProdFrm.ss_product_id);
            m_product.BrowsePicUrl = "";
            pageVariable.ssProdList.modifyData(pageVariable.handlerSSProdFrm.ss_product_id, m_product);
        }
    }
    else {
        pageVariable.picList.bindSource(null);

        //修改商品列表的略缩图
        if (pageVariable.handlerProductFrm.product_id) {
            var m_product = pageVariable.productList.getItem(pageVariable.handlerProductFrm.prodkey);
            m_product.BrowsePicUrl = "";
            pageVariable.productList.modifyData(pageVariable.handlerProductFrm.prodkey, m_product);
        }
    }
}
/* 打开删除单个图片的窗体 */
function openDelPicFrm(key) {
    if (!pageVariable.delSingleUploadPicFrm) {
        pageVariable.delSingleUploadPicFrm = new uicontrol.confirmDelete(deletePic);
    }

    pageVariable.delSingleUploadPicFrm.tempUploadPic_Id = key;
    pageVariable.delSingleUploadPicFrm.showConfirm(mlm.C0266);
}
/* 删除单个图片 */
function deletePic() {

    if (pageVariable.isSSProds) {
        var m_deleted = pageVariable.ssPicList.getItem(pageVariable.delSingleUploadPicFrm.tempUploadPic_Id);
        pageVariable.ssPicList.deleteData(m_deleted);

        pageVariable.prodPicSource = pageVariable.ssPicList.dataSource.items.arrValues;
        pageVariable.isloadskuprodpic = true;
        pageVariable.handlerSSProdFrm.ss_product.ProdPics = pageVariable.prodPicSource;

        generateSSSkuPic();

        pageVariable.delSingleUploadPicFrm.close();
    }
    else {
        if (!pageVariable.handlerProductFrm.product_id) {

            var m_tempuploadpic = new pdm.tempuploadpic();
            m_tempuploadpic.TempUploadPic_Id = pageVariable.delSingleUploadPicFrm.tempUploadPic_Id;
            m_tempuploadpic.deleteTempUploadPic(function () {

                pageVariable.prodPicSource = null;
                pageVariable.isloadskuprodpic = true;
                loadTempUploadPics(generateSkuPic);
                pageVariable.delSingleUploadPicFrm.close();
            });
        }
        else {
            var m_product = new pdm.product();
            m_product.Product_Pic_Id = pageVariable.delSingleUploadPicFrm.tempUploadPic_Id;
            m_product.Product_Id = pageVariable.handlerProductFrm.product_id;
            m_product.deleteProdPic(function () {

                pageVariable.prodPicSource = null;
                pageVariable.isloadskuprodpic = true;
                loadProdPics(generateSkuPic);
                pageVariable.delSingleUploadPicFrm.close();
            });
        }
    }
}
/* 生成Sku商品图片 */
function generateSkuPic() {
    var m_fstPic = null;
    var m_pics = pageVariable.picList.dataSource.items.arrValues;
    if (!m_pics || m_pics.length == 0) {
        m_pics = pageVariable.handlerProductFrm.product.ProdPics;
    }

    if (m_pics && m_pics.length > 0) {
        m_fstPic = m_pics[0];

        if (m_fstPic.RelPValueIds.length > 0) {
            m_fstPic = null;
        }
    }
    
    var m_default = pageVariable.handlerProductFrm.product.SKUProducts["default"];
    if (m_default && !m_default.deletedFlag) {
        $.each(pageVariable.handlerProductFrm.product.SKUProducts, function () {
            var m_skuobj = this;

            if (m_fstPic) {
                m_skuobj.Product_Pic_Id = m_fstPic.Product_Pic_Id == "0" ? m_fstPic.TempUploadPic_Id : m_fstPic.Product_Pic_Id;
                m_skuobj.BrowsePicUrl = m_fstPic.BrowsePicUrl;
            }
            else {
                m_skuobj.Product_Pic_Id = 0;
                m_skuobj.BrowsePicUrl = "";
            }
        });
    }
    else {
        $.each(pageVariable.handlerProductFrm.product.SKUProducts, function () {
            var m_skuobj = this;

            var m_iscontinue = true;

            if (m_pics) {
                $.each(m_pics, function () {
                    if (m_iscontinue && this.RelPValueIds.length > 0) {
                        var _i = ("_" + m_skuobj.PropValues + "_").lastIndexOf("_" + this.RelPValueIds.join("_") + "_");
                        if (_i > -1) {
                            m_skuobj.Product_Pic_Id = this.Product_Pic_Id == "0" ? this.TempUploadPic_Id : this.Product_Pic_Id;
                            m_skuobj.BrowsePicUrl = this.BrowsePicUrl;

                            m_iscontinue = false;
                        }
                    }
                });
            }

            if (m_iscontinue) {
                if (m_fstPic) {
                    m_skuobj.Product_Pic_Id = m_fstPic.Product_Pic_Id == "0" ? m_fstPic.TempUploadPic_Id : m_fstPic.Product_Pic_Id;
                    m_skuobj.BrowsePicUrl = m_fstPic.BrowsePicUrl;
                }
                else {
                    m_skuobj.Product_Pic_Id = 0;
                    m_skuobj.BrowsePicUrl = "";
                }
            }
        });
    }

    pageVariable.isloadSkuProd = true;
    loadSkuProducts();
    pageVariable.isloadSkuProd = true;
}

/* 打开查看站点商品列表的窗体 */
function openViewSSProdListFrm() {
    if (!pageVariable.viewSSProdListFrm) {
        pageVariable.viewSSProdListFrm = new uicontrol.dialog("viewSSProdListFrm", mlm.C1033, { width: 1125, position: ["auto", 35] });
    }

    pageVariable.viewSSProdListFrm.product_id = $(this).attr("tag");
    pageVariable.viewSSProdListFrm.show();

    var m_key = $(this).attr("tag");

    var m_product = new pdm.product();
    m_product.Product_Id = m_key.split("-")[0];
    m_product.readProduct(function (prodObj) {
        pageVariable.viewSSProdListFrm.product = prodObj;
        loadSSProducts();
    });

}

/* 加载站内商品信息 */
function loadSSProducts() {
    if (!pageVariable.ssProdList) {
        pageVariable.ssProdList = new uicontrol.tableList("ssProdList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 350,
                                        keyColumn: "SS_Product_Id",
                                        columns: [{ display: mlm.C0416, name: "", width: 110, align: 'left', adjust: true, createCell: constructSaleSiteCell },
                                                   { display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: constructSSProdPicCell },
                                                   { display: mlm.C0734, name: "ProdName", width: 260, align: 'left', adjust: true, createCell: constructSSProdNameCell },
                                                   { display: mlm.C1256, name: "", width: 160, align: 'left', adjust: true, createCell: constructSSProdPriceCell },
                                                   { display: mlm.C1257, name: "CMonthSaleCount", width: 60, align: 'right', adjust: true, createCell: constructQtyCell },
                                                   { display: mlm.C1258, name: "AllSaleCount", width: 60, align: 'right', adjust: true, createCell: constructQtyCell },
                                                   { display: mlm.C1259, name: "OnlineTimeStr", width: 75, align: 'center', adjust: true, adjust: true, createCell: constructOnlineTimeCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructSSOperaCell}]
                                    });
    }

    //展示进度
    pageframe.control.processCtrl.showOperaProcess();

    var m_ss_product = new sm.ss_product();
    m_ss_product.Product_Id = pageVariable.viewSSProdListFrm.product_id;
    m_ss_product.querySSProductByInnerProd(function (retTable) {

        var m_pricearea_prods = new datastruct.dictionary();
        var m_ss_products = datastruct.convertion.tableToJson(retTable);
        $.each(m_ss_products, function () {
            m_pricearea_prods.setItem(this.SalePlatform_Id + "-" + this.SaleSite_Id, null);
        });

        pageVariable.ssProdList.bindDataSource(retTable);

        var m_saleplatform = new sm.saleplatform();
        var i = 1000000;
        m_saleplatform.queryAvaiSaleSites(function (retTable) {
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            $.each(m_jsonobjs, function () {

                var m_SaleSite = this.SalePlatform_Id + "-" + this.SaleSite_Id;
                if (!m_pricearea_prods.containKey(m_SaleSite)) {

                    i++;

                    var m_proditem = {};

                    m_proditem.SS_Product_Key = i;
                    m_proditem.SS_Product_Id = i;
                    m_proditem.SalePlatform_Id = this.SalePlatform_Id;
                    m_proditem.SaleSite_Id = this.SaleSite_Id;
                    m_proditem.SPfName = this.SPfName;
                    m_proditem.SaleSiteName = this.SaleSiteName;
                    m_proditem.WUnit = this.WUnit;
                    m_proditem.SysWeightUnit_Id = this.SysWeightUnit_Id;
                    m_proditem.SysCurrency_Id = this.SysCurrency_Id;
                    m_proditem.CurrCode = this.CurrCode;
                    m_proditem.CurrSymbol = this.CurrSymbol;

                    m_proditem.OtherProps = {};
                    m_proditem.OtherProps.WeightRate = this.WeightRate;
                    m_proditem.OtherProps.CurrRate = this.CurrRate;

                    pageVariable.ssProdList.addData(m_proditem.SS_Product_Key, m_proditem);

                    m_ss_products.push(m_proditem);
                }
            });

            //隐藏进度
            pageframe.control.processCtrl.hideOperaProcess();
        });
    });
}
/* 构建商品图片列 */
function constructSSProdPicCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_src = "";
    if (cellValue) {
        if (cellValue.indexOf("http://") == -1) {
            m_src = window.webLocation + cellValue;
        }
        else {
            m_src = cellValue;
        }
    }
    else {
        m_src = window.webLocation + "BZM/Css/Images/nopic.png";
    }

    return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 70);' onerror='commoncore.func.failLoadImg.call(this, 70);' onclick='viewSSProduct.call(this, \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
}
/* 构建销售区域列 */
function constructSaleSiteCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_css = "";
    if (!m_obj.State || m_obj.State == "1" || m_obj.State == "3") {
        m_css = "color: #747474";
    }

    var m_htmls = [];
    if (m_obj.SaleSiteName) {
        m_htmls.push("<div style='padding: 0px; " + m_css + "'>" + m_obj.SPfName + "-" + m_obj.SaleSiteName + "</div>");
    }
    else {
        m_htmls.push("<div style='padding: 0px; " + m_css + "'>" + m_obj.SPfName + "</div>");
    }

    return m_htmls.join("");
}
/* 构建销售商品名称列 */
function constructSSProdNameCell(key, cellValue) {
    var m_obj = this.keyObj;
    if (!cellValue) {
        return "<span style='color: #747474'>" + mlm.C0966 + "</span>";
    }
    else {
        var m_obj = this.keyObj;

        var m_css = "";
        if (!m_obj.State || m_obj.State == "1" || m_obj.State == "3") {
            m_css = "style='color: #747474'";
        }

        var m_items = [];
        m_items.push("<div style='padding: 0px'><a " + m_css + " onclick='viewSSProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a></div>");
        if (Number(m_obj.AvailableUnitCount) > 1) {
            m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.AvailableUnitCount + mlm.C1066 + "</div>");
        }

        return m_items.join("");
    }
}
/* 构建包裹重量列 */
function constructSSProdWeightCell(key, cellValue) {

    var m_arr = [];

    var m_weight = Number(cellValue);
    if (m_weight > 0) {
        m_arr.push("<div style='padding: 0px'>" + m_weight.toFixed(3) + " " + this.keyObj.WUnit + "</div>");
    }

    var m_volumn = (Number(this.keyObj.Length) * Number(this.keyObj.Width) * Number(this.keyObj.Height)).toFixed(0);
    if (m_volumn > 0) {
        m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>(" + m_volumn + " cm³)</div>");
    }

    return m_arr.join("");
}
/* 构建商品定价列 */
function constructSSProdPriceCell(key, cellValue) {
    var m_obj = this.keyObj;
    var m_css = "";
    if (!m_obj.State || m_obj.State == "1" || m_obj.State == "3") {
        m_css = "color: #747474'";
    }

    var m_arr = [];
    if (Number(this.keyObj.MinSalePrice) == Number(this.keyObj.MaxSalePrice)) {
        m_arr.push("<div style='padding: 0px; " + m_css + "'>" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinSalePrice) + "</div>");
    }
    else {
        m_arr.push("<div style='padding: 0px; " + m_css + "'>" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinSalePrice) + "-" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MaxSalePrice) + "</div>");
    }

    if (Number(this.keyObj.MinProfit) == -20000) {
        m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'" + m_css + "'>" + mlm.C1008 + "</div>");
    }
    else {
        if (this.keyObj.MaxProfit) {

            var m_maxprofit = Number(this.keyObj.MaxProfit);
            var m_minprofit = Number(this.keyObj.MinProfit);
            if (m_maxprofit == -10000) {
                m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1145 + "</div>");
            }
            else {
                if (m_maxprofit != 0 || m_minprofit != 0) {
                    if (Number(this.keyObj.MinProfit) == m_maxprofit) {
                        m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1146 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinProfit) + "</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1146 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinProfit) + "-" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MaxProfit) + "</div>");
                    }
                }
            }
        }
    }

    if (this.keyObj.MaxDiscount && Number(this.keyObj.MaxDiscount) > 0) {
        if (Number(this.keyObj.MaxDiscount) == 1) {
            if (Number(this.keyObj.MinDiscount) != Number(this.keyObj.MaxDiscount)) {
                m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1058 + ": " + Number(this.keyObj.MinDiscount) * 100 + "%</div>");
            }
        }
        else {
            if (Number(this.keyObj.MinDiscount) == Number(this.keyObj.MaxDiscount)) {
                m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1058 + ": " + Number(this.keyObj.MinDiscount) * 100 + "%</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1058 + ": " + Number(this.keyObj.MinDiscount) * 100 + "%-" + Number(this.keyObj.MaxDiscount) * 100 + "%</div>");
            }
        }
    }

    return m_arr.join("");
}
/* 构造日期列 */
function constructOnlineTimeCell(key, cellValue) {
    if (this.keyObj.State == "2") {
        var date = new Date(cellValue);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
}
/* 构造数量列 */
function constructQtyCell(key, cellValue) {

    var m_qty = Number(cellValue);
    if (m_qty > 0) {
        return "<a onclick='viewSaleStatFrm.call(this, \"" + this.keyObj.SS_Product_Id + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a>";
    }
}
/* 构建销售操作列 */
function constructSSOperaCell(key, cellValue) {
    var m_css = "";
    if (!this.keyObj.State || this.keyObj.State == "1" || this.keyObj.State == "3") {
        m_css = "style='color: #747474'";
    }

    return "<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openModifySSProdFrm.call(this);'>" + mlm.C0061 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openDeleteSSProdFrm.call(this);'>" + mlm.C0062 + "</a>";
}

/* 打开修改销售信息的窗体 */
function openModifySSProdFrm() {

    //展示进度
    pageframe.control.processCtrl.showOperaProcess();

    if (!pageVariable.handlerSSProdFrm) {
        pageVariable.handlerSSProdFrm = new uicontrol.dialog("handlerSSProdFrm", mlm.C1087, { width: 1125, position: ["auto", 10] }, function () {
            saveSSProd(function () { pageVariable.handlerSSProdFrm.close(); });
        });

        $("#btAddSSProp").click(openAddPropFrm);
        $("#btViewSS_RemarkPic").click(function () {
            previewProdDesc($("#ssProdHtmlTool"));
        });
        $("#btBatchSetSalePrice").click(openSetSalePriceFrm);

        var m_stateCtrl = $("#ddlSSState");
        m_stateCtrl.append("<option value='1'>" + mlm.C0399 + "</option>");
        m_stateCtrl.append("<option value='2'>" + mlm.C0350 + "</option>");
        m_stateCtrl.append("<option value='3'>" + mlm.C1025 + "</option>");

        $("#btExportExpPrice").click(exportExpServices);
        $("#btImportExpPrice").click(openImportExpServicesFrm);
        $("#btSetSSProdBox").click(openHandlerSSProdBox);
        $("#txtGiftWeight").change(changeGiftWeightLimit);
        $("#txtGiftCost").change(changeGiftCostLimit);

        var m_150_pic = $("#lk_150_Picname");
        var m_480_pic = $("#lk_480_Picname");
        var m_800_pic = $("#lk_800_Picname");

        var m_clickviewFunc = function () {

            m_480_pic.removeClass("lb-light-alert");
            m_150_pic.removeClass("lb-light-alert");
            m_800_pic.removeClass("lb-light-alert");

            $(this).addClass("lb-light-alert");

            $("#imgProdPic").attr("src", $(this).attr("tag"));
        };

        m_150_pic.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
        m_150_pic.click(m_clickviewFunc);

        m_480_pic.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
        m_480_pic.click(m_clickviewFunc);

        m_800_pic.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
        m_800_pic.click(m_clickviewFunc);

        pageVariable.selSSBrand = new bizcontrol.selectbrand($("#selSSBrand"));
        pageVariable.selPdcNav = new bizcontrol.selectpdc($("#selPdcNav"), true, null, null, function () {
            fillProps(pageVariable.ssPropList, pageVariable.selPdcNav.pdcId);
        });
        pageVariable.ssPicList = new uicontrol.simpleTableList("dvSSPicList",
                                                                { keyColumn: "Product_Pic_Id",
                                                                    isPaging: false,
                                                                    itemCss: "picture-item",
                                                                    constructTableFunc: constructPicTable,
                                                                    seqProp: "Seq",
                                                                    events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                        onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                        ondblclick: function () {
                                                                            var m_key = $(this).attr("tag");
                                                                            var m_obj = pageVariable.ssPicList.getItem(m_key);

                                                                            if (!pageVariable.viewProdPicFrm) {
                                                                                pageVariable.viewProdPicFrm = new uicontrol.dialog("viewProdPicFrm", mlm.C0648, { width: 1000, position: ["auto", 25] });
                                                                            }

                                                                            var m_picUrl = "";
                                                                            var m_browserUrl = "";
                                                                            var m_sourceUrl = "";
                                                                            if (m_obj.PicUrl.indexOf("http://") > -1) {
                                                                                m_picUrl = m_obj.PicUrl;
                                                                                m_browserUrl = m_obj.BrowsePicUrl;
                                                                                m_sourceUrl = m_obj.SourcePicUrl;
                                                                            }
                                                                            else {
                                                                                m_picUrl = window.webLocation + m_obj.PicUrl;
                                                                                m_browserUrl = window.webLocation + m_obj.BrowsePicUrl;
                                                                                m_sourceUrl = window.webLocation + m_obj.SourcePicUrl;
                                                                            }

                                                                            m_480_pic.text(m_picUrl);
                                                                            m_480_pic.attr("tag", m_picUrl);

                                                                            if (m_obj.BrowsePicUrl && m_obj.BrowsePicUrl != m_obj.PicUrl) {
                                                                                m_150_pic.text(m_browserUrl + " (150x150" + mlm.C0667 + ")");
                                                                                m_150_pic.attr("tag", m_browserUrl);
                                                                                m_150_pic.show();
                                                                            }
                                                                            else {
                                                                                m_150_pic.hide();
                                                                            }

                                                                            if (m_obj.SourcePicUrl && m_obj.SourcePicUrl != m_obj.PicUrl) {
                                                                                m_800_pic.text(m_sourceUrl + " (800x800" + mlm.C0667 + ")");
                                                                                m_800_pic.attr("tag", m_sourceUrl);
                                                                                m_800_pic.show();
                                                                            }
                                                                            else {
                                                                                m_800_pic.hide();
                                                                            }

                                                                            $("#imgProdPic").attr("src", m_picUrl);

                                                                            pageVariable.viewProdPicFrm.show();
                                                                        }
                                                                    }
                                                                });
    }

    if (!pageVariable.ssProdTabs) {
        pageVariable.ssProdTabs = $("#ssProdTabs").tabs({ show: showSSProdTab });
    }

    if (pageVariable.ssProdTabs) {
        $("#lbSSProdSymbol").trigger("click");
    }

    if (!pageVariable.ssPropList) {
        pageVariable.handlerSSProdFrm.show();
        pageVariable.ssPropList = new uicontrol.tableList("ssPropList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ProdProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 90, align: 'left' },
                                                { display: mlm.C0070, name: "IsSku", width: 80, align: 'left', adjust: true, createCell: constructIsSkuCell },
                                                { display: mlm.C0071, name: "ProdPValueRange", width: 450, align: 'left', adjust: true, createCell: constructProdPropValueCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: constructPropOperaCell }]
                                    });
    }
    else {
        pageVariable.handlerSSProdFrm.show();
    }

    if (pageVariable.expAreaTree) {
        pageVariable.expServiceList.bindDataSource(null);
        pageVariable.expAreaTree.clearSelectedItem();
    }

    if (pageVariable.apExpAreaTree) {
        pageVariable.prodProfitList.bindDataSource(null);
        pageVariable.apExpAreaTree.clearSelectedItem();
    }

    var m_key = $(this).attr("tag");
    pageVariable.handlerSSProdFrm.ss_product_id = m_key;
    pageVariable.handlerSSProdFrm.ss_product = pageVariable.ssProdList.getItem(m_key);
    pageVariable.handlerSSProdFrm.expchargedict = new datastruct.dictionary();

    saleplatform = {};
    saleplatform.currObj = {};
    saleplatform.currObj.CurrSymbol = pageVariable.handlerSSProdFrm.ss_product.CurrSymbol;
    saleplatform.currObj.WUnit = pageVariable.handlerSSProdFrm.ss_product.WUnit;
    saleplatform.currObj.CurrCode = pageVariable.handlerSSProdFrm.ss_product.CurrCode;

    var m_product = pageVariable.viewSSProdListFrm.product;

    pageVariable.handlerSSProdFrm.product_id = m_product.Product_Id;

    if (Number(m_key) > 1000000) {
        pageVariable.handlerSSProdFrm.ss_product.ProdName = m_product.ProdName;
        pageVariable.handlerSSProdFrm.ss_product.Unit = m_product.Unit;
        pageVariable.handlerSSProdFrm.ss_product.Remark = m_product.Remark;
        pageVariable.handlerSSProdFrm.ss_product.Tags = "";
        pageVariable.handlerSSProdFrm.ss_product.PdcObjs = [];
        pageVariable.handlerSSProdFrm.ss_product.State = 1;
        pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit = 0;
        pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit = 0;
        pageVariable.handlerSSProdFrm.ss_product.Gifts = [];

        if (pageVariable.selBrand && pageVariable.selBrand.brandId) {
            pageVariable.handlerSSProdFrm.ss_product.Brand_Id = pageVariable.selBrand.brandId;
            pageVariable.handlerSSProdFrm.ss_product.BrandName = pageVariable.selBrand.brandName;
        }

        var m_pvid_temps = new datastruct.dictionary();
        pageVariable.handlerSSProdFrm.ss_product.DefinedProps = {};
        $.each(pageVariable.viewSSProdListFrm.product.DefinedProps, function () {
            var m_item = $.extend({}, this);
            pageVariable.maxPvGuid++;
            m_pvid_temps.setItem(m_item.PropValue_Id, pageVariable.maxPvGuid);
            m_item.PropValue_Id = pageVariable.maxPvGuid;

            pageVariable.handlerSSProdFrm.ss_product.DefinedProps[m_item.PropValue_Id] = m_item;
        });

        if (m_pvid_temps.count > 0) {
            pageVariable.definedProps = pageVariable.handlerSSProdFrm.ss_product.DefinedProps;
        }

        var j = 1;
        pageVariable.handlerSSProdFrm.ss_product.PropTable = [];
        $.each(m_product.PropTable, function () {
            var m_item = $.extend({}, this);
            m_item.sourceFrom = 1;
            m_item.Seq = j;
            j++;

            if (m_pvid_temps.count > 0) {
                var m_newpvs = [];
                var m_pvs = m_item.ProdPValueIdRange.split(",");
                $.each(m_pvs, function () {
                    if (m_pvid_temps.containKey(this)) {
                        m_newpvs.push(m_pvid_temps.getItem(this).toString());
                    }
                    else {
                        m_newpvs.push(this.toString());
                    }
                });
                m_item.ProdPValueIdRange = m_newpvs.join(",").toString();
            }

            pageVariable.handlerSSProdFrm.ss_product.PropTable.push(m_item);
        });

        pageVariable.handlerSSProdFrm.ss_product.ProdPics = [];
        $.each(m_product.ProdPics, function () {
            var m_item = $.extend({}, this);

            var m_newitems = [];
            $.each(m_item.RelPValueIds, function () {
                if (m_pvid_temps.containKey(this)) {
                    m_newitems.push(m_pvid_temps.getItem(this).toString());
                }
                else {
                    m_newitems.push(this.toString());
                }
            });
            m_item.RelPValueIds = m_newitems;

            pageVariable.handlerSSProdFrm.ss_product.ProdPics.push(m_item);
        });

        generateSSInnerProds();

        var m_sku_temps = new datastruct.dictionary();
        $.each(m_product.SKUProducts, function () {
            m_sku_temps.setItem(this.OtherProps.SkuProps, this);
        });

        var jj = 1;
        $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
            this.SkuProduct_Ids = [];
            this.SkuProducts = [];
            this.Seq = jj;
            jj++;

            var m_sku_prod = m_sku_temps.getItem(this.SkuProps);
            if (m_sku_prod) {
                this.SkuProduct_Ids.push(m_sku_prod.SkuProduct_Id);

                var m_innerprod_rel = {};

                if (m_sku_prod.OtherProps.SkuProps) {
                    m_innerprod_rel.InnerProd = m_sku_prod.ProdCode + " - " + m_product.ProdName + " - [" + m_sku_prod.OtherProps.SkuProps + "]";
                }
                else {
                    m_innerprod_rel.InnerProd = m_sku_prod.ProdCode + " - " + m_product.ProdName;
                }
                m_innerprod_rel.SkuProduct_Id = m_sku_prod.SkuProduct_Id;
                m_innerprod_rel.Unit = m_product.Unit;
                m_innerprod_rel.PurchaseCost = m_sku_prod.Cost;
                m_innerprod_rel.RelQty = 1;
                m_innerprod_rel.SkuProps = m_sku_prod.OtherProps.SkuProps;
                m_innerprod_rel.ProdCode = m_sku_prod.ProdCode;
                m_innerprod_rel.Product = m_product;
                m_innerprod_rel.Product_Id = m_product.Product_Id;

                this.SkuProducts.push(m_innerprod_rel);

                this.Product_Pic_Id = m_sku_prod.Product_Pic_Id;
                this.BrowsePicUrl = m_sku_prod.BrowsePicUrl;
                this.PackageWeight = m_product.Weight;
            }
        });

        generateSSSalePrice();

        pageVariable.handlerSSProdFrm.ss_product.AvailableUnitCount = pageVariable.handlerSSProdFrm.ss_product.InnerProds.length;
        generateSSSkuPic();

        pageVariable.handlerSSProdFrm.ss_product.ExpDict = new datastruct.dictionary();
        pageVariable.handlerSSProdFrm.ss_product.ExpServices = [];

        var m_expressservice = new sm.expressservice();
        m_expressservice.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
        m_expressservice.queryAreaExpressService(function (retTable) {
            pageVariable.handlerSSProdFrm.ss_product.ExpServices = datastruct.convertion.tableToJson(retTable);

            $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
                var m_globalservices = pageVariable.handlerSSProdFrm.ss_product.ExpDict.getItem(this.GlobalArea_Id);

                if (!m_globalservices) {
                    m_globalservices = [];
                    pageVariable.handlerSSProdFrm.ss_product.ExpDict.setItem(this.GlobalArea_Id, m_globalservices);
                }

                this.GlobalAreaNames = null;
                this.State = 1;
                m_globalservices.push(this);
            });

            //隐藏进度
            pageframe.control.processCtrl.hideOperaProcess();
        });

        fillProdForM();
    }
    else {
        var m_ss_product = new sm.ss_product();
        m_ss_product.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
        m_ss_product.readSS_Product(function (retObj) {

            fillUIObjFromProd(retObj);

            fillProdForM();
        });
    }

    pageVariable.isSSProds = true;
    pageVariable.prodPValueCache = new datastruct.dictionary();
    pageVariable.handlerSSProdFrm.max_gift_id = 1000000;
}
/* 商品对象转换到ui对象 */
function fillUIObjFromProd(retObj, afterevent) {
    pageVariable.handlerSSProdFrm.ss_product = retObj;
    pageVariable.handlerSSProdFrm.ss_product = $.extend(pageVariable.handlerSSProdFrm.ss_product, retObj.OtherProps);

    var m_picdict = new datastruct.dictionary();
    $.each(pageVariable.handlerSSProdFrm.ss_product.ProdPics, function () {
        m_picdict.setItem(this.Product_Pic_Id, this);
    });

    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {

        $.each(this.SkuProducts, function () {
            if (this.OtherProps.SkuProps) {
                this.InnerProd = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName + " - [" + this.OtherProps.SkuProps + "]";
            }
            else {
                this.InnerProd = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName;
            }
            this.SkuProps = this.OtherProps.SkuProps;
            this.ProdCode = this.OtherProps.ProdCode;
            this.Product = this.OtherProps;
            this.Product_Id = this.OtherProps.Product_Id;
        });

        if (this.Product_Pic_Id != "0") {
            var m_pic = m_picdict.getItem(this.Product_Pic_Id);
            this.BrowsePicUrl = m_pic.BrowsePicUrl;
        }

        this.SkuProps = this.OtherProps.SkuProps;
    });

    $.each(pageVariable.handlerSSProdFrm.ss_product.SalePrices, function () {
        this.SkuProps = this.OtherProps.SkuProps;
    });

    $.each(pageVariable.handlerSSProdFrm.ss_product.Gifts, function () {
        $.each(this.Items, function () {
            if (this.OtherProps.SkuProps) {
                this.InnerProd = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName + " - [" + this.OtherProps.SkuProps + "]";
            }
            else {
                this.InnerProd = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName;
            }
            this.SkuProps = this.OtherProps.SkuProps;
            this.ProdCode = this.OtherProps.ProdCode;
            this.Product = this.OtherProps;
            this.Product_Id = this.OtherProps.Product_Id;
        });
        this.Weight = this.OtherProps.Weight;
        this.Cost = this.OtherProps.Cost;
    });

    var j = 1;
    $.each(pageVariable.handlerSSProdFrm.ss_product.PropTable, function () {
        this.Seq = j;
        j++;
    });

    pageVariable.handlerSSProdFrm.ss_product.ExpDict = new datastruct.dictionary();
    var m_ssprodexpservices = new datastruct.dictionary();
    $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
        m_ssprodexpservices.setItem(this.GlobalArea_Id + "-" + this.ExpressService_Id, this);
    });

    var m_expressservice = new sm.expressservice();
    m_expressservice.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
    m_expressservice.queryAreaExpressService(function (retTable) {
        pageVariable.handlerSSProdFrm.ss_product.ExpServices = datastruct.convertion.tableToJson(retTable);

        $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
            var m_globalservices = pageVariable.handlerSSProdFrm.ss_product.ExpDict.getItem(this.GlobalArea_Id);

            if (!m_globalservices) {
                m_globalservices = [];
                pageVariable.handlerSSProdFrm.ss_product.ExpDict.setItem(this.GlobalArea_Id, m_globalservices);
            }

            var m_expservice = m_ssprodexpservices.getItem(this.GlobalArea_Id + "-" + this.ExpressService_Id);
            if (m_expservice) {
                this.FstCharge = m_expservice.FstCharge;
                this.IncreaseCharge = m_expservice.IncreaseCharge;
                this.State = m_expservice.State;
            }
            else {
                this.State = 1;
            }

            this.GlobalAreaNames = null;
            m_globalservices.push(this);
        });

        if (afterevent) {
            afterevent();
        }
        else {
            //隐藏进度
            pageframe.control.processCtrl.hideOperaProcess();
        }
    });

    pageVariable.ssPropList.bindDataSource(pageVariable.handlerSSProdFrm.ss_product.PropTable);

    pageVariable.rebindInnerProdList = true;
    pageVariable.rebindSalePriceList = true;
}
/* 设置商品修改窗体的信息 */
function fillProdForM() {
    $("#txtSSProdName").val(pageVariable.handlerSSProdFrm.ss_product.ProdName);
    $("#txtSSProdCode").val(pageVariable.handlerSSProdFrm.ss_product.ProdCode);
    $("#txtSSUnit").val(pageVariable.handlerSSProdFrm.ss_product.Unit);
    $("#ssProdHtmlTool").val(pageVariable.handlerSSProdFrm.ss_product.Remark.replace(/\^/g, "\"").replace(/\~/g, "\'"));
    $("#ssProdTagsTool").val(pageVariable.handlerSSProdFrm.ss_product.Tags);
    $("#ddlSSState").val(pageVariable.handlerSSProdFrm.ss_product.State);
    $("#txtGiftWeight").val(Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit).toFixed(3));
    $("#txtGiftCost").val(Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit).toFixed(2));
    pageVariable.selPdcNav.clear();

    $("#lbSSWUnit, #lbSSWUnit_1, #lbExpWUnit, #lbGiftWUnit").text(pageVariable.handlerSSProdFrm.ss_product.WUnit.toString());
    $("#lbCurr_6").text(pageVariable.handlerSSProdFrm.ss_product.CurrCode.toString());

    pageVariable.ssPropList.bindDataSource(pageVariable.handlerSSProdFrm.ss_product.PropTable);

    pageVariable.selPdcNav.pdcSource = null;
    pageVariable.selPdcNav.shoppingSiteId = pageVariable.handlerSSProdFrm.ss_product.SalePlatform_Id.toString();
    pageVariable.selPdcNav.salesite_id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id.toString();

    pageVariable.selSSBrand.setBrand({ Brand_Id: pageVariable.handlerSSProdFrm.ss_product.Brand_Id, BrandName: pageVariable.handlerSSProdFrm.ss_product.BrandName });

    if (pageVariable.handlerSSProdFrm.ss_product.PdcObjs.length > 0) {
        var m_pdcIds = [];
        $.each(pageVariable.handlerSSProdFrm.ss_product.PdcObjs, function () {
            m_pdcIds.push(this.SS_ProdCategory_Id);
        });
        pageVariable.selPdcNav.setPdc({ ProdCategory_Id: m_pdcIds, PdcName: pageVariable.handlerSSProdFrm.ss_product.OtherProps.PdcName });
    }

    pageVariable.ssPicList.bindSource(null);

    if (pageVariable.innerProdList) {
        pageVariable.innerProdList.bindDataSource(null);
    }
    if (pageVariable.expServiceList) {
        pageVariable.expServiceList.bindDataSource(null);
    }
    if (pageVariable.salePriceList) {
        pageVariable.salePriceList.bindDataSource(null);
    }
    if (pageVariable.prodProfitList) {
        pageVariable.prodProfitList.bindDataSource(null);
    }
    if (pageVariable.giftList) {
        pageVariable.giftList.bindDataSource(null);
        pageVariable.rebindGiftList = true;
    }
}
/* 打开删除销售信息的窗体 */
function openDeleteSSProdFrm() {
    if (!pageVariable.delSSProductFrm) {
        pageVariable.delSSProductFrm = new uicontrol.confirmDelete(deleteSSProd);
    }

    var m_key = $(this).attr("tag");
    var m_ss_product = pageVariable.ssProdList.getItem(m_key);
    pageVariable.delSSProductFrm.ss_product_id = m_ss_product.SS_Product_Id;

    pageVariable.delSSProductFrm.showConfirm(mlm.C0192 + "(" + m_ss_product.ProdName + ")");
}
/* 修改销售信息 */
function saveSSProd(event, failevent) {

    var m_ss_product = new sm.ss_product();

    m_ss_product.SalePlatform_Id = pageVariable.handlerSSProdFrm.ss_product.SalePlatform_Id.toString();
    m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id.toString();

    if (Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) > 1000) {
        m_ss_product.SS_Product_Id = 0;
    }

    m_ss_product.ProdName = $.trim($("#txtSSProdName").val());

    if (!m_ss_product.ProdName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0195);
        $("#lbSSProdSymbol").trigger("click");
        return false;
    }

    if (pageVariable.handlerSSProdFrm.ss_product.ExpServices.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0431 + mlm.C0713);
        return false;
    }

    m_ss_product.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
    m_ss_product.ProdCode = $.trim($("#txtSSProdCode").val());
    m_ss_product.Unit = $.trim($("#txtSSUnit").val());
    m_ss_product.GiftCostLimit = $("#txtGiftCost").val();
    m_ss_product.GiftWeightLimit = $("#txtGiftWeight").val();
    m_ss_product.Remark = $.trim($("#ssProdHtmlTool").val()).replace(/"/g, "^").replace(/'/g, "~");
    m_ss_product.Tags = $.trim($("#ssProdTagsTool").val());
    m_ss_product.ProdPics = pageVariable.handlerSSProdFrm.ss_product.ProdPics;
    m_ss_product.State = $("#ddlSSState").val();
    m_ss_product.Brand_Id = !pageVariable.selSSBrand.brandId ? 0 : pageVariable.selSSBrand.brandId;

    m_ss_product.PdcObjs = [];
    if (pageVariable.selPdcNav.pdcId instanceof Array) {
        $.each(pageVariable.selPdcNav.pdcId, function () {
            var m_pdcSeqItem = { SS_Product_Id: m_ss_product.SS_Product_Id, SS_ProdCategory_Id: Number(this) };
            m_ss_product.PdcObjs.push(m_pdcSeqItem);
        });
    }
    else {
        if (pageVariable.selPdcNav.pdcId) {
            var m_pdcSeqItem = { SS_Product_Id: m_ss_product.SS_Product_Id, SS_ProdCategory_Id: pageVariable.selPdcNav.pdcId };
            m_ss_product.PdcObjs.push(m_pdcSeqItem);
        }
    }

    if (m_ss_product.PdcObjs.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1088);
        $("#lbSSProdSymbol").trigger("click");
        return false;
    }

    var m_abort = false;
    var m_props = pageVariable.ssPropList.dataSource.items.arrValues;
    $.each(m_props, function () {
        if (m_abort) {
            return;
        }

        if (this.IsSku == "1") {
            var m_propValues = this.ProdPValueIdRange;
            if (!m_propValues || m_propValues.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(this.ProdPropName + mlm.C0193);
                $("#lbSSProdSymbol").trigger("click");
                m_abort = true;
            }
        }
    });

    if (m_abort) {
        return false;
    }

    setPropToProduct(m_ss_product, m_props);

    if (pageVariable.handlerSSProdFrm.ss_product.InnerProds.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1113);
        return false;
    }

    var m_availableprod = true;
    m_ss_product.InnerProds = {};
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        var m_newobj = $.extend(true, {}, this);

        if (!this.SkuProducts || this.SkuProducts.length == 0) {
            m_availableprod = false;
        }
        else {
            $.each(m_newobj.SkuProducts, function () {
                this.OtherProps = null;
                this.Product = null;
            });
        }
        m_newobj.OtherProps = null;
        m_ss_product.InnerProds[this.PropValues] = m_newobj;
    });

    if (!m_availableprod) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1089);
        return false;
    }

    m_ss_product.SalePrices = $.extend(true, [], pageVariable.handlerSSProdFrm.ss_product.SalePrices);

    var m_wv = calExpSrvWeightAndVolumn();
    m_ss_product.ExpServices = [];
    $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
        if (this.MaxWeight > m_wv.Weight && (this.State == 2 || Number(this.FstCharge) > 0 || Number(this.IncreaseCharge) > 0)) {
            var m_expitem = {};
            m_expitem.SS_ExpService_Id = this.SS_ExpService_Id;
            m_expitem.SS_Product_Id = this.SS_Product_Id;
            m_expitem.SalePlatform_Id = this.SalePlatform_Id;
            m_expitem.SaleSite_Id = this.SaleSite_Id;
            m_expitem.GlobalArea_Id = this.GlobalArea_Id;
            m_expitem.ExpressService_Id = this.ExpressService_Id;
            m_expitem.FstCharge = this.FstCharge;
            m_expitem.IncreaseCharge = this.IncreaseCharge;
            m_expitem.State = this.State;

            m_ss_product.ExpServices.push(m_expitem);
        }
    });

    m_ss_product.Gifts = [];
    $.each(pageVariable.handlerSSProdFrm.ss_product.Gifts, function () {
        $.each(this.Items, function () {
            this.OtherProps = null;
            this.Product = null;
        });
        this.OtherProps = null;

        m_ss_product.Gifts.push(this);
    });

    pageVariable.handlerSSProdFrm.ss_product.ExpDict = null;
    pageVariable.handlerSSProdFrm.ss_product.OtherProps = null;
    pageVariable.handlerSSProdFrm.ss_product.PropTable = null;

    if (m_ss_product.SS_Product_Id > 1000000) {
        m_ss_product.newSS_Product(function (retObj) {
            var m_jsonobj = datastruct.convertion.tableToJson(retObj)[0];
            if (event) {
                event(m_jsonobj.SS_Product_Id);
            }
            else {
                loadSSProducts();
                pageVariable.definedProps = {};

                pageVariable.apExpAreaTree = null;
                pageVariable.expAreaTree = null;

                if (pageVariable.m_viewSSProdCtrl) {
                    pageVariable.m_viewSSProdCtrl._activedobj.expAreaTree = null;
                    pageVariable.m_viewSSProdCtrl._activedobj.apAreaTree = null;
                }
            }
        });
    }
    else {
        m_ss_product.modifySS_Product(function (retObj) {
            if (event) {
                event(m_ss_product.SS_Product_Id);
            }
            else {
                loadSSProducts();
                pageVariable.definedProps = {};

                pageVariable.apExpAreaTree = null;
                pageVariable.expAreaTree = null;

                if (pageVariable.m_viewSSProdCtrl) {
                    pageVariable.m_viewSSProdCtrl._activedobj.expAreaTree = null;
                    pageVariable.m_viewSSProdCtrl._activedobj.apAreaTree = null;
                }
            }
        });
    }

    //清理属性缓存
    pageVariable.prodPValueCache.clear();

    pageVariable.isChangeSSProd = false;

    return true;
}
/* 删除销售信息 */
function deleteSSProd() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SS_Product_Id = pageVariable.delSSProductFrm.ss_product_id;
    m_ss_product.SS_ProdCategory_Id = pageVariable.delSSProductFrm.ss_prodcategory_id;
    m_ss_product.deleteSS_Product(function () {

        loadSSProducts();

        pageVariable.delSSProductFrm.close();
    });
}

/* 加载销售商品图片 */
function loadSSProdPics() {

    pageVariable.prodPicSource = pageVariable.handlerSSProdFrm.ss_product.ProdPics;

    loadProdPicsFromPage();
}

/* 生成内部映射关系 */
function generateSSInnerProds() {
    var m_skuObjs = generateSkuObjs(pageVariable.handlerSSProdFrm.ss_product.PropTable);

    var i = 1000000;
    var m_innerTemp = new datastruct.dictionary();
    if (pageVariable.handlerSSProdFrm.ss_product.InnerProds) {
        $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
            m_innerTemp.setItem(this.PropValues, this);

            if (Number(this.SS_InnerProd_Id) > i) {
                i = Number(this.SS_InnerProd_Id) + 1;
            }
        });
    }

    var m_seq = 1;
    pageVariable.handlerSSProdFrm.ss_product.InnerProds = [];
    if (m_skuObjs.length > 0) {
        $.each(m_skuObjs, function () {

            var m_newitem = null;

            if (m_innerTemp.containKey(this.SkuKey)) {
                m_newitem = m_innerTemp.getItem(this.SkuKey);
                m_newitem.SkuProps = this.SkuProps;

                if (Number(m_newitem.SS_InnerProd_Id) > 1000000) {
                    m_newitem.SS_InnerProd_Id = i;
                }
            }
            else {
                m_newitem = {};
                m_newitem.SS_InnerProd_Id = i;
                m_newitem.SkuProduct_Ids = [];
                m_newitem.ProdCode = "";
                m_newitem.PropValues = this.SkuKey;
                m_newitem.SkuProps = this.SkuProps;
                m_newitem.BoxWeight = 0;
                m_newitem.PackageWeight = 0;
                m_newitem.BoxLength = 0;
                m_newitem.BoxWidth = 0;
                m_newitem.BoxHeight = 0;
            }

            m_newitem.Seq = m_seq;
            pageVariable.handlerSSProdFrm.ss_product.InnerProds.push(m_newitem);

            i++;
            m_seq++;
        });
    }
    else {
        var m_newitem = {};
        m_newitem.SS_InnerProd_Id = i;
        m_newitem.SkuProduct_Ids = [];
        m_newitem.ProdCode = "";
        m_newitem.PropValues = "default";
        m_newitem.SkuProps = "";
        m_newitem.BoxWeight = 0;
        m_newitem.PackageWeight = 0;
        m_newitem.BoxLength = 0;
        m_newitem.BoxWidth = 0;
        m_newitem.BoxHeight = 0;
        pageVariable.handlerSSProdFrm.ss_product.InnerProds.push(m_newitem);
    }

    pageVariable.rebindInnerProdList = true;
    pageVariable.rebindSalePriceList = true;
}

/* 展示销售商品的Tab项 */
function showSSProdTab(event, ui) {
    if (ui.index == 1) {
        loadSSProdPics();
    }
    else if (ui.index == 3) {
        if (!pageVariable.innerProdList) {
            pageVariable.innerProdList = new uicontrol.tableList("innerProdList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 350,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: constructSkuProdPicCell },
                                                { display: mlm.C0174, name: "SkuProps", width: 120, align: 'left' },
                                                { display: mlm.C1090, name: "ProdCode", width: 120, align: 'center', adjust: true, createCell: constructSS_ProdCodeCell },
                                                { display: mlm.C1251, name: "", width: 100, align: 'left', adjust: true, createCell: constructSSBoxWV },
                                                { display: mlm.C1247, name: "PackageWeight", width: 75, align: 'right', adjust: true, createCell: constructSSPackageWeight },
                                                { display: mlm.M0012, name: "", width: 300, align: 'left', adjust: true, createCell: constructSS_SkuProdCell },
                                                { display: mlm.C0019, name: "", width: 90, align: 'center', adjust: true, createCell: constructSSInnerProdOperaCell}]
                                    });

            var m_itemarr = [];
            $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
                m_itemarr.push(this);
            });
            m_itemarr.sort(sortProdProp);
            pageVariable.innerProdList.bindDataSource(m_itemarr);

            pageVariable.rebindInnerProdList = false;
        }
        else {
            if (pageVariable.rebindInnerProdList) {
                var m_itemarr = [];
                $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
                    m_itemarr.push(this);
                });
                m_itemarr.sort(sortProdProp);
                pageVariable.innerProdList.bindDataSource(m_itemarr);

                pageVariable.rebindInnerProdList = false;
            }
        }
    }
    else if (ui.index == 4) {
        var m_wv = calExpSrvWeightAndVolumn();

        $("#lbExpWeight").text(Number(m_wv.Weight).toFixed(3));

        var m_expvolumnCtrl = $("#lbExpVolume");
        m_expvolumnCtrl.text(m_wv.BoxLength + "*" + m_wv.BoxWidth + "*" + m_wv.BoxHeight);
        m_expvolumnCtrl.attr("tag", Number(m_wv.BoxLength) * Number(m_wv.BoxWidth) * Number(m_wv.BoxHeight));

        var m_customCtrl = $("#lbExpCustomValue");
        m_customCtrl.attr("tag", Number(m_wv.CustomValue).toFixed(2));
        m_customCtrl.html(commoncore.func.getCurrHtml("$", Number(m_wv.CustomValue).toFixed(2)));

        loadExpAreaTree();
    }
    else if (ui.index == 5) {
        if (!pageVariable.salePriceList) {
            pageVariable.salePriceList = new uicontrol.tableList("salePriceList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 350,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0174, name: "SkuProps", width: 150, align: 'left' },
                                                { display: mlm.C1064, name: "PurchaseCost", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C1057, name: "OtherCost", width: 70, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C1056, name: "TransCost", width: 70, align: 'right', adjust: true, createCell: constructSS_DiscountCell },
                                                { display: mlm.C0204, name: "ListPrice", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C1058, name: "Discount", width: 70, align: 'right', adjust: true, createCell: constructSS_DiscountCell },
                                                { display: mlm.C1059, name: "SalePrice", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: constructSSSalePricdOperaCell}]
                                    });

            loadSSSalePrice();
            pageVariable.rebindSalePriceList = false;
        }
        else {
            if (pageVariable.rebindSalePriceList) {
                loadSSSalePrice();
                pageVariable.rebindSalePriceList = false;
            }
        }
    }
    else if (ui.index == 6) {

        if (!pageVariable.giftList) {
            $("#btAddGift").click(openNewGiftFrm);

            pageVariable.giftList = new uicontrol.tableList("giftList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "SS_Gift_Id",
                                        columns: [{ display: mlm.C1062, name: "GiftName", width: 200, align: 'left', adjust: true, createCell: constructGiftNameCell },
                                                { display: mlm.M0012, name: "", width: 450, align: 'left', adjust: true, createCell: constructGiftItemCell },
                                                { display: mlm.C1247, name: "Weight", width: 75, align: 'right', adjust: true, createCell: constructGiftWeightCell },
                                                { display: mlm.M0017, name: "Cost", width: 75, align: 'right', adjust: true, createCell: constructGiftCostCell },
                                                { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, createCell: constructGiftOperaCell}]
                                    });
            loadGifts();
            pageVariable.rebindGiftList = false;
        }
        else {
            if (pageVariable.rebindGiftList) {
                loadGifts();
                pageVariable.rebindGiftList = false;
            }
        }
    }
    else if (ui.index == 7) {

        /* 显示进度 */
        pageframe.control.processCtrl.showOperaProcess();

        if (pageVariable.isChangeSSProd) {

            var isok = saveSSProd(function (ss_product_id) {

                var m_ss_product = new sm.ss_product();
                m_ss_product.SS_Product_Id = ss_product_id;
                m_ss_product.readSS_Product(function (retObj) {

                    fillUIObjFromProd(retObj);

                    fillProdForM();

                    loadAPExpAreaTree();
                });
            });

            if (!isok) {
                $("#lbSSProdSymbol").trigger("click");

                //隐藏进度
                pageframe.control.processCtrl.hideOperaProcess();
            }
        }
        else {
            loadAPExpAreaTree();
        }
    }
}

/* 生成Sku商品图片 */
function generateSSSkuPic() {
    var m_pics = pageVariable.handlerSSProdFrm.ss_product.ProdPics;
    var m_fstPic = m_pics[0];

    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        var m_skuobj = this;

        var m_pvstr = "_" + m_skuobj.PropValues + "_";

        var _index = 100;
        $.each(m_pics, function () {
            if (this.RelPValueIds && this.RelPValueIds.length > 0) {
                var _i = m_pvstr.lastIndexOf("_" + this.RelPValueIds.join("_") + "_");
                if (_index == 100 && _i > -1 && _i < _index) {
                    _index = _i;
                    m_skuobj.Product_Pic_Id = this.Product_Pic_Id == "0" ? this.TempUploadPic_Id : this.Product_Pic_Id;
                    m_skuobj.BrowsePicUrl = this.BrowsePicUrl;
                }
            }
        });

        if (_index == 100) {
            if (m_fstPic) {
                m_skuobj.Product_Pic_Id = m_fstPic.Product_Pic_Id == "0" ? m_fstPic.TempUploadPic_Id : m_fstPic.Product_Pic_Id;
                m_skuobj.BrowsePicUrl = m_fstPic.BrowsePicUrl;
            }
            else {
                m_skuobj.Product_Pic_Id = 0;
                m_skuobj.BrowsePicUrl = "";
            }
        }
    });

    pageVariable.rebindInnerProdList = true;
}
/* 生成销售价格数据 */
function generateSSSalePrice() {
    var m_saleprices = pageVariable.handlerSSProdFrm.ss_product.SalePrices;
    var m_spdict = new datastruct.dictionary();
    var m_spiddict = new datastruct.dictionary();

    if (m_saleprices) {
        $.each(m_saleprices, function () {
            m_spdict.setItem(this.SkuProps, this);
            m_spiddict.setItem(this.SS_InnerProd_Id, this);
        });
    }

    pageVariable.handlerSSProdFrm.ss_product.SalePrices = [];
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        if (Number(this.LimitQty) != 0) {
            var m_key = this.SkuProps;

            var m_saleprice_item = m_spiddict.getItem(this.SS_InnerProd_Id);
            if (m_saleprice_item == null) {
                m_saleprice_item = {};
                m_saleprice_item.SS_InnerProd_Id = this.SS_InnerProd_Id;
                m_saleprice_item.ListPrice = 0;
                m_saleprice_item.Discount = 1;
                m_saleprice_item.SalePrice = 0;
                m_saleprice_item.PurchaseCost = 0;
                m_saleprice_item.TransCost = 0;
                m_saleprice_item.OtherCost = 0;
                m_saleprice_item.SkuProps = this.SkuProps;
            }
            else {
                m_saleprice_item.SkuProps = this.SkuProps;
                m_saleprice_item.SS_InnerProd_Id = this.SS_InnerProd_Id;
            }

            pageVariable.handlerSSProdFrm.ss_product.SalePrices.push(m_saleprice_item);
        }
    });
}
/* 加载销售价格数据 */
function loadSSSalePrice() {
    var m_innerprods = new datastruct.dictionary();
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        m_innerprods.setItem(this.SS_InnerProd_Id, this);
    });
    pageVariable.salePriceList.bindDataSource(null);
    $.each(pageVariable.handlerSSProdFrm.ss_product.SalePrices, function () {
        var m_item = m_innerprods.getItem(this.SS_InnerProd_Id);
        if (m_item && Number(m_item.LimitQty) != 0) {
            pageVariable.salePriceList.addData(this.SS_InnerProd_Id, this);
        }
    });
}
/* 构建Sku编码列 */
function constructSS_ProdCodeCell(key, cellvalue) {
    if (!cellvalue) {
        cellvalue = mlm.C0142;
    }

    return "<input id='txtProdCode_" + key + "' tag='" + key + "' type='text' style='width: 110px' class='text-input' onclick='clickProdCode.call(this);' onblur='leaveProdCode.call(this);' onkeypress='uicontrol.func.checkInput(event);' value='" + cellvalue + "' onchange='changeSSProdCode.call(this);' />";
}
/* 改变商品编码事件 */
function changeSSProdCode() {
    var m_prodcode = $.trim($(this).val());
    if (m_prodcode == mlm.C0142) {
        m_prodcode = "";
    }
    var m_key = $(this).attr("tag");

    var m_obj = pageVariable.innerProdList.getItem(m_key);

    m_obj.ProdCode = m_prodcode;
}
/* 构建包装盒重量&体积列 */
function constructSSBoxWV(key, cellvalue) {
    var m_arr = [];

    m_arr.push("<div style='padding: 0px'>" + Number(this.keyObj.BoxWeight).toFixed(3) + " " + pageVariable.handlerSSProdFrm.ss_product.WUnit + "</div>");
    m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px'>" + this.keyObj.BoxLength + "*" + this.keyObj.BoxWidth + "*" + this.keyObj.BoxHeight + " cm³</div>");

    return m_arr.join("");
}
/* 构建商品重量 */
function constructSSPackageWeight(key, cellvalue) {
    return Number(cellvalue).toFixed(3) + " " + pageVariable.handlerSSProdFrm.ss_product.WUnit;
}
/* 构建内部商品列 */
function constructSS_SkuProdCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (m_obj.SkuProducts) {

        var m_strarr = [];
        var i = 0;
        $.each(m_obj.SkuProducts, function () {

            var m_style = "style='padding: 0px;";
            if (i > 0) {
                m_style += "margin: 5px 0px 0px 0px";
            }
            m_style += "'";

            var m_product_id = this.Product_Id;
            if (!m_product_id) {
                m_product_id = this.OtherProps.Product_Id;
            }
            var m_skuproduct_id = this.SkuProduct_Id;
            if (!m_skuproduct_id) {
                m_skuproduct_id = this.OtherProps.SkuProduct_Id;
            }

            if (this.RelQty == "1") {
                m_strarr.push("<div " + m_style + "><a onclick='viewProduct.call(this, \"" + m_product_id + "\", \"" + m_skuproduct_id + "\")' href='javascript:void(\"0\");'>" + this.InnerProd + "</a></div>");
            }
            else {
                m_strarr.push("<div " + m_style + "><a onclick='viewProduct.call(this, \"" + m_product_id + "\", \"" + m_skuproduct_id + "\")' href='javascript:void(\"0\");'>" + this.InnerProd + " [" + this.RelQty + this.Product.Unit + "]</a></div>");
            }
            i++;
        });
        return m_strarr.join("");
    }
    else {
        return "";
    }
}
/* 构建映射关系操作列 */
function constructSSInnerProdOperaCell(key, cellvalue) {
    return "<div style='padding: 0px'><a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openHandlerSSInnerProdFrm.call(this);'>" + mlm.C1092 + "</a></div>" +
           "<div style='padding: 0px'><a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openHandlerSSProdBox.call(this);'>" + mlm.C1250 + "</a></div>";
}
/* 构建目录价操作列 */
function constructSS_PriceCell(key, cellvalue) {
    if (Number(cellvalue) > 0) {
        return commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue);
    }
}
/* 构建折扣操作列 */
function constructSS_DiscountCell(key, cellvalue) {
    var m_discount = Number(cellvalue);
    if (m_discount > 0) {
        return m_discount * 100 + "%";
    }
}
/* 构建商品价格操作列 */
function constructSSSalePricdOperaCell(key, cellvalue) {
    return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openSetSalePriceFrm.call(this);'>" + mlm.C0611 + "</a>";
}

/* 打开设置内部商品映射关系的窗体 */
function openHandlerSSInnerProdFrm() {
    if (!pageVariable.handlerSSInnerProdFrm) {
        pageVariable.handlerSSInnerProdFrm = new uicontrol.dialog("handlerSSInnerProdFrm", mlm.C1093, { width: 900, position: ["auto", 25] }, saveInnerProdRel);

        $("#btAddGbom").click(openSelectGbomFrm);

        pageVariable.handlerSSInnerProdFrm.show();

        pageVariable.gbomList = new uicontrol.tableList("gbomList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "SkuProduct_Id",
                                        columns: [{ display: mlm.M0012, name: "InnerProd", width: 350, align: 'left' },
                                                { display: mlm.C1094, name: "", width: 110, align: 'left', adjust: true, createCell: constructSS_RelQtyCell },
                                                { display: mlm.C1247, name: "Weight", width: 80, align: 'right', adjust: true, createCell: constructSSPackageWeight },
                                                { display: mlm.M0017, name: "Cost", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, deletedFunc: "openDelInnerProdRel"}]
                                    });
    }
    else {
        pageVariable.handlerSSInnerProdFrm.show();
    }

    var m_key = $(this).attr("tag");
    pageVariable.handlerSSInnerProdFrm.ss_innerprod_id = m_key;

    var m_skuProd = pageVariable.innerProdList.getItem(m_key);

    var m_prodstr = $.trim($("#txtSSProdName").val());
    if (m_skuProd.SkuProps) {
        m_prodstr = m_prodstr + " - [" + m_skuProd.SkuProps + "]";
    }
    $("#lbSSSkuProd").text(m_prodstr);

    var m_gbomSource = [];
    var i = 0;
    $.each(m_skuProd.SkuProduct_Ids, function () {
        var m_item = {};
        m_item.SkuProduct_Id = this;

        var m_skuitem = m_skuProd.SkuProducts[i];
        m_item.InnerProd = m_skuitem.InnerProd;
        m_item.Product_Id = m_skuitem.Product_Id;
        m_item.ProdCode = m_skuitem.ProdCode;
        m_item.SkuProps = m_skuitem.SkuProps;
        m_item.RelQty = m_skuitem.RelQty;
        m_item.Weight = Number(m_skuitem.OtherProps.Weight) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.WeightRate);
        m_item.Cost = Number(m_skuitem.OtherProps.Cost) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.CurrRate);
        m_item.Product = m_skuitem.Product;
        m_item.OtherProps = {};
        m_item.OtherProps.Weight = m_skuitem.OtherProps.Weight;
        m_item.OtherProps.Cost = m_skuitem.OtherProps.Cost;

        m_gbomSource.push(m_item);

        i++;
    });
    pageVariable.gbomList.bindDataSource(m_gbomSource);
}
/* 构建关联数量列 */
function constructSS_RelQtyCell(key, cellvalue) {

    var m_obj = pageVariable.gbomList.getItem(key);

    return "<input id='" + pageVariable.gbomList._ctrlId + "_txtRelQty_" + key + "' type='text' class='text-input' style='width: 65px' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + m_obj.RelQty + "' /> <span>" + m_obj.Product.Unit + "</span>";
}
/* 打开搜索内部商品的窗体 */
function openSelectGbomFrm() {
    if (!pageVariable.selectGbom) {
        pageVariable.selectGbom = new bizcontrol.selectproduct(addGbom);
    }

    var m_selecteditems = new datastruct.dictionary();
    var m_items = pageVariable.gbomList.dataSource.items.arrValues;
    $.each(m_items, function () {
        m_selecteditems.setItem(this.SkuProduct_Id, this);
        this.Cost = this.OtherProps.Cost;
    });
    pageVariable.selectGbom.show(m_selecteditems);
}
/* 添加内部商品 */
function addGbom(selectedskuprods) {
    pageVariable.gbomList.bindDataSource(null);
    $.each(selectedskuprods, function () {
        var m_gbom = {};
        if (this.SkuProps) {
            m_gbom.InnerProd = this.ProdCode + " - " + this.Product.ProdName + " - [" + this.SkuProps + "]";
        }
        else {
            m_gbom.InnerProd = this.ProdCode + " - " + this.Product.ProdName;
        }
        m_gbom.SkuProduct_Id = this.SkuProduct_Id;
        m_gbom.ProdCode = this.ProdCode;
        m_gbom.SkuProps = this.SkuProps;
        m_gbom.RelQty = 1;
        m_gbom.Product = this.Product;
        m_gbom.Product_Id = this.Product.Product_Id;
        m_gbom.Weight = Number(this.Product.Weight) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.WeightRate);
        m_gbom.Cost = Number(this.Cost) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.CurrRate);
        m_gbom.OtherProps = {};
        m_gbom.OtherProps.Weight = this.Product.Weight;
        m_gbom.OtherProps.Cost = this.Cost;

        pageVariable.gbomList.addData(m_gbom.SkuProduct_Id, m_gbom);
    });
}
/* 保存内部商品映射关系 */
function saveInnerProdRel() {

    var m_obj = pageVariable.innerProdList.getItem(pageVariable.handlerSSInnerProdFrm.ss_innerprod_id);

    m_obj.SkuProduct_Ids = [];
    m_obj.SkuProducts = [];
    m_obj.PackageWeight = 0;
    m_obj.Cost = 0;
    $.each(pageVariable.gbomList.dataSource.items.arrValues, function () {
        this.SkuProduct_Id = this.SkuProduct_Id.toString();
        m_obj.SkuProduct_Ids.push(this.SkuProduct_Id);

        var m_qtyCtrl = $("#" + pageVariable.gbomList._ctrlId + "_txtRelQty_" + this.SkuProduct_Id);
        this.RelQty = m_qtyCtrl.val();

        m_obj.PackageWeight += Number(this.RelQty) * Number(this.Weight);
        m_obj.Cost += Number(this.RelQty) * Number(this.Cost);

        m_obj.SkuProducts.push(this);
    });

    pageVariable.innerProdList.modifyData(m_obj.SS_InnerProd_Id, m_obj);

    //刷新商品重量、成本和利润
    refreshCalculateInfo();

    var m_saleprices = pageVariable.handlerSSProdFrm.ss_product.SalePrices;
    if (m_saleprices) {
        $.each(m_saleprices, function () {
            if (this.SS_InnerProd_Id == m_obj.SS_InnerProd_Id) {
                this.PurchaseCost = m_obj.Cost;
            }
        });
    }
    pageVariable.rebindSalePriceList = true;

    pageVariable.handlerSSInnerProdFrm.close();
}
/* 打开删除映射关系的窗体 */
function openDelInnerProdRel() {
    if (!pageVariable.delInnerProdRelFrm) {
        pageVariable.delInnerProdRelFrm = new uicontrol.confirmDelete(deleteInnerProdRel);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.gbomList.getItem(m_key);

    pageVariable.delInnerProdRelFrm.skuproduct_id = m_key;
    pageVariable.delInnerProdRelFrm.showConfirm(mlm.C0464 + mlm.C1095 + "(" + m_obj.InnerProd + ") ?");
}
/* 删除映射关系 */
function deleteInnerProdRel() {
    pageVariable.gbomList.deleteData(pageVariable.delInnerProdRelFrm.skuproduct_id);

    //刷新商品重量、成本和利润
    refreshCalculateInfo();

    pageVariable.delInnerProdRelFrm.close();
}

/* 打开设置商品定价的窗体 */
function openSetSalePriceFrm() {
    if (!pageVariable.handlerSalePriceFrm) {
        pageVariable.handlerSalePriceFrm = new uicontrol.dialog("handlerSalePriceFrm", mlm.C0611 + mlm.C1096, { width: 900, position: ["auto", 25] }, saveSalePrice);

        $("#txtListPrice, #txtDiscount").change(function () {
            var m_listprice = Number($("#txtListPrice").val());
            var m_discount = Number($("#txtDiscount").val()) / 100;

            $("#txtSalePrice").val((m_listprice * m_discount).toFixed(2));
        });
        $("#txtSalePrice").change(function () {
            var m_listprice = Number($("#txtListPrice").val());
            var m_saleprice = Number($("#txtSalePrice").val());

            $("#txtDiscount").val((m_saleprice / m_listprice).toFixed(2) * 100);
        });
    }

    pageVariable.handlerSalePriceFrm.show();

    var m_currcode = pageVariable.handlerSSProdFrm.ss_product.CurrCode.toString();
    $("#lbCurr_1, #lbCurr_2, #lbCurr_5").text(m_currcode);

    var m_key = $(this).attr("tag");
    if (m_key) {
        var m_obj = pageVariable.salePriceList.getItem(m_key);

        $("#dvSkuForPrice").show();

        $("#lbSKU").text(m_obj.SkuProps);
        $("#txtDiscount").val(Number(m_obj.Discount) * 100);
        $("#txtListPrice").val(Number(m_obj.ListPrice).toFixed(2));
        $("#txtSalePrice").val(Number(m_obj.SalePrice).toFixed(2));
        $("#txtSSTransCost").val((Number(m_obj.TransCost) * 100).toFixed(2));
        $("#txtSSOtherCost").val(Number(m_obj.OtherCost).toFixed(2));

        pageVariable.handlerSalePriceFrm.ss_saleprice = m_obj;
    }
    else {
        $("#dvSkuForPrice").hide();
        $("#txtDiscount").val("100");
        $("#txtListPrice").val("0.00");
        $("#txtSalePrice").val("0.00");
        $("#txtSSTransCost").val("0");
        $("#txtSSOtherCost").val("0.00");

        pageVariable.handlerSalePriceFrm.ss_saleprice = null;
    }
}
/* 保存商品价格 */
function saveSalePrice() {

    var m_discount = Number($("#txtDiscount").val()) / 100;
    var m_saleprice = Number($("#txtSalePrice").val());
    var m_listprice = Number($("#txtListPrice").val());
    if (m_saleprice > m_listprice) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1097);
        return false;
    }

    if (pageVariable.handlerSalePriceFrm.ss_saleprice) {
        pageVariable.handlerSalePriceFrm.ss_saleprice.SalePrice = m_saleprice;
        pageVariable.handlerSalePriceFrm.ss_saleprice.ListPrice = m_listprice;
        pageVariable.handlerSalePriceFrm.ss_saleprice.Discount = m_discount;
        pageVariable.handlerSalePriceFrm.ss_saleprice.OtherCost = $("#txtSSOtherCost").val();
        pageVariable.handlerSalePriceFrm.ss_saleprice.TransCost = Number($("#txtSSTransCost").val()) / 100;

        pageVariable.salePriceList.modifyData(pageVariable.handlerSalePriceFrm.ss_saleprice.SS_InnerProd_Id, pageVariable.handlerSalePriceFrm.ss_saleprice);
    }
    else {
        $.each(pageVariable.salePriceList.dataSource.items.arrValues, function () {
            this.SalePrice = m_saleprice;
            this.ListPrice = m_listprice;
            this.Discount = m_discount;
            this.OtherCost = $("#txtSSOtherCost").val();
            this.TransCost = Number($("#txtSSTransCost").val()) / 100;

            pageVariable.salePriceList.modifyData(this.SS_InnerProd_Id, this);
        });
    }

    pageVariable.isChangeSSProd = true;

    pageVariable.handlerSalePriceFrm.close();
}

/* 加载赠品数据 */
function loadGifts() {
    pageVariable.giftList.bindDataSource(pageVariable.handlerSSProdFrm.ss_product.Gifts);
}
/* 构建赠品名称列 */
function constructGiftNameCell(key, cellvalue) {
    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) {
        m_fontstyle = "color: red;"
    }

    return "<span style='" + m_fontstyle + "'>" + cellvalue + "<span>";
}
/* 构建赠品重量列 */
function constructGiftWeightCell(key, cellvalue) {
    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) {
        m_fontstyle = "color: red;"
    }

    return "<span style='" + m_fontstyle + "'>" + Number(cellvalue).toFixed(3) + " " + pageVariable.handlerSSProdFrm.ss_product.WUnit + "<span>";
}
/* 构建赠品成本列 */
function constructGiftCostCell(key, cellvalue) {
    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) {
        m_fontstyle = "color: red;"
    }

    return "<span style='" + m_fontstyle + "'>" + commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue) + "<span>";
}
/* 构建赠品的内部详细信息列 */
function constructGiftItemCell(key, cellvalue) {
    var m_strs = [];
    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) {
        m_fontstyle = "color: red;"
    }

    var i = 0;
    $.each(m_obj.Items, function () {

        var m_style = "style='padding: 0px;";
        if (i > 0) {
            m_style += "margin: 5px 0px 0px 0px;";
        }
        m_style += "'";

        if (Number(this.Qty) > 1) {
            m_strs.push("<div " + m_style + "><a style='" + m_fontstyle + "' onclick='viewProduct.call(this, \"" + this.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.InnerProd + " [" + this.Qty + this.Product.Unit + "]</a></div>");
        }
        else {
            m_strs.push("<div " + m_style + "><a style='" + m_fontstyle + "' onclick='viewProduct.call(this, \"" + this.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.InnerProd + "</a></div>");
        }
        i++;
    });

    return m_strs.join("");
}
/* 创建赠品操作设置列 */
function constructGiftOperaCell(key, cellvalue) {

    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) {
        m_fontstyle = "style='color: red;'"
    }

    return "<a href='javascript:void(\"0\")' class='bt-link' " + m_fontstyle + " tag='" + key + "' onclick='openModifyGiftFrm.call(this);'>" + mlm.C0061 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' " + m_fontstyle + " tag='" + key + "' onclick='openDelGiftFrm.call(this);'>" + mlm.C0062 + "</a>";
}
/* 初始化赠品窗体 */
function initHandlerGiftFrm() {
    if (!pageVariable.handlerGiftFrm) {
        pageVariable.handlerGiftFrm = new uicontrol.dialog("handlerGiftFrm", "", { width: 900, position: ["auto", 25] }, saveGift);

        $("#btAddGiftItem").click(openSelectGiftItemFrm);

        pageVariable.handlerGiftFrm.show();
        pageVariable.giftItemList = new uicontrol.tableList("giftItemList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "SkuProduct_Id",
                                        columns: [{ display: mlm.C1055, name: "InnerProd", width: 350, align: 'left' },
                                                { display: mlm.C1098, name: "", width: 120, align: 'left', adjust: true, createCell: constructSS_GiftQtyCell },
                                                { display: mlm.C1247, name: "Weight", width: 80, align: 'right', adjust: true, createCell: constructSSPackageWeight },
                                                { display: mlm.M0017, name: "Cost", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, deletedFunc: "openDelGiftItem"}]
                                    });
    }
    else {
        pageVariable.handlerGiftFrm.show();
    }
}
/* 构建赠品数量列 */
function constructSS_GiftQtyCell(key, cellvalue) {
    var m_obj = pageVariable.giftItemList.getItem(key);
    return "<input id='" + pageVariable.giftItemList._ctrlId + "_txtQty_" + key + "' type='text' class='text-input' style='width: 65px' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + m_obj.Qty + "' /> <span>" + m_obj.Product.Unit + "</span>";
}
/* 打开新增赠品的窗体 */
function openNewGiftFrm() {

    initHandlerGiftFrm();

    $("#txtGiftName").val("");
    pageVariable.giftItemList.bindDataSource(null);

    pageVariable.handlerGiftFrm.ss_gift = null;
    pageVariable.handlerGiftFrm.ss_gift_id = 0;
    pageVariable.handlerGiftFrm.action = "New";
    pageVariable.handlerGiftFrm.setTitle(mlm.C0461 + mlm.C1061);
}
/* 打开修改赠品的窗体 */
function openModifyGiftFrm() {

    initHandlerGiftFrm();

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.giftList.getItem(m_key);

    $("#txtGiftName").val(m_obj.GiftName);

    $.each(m_obj.Items, function () {
        this.Weight = Number(this.OtherProps.Weight) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.WeightRate);
        this.Cost = Number(this.OtherProps.Cost) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.CurrRate);
    });

    pageVariable.giftItemList.bindDataSource(m_obj.Items);

    pageVariable.handlerGiftFrm.ss_gift = m_obj;
    pageVariable.handlerGiftFrm.ss_gift_id = m_key;
    pageVariable.handlerGiftFrm.action = "Modify";
    pageVariable.handlerGiftFrm.setTitle(mlm.C0061 + mlm.C1061);
}
/* 打开删除赠品的窗体 */
function openDelGiftFrm() {
    if (!pageVariable.delGiftFrm) {
        pageVariable.delGiftFrm = new uicontrol.confirmDelete(deleteGift);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.giftList.getItem(m_key);

    pageVariable.delGiftFrm.ss_gift_id = m_key;
    pageVariable.delGiftFrm.showConfirm(mlm.C0464 + mlm.C1061 + "(" + m_obj.GiftName + ") ?");
}
/* 删除赠品 */
function deleteGift() {
    pageVariable.giftList.deleteData(pageVariable.delGiftFrm.ss_gift_id);

    pageVariable.handlerSSProdFrm.ss_product.Gifts = pageVariable.giftList.dataSource.items.arrValues;

    pageVariable.delGiftFrm.close();
}
/* 保存赠品 */
function saveGift() {
    var m_giftname = $.trim($("#txtGiftName").val());
    if (!m_giftname) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1099);
        return;
    }

    var m_proddict = new datastruct.dictionary();
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        $.each(this.SkuProducts, function () {
            m_proddict.setItem(this.Product_Id, null);
        });
    });

    var m_gift = pageVariable.handlerGiftFrm.ss_gift;
    if (!m_gift) {
        m_gift = {};
    }
    var m_items = [];
    m_gift.Weight = 0;
    m_gift.Cost = 0;
    var m_iserroinfo = null;
    $.each(pageVariable.giftItemList.dataSource.items.arrValues, function () {

        if (m_proddict.containKey(this.Product_Id)) {
            m_iserroinfo = this.InnerProd;
        }

        if (!m_iserroinfo) {
            this.Qty = $("#" + pageVariable.giftItemList._ctrlId + "_txtQty_" + this.SkuProduct_Id).val();

            m_gift.Weight += Number(this.Qty) * Number(this.Weight);
            m_gift.Cost += Number(this.Qty) * Number(this.Cost);

            m_items.push(this);
        }
    });

    if (m_iserroinfo) {
        pageframe.control.alertDialog.showAlertInfo(m_iserroinfo + " " + mlm.C1265);
        return;
    }

    if (m_items.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1100);
        return;
    }

    m_gift.GiftName = m_giftname;
    m_gift.Items = m_items;

    if (pageVariable.handlerGiftFrm.action == "New") {
        m_gift.SS_Gift_Id = pageVariable.handlerSSProdFrm.max_gift_id;
        pageVariable.giftList.addData(m_gift.SS_Gift_Id, m_gift);

        pageVariable.handlerSSProdFrm.max_gift_id++;

        pageVariable.handlerSSProdFrm.ss_product.Gifts = pageVariable.giftList.dataSource.items.arrValues;
    }
    else {
        pageVariable.giftList.modifyData(m_gift.SS_Gift_Id, m_gift);
    }

    pageVariable.handlerGiftFrm.close();
}
/* 打开选择赠品的窗体 */
function openSelectGiftItemFrm() {
    if (!pageVariable.selectGiftItem) {
        pageVariable.selectGiftItem = new bizcontrol.selectproduct(addGiftItem);
    }

    var m_selecteditems = new datastruct.dictionary();
    var m_items = pageVariable.giftItemList.dataSource.items.arrValues;
    $.each(m_items, function () {
        m_selecteditems.setItem(this.SkuProduct_Id, this);
        this.Cost = this.OtherProps.Cost;
    });
    pageVariable.selectGiftItem.show(m_selecteditems);
}
/* 添加赠品 */
function addGiftItem(selectedskuprods) {
    pageVariable.giftItemList.bindDataSource(null);
    $.each(selectedskuprods, function () {
        var m_giftitem = {};
        m_giftitem.SkuProduct_Id = this.SkuProduct_Id;
        if (this.SkuProps) {
            m_giftitem.InnerProd = this.ProdCode + " - " + this.Product.ProdName + " - [" + this.SkuProps + "]";
        }
        else {
            m_giftitem.InnerProd = this.ProdCode + " - " + this.Product.ProdName;
        }
        m_giftitem.Qty = 1;
        m_giftitem.ProdCode = this.ProdCode;
        m_giftitem.SkuProps = this.SkuProps;
        m_giftitem.Product = this.Product;
        m_giftitem.Product_Id = this.Product.Product_Id;
        m_giftitem.Weight = Number(this.Product.Weight) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.WeightRate);
        m_giftitem.Cost = Number(this.Cost) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.CurrRate);
        m_giftitem.OtherProps = {};
        m_giftitem.OtherProps.Weight = this.Product.Weight;
        m_giftitem.OtherProps.Cost = this.Cost;

        pageVariable.giftItemList.addData(m_giftitem.SkuProduct_Id, m_giftitem);
    });
}
/* 打开删除赠品的窗体 */
function openDelGiftItem() {
    if (!pageVariable.delGiftItemFrm) {
        pageVariable.delGiftItemFrm = new uicontrol.confirmDelete(deleteGiftItem);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.giftItemList.getItem(m_key);

    pageVariable.delGiftItemFrm.skuproduct_id = m_key;
    pageVariable.delGiftItemFrm.showConfirm(mlm.C0464 + mlm.C1055 + "(" + m_obj.InnerProd + ") ?");
}
/* 删除赠品 */
function deleteGiftItem() {
    pageVariable.giftItemList.deleteData(pageVariable.delGiftItemFrm.skuproduct_id);
    pageVariable.delGiftItemFrm.close();
}
/* 赠品重量限制改变事件 */
function changeGiftWeightLimit() {
    var m_value = $(this).val();
    if (!m_value) {
        $(this).val("0.000");
    }

    pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit = m_value;

    //刷新商品重量、成本和利润
    refreshCalculateInfo();
}
/* 赠品成本限制改变事件 */
function changeGiftCostLimit() {
    var m_value = $(this).val();
    if (!m_value) {
        $(this).val("0.00");
    }

    pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit = m_value;

    pageVariable.isChangeSSProd = true;
}

/* 加载快递区域树 */
function loadExpAreaTree() {

    if (!pageVariable.expAreaTree || !pageVariable.expAreaTree.ss_product_id || pageVariable.expAreaTree.ss_product_id != pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) {

        /* 显示进度 */
        pageframe.control.processCtrl.showOperaProcess();

        var globalarea = new othm.globalarea();
        globalarea.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
        globalarea.queryGlobalAreaBySaleSite(function (source) {

            pageVariable.expAreaTree = new uicontrol.treeView($("#expAreaTree"), source, fillExpService,
                                                        { sourceFormat: "table",
                                                            keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                            constructDisplayTxt: constructGAreaTxt, isCollapse: true
                                                        });
            pageVariable.expAreaTree.loadSource();
            pageVariable.expAreaTree.ss_product_id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;

            fillExpService();

            pageframe.control.processCtrl.hideOperaProcess();
        });
    }
}
/* 构建区域显示 */
function constructGAreaTxt(objitem) {
    var m_len = 0;
    var m_expobjs = pageVariable.handlerSSProdFrm.ss_product.ExpDict.getItem(objitem.tag.GlobalArea_Id);
    if (m_expobjs) {
        $.each(m_expobjs, function () {
            if (this.State == "1") {
                m_len++;
            }
        });
    }

    var m_id = "_exp_area_" + objitem.tag.GlobalArea_Id;
    if (m_len > 0) {
        return "<span id='" + m_id + "' tag='" + m_len + "'>" + objitem.tag.GlobalAreaName + "(" + m_len + ")" + "</span>";
    }
    else {
        return "<span id='" + m_id + "' tag='" + 0 + "' class='lb-symbol'>" + objitem.tag.GlobalAreaName + "</span>";
    }
}
/* 加载快递服务 */
function fillExpService() {
    if (!pageVariable.expServiceList) {
        pageVariable.expServiceList = new uicontrol.tableList("expServiceList",
                                     { autoSeq: true,
                                         keyColumn: "ExpressService_Id",
                                         height: 295,
                                         columns: [{ display: mlm.C0436, name: "ExpressServiceName", width: 200, align: 'left', adjust: true, createCell: constructESName },
                                                   { display: mlm.C0291, name: "GlobalAreaName", width: 90, align: 'left' },
                                                   { display: mlm.C0786, name: "ESType", width: 70, align: 'left', adjust: true, createCell: constructESTypeCell },
                                                   { display: mlm.C0845, name: "FstExpCost", width: 60, align: 'right', adjust: true, createCell: constructSSExpCostCell },
                                                   { display: mlm.C0846, name: "IncreaExpCost", width: 65, align: 'right', adjust: true, createCell: constructSSExpCostCell },
                                                   { display: mlm.C1020, name: "FstCharge", width: 85, align: 'center', adjust: true, createCell: constructSSExpChargeCell },
                                                   { display: mlm.C1021, name: "IncreaseCharge", width: 85, align: 'center', adjust: true, createCell: constructSSExpIncreaChargeCell },
                                                   { display: mlm.C0367, name: "State", width: 60, align: 'center', adjust: true, createCell: constructSSExpStateCell}]
                                     });
    }

    loadExpServiceList();
    calculateExpCharge();
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
/* 加载配送服务列表 */
function loadExpServiceList() {
    if (pageVariable.expAreaTree.selectedItem) {
        var m_globalareaid = pageVariable.expAreaTree.selectedItem.key;
        var m_globalservices = pageVariable.handlerSSProdFrm.ss_product.ExpDict.getItem(m_globalareaid);
        if (m_globalservices) {
            $.each(m_globalservices, function () {
                this.GlobalAreaName = pageVariable.expAreaTree.selectedItem.tag.GlobalAreaName;
            });
        }

        pageVariable.expServiceList.bindDataSource(null);
        if (m_globalservices) {
            $.each(m_globalservices, function () {
                if (Number(this.MaxWeight) >= Number($("#lbExpWeight").text())) {
                    pageVariable.expServiceList.addData(this.ExpressService_Id, this);
                }
            });
        }
    }
}
/* 查看配送服务 */
function openViewExpressServiceFrm(key) {
    pageVariable.viewExpServiceFrm.show(key);
}
/* 构造配送服务名称列 */
function constructESName(key, cellValue) {
    var m_arr = [];

    var m_obj = this.keyObj;
    m_arr.push("<a onclick='openViewExpressServiceFrm.call(this, \"" + m_obj.ExpressService_Id + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>");

    if (m_obj.WarehouseName) {
        m_arr.push("<div class='lb-symbol'>(" + m_obj.WarehouseName + ")</div>");
    }

    return m_arr.join("");
}
/* 构建费用成本列 */
function constructSSExpCostCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (m_obj.ESType == "2") {
        return commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue);
    }
}
/* 构建配送服务状态列 */
function constructSSExpStateCell(key, cellvalue) {
    if (cellvalue == "1") {
        return "<select class='dropdown-list' style='width: 55px' tag='" + key + "' onchange='changeExpState.call(this);'><option value='1' selected='selected'>" + mlm.C1018 + "</option><option value='2'>" + mlm.C1019 + "</option></select>"
    }
    else {
        return "<select class='dropdown-list' style='width: 55px' tag='" + key + "' onchange='changeExpState.call(this);'><option value='1'>" + mlm.C1018 + "</option><option value='2' selected='selected'>" + mlm.C1019 + "</option></select>"
    }
}
/* 构建首件报价列 */
function constructSSExpChargeCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (m_obj.ESType == "2") {
        if (!cellvalue) {
            cellvalue = "0.00";
        }
        else {
            cellvalue = Number(cellvalue).toFixed(2);
        }
        return pageVariable.handlerSSProdFrm.ss_product.CurrSymbol + " <input id='txtExpFstPrice_" + key + "' type='text' class='text-input' style='width: 45px' onchange='changeFstExpCharge.call(this);' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + cellvalue + "' />";
    }
}
/* 构建首件报价列 */
function constructSSExpIncreaChargeCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (m_obj.ESType == "2") {
        if (!cellvalue) {
            cellvalue = "0.00";
        }
        else {
            cellvalue = Number(cellvalue).toFixed(2);
        }
        return pageVariable.handlerSSProdFrm.ss_product.CurrSymbol + " <input id='txtExpFstPrice_" + key + "' type='text' class='text-input' style='width: 45px' onchange='changeIncreaExpCharge.call(this);' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + cellvalue + "' />";
    }
}
/* 改变首件费用事件 */
function changeFstExpCharge() {
    var m_key = $(this).attr("id").split("_")[1];
    var m_obj = pageVariable.expServiceList.getItem(m_key);
    m_obj.FstCharge = $(this).val();

    pageVariable.isChangeSSProd = true;
}
/* 改变额外费用事件 */
function changeIncreaExpCharge() {
    var m_key = $(this).attr("id").split("_")[1];
    var m_obj = pageVariable.expServiceList.getItem(m_key);
    m_obj.IncreaseCharge = $(this).val();

    pageVariable.isChangeSSProd = true;
}
/* 改变状态事件 */
function changeExpState() {
    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.expServiceList.getItem(m_key);
    m_obj.State = $(this).val();

    var m_areaCtrl = $("#_exp_area_" + m_obj.GlobalArea_Id);
    var m_len = Number(m_areaCtrl.attr("tag"));
    if (m_obj.State == "2") {
        m_areaCtrl.addClass("lb-symbol");
        m_len--;
    }
    else {
        m_areaCtrl.removeClass("lb-symbol");
        m_len++;
    }
    m_areaCtrl.attr("tag", m_len);
    if (m_len > 0) {
        m_areaCtrl.text(m_obj.GlobalAreaName + "(" + m_len + ")");
    }
    else {
        m_areaCtrl.text(m_obj.GlobalAreaName);
    }

    pageVariable.isChangeSSProd = true;
}
/* 导出配送价格 */
function exportExpServices() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
    m_ss_product.SysWeightUnit_id = pageVariable.handlerSSProdFrm.ss_product.SysWeightUnit_Id;
    m_ss_product.SysCurrency_id = pageVariable.handlerSSProdFrm.ss_product.SysCurrency_Id;
    m_ss_product.Weight = $("#lbExpWeight").text();
    m_ss_product.Volumn = $("#lbExpVolume").attr("tag");
    m_ss_product.Tax = $("#lbExpCustomValue").attr("tag");
    m_ss_product.ExpServices = pageVariable.handlerSSProdFrm.ss_product.ExpServices;
    m_ss_product.exportProductExpServices(function (paramObj) {
        window.open(paramObj);
    });
}
/* 打开导入配送价格的窗体 */
function openImportExpServicesFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importData);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.type = "expservice";
    pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C1101);
    pageVariable.handlerImportFrm.show();
}
/* 运费测算 */
function calculateExpCharge() {
    if (!pageVariable.expAreaTree.selectedItem) {
        return;
    }
    var m_globalarea_id = pageVariable.expAreaTree.selectedItem.key;

    var m_func = function (expservices) {
        if (expservices) {
            $.each(expservices, function () {
                var m_item = pageVariable.expServiceList.getItem(this.ExpressService_Id);
                if (m_item) {
                    m_item.FstExpCost = this.FirstCharge;
                    m_item.IncreaExpCost = this.OtherCharge;

                    pageVariable.expServiceList.modifyData(m_item.ExpressService_Id, m_item);
                }
            });
        }
    };

    if (!pageVariable.handlerSSProdFrm.expchargedict.containKey(m_globalarea_id)) {
        var m_weight = Number($("#lbExpWeight").text());
        if (m_weight > 0 && pageVariable.expAreaTree.selectedItem) {
            var m_expressservice = new sm.expressservice();
            m_expressservice.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
            m_expressservice.SysWeightUnit_id = pageVariable.handlerSSProdFrm.ss_product.SysWeightUnit_Id;
            m_expressservice.SysCurrency_id = pageVariable.handlerSSProdFrm.ss_product.SysCurrency_Id;
            m_expressservice.Weight = m_weight;
            m_expressservice.Volumn = $("#lbExpVolume").attr("tag");
            m_expressservice.Tax = $("#lbExpCustomValue").attr("tag");

            m_expressservice.getCalFixExpress(function (retTable) {
                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                var m_expservicecosts = new datastruct.dictionary();
                $.each(m_jsonobjs, function () {
                    var m_expservices = pageVariable.handlerSSProdFrm.expchargedict.getItem(this.GlobalArea_Id);
                    if (!m_expservices) {
                        m_expservices = [];
                        pageVariable.handlerSSProdFrm.expchargedict.setItem(this.GlobalArea_Id, m_expservices);
                    }
                    m_expservices.push(this);
                });

                m_func(pageVariable.handlerSSProdFrm.expchargedict.getItem(m_globalarea_id));
            });
        }
    }
    else {
        m_func(pageVariable.handlerSSProdFrm.expchargedict.getItem(m_globalarea_id));
    }
}

/* 刷新站点商品的重量、成本和利润 */
function refreshCalculateInfo() {
    pageVariable.handlerSSProdFrm.expchargedict.clear();
    if (pageVariable.expServiceList) {
        pageVariable.expServiceList.bindDataSource(null);
    }
    if (pageVariable.expAreaTree) {
        pageVariable.expAreaTree.clearSelectedItem();
    }
    pageVariable.isChangeSSProd = true;

    var m_wv = calExpSrvWeightAndVolumn();

    $("#lbExpWeight").text(Number(m_wv.Weight).toFixed(3));
    $("#lbExpCustomValue").text(Number(m_wv.CustomeValue).toFixed(2));

    var m_expvolumnCtrl = $("#lbExpVolume");
    m_expvolumnCtrl.text(m_wv.BoxLength + "*" + m_wv.BoxWidth + "*" + m_wv.BoxHeight);
    m_expvolumnCtrl.attr("tag", Number(m_wv.BoxLength) * Number(m_wv.BoxWidth) * Number(m_wv.BoxHeight));
}

/* 查看商品信息 */
function viewProduct(prodKey, skuproduct_id) {
    if (!pageVariable.viewProdCtrl) {
        pageVariable.viewProdCtrl = new bizcontrol.viewproduct();
    }
    if (pageVariable.viewProdCtrl.viewProdDialog) {
        pageVariable.viewProdCtrl.viewProdDialog.close();
    }
    pageVariable.viewProdCtrl.show(prodKey.split("-")[0], skuproduct_id);
}
/* 查看商品信息 */
function viewSSProduct(prodKey) {
    if (!pageVariable.m_viewSSProdCtrl) {
        pageVariable.m_viewSSProdCtrl = new bizcontrol.viewssproduct();
    }
    if (pageVariable.m_viewSSProdCtrl.viewProdDialog) {
        pageVariable.m_viewSSProdCtrl.viewProdDialog.close();
    }
    pageVariable.m_viewSSProdCtrl.show(prodKey.split("-")[0]);
}

/* 计算快递服务测算重量和体积 */
function calExpSrvWeightAndVolumn() {
    var m_mv = {};
    m_mv.Weight = Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit);
    m_mv.Volumn = 0;
    m_mv.BoxLength = 0;
    m_mv.BoxWidth = 0;
    m_mv.BoxHeight = 0;

    var m_maxcustomvalue = 0;
    var m_maxinnerweight = 0;
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        if (this.SkuProducts) {
            var m_itemweight = Number(this.BoxWeight);
            var m_itemcustomvalue = 0;
            $.each(this.SkuProducts, function () {
                m_itemweight += Number(this.Product.Weight) * Number(this.RelQty);
                m_itemcustomvalue += Number(this.Product.CustomValue) * Number(this.RelQty);
            });

            if (m_maxinnerweight == 0 || m_itemweight > m_maxinnerweight) {
                m_maxinnerweight = m_itemweight;
            }

            if (m_maxcustomvalue == 0 || m_itemcustomvalue > m_maxcustomvalue) {
                m_maxcustomvalue = m_itemcustomvalue;
            }

            var m_itemvolumn = Number(this.BoxLength) * Number(this.BoxWidth) * Number(this.BoxHeight);
            if (m_mv.Volumn == 0 || m_itemvolumn > m_mv.Volumn) {
                m_mv.Volumn = m_itemvolumn;
                m_mv.BoxLength = this.BoxLength;
                m_mv.BoxWidth = this.BoxWidth;
                m_mv.BoxHeight = this.BoxHeight;
            }
        }
    });

    m_mv.CustomValue = m_maxcustomvalue;
    m_mv.Weight = m_mv.Weight + m_maxinnerweight;

    return m_mv;
}
/* 设置商品包装 */
function openHandlerSSProdBox() {
    if (!pageVariable.handSSProdPackage) {
        pageVariable.handSSProdPackage = new uicontrol.dialog("handSSProdPackage", mlm.C1250, { width: 800 }, saveSSProdBox);
    }

    var m_key = $(this).attr("tag");
    var m_obj = null;
    if (m_key) {
        m_obj = pageVariable.innerProdList.getItem(m_key);
        $("#txtBoxWeight").val(Number(m_obj.BoxWeight).toFixed(3));
        $("#txtBoxLength").val(m_obj.BoxLength);
        $("#txtBoxWidth").val(m_obj.BoxWidth);
        $("#txtBoxHeight").val(m_obj.BoxHeight);
    }
    else {
        $("#txtBoxWeight").val("0.000");
        $("#txtBoxLength").val("10");
        $("#txtBoxWidth").val("10");
        $("#txtBoxHeight").val("10");
    }

    pageVariable.handSSProdPackage.innerprod = m_obj;
    pageVariable.handSSProdPackage.show();
}
/* 保存商品包装 */
function saveSSProdBox() {
    var m_obj = pageVariable.handSSProdPackage.innerprod;
    if (m_obj) {
        m_obj.BoxWeight = $("#txtBoxWeight").val();
        m_obj.BoxLength = $("#txtBoxLength").val();
        m_obj.BoxWidth = $("#txtBoxWidth").val();
        m_obj.BoxHeight = $("#txtBoxHeight").val();

        pageVariable.innerProdList.modifyData(m_obj.SS_InnerProd_Id, m_obj);
    }
    else {
        $.each(pageVariable.innerProdList.dataSource.items.arrValues, function () {
            this.BoxWeight = $("#txtBoxWeight").val();
            this.BoxLength = $("#txtBoxLength").val();
            this.BoxWidth = $("#txtBoxWidth").val();
            this.BoxHeight = $("#txtBoxHeight").val();

            pageVariable.innerProdList.modifyData(this.SS_InnerProd_Id, this);
        });
    }

    //刷新商品重量、成本和利润
    refreshCalculateInfo();

    pageVariable.handSSProdPackage.close();
}

/* 打开导入商品序号的窗体 */
function openImportProdSeqFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importData);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.type = "productseq";
    pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C0041);

    pageVariable.handlerImportFrm.show();
}
/* 打开导入商品的窗体 */
function openImportProductFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importData);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.type = "product";
    pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C0734);

    pageVariable.handlerImportFrm.show();
}
/* 导入配送价格 */
function importData() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    if (pageVariable.handlerImportFrm.type == "expservice") {
        var m_ss_product = new sm.ss_product();
        m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
        m_ss_product.importProductExpServices(pageVariable.importFile, function (retObj) {
            if (retObj.resultFile) {
                window.open(retObj.resultFile);
            }
            else {
                var m_dict = new datastruct.dictionary();
                $.each(retObj.returnTable, function () {
                    m_dict.setItem(this.GlobalArea_Id + "-" + this.ExpressService_Id, this);
                });


                $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
                    var m_item = m_dict.getItem(this.GlobalArea_Id + "-" + this.ExpressService_Id);
                    if (m_item) {
                        this.FstCharge = m_item.FstCharge;
                        this.IncreaseCharge = m_item.IncreaseCharge;
                        this.State = m_item.State;
                    }
                });

                loadExpServiceList();
            }

            pageVariable.isChangeSSProd = true;

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.type == "productseq") {
        var m_product = new pdm.product();
        m_product.importProductSeq(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }
            queryProduct(1, pageVariable.productList.pageNumber);
            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.type == "product") {
        var m_product = new pdm.product();
        m_product.importProducts(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }
            queryProduct(1, pageVariable.productList.pageNumber);
            pageVariable.handlerImportFrm.close();
        });
    }
}

/* 加载利润区域树 */
function loadAPExpAreaTree() {

    if (!pageVariable.apExpAreaTree || !pageVariable.apExpAreaTree.ss_product_id || pageVariable.apExpAreaTree.ss_product_id != pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) {

        var globalarea = new othm.globalarea();
        globalarea.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
        globalarea.queryGlobalAreaBySaleSite(function (source) {

            var m_expressservice = new sm.expressservice();
            m_expressservice.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
            m_expressservice.queryExpServiceCountByArea(function (retTable) {

                pageVariable.apExpAreaTree = new uicontrol.treeView($("#apExpAreaTree"), source, loadProdfit,
                                                        { sourceFormat: "table",
                                                            keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                            constructDisplayTxt: constructGAreaTxt, isCollapse: true
                                                        });
                pageVariable.apExpAreaTree.loadSource();
                pageVariable.apExpAreaTree.ss_product_id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;

                pageVariable.prodProfitList = new uicontrol.tableList("prodProfitList",
                                     { isPaging: true,
                                         autoSeq: true,
                                         keyColumn: "SS_ProdProfit_V_Id",
                                         height: 360,
                                         pageQueryHandler: queryProdfit,
                                         columns: [{ display: mlm.C1141, name: "GlobalAreaNames", width: 160, align: 'left', adjust: true, createCell: constructGlobalAreaCell },
                                                   { display: mlm.C0174, name: "SkuProps", width: 100, align: 'left', adjust: true, createCell: constructProfitSkuCell },
                                                   { display: mlm.C0436, name: "ExpressServiceName", width: 180, align: 'left', adjust: true, createCell: constructESName },
                                                   { display: mlm.C1102, name: "FstProdProfit", width: 80, align: 'right', adjust: true, createCell: constructProfitCell },
                                                   { display: mlm.C1103, name: "SecondProdProfit", width: 110, align: 'right', adjust: true, createCell: constructOtherProfitCell },
                                                   { display: mlm.C1104, name: "ThirdProdProfit", width: 110, align: 'right', adjust: true, createCell: constructOtherProfitCell}]
                                     });

                loadProdfit();
            });
        });
    }
    else {
        loadProdfit();
    }
}
/* 构建区域列 */
function constructGlobalAreaCell(key, cellvalue) {
    var m_len = cellvalue.getBytesCount();
    if (m_len > 30) {
        var m_str = cellvalue.substringByBytes(30) + "...";
        return "<span id='lbPfGA_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
    }
    else {
        return cellvalue;
    }
}
/* 构建利润Sku列 */
function constructProfitSkuCell(key, cellvalue) {
    var m_len = cellvalue.getBytesCount();
    if (m_len > 30) {
        var m_str = cellvalue.substringByBytes(30) + "...";
        return "<span id='lbPfSku_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
    }
    else {
        return cellvalue;
    }
}
/* 加载商品利润 */
function loadProdfit() {
    queryProdfit(1, pageVariable.prodProfitList.pageNumber);
}
/* 查询利润 */
function queryProdfit(pageNum, pageCount) {

    var m_globalarea_id = null;
    if (pageVariable.apExpAreaTree.selectedItem) {
        m_globalarea_id = pageVariable.apExpAreaTree.selectedItem.key;
    }

    var m_ss_product = new sm.ss_product();
    m_ss_product.Page = pageNum;
    m_ss_product.PageNum = pageCount;
    m_ss_product.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
    m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
    m_ss_product.GlobalArea_Id = m_globalarea_id;
    m_ss_product.queryProdProfit(function (retTable) {
        pageVariable.prodProfitList.bindDataSource(retTable);

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            var m_itemCtrl = $("#lbPfGA_" + this.SS_ProdProfit_V_Id + ", #lbPfSku_" + this.SS_ProdProfit_V_Id);
            m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
        });

        //隐藏进度
        pageframe.control.processCtrl.hideOperaProcess();
    });
}
/* 构建利润列 */
function constructProfitCell(key, cellvalue) {
    if (Number(cellvalue) == -20000) {
        return "<div style='padding: 0px; margin: 0px' class='lb-symbol'>" + mlm.C1008 + "</div>";
    }
    else {
        return commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue);
    }
}
/* 构建其他利润列 */
function constructOtherProfitCell(key, cellvalue) {
    if (Number(cellvalue) == -20000) {
        return "<div style='padding: 0px; margin: 0px' class='lb-symbol'>" + mlm.C1008 + "</div>";
    }
    else {
        if (Number(cellvalue) != 0) {

            var m_items = [];
            m_items.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue) + "</div>");

            if (Number(this.keyObj.FstProdProfit) > 0) {
                var m_rate = ((Number(cellvalue) - Number(this.keyObj.FstProdProfit)) / Number(this.keyObj.FstProdProfit) * 100).toFixed(2);
                m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1260 + ": " + m_rate + "%</div>");
            }

            return m_items.join("");
        }
        else {
            return commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue);
        }
    }
}

/* 预览商品描述 */
function previewProdDesc(htmlCtrl) {
    var m_openfrm = window.open("_proddesc.htm", '', 'height=600, width=1180, top=60, left=30, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');

    m_openfrm.document.write(htmlCtrl.val());
}

/* 导出商品序号 */
function exportProductSeq() {
    var m_product = new pdm.product();

    if (pageVariable.pdcTree.selectedItem) {
        if (pageVariable.pdcTree.selectedItem.children.length > 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1216);
            return;
        }

        m_product.PdcId = pageVariable.pdcTree.selectedItem.key;
    }
    else {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0189);
        return;
    }

    m_product.exportProductSeq(function (paramObj) {
        window.open(paramObj);
    });
}
/* 导出商品 */
function exportProduct() {
    var m_conditionObj = getQueryCondition();

    var m_product = new pdm.product();
    m_product.PdcIds = m_conditionObj.pdcIds;
    m_product.BrandId = m_conditionObj.brandId;
    m_product.Key = m_conditionObj.keyWord;
    m_product.SkuProdCode = m_conditionObj.skuProdCode;
    m_product.PropValueIds = m_conditionObj.propValueIds;
    m_product.State = m_conditionObj.prodState;

    m_product.exportProducts(function (paramObj) {
        window.open(paramObj);
    });
}

/* 查看销售统计 */
function viewSaleStatFrm(ss_product_id) {
    if (!pageVariable.viewSaleStatFrm) {
        pageVariable.viewSaleStatFrm = new uicontrol.dialog("viewSaleStatFrm", mlm.C1275, { width: 900, position: ["auto", 15] });

        pageVariable.viewSaleStatFrm.show();
        pageVariable.salestatList = new uicontrol.tableList("salestatList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 400,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: constructSkuProdPicCell },
                                                   { display: mlm.C0734, name: "ProdName", width: 300, align: 'left', adjust: true, createCell: constructStatSSProdNameCell },
                                                   { display: mlm.C0174, name: "SkuProps", width: 100, align: 'left', adjust: true, createCell: constructStarCell },
                                                   { display: mlm.C1090, name: "SkuProdCode", width: 100, align: 'left', adjust: true, createCell: constructStarCell },
                                                   { display: mlm.C1257, name: "CMonthSaleCount", width: 60, align: 'right', adjust: true, createCell: constructStarQtyCell },
                                                   { display: mlm.C1258, name: "AllSaleCount", width: 60, align: 'right', adjust: true, createCell: constructStarQtyCell}]
                                    });
    }
    else {

        pageVariable.viewSaleStatFrm.show();
    }

    var m_product = new sm.ss_product();
    m_product.SS_Product_Id = ss_product_id;
    m_product.querySSProdSaleStat(function (retTable) {
        pageVariable.salestatList.bindDataSource(retTable);
    });
}
/* 构建销售商品名称列 */
function constructStatSSProdNameCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_css = "";
    if (m_obj.State == "1" || m_obj.State == "3") {
        m_css = "style='color: #747474'";
    }
    if (m_obj.EnableFlag == "0") {
        m_css = "style='color: #DD0000'";
    }

    var m_items = [];
    m_items.push("<div style='padding: 0px'><a " + m_css + " onclick='viewSSProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a></div>");
    if (Number(m_obj.AvailableUnitCount) > 1) {
        m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.AvailableUnitCount + mlm.C1066 + "</div>");
    }

    return m_items.join("");
}
/* 查看销售统计 */
function viewProdSaleStatFrm(product_id) {
    if (!pageVariable.viewProdSaleStatFrm) {
        pageVariable.viewProdSaleStatFrm = new uicontrol.dialog("viewProdSaleStatFrm", mlm.C1275, { width: 900, position: ["auto", 15] });

        pageVariable.viewProdSaleStatFrm.show();
        pageVariable.prodsalestatList = new uicontrol.tableList("prodsalestatList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 400,
                                        keyColumn: "SkuProduct_Id",
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: constructSkuProdPicCell },
                                                   { display: mlm.C0734, name: "ProdName", width: 300, align: 'left', adjust: true, createCell: constructProdNameCell },
                                                   { display: mlm.C0174, name: "SkuProps", width: 100, align: 'left', adjust: true, createCell: constructStarCell },
                                                   { display: mlm.C1090, name: "SkuProdCode", width: 100, align: 'left', adjust: true, createCell: constructStarCell },
                                                   { display: mlm.C1257, name: "CMonthSaleCount", width: 60, align: 'right', adjust: true, createCell: constructStarQtyCell },
                                                   { display: mlm.C1258, name: "AllSaleCount", width: 60, align: 'right', adjust: true, createCell: constructStarQtyCell}]
                                    });
    }
    else {

        pageVariable.viewProdSaleStatFrm.show();
    }

    var m_product = new pdm.product();
    m_product.Product_Id = product_id;
    m_product.queryProdSaleStat(function (retTable) {
        pageVariable.prodsalestatList.bindDataSource(retTable);
    });
}
/*  */
function constructStarCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_css = "";
    if (m_obj.EnableFlag == "0") {
        m_css = "color: #DD0000"
    }

    return "<div style='padding: 0px; " + m_css + "'>" + cellValue + "</div>";
}
/*  */
function constructStarQtyCell(key, cellValue) {
    if (Number(cellValue) > 0) {
        var m_obj = this.keyObj;

        var m_css = "";
        if (m_obj.EnableFlag == "0") {
            m_css = "color: #DD0000"
        }

        return "<div style='padding: 0px; " + m_css + "'>" + commoncore.func.constructQtyCell(key, cellValue) + "</div>";
    }
}
/* 查看供应商 */
function openViewSuppFrm(key) {
    if (!pageVariable.openViewSuppFrmFrm) {
        pageVariable.openViewSuppFrmFrm = new bizcontrol.viewsupplier();
    }

    pageVariable.openViewSuppFrmFrm.show(key);
}
/* 导出商品图片 */
function exportProductPicture() {
    var m_product = new pdm.product();
    m_product.Product_Id = pageVariable.handlerProductFrm.product_id;

    m_product.exportProductPicture(function (paramObj) {
        window.open(paramObj);
    });
}
/*  */
function covertStandProdPics() {
    var m_product = new pdm.product();
    m_product.covertStandProdPics(function (paramObj) {
        pageframe.control.alertDialog.showAlertInfo(paramObj);
    });
}

/* 填充语言资源 */
function fillPageLanRes() {
    /* 商品列表 */
    $("#lbProductTag, #lbProductTitle").text(mlm.C0168);
    /* 商品基本信息 */
    $("#lbBasicProdInfo").text(mlm.C0169);
    /* 新增商品 */
    $("#btNewProd").val(mlm.C0170);
    /* 查询商品 */
    $("#btQueryProd").val(mlm.C0171);
    /* 详细参数 */
    $("#lbExpandProp").text(mlm.C0172);
    /* 商品详细介绍 */
    $("#lbProdDesc").text(mlm.C0173);
    /* 库存单元 */
    $("#lbSkuList").text(mlm.C0174);
    /* 商品名称 */
    $("#lbProdName, #lbSSProdNameSymbol").text(mlm.C0175 + ":");
    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_3, #lbSymbol_4, #lbSymbol_5, #lbSymbol_6, #lbSymbol_7, #lbSymbol_8").text(mlm.C0049);
    /* 商品分类 */
    $("#lbPdc, #lbPdc_q, #lbPdc_MP").text(mlm.C0090 + ":");
    /* 品牌 */
    $("#lbBrand, #lbBrandName_q, #lbSSBrandSymbol").text(mlm.C0112 + ":");
    /* 库存单位 */
    $("#lbUnit").text(mlm.C0176 + ":");
    /* 图片 */
    $("#lbProdPic").text(mlm.C0180 + ":");
    /* 关键字 */
    $("#lbKeyWord_q").text(mlm.C0184 + ":");
    /* 所有分类 */
    $("#lbPdcName_q").text(mlm.C0186);

    /* 图片列表 */
    $("#lbProdPics, #lbPicListSymbol").text(mlm.C0249);
    /* 商品净重 */
    $("#lbWeight").text(mlm.C1247 + ":");
    /* 快递重量 */
    $("#lbSSWeightSymbol").text(mlm.C0250 + ":");
    /* 清理所有图片 */
    $("#btClearPic, #btClearSSPic").val(mlm.C0251);
    /* 上传图片 */
    $("#btUploadPic, #btUploadSSPic").val(mlm.C0252);
    /* 商品详细介绍支持html代码，html代码请在专业网页编辑软件(例如：Dreamware)中进行编辑 */
    $("#lbProdDescAlert, #lbSSProdDescAlert").text(mlm.C0253);
    /* 界面预览 */
    $("#btViewRemarkPic, #btViewSS_RemarkPic").val(mlm.C0271);
    /* 支持单张图片或zip格式的图片压缩包 */
    $("#lbProdPicAlert").text(mlm.C0256);
    /* 序号 */
    $("#lbPicSeqSymbol").text(mlm.C0041);

    /* 批量删除商品 */
    $("#btBatchDelete").text(mlm.C0382);

    /* 待批量删除的商品数据有 */
    $("#lb1_BDSymbol").text(mlm.C0384);
    /* 待批量修改的商品数据有 */
    $("#lb1_MDSymbol").text(mlm.C0385);
    /* 条( */
    $("#lb2_BDSymbol, #lb2_MDSymbol").text(mlm.C0386);
    /* )，是否全部删除这些数据？ */
    $("#lb3_BDSymbol").text(mlm.C0387);
    /* 维护详细列表 */
    $("#lkViewListForBD, #lkViewList_MD").text(mlm.C0388);

    /* 商品状态 */
    $("#lbProdState_q").text(mlm.C0398 + ":");
    /* 商品图片 */
    $("#lbPicSymbol_q").text(mlm.C0402 + ":");

    /* 到 */
    $("#lbToSymbol").text(mlm.C0412);

    /* SKU属性及详细参数 */
    $("#lbPropsTitle").text(mlm.C0628);
    /* 添加属性 */
    $("#btAddProp").val(mlm.C0075);
    /* 属性 */
    $("#lbPropSymbol").text(mlm.C0631 + ":");
    /* 属性类型 */
    $("#lbPropTypeSymbol").text(mlm.C0070 + ":");
    /* 属性值列表 */
    $("#lbProdPValueSymbol").text(mlm.C0071);
    /* 添加属性值 */
    $("#btAddProdPValue").val(mlm.C0530 + mlm.C0608);
    /* 属性值 */
    $("#lbPValueSymbol").text(mlm.C0608 + ":");
    /* 属性值编码 */
    $("#lbPValueCodeSymbol").text(mlm.C0609 + ":");

    /* 配送服务 */
    $("#lbExpServiceSymbol, #lbExpNameSymbol_del").text(mlm.C0436 + ":");
    /* 查看详细信息 */
    $("#lkViewExpService").text(mlm.C0470);
    /* 是否免运费 */
    $("#lbFreeSymbol").text(mlm.C0472 + ":");
    /* 影响区域 */
    $("#lbOtherAreaSymbol, #lbOtherAreaSymbol_del").text(mlm.C0473 + ":");

    /* 导入文件 */
    $("#lbImportFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);

    /* 站内商品信息 */
    $("#lbSSProdSymbol").text(mlm.C1030);
    /* 站内商品列表 */
    $("#lbSSProdTitle").text(mlm.C1033 + mlm.C0463);
    /* 包裹体积 */
    $("#lbSS_VolumnSymbol").text(mlm.C1031 + "(cm³):");
    /* 查询条件 */
    $("#lkProdQueryCond").text(mlm.C1034);
    /* 高级查询 */
    $("#lkAdvaQueryCond").text(mlm.C1035 + mlm.C1034);
    /* 关键属性列表 */
    $("#lbQueryPropTitle").text(mlm.C1037 + mlm.C0463);
    /* 添加属性 */
    $("#btAddQueryProp, #btAddSSProp").val(mlm.C0530 + mlm.C0631);
    /* 属性 */
    $("#lbSelPropSymbol").text(mlm.C0631 + ":");
    /* 属性值列表 */
    $("#lbSelQueryPropTitle").text(mlm.C0071);
    /* 图片处理 */
    $("#lbPicHandlerSymbol").text(mlm.C1041 + ":");
    /* SKU相关属性值 */
    $("#lbRelPValueSymbol").text(mlm.C1042 + ":");
    /* 序号 */
    $("#lbPropSeqSymbol").text(mlm.C0041 + ":");
    /* 图片列表 */
    $("#lbSSProdPicSymbol, #lbSSPicTitle").text(mlm.C0180 + mlm.C0463);
    /* 商品详细介绍 */
    $("#lbSSProdDescSymbol").text(mlm.C0173);
    /* 内部映射关系 */
    $("#lbInnerProdSymbol").text(mlm.C1043);
    /* 商品配送服务 */
    $("#lbExpServiceTitleSymbol").text(mlm.C0431);
    /* 商品销售定价 */
    $("#lbSalePriceTitleSymbol").text(mlm.C1044);
    /* 商品利润分析 */
    $("#lbAnalyProfitSymbol").text(mlm.C1045);
    /* 商品导航 */
    $("#lbPdcNavSymbol").text(mlm.C1046 + ":");
    /* 商品编码 */
    $("#lbSSProdCode").text(mlm.C0194 + ":");
    /* 单位 */
    $("#lbSSUnitSymbol").text(mlm.C1048 + ":");
    /* 状态 */
    $("#lbSSStateSymbol").text(mlm.C0367 + ":");
    /* SKU属性及详细参数 */
    $("#lbSSPropsTitle").text(mlm.C0628);
    /* 内部映射关系列表 */
    $("#lbInnerProdTitle").text(mlm.C1043 + mlm.C0463);
    /* 销售定价列表 */
    $("#lbSalePriceTitle").text(mlm.C1049 + mlm.C0463);
    /* 统一设置 */
    $("#btBatchSetSalePrice").val(mlm.C1050);
    /* 配送服务列表 */
    $("#lbExpTitle").text(mlm.C0436 + mlm.C0463);
    /* 导入报价 */
    $("#btImportExpPrice").val(mlm.C0986 + mlm.C1051);
    /* 导出报价 */
    $("#btExportExpPrice").val(mlm.C0987 + mlm.C1051);
    /* 商品利润列表 */
    $("#lbProdProfitSymbol").text(mlm.C1052 + mlm.C0463);
    /* 站内销售商品 */
    $("#lbSSSkuProdSymbol").text(mlm.C1053 + ":");
    /* 内部关联商品列表 */
    $("#lbGbomTitle").text(mlm.C1054 + mlm.C0463);
    /* 添加内部商品 */
    $("#btAddGbom").val(mlm.C0530 + mlm.C1055);
    /* SKU单元 */
    $("#lbSKUSymbol").text(mlm.C0174 + ":");
    /* 交易成本 */
    $("#lbSSTransCostSymbol").text(mlm.C1056 + ":");
    /* 其他成本 */
    $("#lbSSOtherCostSymbol").text(mlm.C1057 + ":");
    /* 标准售价 */
    $("#lbListPriceSymbol").text(mlm.C0204 + ":");
    /* 折扣率 */
    $("#lbDiscountSymbol").text(mlm.C1058 + ":");
    /* 实际售价 */
    $("#lbSalePriceSymbol").text(mlm.C1059 + ":");
    /* 可选的赠品列表 */
    $("#lbGiftTitleSymbol").text(mlm.C1060);
    /* 添加赠品 */
    $("#btAddGift").val(mlm.C0530 + mlm.C1061);
    /* 赠品描述 */
    $("#lbGiftSymbol").text(mlm.C1062 + ":");
    /* 内部商品列表 */
    $("#lbGiftItemTitle").text(mlm.C1055 + mlm.C0463);
    /* 添加商品 */
    $("#btAddGiftItem").val(mlm.C0530 + mlm.C0734);

    /* 图片处理 */
    $("#lbPicFrom").text(mlm.C1137 + ":");
    /* 图片Url */
    $("#lbProdPicUrl").text(mlm.C0180 + "Url:");
    /* 略缩图Url */
    $("#lbBrowserPicUrl").text(mlm.C1138 + "Url:");
    /* 高清图Url */
    $("#lbSourcePicUrl").text(mlm.C1139 + "Url:");

    /* 商品SKU编码 */
    $("#lbSkuProdCode_q").text(mlm.C1205 + ":");
    /* 商品排序 */
    $("#btManageProdSeq").val(mlm.C1215);
    /* 导出序号 */
    $("#btExportProdSeq").text(mlm.C0987 + mlm.C0041);
    /* 导入序号 */
    $("#btImportProdSeq").text(mlm.C0986 + mlm.C0041);
    /* 配货&报关信息 */
    $("#lbCustomsInfo").text(mlm.C1242);
    /* 报关材质 */
    $("#lbCustomMaterialSymbol").text(mlm.C1245 + ":");
    /* 报关名称 */
    $("#lbCustomProdNameSymbol").text(mlm.C1238 + ":");
    /* 报关名称 */
    $("#lbCustomProdName_CNSymbol").text(mlm.C1621 + ":");
    /* 报关价值 */
    $("#lbCustomValueSymbol, #lbExpCustomValueSymbol").text(mlm.C1239 + ":");
    /* 海关编码 */
    $("#lbCustomCodeSymbol").text(mlm.C1240 + ":");
    /* 原厂地 */
    $("#lbFactoryCountrySymbol").text(mlm.C1241 + ":");
    /* 包装重量 */
    $("#lbBoxWeightSymbol").text(mlm.C1252 + ":");
    /* （包装盒的净重，不包含商品重量） */
    $("#lbBoxWeightAlert").val(mlm.C1253);
    /* 包裹体积 */
    $("#lbBoxVolumnSymbol").text(mlm.C1031 + "(cm³):");
    /* 设置商品包装 */
    $("#btSetSSProdBox").val(mlm.C1250);
    /* 测算重量 */
    $("#lbExpWeightSymbol").text(mlm.C0806 + ":");
    /* 测算体积 */
    $("#lbExpVolumeSymbol").text(mlm.C1261 + "(cm³)" + ":");
    /* 赠品 */
    $("#liGiftTitleSymbol").text(mlm.C1061);
    /* 重量限制 */
    $("#lbGiftWeightSymbol").text(mlm.C0798 + ":");
    /* 成本限制 */
    $("#lbGiftCostSymbol").text(mlm.C1254 + ":");

    /* 图片处理 */
    $("#lbPicFrom").text(mlm.C1137 + ":");
    /* 销售统计列表 */
    $("#lbSaleStatTitle, #lbProdSaleStatTitle").text(mlm.C1276 + mlm.C0463 + ":");
    
    /* 批量处理 */
    $("#btBatchModifyProd").val(mlm.C1620);
    /* 导出商品 */
    $("#btExportProduct").text(mlm.C0987 + mlm.C0734);
    /* 导入商品 */
    $("#btImportProduct").text(mlm.C0986 + mlm.C0734);
    
    /* 网站搜索关键字(Tags) */
    $("#lbSSProdTag").text(mlm.C1640);
    /* 导出图片 */
    $("#btExportPic").val(mlm.C0987 + mlm.C0180);

    /* ECMS-商品基本信息 */
    document.title = mlm.C0198;
}