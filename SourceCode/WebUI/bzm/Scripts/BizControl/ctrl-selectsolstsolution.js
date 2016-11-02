(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----配送服务选择控件----- 
    */
    bizcontrol.selectsolstsolution = function (ctrl, preCheckEvent, getCondEvent, fillSolutionEvent) {
        var obj = new bizcontrol.selectsolstsolution.fn.init(ctrl, preCheckEvent, getCondEvent, fillSolutionEvent);
        return obj;
    };
    bizcontrol.selectsolstsolution.fn = {
        /* ID识别码 */
        _key: 1,

        /* 当前活动对象 */
        _actionObj: null,

        /* 构造函数 */
        init: function (ctrl, preCheckEvent, getCondEvent, fillSolutionEvent) {

            var thisObj = this;
            this._key = bizcontrol.selectsolstsolution.fn._key;
            this.ctrl = ctrl;
            this.fillSolutionEvent = fillSolutionEvent;
            this.preCheckEvent = preCheckEvent;
            this.getCondEvent = getCondEvent;
            this.lstSolutionNameTxt = $("<input type='text' disabled='disabled'  class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            this.btSelect.click(function () { thisObj._openSelLstSolutionFrm(); });

            this._lstsolutionDialog = $("<div id='selLstSolutionFrm_" + this._key + "' style='display: none;'></div>");
            var lstsolutionlistctrl = $("<table id='selLstSolutionList_" + this._key + "'></table>");
            this._lstsolutionDialog.append(lstsolutionlistctrl);

            this.ctrl.append(this.lstSolutionNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._lstsolutionDialog);

            bizcontrol.selectsolstsolution.fn._key++;
        },

        /* 打开选择物流解决方案的窗体 */
        _openSelLstSolutionFrm: function () {

            var _continue = true;
            if (this.preCheckEvent) {
                _continue = this.preCheckEvent();
            }

            if (!_continue) {
                return;
            }

            var thisObj = this;
            bizcontrol.selectsolstsolution.fn._actionObj = this;

            if (!this.selLstSolutionFrm) {
                this.selLstSolutionFrm = new uicontrol.dialog(this._lstsolutionDialog, mlm.C0577 + mlm.M0053, { width: 1000, position: ["auto", 35] }, function () { bizcontrol.selectsolstsolution.fn._selectLstSolution.call(thisObj); });

                this.selLstSolutionFrm.show();
                this.lstsolutionList = new uicontrol.tableList("selLstSolutionList_" + this._key,
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "LstSolution_Id",
                                         selectModel: "1",
                                         height: 300,
                                         pageQueryHandler: bizcontrol.selectsolstsolution.fn._queryLstSolution,
                                         columns: [{ display: mlm.M0053, name: "LstSolutionName", width: 180, align: 'left', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructExpServiceName },
                                                   { display: mlm.C0806, name: "Weight", width: 70, align: 'right', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructExpWeight },
                                                   { display: mlm.C0807, name: "TotalCharge", width: 240, align: 'right', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructExpCost },
                                                   { display: mlm.C0799, name: "", width: 100, align: 'left', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructAvaiTime },
                                                   { display: mlm.C0810, name: "TrackWebAddress", width: 60, align: 'center', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructTrackWebCell },
                                                   { display: mlm.C1266, name: "WarehouseNames", width: 160, align: 'left'}]
                                     });
            }
            else {
                this.selLstSolutionFrm.show();
            }

            this._queryLstSolution(1, this.lstsolutionList.pageNumber);
        },
        _constructExpServiceName: function (key, cellValue) {
            return "<a onclick='openViewLstSolution.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
        },
        _constructESTypeCell: function (key, cellValue) {
            if (cellValue == "1") {
                return mlm.C1014;
            }
            else if (cellValue == "2") {
                return mlm.C1015;
            }
            else {
                return mlm.C1016;
            }
        },
        _constructExpWeight: function (key, cellValue) {
            return Number(cellValue).toFixed(3) + " " + bizcontrol.selectsolstsolution.fn._actionObj.WUnit;
        },
        _constructExpCost: function (key, cellValue) {

            var m_obj = this.keyObj;

            var m_arr = [];
            var m_currsymbol = bizcontrol.selectsolstsolution.fn._actionObj.CurrSymbol;
            m_arr.push(commoncore.func.getCurrHtml(m_currsymbol, m_obj.TotalCharge));

            if (Number(m_obj.VATCharge) > 0) {
                m_arr.push(commoncore.func.getCurrHtml(m_currsymbol, m_obj.VATCharge) + "(" + mlm.C0988 + ")");
            }

            if (Number(bizcontrol.selectsolstsolution.fn._actionObj.Tax) > Number(m_obj.TaxLimit)) {
                m_arr.push(mlm.C0995);
            }

            if (m_arr.length > 0) {
                return m_arr.join("+");
            }
        },
        _constructAvaiTime: function (key, cellValue) {
            var m_obj = this.keyObj;
            if (m_obj.MinAvaiTime) {
                return m_obj.MinAvaiTime + "-" + m_obj.MaxAvaiTime + mlm.C0984;
            }
        },
        _constructTrackWebCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                return mlm.C0811;
            }
        },
        /* 查询物流解决方案 */
        _queryLstSolution: function (page, pagenum) {

            var m_condObj = bizcontrol.selectsolstsolution.fn._actionObj.getCondEvent();

            var thisObj = bizcontrol.selectsolstsolution.fn._actionObj;
            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.SalePlatform_Id = m_condObj.SalePlatform_Id;
            m_lstsolution.Weight = m_condObj.Weight;
            m_lstsolution.SysWeightUnit_Id = m_condObj.SysWeightUnit_Id;
            m_lstsolution.Length = m_condObj.Length;
            m_lstsolution.Width = m_condObj.Width;
            m_lstsolution.Height = m_condObj.Height;
            m_lstsolution.Tax = m_condObj.Tax;
            m_lstsolution.TaxSysCurrency_Id = m_condObj.TaxSysCurrency_Id;
            m_lstsolution.SysCurrency_Id = m_condObj.SysCurrency_Id;
            m_lstsolution.GlobalAreaIds = m_condObj.GlobalAreaIds;
            m_lstsolution.Province = m_condObj.Province;
            m_lstsolution.City = m_condObj.City;
            m_lstsolution.LstSolutionIds = m_condObj.LstSolutionIds;
            m_lstsolution.Warehouse_Id = m_condObj.Warehouse_Id;
            m_lstsolution.Page = page;
            m_lstsolution.PageNum = pagenum;

            this.WUnit = m_condObj.WUnit;
            this.CurrSymbol = m_condObj.CurrSymbol;
            this.Tax = m_condObj.Tax;

            m_lstsolution.queryLstCharge(function (retTable) {
                thisObj.lstsolutionList.bindDataSource(retTable);

                var m_selecteddict = new datastruct.dictionary();
                m_selecteddict.setItem(thisObj.LstSolution_Id);
                thisObj.lstsolutionList.setSelectedItems(m_selecteddict);
            });
        },
        /* 选择解决方案 */
        _selectLstSolution: function () {
            var m_selecteditems = this.lstsolutionList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1142);
                return;
            }

            this.LstSolutionName = m_selecteditems.LstSolutionName;
            this.LstSolution_Id = m_selecteditems.LstSolution_Id;
            this.LstSolution = m_selecteditems;

            this.lstSolutionNameTxt.val(m_selecteditems.LstSolutionName);
            this.lstSolutionNameTxt.attr("tag", m_selecteditems.LstSolution_Id);

            if (this.fillSolutionEvent) {
                this.fillSolutionEvent(m_selecteditems);
            }

            this.selLstSolutionFrm.close();
        },
        /* 设置解决方案 */
        setLstSolution: function (lstsolution) {
            if (lstsolution) {
                this.LstSolutionName = lstsolution.LstSolutionName;
                this.LstSolution_Id = lstsolution.LstSolution_Id;
                this.LstSolution = lstsolution;

                this.lstSolutionNameTxt.val(lstsolution.LstSolutionName);
                this.lstSolutionNameTxt.attr("tag", lstsolution.LstSolution_Id);
            }
            else {

                this.LstSolutionName = null;
                this.LstSolution_Id = null;
                this.LstSolution = null;

                this.lstSolutionNameTxt.val("");
                this.lstSolutionNameTxt.attr("tag", "");
            }
        }
    };
    bizcontrol.selectsolstsolution.fn.init.prototype = bizcontrol.selectsolstsolution.fn;
    /*-------------------------------*/

})(window);