(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品选择控件----- 
    */
    bizcontrol.selectproduct = function (selectedEvent, selectType) {
        var obj = new bizcontrol.selectproduct.fn.init(selectedEvent, selectType);
        return obj;
    };
    bizcontrol.selectproduct.fn = {
        /* ID识别码 */
        _key: 1,

        _activedobj: null,

        /* 构造函数 */
        init: function (selectedEvent, selectType) {
            this.selectedEvent = selectedEvent;

            var m_this = this;
            this._key = bizcontrol.selectproduct.fn._key;
            this._selectType = selectType;
            this._ctrl = $("<div id='_sysdv_selprod" + bizcontrol.selectproduct.fn._key + "' style='display: none; '></div>");
            var m_operaContainer = $("<div class='submitForm selectproduct-container'></div>");
            var m_operaTr = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_lbSkuProdCodeSymbol = $("<span style='margin: 0px 10px 0px 0px'>" + mlm.C1205 + ":</span>");
            this._txtSkuProdCode = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            var m_lbKeywordSymbol = $("<span style='margin: 0px 10px 0px 10px'>" + mlm.C0184 + ":</span>");
            this._txtKeyword = $("<input type='text' class='text-input' style='width: 480px' onkeypress='uicontrol.func.checkInput(event);' />");
            var m_btAdvQuery = $("<input type='button' class='normal-bt' value='" + mlm.C1035 + mlm.C0562 + "' />");
            m_btAdvQuery.click(function () {
                m_this._openQueryFrm();
            });
            var m_btQuery = $("<input type='button' class='normal-bt' value='" + mlm.C0562 + "' />");
            m_btQuery.click(function () {

                m_this.productList.bindSource([]);
                m_this._conditionObj.pdcIds = null;
                m_this._conditionObj.brandId = null;
                m_this._conditionObj.keyWord = $.trim(m_this._txtKeyword.val());
                m_this._conditionObj.skuProdCode = $.trim(m_this._txtSkuProdCode.val());
                m_this._conditionObj.propValueIds = null;
                m_this._conditionObj.prodState = null;
                m_this._conditionObj.sortFields = null;
                m_this._conditionObj.product_Ids = null;
                m_this._conditionObj._pageNum = 1;

                m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);
            });
            this._btSelected = $("<input type='button' class='normal-bt' value='" + mlm.C1109 + "(0)' />");
            this._btSelected.click(function () {

                if (m_this.selectedprods.count > 0) {
                    m_this.productList.bindSource([]);
                    m_this._conditionObj.pdcIds = null;
                    m_this._conditionObj.brandId = null;
                    m_this._conditionObj.keyWord = null;
                    m_this._conditionObj.propValueIds = null;
                    m_this._conditionObj.prodState = null;
                    m_this._conditionObj.sortFields = null;
                    m_this._conditionObj.product_Ids = m_this.selectedprods.arrKeys;
                    m_this._conditionObj._pageNum = 1;

                    m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);
                }
                else {
                    pageframe.control.alertDialog.showAlertInfo(mlm.C1110);
                }
            });
            var m_btConfirm = $("<input type='button' class='normal-bt' value='" + mlm.C0024 + "' />");
            m_btConfirm.click(function () {
                m_this._confirmSelected();
            });
            m_operaTr.append(m_lbSkuProdCodeSymbol);
            m_operaTr.append(this._txtSkuProdCode);
            m_operaTr.append(m_lbKeywordSymbol);
            m_operaTr.append(this._txtKeyword);
            m_operaTr.append(m_btAdvQuery);
            m_operaTr.append(m_btQuery);
            m_operaTr.append(this._btSelected);
            m_operaTr.append(m_btConfirm);
            m_operaContainer.append(m_operaTr);

            this._productListCtrl = $("<div class='productlist'></div>");
            m_operaContainer.append(this._productListCtrl);

            var m_moreContainer = $("<div class='more-container'></div>");
            var m_moreTr = $("<div class='more-tr'></div>");
            this._btQueryMore = $("<span class='bt-morepics'></span>");
            this._btQueryMore.hover(function () { $(this).addClass("over-load-bt"); }, function () { $(this).removeClass("over-load-bt"); });
            this._btQueryMore.click(function () {
                m_this._conditionObj._pageNum++;
                m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);
            });

            m_moreTr.append(this._btQueryMore);
            m_moreContainer.append(m_moreTr);
            m_operaContainer.append(m_moreContainer);

            this._ctrl.append(m_operaContainer);
            $(document).append(this._ctrl);

            this._skuselectctrl = $("<div id='_sysdv_selskuprod" + bizcontrol.selectproduct.fn._key + "' style='display: none; '></div>");
            var m_skuoperaContainer = $("<div class='submitForm selectproduct-container' style='width: 780px'></div>");
            var m_skuoperaTr = $("<div class='submitForm-tr first-item last-item'></div>");
            m_skuoperaTr.append("<span class='title'>" + mlm.C0734 + ":" + "</span>");
            this._lbProdName = $("<span></span>");
            m_skuoperaTr.append(this._lbProdName);
            m_skuoperaContainer.append(m_skuoperaTr);

            this._skuprodListCtrl = $("<div class='productlist' style='width: 780px; height: 400px'></div>");
            m_skuoperaContainer.append(this._skuprodListCtrl);
            this._skuselectctrl.append(m_skuoperaContainer);
            $(document).append(this._skuselectctrl);

            this._queryconditionctrl = $("<div id='_sysdv_querycond" + bizcontrol.selectproduct.fn._key + "' style='display: none; '></div>");

            var m_dvtabctrl = $("<div id='_sysdv_queryTabs" + bizcontrol.selectproduct.fn._key + "'></div>");
            var m_ulctrl = $("<ul class='prodTab'></ul>");
            m_ulctrl.append("<li><a href='#_sysdv_tb_querycond" + bizcontrol.selectproduct.fn._key + "'>" + mlm.C1034 + "</a></li>");
            m_ulctrl.append("<li><a href='#_sysdv_tb_adavquerycond" + bizcontrol.selectproduct.fn._key + "'>" + mlm.C1035 + mlm.C1034 + "</a></li>");
            m_dvtabctrl.append(m_ulctrl);

            var m_querycondctrl = $("<div id='_sysdv_tb_querycond" + bizcontrol.selectproduct.fn._key + "'></div>");
            var m_qctable = $("<div class='submitForm form-width'></div>");
            var m_qctable_tr1 = $("<div class='submitForm-tr first-item'></div>");
            m_qctable_tr1.append("<span class='title'>" + mlm.C0184 + ":</span>");
            this._keyworkctrl = $("<input type='text' class='text-long-input' onkeypress='uicontrol.func.checkInput(event);' />");
            m_qctable_tr1.append(this._keyworkctrl);
            m_qctable.append(m_qctable_tr1);
            var m_qctable_tr2 = $("<div class='submitForm-tr'></div>");
            m_qctable_tr2.append("<span class='title'>" + mlm.C0113 + ":</span>");
            this._pdcctrl = $("<span class='select-pdc'></span>");
            m_qctable_tr2.append(this._pdcctrl);
            m_qctable.append(m_qctable_tr2);
            var m_qctable_tr3 = $("<div class='submitForm-tr last-item'></div>");
            m_qctable_tr3.append("<span class='title'>" + mlm.C0112 + ":</span>");
            this._brandctrl = $("<span class='select-brand'></span>");
            m_qctable_tr3.append(this._brandctrl);
            m_qctable.append(m_qctable_tr3);
            m_querycondctrl.append(m_qctable);
            m_dvtabctrl.append(m_querycondctrl);

            var m_advaquerycondctrl = $("<div id='_sysdv_tb_adavquerycond" + bizcontrol.selectproduct.fn._key + "'></div>");
            var m_advatable = $("<div class='submitForm form-width'></div>");
            var m_advatable_tr1 = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_advcontainer = $("<div style='height: 30px'></div>");
            m_advcontainer.append("<span class='lb-title list-title'>" + mlm.C1037 + mlm.C0463 + "</span>");
            var m_btaddprop = $("<input type='button' class='normal-bt' style='float: right;' value='" + mlm.C0075 + "' />");
            m_btaddprop.click(function () {
                m_this._openAddPropFrm();
            });
            m_advcontainer.append(m_btaddprop);
            m_advatable_tr1.append(m_advcontainer);
            m_advatable_tr1.append("<table id='_sysdv_tb_proptdt" + bizcontrol.selectproduct.fn._key + "'></table>");
            m_advatable.append(m_advatable_tr1);
            m_advaquerycondctrl.append(m_advatable);
            m_dvtabctrl.append(m_advaquerycondctrl);

            this._queryconditionctrl.append(m_dvtabctrl);
            $(document).append(this._queryconditionctrl);

            this._addpropctrl = $("<div id='_sysdv_addprop" + bizcontrol.selectproduct.fn._key + "'></div>");
            var m_addproptable = $("<div class='submitForm form-width'></div>");
            this._addproptable_tr1 = $("<div class='submitForm-tr first-item'></div>");
            this._addproptable_tr1.append("<span class='title'>" + mlm.C0631 + ":</span>");
            this._propoptionctrl = $("<select class='dropdown-list'></select>");
            this._addproptable_tr1.append(this._propoptionctrl);
            m_addproptable.append(this._addproptable_tr1);
            this._addproptable_tr2 = $("<div class='submitForm-tr last-item'></div>");
            this._addproptable_tr2.append("<div style='height: 25px'><span class='lb-title list-title'>" + mlm.C0071 + "</span></div>");
            this._addproptable_tr2.append("<table id='_sysdv_tb_pvaluedt" + bizcontrol.selectproduct.fn._key + "'></table>");
            m_addproptable.append(this._addproptable_tr2);
            this._addpropctrl.append(m_addproptable);
            $(document).append(this._addpropctrl);

            this._conditionObj = {};
            this._conditionObj._pageNum = 1;
            this._conditionObj._pageCount = 48;

            m_btAdvQuery.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btQuery.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            this._btSelected.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btConfirm.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btaddprop.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

            bizcontrol.selectproduct.fn._key++;
        },

        /* 打开窗体 */
        show: function (selectedskuprods) {
            var m_thisobj = this;
            bizcontrol.selectproduct.fn._activedobj = this;
            if (!this._selectProdFrm) {
                this._selectProdFrm = new uicontrol.dialog(this._ctrl, mlm.C0395, { width: 1135, position: ["auto", 15] });

                this.productList = new uicontrol.simpleTableList(this._productListCtrl,
                                                                { keyColumn: "Product_Id",
                                                                    isPaging: false,
                                                                    constructTableFunc: this._constructProdTable,
                                                                    itemCss: "product-item",
                                                                    events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                        onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                        ondblclick: function () {
                                                                            var m_key = $(this).attr("tag");
                                                                            m_thisobj._showSkuProds(m_key);
                                                                        }
                                                                    }
                                                                });
            }

            if (selectedskuprods) {
                this.selectedskuprods = selectedskuprods;
            }
            else {
                this.selectedskuprods = new datastruct.dictionary();
            }
            this.selectedprods = new datastruct.dictionary();
            if (this.selectedskuprods) {
                $.each(this.selectedskuprods.arrValues, function () {
                    if (!m_thisobj.selectedprods.containKey(this.Product_Id)) {
                        m_thisobj.selectedprods.setItem(this.Product_Id, null);
                    }
                });
            }
            this.readproddict = new datastruct.dictionary();

            if (this.selectedskuprods && this.selectedskuprods.count > 0) {
                this._conditionObj.pdcIds = null;
                this._conditionObj.brandId = null;
                this._conditionObj.keyWord = null;
                this._conditionObj.propValueIds = null;
                this._conditionObj.prodState = null;
                this._conditionObj.sortFields = null;
                this._conditionObj.product_Ids = this.selectedprods.arrKeys;
                this.productList.bindSource([]);
                this._queryProducts(this._conditionObj._pageNum, this._conditionObj._pageCount, function (products) {
                    var m_proddict = new datastruct.dictionary();
                    $.each(products, function () {
                        m_proddict.setItem(this.Product_Id, this);
                    });

                    $.each(m_thisobj.selectedskuprods.arrValues, function () {
                        this.Product = m_proddict.getItem(this.Product_Id);
                    });
                });
            }
            else {
                this.productList.bindSource([]);
                this._btSelected.val(mlm.C1109 + "(0)");
            }

            this._selectProdFrm.show();
        },

        /* 打开高级查询窗体 */
        _openQueryFrm: function () {
            var m_this = this;
            if (!this._QueryProdFrm) {
                this._QueryProdFrm = new uicontrol.dialog(this._queryconditionctrl, mlm.C0171, { width: 825, position: ["auto", 25] }, function () {
                    m_this.productList.bindSource([]);
                    m_this._conditionObj.pdcIds = [];
                    if (m_this._selectPdc) {
                        if (m_this._selectPdc.pdcId instanceof Array) {
                            $.each(m_this._selectPdc.pdcId, function () {
                                m_this._conditionObj.pdcIds.push(this.toString());
                            });
                        }
                        else {
                            if (m_this._selectPdc.pdcId) {
                                m_this._conditionObj.pdcIds.push(m_this._selectPdc.pdcId.toString());
                            }
                        }
                    }

                    if (m_this._selectBrand) {
                        m_this._conditionObj.brandId = m_this._selectBrand.brandId;
                    }

                    m_this._conditionObj.keyWord = $.trim(this._keyworkctrl.val());

                    m_this._conditionObj.PropValueIds = null;
                    if (m_this._queryPropList) {
                        var propValueIds = [];
                        $.each(m_this._queryPropList.dataSource.items.arrValues, function () {
                            if (this.ProdPValueIdRange) {
                                $.each(this.ProdPValueIdRange.split(","), function () {
                                    propValueIds.push(this);
                                });
                            }
                        });

                        if (propValueIds.length > 0) {
                            m_this._conditionObj.propValueIds = propValueIds.join(",");
                        }
                    }

                    m_this._conditionObj.prodState = null;
                    m_this._conditionObj.sortFields = null;
                    m_this._conditionObj.product_Ids = null;
                    m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);

                    m_this._QueryProdFrm.close();
                });
                this.queryProdTabs = $("#_sysdv_queryTabs" + this._key).tabs({ show: function (event, ui) {
                    if (ui.index == 1) {
                        m_this._queryPropList = new uicontrol.tableList("_sysdv_tb_proptdt" + m_this._key,
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ProdProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 90, align: 'center' },
                                                { display: mlm.C0071, name: "ProdPValueRange", width: 450, align: 'center', adjust: true, createCell: bizcontrol.selectproduct.fn._constructProdPropValueCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: bizcontrol.selectproduct.fn._constructPropOperaCell}]
                                    });
                    }
                }
                });

                this._selectPdc = new bizcontrol.selectpdc(this._pdcctrl, true);
                this._selectBrand = new bizcontrol.selectbrand(this._brandctrl);
            }

            this._QueryProdFrm.show();
        },
        /* 查询商品 */
        _queryProducts: function (pageNum, pageCount, event) {

            var m_this = this;
            var m_product = new pdm.product();
            m_product.PdcIds = this._conditionObj.pdcIds;
            m_product.BrandId = this._conditionObj.brandId;
            m_product.Key = this._conditionObj.keyWord;
            m_product.SkuProdCode = this._conditionObj.skuProdCode;
            m_product.PropValueIds = this._conditionObj.propValueIds;
            m_product.ProdState = null;
            m_product.SortFields = null;
            m_product.Product_Ids = this._conditionObj.product_Ids;
            m_product.Page = pageNum;
            m_product.PageNum = pageCount;
            m_product.queryProducts(function (retTable) {
                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                $.each(m_jsonobjs, function () {
                    m_this.productList.addData(this);
                });

                var m_totalcount = Number(retTable.TotalCount);
                var m_currcount = m_this.productList.dataSource.items.arrValues.length;
                if (m_totalcount > m_currcount) {
                    m_this._btQueryMore.show();
                    m_this._btQueryMore.text(mlm.C0649 + "(" + m_currcount + "/" + m_totalcount + ")");
                }
                else {
                    m_this._btQueryMore.hide();
                }

                m_this.selectedprods = new datastruct.dictionary();
                m_this._handlerProdTable();

                if (event) {
                    event(m_jsonobjs);
                }
            });
        },
        /* 构建商品表格 */
        _constructProdTable: function (dataItem) {
            var m_src = "";
            if (dataItem.BrowsePicUrl) {
                if (dataItem.BrowsePicUrl.indexOf("http://") == -1) {
                    m_src = window.webLocation + dataItem.BrowsePicUrl;
                }
                else {
                    m_src = dataItem.BrowsePicUrl;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            var m_ctrl = $("<div></div>");
            var m_container = $("<div class='item'></div>");
            var m_img = $("<img src='" + m_src + "' class='pic-item' onload='commoncore.func.positionCenterImg.call(this);' onerror='commoncore.func.failLoadImg.call(this);' tag='" + dataItem.Product_Id + "' />");
            m_container.append(m_img);

            var m_prodname = dataItem.ProdName;
            var m_len = m_prodname.getBytesCount();
            if (m_len > 50) {
                m_prodname = m_prodname.substringByBytes(50) + "...";
            }

            var m_name = $("<div id='lbProdName_" + dataItem.Product_Id + "' class='name-item' tag='" + dataItem.ProdName + "'><a onclick='bizcontrol.selectproduct.fn._viewProduct.call(this, \"" + dataItem.Product_Id + "\")' href='javascript:void(\"0\");'>" + m_prodname + "</a></div>");
            if (m_len > 50) {
                m_name.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            }

            m_ctrl.append(m_container);
            m_ctrl.append(m_name);

            return m_ctrl;
        },
        /* 初始化添加属性窗体 */
        _initPropFrm: function (event) {
            var m_this = this;
            if (!this._SelPropFrm) {
                this._SelPropFrm = new uicontrol.dialog(this._addpropctrl, mlm.C0087, { width: 800, position: ["auto", 30] }, function () { m_this._saveProp(); });

                this._SelPropFrm.show();
                this._pvalueList = new uicontrol.tableList("_sysdv_tb_pvaluedt" + this._key,
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 270,
                                        selectModel: "2",
                                        keyColumn: "PropValue_Id",
                                        columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 90, align: 'center', adjust: true, createCell: bizcontrol.selectproduct.fn._constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'center' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 200, align: 'center'}]
                                    });

                var m_prodproperty = new pdm.prodproperty();
                m_prodproperty.getAllProdPropertys(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                    $.each(m_jsonobjs, function () {
                        m_this._propoptionctrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
                    });

                    if (event) {
                        event();
                    }

                    m_this._loadQueryPValue();
                });

                m_this._propoptionctrl.change(function () {
                    m_this._loadQueryPValue();
                });
            }
            else {
                if (event) {
                    event();
                }

                this._SelPropFrm.show();
            }
        },
        /* 打开添加属性窗体 */
        _openAddPropFrm: function () {
            this._initPropFrm();
            this._addproptable_tr1.show();
            this._SelPropFrm.action = "New";
        },
        /* 打开修改属性窗体 */
        _openModifyPropFrm: function () {

            var m_key = $(this).attr("tag");
            bizcontrol.selectproduct.fn._activedobj._SelPropFrm.ProdProperty_Id = m_key;
            bizcontrol.selectproduct.fn._activedobj._SelPropFrm.action = "Modify";

            bizcontrol.selectproduct.fn._activedobj._initPropFrm(function () {
                bizcontrol.selectproduct.fn._activedobj._propoptionctrl.val(m_key);
                bizcontrol.selectproduct.fn._activedobj._addproptable_tr1.hide();
                bizcontrol.selectproduct.fn._activedobj._loadQueryPValue(function () {
                    var m_propvalue = bizcontrol.selectproduct.fn._activedobj._queryPropList.getItem(m_key);
                    var m_selectStruct = new datastruct.dictionary();
                    if (m_propvalue) {
                        var m_prodPValueIds = m_propvalue.ProdPValueIdRange ? m_propvalue.ProdPValueIdRange.split(",") : null;
                        if (m_prodPValueIds) {
                            $.each(m_prodPValueIds, function () {
                                m_selectStruct.setItem(this);
                            });
                        }
                    }
                    bizcontrol.selectproduct.fn._activedobj._pvalueList.setSelectedItems(m_selectStruct);
                });
            });
        },
        /* 打开删除属性窗体 */
        _openDeletePropFrm: function () {
            if (!bizcontrol.selectproduct.fn._activedobj.delPropFrm) {
                bizcontrol.selectproduct.fn._activedobj.delPropFrm = new uicontrol.confirmDelete(bizcontrol.selectproduct.fn._deleteProp);
            }

            var m_key = $(this).attr("tag");
            var m_obj = bizcontrol.selectproduct.fn._activedobj._queryPropList.getItem(m_key);

            bizcontrol.selectproduct.fn._activedobj.delPropFrm.prodproperty_id = m_key;
            bizcontrol.selectproduct.fn._activedobj.delPropFrm.showConfirm(mlm.C0464 + mlm.C0165 + "(" + m_obj.ProdPropName + ") ?");
        },
        /* 加载属性值 */
        _loadQueryPValue: function (event) {
            var m_this = this;
            var m_prodproperty = new pdm.prodproperty();
            m_prodproperty.ProdProperty_Id = this._propoptionctrl.val();
            m_prodproperty.queryPropValueByProd(function (retTable) {
                m_this._pvalueList.bindDataSource(retTable);

                if (event) {
                    event();
                }
            });
        },
        /* 创建商品属性值单元格 */
        _constructProdPropValueCell: function (key, cellvalue) {
            if (!cellvalue) {
                return "";
            }
            else {
                return cellvalue;
            }
        },
        /* 创建属性设置列 */
        _constructPropOperaCell: function (key, cellvalue) {
            return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='bizcontrol.selectproduct.fn._openModifyPropFrm.call(this);'>" + mlm.C0611 + "</a>" +
                   "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='bizcontrol.selectproduct.fn._openDeletePropFrm.call(this);'>" + mlm.C0062 + "</a>";
        },
        /* 构建属性图片列 */
        _constructPropPicCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                var m_src = window.webLocation + cellvalue;
                return "<img class='product-list-img-sl' src='" + m_src + "' />";
            }
            else {
                return "";
            }
        },
        /* 保存属性 */
        _saveProp: function () {
            var m_selectItems = this._pvalueList.getSelectedItems();
            var m_pvalueIds = [];
            var m_pvalues = [];
            $.each(m_selectItems, function () {
                m_pvalueIds.push(this.PropValue_Id);
                m_pvalues.push(this.PValue);
            });

            var m_obj = {};
            m_obj.ProdProperty_Id = this._propoptionctrl.val();
            m_obj.ProdPropName = this._propoptionctrl.find("option:selected").text();
            m_obj.ProdPValueIdRange = m_pvalueIds.join(",");
            m_obj.ProdPValueRange = m_pvalues.join(",");

            if (this._SelPropFrm.action == "New" && this._queryPropList.getItem(m_obj.ProdProperty_Id) == null) {
                this._queryPropList.addData(m_obj.ProdProperty_Id, m_obj);
            }
            else {
                this._queryPropList.modifyData(m_obj.ProdProperty_Id, m_obj);
            }

            this._SelPropFrm.close();
        },
        /* 删除属性 */
        _deleteProp: function () {
            bizcontrol.selectproduct.fn._activedobj._queryPropList.deleteData(bizcontrol.selectproduct.fn._activedobj.delPropFrm.prodproperty_id);
            bizcontrol.selectproduct.fn._activedobj.delPropFrm.close();
        },

        /* 展示Sku选项 */
        _showSkuProds: function (product_id) {
            var m_thisobj = this;
            if (!this._selectSkuProdFrm) {
                this._selectSkuProdFrm = new uicontrol.dialog(this._skuselectctrl, mlm.C0577 + mlm.C1111, { width: 800, position: ["auto", 35] });

                this.skuproductList = new uicontrol.simpleTableList(this._skuprodListCtrl,
                                                                { keyColumn: "SkuProduct_Id",
                                                                    isPaging: false,
                                                                    constructTableFunc: this._constructSkuProdTable,
                                                                    itemCss: "skuproduct-item",
                                                                    events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                        onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                        ondblclick: function () {
                                                                            var m_skuproduct_id = $(this).attr("tag");

                                                                            var m_itemCtrl = m_thisobj.skuproductList.liList.getItem(m_skuproduct_id);
                                                                            if (!m_thisobj.selectedskuprods.containKey(m_skuproduct_id)) {

                                                                                if (m_thisobj._selectType == "single") {
                                                                                    var m_selecteditem = m_thisobj.skuproductList.getItem(m_skuproduct_id);
                                                                                    m_selecteditem.Product = m_thisobj._selectSkuProdFrm.product;

                                                                                    $.each(m_thisobj.selectedskuprods.arrKeys, function () {
                                                                                        var m_curritemCtrl = m_thisobj.skuproductList.liList.getItem(this);
                                                                                        if (m_curritemCtrl) {
                                                                                            m_curritemCtrl.css("background-color", "#FFFFFF");
                                                                                            m_curritemCtrl.css("color", "#222222");
                                                                                        }
                                                                                    });
                                                                                    m_thisobj.selectedskuprods.clear();

                                                                                    m_thisobj.selectedskuprods.setItem(m_skuproduct_id, m_selecteditem);
                                                                                    m_itemCtrl.css("background-color", "#F0F0F0");
                                                                                    m_itemCtrl.css("color", "#800000");
                                                                                }
                                                                                else {
                                                                                    var m_selecteditem = m_thisobj.skuproductList.getItem(m_skuproduct_id);
                                                                                    m_selecteditem.Product = m_thisobj._selectSkuProdFrm.product;
                                                                                    m_thisobj.selectedskuprods.setItem(m_skuproduct_id, m_selecteditem);
                                                                                    m_itemCtrl.css("background-color", "#F0F0F0");
                                                                                    m_itemCtrl.css("color", "#800000");
                                                                                }
                                                                            }
                                                                            else {
                                                                                m_thisobj.selectedskuprods.removeItem(m_skuproduct_id);
                                                                                m_itemCtrl.css("background-color", "#FFFFFF");
                                                                                m_itemCtrl.css("color", "#222222");
                                                                            }

                                                                            m_thisobj._handlerProdTable();
                                                                        }
                                                                    }
                                                                });
            }

            var m_func = function (retObj) {
                var m_picdict = new datastruct.dictionary();
                $.each(retObj.ProdPics, function () {
                    m_picdict.setItem(this.Product_Pic_Id, this);
                });

                $.each(retObj.SKUProducts, function () {
                    var m_this = this;
                    m_this = $.extend(m_this, m_this.OtherProps);
                    m_this.Product = retObj;
                });

                if (Number(retObj.SkuProdCount) > 1) {

                    var m_items = [];
                    $.each(retObj.SKUProducts, function () {
                        if (this.Product_Pic_Id != "0") {
                            var m_pic = m_picdict.getItem(this.Product_Pic_Id);
                            this.BrowsePicUrl = m_pic.BrowsePicUrl;
                        }

                        m_items.push(this);
                    });
                    m_thisobj.skuproductList.bindSource(m_items);
                    m_thisobj._lbProdName.text(retObj.ProdName);

                    $.each(m_items, function () {
                        if (m_thisobj.selectedskuprods.containKey(this.SkuProduct_Id)) {
                            var m_itemCtrl = m_thisobj.skuproductList.liList.getItem(this.SkuProduct_Id);
                            m_itemCtrl.css("background-color", "#F0F0F0");
                            m_itemCtrl.css("color", "#800000");
                        }
                    });

                    m_thisobj._selectSkuProdFrm.product = retObj;
                    m_thisobj._selectSkuProdFrm.show();
                }
                else {
                    $.each(retObj.SKUProducts, function () {
                        if (!m_thisobj.selectedskuprods.containKey(this.SkuProduct_Id)) {

                            if (m_thisobj._selectType == "single") {
                                m_thisobj.selectedskuprods.clear();

                                m_thisobj.selectedskuprods.setItem(this.SkuProduct_Id, this);
                            }
                            else {
                                var m_skupic = m_picdict.getItem(this.Product_Pic_Id);
                                if (m_skupic) {
                                    this.BrowsePicUrl = m_skupic.BrowsePicUrl;
                                }
                                m_thisobj.selectedskuprods.setItem(this.SkuProduct_Id, this);
                            }
                        }
                        else {
                            m_thisobj.selectedskuprods.removeItem(this.SkuProduct_Id);
                        }
                    });

                    m_thisobj._handlerProdTable();
                }

                m_thisobj.readproddict.setItem(retObj.Product_Id, retObj);
            };
            if (this.readproddict.containKey(product_id)) {
                m_func(this.readproddict.getItem(product_id));
            }
            else {
                var m_product = new pdm.product();
                m_product.Product_Id = product_id;
                m_product.readProduct(m_func);
            }
        },

        /* 构建商品Sku表格 */
        _constructSkuProdTable: function (dataItem) {
            var m_src = "";
            if (dataItem.BrowsePicUrl) {
                if (dataItem.BrowsePicUrl.indexOf("http://") == -1) {
                    m_src = window.webLocation + dataItem.BrowsePicUrl;
                }
                else {
                    m_src = dataItem.BrowsePicUrl;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            var m_ctrl = $("<div></div>");
            var m_container = $("<div class='item'></div>");
            var m_img = $("<img src='" + m_src + "' class='pic-item' onload='commoncore.func.positionCenterImg.call(this);' onerror='commoncore.func.failLoadImg.call(this);' tag='" + dataItem.Product_Id + "' />");
            m_container.append(m_img);

            var m_name = $("<div id='lbSkuProd_" + dataItem.SkuProduct_Id + "' class='name-item' tag='" + dataItem.SkuProduct_Id + "'>" + dataItem.SkuProps + "</div>");

            m_ctrl.append(m_container);
            m_ctrl.append(m_name);

            return m_ctrl;
        },

        /* 处理商品表 */
        _handlerProdTable: function () {
            var m_proddict = new datastruct.dictionary();
            if (this.selectedskuprods) {
                $.each(this.selectedskuprods.arrValues, function () {
                    if (!m_proddict.containKey(this.Product_Id)) {
                        m_proddict.setItem(this.Product_Id, null);
                    }
                });
            }
            var m_this = this;
            $.each(m_proddict.arrKeys, function () {
                if (!m_this.selectedprods.containKey(this)) {
                    var m_itemCtrl = m_this.productList.liList.getItem(this);
                    m_itemCtrl.css("background-color", "#F0F0F0");
                    m_itemCtrl.css("color", "#800000");
                }
            });

            $.each(this.selectedprods.arrKeys, function () {
                if (!m_proddict.containKey(this)) {
                    var m_itemCtrl = m_this.productList.liList.getItem(this);
                    m_itemCtrl.css("background-color", "#FFFFFF");
                    m_itemCtrl.css("color", "#222222");
                }
            });

            this.selectedprods = m_proddict;
            this._btSelected.val(mlm.C1109 + "(" + m_proddict.arrKeys.length + ")");
        },

        /* 查看产品 */
        _viewProduct: function (product_id) {
            if (!pageVariable.viewProdCtrl) {
                pageVariable.viewProdCtrl = new bizcontrol.viewproduct();
            }
            pageVariable.viewProdCtrl.show(product_id);
        },

        /* 确定选择 */
        _confirmSelected: function () {
            if (this.selectedskuprods.count == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1110);
                return;
            }

            if (this.selectedEvent) {
                this.selectedEvent(this.selectedskuprods.arrValues);
            }

            this._selectProdFrm.close();
        }
    };
    bizcontrol.selectproduct.fn.init.prototype = bizcontrol.selectproduct.fn;

})(window);