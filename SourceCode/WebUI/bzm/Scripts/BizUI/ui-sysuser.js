
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadUsers);

/* 页面变量 */
window.pageVariable = { };

/* 初始化界面 */
function initPage() {

    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btNewSysUser").click(openNewUserFrm);
    $("#btQuerySysUser").click(openQueryUserFrm);
    $("#btNewSysUser, #btQuerySysUser").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();

    if (pageVariable.userTable) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.userTable.resize(mainFormHeight);
    }
}

/* 打开查询用户的窗体 */
function openQueryUserFrm() {
    if (!pageVariable.queryUserFrm) {
        pageVariable.queryUserFrm = new uicontrol.dialog("queryUserFrm", mlm.C0304, { width: 825, position: ["auto", 60] }, loadUsers);

        if (!pageVariable.roleSource) {
            var m_roleservice = new um.sysrole();
            m_roleservice.queryAllSysRoles(function (retObj) {
                pageVariable.roleSource = datastruct.convertion.tableToJson(retObj);

                var m_role_qCtrl = $("#ddlPopedom_q");
                m_role_qCtrl.append("<option value='0'></option>");
                $.each(pageVariable.roleSource, function () {
                    m_role_qCtrl.append("<option value='" + this.SysRole_Id + "'>" + this.RoleName + "</option>");
                });
            });
        }
        else {
            var m_role_qCtrl = $("#ddlPopedom_q");
            m_role_qCtrl.append("<option value='0'></option>");
            $.each(pageVariable.roleSource, function () {
                m_role_qCtrl.append("<option value='" + this.SysRole_Id + "'>" + this.RoleName + "</option>");
            });
        }

        if (!pageVariable.salesiteSource) {
            var m_saleplatform = new sm.saleplatform();
            m_saleplatform.queryAvaiSaleSites(function (retObj) {
                var m_list = [];

                pageVariable.salesiteSource = datastruct.convertion.tableToJson(retObj);

                var m_ssite_qCtrl = $("#ddlSaleSite_q");
                m_ssite_qCtrl.append("<option value='0'></option>");
                $.each(pageVariable.salesiteSource, function () {
                    m_ssite_qCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
                });
            });
        }
        else {
            var m_ssite_qCtrl = $("#ddlSaleSite_q");
            m_ssite_qCtrl.append("<option value='0'></option>");
            $.each(pageVariable.salesiteSource, function () {
                m_ssite_qCtrl.append("<option value='" + this.SaleSite_Id + "'>" + this.SPfName + "-" + this.SaleSiteName + "</option>");
            });
        }
    }

    pageVariable.queryUserFrm.show();
}

/* 加载用户 */
function loadUsers() {
    if (!pageVariable.userTable) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.userTable = new uicontrol.tableList("userTable",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: mainFormHeight,
                                         keyColumn: "SysUser_Id",
                                         columns: [{ display: mlm.C0309, name: "FullName", width: 150, align: 'left' },
                                                   { display: mlm.C0310, name: "Email", width: 220, align: 'left' },
                                                   { display: mlm.C0311, name: "Tel", width: 150, align: 'left' },
                                                   { display: mlm.C0073, name: "Remark", width: 480, align: 'left', allowNewLine: true },
                                                   { display: mlm.C0019, name: "", width: 100, align: 'center', adjust: true, modifiedFunc: "openModifyUserFrm", deletedFunc: "openDeleteUserFrm"}]
                                     });
    }

    var m_userservice = new um.sysuser();
    m_userservice.SaleSite_Id = $("#ddlSaleSite_q").val();
    m_userservice.SysRole_Id = $("#ddlPopedom_q").val();
    m_userservice.querySysUsers(function (retObj) {
        pageVariable.userTable.bindDataSource(retObj);

        if (pageVariable.queryUserFrm) {
            pageVariable.queryUserFrm.close();
        }
    });
}

/* 打开新增用户的窗体 */
function openNewUserFrm() {
    if (!pageVariable.handlerUserFrm) {
        pageVariable.handlerUserFrm = new uicontrol.dialog("handlerUserFrm", "", { width: 915, position: ["auto", 60] }, saveUser);

        pageVariable.popedomsCtrl = new uicontrol.selectbox("ulSysPopedom", "checkbox");
        pageVariable.salesiteCtrl = new uicontrol.selectbox("chkSaleSite", "checkbox");
        $("#sysUserTabs").tabs();
    }

    $("#txtUserName").val("");
    $("#txtEmail").val("");
    $("#txtTel").val("");
    $("#txtRemark").val("");
    loadSysPopedoms(null, pageVariable.popedomsCtrl);
    loadSaleSite(null, pageVariable.salesiteCtrl);

    $("#lkUserInfo").trigger("click");

    pageVariable.handlerUserFrm.sysuser_id = 0;
    pageVariable.handlerUserFrm.action = "New";
    pageVariable.handlerUserFrm.setTitle(mlm.C0305);
    pageVariable.handlerUserFrm.show();
}
/* 打开修改用户的窗体 */
function openModifyUserFrm() {

    if (!pageVariable.handlerUserFrm) {
        pageVariable.handlerUserFrm = new uicontrol.dialog("handlerUserFrm", "", { width: 915, position: ["auto", 60] }, saveUser);

        pageVariable.popedomsCtrl = new uicontrol.selectbox("ulSysPopedom", "checkbox");
        pageVariable.salesiteCtrl = new uicontrol.selectbox("chkSaleSite", "checkbox");
        $("#sysUserTabs").tabs();
    }
    
    var m_userservice = new um.sysuser();
    m_userservice.SysUser_Id = $(this).attr("tag");
    m_userservice.readSysUser(function (retObj) {

        $("#txtUserName").val(retObj.FullName);
        $("#txtEmail").val(retObj.Email);
        $("#txtTel").val(retObj.Tel);
        $("#txtRemark").val(retObj.Remark);

        var m_roles = [];
        $.each(retObj.SysRole_Ids, function () {
            m_roles.push({ key: this });
        });
        loadSysPopedoms(m_roles, pageVariable.popedomsCtrl);

        var m_ssites = [];
        $.each(retObj.SaleSite_Ids, function () {
            m_ssites.push({ key: this });
        });
        loadSaleSite(m_ssites, pageVariable.salesiteCtrl);

        $("#lkUserInfo").trigger("click");

        pageVariable.handlerUserFrm.sysuser_id = m_userservice.SysUser_Id;
        pageVariable.handlerUserFrm.action = "Modify";
        pageVariable.handlerUserFrm.setTitle(mlm.C0315);
        pageVariable.handlerUserFrm.show();
    });

}
/* 打开删除用户的窗体 */
function openDeleteUserFrm() {
    if (!pageVariable.delelteUserFrm) {
        pageVariable.delelteUserFrm = new uicontrol.confirmDelete(deleteUser);
    }

    pageVariable.delelteUserFrm.sysuser_id = $(this).attr("tag"); ;
    var m_user = pageVariable.userTable.getItem(pageVariable.delelteUserFrm.sysuser_id);

    pageVariable.delelteUserFrm.showConfirm(mlm.C0316 + "(" + m_user.FullName + ") ?");
}

/* 加载系统权限 */
function loadSysPopedoms(userPopedoms, popedomsCtrl) {
    if (!popedomsCtrl.isLoad) {
        if (!pageVariable.roleSource) {
            var m_roleservice = new um.sysrole();
            m_roleservice.queryAllSysRoles(function (retObj) {
                pageVariable.roleSource = datastruct.convertion.tableToJson(retObj);

                var m_source = [];
                $.each(pageVariable.roleSource, function () {
                    m_source.push({ key: this.SysRole_Id, value: this.RoleName, otherHtml: "<div class='syspopedom-remark'>" + this.Remark + "</div>" });
                });

                popedomsCtrl.bindSource(m_source);
                popedomsCtrl.setSelectedItem(userPopedoms);
                popedomsCtrl.isLoad = true;
            });
        }
        else {
            var m_source = [];
            $.each(pageVariable.roleSource, function () {
                m_source.push({ key: this.SysRole_Id, value: this.RoleName, otherHtml: "<div class='syspopedom-remark'>" + this.Remark + "</div>" });
            });

            popedomsCtrl.bindSource(m_source);
            popedomsCtrl.setSelectedItem(userPopedoms);
            popedomsCtrl.isLoad = true;
        }
    }
    else {
        popedomsCtrl.setSelectedItem(userPopedoms);
    }
}
/* 加载销售平台 */
function loadSaleSite(salesites, salesiteCtrl) {

    if (!salesiteCtrl.isLoad) {
        if (!pageVariable.salesiteSource) {

            var m_saleplatform = new sm.saleplatform();
            m_saleplatform.queryAvaiSaleSites(function (retObj) {
                var m_list = [];

                pageVariable.salesiteSource = datastruct.convertion.tableToJson(retObj);
                $.each(pageVariable.salesiteSource, function () {
                    m_list.push({ key: this.SaleSite_Id, value: this.SPfName + "-" + this.SaleSiteName });
                });

                salesiteCtrl.bindSource(m_list);
                salesiteCtrl.setSelectedItem(salesites);
                salesiteCtrl.isLoad = true;
            });
        }
        else {
            var m_list = [];
            $.each(pageVariable.salesiteSource, function () {
                m_list.push({ key: this.SaleSite_Id, value: this.SaleSiteName });
            });

            salesiteCtrl.bindSource(m_list);
            salesiteCtrl.setSelectedItem(salesites);
            salesiteCtrl.isLoad = true;
        }
    }
    else {
        salesiteCtrl.setSelectedItem(salesites);
    }
}

/* 保存用户 */
function saveUser() {
    var m_username = $.trim($("#txtUserName").val());
    if (!m_username) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0317);
        return;
    }

    var m_email = $.trim($("#txtEmail").val());
    if (!m_email) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0318);
        return;
    }

    var m_userservice = new um.sysuser();
    m_userservice.SysUser_Id = pageVariable.handlerUserFrm.sysuser_id;
    m_userservice.FullName = m_username;
    m_userservice.Email = m_email;
    m_userservice.Tel = $.trim($("#txtTel").val());
    m_userservice.Remark = $.trim($("#txtRemark").val());

    m_userservice.SysRole_Ids = pageVariable.popedomsCtrl.getSelectedItem();
    m_userservice.SaleSite_Ids = pageVariable.salesiteCtrl.getSelectedItem();

    if (pageVariable.handlerUserFrm.action == "New") {
        m_userservice.newSysUser(function (retObj) {
            pageVariable.userTable.addData(retObj.SysUser_Id, retObj);

            pageVariable.handlerUserFrm.close();
        });
    }
    else {
        m_userservice.modifySysUser(function () {
            pageVariable.userTable.modifyData(m_userservice.SysUser_Id, m_userservice);

            pageVariable.handlerUserFrm.close();
        });
    }
}
/* 删除用户 */
function deleteUser() {
    var m_userservice = new um.sysuser();
    m_userservice.SysUser_Id = pageVariable.delelteUserFrm.sysuser_id;
    m_userservice.deleteSysUser(function (retObj) {

        pageVariable.userTable.deleteData(m_userservice.SysUser_Id);

        pageVariable.delelteUserFrm.close();
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 系统用户 */
    $("#lbSysUserTag").text(mlm.M0044);
    /* 查询用户 */
    $("#btQuerySysUser").val(mlm.C0304);
    /* 新增用户 */
    $("#btNewSysUser").val(mlm.C0305);
    /* 用户列表 */
    $("#lbSysUserTitle").text(mlm.C0306);
    /* 基本信息 */
    $("#lkUserInfo").text(mlm.C0286);
    /* 数据权限 */
    $("#lkDataPopedom").text(mlm.C0307);
    /* 系统权限 */
    $("#lkMenuPopedom").text(mlm.C0308);
    $("#lbPopedom_q").text(mlm.C0308 + ":");

    /* 用户名 */
    $("#lbUserNameSymbol").text(mlm.C0309 + ":");
    /* 邮箱 */
    $("#lbEmailSymbol").text(mlm.C0310 + ":");
    /* 联系电话 */
    $("#lbTelSymbol").text(mlm.C0311 + ":");
    /* 备注 */
    $("#lbRemarkSymbol").text(mlm.C0073 + ":");
    /* 网络销售平台 */
    $("#lbSaleSiteSymbol, #lbSaleSiteSymbol_q").text(mlm.C0313 + ":");

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2").text(mlm.C0049);

    /* ECMS-系统用户 */
    document.title = mlm.C0303;
}