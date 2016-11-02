/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadPurchasePrice);

/* 页面变量 */
window.pageVariable = { };

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    pageVariable.viewSupplierFrm = new bizcontrol.viewsupplier();

    $("#supplierTag").click(loadSupplier);
    $("#btNewSupplier").click(openNewSupplierFrm);
    $("#btAddLinker").click(openNewLinkerFrm); 
    $("#btQuerySupplier").click(openQuerySuppFrm);
    $("#btExportSupplier").click(exportSuppliers);
    $("#btImportPrice, #btImportSkuQuoPrice").click(function () { openImportFrm.call(this); });
    $("#btImportSupplier").click(function () { openImportFrm.call(this); });
    $("#btQueryPrice").click(openQueryPriceFrm);
    $("#btExportPrice").click(exportQuotedPrice);
    $("#btAskPrice").click(function () {
        pageVariable.pirceTable.bindDataSource(null);
        queryUnQuotedProduct(1, pageVariable.pirceTable.pageNumber);
    });
    $("#btNewSupplier, #btAddLinker, #btQuerySupplier, #btExportSupplier, #btImportSupplier, #btAskPrice, #btQueryPrice, #btExportPrice, #btImportPrice, #btNewQuoPrice, #btImportSkuQuoPrice, #btExportSkuQuoPrice, #btRefresh").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

    pageVariable.UnQuoted = 0;
    pageVariable.selectProdCtrl = new bizcontrol.selectproduct();
}

/* 设置页面布局 */
function setLayout() {
    var m_height = pageframe.layout.getTableHeightInForm() - 2;

    if (pageVariable.supplierList) {
        pageVariable.supplierList.resize(m_height);
    }
}

/* 打开查询报价的窗体 */
function openQueryPriceFrm() {
    if (!pageVariable.queryProdFrm) {
        pageVariable.queryProdFrm = new uicontrol.dialog("queryProdFrm", mlm.C0171, { width: 825, position: ["auto", 15] },
                                        function () {
                                            pageVariable.pirceTable.bindDataSource(null);
                                            queryQuotedProduct(1, pageVariable.pirceTable.pageNumber);
                                        });

        pageVariable.selSupplier_q = new bizcontrol.selectsupplier($("#selSupplier_q"), { TxtClass: "text-input" });

        pageVariable.selQueryPdc = new bizcontrol.selectpdc($("#selQueryPdc"));
        pageVariable.selBrand_q = new bizcontrol.selectbrand($("#selBrand_q"));
    }

    pageVariable.queryProdFrm.show();
}
/* 加载采购价格 */
function loadPurchasePrice() {
    if (!pageVariable.pirceTable) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
        pageVariable.pirceTable = new uicontrol.tableList("pirceTable",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "Product_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryQuotedProduct,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C0734, name: "ProdName", width: 270, align: 'left', adjust: true, createCell: constructProdNameCell },
                                                   { display: mlm.C1064, name: "", width: 90, align: 'right', adjust: true, createCell: constructProdCostCell },
                                                   { display: mlm.M0054, name: "", width: 570, align: 'left', adjust: true, createCell: constructQuoteInfoCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructPurOperaCell}]
                                     });

        pageVariable.queryPriceParam = {};
    }
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

    var m_css = "";
    if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
        m_css = "color: #840000"
    }

    var m_html_items = [];

    m_html_items.push("<div style='padding: 0px'><a style='" + m_css + "' onclick='viewProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a></div>");
    if (Number(m_obj.SkuProdCount) > 1) {
        m_html_items.push("<div style='margin: 2px 0px 0px 0px; padding: 0px; " + m_css + "' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.SkuProdCount + mlm.C1066 + "</div>");
    }

    return m_html_items.join("");
}
/* 构建采购成本列 */
function constructProdCostCell(key, cellValue) {
    var m_arr = [];

    var m_css = "";
    if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
        m_css = "color: #840000"
    }

    if (this.keyObj.MaxCost && Number(this.keyObj.MaxCost) > 0) {
        if (Number(this.keyObj.MinCost) == Number(this.keyObj.MaxCost)) {
            m_arr.push("<div style='padding: 0px; " + m_css + "'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinCost) + "</div>");
        }
        else {
            m_arr.push("<div style='padding: 0px; " + m_css + "'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinCost) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MaxCost) + "</div>");
        }
    }
    return m_arr.join("");
}
/* 构建询价信息列 */
function constructQuoteInfoCell(key, cellValue) {

    var m_css = "";
    if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
        m_css = "color: #840000"
    }

    var m_arr = [];
    if (this.keyObj.SuppQuoteds) {
        var m_rows = datastruct.convertion.strToObject(this.keyObj.SuppQuoteds);
        var i = 0;
        $.each(m_rows, function () {

            var m_pricestr = "";
            var m_minprice = this[3];
            var m_maxprice = this[4];
            var m_puraddress = this[5];
            if (m_maxprice && Number(m_maxprice) > 0) {
                if (Number(m_minprice) == Number(m_maxprice)) {
                    m_pricestr = "<span>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_minprice) + "</span>";
                }
                else {
                    m_pricestr = "<span>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_minprice) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_maxprice) + "</span>";
                }
            }

            var m_suppname = this[2];
            if (!m_suppname) {
                m_suppname = mlm.C1174;
            }
            else {
                m_suppname = "<a style='" + m_css + "' onclick='openViewSuppFrm.call(this, \"" + this[0] + "\")' href='javascript:void(\"0\");'>" + m_suppname + "</a>";
                if (m_puraddress) {
                    if (m_puraddress.toLowerCase().indexOf("http") > -1) {

                        var m_address = m_puraddress;
                        var m_len = m_address.getBytesCount();
                        if (m_len > 36) {
                            m_address = m_address.substringByBytes(36) + "...";
                        }

                        m_suppname += " (<a href='" + m_puraddress + "' target='_blank'>" + m_address + "</a>";
                    }
                    else {
                        m_suppname += " (<span>" + m_puraddress + "</span>";
                    }
                }

                if (m_puraddress) {
                    m_suppname += ")";
                }
            }

            i++;
            if (i == m_rows.length) {
                m_arr.push("<div style='" + m_css + "'><div style='width: 400px; float: left; padding: 0px'>" + m_suppname + "</div><div style='padding: 0px;'>" + m_pricestr + "</div></div>");

            }
            else {
                m_arr.push("<div style='border-bottom-color: #ddd; border-bottom-width: 1px; border-bottom-style: solid;" + m_css + "'><div style='width: 400px; float: left; padding: 0px'>" + m_suppname + "</div><div style='padding: 0px;'>" + m_pricestr + "</div></div>");
            }
        });
    }
    
    return m_arr.join("");
}
/* 构建操作列 */
function constructPurOperaCell(key, cellValue) {
    var m_css = "";
    if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
        m_css = "color: #840000"
    }

    var m_obj = this.keyObj;
    return "<a onclick='openSetQuotedPriceFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a' style='" + m_css + "'>" + "更新报价" + "</a>";
}
/* 获取价格查询条件 */
function getQueryCondition() {

    var m_conditionObj = {};

    m_conditionObj.keyWord = $("#txtKeyWord_q").val();

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

    m_conditionObj.brandId = 0;
    if (pageVariable.selBrand_q) {
        m_conditionObj.brandId = pageVariable.selBrand_q.brandId;
    }

    if (pageVariable.selSupplier_q) {
        m_conditionObj.Supplier_Id = pageVariable.selSupplier_q.Supplier_Id;
    }

    return m_conditionObj;
}
/* 查询未报价商品 */
function queryUnQuotedProduct(pageNum, pageCount) {

    var m_purchaseprice = new pom.purchaseprice();
    m_purchaseprice.Page = pageNum;
    m_purchaseprice.PageNum = pageCount;

    m_purchaseprice.queryUnQuotedProduct(function (source) {
        pageVariable.pirceTable.pageQueryHandler = queryUnQuotedProduct;
        pageVariable.pirceTable.bindDataSource(source);
    });
}
/* 查询报价商品 */
function queryQuotedProduct(pageNum, pageCount) {
    var m_conditionObj = getQueryCondition();

    var m_purchaseprice = new pom.purchaseprice();
    m_purchaseprice.PdcIds = m_conditionObj.pdcIds;
    m_purchaseprice.BrandId = m_conditionObj.brandId;
    m_purchaseprice.Key = m_conditionObj.keyWord;
    m_purchaseprice.Supplier_Id = m_conditionObj.Supplier_Id;
    m_purchaseprice.Page = pageNum;
    m_purchaseprice.PageNum = pageCount;

    m_purchaseprice.queryQuotedProduct(function (source) {
        pageVariable.pirceTable.bindDataSource(source);

        if (pageVariable.queryProdFrm) {
            pageVariable.queryProdFrm.close();
        }
    });
}

/* 打开更新报价的窗体 */
function openSetQuotedPriceFrm(key) {
    if (!pageVariable.handlerQuotedPriceFrm) {
        pageVariable.handlerQuotedPriceFrm = new uicontrol.dialog("handlerQuotedPriceFrm", "", { width: 1125, position: ["auto", 15] }, null);

        $("#btNewQuoPrice").click(openNewSkuQuoPriceFrm);
        $("#btRefresh").click(function () { querySkuQuotedPrice(1, pageVariable.skupriceTable.pageNumber); });
        $("#ddlSupp_Quoted").change(function () { querySkuQuotedPrice(1, pageVariable.skupriceTable.pageNumber); });
        $("#btExportSkuQuoPrice").click(exportProdQuotedPrice);

        pageVariable.handlerQuotedPriceFrm.show();
        pageVariable.skupriceTable = new uicontrol.tableList("skupriceTable",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "PurchasePrice_Id",
                                         height: 400,
                                         pageQueryHandler: querySkuQuotedPrice,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'left', adjust: true, createCell: constructSkuProdPicCell },
                                                   { display: mlm.C1162, name: "", width: 200, align: 'left', adjust: true, createCell: constructSkuProdCell },
                                                   { display: mlm.C1069, name: "", width: 360, align: 'left', adjust: true, createCell: constructSkuPurSourceCell },
                                                   { display: mlm.C1064, name: "Cost", width: 80, align: 'right', adjust: true, createCell: constructSysPriceCell },
                                                   { display: mlm.C1153, name: "QuotedPrice", width: 80, align: 'right', adjust: true, createCell: constructMQuotedPriceCell },
                                                   { display: mlm.C1163, name: "Period", width: 60, align: 'right', adjust: true, createCell: constructPeriodCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructSkuPurOperaCell}]
                                     });
    }
    else {
        pageVariable.handlerQuotedPriceFrm.show();
    }

    pageVariable.handlerQuotedPriceFrm.skuproducts = null;
    var m_prodprice = pageVariable.pirceTable.getItem(key);
    pageVariable.handlerQuotedPriceFrm.quotedproduct = m_prodprice;

    querySkuQuotedPrice(1, pageVariable.skupriceTable.pageNumber);
    loadQuotedSupplier();

    pageVariable.handlerQuotedPriceFrm.setTitle(mlm.C1172 + " - " + m_prodprice.ProdName);
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

    return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 70);' onerror='commoncore.func.failLoadImg.call(this, 70);' onclick='viewProduct.call(this, \"" + m_obj.Product_Id + "\", \"" + m_obj.SkuProduct_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
}
/* 构建Sku商品列 */
function constructSkuProdCell(key, cellValue) {
    var m_str = this.keyObj.ProdCode;
    if (this.keyObj.SkuProps) {
        m_str += " - [" + this.keyObj.SkuProps + "]";
    }
    return "<div style='padding: 0px'><a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + m_str + "</a></div>";
}
/* 构建价格列 */
function constructSysPriceCell(key, cellValue) {
    return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue);
}
/* 构建价格列 */
function constructMQuotedPriceCell(key, cellValue) {
    var m_remarkhtml = "";
    if (this.keyObj.Remark) {
        m_remarkhtml = " style='color: #840000'; tag='" + this.keyObj.Remark + "'";
    }

    return "<span id='lbQuotedRemark_" + key + "' " + m_remarkhtml + ">" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue) + "</span>";
}
/* 构建Sku采购来源列 */
function constructSkuPurSourceCell(key, cellValue) {

    var m_arr = [];

    var m_strlen = 43;
    if (this.keyObj.SuppName) {
        m_arr.push("<a onclick='openViewSuppFrm.call(this, \"" + this.keyObj.Supplier_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SuppName + "</a>");
        m_strlen = 41;
    }

    if (this.keyObj.PurAddress) {
        if (this.keyObj.PurAddress.toLowerCase().indexOf("http") > -1) {

            var m_address = this.keyObj.PurAddress;
            var m_len = m_address.getBytesCount();
            if (m_len > m_strlen) {
                m_address = m_address.substringByBytes(m_strlen) + "...";
            }

            if (this.keyObj.GlobalAreaName) {
                m_address += "-" + this.keyObj.GlobalAreaName;
            }

            if (this.keyObj.SuppName) {
                m_arr.push(" <div style='padding: 0px'>(<a href='" + this.keyObj.PurAddress + "' target='_blank'>" + m_address + "</a>)<div>");
            }
            else {
                m_arr.push("<a href='" + this.keyObj.PurAddress + "' target='_blank'>" + m_address + "</a>");
            }
        }
        else {

            if (this.keyObj.SuppName) {
                if (this.keyObj.GlobalAreaName && this.keyObj.PurAddress.indexOf(this.keyObj.GlobalAreaName) == -1) {
                    m_arr.push(" (<span>" + this.keyObj.PurAddress + "-" + this.keyObj.GlobalAreaName + "</span>)");
                }
                else {
                    m_arr.push(" (<span>" + this.keyObj.PurAddress + "</span>)");
                }
            }
            else {
                if (this.keyObj.GlobalAreaName && this.keyObj.PurAddress.indexOf(this.keyObj.GlobalAreaName) == -1) {
                    m_arr.push("<span>" + this.keyObj.PurAddress + "-" + this.keyObj.GlobalAreaName + "</span>");
                }
                else {
                    m_arr.push("<span>" + this.keyObj.PurAddress + "</span>");
                }
            }
        }
    }

    return m_arr.join("");
}
/* 构建操作列 */
function constructSkuPurOperaCell(key, cellValue) {
    var m_obj = this.keyObj;
    return "<a onclick='openModifySkuQuoPriceFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + mlm.C1173 + "</a><a style='margin: 0px 0px 0px 3px' onclick='openDeleteSkuQuoPriceFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + "删除" + "</a>";
}
/* 采购周期 */
function constructPeriodCell(key, cellValue) {
    return cellValue + " " + mlm.C0800;
}
/* 查询Sku报价 */
function querySkuQuotedPrice(pageNum, pageCount) {
    var m_purchaseprice = new pom.purchaseprice();
    m_purchaseprice.Product_Id = pageVariable.handlerQuotedPriceFrm.quotedproduct.Product_Id;
    m_purchaseprice.Supplier_Id = $("#ddlSupp_Quoted").val();
    m_purchaseprice.Page = pageNum;
    m_purchaseprice.PageNum = pageCount;
    m_purchaseprice.querySkuQuotedPrices(function (retTable) {

        pageVariable.skupriceTable.bindDataSource(retTable);

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            if (this.Remark) {
                var m_itemCtrl = $("#lbQuotedRemark_" + this.PurchasePrice_Id);
                m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            }
        });
    });
}
/* 加载报价供应商 */
function loadQuotedSupplier() {
    if (pageVariable.handlerQuotedPriceFrm) {
        var m_supplier = new pom.supplier();
        m_supplier.Product_Id = pageVariable.handlerQuotedPriceFrm.quotedproduct.Product_Id;
        m_supplier.queryQuotedSupplier(function (retTable) {
            var m_suppCtrl = $("#ddlSupp_Quoted");

            var m_supplier_id = m_suppCtrl.val();
            m_suppCtrl.empty();

            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            if (m_jsonobjs.length > 0) {
                m_suppCtrl.append("<option value='0'>" + mlm.C0403 + "</opion>");
                $.each(m_jsonobjs, function () {
                    m_suppCtrl.append("<option value='" + this.Supplier_Id + "'>" + this.SuppName + "</opion>");
                });
                m_suppCtrl.append("<option value='-1'>" + mlm.C1174 + "</opion>");

                m_suppCtrl.val(m_supplier_id);
            }
        });
    }
}

/* 初始化报价窗体 */
function initSkuQuoPriceFrm() {
    if (!pageVariable.handlerSkuQuoPriceFrm) {
        pageVariable.handlerSkuQuoPriceFrm = new uicontrol.dialog("handlerSkuQuoPriceFrm", "", { width: 800, position: ["auto", 10] }, saveSkuQuotedPrice);

        $("#lbHP_CurrCode").text(keycontext.keyparam.syscurrcode);
        pageVariable.selSupplier = new bizcontrol.selectsupplier($("#selSupplier"), { TxtClass: "text-input" });
        pageVariable.chkHP_Area = new bizcontrol.selectglobalarea("chkHP_Area", true);
    }
}
/* 打开发布价格的窗体 */
function openNewSkuQuoPriceFrm() {
    initSkuQuoPriceFrm();

    var m_quotedprod = pageVariable.handlerQuotedPriceFrm.quotedproduct;

    if (!pageVariable.handlerQuotedPriceFrm.skuproducts) {
        var m_product = new pdm.product();
        m_product.Product_Id = m_quotedprod.Product_Id;
        m_product.getSkuProducts(function (retobjs) {

            pageVariable.handlerQuotedPriceFrm.skuproducts = retobjs;
            var m_quotedprodCtrl = $("#ddlQuotedProd");
            m_quotedprodCtrl.empty();
            $.each(retobjs, function () {
                var m_str = "";
                if (this.OtherProps.SkuProps) {
                    m_str = this.ProdCode + " - " + m_quotedprod.ProdName + " - " + this.OtherProps.SkuProps;
                }
                else {
                    m_str = this.ProdCode + " - " + m_quotedprod.ProdName;
                }
                m_quotedprodCtrl.append("<option value='" + this.SkuProduct_Id + "'>" + m_str + "</option>");
            });
        });
    }

    $("#txtHP_Price").val("0.00");

    $("#ddlQuotedProd").show();
    $("#lbQuotedProd").hide();
    $("#selSupplier").show();
    $("#lbQuotedSupp").hide();

    pageVariable.handlerSkuQuoPriceFrm.action = "New";
    pageVariable.handlerSkuQuoPriceFrm.setTitle(mlm.C0530 + mlm.C1051);
    pageVariable.handlerSkuQuoPriceFrm.show();
}
/* 打开修改价格的窗体 */
function openModifySkuQuoPriceFrm(key) {

    initSkuQuoPriceFrm();

    var m_quotedprod = pageVariable.handlerQuotedPriceFrm.quotedproduct;

    var m_obj = pageVariable.skupriceTable.getItem(key);

    $("#ddlQuotedProd").hide();
    $("#lbQuotedProd").show();

    $("#lbQuotedProd").text(m_obj.ProdCode + " - " + pageVariable.handlerQuotedPriceFrm.quotedproduct.ProdName + " [" + m_obj.SkuProps + "]");

    $("#selSupplier").hide();
    $("#lbQuotedSupp").show();
    $("#lbQuotedSupp").text(m_obj.SuppName);
    $("#txtHP_PurAddress").val(m_obj.PurAddress);
    $("#txtHP_Price").val(m_obj.QuotedPrice);
    $("#txtHP_Period").val(m_obj.Period);
    $("#txtQuotedRemark").val(m_obj.Remark);
    pageVariable.chkHP_Area.setObj({ globalArea_Ids: m_obj.GlobalArea_Id, globalAreaNames: m_obj.GlobalAreaName });

    pageVariable.handlerSkuQuoPriceFrm.purchaseprice = m_obj;
    pageVariable.handlerSkuQuoPriceFrm.action = "Modify";
    pageVariable.handlerSkuQuoPriceFrm.setTitle(mlm.C1172);
    pageVariable.handlerSkuQuoPriceFrm.show();
}
/* 打开删除价格的窗体 */
function openDeleteSkuQuoPriceFrm(key) {
    if (!pageVariable.delQuotedPriceFrm) {
        pageVariable.delQuotedPriceFrm = new uicontrol.confirmDelete(deleteSkuQuotedPrice);
    }

    pageVariable.delQuotedPriceFrm.purchaseprice_id = key;
    pageVariable.delQuotedPriceFrm.showConfirm(mlm.C0464 + mlm.C1176 + "?");
}
/* 保存报价 */
function saveSkuQuotedPrice() {

    var m_supplier_id = 0;
    var m_quotedtype = "";
    var m_skuproduct_id = 0;
    if (pageVariable.handlerSkuQuoPriceFrm.action == "New") {
        m_supplier_id = pageVariable.selSupplier.Supplier_Id;
        m_skuproduct_id = $("#ddlQuotedProd").val();
    }
    else {
        m_supplier_id = pageVariable.handlerSkuQuoPriceFrm.purchaseprice.Supplier_Id;
        m_skuproduct_id = pageVariable.handlerSkuQuoPriceFrm.purchaseprice.SkuProduct_Id;
    }

    var m_puraddress = $.trim($("#txtHP_PurAddress").val());

    var m_purchaseprice = new pom.purchaseprice();
    m_purchaseprice.Product_Id = pageVariable.handlerQuotedPriceFrm.quotedproduct.Product_Id;
    m_purchaseprice.SkuProduct_Id = m_skuproduct_id;
    m_purchaseprice.Supplier_Id = m_supplier_id;
    m_purchaseprice.PurAddress = m_puraddress;
    m_purchaseprice.GlobalArea_Id = pageVariable.chkHP_Area.getObj().globalArea_Ids;
    m_purchaseprice.QuotedPrice = $("#txtHP_Price").val();
    m_purchaseprice.Period = $("#txtHP_Period").val();
    m_purchaseprice.Remark = $.trim($("#txtQuotedRemark").val());

    var m_key = "";
    if (m_purchaseprice.Supplier_Id != "0") {
        m_key = m_purchaseprice.Supplier_Id + "-" + m_purchaseprice.SkuProduct_Id;
    }
    else {
        m_key = m_purchaseprice.PurAddress + "-" + m_purchaseprice.SkuProduct_Id;
    }

    if (pageVariable.handlerSkuQuoPriceFrm.action == "New") {
        m_purchaseprice.PurchasePrice_Id = 0;

        m_purchaseprice.newPurchasePrice(function (retObj) {

            retObj = $.extend(retObj, retObj.OtherProps);

            pageVariable.skupriceTable.addData(retObj.PurchasePrice_Id, retObj);

            if (m_purchaseprice.Remark) {
                var m_itemCtrl = $("#lbQuotedRemark_" + retObj.PurchasePrice_Id);
                m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            }

            loadQuotedSupplier();

            pageVariable.handlerSkuQuoPriceFrm.close();
        });
    }
    else {
        m_purchaseprice.PurchasePrice_Id = pageVariable.handlerSkuQuoPriceFrm.purchaseprice.PurchasePrice_Id;

        m_purchaseprice.modifyPurchasePrice(function (retObj) {

            retObj = $.extend(retObj, retObj.OtherProps);

            pageVariable.skupriceTable.modifyData(retObj.PurchasePrice_Id, retObj);
            
            if (m_purchaseprice.Remark) {
                var m_itemCtrl = $("#lbQuotedRemark_" + retObj.PurchasePrice_Id);
                m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            }

            loadQuotedSupplier();

            pageVariable.handlerSkuQuoPriceFrm.close();
        });
    }
}
/* 删除报价 */
function deleteSkuQuotedPrice() {
    var m_purchaseprice = new pom.purchaseprice();
    m_purchaseprice.PurchasePrice_Id = pageVariable.delQuotedPriceFrm.purchaseprice_id;
    m_purchaseprice.deletePurchasePrice(function () {

        pageVariable.skupriceTable.deleteData(m_purchaseprice.PurchasePrice_Id);

        loadQuotedSupplier();

        pageVariable.delQuotedPriceFrm.close();
    });
}

/* 导出采购报价 */
function exportQuotedPrice() {
    var m_conditionObj = getQueryCondition();

    var m_purchaseprice = new pom.purchaseprice();
    m_purchaseprice.UnQuoted = pageVariable.UnQuoted;

    if (pageVariable.UnQuoted == 0) {
        m_purchaseprice.PdcIds = m_conditionObj.pdcIds;
        m_purchaseprice.BrandId = m_conditionObj.brandId;
        m_purchaseprice.Key = m_conditionObj.keyWord;
        m_purchaseprice.PropValueIds = m_conditionObj.propValueIds;
        m_purchaseprice.ProdState = m_conditionObj.prodState;
        m_purchaseprice.SortFields = m_conditionObj.sortfields;
        if (pageVariable.selSupplier) {
            m_purchaseprice.Supplier_Id = pageVariable.selSupplier_q.Supplier_Id;
        }
    }
    m_purchaseprice.exportPurchasePrices(function (paramObj) {
        window.open(paramObj);
    });
}
/* 导出商品采购报价 */
function exportProdQuotedPrice() {
    var m_purchaseprice = new pom.purchaseprice();
    m_purchaseprice.Supplier_Id = $("#ddlSupp_Quoted").val();
    m_purchaseprice.Product_Id = pageVariable.handlerQuotedPriceFrm.quotedproduct.Product_Id;
    m_purchaseprice.exportPurchasePrices(function (paramObj) {
        window.open(paramObj);
    });
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

/* 加载供应商 */
function loadSupplier() {
    if (!pageVariable.supplierList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
        pageVariable.supplierList = new uicontrol.tableList("supplierList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "Supplier_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: querySuppliers,
                                         columns: [{ display: mlm.C1069, name: "SuppName", width: 160, align: 'left', adjust: true, createCell: constructSuppName },
                                                   { display: mlm.C1264 + mlm.C0073, name: "S_ProdRemark", width: 200, align: 'left', adjust: true, createCell: commoncore.func.constructRemarkCell },
                                                   { display: mlm.C1166, name: "S_WebSite", width: 200, align: 'left' },
                                                   { display: mlm.C0311, name: "S_Tel", width: 140, align: 'left' },
                                                   { display: mlm.C1168, name: "S_Address", width: 250, align: 'left', adjust: true, createCell: constructAddressCell },
                                                   { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, modifiedFunc: "openModifySupplierFrm", deletedFunc: "openDeleteSupplierFrm"}]
                                     });

        pageVariable.querySuppParam = {};
        pageVariable.querySuppParam.keyword = null;
        pageVariable.querySuppParam.globalarea_id = null;
    }

    if (!pageVariable.supplierSource) {
        querySuppliers(1, pageVariable.supplierList.pageNumber);
    }
}
/* 构造供应商名称列 */
function constructSuppName(key, cellValue) {
    return "<a onclick='openViewSuppFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
}
/* 查看供应商 */
function openViewSuppFrm(key) {
    pageVariable.viewSupplierFrm.show(key);
}
/* 构建地址列 */
function constructAddressCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (cellvalue) {
        return m_obj.GlobalAreaName + "," + cellvalue;
    }
    else {
        return m_obj.GlobalAreaName;
    }
}
/* 查询供应商 */
function querySuppliers(page, pagenum) {
    
    var m_supplier = new pom.supplier();
    m_supplier.KeyWord = pageVariable.querySuppParam.keyword;
    m_supplier.GlobalArea_Id = pageVariable.querySuppParam.globalarea_id;
    m_supplier.Page = page;
    m_supplier.PageNum = pagenum;

    m_supplier.querySuppliers(function (retTable) {
        pageVariable.supplierSource = retTable;
        pageVariable.supplierList.bindDataSource(pageVariable.supplierSource);
    });
}
/* 打开查询供应商的窗体 */
function openQuerySuppFrm() {
    if (!pageVariable.querySuppFrm) {
        pageVariable.querySuppFrm = new uicontrol.dialog("querySuppFrm", mlm.C0562 + mlm.C1069, { width: 800, position: ["auto", 15] }, function () {
            pageVariable.querySuppParam.keyword = $.trim($("#txtKeyword").val());

            var m_areaObj = pageVariable.ddlCountry_q.getObj();
            if (m_areaObj && m_areaObj.globalArea_Ids) {
                pageVariable.querySuppParam.globalarea_id = m_areaObj.globalArea_Ids;
            }
            else {
                pageVariable.querySuppParam.globalarea_id = null;
            }

            querySuppliers(1, pageVariable.supplierList.pageNumber);

            pageVariable.querySuppFrm.close();
        });

        pageVariable.ddlCountry_q = new bizcontrol.selectglobalarea("ddlCountry_q", true, "country", commoncore.func.constructGAreaTxt);
    }

    pageVariable.querySuppFrm.show();
}

/* 初始化供应商窗体 */
function initHandlerSuppFrm() {
    if (!pageVariable.handlerSupplierFrm) {
        pageVariable.handlerSupplierFrm = new uicontrol.dialog("handlerSupplierFrm", "", { width: 925, position: ["auto", 15] }, saveSupplier);
        pageVariable.supplierTabs = $("#supplierTabs").tabs({ show: showSuppTab });

        pageVariable.ddlCountry = new bizcontrol.selectglobalarea("ddlCountry", true, "country", commoncore.func.constructGAreaTxt);
    }
}
/* 打开新增供应商的窗体 */
function openNewSupplierFrm() {
    initHandlerSuppFrm();

    $("#txtSupplier, #txtEmail, #txtWebsite, #txtPhone, #txtFax, #txtRemark, #txtAddress").val("");
    if (pageVariable.linkerList) {
        pageVariable.linkerList.bindDataSource(null);
    }

    pageVariable.handlerSupplierFrm.maxlinkerkey = 10000;
    pageVariable.handlerSupplierFrm.supplier = null;
    pageVariable.handlerSupplierFrm.supplier_id = 0;
    pageVariable.handlerSupplierFrm.action = "New";
    pageVariable.handlerSupplierFrm.setTitle(mlm.C0461 + mlm.C1069);
    pageVariable.handlerSupplierFrm.show();
}
/* 打开修改供应商的窗体 */
function openModifySupplierFrm() {
    initHandlerSuppFrm();

    var m_key = $(this).attr("tag");
    var m_supplier = new pom.supplier();
    m_supplier.Supplier_Id = m_key;
    m_supplier.readSupplier(function (retObj) {
        $("#txtSupplier").val(retObj.SuppName);
        $("#txtEmail").val(retObj.S_Email);
        $("#txtWebsite").val(retObj.S_WebSite);
        $("#txtPhone").val(retObj.S_Tel);
        $("#txtFax").val(retObj.S_Fax);
        $("#txtAddress").val(retObj.S_Address);
        $("#txtRemark").val(retObj.S_Remark);
        $("#txtProdRemark").val(retObj.S_ProdRemark);
        pageVariable.ddlCountry.setObj({ globalAreaNames: retObj.OtherProps.GlobalAreaName, globalArea_Ids: retObj.GlobalArea_Id });

        pageVariable.handlerSupplierFrm.supplier = retObj;
        if (pageVariable.actionSuppTab == "linker") {
            pageVariable.linkerList.bindDataSource(pageVariable.handlerSupplierFrm.supplier.Linkers);
        }

        pageVariable.handlerSupplierFrm.show();
    });
    
    pageVariable.handlerSupplierFrm.supplier_id = m_key;
    pageVariable.handlerSupplierFrm.action = "Modify";
    pageVariable.handlerSupplierFrm.setTitle(mlm.C0061 + mlm.C1069);
}
/* 打开删除供应商的窗体 */
function openDeleteSupplierFrm(key) {
    if (!pageVariable.delSuppFrm) {
        pageVariable.delSuppFrm = new uicontrol.confirmDelete(deleteSupplier);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.supplierList.getItem(m_key);
    pageVariable.delSuppFrm.supplier_id = m_key;
    pageVariable.delSuppFrm.showConfirm(mlm.C0464 + mlm.C1069 + "(" + m_obj.SuppName + ")?");
}
/* 展示供应商Tab */
function showSuppTab(event, ui) {
    if (ui.index == 1) {
        pageVariable.actionSuppTab = "linker";

        if (!pageVariable.linkerList) {
            pageVariable.linkerList = new uicontrol.tableList("linkerList",
                                     { autoSeq: true,
                                         keyColumn: "SupplierLinker_Id",
                                         height: 300,
                                         columns: [{ display: mlm.C1164, name: "S_LinkerName", width: 100, align: 'left' },
                                                   { display: mlm.C1169, name: "S_LTitle", width: 80, align: 'left' },
                                                   { display: mlm.C0310, name: "S_LEmail", width: 180, align: 'left' },
                                                   { display: mlm.C0311, name: "S_LTel", width: 100, align: 'left' },
                                                   { display: mlm.C0073, name: "S_LRemark", width: 150, align: 'left', adjust: true, createCell: commoncore.func.constructRemarkCell },
                                                   { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, modifiedFunc: "openModifyLinkerFrm", deletedFunc: "openDeleteLinkerFrm"}]
                                     });
        }

        if (pageVariable.handlerSupplierFrm.supplier) {
            pageVariable.linkerList.bindDataSource(pageVariable.handlerSupplierFrm.supplier.Linkers);
        }
    }
    else{
        pageVariable.actionSuppTab = "supplier";
    }
}
/* 保存供应商 */
function saveSupplier() {
    var m_suppname = $.trim($("#txtSupplier").val());
    if (!m_suppname) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1069 + mlm.C0663);
        return;
    }

    var m_supplier = new pom.supplier();
    if (pageVariable.handlerSupplierFrm.action != "New") {
        m_supplinker = pageVariable.supplierList.getItem(pageVariable.handlerSupplierFrm.supplier_id);
    }
    m_supplier.SuppName = m_suppname;
    m_supplier.Supplier_Id = pageVariable.handlerSupplierFrm.supplier_id;

    var m_areaObj = pageVariable.ddlCountry.getObj();
    if (m_areaObj && m_areaObj.globalArea_Ids) {
        m_supplier.GlobalArea_Id = m_areaObj.globalArea_Ids;
    }

    m_supplier.S_Email = $.trim($("#txtEmail").val());
    m_supplier.S_WebSite = $.trim($("#txtWebsite").val());
    m_supplier.S_Tel = $.trim($("#txtPhone").val());
    m_supplier.S_Fax = $.trim($("#txtFax").val());
    m_supplier.S_Address = $.trim($("#txtAddress").val());
    m_supplier.S_Remark = $.trim($("#txtRemark").val());
    m_supplier.S_ProdRemark = $.trim($("#txtProdRemark").val());

    if (pageVariable.handlerSupplierFrm.action == "New") {
        if (pageVariable.linkerList) {
            m_supplier.Linkers = pageVariable.linkerList.dataSource.items.arrValues;
        }

        m_supplier.newSupplier(function (retObj) {
            retObj.GlobalAreaName = m_areaObj.globalAreaNames;
            pageVariable.supplierList.addData(retObj.Supplier_Id, retObj);

            pageVariable.supplierSource = null;
            pageVariable.handlerSupplierFrm.close();
        });
    }
    else {
        m_supplier.modifySupplier(function (retObj) {
            m_supplier.GlobalAreaName = m_areaObj.globalAreaNames;
            pageVariable.supplierList.modifyData(m_supplier.Supplier_Id, m_supplier);

            pageVariable.supplierSource = null;
            pageVariable.handlerSupplierFrm.close();
        });
    }
}
/* 删除供应商 */
function deleteSupplier() {
    var m_supplier = new pom.supplier();
    m_supplier.Supplier_Id = pageVariable.delSuppFrm.supplier_id;
    m_supplier.deleteSupplier(function () {
        pageVariable.supplierList.deleteData(pageVariable.delSuppFrm.supplier_id);

        pageVariable.supplierSource = null;
        pageVariable.delSuppFrm.close();
    });
}

/* 打开新增联系人的窗体 */
function openNewLinkerFrm() {
    if (!pageVariable.handlerLinkerFrm) {
        pageVariable.handlerLinkerFrm = new uicontrol.dialog("handlerLinkerFrm", "", { width: 900, position: ["auto", 25] }, saveLinker);
    }

    $("#txtLinker, #txtLinkerTitle, #txtLinkerEmail, #txtLinkerTel, #txtLinkerRemark").val("");

    pageVariable.handlerLinkerFrm.supplierlinker_id = 0;
    pageVariable.handlerLinkerFrm.action = "New";
    pageVariable.handlerLinkerFrm.setTitle(mlm.C0461 + mlm.C1164);
    pageVariable.handlerLinkerFrm.show();
}
/* 打开修改联系人的窗体 */
function openModifyLinkerFrm(key) {
    if (!pageVariable.handlerLinkerFrm) {
        pageVariable.handlerLinkerFrm = new uicontrol.dialog("handlerLinkerFrm", "", { width: 900, position: ["auto", 25] }, saveLinker);
    }

    var m_key = $(this).attr("tag");

    var m_obj = pageVariable.linkerList.getItem(m_key);
    $("#txtLinker").val(m_obj.S_LinkerName);
    $("#txtLinkerTitle").val(m_obj.S_LTitle);
    $("#txtLinkerEmail").val(m_obj.S_LEmail);
    $("#txtLinkerTel").val(m_obj.S_LTel);
    $("#txtLinkerRemark").val(m_obj.S_LRemark);

    pageVariable.handlerLinkerFrm.supplierlinker_id = m_key;
    pageVariable.handlerLinkerFrm.action = "Modify";
    pageVariable.handlerLinkerFrm.setTitle(mlm.C0061 + mlm.C1164);
    pageVariable.handlerLinkerFrm.show();
}
/* 打开修改联系人的窗体 */
function openDeleteLinkerFrm() {
    if (!pageVariable.delSuppLinkerFrm) {
        pageVariable.delSuppLinkerFrm = new uicontrol.confirmDelete(deleteSuppLinker);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.linkerList.getItem(m_key);
    pageVariable.delSuppLinkerFrm.supplierlinker_id = m_key;
    pageVariable.delSuppLinkerFrm.showConfirm(mlm.C0464 + mlm.mlm.C1164 + "(" + m_obj.S_LinkerName + ")?");
}
/* 保存联系人 */
function saveLinker() {
    var m_linker = $.trim($("#txtLinker").val());
    if (!m_linker) {
        pageframe.control.alertDialog.showAlertInfo(mlm.mlm.C1164 + mlm.C0663);
        return;
    }

    var m_supplinker = new pom.supplierlinker();
    if (pageVariable.handlerLinkerFrm.action != "New") {
        m_supplinker.SupplierLinker_Id = pageVariable.handlerLinkerFrm.supplierlinker_id;
    }
    else {
        m_supplinker.SupplierLinker_Id = pageVariable.handlerSupplierFrm.maxlinkerkey;
    }

    m_supplinker.Supplier_Id = pageVariable.handlerSupplierFrm.supplier_id;
    m_supplinker.S_LinkerName = m_linker;
    m_supplinker.S_LTitle = $.trim($("#txtLinkerTitle").val());
    m_supplinker.S_LEmail = $.trim($("#txtLinkerEmail").val());
    m_supplinker.S_LTel = $.trim($("#txtLinkerTel").val());
    m_supplinker.S_LRemark = $.trim($("#txtLinkerRemark").val());

    if (Number(pageVariable.handlerSupplierFrm.supplier_id) == 0) {
        if (pageVariable.handlerLinkerFrm.action == "New") {
            pageVariable.linkerList.addData(m_supplinker.SupplierLinker_Id, m_supplinker);
            pageVariable.handlerSupplierFrm.maxlinkerkey++;

            pageVariable.handlerLinkerFrm.close();
        }
        else {
            pageVariable.linkerList.modifyData(m_supplinker.SupplierLinker_Id, m_supplinker);

            pageVariable.handlerLinkerFrm.close();
        }
    }
    else {
        if (pageVariable.handlerLinkerFrm.action == "New") {
            m_supplinker.newSupplierLinker(function (retObj) {
                pageVariable.linkerList.addData(retObj.SupplierLinker_Id, retObj);
                pageVariable.handlerLinkerFrm.close();
            });
        }
        else {
            m_supplinker.modifySupplierLinker(function () {
                pageVariable.linkerList.modifyData(m_supplinker.SupplierLinker_Id, m_supplinker);
                pageVariable.handlerLinkerFrm.close();
            });
        }
    }
}
/* 删除联系人 */
function deleteSuppLinker() {
    var m_supplinker = new pom.supplierlinker();
    m_supplinker.SupplierLinker_Id = pageVariable.delSuppLinkerFrm.supplierlinker_id;
    m_supplinker.deleteSupplierLinker(function () {
        pageVariable.linkerList.deleteData(pageVariable.delSuppLinkerFrm.supplierlinker_id);

        pageVariable.delSuppLinkerFrm.close();
    });
}

/* 导出供应商 */
function exportSuppliers() {
    var m_supplier = new pom.supplier();
    m_supplier.KeyWord = pageVariable.querySuppParam.keyword;
    m_supplier.GlobalArea_Id = pageVariable.querySuppParam.globalarea_id;
    m_supplier.exportSuppliers(function (paramObj) {
        window.open(paramObj);
    });
}

/* 打开导入的窗体 */
function openImportFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importData);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    var m_type = $(this).attr("tag");
    if (m_type == "quoteprice" || m_type == "skuquoteprice") {
        pageVariable.handlerImportFrm.tpye = 1;
        pageVariable.handlerImportFrm.actiontype = m_type;
        pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C1051);
        pageVariable.handlerImportFrm.show();
    }
    else {
        pageVariable.handlerImportFrm.tpye = 2;
        pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C1177);
        pageVariable.handlerImportFrm.show();
    }
}
/* 导入 */
function importData() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    if (pageVariable.handlerImportFrm.tpye == 1) {
        var m_purchaseprice = new pom.purchaseprice;
        m_purchaseprice.importPurchasePrice(pageVariable.importFile, function (retObj) {

            if (retObj) {
                window.open(retObj);
            }

            if (pageVariable.handlerImportFrm.actiontype == "skuquoteprice") {
                loadQuotedSupplier();
                querySkuQuotedPrice(1, pageVariable.skupriceTable.pageNumber);
            }

            pageVariable.handlerImportFrm.close();
        });
    }
    else {
        var m_supplier = new pom.supplier();
        m_supplier.importSuppSeqs(pageVariable.importFile, function () {

            pageVariable.supplierSource = null;
            querySuppliers(1, pageVariable.supplierList.pageNumber);
            pageVariable.handlerImportFrm.close();
        });
    }
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 导入文件 */
    $("#lbImportFileSymbol, #lbCheckFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
    /* 导入模板 */
    $("#lbFileTemplateSymbol").text(mlm.C0754 + ":");
    $("#lkFileTemplate").text(mlm.C0876);

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_3").text(mlm.C0049);

    /* 查询条件 */
    $("#lkProdQueryCond").text(mlm.C1034);
    /* 商品关键字 */
    $("#lbKeyWord_q").text(mlm.C0734 + mlm.C0184 + ":");
    /* 所有分类 */
    $("#lbPdc_q").text(mlm.C0186);
    /* 品牌 */
    $("#lbBrandName_q").text(mlm.C0112 + ":");

    /* 采购价格 */
    $("#lbPurchasePrice").text(mlm.M0054);
    /* 供应商信息 */
    $("#lbSupplier").text(mlm.C1158);
    /* 采购价格列表 */
    $("#lbPriceTitle").text(mlm.M0054 + mlm.C0463);
    /* 待询价产品 */
    $("#btAskPrice").val(mlm.C1159);
    /* 查询报价 */
    $("#btQueryPrice").val(mlm.C0562 + mlm.C1051);
    /* 导出报价 */
    $("#btExportPrice, #btExportSkuQuoPrice").val(mlm.C0987 + mlm.C1051);
    /* 导出 */
    $("#btExportSupplier").val(mlm.C0987);
    /* 导入报价 */
    $("#btImportPrice, #btImportSkuQuoPrice").val(mlm.C0986 + mlm.C1051);
    /* 供应商列表 */
    $("#lbSupplierTitle").text(mlm.C1069 + mlm.C0463);
    /* 查询供应商 */
    $("#btQuerySupplier").val(mlm.C0562 + mlm.C1069);
    /* 新增供应商 */
    $("#btNewSupplier").val(mlm.C0461 + mlm.C1069);
    /* 导入排序 */
    $("#btImportSupplier").val(mlm.C1160);
    /* 供应商 */
    $("#lbSupplier_q, #lbSupp_Quoted, #lbHP_SuppSymbol, #lbSupplierSymbol").text(mlm.C1069 + ":");
    /* 刷新 */
    $("#btRefresh").val(mlm.C0858);
    /* 添加报价 */
    $("#btNewQuoPrice").val(mlm.C0530 + mlm.C1051);
    /* 商品Sku单元 */
    $("#lbHP_ProdSymbol").text(mlm.C1162 + ":");
    /* 采购地址 */
    $("#lbHP_PurddressSymbol").text(mlm.C1152 + ":");
    /* 采购价 */
    $("#lbHP_PriceSymbol").text(mlm.C1153 + ":");
    /* 采购周期 */
    $("#lbHP_PeriodSymbol").text(mlm.C1163 + ":");
    /* 商品所在地 */
    $("#lbHP_AreaSymbol").text(mlm.C1155 + ":");
    /* (天) */
    $("#lbPurDaysSymbol").text("(" + mlm.C0800 + ")");
    /* 备注 */
    $("#lbQuotedRemarkSymbol, #lbRemarkSymbol, #lbLinkerRemarkSymbol").text(mlm.C0073 + ":");
    /* 产品备注 */
    $("#lbProdRemarkSymbol").text(mlm.C1264 + mlm.C0073 + ":");
    /* 其他备注 */
    $("#lbRemarkSymbol").text(mlm.C0627 + mlm.C0073 + ":");
    /* 基本信息 */
    $("#lbSuppInfoSymbol").text(mlm.C0781);
    /* 联系人 */
    $("#lbSuppLinkerSymbol, #lbLinkerSymbol").text(mlm.C1164);
    /* 所在国家 */
    $("#lbCountrySymbol, #lbQueryCountrySymbol").text(mlm.C1165 + ":");
    /* 邮箱 */
    $("#lbEmailSymbol, #lbLinkerEmailSymbol").text(mlm.C0310 + ":");
    /* 公司网址 */
    $("#lbWebsiteSymbol").text(mlm.C1166 + ":");
    /* 联系电话 */
    $("#lbPhoneSymbol, #lbLinkerTelSymbol").text(mlm.C0311 + ":");
    /* 传真 */
    $("#lbFaxSymbol").text(mlm.C1167 + ":");
    /* 联系地址 */
    $("#lbAddressSymbol").text(mlm.C1168 + ":");
    /* 联系人列表 */
    $("#lbLinkerTitle").text(mlm.C1164 + mlm.C0463);
    /* 添加联系人 */
    $("#btAddLinker").val(mlm.C0530 + mlm.C1168);
    /* 职务 */
    $("#lbLinkerTitleSymbol").text(mlm.C1169 + ":");
    /* 关键字 */
    $("#lbKeyword").text(mlm.C0184 + ":");

    /* ECMS-采购价格 */
    document.title = mlm.C1593;
}