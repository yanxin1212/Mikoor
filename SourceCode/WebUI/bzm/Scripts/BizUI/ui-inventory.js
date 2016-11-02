/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadWarehouse);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btNewWarehouse").click(openNewWarehouseFrm);
    $("#btModifyWarehouse").click(openModifyWarehouseFrm);
    $("#btDeleteWarehouse").click(openDelWarehouseFrm);
    $("#btMoveupWarehouse").click(moveupWarehouse);
    $("#btMovedownWarehouse").click(movedownWarehouse);
    $("#btInStock").click(openInStockFrm);
    $("#btOutStock").click(openOutStockFrm);
    $("#btTransfer").click(openTransferStockFrm);
    $("#btQueryInventory").click(openQueryInventory); 
    $("#moveRecordTag").click(loadInOutStock);
    $("#btQueryIOStock").click(openQueryInOutStockFrm);
    $("#btExportInventory").click(exportInventory);
    $("#btExportSkuInventory").click(exportSkuInventory);
    $("#btExportIOStock").click(exportInOutStock);
    $("#btImportInitInventory").click(openImportSO);

    $("#btManageWarehouse, #btExportInventory, #btManageInventory, #btAddInStockProd, #btQueryInventory, #btQueryIOStock, #btExportIOStock, #btImportInitInventory, #btExportSkuInventory").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

    pageframe.control.multiButtion.init("btManageInventory", "dvMInventory");
    pageframe.control.multiButtion.init("btManageWarehouse", "dvMWarehouse");

    pageVariable.isLoadInOutStock = true;
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#warehouseFrm, #inventoryFrm").css("height", mainFormHeight + 15);

    var m_width = $("#warehouseFrm")[0].offsetWidth + 15;
    $("#inventoryFrm").css("width", pageframe.layout.width - m_width);
}

/* 加载仓库 */
function loadWarehouse(event) {
    var m_warehouse = new whm.warehouse();
    m_warehouse.getAllWarehouses(function (retTable) {
        pageVariable.warehouseTree = new uicontrol.treeView($("#warehouseTree"), retTable, function () {
            constructInvQueryCondition();
            pageVariable.invQueryCondtion.Warehouse_Ids = [];
            if (pageVariable.warehouseTree.selectedItem) {
                pageVariable.invQueryCondtion.Warehouse_Ids.push(pageVariable.warehouseTree.selectedItem.key);
            }
            queryInventory(1, pageVariable.inventoryList.pageNumber);
        },
                                                        { displayModel: "tree", sourceFormat: "table",
                                                            keyColumn: "Warehouse_Id", parentKeyColumn: "ParentWarehouse_Id", displayColumn: "WarehouseName",
                                                            constructDisplayTxt: null
                                                        });
        pageVariable.warehouseTree.loadSource();

        if (event) {
            event();
        }
        loadInventory();
    });
}
/* 加载商品库存 */
function loadInventory() {
    if (!pageVariable.inventoryList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
        pageVariable.inventoryList = new uicontrol.tableList("inventoryList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "Product_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryInventory,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C0734, name: "ProdName", width: 375, align: 'left', adjust: true, createCell: constructProdNameCell },
                                                   { display: mlm.C1196, name: "WarehouseNames", width: 200, align: 'left' },
                                                   { display: mlm.C0634, name: "Qty", width: 90, align: 'right', adjust: true, createCell: constructInventoryQtyCell },
                                                   { display: mlm.C0019, name: "", width: 90, align: 'center', adjust: true, createCell: constructProdOperaCell}]
                                     });
    }

    pageVariable.inventoryList.bindDataSource(null);
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

    return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
}
/* 构建商品名称列 */
function constructProdNameCell(key, cellValue) {

    var m_obj = this.keyObj;

    var m_html_items = [];

    m_html_items.push("<div style='padding: 0px'><a onclick='viewProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a></div>");
    if (Number(m_obj.SkuProdCount) > 1) {
        m_html_items.push("<div style='margin: 2px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.SkuProdCount + mlm.C1066 + "</div>");
    }

    return m_html_items.join("");
}
/* 构建Sku商品列 */
function constructSkuProdCell(key, cellValue) {
    var m_str = this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]";
    return "<div style='padding: 0px'><a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + m_str + "</a></div>";
}
/* 构建库存数量列 */
function constructInventoryQtyCell(key, cellValue) {
    var m_obj = this.keyObj;

    return "<span>" + Number(cellValue) + "</span> <span>" + m_obj.Unit + "</span>";
}
/* 创建库存操作列 */
function constructProdOperaCell(key, cellvalue) {
    return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openViewSkuInventory.call(this);'>" + mlm.C1262 + "</a>";
}
/* 打开查询库存的窗体 */
function openQueryInventory() {
    if (!pageVariable.queryInventoryFrm) {
        pageVariable.queryInventoryFrm = new uicontrol.dialog("queryInventoryFrm", mlm.C0562 + mlm.C1193, { width: 800, position: ["auto", 15] }, function () {
            constructInvQueryCondition();
            queryInventory(1, pageVariable.inventoryList.pageNumber);

            if (pageVariable.selWarehouse_q.warehouse_id && Number(pageVariable.selWarehouse_q.warehouse_id) > 0) {
                pageVariable.warehouseTree.selTvItem(pageVariable.selWarehouse_q.warehouse_id);
            }
            else {
                pageVariable.warehouseTree.clearSelectedItem();
            }
        });

        pageVariable.selWarehouse_q = new bizcontrol.selectwarehouse($("#selWarehouse_q"));
        pageVariable.selQueryPdc = new bizcontrol.selectpdc($("#selQueryPdc"));
        pageVariable.selBrand_q = new bizcontrol.selectbrand($("#selBrand_q"));
    }

    if (pageVariable.warehouseTree.selectedItem) {
        pageVariable.selWarehouse_q.setWarehouse({ Warehouse_Id: pageVariable.warehouseTree.selectedItem.key, WarehouseName: pageVariable.warehouseTree.selectedItem.tag.WarehouseName });
    }

    pageVariable.queryInventoryFrm.show();
}
/* 构建商品库存查询条件 */
function constructInvQueryCondition() {
    if (!pageVariable.invQueryCondtion) {
        pageVariable.invQueryCondtion = {};
    }

    pageVariable.invQueryCondtion.Warehouse_Ids = [];
    if (pageVariable.selWarehouse_q) {
        pageVariable.invQueryCondtion.Warehouse_Ids.push(pageVariable.selWarehouse_q.warehouse_id);
    }
    pageVariable.invQueryCondtion.Key = $.trim($("#txtKeyWord_q").val());

    pageVariable.invQueryCondtion.PdcIds = [];
    if (pageVariable.selQueryPdc) {
        if (pageVariable.selQueryPdc.pdcId instanceof Array) {
            $.each(pageVariable.selQueryPdc.pdcId, function () {
                pageVariable.invQueryCondtion.PdcIds.push(this.toString());
            });
        }
        else {
            if (pageVariable.selQueryPdc.pdcId) {
                pageVariable.invQueryCondtion.PdcIds.push(pageVariable.selQueryPdc.pdcId.toString());
            }
        }
    }

    pageVariable.invQueryCondtion.BrandId = 0;
    if (pageVariable.selBrand_q) {
        pageVariable.invQueryCondtion.BrandId = pageVariable.selBrand_q.brandId;
    }
}
/* 查询商品库存 */
function queryInventory(page, pagenum) {
    
    var m_inventory = new whm.inventory();
    m_inventory.Warehouse_Ids = pageVariable.invQueryCondtion.Warehouse_Ids;
    m_inventory.Key = pageVariable.invQueryCondtion.Key;
    m_inventory.PdcIds = pageVariable.invQueryCondtion.PdcIds;
    m_inventory.BrandId = pageVariable.invQueryCondtion.BrandId;
    m_inventory.Page = page;
    m_inventory.PageNum = pagenum;
    m_inventory.queryProdInventory(function (retTable) {
        pageVariable.inventoryList.bindDataSource(retTable);

        if (pageVariable.queryInventoryFrm) {
            pageVariable.queryInventoryFrm.close();
        }
    });
}
/* 导出商品库存 */
function exportInventory() {

    constructInvQueryCondition();

    var m_inventory = new whm.inventory();
    m_inventory.Warehouse_Ids = pageVariable.invQueryCondtion.Warehouse_Ids;
    m_inventory.Key = pageVariable.invQueryCondtion.Key;
    m_inventory.SkuProdCode = pageVariable.invQueryCondtion.SkuProdCode;
    m_inventory.PdcIds = pageVariable.invQueryCondtion.PdcIds;
    m_inventory.BrandId = pageVariable.invQueryCondtion.BrandId;
    m_inventory.PropValueIds = pageVariable.invQueryCondtion.PropValueIds;
    m_inventory.ProdState = pageVariable.invQueryCondtion.ProdState;
    m_inventory.exportInventory(function (paramObj) {
        window.open(paramObj);
    });
}
/* 导出商品Sku库存 */
function exportSkuInventory() {
    var m_inventory = new whm.inventory();
    m_inventory.Warehouse_Ids = pageVariable.invQueryCondtion.Warehouse_Ids;
    m_inventory.Product_Id = pageVariable.viewSkuInventory.product_id;
    m_inventory.exportInventory(function (paramObj) {
        window.open(paramObj);
    });
}

/* 打开查看Sku库存窗体 */
function openViewSkuInventory() {
    if (!pageVariable.viewSkuInventory) {
        pageVariable.viewSkuInventory = new uicontrol.dialog("viewSkuInventory", mlm.C0672 + mlm.C1263, { width: 998, position: ["auto", 25] });

        pageVariable.skuinventoryList = new uicontrol.tableList("skuinventoryList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "Inventory_Id",
                                         height: 450,
                                         pageQueryHandler: querySkuInventory,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C1162, name: "", width: 400, align: 'left', adjust: true, createCell: constructSkuProdCell },
                                                   { display: mlm.C1196, name: "WarehouseName", width: 150, align: 'left' },
                                                   { display: mlm.C0634, name: "Qty", width: 90, align: 'right', adjust: true, createCell: constructInventoryQtyCell }]
                                     });
    }

    pageVariable.viewSkuInventory.product_id = $(this).attr("tag");
    querySkuInventory(1, pageVariable.skuinventoryList.pageNumber);

    pageVariable.viewSkuInventory.show();
}
/* 查询sku库存 */
function querySkuInventory(page, pagenum) {
    var m_inventory = new whm.inventory();
    m_inventory.Product_Id = pageVariable.viewSkuInventory.product_id;
    if (pageVariable.invQueryCondtion) {
        m_inventory.Warehouse_Ids = pageVariable.invQueryCondtion.Warehouse_Ids;
    }
    m_inventory.Page = page;
    m_inventory.PageNum = pagenum;
    m_inventory.queryInventory(function (retTable) {
        pageVariable.skuinventoryList.bindDataSource(retTable);

        if (pageVariable.queryInventoryFrm) {
            pageVariable.queryInventoryFrm.close();
        }
    });
}

/* 初始化出入库窗体 */
function initInOutStockFrm() {
    if (!pageVariable.handlerstockFrm) {
        pageVariable.handlerstockFrm = new uicontrol.dialog("handlerstockFrm", "", { width: 900, position: ["auto", 15] }, saveStock);

        pageVariable.selectToWH = new bizcontrol.selectwarehouse($("#selectToWH"));
        pageVariable.selectFromWH = new bizcontrol.selectwarehouse($("#selectFromWH"));
        $("#btAddInStockProd").click(openSelectStockProdFrm);

        $("#txtRelObj").change(function () {
            var m_type = $("#ddlStockInType").val();
            if (m_type == "1") {

                var m_purchaseorder = new pom.purchaseorder();
                m_purchaseorder.POCode = $.trim($("#txtRelObj").val());
                if (!m_purchaseorder.POCode) {
                    pageVariable.receiveRetProdList.bindDataSource(null);
                    return;
                }

                m_purchaseorder.getProductsByPOForRev(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                    if (m_jsonobjs.length == 0) {
                        pageframe.control.alertDialog.showAlertInfo(mlm.C1547);
                        $("#txtRelObj").val("");
                        pageVariable.receiveRetProdList.bindDataSource(null);
                        return;
                    }
                    else {
                        $.each(m_jsonobjs, function () {
                            if (this.SkuProps) {
                                this.InnerProd = this.SkuProdCode + " - " + this.ProdName + " - [" + this.SkuProps + "]";
                            }
                            else {
                                this.InnerProd = this.SkuProdCode + " - " + this.ProdName;
                            }
                            this.Qty = 0;
                        });

                        pageVariable.receiveRetProdList.bindDataSource(m_jsonobjs);
                    }
                });
            }
            else {

                var m_as_problem = new sm.as_problem();
                m_as_problem.ASPCode = $.trim($("#txtRelObj").val());
                if (!m_as_problem.ASPCode) {
                    pageframe.control.alertDialog.showAlertInfo(mlm.C1546 + mlm.C0713);
                    return;
                }
                m_as_problem.queryASProductForReceive(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                    if (m_jsonobjs.length == 0) {
                        pageframe.control.alertDialog.showAlertInfo(mlm.C1396);
                        $("#txtRelObj").val("");
                        pageVariable.receiveRetProdList.bindDataSource(null);
                        return;
                    }
                    else {
                        $.each(m_jsonobjs, function () {
                            if (this.SkuProps) {
                                this.InnerProd = this.SkuProdCode + " - " + this.ProdName + " - [" + this.SkuProps + "]";
                            }
                            else {
                                this.InnerProd = this.SkuProdCode + " - " + this.ProdName;
                            }
                            this.Unit = this.ProdUnit;
                            this.Qty = 0;
                        });

                        pageVariable.receiveRetProdList.bindDataSource(m_jsonobjs);
                    }
                });
            }
        });

        var m_stockintypeCtrl = $("#ddlStockInType");
        m_stockintypeCtrl.append("<option value='1'>" + mlm.C1394 + "</option>");
        m_stockintypeCtrl.append("<option value='2'>" + mlm.C1395 + "</option>");
        m_stockintypeCtrl.append("<option value='0'>" + mlm.C0627 + "</option>");
        m_stockintypeCtrl.change(function () {
            var m_type = $("#ddlStockInType").val();
            if (m_type == "1") {
                $("#lbRelObjSymbol").text(mlm.C0893 + ":");
                $("#dvStockIn").show();

                $("#dvRelObj").show();
                $("#dvOther").hide();
                $("#dvASPProd").show();
            }
            else if (m_type == "2") {
                $("#lbRelObjSymbol").text(mlm.C1546 + ":");
                $("#dvStockIn").show();

                $("#dvRelObj").show();
                $("#dvOther").hide();
                $("#dvASPProd").show();
            }
            else {
                $("#dvRelObj").hide();

                $("#dvOther").show();
                $("#dvASPProd").hide();
            }

            $("#txtRelObj").val("");
        });

        pageVariable.instockProdList = new uicontrol.tableList("instockProdList",
                                     { autoSeq: true,
                                         keyColumn: "SkuProduct_Id",
                                         height: 150,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C1162, name: "InnerProd", width: 320, align: 'left', adjust: true, createCell: constructInStockSkuProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 75, align: 'left', adjust: true, createCell: constructQtyCell },
                                                   { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, deletedFunc: "deleteSkuProd"}]
                                     });

        pageVariable.receiveRetProdList = new uicontrol.tableList("receiveRetProdList",
                                     { autoSeq: true,
                                         keyColumn: "SkuProduct_Id",
                                         height: 150,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C1162, name: "InnerProd", width: 320, align: 'left', adjust: true, createCell: constructInStockSkuProdCell },
                                                   { display: mlm.C1391, name: "HandleQty", width: 80, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1098, name: "Qty", width: 75, align: 'left', adjust: true, createCell: constructReceiveRetQtyCell }]
                                     });
    }

    pageVariable.selectToWH.clear();
    pageVariable.selectFromWH.clear();
    pageVariable.handlerstockFrm.show();

}
/* 打开入库的窗体 */
function openInStockFrm() {
    initInOutStockFrm();

    $("#dvFrom_2").show();
    $("#dvTo_2").hide();
    $("#ddlStockInType").trigger("change");
    $("#lbOperatedTimeSymbol").text(mlm.C1387);

    pageVariable.instockProdList.bindDataSource(null);
    pageVariable.receiveRetProdList.bindDataSource(null);

    pageVariable.handlerstockFrm.action = "in";
    pageVariable.handlerstockFrm.setTitle(mlm.C1188);
}
/* 打开出库的窗体 */
function openOutStockFrm() {
    initInOutStockFrm();

    $("#dvFrom_2").hide();
    $("#dvTo_2").show();
    $("#dvStockIn").hide();
    $("#dvOther").show(); 
    $("#dvASPProd").hide();
    $("#lbOperatedTimeSymbol").text(mlm.C1398);

    pageVariable.instockProdList.bindDataSource(null);

    pageVariable.handlerstockFrm.action = "out";
    pageVariable.handlerstockFrm.setTitle(mlm.C1189);
}
/* 打开转移库存的窗体 */
function openTransferStockFrm() {
    initInOutStockFrm();

    $("#dvFrom_2").show();
    $("#dvTo_1").hide();
    $("#dvTo_2").show();
    $("#dvStockIn").hide();
    $("#dvOther").show();
    $("#dvASPProd").hide();

    pageVariable.instockProdList.bindDataSource(null);

    pageVariable.handlerstockFrm.action = "transfer";
    pageVariable.handlerstockFrm.setTitle(mlm.C1190);
}
/* 构建Sku商品列 */
function constructInStockSkuProdCell(key, cellValue) {
    return "<div style='padding: 0px'><a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a></div>";
}
/* 构建库存数量列 */
function constructQtyCell(key, cellValue) {
    var m_obj = this.keyObj;

    return "<input type='text' class='text-input' style='width: 50px' onkeypress='uicontrol.func.checkInputNumber(event);' tag='" + key + "' value='" + cellValue + "' onchange='changeQty.call(this);' /> " + m_obj.Unit;
}
/* 改变库存数量 */
function changeQty() {
    var m_qty = $(this).val();
    if (!m_qty) {
        m_qty = 0;
        $(this).val("0");
    }
    var m_key = $(this).attr("tag");

    pageVariable.instockProdList.getItem(m_key).Qty = m_qty;
}
/* 构建数量列 */
function constructReceiveRetQtyCell(key, cellValue) {
    var m_obj = this.keyObj;

    return "<input type='text' class='text-input' style='width: 50px' onkeypress='uicontrol.func.checkInputNumber(event);' tag='" + key + "' value='" + cellValue + "' onchange='changeReceiveRetQty.call(this);' /> " + m_obj.Unit;
}
/* 改变数量 */
function changeReceiveRetQty() {

    var m_qty = $(this).val();
    if (!m_qty) {
        m_qty = 0;
        $(this).val("0");
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.receiveRetProdList.getItem(m_key);
    if (Number(m_qty) > Number(m_obj.HandleQty)) {
        pageframe.control.alertDialog.showAlertInfo("数量不允许大于待收数量");
        $(this).val(m_obj.Qty);
        return;
    }

    m_obj.Qty = m_qty;
}
/* 打开添加库存商品的窗体 */
function openSelectStockProdFrm() {
    if (!pageVariable.selectStockProdItem) {
        pageVariable.selectStockProdItem = new bizcontrol.selectproduct(addStockProd);
    }

    var m_selecteditems = new datastruct.dictionary();
    var m_items = pageVariable.instockProdList.dataSource.items.arrValues;
    $.each(m_items, function () {
        m_selecteditems.setItem(this.SkuProduct_Id, this);
    });
    pageVariable.selectStockProdItem.show(m_selecteditems);
}
/* 添加库存商品 */
function addStockProd(selectedskuprods) {
    pageVariable.instockProdList.bindDataSource(null);
    $.each(selectedskuprods, function () {
        var m_proditem = {};
        m_proditem.SkuProduct_Id = this.SkuProduct_Id;
        if (this.SkuProps) {
            m_proditem.InnerProd = this.ProdCode + " - " + this.Product.ProdName + " - [" + this.SkuProps + "]";
        }
        else {
            m_proditem.InnerProd = this.ProdCode + " - " + this.Product.ProdName;
        }
        m_proditem.BrowsePicUrl = this.BrowsePicUrl;
        m_proditem.ProdCode = this.ProdCode;
        m_proditem.SkuProps = this.SkuProps;
        m_proditem.Qty = 1;
        m_proditem.Unit = this.Product.Unit;
        m_proditem.Product_Id = this.Product.Product_Id;
        pageVariable.instockProdList.addData(m_proditem.SkuProduct_Id, m_proditem);
    });
}
/* 删除商品 */
function deleteSkuProd() {
    var m_key = $(this).attr("tag");
    pageVariable.instockProdList.deleteData(m_key);
}
/* 商品出入库 */
function saveStock() {
    var m_warehouse_ids = [];
    var m_skuproduct_ids = [];

    var m_inoutstock = new whm.inoutstock();
    m_inoutstock.Remark = $.trim($("#txtRemark").val());

    var m_skuproducts = null;
    if (pageVariable.handlerstockFrm.action == "in") {

        m_inoutstock.StockInType = $("#ddlStockInType").val();

        var m_skuproducts = null;
        if (m_inoutstock.StockInType == "0") {
            m_skuproducts = pageVariable.instockProdList.dataSource.items.arrValues;
        }
        else if (m_inoutstock.StockInType == "1") {
            m_skuproducts = pageVariable.receiveRetProdList.dataSource.items.arrValues;
            m_inoutstock.PurchaseOrder_Id = m_skuproducts[0].PurchaseOrder_Id;
            m_inoutstock.POCode = $("#txtRelObj").val();
        }
        else if (m_inoutstock.StockInType == "2") {
            m_skuproducts = pageVariable.receiveRetProdList.dataSource.items.arrValues;
            m_inoutstock.AS_Problem_Id = m_skuproducts[0].AS_Problem_Id;
            m_inoutstock.ASPCode = $("#txtRelObj").val();
        }

        var m_qty = 0;
        $.each(m_skuproducts, function () {
            m_qty += Number(this.Qty);
        });
        if (m_qty == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1390 + mlm.C1351);
            return;
        }

        m_inoutstock.Action = 1;
        m_inoutstock.To_Warehouse_Id = pageVariable.selectToWH.warehouse_id;
        if (!m_inoutstock.To_Warehouse_Id) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1202 + mlm.C0451);
            return;
        }

        m_warehouse_ids.push(m_inoutstock.To_Warehouse_Id.toString());
    }
    else if (pageVariable.handlerstockFrm.action == "out") {

        m_skuproducts = pageVariable.instockProdList.dataSource.items.arrValues;
        var m_qty = 0;
        $.each(m_skuproducts, function () {
            m_qty += Number(this.Qty);
        });
        if (m_qty == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1399 + mlm.C1351);
            return;
        }

        m_inoutstock.Action = 2;
        m_inoutstock.From_Warehouse_Id = pageVariable.selectFromWH.warehouse_id;
        if (!m_inoutstock.From_Warehouse_Id) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1203 + mlm.C0451);
            return;
        }

        m_warehouse_ids.push(m_inoutstock.From_Warehouse_Id.toString());
    }
    else {

        m_skuproducts = pageVariable.instockProdList.dataSource.items.arrValues;
        var m_qty = 0;
        $.each(m_skuproducts, function () {
            m_qty += Number(this.Qty);
        });
        if (m_qty == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1400 + mlm.C1351);
            return;
        }

        m_inoutstock.Action = 3;

        m_inoutstock.From_Warehouse_Id = pageVariable.selectFromWH.warehouse_id;
        if (!m_inoutstock.From_Warehouse_Id) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1203 + mlm.C0451);
            return;
        }

        m_inoutstock.To_Warehouse_Id = pageVariable.selectToWH.warehouse_id;
        if (!m_inoutstock.To_Warehouse_Id) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1202 + mlm.C0451);
            return;
        }

        if (m_inoutstock.From_Warehouse_Id == m_inoutstock.To_Warehouse_Id) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1206);
            return;
        }

        m_warehouse_ids.push(m_inoutstock.To_Warehouse_Id.toString());
        m_warehouse_ids.push(m_inoutstock.From_Warehouse_Id.toString());
    }

    m_inoutstock.Items = m_skuproducts;
    $.each(m_skuproducts, function () {
        m_skuproduct_ids.push(this.SkuProduct_Id.toString());
    });

    m_inoutstock.handlerInOutStock(function () {
        pageVariable.inventoryList.bindDataSource(null);
        pageVariable.isLoadInOutStock = true;
        pageVariable.handlerstockFrm.close();
    });
}

/* 加载商品出入库记录 */
function loadInOutStock() {
    if (!pageVariable.instockList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
        pageVariable.instockList = new uicontrol.tableList("instockList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "InOutStock_Item_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryInventory,
                                         columns: [{ display: mlm.C1397, name: "OperatedTimeStr", width: 75, align: 'left', adjust: true, createCell: constructOperatedTimeCell },
                                                   { display: mlm.C1401, name: "Action", width: 100, align: 'left', adjust: true, createCell: constructActionCell },
                                                   { display: mlm.C1377, name: "", width: 100, align: 'left', adjust: true, createCell: constructRelObjCell },
                                                   { display: mlm.C1196, name: "", width: 270, align: 'left', adjust: true, createCell: constructWarehouseCell },
                                                   { display: mlm.C1162, name: "ProdName", width: 310, align: 'left', adjust: true, createCell: constructSkuProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 80, align: 'right', adjust: true, createCell: constructInventoryQtyCell },
                                                   { display: mlm.C0501, name: "FullName", width: 100, align: 'left'}]
                                     });
    }

    if (pageVariable.isLoadInOutStock) {
        pageVariable.inoutstockCondition = {};
        queryInOutStock(1, pageVariable.instockList.pageNumber);
        pageVariable.isLoadInOutStock = false;
    }
} 
/* 构建动作列 */
function constructActionCell(key, cellValue) {
    var m_arr = [];
    if (cellValue == "1") {
        
        if (this.keyObj.StockInType == "1") {
            m_arr.push(mlm.C1394);
        }
        else if (this.keyObj.StockInType == "2") {
            m_arr.push(mlm.C1395);
        }
        else {
            m_arr.push(mlm.C1188);
        }
    }
    else if (cellValue == "2") {
        m_arr.push(mlm.C1189);
    }
    else {
        m_arr.push(mlm.C1190);
    }

    return m_arr.join("");
}
/* 构建仓库列 */
function constructWarehouseCell(key, cellValue) {
    if (this.keyObj.FromWarehouse) {
        if (this.keyObj.ToWarehouse) {
            return "<span>" + this.keyObj.FromWarehouse + "->" + this.keyObj.ToWarehouse + "</span>";
        }
        else {
            return "<span>" + this.keyObj.FromWarehouse + "</span>";
        }
    }
    else {
        if (this.keyObj.ToWarehouse) {
            return "<span>" + this.keyObj.ToWarehouse + "</span>";
        }
    }
}
/* 构造日期列 */
function constructOperatedTimeCell(key, cellValue) {
    var date = new Date(cellValue);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
/*  */
function constructRelObjCell(key, cellValue) {
    if (this.keyObj.POCode) {
        return this.keyObj.POCode;
    }
    else {
        return this.keyObj.ASPCode;
    }
}
/* 查询商品出入库记录 */
function queryInOutStock(page, pagenum) {
    var m_inoutstock = new whm.inoutstock();
    m_inoutstock.Page = page;
    m_inoutstock.PageNum = pagenum;
    m_inoutstock.Warehouse_Id = pageVariable.inoutstockCondition.Warehouse_Id;
    m_inoutstock.SkuProdCode = pageVariable.inoutstockCondition.SkuProdCode;
    m_inoutstock.FromTime = pageVariable.inoutstockCondition.FromTime;
    m_inoutstock.ToTime = pageVariable.inoutstockCondition.ToTime;
    m_inoutstock.SIOType = pageVariable.inoutstockCondition.SIOType;
    m_inoutstock.RelObj = pageVariable.inoutstockCondition.RelObj;
    m_inoutstock.queryInOutStock(function (retTable) {
        pageVariable.instockList.bindDataSource(retTable);

        if (pageVariable.queryInOutStockFrm) {
            pageVariable.queryInOutStockFrm.close();
        }
    });
}

/* 导出出入库记录 */
function exportInOutStock() {
    var m_inoutstock = new whm.inoutstock();
    m_inoutstock.Warehouse_Id = pageVariable.inoutstockCondition.Warehouse_Id;
    m_inoutstock.SkuProdCode = pageVariable.inoutstockCondition.SkuProdCode;
    m_inoutstock.FromTime = pageVariable.inoutstockCondition.FromTime;
    m_inoutstock.ToTime = pageVariable.inoutstockCondition.ToTime;
    m_inoutstock.exportInOutStock(function (paramObj) {
        window.open(paramObj);
    });
}
/*  打开导入初始化库存的窗体 */
function openImportSO() {
    if (!pageVariable.handlerImportInventoryFrm) {
        pageVariable.handlerImportInventoryFrm = new uicontrol.dialog("handlerImportFrm", mlm.C0986 + mlm.C1236, { width: 800 }, importInitInventory);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportInventoryFrm.show();
}
/* 导入初始化库存 */
function importInitInventory() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    var m_inventory = new whm.inventory();
    m_inventory.importInitInventory(pageVariable.importFile, function (retObj) {
        if (retObj) {
            window.open(retObj);
        }

        queryInventory(1, pageVariable.inventoryList.pageNumber);

        pageVariable.handlerImportInventoryFrm.close();
    });
}

/* 打开查询出入库记录的窗体 */
function openQueryInOutStockFrm() {
    if (!pageVariable.queryInOutStockFrm) {
        pageVariable.queryInOutStockFrm = new uicontrol.dialog("queryInOutStockFrm", mlm.C0562 + mlm.C1192, { width: 800, position: ["auto", 15] }, function () {

            if (!pageVariable.inoutstockCondition) {
                pageVariable.inoutstockCondition = {};
            }
            pageVariable.inoutstockCondition.Warehouse_Id = pageVariable.selWarehouse_q_io.Warehouse_Id;
            pageVariable.inoutstockCondition.SkuProdCode = $.trim($("#txtSkuProdCode_q").val());
            pageVariable.inoutstockCondition.FromTime = $("#txtFromTime").val();
            pageVariable.inoutstockCondition.ToTime = $("#txtToTime").val();
            pageVariable.inoutstockCondition.SIOType = $("#ddlQSIOType").val();
            pageVariable.inoutstockCondition.RelObj = $.trim($("#txtQRelObj").val());

            queryInOutStock(1, pageVariable.instockList.pageNumber);
        });

        pageVariable.selWarehouse_q_io = new bizcontrol.selectwarehouse($("#selWarehouse_q_io"));

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtFromTime").datepicker();
        $("#txtToTime").datepicker();
        $("#txtToTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        var m_siotypeCtrl = $("#ddlQSIOType");
        m_siotypeCtrl.append("<option value='-1'></option>");
        m_siotypeCtrl.append("<option value='1'>" + mlm.C1394 + "</option>");
        m_siotypeCtrl.append("<option value='2'>" + mlm.C1395 + "</option>");
        m_siotypeCtrl.append("<option value='0'>" + mlm.C1188 + "</option>");
        m_siotypeCtrl.append("<option value='20'>" + mlm.C1189 + "</option>");
        m_siotypeCtrl.append("<option value='30'>" + mlm.C1190 + "</option>");
    }

    pageVariable.queryInOutStockFrm.show();
}

/* 打开新增仓库的窗体 */
function openNewWarehouseFrm() {
    if (!pageVariable.handlerWarehouseFrm) {
        pageVariable.handlerWarehouseFrm = new uicontrol.dialog("handlerWarehouseFrm", "", { width: 800, position: ["auto", 15] }, saveWarehouse);

        pageVariable.selectParentWH = new bizcontrol.selectwarehouse($("#selectParentWH"), function () {
            if (!pageVariable.selectParentWH.Warehouse_Id || pageVariable.selectParentWH.Warehouse_Id == "0") {
                $("#dvArea").show();
            }
            else {
                $("#dvArea").hide();
            }
        });
        pageVariable.ddlGlobalArea = new bizcontrol.selectglobalarea("ddlGlobalArea", true);
    }
    
    $("#txtWarehouse").val("");
    $("#txtWHAddress").val("");
    var m_parentWH = pageVariable.warehouseTree.selectedItem;
    if (m_parentWH) {
        pageVariable.selectParentWH.setWarehouse({ Warehouse_Id: m_parentWH.key, WarehouseName: m_parentWH.tag.WarehouseName });
        $("#dvArea").hide();
    }
    else {
        $("#dvArea").show();
    }

    pageVariable.handlerWarehouseFrm.warehouse_id = 0;
    pageVariable.handlerWarehouseFrm.action = "New";
    pageVariable.handlerWarehouseFrm.setTitle(mlm.C0461 + mlm.C1196);
    pageVariable.handlerWarehouseFrm.show();
}
/* 打开修改仓库的窗体 */
function openModifyWarehouseFrm() {
    if (!pageVariable.handlerWarehouseFrm) {
        pageVariable.handlerWarehouseFrm = new uicontrol.dialog("handlerWarehouseFrm", "", { width: 800, position: ["auto", 15] }, saveWarehouse);

        pageVariable.selectParentWH = new bizcontrol.selectwarehouse($("#selectParentWH"), function (retObj) {
            if (pageVariable.selectParentWH.warehouse_id && pageVariable.selectParentWH.warehouse_id != "0") {
                $("#dvArea").hide();
            }
            else {
                $("#dvArea").show();
            }
        });
        pageVariable.ddlGlobalArea = new bizcontrol.selectglobalarea("ddlGlobalArea", true);
    }

    var m_warehouse = pageVariable.warehouseTree.selectedItem;
    if (!m_warehouse) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1212);
        return;
    }

    $("#txtWarehouse").val(m_warehouse.tag.WarehouseName);
    $("#txtWHAddress").val(m_warehouse.tag.WHAddress);

    if (m_warehouse.tag.GlobalArea_Id && m_warehouse.tag.GlobalArea_Id != "0") {
        pageVariable.ddlGlobalArea.setObj({ globalAreaNames: m_warehouse.tag.GlobalAreaName, globalArea_Ids: m_warehouse.tag.GlobalArea_Id });
    }
    else {
        pageVariable.ddlGlobalArea.clear();
    }

    var m_parentwarehouse_id = m_warehouse.tag.ParentWarehouse_Id;
    if (m_parentwarehouse_id && m_parentwarehouse_id != "0") {
        pageVariable.selectParentWH.setWarehouse({ Warehouse_Id: m_parentwarehouse_id, WarehouseName: pageVariable.warehouseTree.getTextValue(m_parentwarehouse_id, true) });
        $("#dvArea").hide();
    }
    else {
        $("#dvArea").show();
    }

    pageVariable.handlerWarehouseFrm.warehouse_id = m_warehouse.tag.Warehouse_Id;
    pageVariable.handlerWarehouseFrm.action = "Modify";
    pageVariable.handlerWarehouseFrm.setTitle(mlm.C0061 + mlm.C1196);
    pageVariable.handlerWarehouseFrm.show();
}
/* 打开删除仓库的窗体 */
function openDelWarehouseFrm() {
    if (!pageVariable.delWarehouseFrm) {
        pageVariable.delWarehouseFrm = new uicontrol.confirmDelete(deleteWarehouse);
    }

    var m_warehouse = pageVariable.warehouseTree.selectedItem;
    if (!m_warehouse) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1212);
        return;
    }

    pageVariable.delWarehouseFrm.warehouse_Id = m_warehouse.key;
    pageVariable.delWarehouseFrm.showConfirm(mlm.C0464 + mlm.C1196 + "(" + m_warehouse.value + ") ?");
}
/* 保存仓库 */
function saveWarehouse() {
    var m_warehouseName = $.trim($("#txtWarehouse").val());
    if (!m_warehouseName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1196 + mlm.C0451);
        return;
    }

    var m_warehouse = new whm.warehouse();
    m_warehouse.WarehouseName = m_warehouseName;
    m_warehouse.WHAddress = $.trim($("#txtWHAddress").val());
    m_warehouse.Warehouse_Id = pageVariable.handlerWarehouseFrm.warehouse_id;
    m_warehouse.ParentWarehouse_Id = pageVariable.selectParentWH.warehouse_id;
    if (!m_warehouse.ParentWarehouse_Id) {
        m_warehouse.ParentWarehouse_Id = 0;
    }
    var m_oldParentWHId = 0;
    if (pageVariable.warehouseTree.selectedItem) {
        m_oldParentWHId = pageVariable.warehouseTree.selectedItem.parentKey;
    }

    var m_warehousename = "";
    if (m_warehouse.ParentWarehouse_Id == "0") {
        var m_areaObj = pageVariable.ddlGlobalArea.getObj();
        if (m_areaObj && m_areaObj.globalArea_Ids) {
            m_warehouse.GlobalArea_Id = m_areaObj.globalArea_Ids;
            m_warehousename = m_areaObj.globalAreaNames;
        }
        if (!m_warehouse.GlobalArea_Id || m_warehouse.GlobalArea_Id == "0") {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1277 + mlm.C0713);
            return;
        }
    }
    else {
        m_warehouse.GlobalArea_Id = 0;
    }

    if (pageVariable.handlerWarehouseFrm.action == "New") {
        m_warehouse.newWarehouse(function (retObj) {

            retObj.GlobalAreaName = m_warehousename;
            pageVariable.warehouseTree.addChildItem([{ key: retObj.Warehouse_Id, value: retObj.WarehouseName, parentKey: retObj.ParentWarehouse_Id, tag: retObj, children: []}]);

            clearWarehouseCtrl();

            pageVariable.handlerWarehouseFrm.close();

        });
    }
    else {
        if (m_oldParentWHId != m_warehouse.ParentWarehouse_Id) {
            if (m_oldParentWHId == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1270);
                return;
            }

            if (m_warehouse.ParentWarehouse_Id == "0") {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1271);
                return;
            }
        }
        m_warehouse.modifyWarehouse(function (retObj) {

            m_warehouse.GlobalAreaName = m_warehousename;
            if (m_oldParentWHId == m_warehouse.ParentWarehouse_Id) {
                pageVariable.warehouseTree.modifyChildItem(m_warehouse.Warehouse_Id, m_warehouse.WarehouseName, m_warehouse);
            }
            else {
                loadWarehouse(function () { pageVariable.warehouseTree.selTvItem(m_warehouse.Warehouse_Id); });
            }

            clearWarehouseCtrl();

            pageVariable.handlerWarehouseFrm.close();
        });
    }
}
/* 删除仓库 */
function deleteWarehouse() {
    var m_warehouse = new whm.warehouse();
    m_warehouse.Warehouse_Id = pageVariable.delWarehouseFrm.warehouse_Id;
    m_warehouse.deleteWarehouse(function () {

        loadWarehouse();

        clearWarehouseCtrl();
        pageVariable.delWarehouseFrm.close();
    });
}
/* 向上移动仓库 */
function moveupWarehouse() {
    var m_warehouse = pageVariable.warehouseTree.selectedItem;
    if (!m_warehouse) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1212);
        return;
    }

    var m_wh = new whm.warehouse();
    m_wh.Warehouse_Id = m_warehouse.key;
    m_wh.Direction = "0";
    m_wh.modifyWarehouseSeq(function () {
        loadWarehouse(function () { pageVariable.warehouseTree.selTvItem(m_warehouse.key); });
        clearWarehouseCtrl();
    });
}
/* 向下移动仓库 */
function movedownWarehouse() {
    var m_warehouse = pageVariable.warehouseTree.selectedItem;
    if (!m_warehouse) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1212);
        return;
    }

    var m_wh = new whm.warehouse();
    m_wh.Warehouse_Id = m_warehouse.key;
    m_wh.Direction = "1";
    m_wh.modifyWarehouseSeq(function () {
        loadWarehouse(function () { pageVariable.warehouseTree.selTvItem(m_warehouse.key); });
        clearWarehouseCtrl();
    });
}
/* 清理仓库控件 */
function clearWarehouseCtrl() {

    if (pageVariable.selectParentWH) {
        pageVariable.selectParentWH.warehouseSource = null;
    }
    if (pageVariable.selWarehouse_q) {
        pageVariable.selWarehouse_q.warehouseSource = null;
    }
    if (pageVariable.selectToWH) {
        pageVariable.selectToWH.warehouseSource = null;
    }
    if (pageVariable.selectFromWH) {
        pageVariable.selectFromWH.warehouseSource = null;
    }
    if (pageVariable.selWarehouse_q_io) {
        pageVariable.selWarehouse_q_io.warehouseSource = null;
    }
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

/* 填充语言资源 */
function fillPageLanRes() {

    /* 商品库存 */
    $("#lbInventoryTag").text(mlm.C1107);
    /* 出入库记录 */
    $("#lbMoveRecord").text(mlm.C1192);
    /* 商品库存列表 */
    $("#lbInventoryTitle").text(mlm.C1107 + mlm.C0463);
    /* 查询库存 */
    $("#btQueryInventory").val(mlm.C0562 + mlm.C1193);
    /* 商品出入库管理 */
    $("#btManageInventory").val(mlm.C1194);
    /* 导出商品库存 */
    $("#btExportInventory, #btExportSkuInventory").val(mlm.C0987 + mlm.C1107);
    /* 仓库管理 */
    $("#btManageWarehouse").val(mlm.C1195);
    /* 商品出库 */
    $("#btOutStock").text(mlm.C1189);
    /* 商品入库 */
    $("#btInStock").text(mlm.C1188);
    /* 转移库存 */
    $("#btTransfer").text(mlm.C1190);
    /* 新增仓库 */
    $("#btNewWarehouse").text(mlm.C0461 + mlm.C1196);
    /* 修改仓库 */
    $("#btModifyWarehouse").text(mlm.C0061 + mlm.C1196);
    /* 删除仓库 */
    $("#btDeleteWarehouse").text(mlm.C0062 + mlm.C1196);
    /* 上移仓库 */
    $("#btMoveupWarehouse").text(mlm.C0095 + mlm.C1196);
    /* 下移仓库 */
    $("#btMovedownWarehouse").text(mlm.C0096 + mlm.C1196);
    /* 商品出入库记录 */
    $("#lbInOutStockTitle").text(mlm.C0734 + mlm.C1192);
    /* 查询记录 */
    $("#btQueryIOStock").val(mlm.C0562 + mlm.C1197);
    /* 导出记录 */
    $("#btExportIOStock").val(mlm.C0987 + mlm.C1197);
    /* 仓库 */
    $("#lbWarehouseSymbol, #lbWarehouse_q, #lbWarehouse_q_io").text(mlm.C1196 + ":");
    /* 上层仓库 */
    $("#lbParentWHSymbol").text(mlm.C1198 + ":");
    /* 仓库位置 */
    $("#lbWHAddressSymbol").text(mlm.C1199 + ":");
    /* 备注 */
    $("#lbRemarkSymbol").text(mlm.C0073 + ":");
    /* 入库仓库 */
    $("#lbToWHSymbol").text(mlm.C1202 + ":");
    /* 出库仓库 */
    $("#lbFromWHSymbol").text(mlm.C1203 + ":"); 
    /* 入库时间 */
    $("#lbOperatedTimeSymbol").text(mlm.C1387 + ":");
    /* 入库类型 */
    $("#lbStockInTypeSymbol").text(mlm.C1388 + ":");
    /* 待收产品列表 */
    $("#lbASProdTitle").text(mlm.C1389);
    /* 商品列表 */
    $("#lbInStockProdTitle").text(mlm.C0168);
    /* 添加商品 */
    $("#btAddInStockProd").val(mlm.C0530 + mlm.C0734);
    /* 商品SKU编码 */
    $("#lbSkuProdCode_q_Symbol").text(mlm.C1205 + ":");
    /* 出入库时间 */
    $("#lbQueryTimeSymbol").text(mlm.C1397 + ":");
    /* 到 */
    $("#lbToSymbol").text(mlm.C0412 + ":");

    /* 查询条件 */
    $("#lkProdQueryCond").text(mlm.C1034);
    /* 商品关键字 */
    $("#lbKeyWord_q").text(mlm.C0734 + mlm.C0184 + ":");
    /* 商品分类 */
    $("#lbPdc_q").text(mlm.C0090);
    /* 品牌 */
    $("#lbBrandName_q").text(mlm.C0112 + ":");

    /* 初始化库存 */
    $("#btImportInitInventory").val(mlm.C1236);
    /* 导入文件 */
    $("#lbImportFileSymbol").text(mlm.C0752 + ":"); 
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
    /* 商品Sku库存量 */
    $("#lbSkuInventoryTitle").text(mlm.C1263); 
    /* 所在区域 */
    $("#lbGlobalAreaSymbol").text(mlm.C1277 + ":"); 
    /* 出入库类型 */
    $("#lbQSIOTypeSymbol").text(mlm.C1401 + ":");
    /* 关联单号 */
    $("#lbQRelObjSymbol").text(mlm.C1377 + ":");

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_3, #lbSymbol_4").text(mlm.C0049);

    /* ECMS-商品仓储 */
    document.title = mlm.C1191;
}