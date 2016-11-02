(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----售后问题查看控件----- 
    */
    bizcontrol.viewasproblem = function () {
        var obj = new bizcontrol.viewasproblem.fn.init();
        return obj;
    };
    bizcontrol.viewasproblem.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewASProblemFrm' style='display: none;'></div>");

            this.asproblemTab = $("<div id='viewASPTabs'></div>");
            var m_ulCtrl = $("<ul></ul>");
            this.lkViewASProblem = $("<a href='#viewASProblem'>" + mlm.C1392 + "</a>");
            var m_liASPCtrl = $("<li></li>");
            m_liASPCtrl.append(this.lkViewASProblem);
            this.liExpService = $("<li><a href='#viewASPExpService'>" + mlm.C1486 + "</a></li>");
            this.liHandleFinance = $("<li><a href='#viewASPHandleFinance'>" + mlm.C1488 + "</a></li>");
            this.liHandleExp = $("<li><a href='#viewASPHandleExp'>" + mlm.C1428 + "</a></li>");
            m_ulCtrl.append(m_liASPCtrl);
            m_ulCtrl.append(this.liExpService);
            m_ulCtrl.append(this.liHandleFinance);
            m_ulCtrl.append(this.liHandleExp);
            this.asproblemTab.append(m_ulCtrl);

            var m_asproblemContainer = $("<div id='viewASProblem'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-b'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C1546 + ":</span>");
            this.lbVASPCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVASPCode);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1556 + ":</span>");
            this.lbVProblemType = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVProblemType);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            var m_trContainer = $("<div class='submitForm-tr'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C0719 + ":</span>");
            this.lbVCustName = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVCustName);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1404 + ":</span>");
            this.lbVSOCode = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOCode);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1406 + ":</span>");
            this.lbVCreateTime = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVCreateTime);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1405 + ":</span>");
            this.lbVCustReturn = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVCustReturn);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1407 + ":</span>");
            this.lbVProblemRemark = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVProblemRemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            this.trProduct = $("<div class='submitForm-tr'></div>");
            var m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1264 + mlm.C0463 + "</span>"));
            this.dvVASPList = $("<div></div>");
            this.dvVASPList.append("<table id='vaspproductList'></table>");
            this.trProduct.append(m_title);
            this.trProduct.append(this.dvVASPList);
            m_tableContainer.append(this.trProduct);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1408 + ":</span>");
            this.lbVHandleOption = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVHandleOption);
            this.dvRefund = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1409 + ":</span>");
            this.lbVRefund = $("<span></span>");
            this.dvRefund.append(m_lbSymbol);
            this.dvRefund.append(this.lbVRefund);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(this.dvRefund);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr last-item'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1410 + ":</span>");
            this.lbVHandleRemark = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVHandleRemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_asproblemContainer.append(m_tableContainer);

            var m_asphandleContainer = $("<div id='viewASPExpService'></div>");
            this.dvVASPHandle_1 = $("<div class='submitForm form-width-b'></div>");

            this.dvVASPExpress = $("<div></div>");
            m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1300 + ":</span>");
            this.lbVShipAddress = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVShipAddress);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1301 + ":</span>");
            this.lbVASPWeight = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVASPWeight);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1302 + "(cm³)" + ":</span>");
            this.lbVASPVolumn = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVASPVolumn);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0783 + ":</span>");
            this.lbVASPLstSolution = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVASPLstSolution);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1375 + ":</span>");
            this.lbVASPExpCost = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVASPExpCost);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1304 + mlm.C1303 + ":</span>");
            this.lbVASPEstimateShip = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVASPEstimateShip);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1304 + mlm.C1305 + ":</span>");
            this.lbVASPEstimateArrive = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVASPEstimateArrive);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1274 + ":</span>");
            this.lbVASPWarehouse = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVASPWarehouse);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            this.dvVCustom = $("<div class='submitForm-tr'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1376 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='customvList'></table>");
            this.dvVCustom.append(m_title);
            this.dvVCustom.append(m_list);
            this.dvVASPExpress.append(this.dvVCustom);
            this.dvVASPHandle_1.append(this.dvVASPExpress);

            m_asphandleContainer.append(this.dvVASPHandle_1);

            var m_eohandleContainer = $("<div id='viewASPHandleExp'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1278 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vaspexpressorderList'></table>");
            m_eohandleContainer.append(m_title);
            m_eohandleContainer.append(m_list);

            var m_aspfinancehandleContainer = $("<div id='viewASPHandleFinance'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0880 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vaspfinanceList'></table>");
            m_aspfinancehandleContainer.append(m_title);
            m_aspfinancehandleContainer.append(m_list);
            m_title = $("<div style='height: 30px; margin: 10px 0px 0px 0px'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0972 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vaspmoneyList'></table>");
            m_aspfinancehandleContainer.append(m_title);
            m_aspfinancehandleContainer.append(m_list);

            this.asproblemTab.append(m_asproblemContainer);
            this.asproblemTab.append(m_asphandleContainer);
            this.asproblemTab.append(m_eohandleContainer);
            this.asproblemTab.append(m_aspfinancehandleContainer);

            this.ctrl.append(this.asproblemTab);
        },

        /* 展示配送服务 */
        show: function (as_problem_id) {
            var thisObj = this;

            if (!this.viewASPFrm) {
                this.viewASPFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1392, { width: 1025, position: ["auto", 15] });

                this.vaspproductList = new uicontrol.tableList("vaspproductList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SkuProduct_Id",
                                         height: 70,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructProdPicCell },
                                                   { display: mlm.C1413, name: "", width: 400, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructProdCell },
                                                   { display: mlm.C1414, name: "Qty", width: 60, align: 'right' },
                                                   { display: mlm.C1415, name: "ReceiveRetQty", width: 60, align: 'right'}]
                                     });

                this.customvList = new uicontrol.tableList("customvList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "EO_Custom_Id",
                                         height: 40,
                                         columns: [{ display: mlm.C1307, name: "CustomProdName", width: 150, align: 'left' },
                                                { display: mlm.C1307, name: "CustomProdName_CN", width: 150, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 60, align: 'right' },
                                                { display: mlm.C1310, name: "CustomValue", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 90, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 100, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 80, align: 'left'}]
                                     });

                this.vaspexpressorderList = new uicontrol.tableList("vaspexpressorderList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ExpressOrder_Id",
                                        columns: [{ display: mlm.C1316, name: "EOCode", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructEOCodeCell },
                                                   { display: mlm.C0783, name: "", width: 210, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructLstSolutionCell },
                                                   { display: mlm.C1274, name: "WarehouseName", width: 120, align: 'left' },
                                                   { display: mlm.C1303, name: "", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructEOShipTimeCell },
                                                   { display: mlm.C1305, name: "", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructEOArriveTimeCell },
                                                   { display: mlm.C0367, name: "EOState", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructEOStateCell}]
                                    });

                this.vaspfinanceList = new uicontrol.tableList("vaspfinanceList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FKey",
                                        columns: [{ display: mlm.C0751, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFCodeCell },
                                                  { display: mlm.C1495, name: "", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFTypeCell },
                                                  { display: mlm.C0750, name: "OperateTimeStr", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0722, name: "FTotalMoney", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createFMoneyCell },
                                                  { display: mlm.C0500, name: "State", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFStateCell}]
                                    });

                this.vaspmoneyList = new uicontrol.tableList("vaspmoneyList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FundFlowRecord_Id",
                                        columns: [{ display: mlm.C0724, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0511, name: "AccountOutRecord_Id", width: 60, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFlowActionCell },
                                                  { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                  { display: mlm.C0513, name: "FlowFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createFMoneyCell },
                                                  { display: mlm.C0514, name: "LosedFund", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createFMoneyCell },
                                                  { display: mlm.C0132, name: "Rate", width: 50, align: 'right' },
                                                  { display: mlm.C0751, name: "", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFundRelCodeCell },
                                                  { display: mlm.C0518, name: "PRFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createFundAORCell}]
                                    });

                this.asproblemTab.tabs();
            }

            var m_as_problem = new sm.as_problem();
            m_as_problem.AS_Problem_Id = as_problem_id;
            m_as_problem.readASProblem(function (retObj) {

                thisObj.lbVCustName.html("<a onclick='openViewCustFrm.call(this, \"" + retObj.Customer_Id + "\")' href='javascript:void(\"0\");'>" + retObj.OtherProps.CustName + "</a>");
                thisObj.lbVSOCode.html("<a onclick='viewSaleOrder.call(this, \"" + retObj.SaleOrder_Id + "\")' href='javascript:void(\"0\");'>" + retObj.SOCode + "</a>");

                if (retObj.ProblemType == "1") {
                    thisObj.lbVProblemType.text(mlm.C1418);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "2") {
                    thisObj.lbVProblemType.text(mlm.C1419);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "3") {
                    thisObj.lbVProblemType.text(mlm.C1420);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "4") {
                    thisObj.lbVProblemType.text(mlm.C1421);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "5") {
                    thisObj.lbVProblemType.text(mlm.C1559);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "6") {
                    thisObj.lbVProblemType.text(mlm.C1560);
                    thisObj.trProduct.hide();
                }
                else {
                    thisObj.lbVProblemType.text(mlm.C1421);
                    thisObj.trProduct.hide();
                }

                if (retObj.CustReturn == "1") {
                    thisObj.lbVCustReturn.text(mlm.C1422);
                }
                else {
                    thisObj.lbVCustReturn.text(mlm.C1423);
                }

                thisObj.lbVCreateTime.text(commoncore.func.getTimeStrCell(retObj.OtherProps.CreateTimeStr));

                var m_aspstr = retObj.ASPCode;
                if (retObj.State == "0") {
                    m_aspstr += " (" + mlm.C1424 + ")";
                }
                else if (retObj.State == "10") {
                    m_aspstr += " (" + mlm.C1425 + ")";
                }
                else if (retObj.State == "20") {
                    m_aspstr += " (" + mlm.C1557 + ")";
                }
                thisObj.lbVASPCode.text(m_aspstr);

                thisObj.lbVProblemRemark.text(retObj.ProblemRemark);

                $.each(retObj.Products, function () {
                    this.BrowsePicUrl = this.OtherProps.BrowsePicUrl;
                });
                thisObj.vaspproductList.bindDataSource(retObj.Products);

                thisObj.lbVHandleRemark.text(retObj.HandleRemark);

                if (retObj.HandleType == "1") {
                    thisObj.lbVHandleOption.text(mlm.C1427);
                    thisObj.dvRefund.show();
                    thisObj.lbVRefund.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.Refund));
                    thisObj.liExpService.hide();

                    thisObj.liHandleFinance.show();
                    thisObj.liHandleExp.hide();

                    var m_financerecords = datastruct.convertion.strToObject(retObj.OtherProps.FinanceRecords);
                    var m_fkey = 1;
                    $.each(m_financerecords, function () {
                        this.FKey = m_fkey;
                        m_fkey++;
                    });
                    thisObj.vaspfinanceList.bindDataSource(m_financerecords);

                    var m_fundflowrecords = datastruct.convertion.strToObject(retObj.OtherProps.FundFlowRecords);
                    thisObj.vaspmoneyList.bindDataSource(m_fundflowrecords);

                }
                else if (retObj.HandleType == "2") {

                    thisObj.lbVHandleOption.text(mlm.C1428);
                    thisObj.dvRefund.hide();
                    thisObj.liExpService.show();

                    thisObj.liHandleFinance.hide();
                    thisObj.liHandleExp.show();

                    var m_addressArr = [];
                    if (retObj.OtherProps.GlobalAreaName == "中国") {
                        m_addressArr.push(retObj.ExpService.RvFullName + ",");

                        if (retObj.ExpService.RvProvince) {
                            m_addressArr.push(retObj.ExpService.RvProvince);
                        }

                        if (retObj.ExpService.RvCity) {
                            m_addressArr.push(retObj.ExpService.RvCity);
                        }

                        if (retObj.ExpService.RvAddress_1) {
                            m_addressArr.push(retObj.ExpService.RvAddress_1);
                        }
                        if (retObj.ExpService.RvAddress_2) {
                            m_addressArr.push(retObj.ExpService.RvAddress_2);
                        }

                        if (retObj.ExpService.RvPostCode) {
                            m_addressArr.push("(" + retObj.ExpService.RvPostCode + ")");
                        }

                        thisObj.lbVShipAddress.text(commoncore.func.showSpecialChar(m_addressArr.join(" ")));
                    }
                    else {
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

                        thisObj.lbVShipAddress.text(commoncore.func.showSpecialChar(m_addressArr.join(", ")));
                    }

                    retObj.ExpService.GlobalAreaName = retObj.ExpService.OtherProps.GlobalAreaName;
                    thisObj.lbVShipAddress.attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(retObj.ExpService)));

                    thisObj.lbVASPWeight.text(Number(retObj.ExpService.Weight).toFixed(3) + " " + keycontext.keyparam.WUnit);
                    thisObj.lbVASPVolumn.text(retObj.ExpService.Length + "*" + retObj.ExpService.Width + "*" + retObj.ExpService.Height);
                    thisObj.lbVASPLstSolution.text(retObj.ExpService.LstSolutionName + "(" + retObj.ExpService.LstCompanyName + ")");
                    thisObj.lbVASPExpCost.html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, retObj.ExpService.ExpServiceCost));
                    thisObj.lbVASPEstimateShip.html(commoncore.func.getTimeStrCell(retObj.ExpService.OtherProps.EstimatedShipTimeStr));
                    thisObj.lbVASPEstimateArrive.html(commoncore.func.getTimeStrCell(retObj.ExpService.OtherProps.EstimatedArriveTimeStr));
                    thisObj.lbVASPWarehouse.text(retObj.ExpService.OtherProps.WarehouseName);

                    if (retObj.ExpService.OtherProps.WH_AreaIndexs && retObj.ExpService.OtherProps.WH_AreaIndexs.indexOf("#" + retObj.ExpService.GlobalArea_Id + "#") > -1) {
                        thisObj.dvVCustom.hide();
                        thisObj.customvList.bindDataSource(null);
                    }
                    else {
                        thisObj.dvVCustom.show();
                        $.each(retObj.ExpService.Customs, function () {
                            if (this.OtherProps.GlobalAreaName) {
                                this.GlobalAreaName = this.OtherProps.GlobalAreaName;
                            }
                            else {
                                this.GlobalAreaName = "";
                            }
                        });
                        thisObj.customvList.bindDataSource(retObj.ExpService.Customs);
                    }

                    var m_expressorders = datastruct.convertion.strToObject(retObj.OtherProps.ExpressOrders);
                    thisObj.vaspexpressorderList.bindDataSource(m_expressorders);
                }
                else {
                    thisObj.lbVHandleOption.text(mlm.C0627);
                    thisObj.dvRefund.hide();
                    thisObj.liExpService.hide();

                    if (retObj.ProblemType == "7") {
                        thisObj.liHandleFinance.hide();
                    }
                    else {
                        thisObj.liHandleFinance.show();
                    }

                    thisObj.liHandleExp.hide();
                }
            });

            thisObj.viewASPFrm.show();

            thisObj.lkViewASProblem.trigger("click");
        },

        /*  */
        _constructProdPicCell: function (key, cellValue) {
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
        },
        /*  */
        _constructProdCell: function (key, cellValue) {
            var m_arr = [];
            if (this.keyObj.Type == "2") {
                m_arr.push("<a style='color: #666666' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>");
                m_arr.push(" (<span style='color: #666666'>" + mlm.C1061 + "</span>)");
            }
            else {
                m_arr.push("<a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructAORCodeCell: function (key, cellValue) {
            return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.AccountOutRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.AORCode + "</a>";
        },
        /*  */
        _createCustomValueCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(keycontext.keyparam.tax_syscurrsymbol, cellValue);
        },
        /*  */
        _constructEOCodeCell: function (key, cellValue) {
            return "<a onclick='viewExpressOrder.call(this, \"" + this.keyObj.ExpressOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.EOCode + "</a>";
        },
        /*  */
        _constructLstSolutionCell: function (key, cellValue) {
            return "<a onclick='openViewLstSolution.call(this, \"" + this.keyObj.LstSolution_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.LstSolutionName + "(" + this.keyObj.LstCompanyName + ")" + "</a>";
        },
        /*  */
        _constructEOShipTimeCell: function (key, cellValue) {
            var m_arr = [];

            if (this.keyObj.ShipTimeStr) {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.ShipTimeStr) + "</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.EstimatedShipTimeStr) + "</div>");
                m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>(" + mlm.C1324 + ")</div>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructEOArriveTimeCell: function (key, cellValue) {
            if (this.keyObj.EOState == "30" || this.keyObj.EOState == "40") {
                return "";
            }

            var m_arr = [];

            if (this.keyObj.ArriveTimeStr) {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.ArriveTimeStr) + "</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.EstimatedArriveTimeStr) + "</div>");
                m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>(" + mlm.C1326 + ")</div>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructFCodeCell: function (key, cellValue) {
            if (this.keyObj.FBType == "2") {
                return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.FRId + "\")' href='javascript:void(\"0\");'>" + this.keyObj.FCode + "</a>";
            }
            else {
                return "<a onclick='viewReceiveIn.call(this, \"" + this.keyObj.FRId + "\")' href='javascript:void(\"0\");'>" + this.keyObj.FCode + "</a>";
            }
        },
        /*  */
        _constructFTypeCell: function (key, cellValue) {
            if (this.keyObj.FBType == "1") {
                var m_type = "";
                if (this.keyObj.FType == "1") {
                    m_type = mlm.C0506;
                }
                else if (this.keyObj.FType == "3") {
                    m_type = mlm.C0854;
                }
                else if (this.keyObj.FType == "4") {
                    m_type = mlm.C0855;
                }
                else if (this.keyObj.FType == "5") {
                    m_type = mlm.C0627;
                }
                else if (this.keyObj.FType == "10") {
                    m_type = mlm.C0891;
                }

                return mlm.C1499 + "(" + m_type + ")";
            }
            else {
                if (this.keyObj.CostSubjectName) {
                    return mlm.C1500 + "(" + this.keyObj.CostSubjectName + ")";
                }
                else {
                    return mlm.C1500;
                }

            }
        },
        /*  */
        _constructFOperateTimeCell: function (key, cellValue) {
            return commoncore.func.getTimeStrCell(cellValue);
        },
        /*  */
        _createFMoneyCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },
        /*  */
        _constructFStateCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            var m_arr = [];

            if (this.keyObj.FBType == "1") {
                if (cellValue == "1") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0508 + "</div>");
                }
                else if (cellValue == "2") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0509 + "</div>");

                    var m_freezeprfund = Number(m_obj.FreezePRFund);
                    if (m_freezeprfund > 0) {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0869 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_freezeprfund) + "</span>)</div>");
                    }
                    var m_unfund = Number((Number(m_obj.Receive) - Number(m_obj.ReceivedIn) - Number(m_obj.FreezePRFund)).toFixed(2));
                    if (m_unfund > 0) {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0870 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_unfund) + "</span>)</div>");
                    }
                }
                else if (cellValue == "3") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0539 + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
                }
            }
            else {

                if (cellValue == "1") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0490 + "</div>");
                }
                else if (cellValue == "2") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0491 + "</div>");
                    m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + mlm.C0868 + ": " + commoncore.func.getCurrHtml(m_obj.CurrSymbol, (Number(m_obj.Payout) - Number(m_obj.Paidout))) + ")</div>");
                }
                else if (cellValue == "3") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0492 + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
                }
            }

            return m_arr.join("");
        },
        /*  */
        _constructFlowActionCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            if (cellValue && cellValue != "0") {
                return mlm.C0541;
            }
            else {
                return mlm.C0542;
            }
        },
        /*  */
        _createVSORateCell: function (key, cellValue) {
            return Number(cellValue).toFixed(4);
        },
        /*  */
        _constructFundRelCodeCell: function (key, cellValue) {
            if (this.keyObj.AccountOutRecord_Id && this.keyObj.AccountOutRecord_Id != "0") {
                return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.AccountOutRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ObjCode + "</a>";
            }
            else {
                return "<a onclick='viewReceiveIn.call(this, \"" + this.keyObj.AccountInRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ObjCode + "</a>";
            }
        },
        /*  */
        _createFundAORCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
        },
        /*  */
        _constructEOStateCell: function (key, cellValue) {
            var m_arr = [];

            if (this.keyObj.EOState == "0") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1280 + "</div>");
            }
            else if (this.keyObj.EOState == "10") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1281 + "</div>");
            }
            else if (this.keyObj.EOState == "20") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1282 + "</div>");

                if (this.keyObj.IsTrack == "1") {
                    if (!this.keyObj.TrackingNumber) {
                        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666'>" + mlm.C1327 + "</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + this.keyObj.TrackingNumber + "</div>");
                    }
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
            }

            return m_arr.join("");
        }
    };

    bizcontrol.viewasproblem.fn.init.prototype = bizcontrol.viewasproblem.fn;

})(window);