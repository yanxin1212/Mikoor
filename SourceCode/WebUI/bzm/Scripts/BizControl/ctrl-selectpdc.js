(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品种类选择控件----- 
    */
    bizcontrol.selectpdc = function (ctrl, multiModel, shoppingSiteId, salesite_id, completedevent) {
        var obj = new bizcontrol.selectpdc.fn.init(ctrl, multiModel, shoppingSiteId, salesite_id, completedevent);
        return obj;
    };
    bizcontrol.selectpdc.fn = {

        /* 构造函数 */
        init: function (ctrl, multiModel, shoppingSiteId, salesite_id, completedevent) {
            this.ctrl = ctrl;
            this.multiModel = multiModel;
            this.salesite_id = salesite_id;
            this.completedevent = completedevent;

            if (multiModel) {
                this.pdcNameTxt = $("<input type='text' class='text-input' style='width: 535px' onkeypress='uicontrol.func.checkInput(event);' />");
            }
            else {
                this.pdcNameTxt = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            }

            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });

            var thisObj = this;
            this.btSelect.click(function () { thisObj.openSelectFrm(); });
            this.pdcNameTxt.change(function () { thisObj.inputPdcName($.trim($(this).val())); });

            this._pdcDialog = $("<div style='display: none;'></div>");
            this._pdcTree = $("<ul></ul>");

            this._pdcDialog.append(this._pdcTree);
            this.ctrl.append(this.pdcNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._pdcDialog);

            this.pdcSource = null;
            this.pdcId = null;
            this.pdcName = null;
        },

        /* 打开商品种类的选择窗体 */
        openSelectFrm: function () {

            var thisObj = this;
            if (!this.pdcDialog) {
                this.pdcDialog = new uicontrol.dialog(this._pdcDialog, mlm.C0103, { width: 910, height: 500, position: ["auto", 60] }, function () { thisObj.selectPdc(); });
            }

            if (!this.pdcSource || !this.pdcTree) {

                if (!this.salesite_id) {
                    var prodcategory = new pdm.prodcategory();
                    prodcategory.getAllProdCategorys(function (source) {
                        thisObj._bindSourceEvent(source);

                        if (thisObj.multiModel) {
                            thisObj.pdcTree.setCheckedValues(thisObj.pdcId);
                        }
                        else {
                            thisObj.pdcTree.selTvItem(thisObj.pdcId);
                        }
                    });
                }
                else {
                    var m_salepdcnav = new sm.salepdcnavigation();
                    m_salepdcnav.SaleSite_Id = this.salesite_id;
                    m_salepdcnav.querySalePdcNav(function (source) {
                        thisObj._bindSourceEvent(source);

                        if (thisObj.multiModel) {
                            thisObj.pdcTree.setCheckedValues(thisObj.pdcId);
                        }
                        else {
                            thisObj.pdcTree.selTvItem(thisObj.pdcId);
                        }
                    });
                }
            }
            else {
                if (thisObj.multiModel) {
                    this.pdcTree.setCheckedValues(this.pdcId);
                }
                else {
                    this.pdcTree.selTvItem(this.pdcId);
                }
            }

            this.pdcDialog.show();
        },

        /* 选择商品分类 */
        selectPdc: function () {

            if (!this.multiModel) {
                var m_pdc = this.pdcTree.selectedItem;
                if (!m_pdc) {
                    pageframe.control.alertDialog.showAlertInfo(mlm.C0099);
                    return;
                }

                this.pdcId = m_pdc.key;
                this.pdcName = this._getFullName(m_pdc.key);

                this.pdcNameTxt.val(this.pdcName);
            }
            else {
                var m_selectePdcs = this.pdcTree.getCheckedValues();

                var m_thisObj = this;

                var m_pdcArr = [];
                var m_pdcIdArr = [];
                $.each(m_selectePdcs, function () {
                    var m_obj = m_thisObj.pdcTree.getItem(this);

                    if (m_obj.sourceItem.children.length == 0) {
                        m_pdcArr.push(m_thisObj._getFullName(this));
                        m_pdcIdArr.push(this);
                    }
                });

                this.pdcId = m_pdcIdArr;
                this.pdcNameTxt.val(m_pdcArr.join(","));
                this.pdcNameTxt.attr("pdcIds", m_pdcIdArr);
            }

            if (this.completedevent) {
                this.completedevent();
            }

            this.pdcDialog.close();
        },

        /* 输入商品分类名称 */
        inputPdcName: function (pdcName) {

            if (!pdcName) {
                this.clear();

                if (this.completedevent) {
                    this.completedevent();
                }

                return;
            }

            var thisObj = this;
            if (!this.pdcSource || !this.pdcTree) {
                if (!this.salesite_id) {
                    var prodcategory = new pdm.prodcategory();
                    prodcategory.getAllProdCategorys(function (source) {

                        thisObj._bindSourceEvent(source);
                        thisObj._getPdc(pdcName);
                    });
                }
                else {
                    var m_salepdcnav = new sm.salepdcnavigation();
                    m_salepdcnav.SaleSite_Id = this.salesite_id;
                    m_salepdcnav.querySalePdcNav(function (source) {

                        thisObj._bindSourceEvent(source);
                        thisObj._getPdc(pdcName);
                    });
                }
            }
            else {
                this._getPdc(pdcName);
            }

            if (this.completedevent) {
                this.completedevent();
            }
        },

        /* 绑定数据源事件 */
        _bindSourceEvent: function (source) {
            this.pdcSource = source;
            this.pdcJson = datastruct.convertion.tableToJson(source);

            var m_this = this;

            if (this.multiModel) {
                this.pdcTree = new uicontrol.treeView(this._pdcTree, source, null,
                                                        { displayModel: "inline", sourceFormat: "table", operaModel: "checkmodel",
                                                            keyColumn: "ProdCategory_Id", parentKeyColumn: "ParentPdc_Id", displayColumn: "PdcName",
                                                            dbClickEvent: function () { m_this.selectPdc(); }
                                                        });
                this.pdcTree.loadSource();
            }
            else {
                this.pdcTree = new uicontrol.treeView(this._pdcTree, source, null,
                                                        { displayModel: "inline", sourceFormat: "table",
                                                            keyColumn: "ProdCategory_Id", parentKeyColumn: "ParentPdc_Id", displayColumn: "PdcName",
                                                            dbClickEvent: function () { m_this.selectPdc(); }
                                                        });
                this.pdcTree.loadSource();
            }
        },

        /* 设置商品分类 */
        setPdc: function (pdc) {
            this.pdcId = pdc.ProdCategory_Id;
            this.pdcName = pdc.PdcName;
            this.pdcNameTxt.val(pdc.PdcName);
        },

        /* 初始化显示的文本 */
        initDisplayText: function (displayTxt) {
            this.clear();
            this.pdcNameTxt.val(displayTxt);
        },

        /* 禁用 */
        disable: function () {
            this.pdcNameTxt.attr("disabled", "disabled");
            this.btSelect.hide();
        },

        /* 禁用 */
        enable: function () {
            this.pdcNameTxt.attr("disabled", false);
            this.btSelect.show();
        },

        /* 获取商品分类对象 */
        _getPdc: function (pdcName) {

            var m_thisObj = this;

            if (!this.multiModel) {
                var m_pdc = null;
                $.each(this.pdcJson, function () {

                    this.PdcName = m_thisObj._getFullName(this.ProdCategory_Id);
                    if (this.PdcName.toLowerCase().indexOf($.trim(pdcName).toLowerCase()) > -1) {
                        m_pdc = this;
                        return false;
                    }
                });

                if (!m_pdc) {
                    pageframe.control.alertDialog.showAlertInfo(pdcName + mlm.C0104);
                    this.clear();
                    return;
                }

                this.pdcId = m_pdc.ProdCategory_Id;
                this.pdcName = this._getFullName(m_pdc.ProdCategory_Id);

                this.pdcNameTxt.val(this.pdcName);
            }
            else {
                var m_pdcs = [];

                var m_inputPdcs = pdcName.split(",");
                var m_cache = new datastruct.dictionary();

                $.each(this.pdcJson, function () {

                    var m_pjitem = this;

                    var m_ctrlObj = m_thisObj.pdcTree.getItem(this.ProdCategory_Id);

                    if (m_ctrlObj.sourceItem.children && m_ctrlObj.sourceItem.children.length > 0) {
                        return;
                    }

                    m_pjitem.FullPdcName = m_thisObj._getFullName(this.ProdCategory_Id);

                    $.each(m_inputPdcs, function () {

                        var m_str = $.trim(this);
                        if (m_str) {
                            if (this.indexOf("-") > 0) {
                                if (m_pjitem.FullPdcName.toLowerCase().indexOf(m_str.toLowerCase()) > -1 && !m_cache.containKey(m_pjitem.ProdCategory_Id)) {
                                    m_pdcs.push(m_pjitem);
                                    m_cache.setItem(m_pjitem.ProdCategory_Id, null);
                                }
                            }
                            else {
                                if (m_pjitem.PdcName.toLowerCase().indexOf(m_str.toLowerCase()) > -1 && !m_cache.containKey(m_pjitem.ProdCategory_Id)) {
                                    m_pdcs.push(m_pjitem);
                                    m_cache.setItem(m_pjitem.ProdCategory_Id, null);
                                }
                            }
                        }
                    });

                });

                var m_pdcIdArr = [];
                var m_pdcStrArr = [];

                $.each(m_pdcs, function () {
                    m_pdcIdArr.push(this.ProdCategory_Id);
                    m_pdcStrArr.push(this.FullPdcName);
                });

                this.pdcId = m_pdcIdArr; ;
                this.pdcName = m_pdcStrArr.join(",");

                this.pdcNameTxt.val(this.pdcName);
            }
        },

        /* 获取商品分类完整路径 */
        _getFullName: function (pdcId) {

            var m_pdc = this.pdcTree.getItem(pdcId);

            var m_nameObj = { pdcName: m_pdc.sourceItem.value };
            this._resecurFullName(m_pdc.sourceItem.parentKey, m_nameObj);

            return m_nameObj.pdcName;

        },
        _resecurFullName: function (parentKey, fullNameObj, isbreak) {
            if (!isbreak && parentKey && parentKey > 0) {
                var m_parentPdc = this.pdcTree.getItem(parentKey);
                fullNameObj.pdcName = m_parentPdc.sourceItem.value + "-" + fullNameObj.pdcName;

                this._resecurFullName(m_parentPdc.sourceItem.parentKey, fullNameObj, true);
            }
        },

        /* 清除控件值 */
        clear: function () {
            this.pdcId = null;
            this.pdcName = null;
            this.pdcNameTxt.val("");

            if (this.pdcTree) {
                this.pdcTree.selectedItem = null;
            }
        },

        /* 清理数据 */
        claseDataSource: function () {
            this.pdcSource = null;
            this.clear();
        }
    };
    bizcontrol.selectpdc.fn.init.prototype = bizcontrol.selectpdc.fn;
    /*-------------------------------*/

})(window);