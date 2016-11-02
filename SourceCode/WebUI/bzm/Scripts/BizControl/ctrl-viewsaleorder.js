(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----客户订单查看控件----- 
    */
    bizcontrol.viewsaleorder = function () {
        var obj = new bizcontrol.viewsaleorder.fn.init();
        return obj;
    };
    bizcontrol.viewsaleorder.fn = {

        _activedobj: null,

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewSaleOrderFrm' style='display: none;'></div>");

            this.viewSOTabs = $("<div id='viewSOTabs'></div>");
            var m_ulCtrl = $("<ul></ul>");
            var m_liCtrl_1 = $("<li><a href='#viewSOInfo'>" + mlm.C1485 + "</a></li>");
            var m_liCtrl_2 = $("<li><a href='#viewSExpInfo'>" + mlm.C1486 + "</a></li>");
            var m_liCtrl_3 = $("<li><a href='#viewSEOHandle'>" + mlm.C1487 + "</a></li>");
            var m_liCtrl_4 = $("<li><a href='#viewSFinanceHandle'>" + mlm.C1488 + "</a></li>");
            var m_liCtrl_5 = $("<li><a href='#viewSASPHandle'>" + mlm.C1489 + "</a></li>");
            var m_liCtrl_6 = $("<li><a href='#viewSProdHandle'>" + mlm.C1565 + "</a></li>");
            m_ulCtrl.append(m_liCtrl_1);
            m_ulCtrl.append(m_liCtrl_2);
            m_ulCtrl.append(m_liCtrl_3);
            m_ulCtrl.append(m_liCtrl_4);
            m_ulCtrl.append(m_liCtrl_5);
            m_ulCtrl.append(m_liCtrl_6);
            this.viewSOTabs.append(m_ulCtrl);

            var m_soinfoContainer = $("<div id='viewSOInfo'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-d'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C0938 + ":</span>");
            this.lbVSOCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOCode);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0719 + ":</span>");
            this.lbVSOCust = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOCust);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0416 + ":</span>");
            this.lbVSSaleSite = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSSaleSite);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1490 + ":</span>");
            this.lbVSCreateTime = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSCreateTime);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            this.dvQSOCurrRate = $("<span class='left-cell'></span>");
            this.lbVSRateSymbol = $("<span class='title'>" + mlm.C0132 + ":</span>");
            this.lbVSRate = $("<span></span>");
            this.dvQSOCurrRate.append(this.lbVSRateSymbol);
            this.dvQSOCurrRate.append(this.lbVSRate);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0367 + ":</span>");
            this.lbVSSOState = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSSOState);
            m_trContainer.append(this.dvQSOCurrRate);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0073 + ":</span>");
            this.lbVSRemark = $("<span style='width: 920px; display: inline-block'></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSRemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            var m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0168 + "</span>"));
            var m_dvList = $("<div></div>");
            m_dvList.append("<table id='viewsoprodList'></table>");
            m_trContainer.append(m_title);
            m_trContainer.append(m_dvList);
            m_tableContainer.append(m_trContainer);

            m_soinfoContainer.append(m_tableContainer);

            var m_sexpinfoContainer = $("<div id='viewSExpInfo'></div>");
            m_tableContainer = $("<div class='submitForm form-width-d'></div>");

            m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1300 + ":</span>");
            this.lbVShipAddress = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVShipAddress);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1301 + ":</span>");
            this.lbVSOWeight = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOWeight);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1302 + "(cm³)" + ":</span>");
            this.lbVSOVolumn = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOVolumn);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0468 + ":</span>");
            this.lbVSOExpService = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOExpService);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0783 + ":</span>");
            this.lbVSOLstSolution = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOLstSolution);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1491 + ":</span>");
            this.lbVSOExpPrice = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOExpPrice);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1375 + ":</span>");
            this.lbVSOExpCost = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOExpCost);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            this.dvVCustom_1 = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1466 + ":</span>");
            this.lbVSOEstimateShip = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOEstimateShip);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1467 + ":</span>");
            this.lbVSOEstimateArrive = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOEstimateArrive);
            this.dvVCustom_1.append(m_leftTd);
            this.dvVCustom_1.append(m_rightTd);
            m_tableContainer.append(this.dvVCustom_1);

            this.dvVCustom_2 = $("<div class='submitForm-tr'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1306 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsocustomList'></table>");
            this.dvVCustom_2.append(m_title);
            this.dvVCustom_2.append(m_list);
            m_tableContainer.append(this.dvVCustom_2);

            m_sexpinfoContainer.append(m_tableContainer);

            var m_seohandleContainer = $("<div id='viewSEOHandle'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1278 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsoexpressorderList'></table>");
            m_seohandleContainer.append(m_title);
            m_seohandleContainer.append(m_list);

            var m_sfinancehandleContainer = $("<div id='viewSFinanceHandle'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0880 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsofinanceList'></table>");
            m_sfinancehandleContainer.append(m_title);
            m_sfinancehandleContainer.append(m_list);
            m_title = $("<div style='height: 30px; margin: 10px 0px 0px 0px'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0972 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsomoneyList'></table>");
            m_sfinancehandleContainer.append(m_title);
            m_sfinancehandleContainer.append(m_list);

            var m_sasphandleContainer = $("<div id='viewSASPHandle'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1392 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsoasproblemList'></table>");
            m_sasphandleContainer.append(m_title);
            m_sasphandleContainer.append(m_list);

            var m_sprodhandleContainer = $("<div id='viewSProdHandle'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1565 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsohandleproductList'></table>");
            m_sprodhandleContainer.append(m_title);
            m_sprodhandleContainer.append(m_list);

            this.viewSOTabs.append(m_soinfoContainer);
            this.viewSOTabs.append(m_sexpinfoContainer);
            this.viewSOTabs.append(m_seohandleContainer);
            this.viewSOTabs.append(m_sfinancehandleContainer);
            this.viewSOTabs.append(m_sasphandleContainer);
            this.viewSOTabs.append(m_sprodhandleContainer);

            this.ctrl.append(this.viewSOTabs);
        },

        /* 展示配送服务 */
        show: function (saleorder_id) {

            var thisObj = this;
            bizcontrol.viewsaleorder.fn._activedobj = this;

            if (!this.viewSaleOrderFrm) {
                this.viewSaleOrderFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1435, { width: 1125, position: ["auto", 15] });

                this.viewSOTabs.tabs();
                this.lbVShipAddress.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
                this.lbVSRemark.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });

                this.viewsoprodList = new uicontrol.tableList("viewsoprodList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 200,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0180, name: "ProdPicUrl", width: 75, align: 'center', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructSSProdPicCell },
                                                { display: mlm.C0734, name: "", width: 420, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createSOProdCell },
                                                { display: mlm.C1493, name: "ListPrice", width: 90, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createVSOPriceCell },
                                                { display: mlm.C1058, name: "", width: 60, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createSODiscountCell },
                                                { display: mlm.C1494, name: "SalePrice", width: 90, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createVSOPriceCell },
                                                { display: mlm.C1098, name: "Qty", width: 50, align: 'right' },
                                                { display: mlm.C1551, name: "", width: 90, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createVSOTotalPriceCell}]
                                    });

                this.vsocustomList = new uicontrol.tableList("vsocustomList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 45,
                                        keyColumn: "SO_Custom_Id",
                                        columns: [{ display: mlm.C1307, name: "CustomProdName", width: 200, align: 'left' },
                                                { display: mlm.C1307, name: "CustomProdName_CN", width: 200, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 50, align: 'right' },
                                                { display: mlm.C1310, name: "CustomValue", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 110, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 90, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 70, align: 'left'}]
                                    });

                this.vsoexpressorderList = new uicontrol.tableList("vsoexpressorderList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ExpressOrder_Id",
                                        columns: [{ display: mlm.C1316, name: "EOCode", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructEOCodeCell },
                                                   { display: mlm.C0783, name: "", width: 210, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructLstSolutionCell },
                                                   { display: mlm.C1274, name: "WarehouseName", width: 120, align: 'left' },
                                                   { display: mlm.C1303, name: "", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructEOShipTimeCell },
                                                   { display: mlm.C1305, name: "", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructEOArriveTimeCell },
                                                   { display: mlm.C0367, name: "EOState", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructEOStateCell },
                                                   { display: mlm.C1392, name: "", width: 200, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASProblemCell}]
                                    });

                this.vsofinanceList = new uicontrol.tableList("vsofinanceList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FKey",
                                        columns: [{ display: mlm.C0751, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFCodeCell },
                                                  { display: mlm.C1495, name: "", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFTypeCell },
                                                  { display: mlm.C0750, name: "OperateTimeStr", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0722, name: "FTotalMoney", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createFMoneyCell },
                                                  { display: mlm.C0500, name: "State", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFStateCell },
                                                  { display: mlm.C1392, name: "", width: 200, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASProblemCell}]
                                    });

                this.vsomoneyList = new uicontrol.tableList("vsomoneyList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FundFlowRecord_Id",
                                        columns: [{ display: mlm.C0724, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0511, name: "AccountOutRecord_Id", width: 60, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFlowActionCell },
                                                  { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                  { display: mlm.C0513, name: "FlowFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createFMoneyCell },
                                                  { display: mlm.C0514, name: "LosedFund", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createFMoneyCell },
                                                  { display: mlm.C0132, name: "Rate", width: 50, align: 'right' },
                                                  { display: mlm.C0751, name: "", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFundRelCodeCell },
                                                  { display: mlm.C0518, name: "PRFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createFundAORCell}]
                                    });

                this.vsoasproblemList = new uicontrol.tableList("vsoasproblemList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "AS_Problem_Id",
                                        columns: [{ display: mlm.C1392, name: "", width: 350, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASProblemRemarkCell },
                                                   { display: mlm.C1406, name: "CreateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructCreateTimeCell },
                                                   { display: mlm.C1405, name: "", width: 70, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructReceiveRetCell },
                                                   { display: mlm.C1408, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASPHandleTypeCell },
                                                   { display: mlm.C1489, name: "", width: 210, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASPHandleCell },
                                                   { display: mlm.C0367, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructStateCell}]
                                    });

                this.vsohandleproductList = new uicontrol.tableList("vsohandleproductList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 200,
                                        keyColumn: "SkuProduct_Id",
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructProdPicCell },
                                                { display: mlm.C0734, name: "", width: 420, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createSOGProdCell },
                                                { display: mlm.C1561, name: "Qty", width: 60, align: 'right' },
                                                { display: mlm.C0899, name: "RefundQty", width: 60, align: 'right' },
                                                { display: mlm.C1442, name: "ResendQty", width: 60, align: 'right' },
                                                { display: mlm.C0627, name: "OtherQty", width: 60, align: 'right' },
                                                { display: mlm.C1415, name: "ReceiveRetQty", width: 60, align: 'right'}]
                                    });
            }

            var m_saleorder = new sm.saleorder();
            m_saleorder.SaleOrder_Id = saleorder_id;
            m_saleorder.readFullSaleOrder(function (retObj) {

                thisObj.viewSaleOrderFrm.SaleOrder = retObj;

                thisObj.lbVSOCust.text(retObj.OtherProps.CustName);
                thisObj.lbVSOCode.text(retObj.SOCode);
                thisObj.lbVSSaleSite.text(retObj.OtherProps.SaleSiteName);
                thisObj.lbVSCreateTime.text(datastruct.convertion.convertToDateStr(retObj.OtherProps.CreateTimeStr));

                if (retObj.OtherProps.CurrName == retObj.OtherProps.SPfCurrName) {
                    thisObj.dvQSOCurrRate.hide();
                }
                else {
                    thisObj.dvQSOCurrRate.show();
                }
                thisObj.lbVSRate.text("1.00 " + retObj.OtherProps.SPfCurrCode + " = " + Number(retObj.CurrRate).toFixed(2) + " " + retObj.OtherProps.CurrCode);

                thisObj.lbVSRemark.text(commoncore.func.showSpecialChar(retObj.Remark));

                if (retObj.SOState == "0") {
                    thisObj.lbVSSOState.text(mlm.C1496);
                }
                else if (retObj.SOState == "3") {
                    thisObj.lbVSSOState.text(mlm.C1497);
                }
                else if (retObj.SOState == "5") {
                    thisObj.lbVSSOState.text(mlm.C1498);
                }
                else if (retObj.SOState == "18") {
                    thisObj.lbVSSOState.text(mlm.C0538);
                }
                else if (retObj.SOState == "30") {
                    thisObj.lbVSSOState.text(mlm.C1557);
                }
                else {
                    thisObj.lbVSSOState.text(mlm.C1425);
                }

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
                    m_addressArr.push(retObj.OtherProps.GlobalAreaName);

                    thisObj.lbVShipAddress.text(commoncore.func.showSpecialChar(m_addressArr.join(", ")));
                }

                thisObj.lbVShipAddress.attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(retObj.ExpService)));

                thisObj.viewsoprodList.bindDataSource(retObj.Products);

                thisObj.lbVSOWeight.text(Number(retObj.ExpService.Weight).toFixed(3) + " " + retObj.OtherProps.WUnit);
                thisObj.lbVSOVolumn.text(retObj.ExpService.Length + "*" + retObj.ExpService.Width + "*" + retObj.ExpService.Height);
                thisObj.lbVSOExpService.text(retObj.ExpService.ExpressServiceName);
                thisObj.lbVSOLstSolution.text(retObj.ExpService.LstSolutionName + "(" + retObj.ExpService.LstCompanyName + ")");
                thisObj.lbVSOExpPrice.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.ExpService.ExpServicePrice));
                thisObj.lbVSOExpCost.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.ExpService.ExpServiceCost));
                thisObj.lbVSOEstimateShip.text(commoncore.func.getTimeStrCell(retObj.OtherProps.EstimatedShipTimeStr));
                thisObj.lbVSOEstimateArrive.text(commoncore.func.getTimeStrCell(retObj.OtherProps.EstimatedArriveTimeStr));

                if (retObj.ExpService.OtherProps.WH_AreaIndexs) {
                    if (retObj.ExpService.OtherProps.WH_AreaIndexs.indexOf("#" + retObj.ExpService.GlobalArea_Id + "#") > -1) {
                        thisObj.dvVCustom_1.addClass("last-item");
                        var m_dvCustom = thisObj.dvVCustom_2;
                        m_dvCustom.removeClass("last-item");
                        m_dvCustom.hide();
                    }
                    else {
                        thisObj.dvVCustom_1.removeClass("last-item");
                        var m_dvCustom = thisObj.dvVCustom_2;
                        m_dvCustom.addClass("last-item");
                        m_dvCustom.show();
                    }
                }
                $.each(retObj.ExpService.Customs, function () {
                    this.GlobalAreaName = this.OtherProps.GlobalAreaName;
                    if (!this.GlobalAreaName) {
                        this.GlobalAreaName = "";
                    }
                });
                thisObj.vsocustomList.bindDataSource(retObj.ExpService.Customs);

                var m_expressorders = datastruct.convertion.strToObject(retObj.OtherProps.ExpressOrders);
                thisObj.vsoexpressorderList.bindDataSource(m_expressorders);

                var m_financerecords = datastruct.convertion.strToObject(retObj.OtherProps.FinanceRecords);
                var m_fkey = 1;
                $.each(m_financerecords, function () {
                    this.FKey = m_fkey;
                    m_fkey++;
                });
                thisObj.vsofinanceList.bindDataSource(m_financerecords);

                var m_fundflowrecords = datastruct.convertion.strToObject(retObj.OtherProps.FundFlowRecords);
                thisObj.vsomoneyList.bindDataSource(m_fundflowrecords);

                var m_asproblems = datastruct.convertion.strToObject(retObj.OtherProps.ASProblems);
                thisObj.vsoasproblemList.bindDataSource(m_asproblems);

                var m_handleproducts = datastruct.convertion.strToObject(retObj.OtherProps.HandleProducts);
                thisObj.vsohandleproductList.bindDataSource(m_handleproducts);
            });

            thisObj.viewSaleOrderFrm.show();
        },

        /*  */
        _constructSSProdPicCell: function (key, cellValue) {
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

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewSSProduct.call(this, \"" + this.keyObj.SS_Product_Id + "\", \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
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

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /*  */
        _createSOProdCell: function (key, cellValue) {
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
                    m_arr.push("<div style='margin: 5px 0px 0px 0px; padding: 0px; color: #666'><span style='margin: 0px 15px 0px 0px'>" + mlm.C1061 + ": </span><select id='ddlSOGift_" + key + "' tag='" + key + "' class='dropdown-list' style='width: 220px' onchange='changeSOGift.call(this);'>");

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
        },
        /*  */
        _createSOGProdCell: function (key, cellValue) {
            var m_arr = [];
            m_arr.push("<a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + key + "\")' href='javascript:void(\"0\");'>");
            m_arr.push("<span>" + this.keyObj.SkuProdCode + "</span> - ");
            m_arr.push("<span>" + this.keyObj.ProdName + "</span>");

            if (this.keyObj.SkuProps) {
                m_arr.push(" - <span>[" + this.keyObj.SkuProps + "]</span>");
            }
            m_arr.push("</a>");

            return m_arr.join("");
        },
        /*  */
        _createVSOPriceCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(bizcontrol.viewsaleorder.fn._activedobj.viewSaleOrderFrm.SaleOrder.OtherProps.CurrSymbol, cellValue);
        },
        /*  */
        _createSODiscountCell: function (key, cellValue) {
            var m_listprice = Number(this.keyObj.ListPrice);
            var m_saleprice = Number(this.keyObj.SalePrice);
            if (m_listprice > 0 && m_saleprice > 0) {
                return ((m_saleprice / m_listprice) * 100).toFixed(2) + "%";
            }
            else {
                return "100.00%"
            }
        },
        /*  */
        _createVSOTotalPriceCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(bizcontrol.viewsaleorder.fn._activedobj.viewSaleOrderFrm.SaleOrder.OtherProps.CurrSymbol, Number(this.keyObj.SalePrice) * Number(this.keyObj.Qty));
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
        _constructASProblemCell: function (key, cellValue) {
            if (Number(this.keyObj.AS_Problem_Id) > 0) {
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
                else {
                    m_str = mlm.C1421;
                }
                m_arr.push("<div style='padding: 0px'><a onclick='viewASProblem.call(this, \"" + this.keyObj.AS_Problem_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ASPCode + "</a> (" + m_str + ")</div>");

                return m_arr.join("");
            }
        },
        /*  */
        _constructASProblemRemarkCell: function (key, cellValue) {
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
        },
        /*  */
        _constructCreateTimeCell: function (key, cellValue) {
            return "<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.CreateTimeStr) + "</div>";
        },
        /*  */
        _constructReceiveRetCell: function (key, cellValue) {
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
        },
        /*  */
        _constructASPHandleTypeCell: function (key, cellValue) {
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
        },
        /*  */
        _constructASPHandleCell: function (key, cellValue) {
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
        },
        /*  */
        _constructStateCell: function (key, cellValue) {
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
    };

    bizcontrol.viewsaleorder.fn.init.prototype = bizcontrol.viewsaleorder.fn;

})(window);