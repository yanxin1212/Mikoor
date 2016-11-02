/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadEmail);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {


}
/*  */
function loadEmail() {
    var m_sysemail_id = $.getUrlVar("sysemail_id");

    var m_contentctrl = $("#dvPrint");

    var m_sysemail = new spm.sysemail();
    m_sysemail.SysEmail_Id = m_sysemail_id;
    m_sysemail.readEmail(function (obj) {
        $("#dvEmailTitle").text(obj.EmailTitle);
        $("#dvEmailContent").html(obj.EmailContent);
    });
}

/* 填充语言资源 */
function fillPageLanRes() {
}