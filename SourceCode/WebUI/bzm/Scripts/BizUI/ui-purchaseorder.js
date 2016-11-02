/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadPurchasePlan);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btAddPPProd, #btExportPP, #btImportPP, #btQueryPPProd, #btNewPO, #btAddProd, #btGenerateProd, #btQueryPO, #btGeneratePPProd, #btExportPOAllProd, #btExportPOUnReceiveProd, #btExportUnRevPO, #btExportPOProd, #btClearPOProd").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

    $("#btAddPPProd").click(openNewPPProdFrm);
    $("#btExportPP").click(exportPurchaseProduct);
    $("#btImportPP").click(openImportFrm); 
    $("#btQueryPPProd").click(openQueryPPProdFrm);
    $("#purchaseorderTag").click(loadPOState);
    $("#btNewPO").click(openNewPOFrm); 
    $("#btQueryPO").click(openQueryPOFrm);
    $("#btGeneratePPProd").click(generatePPProd);
    $("#btExportPOProd").click(exportPOProduct);
    $("#btExportPOAllProd").click(openExportAllPOProdFrm);
    $("#btExportPOUnReceiveProd").click(openExportUnReceivePOProdFrm); 
    $("#btExportUnRevPO").click(exportUnRevProdList);
    $("#btClearPOProd").click(clearUnreceiveProd);

    $("#btWaitSubmitPO, #btHandlePO").click(function () {
        pageVariable.querycondition = {};
        pageVariable.querycondition.State = $(this).attr("tag");
        queryPO(1, pageVariable.poList.pageNumber);
    });

    pageVariable.querycondition = {};
    pageVariable.nowdate = commoncore.func.getNowTime();
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
    if (pageVariable.ppprodList) {
        pageVariable.ppprodList.resize(mainFormHeight);
    }
}

/* 加载采购计划视图 */
function loadPurchasePlan() {

    pageframe.control.processCtrl.showOperaProcess();

    if (!pageVariable.ppprodList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.ppprodList = new uicontrol.tableList("ppprodList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "SkuProduct_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryPurchasePlan,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'left', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C0734, name: "", width: 320, align: 'left', adjust: true, createCell: constructSkuProdCell },
                                                   { display: mlm.C1064, name: "Cost", width: 70, align: 'right', adjust: true, createCell: constructProdCostCell },
                                                   { display: mlm.C1572, name: "RequestQty", width: 55, align: 'right', adjust: true, createCell: constructPQtyCell },
                                                   { display: mlm.C1573, name: "RunningQty", width: 55, align: 'right', adjust: true, createCell: constructPQtyCell },
                                                   { display: mlm.C1574, name: "", width: 55, align: 'right', adjust: true, createCell: constructUnQtyCell },
                                                   { display: mlm.C1575, name: "", width: 350, align: 'left', adjust: true, createCell: constructPurchaseSuppCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: constructPPProdOperateCell}]
                                     });

    }

    queryPurchasePlan(1, pageVariable.ppprodList.pageNumber);
}
/*  */
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

    return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
}
/*  */
function constructSkuProdCell(key, cellValue) {

    var m_style = "";
    if (this.keyObj.IsOverdue == "1") {
        var m_style = "style='color: #DD0000'";
    }

    var m_arr = [];

    m_arr.push("<a " + m_style + " onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>");
    m_arr.push("<span>" + this.keyObj.SkuProdCode + "</span> - ");
    m_arr.push("<span>" + this.keyObj.ProdName + "</span>");

    if (this.keyObj.SkuProps) {
        m_arr.push(" - <span>[" + this.keyObj.SkuProps + "]</span>");
    }
    m_arr.push("</a>");

    return m_arr.join("");
}
/*  */
function constructPQtyCell(key, cellValue) {
    var m_value = Number(cellValue);
    if (m_value > 0) {
        return Number(cellValue) + " " + this.keyObj.Unit;
    }
} 
/*  */
function constructUnQtyCell(key, cellValue) {
    var m_unqty = Number(this.keyObj.RequestQty) - Number(this.keyObj.RunningQty);
    if (m_unqty > 0) {
        return m_unqty + " " + this.keyObj.Unit;
    }
}
/* 构建商品成本列 */
function constructProdCostCell(key, cellValue) {
    return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue);
}
/*  */
function constructPurchaseSuppCell(key, cellValue) {
    if (Number(this.keyObj.QuotedPrice) > 0) {
        var m_arr = [];

        m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.QuotedPrice) + "</div>");
        if (this.keyObj.SuppName) {
            m_arr.push("<span style='margin: 2px 0px 0px 0px;'><a onclick='openViewSuppFrm.call(this, \"" + this.keyObj.Supplier_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SuppName + "</a></span>");
        }
        if (this.keyObj.PurAddress) {
            if (this.keyObj.PurAddress.indexOf("http") > -1) {

                var m_str = this.keyObj.PurAddress;
                var m_len = m_str.getBytesCount();
                if (m_len > 40) {
                    m_str = m_str.substringByBytes(40) + "...";
                }

                m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666666'><a id='lbPurAddr_" + key + "' href='" + this.keyObj.PurAddress + "' target='blank' tag='" + this.keyObj.PurAddress + "'>" + m_str + "</a></div>");
            
            
            }
            else {
                m_arr.push("<span style='margin: 0px 0px 0px 2px'>(" + this.keyObj.PurAddress + ")</span>");
            }
        }

        return m_arr.join("");
    }
}
/*  */
function constructPPProdOperateCell(key, cellValue) {
    return "<a onclick='openModifyPPProdFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1577 + "</a>";
}
/* 打开查询采购计划的窗体 */
function openQueryPPProdFrm() {
    if (!pageVariable.queryPPProdFrm) {
        pageVariable.queryPPProdFrm = new uicontrol.dialog("queryPPProdFrm", mlm.C0171, { width: 800 }, function () {

            getPPProdQueryCondition();
            queryPurchasePlan(1, pageVariable.ppprodList.pageNumber);

            pageVariable.queryPPProdFrm.close();
        });

        pageVariable.selQPdc = new bizcontrol.selectpdc($("#selQPdc"));
    }

    $("#txtProdKey").val(pageVariable.querycondition.ProdKey);
    pageVariable.selQPdc.setPdc({ ProdCategory_Id: pageVariable.querycondition.ProdCategory_Id, PdcName: pageVariable.querycondition.PdcName });

    pageVariable.queryPPProdFrm.show();
}
/* 获取采购计划查询条件 */
function getPPProdQueryCondition() {
    pageVariable.querycondition.ProdCategory_Id = pageVariable.selQPdc.pdcId;
    pageVariable.querycondition.PdcName = pageVariable.selQPdc.pdcName;
    pageVariable.querycondition.ProdKey = $.trim($("#txtProdKey").val());
}
/* 查询采购计划 */
function queryPurchasePlan(pageNum, pageCount) {

    var m_purchaseproduct = new pom.purchaseproduct();
    m_purchaseproduct = $.extend(m_purchaseproduct, pageVariable.querycondition);

    m_purchaseproduct.Page = pageNum;
    m_purchaseproduct.PageNum = pageCount;
    m_purchaseproduct.queryPurchaseProduct(function (retTable) {

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        pageVariable.ppprodList.bindDataSource(m_jsonobjs, retTable.TotalCount);

        $.each(m_jsonobjs, function () {
            var m_itemCtrl = $("#lbPurAddr_" + this.SkuProduct_Id);
            m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
        });

        pageframe.control.processCtrl.hideOperaProcess();
    });
}

/* 初始化处理请求数量的窗体 */
function initHandlePPProdFrm() {
    if (!pageVariable.handlePPProdFrm) {
        pageVariable.handlePPProdFrm = new uicontrol.dialog("handlePPProdFrm", "", { width: 800 }, savePPProd);

        pageVariable.selectGProdForPlan = new bizcontrol.selectproduct(function (selectedskuprods) {
            var m_product = selectedskuprods[0];

            $("#txtProd").val(m_product.ProdCode + " - " + m_product.Product.ProdName + " - [" + m_product.SkuProps + "]");
            $("#lbProdUnit").text(m_product.Unit);

            var m_purchaseproduct = new pom.purchaseproduct();
            m_purchaseproduct.SkuProduct_Id = m_product.SkuProduct_Id;
            m_purchaseproduct.readPurchaseProduct(function (retObj) {
                if (retObj.SkuProduct_Id) {
                    pageframe.control.alertDialog.showAlertInfo(mlm.C1578);
                    $("#txtPPProdQty").val(Number(retObj.Qty));
                }
            });

            pageVariable.handlePPProdFrm.purchaseproduct = m_product;

        }, "single");

        var m_selectProdCtrl = $("#btSelectProd");
        m_selectProdCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
        m_selectProdCtrl.click(function () {

            if (pageVariable.handlePPProdFrm.purchaseproduct) {
                var m_selecteditems = new datastruct.dictionary();
                m_selecteditems.setItem(pageVariable.handlePPProdFrm.purchaseproduct.SkuProduct_Id, pageVariable.handlePPProdFrm.purchaseproduct);
            }

            pageVariable.selectGProdForPlan.show(m_selecteditems);
        });
    }
}
/* 打开新增请求数量的窗体 */
function openNewPPProdFrm() {

    initHandlePPProdFrm();

    $("#txtPPProdQty").val("0");
    $("#btSelectProd").show();
    $("#lbProdUnit").text("");
    $("#txtProd").val("");

    pageVariable.handlePPProdFrm.purchaseproduct = null;
    pageVariable.handlePPProdFrm.action = "New";
    pageVariable.handlePPProdFrm.setTitle(mlm.C0461 + mlm.C1543);
    pageVariable.handlePPProdFrm.show();
}
/* 打开修改请求数量的窗体 */
function openModifyPPProdFrm(key) {

    initHandlePPProdFrm();

    var m_obj = pageVariable.ppprodList.getItem(key);

    $("#txtPPProdQty").val(Number(m_obj.RequestQty));
    $("#lbProdUnit").text(m_obj.Unit);
    $("#btSelectProd").hide();
    $("#txtProd").val(m_obj.SkuProdCode + " - " + m_obj.ProdName + " - [" + m_obj.SkuProps + "]");

    pageVariable.handlePPProdFrm.purchaseproduct = m_obj;
    pageVariable.handlePPProdFrm.setTitle(mlm.C1452 + mlm.C1543);
    pageVariable.handlePPProdFrm.action = "Modify";
    pageVariable.handlePPProdFrm.show();
}
/* 保存请求数量 */
function savePPProd() {
    var m_purchaseproduct = new pom.purchaseproduct();
    m_purchaseproduct.Product_Id = pageVariable.handlePPProdFrm.purchaseproduct.Product_Id;
    m_purchaseproduct.SkuProduct_Id = pageVariable.handlePPProdFrm.purchaseproduct.SkuProduct_Id;
    m_purchaseproduct.Qty = $("#txtPPProdQty").val();
    if (!m_purchaseproduct.Qty) {
        m_purchaseproduct.Qty = 0;
    }

    if (pageVariable.handlePPProdFrm.action == "New" && Number(m_purchaseproduct.Qty) == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1568 + mlm.C1351);
        return;
    }

    m_purchaseproduct.handlePurchaseProduct(function (retTable) {

        var m_obj = pageVariable.ppprodList.getItem(m_purchaseproduct.SkuProduct_Id);

        if (m_obj) {
            m_obj.RequestQty = m_purchaseproduct.Qty;
            pageVariable.ppprodList.modifyData(m_obj.SkuProduct_Id, m_obj);
        }
        else {
            pageVariable.ppprodList.bindDataSource(retTable);
        }

        pageVariable.handlePPProdFrm.close();
    });
}
/* 生成采购请求 */
function generatePPProd() {
    var m_purchaseproduct = new pom.purchaseproduct();
    m_purchaseproduct.generatePurchaseProduct(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        pageVariable.ppprodList.bindDataSource(m_jsonobjs, retTable.TotalCount);

        $.each(m_jsonobjs, function () {
            var m_itemCtrl = $("#lbPurAddr_" + this.SkuProduct_Id);
            m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
        });
    });
}

/* 导出采购列表*/
function exportPurchaseProduct() {
    var m_purchaseproduct = new pom.purchaseproduct();
    m_purchaseproduct.exportPurchaseProduct(function (paramObj) {
        window.open(paramObj);
    });
}
/* 打开导入窗体 */
function openImportFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", mlm.C0986 + mlm.C1567 + mlm.C0463, { width: 800 }, importPurchaseOrder);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.action = $(this).attr("tag");
    pageVariable.handlerImportFrm.show();
}
/* 导入采购列表 */
function importPurchaseOrder() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    if (pageVariable.handlerImportFrm.action == "importhdpo") {
        var m_purchaseorder = new pom.purchaseorder();
        m_purchaseorder.importPurchaseOrderForHD(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            loadPOState();
            queryPO(1, pageVariable.poList.pageNumber);

            pageVariable.handlerImportFrm.close();
        });
    }
    else {
        var m_purchaseproduct = new pom.purchaseproduct();
        m_purchaseproduct.importPurchaseProduct(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            queryPurchasePlan(1, pageVariable.ppprodList.pageNumber);

            pageVariable.handlerImportFrm.close();
        });
    }
}

/*  */
function loadPOState() {

    var m_waitSubmitCtrl = $("#btWaitSubmitPO");
    var m_waitHandleCtrl = $("#btHandlePO");

    m_waitSubmitCtrl.val(mlm.C1430);
    m_waitHandleCtrl.val(mlm.C1432);

    var m_ctrls = $("#btWaitSubmitPO, #btHandlePO");
    m_ctrls.unbind("mouseenter mouseleave");
    m_ctrls.css("background-color", "#CCCCCC");

    var m_purchaseorder = new pom.purchaseorder();
    m_purchaseorder.getPOStat(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        $.each(m_jsonobjs, function () {
            if (Number(this.POCount) > 0) {
                if (this.State == "0") {
                    m_waitSubmitCtrl.css("background-color", "");
                    m_waitSubmitCtrl.val(mlm.C1430 + "(" + this.POCount + ")");
                    m_waitSubmitCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
                else if (this.State == "10") {
                    m_waitHandleCtrl.css("background-color", "");
                    m_waitHandleCtrl.val(mlm.C1432 + "(" + this.POCount + ")");
                    m_waitHandleCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
            }
        });
    });

    if (!pageVariable.poList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.poList = new uicontrol.tableList("poList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "PurchaseOrder_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryPO,
                                         columns: [{ display: mlm.C0893, name: "", width: 85, align: 'left', adjust: true, createCell: constructPOCodeCell },
                                                   { display: mlm.C1069, name: "SuppName", width: 150, align: 'left', adjust: true, createCell: constructPOSuppNameCell },
                                                   { display: mlm.C1569, name: "CreateTimeStr", width: 80, align: 'left', adjust: true, createCell: constructTimeCell },
                                                   { display: mlm.C0927, name: "TotalPrice", width: 90, align: 'right', adjust: true, createCell: constructProdCostCell },
                                                   { display: mlm.C1488, name: "", width: 140, align: 'left', adjust: true, createCell: constructPOPayCell },
                                                   { display: mlm.C1579, name: "", width: 270, align: 'left', adjust: true, createCell: constructPORevProdCell },
                                                   { display: mlm.C0367, name: "", width: 70, align: 'left', adjust: true, createCell: constructPOStateCell },
                                                   { display: mlm.C1580, name: "FullName", width: 60, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, createCell: constructPOOperaCell}]
                                     });

    }
}
/*  */
function constructPOCodeCell(key, cellValue) {
    var m_arr = [];

    m_arr.push("<a onclick='viewPurchaseOrder.call(this, \"" + this.keyObj.PurchaseOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.POCode + "</a>");

    return m_arr.join("");
}
/*  */
function constructPOSuppNameCell(key, cellValue) {
    var m_arr = [];

    m_arr.push("<a onclick='openViewSuppFrm.call(this, \"" + this.keyObj.Supplier_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SuppName + "</a>");

    return m_arr.join("");
}
/*  */
function constructTimeCell(key, cellValue) {
    return commoncore.func.getTimeStrCell(cellValue);
}
/*  */
function constructPOPayCell(key, cellValue) {
    var m_arr = [];

    var m_sostate = Number(this.keyObj.State);
    if (m_sostate > 10 || m_sostate == 10) {

        if (!this.keyObj.BillType) {
            m_arr.push("<div style='padding: 0px;'>" + mlm.C0490 + "</div>");
        }
        else {
            var m_remaining = Number(this.keyObj.Remaining);

            if (m_remaining > 0) {
                if (Number(m_remaining) == Number(this.keyObj.TotalPrice)) {
                    m_arr.push("<div style='padding: 0px;'>" + mlm.C0490 + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px;'>" + mlm.C1432 + "</div>");
                    if (this.keyObj.BillType == "1") {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000'>(" + mlm.C1520 + ": " + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_remaining) + ")</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000'>(" + mlm.C1581 + ": " + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_remaining) + ")</div>");
                    }
                }
            }
            else {
                var m_done = Number(this.keyObj.Done);
                if (m_done == Number(this.keyObj.TotalPrice)) {
                    m_arr.push("<div style='padding: 0px;'>" + mlm.C1552 + "</div>");
                }
                else {
                    if (this.keyObj.BillType == "1") {
                        m_arr.push("<div style='padding: 0px; color: #3F66D2'>" + mlm.C1564 + ": " + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_done) + "</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 0px; color: #3F66D2'>" + mlm.C0910 + ": " + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_done) + "</div>");
                    }
                }
            }
        }
    }

    return m_arr.join("");
}
/*  */
function constructPORevProdCell(key, cellValue) {
    var m_arr = [];

    if (this.keyObj.State == "0") {
        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>" + this.keyObj.RevRemark + ", " + mlm.C1304 + commoncore.func.getTimeStrCell(this.keyObj.EstimateArriveTimeStr) + mlm.C1585 + "</div>");
    }
    else {
        var m_css = "";
        if (this.keyObj.isarrivedelay) {
            m_css = "color: #DD0000";
        }

        var m_schedule = Number(this.keyObj.Schedule);
        if (m_schedule == 1) {
            m_arr.push("<div style='padding: 0px'>" + mlm.C1582 + "</div>");
        }
        else if (m_schedule == 0) {

            var m_revstr = "";
            if (this.keyObj.RevType == "1") {
                m_revstr = mlm.C1597;
            }
            else {
                m_revstr = mlm.C1598;
            }
            m_revstr += "-" + this.keyObj.RevRemark;


            m_arr.push("<div style='padding: 0px; " + m_css + "'>" + mlm.C1583 + "</div>");
            m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666; " + m_css + "'>(" + m_revstr + ", " + mlm.C1304 + commoncore.func.getTimeStrCell(this.keyObj.EstimateArriveTimeStr) + mlm.C1585 + ")</div>");
        }
        else {
            if (this.keyObj.State == "20") {

                m_arr.push("<div style='padding: 0px; color: #3F66D2'>" + mlm.C1584 + ": " + Number(m_schedule * 100).toFixed(2) + "%" + "</div>");

                if (this.keyObj.Remark) {
                    var m_str = this.keyObj.Remark;
                    var m_len = m_str.getBytesCount();
                    if (m_len > 35) {
                        m_str = m_str.substringByBytes(35) + "...";
                        m_arr.push("<div id='lbTPORemark_v_" + key + "' style='padding: 2px 0px 0px 0px; color: #666' tag='" + this.keyObj.Remark + "'>" + m_str + "</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + m_str + ")</div>");
                    }
                }
            }
            else {
                var m_revstr = "";
                if (this.keyObj.RevType == "1") {
                    m_revstr = mlm.C1597;
                }
                else {
                    m_revstr = mlm.C1598;
                }
                m_revstr += "-" + this.keyObj.RevRemark;

                m_arr.push("<div style='padding: 0px; " + m_css + "'>" + mlm.C1584 + ": " + Number(m_schedule * 100).toFixed(2) + "%" + "</div>");
                m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666; " + m_css + "'>(" + m_revstr + ", " + mlm.C1304 + commoncore.func.getTimeStrCell(this.keyObj.EstimateArriveTimeStr) + mlm.C1585 + ")</div>");
            }
        }
    }
    
    return m_arr.join("");
}
/*  */
function constructPOStateCell(key, cellValue) {
    if (this.keyObj.State == "0") {
        return mlm.C0375;
    }
    else if (this.keyObj.State == "10") {
        return mlm.C1425;
    }
    else if (this.keyObj.State == "20") {
        return mlm.C1557;
    }
}
/*  */
function constructPOOperaCell(key, cellValue) {
    var m_arr = [];

    if (this.keyObj.State == "0") {
        m_arr.push("<a onclick='openModifyPOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0061 + "</a>");
        m_arr.push("<a style='margin: 0px 0px 0px 3px' onclick='openDeletePOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0062 + "</a>");
        m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px'><a onclick='openSubmitPOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1425 + "</a></div>");
    }
    else if (this.keyObj.State == "10") {
        m_arr.push("<a onclick='openModifyPOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1452 + "</a>");
        m_arr.push("<a style='margin: 0px 0px 0px 3px' onclick='openClosePOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1557 + "</a>");   
    }
    
    return m_arr.join("");
}
/*  */
function openQueryPOFrm() {
    if (!pageVariable.queryPOFrm) {
        pageVariable.queryPOFrm = new uicontrol.dialog("queryPOFrm", mlm.C0562 + mlm.C1393, { width: 800 }, function () {
            getPOQueryCondition();
            queryPO(1, pageVariable.poList.pageNumber);

            pageVariable.queryPOFrm.close();
        });

        pageVariable.selQPOPdc = new bizcontrol.selectpdc($("#selQPOPdc"));

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtQCreateTime_1").datepicker();
        $("#txtQCreateTime_2").datepicker();
        $("#txtQCreateTime_2").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        pageVariable.selQWH = new bizcontrol.selectwarehouse($("#selQWH"), null, "1");

        pageVariable.ddlQPOState = new uicontrol.selectbox("ddlQPOState", "radio");
        var m_stateoptions = [];
        m_stateoptions.push({ key: "-1", value: mlm.C0403 });
        m_stateoptions.push({ key: "0", value: mlm.C1430 });
        m_stateoptions.push({ key: "10", value: mlm.C1432 });
        m_stateoptions.push({ key: "20", value: mlm.C1557 });
        pageVariable.ddlQPOState.bindSource(m_stateoptions);

        var m_defaultpostate = [];
        m_defaultpostate.push({ key: "-1" });
        pageVariable.ddlQPOState.setSelectedItem(m_defaultpostate);

        var m_potypeCtrl = $("#ddlQPOType");
        m_potypeCtrl.append("<option value='0'>" + mlm.C0403 + "</option>");
        m_potypeCtrl.append("<option value='1'>" + mlm.C1594 + "</option>");
        m_potypeCtrl.append("<option value='2'>" + mlm.C1595 + "</option>");

        var m_revtypeCtrl = $("#ddlQPORevType");
        m_revtypeCtrl.append("<option value='0'>" + mlm.C0403 + "</option>");
        m_revtypeCtrl.append("<option value='1'>" + mlm.C1597 + "</option>");
        m_revtypeCtrl.append("<option value='2'>" + mlm.C1598 + "</option>");
    }

    $("#txtQPOCode").val(pageVariable.querycondition.POCode);
    $("#txtQSuppKey").val(pageVariable.querycondition.SuppKey);
    $("#txtQProdKey").val(pageVariable.querycondition.ProdKey);
    pageVariable.selQWH.setWarehouse({ Warehouse_Id: pageVariable.querycondition.Warehouse_Id, WarehouseName: pageVariable.querycondition.WarehouseName });
    pageVariable.selQPOPdc.setPdc({ ProdCategory_Id: pageVariable.querycondition.PdcId, PdcName: pageVariable.querycondition.PdcName });
    $("#txtQCreateTime_1").val(pageVariable.querycondition.FromTime);
    $("#txtQCreateTime_2").val(pageVariable.querycondition.ToTime);
    pageVariable.ddlQPOState.setSelectedItem([{ key: pageVariable.querycondition.State}]);
    $("#ddlQPOType").val(pageVariable.querycondition.POType);
    $("#ddlQPORevType").val(pageVariable.querycondition.RevType);

    pageVariable.queryPOFrm.show();
}
/*  */
function getPOQueryCondition() {
    pageVariable.querycondition.POCode = $.trim($("#txtQPOCode").val());
    pageVariable.querycondition.SuppKey = $.trim($("#txtQSuppKey").val());
    pageVariable.querycondition.ProdKey = $.trim($("#txtQProdKey").val());
    if (pageVariable.selQWH) {
        pageVariable.querycondition.Warehouse_Id = pageVariable.selQWH.warehouse_id;
        pageVariable.querycondition.WarehouseName = pageVariable.selQWH.warehousename;
    }
    else {
        pageVariable.querycondition.Warehouse_Id = "0";
        pageVariable.querycondition.WarehouseName = "";
    }
    pageVariable.querycondition.PdcId = pageVariable.selQPOPdc.pdcId;
    pageVariable.querycondition.PdcName = pageVariable.selQPOPdc.pdcName;
    pageVariable.querycondition.FromTime = $("#txtQCreateTime_1").val();
    pageVariable.querycondition.ToTime = $("#txtQCreateTime_2").val();
    pageVariable.querycondition.State = pageVariable.ddlQPOState.getSelectedItem()[0];
    pageVariable.querycondition.POType = $("#ddlQPOType").val();
    pageVariable.querycondition.RevType = $("#ddlQPORevType").val();

}
/* 查询采购订单 */
function queryPO(pageNum, pageCount) {
    var m_purchaseorder = new pom.purchaseorder();
    m_purchaseorder = $.extend(m_purchaseorder, pageVariable.querycondition);

    m_purchaseorder.Page = pageNum;
    m_purchaseorder.PageNum = pageCount;
    m_purchaseorder.queryPurchaseOrder(function (retTable) {

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            var m_shipfromdate = new Date(this.EstimateArriveTimeStr);
            if (m_shipfromdate < pageVariable.nowdate) {
                this.isarrivedelay = true;
            }
        });
        pageVariable.poList.bindDataSource(m_jsonobjs, retTable.TotalCount);
        
        $.each(m_jsonobjs, function () {
            var m_itemCtrl = $("#lbTPORemark_v_" + this.PurchaseOrder_Id);
            m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
        });
    });
}

/*  */
function initPOFrm() {
    if (!pageVariable.handlePOFrm) {
        pageVariable.handlePOFrm = new uicontrol.dialog("handlePOFrm", "", { width: 990, position: ["auto", 5] }, savePO);

        pageVariable.selPOSupplier = new bizcontrol.selectsupplier($("#selPOSupplier"), { TxtClass: "text-input" }, function (key) {

            if (key && key != "0" && $("#ddlPORevType").val() == "2") {
                var m_supplier = new pom.supplier();
                m_supplier.Supplier_Id = key;
                m_supplier.readSupplier(function (retObj) {
                    $("#txtPORevRemark").val(retObj.S_Address);
                });
            }
            else {
                $("#txtPORevRemark").val("");
            }
        });
        pageVariable.selPOWarehouse = new bizcontrol.selectwarehouse($("#selPOWarehouse"), null, "1");

        $("#txtCreateTime").datepicker();
        $("#txtPOEstimateArriveTime").datepicker();

        $("#btGenerateProd").click(generatePOProd);
        
        var m_now = new Date();
        m_now.setDate(m_now.getDate() + 2);
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtCreateTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        $("#btAddProd").click(openSelPOProdFrm);
        pageVariable.selectGProd = new bizcontrol.selectproduct(addPOProduct);

        $("#txtOtherCharge").change(function () {
            var m_value = $(this).val();
            if (!m_value) {
                $(this).val("0.00");
            }

            calculatePOPrice();
        });

        var m_revtypeCtrl = $("#ddlPORevType");
        m_revtypeCtrl.append("<option value='1'>" + mlm.C1597 + "</option>");
        m_revtypeCtrl.append("<option value='2'>" + mlm.C1598 + "</option>");
        m_revtypeCtrl.change(function () {

            var key = pageVariable.selPOSupplier.Supplier_Id;
            if (key && key != "0" && $(this).val() == "2") {
                var m_supplier = new pom.supplier();
                m_supplier.Supplier_Id = key;
                m_supplier.readSupplier(function (retObj) {
                    $("#txtPORevRemark").val(retObj.S_Address);
                });
            }
            else {
                $("#txtPORevRemark").val("");
            }
        });

        pageVariable.poproductList = new uicontrol.tableList("poproductList",
                                     { autoSeq: true,
                                         keyColumn: "SkuProduct_Id",
                                         height: 150,
                                         pageQueryHandler: queryPurchasePlan,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'left', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C0734, name: "", width: 300, align: 'left', adjust: true, createCell: constructSkuProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 70, align: 'left', adjust: true, createCell: constructPOProdQtyCell },
                                                   { display: mlm.C1586, name: "QuotedPrice", width: 75, align: 'right', adjust: true, createCell: constructQuotedPriceCell },
                                                   { display: mlm.C1494, name: "Price", width: 75, align: 'right', adjust: true, createCell: constructPOProdPriceCell },
                                                   { display: mlm.C1551, name: "", width: 85, align: 'right', adjust: true, createCell: constructPOPTotalPriceCell },
                                                   { display: mlm.C1587, name: "ReceiveRetQty", width: 50, align: 'right', adjust: true, createCell: constructPORevQtyCell },
                                                   { display: mlm.C0019, name: "", width: 40, align: 'center', adjust: true, deletedFunc: "openDelPOProdFrm"}]
                                     });
    }
}
/* 打开新增采购订单的窗体 */
function openNewPOFrm() {

    initPOFrm();

    $("#btExportPOAllProd, #btExportPOUnReceiveProd, #btExportUnRevPO, #btClearPOProd").hide();

    pageVariable.selPOSupplier.clear();
    pageVariable.selPOWarehouse.clear();
    $("#txtOtherCharge").val("0.00");
    $("#lbOCCurrCode").text(keycontext.keyparam.syscurrcode);

    var m_now = new Date();
    var m_year = m_now.getFullYear();
    var m_month = Number(m_now.getMonth()) + 1;
    $("#txtCreateTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());
    $("#txtPOEstimateArriveTime").val("");
    $("#txtPORemark").val("");
    $("#txtPORevRemark").val("");

    $("#txtCreateTime").attr('disabled', false);
    var m_custCtrl = $("#selPOSupplier");
    m_custCtrl.find("input").attr('disabled', false);
    m_custCtrl.find("img").show();

    pageVariable.poproductList.bindDataSource(null);

    $("#lbTotalPrice").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, 0));

    pageVariable.handlePOFrm.purchaseorder_id = 0;
    pageVariable.handlePOFrm.action = "New";
    pageVariable.handlePOFrm.setTitle(mlm.C0461 + mlm.C1393);
    pageVariable.handlePOFrm.show();
}
/* 打开修改采购订单的窗体 */
function openModifyPOFrm(key) {

    initPOFrm();

    $("#btExportPOAllProd, #btExportPOUnReceiveProd, #btExportUnRevPO, #btClearPOProd").show();

    var m_purchaseorder = new pom.purchaseorder();
    m_purchaseorder.PurchaseOrder_Id = key;
    m_purchaseorder.simpleReadPurchaseOrder(function (retObj) {

        pageVariable.selPOSupplier.setSupplier({ Supplier_Id: retObj.Supplier_Id, SuppName: retObj.OtherProps.SuppName });
        pageVariable.selPOWarehouse.setWarehouse({ Warehouse_Id: retObj.Warehouse_Id, WarehouseName: retObj.OtherProps.WarehouseName });
        $("#txtOtherCharge").val(Number(retObj.OtherCharge).toFixed(2));
        $("#lbOCCurrCode").text(keycontext.keyparam.syscurrcode);

        $.each(retObj.Products, function () {
            this.BrowsePicUrl = this.OtherProps.BrowsePicUrl;
            this.SkuProdCode = this.OtherProps.SkuProdCode;
            this.ProdName = this.OtherProps.ProdName;
            this.Unit = this.OtherProps.Unit;
            this.SkuProps = this.OtherProps.SkuProps;
        });
        pageVariable.poproductList.bindDataSource(retObj.Products);

        $("#txtPORemark").val(retObj.Remark); 
        $("#txtPORevRemark").val(retObj.RevRemark);
        $("#ddlPORevType").val(retObj.RevType);

        var m_createtimeCtrl = $("#txtCreateTime");
        m_createtimeCtrl.val(datastruct.convertion.convertToDateStr(retObj.OtherProps.CreateTimeStr));
        m_createtimeCtrl.attr('disabled', true);
        $("#txtPOEstimateArriveTime").val(datastruct.convertion.convertToDateStr(retObj.OtherProps.EstimateArriveTimeStr));
        $("#lbTotalPrice").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, retObj.TotalPrice));

        var m_custCtrl = $("#selPOSupplier");
        m_custCtrl.find("input").attr('disabled', true);
        m_custCtrl.find("img").hide();

        pageVariable.handlePOFrm.purchaseorder_id = m_purchaseorder.PurchaseOrder_Id;
    });

    pageVariable.handlePOFrm.action = "Modify";
    pageVariable.handlePOFrm.setTitle(mlm.C0061 + mlm.C1393);
    pageVariable.handlePOFrm.show();
}
/*  */
function constructPORevQtyCell(key, cellValue) {

    if (Number(cellValue) > 0) {
        var m_arr = [];
        m_arr.push("<span style='oadding: 0px'>" + cellValue + " " + this.keyObj.Unit + "</span>");

        return m_arr.join("");
    }
}
/*  */
function constructPOProdQtyCell(key, cellValue) {
    var m_arr = [];
    m_arr.push("<input type='text' class='text-input' style='width: 40px' onchange='changePoProdQty.call(this, \"" + key + "\");' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + cellValue + "' />");
    m_arr.push("<span style='margin: 0px 0px 0px 5px'>" + this.keyObj.Unit + "</span>");

    return m_arr.join("");
}
/* 改变订单商品数量 */
function changePoProdQty(key) {
    var m_obj = pageVariable.poproductList.getItem(key);
    var m_qty = $(this).val();
    if (!m_qty) {
        $(this).val("0");
        m_qty = 0;
    }

    if (m_qty < m_obj.ReceiveRetQty) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1588);
        $(this).val(m_obj.Qty);
        return;
    }
    m_obj.Qty = m_qty;

    pageVariable.poproductList.modifyData(m_obj.SkuProduct_Id, m_obj);

    calculatePOPrice();
}
/*  */
function constructPOProdPriceCell(key, cellValue) {
    var m_arr = [];

    m_arr.push("<span style='margin: 0px 5px 0px 0px'>" + keycontext.keyparam.syscurrsymbol + "</span>");
    m_arr.push("<input type='text' class='text-input' style='width: 50px' onchange='changePoProdPrice.call(this, \"" + key + "\");' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + Number(cellValue).toFixed(2) + "' />");

    return m_arr.join("");
}
/*  */
function changePoProdPrice(key) {
    var m_obj = pageVariable.poproductList.getItem(key);
    var m_qty = $(this).val();
    if (!m_qty) {
        $(this).val("0.00");
        m_obj.Price = 0;
    }
    else {
        m_obj.Price = m_qty;
    }
    pageVariable.poproductList.modifyData(m_obj.SkuProduct_Id, m_obj);

    calculatePOPrice();
}
/*  */
function constructQuotedPriceCell(key, cellValue) {
    if (Number(cellValue) > 0) {
        return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue);
    }
}
/*  */
function constructPOPTotalPriceCell(key, cellValue) {
    return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, Number(this.keyObj.Qty) * Number(this.keyObj.Price));
}
/* 打开选择订单商品的窗体 */
function openSelPOProdFrm() {

    var m_selecteditems = new datastruct.dictionary();
    $.each(pageVariable.poproductList.dataSource.items.arrValues, function () {
        m_selecteditems.setItem(this.SkuProduct_Id, this);
    });
    pageVariable.selectGProd.show(m_selecteditems);
}
/* 添加订单商品 */
function addPOProduct(selectedskuprods) {

    if (!pageVariable.selPOSupplier.Supplier_Id || pageVariable.selPOSupplier.Supplier_Id == "0") {
        $.each(selectedskuprods, function () {
            if (!pageVariable.poproductList.getItem(this.SkuProduct_Id)) {
                var m_skuprod = {};
                m_skuprod.Product_Id = this.Product_Id;
                m_skuprod.SkuProduct_Id = this.SkuProduct_Id;
                m_skuprod.BrowsePicUrl = this.BrowsePicUrl;
                m_skuprod.SkuProdCode = this.ProdCode;
                m_skuprod.ProdName = this.Product.ProdName;
                m_skuprod.Unit = this.Product.Unit;
                m_skuprod.SkuProps = this.SkuProps;
                m_skuprod.Qty = 1;
                m_skuprod.ReceiveRetQty = 0;
                m_skuprod.QuotedPrice = 0;
                m_skuprod.Price = this.Cost;

                pageVariable.poproductList.addData(m_skuprod.SkuProduct_Id, m_skuprod);
            }
        });

        calculatePOPrice();
    }
    else {
        var m_skuproduct_ids = [];
        $.each(selectedskuprods, function () {
            m_skuproduct_ids.push(this.SkuProduct_Id);
        });

        var m_quotedpriceDict = new datastruct.dictionary();

        var m_purchaseprice = new pom.purchaseprice();
        m_purchaseprice.Supplier_Id = pageVariable.selPOSupplier.Supplier_Id;
        m_purchaseprice.SkuProduct_Ids = m_skuproduct_ids;
        m_purchaseprice.getSuppQuotedPrices(function (retTable) {

            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            $.each(m_jsonobjs, function () {
                m_quotedpriceDict.setItem(this.SkuProduct_Id, this.QuotedPrice);
            });

            $.each(selectedskuprods, function () {
                if (!pageVariable.poproductList.getItem(this.SkuProduct_Id)) {
                    var m_skuprod = {};
                    m_skuprod.Product_Id = this.Product_Id;
                    m_skuprod.SkuProduct_Id = this.SkuProduct_Id;
                    m_skuprod.BrowsePicUrl = this.BrowsePicUrl;
                    m_skuprod.SkuProdCode = this.ProdCode;
                    m_skuprod.ProdName = this.Product.ProdName;
                    m_skuprod.Unit = this.Product.Unit;
                    m_skuprod.SkuProps = this.SkuProps;
                    m_skuprod.Qty = 1;
                    m_skuprod.ReceiveRetQty = 0;

                    var m_quotedprice = m_quotedpriceDict.getItem(this.SkuProduct_Id);
                    if (m_quotedprice) {
                        m_skuprod.QuotedPrice = m_quotedprice;
                        m_skuprod.Price = m_quotedprice;
                    }
                    else {
                        m_skuprod.QuotedPrice = 0;
                        m_skuprod.Price = 0;
                    }

                    pageVariable.poproductList.addData(m_skuprod.SkuProduct_Id, m_skuprod);
                }
            });

            calculatePOPrice();
        });
    }
}
/* 打开删除商品的窗体 */
function openDelPOProdFrm() {
    if (!pageVariable.deleltePOProdFrm) {
        pageVariable.deleltePOProdFrm = new uicontrol.confirmDelete(deletePOProd);
    }

    pageVariable.deleltePOProdFrm.skuproduct_id = $(this).attr("tag"); ;
    var m_skuproduct = pageVariable.poproductList.getItem(pageVariable.deleltePOProdFrm.skuproduct_id);

    pageVariable.deleltePOProdFrm.showConfirm(mlm.C0464 + mlm.C0734 + "(" + m_skuproduct.SkuProdCode + ") ?");
}
/* 删除内部商品 */
function deletePOProd() {
    var m_obj = pageVariable.poproductList.getItem(pageVariable.deleltePOProdFrm.skuproduct_id);
    if (m_obj.ReceiveRetQty > 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1588);
        return;
    }

    pageVariable.poproductList.deleteData(pageVariable.deleltePOProdFrm.skuproduct_id);
    
    calculatePOPrice();

    pageVariable.deleltePOProdFrm.close();
}
/*  */
function calculatePOPrice() {
    var m_totalprice = 0;
    $.each(pageVariable.poproductList.dataSource.items.arrValues, function () {
        m_totalprice += Number(this.Price) * Number(this.Qty);
    });

    m_totalprice += Number($("#txtOtherCharge").val());

    $("#lbTotalPrice").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_totalprice));
}
/* 生成待采购商品 */
function generatePOProd() {
    var key = pageVariable.selPOSupplier.Supplier_Id;
    pageVariable.poproductList.bindDataSource(null);

    var m_purchaseproduct = new pom.purchaseproduct();
    m_purchaseproduct.Supplier_Id = key;
    m_purchaseproduct.getSuppPurchaseProduct(function (retTable) {

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            this.Qty = Number(this.RequestQty) - Number(this.RunningQty);
            if (this.QuotedPrice) {
                this.Price = this.QuotedPrice;
            }
            else {
                this.Price = this.Cost;
            }
        });

        pageVariable.poproductList.bindDataSource(m_jsonobjs, retTable.TotalCount);

        calculatePOPrice();
    });
}
/* 清理未交付产品 */
function clearUnreceiveProd() {
    var m_items = [];

    $.each(pageVariable.poproductList.dataSource.items.arrValues, function () {

        if (Number(this.ReceiveRetQty) > 0) {
            this.Qty = this.ReceiveRetQty;
            m_items.push(this);
        }
    });

    pageVariable.poproductList.bindDataSource(null);
    $.each(m_items, function () {
        pageVariable.poproductList.addData(this.SkuProduct_Id, this);
    });

    calculatePOPrice();
}
/* 保存采购订单 */
function savePO() {
    var m_purchaseorder = new pom.purchaseorder();
    m_purchaseorder.PurchaseOrder_Id = pageVariable.handlePOFrm.purchaseorder_id;
    m_purchaseorder.Supplier_Id = pageVariable.selPOSupplier.Supplier_Id;
    m_purchaseorder.Warehouse_Id = pageVariable.selPOWarehouse.warehouse_id;
    if (!m_purchaseorder.Warehouse_Id || m_purchaseorder.Warehouse_Id == "0") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1202 + mlm.C0713);
        return;
    }
    m_purchaseorder.CreateTime = $("#txtCreateTime").val();
    if (!m_purchaseorder.CreateTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1569 + mlm.C0713);
        return;
    }
    m_purchaseorder.EstimateArriveTime = $("#txtPOEstimateArriveTime").val();
    if (!m_purchaseorder.EstimateArriveTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1467 + mlm.C0713);
        return;
    }

    var m_createtime = datastruct.convertion.convertToDateByStr(m_purchaseorder.CreateTime);
    var m_estimatetime = datastruct.convertion.convertToDateByStr(m_purchaseorder.EstimateArriveTime);
    if (m_createtime > m_estimatetime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1589);
        return;
    }

    m_purchaseorder.Remark = $.trim($("#txtPORemark").val());
    m_purchaseorder.RevType = $("#ddlPORevType").val();
    m_purchaseorder.RevRemark = $.trim($("#txtPORevRemark").val());
    if (!m_purchaseorder.RevRemark) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1599 + mlm.C0713);
        return;
    }

    m_purchaseorder.OtherCharge = $("#txtOtherCharge").val();

    m_purchaseorder.Products = [];
    $.each(pageVariable.poproductList.dataSource.items.arrValues, function () {
        var m_product = {};
        m_product.Product_Id = this.Product_Id;
        m_product.SkuProduct_Id = this.SkuProduct_Id;
        m_product.Qty = this.Qty;
        m_product.QuotedPrice = this.QuotedPrice;
        m_product.Price = this.Price;

        m_purchaseorder.Products.push(m_product);
    });

    if (m_purchaseorder.Products.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0168 + mlm.C0713);
        return;
    }

    if (pageVariable.handlePOFrm.action == "New") {
        m_purchaseorder.newPurchaseOrder(function (retTable) {

            var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];

            pageVariable.poList.addData(m_jsonobj.PurchaseOrder_Id, m_jsonobj);
            pageVariable.handlePOFrm.close();

            loadPOState();
        });
    }
    else {
        m_purchaseorder.modifyPurchaseOrder(function (retTable) {

            var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];

            pageVariable.poList.modifyData(m_jsonobj.PurchaseOrder_Id, m_jsonobj);
            pageVariable.handlePOFrm.close();

            loadPOState();
        });
    }
}
/* 打开删除订单的窗体 */
function openDeletePOFrm(key) {
    if (!pageVariable.deleltePOFrm) {
        pageVariable.deleltePOFrm = new uicontrol.confirmDelete(deletePO);
    }

    pageVariable.deleltePOFrm.purchaseorder_id = key;
    var m_purchaseorder = pageVariable.poList.getItem(pageVariable.deleltePOFrm.purchaseorder_id);

    pageVariable.deleltePOFrm.showConfirm(mlm.C0464 + mlm.C1393 + "(" + m_purchaseorder.POCode + ") ?");
}
/* 删除订单 */
function deletePO() {
    var m_purchaseorder = new pom.purchaseorder();

    m_purchaseorder.PurchaseOrder_Id = pageVariable.deleltePOFrm.purchaseorder_id;
    m_purchaseorder.deletePurchaseOrder(function () {

        pageVariable.poList.deleteData(m_purchaseorder.PurchaseOrder_Id);

        pageVariable.deleltePOFrm.close();

        loadPOState();
    });
}

/* 打开生效的窗体 */
function openSubmitPOFrm(key) {
    if (!pageVariable.submitPOFrm) {
        pageVariable.submitPOFrm = new uicontrol.dialog("submitPOFrm", mlm.C1524, { width: 800 }, submitPO);
    }

    var m_purchaseorder = pageVariable.poList.getItem(key);

    $("#lbSubmitPOInfo").text(mlm.C1590 + "(" + m_purchaseorder.POCode + ")");

    pageVariable.submitPOFrm.purchaseorder_id = key;
    pageVariable.submitPOFrm.show();
}
/* 生效 */
function submitPO() {
    var m_purchaseorder = new pom.purchaseorder();

    m_purchaseorder.PurchaseOrder_Id = pageVariable.submitPOFrm.purchaseorder_id;
    m_purchaseorder.submitPurchaseOrder(function () {

        var m_purchaseorder = pageVariable.poList.getItem(pageVariable.submitPOFrm.purchaseorder_id);
        m_purchaseorder.State = 10;

        pageVariable.poList.modifyData(m_purchaseorder.PurchaseOrder_Id, m_purchaseorder);

        pageVariable.submitPOFrm.close();

        loadPOState();
    });
}

/*  */
function openClosePOFrm(key) {
    if (!pageVariable.closePOFrm) {
        pageVariable.closePOFrm = new uicontrol.dialog("closePOFrm", mlm.C1557 + mlm.C1505, { width: 800 }, closePO);
    }

    $("#txtCloseRemark").val("");

    var m_purchaseorder = pageVariable.poList.getItem(key);

    $("#lbClosePOInfo").text(mlm.C1591 + "(" + m_purchaseorder.POCode + ")");

    pageVariable.closePOFrm.purchaseorder_id = key;
    pageVariable.closePOFrm.show();
}
/*  */
function closePO() {
    var m_purchaseorder = new pom.purchaseorder();

    m_purchaseorder.PurchaseOrder_Id = pageVariable.closePOFrm.purchaseorder_id;
    m_purchaseorder.Remark = $.trim($("#txtCloseRemark").val());
    if (!m_purchaseorder.Remark) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0073 + mlm.C0713);
        return;
    }
    m_purchaseorder.closePurchaseOrder(function () {

        var m_purchaseorder = pageVariable.poList.getItem(pageVariable.closePOFrm.purchaseorder_id);
        m_purchaseorder.State = 20;

        pageVariable.poList.modifyData(m_purchaseorder.PurchaseOrder_Id, m_purchaseorder);

        pageVariable.closePOFrm.close();

        loadPOState();
    });
}

/*  */
function exportPurchaseOrderForHD() {
    var m_purchaseorder = new pom.purchaseorder();
    m_purchaseorder.exportPurchaseOrderForHD(function (paramObj) {
        window.open(paramObj);
    });
}

/*  */
function exportPOProduct() {
    var m_purchaseorder = new pom.purchaseorder();
    m_purchaseorder = $.extend(m_purchaseorder, pageVariable.querycondition);

    m_purchaseorder.exportPOProducts(function (paramObj) {
        window.open(paramObj);
    });
}

/* 查看商品信息 */
function viewProduct(product_id, skuproduct_id) {
    if (!pageVariable.viewProdCtrl) {
        pageVariable.viewProdCtrl = new bizcontrol.viewproduct();
    }
    if (pageVariable.viewProdCtrl.viewProdDialog) {
        pageVariable.viewProdCtrl.viewProdDialog.close();
    }
    pageVariable.viewProdCtrl.show(product_id, skuproduct_id);
}
/* 查看商品信息 */
function viewSSProduct(ss_product_id, ss_innerprod_id) {
    if (!pageVariable.viewSSProdCtrl) {
        pageVariable.viewSSProdCtrl = new bizcontrol.viewssproduct();
    }
    if (pageVariable.viewSSProdCtrl.viewProdDialog) {
        pageVariable.viewSSProdCtrl.viewProdDialog.close();
    }
    pageVariable.viewSSProdCtrl.show(ss_product_id, ss_innerprod_id);
}
/* 查看供应商 */
function openViewSuppFrm(key) {
    if (!pageVariable.openViewSuppFrmFrm) {
        pageVariable.openViewSuppFrmFrm = new bizcontrol.viewsupplier();
    }

    pageVariable.openViewSuppFrmFrm.show(key);
}
/*  */
function viewPurchaseOrder(key) {
    if (!pageVariable.viewPurchaseOrderFrm) {
        pageVariable.viewPurchaseOrderFrm = new bizcontrol.viewpurchaseorder();
    }

    pageVariable.viewPurchaseOrderFrm.show(key);
}
/* 查看财务支出 */
function viewAccountOut(key) {
    if (!pageVariable.viewAccountOutFrm) {
        pageVariable.viewAccountOutFrm = new bizcontrol.viewaccountoutrecord();
    }
    pageVariable.viewAccountOutFrm.show(key);
}
/* 查看财务收入 */
function viewReceiveIn(key) {
    if (!pageVariable.viewAIRFrm) {
        pageVariable.viewAIRFrm = new bizcontrol.viewaccountinrecord();
    }
    pageVariable.viewAIRFrm.show(key);
}
/* 打开导出采购商品选项 */
function openExportAllPOProdFrm(key) {
    if (!pageVariable.exportPOProdFrm) {
        pageVariable.exportPOProdFrm = new uicontrol.dialog("exportPOProdFrm", "", { width: 800, position: ["auto", 50] }, exportPOProdList);
    }

    pageVariable.exportPOProdFrm.action = "exportallpoprod";
    pageVariable.exportPOProdFrm.setTitle(mlm.C0987 + mlm.C0734);
    pageVariable.exportPOProdFrm.show(key);
}
/* 打开导出未签收的采购商品选项 */
function openExportUnReceivePOProdFrm(key) {
    if (!pageVariable.exportPOProdFrm) {
        pageVariable.exportPOProdFrm = new uicontrol.dialog("exportPOProdFrm", "", { width: 800, position: ["auto", 50] }, exportPOProdList);
    }

    pageVariable.exportPOProdFrm.action = "exportunreceivepoprod";
    pageVariable.exportPOProdFrm.setTitle(mlm.C1656);
    pageVariable.exportPOProdFrm.show(key);
}
/* 导出采购商品 */
function exportPOProdList() {
    var m_purchaseorder = new pom.purchaseorder();
    m_purchaseorder.PurchaseOrder_Id = pageVariable.handlePOFrm.purchaseorder_id; ;
    m_purchaseorder.HasPicture = $("#exportpooption").val();

    var exportoptions = $("input[name='exportpooption']");
    $.each(exportoptions, function () {
        if (this.checked) {
            m_purchaseorder.HasPicture = $(this).val();
        }
    });

    if (pageVariable.exportPOProdFrm.action == "exportallpoprod") {
        m_purchaseorder.exportPOProdList(function (paramObj) {
            window.open(paramObj);

            pageVariable.exportPOProdFrm.close();
        });
    }
    else {
        m_purchaseorder.exportPOUnRevProdList(function (paramObj) {
            window.open(paramObj);

            pageVariable.exportPOProdFrm.close();
        });
    }
}
/* 导出待签收商品 */
function exportUnRevProdList() {
    var m_purchaseorder = new pom.purchaseorder();

    m_purchaseorder = $.extend(m_purchaseorder, pageVariable.querycondition);

    m_purchaseorder.exportUnRevProdList(function (paramObj) {
        window.open(paramObj);
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* ECMS-财务统计分析 */
    document.title = "ECMS-" + mlm.M0055;

    /* 采购计划&执行 */
    $("#lbPurchasePlan").text(mlm.C1566);
    /* 采购订单 */
    $("#lbPurchaseOrder").text(mlm.C1393);
    /* 采购计划&执行列表 */
    $("#lbPurchasePlanTitle").text(mlm.C1566 + mlm.C0463);
    /* 查询商品 */
    $("#btQueryPPProd").val(mlm.C0171);
    /* 新增采购请求 */
    $("#btAddPPProd").val(mlm.C0461 + mlm.C1543);
    /* 导出采购计划 */
    $("#btExportPP").val(mlm.C0987 + mlm.C1572);
    /* 导入采购计划 */
    $("#btImportPP").val(mlm.C0986 + mlm.C1572);
    /* 采购订单列表 */
    $("#lbPOTitle").text(mlm.C1393 + mlm.C0463);
    /* 新增采购订单 */
    $("#btNewPO").val(mlm.C0461 + mlm.C1393);
    /* 商品分类 */
    $("#lbPdcSymbol, #lbQPdcSymbol").text(mlm.C0090 + ":");
    /* 商品关键字 */
    $("#lbProdKeySymbol, #lbQProdKeySymbol").text(mlm.C0734 + mlm.C0184 + ":");
    /* 商品 */
    $("#lbProdSymbol").text(mlm.C0734 + ":");
    /* 采购请求数 */
    $("#lbPPProdQtySymbol").text(mlm.C1568 + ":");
    /* 供应商 */
    $("#lbPOSupplierSymbol").text(mlm.C1069 + ":");
    /* 入库仓库 */
    $("#lbPOWarehouseSymbol, #lbQWHSymbol").text(mlm.C1202 + ":");
    /* 采购日期 */
    $("#lbCreateTimeSymbol").text(mlm.C1569 + ":");
    /* 预计到货日期 */
    $("#lbPOEstimateArriveTimeSymbol").text(mlm.C1467 + ":"); 
    /* 交货方式 */
    $("#lbPORevType, #ddlQPORevTypeSymbol").text(mlm.C1570 + ":");
    /* 交货地址 */
    $("#lbPORevRemarkSymbol").text(mlm.C1599 + ":");
    /* 备注 */
    $("#lbPORemarkSymbol, #lbCloseRemarkSymbol").text(mlm.C0073 + ":");
    /* 商品列表 */
    $("#lbPOProdTitle").text(mlm.C0168);
    /* 添加商品 */
    $("#btAddProd").val(mlm.C0530 + mlm.C0734);
    /* 其他费用 */
    $("#lbOtherChargeSymbol").text(mlm.C0789 + ":");
    /* 采购金额 */
    $("#lbTotalPriceSymbol").text(mlm.C1571 + ":");
    /* 查询订单 */
    $("#btQueryPO").val(mlm.C1504);
    /* 订单关键字 */
    $("#lbQSuppKeySymbol").text(mlm.C1505 + mlm.C0184 + ":");
    /* 产品关键字 */
    $("#lbQProdKeySymbol").text(mlm.C0734 + mlm.C0184 + ":");
    /* 采购订单号 */
    $("#lbQPOCodeSymbol").text(mlm.C0893 + ":");
    /* 销售日期 */
    $("#lbQCreateTimeSymbol").text(mlm.C1490 + ":"); 
    /* 到 */
    $("#lbQToSymbol").text(mlm.C0412); 
    /* 状态 */
    $("#lbQPOStateSymbol").text(mlm.C0367 + ":");
    /* 生成采购计划 */
    $("#btGeneratePPProd").val(mlm.C1592);
    /* 订单类型 */
    $("#lbQPOTypeSymbol").text(mlm.C1596 + ":"); 
    /* 现场采购&发货 */
    $("#btHDPurchase").val(mlm.C1600);
    /* 导出处理清单 */
    $("#btExportPOForHD").text(mlm.C0987 + mlm.C1601);
    /* 导入处理清单 */
    $("#btImportPOForHD").text(mlm.C0986 + mlm.C1601);
    /* 导出历史采购记录 */
    $("#btExportPOProd").val(mlm.C1654);
    /* 导出待签收商品 */
    $("#btExportUnRevPO").val(mlm.C0987 + mlm.C1658); 
    /* 生成待采购商品 */
    $("#btGenerateProd").val(mlm.C1655);
    /* 导出商品 */
    $("#btExportPOAllProd").val(mlm.C0987 + mlm.C0734);
    /* 导出备货清单 */
    $("#btExportPOUnReceiveProd").val(mlm.C1656); 
    /* 是否导出图片 */
    $("#lbPOOptionSymbol").text(mlm.C1657);
    $("#lbExportOption_1").text(mlm.C0108); 
    $("#lbExportOption_2").text(mlm.C0109);

    /* 清理未交付产品 */
    $("#btClearPOProd").val("清理未交付产品"); 

    /* 导入文件 */
    $("#lbImportFileSymbol, #lbCheckFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
}