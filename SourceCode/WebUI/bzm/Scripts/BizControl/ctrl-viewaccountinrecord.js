(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----应收账单查看控件----- 
    */
    bizcontrol.viewaccountinrecord = function () {
        var obj = new bizcontrol.viewaccountinrecord.fn.init();
        return obj;
    };
    bizcontrol.viewaccountinrecord.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div style='display: none;'></div>");

            var m_tableContainer = $("<div class='submitForm form-width-d'></div>");

            var m_tr_1 = $("<div class='submitForm-tr first-item'></div>");
            var m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0751 + ":</span>");
            /* 账单号 */
            this.m_arcodeCtrl = $("<span></span>");
            m_td_1.append(this.m_arcodeCtrl);
            m_tr_1.append(m_td_1);
            var m_td_2 = $("<span></div>");
            m_td_2.append("<span class='title'>" + mlm.C0750 + ":</span>");
            /* 账单日期 */
            this.m_arcreatetimeCtrl = $("<span></span>");
            m_td_2.append(this.m_arcreatetimeCtrl);
            m_tr_1.append(m_td_2);

            var m_tr_2 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0503 + ":</span>");
            /* 账目类别 */
            this.m_rsubjecttypeCtrl = $("<span></span>");
            m_td_1.append(this.m_rsubjecttypeCtrl);
            m_tr_2.append(m_td_1);
            this.dvSaleSiteCtrl = $("<span></div>");
            this.dvSaleSiteCtrl.append("<span class='title'>" + mlm.C0496 + ":</span>");
            /* 站点 */
            this.m_salesiteCtrl = $("<span></span>");
            this.dvSaleSiteCtrl.append(this.m_salesiteCtrl);
            m_tr_2.append(this.dvSaleSiteCtrl);

            var m_tr_3 = $("<div class='submitForm-tr first-item'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0675 + ":</span>");
            /* 交易对方 */
            this.m_rvobjectCtrl = $("<span></span>");
            m_td_1.append(this.m_rvobjectCtrl);
            m_tr_3.append(m_td_1);
            m_td_2 = $("<span></div>");
            m_td_2.append("<span class='title'>" + mlm.C0749 + ":</span>");
            /* 账目总金额 */
            this.m_receiveCtrl = $("<span></span>");
            m_td_2.append(this.m_receiveCtrl);
            m_tr_3.append(m_td_2);

            var m_tr_4 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0676 + ":</span>");
            /* 业务内容 */
            this.m_ribizcontentCtrl = $("<span style='display: inline-block; width: 850px'></span>");
            m_td_1.append(this.m_ribizcontentCtrl);
            m_tr_4.append(m_td_1);

            var m_tr_5 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0073 + ":</span>");
            /* 备注 */
            this.m_remarkCtrl = $("<span style='display: inline-block; width: 850px'></span>");
            m_td_1.append(this.m_remarkCtrl);
            m_tr_5.append(m_td_1);

            var m_tr_6 = $("<div class='submitForm-tr last-item'></div>");
            var m_rvcontainer = $("<div style='height: 195px;'></div>");
            var m_titlecontainer = $("<div style='height: 30px'></div>");
            m_titlecontainer.append("<span class='lb-title list-title'>" + mlm.C0533 + "</span>");
            this.m_remainreceiveCtrl = $("<span class='lb-title list-title' style='margin: 0px 0px 0px 5px'></span>");
            m_titlecontainer.append(this.m_remainreceiveCtrl);
            m_rvcontainer.append(m_titlecontainer);
            this.m_fundReceiveTable = $("<table id='view_fundReceiveList'></table>");
            m_rvcontainer.append(this.m_fundReceiveTable);
            m_tr_6.append(m_rvcontainer);

            m_tableContainer.append(m_tr_1);
            m_tableContainer.append(m_tr_2);
            m_tableContainer.append(m_tr_3);
            m_tableContainer.append(m_tr_4);
            m_tableContainer.append(m_tr_5);
            m_tableContainer.append(m_tr_6);

            this.ctrl.append(m_tableContainer);
        },

        /* 展示账单 */
        show: function (key) {
            if (!this.viewReceiveInFrm) {
                this.viewReceiveInFrm = new uicontrol.dialog(this.ctrl, mlm.C0763, { width: 1100, position: ["auto", 5] });

                this.viewReceiveInFrm.show();
                this.fundReceiveList = new uicontrol.tableList("view_fundReceiveList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 100,
                                         keyColumn: "FundFlowRecord_Id",
                                         columns: [{ display: mlm.C0518, name: "PRFund", width: 125, align: 'right', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructPRFundForReceiveCell },
                                                   { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                   { display: mlm.C0555, name: "FlowFund", width: 125, align: 'right', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructFundForReceiveCell },
                                                   { display: mlm.C0536, name: "LosedFund", width: 100, align: 'right', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructFundForReceiveCell },
                                                   { display: mlm.C0517, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0861, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructDateCell },
                                                   { display: mlm.C0367, name: "State", width: 60, align: 'left', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructFundReceiveStateCell}]
                                     });
            }

            var m_this = this;

            var m_accountinrecord = new fm.accountinrecord();
            m_accountinrecord.AccountInRecord_Id = key;
            m_accountinrecord.readAccountInRecord(function (retObj) {

                m_this.m_arcodeCtrl.text(retObj.AIRCode);
                m_this.m_arcreatetimeCtrl.text(commoncore.func.getTimeStrCell(retObj.OtherProps.OperateTimeStr));

                if (retObj.AIRType == "1") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0506);
                    m_this.dvSaleSiteCtrl.show();
                }
                else if (retObj.AIRType == "3") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0854);
                    m_this.dvSaleSiteCtrl.show();
                }
                else if (retObj.AIRType == "4") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0855);
                    m_this.dvSaleSiteCtrl.show();
                }
                else if (retObj.AIRType == "5") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0627);
                    m_this.dvSaleSiteCtrl.show();
                }
                else if (retObj.AIRType == "10") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0891);
                    m_this.dvSaleSiteCtrl.hide();
                }

                if (retObj.OtherProps.SaleSiteName) {
                    m_this.m_salesiteCtrl.text(retObj.OtherProps.SPfName + "-" + retObj.OtherProps.SaleSiteName);
                }
                else {
                    m_this.m_salesiteCtrl.text(retObj.OtherProps.SPfName);
                }

                m_this.m_receiveCtrl.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.Receive));
                m_this.m_remarkCtrl.text(retObj.Remark);

                var m_rvobject = "";
                if (retObj.Customer_Id && retObj.Customer_Id != "0") {
                    m_rvobject = retObj.OtherProps.CustName;
                }
                else if (retObj.Supplier_Id && retObj.Supplier_Id != "0") {
                    m_rvobject = retObj.OtherProps.SuppName;
                }
                else {
                    m_rvobject = retObj.RvObject;
                }
                m_this.m_rvobjectCtrl.text(m_rvobject);

                var m_bizcontent = "";
                if (retObj.SaleOrder_Id && retObj.SaleOrder_Id != "0") {
                    if (retObj.AS_Problem_Id && retObj.AS_Problem_Id != "0") {
                        m_bizcontent = mlm.C1546 + ": " + retObj.OtherProps.ASPCode;
                    }
                    else {

                        m_bizcontent = mlm.C0938 + ": " + retObj.OtherProps.SOCode;
                    }
                }
                else if (retObj.PurchaseOrder_Id && retObj.PurchaseOrder_Id != "0") {
                    m_bizcontent = mlm.C1393 + ": " + retObj.OtherProps.POCode;
                }
                else {
                    m_bizcontent = retObj.BizContent;
                }
                m_this.m_ribizcontentCtrl.text(m_bizcontent);

                var m_fundreceiveitems = [];
                var m_freezeReceive = 0;
                $.each(retObj.PreviewFundReceives, function () {
                    var m_flowitem = {};
                    m_flowitem.FundFlowRecord_Id = 10000 + Number(this.PreviewFundFlowRecord_Id);
                    m_flowitem.PRFund = this.PRFund;
                    m_flowitem.FlowFund = this.FlowFund;
                    m_flowitem.LosedFund = this.LosedFund;
                    m_flowitem.Rate = this.Rate;
                    m_flowitem.CurrName = this.OtherProps.CurrName;
                    m_flowitem.FundAccount = this.OtherProps.FundAccount;
                    m_flowitem.CurrSymbol = this.OtherProps.CurrSymbol;
                    m_flowitem.AORCurrName = retObj.OtherProps.CurrName;
                    m_flowitem.AORCurrSymbol = retObj.OtherProps.CurrSymbol;
                    m_flowitem.OperateTimeStr = this.OtherProps.OperateTimeStr;
                    m_flowitem.ReadOnly = false;
                    m_flowitem.State = "Freeze";

                    m_freezeReceive += Number(this.PRFund);
                    m_fundreceiveitems.push(m_flowitem);
                });
                $.each(retObj.FundReceives, function () {
                    var m_flowitem = {};
                    m_flowitem.FundFlowRecord_Id = this.FundFlowRecord_Id;
                    m_flowitem.PRFund = this.PRFund;
                    m_flowitem.FlowFund = this.FlowFund;
                    m_flowitem.LosedFund = this.LosedFund;
                    m_flowitem.Rate = this.Rate;
                    m_flowitem.CurrName = this.OtherProps.CurrName;
                    m_flowitem.FundAccount = this.OtherProps.FundAccount;
                    m_flowitem.CurrSymbol = this.OtherProps.CurrSymbol;
                    m_flowitem.AORCurrName = retObj.OtherProps.CurrName;
                    m_flowitem.AORCurrSymbol = retObj.OtherProps.CurrSymbol;
                    m_flowitem.OperateTimeStr = this.OtherProps.OperateTimeStr;
                    m_flowitem.ReadOnly = true;
                    m_flowitem.State = "";
                    m_fundreceiveitems.push(m_flowitem);
                });
                var m_tablesource = datastruct.convertion.jsonToTable(m_fundreceiveitems);
                m_this.fundReceiveList.bindDataSource(m_tablesource);

                var m_receivein = Number(retObj.ReceivedIn);
                var m_receive = Number(retObj.Receive);
                if ((m_receivein > 0 && m_receivein < m_receive) || m_freezeReceive > 0) {
                    m_this.m_remainreceiveCtrl.html("(" + mlm.C0757 + ":" + commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, m_receive - m_receivein) + ")");
                }
                else {
                    m_this.m_remainreceiveCtrl.html("");
                }

                m_this.viewReceiveInFrm.show();
            });
        },

        /*  */
        _constructPRFundForReceiveCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
        },

        /*  */
        _constructFundForReceiveCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },

        /*  */
        _constructDateCell: function (key, cellValue) {
            return commoncore.func.getTimeStrCell(cellValue);
        },

        /*  */
        _constructFundReceiveStateCell: function (key, cellValue) {
            if (cellValue == "Freeze") {
                return mlm.C0872;
            }
            else {
                return mlm.C0873;
            }
        }
    };

    bizcontrol.viewaccountinrecord.fn.init.prototype = bizcontrol.viewaccountinrecord.fn;

})(window);