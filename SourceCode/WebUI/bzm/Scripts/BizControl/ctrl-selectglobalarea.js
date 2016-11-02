(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----区域选择控件----- 
    */
    bizcontrol.selectglobalarea = function (ctrlId, singleModel, queryCondition, constructDisplayTxt, isCollapse, style) {
        var obj = new bizcontrol.selectglobalarea.fn.init(ctrlId, singleModel, queryCondition, constructDisplayTxt, isCollapse, style);
        return obj;
    };
    bizcontrol.selectglobalarea.fn = {

        /* 加载区域 */
        loadRegions: function (regionOptionCtrl) {
            if (!bizcontrol.selectglobalarea.fn.regionSource) {
                var m_globalarea = new othm.globalarea();
                m_globalarea.queryRegions(function (retTable) {
                    bizcontrol.selectglobalarea.fn.regionSource = datastruct.convertion.tableToJson(retTable);

                    regionOptionCtrl.append("<option value=''>" + mlm.C0403 + "</option>");
                    $.each(bizcontrol.selectglobalarea.fn.regionSource, function () {
                        regionOptionCtrl.append("<option value='" + this.GlobalArea_Id + "'>" + this.GlobalAreaName + "</option>");
                    });
                });
            }
            else {
                if (regionOptionCtrl.find("option").length == 0) {
                    regionOptionCtrl.append("<option value=''>" + mlm.C0403 + "</option>");
                    $.each(bizcontrol.selectglobalarea.fn.regionSource, function () {
                        regionOptionCtrl.append("<option value='" + this.GlobalArea_Id + "'>" + this.GlobalAreaName + "</option>");
                    });
                }
            }
        },

        /* 构造函数 */
        init: function (ctrlId, singleModel, queryCondition, constructDisplayTxt, isCollapse, style) {
            this.ctrl = $("#" + ctrlId);
            this.globalAreaSource = null;
            this.singleModel = singleModel;
            this.queryCondition = queryCondition;
            this._constructDisplayTxt = constructDisplayTxt;
            this._isCollapse = true;
            if (style) {
                this._style = style;
            }
            else {
                this._style = {};
            }
            this.filterObjs = null;
            if (isCollapse) {
                this._isCollapse = isCollapse;
            }

            var m_thisObj = this;

            if (singleModel) {
                this.txtGlobalArea = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            }
            else {
                if (!this._style.txtclass) {
                    this._style.txtclass = "multitext-input";
                }
                this.txtGlobalArea = $("<textarea cols='20' rows='3' class='" + this._style.txtclass + "' onkeypress='uicontrol.func.checkInput(event);'></textarea>");
            }

            this.txtGlobalArea.change(function () { m_thisObj._changeGlobalArea(); });

            var mImgBt = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            mImgBt.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            mImgBt.click(function () { m_thisObj._openSelectionFrm(); });

            this.ctrl.append(this.txtGlobalArea);
            this.ctrl.append(mImgBt);

            this.selectContainerCtrl = $("<div style='display: none;'></div>");

            var m_tableCtrl = $("<div class='submitForm form-width'  style='width: 827px'></div>");

            var m_trCtrl = $("<div class='submitForm-tr first-item'></div>");
            var m_lbRegionCtrl = $("<span class='title'>" + mlm.C0780 + ":</span>");
            this.ddlRegionCtrl = $("<select class='dropdown-list'></select>");
            this.ddlRegionCtrl.change(function () {
                m_this.filterGAreas();
            });
            m_trCtrl.append(m_lbRegionCtrl);
            m_trCtrl.append(this.ddlRegionCtrl);
            m_tableCtrl.append(m_trCtrl);

            this.loadRegions(this.ddlRegionCtrl);

            var m_tr_1Ctrl = $("<div class='submitForm-tr'></div>");
            var m_lbPYCtrl = $("<span class='title'>" + mlm.C0779 + ":</span>");
            var m_chkPYCtrl = $("<span>" + mlm.C0403 + "</span><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span><span>G</span><span>H</span><span>I</span><span>J</span><span>K</span><span>L</span><span>M</span><span>N</span><span>O</span><span>P</span><span>Q</span><span>R</span><span>S</span><span>T</span><span>U</span><span>V</span><span>W</span><span>X</span><span>Y</span><span>Z</span>");
            m_chkPYCtrl.css("margin", "0px 5px 0px 0px");
            m_chkPYCtrl.css("padding", "0px 5px 0px 5px");
            m_chkPYCtrl.addClass("bt");
            m_chkPYCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            var m_this = this;
            m_chkPYCtrl.click(function () {

                var m_thisCtrl = $(this);
                m_this.conditionPY = m_thisCtrl.text();
                m_chkPYCtrl.css("color", "#000000");
                m_thisCtrl.css("color", "red");

                m_this.filterGAreas();
            });
            m_tr_1Ctrl.append(m_lbPYCtrl);
            m_tr_1Ctrl.append(m_chkPYCtrl);
            m_tableCtrl.append(m_tr_1Ctrl);

            var m_tr_2Ctrl = $("<div class='submitForm-tr last-item' style='height: 415px;overflow-y: scroll; background: #FFFFFF'></div>");
            this.globalAreaTreeCtrl = $("<ul id='" + ctrlId + "_tree'></ul>");
            m_tr_2Ctrl.append(this.globalAreaTreeCtrl);
            m_tableCtrl.append(m_tr_2Ctrl);

            this.selectContainerCtrl.append(m_tableCtrl);

            $(document).append(this.selectContainerCtrl);
        },

        /* 清理 */
        setObj: function (expArea) {
            this.txtGlobalArea.val(expArea.globalAreaNames);
            this.txtGlobalArea.attr("areaIds", expArea.globalArea_Ids);
        },

        /* 获取对象 */
        getObj: function () {
            var obj = { globalAreaNames: null, globalArea_Ids: null };
            obj.globalAreaNames = this.txtGlobalArea.val();
            obj.globalArea_Ids = this.txtGlobalArea.attr("areaIds");

            return obj;
        },

        /* 清理 */
        clearObj: function () {
            this.txtGlobalArea.val("");
            this.txtGlobalArea.attr("areaIds", "");
        },

        /* 清理 */
        clear: function () {
            this.globalAreaSource = null;
            this.txtGlobalArea.val("");
            this.txtGlobalArea.attr("areaIds", "");
        },

        /* 获取数据源 */
        _querySource: function (source) {
            var m_thisObj = this;

            var m_areaIds = this.txtGlobalArea.attr("areaIds");
            if (m_areaIds) {
                m_areaIds = m_areaIds.replace(/#/g, '').split(",");
            }

            m_thisObj.globalAreaSource = {};
            m_thisObj.globalAreaSource.objList = [];
            var m_objarr = datastruct.convertion.tableToJson(source);
            m_thisObj.globalAreaSource.originSource = source;

            /* 支撑内部二级区域过滤 */
            var m_innerareaDict = new datastruct.dictionary();
            $.each(m_objarr, function () {
                if (Number(this.AreaType) == 2) {
                    if (!m_innerareaDict.containKey(this.AreaIndexs)) {
                        var m_dict = new datastruct.dictionary();
                        m_dict.setItem(this.GlobalArea_Id, this.ParentArea_Id);
                        m_innerareaDict.setItem(this.AreaIndexs, m_dict);
                    }
                    else {
                        m_innerareaDict.getItem(this.AreaIndexs).setItem(this.GlobalArea_Id, this.ParentArea_Id);
                    }
                }
            });

            if (!m_thisObj.singleModel) {
                m_thisObj.globalAreaSource.objList.push({ GlobalArea_Id: "-1", ParentArea_Id: "0", Layer: "1", AreaIndexs: "", IsImportant: "0", AreaType: "1",
                    PYType: "", GlobalAreaName: mlm.C0481, SonAreaCount: "0"
                });
            }

            if (m_thisObj.filterObjs && m_thisObj.filterObjs.count > 0) {

                $.each(m_objarr, function () {
                    if (this.AreaType == "1") {
                        if (!m_thisObj.filterObjs.containKey(this.GlobalArea_Id.toString())) {
                            m_thisObj.globalAreaSource.objList.push(this);
                        }
                    }
                    else {
                        if (m_innerareaDict.containKey(this.AreaIndexs)) {
                            var m_countryid = m_innerareaDict.getItem(this.AreaIndexs).getItem(this.GlobalArea_Id);
                            if (!m_thisObj.filterObjs.containKey(this.GlobalArea_Id.toString()) && !m_thisObj.filterObjs.containKey(m_countryid)) {
                                m_thisObj.globalAreaSource.objList.push(this);
                            }
                        }
                    }
                });
            }
            else {
                $.each(m_objarr, function () {
                    m_thisObj.globalAreaSource.objList.push(this);
                });
            }
            m_thisObj.globalAreaSource.tableList = datastruct.convertion.jsonToTable(m_thisObj.globalAreaSource.objList);

            m_thisObj.globalAreaSource.objDict = new datastruct.dictionary();

            $.each(m_thisObj.globalAreaSource.objList, function () {
                m_thisObj.globalAreaSource.objDict.setItem(this.GlobalArea_Id, this);
            });

            m_thisObj._bindControl(m_thisObj.globalAreaSource.objList, m_areaIds);
        },

        /* 打开选择的窗体 */
        _openSelectionFrm: function () {

            var m_thisObj = this;

            if (!this.selectContainer) {
                this.selectContainer = new uicontrol.dialog(this.selectContainerCtrl, mlm.C0237, { width: 850, height: 600, position: ["auto", 15] }, function () { m_thisObj._selectGlobalArea(); });
            }

            var globalarea = new othm.globalarea();

            if (m_thisObj.queryCondition == "country" || m_thisObj.queryCondition == "country&area" || !m_thisObj.queryCondition) {
                if (!this.globalAreaSource) {

                    if (m_thisObj.queryCondition == "country") {
                        globalarea.queryCountries(function (source) {
                            m_thisObj._querySource(source);
                        });
                    }
                    else if (m_thisObj.queryCondition == "country&area") {
                        globalarea.queryCountryAndInnerRegion(function (source) {
                            m_thisObj._querySource(source);
                        });
                    }
                    else {
                        globalarea.getAllGlobalAreas(function (source) {
                            m_thisObj._querySource(source);
                        });
                    }
                }
                else {
                    if (!m_thisObj.singleModel) {
                        m_thisObj._querySource(m_thisObj.globalAreaSource.originSource);

                        m_thisObj.filterGAreas();
                    }
                }
            }
            else {
                globalarea.GlobalArea_Ids = m_thisObj.queryCondition;
                globalarea.queryGlobalAreaByCountries(function (source) {
                    m_thisObj._querySource(source);
                });
            }

            this.selectContainer.show();
        },

        /* 绑定控件 */
        _bindControl: function (source, m_areaIds) {

            var m_param = {};

            if (this.singleModel) {
                m_param = { displayModel: "inline", sourceFormat: "json", operaModel: null,
                    keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                    dbClickEvent: function () { m_this._selectGlobalArea(); }, isForbitSynChild: true
                };
            }
            else {
                m_param = { displayModel: "inline", sourceFormat: "json", operaModel: "checkmodel",
                    keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName", isForbitSynChild: true
                };
            }

            if (this._constructDisplayTxt) {
                m_param.constructDisplayTxt = this._constructDisplayTxt;
            }
            if (this._isCollapse) {
                m_param.isCollapse = this._isCollapse;
            }

            var m_this = this;
            if (this.singleModel) {
                this.globalAreaTree = new uicontrol.treeView(this.globalAreaTreeCtrl, source, null, m_param);
                this.globalAreaTree.loadSource();
                this.globalAreaTree.selTvItem(m_areaIds);
            }
            else {
                this.globalAreaTree = new uicontrol.treeView(this.globalAreaTreeCtrl, source, function (sourceItem) {

                    var m_items = m_this.globalAreaTree._ctrl.find('input[name=' + m_this.globalAreaTree._ctrl.attr("id") + 'check]');

                    if (sourceItem.key == "-1") {

                        if ($(this).attr("checked")) {
                            $.each(m_items, function () {
                                var m_thisitem = $(this);
                                var m_objitem = m_this.globalAreaTree.getItem(m_thisitem.val());
                                if (m_objitem.sourceItem.tag.Layer == "1") {
                                    m_thisitem.attr("checked", true);
                                }
                            });
                        }
                        else {
                            m_items.attr("checked", false);
                        }
                    }
                    else {
                        if (!$(this).attr("checked")) {
                            var m_thisitem = $(this);
                            var m_objitem = m_this.globalAreaTree.getItem(m_thisitem.val());

                            var m_clearitems = [];
                            $.each(m_objitem.sourceItem.children, function () {
                                m_clearitems.push(this.key);
                            });

                            m_this.globalAreaTree.clearCheckedValues(m_clearitems);
                        }

                    }
                }, m_param);
                this.globalAreaTree.loadSource();
                this.globalAreaTree.setCheckedValues(m_areaIds);
            }
        },

        /* 选择区域 */
        _selectGlobalArea: function () {

            if (this.singleModel) {
                if (this.globalAreaTree.selectedItem) {
                    this.txtGlobalArea.val(this.globalAreaTree.selectedItem.value);
                    this.txtGlobalArea.attr("areaIds", this.globalAreaTree.selectedItem.key);
                }
            }
            else {
                var m_selectedAreas = this.globalAreaTree.getCheckedValues();

                var m_tempStruct = new datastruct.dictionary();
                $.each(m_selectedAreas, function () {
                    m_tempStruct.setItem(this, null);
                });

                var m_thisObj = this;

                var m_areaDict = new datastruct.dictionary();
                $.each(m_selectedAreas, function () {
                    if (this == "-1") {
                        return;
                    }
                    var m_obj = m_thisObj.globalAreaSource.objDict.getItem(this);
                    if (m_areaDict.containKey(m_obj.ParentArea_Id)) {
                        m_areaDict.removeItem(m_obj.ParentArea_Id);
                    }

                    m_areaDict.setItem(this, m_obj.GlobalAreaName);
                });

                this.txtGlobalArea.val(m_areaDict.arrValues.join(",  "));
                this.txtGlobalArea.attr("areaIds", m_areaDict.arrKeys);
            }

            this.selectContainer.close();
        },

        /* 改变区域事件 */
        _changeGlobalArea: function () {
            var m_thisObj = this;

            if (!this.globalAreaSource) {

                var globalarea = new othm.globalarea();
                if (m_thisObj.queryCondition == "country" || m_thisObj.queryCondition == "country&area" || !m_thisObj.queryCondition) {
                    if (m_thisObj.queryCondition == "country") {
                        globalarea.queryCountries(function (source) {
                            m_thisObj._querySource(source);
                            m_thisObj._setGlobalAreas();
                        });
                    }
                    else if (m_thisObj.queryCondition == "country&area") {
                        globalarea.queryCountryAndInnerRegion(function (source) {
                            m_thisObj._querySource(source);
                            m_thisObj._setGlobalAreas();
                        });
                    }
                    else {
                        globalarea.getAllGlobalAreas(function (source) {
                            m_thisObj._querySource(source);
                            m_thisObj._setGlobalAreas();
                        });
                    }
                }
                else {
                    globalarea.GlobalArea_Ids = m_thisObj.queryCondition;
                    globalarea.queryGlobalAreaByCountries(function (source) {
                        m_thisObj._querySource(source);
                        m_thisObj._setGlobalAreas();
                    });
                }
            }
            else {
                m_thisObj._setGlobalAreas();
            }
        },

        /* 设置区域 */
        _setGlobalAreas: function () {
            var m_areaNames = this.txtGlobalArea.val();

            var m_results = null;
            var m_resultIds = null;

            var m_thisObj = this;

            if (m_areaNames) {

                /* 多选 */
                if (!m_thisObj.singleModel) {

                    m_results = [];
                    m_resultIds = [];
                    var m_cache = new datastruct.dictionary();
                    var m_areaDict = new datastruct.dictionary();
                    var m_parentAreaDict = new datastruct.dictionary();

                    m_areaNames = m_areaNames.split(",");
                    $.each(m_areaNames, function () {
                        var m_area = $.trim(this);
                        if (m_area) {
                            $.each(m_thisObj.globalAreaSource.objList, function () {

                                if (this.GlobalArea_Id == "-1") {
                                    return;
                                }

                                if (this.GlobalAreaName == m_area && !m_cache.containKey(this.GlobalArea_Id)) {
                                    m_cache.setItem(this.GlobalArea_Id);

                                    if (!m_parentAreaDict.containKey(this.GlobalArea_Id)) {
                                        if (m_areaDict.containKey(this.ParentArea_Id)) {
                                            m_areaDict.removeItem(this.ParentArea_Id);
                                        }
                                        m_areaDict.setItem(this.GlobalArea_Id, this.GlobalAreaName);
                                        m_parentAreaDict.setItem(this.ParentArea_Id, this.GlobalAreaName);
                                    }
                                    return;
                                }
                            });
                        }
                    });

                    this.txtGlobalArea.val(m_areaDict.arrValues.join(", "));
                    this.txtGlobalArea.attr("areaIds", m_areaDict.arrKeys.join(","));
                }
                else {
                    $.each(m_thisObj.globalAreaSource.objList, function () {
                        if (!m_results && this.GlobalAreaName.indexOf(m_areaNames) > -1) {
                            m_results = this.GlobalAreaName;
                            m_resultIds = this.GlobalArea_Id;
                            return;
                        }
                    });

                    this.txtGlobalArea.val(m_results);
                    this.txtGlobalArea.attr("areaIds", m_resultIds);
                }
            }
            else {
                this.txtGlobalArea.val("");
                this.txtGlobalArea.attr("areaIds", "");

                if (this.globalAreaTree) {
                    this.globalAreaTree.selectedItem = null;
                }
            }
        },

        /* 过滤区域 */
        filterGAreas: function () {

            var m_areaIds = [];

            var m_selectDict = new datastruct.dictionary();
            var m_selectedAreas = this.globalAreaTree.getCheckedValues();
            if (m_selectedAreas.length == 0) {
                m_areaIds = this.txtGlobalArea.attr("areaIds");
                if (m_areaIds) {
                    m_areaIds = m_areaIds.replace(/#/g, '').split(",");
                }
            }
            $.each(m_selectedAreas, function () {
                m_areaIds.push(this);
                m_selectDict.setItem(this);
            });

            var m_regionid = this.ddlRegionCtrl.val();
            var m_py = this.conditionPY;
            if (!m_py) {
                m_py = mlm.C0403;
            }

            var m_countrys = [];
            var m_countryareaDict = new datastruct.dictionary();

            $.each(this.globalAreaSource.objList, function () {
                var m_areastr = this.GlobalArea_Id.toString();

                if (this.AreaType == "1") {

                    if (m_selectDict.containKey(m_areastr)) {
                        m_countrys.push(this);
                        m_countryareaDict.setItem(this.GlobalArea_Id, []);
                        return;
                    }

                    if (m_areastr == "-1") {
                        m_countrys.push(this);
                        return;
                    }

                    if (!m_regionid && m_py == mlm.C0403) {
                        m_countrys.push(this);
                        m_countryareaDict.setItem(this.GlobalArea_Id, []);
                    }
                    else {
                        if (m_regionid && m_py == mlm.C0403) {
                            if (this.ParentArea_Id == m_regionid) {
                                m_countrys.push(this);
                                m_countryareaDict.setItem(this.GlobalArea_Id, []);
                            }
                        }
                        else if (!m_regionid && m_py != mlm.C0403) {
                            if (this.PYType == m_py) {
                                m_countrys.push(this);
                                m_countryareaDict.setItem(this.GlobalArea_Id, []);
                            }
                        }
                        else {
                            if (this.ParentArea_Id == m_regionid && this.PYType == m_py) {
                                m_countrys.push(this);
                                m_countryareaDict.setItem(this.GlobalArea_Id, []);
                            }
                        }
                    }
                }
                else if (this.AreaType == "2") {

                    if (this.Layer == "2") {
                        m_countryareaDict.setItem(this.GlobalArea_Id, []);
                        var m_areas = m_countryareaDict.getItem(this.ParentArea_Id);
                        if (m_areas) {
                            m_areas.push(this);
                        }
                    }
                    else {
                        var m_areas = m_countryareaDict.getItem((this.AreaIndexs.toString().replaceAll("#", "").split(",")[1]).toString());
                        if (m_areas) {
                            m_areas.push(this);
                        }
                    }
                }
            });

            var m_thisObj = this;
            var m_retitems = [];
            $.each(m_countrys, function () {
                var m_ctitem = this;

                if (m_thisObj.filterObjs) {
                    if (!m_thisObj.filterObjs.containKey(m_ctitem.GlobalArea_Id.toString())) {
                        m_retitems.push(m_ctitem);
                    }
                    else {
                        return;
                    }
                }
                else {
                    m_retitems.push(m_ctitem);
                }

                var m_areas = m_countryareaDict.getItem(this.GlobalArea_Id);
                if (m_areas) {
                    $.each(m_areas, function () {
                        if (m_thisObj.filterObjs) {
                            if (!m_thisObj.filterObjs.containKey(this.GlobalArea_Id.toString())) {
                                m_retitems.push(this);
                            }
                        }
                        else {
                            m_retitems.push(this);
                        }
                    });
                }
            });

            this._bindControl(m_retitems, m_areaIds);
        }
    };
    bizcontrol.selectglobalarea.fn.init.prototype = bizcontrol.selectglobalarea.fn;
    /*-------------------------------*/

})(window);