(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----成本科目选择控件----- 
    */
    bizcontrol.selectcostsubject = function (ctrlId) {
        var obj = new bizcontrol.selectcostsubject.fn.init(ctrlId);
        return obj;
    };
    bizcontrol.selectcostsubject.fn = {

        /* 构造函数 */
        init: function (ctrlId) {
            this.ctrl = $("#" + ctrlId);
            this.costSubjectSource = null;

            var m_thisObj = this;
            this.txtCostSubject = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.txtCostSubject.change(function () { m_thisObj._changeCostSubject(); });

            var mImgBt = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            mImgBt.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            mImgBt.click(function () { m_thisObj._openSelectionFrm(); });

            this.ctrl.append(this.txtCostSubject);
            this.ctrl.append(mImgBt);

            this.selectContainerCtrl = $("<div style='display: none;'></div>");
            this.costSubjectTreeCtrl = $("<ul></ul>");

            this.selectContainerCtrl.append(this.costSubjectTreeCtrl);

            $(document).append(this.selectContainerCtrl);
        },

        /* 清理 */
        setObj: function (costSubject) {
            this.txtCostSubject.val(costSubject.costSubjectNames);
            this.txtCostSubject.attr("costSubjectIds", costSubject.costSubject_Ids);
        },

        /* 获取对象 */
        getObj: function () {
            var obj = { costSubjectNames: null, costSubject_Ids: null };
            obj.costSubjectNames = this.txtCostSubject.val();
            obj.costSubject_Ids = this.txtCostSubject.attr("costSubjectIds");

            return obj;
        },

        /* 清理 */
        clearObj: function () {
            this.txtCostSubject.val("");
            this.txtCostSubject.attr("costSubjectIds", "");
        },

        /* 清理 */
        clear: function () {
            this.costSubjectSource = null;
            this.txtCostSubject.val("");
            this.txtCostSubject.attr("costSubjectIds", "");
        },

        /* 打开选择的窗体 */
        _openSelectionFrm: function () {

            var m_thisObj = this;

            if (!this.selectContainer) {
                this.selectContainer = new uicontrol.dialog(this.selectContainerCtrl, mlm.C0577 + mlm.C0497, { width: 850, height: 500, position: ["auto", 60] }, function () { m_thisObj._selectCostSubject(); });
            }

            var m_costSubjectIds = this.txtCostSubject.attr("costSubjectIds");
            if (m_costSubjectIds) {
                m_costSubjectIds = m_costSubjectIds.replace(/#/g, '').split(",");
            }

            var m_costsubject = new fm.costsubject();
            if (!this.costSubjectSource) {
                m_costsubject.getAllCostSubjects(function (source) {
                    m_thisObj._bindControl(source, m_costSubjectIds);
                });
            }
            else {
                m_thisObj.costSubjectTreeCtrl.selTvItem(m_costSubjectIds);
            }

            this.selectContainer.show();
        },

        /* 绑定控件 */
        _bindControl: function (source, m_costSubjectIds) {
            this.costSubjectSource = {};
            this.costSubjectSource.tableList = source;
            this.costSubjectSource.objList = datastruct.convertion.tableToJson(source);

            var m_this = this;

            this.costSubjectTreeCtrl = new uicontrol.treeView(this.costSubjectTreeCtrl, this.costSubjectSource.tableList, null,
                                                        { displayModel: "inline", sourceFormat: "table", operaModel: null,
                                                            keyColumn: "CostSubject_Id", parentKeyColumn: "ParentCostSubject_Id", displayColumn: "CostSubjectName",
                                                            dbClickEvent: function () { m_this._selectCostSubject(); }
                                                        });
            this.costSubjectTreeCtrl.loadSource();
            this.costSubjectTreeCtrl.selTvItem(m_costSubjectIds);
        },

        /* 选择区域 */
        _selectCostSubject: function () {

            if (this.costSubjectTreeCtrl.selectedItem) {
                this.txtCostSubject.val(this.costSubjectTreeCtrl.selectedItem.value);
                this.txtCostSubject.attr("costSubjectIds", this.costSubjectTreeCtrl.selectedItem.key);
            }

            this.selectContainer.close();
        },

        /* 改变区域事件 */
        _changeCostSubject: function () {
            var m_thisObj = this;

            if (!this.costSubjectSource) {
                var m_costsubject = new fm.costsubject();
                m_costsubject.getAllCostSubjects(function (source) {

                    m_thisObj.costSubjectSource = {};
                    m_thisObj.costSubjectSource.tableList = source;
                    m_thisObj.costSubjectSource.objList = datastruct.convertion.tableToJson(source);

                    m_thisObj.costSubjectTreeCtrl = new uicontrol.treeView(m_thisObj.costSubjectTreeCtrl, m_thisObj.costSubjectSource.tableList, null,
                                                        { displayModel: "inline", sourceFormat: "table", operaModel: null,
                                                            keyColumn: "CostSubject_Id", parentKeyColumn: "ParentCostSubject_Id", displayColumn: "CostSubjectName",
                                                            dbClickEvent: function () { m_thisObj._selectCostSubject(); }
                                                        });
                    m_thisObj.costSubjectTreeCtrl.loadSource();

                    m_thisObj._setCostSubjects();
                });
            }
            else {
                m_thisObj._setCostSubjects();
            }
        },

        /* 设置区域 */
        _setCostSubjects: function () {
            var m_costSubjectNames = this.txtCostSubject.val();

            var m_results = null;
            var m_resultIds = null;

            var m_thisObj = this;

            if (m_costSubjectNames) {

                $.each(m_thisObj.costSubjectSource.objList, function () {
                    if (!m_results && this.CostSubjectName.indexOf(m_costSubjectNames) > -1) {
                        m_results = this.CostSubjectName;
                        m_resultIds = this.CostSubject_Id;
                        return;
                    }
                });

                this.txtCostSubject.val(m_results);
                this.txtCostSubject.attr("costSubjectIds", m_resultIds);
            }
            else {
                this.txtCostSubject.val("");
                this.txtCostSubject.attr("costSubjectIds", "");
                this.costSubjectTreeCtrl.selectedItem = null;
            }
        }
    };
    bizcontrol.selectcostsubject.fn.init.prototype = bizcontrol.selectcostsubject.fn;
    /*-------------------------------*/

})(window);