/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadSaleOrderStat);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    //SMT授权指令
    window.security.authoriseSMT();

    $("#btNewSO").click(openNewSaleOrderFrm); 

    pageVariable.nowdate = commoncore.func.getNowTime();

    $("#btQuerySO, #btNewSO, #btImportSO, #btAddSOProd, #btAddGProd, #btAddCustoms, #btAddCustoms_1").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
    $("#btWaitConfirm, #btWaitSubmit, #btWaitShip, #btUnreceiveFromSMT, #btErrorOrderFromSMT, #btInCancelFromSMT, #btEOLose").click(function () {
        pageVariable.querycondition = {};
        pageVariable.querycondition.SOState = $(this).attr("tag");
        querySaleOrders(1, pageVariable.saleorderList.pageNumber);
    });
    $("#btQuerySO").click(openQuerySOFrm); 
    $("#btExportSubmitSO").click(exportSubmitSO);
    $("#btImportSubmitSO").click(openImportSubmitSO);
    $("#btImportSMTSO").click(openImportSMTSO);
    $("#btImportSMTTaobao").click(openImportTaobaoSO);
    $("#btSyncSMTSO").click(function () { syncSMTSaleOrder(); });
    $("#btSyncSMTSOShipState").click(syncSMTSOShipState); 
    $("#btSendSMTCustMessage").click(sendSMTCustMessage);
    $("#btEvaluationSMTOrder").click(openEvalutionSMTFrm);
    $("#btExportSMTTaskInfos").click(exportSMTTaskInfos); 
    $("#btExportSMTMessage").click(exportSMTMessage);
    $("#btImportSMTMessage").click(openImportSMTMsg);

    pageframe.control.multiButtion.init("btHandleSO", "dvHandleOrder");

    pageVariable.querycondition = {};
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
    if (pageVariable.saleorderList) {
        pageVariable.saleorderList.resize(mainFormHeight);
    }
}

/* 加载订单统计 */
function loadSaleOrderStat() {

    pageframe.control.processCtrl.showOperaProcess();

    var m_waitConfirmCtrl = $("#btWaitConfirm");
    var m_waitSubmitCtrl = $("#btWaitSubmit");
    var m_waitShipCtrl = $("#btWaitShip");
    var m_unreceiveCtrl = $("#btUnreceiveFromSMT");
    var m_errororderCtrl = $("#btErrorOrderFromSMT");
    var m_incancelCtrl = $("#btInCancelFromSMT");
    var m_eoloseCtrl = $("#btEOLose");

    m_waitConfirmCtrl.val(mlm.C1501);
    m_waitSubmitCtrl.val(mlm.C1430);
    m_waitShipCtrl.val(mlm.C1502);
    m_eoloseCtrl.val(mlm.C1503);
    m_unreceiveCtrl.val(mlm.C1718);
    m_errororderCtrl.val(mlm.C1719);
    m_incancelCtrl.val(mlm.C1720);

    var m_ctrls = $("#btWaitConfirm, #btWaitSubmit, #btWaitShip, #btUnreceiveFromSMT, #btErrorOrderFromSMT, #btInCancelFromSMT, #btEOLose");
    m_ctrls.unbind("mouseenter mouseleave");
    m_ctrls.css("background-color", "#CCCCCC");

    var m_saleorder = new sm.saleorder();
    m_saleorder.getSaleOrderStat(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        var m_waitconfirmCount = 0;
        var m_waitsubmitCount = 0;
        var m_unreceiveCount = 0;
        var m_errorCount = 0;
        var m_incancelCount = 0;
        var m_losedCount = 0;
        var m_waitshipCount = 0;

        $.each(m_jsonobjs, function () {

            var m_sostate = Number(this.SOState);
            var m_eostate = Number(this.EOState);

            //待确认
            if (m_sostate == 0 || m_sostate == 3) {
                m_waitconfirmCount = m_waitconfirmCount + Number(this.SOCount);
            }
            //待生效
            if (m_sostate == 5 && (this.SMTState == "WAIT_SELLER_SEND_GOODS" || this.SMTState == "WAIT_BUYER_ACCEPT_GOODS" || this.SMTState == "")) {
                m_waitsubmitCount = m_waitsubmitCount + Number(this.SOCount);
            }
            //未到账
            if ((m_sostate < 10 || m_sostate == 10) && this.SMTState == "RISK_CONTROL") {
                m_unreceiveCount = m_unreceiveCount + Number(this.SOCount);
            }
            //异常订单
            if (m_sostate != 18 && this.SMTState == "FINISH") {
                m_errorCount = m_errorCount + Number(this.SOCount);
            }
            //买家申请取消
            if ((m_sostate < 10 || m_sostate == 10) && this.SMTState == "IN_CANCEL") {
                m_incancelCount = m_incancelCount + Number(this.SOCount);
            }
            //丢失或退件
            if (m_sostate == 10 && (m_eostate == 30 || m_eostate == 40)) {
                m_losedCount = m_losedCount + Number(this.SOCount);
            }
            //待发货
            if (m_sostate == 10 && m_eostate < 20 && (this.SMTState == "WAIT_SELLER_SEND_GOODS" || this.SMTState == "WAIT_BUYER_ACCEPT_GOODS" || this.SMTState == "FUND_PROCESSING" || this.SMTState == "FINISH" || this.SMTState == "")) {
                m_waitshipCount = m_waitshipCount + Number(this.SOCount);
            }
        });

        if (m_waitconfirmCount > 0) {
            m_waitConfirmCtrl.val(mlm.C1501 + "(" + m_waitconfirmCount + ")");
            m_waitConfirmCtrl.css("background-color", "");
            m_waitConfirmCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
        }
        if (m_waitsubmitCount > 0) {
            m_waitSubmitCtrl.val(mlm.C1430 + "(" + m_waitsubmitCount + ")");
            m_waitSubmitCtrl.css("background-color", "");
            m_waitSubmitCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            pageframe.control.multiButtion.init("btWaitSubmit", "dvWaitSubmit");
        }
        if (m_unreceiveCount > 0) {
            m_unreceiveCtrl.val(mlm.C1718 + "(" + m_unreceiveCount + ")");
            m_unreceiveCtrl.css("background-color", "");
            m_unreceiveCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
        }
        if (m_errorCount > 0) {
            m_errororderCtrl.val(mlm.C1719 + "(" + m_errorCount + ")");
            m_errororderCtrl.css("background-color", "");
            m_errororderCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
        }
        if (m_incancelCount > 0) {
            m_incancelCtrl.val(mlm.C1720 + "(" + m_incancelCount + ")");
            m_incancelCtrl.css("background-color", "");
            m_incancelCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
        }
        if (m_losedCount > 0) {
            m_eoloseCtrl.val(mlm.C1503 + "(" + m_losedCount + ")");
            m_eoloseCtrl.css("background-color", "");
            m_eoloseCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
        }
        if (m_waitshipCount > 0) {
            m_waitShipCtrl.val(mlm.C1502 + "(" + m_waitshipCount + ")");
            m_waitShipCtrl.css("background-color", "");
            m_waitShipCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
        }

        pageframe.control.processCtrl.hideOperaProcess();
    });

    if (!pageVariable.saleorderList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.saleorderList = new uicontrol.tableList("saleorderList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "SaleOrder_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: querySaleOrders,
                                         columns: [{ display: mlm.C1517, name: "", width: 530, align: 'left', adjust: true, createCell: createSOContentCell },
                                                   { display: mlm.C0927, name: "", width: 110, align: 'left', adjust: true, createCell: createSOMoneyCell },
                                                   { display: mlm.C1462, name: "", width: 75, align: 'left', adjust: true, createCell: createSOSubmitCell },
                                                   { display: mlm.C1488, name: "", width: 120, align: 'left', adjust: true, createCell: createSOFinanceCell },
                                                   { display: mlm.C1487, name: "", width: 90, align: 'left', adjust: true, createCell: createSOExpStateCell },
                                                   { display: mlm.C0367, name: "", width: 75, align: 'left', adjust: true, createCell: createSOStateCell },
                                                   { display: mlm.C0019, name: "", width: 55, align: 'center', adjust: true, createCell: createSOOperaCell}]
                                     });

    }
}
/* 构建订单内容列 */
function createSOContentCell(key, cellValue) {
    var m_arr = [];

    var m_obj = this.keyObj;
    var m_soproducts = datastruct.convertion.strToObject(this.keyObj.ProductJson);

    var m_socode_color = "";
    var m_site_color = "#666";
    var m_cust_color = "#000000";
    if ((this.keyObj.SOState == "3" || this.keyObj.SOState == "5") && this.keyObj.SORemark) {
        var m_socode_color = "#DD0000";
        var m_site_color = "#DD0000";
        var m_cust_color = "#DD0000";
    }

    m_arr.push("<div style='border-bottom-color: #ddd; border-bottom-width: 1px; border-bottom-style: solid; padding: 5px 0px 5px 0px; color: #666'>");
    m_arr.push("<a onclick='viewSaleOrder.call(this, \"" + this.keyObj.SaleOrder_Id + "\", \"" + key + "\")' href='javascript:void(\"0\");' style='color: " + m_socode_color + "'>" + this.keyObj.SOCode + "</a>");
    m_arr.push("<span style='padding: 0px; color: " + m_site_color + "'>(" + this.keyObj.SPfName + "-" + this.keyObj.SaleSiteName + ")</span>");
    m_arr.push(" - <a style='color: " + m_cust_color + ";' onclick='openViewCustFrm.call(this, \"" + this.keyObj.Customer_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.CustName + "</a><span style='margin: 0px 0px 0px 5px; color: " + m_site_color + "'>(" + this.keyObj.GlobalAreaName + ")</span>");
    m_arr.push("</div>");

    var m_i = 1;
    $.each(m_soproducts, function () {

        var m_discount = "";
        var m_listprice = Number(this.ListPrice);
        var m_saleprice = Number(this.SalePrice);
        if (m_listprice > 0 && m_saleprice > 0 && m_listprice != m_saleprice) {
            m_discount = "(" + ((Number(this.SalePrice) / Number(this.ListPrice)) * 100).toFixed(2) + "%)";
        }

        var m_src = "";
        if (this.ProdPicUrl) {
            if (this.ProdPicUrl.indexOf("http://") == -1) {
                m_src = window.webLocation + this.ProdPicUrl;
            }
            else {
                m_src = this.ProdPicUrl;
            }
        }
        else {
            m_src = window.webLocation + "BZM/Css/Images/nopic.png";
        }
        m_arr.push("<div style='border-bottom-color: #ddd; border-bottom-width: 1px; border-bottom-style: solid; padding: 5px 0px 5px 0px; color: #666'>");
        m_arr.push("<div style='height: 70px; padding: 0px; border: 1px solid #ccc; float: left'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>");
        m_arr.push("<div style='padding: 0px 0px 0px 5px;'><a style='color: #000000; text-decoration: none' onclick='viewSSProduct.call(this, \"" + this.SS_Product_Id + "\", \"" + this.SS_InnerProd_Id + "\")' href='javascript:void(\"0\");'>" + this.SkuProdCode + " - " + this.ProdName.replace(/\^/g, "\"").replace(/\~/g, "\'") + " - [" + this.SkuProps + "]</a></div>");
        m_arr.push("<div style='padding: 5px 0px 0px 5px;'>" + mlm.C1098 + ": " + Number(this.Qty) + ", " + mlm.C1494 + ": " + commoncore.func.getCurrHtml(m_obj.CurrSymbol, this.SalePrice) + m_discount + "</div>");
        m_arr.push("</div>");
        m_i++;
    });

    if (Number(this.keyObj.ExpServicePrice) > 0) {
        m_arr.push("<div style='padding: 5px 0px 0px 0px; color: #666'><span style='float: left'><a style='color: #000000; text-decoration: none' onclick='openViewExpressServiceFrm.call(this, \"" + this.keyObj.ExpressService_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ExpressServiceName + "</a><span style='margin: 0px 0px 0px 10px'>(" + mlm.C0839 + ": " + commoncore.func.getCurrHtml(m_obj.CurrSymbol, this.keyObj.ExpServicePrice) + ", " + mlm.C1305 + ": " + commoncore.func.getTimeStrCell(this.keyObj.EstimatedArriveTimeStr) + ")</span></div>");
    }
    else {
        m_arr.push("<div style='padding: 5px 0px 0px 0px; color: #666'><span style='float: left'><a style='color: #000000; text-decoration: none' onclick='openViewExpressServiceFrm.call(this, \"" + this.keyObj.ExpressService_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ExpressServiceName + "</a><span style='margin: 0px 0px 0px 10px'>(" + mlm.C0670 + ", " + mlm.C1305 + ": " + commoncore.func.getTimeStrCell(this.keyObj.EstimatedArriveTimeStr) + ")</span></div>");
    }

    return m_arr.join("");
}
/* 构建成交额列 */
function createSOMoneyCell(key, cellValue) {
    var m_arr = [];

    var m_profitcss = "";
    var m_totalprofit = Number(this.keyObj.TotalProfit);
    if (Number(this.keyObj.SOState) < 10 && (m_totalprofit < 0 || m_totalprofit == 0)) {
        m_profitcss = 'color: #DD0000';
    }

    m_arr.push("<span>" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.TotalPrice) + "</span>");
    m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666'>" + mlm.C1146 + ":<span style='" + m_profitcss + "'>" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.TotalProfit) + "</span></div>");
    if (Number(this.keyObj.TotalProfit) > 0) {
        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666'>" + mlm.C1518 + ": " + ((m_totalprofit / Number(this.keyObj.TotalPrice)) * 100).toFixed(2) + "%</div>");
    }

    return m_arr.join("");
}
/* 构建订单生效列 */
function createSOSubmitCell(key, cellValue) {
    var m_arr = [];
    if (this.keyObj.SubmitHandleTime) {
        m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.SubmitHandleTimeStr) + "</div>");
    }

    return m_arr.join("");
}
/* 构建订单收款列 */
function createSOFinanceCell(key, cellValue) {
    var m_arr = [];

    var m_sostate = Number(this.keyObj.SOState);
    if (m_sostate > 3 || m_sostate == 3) {

        var m_remaining = Number(this.keyObj.Remaining);

        if (m_remaining == 0) {
            if (m_sostate != 18) {
                m_arr.push("<div style='padding: 0px; color: #000000;'>" + mlm.C1552 + "</div>");

                if (Number(this.keyObj.PRFund) > 0) {
                    m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000;'>" + mlm.C0872 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.PRFund) + "</div>");
                }
            }
        }
        else {
            m_arr.push("<div style='padding: 0px; color: #000000;'>" + mlm.C1432 + "</div>");

            if (this.keyObj.BillType == "1") {
                m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000;'>" + mlm.C1519 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, m_remaining) + "</div>");

                if (Number(this.keyObj.PRFund) > 0) {
                    m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000;'>" + mlm.C0872 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.PRFund) + "</div>");
                }
            }
            else {
                m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000'>" + mlm.C1520 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, m_remaining) + "</div>");
            }
        }
    }

    return m_arr.join("");
}
/* 构建订单配送列 */
function createSOExpStateCell(key, cellValue) {
    var m_arr = [];

    var m_shipfromdate = datastruct.convertion.convertToDateByStr(this.keyObj.EstimatedShipTimeStr);
    
    var m_css = '';
    if (m_shipfromdate < pageVariable.nowdate) {
        m_css = 'color: #DD0000';
    }

    var m_sostate = Number(this.keyObj.SOState);

    if (m_sostate < 10) {
        m_arr.push("<div style='padding: 0px; " + m_css + "'>" + commoncore.func.getTimeStrCell(this.keyObj.EstimatedShipTimeStr) + "</div>");
        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>(" + mlm.C1324 + ")</div>");
    }
    else {
        if (!this.keyObj.ExpressOrder_Id || this.keyObj.ExpressOrder_Id == 0) {
            m_arr.push("<div style='padding: 0px; " + m_css + "'>" + mlm.C0538 + "</div>");
        }
        else {
            if (this.keyObj.EOState == "0") {

                if (m_sostate != 18) {
                    m_arr.push("<div style='padding: 0px; " + m_css + "'>" + mlm.C1280 + "</div>");

                    if (Number(this.keyObj.EstimatedShipDiff) > 0) {
                        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>" + "(" + mlm.C1323 + this.keyObj.EstimatedShipDiff + mlm.C0800 + ")" + "</div>");
                    }
                }
            }
            else if (this.keyObj.EOState == "10") {
                m_arr.push("<div style='padding: 0px; " + m_css + "'>" + mlm.C1281 + "</div>");

                if (Number(this.keyObj.EstimatedShipDiff) > 0) {
                    m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; " + m_css + "'>" + "(" + mlm.C1323 + this.keyObj.EstimatedShipDiff + mlm.C0800 + ")" + "</div>");
                }
            }
            else if (this.keyObj.EOState == "20") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1282 + "</div>");

                if (Number(this.keyObj.EstimatedArriveDiff) > 0) {
                    m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1325 + this.keyObj.EstimatedArriveDiff + mlm.C0800 + ")" + "</div>");
                }
            }
            else if (this.keyObj.EOState == "30") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1328 + "</div>");
            }
            else if (this.keyObj.EOState == "40") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1329 + "</div>");
            }
            else if (this.keyObj.EOState == "50") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1330 + "</div>");

                if (Number(this.keyObj.ArriveDiff) > 0) {
                    m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1325 + this.keyObj.ArriveDiff + mlm.C0800 + ")" + "</div>");
                }
            }
        }
    }

    return m_arr.join("");
}
/* 构建售后列 */
function createAfterSaleCell(key, cellValue) {

    var m_str = "";
    if (this.keyObj.ASProblems == "1") {
        m_str = mlm.C1418;
    }
    else if (this.keyObj.ASProblems == "2") {
        m_str = mlm.C1419;
    }
    else if (this.keyObj.ASProblems == "3") {
        m_str = mlm.C1420;
    }
    else if (this.keyObj.ASProblems == "4") {
        m_str = mlm.C1421;
    }

    return m_str;
}
/* 构建订单状态列 */
function createSOStateCell(key, cellValue) {
    var m_arr = [];

    if (this.keyObj.SOState == "0") {
        m_arr.push("<div style='padding: 0px;'>" + mlm.C1496 + "</div>");
        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; '>" + commoncore.func.getTimeStrCell(this.keyObj.CreateTimeStr) + "</div>");
    }
    else if (this.keyObj.SOState == "3") {
        m_arr.push("<div style='padding: 0px;'>" + mlm.C1497 + "</div>");
        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; '>" + commoncore.func.getTimeStrCell(this.keyObj.LastUpdatedDateStr) + "</div>");
    }
    else if (this.keyObj.SOState == "5") {
        m_arr.push("<div style='padding: 0px;'>" + mlm.C1498 + "</div>");
        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; '>" + commoncore.func.getTimeStrCell(this.keyObj.CustConfirmTimeStr) + "</div>");
    }
    else if (this.keyObj.SOState == "18") {
        m_arr.push("<div style='padding: 0px;'>" + mlm.C0538 + "</div>");
        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; '>" + commoncore.func.getTimeStrCell(this.keyObj.LastUpdatedDateStr) + "</div>");
    } 
    else if (this.keyObj.SOState == "30") {
        m_arr.push("<div style='padding: 0px;'>" + mlm.C1557 + "</div>");
        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666; '>" + commoncore.func.getTimeStrCell(this.keyObj.LastUpdatedDateStr) + "</div>");
    }
    else {
        m_arr.push("<div style='padding: 0px;'>" + mlm.C1425 + "</div>");
    }

    return m_arr.join("");
}
/* 构建操作列 */
function createSOOperaCell(key, cellValue) {
    var m_arr = [];

    if (this.keyObj.SOState == "0") {
        m_arr.push("<a onclick='openModifySaleOrderFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0061 + "</a>");
        m_arr.push("<a onclick='openDeleteSOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 3px'>" + mlm.C0062 + "</a>");
        m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a onclick='openHandlerCustConfirmFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1498 + "</a></div>");
    }
    else if (this.keyObj.SOState == "3") {
        m_arr.push("<div style='padding: 0px;'><a onclick='openHandlerCustConfirmFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1498 + "</a></div>");
        m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a onclick='openModifySaleOrderFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1522 + "</a></div>");
        m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a onclick='openCancelSO.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1523 + "</a></div>");
    }
    else if (this.keyObj.SOState == "5") {
        if (this.keyObj.SMTState == "WAIT_SELLER_SEND_GOODS" || this.keyObj.SMTState == "WAIT_BUYER_ACCEPT_GOODS" || this.keyObj.SMTState == "IN_CANCEL" || this.keyObj.SMTState == "") {
            m_arr.push("<a onclick='openSubmitSO.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1524 + "</a>");
        }
        m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a onclick='openModifySaleOrderFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1522 + "</a></div>");
        m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a onclick='openCancelSO.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1523 + "</a></div>");
    }
    else if (this.keyObj.SOState == "10") {
        var m_remaining = Number(this.keyObj.Remaining);

        if (this.keyObj.EOState == "30" || this.keyObj.EOState == "40") {
            m_arr.push("<div style='padding: 0px;'><a onclick='openRetureSO.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1525 + "</a></div>");
            m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a onclick='openReSendSOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1526 + "</a></div>");
        }
        else if (this.keyObj.EOState == "50" && m_remaining != "0") {
            m_arr.push("<div style='padding: 0px;'><a onclick='openCloseSO.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1557 + "</a></div>");
        }
    }

    return m_arr.join(""); ;
}

/* 打开查询订单的窗体 */
function openQuerySOFrm() {
    if (!pageVariable.querySOFrm) {
        pageVariable.querySOFrm = new uicontrol.dialog("querySOFrm", mlm.C0562 + mlm.C1435, { width: 800, position: ["auto", 15] }, function () {
            getSOQueryCondition();
            querySaleOrders(1, pageVariable.saleorderList.pageNumber);

            pageVariable.querySOFrm.close();
        });

        pageVariable.selQPdc = new bizcontrol.selectpdc($("#selQPdc"));
        pageVariable.selQSSPdc = new bizcontrol.selectpdc($("#selQSSPdc"), null, null, 10000);

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtQCreateTime_1").datepicker();
        $("#txtQCreateTime_2").datepicker();
        $("#txtQCreateTime_2").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        pageVariable.selQWH = new bizcontrol.selectwarehouse($("#selQWH"), null, "1");
        pageVariable.selQGlobalArea = new bizcontrol.selectglobalarea("selQGlobalArea", true);

        var m_qlstCtr = $("#txtQLstSolution");
        m_qlstCtr.change(function () {
            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.Key = $(this).val();

            if (m_lstsolution.Key) {
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
        pageVariable.selectlstsolution = new bizcontrol.selectlstsolution(function (m_selecteditems) {
            var m_lstsolution = m_selecteditems;
            m_qlstCtr.attr("tag", m_lstsolution.LstSolution_Id);
            m_qlstCtr.val(m_lstsolution.LstSolutionName);
        }, "1");
        var m_lstsolutionCtrl = $("#btSelLstSolution");
        m_lstsolutionCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
        m_lstsolutionCtrl.click(function () {
            pageVariable.selectlstsolution.show(null, null, pageVariable.selQWH.warehouse_id, null);
        });

        var m_saleSiteCtrl = $("#ddlQSaleSite");
        var m_saleplatform = new sm.saleplatform();
        m_saleplatform.queryAvaiSaleSites(function (retTable) {
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

            m_saleSiteCtrl.append("<option></option>");
            $.each(m_jsonobjs, function () {
                m_saleSiteCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
            });
        });
        m_saleSiteCtrl.change(function () {
            loadExpServiceCtrl();
            pageVariable.selQSSPdc.pdcSource = null;
            pageVariable.selQSSPdc.salesite_id = m_saleSiteCtrl.val();
            if (!pageVariable.selQSSPdc.salesite_id) {
                pageVariable.selQSSPdc.salesite_id = 10000;
            }
        });

        loadExpServiceCtrl();

        pageVariable.ddlQSOState = new uicontrol.selectbox("ddlQSOState", "radio");
        var m_stateoptions = [];
        m_stateoptions.push({ key: "-1", value: mlm.C0403 });
        m_stateoptions.push({ key: "0", value: mlm.C1501 });
        m_stateoptions.push({ key: "100", value: mlm.C1430 });
        m_stateoptions.push({ key: "200", value: mlm.C1502 });
        m_stateoptions.push({ key: "300", value: mlm.C1282 });
        m_stateoptions.push({ key: "500", value: mlm.C1488 });
        m_stateoptions.push({ key: "400", value: mlm.C1503 });
        m_stateoptions.push({ key: "600", value: mlm.C1489 });
        pageVariable.ddlQSOState.bindSource(m_stateoptions);

        var m_defaultsostate = [];
        m_defaultsostate.push({ key: "-1" });
        pageVariable.ddlQSOState.setSelectedItem(m_defaultsostate);
    }

    $("#txtQCustKey").val(pageVariable.querycondition.CustKey);
    $("#txtQProdKey").val(pageVariable.querycondition.ProdKey);
    $("#ddlQSaleSite").val(pageVariable.querycondition.SaleSite_Id);
    $("#ddlQExpService").val(pageVariable.querycondition.ExpressOrder_Id);
    pageVariable.selQWH.setWarehouse({ Warehouse_Id: pageVariable.querycondition.Warehouse_Id, WarehouseName: pageVariable.querycondition.WarehouseName });
    $("#txtQSOCode").val(pageVariable.querycondition.SOCode);
    $("#txtQEOCode").val(pageVariable.querycondition.EOCode);
    $("#txtQASPCode").val(pageVariable.querycondition.ASPCode);
    pageVariable.selQPdc.setPdc({ ProdCategory_Id: pageVariable.querycondition.PdcId, PdcName: pageVariable.querycondition.PdcName });
    pageVariable.selQSSPdc.setPdc({ ProdCategory_Id: pageVariable.querycondition.SSPdcId, PdcName: pageVariable.querycondition.SSPdcName });
    $("#txtQCreateTime_1").val(pageVariable.querycondition.FromTime);
    $("#txtQCreateTime_2").val(pageVariable.querycondition.ToTime);
    $("#txtQLstSolution").attr("tag", pageVariable.querycondition.LstSolution_Id);
    $("#txtQLstSolution").val(pageVariable.querycondition.LstSolutionName);
    pageVariable.selQGlobalArea.setObj({ globalArea_Ids: pageVariable.querycondition.GlobalArea_Id, globalAreaNames: pageVariable.querycondition.GlobalAreaName });
    pageVariable.ddlQSOState.setSelectedItem([{ key: pageVariable.querycondition.SOState }]);

    pageVariable.querySOFrm.show();
}
/* 加载配送服务控件 */
function loadExpServiceCtrl() {
    var m_expressservice = new sm.expressservice();
    var m_area = pageVariable.selQGlobalArea.getObj();
    if (m_area) {
        m_expressservice.GlobalArea_Id = selQGlobalArea.globalArea_Ids;
    }
    m_expressservice.SaleSite_Id = $("#ddlQSaleSite").val();
    m_expressservice.queryExpressServices(function (retTable) {
        var m_expserviceCtrl = $("#ddlQExpService");
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        m_expserviceCtrl.empty();
        m_expserviceCtrl.append("<option></option>");
        $.each(m_jsonobjs, function () {
            m_expserviceCtrl.append("<option value='" + this.ExpressService_Id + "'>" + this.ExpressServiceName + "</option>");
        });
    });
}
/* 获取订单查询参数 */
function getSOQueryCondition() {
    pageVariable.querycondition.CustKey = $.trim($("#txtQCustKey").val());
    pageVariable.querycondition.ProdKey = $.trim($("#txtQProdKey").val());
    pageVariable.querycondition.SaleSite_Id = $("#ddlQSaleSite").val();
    pageVariable.querycondition.ExpressOrder_Id = $("#ddlQExpService").val();
    if (pageVariable.selQWH) {
        pageVariable.querycondition.Warehouse_Id = pageVariable.selQWH.warehouse_id;
        pageVariable.querycondition.WarehouseName = pageVariable.selQWH.warehousename;
    }
    else {
        pageVariable.querycondition.Warehouse_Id = "0";
        pageVariable.querycondition.WarehouseName = "";
    }
    pageVariable.querycondition.SOCode = $.trim($("#txtQSOCode").val());
    pageVariable.querycondition.EOCode = $.trim($("#txtQEOCode").val());
    pageVariable.querycondition.ASPCode = $.trim($("#txtQASPCode").val());
    pageVariable.querycondition.SSPdcId = pageVariable.selQSSPdc.pdcId;
    pageVariable.querycondition.SSPdcName = pageVariable.selQSSPdc.pdcName;
    pageVariable.querycondition.PdcId = pageVariable.selQPdc.pdcId;
    pageVariable.querycondition.PdcName = pageVariable.selQPdc.pdcName;
    pageVariable.querycondition.FromTime = $("#txtQCreateTime_1").val();
    pageVariable.querycondition.ToTime = $("#txtQCreateTime_2").val();
    if (pageVariable.selQGlobalArea) {
        var m_area = pageVariable.selQGlobalArea.getObj();
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
    pageVariable.querycondition.LstSolution_Id = $("#txtQLstSolution").attr("tag");
    pageVariable.querycondition.LstSolutionName = $("#txtQLstSolution").val();
    pageVariable.querycondition.SOState = pageVariable.ddlQSOState.getSelectedItem()[0];

}
/* 查询客户订单 */
function querySaleOrders(pageNum, pageCount) {
    var m_saleorder = new sm.saleorder();
    m_saleorder = $.extend(m_saleorder, pageVariable.querycondition);

    m_saleorder.Page = pageNum;
    m_saleorder.PageNum = pageCount;
    m_saleorder.querySaleOrder(function (retTable) {
        pageVariable.saleorderList.bindDataSource(retTable);
    });
}

/* 初始化处理订单的窗体 */
function initHandlerSOFrm(event) {
    if (!pageVariable.handlerSOFrm) {
        pageVariable.handlerSOFrm = new uicontrol.dialog("handlerSOFrm", "", { width: 1125, position: ["auto", 15] }, saveSO);

        $("#btChangeAddress").click(openChangeRvAddressFrm);
        $("#btAddSOProd").click(openSelectSbom);

        pageVariable.selexpserviceCtrl = new bizcontrol.selectexpservice($("#selExpService"), function () {
            if (pageVariable.handlerSOFrm.SaleOrder.Products.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1527);
                return false;
            }

            return true;
        },
        function () {
            var m_condObj = {};
            m_condObj.SS_Product_Ids = [];
            m_condObj.ProdQtys = [];

            $.each(pageVariable.soproductList.dataSource.items.arrValues, function () {
                m_condObj.SS_Product_Ids.push(this.SS_Product_Id);
                m_condObj.ProdQtys.push(this.Qty);
            });

            m_condObj.Weight = pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight;
            m_condObj.GlobalArea_Id = pageVariable.handlerSOFrm.SaleOrder.ExpService.GlobalArea_Id;
            m_condObj.Province = pageVariable.handlerSOFrm.SaleOrder.ExpService.RvProvince;
            m_condObj.City = pageVariable.handlerSOFrm.SaleOrder.ExpService.RvCity;
            m_condObj.SaleSite_Id = pageVariable.handlerSOFrm.SaleOrder.SaleSite_Id;

            return m_condObj;
        },
        function (expservice) {

            if (pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpressService_Id == expservice.ExpressService_Id) {
                return;
            }

            pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpressService_Id = expservice.ExpressService_Id;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpressServiceName = expservice.ExpressServiceName;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServicePrice = Number(expservice.ExpCharge) * pageVariable.handlerSOFrm.so_rate;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.IsTrack = pageVariable.selexpserviceCtrl.ExpressService.IsTrack;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.Warehouse_Id = expservice.Warehouse_Id;

            $("#txtExpPrice").val(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServicePrice.toFixed(2));
            $("#txtExpPrice").attr("lstsolution_ids", expservice.LstSolution_Ids);

            initLstSolution();
            initEstimatedTime();

            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.LstSolutionIds = expservice.LstSolution_Ids.replaceAll("#", "").split(",");
            m_lstsolution.SalePlatform_Id = pageVariable.handlerSOFrm.SaleOrder.SalePlatform_Id;
            m_lstsolution.Weight = pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight;
            m_lstsolution.SysWeightUnit_Id = pageVariable.handlerSOFrm.SaleOrder.SysWeightUnit_Id;
            m_lstsolution.Length = pageVariable.handlerSOFrm.SaleOrder.ExpService.Length;
            m_lstsolution.Width = pageVariable.handlerSOFrm.SaleOrder.ExpService.Width;
            m_lstsolution.Height = pageVariable.handlerSOFrm.SaleOrder.ExpService.Height;
            $.each(pageVariable.customsinfoList.dataSource.items.arrValues, function () {
                m_lstsolution.Tax += Number(this.CustomQty) * Number(this.CustomValue)
            });
            m_lstsolution.TaxSysCurrency_Id = keycontext.keyparam.tax_syscurrency;
            m_lstsolution.SysCurrency_Id = pageVariable.handlerSOFrm.SaleOrder.SysCurrency_Id;
            m_lstsolution.IsTrack = pageVariable.selexpserviceCtrl.ExpressService.IsTrack;
            m_lstsolution.MaxAvaiTime = pageVariable.selexpserviceCtrl.ExpressService.MaxDeliveryTime;
            m_lstsolution.GlobalAreaIds = [];
            m_lstsolution.GlobalAreaIds.push(pageVariable.handlerSOFrm.SaleOrder.ExpService.GlobalArea_Id);
            m_lstsolution.Warehouse_Id = expservice.Warehouse_Id;
            m_lstsolution.Province = pageVariable.handlerSOFrm.SaleOrder.ExpService.RvProvince;
            m_lstsolution.City = pageVariable.handlerSOFrm.SaleOrder.ExpService.RvCity;

            if (expservice.AreaIndexs.indexOf("#" + pageVariable.handlerSOFrm.SaleOrder.ExpService.GlobalArea_Id + "#") > -1) {
                $("#dvSORemark").addClass("last-item");
                var m_dvCustom = $("#dvCustom");
                m_dvCustom.removeClass("last-item");
                m_dvCustom.hide();

                m_lstsolution.Tax = 0;
            }
            else {
                $("#dvSORemark").removeClass("last-item");
                var m_dvCustom = $("#dvCustom");
                m_dvCustom.addClass("last-item");
                m_dvCustom.show();

                m_lstsolution.Tax = 0;
                $.each(pageVariable.handlerSOFrm.SaleOrder.ExpService.Customs, function () {
                    var m_customvalue = this.CustomValue ? this.CustomValue : 0;
                    m_lstsolution.Tax += Number(this.CustomQty) * Number(m_customvalue);
                });
            }

            m_lstsolution.queryOptimalLstSolution(function (retTable) {
                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                if (m_jsonobjs.length > 0) {
                    var m_jobj = m_jsonobjs[0];
                    pageVariable.sellstsolutionCtrl.setLstSolution(m_jobj);

                    pageVariable.handlerSOFrm.SaleOrder.ExpService.LstSolution_Id = m_jobj.LstSolution_Id;
                    pageVariable.handlerSOFrm.SaleOrder.ExpService.LstCompanyName = m_jobj.LstCompanyName;
                    pageVariable.handlerSOFrm.SaleOrder.ExpService.LstSolutionName = m_jobj.LstSolutionName;
                    pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost = Number(m_jobj.TotalCharge) + Number(m_jobj.VATCharge);

                    $("#txtExpCost").val(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost.toFixed(2));
                }
            });
        });

        pageVariable.sellstsolutionCtrl = new bizcontrol.selectsolstsolution($("#selLstSolution"), function () {

            if (!pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpressService_Id) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1342 + mlm.C0436);
                return false;
            }

            return true;
        },
        function () {

            var m_condObj = {};
            m_condObj.LstSolutionIds = $("#txtExpPrice").attr("lstsolution_ids").replaceAll("#", "").split(",");
            m_condObj.SalePlatform_Id = pageVariable.handlerSOFrm.SaleOrder.SalePlatform_Id;
            m_condObj.Weight = pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight;
            m_condObj.SysWeightUnit_Id = pageVariable.handlerSOFrm.SaleOrder.SysWeightUnit_Id;
            m_condObj.Length = $("#txtLength").val();
            m_condObj.Width = $("#txtWidth").val();
            m_condObj.Height = $("#txtHeight").val();
            m_condObj.Tax = 0;
            $.each(pageVariable.customsinfoList.dataSource.items.arrValues, function () {
                m_condObj.Tax += Number(this.CustomQty) * Number(this.CustomValue)
            });
            m_condObj.TaxSysCurrency_Id = keycontext.keyparam.tax_syscurrency;
            m_condObj.WUnit = pageVariable.handlerSOFrm.SaleOrder.WUnit;
            m_condObj.CurrSymbol = pageVariable.handlerSOFrm.SaleOrder.CurrSymbol;
            m_condObj.SysCurrency_Id = pageVariable.handlerSOFrm.SaleOrder.SysCurrency_Id;
            m_condObj.GlobalAreaIds = [];
            m_condObj.GlobalAreaIds.push(pageVariable.handlerSOFrm.SaleOrder.ExpService.GlobalArea_Id);
            m_condObj.Warehouse_Id = pageVariable.handlerSOFrm.SaleOrder.ExpService.Warehouse_Id;
            m_condObj.Province = pageVariable.handlerSOFrm.SaleOrder.ExpService.RvProvince;
            m_condObj.City = pageVariable.handlerSOFrm.SaleOrder.ExpService.RvCity;

            return m_condObj;
        },
        function (lstsolution) {

            if (pageVariable.handlerSOFrm.SaleOrder.ExpService.LstSolution_Id == lstsolution.LstSolution_Id) {
                return;
            }

            pageVariable.handlerSOFrm.SaleOrder.ExpService.LstSolution_Id = lstsolution.LstSolution_Id;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.LstCompanyName = lstsolution.LstCompanyName;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.LstSolutionName = lstsolution.LstSolutionName;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost = Number(lstsolution.TotalCharge) + Number(lstsolution.VATCharge);

            $("#txtExpCost").val(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost.toFixed(2));

            if (pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight != lstsolution.Weight) {
                $("#lbLstWeight").text(" / " + lstsolution.Weight + " " + pageVariable.handlerSOFrm.SaleOrder.WUnit);
            }
            else {
                $("#lbLstWeight").text("");
            }
        });

        pageVariable.soTabs = $("#soTabs").tabs({ show: showSOTab });
        $("#lbExpWUnit").text(keycontext.keyparam.WUnit);

        pageVariable.selCustomer = new bizcontrol.selectcustomer($("#selCustomer"), fillCustInfo);
        $("#btReGetAddress").click(function () {
            fillCustInfo(pageVariable.handlerSOFrm.SaleOrder.Customer_Id);
        });
        $("#lbRvAddress").tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
        pageVariable.soproductList = new uicontrol.tableList("soproductList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 200,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0180, name: "ProdPicUrl", width: 75, align: 'center', adjust: true, createCell: constructSOProdPicCell },
                                                { display: mlm.C0734, name: "", width: 210, align: 'left', adjust: true, createCell: createSOProdCell },
                                                { display: mlm.C1493, name: "ListPrice", width: 85, align: 'right', adjust: true, createCell: createSOListPriceCell },
                                                { display: mlm.C1058, name: "", width: 60, align: 'right', adjust: true, createCell: createSODiscountCell },
                                                { display: mlm.C1494, name: "", width: 85, align: 'left', adjust: true, createCell: createSOProdPriceCell },
                                                { display: mlm.C1098, name: "", width: 70, align: 'left', adjust: true, createCell: createSOProdQtyCell },
                                                { display: mlm.C1055, name: "", width: 210, align: 'left', adjust: true, createCell: createSOInnerSkuProdCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: createSOProdOperaCell}]
                                    });

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtSOCreateTime").datepicker();
        $("#txtSOCreateTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        $("#txtEstimatedShipTime").datepicker();
        $("#txtEstimatedArriveTime").datepicker();

        $("#txtEstimatedShipTime").change(initEstimatedTime);
        $("#txtExpPrice").change(changeExpPrice);
        $("#txtExpCost").change(changeExpCost);

        $("#txtExpWeight").change(function () {
            var m_str = $(this).val();
            if (!m_str) {
                $(this).val(pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight);
            }
            else {
                pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight = $(this).val();
                initLstSolution();
            }
        });
        $("#txtLength").change(function () {
            var m_str = $(this).val();
            if (!m_str) {
                $(this).val(pageVariable.handlerSOFrm.SaleOrder.ExpService.Length);
            }
            else {
                pageVariable.handlerSOFrm.SaleOrder.ExpService.Length = $(this).val();
                initLstSolution();
            }
        });
        $("#txtWidth").change(function () {
            var m_str = $(this).val();
            if (!m_str) {
                $(this).val(pageVariable.handlerSOFrm.SaleOrder.ExpService.Width);
            }
            else {
                pageVariable.handlerSOFrm.SaleOrder.ExpService.Width = $(this).val();
                initLstSolution();
            }
        });
        $("#txtHeight").change(function () {
            var m_str = $(this).val();
            if (!m_str) {
                $(this).val(pageVariable.handlerSOFrm.SaleOrder.ExpService.Height);
            }
            else {
                pageVariable.handlerSOFrm.SaleOrder.ExpService.Height = $(this).val();
                initLstSolution();
            }
        });

        var m_SaleSiteCtrl = $("#ddlSOFrom");
        
        pageVariable.currratedict = new datastruct.dictionary();
        pageVariable.weightRateDict = new datastruct.dictionary();

        pageVariable.selectSbom = new bizcontrol.selectssproduct(addSbom);
        m_SaleSiteCtrl.change(initShopsite);
        $("#ddlSOCurr").change(initSOCurr);
        $("#txtSOCurrRate").change(function () {
            var m_str = $(this).val();
            if (!m_str) {
                $(this).val(pageVariable.handlerSOFrm.so_rate);
            }
            else {
                $(this).attr("last_rate", pageVariable.handlerSOFrm.so_rate);
                pageVariable.handlerSOFrm.so_rate = Number($(this).val());
            }

            initSOCurrRate();
        });

        $("#btAddCustoms").click(openNewCustomFrm);

        loadCurrencies(function () {
            loadSaleSites(m_SaleSiteCtrl, true, event);
        });
    }
    else {
        if (event) {
            event();
        }
    }

    if (pageVariable.handlerRvAddressFrm) {
        pageVariable.handlerRvAddressFrm.RvAddresses = null;
    }

    pageVariable.handlerSOFrm.show();
}
/* 填充客户信息 */
function fillCustInfo(customer_id) {
    if (customer_id && customer_id != "0") {
        var m_customer = new cm.customer();
        m_customer.Customer_Id = customer_id;
        m_customer.readCustomer(function (retObj) {
            initRvInfo();
            pageVariable.handlerSOFrm.SaleOrder.Customer_Id = retObj.Customer_Id;
            pageVariable.handlerSOFrm.SaleOrder.CustName = retObj.CustName;
            pageVariable.handlerSOFrm.SaleOrder.CustEmail = retObj.Email;
            pageVariable.handlerSOFrm.SaleOrder.CustTel = retObj.Tel;
            pageVariable.handlerSOFrm.SaleOrder.CustCountry = retObj.OtherProps.GlobalAreaName;

            if (!pageVariable.handlerSOFrm.SaleOrder.OtherProps) {
                pageVariable.handlerSOFrm.SaleOrder.OtherProps = {};
            }

            if (retObj.RvAddresses && retObj.RvAddresses.length > 0) {
                var m_rvaddress = retObj.RvAddresses[0];

                pageVariable.handlerSOFrm.SaleOrder.OtherProps.RvAddressCount = retObj.RvAddresses.length;
                pageVariable.handlerSOFrm.SaleOrder.ExpService.RvFullName = m_rvaddress.RvFullName;
                pageVariable.handlerSOFrm.SaleOrder.ExpService.RvTel = m_rvaddress.RvTel;
                pageVariable.handlerSOFrm.SaleOrder.ExpService.GlobalArea_Id = m_rvaddress.GlobalArea_Id;
                pageVariable.handlerSOFrm.SaleOrder.ExpService.RvCountry = m_rvaddress.OtherProps.GlobalAreaName;
                pageVariable.handlerSOFrm.SaleOrder.ExpService.RvProvince = m_rvaddress.RvProvince;
                pageVariable.handlerSOFrm.SaleOrder.ExpService.RvCity = m_rvaddress.RvCity;
                pageVariable.handlerSOFrm.SaleOrder.ExpService.RvPostCode = m_rvaddress.RvPostCode;
                pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_1 = m_rvaddress.RvAddress_1;
                pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_2 = m_rvaddress.RvAddress_2;

                $("#lbRvAddress").text(commoncore.func.showSpecialChar(m_rvaddress.OtherProps.GlobalAreaName + ", " + m_rvaddress.RvProvince + " ..."));
                m_rvaddress.GlobalAreaName = m_rvaddress.OtherProps.GlobalAreaName;
                $("#lbRvAddress").attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(m_rvaddress)));

                if (retObj.RvAddresses.length > 1) {
                    $("#btChangeAddress").show();
                }
                else {
                    $("#btChangeAddress").hide();
                }
            }
            else {
                pageVariable.handlerSOFrm.SaleOrder.OtherProps.RvAddressCount = 0;
            }

            $("#btReGetAddress").show();
        });
    }
    else {
        pageVariable.handlerSOFrm.SaleOrder.Customer_Id = 0;
        pageVariable.handlerSOFrm.SaleOrder.CustName = "";
        pageVariable.handlerSOFrm.SaleOrder.CustEmail = "";
        pageVariable.handlerSOFrm.SaleOrder.CustTel = "";
        pageVariable.handlerSOFrm.SaleOrder.ExpService.GlobalArea_Id = 0;
        pageVariable.handlerSOFrm.SaleOrder.CustCountry = "";

        initRvInfo();

        $("#btReGetAddress").hide();
    }
}
/* 打开新增客户订单的窗体 */
function openNewSaleOrderFrm() {

    var m_func = function () {

        pageVariable.handlerSOFrm.SaleOrder = {};
        pageVariable.handlerSOFrm.SaleOrder.Products = [];
        pageVariable.handlerSOFrm.SaleOrder.ExpService = {};
        pageVariable.handlerSOFrm.SaleOrder.ExpService.Customs = [];

        pageVariable.selCustomer.setCust(null);
        fillCustInfo();
        $("#txtSORemark").val("");
        $("#txtEstimatedShipTime").val();

        var m_now = new Date();
        m_now.setDate(m_now.getDate() + 2);
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtEstimatedShipTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

        initShopsite();
        var m_salesite = pageVariable.SaleSiteDict.getItem($("#ddlSOFrom").val());
        pageVariable.handlerSOFrm.SaleOrder.WeightRate = m_salesite.WeightRate;
        pageVariable.handlerSOFrm.SaleOrder.DefaultCurrRate = m_salesite.CurrRate;

        pageVariable.handlerSOFrm.action = "New";
        pageVariable.handlerSOFrm.setTitle(mlm.C0461 + mlm.C1435);

        var m_custCtrl = $("#selCustomer");
        m_custCtrl.find("input").attr('disabled', false);
        m_custCtrl.find("img").show();
        $("#ddlSOFrom").attr('disabled', false);
        $("#ddlSOCurr").attr('disabled', false);
        $("#txtSOCreateTime").attr('disabled', false);

        $("#lbSOInfoSymbol").trigger("click");

        $("#dvSORemark").addClass("last-item");
        var m_dvCustom = $("#dvCustom");
        m_dvCustom.removeClass("last-item");
        m_dvCustom.hide();

        pageVariable.handlerSOFrm.show();
    };

    initHandlerSOFrm(m_func);

    pageVariable.handlerSOFrm.so_custom_key = -10000;
}
/* 打开修改订单的窗体 */
function openModifySaleOrderFrm(key) {;

    var m_func = function () {
        var m_saleorder = new sm.saleorder();
        m_saleorder.SaleOrder_Id = key;
        m_saleorder.readSaleOrder(function (retObj) {
            pageVariable.handlerSOFrm.SaleOrder = retObj;

            pageVariable.selCustomer.setCust({ Customer_Id: retObj.Customer_Id, CustName: retObj.OtherProps.CustName });

            var m_lbrvadCtrl = $("#lbRvAddress");
            m_lbrvadCtrl.text(commoncore.func.showSpecialChar(retObj.OtherProps.GlobalAreaName + ", " + retObj.ExpService.RvProvince + " ..."));
            m_lbrvadCtrl.attr("tag", commoncore.func.showSpecialChar(retObj.ExpService.RvFullName + ",<br>" + retObj.ExpService.RvAddress_1 + " " + retObj.ExpService.RvAddress_2 + ",<br>" + retObj.ExpService.RvCity + ",<br>" + retObj.ExpService.RvProvince + " " + retObj.ExpService.RvPostCode + ",<br>" + retObj.OtherProps.GlobalAreaName));
            if (Number(retObj.OtherProps.RvAddressCount) > 1) {
                $("#btChangeAddress").show();
            }
            else {
                $("#btChangeAddress").hide();
            }
            $("#btReGetAddress").show();

            $("#ddlSOFrom").val(retObj.SaleSite_Id);
            $("#ddlSOCurr").val(retObj.SysCurrency_Id);
            pageVariable.handlerSOFrm.SaleOrder.WUnit = retObj.OtherProps.WUnit;
            pageVariable.handlerSOFrm.SaleOrder.CurrSymbol = retObj.OtherProps.CurrSymbol;
            pageVariable.handlerSOFrm.SaleOrder.CurrCode = retObj.OtherProps.CurrCode;

            var m_salesite = pageVariable.SaleSiteDict.getItem(retObj.SaleSite_Id);
            pageVariable.handlerSOFrm.SaleOrder.WeightRate = m_salesite.WeightRate;
            pageVariable.handlerSOFrm.SaleOrder.DefaultCurrRate = m_salesite.CurrRate;

            saleplatform.currObj = {};
            saleplatform.currObj.WUnit = retObj.OtherProps.WUnit;
            saleplatform.currObj.SysCurrency_Id = retObj.SysCurrency_Id;
            saleplatform.currObj.CurrCode = retObj.OtherProps.CurrCode;
            $("#lbExpWUnit").text(retObj.OtherProps.WUnit);
            $("#lbEPCurr, #lbECCurr").text(retObj.OtherProps.CurrCode);
            $("#dvSORate").hide();
            var m_socurrrateCtrl = $("#txtSOCurrRate");
            m_socurrrateCtrl.val("1.00");
            m_socurrrateCtrl.attr("last_rate", null);
            pageVariable.handlerSOFrm.so_rate = 1;

            $("#txtSOCreateTime").val(datastruct.convertion.convertToDateStr(retObj.OtherProps.CreateTimeStr));
            $("#txtEstimatedShipTime").val(datastruct.convertion.convertToDateStr(retObj.OtherProps.EstimatedShipTimeStr));
            $("#txtEstimatedArriveTime").val(datastruct.convertion.convertToDateStr(retObj.OtherProps.EstimatedArriveTimeStr));

            $("#txtExpWeight").val(Number(retObj.ExpService.Weight).toFixed(3));
            $("#txtLength").val(retObj.ExpService.Length);
            $("#txtWidth").val(retObj.ExpService.Width);
            $("#txtHeight").val(retObj.ExpService.Height);

            pageVariable.selexpserviceCtrl.setExpService({ ExpressService_Id: retObj.ExpService.ExpressService_Id, ExpressServiceName: retObj.ExpService.ExpressServiceName });
            pageVariable.selexpserviceCtrl.ExpressService = retObj.ExpService;
            pageVariable.selexpserviceCtrl.ExpressService.MaxDeliveryTime = retObj.ExpService.OtherProps.MaxDeliveryTime;
            pageVariable.sellstsolutionCtrl.setLstSolution({ LstSolution_Id: retObj.ExpService.LstSolution_Id, LstSolutionName: retObj.ExpService.LstSolutionName });
            $("#txtExpPrice").val(Number(retObj.ExpService.ExpServicePrice).toFixed(2));
            $("#txtExpPrice").attr("lstsolution_ids", retObj.ExpService.OtherProps.LstSolution_Ids);
            $("#txtExpCost").val(Number(retObj.ExpService.ExpServiceCost).toFixed(2));
            $("#txtSORemark").val(commoncore.func.showSpecialChar(retObj.Remark));

            $.each(retObj.ExpService.Customs, function () {
                if (this.OtherProps.GlobalAreaName) {
                    this.GlobalAreaName = this.OtherProps.GlobalAreaName;
                }
                else {
                    this.GlobalAreaName = "";
                }
            });

            var m_eostate = Number(retObj.ExpService.EOState);
            if (m_eostate > 10 || m_eostate == 10) {
                var m_custCtrl = $("#selCustomer");
                m_custCtrl.find("input").attr('disabled', true);
                m_custCtrl.find("img").hide();
                $("#ddlSOFrom").attr('disabled', true);
                $("#ddlSOCurr").attr('disabled', true);
                $("#txtSOCreateTime").attr('disabled', true);
            }
            else {
                var m_custCtrl = $("#selCustomer");
                m_custCtrl.find("input").attr('disabled', false);
                m_custCtrl.find("img").show();
                $("#ddlSOFrom").attr('disabled', false);
                $("#ddlSOCurr").attr('disabled', false);
                $("#txtSOCreateTime").attr('disabled', false);
            }

            if (pageVariable.customsinfoList) {
                pageVariable.customsinfoList.bindDataSource(retObj.ExpService.Customs);
            }
            pageVariable.soproductList.bindDataSource(retObj.Products);

            if (retObj.ExpService.OtherProps.WH_AreaIndexs) {
                if (retObj.ExpService.OtherProps.WH_AreaIndexs.indexOf("#" + retObj.ExpService.GlobalArea_Id + "#") > -1) {
                    $("#dvSORemark").addClass("last-item");
                    var m_dvCustom = $("#dvCustom");
                    m_dvCustom.removeClass("last-item");
                    m_dvCustom.hide();
                }
                else {
                    $("#dvSORemark").removeClass("last-item");
                    var m_dvCustom = $("#dvCustom");
                    m_dvCustom.addClass("last-item");
                    m_dvCustom.show();
                }
            }

            pageVariable.handlerSOFrm.show();
            $("#lbSOInfoSymbol").trigger("click");
        });
    };

    initHandlerSOFrm(m_func);

    pageVariable.handlerSOFrm.so_custom_key = -10000;

    pageVariable.handlerSOFrm.action = "Modify";
    pageVariable.handlerSOFrm.setTitle(mlm.C0061 + mlm.C1435);
}
/* 切换订单的Tab */
function showSOTab(event, ui) {
    if (ui.index == 1 || ui.index == 2) {
        if (!pageVariable.handlerSOFrm.SaleOrder.Customer_Id || pageVariable.handlerSOFrm.SaleOrder.Customer_Id == "0") {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1244);
            $("#lbSOInfoSymbol").trigger("click");
            return false;
        }
    }

    if (ui.index == 1) {
        if (!pageVariable.handlerSOFrm.SaleOrder.ExpService.RvFullName) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1528);
            $("#lbSOInfoSymbol").trigger("click");
            return false;
        }

        if (!pageVariable.customsinfoList) {
            pageVariable.customsinfoList = new uicontrol.tableList("customsinfoList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 45,
                                        keyColumn: "SO_Custom_Id",
                                        columns: [{ display: mlm.C1307, name: "CustomProdName", width: 200, align: 'left' },
                                                { display: mlm.C1621, name: "CustomProdName_CN", width: 200, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 50, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                { display: mlm.C1310, name: "CustomValue", width: 70, align: 'right', adjust: true, createCell: createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 110, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 90, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 70, align: 'left' },
                                                { display: mlm.C0019, name: "", width: 75, align: 'center', adjust: true, createCell: createSOCustomOperaCell}]
                                    });

            if (pageVariable.handlerSOFrm.SaleOrder.ExpService.Customs.length > 0) {
                pageVariable.customsinfoList.bindDataSource(pageVariable.handlerSOFrm.SaleOrder.ExpService.Customs);
            }
            else {
                initSOCustom();
            }
        }
    }
    else if (ui.index == 2) {
        calculateSO();
    }
}
/* 构建商品图片列 */
function constructSOProdPicCell(key, cellValue) {

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
/* 构建订单商品列 */
function createSOProdCell(key, cellValue) {
    var m_arr = [];
    m_arr.push("<a onclick='viewSSProduct.call(this, \"" + this.keyObj.SS_Product_Id + "\", \"" + key + "\")' href='javascript:void(\"0\");'>");
    m_arr.push("<span>" + this.keyObj.SkuProdCode + "</span> - ");
    m_arr.push("<span>" + this.keyObj.ProdName.replace(/\^/g, "\"").replace(/\~/g, "\'") + "</span>");

    if (this.keyObj.SkuProps) {
        m_arr.push(" - <span>[" + this.keyObj.SkuProps + "]</span>");
    }
    m_arr.push("</a>");

    var m_keyobj = this.keyObj;
    if (this.keyObj.GiftSource) {
        if (this.keyObj.GiftSource.length == 1) {
            m_arr.push("<div style='margin: 5px 0px 0px 0px; padding: 0px; color: #666'><span style='margin: 0px 15px 0px 0px'>" + mlm.C1061 + ": </span><span>" + this.keyObj.GiftName + "</span>");
        }
        else if (this.keyObj.GiftSource.length > 1) {
            m_arr.push("<div style='margin: 5px 0px 0px 0px; padding: 0px; color: #666'><span style='margin: 0px 15px 0px 0px'>" + mlm.C1061 + ": </span><select id='ddlSOGift_" + key + "' tag='" + key + "' class='dropdown-list' style='width: 160px' onchange='changeSOGift.call(this);'>");

            $.each(this.keyObj.GiftSource, function () {
                if (this.SS_Gift_Id == m_keyobj.SS_Gift_Id) {
                    m_arr.push("<option value='" + this.SS_Gift_Id + "' selected='selected'>" + this.GiftName + "</option>");
                }
                else {
                    m_arr.push("<option value='" + this.SS_Gift_Id + "'>" + this.GiftName + "</option>");
                }
            });
            m_arr.push("</select></div>");
        }
    }

    return m_arr.join("");
}
/* 构建目录价列 */
function createSOListPriceCell(key, cellValue) {
    return commoncore.func.getCurrHtml(pageVariable.handlerSOFrm.SaleOrder.CurrSymbol, cellValue);
}
/* 构建目录价列 */
function createSODiscountCell(key, cellValue) {
    var m_listprice = Number(this.keyObj.ListPrice);
    var m_saleprice = Number(this.keyObj.SalePrice);

    if (m_listprice > 0 && m_saleprice > 0) {
        return ((m_saleprice / m_listprice) * 100).toFixed(2) + "%";
    }
    else {
        return "100.00%"
    }
}
/* 构建订单商品价格列 */
function createSOProdPriceCell(key, cellValue) {
    var m_arr = [];
    m_arr.push("<span style='margin: 0px 5px 0px 0px'>" + pageVariable.handlerSOFrm.SaleOrder.CurrSymbol + "</span>");
    m_arr.push("<input id='txtSoProdPrice_" + key + "' type='text' class='text-input' style='width: 45px' onkeypress='uicontrol.func.checkInputNumber(event);' onchange='changeSOProdPrice.call(this, \"" + key + "\")' value='" + Number(this.keyObj.SalePrice).toFixed(2) + "' />");

    return m_arr.join("");
}
/* 改变商品价格 */
function changeSOProdPrice(ss_innerprod_id) {
    var m_price = $(this).val();
    if (!m_price) {
        m_price = 0.00;
    }

    var m_ss_innerprod = pageVariable.soproductList.getItem(ss_innerprod_id);
    m_ss_innerprod.SalePrice = m_price;

    pageVariable.soproductList.modifyData(ss_innerprod_id, m_ss_innerprod);
}
/* 构建订单商品数量列 */
function createSOProdQtyCell(key, cellValue) {

    var m_arr = [];

    m_arr.push("<input id='txtSoProdQty_" + key + "' type='text' class='text-input' style='width: 30px' onkeypress='uicontrol.func.checkInputNumber(event);' onchange='changeSOProdQty.call(this, \"" + key + "\")' value='" + this.keyObj.Qty + "' />");
    m_arr.push("<span style='margin: 0px 0px 0px 5px'>" + this.keyObj.ProdUnit + "</span>");

    return m_arr.join("");
}
/* 改变商品数量 */
function changeSOProdQty(ss_innerprod_id) {

    var m_ss_innerprod = pageVariable.soproductList.getItem(ss_innerprod_id);
    var m_oldqty = Number(m_ss_innerprod.Qty);

    var m_qty = $(this).val();
    if (!m_qty || m_qty == 0) {
        $(this).val(m_oldqty);
        return;
    }

    m_ss_innerprod.Qty = m_qty;
    $.each(m_ss_innerprod.GProducts, function () {
        this.Qty = (Number(this.Qty) / m_oldqty) * Number(m_ss_innerprod.Qty);
        if (this.__Custom) {
            this.__Custom.CustomQty = this.Qty;
        }
    });

    $.each(m_ss_innerprod.GiftItems, function () {
        this.Qty = (Number(this.Qty) / m_oldqty) * Number(m_ss_innerprod.Qty);
        if (this.__Custom) {
            this.__Custom.CustomQty = this.Qty;
        }
    });

    pageVariable.soproductList.modifyData(m_ss_innerprod.SS_InnerProd_Id, m_ss_innerprod);

    calculateSOWeightAndVolumn();
}
/* 构建订单内部商品列 */
function createSOInnerSkuProdCell(key, cellValue) {
    var m_arr = [];

    $.each(this.keyObj.GProducts, function () {
        var m_proditemarr = [];
        m_proditemarr.push("<div style='margin: 0px 0px 5px 0px; padding: 0px'><span>(" + Number(this.Qty) + " " + this.ProdUnit + ")</span> ");
        m_proditemarr.push("<a onclick='viewProduct.call(this, \"" + this.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>");
        m_proditemarr.push("<span>" + this.SkuProdCode + "</span> - ");
        m_proditemarr.push("<span>" + this.ProdName + "</span>");

        if (this.SkuProps) {
            m_proditemarr.push(" - <span>[" + this.SkuProps + "]</span>");
        }
        m_proditemarr.push("</a></div>");

        m_arr.push(m_proditemarr.join(""));
    });

    $.each(this.keyObj.GiftItems, function () {
        var m_proditemarr = [];
        m_proditemarr.push("<div style='margin: 0px 0px 5px 0px; padding: 0px'><span>(" + Number(this.Qty) + " " + this.ProdUnit + ")</span> ");
        m_proditemarr.push("<a onclick='viewProduct.call(this, \"" + this.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");' style='color: #666'>");
        m_proditemarr.push("<span>" + this.SkuProdCode + "</span> - ");
        m_proditemarr.push("<span>" + this.ProdName + "</span>");

        if (this.SkuProps) {
            m_proditemarr.push(" - <span>[" + this.SkuProps + "]</span>");
        }
        m_proditemarr.push("</a></div>");

        m_arr.push(m_proditemarr.join(""));
    });

    return m_arr.join("");
}
/* 构建订单操作列 */
function createSOProdOperaCell(key, cellValue) {
    return "<a href='javascript:void(\"0\")' class='bt-link' style='margin: 0px' tag='" + key + "' onclick='openHandlerGProdFrm.call(this);'>" + mlm.C1173 + mlm.C1055 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDeleteSOProdFrm.call(this);'>" + mlm.C0062 + "</a>";
}
/* 改变订单赠品 */
function changeSOGift() {
    var m_key = $(this).attr("tag");
    var m_ssgift_id = $(this).val();

    var m_soproduct = pageVariable.soproductList.getItem(m_key);
    $.each(m_soproduct.GiftSource, function () {
        if (this.SS_Gift_Id == m_ssgift_id) {

            m_soproduct.Gift = {};
            m_soproduct.SS_Gift_Id = this.SS_Gift_Id;
            m_soproduct.GiftName = this.GiftName;

            m_soproduct.GiftItems = [];
            $.each(this.Items, function () {
                var m_giftitem = {};
                m_giftitem.Product_Id = this.OtherProps.Product_Id;
                m_giftitem.SkuProduct_Id = this.SkuProduct_Id;
                m_giftitem.SkuProdCode = this.OtherProps.ProdCode;
                m_giftitem.ProdName = this.OtherProps.ProdName;
                m_giftitem.ProdUnit = this.OtherProps.Unit;
                m_giftitem.SkuProps = this.OtherProps.SkuProps;
                m_giftitem.Qty = Number(this.Qty) * Number(m_soproduct.Qty);
                m_giftitem.Cost = Number(this.OtherProps.Cost) * pageVariable.handlerSOFrm.so_rate;
                m_giftitem.Weight = this.OtherProps.Weight;

                m_soproduct.GiftItems.push(m_giftitem);
            });
        }
    });

    pageVariable.soproductList.modifyData(m_key, m_soproduct);

    calculateSOWeightAndVolumn();
}
/* 打开选择销售商品的窗体 */
function openSelectSbom() {
    var m_selecteditems = new datastruct.dictionary();
        $.each(pageVariable.handlerSOFrm.SaleOrder.Products, function () {
            m_selecteditems.setItem(this.SS_InnerProd_Id, this);
        });
    var m_salesite_id = $("#ddlSOFrom").val();
    if (!m_salesite_id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0416 + mlm.C0713);
        return;
    }
    pageVariable.selectSbom.show(pageVariable.SaleSiteDict.getItem(m_salesite_id).SalePlatform_Id, m_salesite_id, m_selecteditems);
}
/* 添加销售商品 */
function addSbom(selectedskuprods) {
    $.each(selectedskuprods, function () {
        if (!pageVariable.soproductList.getItem(this.SS_InnerProd_Id)) {

            var m_soproduct = {};
            m_soproduct.SS_Product_Id = this.SS_Product_Id;
            m_soproduct.SS_InnerProd_Id = this.SS_InnerProd_Id;
            m_soproduct.ProdCode = this.Product.ProdCode;
            m_soproduct.ProdPicUrl = this.BrowsePicUrl;
            m_soproduct.SkuProdCode = this.ProdCode;
            m_soproduct.ProdName = this.Product.ProdName;
            m_soproduct.ProdUnit = this.Product.Unit;
            m_soproduct.SkuProps = this.SkuProps;
            m_soproduct.BoxWeight = this.BoxWeight;
            m_soproduct.BoxLength = this.BoxLength;
            m_soproduct.BoxWidth = this.BoxWidth;
            m_soproduct.BoxHeight = this.BoxHeight;
            m_soproduct.GiftItems = [];

            //赠品数据源
            m_soproduct.GiftSource = this.Product.Gifts;
            if (m_soproduct.GiftSource && m_soproduct.GiftSource.length > 0) {
                var m_gift = m_soproduct.GiftSource[0];

                m_soproduct.Gift = {};
                m_soproduct.SS_Gift_Id = m_gift.SS_Gift_Id;
                m_soproduct.GiftName = m_gift.GiftName;

                $.each(m_gift.Items, function () {
                    var m_giftitem = {};
                    m_giftitem.Product_Id = this.OtherProps.Product_Id;
                    m_giftitem.SkuProduct_Id = this.SkuProduct_Id;
                    m_giftitem.SkuProdCode = this.OtherProps.ProdCode;
                    m_giftitem.ProdName = this.OtherProps.ProdName;
                    m_giftitem.ProdUnit = this.OtherProps.Unit;
                    m_giftitem.SkuProps = this.OtherProps.SkuProps;
                    m_giftitem.Qty = this.Qty;
                    m_giftitem.Cost = Number(this.OtherProps.Cost) * Number(pageVariable.handlerSOFrm.SaleOrder.DefaultCurrRate);
                    m_giftitem.Weight = Number(this.OtherProps.Weight) * Number(pageVariable.handlerSOFrm.SaleOrder.WeightRate);

                    m_giftitem.__Custom = {};
                    m_giftitem.__Custom.Product_Id = this.OtherProps.Product_Id;
                    m_giftitem.__Custom.CustomProdName = this.OtherProps.CustomProdName ? this.OtherProps.CustomProdName : m_giftitem.ProdName;
                    m_giftitem.__Custom.CustomProdName_CN = this.OtherProps.CustomProdName_CN;
                    m_giftitem.__Custom.CustomQty = m_giftitem.Qty;
                    m_giftitem.__Custom.CustomValue = this.OtherProps.CustomValue;
                    m_giftitem.__Custom.CustomCode = this.OtherProps.CustomCode;
                    m_giftitem.__Custom.CustomMaterial = this.OtherProps.CustomMaterial;
                    m_giftitem.__Custom.FactoryCountry = this.OtherProps.GlobalArea_Id;
                    m_giftitem.__Custom.GlobalAreaName = this.OtherProps.GlobalAreaName;

                    m_soproduct.GiftItems.push(m_giftitem);
                });
            }

            var m_exppvs = [];
            var m_expandprops = this.Product.ExpandProps;
            $.each(this.Product.PropTable, function () {
                if (m_expandprops[this.ProdProperty_Id]) {
                    m_exppvs.push(this.ProdPropName + ":" + this.ProdPValueRange);
                }
            });
            m_soproduct.SS_ExpandProps = m_exppvs.join(";");

            m_soproduct.Qty = 1;
            m_soproduct.ListPrice = Number(this.SalePrice.ListPrice) * pageVariable.handlerSOFrm.so_rate;
            m_soproduct.Discount = this.SalePrice.Discount;
            m_soproduct.SalePrice = Number(this.SalePrice.SalePrice) * pageVariable.handlerSOFrm.so_rate;
            m_soproduct.OtherCost = Number(this.SalePrice.OtherCost) * pageVariable.handlerSOFrm.so_rate;
            m_soproduct.TransCost = this.SalePrice.TransCost;

            m_soproduct.GProducts = [];
            $.each(this.SkuProducts, function () {
                var m_skuprod = {};
                m_skuprod.Product_Id = this.OtherProps.Product_Id;
                m_skuprod.SkuProduct_Id = this.SkuProduct_Id;
                m_skuprod.SkuProdCode = this.OtherProps.ProdCode;
                m_skuprod.ProdName = this.OtherProps.ProdName;
                m_skuprod.ProdUnit = this.OtherProps.Unit;
                m_skuprod.SkuProps = this.OtherProps.SkuProps;
                m_skuprod.Qty = Number(this.RelQty) * Number(m_soproduct.Qty);
                m_skuprod.Cost = Number(this.OtherProps.Cost) * Number(pageVariable.handlerSOFrm.SaleOrder.DefaultCurrRate);
                m_skuprod.Weight = Number(this.OtherProps.Weight) * Number(pageVariable.handlerSOFrm.SaleOrder.WeightRate);

                m_skuprod.__Custom = {};
                m_skuprod.__Custom.Product_Id = this.OtherProps.Product_Id;
                m_skuprod.__Custom.CustomProdName = this.OtherProps.CustomProdName ? this.OtherProps.CustomProdName : m_skuprod.ProdName;
                m_skuprod.__Custom.CustomProdName_CN = this.OtherProps.CustomProdName_CN;
                m_skuprod.__Custom.CustomQty = m_skuprod.Qty;
                m_skuprod.__Custom.CustomValue = this.OtherProps.CustomValue;
                m_skuprod.__Custom.CustomCode = this.OtherProps.CustomCode;
                m_skuprod.__Custom.CustomMaterial = this.OtherProps.CustomMaterial;
                m_skuprod.__Custom.FactoryCountry = this.OtherProps.GlobalArea_Id;
                m_skuprod.__Custom.GlobalAreaName = this.OtherProps.GlobalAreaName;

                m_soproduct.GProducts.push(m_skuprod);
            });

            pageVariable.soproductList.addData(m_soproduct.SS_InnerProd_Id, m_soproduct);

            pageVariable.handlerSOFrm.SaleOrder.Products.push(m_soproduct);
        }
    });

    calculateSOWeightAndVolumn();
}

/* 打开删除订单商品的窗体 */
function openDeleteSOProdFrm() {
    if (!pageVariable.deleteSOProdFrm) {
        pageVariable.deleteSOProdFrm = new uicontrol.confirmDelete(deleteSOProd);
    }

    var m_key = $(this).attr("tag");

    pageVariable.deleteSOProdFrm.so_proditem_id = m_key;
    pageVariable.deleteSOProdFrm.showConfirm(mlm.C0464 + mlm.C0734);
}
/* 删除订单商品 */
function deleteSOProd() {
    pageVariable.soproductList.deleteData(pageVariable.deleteSOProdFrm.so_proditem_id);

    pageVariable.handlerSOFrm.SaleOrder.Products = [];
    $.each(pageVariable.soproductList.dataSource.items.arrValues, function () {
        pageVariable.handlerSOFrm.SaleOrder.Products.push(this);
    });

    calculateSOWeightAndVolumn();

    pageVariable.deleteSOProdFrm.close();
}

/* 打开处理内部商品的 */
function openHandlerGProdFrm() {
    if (!pageVariable.handlerGProdFrm) {
        pageVariable.handlerGProdFrm = new uicontrol.dialog("handlerGProdFrm", mlm.C1451 + mlm.C1055, { width: 1100, position: ["auto", 35] }, saveGProd);

        pageVariable.gprodList = new uicontrol.tableList("gprodList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 300,
                                        keyColumn: "SkuProduct_Id",
                                        columns: [{ display: mlm.C0734, name: "", width: 450, align: 'left', adjust: true, createCell: creatProdCell },
                                                { display: mlm.C1063, name: "_type", width: 65, align: 'left', adjust: true, createCell: createProdTypeCell },
                                                { display: mlm.C1098, name: "Qty", width: 65, align: 'left', adjust: true, createCell: createProdQtyCell },
                                                { display: mlm.C1529, name: "Cost", width: 80, align: 'left', adjust: true, createCell: createProdCostCell },
                                                { display: mlm.C1320, name: "Weight", width: 80, align: 'left', adjust: true, createCell: createProdWeightCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, deletedFunc: "openDelGProdFrm"}]
                                    });

        pageVariable.selectGProd = new bizcontrol.selectproduct(addGProd);
        $("#btAddGProd").click(openSelGProdFrm);
    }

    var m_key = $(this).attr("tag");
    var m_so_product = pageVariable.soproductList.getItem(m_key);

    var m_products = [];
    $.each(m_so_product.GProducts, function () {
        this._type = 1;
        m_products.push(this);
    });
    $.each(m_so_product.GiftItems, function () {
        this._type = 2;
        m_products.push(this);
    });

    pageVariable.gprodList.bindDataSource(m_products);

    pageVariable.handlerGProdFrm.SO_Product = m_so_product;
    pageVariable.handlerGProdFrm.show();
}
/* 构建商品列 */
function creatProdCell(key, cellValue) {
    var m_arr = [];
    m_arr.push("<a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>");
    m_arr.push("<span>" + this.keyObj.SkuProdCode + "</span> - ");
    m_arr.push("<span>" + this.keyObj.ProdName + "</span>");

    if (this.keyObj.SkuProps) {
        m_arr.push(" - <span>[" + this.keyObj.SkuProps + "]</span>");
    }
    m_arr.push("</a>");

    return m_arr.join("");
}
/* 构建商品类别列 */
function createProdTypeCell(key, cellValue) {
    var m_arr = [];

    if (cellValue == 1) {
        m_arr.push("<select id='ddlProdType_" + key + "' class='dropdown-list' style='width: 65px'><option value='1' selected='selected'>" + mlm.C1530 + "</option><option value='2'>" + mlm.C1061 + "</option></select>");
    }
    else {
        m_arr.push("<select id='ddlProdType_" + key + "' class='dropdown-list' style='width: 65px'><option value='1'>" + mlm.C1530 + "</option><option value='2' selected='selected'>" + mlm.C1061 + "</option></select>");
    }
    
    return m_arr.join("");
}
/* 构建商品数量列 */
function createProdQtyCell(key, cellValue) {
    var m_arr = [];
    m_arr.push("<input id='txtProdQty_" + key + "' type='text' class='text-input' style='width: 40px' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + cellValue + "' />");
    m_arr.push("<span style='margin: 0px 0px 0px 5px'>" + this.keyObj.ProdUnit + "</span>");

    return m_arr.join("");
}
/* 构建商品成本列 */
function createProdCostCell(key, cellValue) {
    return commoncore.func.getCurrHtml(pageVariable.handlerSOFrm.SaleOrder.CurrSymbol, cellValue);
}
/* 构建商品重量列 */
function createProdWeightCell(key, cellValue) {
    return cellValue + " kg";
}
/* 打开选择内部商品的窗体 */
function openSelGProdFrm() {
    var m_selecteditems = new datastruct.dictionary();
    $.each(pageVariable.gprodList.dataSource.items.arrValues, function () {
        m_selecteditems.setItem(this.SkuProduct_Id, this);
    });
    pageVariable.selectGProd.show(m_selecteditems);
}
/* 添加内部商品 */
function addGProd(selectedskuprods) {
    $.each(selectedskuprods, function () {
        if (!pageVariable.gprodList.getItem(this.SkuProduct_Id)) {
            var m_skuprod = {};
            m_skuprod._type = 1;
            m_skuprod.Product_Id = this.Product_Id;
            m_skuprod.SkuProduct_Id = this.SkuProduct_Id;
            m_skuprod.SkuProdCode = this.ProdCode;
            m_skuprod.ProdName = this.Product.ProdName;
            m_skuprod.ProdUnit = this.Product.Unit;
            m_skuprod.SkuProps = this.SkuProps;
            m_skuprod.Qty = 1;
            m_skuprod.Cost = Number(this.Cost) * Number(pageVariable.handlerSOFrm.SaleOrder.DefaultCurrRate);
            m_skuprod.Weight = Number(this.Product.Weight) * Number(pageVariable.handlerSOFrm.SaleOrder.WeightRate);

            m_skuprod.__Custom = {};
            m_skuprod.__Custom.Product_Id = this.Product.Product_Id;
            m_skuprod.__Custom.CustomProdName = this.Product.CustomProdName ? this.Product.CustomProdName : m_skuprod.ProdName;
            m_skuprod.__Custom.CustomProdName_CN = this.Product.CustomProdName_CN;
            m_skuprod.__Custom.CustomQty = m_skuprod.Qty;
            m_skuprod.__Custom.CustomValue = this.Product.CustomValue;
            m_skuprod.__Custom.CustomCode = this.Product.CustomCode;
            m_skuprod.__Custom.CustomMaterial = this.Product.CustomMaterial;
            m_skuprod.__Custom.FactoryCountry = this.Product.GlobalArea_Id;
            m_skuprod.__Custom.GlobalAreaName = this.Product.OtherProps.GlobalAreaName;

            pageVariable.handlerGProdFrm.SO_Product.GProducts.push(m_skuprod);

            pageVariable.gprodList.addData(m_skuprod.SkuProduct_Id, m_skuprod);
        }
    });
}
/* 打开删除内部商品的窗体 */
function openDelGProdFrm() {
    if (!pageVariable.delelteGProdFrm) {
        pageVariable.delelteGProdFrm = new uicontrol.confirmDelete(deleteGProd);
    }

    pageVariable.delelteGProdFrm.skuproduct_id = $(this).attr("tag"); ;
    var m_skuproduct = pageVariable.gprodList.getItem(pageVariable.delelteGProdFrm.skuproduct_id);

    pageVariable.delelteGProdFrm.showConfirm(mlm.C0464 + mlm.C1055 + "(" + m_skuproduct.SkuProdCode + ") ?");
}
/* 删除内部商品 */
function deleteGProd() {
    pageVariable.gprodList.deleteData(pageVariable.delelteGProdFrm.skuproduct_id);

    pageVariable.delelteGProdFrm.close();
}
/* 保存内部商品 */
function saveGProd() {

    var m_proddict = new datastruct.dictionary();
    $.each(pageVariable.handlerGProdFrm.SO_Product.GProducts, function () {
        m_proddict.setItem(this.SkuProduct_Id, this)
    });
    $.each(pageVariable.handlerGProdFrm.SO_Product.GiftItems, function () {
        m_proddict.setItem(this.SkuProduct_Id, this)
    });

    var m_gproducts = [];
    var m_giftitems = [];
    $.each(pageVariable.gprodList.dataSource.items.arrValues, function () {
        var m_item = m_proddict.getItem(this.SkuProduct_Id);
        if (m_item) {
            m_item.Qty = Number($("#txtProdQty_" + this.SkuProduct_Id).val());

            if (m_item.Qty > 0) {
                m_item._type = $("#ddlProdType_" + this.SkuProduct_Id).val();

                if (m_item.__Custom) {
                    m_item.__Custom.CustomQty = m_item.Qty;
                }

                if (m_item._type == 1) {
                    m_gproducts.push(m_item);
                }
                else {
                    m_giftitems.push(m_item);
                }
            }
        }
    });

    if (m_gproducts.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1531);
        return;
    }

    pageVariable.handlerGProdFrm.SO_Product.GProducts = m_gproducts;
    pageVariable.handlerGProdFrm.SO_Product.GiftItems = m_giftitems;

    pageVariable.soproductList.modifyData(pageVariable.handlerGProdFrm.SO_Product.SS_InnerProd_Id, pageVariable.handlerGProdFrm.SO_Product);

    calculateSOWeightAndVolumn();

    pageVariable.handlerGProdFrm.close();
}

/* 修改配送价格 */
function changeExpPrice() {

    var m_pricestr = Number(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServicePrice).toFixed(2);
    if (!pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpressService_Id || pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpressService_Id == "0") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0436 + mlm.C0713);
        $(this).val(m_pricestr);
        return;
    }

    var m_str = $(this).val();
    if (!m_str) {
        $(this).val(m_pricestr);
    }
    else {
        pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServicePrice = $(this).val();
    }
}
/* 修改配送成本 */
function changeExpCost() {

    var m_pricestr = Number(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost).toFixed(2);
    if (!pageVariable.handlerSOFrm.SaleOrder.ExpService.LstSolution_Id || pageVariable.handlerSOFrm.SaleOrder.ExpService.LstSolution_Id == "0") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0783 + mlm.C0713);
        $(this).val(m_pricestr);
        return;
    }

    var m_str = $(this).val();
    if (!m_str) {
        $(this).val(m_pricestr);
    }
    else {
        pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost = $(this).val();
    }
}

/* 保存订单 */
function saveSO() {
    var m_saleorder = new sm.saleorder();
    m_saleorder.SaleOrder_Id = pageVariable.handlerSOFrm.SaleOrder.SaleOrder_Id;
    m_saleorder.Customer_Id = pageVariable.handlerSOFrm.SaleOrder.Customer_Id;

    var m_expserviceobj = pageVariable.handlerSOFrm.SaleOrder.ExpService;

    if (!m_saleorder.Customer_Id || m_saleorder.Customer_Id == "0") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0719 + mlm.C0713);
        return;
    }
    m_saleorder.CreateTime = datastruct.convertion.convertToDateStr($("#txtSOCreateTime").val());
    if (m_saleorder.CreateTime == "-1") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1532);
        return;
    }
    if (!m_saleorder.CreateTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1490 + mlm.C0713);
        return;
    }
    var m_createtime = datastruct.convertion.convertToDateByStr(m_saleorder.CreateTime);
    if (m_createtime > pageVariable.nowdate) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1533);
        return;
    }
    if (!m_expserviceobj.ExpressService_Id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0436 + mlm.C0713);
        return;
    }
    if (!m_expserviceobj.LstSolution_Id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0783 + mlm.C0713);
        return;
    }

    m_saleorder.SalePlatform_Id = pageVariable.handlerSOFrm.SaleOrder.SalePlatform_Id;
    m_saleorder.SaleSite_Id = pageVariable.handlerSOFrm.SaleOrder.SaleSite_Id;
    if (!m_saleorder.SaleSite_Id || m_saleorder.SaleSite_Id == "0") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0416 + mlm.C0713);
        return;
    }
    m_saleorder.SysCurrency_Id = pageVariable.handlerSOFrm.SaleOrder.SysCurrency_Id;
    m_saleorder.SysWeightUnit_Id = pageVariable.handlerSOFrm.SaleOrder.SysWeightUnit_Id;

    var m_error = "";

    m_saleorder.Products = [];
    $.each(pageVariable.handlerSOFrm.SaleOrder.Products, function () {

        if (m_error) {
            return;
        }

        var m_product = {};
        m_product.SaleOrder_Id = this.SaleOrder_Id;
        m_product.SO_Product_Id = this.SO_Product_Id;
        m_product.SS_Product_Id = this.SS_Product_Id;
        m_product.SS_InnerProd_Id = this.SS_InnerProd_Id;
        m_product.ProdCode = this.ProdCode;
        m_product.ProdPicUrl = this.ProdPicUrl;
        m_product.SkuProdCode = this.SkuProdCode;
        m_product.ProdName = this.ProdName;
        m_product.ProdUnit = this.ProdUnit;
        m_product.SkuProps = this.SkuProps;
        m_product.Qty = this.Qty;
        m_product.ListPrice = this.ListPrice;
        m_product.Discount = this.Discount;
        m_product.SalePrice = this.SalePrice;
        m_product.OtherCost = this.OtherCost;
        m_product.TransCost = this.TransCost;
        m_product.SO_Gift_Id = this.SO_Gift_Id;
        m_product.GiftName = this.GiftName;
        m_product.BoxWeight = this.BoxWeight;
        m_product.BoxLength = this.BoxLength;
        m_product.BoxWidth = this.BoxWidth;
        m_product.BoxHeight = this.BoxHeight;

        m_product.GProducts = [];
        $.each(this.GProducts, function () {
            var m_gproduct = {};
            m_gproduct.SaleOrder_Id = this.SaleOrder_Id;
            m_gproduct.SO_GProduct_Id = this.SO_GProduct_Id;
            m_gproduct.Product_Id = this.Product_Id;
            m_gproduct.SkuProduct_Id = this.SkuProduct_Id;
            m_gproduct.SkuProdCode = this.SkuProdCode;
            m_gproduct.ProdName = this.ProdName;
            m_gproduct.ProdUnit = this.ProdUnit;
            m_gproduct.SkuProps = this.SkuProps;
            m_gproduct.Qty = this.Qty;
            m_gproduct.Cost = this.Cost;
            m_gproduct.Weight = this.Weight;

            m_product.GProducts.push(m_gproduct);
        });

        if (m_product.GProducts.length == 0) {
            m_error = m_product.SkuProdCode + "-" + m_product.ProdName + "[" + m_product.SkuProps + "] " + mlm.C1534;
        }

        m_product.GiftItems = [];
        $.each(this.GiftItems, function () {
            var m_gift = {};
            m_gift.SaleOrder_Id = this.SaleOrder_Id;
            m_gift.SO_GProduct_Id = this.SO_GProduct_Id;
            m_gift.Product_Id = this.Product_Id;
            m_gift.SkuProduct_Id = this.SkuProduct_Id;
            m_gift.SkuProdCode = this.SkuProdCode;
            m_gift.ProdName = this.ProdName;
            m_gift.ProdUnit = this.ProdUnit;
            m_gift.SkuProps = this.SkuProps;
            m_gift.Qty = this.Qty;
            m_gift.Cost = this.Cost;
            m_gift.Weight = this.Weight;

            m_product.GiftItems.push(m_gift);
        });

        m_saleorder.Products.push(m_product);
    });

    if (pageVariable.handlerSOFrm.SaleOrder.Products.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0734 + mlm.C0713);
        return;
    }
    if (m_error) {
        pageframe.control.alertDialog.showAlertInfo(m_error);
        return;
    }

    m_saleorder.Remark = commoncore.func.convertSpecialChar($.trim($("#txtSORemark").val()));
    m_saleorder.CurrRate = $.trim($("#txtSOCurrRate").val());

    m_saleorder.ExpService = {};
    m_saleorder.ExpService = $.extend(m_saleorder.ExpService, m_expserviceobj);
    m_saleorder.ExpService.EstimatedShipTime = datastruct.convertion.convertToDateStr($("#txtEstimatedShipTime").val());
    m_saleorder.ExpService.EstimatedArriveTime = datastruct.convertion.convertToDateStr($("#txtEstimatedArriveTime").val());

    m_saleorder.ExpService.Customs = [];
    $.each(pageVariable.handlerSOFrm.SaleOrder.ExpService.Customs, function () {
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

        m_saleorder.ExpService.Customs.push(m_custom);
    });

    if (m_saleorder.ExpService.EstimatedShipTime == "-1") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1465);
        return;
    }
    if (!m_saleorder.ExpService.EstimatedShipTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1466 + mlm.C0713);
        return;
    }
    if (m_saleorder.ExpService.EstimatedArriveTime == "-1") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1468);
        return;
    }
    if (!m_saleorder.ExpService.EstimatedArriveTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1467 + mlm.C0713);
        return;
    }

    var m_shiptime = datastruct.convertion.convertToDateByStr(m_saleorder.ExpService.EstimatedShipTime);
    var m_arrivetime = datastruct.convertion.convertToDateByStr(m_saleorder.ExpService.EstimatedArriveTime); 

    if (m_shiptime > m_arrivetime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1470);
        return;
    }
    if (m_createtime > m_shiptime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1535);
        return;
    }

    if (pageVariable.handlerSOFrm.action == "New") {
        m_saleorder.newSaleOrder(function (retTable) {

            var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
            pageVariable.saleorderList.addData(m_jsonobj.SaleOrder_Id, m_jsonobj);

            pageVariable.handlerSOFrm.close();
        });
    }
    else {
        m_saleorder.modifySaleOrder(function (retTable) {

            var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
            pageVariable.saleorderList.modifyData(m_jsonobj.SaleOrder_Id, m_jsonobj);

            //loadSaleOrderStat();

            pageVariable.handlerSOFrm.close();
        });
    }
}
/* 打开删除订单的窗体 */
function openDeleteSOFrm(key) {
    if (!pageVariable.delelteSOFrm) {
        pageVariable.delelteSOFrm = new uicontrol.confirmDelete(deleteSO);
    }

    pageVariable.delelteSOFrm.saleorder_id = key;
    var m_saleorder = pageVariable.saleorderList.getItem(pageVariable.delelteSOFrm.saleorder_id);

    pageVariable.delelteSOFrm.showConfirm(mlm.C0464 + mlm.C1435 + "(" + m_saleorder.SOCode + ") ?");
}
/* 删除订单 */
function deleteSO() {
    var m_saleorder = new sm.saleorder();

    m_saleorder.SaleOrder_Id = pageVariable.delelteSOFrm.saleorder_id;
    m_saleorder.deleteSaleOrder(function () {

        pageVariable.saleorderList.deleteData(m_saleorder.SaleOrder_Id);

        //loadSaleOrderStat();

        pageVariable.delelteSOFrm.close();
    });
}

/* 打开客户确认的窗体 */
function openHandlerCustConfirmFrm(key) {
    if (!pageVariable.handlerCustConfirmFrm) {
        pageVariable.handlerCustConfirmFrm = new uicontrol.dialog("handlerCustConfirmFrm", mlm.C1498, { width: 800 }, custconfirmSO);

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtCustConfirmTime").datepicker();
        $("#txtCustConfirmTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());
    }

    pageVariable.handlerCustConfirmFrm.saleorder_id = key;
    var m_saleorder = pageVariable.saleorderList.getItem(key);

    pageVariable.handlerCustConfirmFrm.saleorder = m_saleorder;
    pageVariable.handlerCustConfirmFrm.setTitle(mlm.C1498 + "(" + m_saleorder.SOCode + ")");
    pageVariable.handlerCustConfirmFrm.show()
}
/* 客户确认 */
function custconfirmSO() {

    var m_saleorder = new sm.saleorder();
    m_saleorder.CustConfirmTime = datastruct.convertion.convertToDateStr($("#txtCustConfirmTime").val());
    if (!m_saleorder.CustConfirmTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1498 + mlm.C0724 + mlm.C0713);
        return;
    }
    if (m_saleorder.CustConfirmTime == "-1") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1536);
        return;
    }

    var m_createtime = datastruct.convertion.convertToDateByStr(pageVariable.handlerCustConfirmFrm.saleorder.CreateTimeStr);
    var m_confirmtime = datastruct.convertion.convertToDateByStr(m_saleorder.CustConfirmTime); 

    if (m_createtime > m_confirmtime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1537);
        return;
    }
    if (m_confirmtime > pageVariable.nowdate) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1538);
        return;
    }

    m_saleorder.SaleOrder_Id = pageVariable.handlerCustConfirmFrm.saleorder_id;
    m_saleorder.custConfirmSaleOrder(function (retTable) {

        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.saleorderList.modifyData(m_jsonobj.SaleOrder_Id, m_jsonobj);

        //loadSaleOrderStat();

        pageVariable.handlerCustConfirmFrm.close();
    });

}

/* 打开生效订单的窗体 */
function openSubmitSO(key) {
    if (!pageVariable.submitSOFrm) {
        pageVariable.submitSOFrm = new uicontrol.dialog("submitSOFrm", mlm.C1524, { width: 800 }, submitSO);

        var m_now = new Date();
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtSubmitTime").datepicker();
        $("#txtSubmitTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());
    }

    var m_saleorder = pageVariable.saleorderList.getItem(key);

    pageVariable.submitSOFrm.saleorder_id = key;
    pageVariable.submitSOFrm.saleorder = m_saleorder;
    pageVariable.submitSOFrm.setTitle(mlm.C1524 + "(" + m_saleorder.SOCode + ")");
    pageVariable.submitSOFrm.show()
}
/* 生效订单 */
function submitSO() {

    var m_saleorder = new sm.saleorder();
    m_saleorder.SaleOrder_Id = pageVariable.submitSOFrm.saleorder_id;

    m_saleorder.SubmitHandleTime = datastruct.convertion.convertToDateStr($("#txtSubmitTime").val());
    if (!m_saleorder.SubmitHandleTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1462 + mlm.C0713);
        return;
    }
    if (m_saleorder.SubmitHandleTime == "-1") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1539);
        return;
    }

    var m_confirmtime = datastruct.convertion.convertToDateByStr(pageVariable.submitSOFrm.saleorder.CustConfirmTimeStr);
    var m_submittime = datastruct.convertion.convertToDateByStr(m_saleorder.SubmitHandleTime);

    if (m_confirmtime > m_submittime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1540);
        return;
    }
    if (m_submittime > pageVariable.nowdate) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1541);
        return;
    }

    m_saleorder.submitSaleOrder(function (retTable) {

        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.saleorderList.modifyData(m_jsonobj.SaleOrder_Id, m_jsonobj);

        //loadSaleOrderStat();

        pageVariable.submitSOFrm.close();
    });

}

/* 打开撤消订单的窗体 */
function openCancelSO(key) {
    if (!pageVariable.handlerCancelSOFrm) {
        pageVariable.handlerCancelSOFrm = new uicontrol.dialog("handlerCancelSOFrm", mlm.C1523, { width: 800 }, cancelSO);
    }

    var m_saleorder = pageVariable.saleorderList.getItem(key);

    $("#lbCancelSOSymbol").text(mlm.C1542 + "(" + m_saleorder.SOCode + ")");

    pageVariable.handlerCancelSOFrm.action = "1";
    pageVariable.handlerCancelSOFrm.saleorder_id = key;
    pageVariable.handlerCancelSOFrm.saleorder = m_saleorder;
    pageVariable.handlerCancelSOFrm.show()
}
/* 打开全额退款的窗体 */
function openRetureSO(key) {
    if (!pageVariable.handlerCancelSOFrm) {
        pageVariable.handlerCancelSOFrm = new uicontrol.dialog("handlerCancelSOFrm", mlm.C1525, { width: 800 }, cancelSO);
    }

    var m_saleorder = pageVariable.saleorderList.getItem(key);

    $("#lbCancelSOSymbol").text(mlm.C1542 + "(" + m_saleorder.SOCode + "), " + mlm.C1525);

    pageVariable.handlerCancelSOFrm.action = "2";
    pageVariable.handlerCancelSOFrm.saleorder_id = key;
    pageVariable.handlerCancelSOFrm.saleorder = m_saleorder;
    pageVariable.handlerCancelSOFrm.show()
}
/* 撤消订单 */
function cancelSO() {

    var m_saleorder = new sm.saleorder();
    m_saleorder.SOAction = pageVariable.handlerCancelSOFrm.action;
    m_saleorder.SaleOrder_Id = pageVariable.handlerCancelSOFrm.saleorder_id;
    m_saleorder.cancelSaleOrder(function (retTable) {

        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.saleorderList.modifyData(m_jsonobj.SaleOrder_Id, m_jsonobj);

        //loadSaleOrderStat();

        pageVariable.handlerCancelSOFrm.close();
    });
}

/* 打开重新发货的窗体 */
function openReSendSOFrm(key) {
    if (!pageVariable.handlerReSendSOFrm) {
        pageVariable.handlerReSendSOFrm = new uicontrol.dialog("handlerReSendSOFrm", mlm.C1526, { width: 1100, position: ["auto", 15] }, resendSO);
        $("#lbRvAddress_1").tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
        $("#btChangeAddress_1").click(openChangeRvAddressForRSFrm);
        $("#btAddCustoms_1").click(openNewCustomFrm);

        pageVariable.selectWH = new bizcontrol.selectwarehouse($("#selectWH"), function () {
            var m_areaindex = "";
            if (pageVariable.selectWH.warehouse) {
                m_areaindex = pageVariable.selectWH.warehouse.AreaIndexs;
            }

            if (m_areaindex.indexOf("#" + pageVariable.handlerReSendSOFrm.saleorder.ExpService.GlobalArea_Id + "#") > -1) {
                $("#dvRSWH").addClass("last-item");
                var m_dvCustom = $("#dvRSCustom");
                m_dvCustom.removeClass("last-item");
                m_dvCustom.hide();
            }
            else {
                $("#dvRSWH").removeClass("last-item");
                var m_dvCustom = $("#dvRSCustom");
                m_dvCustom.addClass("last-item");
                m_dvCustom.show();
            }
        });

        $("#txtEstimatedShipTime_1").datepicker();
        $("#txtEstimatedArriveTime_1").datepicker();

        pageVariable.sellstsolution_1Ctrl = new bizcontrol.selectsolstsolution($("#selLstSolution_1"), null,
        function () {

            var m_saleorder = pageVariable.handlerReSendSOFrm.saleorder;

            var m_condObj = {};
            //m_condObj.LstSolutionIds = m_saleorder.ExpService.OtherProps.LstSolution_Ids.replaceAll("#", "").split(",");
            m_condObj.SalePlatform_Id = m_saleorder.SalePlatform_Id;
            m_condObj.Weight = $("#txtExpWeight_1").val();
            m_condObj.SysWeightUnit_Id = m_saleorder.SysWeightUnit_Id;
            m_condObj.Length = $("#txtLength_1").val();
            m_condObj.Width = $("#txtWidth_1").val();
            m_condObj.Height = $("#txtHeight_1").val();
            m_condObj.Tax = 0;
            $.each(pageVariable.customsinfo_1List.dataSource.items.arrValues, function () {
                m_condObj.Tax += Number(this.CustomQty) * Number(this.CustomValue)
            });
            m_condObj.TaxSysCurrency_Id = keycontext.keyparam.tax_syscurrency;
            m_condObj.WUnit = m_saleorder.OtherProps.WUnit;
            m_condObj.CurrSymbol = m_saleorder.OtherProps.CurrSymbol;
            m_condObj.SysCurrency_Id = m_saleorder.SysCurrency_Id;
            m_condObj.GlobalAreaIds = [];
            m_condObj.GlobalAreaIds.push(m_saleorder.ExpService.GlobalArea_Id);
            m_condObj.Province = m_saleorder.ExpService.RvProvince;
            m_condObj.City = m_saleorder.ExpService.RvCity;

            return m_condObj;
        },
        function (lstsolution) {

            var m_saleorder = pageVariable.handlerReSendSOFrm.saleorder;

            m_saleorder.ExpService.LstSolution_Id = lstsolution.LstSolution_Id;
            m_saleorder.ExpService.LstCompanyName = lstsolution.LstCompanyName;
            m_saleorder.ExpService.LstSolutionName = lstsolution.LstSolutionName;
            m_saleorder.ExpService.ExpServiceCost = Number(lstsolution.TotalCharge);
            m_saleorder.ExpService.LstMaxAvaiTime = lstsolution.MaxAvaiTime;

            $("#txtExpCost_1").val((Number(lstsolution.TotalCharge) + Number(lstsolution.VATCharge)).toFixed(2));

            if (m_saleorder.ExpService.Weight != lstsolution.Weight) {
                $("#lbLstWeight_1").text(" / " + lstsolution.Weight + " " + m_saleorder.OtherProps.WUnit);
            }
            else {
                $("#lbLstWeight_1").text("");
            }

            $("#txtEstimatedShipTime_1").attr("maxavaitime", lstsolution.MaxAvaiTime);

            var m_shiptime = datastruct.convertion.convertToDateByStr($("#txtEstimatedShipTime_1").val());
            m_shiptime.setDate(m_shiptime.getDate() + Number(lstsolution.MaxAvaiTime));
            var m_year = m_shiptime.getFullYear();
            var m_month = Number(m_shiptime.getMonth()) + 1;
            $("#txtEstimatedArriveTime_1").datepicker("setDate", m_year + "-" + m_month + "-" + m_shiptime.getDate());
        });
        pageVariable.handlerReSendSOFrm.show();

        $("#txtEstimatedShipTime_1").change(function () {
            var m_shiptime = datastruct.convertion.convertToDateByStr($(this).val());
            m_shiptime.setDate(m_shiptime.getDate() + Number($(this).attr("maxavaitime")));
            var m_year = m_shiptime.getFullYear();
            var m_month = Number(m_shiptime.getMonth()) + 1;
            $("#txtEstimatedArriveTime_1").datepicker("setDate", m_year + "-" + m_month + "-" + m_shiptime.getDate());
        });
        $("#txtExpWeight_1").change(function () {
            var m_str = $(this).val();
            if (!m_str) {
                $(this).val(pageVariable.handlerReSendSOFrm.saleorder.ExpService.Weight);
            }
            else {
                pageVariable.handlerReSendSOFrm.saleorder.ExpService.Weight = $(this).val();
            }

            pageVariable.sellstsolution_1Ctrl.setLstSolution(null);
            $("#txtExpCost_1").val("0.00");
        });
        $("#txtLength_1, #txtWidth_1, #txtHeight_1").change(function () {
            pageVariable.sellstsolution_1Ctrl.setLstSolution(null);
            $("#txtExpCost_1").val("0.00");
        });

        pageVariable.customsinfo_1List = new uicontrol.tableList("customsinfo_1List",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 45,
                                        keyColumn: "SO_Custom_Id",
                                        columns: [{ display: mlm.C1307, name: "CustomProdName", width: 200, align: 'left' },
                                                { display: mlm.C1307, name: "CustomProdName_CN", width: 200, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 50, align: 'right' },
                                                { display: mlm.C1310, name: "CustomValue", width: 70, align: 'right', adjust: true, createCell: createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 110, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 90, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 70, align: 'left' },
                                                { display: mlm.C0019, name: "", width: 75, align: 'center', adjust: true, createCell: createSOCustom_1OperaCell}]
                                    });
    }

    var m_saleorder = new sm.saleorder();
    m_saleorder.SaleOrder_Id = key;
    m_saleorder.readSaleOrder(function (retObj) {

        var m_lstsolution = new lstm.lstsolution();
        m_lstsolution.LstSolution_Id = retObj.ExpService.LstSolution_Id;
        m_lstsolution.GlobalArea_Id = retObj.ExpService.GlobalArea_Id;
        m_lstsolution.readLstSolutionItem(function (lstsolution) {

            $("#lbCustomer_1").text(retObj.OtherProps.CustName);

            var m_lbrvadCtrl = $("#lbRvAddress_1");
            m_lbrvadCtrl.text(retObj.OtherProps.GlobalAreaName + ", " + retObj.ExpService.RvProvince + ", " + retObj.ExpService.RvCity + " ...");
            m_lbrvadCtrl.attr("tag", retObj.ExpService.RvFullName + ",<br>" + retObj.ExpService.RvAddress_1 + " " + retObj.ExpService.RvAddress_2 + ",<br>" + retObj.ExpService.RvCity + ",<br>" + retObj.ExpService.RvProvince + " " + retObj.ExpService.RvPostCode + ",<br>" + retObj.OtherProps.GlobalAreaName);
            if (Number(retObj.OtherProps.RvAddressCount) > 1) {
                $("#btChangeAddress_1").show();
            }
            else {
                $("#btChangeAddress_1").hide();
            }

            $("#lbECCurr_1").text(retObj.OtherProps.CurrCode);
            $("#lbExpWUnit_1").text(retObj.OtherProps.WUnit);
            $("#txtExpWeight_1").val(Number(retObj.ExpService.Weight).toFixed(3));
            $("#txtLength_1").val(retObj.ExpService.Length);
            $("#txtWidth_1").val(retObj.ExpService.Width);
            $("#txtHeight_1").val(retObj.ExpService.Height);
            pageVariable.sellstsolution_1Ctrl.setLstSolution({ LstSolution_Id: retObj.ExpService.LstSolution_Id, LstSolutionName: retObj.ExpService.LstSolutionName });
            $("#txtExpCost_1").val(Number(retObj.ExpService.ExpServiceCost).toFixed(2));

            var m_now = new Date();
            m_now.setDate(m_now.getDate() + 2);
            var m_year = m_now.getFullYear();
            var m_month = Number(m_now.getMonth()) + 1;
            $("#txtEstimatedShipTime_1").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

            $("#txtEstimatedShipTime_1").attr("maxavaitime", lstsolution.MaxAvaiTime);
            m_now.setDate(m_now.getDate() + Number(lstsolution.MaxAvaiTime));
            var m_month = Number(m_now.getMonth()) + 1;
            $("#txtEstimatedArriveTime_1").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());

            $.each(retObj.ExpService.Customs, function () {
                if (this.OtherProps.GlobalAreaName) {
                    this.GlobalAreaName = this.OtherProps.GlobalAreaName;
                }
                else {
                    this.GlobalAreaName = "";
                }
            });

            pageVariable.customsinfo_1List.bindDataSource(retObj.ExpService.Customs);

            var m_warehouse = {};
            m_warehouse.Warehouse_Id = retObj.ExpService.Warehouse_Id;
            m_warehouse.WarehouseName = retObj.ExpService.OtherProps.WarehouseName;
            m_warehouse.AreaIndexs = retObj.ExpService.OtherProps.WH_AreaIndexs;
            m_warehouse.GlobalArea_Id = retObj.ExpService.OtherProps.WH_GlobalArea_Id;
            pageVariable.selectWH.setWarehouse(m_warehouse);

            if (retObj.ExpService.OtherProps.WH_AreaIndexs.indexOf("#" + retObj.ExpService.GlobalArea_Id + "#") > -1) {
                $("#dvRSWH").addClass("last-item");
                var m_dvCustom = $("#dvRSCustom");
                m_dvCustom.removeClass("last-item");
                m_dvCustom.hide();
            }
            else {
                $("#dvRSWH").removeClass("last-item");
                var m_dvCustom = $("#dvRSCustom");
                m_dvCustom.addClass("last-item");
                m_dvCustom.show();
            }

            pageVariable.handlerReSendSOFrm.so_custom_key = 0;
            pageVariable.handlerReSendSOFrm.saleorder_id = key;
            pageVariable.handlerReSendSOFrm.saleorder = retObj;
            pageVariable.handlerReSendSOFrm.show();

        });
    });

    if (pageVariable.handlerRvAddressFrm) {
        pageVariable.handlerRvAddressFrm.RvAddresses = null;
    }
}
/* 重新发货 */
function resendSO() {
    var m_saleorder = new sm.saleorder();
    m_saleorder.SaleOrder_Id = pageVariable.handlerReSendSOFrm.saleorder_id;

    m_saleorder.ExpService = {};
    m_saleorder.ExpService = $.extend(m_saleorder.ExpService, pageVariable.handlerReSendSOFrm.saleorder.ExpService);
    m_saleorder.ExpService.Weight = $("#txtExpWeight_1").val();
    m_saleorder.ExpService.Length = $("#txtLength_1").val();
    m_saleorder.ExpService.Width = $("#txtWidth_1").val();
    m_saleorder.ExpService.Height = $("#txtHeight_1").val();
    m_saleorder.ExpService.LstSolution_Id = pageVariable.sellstsolution_1Ctrl.LstSolution_Id;
    m_saleorder.ExpService.ExpServiceCost = $("#txtExpCost_1").val();
    m_saleorder.ExpService.EstimatedShipTime = datastruct.convertion.convertToDateStr($("#txtEstimatedShipTime_1").val());
    m_saleorder.ExpService.EstimatedArriveTime = datastruct.convertion.convertToDateStr($("#txtEstimatedArriveTime_1").val());
    m_saleorder.ExpService.Warehouse_Id = pageVariable.selectWH.warehouse_id;

    m_saleorder.ExpService.Customs = [];
    $.each(pageVariable.customsinfo_1List.dataSource.items.arrValues, function () {
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

        m_saleorder.ExpService.Customs.push(m_custom);
    });

    m_saleorder.resendSaleOrder(function (retTable) {

        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.saleorderList.modifyData(m_jsonobj.SaleOrder_Id, m_jsonobj);

        //loadSaleOrderStat();

        pageVariable.handlerReSendSOFrm.close();
    });
}

/* 打开关闭订单的窗体 */
function openCloseSO(key) {
    if (!pageVariable.handlerCloseSOFrm) {
        pageVariable.handlerCloseSOFrm = new uicontrol.dialog("handlerCloseSOFrm", mlm.C1557 + mlm.C1505, { width: 800 }, closeSO);
    }

    var m_saleorder = pageVariable.saleorderList.getItem(key);

    $("#lbCloseSOSymbol").text(mlm.C1558 + "(" + m_saleorder.SOCode + ")");
    $("#txtCloseRemark").val("");

    pageVariable.handlerCloseSOFrm.saleorder_id = key;
    pageVariable.handlerCloseSOFrm.show()
}
/* 关闭订单 */
function closeSO() {
    var m_saleorder = new sm.saleorder();
    m_saleorder.SaleOrder_Id = pageVariable.handlerCloseSOFrm.saleorder_id;
    m_saleorder.Remark = $.trim($("#txtCloseRemark").val());
    if (!m_saleorder.Remark) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0073 + mlm.C0713);
        return;
    }
    m_saleorder.closeSaleOrder(function (retTable) {

        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.saleorderList.modifyData(m_jsonobj.SaleOrder_Id, m_jsonobj);

        //loadSaleOrderStat();

        pageVariable.handlerCloseSOFrm.close();
    });
}

/* 打开切换地址的窗体 */
function openChangeRvAddressFrm() {

    if (!pageVariable.handlerSOFrm.SaleOrder.Customer_Id || pageVariable.handlerSOFrm.SaleOrder.Customer_Id == "0") {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1244);
        return;
    }

    if (!pageVariable.handlerRvAddressFrm) {
        pageVariable.handlerRvAddressFrm = new uicontrol.dialog("handlerRvAddressFrm", mlm.C1436, { width: 1100, position: ["auto", 35] }, setRvAddress);

        pageVariable.handlerRvAddressFrm.show();
        pageVariable.rvaddressList = new uicontrol.tableList("rvaddressList",
                                     { autoSeq: true,
                                         selectModel: "1",
                                         keyColumn: "RvKey",
                                         height: 150,
                                         columns: [{ display: mlm.C1457, name: "RvFullName", width: 150, align: 'left', adjust: true, createCell: constructRvCell },
                                                   { display: mlm.C0240, name: "RvCountry", width: 90, align: 'left' },
                                                   { display: mlm.C1227, name: "RvProvince", width: 90, align: 'left', adjust: true, createCell: constructRvCell },
                                                   { display: mlm.C0460, name: "RvCity", width: 100, align: 'left', adjust: true, createCell: constructRvCell },
                                                   { display: mlm.C1229, name: "RvAddress", width: 250, align: 'left', adjust: true, createCell: constructRvCell },
                                                   { display: mlm.C1228, name: "RvPostCode", width: 90, align: 'left' },
                                                   { display: mlm.C0311, name: "RvTel", width: 90, align: 'left'}]
                                     });
    }
    else {
        pageVariable.handlerRvAddressFrm.show();
    }

    var m_selectedrv = new datastruct.dictionary();
    m_selectedrv.setItem(pageVariable.handlerSOFrm.SaleOrder.ExpService.RvFullName + pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_1 + " " + pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_2, null);

    if (!pageVariable.handlerSOFrm.RvAddresses) {
        var m_customer = new cm.customer();
        m_customer.Customer_Id = pageVariable.handlerSOFrm.SaleOrder.Customer_Id;
        m_customer.readCustomer(function (retObj) {

            pageVariable.handlerSOFrm.RvAddresses = retObj.RvAddresses;

            $.each(retObj.RvAddresses, function () {
                this.RvCountry = this.OtherProps.GlobalAreaName;
                this.RvAddress = this.RvAddress_1 + " " + this.RvAddress_2;

                this.RvKey = this.RvFullName + this.RvAddress;
            });

            pageVariable.rvaddressList.bindDataSource(retObj.RvAddresses);

            pageVariable.rvaddressList.setSelectedItems(m_selectedrv);
        });
    }
    else {
        var m_rvaddressDict = new datastruct.dictionary();
        pageVariable.rvaddressList.bindDataSource(pageVariable.handlerSOFrm.RvAddresses);
        pageVariable.rvaddressList.setSelectedItems(m_selectedrv);
    }

    pageVariable.handlerRvAddressFrm.Action = "HandlerSO";
}
/* 打开切换地址的窗体(重新发货) */
function openChangeRvAddressForRSFrm() {

    if (!pageVariable.handlerRvAddressFrm) {
        pageVariable.handlerRvAddressFrm = new uicontrol.dialog("handlerRvAddressFrm", mlm.C1436, { width: 1100, position: ["auto", 35] }, setRvAddress);

        pageVariable.handlerRvAddressFrm.show();
        pageVariable.rvaddressList = new uicontrol.tableList("rvaddressList",
                                     { autoSeq: true,
                                         selectModel: "1",
                                         keyColumn: "RvKey",
                                         height: 150,
                                         columns: [{ display: mlm.C1457, name: "RvFullName", width: 150, align: 'left', adjust: true, createCell: constructRvCell },
                                                   { display: mlm.C0240, name: "RvCountry", width: 90, align: 'left' },
                                                   { display: mlm.C1227, name: "RvProvince", width: 90, align: 'left', adjust: true, createCell: constructRvCell },
                                                   { display: mlm.C0460, name: "RvCity", width: 100, align: 'left', adjust: true, createCell: constructRvCell },
                                                   { display: mlm.C1229, name: "RvAddress", width: 250, align: 'left', adjust: true, createCell: constructRvCell },
                                                   { display: mlm.C1228, name: "RvPostCode", width: 90, align: 'left' },
                                                   { display: mlm.C0311, name: "RvTel", width: 90, align: 'left'}]
                                     });
    }
    else {
        pageVariable.handlerRvAddressFrm.show();
    }

    var m_selectedrv = new datastruct.dictionary();
    m_selectedrv.setItem(pageVariable.handlerReSendSOFrm.saleorder.ExpService.RvFullName + pageVariable.handlerReSendSOFrm.saleorder.ExpService.RvAddress_1 + " " + pageVariable.handlerReSendSOFrm.saleorder.ExpService.RvAddress_2, null);

    if (!pageVariable.handlerRvAddressFrm.RvAddresses) {
        var m_customer = new cm.customer();
        m_customer.Customer_Id = pageVariable.handlerReSendSOFrm.saleorder.Customer_Id;
        m_customer.readCustomer(function (retObj) {

            pageVariable.handlerReSendSOFrm.RvAddresses = retObj.RvAddresses;

            $.each(retObj.RvAddresses, function () {
                this.RvCountry = this.OtherProps.GlobalAreaName;
                this.RvAddress = this.RvAddress_1 + " " + this.RvAddress_2;

                this.RvKey = this.RvFullName + this.RvAddress;
            });

            pageVariable.rvaddressList.bindDataSource(retObj.RvAddresses);

            pageVariable.rvaddressList.setSelectedItems(m_selectedrv);
        });
    }
    else {
        var m_rvaddressDict = new datastruct.dictionary();
        pageVariable.rvaddressList.bindDataSource(pageVariable.handlerReSendSOFrm.RvAddresses);
        pageVariable.rvaddressList.setSelectedItems(m_selectedrv);
    }

    pageVariable.handlerRvAddressFrm.Action = "ReSendSO";
}
/*  */
function constructRvCell(key, cellValue) {
    return commoncore.func.showSpecialChar(cellValue);
}
/* 设置收货地址 */
function setRvAddress() {

    if (pageVariable.handlerRvAddressFrm.Action == "HandlerSO") {
        var m_rvaddress = pageVariable.rvaddressList.getSelectedItems();
        if (!m_rvaddress || m_rvaddress.length == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1458);
            return;
        }

        if (pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_1 == m_rvaddress.RvAddress_1 &&
            pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_2 == m_rvaddress.RvAddress_2) {

            pageVariable.handlerRvAddressFrm.close();
        }
        else {
            initRvInfo();

            pageVariable.handlerSOFrm.SaleOrder.ExpService.RvFullName = m_rvaddress.RvFullName;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.RvTel = m_rvaddress.RvTel;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.GlobalArea_Id = m_rvaddress.GlobalArea_Id;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.RvCountry = m_rvaddress.OtherProps.GlobalAreaName;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.RvProvince = m_rvaddress.RvProvince;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.RvCity = m_rvaddress.RvCity;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.RvPostCode = m_rvaddress.RvPostCode;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_1 = m_rvaddress.RvAddress_1;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_2 = m_rvaddress.RvAddress_2;

            $("#lbRvAddress").text(commoncore.func.showSpecialChar(m_rvaddress.OtherProps.GlobalAreaName + ", " + m_rvaddress.RvProvince + " ..."));

            m_rvaddress.GlobalAreaName = m_rvaddress.OtherProps.GlobalAreaName;
            $("#lbRvAddress").attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(m_rvaddress)));
            if (Number(pageVariable.handlerSOFrm.SaleOrder.OtherProps.RvAddressCount) > 1) {
                $("#btChangeAddress").show();
            }
            else {
                $("#btChangeAddress").hide();
            }

            pageVariable.handlerRvAddressFrm.close();
        }
    }
    else {
        var m_rvaddress = pageVariable.rvaddressList.getSelectedItems();

        var m_expservice = pageVariable.handlerReSendSOFrm.saleorder.ExpService;

        if (m_expservice.RvAddress_1 == m_rvaddress.RvAddress_1 && m_expservice.RvAddress_2 == m_rvaddress.RvAddress_2) {

            pageVariable.handlerRvAddressFrm.close();
        }
        else {
            m_expservice.RvFullName = m_rvaddress.RvFullName;
            m_expservice.RvTel = m_rvaddress.RvTel;
            m_expservice.GlobalArea_Id = m_rvaddress.GlobalArea_Id;
            m_expservice.RvCountry = m_rvaddress.OtherProps.GlobalAreaName;
            m_expservice.RvProvince = m_rvaddress.RvProvince;
            m_expservice.RvCity = m_rvaddress.RvCity;
            m_expservice.RvPostCode = m_rvaddress.RvPostCode;
            m_expservice.RvAddress_1 = m_rvaddress.RvAddress_1;
            m_expservice.RvAddress_2 = m_rvaddress.RvAddress_2;

            $("#lbRvAddress_1").text(m_rvaddress.OtherProps.GlobalAreaName + ", " + m_rvaddress.RvProvince + ", " + m_rvaddress.RvCity + " ...");
            $("#lbRvAddress_1").attr("tag", m_rvaddress.RvFullName + ",<br>" + m_rvaddress.RvAddress_1 + " " + m_rvaddress.RvAddress_2 + ",<br>" + m_rvaddress.RvCity + ",<br>" + m_rvaddress.RvProvince + " " + m_rvaddress.RvPostCode + ",<br>" + m_rvaddress.OtherProps.GlobalAreaName);

            var m_areaindex = pageVariable.selectWH.warehouse.AreaIndexs;
            if (m_areaindex.indexOf("#" + m_expservice.GlobalArea_Id + "#") > -1) {
                $("#dvRSWH").addClass("last-item");
                var m_dvCustom = $("#dvRSCustom");
                m_dvCustom.removeClass("last-item");
                m_dvCustom.hide();
            }
            else {
                $("#dvRSWH").removeClass("last-item");
                var m_dvCustom = $("#dvRSCustom");
                m_dvCustom.addClass("last-item");
                m_dvCustom.show();
            }

            pageVariable.sellstsolution_1Ctrl.setLstSolution(null);
            $("#txtExpCost_1").val("0.00");
           
            pageVariable.handlerRvAddressFrm.close();
        }
    }
}

/* 构建报关价值列 */
function createCustomValueCell(key, cellValue) {
    return commoncore.func.getCurrHtml(keycontext.keyparam.tax_syscurrsymbol, cellValue);
}
/* 构建报关操作列 */
function createSOCustomOperaCell(key, cellValue) {
    var m_htmls = [];

    m_htmls.push("<a href='javascript:void(\"0\")' class='bt-link' style='margin: 0px 5px 0px 0px' tag='" + key + "' onclick='openModifyCustomFrm.call(this);'>" + mlm.C0061 + "</a>");
    m_htmls.push("<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDeleteCustomFrm.call(this);'>" + mlm.C0062 + "</a>");

    return m_htmls.join("");
} 
function createSOCustom_1OperaCell(key, cellValue) {
    var m_htmls = [];

    m_htmls.push("<a href='javascript:void(\"0\")' class='bt-link' style='margin: 0px 5px 0px 0px' actiontype='resend' tag='" + key + "' onclick='openModifyCustomFrm.call(this);'>" + mlm.C0061 + "</a>");
    m_htmls.push("<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' actiontype='resend' onclick='openDeleteCustomFrm.call(this);'>" + mlm.C0062 + "</a>");

    return m_htmls.join("");
}
/* 打开新增报关信息窗体 */
function openNewCustomFrm() {
    var m_type = $(this).attr("actiontype");

    if (m_type != "resend") {
        if (pageVariable.handlerSOFrm.SaleOrder.Products.length == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1527);
            return;
        }
    }

    if (!pageVariable.handlerCustomFrm) {
        pageVariable.handlerCustomFrm = new uicontrol.dialog("handlerCustomFrm", mlm.C0530 + mlm.C1307, { width: 800, position: ["auto", 45] }, saveCustom);

        pageVariable.selFactoryCountry = new bizcontrol.selectglobalarea("selFactoryCountry", true, "country");
    }

    $("#txtCustomProdName").val("");
    $("#txtCustomValue").val("0.00");
    $("#txtCustomQty").val("0");
    $("#txtCustomCode").val("");
    $("#txtCustomMaterial").val("");
    pageVariable.selFactoryCountry.clear();

    pageVariable.handlerCustomFrm.type = m_type;
    pageVariable.handlerCustomFrm.action = "New";
    pageVariable.handlerCustomFrm.show();
}
/* 打开修改报关信息窗体 */
function openModifyCustomFrm() {
    if (!pageVariable.handlerCustomFrm) {
        pageVariable.handlerCustomFrm = new uicontrol.dialog("handlerCustomFrm", mlm.C0061 + mlm.C1307, { width: 800, position: ["auto", 45] }, saveCustom);

        pageVariable.selFactoryCountry = new bizcontrol.selectglobalarea("selFactoryCountry", true, "country");
    }

    pageVariable.handlerCustomFrm.so_custom_id = $(this).attr("tag");

    var m_type = $(this).attr("actiontype");

    var m_obj = null;
    if (m_type == "resend") {
        m_obj = pageVariable.customsinfo_1List.getItem(pageVariable.handlerCustomFrm.so_custom_id);
    }
    else {
        m_obj = pageVariable.customsinfoList.getItem(pageVariable.handlerCustomFrm.so_custom_id);
    }

    $("#txtCustomProdName").val(m_obj.CustomProdName);
    $("#txtCustomProdName_CN").val(m_obj.CustomProdName_CN);
    $("#txtCustomValue").val(Number(m_obj.CustomValue).toFixed(2));
    $("#txtCustomCode").val(m_obj.CustomCode);
    $("#txtCustomMaterial").val(m_obj.CustomMaterial);
    $("#txtCustomQty").val(m_obj.CustomQty);
    pageVariable.selFactoryCountry.setObj({ globalArea_Ids: m_obj.GlobalArea_Id, globalAreaNames: m_obj.GlobalAreaName });

    pageVariable.handlerCustomFrm.type = m_type;
    pageVariable.handlerCustomFrm.action = "Modify";
    pageVariable.handlerCustomFrm.show();
}
/* 打开删除报关商品的窗体 */
function openDeleteCustomFrm() {
    if (!pageVariable.delelteCustomFrm) {
        pageVariable.delelteCustomFrm = new uicontrol.confirmDelete(deleteCustom);
    }

    pageVariable.delelteCustomFrm.so_custom_id = $(this).attr("tag");
    var m_type = $(this).attr("actiontype");

    var m_obj = null;
    if (m_type == "resend") {
        m_obj = pageVariable.customsinfo_1List.getItem(pageVariable.delelteCustomFrm.so_custom_id);
    }
    else {
        m_obj = pageVariable.customsinfoList.getItem(pageVariable.delelteCustomFrm.so_custom_id);
    }

    pageVariable.delelteCustomFrm.type = m_type;
    pageVariable.delelteCustomFrm.showConfirm(mlm.C0464 + mlm.C1307 + "(" + m_obj.CustomProdName + ") ?");
}
/* 保存报关信息 */
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

    var m_so_custom = null;
    if (pageVariable.handlerCustomFrm.action == "New") {
        m_so_custom = {};
    }
    else {
        if (pageVariable.handlerCustomFrm.type == "resend") {
            m_so_custom = pageVariable.customsinfo_1List.getItem(pageVariable.handlerCustomFrm.so_custom_id);
        }
        else {
            m_so_custom = pageVariable.customsinfoList.getItem(pageVariable.handlerCustomFrm.so_custom_id);
        }
    }

    m_so_custom.CustomProdName = m_customprodname;
    m_so_custom.CustomProdName_CN = $.trim($("#txtCustomProdName_CN").val()); ;
    m_so_custom.CustomCode = $.trim($("#txtCustomCode").val());
    m_so_custom.CustomMaterial = $.trim($("#txtCustomMaterial").val());
    m_so_custom.CustomQty = m_customqty;
    m_so_custom.CustomValue = m_customvalue;

    var m_countryObj = pageVariable.selFactoryCountry.getObj();
    if (m_countryObj) {
        m_so_custom.FactoryCountry = m_countryObj.globalArea_Ids ? m_countryObj.globalArea_Ids : 0;
        m_so_custom.GlobalAreaName = m_countryObj.globalAreaNames ? m_countryObj.globalAreaNames : "";
    }
    else {
        m_so_custom.FactoryCountry = 0;
        m_so_custom.GlobalAreaName = "";
    }

    if (pageVariable.handlerCustomFrm.type == "resend") {
        if (pageVariable.handlerCustomFrm.action == "New") {
            m_so_custom.SO_Custom_Id = pageVariable.handlerReSendSOFrm.so_custom_key;
            m_so_custom.Product_Id = 0;
            pageVariable.customsinfo_1List.addData(m_so_custom.SO_Custom_Id, m_so_custom);
            pageVariable.handlerReSendSOFrm.so_custom_key++;
        }
        else {
            pageVariable.customsinfo_1List.modifyData(m_so_custom.SO_Custom_Id, m_so_custom);
        }

        pageVariable.sellstsolution_1Ctrl.setLstSolution(null);
        $("#txtExpCost_1").val("0.00");
    }
    else {
        if (pageVariable.handlerCustomFrm.action == "New") {
            m_so_custom.SO_Custom_Id = pageVariable.handlerSOFrm.so_custom_key;
            m_so_custom.Product_Id = 0;
            pageVariable.handlerSOFrm.SaleOrder.ExpService.Customs.push(m_so_custom);
            pageVariable.customsinfoList.addData(m_so_custom.SO_Custom_Id, m_so_custom);
            pageVariable.handlerSOFrm.so_custom_key++;
        }
        else {
            pageVariable.customsinfoList.modifyData(m_so_custom.SO_Custom_Id, m_so_custom);
        }

        initLstSolution();
    }

    pageVariable.handlerCustomFrm.close();
}
/* 删除报关商品 */
function deleteCustom() {
    if (pageVariable.delelteCustomFrm.type == "resend") {
        pageVariable.customsinfo_1List.deleteData(pageVariable.delelteCustomFrm.so_custom_id);

        pageVariable.sellstsolution_1Ctrl.setLstSolution(null);
        $("#txtExpCost_1").val("0.00");
    }
    else {
        pageVariable.customsinfoList.deleteData(pageVariable.delelteCustomFrm.so_custom_id);
        pageVariable.handlerSOFrm.SaleOrder.ExpService.Customs = pageVariable.customsinfoList.dataSource.items.arrValues;

        initLstSolution();
    }

    pageVariable.delelteCustomFrm.close();
}

/* 加载销售平台 */
function loadSaleSites(saleSiteCtrl, isnotnull, event) {

    if (!pageVariable.shoppingSiteAreas) {

        var m_saleplatform = new sm.saleplatform();
        m_saleplatform.queryAvaiSaleSites(function (tableSource) {

            pageVariable.shoppingSiteAreas = datastruct.convertion.tableToJson(tableSource);

            pageVariable.SaleSiteDict = new datastruct.dictionary();

            saleSiteCtrl.empty();

            if (!isnotnull) {
                saleSiteCtrl.append("<option></option>");
            }
            $.each(pageVariable.shoppingSiteAreas, function () {
                saleSiteCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");

                pageVariable.SaleSiteDict.setItem(this.SaleSite_Id, this);
            });

            if (event) {
                event();
            }
        });
    }
    else {
        saleSiteCtrl.empty();

        if (!isnotnull) {
            saleSiteCtrl.append("<option></option>");
        }
        $.each(pageVariable.shoppingSiteAreas, function () {
            saleSiteCtrl.append("<option value='" + this.SaleSite_Id + "' tag='" + this.SalePlatform_Id + "' Currency='" + this.SysCurrency_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
        });

        if (event) {
            event();
        }
    }
}
/* 加载货币 */
function loadCurrencies(event) {

    var m_currencyCtrl = $("#ddlSOCurr");
    var syscurrency = new othm.syscurrency();
    syscurrency.getAllSysCurrencys(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            m_currencyCtrl.append("<option value='" + this.SysCurrency_Id + "' tag='" + this.CurrSymbol + "' code='" + this.CurrCode + "'>" + this.CurrName + "</option>");
        });
        
        if (event) {
            event();
        }
    });
}

/* 初始化收货地址以及快递数据 */
function initRvInfo() {
    pageVariable.handlerSOFrm.SaleOrder.ExpService.RvFullName = "";
    pageVariable.handlerSOFrm.SaleOrder.ExpService.RvTel = "";
    pageVariable.handlerSOFrm.SaleOrder.ExpService.GlobalArea_Id = 0;
    pageVariable.handlerSOFrm.SaleOrder.ExpService.RvProvince = "";
    pageVariable.handlerSOFrm.SaleOrder.ExpService.RvCity = "";
    pageVariable.handlerSOFrm.SaleOrder.ExpService.RvPostCode = "";
    pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_1 = "";
    pageVariable.handlerSOFrm.SaleOrder.ExpService.RvAddress_2 = "";

    $("#lbRvAddress").text("");
    $("#lbRvAddress").attr("tag", "");
    $("#btChangeAddress").hide();

    initLstSolution();
}
/* 初始化销售平台 */
function initShopsite() {
    var m_salesite_id = $("#ddlSOFrom").val();
    var m_salesite = pageVariable.SaleSiteDict.getItem(m_salesite_id);

    pageVariable.handlerSOFrm.SaleOrder.SaleSite_Id = m_salesite_id;
    pageVariable.handlerSOFrm.SaleOrder.SalePlatform_Id = m_salesite.SalePlatform_Id;
    pageVariable.handlerSOFrm.SaleOrder.SysWeightUnit_Id = m_salesite.SysWeightUnit_Id;
    pageVariable.handlerSOFrm.SaleOrder.WUnit = m_salesite.WUnit;
    pageVariable.handlerSOFrm.SaleOrder.SysCurrency_Id = m_salesite.SysCurrency_Id;
    pageVariable.handlerSOFrm.SaleOrder.CurrSymbol = m_salesite.CurrSymbol;
    pageVariable.handlerSOFrm.SaleOrder.CurrCode = m_salesite.CurrCode;

    pageVariable.handlerSOFrm.SaleOrder.Products = [];

    saleplatform.currObj = {};
    saleplatform.currObj.SysCurrency_Id = m_salesite.SysCurrency_Id;
    saleplatform.currObj.CurrCode = m_salesite.CurrCode;
    saleplatform.currObj.WUnit = m_salesite.WUnit;

    $("#txtExpWeight").val("0.00");
    $("#lbExpWUnit").text(m_salesite.WUnit);
    $("#txtLength, #txtWidth, #txtHeight").val(10);
    pageVariable.selexpserviceCtrl.setExpService(null);
    pageVariable.sellstsolutionCtrl.setLstSolution(null);
    $("#txtExpPrice, #txtExpCost").val("0.00");
    $("#txtEstimatedArriveTime").val("");

    pageVariable.soproductList.bindDataSource(null);
    if (pageVariable.customsinfoList) {
        pageVariable.customsinfoList.bindDataSource(null);
    }

    $("#ddlSOCurr").val(m_salesite.SysCurrency_Id);
    $("#lbEPCurr, #lbECCurr").text(m_salesite.CurrCode);
    $("#lbTotalPrice_1, #lbTotalCost, #lbTotalProfit, #lbProdPrice, #lbSOExpPrice, #lbProdCost, #lbSOExpCost, #lbSOOtherCost").html(commoncore.func.getCurrHtml(m_salesite.CurrSymbol, 0));
    $("#dvSORate").hide();
    var m_socurrrateCtrl = $("#txtSOCurrRate");
    m_socurrrateCtrl.val("1.00");
    m_socurrrateCtrl.attr("last_rate", null);
    pageVariable.handlerSOFrm.so_rate = 1;
}
/* 初始化订单货币 */
function initSOCurr() {

    var m_currencyCtrl = $("#ddlSOCurr");
    var m_selectcurr = m_currencyCtrl.find("option:selected");
    pageVariable.handlerSOFrm.SaleOrder.SysCurrency_Id = m_currencyCtrl.val();
    pageVariable.handlerSOFrm.SaleOrder.CurrSymbol = m_selectcurr.attr("tag");
    pageVariable.handlerSOFrm.SaleOrder.CurrCode = m_selectcurr.attr("code");

    var m_socurrrateCtrl = $("#txtSOCurrRate");
    getCurrRage(saleplatform.currObj.SysCurrency_Id, pageVariable.handlerSOFrm.SaleOrder.SysCurrency_Id, function (rate) {
        m_socurrrateCtrl.val(rate);
        m_socurrrateCtrl.trigger("change");
    });
    getCurrRage(keycontext.keyparam.SysWeightUnit_Id, pageVariable.handlerSOFrm.SaleOrder.SysCurrency_Id, function (rate) {
        pageVariable.handlerSOFrm.SaleOrder.DefaultCurrRate = rate;
    });
    $("#lbEPCurr, #lbECCurr").text(pageVariable.handlerSOFrm.SaleOrder.CurrCode);

    if (saleplatform.currObj.SysCurrency_Id == pageVariable.handlerSOFrm.SaleOrder.SysCurrency_Id) {
        $("#dvSORate").hide();
    }
    else {
        $("#dvSORate").show();
    }

}
/* 初始化订单汇率 */
function initSOCurrRate() {

    var m_last_rate = Number($("#txtSOCurrRate").attr("last_rate"));
    if (m_last_rate == pageVariable.handlerSOFrm.so_rate) {
        return;
    }

    $.each(pageVariable.handlerSOFrm.SaleOrder.Products, function () {
        this.ListPrice = (Number(this.ListPrice) / m_last_rate) * pageVariable.handlerSOFrm.so_rate;
        this.SalePrice = (Number(this.SalePrice) / m_last_rate) * pageVariable.handlerSOFrm.so_rate;

        $.each(this.GProducts, function () {
            this.Cost = (Number(this.Cost) / m_last_rate) * pageVariable.handlerSOFrm.so_rate;
        });
        $.each(this.GiftItems, function () {
            this.Cost = (Number(this.Cost) / m_last_rate) * pageVariable.handlerSOFrm.so_rate;
        });
    });

    pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServicePrice = (Number(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServicePrice) / m_last_rate) * pageVariable.handlerSOFrm.so_rate;
    pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost = (Number(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost) / m_last_rate) * pageVariable.handlerSOFrm.so_rate;

    pageVariable.soproductList.bindDataSource(pageVariable.handlerSOFrm.SaleOrder.Products);
    $("#txtExpPrice").val(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServicePrice.toFixed(2));
    $("#txtExpCost").val(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost.toFixed(2));
}
/* 初始化物流方案 */
function initLstSolution() {
    pageVariable.handlerSOFrm.SaleOrder.ExpService.LstSolution_Id = 0;
    pageVariable.handlerSOFrm.SaleOrder.ExpService.LstCompanyName = "";
    pageVariable.handlerSOFrm.SaleOrder.ExpService.LstSolutionName = "";
    pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost = 0;
    pageVariable.sellstsolutionCtrl.setLstSolution(null);
    $("#txtExpCost").val("0.00");
}
/* 初始化发货时间 */
function initEstimatedTime() {
    if (pageVariable.selexpserviceCtrl.ExpressService) {
        var m_now = new Date($("#txtEstimatedShipTime").val());
        m_now.setDate(m_now.getDate() + Number(pageVariable.selexpserviceCtrl.ExpressService.MaxDeliveryTime));
        var m_year = m_now.getFullYear();
        var m_month = Number(m_now.getMonth()) + 1;
        $("#txtEstimatedArriveTime").datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());
    }
}
/* 初始化报关商品 */
function initSOCustom() {

    var m_customDict = new datastruct.dictionary();
    $.each(pageVariable.handlerSOFrm.SaleOrder.Products, function () {
        $.each(this.GProducts, function () {
            if (this.__Custom) {
                var m_so_custom = {};
                m_so_custom.CustomProdName = this.__Custom.CustomProdName;
                m_so_custom.CustomProdName_CN = this.__Custom.CustomProdName_CN;
                m_so_custom.Product_Id = this.__Custom.Product_Id;
                m_so_custom.CustomValue = this.__Custom.CustomValue;
                m_so_custom.CustomQty = this.__Custom.CustomQty;
                m_so_custom.CustomCode = this.__Custom.CustomCode;
                m_so_custom.CustomMaterial = this.__Custom.CustomMaterial;
                m_so_custom.FactoryCountry = this.__Custom.FactoryCountry;
                m_so_custom.GlobalAreaName = this.__Custom.GlobalAreaName;

                var m_key = m_so_custom.CustomProdName;
                var _customobj = m_customDict.getItem(m_key);
                if (_customobj) {
                    _customobj.CustomQty = Number(_customobj.CustomQty) + Number(m_so_custom.CustomQty);
                    _customobj.CustomValue = Number(_customobj.CustomValue) + Number(m_so_custom.CustomValue);
                }
                else {
                    m_so_custom.SO_Custom_Id = pageVariable.handlerSOFrm.so_custom_key;
                    m_customDict.setItem(m_key, m_so_custom);
                    pageVariable.handlerSOFrm.so_custom_key++;
                }
            }
        });

        $.each(this.GiftItems, function () {
            if (this.__Custom) {
                var m_so_custom = {};
                m_so_custom.CustomProdName = this.__Custom.CustomProdName;
                m_so_custom.CustomProdName_CN = this.__Custom.CustomProdName_CN;
                m_so_custom.Product_Id = this.__Custom.Product_Id;
                m_so_custom.CustomValue = this.__Custom.CustomValue;
                m_so_custom.CustomQty = this.__Custom.CustomQty;
                m_so_custom.CustomCode = this.__Custom.CustomCode;
                m_so_custom.CustomMaterial = this.__Custom.CustomMaterial;
                m_so_custom.FactoryCountry = this.__Custom.FactoryCountry;
                m_so_custom.GlobalAreaName = this.__Custom.GlobalAreaName;

                var m_key = m_so_custom.CustomProdName;
                var _customobj = m_customDict.getItem(m_key);
                if (_customobj) {
                    _customobj.CustomQty = Number(_customobj.CustomQty) + Number(m_so_custom.CustomQty);
                    _customobj.CustomValue = Number(_customobj.CustomValue) + Number(m_so_custom.CustomValue);
                }
                else {
                    m_so_custom.SO_Custom_Id = pageVariable.handlerSOFrm.so_custom_key;
                    m_customDict.setItem(m_key, m_so_custom);
                    pageVariable.handlerSOFrm.so_custom_key++;
                }
            }
        });
    });

    if (m_customDict.arrValues.length > 0) {
        $.each(m_customDict.arrValues, function () {
            pageVariable.handlerSOFrm.SaleOrder.ExpService.Customs.push(this);
        });

        if (pageVariable.customsinfoList) {
            pageVariable.customsinfoList.bindDataSource(pageVariable.handlerSOFrm.SaleOrder.ExpService.Customs);
        }
    }
}
/* 填充货币汇率 */
function getCurrRage(syscurrency_id_a, syscurrency_id_b, event) {
    var m_rate = 1;

    if (syscurrency_id_a == syscurrency_id_b) {
        if (event) {
            event(m_rate);
        }
        return;
    }

    if (!pageVariable.currratedict) {
        pageVariable.currratedict = new datastruct.dictionary();
    }

    var m_currkey = syscurrency_id_a + "-" + syscurrency_id_b;
    if (!pageVariable.currratedict.containKey(m_currkey)) {

        var m_syscurrrate = new othm.syscurrrate();
        m_syscurrrate.querySysCurrRate(syscurrency_id_a, function (retTable) {
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            $.each(m_jsonobjs, function () {
                pageVariable.currratedict.setItem(syscurrency_id_a + "-" + this.SysCurrency_Id, this.Rate);
            });

            m_rate = pageVariable.currratedict.getItem(m_currkey);

            if (event) {
                event(m_rate);
            }
        });
    }
    else {
        m_rate = pageVariable.currratedict.getItem(m_currkey);

        if (event) {
            event(m_rate);
        }
    }
}

/* 测算重量 */
function calculateSOWeightAndVolumn() {
    var m_weight = 0;
    var m_boxlength = 0;
    var m_boxwidth = 0;
    var m_boxheight = 0;

    $.each(pageVariable.handlerSOFrm.SaleOrder.Products, function () {
        $.each(this.GProducts, function () {
            m_weight += Number(this.Weight) * Number(this.Qty);
        });

        $.each(this.GiftItems, function () {
            m_weight += Number(this.Weight) * Number(this.Qty);
        });

        m_weight += Number(this.BoxWeight);

        if (Number(this.BoxLength) > m_boxlength) {
            m_boxlength = Number(this.BoxLength);
        }
        if (Number(this.BoxWidth) > m_boxwidth) {
            m_boxwidth = Number(this.BoxWidth);
        }
        m_boxheight += Number(this.BoxHeight) * Number(this.Qty);
    });

    pageVariable.handlerSOFrm.SaleOrder.ExpService.Length = m_boxlength;
    pageVariable.handlerSOFrm.SaleOrder.ExpService.Width = m_boxwidth;
    pageVariable.handlerSOFrm.SaleOrder.ExpService.Height = m_boxheight;
    $("#txtLength").val(m_boxlength);
    $("#txtWidth").val(m_boxwidth);
    $("#txtHeight").val(m_boxheight);

    if (keycontext.keyparam.SysWeightUnit_Id == pageVariable.handlerSOFrm.SaleOrder.SysWeightUnit_Id) {
        $("#txtExpWeight").val(m_weight.toFixed(3));
        pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight = m_weight;
    }
    else {
        var m_weightratekey = keycontext.keyparam.SysWeightUnit_Id + "-" + pageVariable.handlerSOFrm.SaleOrder.SysWeightUnit_Id;

        if (!pageVariable.weightRateDict.containKey(m_weightratekey)) {

            var m_syskeyparam = new spm.syskeyparam();
            m_syskeyparam.SysWeightUnit_Id_1 = keycontext.keyparam.SysWeightUnit_Id;
            m_syskeyparam.SysWeightUnit_Id_2 = pageVariable.handlerSOFrm.SaleOrder.SysWeightUnit_Id;
            m_syskeyparam.getWeightRate(function (weightrate) {
                pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight = Math.round(m_weight * 100 * weightrate) / 100;

                pageVariable.weightRateDict.setItem(m_weightratekey, weightrate);

                $("#txtExpWeight").val(pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight.toFixed(3));
            });
        }
        else {
            pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight = Math.round(m_weight * 100 * weightrate) / 100;
            $("#txtExpWeight").val(pageVariable.handlerSOFrm.SaleOrder.ExpService.Weight.toFixed(3));
        }
    }

    initLstSolution();
}
/* 订单测算 */
function calculateSO() {
    var m_cost = 0;
    var m_price = 0;
    var m_othercost = 0;

    $.each(pageVariable.handlerSOFrm.SaleOrder.Products, function () {
        $.each(this.GProducts, function () {
            m_cost += Number(this.Cost) * Number(this.Qty);
        });

        $.each(this.GiftItems, function () {
            m_cost += Number(this.Cost) * Number(this.Qty);
        });

        m_price += Number(this.SalePrice) * Number(this.Qty);
        m_othercost += Number(this.SalePrice) * Number(this.Qty) * Number(this.TransCost) + Number(this.OtherCost) * Number(this.Qty);
    });

    getCurrRage(pageVariable.handlerSOFrm.SaleOrder.SysCurrency_Id, keycontext.keyparam.syscurrency, function (rate) {

        var m_prodprice = m_price * rate;
        var m_expprice = Number(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServicePrice) * rate;
        var m_prodcost = m_cost * rate;
        var m_expcost = Number(pageVariable.handlerSOFrm.SaleOrder.ExpService.ExpServiceCost) * rate;
        var m_prodothercost = m_othercost * rate;

        $("#lbTotalPrice").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_prodprice + m_expprice));
        $("#lbTotalCost").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_prodcost + m_expcost + m_prodothercost));
        $("#lbTotalProfit").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, (m_prodprice + m_expprice) - (m_prodcost + m_expcost + m_prodothercost)));
        $("#lbProdPrice").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_prodprice));
        $("#lbSOExpPrice").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_expprice));
        $("#lbProdCost").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_prodcost));
        $("#lbSOExpCost").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_expcost));
        $("#lbSOOtherCost").html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_prodothercost));
    });
}

/* 导出待生效的客户订单*/
function exportSubmitSO() {
    var m_saleorder = new sm.saleorder();
    m_saleorder.exportSaleOrderForSubmit(function (paramObj) {
        window.open(paramObj);
    });
}
/*  */
function initImportFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importSO);
        pageVariable.importFile = new uicontrol.file("importFile");

        var m_smtSaleSiteCtrl = $("#ddlSMTSite");
        var m_taobaoSaleSiteCtrl = $("#ddlTaobaoSite");

        var m_saleplatform = new sm.saleplatform();
        m_saleplatform.queryAvaiSaleSites(function (retTable) {
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

            $.each(m_jsonobjs, function () {
                if (this.SalePlatform_Id == "5") {
                    m_smtSaleSiteCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
                }
                else if (this.SalePlatform_Id == "7") {
                    m_taobaoSaleSiteCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
                }
            });
        });
    }
} 
/*  打开导入生效客户订单的窗体 */
function openImportSubmitSO() {

    initImportFrm();

    $("#dvSMTRegion").hide();
    $("#dvTaobaoRegion").hide();

    pageVariable.handlerImportFrm.type = "submitSO";
    pageVariable.handlerImportFrm.setTitle(mlm.C1524);
    pageVariable.handlerImportFrm.show();
}
/*  打开导入SMT订单的窗体 */
function openImportSMTSO() {

    initImportFrm();

    $("#dvSMTRegion").show();
    $("#dvTaobaoRegion").hide();

    pageVariable.handlerImportFrm.type = "importSMTSO";
    pageVariable.handlerImportFrm.setTitle(mlm.C1644);
    pageVariable.handlerImportFrm.show();
}
/*  打开导入淘宝订单的窗体 */
function openImportTaobaoSO() {

    initImportFrm();

    $("#dvSMTRegion").hide();
    $("#dvTaobaoRegion").show();

    pageVariable.handlerImportFrm.type = "importSMTTaobao";
    pageVariable.handlerImportFrm.setTitle(mlm.C1651);
    pageVariable.handlerImportFrm.show();
}
/*  打开回复速卖通消息的窗体 */
function openImportSMTMsg() {

    initImportFrm();

    $("#dvSMTRegion").hide();
    $("#dvTaobaoRegion").hide();

    pageVariable.handlerImportFrm.type = "replysmtmsg";
    pageVariable.handlerImportFrm.setTitle("回复速卖通消息");
    pageVariable.handlerImportFrm.show();
}
/* 导入客户订单 */
function importSO() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    if (pageVariable.handlerImportFrm.type == "submitSO") {
        var m_saleorder = new sm.saleorder();
        m_saleorder.importSubmitSaleOrder(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            loadSaleOrderStat();
            querySaleOrders(1, pageVariable.saleorderList.pageNumber);

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.type == "importSMTSO") {
        var m_saleorder = new sm.saleorder();
        m_saleorder.SalePlatform_Id = 5;
        m_saleorder.SaleSite_Id = $("#ddlSMTSite").val();
        m_saleorder.importSTMSaleOrder(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            loadSaleOrderStat();

            pageVariable.querycondition = {};
            pageVariable.querycondition.SOState = 100;
            querySaleOrders(1, pageVariable.saleorderList.pageNumber);

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.type == "importSMTTaobao") {
        var m_saleorder = new sm.saleorder();
        m_saleorder.SalePlatform_Id = 7;
        m_saleorder.SaleSite_Id = $("#ddlTaobaoSite").val();
        m_saleorder.importTaobaoSaleOrder(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            loadSaleOrderStat();

            pageVariable.querycondition = {};
            pageVariable.querycondition.SOState = 100;
            querySaleOrders(1, pageVariable.saleorderList.pageNumber);

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.type == "replysmtmsg") {
        var m_saleorder = new sm.saleorder();
        m_saleorder.importSMTMessage(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }

            pageVariable.handlerImportFrm.close();
        });
    }
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
/* 查看客户 */
function openViewCustFrm(key) {
    if (!pageVariable.viewCustomerFrm) {
        pageVariable.viewCustomerFrm = new bizcontrol.viewcustomer();
    }
    pageVariable.viewCustomerFrm.show(key);
}
/* 查看配送服务 */
function openViewExpressServiceFrm(key) {
    if (!pageVariable.viewExpServiceFrm) {
        pageVariable.viewExpServiceFrm = new bizcontrol.viewexpressservice();
    }
    pageVariable.viewExpServiceFrm.show(key);
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

/* 同步SMT订单 */
function syncSMTSaleOrder() {
    pageframe.control.processCtrl.showOperaProcess();

    var m_func = function (index, m_jsonobjs) {

        var item = m_jsonobjs[index];
        if (item) {
            var m_saleorder_item = new sm.saleorder();

            m_saleorder_item.SOCode = item.SOCode;
            m_saleorder_item.Action = item.Action;
            m_saleorder_item.SaleSite_Id = item.SaleSite_Id;

            m_saleorder_item.getSMTSaleOrderDetailList(function (paramObj) {
                if (index < m_jsonobjs.length - 1) {
                    index++;
                    m_func(index, m_jsonobjs);
                }
                else {
                    var m_saleorder_export = new sm.saleorder();
                    m_saleorder_export.handleSMTSaleOrders(function (paramObj) {

                        loadSaleOrderStat();

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
                pageframe.control.processCtrl.hideOperaProcess();
                webhandler.ajaxHandler._errorEvent(err);
            });
        }
        else {
            pageframe.control.processCtrl.hideOperaProcess();
        }
    };

    var m_saleorder = new sm.saleorder();
    m_saleorder.getSMTSaleOrderList(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        m_func(0, m_jsonobjs);
    }, function (err) {
        if (err.Message && err.Message.indexOf("http://gw.api.alibaba.com") > -1) {
            window.location = err.Message;
        }
        else {

            pageframe.control.processCtrl.hideOperaProcess();

            webhandler.ajaxHandler._errorEvent(err);
        }
    });
}
/* SMT声明发货 */
function syncSMTSOShipState() {
    pageframe.control.processCtrl.showOperaProcess();

    var m_func = function (index, m_jsonobjs) {

        var item = m_jsonobjs[index];
        if (!item) {
            pageframe.control.processCtrl.hideOperaProcess();
            return;
        }
        var m_saleorder_item = new sm.saleorder();

        m_saleorder_item.SOCode = item.SOCode;
        m_saleorder_item.CustName = item.CustName;
        m_saleorder_item.CustKey = item.CustKey;
        m_saleorder_item.ExpressServiceName = item.ExpressServiceName;
        m_saleorder_item.EstimatedShipTimeStr = item.EstimatedShipTimeStr;
        m_saleorder_item.TrackingNumber = item.TrackingNumber;
        m_saleorder_item.IsTrack = item.IsTrack;
        m_saleorder_item.LstSolutionName = item.LstSolutionName;
        m_saleorder_item.SaleSite_Id = item.SaleSite_Id;

        m_saleorder_item.modifyShipStateInSMT(function (paramObj) {
            if (index < m_jsonobjs.length - 1) {
                index++;
                m_func(index, m_jsonobjs);
            }
            else {
                var m_saleorder_export = new sm.saleorder();
                m_saleorder_export.exportModifyShipStateInSMTErrors(function (paramObj) {

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
    m_saleorder.querySMTSaleOrderForShipState(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        m_func(0, m_jsonobjs);
    });
}
/* 发送SMT订单确认消息 */
function sendSMTCustMessage() {
    pageframe.control.processCtrl.showOperaProcess();

    var m_func = function (index, m_jsonobjs) {

        var item = m_jsonobjs[index];
        if (!item) {
            pageframe.control.processCtrl.hideOperaProcess();
            return;
        }
        var m_saleorder_item = new sm.saleorder();

        m_saleorder_item.SOCode = item.SOCode;
        m_saleorder_item.CustName = item.CustName;
        m_saleorder_item.CustKey = item.CustKey;
        m_saleorder_item.SaleSite_Id = item.SaleSite_Id;

        m_saleorder_item.sendSMTSOConfirmMessage(function (paramObj) {
            if (index < m_jsonobjs.length - 1) {
                index++;
                m_func(index, m_jsonobjs);
            }
            else {
                var m_saleorder_export = new sm.saleorder();
                m_saleorder_export.exportSendSMTSOConfirmMessageErrors(function (paramObj) {

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
    m_saleorder.querySMTSaleOrderForConfirmMessage(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        m_func(0, m_jsonobjs);
    });
}
/* 打开发送SMT评价的窗体 */
function openEvalutionSMTFrm() {
    if (!pageVariable.handlerEvaluationSMTFrm) {
        pageVariable.handlerEvaluationSMTFrm = new uicontrol.dialog("handlerEvaluationSMTFrm", "更新SMT评价", { width: 800 }, evaluationSMTOrder);

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

    pageVariable.handlerEvaluationSMTFrm.show();
}
/* 发送SMT评价 */ 
function evaluationSMTOrder() {
    var m_salesite_id = $("#ddlESMTSite").val();
    if (!m_salesite_id) {
        return;
    }

    pageframe.control.processCtrl.showOperaProcess();

    var m_func = function (index, m_jsonobjs) {

        var item = m_jsonobjs[index];
        if (!item) {
            pageframe.control.processCtrl.hideOperaProcess();
            return;
        }
        var m_saleorder_item = new sm.saleorder();

        m_saleorder_item.SOCode = item.SOCode;
        m_saleorder_item.SaleSite_Id = m_salesite_id;

        m_saleorder_item.evaluationSMTOrder(function (paramObj) {
            if (index < m_jsonobjs.length - 1) {
                index++;
                m_func(index, m_jsonobjs);
            }
            else {
                var m_saleorder_export = new sm.saleorder();
                m_saleorder_export.exportEvaluationSMTOrderErrors(function (paramObj) {

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
    m_saleorder.getSMTEvaluationOrderList(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        m_func(0, m_jsonobjs);
    }, function (err) {
        if (err.Message && err.Message.indexOf("http://gw.api.alibaba.com") > -1) {
            window.location = err.Message;
        }
        else {

            pageframe.control.processCtrl.hideOperaProcess();

            webhandler.ajaxHandler._errorEvent(err);
        }
    });
}
/*  */
function exportSMTTaskInfos() {
    var m_saleorder = new sm.saleorder();
    m_saleorder.exportSMTTaskInfos(function (paramObj) {
        window.open(paramObj);
    });
}
/*  */
function exportSMTMessage() {
    var m_saleorder = new sm.saleorder();
    m_saleorder.exportSMTMessage(function (paramObj) {
        window.open(paramObj);
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* ECMS-客户订单处理 */
    document.title = "ECMS-" + mlm.M0025;

    /* 客户订单 */
    $("#lbSaleOrder").text(mlm.C1435);
    /* 客户订单号 */
    $("#lbQSOCodeSymbol").text(mlm.C1404 + ":");
    /* 客户订单列表 */
    $("#lbSaleOrderTitle").text(mlm.C1435 + mlm.C0463);
    /* 待客户确认 */
    $("#btWaitConfirm").val(mlm.C1501);
    /* 待生效 */
    $("#btWaitSubmit").val(mlm.C1430);
    /* 待发货 */
    $("#btWaitShip").val(mlm.C1502);
    /* 运输中 */
    $("#btShipping").val(mlm.C1282);
    /* 财务处理 */
    $("#btFinanceHandle").val(mlm.C1488);
    /* 丢包&退件处理 */
    $("#btEOLose").val(mlm.C1503);
    /* 售后处理 */
    $("#btSAHandle").val(mlm.C1489);
    /* 查询订单 */
    $("#btQuerySO").val(mlm.C1504);
    /* 新增订单 */
    $("#btNewSO").text(mlm.C0461 + mlm.C1505);
    /* 订单处理 */
    $("#btHandleSO").val(mlm.C1623);
    /* 订单信息 */
    $("#lbSOInfoSymbol").text(mlm.C1485);
    /* 配送&备注 */
    $("#lbSOExpServiceSymbol").text(mlm.C1507);
    /* 利润测算 */
    $("#lbSOProfitSymbol").text(mlm.C1508);
    /* 客户 */
    $("#lbCustomerSymbol, #lbCustomer_1Symbol").text(mlm.C0719 + ":");
    /* 发货地址 */
    $("#lbShipAddressSymbol, #lbShipAddress_1Symbol").text(mlm.C1300 + ":");
    /* 设置地址 */
    $("#btChangeAddress, #btChangeAddress_1").text("(" + mlm.C1436 + ")");
    /* 站点 */
    $("#lbSOFromSymbol, #lbQSaleSiteSymbol, #lbSMTSiteSymbol, #lbTaobaoSiteSymbol").text(mlm.C0416 + ":");
    /* 销售日期 */
    $("#lbSOCreateTimeSymbol, #lbQCreateTimeSymbol").text(mlm.C1490 + ":");
    /* 交易货币 */
    $("#lbSOCurrSymbol").text(mlm.C1509 + ":");
    /* 汇率 */
    $("#lbSOCurrRateSymbol").text(mlm.C0132 + ":");
    /* 商品列表 */
    $("#lbSOProdTitle").text(mlm.C0168);
    /* 添加商品 */
    $("#btAddSOProd").val(mlm.C0530 + mlm.C0734);
    /* 包裹重量 */
    $("#lbExpWeightSymbol, #lbExpWeight_1Symbol").text(mlm.C1301 + ":");
    /* 包裹体积 */
    $("#lbVolumnSymbol, #lbVolumnS_1ymbol").text(mlm.C1302 + "(cm³):");
    /* 配送服务 */
    $("#lbExpServiceSymbol, #lbQExpServiceSymbol").text(mlm.C0436 + ":");
    /* 物流方案 */
    $("#lbLstSolutionSymbol, #lbLstSolution_1Symbol, #lbQLstSolutionSymbol").text(mlm.C0783 + ":");
    /* 配送服务价格 */
    $("#lbExpPriceSymbol").text(mlm.C1491 + ":");
    /* 物流成本 */
    $("#lbExpCostSymbol, #lbExpCost_1Symbol").text(mlm.C1375 + ":");
    /* 计划发货日期 */
    $("#lbEstimatedShipTimeSymbol, #lbEstimatedShipTime_1Symbol").text(mlm.C1466 + ":");
    /* 计划到货日期 */
    $("#lbEstimatedArriveTimeSymbol, #lbEstimatedArriveTime_1Symbol").text(mlm.C1467 + ":");
    /* 订单备注 */
    $("#lbSORemarkSymbol, #lbCloseRemarkSymbol").text(mlm.C1505 + mlm.C0073 + ":");
    /* 报关清单 */
    $("#lbCustomsTitle, #lbCustomsTitle_1").text(mlm.C1376);
    /* 添加报关商品 */
    $("#btAddCustoms, #btAddCustoms_1").val(mlm.C0530 + mlm.C1307);
    /* 订单总金额 */
    $("#lbTotalPriceSymbol").text(mlm.C1510 + ":");
    /* 商品价格 */
    $("#lbProdPriceSymbol").text("[" + mlm.C1511 + "]");
    /* 配送服务价格 */
    $("#lbSOExpPriceSymbol").text("[" + mlm.C1491 + "]");
    /* 订单总成本 */
    $("#lbTotalCostSymbol").text(mlm.C1512 + ":");
    /* 商品成本 */
    $("#lbProdCostSymbol").text("[" + mlm.M0017 + "]");
    /* 物流成本 */
    $("#lbSOExpCostSymbol").text("[" + mlm.C1375 + "]");
    /* 其他成本 */
    $("#lbSOOtherCostSymbol").text("[" + mlm.C1513 + "]");
    /* 订单利润 */
    $("#lbTotalProfitSymbol").text(mlm.C1514 + ":");
    /* 地址列表 */
    $("#lbRvAddressTitle").text(mlm.C1437 + mlm.C0463);
    /* 内部商品列表 */
    $("#lbGProdTitle").text(mlm.C1055 + mlm.C0463);
    /* 添加内部商品 */
    $("#btAddGProd").val(mlm.C0530 + mlm.C1055);
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
    /* 生效日期 */
    $("#lbSubmitTimeSymbol").text(mlm.C1425 + mlm.C0724 + ":");
    /* 客户确认日期 */
    $("#lbCustConfirmTimeSymbol").text(mlm.C1498 + mlm.C0724 + ":");
    /* 配送中心 */
    $("#lbWHSymbol, #lbQWHSymbol").text(mlm.C1274 + ":");
    /* 客户关键字 */
    $("#lbQCustKeySymbol").text(mlm.C1439 + ":");
    /* 商品关键字 */
    $("#lbQProdKeySymbol").text(mlm.C0734 + mlm.C0184 + ":");
    /* 站点导航 */
    $("#lbQSSPdcSymbol").text(mlm.C1515 + ":");
    /* 内部商品分类 */
    $("#lbQPdcSymbol").text(mlm.C1123 + ":");
    /* 销售区域 */
    $("#lbQGlobalAreaSymbol").text(mlm.C1516 + ":");
    /* 配送单号 */
    $("#lbQEOCodeSymbol").text(mlm.C1316 + ":");
    /* 问题单号 */
    $("#lbQASPCodeSymbol").text(mlm.C1546 + ":");
    /* 状态 */
    $("#lbQSOStateSymbol").text(mlm.C0367 + ":"); 
    /* 到 */
    $("#lbQToSymbol").text(mlm.C0412);
    /* 生效订单 */
    $("#btImportSubmitSO").text(mlm.C1524); 
    /* 导出待生效订单 */
    $("#btExportSubmitSO").text(mlm.C0987 + mlm.C1555);
    /* 同步SMT订单 */
    $("#btSyncSMTSO").text("同步SMT订单");
    /* 导入SMT订单 */
    $("#btImportSMTSO").text(mlm.C1644);
    /* 导入淘宝订单 */
    $("#btImportSMTTaobao").text(mlm.C1651);
    /* 报关名称(中文) */
    $("#lbCustomProdName_CNSymbol").text(mlm.C1621);

    /* 导入文件 */
    $("#lbImportFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
}