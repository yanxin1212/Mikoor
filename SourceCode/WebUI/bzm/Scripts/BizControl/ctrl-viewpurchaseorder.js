(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----采购订单查看控件----- 
    */
    bizcontrol.viewpurchaseorder = function () {
        var obj = new bizcontrol.viewpurchaseorder.fn.init();
        return obj;
    };
    bizcontrol.viewpurchaseorder.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewPurchaseOrderFrm' style='display: none;'></div>");

            this.vpoTab = $("<div id='viewPOTabs'></div>");
            var m_ulCtrl = $("<ul></ul>");
            this.lkViewPOInfo = $("<a href='#viewPOInfo'>" + mlm.C1393 + "</a>");
            var m_liPOCtrl = $("<li></li>");
            m_liPOCtrl.append(this.lkViewPOInfo);
            var m_lkViewPOFinance = $("<li><a href='#viewPOFinance'>" + mlm.C1488 + "</a></li>");
            var m_lkViewPODelivery = $("<li><a href='#viewPODelivery'>" + mlm.C1579 + "</a></li>");
            m_ulCtrl.append(m_liPOCtrl);
            m_ulCtrl.append(m_lkViewPOFinance);
            m_ulCtrl.append(m_lkViewPODelivery);
            this.vpoTab.append(m_ulCtrl);

            var m_poContainer = $("<div id='viewPOInfo'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-b'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C0893 + ":</span>");
            this.lbVPOCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVPOCode);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1069 + ":</span>");
            this.lbVSuppName = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSuppName);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            var m_trContainer = $("<div class='submitForm-tr'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C1569 + ":</span>");
            this.lbVCreateTime = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVCreateTime);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1467 + ":</span>");
            this.lbVEstimateArriveTime = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVEstimateArriveTime);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            var m_trContainer = $("<div class='submitForm-tr'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C1570 + ":</span>");
            this.lbVRevType = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVRevType);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1202 + ":</span>");
            this.lbVInWarehouse = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVInWarehouse);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1599 + ":</span>");
            this.lbVReceiveRemark = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVReceiveRemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0073 + ":</span>");
            this.lbVPORemark = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVPORemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            var m_trProduct = $("<div class='submitForm-tr'></div>");
            var m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1264 + mlm.C0463 + "</span>"));
            var m_dvVPOProductList = $("<div></div>");
            m_dvVPOProductList.append("<table id='vpoproductList'></table>");
            m_trProduct.append(m_title);
            m_trProduct.append(m_dvVPOProductList);
            m_tableContainer.append(m_trProduct);

            m_trContainer = $("<div class='submitForm-tr last-item'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0789 + ":</span>");
            this.lbVOtherCharge = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVOtherCharge);
            m_trContainer.append(m_leftTd);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1571 + ":</span>");
            this.lbVTotalPrice = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVTotalPrice);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_poContainer.append(m_tableContainer);

            var m_pofinanceContainer = $("<div id='viewPOFinance'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0880 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vpofinanceList'></table>");
            m_pofinanceContainer.append(m_title);
            m_pofinanceContainer.append(m_list);
            m_title = $("<div style='height: 30px; margin: 10px 0px 0px 0px'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0972 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vpomoneyList'></table>");
            m_pofinanceContainer.append(m_title);
            m_pofinanceContainer.append(m_list);

            var m_podeliveryContainer = $("<div id='viewPODelivery'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1192 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vpoinstockList'></table>");
            m_podeliveryContainer.append(m_title);
            m_podeliveryContainer.append(m_list);

            this.vpoTab.append(m_poContainer);
            this.vpoTab.append(m_pofinanceContainer);
            this.vpoTab.append(m_podeliveryContainer);

            this.ctrl.append(this.vpoTab);
        },

        /* 展示采购订单 */
        show: function (purchaseorder_id) {
            var thisObj = this;

            if (!this.viewPOFrm) {
                this.viewPOFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1393, { width: 1025, position: ["auto", 5] });

                this.vpoproductList = new uicontrol.tableList("vpoproductList",
                                     { autoSeq: true,
                                         keyColumn: "SkuProduct_Id",
                                         height: 200,
                                         pageQueryHandler: queryPurchasePlan,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructProdPicCell },
                                                   { display: mlm.C0734, name: "", width: 300, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 50, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1586, name: "QuotedPrice", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructQuotedPriceCell },
                                                   { display: mlm.C1494, name: "Price", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructQuotedPriceCell },
                                                   { display: mlm.C1551, name: "TotalPrice", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructQuotedPriceCell },
                                                   { display: mlm.C1587, name: "ReceiveRetQty", width: 50, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell}]
                                     });

                this.vpofinanceList = new uicontrol.tableList("vpofinanceList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FKey",
                                        columns: [{ display: mlm.C0751, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFCodeCell },
                                                  { display: mlm.C1495, name: "", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFTypeCell },
                                                  { display: mlm.C0750, name: "OperateTimeStr", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0722, name: "FTotalMoney", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._createFMoneyCell },
                                                  { display: mlm.C0500, name: "State", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFStateCell}]
                                    });

                this.vpomoneyList = new uicontrol.tableList("vpomoneyList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FundFlowRecord_Id",
                                        columns: [{ display: mlm.C0724, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0511, name: "AccountOutRecord_Id", width: 60, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFlowActionCell },
                                                  { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                  { display: mlm.C0513, name: "FlowFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._createFMoneyCell },
                                                  { display: mlm.C0514, name: "LosedFund", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._createFMoneyCell },
                                                  { display: mlm.C0132, name: "Rate", width: 50, align: 'right' },
                                                  { display: mlm.C0751, name: "", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFundRelCodeCell },
                                                  { display: mlm.C0518, name: "PRFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._createFundAORCell}]
                                    });

                this.vpoinstockList = new uicontrol.tableList("vpoinstockList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "InOutStock_Item_Id",
                                         height: 300,
                                         columns: [{ display: mlm.C1397, name: "OperatedTimeStr", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFOperateTimeCell },
                                                   { display: mlm.C1401, name: "Action", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructActionCell },
                                                   { display: mlm.C1196, name: "", width: 150, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructWarehouseCell },
                                                   { display: mlm.C1162, name: "ProdName", width: 300, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 80, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C0501, name: "FullName", width: 100, align: 'left'}]
                                     });

                this.vpoTab.tabs();
            }

            var m_purchaseorder = new pom.purchaseorder();
            m_purchaseorder.PurchaseOrder_Id = purchaseorder_id;
            m_purchaseorder.readPurchaseOrder(function (retObj) {

                var m_postr = retObj.POCode;
                if (retObj.State == "0") {
                    m_postr += "(" + mlm.C0375 + ")";
                }
                else if (retObj.State == "10") {
                    m_postr += "(" + mlm.C1425 + ")";
                }
                else if (retObj.State == "20") {
                    m_postr += "(" + mlm.C1557 + ")";
                }
                thisObj.lbVPOCode.text(m_postr);

                thisObj.lbVSuppName.text(retObj.OtherProps.SuppName);
                thisObj.lbVCreateTime.text(datastruct.convertion.convertToDateStr(retObj.OtherProps.CreateTimeStr));
                thisObj.lbVEstimateArriveTime.text(datastruct.convertion.convertToDateStr(retObj.OtherProps.EstimateArriveTimeStr));
                thisObj.lbVInWarehouse.text(retObj.OtherProps.WarehouseName);
                if (retObj.RevType == "1") {
                    thisObj.lbVRevType.text(mlm.C1597);
                }
                else {
                    thisObj.lbVRevType.text(mlm.C1598);
                }
                thisObj.lbVReceiveRemark.text(retObj.RevRemark);
                thisObj.lbVPORemark.text(retObj.Remark);
                thisObj.lbVOtherCharge.html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, retObj.OtherCharge));
                thisObj.lbVTotalPrice.html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, retObj.TotalPrice));

                $.each(retObj.Products, function () {
                    this.BrowsePicUrl = this.OtherProps.BrowsePicUrl;
                    this.SkuProdCode = this.OtherProps.SkuProdCode;
                    this.ProdName = this.OtherProps.ProdName;
                    this.Unit = this.OtherProps.Unit;
                    this.SkuProps = this.OtherProps.SkuProps;
                    this.TotalPrice = Number(this.Qty) * Number(this.Price);
                });
                thisObj.vpoproductList.bindDataSource(retObj.Products);

                var m_financerecords = datastruct.convertion.strToObject(retObj.OtherProps.FinanceRecords);
                var m_fkey = 1;
                $.each(m_financerecords, function () {
                    this.FKey = m_fkey;
                    m_fkey++;
                });
                thisObj.vpofinanceList.bindDataSource(m_financerecords);

                var m_fundflowrecords = datastruct.convertion.strToObject(retObj.OtherProps.FundFlowRecords);
                thisObj.vpomoneyList.bindDataSource(m_fundflowrecords);

                var m_inoutstacks = datastruct.convertion.strToObject(retObj.OtherProps.InOutStockTable);
                thisObj.vpoinstockList.bindDataSource(m_inoutstacks);

            });

            thisObj.viewPOFrm.show();

            thisObj.lkViewPOInfo.trigger("click");
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

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
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
        _constructQuotedPriceCell: function (key, cellValue) {
            if (Number(cellValue) > 0) {
                return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue);
            }
        },
        /*  */
        _constructAORCodeCell: function (key, cellValue) {
            return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.AccountOutRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.AORCode + "</a>";
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
        _constructActionCell: function (key, cellValue) {
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
        },
        /*  */
        _constructWarehouseCell: function (key, cellValue) {
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
    };

    bizcontrol.viewpurchaseorder.fn.init.prototype = bizcontrol.viewpurchaseorder.fn;

})(window);