
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadOrderEmails);

/* 页面变量 */
window.pageVariable = { };

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btQuerySubmitEmail, #btQueryShipEmail, #btQueryRemaidEmail, #btQueryFeedbackEmail, #btQueryEmail, #btSendEmail").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
    $("#btQuerySubmitEmail, #btQueryShipEmail, #btQueryRemaidEmail, #btQueryFeedbackEmail").click(function () {
        pageVariable.querycondition = {};
        pageVariable.querycondition.EmailType = $(this).attr("tag");

        queryOrderEmails(1, pageVariable.orderemailList.pageNumber);
    }); 
    $("#btQueryEmail").click(openQueryEmail);
    $("#btSendEmail").click(sendEmail);

    pageVariable.querycondition = {};
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#pageContentForm").css("height", mainFormHeight);
}

/*  */
function loadOrderEmails() {

    pageframe.control.processCtrl.showOperaProcess();

    var m_sysemail = new spm.sysemail();
    m_sysemail.generateReceiveRemindEmail(function () {
        querySysEmailStat();
    });
}
/*  */
function querySysEmailStat() {

    pageframe.control.processCtrl.showOperaProcess();

    var m_querysubmitCtrl = $("#btQuerySubmitEmail");
    var m_queryshipCtrl = $("#btQueryShipEmail");
    var m_queryremindCtrl = $("#btQueryRemaidEmail");
    var m_queryfeedbackCtrl = $("#btQueryFeedbackEmail");

    m_querysubmitCtrl.val(mlm.C1630);
    m_queryshipCtrl.val(mlm.C1631);
    m_queryremindCtrl.val(mlm.C1632);
    m_queryfeedbackCtrl.val(mlm.C1633);

    var m_ctrls = $("#btQuerySubmitEmail, #btQueryShipEmail, #btQueryRemaidEmail, #btQueryFeedbackEmail");
    m_ctrls.unbind("mouseenter mouseleave");
    m_ctrls.css("background-color", "#CCCCCC");

    var m_sysemail = new spm.sysemail();
    m_sysemail.getSysEmailStat(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            if (Number(this.EmailCount) > 0) {
                if (this.EmailType == "1") {
                    m_querysubmitCtrl.val(mlm.C1630 + "(" + this.EmailCount + ")");
                    m_querysubmitCtrl.css("background-color", "");
                    m_querysubmitCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
                else if (this.EmailType == "2") {
                    m_queryshipCtrl.val(mlm.C1631 + "(" + this.EmailCount + ")");
                    m_queryshipCtrl.css("background-color", "");
                    m_queryshipCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

                    pageframe.control.multiButtion.init("btWaitSubmit", "dvWaitSubmit");
                }
                else if (this.EmailType == "3") {
                    m_queryremindCtrl.val(mlm.C1632 + "(" + this.EmailCount + ")");
                    m_queryremindCtrl.css("background-color", "");
                    m_queryremindCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
                else if (this.EmailType == "4") {
                    m_queryfeedbackCtrl.val(mlm.C1633 + "(" + this.EmailCount + ")");
                    m_queryfeedbackCtrl.css("background-color", "");
                    m_queryfeedbackCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                }
            }
        });

        if (!pageVariable.orderemailList) {
            var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
            pageVariable.orderemailList = new uicontrol.tableList("orderemailList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "SysEmail_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: queryOrderEmails,
                                         columns: [{ display: mlm.C0416, name: "", width: 110, align: 'left', adjust: true, createCell: createSaleSiteCell },
                                                   { display: mlm.C0719, name: "CustName", width: 110, align: 'left' },
                                                   { display: mlm.C0310, name: "CustEmail", width: 200, align: 'left' },
                                                   { display: mlm.C1634, name: "EmailTitle", width: 400, align: 'left', adjust: true, createCell: createEmailTitleCell },
                                                   { display: mlm.C1635, name: "CreateTimeStr", width: 85, align: 'left', adjust: true, createCell: createDateTimeCell },
                                                   { display: mlm.C1636, name: "SendTimeStr", width: 85, align: 'center', adjust: true, createCell: createDateTimeCell },
                                                   { display: mlm.C0019, name: "", width: 50, align: 'center', adjust: true, createCell: createOperateCell}]
                                     });

        }

        pageframe.control.processCtrl.hideOperaProcess();
    });
}
/*  */
function createSaleSiteCell(key, cellValue) {
    return this.keyObj.SPfName + "-" + this.keyObj.SaleSiteName;
}
/*  */
function createDateTimeCell(key, cellValue) {
    if (cellValue) {
        return "<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(cellValue) + "</div>";
    }
}
/*  */
function createEmailTitleCell(key, cellValue) {
    if (cellValue) {
        return "<a href='javascript:void(\"0\");' onclick='viewEmail.call(this, \"" + key + "\")'>" + cellValue + "</a>";
    }
}
/*  */
function createOperateCell(key, cellValue) {
    if (!this.keyObj.SendTimeStr) {
        return "<a href='javascript:void(\"0\");' onclick='openDeleteEmailFrm.call(this, \"" + key + "\")'>" + mlm.C0062 + "</a>";
    }
}
/*  */
function openQueryEmail() {
    if (!pageVariable.querySysEmailFrm) {
        pageVariable.querySysEmailFrm = new uicontrol.dialog("querySysEmailFrm", mlm.C0562 + mlm.C1626, { width: 800, position: ["auto", 15] }, function () {
            getEmailQueryCondition();
            queryOrderEmails(1, pageVariable.orderemailList.pageNumber);

            pageVariable.querySysEmailFrm.close();
        });

        pageVariable.ddlEmailState = new uicontrol.selectbox("ddlEmailState", "radio");
        var m_emailstateoptions = [];
        m_emailstateoptions.push({ key: "-1", value: mlm.C0403 });
        m_emailstateoptions.push({ key: "1", value: mlm.C1637 });
        m_emailstateoptions.push({ key: "0", value: mlm.C1638 });
        pageVariable.ddlEmailState.bindSource(m_emailstateoptions);

        pageVariable.ddlEmailType = new uicontrol.selectbox("ddlEmailType", "radio");
        var m_emailtypeoptions = [];
        m_emailtypeoptions.push({ key: "0", value: mlm.C0403 });
        m_emailtypeoptions.push({ key: "1", value: mlm.C1630 });
        m_emailtypeoptions.push({ key: "2", value: mlm.C1631 });
        m_emailtypeoptions.push({ key: "3", value: mlm.C1632 });
        m_emailtypeoptions.push({ key: "4", value: mlm.C1633 });
        pageVariable.ddlEmailType.bindSource(m_emailtypeoptions);

        var m_selectedoption = [];
        m_selectedoption.push({ key: "-1" });
        pageVariable.ddlEmailState.setSelectedItem(m_selectedoption);

        var m_selectedtypeoption = [];
        m_selectedtypeoption.push({ key: "0" });
        pageVariable.ddlEmailType.setSelectedItem(m_selectedtypeoption);
    }

    pageVariable.ddlEmailType.setSelectedItem([{ key: pageVariable.querycondition.EmailType}]);

    pageVariable.querySysEmailFrm.show();
}
/*  */
function getEmailQueryCondition() {
    pageVariable.querycondition.Keywords = $.trim($("#txtEmailKey").val());
    pageVariable.querycondition.EmailType = pageVariable.ddlEmailType.getSelectedItem()[0];
    pageVariable.querycondition.State = pageVariable.ddlEmailState.getSelectedItem()[0];
}
/* 查询邮件列表 */
function queryOrderEmails(pageNum, pageCount) {
    var m_sysemail = new spm.sysemail();
    m_sysemail = $.extend(m_sysemail, pageVariable.querycondition);

    m_sysemail.Page = pageNum;
    m_sysemail.PageNum = pageCount;
    m_sysemail.querySysEmail(function (retTable) {
        pageVariable.orderemailList.bindDataSource(retTable);
    });
}
/* 查看邮件 */
function viewEmail(key) {
    window.open("_email.htm?sysemail_id=" + key, '', 'height=600, width=1180, top=60, left=30, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');
}

/*  */
function openDeleteEmailFrm(key) {
    if (!pageVariable.deleteEmailFrm) {
        pageVariable.deleteEmailFrm = new uicontrol.confirmDelete(deleteSysEmail);
    }

    pageVariable.deleteEmailFrm.sysemail_id = key;
    pageVariable.deleteEmailFrm.showConfirm(mlm.C0464 + mlm.C1626);
}
/*  */
function deleteSysEmail() {
    var m_sysemail = new spm.sysemail();
    m_sysemail.SysEmail_Id = pageVariable.deleteEmailFrm.sysemail_id;
    m_sysemail.deleteSysEmail(function () {
        pageVariable.orderemailList.deleteData(pageVariable.deleteEmailFrm.sysemail_id);

        querySysEmailStat();

        pageVariable.deleteEmailFrm.close();
    });
}
/*  */
function sendEmail() {
    var m_sysemail = new spm.sysemail();
    m_sysemail.sendEmail(function () { 
         
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* ECMS-邮件处理 */
    document.title = "ECMS-" + mlm.C1624;

    /* 客户订单追踪 */
    $("#lbOrderEmail").text(mlm.C1625);
    /* 邮件列表 */
    $("#lbOrderEmailTitle").text(mlm.C1626 + mlm.C0463);
    /* 查询邮件 */
    $("#btQueryEmail").val(mlm.C0562 + mlm.C1626);
    /* 发送邮件 */
    $("#btSendEmail").val(mlm.C1627);
    /* 关键字 */
    $("#lbEmailKeySymbol").text(mlm.C0184 + ":");
    /* 发送状态 */
    $("#lbEmailStateSymbol").text(mlm.C1628 + ":");
    /* 邮件类型 */
    $("#lbEmailTypeSymbol").text(mlm.C1629 + ":");
}