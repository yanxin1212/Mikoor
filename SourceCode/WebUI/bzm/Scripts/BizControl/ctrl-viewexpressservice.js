(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----配送服务查看控件----- 
    */
    bizcontrol.viewexpressservice = function () {
        var obj = new bizcontrol.viewexpressservice.fn.init();
        return obj;
    };
    bizcontrol.viewexpressservice.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewExpressServiceFrm' style='display: none;'></div>");

            this.expServiceTab = $("<div id='expServiceTab_v'></div>");
            var m_ulCtrl = $("<ul></ul>");
            var m_liCtrl_1 = $("<li><a id='lkExpServiceInfo_expv' href='#expServiceInfo_expv'>" + mlm.C0286 + "</a></li>");
            var m_liCtrl_2 = $("<li><a href='#lstSolution_expv'>" + mlm.C1143 + "</a></li>");
            m_ulCtrl.append(m_liCtrl_1);
            m_ulCtrl.append(m_liCtrl_2);
            this.expServiceTab.append(m_ulCtrl);

            var m_expinfoContainer = $("<div id='expServiceInfo_expv'></div>");
            var m_tableContainer = $("<div class='submitForm form-width'></div>");

            var m_tr_1 = $("<div class='submitForm-tr first-item'></div>");
            var m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0436 + ":</span>");
            /* 配送服务 */
            this.m_esNameCtrl = $("<span></span>");
            m_td_1.append(this.m_esNameCtrl);
            m_tr_1.append(m_td_1);

            var m_tr_9 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C1274 + ":</span>");
            /* 配送中心 */
            this.m_warehouseCtrl = $("<span></span>");
            m_td_1.append(this.m_warehouseCtrl);
            m_tr_9.append(m_td_1);

            var m_tr_2 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0291 + ":</span>");
            /* 目的地 */
            this.m_globalAreaCtrl = $("<span style='display: inline-block; width: 650px; max-height: 100px; overflow-y: scroll'></span>");
            m_td_1.append(this.m_globalAreaCtrl);
            m_tr_2.append(m_td_1);

            var m_tr_8 = $("<div class='submitForm-tr'></div>");
            var m_td_2 = $("<span class='left-cell'></span>");
            m_td_2.append("<span class='title'>" + mlm.C0844 + ":</span>");
            /* 运费模式 */
            this.m_esTypeCtrl = $("<span></span>");
            m_td_2.append(this.m_esTypeCtrl);
            m_tr_8.append(m_td_2);
            var m_td_3 = $("<span></span>");
            m_td_3.append("<span class='title'>" + mlm.C0810 + ":</span>");
            /* 进度跟踪 */
            this.m_isTrackCtrl = $("<span></span>");
            m_td_3.append(this.m_isTrackCtrl);
            m_tr_8.append(m_td_3);

            this.tr_3 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0438 + ":</span>");
            /* 商品首重限制 */
            this.m_fromWeightCtrl = $("<span></span>");
            m_td_1.append(this.m_fromWeightCtrl);
            this.m_fromWUnitCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_1.append(this.m_fromWUnitCtrl);
            m_td_2 = $("<span></span>");
            m_td_2.append("<span class='title'>" + mlm.C0439 + ":</span>");
            /* 增重 */
            this.m_increaseWeightCtrl = $("<span></span>");
            m_td_2.append(this.m_increaseWeightCtrl);
            this.m_increaseWUnitCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_2.append(this.m_increaseWUnitCtrl);
            this.tr_3.append(m_td_1);
            this.tr_3.append(m_td_2);

            this.tr_5 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0444 + ":</span>");
            /* 首重运费 */
            this.m_fromPriceCtrl = $("<span></span>");
            m_td_1.append(this.m_fromPriceCtrl);
            this.m_fromPriceCurrCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_1.append(this.m_fromPriceCurrCtrl);
            m_td_2 = $("<span></span>");
            m_td_2.append("<span class='title'>" + mlm.C0445 + ":</span>");
            /* 增重运费 */
            this.m_increasePriceCtrl = $("<span></span>");
            m_td_2.append(this.m_increasePriceCtrl);
            this.m_increasePriceCurrCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_2.append(this.m_increasePriceCurrCtrl);
            this.tr_5.append(m_td_1);
            this.tr_5.append(m_td_2);

            this.tr_7 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C1017 + ":</span>");
            /* 固定运费 */
            this.m_fixPriceCtrl = $("<span></span>");
            m_td_1.append(this.m_fixPriceCtrl);
            this.m_fixPriceCurrCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_1.append(this.m_fixPriceCurrCtrl);
            this.tr_7.append(m_td_1);

            var m_tr_4 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0440 + ":</span>");
            /* 最大重量限制 */
            this.m_maxWeightCtrl = $("<span></span>");
            this.m_maxWUnitCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_1.append(this.m_maxWeightCtrl);
            m_td_1.append(this.m_maxWUnitCtrl);
            m_td_2 = $("<span></span>");
            m_td_2.append("<span class='title'>" + mlm.C0441 + ":</span>");
            /* 配送时效 */
            this.m_deliveryTimeCtrl = $("<span></span>");
            m_td_2.append(this.m_deliveryTimeCtrl);
            m_tr_4.append(m_td_1);
            m_tr_4.append(m_td_2);

            var m_tr_6 = $("<div class='submitForm-tr last-item'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0073 + ":</span>");
            /* 备注 */
            this.m_remarkCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_remarkCtrl);
            m_tr_6.append(m_td_1);

            m_tableContainer.append(m_tr_1);
            m_tableContainer.append(m_tr_9);
            m_tableContainer.append(m_tr_2);
            m_tableContainer.append(m_tr_8);
            m_tableContainer.append(this.tr_3);
            m_tableContainer.append(this.tr_5);
            m_tableContainer.append(this.tr_7);
            m_tableContainer.append(m_tr_4);
            m_tableContainer.append(m_tr_6);

            m_expinfoContainer.append(m_tableContainer);
            this.expServiceTab.append(m_expinfoContainer);

            var m_lstsolutionContainer = $("<div id='lstSolution_expv'></div>");
            var m_lstTableContainer = $("<div class='submitForm form-width'></div>");
            var m_lstTr = $("<div class='submitForm-tr first-item last-item'></div>");
            this.lstsolutionTable = $("<table id='lstsolutionList_expv'></table>");
            m_lstTr.append(this.lstsolutionTable);
            m_lstTableContainer.append(m_lstTr);
            m_lstsolutionContainer.append(m_lstTableContainer);
            this.expServiceTab.append(m_lstsolutionContainer);

            this.ctrl.append(this.expServiceTab);
        },

        /* 展示配送服务 */
        show: function (expressservice_id) {
            var thisObj = this;
            if (!this.viewExpressServiceFrm) {
                this.viewExpressServiceFrm = new uicontrol.dialog(this.ctrl, mlm.C0450, { width: 825, position: ["auto", 50] });
                this.expServiceTab.tabs({ show: function (event, ui) {
                    if (ui.index == 1) {
                        if (!thisObj.lstSolutionList) {
                            thisObj.lstSolutionList = new uicontrol.tableList('lstsolutionList_expv',
                                     { autoSeq: true,
                                         keyColumn: "LstSolution_Id",
                                         height: 270,
                                         columns: [{ display: mlm.C0783, name: "LstSolutionName", width: 200, align: 'left', adjust: true, createCell: bizcontrol.viewexpressservice.fn._constructLstSolutionCell },
                                                   { display: mlm.C0784, name: "LstCompanyName", width: 120, align: 'left' },
                                                   { display: mlm.C0785, name: "LstSolutionType", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewexpressservice.fn._constructLstSoluTypeCell },
                                                   { display: mlm.C0810, name: "TrackWebAddress", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewexpressservice.fn._constructTrackWebCell}]
                                     });
                        };

                        thisObj.lstSolutionList.bindDataSource(thisObj.viewExpressServiceFrm.expressservice.LstSolutionTable);
                    }
                }
                });
            }
            $("#lkExpServiceInfo_expv").trigger("click");

            var m_expressservice = new sm.expressservice();
            m_expressservice.ExpressService_Id = expressservice_id;

            m_expressservice.readExpressService(function (obj) {
                thisObj.m_esNameCtrl.text(obj.ExpressServiceName);
                thisObj.m_deliveryTimeCtrl.text(obj.MinDeliveryTime + "-" + obj.MaxDeliveryTime + mlm.C0984);
                thisObj.m_fromWeightCtrl.text(Number(obj.FromWeight).toFixed(3));
                thisObj.m_increaseWeightCtrl.text(Number(obj.IncreaseWeight).toFixed(3));
                thisObj.m_maxWeightCtrl.text(Number(obj.MaxWeight).toFixed(3));
                thisObj.m_increasePriceCtrl.text(Number(obj.IncreasePrice).toFixed(3));
                thisObj.m_fromPriceCtrl.text(Number(obj.FromPrice).toFixed(3));
                thisObj.m_fixPriceCtrl.text(Number(obj.FromPrice).toFixed(2));

                if (obj.IsTrack == "1") {
                    thisObj.m_isTrackCtrl.text(mlm.C0811);
                }
                else {
                    thisObj.m_isTrackCtrl.text("");
                }

                if (obj.ESType == "1") {
                    thisObj.m_esTypeCtrl.text(mlm.C1014);
                    thisObj.tr_3.show();
                    thisObj.tr_5.show();
                    thisObj.tr_7.hide();
                }
                else if (obj.ESType == "2") {
                    thisObj.m_esTypeCtrl.text(mlm.C1015);
                    thisObj.tr_3.hide();
                    thisObj.tr_5.hide();
                    thisObj.tr_7.hide();
                }
                else {
                    thisObj.m_esTypeCtrl.text(mlm.C1016);
                    thisObj.tr_3.hide();
                    thisObj.tr_5.hide();
                    thisObj.tr_7.show();
                }

                thisObj.m_globalAreaCtrl.text(obj.OtherProps.GlobalAreaNames);
                thisObj.m_fromWUnitCtrl.text(saleplatform.currObj.WUnit);
                thisObj.m_increaseWUnitCtrl.text(saleplatform.currObj.WUnit);
                thisObj.m_maxWUnitCtrl.text(saleplatform.currObj.WUnit);
                thisObj.m_fromPriceCurrCtrl.text(saleplatform.currObj.CurrCode);
                thisObj.m_increasePriceCurrCtrl.text(saleplatform.currObj.CurrCode);
                thisObj.m_fixPriceCurrCtrl.text(saleplatform.currObj.CurrCode);
                thisObj.m_remarkCtrl.text(obj.Remark);
                thisObj.m_warehouseCtrl.text(obj.OtherProps.WarehouseName ? obj.OtherProps.WarehouseName : "");

                thisObj.viewExpressServiceFrm.expressservice = obj;
                thisObj.viewExpressServiceFrm.show();
            });
        },

        /* 构建物流解决方案列 */
        _constructLstSolutionCell: function (key, cellvalue) {
            return "<a onclick='openViewLstSolution.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellvalue + "</a>";
        },
        /* 构建快递类型列 */
        _constructLstSoluTypeCell: function (key, cellvalue) {
            if (cellvalue == "1") {
                return mlm.C0803;
            }
            else if (cellvalue == "2") {
                return mlm.C0804;
            }
            else if (cellvalue == "3") {
                return mlm.C0805;
            }
            else {
                return mlm.C0815;
            }
        },
        /* 构建跟踪列 */
        _constructTrackWebCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                return mlm.C0811;
            }
        }
    };

    bizcontrol.viewexpressservice.fn.init.prototype = bizcontrol.viewexpressservice.fn;

})(window);