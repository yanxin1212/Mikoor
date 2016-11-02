(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----仓库选择控件----- 
    */
    bizcontrol.selectwarehouse = function (ctrl, completedevent, datalayer) {
        var obj = new bizcontrol.selectwarehouse.fn.init(ctrl, completedevent, datalayer);
        return obj;
    };
    bizcontrol.selectwarehouse.fn = {

        /* 构造函数 */
        init: function (ctrl, completedevent, datalayer) {
            this.ctrl = ctrl;
            this.completedevent = completedevent;
            this.datalayer = datalayer;

            this.warehouseNameTxt = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");

            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });

            var thisObj = this;
            this.btSelect.click(function () { thisObj.openSelectFrm(); });
            this.warehouseNameTxt.change(function () { thisObj.inputWarehouseName($.trim($(this).val())); });

            this._warehouseDialog = $("<div style='display: none;'></div>");
            this._warehouseTree = $("<ul></ul>");

            this._warehouseDialog.append(this._warehouseTree);
            this.ctrl.append(this.warehouseNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._warehouseDialog);

            this.warehouseSource = null;
            this.warehouse_id = null;
            this.warehousename = null;
        },

        /* 打开仓库的选择窗体 */
        openSelectFrm: function () {

            var thisObj = this;
            if (!this.whDialog) {
                this.whDialog = new uicontrol.dialog(this._warehouseDialog, mlm.C0577 + mlm.C1196, { width: 910, height: 500, position: ["auto", 60] }, function () { thisObj.selectWarehouse(); });
            }

            if (!this.warehouseSource || !this.warehouseTree) {
                var m_warehouse = new whm.warehouse();
                m_warehouse.getAllWarehouses(function (source) {

                    if (thisObj.datalayer == 1) {
                        var m_arr = [];
                        var m_jsonobjs = datastruct.convertion.tableToJson(source);
                        $.each(m_jsonobjs, function () {
                            if (!this.ParentWarehouse_Id || this.ParentWarehouse_Id == "0") {
                                m_arr.push(this);
                            }
                        });

                        thisObj._bindSourceEvent(m_arr);
                    }
                    else {
                        var m_jsonobjs = datastruct.convertion.tableToJson(source);
                        thisObj._bindSourceEvent(m_jsonobjs);
                    }

                    thisObj.warehouseTree.selTvItem(thisObj.warehouse_id);
                });
            }
            else {
                this.warehouseTree.selTvItem(this.warehouse_id);
            }

            this.whDialog.show();
        },

        /* 选择仓库 */
        selectWarehouse: function () {

            var m_warehouse = this.warehouseTree.selectedItem;
            if (!m_warehouse) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1181);
                return;
            }

            this.warehouse_id = m_warehouse.key;
            this.warehousename = this._getFullName(m_warehouse.key);
            this.warehouse = m_warehouse.tag;

            this.warehouseNameTxt.val(this.warehousename);

            if (this.completedevent) {
                this.completedevent();
            }

            this.whDialog.close();
        },

        /* 输入商品分类名称 */
        inputWarehouseName: function (warehousename) {

            if (!warehousename) {
                this.clear();

                if (this.completedevent) {
                    this.completedevent();
                }

                return;
            }

            var thisObj = this;
            if (!this.warehousejson || !this.warehouseTree) {
                var m_warehouse = new whm.warehouse();
                m_warehouse.getAllWarehouses(function (source) {

                    thisObj.warehousejson = datastruct.convertion.tableToJson(source);
                    thisObj._bindSourceEvent(thisObj.warehousejson);

                    thisObj.warehouseTree.selTvItem(thisObj.warehouse_id);

                    thisObj._getWarehouse(warehousename);
                });
            }
            else {
                this._getWarehouse(warehousename);
            }

            if (this.completedevent) {
                this.completedevent();
            }
        },

        /* 绑定数据源事件 */
        _bindSourceEvent: function (source) {
            var m_this = this;
            this.warehouseTree = new uicontrol.treeView(this._warehouseTree, source, null,
                                                        { displayModel: "inline", sourceFormat: "json",
                                                            keyColumn: "Warehouse_Id", parentKeyColumn: "ParentWarehouse_Id", displayColumn: "WarehouseName",
                                                            dbClickEvent: function () { m_this.selectWarehouse(); }
                                                        });
            this.warehouseTree.loadSource();
        },

        /* 设置库存 */
        setWarehouse: function (warehouse) {
            this.warehouse_id = warehouse.Warehouse_Id;
            this.warehousename = warehouse.WarehouseName;
            this.warehouse = warehouse;
            this.warehouseNameTxt.val(warehouse.WarehouseName);
        },

        /* 初始化显示的文本 */
        initDisplayText: function (displayTxt) {
            this.clear();
            this.warehouseNameTxt.val(displayTxt);
        },

        /* 禁用 */
        disable: function () {
            this.warehouseNameTxt.attr("disabled", "disabled");
            this.btSelect.hide();
        },

        /* 禁用 */
        enable: function () {
            this.warehouseNameTxt.attr("disabled", false);
            this.btSelect.show();
        },

        /* 获取商品分类对象 */
        _getWarehouse: function (warehousename) {

            var m_thisObj = this;

            var m_warehouse = null;
            $.each(this.warehousejson, function () {

                if (m_thisObj.datalayer == 1) {
                    if (this.ParentWarehouse_Id && this.ParentWarehouse_Id != "0") {
                        return;
                    }
                }
                this.WarehouseName = m_thisObj._getFullName(this.Warehouse_Id);
                if (this.WarehouseName.toLowerCase().indexOf($.trim(warehousename).toLowerCase()) > -1) {
                    m_warehouse = this;
                    return false;
                }
            });

            if (!m_warehouse) {
                pageframe.control.alertDialog.showAlertInfo(warehousename + mlm.C1182);
                this.clear();
                return;
            }

            this.warehouse_id = m_warehouse.Warehouse_Id;
            this.warehousename = this._getFullName(m_warehouse.Warehouse_Id);
            this.warehouse = m_warehouse.tag;

            this.warehouseNameTxt.val(this.warehousename);
        },

        /* 获取库存完整路径 */
        _getFullName: function (warehouse_id) {

            var m_warehouse = this.warehouseTree.getItem(warehouse_id);

            var m_nameObj = { warehousename: m_warehouse.sourceItem.value };
            this._resecurFullName(m_warehouse.sourceItem.parentKey, m_nameObj);

            return m_nameObj.warehousename;

        },
        _resecurFullName: function (parentKey, fullNameObj, isbreak) {
            if (!isbreak && parentKey && parentKey > 0) {
                var m_parentWH = this.warehouseTree.getItem(parentKey);
                fullNameObj.warehousename = m_parentWH.sourceItem.value + "-" + fullNameObj.warehousename;

                this._resecurFullName(m_parentWH.sourceItem.parentKey, fullNameObj, true);
            }
        },

        /* 清除控件值 */
        clear: function () {
            this.warehouse_id = null;
            this.warehousename = null;
            this.warehouse = null;
            this.warehouseNameTxt.val("");

            if (this.warehouseTree) {
                this.warehouseTree.selectedItem = null;
            }
        }
    };
    bizcontrol.selectwarehouse.fn.init.prototype = bizcontrol.selectwarehouse.fn;
    /*-------------------------------*/

})(window);