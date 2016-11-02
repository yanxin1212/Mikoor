/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadExpressOrderList);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    //SMT授权指令
    window.security.authoriseSMT();

    pageVariable.isloadEO = true;
    pageVariable.nowdate = commoncore.func.getNowTime();

    $("#btWaitPackage, #btWaitDelivery, #btShipping, #btQueryEO, #btWaitCombine, #btCanceledSMT, #btAddCBCustoms, #btWaitHandleReturn, #btGenerateShipLable, #btGenerateTracknumbder, #btExportEPProd, #btExportEPEO, #btExportDeliveryEO, #btImportPre4PXOrder").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
    $("#btWaitPackage, #btWaitDelivery, #btShipping, #btWaitCombine, #btWaitHandleReturn, #btCanceledSMT, #btGenerateShipLable, #btGenerateTracknumbder").click(function () {
        pageVariable.querycondition.EOState = $(this).attr("tag");

        pageVariable.querycondition.CustKey = "";
        pageVariable.querycondition.SOCode = "";
        pageVariable.querycondition.EOKey = "";
        pageVariable.querycondition.ASPCode = "";
        pageVariable.querycondition.TrackingNumber = "";
        pageVariable.querycondition.Warehouse_Id = null;
        pageVariable.querycondition.LstCompany_Id = null;
        pageVariable.querycondition.GlobalArea_Id = null;

        if (pageVariable.querycondition.EOState == "300") {
            pageVariable.action = "combin";
            pageVariable.querycondition.IsReceiveRet = null;
        }
        else {
            pageVariable.querycondition.IsReceiveRet = null;
            pageVariable.action = "other";
        }

        queryExpressOrder(1, pageVariable.expressorderList.pageNumber);
    });
    
    $("#btQueryEO").click(openQueryEOFrm);
    $("#btImportPackage, #btImportDelivery, #btImportPre4PXOrder").click(openImportExpressOrder); 
    $("#btExportSMTTrkNum").click(openExportSMTTrkNumFrm);
    
    $("#btViewPackage").click(viewEOPackage);
    $("#btViewDelivery").click(viewDeliveryEO);
    $("#btExportActualCost").click(exportEOCharge); 
    $("#btExportPackage").click(exportPackageExpressOrder);
    $("#btGenerateSMTShipLable").click(generateSMTShipLabel);
    $("#btGenerateSMTTrackingnumber").click(generateSMTTrackingNumber);
    $("#btExportSMTShipLable").click(openExportSMTShippingLable);

    pageVariable.querycondition = {};
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
    if (pageVariable.expressorderList) {
        pageVariable.expressorderList.resize(mainFormHeight);
    }
}

/* 加载配送视图 */
function loadExpressOrderList() {

    pageframe.control.processCtrl.showOperaProcess();

    if (!pageVariable.expressorderList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.expressorderList = new uicontrol.tableList("expressorderList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "ExpressOrder_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryExpressOrder,
                                         columns: [{ display: mlm.C1226, name: "", width: 120, align: 'left', adjust: true, createCell: constructEOCustCell },
                                                   { display: mlm.C1318, name: "", width: 515, align: 'left', adjust: true, createCell: constructEOContentCell },
                                                   { display: mlm.C1274, name: "WarehouseName", width: 80, align: 'left', adjust: true, createCell: constructWHCell },
                                                   { display: mlm.C1303, name: "", width: 90, align: 'left', adjust: true, createCell: constructEOShipTimeCell },
                                                   { display: mlm.C1305, name: "", width: 90, align: 'left', adjust: true, createCell: constructEOArriveTimeCell },
                                                   { display: mlm.C0367, name: "", width: 90, align: 'left', adjust: true, createCell: constructEOStateCell },
                                                   { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, createCell: createEOOperaCell}]
                                     });

    }

    loadEOState();
}
/* 加载配送状态统计 */
function loadEOState() {

    var m_waitCombineCtrl = $("#btWaitCombine");
    var m_waitPackageCtrl = $("#btWaitPackage");
    var m_waitDeliveryCtrl = $("#btWaitDelivery"); 
    var m_shippingCtrl = $("#btShipping");
    var m_waitHandleReturnCtrl = $("#btWaitHandleReturn");
    var m_canceledSMTCtrl = $("#btCanceledSMT"); 
    var m_generateShipLableCtrl = $("#btGenerateShipLable");
    var m_generateTracknumbderCtrl = $("#btGenerateTracknumbder");

    m_waitCombineCtrl.val(mlm.C1279);
    m_waitPackageCtrl.val(mlm.C1280);
    m_waitDeliveryCtrl.val(mlm.C1281);
    m_shippingCtrl.val(mlm.C1282);
    m_waitHandleReturnCtrl.val(mlm.C1285);
    m_canceledSMTCtrl.val(mlm.C1720);
    m_generateShipLableCtrl.val(mlm.C1721);
    m_generateTracknumbderCtrl.val(mlm.C1722);

    var m_ctrls = $("#btWaitCombine, #btWaitPackage, #btWaitDelivery, #btShipping, #btWaitHandleReturn, #btCanceledSMT, #btGenerateShipLable, #btGenerateTracknumbder");
    m_ctrls.unbind("mouseenter mouseleave");
    m_ctrls.css("background-color", "#CCCCCC");

    var m_expressorder = new lstm.expressorder();
    m_expressorder.getEOStat(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            if (Number(this.EOCount) > 0) {
                if (this.EOState == "0") {
                    m_waitPackageCtrl.val(mlm.C1280 + "(" + this.EOCount + ")");
                    m_waitPackageCtrl.css("background-color", "");
                    m_waitPackageCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

                    pageframe.control.multiButtion.init("btWaitPackage", "dvWaitPackage");
                }
                else if (this.EOState == "10") {
                    m_waitDeliveryCtrl.val(mlm.C1281 + "(" + this.EOCount + ")");
                    m_waitDeliveryCtrl.css("background-color", "");
                    m_waitDeliveryCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

                    pageframe.control.multiButtion.init("btWaitDelivery", "dvWaitDelivery");
                }
                else if (this.EOState == "20") {
                    m_shippingCtrl.val(mlm.C1282 + "(" + this.EOCount + ")");
                    m_shippingCtrl.css("background-color", "");
                    m_shippingCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
                else if (this.EOState == "40") {
                    m_waitHandleReturnCtrl.val(mlm.C1285 + "(" + this.EOCount + ")");
                    m_waitHandleReturnCtrl.css("background-color", "");
                    m_waitHandleReturnCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
                else if (this.EOState == "300") {
                    m_waitCombineCtrl.val(mlm.C1279 + "(" + this.EOCount + ")");
                    m_waitCombineCtrl.css("background-color", "");
                    m_waitCombineCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
                else if (this.EOState == "100") {
                    m_canceledSMTCtrl.val(mlm.C1720 + "(" + this.EOCount + ")");
                    m_canceledSMTCtrl.css("background-color", "");
                    m_canceledSMTCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
                else if (this.EOState == "200") {
                    m_generateShipLableCtrl.val(mlm.C1721 + "(" + this.EOCount + ")");
                    m_generateShipLableCtrl.css("background-color", "");
                    m_generateShipLableCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

                    pageframe.control.multiButtion.init("btGenerateShipLable", "dvGenerateShipLable");
                }
                else if (this.EOState == "210") {
                    m_generateTracknumbderCtrl.val(mlm.C1722 + "(" + this.EOCount + ")");
                    m_generateTracknumbderCtrl.css("background-color", "");
                    m_generateTracknumbderCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

                    pageframe.control.multiButtion.init("btGenerateTracknumbder", "dvGenerateTrackingnumber");
                }
            }
        });

        pageframe.control.processCtrl.hideOperaProcess();
    });
}
/* 构建客户列 */
function constructEOCustCell(key, cellValue) {
    var m_arr = [];

    var m_css = '';
    if (!this.keyObj.ShipTimeStr) {
        if (this.keyObj.isshipdelay) {
            m_css = 'color: #DD0000';
        }
        else if (this.keyObj.isshipnow) {
            m_css = 'color: #666';
        }
    }

    m_arr.push("<div style='padding: 0px; " + m_css + "'><a style='" + m_css + "' onclick='openViewCustFrm.call(this, \"" + this.keyObj.Customer_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.CustName + "</a></div>");
    m_arr.push("<div style='padding: 5px 0px 0px 0px; " + m_css + "'>" + commoncore.func.showSpecialChar(this.keyObj.RvFullName) + "</div>");

    var m_address = [];
    if (this.keyObj.RvCity) {
        m_address.push(this.keyObj.RvCity);
    }
    if (this.keyObj.RvProvince) {
        m_address.push(this.keyObj.RvProvince);
    }
    if (this.keyObj.GlobalAreaName) {
        m_address.push(this.keyObj.GlobalAreaName);
    }

    m_arr.push("<div style='padding: 5px 0px 0px 0px; color: #666" + m_css + "'>" + commoncore.func.showSpecialChar(m_address.join(",")) + "</div>");

    return m_arr.join("");
}
/* 构建配送内容列 */
function constructEOContentCell(key, cellValue) {
    var m_arr = [];

    var m_css = '';
    if (!this.keyObj.ShipTimeStr) {
        if (this.keyObj.isshipdelay) {
            m_css = 'color: #DD0000';
        }
        else if (this.keyObj.isshipnow) {
            m_css = 'color: #666666';
        }
    }

    var m_obj = this.keyObj;
    var m_eoproducts = datastruct.convertion.strToObject(this.keyObj.ProductJson);
    var m_eostate = Number(this.keyObj.EOState);

    var m_expcoststr = mlm.C0839;
    var m_expweightstr = mlm.C1320; ;
    if (m_eostate < 20) {
        m_expcoststr = " " + mlm.C1319 + mlm.C0839;
        m_expweightstr = " " + mlm.C1319 + mlm.C1320;
    }

    m_arr.push("<div style='border-bottom-color: #ddd; border-bottom-width: 1px; border-bottom-style: solid; padding: 5px 0px 5px 0px; " + m_css + "'>");
    m_arr.push("<a style='" + m_css + "' onclick='viewExpressOrder.call(this, \"" + this.keyObj.ExpressOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.EOCode + "</a>");

    if (this.keyObj.IsCombin == "1") {
        m_arr.push("<span style='margin: 0px 0px 0px 5px; color: #666'>(" + mlm.C1321 + ")</span>");
    }

    m_arr.push("<a style='margin: 0px 0px 0px 10px;" + m_css + "' onclick='openViewLstSolution.call(this, \"" + this.keyObj.LstSolution_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.LstSolutionName + "</a>");
    
    
    if (m_eostate < 20) {
        m_arr.push("<span style='padding: 0px; float: right'>" + m_expcoststr + ": " + commoncore.func.getCurrHtml(m_obj.CurrSymbol, this.keyObj.ExpServiceCost) + " / " + Number(this.keyObj.Weight).toFixed(3) + " " + this.keyObj.WUnit + "</span>");
    }
    else {
        if (Number(this.keyObj.ActualCost) == 0) {
            m_arr.push("<span style='padding: 0px; float: right;'>" + m_expcoststr + ": " + mlm.C1322 + "</span>");
        }
        else {

            m_arr.push("<span style='padding: 0px; float: right'>" + m_expcoststr + ": " + commoncore.func.getCurrHtml(m_obj.CurrSymbol, this.keyObj.ActualCost) + " / " + Number(this.keyObj.ActualWeight).toFixed(3) + " " + this.keyObj.WUnit + "</span>");
        }
    }
    m_arr.push("</div>");

    var m_i = 1;
    $.each(m_eoproducts, function () {

        if (m_i == m_eoproducts.length) {
            m_arr.push("<div style='padding: 5px 0px 5px 0px; color: #666'>");
        }
        else {
            m_arr.push("<div style='border-bottom-color: #ddd; border-bottom-width: 1px; border-bottom-style: solid; padding: 5px 0px 5px 0px; color: #666'>");
        }

        var m_src = "";
        if (this.BrowsePicUrl) {
            if (this.BrowsePicUrl.indexOf("http://") == -1) {
                m_src = window.webLocation + this.BrowsePicUrl;
            }
            else {
                m_src = this.BrowsePicUrl;
            }
        }
        else {
            m_src = window.webLocation + "BZM/Css/Images/nopic.png";
        }
        m_arr.push("<div style='height: 70px; padding: 0px; border: 1px solid #ccc; float: left'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>");
        m_arr.push("<div style='padding: 0px 0px 0px 5px;'><a style='color: #000000; text-decoration: none; " + m_css + "' onclick='viewProduct.call(this, \"" + this.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.SkuProdCode + " - " + this.ProdName + " - [" + this.SkuProps + "]</a></div>");
        m_arr.push("<div style='padding: 5px 0px 0px 5px; " + m_css + "'>" + mlm.C1098 + ": " + Number(this.Qty) + "</div>");
        m_arr.push("</div>");
        m_i++;
    });

    return m_arr.join("");
}
/* 构建配送中心列 */
function constructWHCell(key, cellValue) {
    var m_css = '';
    if (!this.keyObj.ShipTimeStr) {
        if (this.keyObj.isshipdelay) {
            m_css = 'color: #DD0000';
        }
        else if (this.keyObj.isshipnow) {
            m_css = 'color: #666666';
        }
    }

    return "<span style='" + m_css + "'>" + cellValue + "</span>";
}
/* 构建发货日期列 */
function constructEOShipTimeCell(key, cellValue) {

    var m_arr = [];
    var m_css = '';
    if (!this.keyObj.ShipTimeStr) {
        if (this.keyObj.isshipdelay) {
            m_css = 'color: #DD0000';
        }
        else if (this.keyObj.isshipnow) {
            m_css = 'color: #666666';
        }
    }

    if (this.keyObj.ShipTimeStr) {
        m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.ShipTimeStr) + "</div>");
        if (Number(this.keyObj.ShipDiff) > 0) {
            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1323 + this.keyObj.ShipDiff + mlm.C0800 + ")" + "</div>");
        }
    }
    else {
        m_arr.push("<div style='padding: 0px; color: #666; " + m_css + "'>" + commoncore.func.getTimeStrCell(this.keyObj.EstimatedShipTimeStr) + "</div>");
        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>(" + mlm.C1324 + ")</div>");
    }

    return m_arr.join("");
}
/* 构建到货日期列 */
function constructEOArriveTimeCell(key, cellValue) {

    if (this.keyObj.EOState == "30" || this.keyObj.EOState == "40") {
        return "";
    }

    var m_arr = [];

    var m_css = '';
    if (!this.keyObj.ShipTimeStr) {
        if (this.keyObj.isshipdelay) {
            m_css = 'color: #DD0000';
        }
        else if (this.keyObj.isshipnow) {
            m_css = 'color: #666666';
        }
    }

    if (this.keyObj.ArriveTimeStr) {
        m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.ArriveTimeStr) + "</div>");
        if (Number(this.keyObj.ArriveDiff) > 0) {
            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1325 + this.keyObj.ArriveDiff + mlm.C0800 + ")" + "</div>");
        }
    }
    else {
        m_arr.push("<div style='padding: 0px; color: #666; " + m_css + "'>" + commoncore.func.getTimeStrCell(this.keyObj.EstimatedArriveTimeStr) + "</div>");
        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>(" + mlm.C1326 + ")</div>");
    }

    return m_arr.join("");
}
/* 构建状态列 */
function constructEOStateCell(key, cellValue) {
    var m_arr = [];

    var m_css = '';
    if (!this.keyObj.ShipTimeStr) {
        if (this.keyObj.isshipdelay) {
            m_css = 'color: #DD0000';
        }
        else if (this.keyObj.isshipnow) {
            m_css = 'color: #666666';
        }
    }

    if (this.keyObj.EOState == "0") {
        m_arr.push("<div style='padding: 0px; " + m_css + "'>" + mlm.C1280 + "</div>");

        if (Number(this.keyObj.EstimatedShipDiff) > 0) {
            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>" + "(" + mlm.C1323 + this.keyObj.EstimatedShipDiff + mlm.C0800 + ")" + "</div>");
        }

        if (this.keyObj.TrackingNumber) {
            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>" + this.keyObj.TrackingNumber + "</div>");
        }
    }
    else if (this.keyObj.EOState == "10") {
        m_arr.push("<div style='padding: 0px;" + m_css + "'>" + mlm.C1281 + "</div>");

        if (Number(this.keyObj.EstimatedShipDiff) > 0) {
            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>" + "(" + mlm.C1323 + this.keyObj.EstimatedShipDiff + mlm.C0800 + ")" + "</div>");
        }
        if (this.keyObj.TrackingNumber) {
            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>" + this.keyObj.TrackingNumber + "</div>");
        }
    }
    else if (this.keyObj.EOState == "20") {
        m_arr.push("<div style='padding: 0px;'>" + mlm.C1282 + "</div>");

        if (this.keyObj.IsTrack == "1") {
            if (!this.keyObj.TrackingNumber) {
                m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #DD0000'>" + mlm.C1327 + "</div>");
            }
            else {
                m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>" + this.keyObj.TrackingNumber + "</div>");
            }
        }
        else {
            if (this.keyObj.TrackingNumber) {
                m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>" + this.keyObj.TrackingNumber + "</div>");
            }
        }

        if (Number(this.keyObj.EstimatedArriveDiff) > 0) {
            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>" + "(" + mlm.C1325 + this.keyObj.EstimatedArriveDiff + mlm.C0800 + ")" + "</div>");
        }
    }
    else if (this.keyObj.EOState == "30") {
        m_arr.push("<div style='padding: 0px;" + m_css + "'>" + mlm.C1328 + "</div>");
    }
    else if (this.keyObj.EOState == "40") {
        m_arr.push("<div style='padding: 0px;" + m_css + "'>" + mlm.C1329 + "</div>");
    }
    else if (this.keyObj.EOState == "50") {
        m_arr.push("<div style='padding: 0px;" + m_css + "'>" + mlm.C1330 + "</div>");
    }

    return m_arr.join("");
}
/* 构建操作列 */
function createEOOperaCell(key, cellValue) {

    if (pageVariable.action == "combin") {
        return "<a style='margin: 0px 0px 0px 3px; " + m_css + "' onclick='openCombinEOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1331 + "</a>"
    }
    else {
        var m_arr = [];

        var m_css = '';
        if (!this.keyObj.ShipTimeStr) {
            if (this.keyObj.isshipdelay) {
                m_css = 'color: #DD0000';
            }
            else if (this.keyObj.isshipnow) {
                m_css = 'color: #666666';
            }
        }

        //生效
        if (this.keyObj.EOState == "0") {
            if (!this.keyObj.inCancel) {
                m_arr.push("<div style='padding: 0px;'><a style='" + m_css + "' onclick='openHandleEOPackageFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1332 + "</a>");
                m_arr.push("<a style='margin: 0px 0px 0px 3px; " + m_css + "' onclick='openSubmitDeliveryFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1333 + "</a></div>");
                if (!this.keyObj.TrackingNumber) {
                    m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a style='" + m_css + "' onclick='openHandleTrackingNumberFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1338 + "</a></div>");
                }
            }

            if (this.keyObj.IsCombin == "1") {
                m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a style='" + m_css + "' onclick='openSplitEO.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1334 + "</a></div>");
            }
            else {
                m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a style='" + m_css + "' onclick='openCancelEO.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0538 + "</a></div>");
            }
        }
        else if (this.keyObj.EOState == "10") {
            if (!this.keyObj.inCancel) {
                m_arr.push("<div style='padding: 0px;'><a style='" + m_css + "' onclick='openSubmitDeliveryFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1333 + "</a></div>");
                if (!this.keyObj.TrackingNumber) {
                    m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a style='" + m_css + "' onclick='openHandleTrackingNumberFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1338 + "</a></div>");
                }
            }
            m_arr.push("<div style='padding: 3px 0px 0px 0px;'><a style='" + m_css + "' onclick='openReHandleEOPackageFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1335 + "</a></div>");
        }
        else if (this.keyObj.EOState == "20") {
            m_arr.push("<div style='padding: 0px;'><a style='" + m_css + "' onclick='openHandleDeliveryFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1330 + "</a></div>");
            m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a style='" + m_css + "' onclick='openHandleEOLoseFrmFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1336 + "</a></div>");
            m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a style='" + m_css + "' onclick='openHandleEOReturnFrmFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1337 + "</a></div>");

            if (!this.keyObj.TrackingNumber) {
                m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a style='" + m_css + "' onclick='openHandleTrackingNumberFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1338 + "</a></div>");
            }
        }
        else if (this.keyObj.EOState == "40" && (!this.keyObj.IsReceiveRet || this.keyObj.IsReceiveRet == 0)) {
            m_arr.push("<div style='padding: 0px;'><a style='" + m_css + "' onclick='openReceiveRet.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1339 + "</a></div>");
        }

        if (Number(this.keyObj.EOState) > 19 && this.keyObj.EOState != "100") {
            if (Number(this.keyObj.ActualCost) == 0) {
                var m_paddingstr = "";
                if (m_arr.length == 0) {
                    m_padding = "padding: 0px;";
                }
                else {

                    m_padding = "padding: 2px 0px 0px 0px;";
                }

                m_arr.push("<div style='" + m_paddingstr + "'><a style='" + m_css + "' onclick='openHandleEOCostFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + "设置运费" + "</a></div>");
            }
        }

        return m_arr.join("");
    }
}
/* 打开查询窗体 */
function openQueryEOFrm(key) {
    if (!pageVariable.queryEOFrm) {
        pageVariable.queryEOFrm = new uicontrol.dialog("queryEOFrm", mlm.C0562 + mlm.C1299, { width: 800 }, function () {
            getQueryCondition();
            pageVariable.action = "other";
            queryExpressOrder(1, pageVariable.expressorderList.pageNumber);
        });

        var m_lstCompanyCtrl = $("#ddlQLstCompany");
        var m_lstcompany = new lstm.lstcompany();
        m_lstcompany.getAllLstCompanys(function (retTable) {
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

            m_lstCompanyCtrl.append("<option></option>");
            $.each(m_jsonobjs, function () {
                m_lstCompanyCtrl.append("<option value='" + this.LstCompany_Id + "'>" + this.LstCompanyName + "</option>");
            });
        });
        pageVariable.selQWH = new bizcontrol.selectwarehouse($("#selQWH"), null, "1");
        pageVariable.selGlobalArea = new bizcontrol.selectglobalarea("selGlobalArea", true);

        var m_qlstCtr = $("#txtQLstSolution");
        m_qlstCtr.change(function () {
            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.Key = $(this).val();

            if (m_lstsolution.Key) {
                m_lstsolution.LstCompany_Id = m_lstCompanyCtrl.val();
                m_lstsolution.Warehouse_Id = pageVariable.selQWH.Warehouse_Id;
                m_lstsolution.Page = 1;
                m_lstsolution.PageNum = 1;

                m_lstsolution.queryLstSolution(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                    if (m_jsonobjs.length > 0) {
                        m_qlstCtr.attr("tag", m_jsonobjs[0].LstSolution_Id);
                        m_qlstCtr.val(m_jsonobjs[0].LstSolutionName);
                    }
                    else {
                        m_qlstCtr.attr("tag", "0");
                        m_qlstCtr.val("");
                    }
                });
            }
            else {
                m_qlstCtr.attr("tag", "0");
                m_qlstCtr.val("");
            }
        });
        pageVariable.m_selectlstsolution = new bizcontrol.selectlstsolution(function (m_selecteditems) {
            var m_lstsolution = m_selecteditems;
            m_qlstCtr.attr("tag", m_lstsolution.LstSolution_Id);
            m_qlstCtr.val(m_lstsolution.LstSolutionName);
        }, "1");
        var m_lstsolutionCtrl = $("#btSelLstSolution");
        m_lstsolutionCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
        m_lstsolutionCtrl.click(function () {
            pageVariable.m_selectlstsolution.show(null, null, pageVariable.selQWH.warehouse_id, m_lstCompanyCtrl.val());
        });

        pageVariable.ddlQEOState = new uicontrol.selectbox("ddlQEOState", "radio");
        var m_stateoptions = [];
        m_stateoptions.push({ key: "-1", value: mlm.C0403 });
        m_stateoptions.push({ key: "0", value: mlm.C1280 });
        m_stateoptions.push({ key: "10", value: mlm.C1281 });
        m_stateoptions.push({ key: "20", value: mlm.C1282 });
        m_stateoptions.push({ key: "40", value: mlm.C1285 });
        m_stateoptions.push({ key: "50", value: mlm.C1330 });
        m_stateoptions.push({ key: "30", value: mlm.C1336 });
        m_stateoptions.push({ key: "42", value: mlm.C1340 });
        pageVariable.ddlQEOState.bindSource(m_stateoptions);

        var m_defaulteostate = [];
        m_defaulteostate.push({ key: "-1" });
        pageVariable.ddlQEOState.setSelectedItem(m_defaulteostate);
    }

    var m_selectedeostate = [];
    if (pageVariable.querycondition.EOState) {
        m_selectedeostate.push({ key: pageVariable.querycondition.EOState });
    }
    pageVariable.ddlQEOState.setSelectedItem(m_selectedeostate);
    $("#txtEOCustKey").val(pageVariable.querycondition.CustKey);
    $("#txtSOCode").val(pageVariable.querycondition.SOCode);
    $("#txtQEOCode").val(pageVariable.querycondition.EOKey);
    $("#txtQASPCode").val(pageVariable.querycondition.ASPCode);
    $("#txtQTrackingNumber").val(pageVariable.querycondition.TrackingNumber);
    pageVariable.selQWH.setWarehouse({ Warehouse_Id: pageVariable.querycondition.Warehouse_Id, WarehouseName: pageVariable.querycondition.WarehouseName });
    pageVariable.selGlobalArea.setObj({ globalArea_Ids: pageVariable.querycondition.GlobalArea_Id, globalAreaNames: pageVariable.querycondition.GlobalAreaName });

    pageVariable.queryEOFrm.show();
}
/* 获取查询条件 */
function getQueryCondition() {
    pageVariable.querycondition.CustKey = $.trim($("#txtEOCustKey").val());
    pageVariable.querycondition.SOCode = $.trim($("#txtSOCode").val());
    pageVariable.querycondition.EOKey = $.trim($("#txtQEOCode").val());
    pageVariable.querycondition.TrackingNumber = $.trim($("#txtQTrackingNumber").val());
    pageVariable.querycondition.ASPCode = $.trim($("#txtQASPCode").val());
    if (pageVariable.selQWH) {
        pageVariable.querycondition.Warehouse_Id = pageVariable.selQWH.warehouse_id;
        pageVariable.querycondition.WarehouseName = pageVariable.selQWH.warehousename;
    }
    else {
        pageVariable.querycondition.Warehouse_Id = "0";
        pageVariable.querycondition.WarehouseName = "";
    }
    pageVariable.querycondition.LstCompany_Id = $("#ddlQLstCompany").val();

    pageVariable.querycondition.LstSolution_Id = $("#txtQLstSolution").attr("tag");
    pageVariable.querycondition.LstSolutionName = $("#txtQLstSolution").val();

    if (pageVariable.selGlobalArea) {
        var m_area = pageVariable.selGlobalArea.getObj();
        if (m_area) {
            
            pageVariable.querycondition.GlobalArea_Id = m_area.globalArea_Ids;
            pageVariable.querycondition.GlobalAreaName = m_area.globalAreaNames;
        }
        else {
            pageVariable.querycondition.GlobalArea_Id = "0";
            pageVariable.querycondition.GlobalAreaName = "";
        }
    }
    else {
        pageVariable.querycondition.GlobalArea_Id = "0";
        pageVariable.querycondition.GlobalAreaName = "";
    }

    if (pageVariable.ddlQEOState) {
        pageVariable.querycondition.EOState = pageVariable.ddlQEOState.getSelectedItem()[0];

        if (pageVariable.querycondition.EOState == "-1") {
            pageVariable.querycondition.EOState = null;
        }
    }
}
/* 查询配送视图 */
function queryExpressOrder(pageNum, pageCount) {
    var m_expressorder = new lstm.expressorder();
    m_expressorder = $.extend(m_expressorder, pageVariable.querycondition);

    m_expressorder.IsReceiveRet = pageVariable.querycondition.IsReceiveRet;
    if (m_expressorder.EOState == "42") {
        m_expressorder.EOState = "40";
        m_expressorder.IsReceiveRet = "1";
    }
    m_expressorder.Page = pageNum;
    m_expressorder.PageNum = pageCount;
    m_expressorder.queryExpressOrder(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        $.each(m_jsonobjs, function () {
            var m_shipfromdate = new Date(this.EstimatedShipTimeStr);
            if (m_shipfromdate < pageVariable.nowdate) {
                this.isshipdelay = true;
            }
            else {
                this.isshipdelay = false;
            }

            if (m_shipfromdate == pageVariable.nowdate) {
                this.isshipnow = true;
            }
            else {
                this.isshipnow = false;
            }

            if (m_expressorder.EOState == "100") {
                this.inCancel = true;
            }
        });
        pageVariable.expressorderList.bindDataSource(m_jsonobjs, retTable.TotalCount);

        var m_i = 0;
        var m_eolist = $("#expressorderList");
        $.each(m_jsonobjs, function () {
            if (this.IsOK == "0") {
                var m_tds = m_eolist.find("#row" + this.ExpressOrder_Id).find("td");
                m_tds.css("background-color", "#FFEDE6");

                if (m_i != 0) {
                    m_tds.css("border-top-color", "#C0C0C0");
                    m_tds.css("border-top-style", "solid");
                    m_tds.css("border-top-width", "1px");
                }
                m_i++;
            }
        });

        if (pageVariable.queryEOFrm) {
            pageVariable.queryEOFrm.close();
        }
    });
}

/* 打开订单打包窗体 */
function openHandleEOPackageFrm(key) {
    if (!pageVariable.handleEOPackage) {
        pageVariable.handleEOPackage = new uicontrol.dialog("handleEOPackage", mlm.C1332, { width: 800 }, handleEOPackage);
        pageVariable.selectWH = new bizcontrol.selectwarehouse($("#selectWH"), null, "1");
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);
    pageVariable.handleEOPackage.expressorder_id = m_expressorder.ExpressOrder_Id;
    $("#lbPackageInfo").text(m_expressorder.EOCode + mlm.C1341);
    pageVariable.selectWH.setWarehouse({ Warehouse_Id: m_expressorder.Warehouse_Id, WarehouseName: m_expressorder.WarehouseName });

    pageVariable.handleEOPackage.show()
}
/* 处理订单打包 */
function handleEOPackage() {
    if (!pageVariable.selectWH.warehouse_id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1342 + mlm.C1274);
        return false;
    }

    var m_expressorder = new lstm.expressorder();
    m_expressorder.Warehouse_Id = pageVariable.selectWH.warehouse_id;
    m_expressorder.ExpressOrder_Id = pageVariable.handleEOPackage.expressorder_id;
    m_expressorder.packageExpressOrder(function () {

        var m_eoobj = pageVariable.expressorderList.getItem(pageVariable.handleEOPackage.expressorder_id);
        m_eoobj.EOState = 10;
        pageVariable.expressorderList.modifyData(m_eoobj.ExpressOrder_Id, m_eoobj);

        loadEOState();

        pageVariable.handleEOPackage.close();
    });
}

/* 打开重新打包窗体 */
function openReHandleEOPackageFrm(key) {
    if (!pageVariable.reHandleEOPackage) {
        pageVariable.reHandleEOPackage = new uicontrol.dialog("reHandleEOPackage", mlm.C1335, { width: 800 }, rehandleEOPackage);
        pageVariable.selectInWH = new bizcontrol.selectwarehouse($("#selectInWH"), null, "1");
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);
    pageVariable.reHandleEOPackage.expressorder_id = m_expressorder.ExpressOrder_Id;

    $("#lbCancelPackage").text(m_expressorder.EOCode + mlm.C1343);

    pageVariable.reHandleEOPackage.show()
}
/* 重新打包 */
function rehandleEOPackage() {
    if (!pageVariable.selectInWH.warehouse_id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1342 + mlm.C1274);
        return false;
    }

    var m_expressorder = new lstm.expressorder();
    m_expressorder.Warehouse_Id = pageVariable.selectInWH.warehouse_id;
    m_expressorder.ExpressOrder_Id = pageVariable.reHandleEOPackage.expressorder_id;
    m_expressorder.rePackageExpressOrder(function () {

        var m_eoobj = pageVariable.expressorderList.getItem(pageVariable.reHandleEOPackage.expressorder_id);
        m_eoobj.EOState = 0;
        pageVariable.expressorderList.modifyData(m_eoobj.ExpressOrder_Id, m_eoobj);

        loadEOState();

        pageVariable.reHandleEOPackage.close();
    });
}

/* 打开订单交运窗体 */
function openSubmitDeliveryFrm(key) {
    if (!pageVariable.submitDeliveryFrm) {
        pageVariable.submitDeliveryFrm = new uicontrol.dialog("submitDeliveryFrm", "", { width: 800 }, submitDelivery);
        pageVariable.selectWH_1 = new bizcontrol.selectwarehouse($("#selectWH_1"), null, "1");
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);

    if (m_expressorder.EOState == "10") {
        $("#dvDv_1").addClass("last-item");

        var m_dv = $("#dvDv_2");
        m_dv.removeClass("last-item");
        m_dv.hide();
    }
    else {
        $("#dvDv_1").removeClass("last-item");

        var m_dv = $("#dvDv_2");
        m_dv.addClass("last-item");
        m_dv.show();
    }

    pageVariable.submitDeliveryFrm.expressorder = m_expressorder;
    pageVariable.submitDeliveryFrm.expressorder_id = key;
    $("#lbSubmitDeliveryInfo").text(mlm.C1344 + "(" + m_expressorder.EOCode + ")" + mlm.C1345 + "(" + m_expressorder.LstCompanyName + ")，" + mlm.C1346 + m_expressorder.LstSolutionName);
    $("#lbWUnit_3").text(m_expressorder.WUnit);
    $("#lbCurrCode_3").text(m_expressorder.CurrCode);
    pageVariable.selectWH_1.setWarehouse({ Warehouse_Id: m_expressorder.Warehouse_Id, WarehouseName: m_expressorder.WarehouseName });

    $("#txtOutEOCode").val(m_expressorder.OutEOCode);
    $("#txtTrackingNumber").val(m_expressorder.TrackingNumber);
    $("#txtActualWeight").val("0.000");
    $("#txtActualCost").val("0.00");
    $("#txtActualLength").val("0");
    $("#txtActualWidth").val("0");
    $("#txtActualHeight").val("0");

    pageVariable.submitDeliveryFrm.setTitle(mlm.C1333);
    pageVariable.submitDeliveryFrm.show();
}
/* 交运订单 */
function submitDelivery() {
    var m_warehouse_id = "0";
    if (pageVariable.submitDeliveryFrm.expressorder.EOState == "0") {
        if (!pageVariable.selectWH_1.warehouse_id) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1342 + mlm.C1274);
            return false;
        }
        else {
            m_warehouse_id = pageVariable.selectWH_1.warehouse_id;
        }
    }

    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Id = pageVariable.submitDeliveryFrm.expressorder_id;
    m_expressorder.OutEOCode = $.trim($("#txtOutEOCode").val());
    m_expressorder.TrackingNumber = $.trim($("#txtTrackingNumber").val());
    m_expressorder.ActualWeight = $("#txtActualWeight").val();
    m_expressorder.ActualCost = $("#txtActualCost").val();
    m_expressorder.ActualLength = $("#txtActualLength").val();
    m_expressorder.ActualWidth = $("#txtActualWidth").val();
    m_expressorder.ActualHeight = $("#txtActualHeight").val();
    m_expressorder.Warehouse_Id = m_warehouse_id;

    m_expressorder.shipSaleOrder(function (retTable) {
        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.expressorderList.modifyData(m_jsonobj.ExpressOrder_Id, m_jsonobj);

        loadEOState();

        pageVariable.submitDeliveryFrm.close();
    });
}

/* 打开撤消配送单的窗体 */
function openCancelEO(key) {
    if (!pageVariable.handleCancelEOFrm) {
        pageVariable.handleCancelEOFrm = new uicontrol.dialog("handleCancelEOFrm", mlm.C1347, { width: 800 }, cancelEO);
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);

    $("#lbCancelEOInfo").text(mlm.C1348 + "(" + m_expressorder.EOCode + ")，" + mlm.C1349);

    pageVariable.handleCancelEOFrm.expressorder_id = key;
    pageVariable.handleCancelEOFrm.show();
}
/* 撤消配送单 */
function cancelEO() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Id = pageVariable.handleCancelEOFrm.expressorder_id;
    m_expressorder.cancelEO(function () {

        pageVariable.expressorderList.deleteData(m_expressorder.ExpressOrder_Id);
        loadEOState();

        pageVariable.handleCancelEOFrm.close();
    });
}

/* 打开设置运费窗体 */
function openHandleEOCostFrm(key) {
    if (!pageVariable.handleEOCostFrm) {
        pageVariable.handleEOCostFrm = new uicontrol.dialog("handleEOCostFrm", "", { width: 800 }, saveShipCost);
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);
    pageVariable.handleEOCostFrm.expressorder_id = key;
    $("#lbWUnit_4").text(m_expressorder.WUnit);
    $("#lbCurrCode_4").text(m_expressorder.CurrCode);

    $("#txtOutEOCode_1").val("");
    $("#txtActualWeight_1").val("0.000");
    $("#txtActualCost_1").val("0.00");
    $("#txtActualLength_1").val("0");
    $("#txtActualWidth_1").val("0");
    $("#txtActualHeight_1").val("0");

    pageVariable.handleEOCostFrm.setTitle(mlm.C1350 + "(" + m_expressorder.EOCode + ")");
    pageVariable.handleEOCostFrm.show();
}
/* 设置运费 */
function saveShipCost() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Id = pageVariable.handleEOCostFrm.expressorder_id;
    m_expressorder.OutEOCode = $.trim($("#txtOutEOCode_1").val());
    if (!m_expressorder.OutEOCode) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1291 + mlm.C0713);
        return;
    }
    m_expressorder.ActualWeight = $("#txtActualWeight_1").val();
    if (Number(m_expressorder.ActualWeight) == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1292 + mlm.C1351);
        return;
    }
    m_expressorder.ActualCost = $("#txtActualCost_1").val();
    if (Number(m_expressorder.ActualCost) == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1294 + mlm.C1351);
        return;
    }
    m_expressorder.ActualLength = $("#txtActualLength_1").val();
    m_expressorder.ActualWidth = $("#txtActualWidth_1").val();
    m_expressorder.ActualHeight = $("#txtActualHeight_1").val();
    if (Number(m_expressorder.ActualLength) * Number(m_expressorder.ActualWidth) * Number(m_expressorder.ActualHeight) == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1293 + mlm.C1351);
        return;
    }
    m_expressorder.saveShipCost(function () {

        var m_eoobj = pageVariable.expressorderList.getItem(pageVariable.handleEOCostFrm.expressorder_id);
        m_eoobj.OutEOCode = m_expressorder.OutEOCode;
        m_eoobj.ActualWeight = m_expressorder.ActualWeight;
        m_eoobj.ActualCost = m_expressorder.ActualCost;
        m_eoobj.ActualLength = m_expressorder.ActualLength;
        m_eoobj.ActualWidth = m_expressorder.ActualWidth;
        m_eoobj.ActualHeight = m_expressorder.ActualHeight;
        pageVariable.expressorderList.modifyData(m_eoobj.ExpressOrder_Id, m_eoobj);

        loadEOState();

        pageVariable.handleEOCostFrm.close();
    });
}

/* 打开设置跟踪号窗体 */
function openHandleTrackingNumberFrm(key) {
    if (!pageVariable.handleTrackingNumberFrm) {
        pageVariable.handleTrackingNumberFrm = new uicontrol.dialog("handleTrackingNumberFrm", "", { width: 800 }, saveTrackingNumber);
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);
    $("#txtTrackingNumber_1").val("");

    pageVariable.handleTrackingNumberFrm.expressorder_id = key;
    pageVariable.handleTrackingNumberFrm.setTitle(mlm.C1338 + "(" + m_expressorder.EOCode + ")");
    pageVariable.handleTrackingNumberFrm.show();
}
/* 设置跟踪号 */
function saveTrackingNumber() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Id = pageVariable.handleTrackingNumberFrm.expressorder_id;
    m_expressorder.TrackingNumber = $.trim($("#txtTrackingNumber_1").val());
    if (!m_expressorder.TrackingNumber) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1295 + mlm.C0713);
        return;
    }
    m_expressorder.saveTrackingNumber(function () {

        var m_eoobj = pageVariable.expressorderList.getItem(pageVariable.handleTrackingNumberFrm.expressorder_id);
        m_eoobj.TrackingNumber = m_expressorder.TrackingNumber;
        pageVariable.expressorderList.modifyData(m_eoobj.ExpressOrder_Id, m_eoobj);

        loadEOState();

        pageVariable.handleTrackingNumberFrm.close();
    });
}

/* 打开妥投窗体 */
function openHandleDeliveryFrm(key) {
    if (!pageVariable.handleDeliveryFrm) {
        pageVariable.handleDeliveryFrm = new uicontrol.dialog("handleDeliveryFrm", "", { width: 800 }, finishDelivery);
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);

    var m_now = new Date(m_expressorder.EstimatedArriveTimeStr);
    var m_year = m_now.getFullYear();
    var m_month = Number(m_now.getMonth()) + 1;
    $("#txtArriveTime").datepicker();
    $("#txtArriveTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

    pageVariable.handleDeliveryFrm.expressorder_id = key;
    pageVariable.handleDeliveryFrm.setTitle(mlm.C1330 + "(" + m_expressorder.EOCode + ")");
    pageVariable.handleDeliveryFrm.show();
}
/* 妥投 */
function finishDelivery() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Id = pageVariable.handleDeliveryFrm.expressorder_id;
    m_expressorder.ArriveTime = $.trim($("#txtArriveTime").val());
    m_expressorder.IsSendEmail = null;
    if ($("#chkIsSendEmail").attr("checked")) {
        m_expressorder.IsSendEmail = 1;
    }
    if (!m_expressorder.ArriveTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1296 + mlm.C0713);
        return;
    }

    var m_arrivetime = datastruct.convertion.convertToDateByStr(m_expressorder.ArriveTime);

    if (m_arrivetime > pageVariable.nowdate) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1352);
        return;
    }

    m_expressorder.finishDelivery(function (retTable) {
        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.expressorderList.modifyData(m_jsonobj.ExpressOrder_Id, m_jsonobj);

        loadEOState();

        pageVariable.handleDeliveryFrm.close();
    });
}

/* 打开丢包窗体 */
function openHandleEOLoseFrmFrm(key) {
    if (!pageVariable.handleEOLoseFrm) {
        pageVariable.handleEOLoseFrm = new uicontrol.dialog("handleEOLoseFrm", mlm.C1336, { width: 800 }, loseEO);
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);

    $("#lbEOLoseInfo").text(mlm.C1299 + "(" + m_expressorder.EOCode + ")" + mlm.C1353);

    pageVariable.handleEOLoseFrm.expressorder_id = key;
    pageVariable.handleEOLoseFrm.show();
}
/* 丢包 */
function loseEO() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Id = pageVariable.handleEOLoseFrm.expressorder_id;
    m_expressorder.loseEO(function () {
        var m_expressorder = pageVariable.expressorderList.getItem(pageVariable.handleEOLoseFrm.expressorder_id);
        m_expressorder.EOState = 30;
        pageVariable.expressorderList.modifyData(m_expressorder.ExpressOrder_Id, m_expressorder);

        loadEOState();

        pageVariable.handleEOLoseFrm.close();
    });
}

/* 打开退件窗体 */
function openHandleEOReturnFrmFrm(key) {
    if (!pageVariable.handleEOReturnFrm) {
        pageVariable.handleEOReturnFrm = new uicontrol.dialog("handleEOReturnFrm", "", { width: 800 }, returnEO);
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);

    $("#lbEOReturnInfo").text(mlm.C1299 + "(" + m_expressorder.EOCode + ")" + mlm.C1354);

    pageVariable.handleEOReturnFrm.expressorder_id = key;
    pageVariable.handleEOReturnFrm.setTitle(mlm.C1337);
    pageVariable.handleEOReturnFrm.show();
}
/* 退件 */
function returnEO() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Id = pageVariable.handleEOReturnFrm.expressorder_id;
    m_expressorder.returnEO(function () {
        var m_expressorder = pageVariable.expressorderList.getItem(pageVariable.handleEOReturnFrm.expressorder_id);
        m_expressorder.EOState = 40;
        pageVariable.expressorderList.modifyData(m_expressorder.ExpressOrder_Id, m_expressorder);

        loadEOState();

        pageVariable.handleEOReturnFrm.close();
    });
}

/* 打开合并窗体 */
function openCombinEOFrm(key) {

    var m_custaddressCtrl = $("#lbCustAddress");
    var m_arrivetimeCtrl = $("#txtCBEstimatedArriveTime");

    if (!pageVariable.handleCombinEOFrm) {
        pageVariable.handleCombinEOFrm = new uicontrol.dialog("handleCombinEOFrm", mlm.C1331, { width: 1100, position: ["auto", 10] }, combindEO);

        pageVariable.selCBWarehouse = new bizcontrol.selectwarehouse($("#selCBWarehouse"), function () {
            var m_globalarea_id = $("#lbCustAddress").attr("globalarea_id");
            if (!pageVariable.selCBWarehouse.warehouse || pageVariable.selCBWarehouse.warehouse.AreaIndexs.indexOf("#" + m_globalarea_id + "#") > -1) {
                $("#dvCBCustom").hide();
            }
            else {
                $("#dvCBCustom").show();
            }

            pageVariable.selCBLstSolution.setLstSolution(null);
            var m_combincostCtrl = $("#lbCombinCost");
            m_combincostCtrl.text("");
            m_combincostCtrl.css("color", "#000000");
        }, "1");
        pageVariable.selCBLstSolution = new bizcontrol.selectsolstsolution($("#selCBLstSolution"), function () {

            var m_weight = Number($("#lbCBWeight").attr("tag"));
            if (m_weight == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1355);
                return false;
            }

            var m_length = Number($("#txtCBLength").val());
            var m_width = Number($("#txtCBWidth").val());
            var m_height = Number($("#txtCBHeight").val());
            if (m_height * m_width * m_length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1356);
                return false;
            }

            if (!pageVariable.selCBWarehouse.warehouse_id || pageVariable.selCBWarehouse.warehouse_id == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1357);
                return false;
            }

            return true;
        },
        function () {

            var m_condObj = {};
            m_condObj.Weight = $("#lbCBWeight").attr("tag");
            m_condObj.SysWeightUnit_Id = keycontext.keyparam.SysWeightUnit_Id;
            m_condObj.Length = $("#txCBtLength").val();
            m_condObj.Width = $("#txtCBWidth").val();
            m_condObj.Height = $("#txtCBHeight").val();
            m_condObj.Tax = 0;
            $.each(pageVariable.cbcustomsinfoList.dataSource.items.arrValues, function () {
                m_condObj.Tax += Number(this.CustomQty) * Number(this.CustomValue)
            });
            m_condObj.TaxSysCurrency_Id = keycontext.keyparam.tax_syscurrency;
            m_condObj.WUnit = keycontext.keyparam.WUnit;
            m_condObj.CurrSymbol = keycontext.keyparam.syscurrsymbol;
            m_condObj.SysCurrency_Id = keycontext.keyparam.syscurrency;
            m_condObj.GlobalAreaIds = [];
            m_condObj.GlobalAreaIds.push(pageVariable.handleCombinEOFrm.expressorder.GlobalArea_Id);
            m_condObj.Warehouse_Id = pageVariable.selCBWarehouse.warehouse_id;
            m_condObj.Province = pageVariable.handleCombinEOFrm.expressorder.RvProvince;
            m_condObj.City = pageVariable.handleCombinEOFrm.expressorder.RvCity;

            return m_condObj;
        },
        function (lstsolution) {

            pageVariable.handleCombinEOFrm.expressorder.LstSolution_Id = lstsolution.LstSolution_Id;
            pageVariable.handleCombinEOFrm.expressorder.LstCompanyName = lstsolution.LstCompanyName;
            pageVariable.handleCombinEOFrm.expressorder.LstSolutionName = lstsolution.LstSolutionName;
            pageVariable.handleCombinEOFrm.expressorder.ExpServiceCost = Number(lstsolution.TotalCharge) + Number(lstsolution.VATCharge);

            $("#lbCombinCost").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, pageVariable.handleCombinEOFrm.expressorder.ExpServiceCost.toFixed(2)));

            if (Number($("#lbBeforeCost").attr("tag")) < pageVariable.handleCombinEOFrm.expressorder.ExpServiceCost) {
                $("#lbCombinCost").css("color", "#FF0000");
            }

            $("#txtCBEstimatedShipTime").attr("maxavaitime", lstsolution.MaxAvaiTime);

            var m_shiptime = datastruct.convertion.convertToDateByStr($("#txtCBEstimatedShipTime").val());
            m_shiptime.setDate(m_shiptime.getDate() + Number(lstsolution.MaxAvaiTime));
            var m_year = m_shiptime.getFullYear();
            var m_month = Number(m_shiptime.getMonth()) + 1;
            m_arrivetimeCtrl.datepicker("setDate", m_year + "-" + m_month + "-" + m_shiptime.getDate());
            m_arrivetimeCtrl.trigger("change");
        });

        var m_shiptimeCtrl = $("#txtCBEstimatedShipTime");
        m_shiptimeCtrl.datepicker();
        m_arrivetimeCtrl.datepicker();

        var m_now = new Date();
        m_now.setDate(m_now.getDate());
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        m_shiptimeCtrl.datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        m_shiptimeCtrl.change(function () {
            var m_maxavailtime = $(this).attr("maxavaitime");
            if (m_maxavailtime) {
                var m_shiptime = datastruct.convertion.convertToDateByStr($(this).val());
                m_shiptime.setDate(m_shiptime.getDate() + Number(m_maxavailtime));
                var m_year = m_shiptime.getFullYear();
                var m_month = Number(m_shiptime.getMonth()) + 1;
                $("#txtCBEstimatedArriveTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_shiptime.getDate());

                m_arrivetimeCtrl.trigger("change");
            }
        });
        m_arrivetimeCtrl.change(function () {

            var m_isdelay = false;
            var m_arrivetime = $(this).val();
            if (m_arrivetime) {
                m_arrivetime = datastruct.convertion.convertToDateByStr(m_arrivetime);
                $.each(pageVariable.combinEOList.dataSource.items.arrValues, function () {
                    var m_time = datastruct.convertion.convertToDateByStr(this.EstimatedArriveTimeStr);
                    if (m_arrivetime > m_time) {
                        m_isdelay = true;
                    }
                });

                if (m_isdelay) {
                    $("#lbArriveAlert").text(mlm.C1358);
                    $(this).css("color", "#FF0000");
                }
                else {
                    $("#lbArriveAlert").text("");
                    $(this).css("color", "#000000");
                }
            }
            else {
                $("#lbArriveAlert").text("");
                $(this).css("color", "#000000");
            }
        });

        $("#txtCBLength, #txtCBWidth, #txtCBHeight").change(function () {
            pageVariable.selCBLstSolution.setLstSolution(null);
            var m_combincostCtrl = $("#lbCombinCost");
            m_combincostCtrl.text("");
            m_combincostCtrl.css("color", "#000000");
        });

        $("#btAddCBCustoms").click(openNewCustomFrm);
        m_custaddressCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });

        pageVariable.combinEOList = new uicontrol.tableList("combinEOList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         selectModel: "2",
                                         selectEvent: "selectCombinEO",
                                         keyColumn: "ExpressOrder_Id",
                                         height: 60,
                                         pageQueryHandler: queryExpressOrder,
                                         columns: [{ display: mlm.C1316, name: "EOCode", width: 90, align: 'left', adjust: true, createCell: constructCBEOCodeCell },
                                                   { display: mlm.C0719, name: "CustName", width: 120, align: 'left' },
                                                   { display: mlm.C0783, name: "", width: 150, align: 'left', adjust: true, createCell: constructCBLstSolutionCell },
                                                   { display: mlm.C1274, name: "WarehouseName", width: 90, align: 'left' },
                                                   { display: mlm.C1304 + mlm.C1303, name: "EstimatedShipTimeStr", width: 90, align: 'left', adjust: true, createCell: constructCBTimeCell },
                                                   { display: mlm.C1304 + mlm.C1305, name: "EstimatedArriveTimeStr", width: 90, align: 'left', adjust: true, createCell: constructCBTimeCell },
                                                   { display: mlm.C0806, name: "Weight", width: 60, align: 'right', adjust: true, createCell: constructCBWeightCell },
                                                   { display: mlm.C1261 + "(cm³)", name: "", width: 90, align: 'right', adjust: true, createCell: constructCBVolumnCell },
                                                   { display: mlm.C1319 + mlm.C0839, name: "ExpServiceCost", width: 75, align: 'right', adjust: true, createCell: constructCBCostCell}]
                                     });

        pageVariable.cbcustomsinfoList = new uicontrol.tableList("cbcustomsinfoList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 45,
                                        keyColumn: "EO_Custom_Id",
                                        columns: [{ display: mlm.C1307, name: "CustomProdName", width: 200, align: 'left' },
                                                { display: mlm.C1621, name: "CustomProdName_CN", width: 200, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 50, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                { display: mlm.C1310, name: "CustomValue", width: 70, align: 'right', adjust: true, createCell: createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 110, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 90, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 70, align: 'left' },
                                                { display: mlm.C0019, name: "", width: 75, align: 'center', adjust: true, createCell: createCBCustomOperaCell}]
                                    });
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);

    var m_custaddressArr = [];
    var m_addressArr = [];
    m_addressArr.push(m_expressorder.RvFullName);
    m_custaddressArr.push(m_expressorder.RvFullName);
    if (m_expressorder.RvAddress_1) {
        m_addressArr.push(m_expressorder.RvAddress_1);
        m_custaddressArr.push(m_expressorder.RvAddress_1);
    }
    if (m_expressorder.RvAddress_2) {
        m_addressArr.push(m_expressorder.RvAddress_2);
        m_custaddressArr.push(m_expressorder.RvAddress_2);
    }
    if (m_expressorder.RvCity) {
        m_addressArr.push(m_expressorder.RvCity);
        m_custaddressArr.push(m_expressorder.RvCity);
    }
    if (m_expressorder.RvProvince) {
        m_addressArr.push(m_expressorder.RvProvince);
        m_custaddressArr.push(m_expressorder.RvProvince);
    }
    if (m_expressorder.RvPostCode) {
        m_addressArr.push(m_expressorder.RvPostCode);
    }

    m_addressArr.push(m_expressorder.GlobalAreaName);
    m_custaddressArr.push(m_expressorder.GlobalArea_Id);
    m_custaddressCtrl.text(m_addressArr.join(" ,"));
    m_custaddressCtrl.attr("globalarea_id", m_expressorder.GlobalArea_Id);
    m_custaddressCtrl.attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(m_expressorder)));

    var m_cbweightCtrl = $("#lbCBWeight");
    m_cbweightCtrl.text("0.000 " + keycontext.keyparam.WUnit);
    m_cbweightCtrl.attr("tag", 0);
    $("#lbBeforeCost").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, 0));

    var m_exporder = new lstm.expressorder();
    m_exporder.CustAddress = m_custaddressArr.join("").replace("\\", "%").replaceAll("'", "@");

    var m_estime = null;
    m_exporder.queryExpressOrderForCombin(function (retTable) {
        pageVariable.combinEOList.bindDataSource(retTable);
    });

    $("#dvCBCustom").hide();
    pageVariable.cbcustomsinfoList.bindDataSource(null);

    pageVariable.handleCombinEOFrm.eo_custom_key = -10000;
    pageVariable.handleCombinEOFrm.expressorder = m_expressorder;
    pageVariable.handleCombinEOFrm.show();
}
/* 构建报关价值列 */
function createCustomValueCell(key, cellValue) {
    return commoncore.func.getCurrHtml(keycontext.keyparam.tax_syscurrsymbol, cellValue);
}
/* 选择合并配置单事件 */
function selectCombinEO() {

    var m_warehouse_id = 0;
    var m_warehousename = "";
    var m_globalarea_id = "";
    var m_areaindexs = "";
    var m_cbweightCtrl = $("#lbCBWeight");
    var m_cbbeforecostCtrl = $("#lbBeforeCost");
    var m_selectitems = pageVariable.combinEOList.getSelectedItems();
    if (m_selectitems.length > 0) {
        var m_weight = 0;
        var m_cost = 0;
        var m_customDict = new datastruct.dictionary();

        $.each(m_selectitems, function () {
            m_weight += Number(this.Weight);
            m_cost += Number(this.ExpServiceCost);

            if (m_warehouse_id == 0) {
                m_warehouse_id = this.Warehouse_Id;
                m_warehousename = this.WarehouseName;
                m_globalarea_id = this.GlobalArea_Id;
                m_areaindexs = this.WH_AreaIndexs;
            }
            else if (m_warehouse_id != this.Warehouse_Id) {
                m_warehouse_id = -1;
                m_warehousename = "";
                m_globalarea_id = 0;
                m_areaindexs = "";
            }

            var m_customs = datastruct.convertion.strToObject(this.Customs);

            $.each(m_customs, function () {
                var m_key = this.CustomProdName + this.CustomCode + this.CustomValue;
                var _customobj = m_customDict.getItem(m_key);
                if (_customobj) {
                    _customobj.CustomQty = Number(_customobj.CustomQty) + Number(this.CustomQty);
                }
                else {
                    this.EO_Custom_Id = pageVariable.handleCombinEOFrm.eo_custom_key;
                    m_customDict.setItem(m_key, this);
                    pageVariable.handleCombinEOFrm.eo_custom_key++;
                }
            });
        });

        pageVariable.cbcustomsinfoList.bindDataSource(m_customDict.arrValues);

        m_cbweightCtrl.text(m_weight.toFixed(2) + " " + keycontext.keyparam.WUnit);
        m_cbweightCtrl.attr("tag", m_weight);
        m_cbbeforecostCtrl.html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_cost));
        m_cbbeforecostCtrl.attr("tag", m_cost);

        if (m_warehouse_id == 0 || m_warehouse_id == -1) {
            pageVariable.selCBWarehouse.clear();
        }
        else {
            var m_warehouse = {};
            m_warehouse.Warehouse_Id = m_warehouse_id;
            m_warehouse.WarehouseName = m_warehousename;
            m_warehouse.AreaIndexs = m_areaindexs;
            m_warehouse.GlobalArea_Id = m_globalarea_id;
            pageVariable.selCBWarehouse.setWarehouse(m_warehouse);
        }
    }
    else {
        pageVariable.selCBWarehouse.clear();
        m_cbweightCtrl.text("0.00 " + keycontext.keyparam.WUnit);
        m_cbweightCtrl.attr("tag", 0);
        m_cbbeforecostCtrl.html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, 0));
        m_cbbeforecostCtrl.attr("tag", 0);

        pageVariable.cbcustomsinfoList.bindDataSource(null);
    }

    if (!pageVariable.selCBWarehouse.warehouse || pageVariable.selCBWarehouse.warehouse.AreaIndexs.indexOf("#" + $("#lbCustAddress").attr("globalarea_id") + "#") > -1) {
        $("#dvCBCustom").hide();
    }
    else {
        $("#dvCBCustom").show();
    }

    pageVariable.selCBLstSolution.setLstSolution(null);
    var m_combincostCtrl = $("#lbCombinCost");
    m_combincostCtrl.text("");
    m_combincostCtrl.css("color", "#000000");
}
/* 构建配送单号列 */
function constructCBEOCodeCell(key, cellValue) {
    return "<a onclick='viewExpressOrder.call(this, \"" + this.keyObj.ExpressOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.EOCode + "</a>";
} 
/* 构建物流方案列 */
function constructCBLstSolutionCell(key, cellValue) {
    return "<a onclick='openViewLstSolution.call(this, \"" + this.keyObj.LstSolution_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.LstSolutionName + "(" + this.keyObj.LstCompanyName + ")" + "</a>";
}
/* 构建时间列 */
function constructCBTimeCell(key, cellValue) {
    return commoncore.func.getTimeStrCell(cellValue);
}
/* 构建重量列 */
function constructCBWeightCell(key, cellValue) {
    return Number(cellValue).toFixed(3) + " " + this.keyObj.WUnit;
}
/* 构建体积列 */
function constructCBVolumnCell(key, cellValue) {
    return Number(this.keyObj.Length) + "*" + Number(this.keyObj.Width) + "*" + Number(this.keyObj.Height);
}
/* 构建运费列 */
function constructCBCostCell(key, cellValue) {
    return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
}
/* 构建报关操作列 */
function createCBCustomOperaCell(key, cellValue) {
    var m_htmls = [];

    m_htmls.push("<a href='javascript:void(\"0\")' class='bt-link' style='margin: 0px 5px 0px 0px' tag='" + key + "' onclick='openModifyCustomFrm.call(this);'>" + mlm.C0061 + "</a>");
    m_htmls.push("<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDeleteCustomFrm.call(this);'>" + mlm.C0062 + "</a>");

    return m_htmls.join("");
}
/* 打开新增报关信息窗体 */
function openNewCustomFrm() {
    if (!pageVariable.handlerCustomFrm) {
        pageVariable.handlerCustomFrm = new uicontrol.dialog("handlerCustomFrm", "", { width: 800, position: ["auto", 45] }, saveCustom);

        pageVariable.selFactoryCountry = new bizcontrol.selectglobalarea("selFactoryCountry", true, "country");
    }

    $("#txtCustomProdName").val("");
    $("#txtCustomProdName_CN").val("");
    $("#txtCustomValue").val("0.00");
    $("#txtCustomQty").val("0");
    $("#txtCustomCode").val("");
    $("#txtCustomMaterial").val("");
    pageVariable.selFactoryCountry.clear();

    pageVariable.handlerCustomFrm.action = "New";
    pageVariable.handlerCustomFrm.setTitle(mlm.C0530 + mlm.C1307);
    pageVariable.handlerCustomFrm.show();
}
/* 打开修改报关窗体 */
function openModifyCustomFrm() {
    if (!pageVariable.handlerCustomFrm) {
        pageVariable.handlerCustomFrm = new uicontrol.dialog("handlerCustomFrm", "", { width: 800, position: ["auto", 45] }, saveCustom);

        pageVariable.selFactoryCountry = new bizcontrol.selectglobalarea("selFactoryCountry", true, "country");
    }

    pageVariable.handlerCustomFrm.eo_custom_id = $(this).attr("tag");
    var m_obj = pageVariable.cbcustomsinfoList.getItem(pageVariable.handlerCustomFrm.eo_custom_id);

    $("#txtCustomProdName").val(m_obj.CustomProdName);
    $("#txtCustomProdName_CN").val(m_obj.CustomProdName_CN);
    $("#txtCustomValue").val(Number(m_obj.CustomValue).toFixed(2));
    $("#txtCustomCode").val(m_obj.CustomCode);
    $("#txtCustomMaterial").val(m_obj.CustomMaterial);
    $("#txtCustomQty").val(m_obj.CustomQty);
    pageVariable.selFactoryCountry.setObj({ globalArea_Ids: m_obj.GlobalArea_Id, globalAreaNames: m_obj.GlobalAreaName });

    pageVariable.handlerCustomFrm.action = "Modify";
    pageVariable.handlerCustomFrm.setTitle(mlm.C0061 + mlm.C1307);
    pageVariable.handlerCustomFrm.show();
}
/* 打开删除报关商品的窗体 */
function openDeleteCustomFrm() {
    if (!pageVariable.delelteCustomFrm) {
        pageVariable.delelteCustomFrm = new uicontrol.confirmDelete(deleteCustom);
    }

    pageVariable.delelteCustomFrm.eo_custom_id = $(this).attr("tag");

    var m_obj = pageVariable.cbcustomsinfoList.getItem(pageVariable.delelteCustomFrm.eo_custom_id);

    pageVariable.delelteCustomFrm.showConfirm(mlm.C0464 + mlm.C1307 + "(" + m_obj.CustomProdName + ") ?");
}
/* 保存报关数据 */
function saveCustom() {
    var m_customprodname = $.trim($("#txtCustomProdName").val());
    if (!m_customprodname) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1307 + mlm.C0713);
        return;
    }
    var m_customqty = $("#txtCustomQty").val();
    if (!m_customqty || m_customqty == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1098 + mlm.C1351);
        return;
    }
    var m_customvalue = $("#txtCustomValue").val();
    if (!m_customvalue || m_customvalue == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1310 + mlm.C1351);
        return;
    }

    var m_eo_custom = null;
    if (pageVariable.handlerCustomFrm.action == "New") {
        m_eo_custom = {};
    }
    else {
        m_eo_custom = pageVariable.cbcustomsinfoList.getItem(pageVariable.handlerCustomFrm.eo_custom_id);
    }

    m_eo_custom.CustomProdName = m_customprodname;
    m_eo_custom.CustomProdName_CN = $.trim($("#txtCustomProdName_CN").val());
    m_eo_custom.CustomCode = $.trim($("#txtCustomCode").val());
    m_eo_custom.CustomMaterial = $.trim($("#txtCustomMaterial").val());
    m_eo_custom.CustomQty = m_customqty;
    m_eo_custom.CustomValue = m_customvalue;

    var m_countryObj = pageVariable.selFactoryCountry.getObj();
    if (m_countryObj) {
        m_eo_custom.FactoryCountry = m_countryObj.globalArea_Ids;
        m_eo_custom.GlobalAreaName = m_countryObj.globalAreaNames;
    }
    else {
        m_eo_custom.FactoryCountry = 0;
        m_eo_custom.GlobalAreaName = "";
    }

    if (pageVariable.handlerCustomFrm.action == "New") {
        m_eo_custom.EO_Custom_Id = pageVariable.handleCombinEOFrm.eo_custom_key;
        pageVariable.cbcustomsinfoList.addData(m_eo_custom.EO_Custom_Id, m_eo_custom);
        pageVariable.handleCombinEOFrm.eo_custom_key++;
    }
    else {
        pageVariable.cbcustomsinfoList.modifyData(m_eo_custom.EO_Custom_Id, m_eo_custom);
    }

    pageVariable.selCBLstSolution.setLstSolution(null);
    var m_combincostCtrl = $("#lbCombinCost");
    m_combincostCtrl.text("");
    m_combincostCtrl.css("color", "#000000");

    pageVariable.handlerCustomFrm.close();
}
/* 删除报关商品 */
function deleteCustom() {
    pageVariable.cbcustomsinfoList.deleteData(pageVariable.delelteCustomFrm.eo_custom_id);

    pageVariable.selCBLstSolution.setLstSolution(null);
    var m_combincostCtrl = $("#lbCombinCost");
    m_combincostCtrl.text("");
    m_combincostCtrl.css("color", "#000000");

    pageVariable.delelteCustomFrm.close();
}
/* 合并订单 */
function combindEO() {
    var m_weight = Number($("#lbCBWeight").attr("tag"));
    if (m_weight == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1355);
        return false;
    }

    var m_selectitems = pageVariable.combinEOList.getSelectedItems();
    if (m_selectitems.length == 1) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1359);
        return false;
    }

    var m_length = Number($("#txtCBLength").val());
    var m_width = Number($("#txtCBWidth").val());
    var m_height = Number($("#txtCBHeight").val());
    if (m_height * m_width * m_length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1356);
        return false;
    }

    if (!pageVariable.selCBWarehouse.warehouse_id || pageVariable.selCBWarehouse.warehouse_id == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1357);
        return false;
    }

    if (!pageVariable.selCBLstSolution.LstSolution_Id || pageVariable.selCBLstSolution.LstSolution_Id == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1360);
        return false;
    }

    var m_shiptime = datastruct.convertion.convertToDateByStr($("#txtCBEstimatedShipTime").val());
    var m_arrivetime = datastruct.convertion.convertToDateByStr($("#txtCBEstimatedArriveTime").val());
    if (pageVariable.nowdate > m_shiptime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1361);
        return;
    }
    if (m_shiptime > m_arrivetime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1362);
        return;
    }

    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Ids = [];

    var m_customer_id = "-1";
    $.each(m_selectitems, function () {
        m_expressorder.ExpressOrder_Ids.push(this.ExpressOrder_Id);
       
        if (m_customer_id == "-1") {
            m_customer_id = this.Customer_Id;
        }
        else if (this.Customer_Id != m_customer_id) {
            m_customer_id = 0;
        }
    });

    var m_combinexpressorder = {};
    m_combinexpressorder.Weight = m_weight;
    m_combinexpressorder.Length = m_length;
    m_combinexpressorder.Width = m_width;
    m_combinexpressorder.Height = m_height;
    m_combinexpressorder.LstSolution_Id = pageVariable.selCBLstSolution.LstSolution_Id;
    m_combinexpressorder.IsTrack = !$.trim(pageVariable.selCBLstSolution.LstSolution.TrackWebAddress) ? 0 : 1;
    m_combinexpressorder.LstCompanyName = pageVariable.selCBLstSolution.LstSolution.LstCompanyName;
    m_combinexpressorder.LstSolutionName = pageVariable.selCBLstSolution.LstSolution.LstSolutionName;
    m_combinexpressorder.ExpServiceCost = pageVariable.handleCombinEOFrm.expressorder.ExpServiceCost;
    m_combinexpressorder.EstimatedShipTime = $("#txtCBEstimatedShipTime").val();
    m_combinexpressorder.EstimatedArriveTime = $("#txtCBEstimatedArriveTime").val();
    m_combinexpressorder.Warehouse_Id = pageVariable.selCBWarehouse.warehouse_id;
    m_combinexpressorder.Customer_Id = m_customer_id;
    m_combinexpressorder.RvFullName = pageVariable.handleCombinEOFrm.expressorder.RvFullName.replace("\\", "%").replaceAll("'", "@"); ;
    m_combinexpressorder.RvTel = pageVariable.handleCombinEOFrm.expressorder.RvTel;
    m_combinexpressorder.GlobalArea_Id = pageVariable.handleCombinEOFrm.expressorder.GlobalArea_Id;
    m_combinexpressorder.RvProvince = pageVariable.handleCombinEOFrm.expressorder.RvProvince.replace("\\", "%").replaceAll("'", "@"); ;
    m_combinexpressorder.RvCity = pageVariable.handleCombinEOFrm.expressorder.RvCity.replace("\\", "%").replaceAll("'", "@"); ;
    m_combinexpressorder.RvPostCode = pageVariable.handleCombinEOFrm.expressorder.RvPostCode;
    m_combinexpressorder.RvAddress_1 = pageVariable.handleCombinEOFrm.expressorder.RvAddress_1.replace("\\", "%").replaceAll("'", "@"); ;
    m_combinexpressorder.RvAddress_2 = pageVariable.handleCombinEOFrm.expressorder.RvAddress_2.replace("\\", "%").replaceAll("'", "@"); ;

    m_combinexpressorder.Customs = [];
    $.each(pageVariable.cbcustomsinfoList.dataSource.items.arrValues, function () {
        var m_custom = {};
        m_custom.SaleOrder_Id = this.SaleOrder_Id;
        m_custom.SO_Custom_Id = this.SO_Custom_Id;
        m_custom.CustomProdName = this.CustomProdName;
        m_custom.CustomProdName_CN = this.CustomProdName_CN;
        m_custom.CustomQty = this.CustomQty;
        m_custom.CustomValue = this.CustomValue ? this.CustomValue : 0;
        m_custom.CustomCode = this.CustomCode;
        m_custom.FactoryCountry = this.FactoryCountry;
        m_custom.CustomMaterial = this.CustomMaterial;

        m_combinexpressorder.Customs.push(m_custom);
    });

    m_expressorder.CombinExpressOrder = m_combinexpressorder;
    m_expressorder.combinExpressOrder(function () {

        pageVariable.querycondition.EOState = 300;
        pageVariable.action = "combin";
        queryExpressOrder(1, pageVariable.expressorderList.pageNumber);

        loadEOState();

        pageVariable.handleCombinEOFrm.close();
    });
}

/* 打开拆分包裹窗体 */
function openSplitEO(key) {
    if (!pageVariable.handleSplitEOFrm) {
        pageVariable.handleSplitEOFrm = new uicontrol.dialog("handleSplitEOFrm", mlm.C1334, { width: 800 }, splitEO);
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);

    $("#lbSplitEOInfo").text(mlm.C1363 + "(" + m_expressorder.EOCode + ")," + mlm.C1335);

    pageVariable.handleSplitEOFrm.expressorder_id = key;
    pageVariable.handleSplitEOFrm.show();
}
/* 拆分包裹 */
function splitEO() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Id = pageVariable.handleSplitEOFrm.expressorder_id;
    m_expressorder.splitExpressOrder(function () {

        queryExpressOrder(1, pageVariable.expressorderList.pageNumber);
        loadEOState();

        pageVariable.handleSplitEOFrm.close();
    });
}

/* 查看包裹处理窗体 */
function viewEOPackage(key) {
    if (!pageVariable.viewEOPackageFrm) {
        pageVariable.viewEOPackageFrm = new uicontrol.dialog("viewEOPackageFrm", mlm.C1364, { width: 1125, position: ["auto", 15] });
        pageVariable.eopackageTabs = $("#eopackageTabs").tabs();
        
        $("#btExportEPProd").click(exportEOProducts);
        $("#btExportEPEO").click(openExportExpressOrderFrm);
        
        pageVariable.eoproductList = new uicontrol.tableList("eoproductList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        keyColumn: "KeyId",
                                        height: 400,
                                        columns: [{ display: mlm.C1274, name: "WarehouseName", width: 90, align: 'left' },
                                                  { display: mlm.C0416, name: "SalePlatform", width: 60, align: 'left', adjust: true, createCell: constructSPTypeCell },
                                                  { display: mlm.C0402, name: "BrowsePicUrl", width: 72, align: 'left', adjust: true, createCell: constructEOProdPicCell },
                                                  { display: mlm.C0734, name: "", width: 500, align: 'left', adjust: true, createCell: constructEOProdCell },
                                                  { display: mlm.C1366, name: "Qty", width: 60, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell }]
                                    });

        pageVariable.eopackageList = new uicontrol.tableList("eopackageList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        keyColumn: "ExpressOrder_Id",
                                        height: 400,
                                        columns: [{ display: mlm.C1274, name: "WarehouseName", width: 100, align: 'left' },
                                                  { display: mlm.C1299, name: "", width: 160, align: 'left', adjust: true, createCell: constructEOrderCell },
                                                  { display: mlm.C1226, name: "", width: 120, align: 'left', adjust: true, createCell: constructEORvFullNameCell },
                                                  { display: mlm.C0807, name: "ExpServiceCost", width: 75, align: 'right', adjust: true, createCell: constructCBCostCell },
                                                  { display: mlm.C1301, name: "", width: 60, align: 'right', adjust: true, createCell: constructEOWeightCell },
                                                  { display: mlm.C0734, name: "", width: 400, align: 'left', adjust: true, createCell: constructEOProductCell}]
                                    });
    }

    var m_expressorder = new lstm.expressorder();
    m_expressorder.queryEOProductForPackage(function (retTables) {
        var m_i = 0;
        $.each(retTables[0], function () {
            this.KeyId = m_i;
            m_i++;
        });
//        pageVariable.eoproductList.bindDataSource(retTables[0]);
//        pageVariable.eopackageList.bindDataSource(retTables[1]);

        var m_i = 0;
        var m_key = "";
        var m_eolist = $("#eopackageList");
        $.each(retTables[1], function () {
            if (this.IsOK == "0") {
                var m_tds = m_eolist.find("#row" + this.ExpressOrder_Id).find("td");
                m_tds.css("background-color", "#FFEDE6");

                var _key = this.Warehouse_Id + "-" + this.LstCompanyName; +"-" + this.LstSolution_Id;
                if (m_key != _key) {
                    m_key = _key;
                    m_i = 0;
                }
                if (m_i != 0) {
                    m_tds.css("border-top-color", "#C0C0C0");
                    m_tds.css("border-top-style", "solid");
                    m_tds.css("border-top-width", "1px");
                }
                m_i++;
            }

        });
    });

    pageVariable.viewEOPackageFrm.show(key);
}
/* 构建站点列 */
function constructSPTypeCell(key, cellValue) {
    if (this.keyObj.SalePlatform == "1") {
        return "外贸";
    }
    else {
        return "淘宝";
    }
}
/* 构建配送单列 */
function constructEOrderCell(key, cellValue) {
    var m_arr = [];

    m_arr.push("<div style='padding: 0px;'><a onclick='openViewLstSolution.call(this, \"" + this.keyObj.LstSolution_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.LstSolutionName + "(" + this.keyObj.LstCompanyName + ")" + "</a></div>");
    m_arr.push("<div style='padding: 3px 0px 0px 0px;'><a onclick='viewExpressOrder.call(this, \"" + this.keyObj.ExpressOrder_Id + "\", \"" + key + "\")' href='javascript:void(\"0\");'>" + this.keyObj.EOCode + "</a></div>");
    
    return m_arr.join("");
}
/* 构建收件人列 */
function constructEORvFullNameCell(key, cellValue) {
    var m_arr = [];

    m_arr.push("<div style='padding: 0px;'><span>" + this.keyObj.RvFullName + "</span>");
    m_arr.push("<span> (" + this.keyObj.GlobalAreaName + ")</span></div>");

    return m_arr.join("");
}
/* 构建包裹重量列 */
function constructEOWeightCell(key, cellValue) {
    var m_arr = [];

    m_arr.push("<span style='padding: 0px;'>" + Number(this.keyObj.Weight).toFixed(3) + " " + this.keyObj.WUnit + "</span>");

    return m_arr.join("");
}
/* 构建包裹商品列 */
function constructEOProductCell(key, cellValue) {
    var m_arr = [];

    var m_eoproducts = datastruct.convertion.strToObject(this.keyObj.ProductJson);
    var m_i = 1;
    $.each(m_eoproducts, function () {

        if (m_i == m_eoproducts.length) {
            m_arr.push("<div style='padding: 5px 0px 5px 0px; color: #666'>");
        }
        else {
            m_arr.push("<div style='border-bottom-color: #ddd; border-bottom-width: 1px; border-bottom-style: solid; padding: 5px 0px 5px 0px; color: #666'>");
        }

        var m_css = "";
        if (this.IsMiss) {
            m_css = "text-decoration: line-through";
        }

        m_arr.push("<div style='padding: 0px'><span style='width: 280px; float: left'><a style='color: #000000; text-decoration: none;" + m_css + "' onclick='viewProduct.call(this, \"" + this.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.SkuProdCode + " - " + this.ProdName + " - [" + this.SkuProps + "]</a></span>");
        m_arr.push("<span style='float: right;" + m_css + "'>" + mlm.C1098 + ": " + Number(this.Qty) + "</span>");
        m_arr.push("</div>");
        m_arr.push("</div>");
        m_i++;
    });

    return m_arr.join("");
}
/* 构建商品图片列 */
function constructEOProdPicCell(key, cellValue) {
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
/* 构建商品列 */
function constructEOProdCell(key, cellValue) {
    return "<a style='color: #000000; text-decoration: none' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]" + "</a>";
}
/* 查询捡货清单 */
function queryEOProduct(pageNum, pageCount) {
    var m_saleorder = new sm.saleorder();
    m_saleorder.Page = pageNum;
    m_saleorder.PageNum = pageCount;
    m_saleorder.getEOProduct(function (retTable) {

        pageVariable.eoproductList.bindDataSource(retTable);
    });
}

/* 查看交运处理的窗体 */
function viewDeliveryEO() {
    if (!pageVariable.viewDeliveryEOFrm) {
        pageVariable.viewDeliveryEOFrm = new uicontrol.dialog("viewDeliveryEOFrm", mlm.C1289, { width: 1125, position: ["auto", 15] });

        $("#btExportDeliveryEO").click(exportDeliveryEO);

        pageVariable.deliveryeoList = new uicontrol.tableList("deliveryeoList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        keyColumn: "EO_Key",
                                        height: 400,
                                        columns: [{ display: mlm.C1274, name: "WarehouseName", width: 100, align: 'left' },
                                                  { display: mlm.C0824, name: "LstCompanyName", width: 150, align: 'left' },
                                                  { display: mlm.C0783, name: "LstSolutionName", width: 150, align: 'left' },
                                                  { display: mlm.C1268, name: "LstSolutionItemName", width: 100, align: 'left' },
                                                  { display: mlm.C1299 + mlm.C1098, name: "EOCount", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                  { display: mlm.C0839, name: "ExpServiceCost", width: 80, align: 'right', adjust: true, createCell: constructCBCostCell}]
                                    });
    }

    var m_expressorder = new lstm.expressorder();
    m_expressorder.getDeliveryStat(function (retTable) {

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        var m_i = 0;
        $.each(m_jsonobjs, function () {
            this.EO_Key = m_i;
            m_i++;
        });

        pageVariable.deliveryeoList.bindDataSource(m_jsonobjs, retTable.TotalCount);
    });

    pageVariable.viewDeliveryEOFrm.show();
}

/* 打开签收窗体 */
function openReceiveRet(key) {
    if (!pageVariable.handleReceiveRetFrm) {
        pageVariable.handleReceiveRetFrm = new uicontrol.dialog("handleReceiveRetFrm", "", { width: 900 }, receiveRet);

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtReceiveRetTime").datepicker();
        $("#txtReceiveRetTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        pageVariable.selectRevWH = new bizcontrol.selectwarehouse($("#selectRevWH"), null, "1");

        if (!pageVariable.revretproList) {
            pageVariable.revretproList = new uicontrol.tableList("revretproList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SkuProduct_Id",
                                         height: 80,
                                         columns: [{ display: mlm.C1264, name: "", width: 500, align: 'left', adjust: true, createCell: constructRevProdCell },
                                                   { display: mlm.C1368, name: "Qty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1369, name: "", width: 70, align: 'center', adjust: true, createCell: constructRevdProdQtyCell },
                                                   { display: mlm.C1370, name: "", width: 70, align: 'center', adjust: true, createCell: constructDamageQtyCell}]
                                     });
        }
    }

    var m_expressorder = pageVariable.expressorderList.getItem(key);

    var m_eoproducts = datastruct.convertion.strToObject(m_expressorder.ProductJson);
    $.each(m_eoproducts, function () {
        this.RevQty = this.Qty;
    });
    pageVariable.revretproList.bindDataSource(m_eoproducts);

    pageVariable.handleReceiveRetFrm.expressorder_id = key;
    pageVariable.handleReceiveRetFrm.setTitle(mlm.C1371 + "(" + m_expressorder.EOCode + ")");
    pageVariable.handleReceiveRetFrm.show();
}
/* 构建产品列 */
function constructRevProdCell(key, cellValue) {
    return "<div style='padding: 0px 0px 0px 5px;'><a style='color: #000000; text-decoration: none;' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a></div>";
} 
/* 构建签收数量列 */
function constructRevdProdQtyCell(key, cellValue) {
    return "<input type='text' class='text-input' style='width: 55px' onkeypress='uicontrol.func.checkInputNumber(event);' onchange='changeRevQty.call(this, \"" + key+ "\");' value='" + Number(this.keyObj.Qty) + "' />";
}
/* 构建损坏数量列 */
function constructDamageQtyCell(key, cellValue) {
    return "<input type='text' class='text-input' style='width: 55px' onkeypress='uicontrol.func.checkInputNumber(event);' onchange='changeDamageQty.call(this, \"" + key + "\");' value='0.00' />";
}
/* 改变签收数量 */
function changeRevQty(key) {
    
    var m_obj = pageVariable.revretproList.getItem(key);
    var m_revQty = 0;
    if (!$(this).val()) {
        $(this).val("0");
        return;
    }
    m_revQty = Number($(this).val());

    var m_qty = Number(m_obj.Qty);
    if (m_revQty > m_qty) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1372);
        m_revQty = m_qty;
        $(this).val(m_revQty);
    }

    m_obj.RevQty = m_revQty;
}
/* 改变损坏数量 */
function changeDamageQty(key) {

    var m_obj = pageVariable.revretproList.getItem(key);
    var m_damageQty = 0;
    if (!$(this).val()) {
        $(this).val("0");
        return;
    }
    m_damageQty = Number($(this).val());

    var m_revQty = Number(m_obj.RevQty);
    if (m_damageQty > m_revQty) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1373);
        m_damageQty = 0;
        $(this).val(m_damageQty);
    }

    m_obj.DamageQty = m_damageQty;
}
/* 签收 */
function receiveRet() {
    if (!pageVariable.selectRevWH.warehouse_id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1342 + mlm.C1274);
        return false;
    }
    var m_receivetime = datastruct.convertion.convertToDateStr($("#txtReceiveRetTime").val());
    if (datastruct.convertion.convertToDateByStr(m_receivetime) > pageVariable.nowdate) {

        pageframe.control.alertDialog.showAlertInfo(mlm.C1374);
        return;
    }

    var m_expressorder = new lstm.expressorder();
    m_expressorder.ExpressOrder_Id = pageVariable.handleReceiveRetFrm.expressorder_id;
    m_expressorder.Warehouse_Id = pageVariable.selectRevWH.warehouse_id;
    m_expressorder.ReceiveTime = m_receivetime;
    m_expressorder.EO_Products = [];

    var m_error = "";
    $.each(pageVariable.revretproList.dataSource.items.arrValues, function () {
        if (m_error) {
            return;
        }
        var m_eo_product = {};
        m_eo_product.EO_Product_Id = this.EO_Product_Id;
        m_eo_product.ExpressOrder_Id = this.ExpressOrder_Id;
        m_eo_product.Product_Id = this.Product_Id;
        m_eo_product.SkuProduct_Id = this.SkuProduct_Id;
        m_eo_product.Qty = this.Qty;
        m_eo_product.RevQty = this.RevQty;
        m_eo_product.DamageQty = this.DamageQty;

        if (Number(m_eo_product.DamageQty) > Number(m_eo_product.RevQty)) {
            m_error = mlm.C1373;
            return;
        }

        m_expressorder.EO_Products.push(m_eo_product);
    });

    if (m_error) {
        pageframe.control.alertDialog.showAlertInfo(m_error);
        return;
    }

    m_expressorder.receiveEORet(function () {

        pageVariable.expressorderList.deleteData(m_expressorder.ExpressOrder_Id);
        loadEOState();

        pageVariable.handleReceiveRetFrm.close();
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
/* 查看客户 */
function openViewCustFrm(key) {
    if (!pageVariable.viewCustomerFrm) {
        pageVariable.viewCustomerFrm = new bizcontrol.viewcustomer();
    }
    pageVariable.viewCustomerFrm.show(key);
}
/* 查看配送服务 */
function openViewExpServiceFrm(key) {
    if (!pageVariable.viewExpServiceFrm) {
        pageVariable.viewExpServiceFrm = new bizcontrol.viewexpressservice();
    }
    pageVariable.viewExpServiceFrm.show(key);
}
/* 查看物流解决方案窗体 */
function openViewLstSolution(key) {
    if (!pageVariable.viewLstSolutionFrm) {
        pageVariable.viewLstSolutionFrm = new bizcontrol.viewlstsolution();
    }
    pageVariable.viewLstSolutionFrm.show(key);
}
/* 查看物流解决方案窗体 */
function openViewLstSolution(key) {
    if (!pageVariable.viewLstSolutionFrm) {
        pageVariable.viewLstSolutionFrm = new bizcontrol.viewlstsolution();
    }
    pageVariable.viewLstSolutionFrm.show(key);
}
/* 查看售后问题 */
function viewASProblem(key) {
    if (!pageVariable.viewASProblemFrm) {
        pageVariable.viewASProblemFrm = new bizcontrol.viewasproblem();
    }
    pageVariable.viewASProblemFrm.show(key);
}
/* 查看配送单 */
function viewExpressOrder(key) {
    if (!pageVariable.viewExpressOrderFrm) {
        pageVariable.viewExpressOrderFrm = new bizcontrol.viewexpressorder();
    }
    pageVariable.viewExpressOrderFrm.show(key);
}
/* 导出配送产品*/
function exportEOProducts() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.exportEOProductForPackage(function (paramObj) {
        window.open(paramObj);
    });
}
/* 打开导出配送单窗体 */
function openExportExpressOrderFrm() {
    if (!pageVariable.handlerExportEOFrm) {
        pageVariable.handlerExportEOFrm = new uicontrol.dialog("handlerExportEOFrm", mlm.C0987 + mlm.C1298, { width: 800 }, exportExpressOrder);
    }

    pageVariable.handlerExportEOFrm.show();
}
/* 导出配送单*/
function exportExpressOrder() {

    var m_expressorder = new lstm.expressorder();
    m_expressorder.ZTTrackCode = $("#txtZTTrackCode").val();
    m_expressorder.exportExpressOrder(function (retobj) {
        if (retobj == "ok") {
            pageVariable.handlerExportEOFrm.close();
        }
        else {
            pageVariable.handlerExportEOFrm.close();

            webhandler.ajaxHandler._errorEvent(retobj);
        }
    });
}
/*  打开导入配送单的窗体 */
function openImportExpressOrder() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importExpressOrder);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    var m_tag = $(this).attr("tag");
    if (m_tag == "importpackage") {
        pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C1288);
    }
    else if (m_tag == "import4pxorder") {
        pageVariable.handlerImportFrm.setTitle(mlm.C1645);
    }
    else {
        pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C1289);
    }

    pageVariable.handlerImportFrm.action = m_tag;
    pageVariable.handlerImportFrm.show();
}
/* 导入配送单 */
function importExpressOrder() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    var expressorder = new lstm.expressorder();

    if (pageVariable.handlerImportFrm.action == "importpackage") {
        expressorder.importExpressOrder(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            loadEOState();
            queryExpressOrder(1, pageVariable.expressorderList.pageNumber);

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.action == "import4pxorder") {
        expressorder.importPre4PXEO(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            pageVariable.handlerImportFrm.close();
        });
    }
    else {
        expressorder.importDeliveryEO(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            loadEOState();
            queryExpressOrder(1, pageVariable.expressorderList.pageNumber);

            pageVariable.handlerImportFrm.close();
        });
    }
}
/* 导出交运详细清单*/
function exportDeliveryEO() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.exportDeliveryEO(function (paramObj) {
        window.open(paramObj);
    });
}
/* 查看客户订单 */
function viewSaleOrder(key) {
    if (!pageVariable.viewSaleOrderFrm) {
        pageVariable.viewSaleOrderFrm = new bizcontrol.viewsaleorder();
    }
    pageVariable.viewSaleOrderFrm.show(key);
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
/*  */
function openExportSMTTrkNumFrm() {
    if (!pageVariable.handlerExportSMTFrm) {
        pageVariable.handlerExportSMTFrm = new uicontrol.dialog("handlerExportSMTFrm", mlm.C1646, { width: 800 }, exportSMTTrkNum);

        var m_saleSiteCtrl = $("#ddlSMTSite");
        var m_saleplatform = new sm.saleplatform();
        m_saleplatform.queryAvaiSaleSites(function (retTable) {
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

            $.each(m_jsonobjs, function () {
                if (this.SalePlatform_Id == "5") {
                    m_saleSiteCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
                }
            });
        });
    }

    pageVariable.handlerExportSMTFrm.show();
}
/* */
function exportSMTTrkNum() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.SaleSite_Id = $("#ddlSMTSite").val();
    m_expressorder.exportSMTTrackingNumber(function (paramObj) {
        window.open(paramObj);
    });

    pageVariable.handlerExportSMTFrm.close();
}
/* */
function exportEOCharge() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder.exportEOCharge(function (paramObj) {
        window.open(paramObj);
    });
}
/* */
function exportPackageExpressOrder() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder = $.extend(m_expressorder, pageVariable.querycondition);

    m_expressorder.exportPackageExpressOrder(function (paramObj) {
        window.open(paramObj);
    });
}
/*  */
function openExportSMTShippingLable() {
    if (!pageVariable.handlerExportShippingLableFrm) {
        pageVariable.handlerExportShippingLableFrm = new uicontrol.dialog("handlerExportShippingLableFrm", "生成SMT发货标签", { width: 800 }, exportShippingLable);

        var m_saleSiteCtrl = $("#ddlESMTSite");
        var m_saleplatform = new sm.saleplatform();
        m_saleplatform.queryAvaiSaleSites(function (retTable) {
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

            $.each(m_jsonobjs, function () {
                if (this.appKey) {
                    m_saleSiteCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
                }
            });
        });
    }

    pageVariable.handlerExportShippingLableFrm.show();
}
/* */
function exportShippingLable() {
    var m_expressorder = new lstm.expressorder();
    m_expressorder = $.extend(m_expressorder, pageVariable.querycondition);
    m_expressorder.SaleSite_Id = $("#ddlESMTSite").val();

    m_expressorder.exportShippingLable(function (paramObj) {
        window.open(paramObj);
        pageVariable.handlerExportShippingLableFrm.close();
    });
}

/* 生成SMT发货标签 */
function generateSMTShipLabel() {

    pageframe.control.processCtrl.showOperaProcess();

    var m_func = function (index, m_jsonobjs) {

        var item = m_jsonobjs[index];
        if (!item) {
            pageframe.control.processCtrl.hideOperaProcess();
            return;
        }
        var m_saleorder_item = new sm.saleorder();
        m_saleorder_item.ExpressOrder_Id = item.ExpressOrder_Id;
        m_saleorder_item.generateSMTShipLable(function (paramObj) {
            if (index < m_jsonobjs.length - 1) {
                index++;
                m_func(index, m_jsonobjs);
            }
            else {
                var m_saleorder_export = new sm.saleorder();
                m_saleorder_export.exportSMTShipLableErrors(function (paramObj) {

                    loadEOState();

                    if (paramObj.indexOf(".xls") > -1) {
                        pageframe.control.processCtrl.hideOperaProcess();
                        window.open(paramObj);
                    }
                    else {
                        pageframe.control.processCtrl.hideOperaProcess();
                        pageframe.control.alertDialog.showAlertInfo(paramObj);
                    }
                });
            }

        }, function (err) {
            if (err.Message && err.Message.indexOf("http://gw.api.alibaba.com") > -1) {
                window.location = err.Message;
            }
            else {

                pageframe.control.processCtrl.hideOperaProcess();

                webhandler.ajaxHandler._errorEvent(err);
            }
        });
    };

    var m_saleorder = new sm.saleorder();
    m_saleorder.querySMTShipLable(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        m_func(0, m_jsonobjs);
    });
}
/* 生成SMT跟踪号 */
function generateSMTTrackingNumber() {

    pageframe.control.processCtrl.showOperaProcess();

    var m_func = function (index, m_jsonobjs) {

        var item = m_jsonobjs[index];
        if (!item) {
            pageframe.control.processCtrl.hideOperaProcess();
            return;
        }
        var m_saleorder_item = new sm.saleorder();

        m_saleorder_item.ExpressOrder_Id = item.ExpressOrder_Id;
        m_saleorder_item.SaleSite_Id = item.SaleSite_Id;
        m_saleorder_item.SOCode = item.SOCode;
        m_saleorder_item.OutEOCode = item.OutEOCode;
        m_saleorder_item.access_token = item.access_token;
        m_saleorder_item.appKey = item.appKey;
        m_saleorder_item.appSecret = item.appSecret;

        m_saleorder_item.generateSMTTrackingNumber(function (paramObj) {
            if (index < m_jsonobjs.length - 1) {
                index++;
                m_func(index, m_jsonobjs);
            }
            else {
                var m_saleorder_export = new sm.saleorder();
                m_saleorder_export.exportSMTTrackingNumberErrors(function (paramObj) {

                    loadEOState();

                    if (paramObj.indexOf(".xls") > -1) {
                        pageframe.control.processCtrl.hideOperaProcess();
                        window.open(paramObj);
                    }
                    else {
                        pageframe.control.processCtrl.hideOperaProcess();
                        pageframe.control.alertDialog.showAlertInfo(paramObj);
                    }
                });
            }

        }, function (err) {
            if (err.Message && err.Message.indexOf("http://gw.api.alibaba.com") > -1) {
                window.location = err.Message;
            }
            else {

                pageframe.control.processCtrl.hideOperaProcess();

                webhandler.ajaxHandler._errorEvent(err);
            }
        });
    };

    var m_saleorder = new sm.saleorder();
    m_saleorder.querySMTTrackingNumber(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        m_func(0, m_jsonobjs);
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* ECMS-站点配送处理 */
    document.title = "ECMS-" + mlm.C1246;
    
    /* 站点配送列表 */
    $("#lbExpressOrder").text(mlm.C1246 + mlm.C0463);
    /* 配送列表 */
    $("#lbExpServiceTitle").text(mlm.C1278 + mlm.C0463);
    /* 待合并 */
    $("#btWaitCombine").val(mlm.C1279);
    /* 待打包 */
    $("#btWaitPackage").val(mlm.C1280);
    /* 待交运 */
    $("#btWaitDelivery").val(mlm.C1281);
    /* 运输中 */
    $("#btShipping").val(mlm.C1282);
    /* 待退件处理 */
    $("#btWaitHandleReturn").val(mlm.C1285);
    /* 查询配送单 */
    $("#btQueryEO").val(mlm.C1286);
    /* 包裹处理清单 */
    $("#btViewPackage").text(mlm.C1287); 
    /* 导入打包清单 */
    $("#btImportPackage").text(mlm.C0986 + mlm.C1288);
    /* 导出打包清单 */
    $("#btExportPackage").text(mlm.C0987 + mlm.C1288);
    /* 交运清单 */
    $("#btViewDelivery").text(mlm.C1289);
    /* 导入交运清单 */
    $("#btImportDelivery").text(mlm.C0986 + mlm.C1289);
    /* 配送中心 */
    $("#lbWHSymbol, #lbWH_1Symbol, #lbCBWarehouseSymbol, #lbQWHSymbol, #lbInWHSymbol").text(mlm.C1274 + ":");
    /* 物流商订单号 */
    $("#lbOutEOCodeSymbol, #lbOutEOCode_1Symbol").text(mlm.C1291 + ":");
    /* 实际重量 */
    $("#lbActualWeightSymbol, #lbActualWeight_1Symbol").text(mlm.C1292 + ":");
    /* 实际体积(cm³) */
    $("#lbActualVolumnSymbol, #lbActualVolumn_1Symbol").text(mlm.C1293 + "(cm³):");
    /* 实际运费 */
    $("#lbActualCostSymbol, #lbActualCost_1Symbol").text(mlm.C1294 + ":");
    /* 快递跟踪号 */
    $("#txtTrackingNumber, #lbTrackingNumber_1Symbol, #lbTrackingNumberSymbol").text(mlm.C1295 + ":");
    /* 妥投日期 */
    $("#lbArriveTimeSymbol").text(mlm.C1296 + ":");
    /* 拣货清单 */
    $("#lbEOProduct").text(mlm.C1297);
    /* 包裹清单 */
    $("#lbEOPackage").text(mlm.C1298);
    /* 商品列表 */
    $("#lbEPProdTitle").text(mlm.C0168);
    /* 导出 */
    $("#btExportEPProd, #btExportEPEO").val(mlm.C0987);
    /* 配送单列表 */
    $("#lbEPEOTtile").text(mlm.C1299 + mlm.C0463);
    /* 发货地址 */
    $("#lbCustAddressSymbol").text(mlm.C1300 + ":");
    /* 包裹重量 */
    $("#lbCBWeightSymbol").text(mlm.C1301 + ":");
    /* 包裹体积 */
    $("#lbCBVolumnymbol").text(mlm.C1302 + "(cm³):");
    /* 物流方案 */
    $("#lbCBLstSolutionSymbol, #lbQLstSolutionSymbol").text(mlm.C0783 + ":");
    /* 预计发货日期 */
    $("#lbCBEstimatedShipTimeSymbol").text(mlm.C1304 + mlm.C1303 + ":");
    /* 预计到货日期 */
    $("#lbCBEstimatedArriveTimeSymbol").text(mlm.C1304 + mlm.C1305 + ":");
    /* 海关报关列表 */
    $("#lbCBCustomsTitle").text(mlm.C1306 + mlm.C0463);
    /* 添加报关商品 */
    $("#btAddCBCustoms").val(mlm.C0530 + mlm.C1307);
    /* 合并前运费 */
    $("#lbBeforeCoseSymbol").text(mlm.C1308 + ":");
    /* 合并后运费 */
    $("#lbCombinCoseSymbol").text(mlm.C1309 + ":");
    /* 报关商品 */
    $("#lbCustomProdNameSymbol").text(mlm.C1307 + ":");
    /* 数量 */
    $("#lbCustomQtySymbol").text(mlm.C1098 + ":");
    /* 报关价值 */
    $("#lbCustomValueSymbol").text(mlm.C1310 + ":");
    /* 海关编码 */
    $("#lbCustomCodeSymbol").text(mlm.C1311 + ":");
    /* 申报产地 */
    $("#lbFactoryCountrySymbol").text(mlm.C1312 + ":");
    /* 申报材质 */
    $("#lbCustomMaterialSymbol").text(mlm.C1313 + ":");
    /* 签收日期 */
    $("#lbReceiveRetTimeSymbol").text(mlm.C1314 + ":");
    /* 产品列表 */
    $("#lbRevRetProdTitle").text(mlm.C1264 + mlm.C0463);
    /* 客户关键字 */
    $("#lbEOCustSymbol").text(mlm.C0719 + mlm.C0184 + ":");
    /* 销售订单号 */
    $("#lbSOCodeSymbol").text(mlm.C1315 + ":");
    /* 配送单号 */
    $("#lbQEOCodeSymbol").text(mlm.C1316 + ":"); 
    /* 配送单号 */
    $("#lbQEOCodeSymbol").text(mlm.C1316 + ":");
    /* 物流公司 */
    $("#lbQLstCompanySymbol").text(mlm.C0824 + ":");
    /* 配送区域 */
    $("#lbQGlobalAreaSymbol").text(mlm.C1317 + ":"); 
    /* 状态 */
    $("#lbQEOStateSymbol").text(mlm.C0367 + ":");
    /* 售后问题 */
    $("#lbQASPCodeSymbol").text(mlm.C1440 + ":"); 
    /* 快递跟踪号 */
    $("#lbQTrackingNumberSymbol").text(mlm.C1295 + ":");
    /* 交运统计 */
    $("#lbDeliveryEOSymbol").text(mlm.C1382);
    /* 导出详细清单 */
    $("#btExportDeliveryEO").val(mlm.C0987 + mlm.C1383);
    /* 仓库 */
    $("#lbRevWHSymbol").text(mlm.C1196 + ":");
    /* 发送包裹妥投邮件给客户 */
    $("#lbSendEmail").text(mlm.C1639);
    /* 导入递四方预报单 */
    $("#btImportPre4PXOrder").val(mlm.C1645); 
    /* 站点 */
    $("#lbSMTSiteSymbol").text(mlm.C0416 + ":");
    /* 站点 */
    $("#btExportSMTTrkNum").text(mlm.C1646);
    /* 导出实际运费 */
    $("#btExportActualCost").text(mlm.C1649); 
    /* 报关名称(中文) */
    $("#lbCustomProdName_CNSymbol").text(mlm.C1621); 
    /* 中通快递单号 */
    $("#lbZTSymbol").text(mlm.C1659 + ":");
    /* 生成SMT发货标签 */
    $("#btGenerateSMTShipLable").text(mlm.C1723);
    /* 生成SMT跟踪号 */
    $("#btGenerateSMTTrackingnumber").text(mlm.C1724);

    /* 导入文件 */
    $("#lbImportFileSymbol, #lbCheckFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
}