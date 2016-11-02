
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(bindDatas);

/* 页面变量 */
window.pageVariable = {

    /* 语言种类的导入窗体 */
    lanTypeImportFrm: null,

    /* 文件处理控件 */
    fileCtrl: null,

    /* 语言选择控件 */
    ulLanguages: null,

    /* 保存参数的提示窗体 */
    saveAlertFrm: null
};

/* 初始化界面 */
function initPage() {
    $("#btSave").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
    $("#btSave").click(openSaveAlertFrm);
}

/* 绑定数据 */
function bindDatas() {
 
    pageVariable.ulLanguages = new uicontrol.selectbox("ulLanguages", "checkbox");

    var wunitCtrl = $("#ddlWUnit");
    var m_syskeyparam = new spm.syskeyparam();
    m_syskeyparam.getWeightUnits(function (retTable) {
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

        $.each(m_jsonobjs, function () {
            wunitCtrl.append("<option value='" + this.SysWeightUnit_Id + "'>" + this.WUnit + "</option>")
        });

        m_syskeyparam.readSysKeyParam(function (keyParam) {

            var m_lanresource = new bizmlm.lanresource();
            m_lanresource.getAllSysLanguages(function (retObj) {
                var m_languages = datastruct.convertion.tableToJson(retObj);

                var items = [];
                $.each(m_languages, function () {
                    if (this.SysLanguage_Id == keyParam.SysLanguage_Id) {
                        $("#lbDefaultLan").text(this.LRName);
                    }
                    else {
                        items.push({ key: this.SysLanguage_Id, value: this.LRName });
                    }
                });

                wunitCtrl.val(keyParam.SysWeightUnit_Id);

                pageVariable.ulLanguages.bindSource(items);

                var m_selectedItems = [];
                $.each(keyParam.SysLanguage_Ids.split(","), function () {
                    m_selectedItems.push({ key: this });
                });

                pageVariable.ulLanguages.setSelectedItem(m_selectedItems);
            });
        });
    });

    
};

/* 打开保存系统参数的提示窗体 */
function openSaveAlertFrm() {
    if (!pageVariable.saveAlertFrm) {
        pageVariable.saveAlertFrm = new uicontrol.dialog("saveAlertFrm", mlm.C0151, { width: 800, height: 175 }, saveKeyParam);
    }

    pageVariable.saveAlertFrm.show();
}

/* 保存系统参数 */
function saveKeyParam() {
    var m_languageIds = pageVariable.ulLanguages.getSelectedItem();

    var m_syskeyparam = new spm.syskeyparam();
    m_syskeyparam.SysLanguage_Ids = m_languageIds.join(",");
    m_syskeyparam.SysWeightUnit_Id = $("#ddlWUnit").val();
    m_syskeyparam.modifySysKeyParam(function () {
        location.reload();
    });
}

/* 填充语言资源 */
function fillPageLanRes() {
    /* 关键运营参数 */
    $("#lbKeyParamTag").text(mlm.M0037);
    /* 关键参数数据 */
    $("#lbKeyParamTitle").text(mlm.C0028);
    /* 保存参数 */
    $("#btSave").val(mlm.C0031);
    /* 支持语言 */
    $("#lbDLT").text(mlm.C0032);
    /* 默认语言: */
    $("#lbLanTitle").text(mlm.C0034);
    /* 支持语言发生改变，系统将对未支持的语言数据进行清理，是否继续执行？ */
    $("#lbDes_1").text(mlm.C0152);
    /* （未防止数据丢失，可以点击“备份语言数据”按钮对数据进行备份！） */
    $("#lbDes_2").text(mlm.C0153);
    /* 备份语言数据: */
    $("#btBackup").val(mlm.C0154);
    /* 内部重量单位: */
    $("#lbWUnitSymbol").text(mlm.C0668);
    /* "ECMS-关键运营参数 */
    document.title = mlm.C0036;
}