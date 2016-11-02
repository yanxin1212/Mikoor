(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品查看控件----- 
    */
    bizcontrol.viewproduct = function () {
        var obj = new bizcontrol.viewproduct.fn.init();
        return obj;
    };
    bizcontrol.viewproduct.fn = {

        actionObj: null,

        /* 构造函数 */
        init: function () {
            if (!pageVariable.user) {
                pageVariable.user = userpopedom["user_" + m_usertoken];
            }
            if (pageVariable.user.RoleIds.indexOf("#1#") > -1 || pageVariable.user.RoleIds.indexOf("#8#") > -1) {
                pageVariable.isviewprodauth = true;
            }

            this.ctrl = $("<div id='viewProdFrm' class='view-product' style='display: none;'></div>");

            var m_containerCtrl = $("<div></div>");
            this.viewTabsCtrl = $("<div style='height: 550px'>");

            /* Tab控件 */
            var m_ulTabCtrl = $("<ul class='prodTab' style='width: 1090px'></ul>");
            m_ulTabCtrl.append("<li><a id='lkProdInfo_view' href='#prodInfo_view'>" + mlm.C0169 + "</a></li>");
            m_ulTabCtrl.append("<li><a href='#detailInfo'>" + mlm.C0173 + "</a></li>");
            m_ulTabCtrl.append("<li><a href='#skuList_view'>" + mlm.C0174 + "</a></li>");

            if (pageVariable.isviewprodauth) {
                m_ulTabCtrl.append("<li><a href='#purchaseprice_view'>" + mlm.M0054 + "</a></li>");
            }

            m_ulTabCtrl.append("<li><a href='#custom_view'>" + mlm.C1242 + "</a></li>");

            if (pageVariable.isviewprodauth) {
                m_ulTabCtrl.append("<li><a href='#ssproduct_view'>" + mlm.C1030 + "</a></li>");
            }
            this.viewTabsCtrl.append(m_ulTabCtrl);

            var m_prodInfo_viewCtrl = $("<div id='prodInfo_view'></div>");

            /* 图片控件 */
            this.m_picCtrl = $("<div class='pic-container'></div>");
            m_prodInfo_viewCtrl.append(this.m_picCtrl);

            /* 详细清单 */
            this.m_detailContainerCtrl = $("<div class='detail-container'></div>");
            var m_tableCtrl = $("<div class='submitForm basicinfo' style='width: 640px'></div>");

            var m_trProdNameCtrl = $("<div class='submitForm-tr first-item'><span></span></div>");
            m_trProdNameCtrl.append("<span class='title'>" + mlm.C0175 + ":</span>");
            /* 商品名称 */
            this.prodNameCtrl = $("<span style='width: 520px; display: inline-block'></span>");
            m_trProdNameCtrl.append(this.prodNameCtrl);
            m_tableCtrl.append(m_trProdNameCtrl);

            var m_trProdCodeCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trProdCodeCtrl.append("<span class='title'>" + mlm.C0194 + ":</span>");
            /* 商品编码 */
            this.prodCodeCtrl = $("<span style='width: 520px; display: inline-block'></span>");
            m_trProdCodeCtrl.append(this.prodCodeCtrl);
            m_tableCtrl.append(m_trProdCodeCtrl);

            var m_trUnitCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trUnitCtrl.append("<span class='title'>" + mlm.C1048 + ":</span>");
            /* 单位 */
            this.unitCtrl = $("<span style='width: 520px; display: inline-block'></span>");
            m_trUnitCtrl.append(this.unitCtrl);
            m_tableCtrl.append(m_trUnitCtrl);

            var m_trPdcCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trPdcCtrl.append("<span class='title'>" + mlm.C0090 + ":</span>");
            /* 商品分类 */
            this.pdcCtrl = $("<span style='width: 520px; display: inline-block'></span>");
            m_trPdcCtrl.append(this.pdcCtrl);
            m_tableCtrl.append(m_trPdcCtrl);

            var m_trBrandCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trBrandCtrl.append("<span class='title'>" + mlm.C0112 + ":</span>");
            /* 品牌 */
            this.brandCtrl = $("<span></span>");
            m_trBrandCtrl.append(this.brandCtrl);
            m_tableCtrl.append(m_trBrandCtrl);

            var m_trWeightCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trWeightCtrl.append("<span class='title'>" + mlm.C1247 + ":</span>");
            /* 商品净重 */
            this.weightCtrl = $("<span></span>");
            m_trWeightCtrl.append(this.weightCtrl);
            m_trWeightCtrl.append("<span style='margin: 0px 0px 0px 5px'>kg</span>");
            m_tableCtrl.append(m_trWeightCtrl);

            /* 商品属性 */
            this.propCtrl = $("<div></div>");
            m_tableCtrl.append(this.propCtrl);

            this.m_detailContainerCtrl.append(m_tableCtrl);
            m_prodInfo_viewCtrl.append(this.m_detailContainerCtrl);

            var m_proddescCtrl = $("<div id='detailInfo' class='desc-container'></div>");
            var m_desctitleCtrl = $("<div style='margin: 0px 0px 0px 0px; height: 20px'></div>");
            m_desctitleCtrl.append("<span class='lb-title list-title'>" + mlm.C1147 + "</span>");
            var m_previewToolbarCtrl = $("<div style='float: right;'></div>");
            var m_previewCtrl = $("<input type='button' class='normal-bt' style='margin:0px 10px 0px 0px' value='" + mlm.C0271 + "' />");
            m_previewToolbarCtrl.append(m_previewCtrl);
            m_desctitleCtrl.append(m_previewToolbarCtrl);
            m_proddescCtrl.append(m_desctitleCtrl);
            /* 商品详情控件 */
            this.htmlDetailCtrl = $("<textarea class='proddesc-container'></textarea>");
            m_proddescCtrl.append(this.htmlDetailCtrl);

            /* Sku控件 */
            this.m_skuCtrl = $("<div id='skuList_view' style='width: 1075px;'></div>");
            var m_skuTableCtrl = $("<table id='viewSkuTable'></table>");
            this.m_skuCtrl.append(m_skuTableCtrl);

            //采购价格
            var m_purchaseprice_viewCtrl = $("<div id='purchaseprice_view' style='width: 1075px;'></div>");
            var m_purchasepriceTable = $("<table id='purchasepriceTable_v'></table>");
            m_purchaseprice_viewCtrl.append(m_purchasepriceTable);

            //配货&报关信息
            var m_custom_viewCtrl = $("<div id='custom_view' style='width: 1075px;'></div>");
            var m_custom_tableCtrl = $("<div class='submitForm  form-width-d'></div>");

            var m_trCostumCtrl = $("<div class='submitForm-tr first-item'><span></span></div>");
            m_trCostumCtrl.append("<span class='title'>" + mlm.C1238 + ":</span>");
            /* 报关名称 */
            this.costumCtrl = $("<span></span>");
            m_trCostumCtrl.append(this.costumCtrl);
            m_custom_tableCtrl.append(m_trCostumCtrl);

            var m_trCostumCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trCostumCtrl.append("<span class='title'>" + mlm.C1621 + ":</span>");
            /* 报关名称 */
            this.costum_cnCtrl = $("<span></span>");
            m_trCostumCtrl.append(this.costum_cnCtrl);
            m_custom_tableCtrl.append(m_trCostumCtrl);

            var m_trCostumValueCtrl = $("<div class='submitForm-tr'></div>");
            var m_trCostumLeftCellCtrl = $("<span class='left-cell'></span>");
            m_trCostumLeftCellCtrl.append("<span class='title'>" + mlm.C1239 + ":</span>");
            /* 报关价值 */
            this.costumValueCtrl = $("<span></span>");
            m_trCostumLeftCellCtrl.append(this.costumValueCtrl);
            m_trCostumValueCtrl.append(m_trCostumLeftCellCtrl);
            var m_trCostumRightCellCtrl = $("<span></span>");
            m_trCostumRightCellCtrl.append("<span class='title'>" + mlm.C1240 + ":</span>");
            /* 海关编码 */
            this.costumCodeCtrl = $("<span></span>");
            m_trCostumRightCellCtrl.append(this.costumCodeCtrl);
            m_trCostumValueCtrl.append(m_trCostumRightCellCtrl);
            m_custom_tableCtrl.append(m_trCostumValueCtrl);

            var m_trOriginCtrl = $("<div class='submitForm-tr last-item'><span></span></div>");
            var m_trOriginLeftCellCtrl = $("<span class='left-cell'></span>");
            m_trOriginLeftCellCtrl.append("<span class='title'>" + mlm.C1241 + ":</span>");
            /* 原厂地 */
            this.originCtrl = $("<span></span>");
            m_trOriginLeftCellCtrl.append(this.originCtrl);
            m_trOriginCtrl.append(m_trOriginLeftCellCtrl);
            var m_trMaterialRightCellCtrl = $("<span></span>");
            m_trMaterialRightCellCtrl.append("<span class='title'>" + mlm.C1245 + ":</span>");
            /* 申报材质 */
            this.materialCtrl = $("<span></span>");
            m_trMaterialRightCellCtrl.append(this.materialCtrl);
            m_trOriginCtrl.append(m_trMaterialRightCellCtrl);
            m_custom_tableCtrl.append(m_trOriginCtrl);

            m_custom_viewCtrl.append(m_custom_tableCtrl);

            var m_trProdNameCtrl = $("<div class='submitForm-tr first-item'><span></span></div>");
            m_trProdNameCtrl.append("<span class='title'>" + mlm.C0175 + ":</span>");

            //站点商品信息
            var m_ssprod_viewCtrl = $("<div id='ssproduct_view' style='width: 1075px;'></div>");
            var m_ssprodTable = $("<table id='viewSSProdTable'></table>");
            m_ssprod_viewCtrl.append(m_ssprodTable);

            this.viewTabsCtrl.append(m_prodInfo_viewCtrl);
            this.viewTabsCtrl.append(m_proddescCtrl);
            this.viewTabsCtrl.append(this.m_skuCtrl);

            this.viewTabsCtrl.append(m_custom_viewCtrl);

            if (pageVariable.isviewprodauth) {
                this.viewTabsCtrl.append(m_purchaseprice_viewCtrl);
                this.viewTabsCtrl.append(m_ssprod_viewCtrl);
            }

            m_containerCtrl.append(this.viewTabsCtrl);
            this.ctrl.append(m_containerCtrl);

            m_previewCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            var m_this = this;
            m_previewCtrl.click(function () {
                var m_openfrm = window.open("_proddesc.htm", '', 'height=600, width=1180, top=60, left=30, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');
                m_openfrm.document.write(m_this.htmlDetailCtrl.text());
            });

            this.m_skuquotedctrl = $("<div id='viewSkuQuotedItemFrm' style='display: none;'></div>");
            var m_skuquotedTable = $("<table id='quotedpriceTable_v'></table>");
            this.m_skuquotedctrl.append(m_skuquotedTable);
            $(document).append(this.m_skuquotedctrl);

            /* 商品属性缓存 */
            this.pdcProps = new datastruct.dictionary();

            if (!pageVariable.viewSupplierFrm) {
                pageVariable.viewSupplierFrm = new bizcontrol.viewsupplier();
            }
        },

        /* 展示商品信息 */
        show: function (product_id, skuproduct_id) {

            /* this指针 */
            var thisObj = this;

            bizcontrol.viewproduct.fn.actionObj = this;

            if (!this.viewProdDialog) {
                this.viewProdDialog = new uicontrol.dialog(this.ctrl, mlm.C0197, { width: 1125, position: ["auto", 5] });
                this.picCtrl = new uicontrol.pictureSlip(this.m_picCtrl, { position: ["auto", 5] });

                this.viewTabsCtrl.tabs({ show: function (event, ui) { thisObj._showViewProdTab(event, ui); } });
            }

            if (thisObj.m_remarkCtrl) {
                thisObj.m_remarkCtrl.empty();
                thisObj.htmlDetailCtrl.empty();
                thisObj.m_remarkCtrl = null;
            }

            thisObj.propCtrl.empty();
            this.isloadskuprod = true;
            this.isloadssproduct = true;
            this.isloadquotedprice = true;

            var m_selectlis = [];
            var m_product = new pdm.product();
            m_product.Product_Id = product_id;
            m_product.readProductWithQuotedPrice(function (prodObj) {

                thisObj.viewProdDialog.product = prodObj;

                var m_selectedpvs = new datastruct.dictionary();
                var m_skuitems = [];

                var m_picdict = new datastruct.dictionary();
                $.each(prodObj.ProdPics, function () {
                    m_picdict.setItem(this.Product_Pic_Id, this);
                });

                var m_skupropDict = new datastruct.dictionary();
                $.each(prodObj.SKUProducts, function () {
                    m_skupropDict.setItem(this.SkuProduct_Id, this.OtherProps.SkuProps);
                });

                var m_quotedpriceDict = new datastruct.dictionary();
                $.each(prodObj.QuotedPriceTable, function () {
                    var m_skuobj = null;

                    if (m_quotedpriceDict.containKey(this.SkuProduct_Id)) {
                        m_skuobj = m_quotedpriceDict.getItem(this.SkuProduct_Id);

                        if (Number(this.QuotedPrice) < Number(m_skuobj.minQuotedPrice)) {
                            m_skuobj.minQuotedPrice = this.QuotedPrice;
                        }
                        else if (Number(this.QuotedPrice) > Number(m_skuobj.maxQuotedPrice)) {
                            m_skuobj.maxQuotedPrice = this.QuotedPrice;
                        }
                    }
                    else {
                        m_skuobj = {};
                        m_skuobj.minQuotedPrice = this.QuotedPrice;
                        m_skuobj.maxQuotedPrice = this.QuotedPrice;
                        m_quotedpriceDict.setItem(this.SkuProduct_Id, m_skuobj);
                    }

                    this.SkuProps = m_skupropDict.getItem(this.SkuProduct_Id);
                });

                $.each(prodObj.SKUProducts, function () {
                    this.SkuProps = this.OtherProps.SkuProps;
                    this.TotalStock = this.OtherProps.TotalStock;

                    if (this.OtherProps && this.PropValues) {
                        this.SkuProps = this.OtherProps.SkuProps;
                        this.SkuProd_Key = this.PropValues;
                    }

                    if (this.Product_Pic_Id != "0") {
                        var m_pic = m_picdict.getItem(this.Product_Pic_Id);
                        this.BrowsePicUrl = m_pic.BrowsePicUrl;
                    }

                    var m_quotedprice = m_quotedpriceDict.getItem(this.SkuProduct_Id);
                    if (m_quotedprice) {
                        this.MinQuotedPrice = m_quotedprice.minQuotedPrice;
                        this.MaxQuotedPrice = m_quotedprice.maxQuotedPrice;
                    }

                    m_skuitems.push(this);

                    if (skuproduct_id == this.SkuProduct_Id) {
                        var m_pvarr = this.PropValues.split("_");
                        $.each(m_pvarr, function () {
                            m_selectedpvs.setItem(this);
                        });
                    }
                });
                prodObj.SKUProducts = m_skuitems;

                var m_expendProps = [];
                $.each(prodObj.PropTable, function () {
                    if (this.IsSku == "1") {
                        var m_propid = this.ProdProperty_Id;
                        var m_sku_tr = $("<div class='submitForm-tr'></div>");
                        m_sku_tr.append("<span class='title'>" + this.ProdPropName + ":</span>");

                        var m_txtCtrl = $("<span style='width: 520px; display: inline-block; margin : 0px 0px -5px 0px; padding: 0px'></span>");
                        var m_values = $("<ul id='propul_" + m_propid + "'></ul>");
                        var m_pvalueids = this.ProdPValueIdRange.split(",");
                        var m_pvalues = this.ProdPValueRange.split(",");
                        var m_i = 0;
                        $.each(m_pvalueids, function () {

                            var m_liCtrl = $("<li class='color-pic' tag='" + m_propid + "' value='" + this + "'></li>");
                            var m_pvCtrl = $("<div style='text-align: center;' class='lb-symbol'>" + m_pvalues[m_i] + "</div>");
                            m_liCtrl.hover(function () {
                                $(this).css("border-color", "#A60000");
                            }, function () {
                                if (!$(this).attr("selected")) {
                                    $(this).css("border-color", "#ccc");
                                }
                            });
                            m_liCtrl.click(function () {
                                var m_propid = $(this).attr("tag");
                                var m_proplis = $("#propul_" + m_propid).find("li");

                                $.each(m_proplis, function () {
                                    $(this).css("border-color", "#ccc");
                                    $(this).attr("selected", null);
                                });

                                $(this).attr("selected", "true");
                                $(this).css("border-color", "#A60000");

                                var m_pvarr = new datastruct.dictionary();
                                $.each(prodObj.PropTable, function () {
                                    if (this.IsSku) {

                                        var m_selectedLis = $("#propul_" + this.ProdProperty_Id).find("li");
                                        $.each(m_selectedLis, function () {
                                            if ($(this).attr("selected")) {
                                                m_pvarr.setItem($(this).attr("value"), null);
                                            }
                                        });
                                    }
                                });

                                $.each(prodObj.ProdPics, function () {
                                    var m_level = 0;
                                    $.each(this.RelPValueIds, function () {
                                        if (m_pvarr.containKey(this)) {
                                            m_level++;
                                        }
                                    });

                                    this.Level = m_level;
                                });

                                var m_pic = "";
                                var m_l = 0;
                                $.each(prodObj.ProdPics, function () {
                                    if (this.Level && this.Level > 0) {
                                        if (this.Level > m_l) {
                                            m_l = this.Level;
                                            m_pic = this.PicUrl;
                                        }
                                    }
                                });

                                if (m_pic) {
                                    if (m_pic.indexOf("http://") == -1) {
                                        thisObj.picCtrl.mainView.attr("src", window.webLocation + m_pic);
                                    }
                                    else {
                                        thisObj.picCtrl.mainView.attr("src", m_pic);
                                    }
                                }
                            });
                            m_liCtrl.append(m_pvCtrl);

                            m_values.append(m_liCtrl);
                            m_i++;

                            if (m_selectedpvs.containKey(this.toString())) {
                                m_selectlis.push(m_liCtrl);
                            }
                        });
                        m_txtCtrl.append(m_values);
                        m_sku_tr.append(m_txtCtrl);
                        thisObj.propCtrl.append(m_sku_tr);
                    }
                    else {
                        m_expendProps.push(this);
                    }
                });
                $.each(m_expendProps, function () {
                    var m_tr = $("<div class='submitForm-tr'></div>");
                    m_tr.append("<span class='title'>" + this.ProdPropName + ":</span>");
                    var m_txtCtrl = $("<span style='width: 520px; display: inline-block'></span>");
                    m_txtCtrl.text(this.ProdPValueRange);

                    m_tr.append(m_txtCtrl);
                    thisObj.propCtrl.append(m_tr);
                });

                var m_statestr = "";
                if (prodObj.State == "0") {
                    m_statestr = " (" + mlm.C1150 + ")";
                }

                thisObj.prodNameCtrl.text(prodObj.ProdName + m_statestr);
                thisObj.weightCtrl.text(Number(prodObj.Weight).toFixed(3));

                if (prodObj.OtherProps.BrandName) {
                    thisObj.brandCtrl.text(prodObj.OtherProps.BrandName);
                }
                else {
                    thisObj.brandCtrl.text("");
                }

                thisObj.pdcCtrl.text(prodObj.OtherProps.PdcName);
                thisObj.prodCodeCtrl.text(prodObj.ProdCode);
                thisObj.unitCtrl.text(prodObj.Unit);
                thisObj.htmlDetailCtrl.val(prodObj.Remark.replace(/\^/g, "\"").replace(/\~/g, "\'"));

                thisObj.materialCtrl.text(prodObj.CustomMaterial);
                thisObj.costumCtrl.text(prodObj.CustomProdName);
                thisObj.costum_cnCtrl.text(prodObj.CustomProdName_CN);
                thisObj.costumValueCtrl.text("$ " + Number(prodObj.CustomValue).toFixed(2));
                thisObj.costumCodeCtrl.text(prodObj.CustomCode);
                thisObj.originCtrl.text(prodObj.OtherProps.GlobalAreaName);

                thisObj._fillProdPics(prodObj);

                $.each(m_selectlis, function () {
                    this.trigger("click");
                });
            });

            this.viewProdDialog.show();
            $("#lkProdInfo_view").trigger("click");
        },

        /* 查看商品Tab项 */
        _showViewProdTab: function (event, ui) {

            /* this指针 */
            var m_thisObj = this;

            /* 最小库存单元 */
            if (ui.index == 2) {

                if (!this.m_skuTable) {

                    this.m_skuTable = new uicontrol.tableList("viewSkuTable",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 440,
                                         keyColumn: "SkuProduct_Id",
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuProdPicCell },
                                                { display: mlm.C0128, name: "SkuProps", width: 160, align: 'left' },
                                                { display: mlm.C1205, name: "ProdCode", width: 120, align: 'left' },
                                                { display: mlm.C1064, name: "Cost", width: 100, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuCostCell },
                                                { display: mlm.C1153, name: "", width: 140, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuQuotedPriceCell },
                                                { display: mlm.C1652, name: "InventoryCost", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuCostCell },
                                                { display: mlm.C1619, name: "SafetyStock", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSafetyStockCell },
                                                { display: mlm.C0634, name: "TotalStock", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructStockCell}]
                                     });
                }

                if (this.isloadskuprod) {
                    this.m_skuTable.bindDataSource(this.viewProdDialog.product.SKUProducts);
                    this.isloadskuprod = false;
                }
            }
            /* 采购价格 */
            else if (ui.index == 3) {
                if (!this.m_purchasePriceTable) {

                    this.m_purchasePriceTable = new uicontrol.tableList("purchasepriceTable_v",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 440,
                                         keyColumn: "QuoteKey",
                                         columns: [{ display: mlm.C1069, name: "", width: 360, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructPurSourceCell },
                                                { display: mlm.C1153, name: "", width: 150, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructQuotedPriceCell },
                                                { display: mlm.C1163, name: "", width: 60, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructQuotedPeriodCell}]
                                     });
                }

                if (this.isloadquotedprice) {

                    var m_quoteditems = bizcontrol.viewproduct.fn._getQuotedPrices(0, null, 0);
                    this.m_purchasePriceTable.bindDataSource(m_quoteditems);

                    $.each(m_quoteditems, function () {
                        var m_itemCtrl = $("#lbQuotedRemark_v_" + this.QuoteKey);
                        m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
                    });

                    this.isloadquotedprice = false;
                }
            }
            /* 站点商品信息 */
            else if (ui.index == 5) {
                if (!m_thisObj.viewSSProdTable) {
                    m_thisObj.viewSSProdTable = new uicontrol.tableList("viewSSProdTable",
                                                { isPaging: false,
                                                    autoSeq: true,
                                                    height: 440,
                                                    keyColumn: "SS_Product_Id",
                                                    columns: [{ display: mlm.C0416, name: "", width: 150, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSaleSiteCell },
                                                               { display: mlm.C0180, name: "BrowsePicUrl", width: 90, align: 'center', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSSProdPicCell },
                                                               { display: mlm.C0734, name: "ProdName", width: 260, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSSProdNameCell },
                                                               { display: mlm.C1256, name: "", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSSProdPriceCell },
                                                               { display: mlm.C1257, name: "CMonthSaleCount", width: 60, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                               { display: mlm.C1258, name: "AllSaleCount", width: 60, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                               { display: mlm.C1259, name: "OnlineTimeStr", width: 75, align: 'center', adjust: true, adjust: true, createCell: bizcontrol.viewproduct.fn._constructOnlineTimeCell}]
                                                });
                }

                if (this.isloadssproduct) {
                    var m_ss_product = new sm.ss_product();
                    m_ss_product.Product_Id = this.viewProdDialog.product.Product_Id;
                    m_ss_product.querySSProductByInnerProd(function (retTable) {

                        m_thisObj.viewSSProdTable.bindDataSource(retTable);

                        m_thisObj.isloadssproduct = false;
                    });
                }
            }
        },

        /* 获取采购报价 */
        _getQuotedPrices: function (supplier_id, puraddress, skuproduct_id) {
            var m_thisobj = bizcontrol.viewproduct.fn.actionObj;
            var m_quoteditems = [];
            var m_suppQuotedDict = new datastruct.dictionary();
            var m_i = 1;
            $.each(m_thisobj.viewProdDialog.product.QuotedPriceTable, function () {

                if (Number(supplier_id) > 0) {
                    if (Number(supplier_id) != Number(this.Supplier_Id)) {
                        return;
                    }
                }
                else if (puraddress) {
                    if (puraddress != this.PurAddress) {
                        return;
                    }
                }
                else if (Number(skuproduct_id) > 0) {
                    if (Number(skuproduct_id) != Number(this.SkuProduct_Id)) {
                        return;
                    }
                }

                var m_key = "";
                if (Number(this.Supplier_Id) > 0) {
                    m_key = this.Supplier_Id.toString();
                }
                else {
                    m_key = this.PurAddress;
                }

                var m_suppQuotedObj = m_suppQuotedDict.getItem(m_key);
                if (!m_suppQuotedObj) {
                    m_suppQuotedObj = this;
                    m_suppQuotedObj.QuoteKey = m_i;
                    m_suppQuotedObj.MinQuotedPrice = this.QuotedPrice;
                    m_suppQuotedObj.MaxQuotedPrice = this.QuotedPrice;
                    m_suppQuotedObj.MinPeriod = this.Period;
                    m_suppQuotedObj.MaxPeriod = this.Period;
                    m_suppQuotedObj.Remark = this.Remark;
                    m_suppQuotedDict.setItem(m_key, m_suppQuotedObj);

                    m_quoteditems.push(m_suppQuotedObj);
                }
                else {
                    if (Number(this.QuotedPrice) < Number(m_suppQuotedObj.MinQuotedPrice)) {
                        m_suppQuotedObj.MinQuotedPrice = this.QuotedPrice;
                    }
                    else if (Number(this.QuotedPrice) > Number(m_suppQuotedObj.MaxQuotedPrice)) {
                        m_suppQuotedObj.MaxQuotedPrice = this.QuotedPrice;
                    }

                    if (Number(this.Period) < Number(m_suppQuotedObj.MinPeriod)) {
                        m_suppQuotedObj.MinPeriod = this.Period;
                    }
                    else if (Number(this.Period) > Number(m_suppQuotedObj.MaxPeriod)) {
                        m_suppQuotedObj.MaxPeriod = this.Period;
                    }

                    if (!m_suppQuotedObj.Remark) {
                        m_suppQuotedObj.Remark = this.Remark;
                    }
                    else {
                        m_suppQuotedObj.Remark = m_suppQuotedObj.Remark + ".....";
                    }
                }

                m_i++;
            });

            return m_quoteditems;
        },
        /* 获取采购报价条目 */
        _getQuotedPriceItem: function (supplier_id, puraddress, skuproduct_id) {
            var m_thisobj = bizcontrol.viewproduct.fn.actionObj;
            var m_quoteditems = [];
            var m_i = 1;
            $.each(m_thisobj.viewProdDialog.product.QuotedPriceTable, function () {

                if (Number(supplier_id) > 0) {
                    if (Number(supplier_id) != Number(this.Supplier_Id)) {
                        return;
                    }
                }
                else if (puraddress) {
                    if (puraddress != this.PurAddress) {
                        return;
                    }
                }
                else if (Number(skuproduct_id) > 0) {
                    if (Number(skuproduct_id) != Number(this.SkuProduct_Id)) {
                        return;
                    }
                }

                this.QuoteKey = m_i;
                m_quoteditems.push(this);

                m_i++;
            });

            return m_quoteditems;
        },

        /* 填充商品图片 */
        _fillProdPics: function (product) {
            var m_picObj = { smallPics: [], standardPics: [], bigPics: [] };

            var mainPic = {};
            $.each(product.ProdPics, function () {

                var m_src = "";
                if (this.PicUrl.indexOf("http://") == -1) {
                    m_src = window.webLocation;
                }

                m_picObj.smallPics.push({ src: m_src + this.BrowsePicUrl, width: this.BrowserPicWidth, height: this.BrowserPicHeight });
                m_picObj.standardPics.push({ src: m_src + this.PicUrl, width: this.PicWidth, height: this.PicHeight });
                m_picObj.bigPics.push({ src: m_src + this.SourcePicUrl });
            });

            this.picCtrl.bindSource(m_picObj, product.ProdName);
        },

        /*  */
        _constructSkuCostCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue);
            }
        },
        /* 构建销售区域及站内导航列 */
        _constructSaleSiteCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_css = "";
            if (!m_obj.State || m_obj.State == "1" || m_obj.State == "3") {
                m_css = "color: #747474";
            }

            var m_htmls = [];
            if (m_obj.SaleSiteName) {
                m_htmls.push("<div style='padding: 0px; " + m_css + "'>" + m_obj.SPfName + "-" + m_obj.SaleSiteName + "</div>");
            }
            else {
                m_htmls.push("<div style='padding: 0px; " + m_css + "'>" + m_obj.SPfName + "</div>");
            }

            return m_htmls.join("");
        },
        /* 构建Sku图片列 */
        _constructSkuProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /* 构建图片列 */
        _constructSSProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 80px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-sl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 80);' onerror='commoncore.func.failLoadImg.call(this, 80);' onclick='viewSSProduct.call(this, \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /* 构建商品列 */
        _constructSSProdNameCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            if (!cellValue) {
                return "<span style='color: #747474'>" + mlm.C0966 + "</span>";
            }
            else {
                var m_obj = this.keyObj;

                var m_css = "";
                if (!m_obj.State || m_obj.State == "1" || m_obj.State == "3") {
                    m_css = "style='color: #747474'";
                }

                var m_items = [];
                m_items.push("<div style='padding: 0px'><a " + m_css + " onclick='viewSSProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue.replace(/\^/g, "\"").replace(/\~/g, "\'") + "</a></div>");
                if (Number(m_obj.AvailableUnitCount) > 1) {
                    m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.AvailableUnitCount + mlm.C1066 + "</div>");
                }

                return m_items.join("");
            }
        },
        /* 构建商品价格列 */
        _constructSSProdPriceCell: function (key, cellValue) {
            var m_arr = [];
            if (this.keyObj.MaxSalePrice && Number(this.keyObj.MaxSalePrice) > 0) {
                if (Number(this.keyObj.MinSalePrice) == Number(this.keyObj.MaxSalePrice)) {
                    m_arr.push("<div style='padding: 0px'>" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinSalePrice) + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinSalePrice) + "-" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MaxSalePrice) + "</div>");
                }

                if (this.keyObj.MaxProfit) {
                    var m_maxprofit = Number(this.keyObj.MaxProfit);
                    if (m_maxprofit == -10000) {
                        m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>(" + mlm.C1145 + ")</div>");
                    }
                    else {
                        if (m_maxprofit != 0) {
                            if (Number(this.keyObj.MinProfit) == m_maxprofit) {
                                m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>(" + mlm.C1146 + ":" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinProfit) + ")</div>");
                            }
                            else {
                                m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>(" + mlm.C1146 + ":" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinProfit) + "-" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MaxProfit) + ")</div>");
                            }
                        }
                    }
                }
            }
            return m_arr.join("");
        },
        /* 构建商品价格列 */
        _constructOnlineTimeCell: function (key, cellValue) {
            if (this.keyObj.State == "2") {
                var date = new Date(cellValue);
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            }
        },

        /* 构建库存列 */
        _constructStockCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                return commoncore.func.constructQtyCell(key, cellValue);
            }
        },
        /* 构建安全库存列 */
        _constructSafetyStockCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_obj = this.keyObj;

                var m_safetystock = Number(cellValue);
                if (m_safetystock > 0) {
                    var m_css = "";
                    if (m_safetystock > Number(m_obj.TotalStock)) {
                        m_css = "color: #FF0000";
                    }
                    return "<div style='padding: 0px; " + m_css + "'>" + cellValue + "</div>";
                }
            }
        },
        /* 构建Sku实际采购价格列 */
        _constructSkuQuotedPriceCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_arr = [];

                if (this.keyObj.MaxQuotedPrice && Number(this.keyObj.MaxQuotedPrice) > 0) {
                    if (Number(this.keyObj.MinQuotedPrice) == Number(this.keyObj.MaxQuotedPrice)) {
                        m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinQuotedPrice) + "</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinQuotedPrice) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MaxQuotedPrice) + "</div>");
                    }
                }
                return m_arr.join("");
            }
        },
        /* 构建采购来源列 */
        _constructPurSourceCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_arr = [];

                var m_strlen = 43;
                if (this.keyObj.SuppName) {
                    m_arr.push("<a onclick='openViewSuppFrm.call(this, \"" + this.keyObj.Supplier_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SuppName + "</a>");
                    m_strlen = 41;
                }

                if (this.keyObj.PurAddress) {
                    if (this.keyObj.PurAddress.toLowerCase().indexOf("http") > -1) {

                        var m_address = this.keyObj.PurAddress;
                        var m_len = m_address.getBytesCount();
                        if (m_len > m_strlen) {
                            m_address = m_address.substringByBytes(m_strlen) + "...";
                        }

                        if (this.keyObj.GlobalAreaName) {
                            m_address += "-" + this.keyObj.GlobalAreaName;
                        }

                        if (this.keyObj.SuppName) {
                            m_arr.push(" <div style='padding: 0px'>(<a href='" + this.keyObj.PurAddress + "' target='_blank'>" + m_address + "</a>)<div>");
                        }
                        else {
                            m_arr.push("<a href='" + this.keyObj.PurAddress + "' target='_blank'>" + m_address + "</a>");
                        }
                    }
                    else {

                        if (this.keyObj.SuppName) {
                            if (this.keyObj.GlobalAreaName && this.keyObj.PurAddress.indexOf(this.keyObj.GlobalAreaName) == -1) {
                                m_arr.push(" (<span>" + this.keyObj.PurAddress + "-" + this.keyObj.GlobalAreaName + "</span>)");
                            }
                            else {
                                m_arr.push(" (<span>" + this.keyObj.PurAddress + "</span>)");
                            }
                        }
                        else {
                            if (this.keyObj.GlobalAreaName && this.keyObj.PurAddress.indexOf(this.keyObj.GlobalAreaName) == -1) {
                                m_arr.push("<span>" + this.keyObj.PurAddress + "-" + this.keyObj.GlobalAreaName + "</span>");
                            }
                            else {
                                m_arr.push("<span>" + this.keyObj.PurAddress + "</span>");
                            }
                        }
                    }
                }

                return m_arr.join("");
            }
        },
        /* 构建实际采购价格列 */
        _constructQuotedPriceCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_obj = this.keyObj;

                var m_title = m_obj.SuppName;
                if (!m_title) {
                    m_title = m_obj.PurAddress;
                }

                var m_remarkhtml = "";
                if (m_obj.Remark) {
                    m_remarkhtml = " id='lbQuotedRemark_v_" + key + "' style='color: #840000'; tag='" + m_obj.Remark + "'";
                }

                var m_htmls = [];
                if (m_obj.MinQuotedPrice) {
                    if (Number(m_obj.MinQuotedPrice) == Number(m_obj.MaxQuotedPrice)) {
                        m_htmls.push("<div style='padding: 0px'><a " + m_remarkhtml + " onclick='bizcontrol.viewproduct.fn._viewSkuQuotedItem.call(this, \"" + m_title + "\", \"" + m_obj.Supplier_Id + "\", \"" + m_obj.PurAddress + "\", 0)' href='javascript:void(\"0\");'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinQuotedPrice) + "</a></div>");
                    }
                    else {
                        m_htmls.push("<div style='padding: 0px'><a " + m_remarkhtml + " onclick='bizcontrol.viewproduct.fn._viewSkuQuotedItem.call(this, \"" + m_title + "\", \"" + m_obj.Supplier_Id + "\", \"" + m_obj.PurAddress + "\", 0)' href='javascript:void(\"0\");'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinQuotedPrice) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MaxQuotedPrice) + "</a></div>");
                    }
                }

                return m_htmls.join("");
            }
        },
        /* 构建Sku实际采购价格列 */
        _constructSkuItemQuotedPriceCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_obj = this.keyObj;

                var m_remarkhtml = "";
                if (m_obj.Remark) {
                    m_remarkhtml = " id='lbSkuQuotedRemark_v_" + key + "' style='color: #840000'; tag='" + m_obj.Remark + "'";
                }

                return "<span " + m_remarkhtml + ">" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.QuotedPrice) + "</span>";
            }
        },
        /* 构建采购周期列 */
        _constructQuotedPeriodCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_htmls = [];
            if (m_obj.MinPeriod) {
                if (Number(m_obj.MinPeriod) == Number(m_obj.MaxPeriod)) {
                    m_htmls.push("<div style='padding: 0px'>" + this.keyObj.MinPeriod + " " + mlm.C0800 + "</div>");
                }
                else {
                    m_htmls.push("<div style='padding: 0px'>" + this.keyObj.MinPeriod + " - " + this.keyObj.MaxPeriod + " " + mlm.C0800 + "</div>");
                }
            }

            return m_htmls.join("");
        },
        /* 构建Sku采购周期列 */
        _constructSkuItemQuotedPeriodCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            return "<span>" + this.keyObj.Period + " " + mlm.C0800 + "</span>";
        },
        /* 查看Sku报价 */
        _viewSkuQuotedItem: function (title, supplier_id, puraddress, skuproduct_id) {
            var m_obj = bizcontrol.viewproduct.fn.actionObj;
            if (!m_obj.viewSkuQuotedItemCtrl) {
                m_obj.viewSkuQuotedItemCtrl = uicontrol.dialog(m_obj.m_skuquotedctrl, "", { width: 900, position: ["auto", 25] });

                m_obj.m_quotedpriceTable = new uicontrol.tableList("quotedpriceTable_v",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 440,
                                         keyColumn: "QuoteKey",
                                         columns: [{ display: mlm.C0174, name: "SkuProps", width: 100, align: 'left' },
                                                   { display: mlm.C1069, name: "", width: 360, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructPurSourceCell },
                                                   { display: mlm.C1153, name: "", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuItemQuotedPriceCell },
                                                   { display: mlm.C1163, name: "", width: 60, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuItemQuotedPeriodCell}]
                                     });
            }

            var m_quoteditems = bizcontrol.viewproduct.fn._getQuotedPriceItem(supplier_id, puraddress, skuproduct_id);
            m_obj.m_quotedpriceTable.bindDataSource(m_quoteditems);

            $.each(m_quoteditems, function () {
                var m_itemCtrl = $("#lbSkuQuotedRemark_v_" + this.QuoteKey);
                m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            });

            m_obj.viewSkuQuotedItemCtrl.setTitle(title);
            m_obj.viewSkuQuotedItemCtrl.show();
        },
        /* 查看供应商 */
        _viewSuppFrm: function (key) {
            pageVariable.viewSupplierFrm.show(key);
        }
    };
    bizcontrol.viewproduct.fn.init.prototype = bizcontrol.viewproduct.fn;
    /*-------------------------------*/

})(window);