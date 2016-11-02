(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品查看控件----- 
    */
    bizcontrol.viewssproduct = function () {
        var obj = new bizcontrol.viewssproduct.fn.init();
        return obj;
    };
    bizcontrol.viewssproduct.fn = {

        _activedobj: null,

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewSSProdFrm' class='view-product' style='display: none;'></div>");

            if (!pageVariable.user) {
                pageVariable.user = userpopedom["user_" + m_usertoken];
            }
            if (pageVariable.user.SysUser_Id == "1" || pageVariable.user.RoleIds.indexOf("#1#") > -1 || pageVariable.user.RoleIds.indexOf("#8#") > -1) {
                pageVariable.user.isauthorise = true;
            }
            else {
                pageVariable.user.isauthorise = false;
            }

            var m_containerCtrl = $("<div></div>");
            this.viewTabsCtrl = $("<div style='height: 550px'>");

            /* Tab控件 */
            var m_ulTabCtrl = $("<ul class='prodTab'></ul>");
            m_ulTabCtrl.append("<li><a id='lkSSProdInfo_view' href='#ssprodInfo_view'>" + mlm.C0169 + "</a></li>");
            m_ulTabCtrl.append("<li><a href='#ss_detailInfo'>" + mlm.C0173 + "</a></li>");
            m_ulTabCtrl.append("<li><a href='#ss_skuList_view'>" + mlm.C1043 + "</a></li>");

            if (pageVariable.user.isauthorise) {
                m_ulTabCtrl.append("<li><a href='#expservice_view'>" + mlm.C0431 + "</a></li>");
                m_ulTabCtrl.append("<li><a href='#saleprice_view'>" + mlm.C1108 + "</a></li>");
                m_ulTabCtrl.append("<li><a href='#gift_view'>" + mlm.C1061 + "</a></li>");
                m_ulTabCtrl.append("<li><a href='#ss_profit_view'>" + mlm.C1045 + "</a></li>");
            }

            this.viewTabsCtrl.append(m_ulTabCtrl);

            var m_ssprodInfo_viewCtrl = $("<div id='ssprodInfo_view'></div>");

            /* 图片控件 */
            this.m_picCtrl = $("<div class='pic-container'></div>");
            m_ssprodInfo_viewCtrl.append(this.m_picCtrl);

            /* 详细清单 */
            this.m_detailContainerCtrl = $("<div class='detail-container'></div>");
            var m_tableCtrl = $("<div class='submitForm basicinfo' style='width: 640px; height: 500px; overflow: auto'></div>");

            var m_trProdNameCtrl = $("<div class='submitForm-tr first-item'><span></span></div>");
            m_trProdNameCtrl.append("<span class='title'>" + mlm.C0175 + ":</span>");
            /* 商品名称 */
            this.prodNameCtrl = $("<span style='width: 500px; display: inline-block'></span>");
            m_trProdNameCtrl.append(this.prodNameCtrl);
            m_tableCtrl.append(m_trProdNameCtrl);

            var m_trProdCodeCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trProdCodeCtrl.append("<span class='title'>" + mlm.C0194 + ":</span>");
            /* 商品编码 */
            this.prodcodeCtrl = $("<span></span>");
            m_trProdCodeCtrl.append(this.prodcodeCtrl);
            m_tableCtrl.append(m_trProdCodeCtrl);

            var m_trUnitCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trUnitCtrl.append("<span class='title'>" + mlm.C1048 + ":</span>");
            /* 单位 */
            this.unitCtrl = $("<span></span>");
            m_trUnitCtrl.append(this.unitCtrl);
            m_tableCtrl.append(m_trUnitCtrl);

            var m_trPdcCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trPdcCtrl.append("<span class='title'>" + mlm.C0090 + ":</span>");
            /* 商品分类 */
            this.pdcCtrl = $("<span style='width: 500px; display: inline-block'></span>");
            m_trPdcCtrl.append(this.pdcCtrl);
            m_tableCtrl.append(m_trPdcCtrl);

            var m_trBrandCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trBrandCtrl.append("<span class='title'>" + mlm.C0112 + ":</span>");
            /* 品牌 */
            this.brandCtrl = $("<span></span>");
            m_trBrandCtrl.append(this.brandCtrl);
            m_tableCtrl.append(m_trBrandCtrl);

            /* 商品属性 */
            this.propCtrl = $("<div></div>");
            m_tableCtrl.append(this.propCtrl);

            this.m_detailContainerCtrl.append(m_tableCtrl);
            m_ssprodInfo_viewCtrl.append(this.m_detailContainerCtrl);

            var m_proddescCtrl = $("<div id='ss_detailInfo' class='desc-container'></div>");
            var m_desctitleCtrl = $("<div style='margin: 0px 0px 0px 0px; height: 20px'></div>");
            m_desctitleCtrl.append("<span class='lb-title list-title'>" + mlm.C1147 + "</span>");
            var m_previewToolbarCtrl = $("<div style='float: right;'></div>");
            var m_previewCtrl = $("<input type='button' class='normal-bt' style='margin:0px 10px 0px 0px' value='" + mlm.C0271 + "' />");
            m_previewToolbarCtrl.append(m_previewCtrl);
            m_desctitleCtrl.append(m_previewToolbarCtrl);
            m_proddescCtrl.append(m_desctitleCtrl);
            /* 商品详情控件 */
            this.htmlDetailCtrl = $("<textarea class='ssproddesc-container'></textarea>");
            m_proddescCtrl.append(this.htmlDetailCtrl);
            var m_tagtitleCtrl = $("<div style='margin: 10px 0px 0px 0px; height: 20px'></div>");
            m_tagtitleCtrl.append("<span class='lb-title list-title'>" + mlm.C1640 + "</span>");
            m_proddescCtrl.append(m_tagtitleCtrl);
            /* 网站搜索关键字 */
            this.tagsCtrl = $("<div class='prodtags-container'></div>");
            m_proddescCtrl.append(this.tagsCtrl);

            /* Sku控件 */
            this.m_skuCtrl = $("<div id='ss_skuList_view' style='width: 1075px;'></div>");
            var m_skuTableCtrl = $("<table id='viewInnerProdTable'></table>");
            this.m_skuCtrl.append(m_skuTableCtrl);

            /* 销售信息 */
            this.m_salePriceCtrl = $("<div id='saleprice_view' style='width: 1075px;'></div>");
            var m_salePriceTableCtrl = $("<table id='salePriceTable'></table>");
            this.m_salePriceCtrl.append(m_salePriceTableCtrl);

            /* 配送服务 */
            this.m_expServiceCtrl = $("<div id='expservice_view' style='width: 1075px;'></div>");
            var m_areaCtrl = $("<div id='dvExpArea_view' class='expAreaTree_v'></div>");
            var m_expareatreeCtrl = $("<ul id='expAreaTree_view'></ul>");
            m_areaCtrl.append(m_expareatreeCtrl);
            this.m_expServiceCtrl.append(m_areaCtrl);

            var m_expserviceCtrl = $("<div id='dvExpService_view' class='expServiceList_v'></div>");
            var m_escontainer = $("<div style='height: 30px'></div>");
            m_escontainer.append("<span class='lb-title list-title'>" + mlm.C0436 + mlm.C0463 + "</span>");
            var m_btExportExpService = $("<input type='button' class='normal-bt' style='float: right;' value='" + mlm.C0987 + mlm.C1051 + "' />");
            m_escontainer.append(m_btExportExpService);
            m_expserviceCtrl.append(m_escontainer);

            this.expserviceList = $("<table id='expServiceList_view'></table>");
            m_expserviceCtrl.append(this.expserviceList);
            this.m_expServiceCtrl.append(m_expserviceCtrl);


            /* 赠品 */
            this.m_giftCtrl = $("<div id='gift_view' style='width: 1075px;'></div>");
            var m_giftTableCtrl = $("<div class='submitForm form-width-d'></div>");

            var m_giftfstTrCtrl = $("<div class='submitForm-tr first-item'></div>");
            var m_giftfstTrLCellCtrl = $("<span class='left-cell'></div>");
            m_giftfstTrLCellCtrl.append("<span class='title'>" + mlm.C0798 + ":</span>");
            /* 重量限制 */
            this.giftweightlimitCtrl = $("<span></span>");
            m_giftfstTrLCellCtrl.append(this.giftweightlimitCtrl);
            this.giftweightunitCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_giftfstTrLCellCtrl.append(this.giftweightunitCtrl);

            var m_giftfstTrRCellCtrl = $("<span></div>");
            m_giftfstTrRCellCtrl.append("<span class='title'>" + mlm.C1254 + ":</span>");
            /* 成本限制 */
            this.giftcostlimitCtrl = $("<span></span>");
            m_giftfstTrRCellCtrl.append(this.giftcostlimitCtrl);
            m_giftfstTrCtrl.append(m_giftfstTrLCellCtrl);
            m_giftfstTrCtrl.append(m_giftfstTrRCellCtrl);

            var m_giftlastTrCtrl = $("<div class='submitForm-tr last-item'></div>");
            m_giftlastTrCtrl.append($("<div style='height: 30px'><span class='lb-title list-title'>" + mlm.C1060 + "</span></div>"));
            this.giftTable = $("<table id='giftList_view'></table>");
            m_giftlastTrCtrl.append(this.giftTable);

            m_giftTableCtrl.append(m_giftfstTrCtrl);
            m_giftTableCtrl.append(m_giftlastTrCtrl);
            this.m_giftCtrl.append(m_giftTableCtrl);

            /* 商品利润 */
            this.m_profitCtrl = $("<div id='ss_profit_view' style='width: 1075px;'></div>");
            var m_apareaContainer = $("<div class='expAreaTree_v'></div>");
            var m_apareatreeCtrl = $("<ul id='apAreaTree_view'></ul>");
            m_apareaContainer.append(m_apareatreeCtrl);
            this.m_profitCtrl.append(m_apareaContainer);

            var m_profitContainer = $("<div class='expServiceList_v'></div>");
            var m_toolContainer = $("<div style='height: 25px; margin: 0px 0px 5px 0px'></div>");
            m_toolContainer.append(" <span class='lb-title list-title'>" + mlm.C1052 + mlm.C0463 + "</span>");
            m_profitContainer.append(m_toolContainer);
            this.profitList = $("<table id='prodProfitList_view'></table>");
            m_profitContainer.append(this.profitList);
            this.m_profitCtrl.append(m_profitContainer);

            this.viewTabsCtrl.append(m_ssprodInfo_viewCtrl);
            this.viewTabsCtrl.append(m_proddescCtrl);
            this.viewTabsCtrl.append(this.m_skuCtrl);

            if (pageVariable.user.isauthorise) {
                this.viewTabsCtrl.append(this.m_salePriceCtrl);
                this.viewTabsCtrl.append(this.m_expServiceCtrl);
                this.viewTabsCtrl.append(this.m_giftCtrl);
                this.viewTabsCtrl.append(this.m_profitCtrl);
            }

            m_containerCtrl.append(this.viewTabsCtrl);
            this.ctrl.append(m_containerCtrl);

            m_btExportExpService.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_previewCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btExportExpService.click(bizcontrol.viewssproduct.fn._exportExpServices);

            var m_this = this;
            m_previewCtrl.click(function () {
                var m_openfrm = window.open("_proddesc.htm", '', 'height=600, width=1180, top=60, left=30, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');
                m_openfrm.document.write(m_this.htmlDetailCtrl.text());
            });

            /* 商品属性缓存 */
            this.pdcProps = new datastruct.dictionary();
        },

        /* 展示商品信息 */
        show: function (product_id, ss_innerprod_id) {

            /* this指针 */
            var thisObj = this;
            bizcontrol.viewssproduct.fn._activedobj = this;

            if (!this.viewProdDialog) {
                this.viewProdDialog = new uicontrol.dialog(this.ctrl, mlm.C0197, { width: 1125, position: ["auto", 10] });
                this.picCtrl = new uicontrol.pictureSlip(this.m_picCtrl, { position: ["auto", 10] });

                this.viewTabsCtrl.tabs({ show: function (event, ui) { thisObj._showViewProdTab(event, ui); } });
            }

            thisObj.propCtrl.empty();

            var m_product = new sm.ss_product();
            m_product.SS_Product_Id = product_id;
            m_product.readSSProductWithMainPic(function (prodObj) {
                prodObj = $.extend(prodObj, prodObj.OtherProps);
                thisObj.viewProdDialog.product = prodObj;

                if (!saleplatform) {
                    saleplatform = {};
                    saleplatform.currObj = {};
                    saleplatform.currObj.CurrSymbol = thisObj.viewProdDialog.product.CurrSymbol;
                    saleplatform.currObj.WUnit = thisObj.viewProdDialog.product.WUnit;
                    saleplatform.currObj.CurrCode = thisObj.viewProdDialog.product.CurrCode;
                }

                thisObj.viewProdDialog.product.ExpDict = new datastruct.dictionary();
                $.each(thisObj.viewProdDialog.product.ExpServices, function () {
                    if (this.State == "1") {
                        var m_esarr = thisObj.viewProdDialog.product.ExpDict.getItem(this.GlobalArea_Id);
                        if (!m_esarr) {
                            m_esarr = [];
                            thisObj.viewProdDialog.product.ExpDict.setItem(this.GlobalArea_Id, m_esarr);
                        }
                        this.ExpressServiceName = this.OtherProps.ExpressServiceName;
                        this.ESType = this.OtherProps.ESType;
                        this.WarehouseName = this.OtherProps.WarehouseName;
                        m_esarr.push(this);
                    }
                });

                var m_selecteddict = new datastruct.dictionary();
                var m_selectedlictrls = [];
                if (ss_innerprod_id) {
                    $.each(prodObj.InnerProds, function () {
                        if (ss_innerprod_id == this.SS_InnerProd_Id) {
                            if (this.PropValues) {
                                var m_pvs = this.PropValues.split("_");
                                $.each(m_pvs, function () {
                                    m_selecteddict.setItem(this);
                                });
                            }
                        }
                    });
                }

                var m_expendProps = [];
                $.each(prodObj.PropTable, function () {
                    if (this.IsSku == "1") {
                        var m_propid = this.ProdProperty_Id;
                        var m_sku_tr = $("<div class='submitForm-tr'></div>");
                        m_sku_tr.append("<span class='title'>" + this.ProdPropName + ":</span>");

                        var m_txtCtrl = $("<span style='width: 500px; display: inline-block; margin : 0px 0px -5px 0px; padding: 0px'></span>");
                        var m_values = $("<ul id='ss_propul_" + m_propid + "'></ul>");
                        var m_pvalueids = this.ProdPValueIdRange.split(",");
                        var m_pvalues = this.ProdPValueRange.split(",");
                        var m_i = 0;
                        $.each(m_pvalueids, function () {

                            var m_liCtrl = $("<li class='color-pic' tag='" + m_propid + "' value='" + this + "'></li>");

                            if (m_selecteddict.containKey(this.toString())) {
                                m_selectedlictrls.push(m_liCtrl);
                            }

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
                                var m_proplis = $("#ss_propul_" + m_propid).find("li");

                                $.each(m_proplis, function () {
                                    $(this).css("border-color", "#ccc");
                                    $(this).attr("selected", null);
                                });

                                $(this).attr("selected", "true");
                                $(this).css("border-color", "#A60000");

                                var m_pvarr = new datastruct.dictionary();
                                $.each(prodObj.PropTable, function () {
                                    if (this.IsSku) {

                                        var m_selectedLis = $("#ss_propul_" + this.ProdProperty_Id).find("li");
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
                    m_tr.append("<span style='min-width: 100px; display: inline-block; color: #666666'>" + this.ProdPropName + ":</span>");
                    var m_txtCtrl = $("<span style='width: 300px; display: inline-block; padding: 0px 0px 0px 20px; '></span>");
                    m_txtCtrl.text(this.ProdPValueRange);

                    m_tr.append(m_txtCtrl);
                    thisObj.propCtrl.append(m_tr);
                });

                $.each(prodObj.Gifts, function () {
                    this.Weight = this.OtherProps.Weight;
                    this.Cost = this.OtherProps.Cost;
                });

                var m_statestr = "";
                if (prodObj.State == "1") {
                    m_statestr = " (" + mlm.C0399 + ")";
                }
                else if (prodObj.State == "3") {
                    m_statestr = " (" + mlm.C1025 + ")";
                }
                else if (prodObj.State == "4") {
                    m_statestr = " (修订中)";
                }
                thisObj.prodNameCtrl.text(prodObj.ProdName.replace(/\^/g, "\"").replace(/\~/g, "\'") + m_statestr);

                if (prodObj.OtherProps.BrandName) {
                    thisObj.brandCtrl.text(prodObj.OtherProps.BrandName);
                }
                else {
                    thisObj.brandCtrl.text("");
                }

                thisObj.pdcCtrl.text(prodObj.OtherProps.PdcName);
                thisObj.prodcodeCtrl.text(prodObj.ProdCode);
                thisObj.unitCtrl.text(prodObj.Unit);
                if (prodObj.Remark) {
                    thisObj.htmlDetailCtrl.val(prodObj.Remark.replace(/\^/g, "\"").replace(/\~/g, "\'"));
                }
                else {
                    thisObj.htmlDetailCtrl.val("");
                }
                thisObj.tagsCtrl.text(prodObj.Tags.replace(/\^/g, "\"").replace(/\~/g, "\'"));

                thisObj._fillProdPics(prodObj);

                var m_picdict = new datastruct.dictionary();
                $.each(prodObj.ProdPics, function () {
                    m_picdict.setItem(this.Product_Pic_Id, this);
                });

                $.each(prodObj.InnerProds, function () {
                    this.SkuProps = this.OtherProps.SkuProps;

                    if (this.Product_Pic_Id != "0") {
                        var m_pic = m_picdict.getItem(this.Product_Pic_Id);
                        this.BrowsePicUrl = m_pic.BrowsePicUrl;
                    }
                });

                thisObj.giftweightlimitCtrl.text(Number(prodObj.GiftWeightLimit).toFixed(3));
                thisObj.giftweightunitCtrl.text(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.WUnit);
                thisObj.giftcostlimitCtrl.html(commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, prodObj.GiftCostLimit));

                $.each(m_selectedlictrls, function () {
                    $(this).trigger("click");
                });
            });

            this.viewProdDialog.show();

            $("#lkSSProdInfo_view").trigger("click");

            this.isloadinnerprod = true;
            this.isloadexpservice = true;
            this.isloadsaleprice = true;
            this.isloadprofit = true;
            this.isloadgift = true;
            this.product_id = product_id;
            this.isloadRemark = false;
        },

        /* 查看商品Tab项 */
        _showViewProdTab: function (event, ui) {

            /* this指针 */
            var m_thisObj = this;

            /* 内部商品关系 */
            if (ui.index == 2) {

                if (!this.innerProdList) {

                    this.innerProdList = new uicontrol.tableList("viewInnerProdTable",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 440,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSkuProdPicCell },
                                                { display: mlm.C0174, name: "SkuProps", width: 100, align: 'left' },
                                                { display: mlm.C1205, name: "ProdCode", width: 100, align: 'left' },
                                                { display: mlm.C1251, name: "", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSBoxWV },
                                                { display: mlm.C1247, name: "PackageWeight", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSPackageWeight },
                                                { display: mlm.C1239, name: "CustomValue", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSCustomValue },
                                                { display: mlm.M0012, name: "", width: 300, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_SkuProdCell}]
                                    });
                }

                if (this.isloadinnerprod) {
                    this.innerProdList.bindDataSource(this.viewProdDialog.product.InnerProds);
                    this.isloadinnerprod = false;
                }
            }
            else if (ui.index == 1) {
                if (!m_thisObj.isloadRemark) {
                    m_thisObj.isloadRemark = true;

                    var m_ss_product = new sm.ss_product();
                    m_ss_product.SS_Product_Id = m_thisObj.product_id;
                    m_ss_product.readSSProductRemark(function (retObj) {
                        m_thisObj.htmlDetailCtrl.val(retObj.Remark.replace(/\^/g, "\"").replace(/\~/g, "\'"));
                    });
                }
            }
            /* 配送服务 */
            else if (ui.index == 3) {
                if (this.isloadexpservice) {
                    bizcontrol.viewssproduct.fn._loadExpAreaTree();
                    this.isloadexpservice = false;
                }
            }
            /* 销售信息 */
            else if (ui.index == 4) {

                if (!this.salePriceList) {

                    this.salePriceList = new uicontrol.tableList("salePriceTable",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 440,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0174, name: "SkuProps", width: 150, align: 'left' },
                                                { display: mlm.C1064, name: "PurchaseCost", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_PriceCell },
                                                { display: mlm.C1057, name: "OtherCost", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_PriceCell },
                                                { display: mlm.C1056, name: "TransCost", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_TranCostCell },
                                                { display: mlm.C0204, name: "ListPrice", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_PriceCell },
                                                { display: mlm.C1058, name: "Discount", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_DiscountCell },
                                                { display: mlm.C1059, name: "SalePrice", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_PriceCell}]
                                    });
                }

                if (this.isloadsaleprice) {
                    $.each(this.viewProdDialog.product.SalePrices, function () {
                        this.SkuProps = this.OtherProps.SkuProps;
                    });

                    this.salePriceList.bindDataSource(this.viewProdDialog.product.SalePrices);
                    this.isloadsaleprice = false;
                }
            }
            /* 赠品 */
            else if (ui.index == 5) {
                if (!this.giftList) {

                    this.giftList = new uicontrol.tableList("giftList_view",
                                            { isPaging: false,
                                                autoSeq: true,
                                                height: 360,
                                                keyColumn: "SS_Gift_Id",
                                                columns: [{ display: mlm.C1062, name: "GiftName", width: 200, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGiftNameCell },
                                                        { display: mlm.M0012, name: "", width: 450, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGiftItemCell },
                                                        { display: mlm.C1247, name: "Weight", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGiftWeightCell },
                                                        { display: mlm.M0017, name: "Cost", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGiftCostCell}]
                                            });
                }

                if (this.isloadgift) {
                    this.giftList.bindDataSource(this.viewProdDialog.product.Gifts);
                    this.isloadgift = false;
                }
            }
            /* 商品利润 */
            else if (ui.index == 6) {
                if (this.isloadprofit) {
                    bizcontrol.viewssproduct.fn._loadAPAreaTree();
                    this.isloadprofit = false;
                    if (this.prodProfitList) {
                        this.prodProfitList.bindDataSource(null);
                    }
                }
            }
        },

        /* 填充商品图片 */
        _fillProdPics: function (product) {
            var m_picObj = { smallPics: [], standardPics: [], bigPics: [] };

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

        /* 构建商品图片列 */
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
        /* 构建内部商品信息列 */
        _constructSS_SkuProdCell: function (key, cellValue) {

            if (this.authoriseUser) {
                if (!this.authoriseUser()) {
                    return;
                }
            }

            var m_obj = this.keyObj;

            if (m_obj.SkuProducts) {

                var m_strarr = [];
                var i = 0;
                $.each(m_obj.SkuProducts, function () {

                    var m_style = "style='padding: 0px;";
                    if (i > 0) {
                        m_style += "margin: 5px 0px 0px 0px";
                    }
                    m_style += "'";

                    var m_innerprod = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName;
                    if (this.OtherProps.SkuProps) {
                        m_innerprod += " - " + "[" + this.OtherProps.SkuProps + "]"
                    }

                    if (this.RelQty == "1") {
                        m_strarr.push("<div " + m_style + "><a onclick='viewProduct.call(this, \"" + this.OtherProps.Product_Id + "\", \"" + this.OtherProps.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + m_innerprod + "</a></div>");
                    }
                    else {
                        m_strarr.push("<div " + m_style + ">(" + this.RelQty + " " + this.OtherProps.Unit + ") <a onclick='viewProduct.call(this, \"" + this.OtherProps.Product_Id + "\", \"" + this.OtherProps.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + m_innerprod + "</a></div>");
                    }
                    i++;
                });
                return m_strarr.join("");
            }
            else {
                return "";
            }
        },
        /* 构建包装盒重量&体积列 */
        _constructSSBoxWV: function (key, cellValue) {
            var m_arr = [];

            m_arr.push("<div style='padding: 0px'>" + Number(this.keyObj.BoxWeight).toFixed(3) + " " + bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.WUnit + "</div>");
            m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px'>" + this.keyObj.BoxLength + "*" + this.keyObj.BoxWidth + "*" + this.keyObj.BoxHeight + " cm³</div>");

            return m_arr.join("");
        },
        /* 构建商品重量 */
        _constructSSPackageWeight: function (key, cellvalue) {
            return Number(cellvalue).toFixed(3) + " " + bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.WUnit;
        },
        /* 构建报关价值 */
        _constructSSCustomValue: function (key, cellvalue) {
            return commoncore.func.getCurrHtml("$", cellvalue);
        },
        /* 构建标准售价列 */
        _constructSS_PriceCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellValue);
        },
        /*  */
        _constructSS_TranCostCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, Number(cellValue) * Number(this.keyObj.SalePrice));
        },
        /* 构建折扣率列 */
        _constructSS_DiscountCell: function (key, cellValue) {
            return Number(cellValue) * 100 + "%";
        },
        /* 构建赠品名称列 */
        _constructGiftNameCell: function (key, cellvalue) {
            var m_obj = this.keyObj;

            var m_fontstyle = "";
            if (Number(m_obj.Weight) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftWeightLimit) ||
                    Number(m_obj.Cost) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftCostLimit)) {
                m_fontstyle = "color: red;"
            }

            return "<span style='" + m_fontstyle + "'>" + cellvalue + "<span>";
        },
        /* 构建赠品重量列 */
        _constructGiftWeightCell: function (key, cellvalue) {
            var m_obj = this.keyObj;

            var m_fontstyle = "";
            if (Number(m_obj.Weight) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftWeightLimit) ||
                    Number(m_obj.Cost) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftCostLimit)) {
                m_fontstyle = "color: red;"
            }

            return "<span style='" + m_fontstyle + "'>" + Number(cellvalue).toFixed(2) + " " + bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.WUnit + "<span>";
        },
        /* 构建赠品成本列 */
        _constructGiftCostCell: function (key, cellvalue) {
            var m_obj = this.keyObj;

            var m_fontstyle = "";
            if (Number(m_obj.Weight) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftWeightLimit) ||
                    Number(m_obj.Cost) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftCostLimit)) {
                m_fontstyle = "color: red;"
            }

            return "<span style='" + m_fontstyle + "'>" + commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.CurrSymbol, cellvalue) + "<span>";
        },
        /* 构建赠品列 */
        _constructGiftItemCell: function (key, cellvalue) {
            var m_strs = [];
            var m_obj = this.keyObj;

            var m_fontstyle = "";
            if (Number(m_obj.Weight) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftWeightLimit) ||
                    Number(m_obj.Cost) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftCostLimit)) {
                m_fontstyle = "color: red;"
            }

            var i = 0;
            $.each(m_obj.Items, function () {

                var m_style = "style='padding: 0px;";
                if (i > 0) {
                    m_style += "margin: 5px 0px 0px 0px;";
                }
                m_style += "'";

                if (Number(this.Qty) > 1) {
                    m_strs.push("<div " + m_style + "><a style='" + m_fontstyle + "' onclick='viewProduct.call(this, \"" + this.OtherProps.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName + " [" + this.Qty + this.OtherProps.Unit + "]</a></div>");
                }
                else {
                    m_strs.push("<div " + m_style + "><a style='" + m_fontstyle + "' onclick='viewProduct.call(this, \"" + this.OtherProps.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName + "</a></div>");
                }
                i++;
            });

            return m_strs.join("");
        },
        /* 加载区域列表 */
        _loadExpAreaTree: function () {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            if (!m_actionobj.expAreaTree || !m_actionobj.expAreaTree.ss_product_id || m_actionobj.expAreaTree.ss_product_id != m_actionobj.viewProdDialog.product.SS_Product_Id) {

                /* 显示进度 */
                pageframe.control.processCtrl.showOperaProcess();

                var m_this = this;
                var globalarea = new othm.globalarea();
                globalarea.SaleSite_Id = m_actionobj.viewProdDialog.product.SaleSite_Id;
                globalarea.queryGlobalAreaBySaleSite(function (source) {

                    m_actionobj.expAreaTree = new uicontrol.treeView($("#expAreaTree_view"), source, bizcontrol.viewssproduct.fn._loadExpService,
                                                                { sourceFormat: "table",
                                                                    keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                                    constructDisplayTxt: bizcontrol.viewssproduct.fn._constructGAreaTxt, isCollapse: true
                                                                });
                    m_actionobj.expAreaTree.loadSource();
                    m_actionobj.expAreaTree.ss_product_id = m_actionobj.viewProdDialog.product.SS_Product_Id;

                    bizcontrol.viewssproduct.fn._loadExpService();

                    pageframe.control.processCtrl.hideOperaProcess();
                });
            }
        },
        /* 构建区域显示 */
        _constructGAreaTxt: function (objitem) {
            var m_len = 0;
            var m_expobjs = bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.ExpDict.getItem(objitem.tag.GlobalArea_Id);
            if (m_expobjs) {
                $.each(m_expobjs, function () {
                    if (this.State == "1") {
                        m_len++;
                    }
                });
            }
            if (m_len > 0) {
                return "<span>" + objitem.tag.GlobalAreaName + "(" + m_len + ")" + "</span>";
            }
            else {
                return "<span class='lb-symbol'>" + objitem.tag.GlobalAreaName + "</span>";
            }
        },
        /* 加载配送服务 */
        _loadExpService: function () {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            if (!m_actionobj.expServiceList) {
                m_actionobj.expServiceList = new uicontrol.tableList("expServiceList_view",
                                             { autoSeq: true,
                                                 keyColumn: "ExpressService_Id",
                                                 height: 407,
                                                 columns: [{ display: mlm.C0436, name: "ExpressServiceName", width: 280, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructESName },
                                                           { display: mlm.C0291, name: "GlobalAreaName", width: 100, align: 'left' },
                                                           { display: mlm.C0786, name: "ESType", width: 85, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructESTypeCell },
                                                           { display: mlm.C1020, name: "FstCharge", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSExpChargeCell },
                                                           { display: mlm.C1021, name: "IncreaseCharge", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSExpChargeCell}]
                                             });
            }

            if (m_actionobj.expAreaTree.selectedItem) {
                var m_globalareaid = m_actionobj.expAreaTree.selectedItem.key;
                var m_globalservices = m_actionobj.viewProdDialog.product.ExpDict.getItem(m_globalareaid);
                if (m_globalservices) {
                    $.each(m_globalservices, function () {
                        this.GlobalAreaName = m_actionobj.expAreaTree.selectedItem.tag.GlobalAreaName;
                    });
                }
                m_actionobj.expServiceList.bindDataSource(m_globalservices);
            }
        },
        /* 构建配送服务列 */
        _constructESName: function (key, cellValue) {
            var m_arr = [];

            var m_obj = this.keyObj;
            m_arr.push("<a onclick='openViewExpressServiceFrm.call(this, \"" + m_obj.ExpressService_Id + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>");

            if (m_obj.WarehouseName) {
                m_arr.push("<div class='lb-symbol'>(" + m_obj.WarehouseName + ")</div>");
            }

            return m_arr.join("");
        },
        /* 构建计费模式列 */
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
        /* 构建运费列 */
        _constructSSExpChargeCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            if (m_obj.ESType == "2") {
                return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellValue);
            }
        },
        /* 加载利润区域列表 */
        _loadAPAreaTree: function () {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            if (!m_actionobj.apAreaTree || !m_actionobj.apAreaTree.ss_product_id || m_actionobj.apAreaTree.ss_product_id != m_actionobj.viewProdDialog.product.SS_Product_Id) {

                /* 显示进度 */
                pageframe.control.processCtrl.showOperaProcess();

                var m_this = this;
                var globalarea = new othm.globalarea();
                globalarea.SaleSite_Id = m_actionobj.viewProdDialog.product.SaleSite_Id;
                globalarea.queryGlobalAreaBySaleSite(function (source) {

                    m_actionobj.apAreaTree = new uicontrol.treeView($("#apAreaTree_view"), source, bizcontrol.viewssproduct.fn._loadProdfit,
                                                                { sourceFormat: "table",
                                                                    keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                                    constructDisplayTxt: bizcontrol.viewssproduct.fn._constructGAreaTxt, isCollapse: true
                                                                });
                    m_actionobj.apAreaTree.loadSource();
                    m_actionobj.apAreaTree.ss_product_id = m_actionobj.viewProdDialog.product.SS_Product_Id;

                    bizcontrol.viewssproduct.fn._loadProdfit();
                });
            }
            else {
                bizcontrol.viewssproduct.fn._loadProdfit();
            }
        },
        /* 加载利润 */
        _loadProdfit: function () {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            if (!m_actionobj.prodProfitList) {
                m_actionobj.prodProfitList = new uicontrol.tableList("prodProfitList_view",
                                             { isPaging: true,
                                                 autoSeq: true,
                                                 keyColumn: "SS_ProdProfit_V_Id",
                                                 height: 405,
                                                 pageQueryHandler: bizcontrol.viewssproduct.fn._queryProdfit,
                                                 columns: [{ display: mlm.C1141, name: "GlobalAreaNames", width: 160, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGlobalAreaCell },
                                                           { display: mlm.C0174, name: "SkuProps", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructProfitSkuCell },
                                                           { display: mlm.C0436, name: "ExpressServiceName", width: 170, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructESName },
                                                           { display: mlm.C1102, name: "FstProdProfit", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructProfitCell },
                                                           { display: mlm.C1103, name: "SecondProdProfit", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructOtherProfitCell },
                                                           { display: mlm.C1104, name: "ThirdProdProfit", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructOtherProfitCell}]
                                             });
            }

            bizcontrol.viewssproduct.fn._queryProdfit(1, m_actionobj.prodProfitList.pageNumber);
        },
        /* 查询利润 */
        _queryProdfit: function (pageNum, pageCount) {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            var m_globalarea_id = null;
            if (m_actionobj.apAreaTree.selectedItem) {
                m_globalarea_id = m_actionobj.apAreaTree.selectedItem.key;
            }

            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            var m_ss_product = new sm.ss_product();
            m_ss_product.Page = pageNum;
            m_ss_product.PageNum = pageCount;
            m_ss_product.SS_Product_Id = m_actionobj.viewProdDialog.product.SS_Product_Id;
            m_ss_product.GlobalArea_Id = m_globalarea_id;
            m_ss_product.SaleSite_Id = m_actionobj.viewProdDialog.product.SaleSite_Id;
            m_ss_product.queryProdProfit(function (retTable) {
                m_actionobj.prodProfitList.bindDataSource(retTable);

                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                $.each(m_jsonobjs, function () {
                    var m_itemCtrl = $("#lbPf_GA_V_" + this.SS_ProdProfit_V_Id + ", #lbPfSku_V_" + this.SS_ProdProfit_V_Id);
                    m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
                });

                /* 隐藏进度 */
                pageframe.control.processCtrl.hideOperaProcess();
            });
        },
        /* 构建区域列 */
        _constructGlobalAreaCell: function (key, cellvalue) {
            var m_len = cellvalue.getBytesCount();
            if (m_len > 30) {
                var m_str = cellvalue.substringByBytes(30) + "...";
                return "<span id='lbPf_GA_V_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
            }
            else {
                return cellvalue;
            }
        },
        /* 构建利润Sku列 */
        _constructProfitSkuCell: function (key, cellvalue) {
            var m_len = cellvalue.getBytesCount();
            if (m_len > 30) {
                var m_str = cellvalue.substringByBytes(30) + "...";
                return "<span id='lbPfSku_V_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
            }
            else {
                return cellvalue;
            }
        },
        /* 构建利润列 */
        _constructProfitCell: function (key, cellValue) {
            if (Number(cellValue) == -20000) {
                return "<div style='padding: 0px; margin: 0px' class='lb-symbol'>" + mlm.C1008 + "</div>";
            }
            else {
                return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellValue);
            }
        },
        /* 构建利润列 */
        _constructOtherProfitCell: function (key, cellvalue) {
            if (Number(cellvalue) == -20000) {
                return "<div style='padding: 0px; margin: 0px' class='lb-symbol'>" + mlm.C1008 + "</div>";
            }
            else {
                if (Number(cellvalue) != 0) {

                    var m_items = [];
                    m_items.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellvalue) + "</div>");

                    if (Number(this.keyObj.FstProdProfit) > 0) {
                        var m_rate = ((Number(cellvalue) - Number(this.keyObj.FstProdProfit)) / Number(this.keyObj.FstProdProfit) * 100).toFixed(2);
                        m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1260 + ": " + m_rate + "%</div>");
                    }

                    return m_items.join("");
                }
                else {
                    return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellvalue);
                }
            }
        },
        /* 导出配送价格 */
        _exportExpServices: function () {
            var m_product = bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product;

            var m_mv = {};
            m_mv.Weight = Number(m_product.GiftWeightLimit);
            m_mv.Volumn = 0;
            m_mv.BoxLength = 0;
            m_mv.BoxWidth = 0;
            m_mv.BoxHeight = 0;

            var m_maxinnerweight = 0;
            $.each(m_product.InnerProds, function () {
                if (this.SkuProducts) {
                    var m_itemweight = Number(this.BoxWeight);
                    $.each(this.SkuProducts, function () {
                        m_itemweight += Number(this.Product.Weight) * Number(this.RelQty);
                    });

                    if (m_maxinnerweight == 0 || m_itemweight > m_maxinnerweight) {
                        m_maxinnerweight = m_itemweight;
                    }

                    var m_itemvolumn = Number(this.BoxLength) * Number(this.BoxWidth) * Number(this.BoxHeight);
                    if (m_mv.Volumn == 0 || m_itemvolumn > m_mv.Volumn) {
                        m_mv.Volumn = m_itemvolumn;
                        m_mv.BoxLength = this.BoxLength;
                        m_mv.BoxWidth = this.BoxWidth;
                        m_mv.BoxHeight = this.BoxHeight;
                    }
                }
            });

            m_mv.Weight = m_mv.Weight + m_maxinnerweight;

            var m_ss_product = new sm.ss_product();
            m_ss_product.SaleSite_Id = m_product.SaleSite_Id;
            m_ss_product.SysWeightUnit_id = m_product.SysWeightUnit_Id;
            m_ss_product.SysCurrency_id = m_product.SysCurrency_Id;
            m_ss_product.Weight = m_mv.Weight;
            m_ss_product.Volumn = (Number(m_mv.BoxLength) * Number(m_mv.BoxWidth) * Number(m_mv.BoxHeight)).toString();
            m_ss_product.Tax = "0";
            m_ss_product.ExpServices = m_product.ExpServices;
            m_ss_product.exportProductExpServices(function (paramObj) {
                window.open(paramObj);
            });
        }
    };
    bizcontrol.viewssproduct.fn.init.prototype = bizcontrol.viewssproduct.fn;
    /*-------------------------------*/

})(window);