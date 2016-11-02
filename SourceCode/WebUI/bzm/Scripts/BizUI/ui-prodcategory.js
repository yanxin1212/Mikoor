
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadPdcs);

/* 页面变量 */
window.pageVariable = {

    /* 新增或修改商品种类的窗体 */
    handlerPdcFrm: null,

    /* 商品分类树 */
    pdcTree: null,

    /* 选择商品分类的控件 */
    selPdcCtrl: null,

    /* 删除商品分类的窗体 */
    delPdcFrm: null
};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btNewPdc, #btModifyPdc, #btDeletePdc, #btMoveup, #btMovedown").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
    $("#btNewPdc").click(openNewPdcFrm);
    $("#btModifyPdc").click(openModifyPdcFrm);
    $("#btDeletePdc").click(openDelPdcFrm);
    $("#btMoveup").click(moveupPdc);
    $("#btMovedown").click(movedownPdc);
    $("#pdcCodeTag").click(loadPdcCodes);
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#pdcForm").css("height", mainFormHeight - 2);
}

/* 加载商品种类 */
function loadPdcs(event) {

    var prodcategory = new pdm.prodcategory();
    prodcategory.getAllProdCategorys(function (source) {

        var m_json = datastruct.convertion.tableToJson(source);
        pageVariable.pdcTree = new uicontrol.treeView($("#pdcTree"), m_json, null,
                                                        { displayModel: "inline", sourceFormat: "json",
                                                            keyColumn: "ProdCategory_Id", parentKeyColumn: "ParentPdc_Id", displayColumn: "PdcName"
                                                        });

        pageVariable.pdcTree.loadSource();

        if (event) {
            event();
        }
    });
}

/* 打开新增商品种类的窗体 */
function openNewPdcFrm() {
    if (!pageVariable.handlerPdcFrm) {
        pageVariable.handlerPdcFrm = new uicontrol.dialog("handlerPdcFrm", "", { width: 800 }, updatePdc);
    }

    if (!pageVariable.selPdcCtrl) {
        pageVariable.selPdcCtrl = new bizcontrol.selectpdc($("#selParentPdc"));
    }

    $("#txtPdcName").val("");
    $("#txtPdcCode_1").val("");

    var m_parentPdc = pageVariable.pdcTree.selectedItem;
    if (m_parentPdc) {
        pageVariable.selPdcCtrl.setPdc({ ProdCategory_Id: m_parentPdc.key, PdcName: pageVariable.pdcTree.getTextValue(m_parentPdc.key, true) });
        $("#txtPicWidth").val(m_parentPdc.tag.BrowserPicWidth);
        $("#txtPicHeight").val(m_parentPdc.tag.BrowserPicHeight);
    }
    else {
        $("#txtPicWidth").val("150");
        $("#txtPicHeight").val("150");
    }

    $("#dvParentPdc").show();

    pageVariable.handlerPdcFrm.prodcategory_Id = 0;
    pageVariable.handlerPdcFrm.action = "New";
    pageVariable.handlerPdcFrm.setTitle(mlm.C0092);
    pageVariable.handlerPdcFrm.show();
}

/* 打开修改商品种类的窗体 */
function openModifyPdcFrm() {
    if (!pageVariable.handlerPdcFrm) {
        pageVariable.handlerPdcFrm = new uicontrol.dialog("handlerPdcFrm", "", { width: 800 }, updatePdc);
    }

    var m_pdc = pageVariable.pdcTree.selectedItem;
    if (!m_pdc) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0099);
        return;
    }

    if (!pageVariable.selPdcCtrl) {
        pageVariable.selPdcCtrl = new bizcontrol.selectpdc($("#selParentPdc"));
    }

    $("#txtPdcName").val(m_pdc.value);
    $("#txtPdcCode_1").val(m_pdc.tag.PdcCode);
    $("#txtPicWidth").val(m_pdc.tag.BrowserPicWidth);
    $("#txtPicHeight").val(m_pdc.tag.BrowserPicHeight);

    var m_parentKey = pageVariable.pdcTree.selectedItem.parentKey;
    pageVariable.selPdcCtrl.setPdc({ ProdCategory_Id: m_parentKey, PdcName: pageVariable.pdcTree.getTextValue(m_parentKey, true) });

    pageVariable.handlerPdcFrm.prodcategory_Id = m_pdc.key;
    pageVariable.handlerPdcFrm.action = "Modify";
    pageVariable.handlerPdcFrm.setTitle(mlm.C0093);
    pageVariable.handlerPdcFrm.show();
}

/* 打开删除商品分类的窗体 */
function openDelPdcFrm() {
    if (!pageVariable.delPdcFrm) {
        pageVariable.delPdcFrm = new uicontrol.confirmDelete(deletePdc);
    }

    var m_pdc = pageVariable.pdcTree.selectedItem;
    if (!m_pdc) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0099);
        return;
    }

    pageVariable.delPdcFrm.prodcategory_Id = m_pdc.key;
    pageVariable.delPdcFrm.showConfirm(mlm.C0100 + "(" + m_pdc.value + ") ?");
}

/* 新增或修改商品种类 */
function updatePdc() {
    var pdcName = $.trim($("#txtPdcName").val());
    if (!pdcName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0101);
        return;
    }

    var prodcategory = new pdm.prodcategory();
    prodcategory.ProdCategory_Id = pageVariable.handlerPdcFrm.prodcategory_Id;
    prodcategory.PdcName = pdcName;
    prodcategory.PdcCode = $.trim($("#txtPdcCode_1").val());
    prodcategory.BrowserPicWidth = $("#txtPicWidth").val();
    prodcategory.BrowserPicHeight = $("#txtPicHeight").val();
    prodcategory.ParentPdc_Id = pageVariable.selPdcCtrl.pdcId;
    if (!prodcategory.ParentPdc_Id) {
        prodcategory.ParentPdc_Id = 0;
    }
    var m_oldParentPdcId = 0;
    if (pageVariable.pdcTree.selectedItem) {
        m_oldParentPdcId = pageVariable.pdcTree.selectedItem.parentKey;
    }

    if (pageVariable.handlerPdcFrm.action == "New") {
        prodcategory.newProdCategory(function (retObj) {
            pageVariable.pdcTree.addChildItem([{ key: retObj.ProdCategory_Id, value: retObj.PdcName, parentKey: retObj.ParentPdc_Id, tag: retObj, children: []}]);
            pageVariable.handlerPdcFrm.close();

            if (pageVariable.selPdcCtrl) {
                pageVariable.selPdcCtrl.pdcSource = null;
            }

            pageVariable.isLoadPdcCode = null;
        });
    }
    else {
        prodcategory.modifyProdCategory(function () {

            if (m_oldParentPdcId == prodcategory.ParentPdc_Id) {
                pageVariable.pdcTree.modifyChildItem(prodcategory.ProdCategory_Id, prodcategory.PdcName);
            }
            else {
                loadPdcs(function () { pageVariable.pdcTree.selTvItem(prodcategory.ProdCategory_Id); });
            }

            pageVariable.handlerPdcFrm.close();

            if (pageVariable.selPdcCtrl) {
                pageVariable.selPdcCtrl.pdcSource = null;
            }

            pageVariable.isLoadPdcCode = null;
        });
    }
}

/* 删除商品分类 */
function deletePdc() {
    var pdc = new pdm.prodcategory();
    pdc.ProdCategory_Id = pageVariable.delPdcFrm.prodcategory_Id;
    pdc.deleteProdCategory(function () {
        
        loadPdcs();

        if (pageVariable.selPdcCtrl) {
            pageVariable.selPdcCtrl.pdcSource = null;
        }

        pageVariable.isLoadPdcCode = null;

        pageVariable.delPdcFrm.close();
    });
}

/* 向上移动商品分类 */
function moveupPdc() {
    var m_pdc = pageVariable.pdcTree.selectedItem;
    if (!m_pdc) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0099);
        return;
    }

    var pdc = new pdm.prodcategory();
    pdc.ProdCategory_Id = m_pdc.key;
    pdc.Direction = "0";
    pdc.modifyPdcSeq(function () {
        loadPdcs(function () { pageVariable.pdcTree.selTvItem(m_pdc.key); });
    });
}

/* 向下移动商品分类 */
function movedownPdc() {
    var m_pdc = pageVariable.pdcTree.selectedItem;
    if (!m_pdc) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0099);
        return;
    }

    var pdc = new pdm.prodcategory();
    pdc.ProdCategory_Id = m_pdc.key;
    pdc.Direction = "1";
    pdc.modifyPdcSeq(function () {
        loadPdcs(function () { pageVariable.pdcTree.selTvItem(m_pdc.key); });
    });
}

/* 加载商品分类编码 */
function loadPdcCodes() {
    if (!pageVariable.pdcCodeList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.pdcCodeList = new uicontrol.tableList("pdcCodeList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "ProdCategory_Id",
                                         height: mainFormHeight,
                                         columns: [{ display: mlm.C0090, name: "PdcName", width: 300, align: 'left' },
                                                   { display: mlm.C0612, name: "PdcCode", width: 120, align: 'center' },
                                                   { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, modifiedFunc: "openHandlerPdcCodeFrm"}]
                                     });
    }

    if (!pageVariable.isLoadPdcCode) {
        pageVariable.isLoadPdcCode = true;

        var prodcategory = new pdm.prodcategory();
        prodcategory.getAllProdCategorys(function (source) {

            var m_json = datastruct.convertion.tableToJson(source);

            var m_nameStruct = new datastruct.dictionary();
            $.each(m_json, function () {
                m_nameStruct.setItem(this.ProdCategory_Id, this.PdcName);
            });

            $.each(m_json, function () {
                var m_pdcIndexs = this.PdcIndexs;

                var m_names = [];

                var m_arr = m_pdcIndexs.split(",");
                $.each(m_arr, function () {

                    var m_ss = m_nameStruct.getItem(this.replaceAll("#", ""));
                    if (m_ss) {
                        m_names.push(m_ss);
                    }
                });
                m_names.push(this.PdcName);

                this.PdcName = m_names.join("-");
            });

            pageVariable.pdcCodeList.bindDataSource(m_json);
        });
    }
}

/* 打开处理分类编码的窗体 */
function openHandlerPdcCodeFrm() {
    if (!pageVariable.handlerPdcCodeFrm) {
        pageVariable.handlerPdcCodeFrm = new uicontrol.dialog("handlerPdcCodeFrm", mlm.C0611 + mlm.C0613, { width: 800 }, savePdcCode);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.pdcCodeList.getItem(m_key);

    $("#lbPdcStr").text(m_obj.PdcName);
    $("#txtPdcCode").val(m_obj.PdcCode);

    pageVariable.handlerPdcCodeFrm.PdcObj = m_obj;
    pageVariable.handlerPdcCodeFrm.show();
}

/* 保存商品分类编码 */
function savePdcCode() {
    var m_prodcategory = new pdm.prodcategory();
    m_prodcategory.ProdCategory_Id = pageVariable.handlerPdcCodeFrm.PdcObj.ProdCategory_Id;
    m_prodcategory.PdcCode =  $.trim($("#txtPdcCode").val());

    m_prodcategory.modifyPdcCode(function () {
        var m_obj = pageVariable.pdcCodeList.getItem(m_prodcategory.ProdCategory_Id);
        m_obj.PdcCode = m_prodcategory.PdcCode;
        
        pageVariable.pdcCodeList.modifyData(m_obj.ProdCategory_Id, m_obj);
        pageVariable.pdcTree.getItem(m_obj.ProdCategory_Id).sourceItem.tag.PdcCode = m_obj.PdcCode;

        pageVariable.handlerPdcCodeFrm.close();
    });
}

/* 填充语言资源 */
function fillPageLanRes() {
    /* 商品分类 */
    $("#lbpdcTag").text(mlm.C0090);
    $("#lbPdcStrSymbol").text(mlm.C0090 + ":");
    /* 商品分类结构树 */
    $("#lbPdcTitle").text(mlm.C0091);
    /* 新增商品种类 */
    $("#btNewPdc").val(mlm.C0092);
    /* 修改商品种类 */
    $("#btModifyPdc").val(mlm.C0093);
    /* 删除商品种类 */
    $("#btDeletePdc").val(mlm.C0094);
    /* 上移 */
    $("#btMoveup").val(mlm.C0095);
    /* 下移 */
    $("#btMovedown").val(mlm.C0096);
    /* 种类名称 */
    $("#lbPdcName").text(mlm.C0097 + ":");
    /* 上级种类 */
    $("#lbParentPdc").text(mlm.C0098 + ":");
    /* 浏览图宽度 */
    $("#lbPicWidth").text(mlm.C0407 + ":");
    /* 浏览图高度 */
    $("#lbPicHeight").text(mlm.C0408 + ":");
    /* 分类编码 */
    $("#lbPdcCodeSymbol, #lbPdcCodeSymbol_1").text(mlm.C0612 + ":");
    /* 商品分类编码 */
    $("#lbpdcCode").text(mlm.C0613);
    /* 商品分类编码列表 */
    $("#lbPdcCodeTitle").text(mlm.C0613 + mlm.C0463);

    /* 商品分类 */
    document.title = mlm.C0102;
}