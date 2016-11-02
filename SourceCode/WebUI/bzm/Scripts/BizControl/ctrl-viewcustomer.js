(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----客户查看控件----- 
    */
    bizcontrol.viewcustomer = function () {
        var obj = new bizcontrol.viewcustomer.fn.init();
        return obj;
    };
    bizcontrol.viewcustomer.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewCustomerFrm' style='display: none;'></div>");

            var m_tabs = $("<div id='view_customerTabs'></div>");
            m_tabs.append("<ul><li><a href='#view_custInfo'>" + mlm.C0781 + "</a></li><li><a href='#view_rvaddress'>" + mlm.C1222 + "</a></li></ul>");

            var m_customerContainer = $("<div id='view_custInfo'></div>");
            var m_rvaddressContainer = $("<div id='view_rvaddress'></div>");

            var m_tableContainer = $("<div class='submitForm form-width-d'></div>");

            var m_tr_1 = $("<div class='submitForm-tr first-item'></div>");
            var m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0364 + ":</span>");
            /* 客户名称 */
            this.m_custNameCtrl = $("<span></span>");
            m_td_1.append(this.m_custNameCtrl);
            m_tr_1.append(m_td_1);
            var m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C0358 + ":</span>");
            /* 客户群 */
            this.m_custgroupCtrl = $("<span></span>");
            m_td_2.append(this.m_custgroupCtrl);
            m_tr_1.append(m_td_2);

            var m_tr_2 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0310 + ":</span>");
            /* 邮箱 */
            this.m_emailCtrl = $("<span></span>");
            m_td_1.append(this.m_emailCtrl);
            m_tr_2.append(m_td_1);
            m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C0311 + ":</span>");
            /* 联系电话 */
            this.m_telCtrl = $("<span></span>");
            m_td_2.append(this.m_telCtrl);
            m_tr_2.append(m_td_2);

            var m_tr_3 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C1223 + ":</span>");
            /* 所属国家 */
            this.m_countryCtrl = $("<span></span>");
            m_td_1.append(this.m_countryCtrl);
            m_tr_3.append(m_td_1);
            m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C1224 + ":</span>");
            /* 注册站点 */
            this.m_shopsiteCtrl = $("<span></span>");
            m_td_2.append(this.m_shopsiteCtrl);
            m_tr_3.append(m_td_2);

            var m_tr_4 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0312 + ":</span>");
            /* 其他联系方式 */
            this.m_contractinfoCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_contractinfoCtrl);
            m_tr_4.append(m_td_1);

            var m_tr_5 = $("<div class='submitForm-tr last-item'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0073 + ":</span>");
            /* 备注 */
            this.m_remarkCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_remarkCtrl);
            m_tr_5.append(m_td_1);

            m_tableContainer.append(m_tr_1);
            m_tableContainer.append(m_tr_2);
            m_tableContainer.append(m_tr_3);
            m_tableContainer.append(m_tr_4);
            m_tableContainer.append(m_tr_5);

            m_customerContainer.append(m_tableContainer);
            m_tabs.append(m_customerContainer);

            var m_rvaddresstableCtrl = $("<div class='submitForm form-width-d'></div>");
            var m_rvaddresstr = $("<div class='submitForm-tr first-item last-item'></div>");
            m_rvaddresstr.append("<div style='height: 30px'><span class='lb-title list-title'>" + mlm.C1225 + mlm.C0463 + "</span></div>");
            this.m_rvaddressTable = $("<table id='view_RvAddressList'></table>");
            m_rvaddresstr.append(this.m_rvaddressTable);
            m_rvaddresstableCtrl.append(m_rvaddresstr);
            m_rvaddressContainer.append(m_rvaddresstableCtrl);
            m_tabs.append(m_rvaddressContainer);
            this.ctrl.append(m_tabs);
        },

        /* 展示客户 */
        show: function (customer_id) {
            var thisObj = this;
            if (!this.viewCustomerFrm) {
                this.viewCustomerFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C0719, { width: 1125, position: ["auto", 50] });

                this.customerTabs = $("#view_customerTabs").tabs({ show: function (event, ui) { bizcontrol.viewcustomer.fn._showCustTab.call(thisObj, event, ui); } });
            }

            var m_customer = new cm.customer();
            m_customer.Customer_Id = customer_id;
            m_customer.readCustomer(function (obj) {

                thisObj.customer = obj;
                thisObj.m_custNameCtrl.text(obj.CustName);
                thisObj.m_custgroupCtrl.text(obj.OtherProps.CustomerGroupName);
                thisObj.m_emailCtrl.text(obj.Email);
                thisObj.m_telCtrl.text(obj.Tel);
                thisObj.m_countryCtrl.text(obj.OtherProps.GlobalAreaName);
                thisObj.m_shopsiteCtrl.text(obj.OtherProps.SPfName);
                thisObj.m_contractinfoCtrl.text(obj.ContactInfo);
                thisObj.m_remarkCtrl.text(obj.Remark);

                $.each(thisObj.customer.RvAddresses, function () {
                    this.GlobalAreaName = this.OtherProps.GlobalAreaName;
                });

                if (thisObj.actionCustTab == "rvaddress") {
                    thisObj.rvaddressList.bindDataSource(thisObj.customer.RvAddresses);
                }

                thisObj.viewCustomerFrm.show();
            });
        },

        /* 展示客户Tab */
        _showCustTab: function (event, ui) {
            if (ui.index == 1) {
                this.actionCustTab = "rvaddress";

                if (!this.rvaddressList) {
                    this.rvaddressList = new uicontrol.tableList("view_RvAddressList",
                                     { autoSeq: true,
                                         keyColumn: "Customer_RvAddress_Id",
                                         height: 300,
                                         columns: [{ display: mlm.C1226, name: "RvFullName", width: 150, align: 'left', adjust: true, createCell: bizcontrol.viewcustomer.fn._constructAddrCell },
                                                   { display: mlm.C0240, name: "GlobalAreaName", width: 100, align: 'left' },
                                                   { display: mlm.C1227, name: "RvProvince", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewcustomer.fn._constructAddrCell },
                                                   { display: mlm.C0460, name: "RvCity", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewcustomer.fn._constructAddrCell },
                                                   { display: mlm.C1229, name: "", width: 220, align: 'left', adjust: true, createCell: bizcontrol.viewcustomer.fn._constructRvAddressCell },
                                                   { display: mlm.C1228, name: "RvPostCode", width: 100, align: 'left' },
                                                   { display: mlm.C0311, name: "RvTel", width: 100, align: 'left'}]
                                     });
                }

                this.rvaddressList.bindDataSource(this.customer.RvAddresses);
            }
            else {
                this.actionCustTab = "customer";
            }
        },

        /* */
        _constructAddrCell: function (key, cellValue) {
            return commoncore.func.showSpecialChar(cellValue);
        },
        /* 构建收货地址列 */
        _constructRvAddressCell: function (key, cellValue) {
            var m_arr = [];
            if (this.keyObj.RvAddress_2) {
                m_arr.push(this.keyObj.RvAddress_1 + " " + this.keyObj.RvAddress_2);
            }
            else {
                m_arr.push(this.keyObj.RvAddress_1);
            }

            return commoncore.func.showSpecialChar(m_arr.join(","));
        }
    };

    bizcontrol.viewcustomer.fn.init.prototype = bizcontrol.viewcustomer.fn;

})(window);