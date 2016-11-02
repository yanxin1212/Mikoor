/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadPdcs);

/* 页面变量 */
window.pageVariable = { };

/* 初始化界面 */
function initPage() {

    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btNewProdProp, #btSetSkuProp, #btAddProp, #btAddPdcProp, #btAddPValue").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
    $("#btNewProdProp").click(openNewProdPropFrm);
    $("#btAddPdcProp").click(openNewPdcProp);

    $("#pdcPropTag").click(function () {
        setLayout();
    });

    $("#prodPropTag").click(function () {
        loadProdProp();
    });

    $("#pdcPropTag").click(function () {
        selectPdcEvent();
    });
}
/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#prodPropForm").css("height", mainFormHeight);
    $("#pdcTreeFrm").css("height", mainFormHeight + 15);
    $("#pdcPropFrm").css("height", mainFormHeight + 25);

    var m_width = $("#pdcTreeFrm")[0].offsetWidth + 32;
    if (m_width) {
        $("#pdcPropFrm").css("width", pageframe.layout.width - m_width);
    }
    
    if (pageVariable.prodPropList) {
        var prodPropFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.prodPropList.resize(prodPropFormHeight);
    }

    if (pageVariable.pdcPropList) {
        pageVariable.pdcPropList.resize(pageframe.layout.getTableHeightInForm() - 3);
    }
}

/* 加载商品种类 */
function loadPdcs() {
    var prodcategory = new pdm.prodcategory();
    prodcategory.getAllProdCategorys(function (source) {
        pageVariable.pdcTree = new uicontrol.treeView($("#pdcTree"), source, selectPdcEvent,
                                                        { sourceFormat: "table",
                                                            keyColumn: "ProdCategory_Id", parentKeyColumn: "ParentPdc_Id", displayColumn: "PdcName"
                                                        });

        pageVariable.pdcTree.loadSource();

        setLayout();
    });

    if (!pageVariable.pdcPropList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 3;
        pageVariable.pdcPropList = new uicontrol.tableList("pdcPropList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: mainFormHeight,
                                        keyColumn: "PdcProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 120, align: 'left', adjust: true, createCell: constructPdcPropName },
                                                { display: mlm.C0070, name: "IsSku", width: 70, align: 'center', adjust: true, createCell: createIsSkuCell },
                                                { display: mlm.C0126, name: "IsKeyAttribute", width: 60, align: 'center', adjust: true, createCell: createIsKeyAttributeCell },
                                                { display: mlm.C0071, name: "PValueRange", width: 540, align: 'left' },
                                                { display: mlm.C0019, name: "", width: 75, align: 'center', adjust: true, createCell: constructPdcPropOperaCell}]
                                    });
    }
}

/* 选择商品种类事件 */
function selectPdcEvent() {
    if (pageVariable.pdcTree.selectedItem) {
        $("#lbPdcName").text("(" + pageVariable.pdcTree.selectedItem.value + ")");

        var m_pdcproperty = new pdm.pdcproperty();
        m_pdcproperty.ProdCategory_Id = pageVariable.pdcTree.selectedItem.key;
        m_pdcproperty.getPdcProps(function (source) {
            pageVariable.pdcPropList.bindDataSource(source);
        });
    }
}

/* 加载商品属性 */
function loadProdProp() {
    if (!pageVariable.prodPropList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm();
        pageVariable.prodPropList = new uicontrol.tableList("prodPropList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "ProdProperty_Id",
                                         height: mainFormHeight,
                                         columns: [{ display: mlm.C0069, name: "ProdPropName", width: 120, align: 'left', adjust: true, createCell: constructPropName },
                                                   { display: mlm.C0071, name: "PValueRange", width: 850, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, modifiedFunc: "openModifyProdPropFrm", deletedFunc: "openDelProdPropFrm"}]
                                     });
    }

    if (!pageVariable.propSource) {
        var prodproperty = new pdm.prodproperty();
        prodproperty.getAllProdPropertys(function (source) {
            pageVariable.propSource = {};

            pageVariable.propSource.table = source;
            pageVariable.propSource.objs = datastruct.convertion.tableToJson(source);

            pageVariable.prodPropList.bindDataSource(pageVariable.propSource.table);
        });
    }
    else {
        pageVariable.prodPropList.bindDataSource(pageVariable.propSource.table);
    }
}
/* 构造商品分类-属性名称列 */
function constructPdcPropName(key, cellValue) {
    return "<a onclick='viewPdcPropFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
}
/* 构造属性名称列 */
function constructPropName(key, cellValue) {
    return "<a onclick='viewProdPropFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
}
/* 创建属性类型的单元格 */
function createIsSkuCell(key, cellValue) {
    return getIsSkuStr(cellValue);
}
function getIsSkuStr(isSku) {
    var m_retvalue = "";
    if (isSku == "1") {
        m_retvalue = mlm.C0128;
    }
    else {
        m_retvalue = mlm.C0125;
    }

    return m_retvalue;
}
/* 创建关键属性的单元格 */
function createIsKeyAttributeCell(key, cellValue) {
    return getIsKeyAttributeStr(cellValue);
}
function getIsKeyAttributeStr(isQuery) {
    var m_retvalue = "";
    if (isQuery == "1") {
        m_retvalue = mlm.C0108;
    }
    else {
        m_retvalue = mlm.C0109;
    }

    return m_retvalue;
}
/* 创建分类属性操作设置列 */
function constructPdcPropOperaCell(key, cellvalue) {

    if (this.keyObj.ProdCategory_Id == pageVariable.pdcTree.selectedItem.key) {
        return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openModifyPdcProp.call(this);'>" + mlm.C0061 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDeletePdcProp.call(this);'>" + mlm.C0062 + "</a>";
    }
}

/* 初始化处理商品属性的窗体 */
function initProdPropFrm() {

    if (!pageVariable.handlerProdPropFrm) {
        pageVariable.handlerProdPropFrm = new uicontrol.dialog("handlerProdPropFrm", "", { width: 900, position: ["auto", 15] }, saveProdProp);
        pageVariable.handlerProdPropFrm.show();

        pageVariable.pvalueList = new uicontrol.tableList("pvalueList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "PropValue_Id",
                                         height: 200,
                                         columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 100, align: 'center', adjust: true, createCell: constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'left' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 100, align: 'left' },
                                                   { display: "速卖通属性值Id", name: "SMT_PropValue_Id", width: 100, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, modifiedFunc: "openModifyPValueFrm", deletedFunc: "openDelPValueFrm"}]
                                     });

        $("#btAddPValue").click(openNewPValueFrm);
    }
    else {
        pageVariable.handlerProdPropFrm.show();
    }
}
/* 构建属性值图片列 */
function constructPropPicCell(key, cellValue) {

    if ($.trim(cellValue)) {
        var m_src = window.webLocation + cellValue;
        return "<img class='product-list-img-sl' src='" + m_src + "' />";
    }
    else {
        return "";
    }
}

/* 打开新增商品属性的窗体 */
function openNewProdPropFrm() {

    initProdPropFrm();

    $("#txtPropName").val("");
    pageVariable.pvalueList.bindDataSource(null);

    pageVariable.handlerProdPropFrm.prodproperty_id = 0;
    pageVariable.handlerProdPropFrm.action = "New";
    pageVariable.handlerProdPropFrm.setTitle(mlm.C0066);
}
/* 打开修改商品属性的窗体 */
function openModifyProdPropFrm() {

    initProdPropFrm();

    pageVariable.handlerProdPropFrm.prodproperty_id = $(this).attr("tag");

    var m_prodproperty = new pdm.prodproperty();
    m_prodproperty.ProdProperty_Id = pageVariable.handlerProdPropFrm.prodproperty_id;
    m_prodproperty.readProdProperty(function (retObj) {
        $("#txtPropName").val(retObj.ProdPropName);
        $("#txtSMTProperty").val(retObj.SMT_ProdProperty_Id);

        var m_tableSource = datastruct.convertion.jsonToTable(retObj.PropValues);
        pageVariable.pvalueList.bindDataSource(m_tableSource);
    });

    pageVariable.handlerProdPropFrm.action = "Modify";
    pageVariable.handlerProdPropFrm.setTitle(mlm.C0080);
}
/* 打开删除商品属性的窗体 */
function openDelProdPropFrm() {
    if (!pageVariable.delProdPropFrm) {
        pageVariable.delProdPropFrm = new uicontrol.confirmDelete(deleteProdProp);
    }

    pageVariable.delProdPropFrm.prodproperty_id = $(this).attr("tag");
    var m_prodPropObj = pageVariable.prodPropList.getItem(pageVariable.delProdPropFrm.prodproperty_id);

    pageVariable.delProdPropFrm.showConfirm(mlm.C0081 + "(" + m_prodPropObj.ProdPropName + ") ?");
}
/* 新增或修改商品属性 */
function saveProdProp() {
    var propName = $.trim($("#txtPropName").val());
    if (!propName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0082);
        return;
    }

    var prodproperty = new pdm.prodproperty();
    prodproperty.ProdProperty_Id = pageVariable.handlerProdPropFrm.prodproperty_id;
    prodproperty.ProdPropName = propName;
    prodproperty.SMT_ProdProperty_Id = $.trim($("#txtSMTProperty").val());
    prodproperty.PropValues = [];

    var m_propvalues = pageVariable.pvalueList.dataSource.items.arrValues;
    $.each(m_propvalues, function () {
        var m_item = {};
        m_item.PropValue_Id = this.PropValue_Id > 1000000 ? "0" : this.PropValue_Id.toString();
        m_item.ProdProperty_Id = prodproperty.ProdProperty_Id;
        m_item.Seq = this.Seq.toString();
        m_item.PicUrl = this.PicUrl ? this.PicUrl.toString() : "";
        m_item.PValueCode = this.PValueCode.toString();
        m_item.PValue = this.PValue.toString();
        m_item.SMT_PropValue_Id = this.SMT_PropValue_Id.toString();
        prodproperty.PropValues.push(m_item);
    });

    if (pageVariable.handlerProdPropFrm.action == "New") {

        prodproperty.newProdProperty(function (retObj) {

            retObj.PValueRange = retObj.OtherProps.PValueRange ? retObj.OtherProps.PValueRange : "";

            pageVariable.prodPropList.addData(retObj.ProdProperty_Id, retObj);
            pageVariable.handlerProdPropFrm.close();

            pageVariable.propSource = null;
        });
    }
    else {
        prodproperty.modifyProdProperty(function (retObj) {

            retObj.PValueRange = retObj.OtherProps.PValueRange ? retObj.OtherProps.PValueRange : "";

            pageVariable.prodPropList.modifyData(retObj.ProdProperty_Id, retObj);
            pageVariable.handlerProdPropFrm.close();

            pageVariable.propSource = null;
        });
    }
}
/* 删除商品属性 */
function deleteProdProp() {
    var prodproperty = new pdm.prodproperty();
    prodproperty.ProdProperty_Id = pageVariable.delProdPropFrm.prodproperty_id;
    prodproperty.deleteProdProperty(function () {
        pageVariable.prodPropList.deleteData(prodproperty.ProdProperty_Id);
        pageVariable.delProdPropFrm.close();

        pageVariable.propSource = null;
    });
}

/* 查看商品属性 */
function viewProdPropFrm(key) {
    if (!pageVariable.viewProdPropFrm) {
        pageVariable.viewProdPropFrm = new uicontrol.dialog("viewProdPropFrm", mlm.C0129, { width: 900, position: ["auto", 15] });
        pageVariable.viewProdPropFrm.show();

        pageVariable.pvalueList_v = new uicontrol.tableList("pvalueList_v",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "PropValue_Id",
                                         height: 200,
                                         columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 100, align: 'center', adjust: true, createCell: constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'left' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 200, align: 'left'}]
                                     });
    }
    else {
        pageVariable.viewProdPropFrm.show();
    }

    var m_prodproperty = new pdm.prodproperty();
    m_prodproperty.ProdProperty_Id = key;
    m_prodproperty.readProdProperty(function (retObj) {
        $("#lbPropName_v").text(retObj.ProdPropName);

        var m_tableSource = datastruct.convertion.jsonToTable(retObj.PropValues);
        pageVariable.pvalueList_v.bindDataSource(m_tableSource);
    });
}

/* 初始化属性值处理的窗体 */
function initHandlerPValueFrm() {
    if (!pageVariable.handlerPValueFrm) {
        pageVariable.handlerPValueFrm = new uicontrol.dialog("handlerPValueFrm", "", { width: 800, position: ["auto", 35] }, savePValue);
        pageVariable.propPicFile = new uicontrol.file("propPicFile");
    }
}
/* 打开新增属性值的窗体 */
function openNewPValueFrm() {

    initHandlerPValueFrm();

    $("#txtPValue").val(""); 
    $("#txtPValueCode").val("");
    $("#txtSMTPValue").val("");
    $("#txtPValueSeq").attr("disabled", "disabled").val(mlm.C0142);

    pageVariable.handlerPValueFrm.propvalue_id = 0;
    pageVariable.handlerPValueFrm.action = "New";
    pageVariable.handlerPValueFrm.setTitle(mlm.C0530 + mlm.C0608);
    pageVariable.handlerPValueFrm.show();
}
/* 打开修改属性值的窗体 */
function openModifyPValueFrm() {

    initHandlerPValueFrm();

    var m_key = $(this).attr("tag");

    var m_obj = pageVariable.pvalueList.getItem(m_key);
    $("#txtPValue").val(m_obj.PValue);
    $("#txtPValueCode").val(m_obj.PValueCode);
    $("#txtSMTPValue").val(m_obj.SMT_PropValue_Id);

    var m_seqCtrl = $("#txtPValueSeq");
    m_seqCtrl.attr("disabled", null).val(mlm.C0332);
    m_seqCtrl.val(m_obj.Seq);

    pageVariable.handlerPValueFrm.propvalue_id = m_key;
    pageVariable.handlerPValueFrm.action = "Modify";
    pageVariable.handlerPValueFrm.setTitle(mlm.C0061 + mlm.C0608);
    pageVariable.handlerPValueFrm.show();
}
/* 打开删除属性值的窗体 */
function openDelPValueFrm() {
    if (!pageVariable.delPValueFrm) {
        pageVariable.delPValueFrm = new uicontrol.confirmDelete(deletePValue);
    }

    pageVariable.delPValueFrm.propvalue_id = $(this).attr("tag");
    var m_obj = pageVariable.pvalueList.getItem(pageVariable.delPValueFrm.propvalue_id);

    pageVariable.delPValueFrm.showConfirm(mlm.C0464 + mlm.C0608 + "(" + m_obj.PValue + ") ?");
}
/* 保存属性值 */
function savePValue() {

    var m_pvalue = $.trim($("#txtPValue").val());
    if (!m_pvalue) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0620);
        return;
    }

    var m_pvalueStruct = new datastruct.dictionary();
    var m_pvalueList = pageVariable.pvalueList.dataSource.items.arrValues;
    $.each(m_pvalueList, function () {

        if (pageVariable.handlerPValueFrm.action == "New") {
            m_pvalueStruct.setItem(this.PValue, null);
        }
        else {
            if (this.PropValue_Id != pageVariable.handlerPValueFrm.propvalue_id) {
                m_pvalueStruct.setItem(this.PValue, null);
            }
        }
    });

    if (m_pvalueStruct.containKey(m_pvalue)) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0621);
        return;
    }

    if (!pageVariable.handlerPValueFrm.maxId) {
        pageVariable.handlerPValueFrm.maxId = 1000000;
    }

    var m_prodproperty = new pdm.prodproperty();

    var m_pvalueObj = {};
    m_pvalueObj.PValue = m_pvalue;
    m_pvalueObj.PValueCode = $.trim($("#txtPValueCode").val());
    m_pvalueObj.SMT_PropValue_Id = $.trim($("#txtSMTPValue").val());
    
    var m_propPic = $("#propPicFile").val();
    if (m_propPic) {
        m_prodproperty.uploadPropPic(pageVariable.propPicFile, function (retObj) {

            m_pvalueObj.PicUrl = retObj;

            refreshPValueCtrl(m_pvalueObj);
        });
    }
    else {
        if (pageVariable.handlerPValueFrm.action == "Modify") {
            var m_pvalueListObj = pageVariable.pvalueList.getItem(pageVariable.handlerPValueFrm.propvalue_id);
            m_pvalueObj.PicUrl = m_pvalueListObj.PicUrl;
        }

        refreshPValueCtrl(m_pvalueObj);
    }

    pageVariable.handlerPValueFrm.close();
}
/* 删除属性值 */
function deletePValue() {
    pageVariable.pvalueList.deleteData(pageVariable.delPValueFrm.propvalue_id);

    var m_pvalueList = pageVariable.pvalueList.dataSource.items.arrValues;
    pageVariable.pvalueList.bindDataSource(null);
    var i = 1;
    $.each(m_pvalueList, function () {
        this.Seq = i;
        pageVariable.pvalueList.addData(this.PropValue_Id, this);
        i++;
    });

    pageVariable.delPValueFrm.close();
}

/* 刷新属性值控件 */
function refreshPValueCtrl(m_pvalueObj) {

    var m_pvalueList = pageVariable.pvalueList.dataSource.items.arrValues;

    if (pageVariable.handlerPValueFrm.action == "New") {
        pageVariable.handlerPValueFrm.maxId++;
        m_pvalueObj.PropValue_Id = pageVariable.handlerPValueFrm.maxId;
        m_pvalueObj.Seq = pageVariable.pvalueList.dataSource.totalCount + 1;
        pageVariable.pvalueList.addData(m_pvalueObj.PropValue_Id, m_pvalueObj);
    }
    else {
        m_pvalueObj.Seq = $("#txtPValueSeq").val();

        m_pvalueObj.PropValue_Id = pageVariable.handlerPValueFrm.propvalue_id;
        var m_pvalueListObj = pageVariable.pvalueList.getItem(m_pvalueObj.PropValue_Id);
        if (m_pvalueListObj.Seq == m_pvalueObj.Seq) {
            pageVariable.pvalueList.modifyData(m_pvalueObj.PropValue_Id, m_pvalueObj);
        }
        else {
            if (m_pvalueListObj.Seq > m_pvalueObj.Seq) {
                m_pvalueListObj.Seq = m_pvalueObj.Seq;
                $.each(m_pvalueList, function () {
                    if (this.PropValue_Id != m_pvalueObj.PropValue_Id && (this.Seq == m_pvalueObj.Seq || this.Seq > m_pvalueObj.Seq)) {
                        this.Seq = this.Seq + 1;
                    }
                });
            }
            else {
                m_pvalueListObj.Seq = m_pvalueObj.Seq;
                $.each(m_pvalueList, function () {
                    if (this.PropValue_Id != m_pvalueObj.PropValue_Id && (this.Seq == m_pvalueObj.Seq || this.Seq < m_pvalueObj.Seq)) {
                        this.Seq = this.Seq - 1;
                    }
                });
            }

            m_pvalueListObj.PicUrl = m_pvalueObj.PicUrl;

            var msortFunc = function sortNumber(a, b) {
                return a.Seq - b.Seq;
            };
            m_pvalueList.sort(msortFunc);

            pageVariable.pvalueList.bindDataSource(null);
            var i = 1;
            $.each(m_pvalueList, function () {
                this.Seq = i;
                pageVariable.pvalueList.addData(this.PropValue_Id, this);
                i++;
            });
        }
    }
}

/* 初始化商品分类-属性的窗体 */
function initPdcPropFrm(event) {

    if (!pageVariable.handlerPdcPropFrm) {
        pageVariable.handlerPdcPropFrm = new uicontrol.dialog("handlerPdcPropFrm", "", { width: 800 }, savePdcProp);

        var m_propTypeCtrl = $("#ddlPropType");
        m_propTypeCtrl.append("<option value='1'>" + mlm.C0128 + "</option>");
        m_propTypeCtrl.append("<option value='2'>" + mlm.C0125 + "</option>");

        var m_dSQChoiceCtrl = $("#ddlSQChoice");
        m_dSQChoiceCtrl.append("<option value='1'>" + mlm.C0108 + "</option>");
        m_dSQChoiceCtrl.append("<option value='2'>" + mlm.C0109 + "</option>");
    }

    var m_PropsCtrl = $("#ddlProps");
    if (!pageVariable.propSource) {
        var prodproperty = new pdm.prodproperty();
        prodproperty.getAllProdPropertys(function (source) {
            pageVariable.propSource = {};

            pageVariable.propSource.table = source;
            pageVariable.propSource.objs = datastruct.convertion.tableToJson(source);

            m_PropsCtrl.empty();
            $.each(pageVariable.propSource.objs, function () {
                m_PropsCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
            });

            if (event) {
                event();
            }
        });
    }
    else {
        if (pageVariable.propSource.objs.length > 0 && m_PropsCtrl.children().length == 0) {
            m_PropsCtrl.empty();
            $.each(pageVariable.propSource.objs, function () {
                m_PropsCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
            });
        }

        if (event) {
            event();
        }
    }
}
/* 打开新增商品分类-属性的窗体 */
function openNewPdcProp() {

    if (!pageVariable.pdcTree.selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0189);
        return;
    }

    initPdcPropFrm();

    $("#ddlProps").attr("disabled", false);
    $("#txtSeq").attr("disabled", "disabled").val(mlm.C0142);

    pageVariable.handlerPdcPropFrm.PdcProperty_Id = 0;
    pageVariable.handlerPdcPropFrm.action = "New";
    pageVariable.handlerPdcPropFrm.setTitle(mlm.C0244);
    pageVariable.handlerPdcPropFrm.show();
}
/* 打开修改商品分类-属性的窗体 */
function openModifyPdcProp() {

    var m_pdcProperty_Id = $(this).attr("tag");

    var m_pdcProperty = pageVariable.pdcPropList.getItem(m_pdcProperty_Id);

    initPdcPropFrm(function () {
        var m_propCtrl = $("#ddlProps");
        m_propCtrl.val(m_pdcProperty.ProdProperty_Id);
        m_propCtrl.attr("disabled", true);
        
        var m_propTypeCtrl = $("#ddlPropType");
        m_propTypeCtrl.val(m_pdcProperty.IsSku);
        m_propTypeCtrl.attr("disabled", false);

        var m_sqcCtrl = $("#ddlSQChoice");
        m_sqcCtrl.val(m_pdcProperty.IsKeyAttribute);
        m_sqcCtrl.attr("disabled", false);

        m_propCtrl.trigger("change");
    });

    $("#txtSeq").attr("disabled", false).val(m_pdcProperty.Seq);

    pageVariable.handlerPdcPropFrm.seq = m_pdcProperty.Seq;
    pageVariable.handlerPdcPropFrm.PdcProperty_Id = m_pdcProperty_Id;
    pageVariable.handlerPdcPropFrm.action = "Modify";
    pageVariable.handlerPdcPropFrm.setTitle(mlm.C0245);
    pageVariable.handlerPdcPropFrm.show();
}
/* 打开删除商品分类-属性的窗体 */
function openDeletePdcProp() {
    if (!pageVariable.delPdcPropFrm) {
        pageVariable.delPdcPropFrm = new uicontrol.confirmDelete(deletePdcProp);
    }

    pageVariable.delPdcPropFrm.PdcProperty_Id = $(this).attr("tag");

    pageVariable.delPdcPropFrm.showConfirm(mlm.C0242);
}
/* 保存商品分类-属性 */
function savePdcProp() {

    var m_prodpropId = $("#ddlProps").val();
    if (!m_prodpropId) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0623);
        return;
    }

    var m_pdcproperty = new pdm.pdcproperty();

    m_pdcproperty.PdcProperty_Id = pageVariable.handlerPdcPropFrm.PdcProperty_Id;
    m_pdcproperty.ProdCategory_Id = pageVariable.pdcTree.selectedItem.key;
    m_pdcproperty.ProdProperty_Id = m_prodpropId;
    m_pdcproperty.IsKeyAttribute = $("#ddlSQChoice").val();
    m_pdcproperty.IsSku = $("#ddlPropType").val();

    if (pageVariable.handlerPdcPropFrm.action == "New") {

        var m_repeat = false;
        var m_currPdcProps = pageVariable.pdcPropList.dataSource.items.arrValues;
        $.each(m_currPdcProps, function () {
            if (this.ProdProperty_Id == m_prodpropId) {
                m_repeat = true;
            }
        });

        if (m_repeat) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0624);
            return;
        }

        m_pdcproperty.newPdcProperty(function (retObj) {

            retObj.PValueRange = retObj.ProdProperty.OtherProps.PValueRange;
            retObj.ProdPropName = retObj.OtherProps.ProdPropName;
            pageVariable.pdcPropList.addData(retObj.PdcProperty_Id, retObj);

            pageVariable.handlerPdcPropFrm.close();
        });
    }
    else {
        m_pdcproperty.Seq = $("#txtSeq").val();
        m_pdcproperty.modifyPdcProperty(function () {

            if (pageVariable.handlerPdcPropFrm.seq == m_pdcproperty.Seq) {

                var m_modifieditem = pageVariable.pdcPropList.getItem(m_pdcproperty.PdcProperty_Id);
                m_modifieditem.IsKeyAttribute = m_pdcproperty.IsKeyAttribute;
                m_modifieditem.IsSku = m_pdcproperty.IsSku;

                pageVariable.pdcPropList.modifyData(m_modifieditem.PdcProperty_Id, m_modifieditem);
            }
            else {
                selectPdcEvent();
            }

            pageVariable.handlerPdcPropFrm.close();
        });
    }
}
/* 删除商品分类-属性 */
function deletePdcProp() {
    var m_pdcproperty = new pdm.pdcproperty();

    m_pdcproperty.PdcProperty_Id = pageVariable.delPdcPropFrm.PdcProperty_Id;
    m_pdcproperty.deletePdcProperty(function () {

        pageVariable.pdcPropList.deleteData(m_pdcproperty.PdcProperty_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        pageVariable.delPdcPropFrm.close();
    });
}

/* 查看商品分类-属性 */
function viewPdcPropFrm(key) {
    if (!pageVariable.viewPdcPropFrm) {
        pageVariable.viewPdcPropFrm = new uicontrol.dialog("viewPdcPropFrm", mlm.C0129, { width: 900, position: ["auto", 15] });
        pageVariable.viewPdcPropFrm.show();

        pageVariable.pdcpvalueList_v = new uicontrol.tableList("pdcpvalueList_v",
                                     { isPaging: false,
                                         autoSeq: true,
                                         keyColumn: "PropValue_Id",
                                         height: 200,
                                         columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 100, align: 'center', adjust: true, createCell: constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'left' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 200, align: 'left'}]
                                     });
    }
    else {
        pageVariable.viewPdcPropFrm.show();
    }

    var m_pdcObj = pageVariable.pdcPropList.getItem(key);

    $("#lbPdcPropName_v").text(m_pdcObj.ProdPropName);
    $("#lbPropType_v").text(getIsSkuStr(m_pdcObj.IsSku));
    $("#lbSupportQuery_v").text(getIsKeyAttributeStr(m_pdcObj.IsKeyAttribute));

    var m_prodproperty = new pdm.prodproperty();
    m_prodproperty.ProdProperty_Id = m_pdcObj.ProdProperty_Id;
    m_prodproperty.readProdProperty(function (retObj) {
        var m_tableSource = datastruct.convertion.jsonToTable(retObj.PropValues);
        pageVariable.pdcpvalueList_v.bindDataSource(m_tableSource);
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 属性定义 */
    $("#lbprodPropTag").text(mlm.C0063);
    /* 商品属性 */
    $("#lbPdcPropTitle").text(mlm.C0165);
    /* SKU属性模板 */
    $("#lbSkuTemplateTag").text(mlm.C0064);
    /* 商品属性列表 */
    $("#lbProdPropTitle").text(mlm.C0065);
    /* 新增商品属性 */
    $("#btNewProdProp").val(mlm.C0066);
    /* 属性名称 */
    $("#lbPropNameSymbol, #lbPropNameSymbol_v, #lbPdcPropNameSymbol_v").text(mlm.C0069 + ":");
    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2").text(mlm.C0049);
    /* 值范围 */
    $("#lbValueRange").text(mlm.C0071 + ":");
    /* 多个值之间采用分号(,)进行隔离 */
    $("#lbVRAlert").text(mlm.C0072);

    /* 添加属性 */
    $("#btAddPdcProp").val(mlm.C0075);
    /* 商品分类-属性 */
    $("#lbpdcPropTag").text(mlm.C0105);
    /* 商品类型 */
    $("#lbPropTypeSymbol, #lbPropTypeSymbol_v").text(mlm.C0070 + ":");

    /* 商品属性 */
    $("#lbPdcPropSymbol").text(mlm.C0165 + ":");
    /* 关键属性 */
    $("#lbSupportQuerySymbol, #lbSupportQuerySymbol_v").text(mlm.C0126 + ":"); 
    /* 序号 */
    $("#lbSeq, #lbPValueSeqSymbol").text(mlm.C0041 + ":");
    /* 属性-属性值 */
    $("#lbPropValueSymbol").text(mlm.C0610 + ":");

    /* 图片列表 */
    $("#lbPicListSymbol").text(mlm.C0249);
    /* 图片 */
    $("#lbPropPic").text(mlm.C0180 + ":");
    /* 支持单张图片或zip格式的图片压缩包 */
    $("#lbPropPicAlert").text(mlm.C0256);

    /* 属性值列表 */
    $("#lbPValueTitle, #lbPValueTitle_v, #lbPdcPValueTitle_v").text(mlm.C0608 + mlm.C0463);
    /* 添加属性值 */
    $("#btAddPValue").val(mlm.C0530 + mlm.C0608);
    /* 属性值 */
    $("#lbPValueSymbol").text(mlm.C0608 + ":");
    /* 属性值编码 */
    $("#lbPValueCode").text(mlm.C0609 + ":");

    /* ECMS-商品动态属性 */
    document.title = mlm.C0089;
}