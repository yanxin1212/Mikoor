/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadASPState);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);
    
    $("#btNewASProblem").click(openNewASProblemFrm);

    $("#btNewASProblem, #btAddASProd, #btAddCustomProd, #btWaitSubmit, #btWaitReceiveRet, #btWaitHandle, #btHandling, #btQueryASP").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
    $("#btWaitSubmit, #btWaitReceiveRet, #btWaitHandle, #btHandling").click(function () {
        pageVariable.querycondition.State = $(this).attr("tag");
        pageVariable.querycondition.SalePlatform_Id = "";
        pageVariable.querycondition.SaleSite_Id = "";
        pageVariable.querycondition.SOCode = "";
        pageVariable.querycondition.ASPCode = "";
        pageVariable.querycondition.CustKey = "";
        pageVariable.querycondition.ProblemType = "0";
        queryAPProblem(1, pageVariable.aftersaleList.pageNumber);
    });
    $("#btQueryASP").click(openQueryASPFrm);

    pageVariable.querycondition = {};
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
    if (pageVariable.aftersaleList) {
        pageVariable.aftersaleList.resize(mainFormHeight);
    }
}

/* 加载配送视图 */
function loadASPState() {
    if (!pageVariable.aftersaleList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.aftersaleList = new uicontrol.tableList("aftersaleList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "AS_Problem_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryAPProblem,
                                         columns: [{ display: mlm.C1392, name: "", width: 330, align: 'left', adjust: true, createCell: constructASProblemCell },
                                                   { display: mlm.C1441, name: "Customer_Id", width: 150, align: 'left', adjust: true, createCell: constructCustomCell },
                                                   { display: mlm.C1406, name: "CreateTimeStr", width: 80, align: 'left', adjust: true, createCell: constructCreateTimeCell },
                                                   { display: mlm.C1405, name: "", width: 70, align: 'left', adjust: true, createCell: constructReceiveRetCell },
                                                   { display: mlm.C1408, name: "", width: 80, align: 'left', adjust: true, createCell: constructASPHandleTypeCell },
                                                   { display: mlm.C1489, name: "", width: 210, align: 'left', adjust: true, createCell: constructASPHandleCell },
                                                   { display: mlm.C0367, name: "", width: 60, align: 'left', adjust: true, createCell: constructStateCell },
                                                   { display: mlm.C0019, name: "", width: 60, align: 'center', adjust: true, createCell: createASPOperaCell}]
                                     });

    }

    var m_waitSubmitCtrl = $("#btWaitSubmit");
    var m_waitReceiveRetCtrl = $("#btWaitReceiveRet");
    var m_waitHandleCtrl = $("#btWaitHandle");
    var m_handlingCtrl = $("#btHandling");
    m_waitSubmitCtrl.val(mlm.C1430);
    m_waitReceiveRetCtrl.val(mlm.C1431);
    m_waitHandleCtrl.val(mlm.C0919);
    m_handlingCtrl.val(mlm.C1432);

    var m_ctrls = $("#btWaitSubmit, #btWaitReceiveRet, #btWaitHandle, #btHandling");
    m_ctrls.unbind("mouseenter mouseleave");
    m_ctrls.css("background-color", "#CCCCCC");

    var m_as_problem = new sm.as_problem();
    m_as_problem.getASProblemStat(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        $.each(m_jsonobjs, function () {
            if (Number(this.ASPCount) > 0) {
                if (this.State == "0") {
                    m_waitSubmitCtrl.css("background-color", "");
                    m_waitSubmitCtrl.val(mlm.C1430 + "(" + this.ASPCount + ")");
                    m_waitSubmitCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
                else if (this.State == "100") {
                    m_waitReceiveRetCtrl.css("background-color", "");
                    m_waitReceiveRetCtrl.val(mlm.C1431 + "(" + this.ASPCount + ")");
                    m_waitReceiveRetCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
                else if (this.State == "200") {
                    m_handlingCtrl.css("background-color", "");
                    m_handlingCtrl.val(mlm.C1432 + "(" + this.ASPCount + ")");
                    m_handlingCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
            }
        });
    });
}
/* 构建售后问题列 */
function constructASProblemCell(key, cellValue) {
    var m_arr = [];

    var m_str = "";
    if (this.keyObj.ProblemType == "1") {
        m_str = mlm.C1418;
    }
    else if (this.keyObj.ProblemType == "2") {
        m_str = mlm.C1419;
    }
    else if (this.keyObj.ProblemType == "3") {
        m_str = mlm.C1420;
    }
    else if (this.keyObj.ProblemType == "4") {
        m_str = mlm.C1421;
    }
    else if (this.keyObj.ProblemType == "5") {
        m_str = mlm.C1559;
    }
    else if (this.keyObj.ProblemType == "6") {
        m_str = mlm.C1560;
    }
    else {
        m_str = mlm.C0627;
    }
    m_arr.push("<div style='padding: 0px'><a onclick='viewASProblem.call(this, \"" + this.keyObj.AS_Problem_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ASPCode + "</a> (" + m_str + ")</div>");
    m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>" + this.keyObj.ProblemRemark + "</div>");

    return m_arr.join("");
}
/* 构建客户列 */
function constructCustomCell(key, cellValue) {
    var m_arr = [];

    m_arr.push("<div style='padding: 0px'><a onclick='openViewCustFrm.call(this, \"" + this.keyObj.Customer_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.CustName + "</a></div>");
    m_arr.push("<div style='padding: 3px 0px 0px 0px'>(<a onclick='viewSaleOrder.call(this, \"" + this.keyObj.SaleOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SOCode + "</a>)</div>");

    return m_arr.join("");
}
/* 构建提交日期列 */
function constructCreateTimeCell(key, cellValue) {
    return "<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.CreateTimeStr) + "</div>";
}
/* 构建客户退件列 */
function constructReceiveRetCell(key, cellValue) {
    var m_arr = [];

    if (this.keyObj.ProblemType == "1" || this.keyObj.ProblemType == "2" || this.keyObj.ProblemType == "5") {
        if (this.keyObj.CustReturn == "1") {
            if (!this.keyObj.ReceiveRetFlag || this.keyObj.ReceiveRetFlag == "0") {
                m_arr.push("<span>" + mlm.C1443 + "</span>");
            }
            else if (this.keyObj.ReceiveRetFlag == "1") {
                m_arr.push("<span>" + mlm.C1444 + "</span>");
            }
            else if (this.keyObj.ReceiveRetFlag == "2") {
                m_arr.push("<span>" + mlm.C1445 + "</span>");
            }
            else if (this.keyObj.ReceiveRetFlag == "3") {
                m_arr.push("<span>" + mlm.C1446 + "</span>");
            }
            else {
                m_arr.push("<span>" + mlm.C1447 + "</span>");
            }
        }
    }

    return m_arr.join("");
}
/*  */
function constructASPHandleTypeCell(key, cellValue) {
    var m_arr = [];
    if (this.keyObj.HandleType == "0") {
        m_arr.push("<div style='padding: 0px; '>" + mlm.C0627 + "</div>");
    }
    else if (this.keyObj.HandleType == "1") {
        m_arr.push("<div style='padding: 0px; '>" + mlm.C1427 + "</div>");
        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.Refund) + ")</div>");
    }
    else {
        m_arr.push("<div style='padding: 0px; '>" + mlm.C1428 + "</div>");
    }

    return m_arr.join("");
}
/* 构建问题处理列 */
function constructASPHandleCell(key, cellValue) {
    var m_arr = [];
    if (this.keyObj.HandleType == "1") {
        if (this.keyObj.State == "10") {
            var m_remaining = Number(this.keyObj.Remaining);

            if (m_remaining == 0) {
                m_arr.push("<div style='padding: 0px; color: #000000;'>" + mlm.C1552 + "</div>");

                if (Number(this.keyObj.PRFund) > 0) {
                    m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000;'>" + mlm.C0872 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.PRFund) + "</div>");
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
        else {
            var m_done = Number(this.keyObj.Done);
            if (m_done > 0) {
                if (this.keyObj.BillType == "1") {
                    m_arr.push("<div style='padding: 0px;'>" + mlm.C1564 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, m_done) + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px;'>" + mlm.C0910 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, m_done) + "</div>");
                }
                m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>" + this.keyObj.HandleRemark + "</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px;'>" + this.keyObj.HandleRemark + "</div>");
            }
        }
    }
    else if (this.keyObj.HandleType == "2") {
        if (this.keyObj.State == "0") {
            m_arr.push("<div style='padding: 0px; '>" + this.keyObj.LstSolutionName + ", " + commoncore.func.getTimeStrCell(this.keyObj.EstimatedShipTimeStr) + mlm.C1562 + "</div>");
        }
        else if (this.keyObj.State == "10") {
            if (this.keyObj.EOState == "0") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1280 + "</div>");

                if (Number(this.keyObj.EstimatedShipDiff) > 0) {
                    m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1323 + this.keyObj.EstimatedShipDiff + mlm.C0800 + ")" + "</div>");
                }
            }
            else if (this.keyObj.EOState == "10") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1281 + "</div>");

                if (Number(this.keyObj.EstimatedShipDiff) > 0) {
                    m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1323 + this.keyObj.EstimatedShipDiff + mlm.C0800 + ")" + "</div>");
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
        else {
            m_arr.push("<div style='padding: 0px;'>" + this.keyObj.HandleRemark + "</div>");
        }
    }
    else {
        m_arr.push("<div style='padding: 0px; '>" + this.keyObj.HandleRemark + "</div>");
    }

    return m_arr.join("");
}
/* 构建状态列 */
function constructStateCell(key, cellValue) {
    var m_str = "";
    if (this.keyObj.State == "0") {
        m_str = mlm.C1424;
    }
    else if (this.keyObj.State == "10") {
        m_str = mlm.C1425;
    }
    else if (this.keyObj.State == "20") {
        m_str = mlm.C1557;
    }

    return m_str;
}
/* 构建操作列 */
function createASPOperaCell(key, cellValue) {

    var m_arr = [];

    if (this.keyObj.State == "0") {
        m_arr.push("<a onclick='openModifyASProblemFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C0061 + "</a>");
        m_arr.push("<a onclick='openDeleteASProblemFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 3px'>" + mlm.C0062 + "</a>");
        m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a onclick='openSubmitSOFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1425 + "</a></div>");
    }
    else if (this.keyObj.State == "10") {
        if (this.keyObj.HandleType == "2") {
            if (this.keyObj.ExpressOrder_Id == "0" || Number(this.keyObj.EOState) > 20) {
                if (!this.keyObj.EOState || this.keyObj.EOState == "30" || this.keyObj.EOState == "40") {
                    m_arr.push("<div style='padding: 0px;'><a onclick='openHandleSProblemFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1526 + "</a></div>");

                }

                m_arr.push("<div style='padding: 2px 0px 0px 0px;'><a onclick='openCloseASP.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1557 + "</a></div>");
            }
        }
        else {
            m_arr.push("<a onclick='openHandleSProblemFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1452 + "</a>");
            m_arr.push("<a onclick='openCloseASP.call(this, \"" + key + "\")' href='javascript:void(\"0\");' style='margin: 0px 0px 0px 3px'>" + mlm.C1557 + "</a>");
        }
    }
    else if (this.keyObj.State == "20" || this.keyObj.State == "30") {
        if (this.keyObj.CustReturn == "1" && (!this.keyObj.ReceiveRetFlag || this.keyObj.ReceiveRetFlag == "1")) {
            m_arr.push("<a onclick='openLoseRet.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + mlm.C1446 + "</a>");
        }
    }

    return m_arr.join("");
}
/* 打开查询问题窗体 */
function openQueryASPFrm() {
    if (!pageVariable.queryASPFrm) {
        pageVariable.queryASPFrm = new uicontrol.dialog("queryASPFrm", mlm.C0562 + mlm.C1433, { width: 800 }, function () {
            getASPQueryCondition();
            queryAPProblem(1, pageVariable.aftersaleList.pageNumber);

            pageVariable.queryASPFrm.close();
        });

        var m_asptypeCtrl = $("#ddlQASPType");
        m_asptypeCtrl.append("<option></option>");
        m_asptypeCtrl.append("<option value='1'>" + mlm.C1418 + "</option>");
        m_asptypeCtrl.append("<option value='2'>" + mlm.C1419 + "</option>");
        m_asptypeCtrl.append("<option value='3'>" + mlm.C1420 + "</option>");
        m_asptypeCtrl.append("<option value='4'>" + mlm.C1421 + "</option>");
        m_asptypeCtrl.append("<option value='5'>" + mlm.C1559 + "</option>");
        m_asptypeCtrl.append("<option value='6'>" + mlm.C1560 + "</option>");
        m_asptypeCtrl.append("<option value='7'>" + mlm.C0627 + "</option>");

        pageVariable.ddlQASPState = new uicontrol.selectbox("ddlQASPState", "radio");
        var m_stateoptions = [];
        m_stateoptions.push({ key: "-1", value: mlm.C0403 });
        m_stateoptions.push({ key: "0", value: mlm.C1430 });
        m_stateoptions.push({ key: "100", value: mlm.C1431 });
        m_stateoptions.push({ key: "200", value: mlm.C1432 });
        m_stateoptions.push({ key: "20", value: mlm.C1557 });
        pageVariable.ddlQASPState.bindSource(m_stateoptions);
        var m_defaulteostate = [];
        m_defaulteostate.push({ key: "-1" });
        pageVariable.ddlQASPState.setSelectedItem(m_defaulteostate);

        var m_saleSiteCtrl = $("#ddlQSaleSite");
        var m_saleplatform = new sm.saleplatform();
        m_saleplatform.queryAvaiSaleSites(function (retTable) {
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

            m_saleSiteCtrl.append("<option></option>");
            $.each(m_jsonobjs, function () {
                m_saleSiteCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
            });
        });
    }

    var m_selectedstate = [];
    if (pageVariable.querycondition.State) {
        m_selectedstate.push({ key: pageVariable.querycondition.State });
    }
    pageVariable.ddlQASPState.setSelectedItem(m_selectedstate);

    $("#txtQCustKey").val(pageVariable.querycondition.CustKey);
    $("#txtQASPCode").val(pageVariable.querycondition.ASPCode);
    $("#txtQSOCode").val(pageVariable.querycondition.SOCode);
    $("#ddlQASPType").val(pageVariable.querycondition.ProblemType);
    $("#ddlQSaleSite").val(pageVariable.querycondition.SaleSite_Id);

    pageVariable.queryASPFrm.show();
}
/* 获取订单查询参数 */
function getASPQueryCondition() {
    var m_as_problem = new sm.as_problem();
    pageVariable.querycondition.CustKey = $.trim($("#txtQCustKey").val());
    pageVariable.querycondition.ASPCode = $.trim($("#txtQASPCode").val()); 
    pageVariable.querycondition.SOCode = $.trim($("#txtQSOCode").val());
    pageVariable.querycondition.ProblemType = $("#ddlQASPType").val();
    pageVariable.querycondition.SaleSite_Id = $("#ddlQSaleSite").val();

    if (pageVariable.ddlQASPState) {
        pageVariable.querycondition.State = pageVariable.ddlQASPState.getSelectedItem()[0];
        if (pageVariable.querycondition.State == "-1") {
            pageVariable.querycondition.State = null;
        }
    }

    return m_as_problem;
}
/* 查询售后问题 */
function queryAPProblem(pageNum, pageCount) {
    var m_as_problem = new sm.as_problem();
    
    m_as_problem.Page = pageNum;
    m_as_problem.PageNum = pageCount;
    m_as_problem = $.extend(m_as_problem, pageVariable.querycondition);

    m_as_problem.queryASProblem(function (retTable) {
        pageVariable.aftersaleList.bindDataSource(retTable);
    });
}

/* 初始化售后问题窗体 */
function initHandlerASProblumFrm() {

    if (!pageVariable.handlerAfterSaleFrm) {
        pageVariable.handlerAfterSaleFrm = new uicontrol.dialog("handlerAfterSaleFrm", "", { width: 1025, position: ["auto", 5] }, saveASProblem);

        pageVariable.handlertypeCtrl = $("#ddlHandlerType");

        var m_shiptimeCtrl = $("#txtEstimatedShipTime");
        var m_arrivetimeCtrl = $("#txtEstimatedArriveTime");

        $("#lbExpWUnit").text(keycontext.keyparam.WUnit);
        $("#lbRefundCurr, #lbExpCurr").text(keycontext.keyparam.syscurrcode);

        pageVariable.selCustomer = new bizcontrol.selectcustomer($("#selCustomer"), function (customer_id) {

            if (customer_id && customer_id != "0") {
                var m_customer = new cm.customer();
                m_customer.Customer_Id = customer_id;
                m_customer.readCustomer(function (retObj) {

                    pageVariable.handlerAfterSaleFrm.AS_Problem.Customer_Id = retObj.Customer_Id;
                    pageVariable.handlerAfterSaleFrm.AS_Problem.CustName = retObj.CustName;

                    if (!pageVariable.handlerAfterSaleFrm.AS_Problem.OtherProps) {
                        pageVariable.handlerAfterSaleFrm.AS_Problem.OtherProps = {};
                    }

                    if (retObj.RvAddresses && retObj.RvAddresses.length > 0) {

                        pageVariable.handlerAfterSaleFrm.AS_Problem.OtherProps.RvAddressCount = retObj.RvAddresses.length;

                        if (retObj.RvAddresses.length > 1) {
                            $("#btChangeAddress").show();
                        }
                        else {
                            $("#btChangeAddress").hide();
                        }
                    }
                    else {
                        if (pageVariable.handlerAfterSaleFrm.AS_Problem.OtherProps) {
                            pageVariable.handlerAfterSaleFrm.AS_Problem.OtherProps.RvAddressCount = 0;
                        }
                    }
                });
            }
            else {
                pageVariable.handlerAfterSaleFrm.AS_Problem.Customer_Id = "0";
                pageVariable.handlerAfterSaleFrm.AS_Problem.CustName = "";
                if (pageVariable.handlerAfterSaleFrm.AS_Problem.OtherProps) {
                    pageVariable.handlerAfterSaleFrm.AS_Problem.OtherProps.RvAddressCount = 0;
                }
                pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService = {};
                $("#lbExpAddress").text("");
                $("#lbExpAddress").attr("tag", "");
                $("#btChangeAddress").hide();
            }

            var m_saleoderCtrl = $("#txtSaleOrder");
            m_saleoderCtrl.attr("tag", null);
            m_saleoderCtrl.val("");
            pageVariable.asprodList.bindDataSource(null);
            $("#lbExpAddress").text("");
            $("#lbExpAddress").attr("tag", "");
            pageVariable.handlerAfterSaleFrm.saleorder = null;

            initHandleCtrl();
        });

        var m_asptypeCtrl = $("#ddlASPType");
        m_asptypeCtrl.append("<option value='1'>" + mlm.C1418 + "</option>");
        m_asptypeCtrl.append("<option value='2'>" + mlm.C1419 + "</option>");
        m_asptypeCtrl.append("<option value='3'>" + mlm.C1420 + "</option>");
        m_asptypeCtrl.append("<option value='4'>" + mlm.C1421 + "</option>");
        m_asptypeCtrl.append("<option value='5'>" + mlm.C1559 + "</option>");
        m_asptypeCtrl.append("<option value='6'>" + mlm.C1560 + "</option>");
        m_asptypeCtrl.append("<option value='7'>" + mlm.C0627 + "</option>");
        m_asptypeCtrl.change(function () {
            var m_type = m_asptypeCtrl.val();

            if (m_type == "1" || m_type == "2" || m_type == "5") {
                $("#dvCustReturn").show();
            }
            else {
                $("#dvCustReturn").hide();
            }

            if (m_type == "6" || m_type == "7") {
                $("#dvASPProd").hide();
            }
            else {
                $("#dvASPProd").show();
            }

            if (m_type == "7") {
                $("#dvHandleType").hide();
            }
            else {
                $("#dvHandleType").show();
            }

            if (m_type == "6") {
                $("#spHandleType").hide();
                pageVariable.handlertypeCtrl.val("1");
                pageVariable.handlertypeCtrl.trigger("change");
            }
            else {
                $("#spHandleType").show();
                pageVariable.handlertypeCtrl.val("0");
                pageVariable.handlertypeCtrl.trigger("change");
            }
        });

        pageVariable.handlertypeCtrl.append("<option value='0'>" + mlm.C0627 + "</option>");
        pageVariable.handlertypeCtrl.append("<option value='1'>" + mlm.C1427 + "</option>");
        pageVariable.handlertypeCtrl.append("<option value='2'>" + mlm.C1428 + "</option>");
        pageVariable.handlertypeCtrl.change(function () {

            initHandleCtrl();
            var m_type = pageVariable.handlertypeCtrl.val();
            if (m_type == "1") {
                $("#dvRefund").show();
                $("#liASPExpService").hide();
                
                $("#dvCustom").hide();
                $("#dvCustom").removeClass("last-item");
                $("#dvCustom_0").addClass("last-item");
            }
            else if (m_type == "2") {
                $("#liASPExpService").show();
                $("#dvRefund").hide();

                calculateWeight();
                generateCustom();
            }
            else {
                $("#dvRefund").hide();
                $("#liASPExpService").hide();

                $("#dvCustom").hide();
                $("#dvCustom").removeClass("last-item");
                $("#dvCustom_0").addClass("last-item");
            }
        });

        $("#btChangeAddress").click(openChangeRvAddressFrm);
        $("#btAddCustomProd").click(openNewCustomFrm);
        $("#lbExpAddress").tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });

        pageVariable.custreturnCtrl = new uicontrol.selectbox("ddlCustReturn", "radio");
        var m_croptions = [];
        m_croptions.push({ key: "1", value: mlm.C1422 });
        m_croptions.push({ key: "2", value: mlm.C1423 });
        pageVariable.custreturnCtrl.bindSource(m_croptions);
        pageVariable.custreturnCtrl.setSelectedItem([{ key: "1"}]);

        pageVariable.sellstsolutionCtrl = new bizcontrol.selectsolstsolution($("#selLstSolution"), function () {
            if (!pageVariable.selectWH.warehouse_id || pageVariable.selectWH.warehouse_id == "0") {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1357);
                return false;
            }
            if (!pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.GlobalArea_Id || pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.GlobalArea_Id == "0") {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1300 + mlm.C0713);
                return false;
            }

            return true;
        },
        function () {
            var m_condObj = {};
            m_condObj.Weight = $("#txtExpWeight").val();
            m_condObj.SysWeightUnit_Id = keycontext.keyparam.SysWeightUnit_Id;
            m_condObj.Length = $("#txtLength").val();
            m_condObj.Width = $("#txtWidth").val();
            m_condObj.Height = $("#txtHeight").val();
            m_condObj.Tax = 0;
            $.each(pageVariable.customprodList.dataSource.items.arrValues, function () {
                m_condObj.Tax += Number(this.CustomQty) * Number(this.CustomValue)
            });
            m_condObj.TaxSysCurrency_Id = keycontext.keyparam.tax_syscurrency;
            m_condObj.WUnit = keycontext.keyparam.WUnit;
            m_condObj.CurrSymbol = keycontext.keyparam.syscurrsymbol;
            m_condObj.SysCurrency_Id = keycontext.keyparam.syscurrency;
            m_condObj.GlobalAreaIds = [];
            m_condObj.GlobalAreaIds.push(pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.GlobalArea_Id);
            m_condObj.Warehouse_Id = pageVariable.selectWH.warehouse_id;
            m_condObj.Province = pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvProvince;
            m_condObj.City = pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvCity;

            return m_condObj;
        },
        function (lstsolution) {

            var m_as_problem = pageVariable.handlerAfterSaleFrm.AS_Problem;
            if (m_as_problem.ExpService.LstSolution_Id == lstsolution.LstSolution_Id) {
                return;
            }

            m_as_problem.ExpService.LstSolution_Id = lstsolution.LstSolution_Id;
            m_as_problem.ExpService.LstCompanyName = lstsolution.LstCompanyName;
            m_as_problem.ExpService.LstSolutionName = lstsolution.LstSolutionName;
            m_as_problem.ExpService.IsTrack = lstsolution.IsTrack;
            m_as_problem.ExpService.ExpServiceCost = Number(lstsolution.TotalCharge);

            $("#txtExpCost").val(m_as_problem.ExpService.ExpServiceCost.toFixed(2));

            if (Number($("#txtExpWeight").val()) != Number(lstsolution.Weight)) {
                $("#lbLstWeight").text(" / " + lstsolution.Weight + " " + keycontext.keyparam.WUnit);
            }
            else {
                $("#lbLstWeight").text("");
            }

            m_shiptimeCtrl.attr("maxavaitime", lstsolution.MaxAvaiTime);

            var m_shiptime = m_shiptimeCtrl.val();
            if (m_shiptime) {
                var m_shiptime = datastruct.convertion.convertToDateByStr(m_shiptime);
                m_shiptime.setDate(m_shiptime.getDate() + Number(lstsolution.MaxAvaiTime));
                var m_year = m_shiptime.getFullYear();
                var m_month = Number(m_shiptime.getMonth()) + 1;
                m_arrivetimeCtrl.datepicker("setDate", m_year + "-" + m_month + "-" + m_shiptime.getDate());
                m_arrivetimeCtrl.trigger("change");
            }
        });

        m_shiptimeCtrl.datepicker();
        m_shiptimeCtrl.change(function () {
            var m_maxavailtime = $(this).attr("maxavaitime");
            if (m_maxavailtime) {
                var m_shiptime = datastruct.convertion.convertToDateByStr($(this).val());
                m_shiptime.setDate(m_shiptime.getDate() + Number(m_maxavailtime));
                var m_year = m_shiptime.getFullYear();
                var m_month = Number(m_shiptime.getMonth()) + 1;
                m_arrivetimeCtrl.datepicker("setDate", m_year + "-" + m_month + "-" + m_shiptime.getDate());
            }
        });

        m_arrivetimeCtrl.datepicker();

        $("#txtExpWeight, #txtLength, #txtWidth, #txtHeight").change(function () {
            var m_str = $(this).val();
            if (!m_str) {
                $(this).val("0.00");
            }

            pageVariable.sellstsolutionCtrl.setLstSolution(null);
            m_shiptimeCtrl.attr("maxavaitime", null);
            $("#txtExpCost").val("0.00");
            pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.LstSolution_Id = 0;
        });

        pageVariable.selectWH = new bizcontrol.selectwarehouse($("#selectWH"), function () {
            var m_globalarea_id = pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.GlobalArea_Id;
            if (m_globalarea_id && m_globalarea_id != "0") {
                var m_areaindex = "";
                if (pageVariable.selectWH.warehouse) {
                    m_areaindex = pageVariable.selectWH.warehouse.AreaIndexs;
                }

                if (!m_areaindex || m_areaindex.indexOf("#" + m_globalarea_id + "#") > -1) {
                    $("#dvCustom").hide();
                    $("#dvCustom").removeClass("last-item");
                    $("#dvCustom_0").addClass("last-item");
                }
                else {
                    $("#dvCustom").show();
                    $("#dvCustom").addClass("last-item");
                    $("#dvCustom_0").removeClass("last-item");
                }
            }
            else {
                $("#dvCustom").hide();
                $("#dvCustom").removeClass("last-item");
                $("#dvCustom_0").addClass("last-item");
            }
        }, "1");

        $("#btSelSaleOrder").hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
        $("#btSelSaleOrder").click(openSelectSOFrm);

        pageVariable.asproblemTabs = $("#asproblemTabs").tabs();

        pageVariable.asprodList = new uicontrol.tableList("asprodList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SkuProduct_Id",
                                         height: 70,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C1264, name: "", width: 500, align: 'left', adjust: true, createCell: constructProdCell },
                                                   { display: mlm.C1561, name: "ProdQty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1414, name: "", width: 70, align: 'center', adjust: true, createCell: constructProblemQtyCell}]
                                     });

        pageVariable.asprodList_1 = new uicontrol.tableList("asprodList_1",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SkuProduct_Id",
                                         height: 70,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C1264, name: "", width: 500, align: 'left', adjust: true, createCell: constructProdCell },
                                                   { display: mlm.C1561, name: "ProdQty", width: 60, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1416, name: "ReceiveRetQty", width: 60, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1414, name: "", width: 60, align: 'center', adjust: true, createCell: constructProblemQtyCell}]
                                     });

        pageVariable.customprodList = new uicontrol.tableList("customprodList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 50,
                                        keyColumn: "AS_Problem_Custom_Id",
                                        columns: [{ display: mlm.C1307, name: "CustomProdName", width: 150, align: 'left' },
                                                { display: mlm.C1307, name: "CustomProdName_CN", width: 150, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 60, align: 'right' },
                                                { display: mlm.C1310, name: "CustomValue", width: 70, align: 'right', adjust: true, createCell: createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 90, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 100, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 80, align: 'left' },
                                                { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, createCell: createSOCustomOperaCell}]
                                    });
    }

    pageVariable.handlerAfterSaleFrm.asp_custom_key = -10000;
}
/* 构建图片列 */
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

    return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewProduct.call(this, \"" + key + "\", \"" + this.keyObj.SkuProduct_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
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
/* 打开切换地址的窗体 */
function openChangeRvAddressFrm() {

    if (!pageVariable.handlerAfterSaleFrm.AS_Problem.Customer_Id || pageVariable.handlerAfterSaleFrm.AS_Problem.Customer_Id == "0") {
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
    m_selectedrv.setItem(pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvFullName + pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvAddress_1 + " " + pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvAddress_2, null);

    if (!pageVariable.handlerRvAddressFrm.RvAddresses) {
        var m_customer = new cm.customer();
        m_customer.Customer_Id = pageVariable.handlerAfterSaleFrm.AS_Problem.Customer_Id;
        m_customer.readCustomer(function (retObj) {

            pageVariable.handlerRvAddressFrm.RvAddresses = retObj.RvAddresses;

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
        pageVariable.rvaddressList.bindDataSource(pageVariable.handlerRvAddressFrm.RvAddresses);
        pageVariable.rvaddressList.setSelectedItems(m_selectedrv);
    }
}
/*  */
function constructRvCell(key, cellValue) {
    return commoncore.func.showSpecialChar(cellValue);
}
/* 设置收货地址 */
function setRvAddress() {
    var m_rvaddress = pageVariable.rvaddressList.getSelectedItems();
    if (!m_rvaddress || m_rvaddress.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1458);
        return;
    }

    if (pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvAddress_1 == m_rvaddress.RvAddress_1 &&
            pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvAddress_2 == m_rvaddress.RvAddress_2) {

        pageVariable.handlerRvAddressFrm.close();
    }
    else {

        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvFullName = m_rvaddress.RvFullName;
        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvTel = m_rvaddress.RvTel;
        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.GlobalArea_Id = m_rvaddress.GlobalArea_Id;
        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvCountry = m_rvaddress.OtherProps.GlobalAreaName;
        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvProvince = m_rvaddress.RvProvince;
        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvCity = m_rvaddress.RvCity;
        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvPostCode = m_rvaddress.RvPostCode;
        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvAddress_1 = m_rvaddress.RvAddress_1;
        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvAddress_2 = m_rvaddress.RvAddress_2;

        var m_addressArr = [];
        m_addressArr.push(m_rvaddress.RvFullName);
        if (m_rvaddress.RvAddress_1) {
            m_addressArr.push(m_rvaddress.RvAddress_1);
        }
        if (m_rvaddress.RvAddress_2) {
            m_addressArr.push(m_rvaddress.RvAddress_2);
        }
        if (m_rvaddress.RvCity) {
            m_addressArr.push(m_rvaddress.RvCity);
        }
        if (m_rvaddress.RvProvince) {
            m_addressArr.push(m_rvaddress.RvProvince);
        }
        if (m_rvaddress.RvPostCode) {
            m_addressArr.push(m_rvaddress.RvPostCode);
        }
        m_addressArr.push(m_rvaddress.RvCountry);

        $("#lbExpAddress").text(commoncore.func.showSpecialChar(m_addressArr.join(", ")));
        m_rvaddress.GlobalAreaName = m_rvaddress.OtherProps.GlobalAreaName;
        $("#lbExpAddress").attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(m_rvaddress)));

        pageVariable.sellstsolutionCtrl.setLstSolution(null);
        $("#txtEstimatedShipTime").attr("maxavaitime", null);
        $("#txtExpCost").val("0.00");
        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.LstSolution_Id = 0;

        pageVariable.handlerRvAddressFrm.close();
    }
}
/* 测算重量 */
function calculateWeight() {

    var m_items = null;
    if (pageVariable.asproblem_action == "handle" && pageVariable.handlerAfterSaleFrm.saleorder.CustReturn == "1") {
        m_items = pageVariable.asprodList_1.dataSource.items.arrValues;
    }
    else {
        m_items = pageVariable.asprodList.dataSource.items.arrValues;
    }

    var m_weight = 0;

    $.each(m_items, function () {
        m_weight += Number(this.Weight) * Number(this.Qty);
    });

    $("#txtExpWeight").val(m_weight.toFixed(3));
}
/* 生成报关清单 */
function generateCustom() {

    var m_items = null;
    if (pageVariable.asproblem_action == "handle" && pageVariable.handlerAfterSaleFrm.saleorder.CustReturn == "1") {
        m_items = pageVariable.asprodList_1.dataSource.items.arrValues;
    }
    else {
        m_items = pageVariable.asprodList.dataSource.items.arrValues;
    }

    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs = [];

    var m_dict = new datastruct.dictionary();
    $.each(m_items, function () {
        if (Number(this.Qty) > 0) {
            var m_key = this.CustomProdName + this.CustomValue;
            var m_custom = m_dict.getItem(m_key);
            if (!m_custom) {

                m_custom = {};
                m_custom.AS_Problem_Custom_Id = pageVariable.handlerAfterSaleFrm.asp_custom_key;
                pageVariable.handlerAfterSaleFrm.asp_custom_key++;
                m_custom.CustomProdName = this.CustomProdName;
                m_custom.CustomProdName_CN = this.CustomProdName_CN;
                m_custom.CustomValue = this.CustomValue;
                m_custom.CustomCode = this.CustomCode;
                m_custom.CustomMaterial = this.CustomMaterial;
                m_custom.GlobalAreaName = this.GlobalAreaName;
                m_custom.FactoryCountry = this.GlobalArea_Id;
                m_custom.CustomQty = this.Qty;
                pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs.push(m_custom);

                m_dict.setItem(m_key, m_custom);
            }
            else {
                m_custom.CustomQty = Number(m_custom.CustomQty) + Number(this.Qty);
            }
        }
    });

    pageVariable.customprodList.bindDataSource(pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs);
}
/* 构建产品列 */
function constructProdCell(key, cellValue) {

    var m_arr = [];
    if (this.keyObj.Type == "2") {
        m_arr.push("<a style='color: #666666' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>");
        m_arr.push(" (<span style='color: #666666'>" + mlm.C1061 + "</span>)");
    }
    else {
        m_arr.push("<a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>");
    }

    return m_arr.join("");
}
/* 构建问题数列 */
function constructProblemQtyCell(key, cellValue) {
    var m_qty = this.keyObj.Qty;
    if (!m_qty) {
        m_qty = 0;
    }

    return "<input type='text' class='text-input' style='width: 55px' onkeypress='uicontrol.func.checkInputNumber(event);' onchange='changeProblemQty.call(this, \"" + key + "\")' value='" + m_qty + "' />";
}
/* 改变问题数量 */
function changeProblemQty(key) {
    var m_qty = $(this).val();
    if (!m_qty) {
        m_qty = 0;
        $(this).val("0");
    }

    var m_obj = null;
    if (pageVariable.asproblem_action == "handle" && pageVariable.handlerAfterSaleFrm.saleorder.CustReturn == "1") {
        m_obj = pageVariable.asprodList_1.getItem(key);

        if (m_qty < Number(m_obj.ReceiveRetQty)) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1563);
            m_qty = m_obj.Qty;
            $(this).val(m_qty);
        }
    }
    else {
        m_obj = pageVariable.asprodList.getItem(key);
    }
    
    if (m_qty > Number(m_obj.ProdQty)) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1459);
        m_qty = m_obj.Qty;
        $(this).val(m_qty);
    }

    m_obj.Qty = m_qty;

    initHandleCtrl();
    calculateWeight();
    generateCustom();
}
/* 打开选择销售订单窗体 */
function openSelectSOFrm() {

    if (!pageVariable.selCustomer.Customer_Id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0719 + mlm.C0713);
        return;
    }

    if (!pageVariable.selectSaleOrder) {
        pageVariable.selectSaleOrder = new uicontrol.dialog("selectSaleOrder", mlm.C0577 + mlm.C1435, { width: 900, position: ["auto", 25] }, selectSO);

        pageVariable.selectSaleOrder.show();
        pageVariable.saleorderList = new uicontrol.tableList("saleorderList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SaleOrder_Id",
                                         selectModel: "1",
                                         height: 120,
                                         columns: [{ display: mlm.C1435, name: "SOCode", width: 120, align: 'left', adjust: true, createCell: createSaleOrderCell },
                                                   { display: mlm.C0416, name: "", width: 200, align: 'left', adjust: true, createCell: createSaleSiteCell },
                                                   { display: mlm.C0927, name: "", width: 90, align: 'right', adjust: true, createCell: createSOMoneyCell },
                                                   { display: mlm.C1462, name: "SubmitHandleTimeStr", width: 90, align: 'left', adjust: true, createCell: createDateTimeCell },
                                                   { display: mlm.C1463, name: "ShipTimeStr", width: 90, align: 'left', adjust: true, createCell: createDateTimeCell },
                                                   { display: mlm.C1464, name: "ArriveTimeStr", width: 90, align: 'left', adjust: true, createCell: createDateTimeCell}]
                                     });
    }

    var m_saleorder = new sm.saleorder();
    m_saleorder.Customer_Id = pageVariable.selCustomer.Customer_Id;
    m_saleorder.querySaleOrderForAS(function (retTable) {
        pageVariable.saleorderList.bindDataSource(retTable);

        var m_saleorder_id = $("#txtSaleOrder").attr("tag");
        if (m_saleorder_id) {
            var m_selecteditems = new datastruct.dictionary;
            m_selecteditems.setItem(m_saleorder_id);

            pageVariable.saleorderList.setSelectedItems(m_selecteditems);
        }
    });

    pageVariable.selectSaleOrder.show();
}
/* 构建客户订单列 */
function createSaleOrderCell(key, cellValue) {
    return "<a onclick='viewSaleOrder.call(this, \"" + this.keyObj.SaleOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SOCode + "</a>";
}
/* 构建站点列 */
function createSaleSiteCell(key, cellValue) {
    return "<span style='padding: 0px;'>" + this.keyObj.SPfName + "-" + this.keyObj.SaleSiteName + "</span>";
}
/* 构建订单金额列 */
function createSOMoneyCell(key, cellValue) {
    return "<span>" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.TotalPrice) + "</span>";
}
/* 构建日期列 */
function createDateTimeCell(key, cellValue) {
    return commoncore.func.getTimeStrCell(cellValue);
}
/* 选择销售订单 */
function selectSO() {

    var m_soobj = pageVariable.saleorderList.getSelectedItems();
    if (m_soobj.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1435 + mlm.C0713);
        return;
    }

    initHandleCtrl();

    var m_saleoderCtrl = $("#txtSaleOrder");
    m_saleoderCtrl.attr("tag", m_soobj.SaleOrder_Id);
    m_saleoderCtrl.val(m_soobj.SOCode);
    $("#lbExpWUnit").text(m_soobj.WUnit);
    $("#lbRefundCurr").text(m_soobj.CurrCode);

    pageVariable.handlerAfterSaleFrm.AS_Problem.SysCurrency_Id = m_soobj.SysCurrency_Id;

    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvFullName = m_soobj.RvFullName;
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvTel = m_soobj.RvTel;
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.GlobalArea_Id = m_soobj.GlobalArea_Id;
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvCountry = m_soobj.GlobalAreaName;
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvProvince = m_soobj.RvProvince;
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvCity = m_soobj.RvCity;
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvPostCode = m_soobj.RvPostCode;
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvAddress_1 = m_soobj.RvAddress_1;
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.RvAddress_2 = m_soobj.RvAddress_2;

    var m_addressArr = [];
    m_addressArr.push(m_soobj.RvFullName);
    if (m_soobj.RvAddress_1) {
        m_addressArr.push(m_soobj.RvAddress_1);
    }
    if (m_soobj.RvAddress_2) {
        m_addressArr.push(m_soobj.RvAddress_2);
    }
    if (m_soobj.RvCity) {
        m_addressArr.push(m_soobj.RvCity);
    }
    if (m_soobj.RvProvince) {
        m_addressArr.push(m_soobj.RvProvince);
    }
    if (m_soobj.RvPostCode) {
        m_addressArr.push(m_soobj.RvPostCode);
    }
    m_addressArr.push(m_soobj.GlobalAreaName);

    $("#lbExpAddress").text(commoncore.func.showSpecialChar(m_addressArr.join(", ")));
    $("#lbExpAddress").attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(m_soobj)));

    var m_as_problem = new sm.as_problem();
    m_as_problem.SaleOrder_Id = m_soobj.SaleOrder_Id;
    m_as_problem.getSOGProductForASP(function (retTable) {
        var m_arr = [];
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            if (Number(this.Qty) > 0) {
                this.ProdQty = this.Qty;
                this.Qty = null;

                m_arr.push(this);
            }
        });
        pageVariable.asprodList.bindDataSource(m_arr);
    });

    pageVariable.handlerAfterSaleFrm.saleorder = m_soobj;

    pageVariable.selectSaleOrder.close();
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
/* 打开修改报关信息窗体 */
function openModifyCustomFrm() {
    if (!pageVariable.handlerCustomFrm) {
        pageVariable.handlerCustomFrm = new uicontrol.dialog("handlerCustomFrm", "", { width: 800, position: ["auto", 45] }, saveCustom);

        pageVariable.selFactoryCountry = new bizcontrol.selectglobalarea("selFactoryCountry", true, "country");
    }

    pageVariable.handlerCustomFrm.as_problem_custom_id = $(this).attr("tag");

    var m_obj = pageVariable.customprodList.getItem(pageVariable.handlerCustomFrm.as_problem_custom_id);

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

    pageVariable.delelteCustomFrm.as_problem_custom_id = $(this).attr("tag");

    var m_obj = pageVariable.customprodList.getItem(pageVariable.delelteCustomFrm.as_problem_custom_id);

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

    var m_as_problem_custom = null;
    if (pageVariable.handlerCustomFrm.action == "New") {
        m_as_problem_custom = {};
    }
    else {
        m_as_problem_custom = pageVariable.customprodList.getItem(pageVariable.handlerCustomFrm.as_problem_custom_id);
    }

    m_as_problem_custom.CustomProdName = m_customprodname;
    m_as_problem_custom.CustomProdName_CN = $.trim($("#txtCustomProdName_CN").val());
    m_as_problem_custom.CustomCode = $.trim($("#txtCustomCode").val());
    m_as_problem_custom.CustomMaterial = $.trim($("#txtCustomMaterial").val());
    m_as_problem_custom.CustomQty = m_customqty;
    m_as_problem_custom.CustomValue = m_customvalue;

    var m_countryObj = pageVariable.selFactoryCountry.getObj();
    if (m_countryObj) {
        m_as_problem_custom.FactoryCountry = m_countryObj.globalArea_Ids ? m_countryObj.globalArea_Ids : 0;
        m_as_problem_custom.GlobalAreaName = m_countryObj.globalAreaNames ? m_countryObj.globalAreaNames : "";
    }
    else {
        m_as_problem_custom.FactoryCountry = 0;
        m_as_problem_custom.GlobalAreaName = "";
    }

    if (pageVariable.handlerCustomFrm.action == "New") {
        m_as_problem_custom.AS_Problem_Custom_Id = pageVariable.handlerAfterSaleFrm.asp_custom_key;
        pageVariable.customprodList.addData(m_as_problem_custom.AS_Problem_Custom_Id, m_as_problem_custom);
        pageVariable.handlerAfterSaleFrm.asp_custom_key++;

        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs = pageVariable.customprodList.dataSource.items.arrValues;
    }
    else {
        pageVariable.customprodList.modifyData(m_as_problem_custom.AS_Problem_Custom_Id, m_as_problem_custom);

        pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs = pageVariable.customprodList.dataSource.items.arrValues;
    }

    pageVariable.sellstsolutionCtrl.setLstSolution(null);
    $("#txtEstimatedShipTime").attr("maxavaitime", null);
    $("#txtExpCost").val("0.00");
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.LstSolution_Id = 0;

    pageVariable.handlerCustomFrm.close();
}
/* 删除报关商品 */
function deleteCustom() {
    pageVariable.customprodList.deleteData(pageVariable.delelteCustomFrm.as_problem_custom_id);
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs = pageVariable.customprodList.dataSource.items.arrValues;

    pageVariable.sellstsolutionCtrl.setLstSolution(null);
    $("#txtEstimatedShipTime").attr("maxavaitime", null);
    $("#txtExpCost").val("0.00");
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.LstSolution_Id = 0;

    pageVariable.delelteCustomFrm.close();
}
/* 清理处理控件 */
function initHandleCtrl() {
    $("#txtHandleRemark").val("");
    $("#txtRefund, #txtExpCost").val("0.00");
    $("#txtExpWeight").val("0.000");
    $("#txtLength, #txtWidth, #txtHeight").val("10");
    pageVariable.sellstsolutionCtrl.setLstSolution(null);
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.LstSolution_Id = 0;

    var m_now = new Date();
    m_now.setDate(m_now.getDate() + 2);
    m_year = m_now.getFullYear();
    m_month = Number(m_now.getMonth()) + 1;
    var m_shiptimeCtrl = $("#txtEstimatedShipTime");
    m_shiptimeCtrl.datepicker("setDate", m_year + "-" + m_month + "-" + m_now.getDate());
    m_shiptimeCtrl.attr("maxavaitime", null);
    $("#txtEstimatedArriveTime").val("");

    pageVariable.customprodList.bindDataSource(null);
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs = [];
    pageVariable.selectWH.clear();
}
/* 打开新增售后问题窗体 */
function openNewASProblemFrm() {

    initHandlerASProblumFrm();

    pageVariable.selCustomer.setCust(null);

    $("#txtASPRemark").val("");
    var m_saleoderCtrl = $("#txtSaleOrder");
    m_saleoderCtrl.attr("tag", null);
    m_saleoderCtrl.val("");
    pageVariable.asprodList.bindDataSource(null);
    $("#lbExpAddress").text("");
    $("#lbExpAddress").attr("tag", "");

    $("#dvAsprodList").show();
    $("#dvAsprodList_1").hide();
    $("#dvHandleType").show();

    pageVariable.handlerAfterSaleFrm.AS_Problem = {};
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService = {};
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs = [];
    pageVariable.handlerAfterSaleFrm.saleorder = null;
    pageVariable.customprodList.bindDataSource(null);

    initHandleCtrl();

    var m_custCtrl = $("#selCustomer");
    m_custCtrl.find("input").attr('disabled', false);
    m_custCtrl.find("img").show();

    $("#txtSaleOrder, #ddlASPType").attr('disabled', false);
    $("#btSelSaleOrder").show();
    $("#lbASProblemSymbol").trigger("click");
    $("#ddlASPType").trigger("change");

    $("#lbASProblemSymbol").trigger("click");

    pageVariable.asproblem_action = "newproblem";
    pageVariable.handlerAfterSaleFrm.setTitle(mlm.C0461 + mlm.C1392);
    pageVariable.handlerAfterSaleFrm.show();
}
/* 打开修改售后问题窗体 */
function openModifyASProblemFrm(key) {

    pageVariable.asproblem_action = "modifyproblem";
    constructModifyASPFrm(key);
    pageVariable.handlerAfterSaleFrm.setTitle(mlm.C0061 + mlm.C1392);
}
/*  */
function constructModifyASPFrm(key) {
    initHandlerASProblumFrm();

    pageVariable.asprodList.bindDataSource(null);
    $("#lbExpAddress").text("");
    $("#lbExpAddress").attr("tag", "");

    pageVariable.handlerAfterSaleFrm.AS_Problem = {};
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService = {};
    pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs = [];
    pageVariable.handlerAfterSaleFrm.saleorder = null;

    initHandleCtrl();

    var m_as_problem = new sm.as_problem();
    m_as_problem.AS_Problem_Id = key;
    m_as_problem.readASProblemForModify(function (retObj) {

        pageVariable.handlerAfterSaleFrm.saleorder = retObj;
        pageVariable.selCustomer.setCust({ Customer_Id: retObj.Customer_Id, CustName: retObj.OtherProps.CustName });

        var m_saleoderCtrl = $("#txtSaleOrder");
        m_saleoderCtrl.attr("tag", retObj.SaleOrder_Id);
        m_saleoderCtrl.val(retObj.SOCode);

        var m_asptypeCtrl = $("#ddlASPType");
        m_asptypeCtrl.val(retObj.ProblemType);
        m_asptypeCtrl.trigger("change");

        $("#txtASPRemark").val(retObj.ProblemRemark);

        var m_custreturn = [];
        m_custreturn.push({ key: retObj.CustReturn });
        pageVariable.custreturnCtrl.setSelectedItem(m_custreturn);

        pageVariable.handlertypeCtrl.val(retObj.HandleType);
        pageVariable.handlertypeCtrl.trigger("change");

        $("#txtRefund").val(Number(retObj.Refund).toFixed(2));
        $("#lbRefundCurr").text(retObj.OtherProps.CurrCode);
        $("#txtHandleRemark").val(retObj.HandleRemark);

        if (retObj.ExpService) {
            var m_addressArr = [];
            m_addressArr.push(retObj.ExpService.RvFullName);
            if (retObj.ExpService.RvAddress_1) {
                m_addressArr.push(retObj.ExpService.RvAddress_1);
            }
            if (retObj.ExpService.RvAddress_2) {
                m_addressArr.push(retObj.ExpService.RvAddress_2);
            }
            if (retObj.ExpService.RvCity) {
                m_addressArr.push(retObj.ExpService.RvCity);
            }
            if (retObj.ExpService.RvProvince) {
                m_addressArr.push(retObj.ExpService.RvProvince);
            }
            if (retObj.ExpService.RvPostCode) {
                m_addressArr.push(retObj.ExpService.RvPostCode);
            }
            m_addressArr.push(retObj.ExpService.OtherProps.GlobalAreaName);

            if (retObj.OtherProps.RvAddressCount > 1) {
                $("#btChangeAddress").show();
            }
            else {
                $("#btChangeAddress").hide();
            }

            retObj.ExpService.GlobalAreaName = retObj.ExpService.OtherProps.GlobalAreaName;
            $("#lbExpAddress").text(commoncore.func.showSpecialChar(m_addressArr.join(", ")));
            $("#lbExpAddress").attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(retObj.ExpService)));

            $("#txtExpWeight").val(retObj.ExpService.Weight);
            $("#txtLength").val(retObj.ExpService.Length);
            $("#txtWidth").val(retObj.ExpService.Width);
            $("#txtHeight").val(retObj.ExpService.Height);
            $("#txtExpCost").val(retObj.ExpService.ExpServiceCost);
            var m_shiptimeCtrl = $("#txtEstimatedShipTime");
            m_shiptimeCtrl.val(datastruct.convertion.convertToDateStr(retObj.ExpService.OtherProps.EstimatedShipTimeStr));
            m_shiptimeCtrl.attr("maxavaitime", retObj.ExpService.OtherProps.MaxAvaiTime);
            $("#txtEstimatedArriveTime").val(datastruct.convertion.convertToDateStr(retObj.ExpService.OtherProps.EstimatedArriveTimeStr));

            var m_warehouse = {};
            m_warehouse.Warehouse_Id = retObj.ExpService.Warehouse_Id;
            m_warehouse.WarehouseName = retObj.ExpService.OtherProps.WarehouseName;
            m_warehouse.AreaIndexs = retObj.ExpService.OtherProps.WH_AreaIndexs;
            m_warehouse.GlobalArea_Id = retObj.ExpService.OtherProps.WH_GlobalArea_Id;
            pageVariable.selectWH.setWarehouse(m_warehouse);

            pageVariable.sellstsolutionCtrl.setLstSolution({ LstSolution_Id: retObj.ExpService.LstSolution_Id, LstSolutionName: retObj.ExpService.LstSolutionName });

            if (retObj.ExpService.Customs) {
                $.each(retObj.ExpService.Customs, function () {
                    if (this.OtherProps.GlobalAreaName) {
                        this.GlobalAreaName = this.OtherProps.GlobalAreaName;
                    }
                    else {
                        this.GlobalAreaName = "";
                    }
                });
            }

            if (!m_warehouse.AreaIndexs || m_warehouse.AreaIndexs.indexOf("#" + retObj.ExpService.GlobalArea_Id + "#") > -1) {
                $("#dvCustom").hide();
                $("#dvCustom").removeClass("last-item");
                $("#dvCustom_0").addClass("last-item");
            }
            else {
                $("#dvCustom").show();
                $("#dvCustom").addClass("last-item");
                $("#dvCustom_0").removeClass("last-item");
            }

            pageVariable.customprodList.bindDataSource(retObj.ExpService.Customs);
        }

        pageVariable.handlerAfterSaleFrm.AS_Problem = retObj;
        if (!pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService) {
            pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService = {};
            pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs = [];
        }

        if (pageVariable.asproblem_action == "handle") {
            var m_custCtrl = $("#selCustomer");
            m_custCtrl.find("input").attr('disabled', true);
            m_custCtrl.find("img").hide();

            $("#txtSaleOrder, #ddlASPType").attr('disabled', true);
            $("#btSelSaleOrder, #spHandleType").hide();

            if (retObj.CustReturn == "1") {
                pageVariable.asprodList_1.bindDataSource(retObj.AvaiSOProdTable);
                $("#dvAsprodList_1").show();
                $("#dvAsprodList").hide();
            }
            else {
                pageVariable.asprodList.bindDataSource(retObj.AvaiSOProdTable);
                $("#dvAsprodList").show();
                $("#dvAsprodList_1").hide();
            }

            if (retObj.HandleType == "2") {
                $("#dvHandleType").hide();
            }
            else {
                $("#dvHandleType").show();
            }
        }
        else {
            var m_custCtrl = $("#selCustomer");
            m_custCtrl.find("input").attr('disabled', false);
            m_custCtrl.find("img").show();

            $("#txtSaleOrder, #ddlASPType").attr('disabled', false);
            $("#btSelSaleOrder").show();

            pageVariable.asprodList.bindDataSource(retObj.AvaiSOProdTable);
            $("#dvAsprodList").show();
            $("#dvAsprodList_1").hide();
            $("#dvHandleType").show();
        }
    });

    $("#lbASProblemSymbol").trigger("click");

    pageVariable.handlerAfterSaleFrm.show();
}
/* 打开删除售后问题窗体 */
function openDeleteASProblemFrm(key) {
    if (!pageVariable.delelteASProblemFrm) {
        pageVariable.delelteASProblemFrm = new uicontrol.confirmDelete(deleteASProblem);
    }

    pageVariable.delelteASProblemFrm.as_problem_id = key;
    var m_as_problem = pageVariable.aftersaleList.getItem(pageVariable.delelteASProblemFrm.as_problem_id);

    pageVariable.delelteASProblemFrm.showConfirm(mlm.C0464 + mlm.C1392 + "(" + m_as_problem.ASPCode + ") ?");
}
/* 保存售后问题 */
function saveASProblem() {

    var m_as_problem = new sm.as_problem();
    m_as_problem.ExpService = {};
    m_as_problem.AS_Problem_Id = pageVariable.handlerAfterSaleFrm.AS_Problem.AS_Problem_Id;

    m_as_problem.ProblemType = $("#ddlASPType").val();
    m_as_problem.ProblemRemark = $.trim($("#txtASPRemark").val());
    if (!m_as_problem.ProblemRemark) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1407 + mlm.C0713);
        return;
    }
    m_as_problem.Customer_Id = pageVariable.selCustomer.Customer_Id;
    if (!m_as_problem.Customer_Id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0719 + mlm.C0713);
        return;
    }
    var m_soCtrl = $("#txtSaleOrder");
    m_as_problem.SaleOrder_Id = m_soCtrl.attr("tag");
    if (!m_as_problem.SaleOrder_Id) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1435 + mlm.C0713);
        return;
    }

    if (pageVariable.handlerAfterSaleFrm.saleorder) {
        m_as_problem.SalePlatform_Id = pageVariable.handlerAfterSaleFrm.saleorder.SalePlatform_Id;
        m_as_problem.SaleSite_Id = pageVariable.handlerAfterSaleFrm.saleorder.SaleSite_Id;
    }

    m_as_problem.SOCode = m_soCtrl.val();
    if (m_as_problem.ProblemType == "1" || m_as_problem.ProblemType == "2" || m_as_problem.ProblemType == "5") {
        m_as_problem.CustReturn = pageVariable.custreturnCtrl.getSelectedItem()[0];
    }
    m_as_problem.HandleType = pageVariable.handlertypeCtrl.val();
    m_as_problem.HandleRemark = $("#txtHandleRemark").val();
    m_as_problem.SysCurrency_Id = pageVariable.handlerAfterSaleFrm.AS_Problem.SysCurrency_Id;

    m_as_problem.Products = [];
    if (m_as_problem.ProblemType != "6" && m_as_problem.ProblemType != "7") {

        var m_products = null;
        if (pageVariable.asproblem_action == "handle" && pageVariable.handlerAfterSaleFrm.saleorder.CustReturn == "1") {
            m_products = pageVariable.asprodList_1.dataSource.items.arrValues;
        }
        else {
            m_products = pageVariable.asprodList.dataSource.items.arrValues;
        }

        if (!m_products || m_products.length == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1413 + mlm.C0713);
            return;
        }

        var m_checkqty = 0;
        $.each(m_products, function () {
            var m_qty = Number(this.Qty);
            m_checkqty += m_qty;

            if (m_qty > 0) {
                m_as_problem.Products.push(this);
            }
        });
        if (m_checkqty == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1414 + mlm.C1351);
            return;
        }
    }

    if (m_as_problem.HandleType == "1") {
        m_as_problem.Refund = Number($("#txtRefund").val());
        if (m_as_problem.Refund == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1409 + mlm.C1351);
            return;
        }
    }
    else if (m_as_problem.HandleType == "2") {

        var m_expservice = pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService;

        m_as_problem.ExpService = {};
        m_as_problem.ExpService.AS_Problem_ExpService_Id = m_expservice.AS_Problem_ExpService_Id;

        m_as_problem.ExpService.EstimatedShipTime = $("#txtEstimatedShipTime").val();
        m_as_problem.ExpService.EstimatedArriveTime = $("#txtEstimatedArriveTime").val();
        m_as_problem.ExpService.Weight = $("#txtExpWeight").val();
        m_as_problem.ExpService.Length = $("#txtLength").val();
        m_as_problem.ExpService.Width = $("#txtWidth").val();
        m_as_problem.ExpService.Height = $("#txtHeight").val();

        if (m_as_problem.ExpService.Weight == "0") {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1301 + mlm.C1351);
            return;
        }
        if (Number(m_as_problem.ExpService.Length) * Number(m_as_problem.ExpService.Width) * Number(m_as_problem.ExpService.Height) == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1302 + mlm.C1351);
            return;
        }
        if (!pageVariable.selectWH.warehouse_id || pageVariable.selectWH.warehouse_id == "0") {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1274 + mlm.C0713);
            return;
        }
        if (!m_expservice.LstSolution_Id || m_expservice.LstSolution_Id == "0" + mlm.C1351) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0783 + mlm.C0713);
            return;
        }

        var m_createtime = null;
        if (m_as_problem.CreateTime) {
            m_createtime = datastruct.convertion.convertToDateByStr(m_as_problem.CreateTime);
        }
        else {
            m_createtime = commoncore.func.getNowTime();
        }
        if (m_as_problem.ExpService.EstimatedShipTime == "-1") {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1465);
            return;
        }
        if (!m_as_problem.ExpService.EstimatedShipTime) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1466 + mlm.C0713);
            return;
        }
        if (m_as_problem.ExpService.EstimatedArriveTime == "-1") {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1468);
            return;
        }
        if (!m_as_problem.ExpService.EstimatedArriveTime) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1467 + mlm.C0713);
            return;
        }

        var m_shiptime = datastruct.convertion.convertToDateByStr(m_as_problem.ExpService.EstimatedShipTime);
        var m_arrivetime = datastruct.convertion.convertToDateByStr(m_as_problem.ExpService.EstimatedArriveTime);

        if (m_shiptime > m_arrivetime) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1470);
            return;
        }
        if (m_createtime > m_shiptime) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1469);
            return;
        }

        var m_qty = 0;
        $.each(m_as_problem.Products, function () {
            m_qty += Number(this.Qty);
        });
        if (m_qty == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1417 + mlm.C1351);
            return;
        }

        m_as_problem.ExpService.LstSolution_Id = m_expservice.LstSolution_Id;
        m_as_problem.ExpService.LstCompanyName = m_expservice.LstCompanyName;
        m_as_problem.ExpService.LstSolutionName = m_expservice.LstSolutionName;
        m_as_problem.ExpService.IsTrack = m_expservice.IsTrack;
        m_as_problem.ExpService.ExpServiceCost = $("#txtExpCost").val();
        m_as_problem.ExpService.RvFullName = m_expservice.RvFullName;
        m_as_problem.ExpService.RvTel = m_expservice.RvTel;
        m_as_problem.ExpService.GlobalArea_Id = m_expservice.GlobalArea_Id;
        m_as_problem.ExpService.RvProvince = m_expservice.RvProvince;
        m_as_problem.ExpService.RvCity = m_expservice.RvCity;
        m_as_problem.ExpService.RvPostCode = m_expservice.RvPostCode;
        m_as_problem.ExpService.RvAddress_1 = m_expservice.RvAddress_1;
        m_as_problem.ExpService.RvAddress_2 = m_expservice.RvAddress_2;
        m_as_problem.ExpService.Warehouse_Id = pageVariable.selectWH.warehouse_id;

        m_as_problem.ExpService.Customs = pageVariable.handlerAfterSaleFrm.AS_Problem.ExpService.Customs;
    }

    if (pageVariable.asproblem_action == "newproblem") {
        m_as_problem.newAS_Problem(function (retTable) {

            var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
            pageVariable.aftersaleList.addData(m_jsonobj.AS_Problem_Id, m_jsonobj);

            loadASPState();
            pageVariable.handlerAfterSaleFrm.close();
        });
    }
    else {
        m_as_problem.modifyAS_Problem(function (retTable) {

            var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
            pageVariable.aftersaleList.modifyData(m_jsonobj.AS_Problem_Id, m_jsonobj);

            pageVariable.handlerAfterSaleFrm.close();
        });
    }
}
/* 删除售后问题 */
function deleteASProblem() {
    var m_as_problem = new sm.as_problem();

    m_as_problem.AS_Problem_Id = pageVariable.delelteASProblemFrm.as_problem_id;
    m_as_problem.deleteAS_Problem(function () {

        pageVariable.aftersaleList.deleteData(m_as_problem.AS_Problem_Id);

        loadASPState();
        pageVariable.delelteASProblemFrm.close();
    });
}

/* 打开生效的窗体 */
function openSubmitSOFrm(key) {
    if (!pageVariable.handlerSubmitASPFrm) {
        pageVariable.handlerSubmitASPFrm = new uicontrol.dialog("handlerSubmitASPFrm", mlm.C1471, { width: 800 }, submitASP);
    }

    var m_as_problem = pageVariable.aftersaleList.getItem(key);

    $("#lbSubmitASPSymbol").text(mlm.C1472 + "(" + m_as_problem.ASPCode + ")," + mlm.C1473);

    pageVariable.handlerSubmitASPFrm.as_problem_id = key;
    pageVariable.handlerSubmitASPFrm.show()
}
/* 生效处理 */
function submitASP() {

    var m_as_problem = new sm.as_problem();
    m_as_problem.AS_Problem_Id = pageVariable.handlerSubmitASPFrm.as_problem_id;
    m_as_problem.submitASProblem(function (retTable) {

        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.aftersaleList.modifyData(m_jsonobj.AS_Problem_Id, m_jsonobj);

        loadASPState();
        pageVariable.handlerSubmitASPFrm.close();
    });
}

/* 打开处理售后问题窗体 */
function openHandleSProblemFrm(key) {

    pageVariable.asproblem_action = "handle";
    constructModifyASPFrm(key);
    pageVariable.handlerAfterSaleFrm.setTitle(mlm.C1452 + mlm.C1392);
}

/* 打开关闭问题的窗体 */
function openCloseASP(key) {
    if (!pageVariable.handlerCloseASPFrm) {
        pageVariable.handlerCloseASPFrm = new uicontrol.dialog("handlerCloseASPFrm", mlm.C1481, { width: 800 }, closeASP);
    }

    var m_as_problem = pageVariable.aftersaleList.getItem(key);

    $("#txtCloseRemark").val("");
    $("#lbCloseASPSymbol").text(mlm.C1482 + "(" + m_as_problem.ASPCode + ")");

    pageVariable.handlerCloseASPFrm.as_problem_id = key;
    pageVariable.handlerCloseASPFrm.show()
}
/* 关闭问题 */
function closeASP() {

    var m_as_problem = new sm.as_problem();
    m_as_problem.HandleRemark = $.trim($("#txtCloseRemark").val());
    if (!m_as_problem.HandleRemark) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1410 + mlm.C0713);
        return;
    }
    m_as_problem.AS_Problem_Id = pageVariable.handlerCloseASPFrm.as_problem_id;
    m_as_problem.closeASProblem(function (retTable) {

        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.aftersaleList.modifyData(m_jsonobj.AS_Problem_Id, m_jsonobj);

        loadASPState();
        pageVariable.handlerCloseASPFrm.close();
    });
}

/* 打开退件丢失的窗体 */
function openLoseRet(key) {
    if (!pageVariable.handlerLoseRetFrm) {
        pageVariable.handlerLoseRetFrm = new uicontrol.dialog("handlerLoseRetFrm", mlm.C1446, { width: 800 }, loseRet);
    }

    var m_as_problem = pageVariable.aftersaleList.getItem(key);

    $("#lbLoseRetSymbol").text(mlm.C1483 + "(" + m_as_problem.ASPCode + ")" + mlm.C1484);

    pageVariable.handlerLoseRetFrm.as_problem_id = key;
    pageVariable.handlerLoseRetFrm.show()
}
/* 退件丢失 */
function loseRet() {

    var m_as_problem = new sm.as_problem();
    m_as_problem.AS_Problem_Id = pageVariable.handlerLoseRetFrm.as_problem_id;
    m_as_problem.loseReceiveRet(function (retTable) {

        var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];
        pageVariable.aftersaleList.modifyData(m_jsonobj.AS_Problem_Id, m_jsonobj);

        loadASPState();
        pageVariable.handlerLoseRetFrm.close();
    });
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
/* 查看财务支出 */
function viewAccountOut(key) {
    if (!pageVariable.viewAccountOutFrm) {
        pageVariable.viewAccountOutFrm = new bizcontrol.viewaccountoutrecord();
    }
    pageVariable.viewAccountOutFrm.show(key);
}
/* 查看配送单 */
function viewExpressOrder(key) {
    if (!pageVariable.viewExpressOrderFrm) {
        pageVariable.viewExpressOrderFrm = new bizcontrol.viewexpressorder();
    }
    pageVariable.viewExpressOrderFrm.show(key);
}
/* 查看售后问题 */
function viewASProblem(key) {
    if (!pageVariable.viewASProblemFrm) {
        pageVariable.viewASProblemFrm = new bizcontrol.viewasproblem();
    }
    pageVariable.viewASProblemFrm.show(key);
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

/* 填充语言资源 */
function fillPageLanRes() {

    /* ECMS-售后问题 */
    document.title = "ECMS-" + mlm.C1273;
    
    /* 售后问题 */
    $("#lbAfterSale, #lbASProblemSymbol").text(mlm.C1392);
    /* 售后问题列表 */
    $("#lbAfterSaleTitle").text(mlm.C1392 + mlm.C0463);
    /* 待生效 */
    $("#btWaitSubmit").val(mlm.C1430);
    /* 待客户退件 */
    $("#btWaitReceiveRet").val(mlm.C1431);
    /* 处理中 */
    $("#btHandling").val(mlm.C1432);
    /* 查询问题 */
    $("#btQueryASP").val(mlm.C0562 + mlm.C1433);
    /* 新增问题 */
    $("#btNewASProblem").val(mlm.C0461 + mlm.C1433);
    /* 补发货处理 */
    $("#lbASPHandlerSymbol").text(mlm.C1428);
    /* 客户 */
    $("#lbCustomerSymbol").text(mlm.C0719 + ":");
    /* 客户订单 */
    $("#lbSaleOrderSymbol").text(mlm.C1435 + ":");
    /* 必填 */
    $("#lb_alert_1, #lb_alert_2").text(mlm.C0049);
    /* 售后问题 */
    $("#lbASPTypeSymbol, #lbQASPTypeSymbol").text(mlm.C1556 + ":");
    /* 客户退件 */
    $("#lbCustReturnSymbol").text(mlm.C1405 + ":");
    /* 问题描述 */
    $("#lbASPRemark").text(mlm.C1407 + ":");
    /* 产品列表 */
    $("#lbASProdTitle").text(mlm.C1264 + mlm.C0463);
    /* 处理选项 */
    $("#lbHandlerTypeSymbol").text(mlm.C1408 + ":");
    /* 退款金额 */
    $("#lbRefundSymbol").text(mlm.C1409 + ":");
    /* 发货地址 */
    $("#lbExpAddressSymbol").text(mlm.C1300 + ":");
    /* 设置地址 */
    $("#btChangeAddress").text("(" + mlm.C1436 + ")");
    /* 包裹重量 */
    $("#lbExpWeightSymbol").text(mlm.C1301 + ":");
    /* 包裹体积 */
    $("#lbVolumnSymbol").text(mlm.C1302 + "(cm³):");
    /* 物流方案 */
    $("#lbLstSolutionSymbol").text(mlm.C0783 + ":");
    /* 物流成本 */
    $("#lbExpCost").text(mlm.C1375 + ":");
    /* 预计发货日期 */
    $("#lbEstimatedShipTimeSymbol").text(mlm.C1304 + mlm.C1303 + ":");
    /* 预计到货日期 */
    $("#lbEstimatedArriveTimeSymbol").text(mlm.C1304 + mlm.C1305 + ":");
    /* 配送中心 */
    $("#lbWHSymbol").text(mlm.C1274 + ":");
    /* 处理说明 */
    $("#lbHandleRemarkSymbol, #lbCloseRemarkSymbol").text(mlm.C1410 + ":");
    /* 报关清单 */
    $("#lbCustomTitle").text(mlm.C1376);
    /* 添加报关产品 */
    $("#btAddCustomProd").val(mlm.C0530 + mlm.C1307);
    /* 客户订单列表 */
    $("#lbSOTitle").text(mlm.C1435 + mlm.C0463);
    /* 地址列表 */
    $("#lbRvAddressTitle").text(mlm.C1437 + mlm.C0463);
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
    /* 产品签收列表 */
    $("#lbReceiveRetTitle").text(mlm.C1438 + mlm.C0463);
    /* 客户关键字 */
    $("#lbQCustKeySymbol").text(mlm.C1439 + ":");
    /* 售后问题号 */
    $("#lbQASPCodeSymbol").text(mlm.C1546 + ":");
    /* 站点 */
    $("#lbQSaleSiteSymbol").text(mlm.C0416 + ":");
    /* 客户订单 */
    $("#lbQSOCodeSymbol").text(mlm.C1435 + ":");
    /* 状态 */
    $("#lbQASPStateSymbol").text(mlm.C0367 + ":");

    /* 报关名称(中文) */
    $("#lbCustomProdName_CNSymbol").text(mlm.C1621);
}