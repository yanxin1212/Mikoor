(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----应付账单查看控件----- 
    */
    bizcontrol.viewaccountoutrecord = function () {
        var obj = new bizcontrol.viewaccountoutrecord.fn.init();
        return obj;
    };
    bizcontrol.viewaccountoutrecord.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div style='display: none;'></div>");

            var m_tableContainer = $("<div class='submitForm form-width-b'></div>");

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
            m_td_1.append("<span class='title'>" + mlm.C0497 + ":</span>");
            /* 成本科目 */
            this.m_costsubjectCtrl = $("<span></span>");
            m_td_1.append(this.m_costsubjectCtrl);
            m_tr_2.append(m_td_1);
            m_td_2 = $("<span></div>");
            m_td_2.append("<span class='title'>" + mlm.C0496 + ":</span>");
            /* 站点 */
            this.m_salesiteCtrl = $("<span></span>");
            m_td_2.append(this.m_salesiteCtrl);
            m_tr_2.append(m_td_2);

            var m_tr_3 = $("<div class='submitForm-tr first-item'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0675 + ":</span>");
            /* 交易对方 */
            this.m_payobjectCtrl = $("<span></span>");
            m_td_1.append(this.m_payobjectCtrl);
            m_tr_3.append(m_td_1);
            m_td_2 = $("<span></div>");
            m_td_2.append("<span class='title'>" + mlm.C0749 + ":</span>");
            /* 账目总金额 */
            this.m_payoutCtrl = $("<span></span>");
            m_td_2.append(this.m_payoutCtrl);
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
            m_titlecontainer.append("<span class='lb-title list-title'>" + mlm.C0529 + "</span>");
            this.m_remainpayCtrl = $("<span class='lb-title list-title' style='margin: 0px 0px 0px 5px'></span>");
            m_titlecontainer.append(this.m_remainpayCtrl);
            m_rvcontainer.append(m_titlecontainer);
            this.m_payfundTable = $("<table id='view_payfundList'></table>");
            m_rvcontainer.append(this.m_payfundTable);
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
            if (!this.viewAccountOutFrm) {
                this.viewAccountOutFrm = new uicontrol.dialog(this.ctrl, mlm.C0761, { width: 1000, position: ["auto", 5] });

                this.viewAccountOutFrm.show();

                this.paidfundList = new uicontrol.tableList("view_payfundList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 100,
                                         keyColumn: "FundFlowRecord_Id",
                                         columns: [{ display: mlm.C0518, name: "PRFund", width: 125, align: 'right', adjust: true, createCell: bizcontrol.viewaccountoutrecord.fn._constructPRFundForPayCell },
                                                   { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                   { display: mlm.C0529, name: "FlowFund", width: 125, align: 'right', adjust: true, createCell: bizcontrol.viewaccountoutrecord.fn._constructFundForPayCell },
                                                   { display: mlm.C0532, name: "LosedFund", width: 100, align: 'right', adjust: true, createCell: bizcontrol.viewaccountoutrecord.fn._constructFundForPayCell },
                                                   { display: mlm.C0517, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0860, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewaccountoutrecord.fn._constructDateCell}]
                                     });
            }

            var m_this = this;

            var m_accountoutrecord = new fm.accountoutrecord();
            m_accountoutrecord.AccountOutRecord_Id = key;
            m_accountoutrecord.readAccountOutRecord(function (retObj) {

                m_this.m_costsubjectCtrl.text(retObj.OtherProps.CostSubjectName);
                m_this.m_payoutCtrl.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.Payout));

                if (retObj.OtherProps.SaleSiteName) {
                    m_this.m_salesiteCtrl.text(retObj.OtherProps.SPfName + "-" + retObj.OtherProps.SaleSiteName);
                }
                else {
                    m_this.m_salesiteCtrl.text(retObj.OtherProps.SPfName);
                }

                var m_paid = Number(retObj.Paidout);
                var m_pay = Number(retObj.Payout);
                if (m_paid > 0 && m_paid < m_pay) {
                    m_this.m_remainpayCtrl.html("(" + mlm.C0868 + ":" + commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, m_pay - m_paid) + ")");
                }
                else {
                    m_this.m_remainpayCtrl.html("");
                }

                m_this.m_remarkCtrl.text(retObj.Remark);

                var m_payobject = "";
                if (retObj.Customer_Id && retObj.Customer_Id != "0") {
                    m_payobject = retObj.OtherProps.CustName;
                }
                else if (retObj.Supplier_Id && retObj.Supplier_Id != "0") {
                    m_payobject = retObj.OtherProps.SuppName;
                }
                else {
                    m_payobject = retObj.PayObject;
                }
                m_this.m_payobjectCtrl.text(m_payobject);

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
                else if (retObj.ExpressOrder_Id && retObj.ExpressOrder_Id != "0") {
                    m_bizcontent = mlm.C1316 + ": " + retObj.OtherProps.EOCode + "(" + retObj.OtherProps.LstSolutionName + ", ";

                    if (retObj.OtherProps.TrackingNumber) {
                        m_bizcontent += retObj.OtherProps.TrackingNumber + ")";
                    }
                    else {
                        m_bizcontent += retObj.OtherProps.OutEOCode ? retObj.OtherProps.OutEOCode : mlm.C1291 + mlm.C1322 + ")";
                    }
                }
                else {
                    m_bizcontent = retObj.BizContent;
                }
                m_this.m_ribizcontentCtrl.text(m_bizcontent);

                m_this.m_arcodeCtrl.text(retObj.AORCode);
                m_this.m_arcreatetimeCtrl.text(commoncore.func.getTimeStrCell(retObj.OtherProps.OperateTimeStr));

                $.each(retObj.PaidFunds, function () {
                    this.FundAccount = this.OtherProps.FundAccount;
                    this.CurrName = this.OtherProps.CurrName;
                    this.FundAccount = this.OtherProps.FundAccount;
                    this.CurrSymbol = this.OtherProps.CurrSymbol;
                    this.AORCurrName = retObj.OtherProps.CurrName;
                    this.AORCurrSymbol = retObj.OtherProps.CurrSymbol;
                    this.OperateTimeStr = this.OtherProps.OperateTimeStr;
                });

                m_this.paidfundList.bindDataSource(retObj.PaidFunds);

                m_this.viewAccountOutFrm.show();
            });
        },

        /*  */
        _constructPRFundForPayCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
        },

        /*  */
        _constructFundForPayCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },

        /*  */
        _constructDateCell: function (key, cellValue) {
            return commoncore.func.getTimeStrCell(cellValue);
        }
    };

    bizcontrol.viewaccountoutrecord.fn.init.prototype = bizcontrol.viewaccountoutrecord.fn;

})(window);