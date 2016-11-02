
/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {

    setLoginLayout();
    pageframe.layout.resizeEventList.push(setLoginLayout);

    $("#userInfo, #signOut, #userInfoDivide, #signOutDivide").hide();

    var m_email = runtime.clientRunSetting.getUserSetting("loginemail");
    if (m_email) {
        $("#txtEmail").val(m_email);
    }

    /* 清理遗留的cookie */
    runtime.clientRunSetting.clearRunningContext();
}

/* 设置登陆区域布局 */
function setLoginLayout() {
    var loginCtrl = $("#loginRegion");
    var w_top = (pageframe.layout.contentHeight - loginCtrl[0].offsetHeight + 50) / 2;
    var w_left = (pageframe.layout.width - loginCtrl[0].offsetWidth) / 2;
    loginCtrl.css("top", w_top + "px");
    loginCtrl.css("left", w_left + "px");
}

/* 登陆 */
function login() {

    var email = $.trim($("#txtEmail").val());
    if (!email) {
        pageframe.control.alertDialog.showAlertInfo(mlm.E0001);
        return;
    }

    var pwd = $.trim($("#txtPwd").val());
    if (!pwd) {
        pageframe.control.alertDialog.showAlertInfo(mlm.E0002);
        return;
    }

    var context = new webhandler.bizExeContext(function (retObj) {
        if (!retObj) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0331);
            return;
        }

        runtime.clientRunSetting.storeRunningContext("usertoken", retObj);

        /* 记录登陆的邮箱 */
        runtime.clientRunSetting.storeUserSetting("loginemail", email);

        window.location = "main.htm";

    });

    webhandler.ajaxHandler.specialBizRequest("/bzm/BizLogin.ashx", email + "," + pwd, context);
}

/* 填充语言资源 */
function fillPageLanRes() {
    //登陆区
    $("#lrTitle").text(mlm.C0006);
    //邮箱地址:
    $("#lbEmail").text(mlm.C0008);
    //密码:
    $("#lbPwd").text(mlm.C0009);
    //登陆
    $("#btLogin").val(mlm.C0010);
    //安全提示: 为了安全性考虑，系统登陆失败超过5次以上的用户，将在12小时内禁止登陆。
    $("#loginAlert").text(mlm.C0011);
    //"ECMS-登陆
    document.title = mlm.C0012;
}