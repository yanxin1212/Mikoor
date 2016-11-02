(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----物流解决方案选择控件----- 
    */
    bizcontrol.selectlstsolution = function (selectedevent, selectModel) {
        var obj = new bizcontrol.selectlstsolution.fn.init(selectedevent, selectModel);
        return obj;
    };
    bizcontrol.selectlstsolution.fn = {
        /* ID识别码 */
        _key: 1,

        /* 构造函数 */
        init: function (selectedevent, selectModel) {

            var thisObj = this;
            this._key = bizcontrol.selectlstsolution.fn._key;
            this.selectedevent = selectedevent;
            this.selectModel = selectModel;
            if (!this.selectModel) {
                this.selectModel = "2";
            }

            this._lstsolutionDialog = $("<div id='selLstSolutionFrm_" + this._key + "' style='display: none;'></div>");

            var m_tablectrl = $("<div class='submitForm form-width-a' style='border-bottom-width: 0px; width: 878px'></div>");
            var m_tr = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_toolctrl = $("<div style='height: 30px'></div>");
            var m_lefttd = $("<span class='left-cell'></span>");
            m_lefttd.append($("<span class='title'>" + mlm.M0053 + ":</span>"));
            this._txtLstSolutionKey = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            m_lefttd.append(this._txtLstSolutionKey);
            m_toolctrl.append(m_lefttd);
            var m_righttd = $("<span></span>");
            m_righttd.append($("<span class='title'>" + mlm.C0784 + ":</span>"));
            this._ddlLstCompany = $("<select class='dropdown-list'></select>");
            m_righttd.append(this._ddlLstCompany);
            m_toolctrl.append(m_righttd);
            m_tr.append(m_toolctrl);
            m_tablectrl.append(m_tr);
            this._lstsolutionDialog.append(m_tablectrl);
            var lstsolutionlistctrl = $("<table id='selLstSolutionList_" + this._key + "'></table>");
            this._lstsolutionDialog.append(lstsolutionlistctrl);

            $(document).append(this._lstsolutionDialog);

            bizcontrol.selectlstsolution.fn._key++;

            var m_func = function () {
                thisObj.lstsolution_ids = null;
                thisObj._queryLstSolutions(1, thisObj.lstSolutionList.pageNumber);
            };
            this._txtLstSolutionKey.change(m_func);
            this._ddlLstCompany.change(m_func);
        },

        /* 打开选择物流解决方案的窗体 */
        show: function (lstsolution_ids, saleplatform_id, warehouse_id, lstcompany_id) {

            var thisObj = this;
            this.lstsolution_ids = lstsolution_ids;
            this.SalePlatform_Id = saleplatform_id;
            this.Warehouse_Id = warehouse_id;
            this.LstCompany_Id = lstcompany_id;
            this.lstsolution_id_dict = new datastruct.dictionary();

            if (this.lstsolution_ids) {
                $.each(this.lstsolution_ids, function () {
                    thisObj.lstsolution_id_dict.setItem(this, null);
                });
            }

            if (!this.selLstSolutionFrm) {
                this.selLstSolutionFrm = new uicontrol.dialog(this._lstsolutionDialog, mlm.C0814, { width: 900, position: ["auto", 35] }, function () { bizcontrol.selectlstsolution.fn._selectLstSolution.call(thisObj); });

                var m_lstcompany = new lstm.lstcompany();
                m_lstcompany.getAllLstCompanys(function (retTable) {

                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                    thisObj._ddlLstCompany.append("<option value=''></option>");
                    $.each(m_jsonobjs, function () {
                        thisObj._ddlLstCompany.append("<option value='" + this.LstCompany_Id + "'>" + this.LstCompanyName + "</option>");
                    });

                    thisObj._ddlLstCompany.val(thisObj.LstCompany_Id);

                    thisObj.lstSolutionList.bindDataSource(null);
                    thisObj._queryLstSolutions(1, thisObj.lstSolutionList.pageNumber);
                });

                this.selLstSolutionFrm.show();
                this.lstSolutionList = new uicontrol.tableList("selLstSolutionList_" + this._key,
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "LstSolution_Id",
                                         selectModel: thisObj.selectModel,
                                         height: 270,
                                         pageQueryHandler: function (page, pagenum) { thisObj._queryLstSolutions(page, pagenum); },
                                         columns: [{ display: mlm.C0783, name: "LstSolutionName", width: 200, align: 'left', adjust: true, createCell: bizcontrol.selectlstsolution.fn._constructLstSolutionCell },
                                                   { display: mlm.C0784, name: "LstCompanyName", width: 120, align: 'left' },
                                                   { display: mlm.C0785, name: "LstSolutionType", width: 80, align: 'left', adjust: true, createCell: bizcontrol.selectlstsolution.fn._constructLstSoluTypeCell },
                                                   { display: mlm.C0810, name: "TrackWebAddress", width: 60, align: 'left', adjust: true, createCell: bizcontrol.selectlstsolution.fn._constructTrackWebCell },
                                                   { display: mlm.C1274, name: "WarehouseNames", width: 250, align: 'left'}]
                                     });
            }
            else {

                thisObj._ddlLstCompany.val(thisObj.LstCompany_Id);

                this.lstSolutionList.bindDataSource(null);
                this._queryLstSolutions(1, this.lstSolutionList.pageNumber);

                this.selLstSolutionFrm.show();
            }
        },
        /* 查询物流解决方案 */
        _queryLstSolutions: function (page, pagenum) {

            var thisObj = this;
            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.Page = page;
            m_lstsolution.PageNum = pagenum;
            m_lstsolution.Key = this._txtLstSolutionKey.val();
            m_lstsolution.LstCompany_Id = this._ddlLstCompany.val();
            m_lstsolution.LstSolution_Ids = this.lstsolution_ids;
            m_lstsolution.SalePlatform_Id = this.SalePlatform_Id;
            m_lstsolution.Warehouse_Id = this.Warehouse_Id;

            m_lstsolution.queryLstSolution(function (retTable) {
                thisObj.lstSolutionList.bindDataSource(retTable);
                thisObj.lstSolutionList.setSelectedItems(thisObj.lstsolution_id_dict);
            });
        },
        /* 选择物流解决方案 */
        _selectLstSolution: function () {
            var m_selecteditems = this.lstSolutionList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1142);
                return;
            }

            if (this.selectedevent) {
                this.selectedevent(m_selecteditems);
            }

            this.selLstSolutionFrm.close();
        },

        /* 构建解决方案列 */
        _constructLstSolutionCell: function (key, cellvalue) {
            return "<a onclick='openViewLstSolution.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellvalue + "</a>";
        },
        /* 构建进度跟踪列 */
        _constructTrackWebCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                return mlm.C0811;
            }
        },
        /* 构建快递类型列 */
        _constructLstSoluTypeCell: function (key, cellvalue) {
            if (cellvalue == "1") {
                return mlm.C0803;
            }
            else if (cellvalue == "2") {
                return mlm.C0804;
            }
            else if (cellvalue == "3") {
                return mlm.C0805;
            }
            else {
                return mlm.C0815;
            }
        }
    };
    bizcontrol.selectlstsolution.fn.init.prototype = bizcontrol.selectlstsolution.fn;
    /*-------------------------------*/

})(window);