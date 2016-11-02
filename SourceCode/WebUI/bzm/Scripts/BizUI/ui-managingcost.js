
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadCostSubjectTree);

/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btNewCostSubject").click(openNewCostSubject);
    $("#btModifyCostSubject").click(openModifyCostSubject);
    $("#btDeleteCostSubject").click(openDeleteCostSubject);
    $("#btMoveup").click(moveupCostSubject);
    $("#btMovedown").click(movedownCostSubject);
    $("#txtParentCostSubject").change(changeParentCostSubject);

    $("#btNewCostSubject, #btModifyCostSubject, #btDeleteCostSubject, #btMoveup, #btMovedown").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();

    $("#costSubjectFrm").css("height", mainFormHeight - 2);
}

/* 加载成本科目树 */
function loadCostSubjectTree(event) {

    if (!pageVariable.costSubjects) {
        var m_costsubject = new fm.costsubject();
        m_costsubject.getAllCostSubjects(function (source) {

            pageVariable.costSubjects = source;
            pageVariable.costSubjectList = datastruct.convertion.tableToJson(source);

            pageVariable.costSubjectTree = new uicontrol.treeView($("#costSubjectTree"), source, null,
                                                        { displayModel: "inline", sourceFormat: "table",
                                                            keyColumn: "CostSubject_Id", parentKeyColumn: "ParentCostSubject_Id", displayColumn: "CostSubjectName"
                                                        });
            pageVariable.costSubjectTree.loadSource();

            if (event) {
                event();
            }
        });
    }
}

/* 打开新增成本科目的窗体 */
function openNewCostSubject() {
    if (!pageVariable.handlerCostSubjectFrm) {
        pageVariable.handlerCostSubjectFrm = new uicontrol.dialog("handlerCostSubjectFrm", "", { width: 800 }, saveCostSubject);
    }

    var m_parentCtrl = $("#txtParentCostSubject");
    if (pageVariable.costSubjectTree.selectedItem) {
        m_parentCtrl.val(pageVariable.costSubjectTree.selectedItem.value);
        m_parentCtrl.attr("parentId", pageVariable.costSubjectTree.selectedItem.key);
    }
    else {
        m_parentCtrl.val("");
        m_parentCtrl.attr("parentId", "0");
    }
    $("#lbParentCostSubjectSymbol, #txtParentCostSubject").show();
    $("#txtCostSubject").val("");

    pageVariable.handlerCostSubjectFrm.costsubject_id = 0;
    pageVariable.handlerCostSubjectFrm.action = "New";
    pageVariable.handlerCostSubjectFrm.setTitle(mlm.C0461 + mlm.C0497);
    pageVariable.handlerCostSubjectFrm.show();
}

/* 打开修改成本科目的窗体 */
function openModifyCostSubject() {

    if (!pageVariable.costSubjectTree.selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0574);
        return;
    }

    if (!pageVariable.handlerCostSubjectFrm) {
        pageVariable.handlerCostSubjectFrm = new uicontrol.dialog("handlerCostSubjectFrm", "", { width: 800 }, saveCostSubject);
    }

    $("#txtCostSubject").val(pageVariable.costSubjectTree.selectedItem.value);
    $("#lbParentCostSubjectSymbol, #txtParentCostSubject").hide();

    pageVariable.handlerCostSubjectFrm.costsubject_id = pageVariable.costSubjectTree.selectedItem.key;
    pageVariable.handlerCostSubjectFrm.action = "Midify";
    pageVariable.handlerCostSubjectFrm.setTitle(mlm.C0462 + mlm.C0497);
    pageVariable.handlerCostSubjectFrm.show();
}

/* 打开删除成本科目的窗体 */
function openDeleteCostSubject() {
    if (!pageVariable.delCostSubjectFrm) {
        pageVariable.delCostSubjectFrm = new uicontrol.confirmDelete(deleteCostSubject);
    }

    if (!pageVariable.costSubjectTree.selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0575);
        return;
    }

    pageVariable.delCostSubjectFrm.costsubject_id = pageVariable.costSubjectTree.selectedItem.key;
    pageVariable.delCostSubjectFrm.showConfirm(mlm.C0464 + mlm.C0497 + "(" + pageVariable.costSubjectTree.selectedItem.value + ") ?");
}

/* 保存成本科目 */
function saveCostSubject() {

    var m_costsubject = new fm.costsubject();
    m_costsubject.CostSubject_Id = pageVariable.handlerCostSubjectFrm.costsubject_id;
    m_costsubject.CostSubjectName = $.trim($("#txtCostSubject").val());

    if (pageVariable.handlerCostSubjectFrm.action == "New") {

        m_costsubject.ParentCostSubject_Id = $("#txtParentCostSubject").attr("parentId");
        m_costsubject.newCostSubject(function (retObj) {
            pageVariable.costSubjectTree.addChildItem([{ key: retObj.CostSubject_Id, value: retObj.CostSubjectName, parentKey: retObj.ParentCostSubject_Id, tag: retObj, children: []}]);

            pageVariable.handlerCostSubjectFrm.close();
        });
    }
    else {
        m_costsubject.modifyCostSubject(function () {
            pageVariable.costSubjectTree.modifyChildItem(m_costsubject.CostSubject_Id, m_costsubject.CostSubjectName);

            pageVariable.handlerCostSubjectFrm.close();
        });
    }
}

/* 删除成本科目 */
function deleteCostSubject() {
    var m_costsubject = new fm.costsubject();
    m_costsubject.CostSubject_Id = pageVariable.delCostSubjectFrm.costsubject_id;
    m_costsubject.deleteCostSubject(function () {
        pageVariable.costSubjectTree.deleteChildItem(m_costsubject.CostSubject_Id);

        pageVariable.delCostSubjectFrm.close();
    });
}

/* 向上移动成本科目 */
function moveupCostSubject() {
    var m_selectedItem = pageVariable.costSubjectTree.selectedItem;
    if (!m_selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0576);
        return;
    }

    var m_costsubject = new fm.costsubject();
    m_costsubject.CostSubject_Id = m_selectedItem.key;
    m_costsubject.Direction = "0";
    m_costsubject.modifyCostSubjectSeq(function () {
        pageVariable.costSubjects = null;
        loadCostSubjectTree(function () { pageVariable.costSubjectTree.clickItem(m_costsubject.CostSubject_Id); });
    });
}

/* 向下移动成本科目 */
function movedownCostSubject() {
    var m_selectedItem = pageVariable.costSubjectTree.selectedItem;
    if (!m_selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0576);
        return;
    }

    var m_costsubject = new fm.costsubject();
    m_costsubject.CostSubject_Id = m_selectedItem.key;
    m_costsubject.Direction = "1";
    m_costsubject.modifyCostSubjectSeq(function () {
        pageVariable.costSubjects = null;
        loadCostSubjectTree(function () { pageVariable.costSubjectTree.clickItem(m_costsubject.CostSubject_Id); });
    });
}

/* 改变上级成本科目*/
function changeParentCostSubject() {

    var m_inputName = $(this).val();

    if (m_inputName) {
        var m_costsubject = null;
        $.each(pageVariable.costSubjectList, function () {
            if (this.CostSubjectName.indexOf(m_inputName) > -1) {
                m_costsubject = this;
                return false;
            }
        });

        if (!m_costsubject) {
            pageframe.control.alertDialog.showAlertInfo(m_inputName + mlm.C0487);
            $(this).val("");
            $(this).attr("parentId", "0");
            return;
        }

        $(this).val(m_costsubject.CostSubjectName);
        $(this).attr("parentId", m_costsubject.CostSubject_Id);
    }
    else {
        $(this).val("");
        $(this).attr("parentId", "0");

    }
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 成本科目 */
    $("#lbCostSubjectTag").text(mlm.C0497);
    $("#lbCostSubjectSymbol").text(mlm.C0497 + ":");
    /* 成本科目列表 */
    $("#lbCostSubjectTitle").text(mlm.C0497 + mlm.C0463);
    /* 新增成本科目 */
    $("#btNewCostSubject").val(mlm.C0461 + mlm.C0497);
    /* 修改成本科目 */
    $("#btModifyCostSubject").val(mlm.C0462 + mlm.C0497);
    /* 删除成本科目 */
    $("#btDeleteCostSubject").val(mlm.C0062 + mlm.C0497);
    /* 上移 */
    $("#btMoveup").val(mlm.C0095);
    /* 下移 */
    $("#btMovedown").val(mlm.C0096);
    /* 上级成本科目 */
    $("#lbParentCostSubjectSymbol").text(mlm.C0573 + ":");

    /* ECMS-运营成本 */
    document.title = mlm.C0486;
}