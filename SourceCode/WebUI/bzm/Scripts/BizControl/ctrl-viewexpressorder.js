(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----配送单查看控件----- 
    */
    bizcontrol.viewexpressorder = function () {
        var obj = new bizcontrol.viewexpressorder.fn.init();
        return obj;
    };
    bizcontrol.viewexpressorder.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewEOFrm' style='display: none;'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-a'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C1316 + ":</span>");
            this.lbVEOCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVEOCode);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0783 + ":</span>");
            this.lbVLstSolution = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVLstSolution);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1300 + ":</span>");
            this.lbVEOAddress = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVEOAddress);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1274 + ":</span>");
            this.lbVWH = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVWH);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1550 + ":</span>");
            this.lbVShipTime = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVShipTime);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1301 + ":</span>");
            this.lbVWeight = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVWeight);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1302 + "(cm³)" + ":</span>");
            this.lbVVolumn = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVVolumn);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1291 + ":</span>");
            this.lbVLstOrderCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVLstOrderCode);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1295 + ":</span>");
            this.lbVTrack = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVTrack);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0807 + ":</span>");
            this.lbVLstCost = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVLstCost);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1377 + ":</span>");
            this.lbVRelOrder = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVRelOrder);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            this.dvVEOProd_1 = $("<div class='submitForm-tr'></div>");
            var m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1264 + mlm.C0463 + "</span>"));
            var m_list = $("<div></div>");
            m_list.append("<table id='eoproductv_1List'></table>");
            this.dvVEOProd_1.append(m_title);
            this.dvVEOProd_1.append(m_list);
            m_tableContainer.append(this.dvVEOProd_1);

            this.dvVEOProd_2 = $("<div class='submitForm-tr' style='display: none'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1264 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='eoproductv_2List'></table>");
            this.dvVEOProd_2.append(m_title);
            this.dvVEOProd_2.append(m_list);
            m_tableContainer.append(this.dvVEOProd_2);

            this.dvVCustom = $("<div class='submitForm-tr last-item'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1376 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='customvList'></table>");
            this.dvVCustom.append(m_title);
            this.dvVCustom.append(m_list);
            m_tableContainer.append(this.dvVCustom);

            this.ctrl.append(m_tableContainer);
        },

        /*  */
        show: function (key) {

            var m_this = this;

            if (!this.viewEOFrm) {
                this.viewEOFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1299, { width: 900, position: ["auto", 5] });

                this.lbVEOAddress.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });

                if (!this.eoproductv_1List) {
                    this.eoproductv_1List = new uicontrol.tableList("eoproductv_1List",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SkuProduct_Id",
                                         height: 65,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: bizcontrol.viewexpressorder.fn._constructEOProdPicCell },
                                                   { display: mlm.C1264, name: "", width: 400, align: 'left', adjust: true, createCell: bizcontrol.viewexpressorder.fn._constructVEOProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell}]
                                     });
                }

                if (!this.eoproductv_2List) {
                    this.eoproductv_2List = new uicontrol.tableList("eoproductv_2List",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SkuProduct_Id",
                                         height: 60,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: bizcontrol.viewexpressorder.fn._constructEOProdPicCell },
                                                   { display: mlm.C1264, name: "", width: 400, align: 'left', adjust: true, createCell: bizcontrol.viewexpressorder.fn._constructVEOProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1369, name: "RevQty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1370, name: "DamageQty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell}]
                                     });
                }

                if (!this.customvList) {
                    this.customvList = new uicontrol.tableList("customvList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "EO_Custom_Id",
                                         height: 40,
                                         columns: [{ display: mlm.C1307, name: "CustomProdName", width: 150, align: 'left' },
                                                { display: mlm.C1621, name: "CustomProdName_CN", width: 150, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 60, align: 'right' },
                                                { display: mlm.C1310, name: "CustomValue", width: 60, align: 'right', adjust: true, createCell: bizcontrol.viewexpressorder.fn._createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 90, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 90, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 70, align: 'left'}]
                                     });
                }
            }

            var m_expressorder = new lstm.expressorder();
            m_expressorder.ExpressOrder_Id = key;
            m_expressorder.readExpressOrder(function (retObj) {

                var m_stateStr = "";
                if (retObj.EOState == "0") {
                    m_stateStr = mlm.C1280;
                }
                else if (retObj.EOState == "10") {
                    m_stateStr = mlm.C1281;
                }
                else if (retObj.EOState == "20") {
                    m_stateStr = mlm.C1282;
                }
                else if (retObj.EOState == "30") {
                    m_stateStr = mlm.C1336;
                }
                else if (retObj.EOState == "40") {
                    m_stateStr = mlm.C1378;
                }
                else if (retObj.EOState == "50") {
                    m_stateStr = mlm.C1330;
                }

                m_this.lbVEOCode.text(retObj.EOCode + " (" + m_stateStr + ")");

                var m_addresschar = "";
                var m_addressArr = [];
                if (retObj.OtherProps.GlobalAreaName == "中国") {
                    m_addresschar = " ";
                    m_addressArr.push(retObj.RvFullName + ",");

                    if (retObj.RvProvince) {
                        m_addressArr.push(retObj.RvProvince);
                    }

                    if (retObj.RvCity) {
                        m_addressArr.push(retObj.RvCity);
                    }

                    if (retObj.RvAddress_1) {
                        m_addressArr.push(retObj.RvAddress_1);
                    }
                    if (retObj.RvAddress_2) {
                        m_addressArr.push(retObj.RvAddress_2);
                    }

                    if (retObj.RvPostCode) {
                        m_addressArr.push("(" + retObj.RvPostCode + ")");
                    }
                }
                else {
                    m_addresschar = ", ";
                    m_addressArr.push(retObj.RvFullName);
                    if (retObj.RvAddress_1) {
                        m_addressArr.push(retObj.RvAddress_1);
                    }
                    if (retObj.RvAddress_2) {
                        m_addressArr.push(retObj.RvAddress_2);
                    }
                    if (retObj.RvCity) {
                        m_addressArr.push(retObj.RvCity);
                    }
                    if (retObj.RvProvince) {
                        m_addressArr.push(retObj.RvProvince);
                    }
                    if (retObj.RvPostCode) {
                        m_addressArr.push(retObj.RvPostCode);
                    }
                    m_addressArr.push(retObj.OtherProps.GlobalAreaName);
                }

                if (retObj.OtherProps.CustName) {
                    m_this.lbVEOAddress.html(commoncore.func.showSpecialChar(m_addressArr.join(m_addresschar)) + " (<a onclick='openViewCustFrm.call(this, \"" + retObj.Customer_Id + "\")' href='javascript:void(\"0\");'>" + retObj.OtherProps.CustName + "</a>)");
                }
                else {
                    m_this.lbVEOAddress.text(commoncore.func.showSpecialChar(m_addressArr.join(m_addresschar)));
                }
                m_this.lbVEOAddress.attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(retObj)));

                m_this.lbVLstSolution.html("<a onclick='openViewLstSolution.call(this, \"" + retObj.LstSolution_Id + "\")' href='javascript:void(\"0\");'>" + retObj.LstSolutionName + " (" + retObj.LstCompanyName + ")</a>");
                m_this.lbVWH.text(retObj.OtherProps.WarehouseName);
                m_this.lbVLstOrderCode.text(retObj.OutEOCode);

                var m_timearr = [];
                if (retObj.OtherProps.ShipTimeStr) {
                    m_timearr.push(commoncore.func.getTimeStrCell(retObj.OtherProps.ShipTimeStr));
                }
                else {
                    m_timearr.push(commoncore.func.getTimeStrCell(retObj.OtherProps.EstimatedShipTimeStr));
                }
                if (retObj.OtherProps.ArriveTimeStr) {
                    m_timearr.push(commoncore.func.getTimeStrCell(retObj.OtherProps.ArriveTimeStr));
                }
                else {
                    m_timearr.push(commoncore.func.getTimeStrCell(retObj.OtherProps.EstimatedArriveTimeStr) + "(" + mlm.C1304 + ")");
                }

                m_this.lbVShipTime.text(m_timearr.join(" " + mlm.C0412 + " "));

                if (Number(retObj.ActualWeight) > 0) {
                    m_this.lbVWeight.text(Number(retObj.ActualWeight).toFixed(3) + " " + retObj.OtherProps.WUnit);
                }
                else {
                    m_this.lbVWeight.text(Number(retObj.Weight).toFixed(3) + " " + retObj.OtherProps.WUnit);
                }
                if (Number(retObj.ActualLength) > 0) {
                    m_this.lbVVolumn.text(retObj.ActualLength + "*" + retObj.ActualWidth + "*" + retObj.ActualHeight);
                }
                else {
                    m_this.lbVVolumn.text(retObj.Length + "*" + retObj.Width + "*" + retObj.Height);
                }
                if (Number(retObj.ActualCost) > 0) {
                    m_this.lbVLstCost.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.ActualCost));
                }
                else {
                    m_this.lbVLstCost.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.ExpServiceCost) + "(" + mlm.C1319 + ")");
                }

                m_this.lbVTrack.text(retObj.TrackingNumber);

                var m_eoproducts = datastruct.convertion.strToObject(retObj.OtherProps.EOProdTable);
                if (retObj.EOState == "40") {
                    m_this.dvVEOProd_1.hide();
                    m_this.dvVEOProd_2.show();

                    m_this.eoproductv_2List.bindDataSource(m_eoproducts);
                }
                else {
                    m_this.dvVEOProd_1.show();
                    m_this.dvVEOProd_2.hide();

                    m_this.eoproductv_1List.bindDataSource(m_eoproducts);
                }

                $.each(retObj.Customs, function () {
                    this.GlobalAreaName = this.OtherProps.GlobalAreaName ? this.OtherProps.GlobalAreaName : "";
                });
                m_this.customvList.bindDataSource(retObj.Customs);

                if (retObj.OtherProps.WH_AreaIndex && retObj.OtherProps.WH_AreaIndex.indexOf("#" + retObj.GlobalArea_Id + "#") > -1) {
                    m_this.dvVCustom.hide();
                }
                else {
                    m_this.dvVCustom.show();
                }

                var m_codeArr = [];
                var m_relobjs = datastruct.convertion.strToObject(retObj.OtherProps.RelTable);
                $.each(m_relobjs, function () {

                    if (this.ASPCode) {
                        m_codeArr.push("<a onclick='viewASProblem.call(this, \"" + this.AS_Problem_Id + "\")' href='javascript:void(\"0\");'>" + this.ASPCode + "</a>");
                    }
                    else {
                        m_codeArr.push("<a onclick='viewSaleOrder.call(this, \"" + this.SaleOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.SOCode + "</a>");
                    }
                });

                m_this.lbVRelOrder.html(m_codeArr.join(", "));
            });

            m_this.viewEOFrm.show();
        },

        /*  */
        _constructEOProdPicCell: function (key, cellValue) {
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
        _constructVEOProdCell: function (key, cellvalue) {
            return "<a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + key + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>";
        },
        /*  */
        _createCustomValueCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(keycontext.keyparam.tax_syscurrsymbol, cellValue);
        }
    };

    bizcontrol.viewexpressorder.fn.init.prototype = bizcontrol.viewexpressorder.fn;

})(window);