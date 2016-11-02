(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----供应商选择控件----- 
    */
    bizcontrol.selectsupplier = function (ctrl, csssytle, event) {
        var obj = new bizcontrol.selectsupplier.fn.init(ctrl, csssytle, event);
        return obj;
    };
    bizcontrol.selectsupplier.fn = {
        /* ID识别码 */
        _key: 1,

        /* 当前活动对象 */
        _actionObj: null,

        /* 构造函数 */
        init: function (ctrl, csssytle, event) {

            var thisObj = this;
            this._key = bizcontrol.selectsupplier.fn._key;
            this.ctrl = ctrl;
            this.event = event;

            var m_txtClass = "text-long-input";
            if (csssytle) {
                m_txtClass = csssytle.TxtClass;
            }

            this.suppNameTxt = $("<input type='text' class='" + m_txtClass + "' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            this.btSelect.click(function () { thisObj._openSelSuppFrm(); });
            this.suppNameTxt.change(function () { thisObj._inputSuppName(); });

            this._suppDialog = $("<div id='selSuppFrm_" + this._key + "' style='display: none;'></div>");
            var m_tablectrl = $("<div class='submitForm form-width-a' style='border-bottom-width: 0px; width: 878px'></div>");
            var m_tr = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_toolctrl = $("<div style='height: 30px'></div>");
            this._txtSuppKey = $("<input type='text' class='text-long-input' onkeypress='uicontrol.func.checkInput(event);' />");
            m_toolctrl.append(this._txtSuppKey);
            var m_btquerysupp = $("<input type='button' class='normal-bt' value='" + mlm.C0562 + "' />");
            m_toolctrl.append(m_btquerysupp);
            m_tr.append(m_toolctrl);
            m_tablectrl.append(m_tr);
            this._suppDialog.append(m_tablectrl);
            var supplistctrl = $("<table id='selSuppList_" + this._key + "'></table>");
            this._suppDialog.append(supplistctrl);

            this.ctrl.append(this.suppNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._suppDialog);

            m_btquerysupp.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btquerysupp.click(function () {
                bizcontrol.selectsupplier.fn._querySuppliers.call(thisObj, 1, thisObj.supplierList.pageNumber);
            });

            bizcontrol.selectsupplier.fn._key++;
        },

        /* 打开选择供应商的窗体 */
        _openSelSuppFrm: function () {

            var thisObj = this;

            bizcontrol.selectsupplier.fn._actionObj = thisObj;

            if (!this.selSuppFrm) {
                this.selSuppFrm = new uicontrol.dialog(this._suppDialog, mlm.C0577 + mlm.C1069, { width: 900, position: ["auto", 35] }, function () { bizcontrol.selectsupplier.fn._selectSupp.call(thisObj); });

                this.selSuppFrm.show();
                this.supplierList = new uicontrol.tableList("selSuppList_" + this._key,
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "Supplier_Id",
                                         selectModel: "1",
                                         height: 300,
                                         pageQueryHandler: bizcontrol.selectsupplier.fn._querySuppliers,
                                         columns: [{ display: mlm.C1069, name: "SuppName", width: 150, align: 'left', adjust: true, createCell: bizcontrol.selectsupplier.fn._constructSuppName },
                                                   { display: mlm.C0073, name: "S_ProdRemark", width: 220, align: 'left', adjust: true, createCell: commoncore.func.constructRemarkCell },
                                                   { display: mlm.C1166, name: "S_WebSite", width: 160, align: 'left' },
                                                   { display: mlm.C1168, name: "S_Address", width: 200, align: 'left', adjust: true, createCell: bizcontrol.selectsupplier.fn._constructAddressCell}]
                                     });
            }
            else {
                this.selSuppFrm.show();
            }

            this._txtSuppKey.val("");
            this.supplierList.bindDataSource(null);
        },
        /* 构造供应商名称列 */
        _constructSuppName: function (key, cellValue) {
            return "<a onclick='openViewSuppFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
        },
        /* 地址 */
        _constructAddressCell: function (key, cellvalue) {
            var m_obj = this.keyObj;

            if (cellvalue) {
                return m_obj.GlobalAreaName + "," + cellvalue;
            }
            else {
                return m_obj.GlobalAreaName;
            }
        },
        /* 获取查询条件 */
        _constructQueryCondition: function () {
            this.conditionObj = {};
            this.conditionObj.keyword = $.trim(this._txtSuppKey.val());
        },
        /* 查询供应商 */
        _querySuppliers: function (page, pagenum) {
            var thisObj = bizcontrol.selectsupplier.fn._actionObj;

            thisObj._constructQueryCondition();

            var m_supplier = new pom.supplier();
            m_supplier.KeyWord = thisObj.conditionObj.keyword;
            m_supplier.Page = page;
            m_supplier.PageNum = pagenum;

            m_supplier.querySuppliers(function (retTable) {
                thisObj.supplierList.bindDataSource(retTable);
            });
        },
        /* 选择供应商 */
        _selectSupp: function () {
            var m_selecteditems = this.supplierList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1178);
                return;
            }

            this.SuppName = m_selecteditems.SuppName;
            this.Supplier_Id = m_selecteditems.Supplier_Id;

            if (this.event) {
                this.event(this.Supplier_Id);
            }

            this.suppNameTxt.val(m_selecteditems.SuppName);
            this.suppNameTxt.attr("tag", m_selecteditems.Supplier_Id);
            this.selSuppFrm.close();
        },
        /* 设置 */
        setSupplier: function (supplier) {
            this.SuppName = supplier.SuppName;
            this.Supplier_Id = supplier.Supplier_Id;
            this.suppNameTxt.val(supplier.SuppName);
            this.suppNameTxt.attr("tag", supplier.Supplier_Id);
        },
        /* 清除供应商 */
        clear: function () {
            this.Supplier_Id = null;
            this.SuppName = null;

            this.suppNameTxt.val("");
            this.suppNameTxt.attr("tag", null);
        },

        /* 输入供应商 */
        _inputSuppName: function () {
            var m_suppname = $.trim(this.suppNameTxt.val());

            if (m_suppname) {
                var m_supplier = new pom.supplier();
                m_supplier.KeyWord = m_suppname;
                m_supplier.Page = 1;
                m_supplier.PageNum = 1;

                var thisObj = this;
                m_supplier.querySuppliers(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                    if (m_jsonobjs.length > 0) {
                        thisObj.SuppName = m_jsonobjs[0].SuppName;
                        thisObj.Supplier_Id = m_jsonobjs[0].Supplier_Id;

                        thisObj.suppNameTxt.val(thisObj.SuppName);
                        thisObj.suppNameTxt.attr("tag", thisObj.Supplier_Id);
                    }
                    else {
                        thisObj.SuppName = "";
                        thisObj.Supplier_Id = "0";

                        thisObj.suppNameTxt.val("");
                        thisObj.suppNameTxt.attr("tag", "0");
                    }

                    if (thisObj.event) {
                        thisObj.event(thisObj.Supplier_Id);
                    }
                });
            }
            else {
                this.SuppName = "";
                this.Supplier_Id = "0";

                this.suppNameTxt.val("");
                this.suppNameTxt.attr("tag", "0");

                if (this.event) {
                    this.event(this.Supplier_Id);
                }
            }
        }
    };
    bizcontrol.selectsupplier.fn.init.prototype = bizcontrol.selectsupplier.fn;
    /*-------------------------------*/

})(window);