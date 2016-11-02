(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----客户选择控件----- 
    */
    bizcontrol.selectcustomer = function (ctrl, filladdressEvent) {
        var obj = new bizcontrol.selectcustomer.fn.init(ctrl, filladdressEvent);
        return obj;
    };
    bizcontrol.selectcustomer.fn = {
        /* ID识别码 */
        _key: 1,

        _activedobj: null,

        /* 构造函数 */
        init: function (ctrl, filladdressEvent) {

            var thisObj = this;
            this._key = bizcontrol.selectcustomer.fn._key;
            this.ctrl = ctrl;
            this.filladdressEvent = filladdressEvent;
            this.custNameTxt = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            this.btSelect.click(function () { thisObj._openSelCustFrm(); });
            this.custNameTxt.change(function () { thisObj._inputCustName(); });

            this._custDialog = $("<div id='selCustFrm_" + this._key + "' style='display: none;'></div>");
            var m_tablectrl = $("<div class='submitForm form-width-a' style='border-bottom-width: 0px; width: 878px'></div>");
            var m_tr = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_toolctrl = $("<div style='height: 30px'></div>");
            this._txtCustKey = $("<input type='text' class='text-long-input' onkeypress='uicontrol.func.checkInput(event);' />");
            m_toolctrl.append(this._txtCustKey);
            var m_btquerycust = $("<input type='button' class='normal-bt' value='" + mlm.C0562 + "' />");
            m_toolctrl.append(m_btquerycust);
            m_tr.append(m_toolctrl);
            m_tablectrl.append(m_tr);
            this._custDialog.append(m_tablectrl);
            var custlistctrl = $("<table id='selCustList_" + this._key + "'></table>");
            this._custDialog.append(custlistctrl);

            this.ctrl.append(this.custNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._custDialog);

            m_btquerycust.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btquerycust.click(function () {
                thisObj._constructQueryCondition();

                bizcontrol.selectcustomer.fn._queryCustomers.call(thisObj, 1, thisObj.custList.pageNumber);
            });

            bizcontrol.selectcustomer.fn._key++;
        },

        /* 打开选择供应商的窗体 */
        _openSelCustFrm: function () {

            var thisObj = this;

            bizcontrol.selectcustomer.fn._activedobj = this;

            if (!this.selCustFrm) {
                this.selCustFrm = new uicontrol.dialog(this._custDialog, mlm.C0577 + mlm.C0719, { width: 900, position: ["auto", 35] }, function () { bizcontrol.selectcustomer.fn._selectCust.call(thisObj); });

                this.selCustFrm.show();
                this.custList = new uicontrol.tableList("selCustList_" + this._key,
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "Customer_Id",
                                         selectModel: "1",
                                         height: 300,
                                         pageQueryHandler: bizcontrol.selectcustomer.fn._queryCustomers,
                                         columns: [{ display: mlm.C0719, name: "CustName", width: 170, align: 'left', adjust: true, createCell: bizcontrol.selectcustomer.fn._constructCustName },
                                                   { display: mlm.C0240, name: "GlobalAreaName", width: 150, align: 'left' },
                                                   { display: mlm.C0310, name: "Email", width: 200, align: 'left' },
                                                   { display: mlm.C1224, name: "SPfName", width: 100, align: 'left' },
                                                   { display: mlm.C0358, name: "CustomerGroupName", width: 100, align: 'left'}]
                                     });
            }
            else {
                this.selCustFrm.show();
            }

            this._txtCustKey.val("");

            if (!this.Customer_Id || this.Customer_Id == 0) {
                this.custList.bindDataSource(null);
            }
            else {
                var thisObj = this;
                var m_customer = new cm.customer();
                m_customer.Customer_Id = this.Customer_Id;
                m_customer.Page = 1;
                m_customer.PageNum = 1;

                m_customer.queryCustomers(function (retTable) {
                    thisObj.custList.bindDataSource(retTable);

                    var m_selectedcust = new datastruct.dictionary();
                    m_selectedcust.setItem(m_customer.Customer_Id);
                    thisObj.custList.setSelectedItems(m_selectedcust);
                });
            }
        },
        /* 构造客户名称列 */
        _constructCustName: function (key, cellValue) {
            return "<a onclick='openViewCustFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
        },
        /* 获取查询条件 */
        _constructQueryCondition: function () {
            this.conditionObj = {};
            this.conditionObj.keyword = $.trim(this._txtCustKey.val());
        },
        /* 查询客户 */
        _queryCustomers: function (page, pagenum) {

            var thisObj = bizcontrol.selectcustomer.fn._activedobj;
            var m_customer = new cm.customer();
            m_customer.Keywords = thisObj.conditionObj.keyword;
            m_customer.Page = page;
            m_customer.PageNum = pagenum;

            m_customer.queryCustomers(function (retTable) {
                thisObj.custList.bindDataSource(retTable);
            });
        },
        /* 选择客户 */
        _selectCust: function () {
            var m_selecteditems = this.custList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1244);
                return;
            }

            this.CustName = m_selecteditems.CustName;
            this.Customer_Id = m_selecteditems.Customer_Id;
            this.Customer = m_selecteditems;

            this.custNameTxt.val(m_selecteditems.CustName);
            this.custNameTxt.attr("tag", m_selecteditems.Customer_Id);

            if (this.filladdressEvent) {
                this.filladdressEvent(this.Customer_Id);
            }

            this.selCustFrm.close();
        },
        /* 输入客户 */
        _inputCustName: function () {
            var m_custname = $.trim(this.custNameTxt.val());

            if (m_custname) {
                var m_customer = new cm.customer();
                m_customer.Keywords = m_custname;
                m_customer.Page = 1;
                m_customer.PageNum = 1;

                var thisObj = this;
                m_customer.queryCustomers(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                    if (m_jsonobjs.length > 0) {
                        thisObj.CustName = m_jsonobjs[0].CustName;
                        thisObj.Customer_Id = m_jsonobjs[0].Customer_Id;

                        thisObj.custNameTxt.val(thisObj.CustName);
                        thisObj.custNameTxt.attr("tag", thisObj.Customer_Id);
                    }
                    else {
                        thisObj.CustName = "";
                        thisObj.Customer_Id = "0";

                        thisObj.custNameTxt.val("");
                        thisObj.custNameTxt.attr("tag", "0");
                    }

                    if (thisObj.filladdressEvent) {
                        thisObj.filladdressEvent(thisObj.Customer_Id);
                    }
                });
            }
            else {
                this.CustName = "";
                this.Customer_Id = "0";

                this.custNameTxt.val("");
                this.custNameTxt.attr("tag", "0");

                if (thisObj.filladdressEvent) {
                    thisObj.filladdressEvent(this.Customer_Id);
                }
            }
        },
        /* 设置客户 */
        setCust: function (customer) {
            if (customer) {
                this.CustName = customer.CustName;
                this.Customer_Id = customer.Customer_Id;

                this.custNameTxt.val(customer.CustName);
                this.custNameTxt.attr("tag", customer.Customer_Id);
            }
            else {

                this.CustName = null;
                this.Customer_Id = null;

                this.custNameTxt.val("");
                this.custNameTxt.attr("tag", "");
            }
        }
    };
    bizcontrol.selectcustomer.fn.init.prototype = bizcontrol.selectcustomer.fn;
    /*-------------------------------*/

})(window);