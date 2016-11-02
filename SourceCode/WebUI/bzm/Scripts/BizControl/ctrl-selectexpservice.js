(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----配送服务选择控件----- 
    */
    bizcontrol.selectexpservice = function (ctrl, preCheckEvent, getCondEvent, fillExpServiceEvent) {
        var obj = new bizcontrol.selectexpservice.fn.init(ctrl, preCheckEvent, getCondEvent, fillExpServiceEvent);
        return obj;
    };
    bizcontrol.selectexpservice.fn = {
        /* ID识别码 */
        _key: 1,

        /* 构造函数 */
        init: function (ctrl, preCheckEvent, getCondEvent, fillExpServiceEvent) {

            var thisObj = this;
            this._key = bizcontrol.selectexpservice.fn._key;
            this.ctrl = ctrl;
            this.fillExpServiceEvent = fillExpServiceEvent;
            this.preCheckEvent = preCheckEvent;
            this.getCondEvent = getCondEvent;
            this.expserviceNameTxt = $("<input type='text' disabled='disabled'  class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            this.btSelect.click(function () { thisObj._openSelExpServiceFrm(); });

            this._expserviceDialog = $("<div id='selExpServiceFrm_" + this._key + "' style='display: none;'></div>");
            var expservicelistctrl = $("<table id='selExpServiceList_" + this._key + "'></table>");
            this._expserviceDialog.append(expservicelistctrl);

            this.ctrl.append(this.expserviceNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._expserviceDialog);

            bizcontrol.selectexpservice.fn._key++;
        },

        /* 打开选择配送服务的窗体 */
        _openSelExpServiceFrm: function () {

            var _continue = true;
            if (this.preCheckEvent) {
                _continue = this.preCheckEvent();
            }

            if (!_continue) {
                return;
            }

            var thisObj = this;

            if (!this.selExpServiceFrm) {
                this.selExpServiceFrm = new uicontrol.dialog(this._expserviceDialog, mlm.C0577 + mlm.C0436, { width: 900, position: ["auto", 35] }, function () { bizcontrol.selectexpservice.fn._selectExpService.call(thisObj); });

                this.selExpServiceFrm.show();
                this.expserviceList = new uicontrol.tableList("selExpServiceList_" + this._key,
                                     { autoSeq: true,
                                         keyColumn: "ExpressService_Id",
                                         selectModel: "1",
                                         height: 300,
                                         columns: [{ display: mlm.C0436, name: "ExpressServiceName", width: 300, align: 'left', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructExpServiceName },
                                                   { display: mlm.C0786, name: "ESType", width: 80, align: 'left', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructESTypeCell },
                                                   { display: mlm.C1101, name: "ExpCharge", width: 100, align: 'right', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructExpCharge },
                                                   { display: mlm.C0441, name: "", width: 120, align: 'right', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructAvaiTime },
                                                   { display: mlm.C0810, name: "IsTrack", width: 80, align: 'center', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructTrackWebCell}]
                                     });
            }
            else {
                this.selExpServiceFrm.show();
            }

            this._queryExpServices();
        },
        _constructExpServiceName: function (key, cellValue) {
            var m_arr = [];

            var m_obj = this.keyObj;
            m_arr.push("<a onclick='openViewExpressServiceFrm.call(this, \"" + m_obj.ExpressService_Id + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>");

            if (m_obj.WarehouseName) {
                m_arr.push("<div class='lb-symbol'>(" + m_obj.WarehouseName + ")</div>");
            }

            return m_arr.join("");
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
        _constructExpCharge: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },
        _constructAvaiTime: function (key, cellValue) {
            var m_obj = this.keyObj;
            if (m_obj.MinDeliveryTime) {
                return m_obj.MinDeliveryTime + "-" + m_obj.MaxDeliveryTime + mlm.C0984;
            }
        },
        _constructTrackWebCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                return mlm.C0811;
            }
        },
        /* 查询配送服务 */
        _queryExpServices: function () {

            var m_condObj = this.getCondEvent();

            var thisObj = this;
            var m_expservice = new sm.expressservice();
            m_expservice.SS_Product_Ids = m_condObj.SS_Product_Ids;
            m_expservice.ProdQtys = m_condObj.ProdQtys;
            m_expservice.Weight = m_condObj.Weight;
            m_expservice.GlobalArea_Id = m_condObj.GlobalArea_Id;
            m_expservice.SaleSite_Id = m_condObj.SaleSite_Id;
            m_expservice.Province = m_condObj.Province;
            m_expservice.City = m_condObj.City;

            m_expservice.getExpServicePrice(function (retTable) {
                thisObj.expserviceList.bindDataSource(retTable);

                var m_selecteddict = new datastruct.dictionary();
                m_selecteddict.setItem(thisObj.ExpressService_Id);
                thisObj.expserviceList.setSelectedItems(m_selecteddict);
            });
        },
        /* 选择客户 */
        _selectExpService: function () {
            var m_selecteditems = this.expserviceList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1243);
                return;
            }

            this.ExpressServiceName = m_selecteditems.ExpressServiceName;
            this.ExpressService_Id = m_selecteditems.ExpressService_Id;
            this.ExpressService = m_selecteditems;

            this.expserviceNameTxt.val(m_selecteditems.ExpressServiceName);
            this.expserviceNameTxt.attr("tag", m_selecteditems.ExpressService_Id);

            if (this.fillExpServiceEvent) {
                this.fillExpServiceEvent(m_selecteditems);
            }

            this.selExpServiceFrm.close();
        },
        /* 设置配送服务 */
        setExpService: function (expservice) {
            if (expservice) {
                this.ExpressServiceName = expservice.ExpressServiceName;
                this.ExpressService_Id = expservice.ExpressService_Id;

                this.expserviceNameTxt.val(expservice.ExpressServiceName);
                this.expserviceNameTxt.attr("tag", expservice.ExpressService_Id);
            }
            else {

                this.ExpressServiceName = null;
                this.ExpressService_Id = null;

                this.expserviceNameTxt.val("");
                this.expserviceNameTxt.attr("tag", "");
            }
        }
    };
    bizcontrol.selectexpservice.fn.init.prototype = bizcontrol.selectexpservice.fn;
    /*-------------------------------*/

})(window);