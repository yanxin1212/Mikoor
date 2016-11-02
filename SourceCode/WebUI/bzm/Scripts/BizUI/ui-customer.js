
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadCustomers);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#customerGroupTag").click(function () {
        loadCustomerGroups();
    });

    $("#customerTag").click(function () {
        queryCustomer(1, pageVariable.customerList.pageNumber);
    });

    $("#btNewCustomerGroup").click(openNewCGFrm);
    $("#btNewCustomer").click(openNewCustFrm);
    $("#btQueryCust").click(openQueryCustFrm);
    $("#btAddRvAddress").click(openNewRvAddressFrm);
    $("#btNewCustomerGroup, #btNewCustomer, #btQueryCust, #btAddRvAddress").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

    pageVariable.viewCustomerFrm = new bizcontrol.viewcustomer();
}

/* 设置页面布局 */
function setLayout() {

    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;

    if (pageVariable.customerList) {
        pageVariable.customerList.resize(mainFormHeight);
    }

    if (pageVariable.customerGroupList) {
        pageVariable.customerGroupList.resize(mainFormHeight);
    }
}

/* 加载客户数据 */
function loadCustomers() {
    if (!pageVariable.customerList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
        pageVariable.customerList = new uicontrol.tableList("customerList",
                                     { isPaging: true,
                                         autoSeq: true,
                                         keyColumn: "Customer_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryCustomer,
                                         columns: [{ display: mlm.C0364, name: "CustName", width: 180, align: 'left', adjust: true, createCell: constructCustName },
                                                   { display: mlm.C0358, name: "CustomerGroupName", width: 120, align: 'left' },
                                                   { display: mlm.C0310, name: "Email", width: 180, align: 'left' },
                                                   { display: mlm.C0311, name: "Tel", width: 150, align: 'left' },
                                                   { display: mlm.C1223, name: "GlobalAreaName", width: 120, align: 'left' },
                                                   { display: mlm.C1224, name: "SPfName", width: 120, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 120, align: 'center', adjust: true, modifiedFunc: "openModifyCustFrm", deletedFunc: "openDeleteCustFrm"}]
                                     });
    }

    queryCustomer(1, pageVariable.customerList.pageNumber);
}
/* 构造客户名称列 */
function constructCustName(key, cellValue) {
    return "<a onclick='openViewCustFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
}

/* 打开查询客户的窗体 */
function openQueryCustFrm() {
    if (!pageVariable.queryCustFrm) {
        pageVariable.queryCustFrm = new uicontrol.dialog("queryCustFrm", mlm.C0360, { width: 800 }, function () { queryCustomer(1, pageVariable.customerList.pageNumber); });

        loadSaleplatforms($("#ddlShopSite_Q"));
    }

    var m_cgId = $("#ddlCG_Q").val();
    setCGOptions(m_cgId, $("#ddlCG_Q"), true);

    pageVariable.queryCustFrm.show();
}
/* 查询客户 */
function queryCustomer(pageNum, pageCount) {
    var m_customer = new cm.customer();
    m_customer.CustomerGroup_Id = $("#ddlCG_Q").val();
    m_customer.SalePlatform_Id = $("#ddlShopSite_Q").val();
    m_customer.Keywords = $.trim($("#txtKeywords").val());
    m_customer.Page = pageNum;
    m_customer.PageNum = pageCount;

    m_customer.queryCustomers(function (retTable) {
        pageVariable.customerList.bindDataSource(retTable);

        if (pageVariable.queryCustFrm) {
            pageVariable.queryCustFrm.close();
        }
    });
}

/* 加载客户群数据 */
function loadCustomerGroups() {
    if (!pageVariable.customerGroupList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 2;
        pageVariable.customerGroupList = new uicontrol.tableList("customerGroupList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "CustomerGroup_Id",
                                         height: mainFormHeight,
                                         columns: [{ display: mlm.C0358, name: "CustomerGroupName", width: 200, align: 'left' },
                                                   { display: mlm.C0371, name: "CustomerCount", width: 200, align: 'center' },
                                                   { display: mlm.C0073, name: "Remark", width: 500, align: 'left', adjust: true, createCell: constructCGRemarkCell },
                                                   { display: mlm.C0019, name: "", width: 90, align: 'center', adjust: true, modifiedFunc: "openModifyCGFrm", deletedFunc: "openDeleteCGFrm"}]
                                     });
    }

    if (!pageVariable.customerGroupSource) {
        pageVariable.customerGroupSource = { table: null, json: null };

        var m_customergroup = new cm.customergroup();
        m_customergroup.queryCustomerGroups(function (retTable) {

            pageVariable.customerGroupSource.table = retTable;
            pageVariable.customerGroupSource.json = datastruct.convertion.tableToJson(retTable);

            pageVariable.customerGroupList.bindDataSource(retTable);
        });
    }
    else {
        pageVariable.customerGroupList.bindDataSource(pageVariable.customerGroupSource.table);
    }
}
/* 构建客户群备注列 */
function constructCGRemarkCell(key, cellValue) {
    return cellValue.replace(/\^/g, "\"").replace(/\n/g, "<br>");
}

/* 打开新增客户群的窗体 */
function openNewCGFrm() {
    if (!pageVariable.handlerCGFrm) {
        pageVariable.handlerCGFrm = new uicontrol.dialog("handlerCGFrm", "", { width: 800 }, saveCG);
    }

    $("#txtCGSeq").attr("disabled", "disabled").val(mlm.C0142);
    $("#txtCGName").val("");
    $("#txtCGRemark").val("");

    pageVariable.handlerCGFrm.customergroup_id = 0;
    pageVariable.handlerCGFrm.action = "New";
    pageVariable.handlerCGFrm.setTitle(mlm.C0363);
    pageVariable.handlerCGFrm.show();
}
/* 打开修改客户群的窗体 */
function openModifyCGFrm() {
    if (!pageVariable.handlerCGFrm) {
        pageVariable.handlerCGFrm = new uicontrol.dialog("handlerCGFrm", "", { width: 800 }, saveCG);
    }

    pageVariable.handlerCGFrm.customergroup_id = $(this).attr("tag");

    var m_customergroup = new cm.customergroup();
    m_customergroup.CustomerGroup_Id = pageVariable.handlerCGFrm.customergroup_id;
    m_customergroup.readCustomerGroup(function (retObj) {
        $("#txtCGSeq").attr("disabled", false).val(retObj.Seq);
        $("#txtCGName").val(retObj.CustomerGroupName);
        $("#txtCGRemark").val(retObj.Remark);

        pageVariable.handlerCGFrm.action = "Modify";
        pageVariable.handlerCGFrm.setTitle(mlm.C0372);
        pageVariable.handlerCGFrm.show();
    });
}
/* 打开删除客户群的窗体 */
function openDeleteCGFrm() {
    if (!pageVariable.delelteCGFrm) {
        pageVariable.delelteCGFrm = new uicontrol.confirmDelete(deleteCustomerGroup);
    }

    pageVariable.delelteCGFrm.customergroup_id = $(this).attr("tag"); ;
    var m_customergroup = pageVariable.customerGroupList.getItem(pageVariable.delelteCGFrm.customergroup_id);

    pageVariable.delelteCGFrm.showConfirm(mlm.C0373 + "(" + m_customergroup.CustomerGroupName + ") ?");
}
/* 保存客户群  */
function saveCG() {
    var customerGroupName = $.trim($("#txtCGName").val());
    if (!customerGroupName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0374);
        return;
    }

    var m_customergroup = new cm.customergroup();

    if (pageVariable.handlerCGFrm.action == "Modify") {
        var seq = $("#txtCGSeq").val();
        if (!seq) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0057);
            return;
        }
        m_customergroup.Seq = seq;
    }

    m_customergroup.CustomerGroup_Id = pageVariable.handlerCGFrm.customergroup_id;
    m_customergroup.CustomerGroupName = customerGroupName;
    m_customergroup.Remark = $.trim($("#txtCGRemark").val());

    if (pageVariable.handlerCGFrm.action == "New") {
        m_customergroup.newCustomerGroup(function (retObj) {
            retObj.CustomerCount = 0;
            pageVariable.customerGroupList.addData(retObj.CustomerGroup_Id, retObj);
            
            pageVariable.customerGroupSource = null;
            pageVariable.handlerCGFrm.close();
        });
    }
    else {
        m_customergroup.modifyCustomerGroup(function () {
            var m_oldSeq = pageVariable.customerGroupList.getItemSeq(m_customergroup.CustomerGroup_Id);

            pageVariable.customerGroupSource = null;

            /* 序号是否改变 */
            if (m_oldSeq == m_customergroup.Seq) {

                var m_selectedObj = pageVariable.customerGroupList.getItem(m_customergroup.CustomerGroup_Id);
                m_customergroup.CustomerCount = m_selectedObj.CustomerCount;
                pageVariable.customerGroupList.modifyData(m_customergroup.CustomerGroup_Id, m_customergroup);
            }
            else {
                loadCustomerGroups();
            }

            pageVariable.handlerCGFrm.close();
        });
    }
}
/* 删除客户群 */
function deleteCustomerGroup() {
    var m_customergroup = new cm.customergroup();

    m_customergroup.CustomerGroup_Id = pageVariable.delelteCGFrm.customergroup_id;
    m_customergroup.deleteCustomerGroup(function () {

        pageVariable.customerGroupList.deleteData(m_customergroup.CustomerGroup_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        pageVariable.customerGroupSource = null;
        pageVariable.delelteCGFrm.close();
    });
}

/* 初始化处理客户的窗体 */
function initHandlerCustFrm(event) {
    if (!pageVariable.handlerCustFrm) {
        pageVariable.handlerCustFrm = new uicontrol.dialog("handlerCustFrm", "", { width: 925, position: ["auto", 10] }, saveCust);

        pageVariable.ssCustTabs = $("#ssCustTabs").tabs({ show: showCustTab });
        pageVariable.ddlCustCountry = new bizcontrol.selectglobalarea("ddlCustCountry", true, "country");

        loadSaleplatforms($("#ddlRegSite"), event);
    }
    else {
        if (event) {
            event();
        }
    }
}
/* 加载站点 */
function loadSaleplatforms(ctrl, event) {
    var m_saleplatform = new sm.saleplatform();
    m_saleplatform.querySalePlatforms(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        ctrl.append("<option></option>");
        $.each(m_jsonobjs, function () {
            ctrl.append("<option value='" + this.SalePlatform_Id + "'>" + this.SPfName + "</option>");
        });

        if (event) {
            event();
        }
    });
}
/* 打开新增客户的窗体 */
function openNewCustFrm() {

    initHandlerCustFrm();
    setCGOptions(null, $("#ddlCustGroup"));

    $("#txtCustName").val("");
    $("#txtEmail").val("");
    $("#txtMobile").val("");
    $("#txtTel").val("");
    $("#txtContactInfo").val("");
    $("#txtCustRemark").val("");

    if (pageVariable.rvaddressList) {
        pageVariable.rvaddressList.bindDataSource(null);
    }

    pageVariable.handlerCustFrm.customer = {};
    pageVariable.handlerCustFrm.customer_id = 0;
    pageVariable.handlerCustFrm.max_rv_key = 10000;
    pageVariable.handlerCustFrm.action = "New";
    pageVariable.handlerCustFrm.setTitle(mlm.C0361);
    pageVariable.handlerCustFrm.show();
}
/* 打开修改客户的窗体 */
function openModifyCustFrm() {

    var m_key = $(this).attr("tag");
    var m_readfunc = function () {
        var m_customer = new cm.customer();
        m_customer.Customer_Id = m_key;
        m_customer.readCustomer(function (retObj) {

            setCGOptions(retObj.CustomerGroup_Id, $("#ddlCustGroup"));

            $("#txtCustName").val(retObj.CustName);
            $("#txtEmail").val(retObj.Email);
            $("#txtTel").val(retObj.Tel);
            $("#txtContactInfo").val(retObj.ContactInfo);
            $("#txtCustRemark").val(retObj.Remark);
            $("#ddlRegSite").val(retObj.SalePlatform_Id);
            pageVariable.ddlCustCountry.setObj({ globalArea_Ids: retObj.GlobalArea_Id, globalAreaNames: retObj.OtherProps.GlobalAreaName });

            pageVariable.handlerCustFrm.customer = retObj;

            $.each(pageVariable.handlerCustFrm.customer.RvAddresses, function () {
                this.GlobalAreaName = this.OtherProps.GlobalAreaName;
            });

            if (pageVariable.rvaddressList) {
                pageVariable.rvaddressList.bindDataSource(pageVariable.handlerCustFrm.customer.RvAddresses);
            }
        });
    };

    initHandlerCustFrm(m_readfunc);

    pageVariable.handlerCustFrm.customer_id = m_key;
    pageVariable.handlerCustFrm.action = "Modify";
    pageVariable.handlerCustFrm.setTitle(mlm.C0377);
    pageVariable.handlerCustFrm.show();
}
/* 打开删除客户的窗体 */
function openDeleteCustFrm() {
    if (!pageVariable.delelteCustFrm) {
        pageVariable.delelteCustFrm = new uicontrol.confirmDelete(deleteCustomer);
    }

    pageVariable.delelteCustFrm.customer_id = $(this).attr("tag"); ;
    var m_customer = pageVariable.customerList.getItem(pageVariable.delelteCustFrm.customer_id);

    pageVariable.delelteCustFrm.showConfirm(mlm.C0378 + "(" + m_customer.CustName + ") ?");
}
/* 展示客户Tab */
function showCustTab(event, ui) {
    if (ui.index == 1) {
        if (!pageVariable.rvaddressList) {
            pageVariable.rvaddressList = new uicontrol.tableList("rvaddressList",
                                     { autoSeq: true,
                                         keyColumn: "Customer_RvAddress_Id",
                                         height: 300,
                                         columns: [{ display: mlm.C1226, name: "RvFullName", width: 150, align: 'left', adjust: true, createCell: constructRvFullNameCell },
                                                   { display: mlm.C0311, name: "RvTel", width: 120, align: 'left' },
                                                   { display: mlm.C1228, name: "RvPostCode", width: 110, align: 'left' },
                                                   { display: mlm.C1225, name: "", width: 250, align: 'left', adjust: true, createCell: constructRvAddressCell },
                                                   { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, modifiedFunc: "openModifyRvAddressFrm", deletedFunc: "openDelRvAddressFrm"}]
                                     });

            if (pageVariable.handlerCustFrm.customer) {
                pageVariable.rvaddressList.bindDataSource(pageVariable.handlerCustFrm.customer.RvAddresses);
            }
        }
    }
}
/* 构建收件人列 */
function constructRvFullNameCell(key, cellValue) {
    return commoncore.func.showSpecialChar(cellValue);
}
/* 构建收货地址列 */
function constructRvAddressCell(key, cellValue) {
    var m_arr = [];
    if (this.keyObj.RvAddress_2) {
        m_arr.push(this.keyObj.RvAddress_1 + " " + this.keyObj.RvAddress_2);
    }
    else {
        m_arr.push(this.keyObj.RvAddress_1);
    }
    if (this.keyObj.RvCity) {
        m_arr.push(this.keyObj.RvCity);
    }
    if (this.keyObj.RvProvince) {
        m_arr.push(this.keyObj.RvProvince);
    }
    m_arr.push(this.keyObj.RvPostCode);
    m_arr.push(this.keyObj.GlobalAreaName);

    return commoncore.func.showSpecialChar(m_arr.join(","));
}
/* 设置客户群选项 */
function setCGOptions(customergroup_id, custGroupCtrl, allownull) {

    if (!pageVariable.customerGroupSource) {
        pageVariable.customerGroupSource = { table: null, json: null };

        var m_customergroup = new cm.customergroup();
        m_customergroup.queryCustomerGroups(function (retTable) {

            pageVariable.customerGroupSource.table = retTable;
            pageVariable.customerGroupSource.json = datastruct.convertion.tableToJson(retTable);

            custGroupCtrl.empty();

            if (allownull) {
                custGroupCtrl.append("<option></option>");
            }

            $.each(pageVariable.customerGroupSource.json, function () {
                custGroupCtrl.append("<option value='" + this.CustomerGroup_Id + "'>" + this.CustomerGroupName + "</option>");
            });

            custGroupCtrl.val(customergroup_id);
        });
    }
    else {

        if (custGroupCtrl.children().length == 0) {
            if (allownull) {
                custGroupCtrl.append("<option></option>");
            }

            $.each(pageVariable.customerGroupSource.json, function () {
                custGroupCtrl.append("<option value='" + this.CustomerGroup_Id + "'>" + this.CustomerGroupName + "</option>");
            });
        }

        custGroupCtrl.val(customergroup_id);
    }
}
/* 保存客户 */
function saveCust() {
    var customerName = $.trim($("#txtCustName").val());
    if (!customerName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0379);
        return;
    }

    var custGroupId = $("#ddlCustGroup").val();
    if (!custGroupId) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0374);
        return;
    }

    var m_countryObj = pageVariable.ddlCustCountry.getObj();
    if (!m_countryObj || !m_countryObj.globalArea_Ids) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1223 + mlm.C0713);
        return;
    }

    var m_customer = new cm.customer();
    m_customer.Customer_Id = pageVariable.handlerCustFrm.customer_id;
    m_customer.CustomerGroup_Id = custGroupId;
    m_customer.CustName = customerName;
    m_customer.Email = $.trim($("#txtEmail").val());
    m_customer.Tel = $.trim($("#txtTel").val());
    m_customer.GlobalArea_Id = m_countryObj.globalArea_Ids;
    m_customer.GlobalAreaName = m_countryObj.globalAreaNames;
    m_customer.ContactInfo = $.trim($("#txtContactInfo").val());
    m_customer.Remark = $.trim($("#txtCustRemark").val());

    var m_SalePlatform_Id = $("#ddlRegSite").val();
    if (m_SalePlatform_Id) {
        m_customer.SalePlatform_Id = m_SalePlatform_Id;
    }
    m_customer.RvAddresses = [];

    if (pageVariable.rvaddressList) {
        $.each(pageVariable.rvaddressList.dataSource.items.arrValues, function () {
            if (this.Customer_RvAddress_Id > 9999) {
                this.Customer_RvAddress_Id = 0;
            }

            m_customer.RvAddresses.push(this);
        })
    }
    else {
        m_customer.RvAddresses = pageVariable.handlerCustFrm.customer.RvAddresses;
    }

    if (pageVariable.handlerCustFrm.action == "New") {
        m_customer.newCustomer(function (retObj) {
            retObj.CustomerGroupName = $("#ddlCustGroup").find("option:selected").text();
            retObj.SPfName = $("#ddlRegSite").find("option:selected").text();
            retObj.GlobalAreaName = m_customer.GlobalAreaName;
            pageVariable.customerList.addData(retObj.Customer_Id, retObj);

            pageVariable.customerGroupSource = null;
            pageVariable.handlerCustFrm.close();
        });
    }
    else {
        m_customer.modifyCustomer(function () {
            m_customer.CustomerGroupName = $("#ddlCustGroup").find("option:selected").text();
            m_customer.SPfName = $("#ddlRegSite").find("option:selected").text();
            m_customer.GlobalAreaName = m_customer.GlobalAreaName;
            pageVariable.customerList.modifyData(m_customer.Customer_Id, m_customer);

            pageVariable.customerGroupSource = null;
            pageVariable.handlerCustFrm.close();
        });
    }
}
/* 删除客户 */
function deleteCustomer() {
    var m_customer = new cm.customer();

    m_customer.Customer_Id = pageVariable.delelteCustFrm.customer_id;
    m_customer.deleteCustomer(function () {

        pageVariable.customerList.deleteData(m_customer.Customer_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        pageVariable.customerGroupSource = null;
        pageVariable.delelteCustFrm.close();
    });
}

/* 打开新增收货地址的窗体 */
function openNewRvAddressFrm() {
    if (!pageVariable.handlerRvAddressFrm) {
        pageVariable.handlerRvAddressFrm = new uicontrol.dialog("handlerRvAddressFrm", "", { width: 900, position: ["auto", 20] }, saveRvAddress);
        pageVariable.ddlRvCountry = new bizcontrol.selectglobalarea("ddlRvCountry", true, "country");
    }

    pageVariable.handlerRvAddressFrm.action = "New";
    pageVariable.handlerRvAddressFrm.setTitle(mlm.C0530 + mlm.C1225);
    pageVariable.handlerRvAddressFrm.show();
}
/* 打开修改收货地址的窗体 */
function openModifyRvAddressFrm() {
    if (!pageVariable.handlerRvAddressFrm) {
        pageVariable.handlerRvAddressFrm = new uicontrol.dialog("handlerRvAddressFrm", "", { width: 900, position: ["auto", 20] }, saveRvAddress);
        pageVariable.ddlRvCountry = new bizcontrol.selectglobalarea("ddlRvCountry", true, "country");
    }

    var m_key = $(this).attr("tag");
    var m_rvaddress = pageVariable.rvaddressList.getItem(m_key);
    $("#txtFullName").val(commoncore.func.showSpecialChar(m_rvaddress.RvFullName));
    $("#txtLinkPhone").val(m_rvaddress.RvTel);
    pageVariable.ddlRvCountry.setObj({ globalArea_Ids: m_rvaddress.GlobalArea_Id, globalAreaNames: m_rvaddress.GlobalAreaName });
    $("#txtProvince").val(commoncore.func.showSpecialChar(m_rvaddress.RvProvince));
    $("#txtCity").val(commoncore.func.showSpecialChar(m_rvaddress.RvCity));
    $("#txtPostCode").val(m_rvaddress.RvPostCode);
    $("#txtStreet_1").val(commoncore.func.showSpecialChar(m_rvaddress.RvAddress_1));
    $("#txtStreet_2").val(commoncore.func.showSpecialChar(m_rvaddress.RvAddress_2));

    pageVariable.handlerRvAddressFrm.customer_rvaddress_id = m_key;
    pageVariable.handlerRvAddressFrm.action = "Modify";
    pageVariable.handlerRvAddressFrm.setTitle(mlm.C0061 + mlm.C1225);
    pageVariable.handlerRvAddressFrm.show();
}
/* 打开删除收货地址的窗体 */
function openDelRvAddressFrm() {
    if (!pageVariable.delRvAddressFrm) {
        pageVariable.delRvAddressFrm = new uicontrol.confirmDelete(deleteRvAddress);
    }

    pageVariable.delRvAddressFrm.customer_rvaddress_id = $(this).attr("tag"); ;
    pageVariable.delRvAddressFrm.showConfirm(mlm.C0464 + mlm.C1225 + "?");
}
/* 保存收货地址 */
function saveRvAddress() {
    var m_fullName = commoncore.func.convertSpecialChar($.trim($("#txtFullName").val()));
    if (!m_fullName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1226 + mlm.C0713);
        return;
    }
    var m_rvcountryObj = pageVariable.ddlRvCountry.getObj();
    if (!m_rvcountryObj || !m_rvcountryObj.globalArea_Ids) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0240 + mlm.C0713);
        return;
    }
    var m_postcode = $.trim($("#txtPostCode").val());
    if (!m_postcode) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1228 + mlm.C0713);
        return;
    }
    var m_street_1 = commoncore.func.convertSpecialChar($.trim($("#txtStreet_1").val()));
    if (!m_street_1) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1229 + mlm.C0713);
        return;
    }
    var m_street_2 = commoncore.func.convertSpecialChar($.trim($("#txtStreet_2").val()));
    if (m_street_1.length > 75 || m_street_2.length > 75) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1232);
        return;
    }

    var m_rvaddress = {};
    m_rvaddress.RvFullName = m_fullName;
    m_rvaddress.RvTel = $.trim($("#txtLinkPhone").val());
    m_rvaddress.GlobalArea_Id = m_rvcountryObj.globalArea_Ids;
    m_rvaddress.GlobalAreaName = m_rvcountryObj.globalAreaNames;
    m_rvaddress.RvProvince = commoncore.func.convertSpecialChar($.trim($("#txtProvince").val()));
    m_rvaddress.RvCity = commoncore.func.convertSpecialChar($.trim($("#txtCity").val()));
    m_rvaddress.RvPostCode = $.trim($("#txtPostCode").val());
    m_rvaddress.RvAddress_1 = m_street_1;
    m_rvaddress.RvAddress_2 = m_street_2;

    if (pageVariable.handlerRvAddressFrm.action == "New") {
        m_rvaddress.Customer_RvAddress_Id = pageVariable.handlerCustFrm.max_rv_key;
        pageVariable.rvaddressList.addData(m_rvaddress.Customer_RvAddress_Id, m_rvaddress);
        pageVariable.handlerCustFrm.max_rv_key++;
    }
    else {
        m_rvaddress.Customer_RvAddress_Id = pageVariable.handlerRvAddressFrm.customer_rvaddress_id;
        pageVariable.rvaddressList.modifyData(m_rvaddress.Customer_RvAddress_Id, m_rvaddress);
    }

    pageVariable.handlerRvAddressFrm.close();
}
/* 删除收货地址 */
function deleteRvAddress() {
    pageVariable.rvaddressList.deleteData(pageVariable.delRvAddressFrm.customer_rvaddress_id);
    pageVariable.delRvAddressFrm.close();
}

/* 查看客户 */
function openViewCustFrm(key) {
    pageVariable.viewCustomerFrm.show(key);
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 销售平台 */
    $("#lbSSiteTitleSymbol").text(mlm.M0038);
    /* 客户群 */
    $("#lbCustomerGroupTag").text(mlm.C0358);
    /* 客户列表 */
    $("#lbCustomerTitle").text(mlm.C0359);

    /* 查询客户 */
    $("#btQueryCust").val(mlm.C0360);
    /* 新增客户 */
    $("#btNewCustomer").val(mlm.C0361);
    /* 新增客户群 */
    $("#btNewCustomerGroup").val(mlm.C0363);

    /* 客户群列表 */
    $("#lbCustomerGroupTitle").text(mlm.C0362);
    /* 客户群 */
    $("#lbCGSymbol, #lbCustGroupSymbol, #lbCG_Q_Symbol").text(mlm.C0358 + ":");
    /* 序号 */
    $("#lbCGSeq").text(mlm.C0041 + ":");
    /* 备注 */
    $("#lbCGRemarkSymbol, #lbCustRemark").text(mlm.C0073 + ":");
    /* 客户名称 */
    $("#lbCustNameSymbol").text(mlm.C0364 + ":");
    /* 关键字 */
    $("#lbKeywordsSymbol").text(mlm.C0184 + ":");
    /* 邮箱 */
    $("#lbEmailSymbol").text(mlm.C0310 + ":");
    /* 基本信息 */
    $("#lbCustInfoSymbol").text(mlm.C0781);
    /* 收货信息 */
    $("#lbExpressInfoSymbol").text(mlm.C1222);
    /* 联系电话 */
    $("#lbTelSymbol, #lbLinkPhoneSymbol").text(mlm.C0311 + ":");
    /* 所属国家 */
    $("#lbCustCountrySymbol").text(mlm.C1223 + ":");
    /* 注册站点 */
    $("#lbRegSiteSymbol, #lbShopSite_Q_Symbol").text(mlm.C1224 + ":");
    /* 其他联系方式 */
    $("#lbContactInfoSymbol").text(mlm.C0312 + ":");
    /* 收货地址列表 */
    $("#lbRvAddressTitle").text(mlm.C1225 + mlm.C0463);
    /* 添加收货地址 */
    $("#btAddRvAddress").val(mlm.C0530 + mlm.C1225);
    /* 收件人 */
    $("#lbFullNameSymbol").text(mlm.C1226 + ":");
    /* 国家 */
    $("#lbCountrySymbol").text(mlm.C0240 + ":");
    /* 省份/州 */
    $("#lbProvinceSymbol").text(mlm.C1227 + ":");
    /* 城市 */
    $("#lbCitySymbol").text(mlm.C0460 + ":");
    /* 邮政编码 */
    $("#lbPostCodeSymbol").text(mlm.C1228 + ":");
    /* 街道地址 */
    $("#lbStreetSymbol").text(mlm.C1229 + ":");
    /* (第一行) */
    $("#lb1stSymbol").text(mlm.C1230);
    /* (第二行) */
    $("#lb2ndSymbol").text(mlm.C1231);

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_3, #lbSymbol_5, #lbSymbol_6, #lbSymbol_7, #lbSymbol_8, #lbSymbol_9").text(mlm.C0049);

    /* ECMS-Customer */
    document.title = mlm.C0368;
}