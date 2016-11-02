(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----物流解决方案查看控件----- 
    */
    bizcontrol.viewlstsolution = function () {
        var obj = new bizcontrol.viewlstsolution.fn.init();
        return obj;
    };
    bizcontrol.viewlstsolution.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewLstSolutionFrm' style='display: none;'></div>");

            var m_tabContainer = $("<div id='lstSolutionTabs_v'></div>");

            var m_ulContainer = $("<ul></ul>");
            var m_liContainer_1 = $("<li><a href='#lstSoluInfo_v'>" + mlm.C0781 + "</a></li>");
            m_ulContainer.append(m_liContainer_1);
            var m_liContainer_2 = $("<li><a href='#lstSoluCharge_v'>" + mlm.C0782 + "</a></li>");
            m_ulContainer.append(m_liContainer_2);
            m_tabContainer.append(m_ulContainer);

            var m_divContainer_1 = $("<div id='lstSoluInfo_v'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-b'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C0783 + ":</span>");
            this.lblstSolution = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lblstSolution);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0784 + ":</span>");
            this.lblstCompany = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lblstCompany);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0785 + ":</span>");
            this.lbLstSolutionType = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbLstSolutionType);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0786 + ":</span>");
            this.lbCalculateModel = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbCalculateModel);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div id='dvVolumnArea_v' class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0790 + ":</span>");
            this.lbVolumnForCal = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append("<span class='lb-symbol'>" + mlm.C0791 + "</span><span style='margin: 0px 5px 0px 5px'>/</span>");
            m_rightTd.append(this.lbVolumnForCal);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0792 + ":</span>");
            this.lbTrackWebAddress = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbTrackWebAddress);
            m_trContainer.append(m_leftTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0794 + ":</span>");
            this.lbVATLimit = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVATLimit);
            this.lbVATCurr = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_leftTd.append(this.lbVATCurr);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0795 + ":</span>");
            this.lbVATValue = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVATValue);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0840 + ":</span>");
            this.dvRemark = $("<span style='display: inline-block; width: 750px'></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.dvRemark);
            m_trContainer.append(m_leftTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0338 + ":</span>");
            this.lbSPfNames = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbSPfNames);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr last-item'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1274 + ":</span>");
            this.lbLstWarehouse = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbLstWarehouse);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_divContainer_1.append(m_tableContainer);
            m_tabContainer.append(m_divContainer_1);

            var m_divContainer_2 = $("<div id='lstSoluCharge_v'></div>");
            m_tableContainer = $("<div class='submitForm form-width-b'></div>");
            m_trContainer = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_ccContainer = $("<div style='height: 435px;'></div>");
            var m_ccContainer_1 = $("<div style='height: 30px;'></div>");
            m_ccContainer_1.append($("<span class='lb-title list-title'>" + mlm.C0796 + "</span>"));
            m_ccContainer.append(m_ccContainer_1);
            var m_ccContainer_2 = $("<div></div>");
            m_ccContainer_2.append("<table id='lstSoluItemList_v'></table>");
            m_ccContainer.append(m_ccContainer_2);
            m_trContainer.append(m_ccContainer);
            m_tableContainer.append(m_trContainer);
            m_divContainer_2.append(m_tableContainer);
            m_tabContainer.append(m_divContainer_2);

            this.ctrl.append(m_tabContainer);

            this.chargeCtrl = $("<div id='viewLstSolutionChargeFrm' style='display: none;'></div>");

            m_tableContainer = $("<div class='submitForm form-width'></div>");
            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0291 + ":</span>");
            this.dvCountry = $("<span style='display: inline-block; width: 640px'></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.dvCountry);
            m_trContainer.append(m_leftTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0799 + ":</span>");
            this.AvaiTime = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.AvaiTime);
            m_trContainer.append(m_leftTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr last-item'></div>");
            var m_chargeTitle = $("<div style='height: 30px;'></div>");
            m_chargeTitle.append($("<span class='lb-title list-title'>" + mlm.C0796 + "</span>"));
            var m_chargeList = $("<div></div>");
            m_chargeList.append("<table id='lstSoluChargeList_v'></table>");
            m_trContainer.append(m_chargeTitle);
            m_trContainer.append(m_chargeList);
            m_tableContainer.append(m_trContainer);
            this.chargeCtrl.append(m_tableContainer);
        },

        /* 展示配送服务模板 */
        show: function (key) {

            var m_this = this;

            if (!this.viewLstSolutionFrm) {
                this.viewLstSolutionFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.M0053, { width: 1025, position: ["auto", 15] });

                this.viewLstSolutionFrm.show();
                this.lstSoluItemList_v = new uicontrol.tableList("lstSoluItemList_v",
                                     { autoSeq: true,
                                         keyColumn: "LstSolutionItem_Id",
                                         height: 340,
                                         columns: [{ display: mlm.C0291, name: "GlobalAreaNames", width: 340, align: 'left' },
                                                   { display: mlm.C1268, name: "LstSolutionItemName", width: 60, align: 'left' },
                                                   { display: mlm.C0985, name: "", width: 150, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructWeightRangeForViewCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0444, name: "StartWeightCharge", width: 70, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructWeightChargeForViewCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0789, name: "OtherItemCharge", width: 70, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructWeightChargeForViewCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0799, name: "", width: 100, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructAvaiTimeForViewCell.call(m_this, key, cellValue); } }]
                                     });

                this.lstSolutionTabs_v = $("#lstSolutionTabs_v").tabs();
            }
            else {
                this.viewLstSolutionFrm.show();
            }

            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.LstSolution_Id = key;
            m_lstsolution.readLstSolution(function (retObj) {

                m_this.lstsolution = retObj;

                m_this.lblstSolution.text(retObj.LstSolutionName);
                m_this.lblstCompany.text(retObj.OtherProps.LstCompanyName);

                if (retObj.LstSolutionType == "1") {
                    m_this.lbLstSolutionType.text(mlm.C0803);
                }
                else if (retObj.LstSolutionType == "2") {
                    m_this.lbLstSolutionType.text(mlm.C0804);
                }
                else {
                    m_this.lbLstSolutionType.text(mlm.C0805);
                }

                if (retObj.CalculateModel == "1") {
                    m_this.lbCalculateModel.text(mlm.C0801);
                    $("#dvVolumnArea_v").hide();
                }
                else {
                    m_this.lbCalculateModel.text(mlm.C0802);
                    $("#dvVolumnArea_v").show();
                }

                m_this.lbVolumnForCal.text(retObj.VolumnForCal);
                m_this.lbTrackWebAddress.text(retObj.TrackWebAddress);
                if (retObj.OtherProps.SPfNames) {
                    m_this.lbSPfNames.text(retObj.OtherProps.SPfNames);
                }
                else {
                    m_this.lbSPfNames.text(mlm.C1140);
                }
                m_this.dvRemark.html(retObj.LstSoluRemark.replace(/\^/g, "\"").replace(/\n/g, "<br>"));

                if (retObj.OtherProps.LstWarehouseTable) {
                    var m_whnamearr = [];
                    var m_warehouseTable = datastruct.convertion.strToObject(retObj.OtherProps.LstWarehouseTable);
                    $.each(m_warehouseTable, function () {
                        m_whnamearr.push(this.WarehouseName);
                    });

                    m_this.lbLstWarehouse.text(m_whnamearr.join(", "));
                }

                if (Number(retObj.VATLimit) > 0) {
                    m_this.lbVATLimit.html(commoncore.func.getCurrHtml(retObj.OtherProps.VAT_CurrSymbol, retObj.VATLimit));
                    m_this.lbVATValue.text((Number(retObj.VATValue) * 100) + " %");
                }
                else {
                    m_this.lbVATLimit.text("");
                    m_this.lbVATCurr.text("");
                    m_this.lbVATValue.text("");
                }

                $.each(retObj.Items, function () {
                    if (this.OtherProps.GlobalAreaNames) {
                        this.GlobalAreaNames = this.OtherProps.GlobalAreaNames;
                    }
                    else {
                        this.GlobalAreaNames = mlm.C0421;
                    }

                    var m_fstLstCharge = this.Charges[0];
                    this.StartWeight = m_fstLstCharge.StartWeight;
                    this.StartWeightCharge = m_fstLstCharge.IncreaseWeightCharge;
                    this.OtherItemCharge = m_fstLstCharge.OtherItemCharge;
                    var m_lastLstCharge = this.Charges[this.Charges.length - 1];
                    this.WeightLimit = m_lastLstCharge.WeightLimit;
                });

                m_this.lstSoluItemList_v.bindDataSource(retObj.Items);
                $.each(retObj.Items, function () {
                    var m_key = this.LstSolutionItem_Id;
                    $("#lkWRange_" + m_key).click(function () {
                        m_this._showCharge(m_key);
                    });
                });
            });
        },

        /* 展示运费 */
        _showCharge: function (key) {
            var m_this = this;
            if (!this.viewLstSolutionChargeFrm) {
                this.viewLstSolutionChargeFrm = new uicontrol.dialog(this.chargeCtrl, mlm.C0672 + mlm.C0807, { width: 800, position: ["auto", 25] });

                this.viewLstSolutionChargeFrm.show();
                this.lstSoluChargeList_v = new uicontrol.tableList("lstSoluChargeList_v",
                                     { autoSeq: true,
                                         keyColumn: "LstSolutionItem_Charge_Id",
                                         height: 150,
                                         columns: [{ display: mlm.C0985, name: "", width: 150, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructLsChargeWRangeForVCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0797, name: "", width: 150, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructLsIncChargeForVCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0789, name: "OtherItemCharge", width: 90, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructWeightChargeForViewCell.call(m_this, key, cellValue); } }]
                                     });
            }
            else {
                this.viewLstSolutionChargeFrm.show();
            }

            var m_lstSoluItem = this.lstSoluItemList_v.getItem(key);
            this.dvCountry.text(m_lstSoluItem.GlobalAreaNames);
            this.AvaiTime.text(m_lstSoluItem.MinAvaiTime + "-" + m_lstSoluItem.MaxAvaiTime + mlm.C0984);
            this.lstSoluChargeList_v.bindDataSource(m_lstSoluItem.Charges);
        },

        /* 构建费用列 */
        constructWeightChargeForViewCell: function (key, cellvalue) {
            return commoncore.func.getExactCurrHtml(this.lstsolution.OtherProps.CurrSymbol, cellvalue);
        },
        /* 构建参考时效列 */
        constructAvaiTimeForViewCell: function (key, cellvalue) {
            var m_obj = this.lstSoluItemList_v.getItem(key);

            return m_obj.MinAvaiTime + "-" + m_obj.MaxAvaiTime + mlm.C0984;
        },
        /* 构建重量区间列 */
        constructWeightRangeForViewCell: function (key, cellvalue) {
            var m_obj = this.lstSoluItemList_v.getItem(key);

            return "<a id='lkWRange_" + key + "' href='javascript:void(\"0\");'><span>" + Number(m_obj.StartWeight).toFixed(3) + "</span> " + this.lstsolution.OtherProps.WUnit + " - " + "<span>" + Number(m_obj.WeightLimit).toFixed(3) + "</span> " + this.lstsolution.OtherProps.WUnit + "</a>";
        },
        /* 构建运费的重量区间列 */
        constructLsChargeWRangeForVCell: function (key, cellvalue) {
            var m_obj = this.lstSoluChargeList_v.getItem(key);
            return "<span>" + Number(m_obj.StartWeight).toFixed(3) + "</span> " + this.lstsolution.OtherProps.WUnit + " - " + "<span>" + Number(m_obj.WeightLimit).toFixed(3) + "</span> " + this.lstsolution.OtherProps.WUnit;
        },
        /* 构建运费的续重运费列 */
        constructLsIncChargeForVCell: function (key, cellvalue) {

            var m_obj = this.lstSoluChargeList_v.getItem(key);
            var m_increaweight = Number(m_obj.IncreaseWeight);
            if (m_increaweight > 0) {
                return commoncore.func.getExactCurrHtml(this.lstsolution.OtherProps.CurrSymbol, m_obj.IncreaseWeightCharge) + " / " + Number(m_obj.IncreaseWeight).toFixed(3) + " " + this.lstsolution.OtherProps.WUnit;
            }
            else {
                return commoncore.func.getExactCurrHtml(this.lstsolution.OtherProps.CurrSymbol, m_obj.IncreaseWeightCharge);
            }
        }
    };

    bizcontrol.viewlstsolution.fn.init.prototype = bizcontrol.viewlstsolution.fn;

})(window);