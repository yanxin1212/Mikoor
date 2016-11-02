(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----供应商查看控件----- 
    */
    bizcontrol.viewsupplier = function () {
        var obj = new bizcontrol.viewsupplier.fn.init();
        return obj;
    };
    bizcontrol.viewsupplier.fn = {

        actionObj: null,

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewSupplierFrm' style='display: none;'></div>");

            var m_tabs = $("<div id='viewSupplierTabs'></div>");
            m_tabs.append("<ul><li><a id='lkViewSuppInfo' href='#viewSupplierInfo'>" + mlm.C0781 + "</a></li><li><a href='#viewQuotedPrice'>" + mlm.M0054 + "</a></li></ul>");

            var m_suppContainer = $("<div id='viewSupplierInfo'></div>");
            var m_quotedpriceContainer = $("<div id='viewQuotedPrice'></div>");

            var m_tableContainer = $("<div class='submitForm form-width-a'></div>");

            var m_tr_1 = $("<div class='submitForm-tr first-item'></div>");
            var m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C1069 + ":</span>");
            /* 供应商 */
            this.m_suppNameCtrl = $("<span></span>");
            m_td_1.append(this.m_suppNameCtrl);
            m_tr_1.append(m_td_1);
            var m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C1165 + ":</span>");
            /* 所在国家 */
            this.m_countryCtrl = $("<span></span>");
            m_td_2.append(this.m_countryCtrl);
            m_tr_1.append(m_td_2);

            var m_tr_2 = $("<div class='submitForm-tr first-item'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0310 + ":</span>");
            /* 邮箱 */
            this.m_emailCtrl = $("<span></span>");
            m_td_1.append(this.m_emailCtrl);
            m_tr_2.append(m_td_1);
            m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C1166 + ":</span>");
            /* 公司网址 */
            this.m_webSiteCtrl = $("<span style='width: 320px; display: inline-block'></span>");
            m_td_2.append(this.m_webSiteCtrl);
            m_tr_2.append(m_td_2);

            var m_tr_3 = $("<div class='submitForm-tr first-item'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0311 + ":</span>");
            /* 联系电话 */
            this.m_telCtrl = $("<span></span>");
            m_td_1.append(this.m_telCtrl);
            m_tr_3.append(m_td_1);
            m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C1167 + ":</span>");
            /* 传真 */
            this.m_faxCtrl = $("<span></span>");
            m_td_2.append(this.m_faxCtrl);
            m_tr_3.append(m_td_2);

            var m_tr_4 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C1168 + ":</span>");
            /* 联系地址 */
            this.m_addressCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_addressCtrl);
            m_tr_4.append(m_td_1);

            var m_tr_5 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0073 + ":</span>");
            /* 备注 */
            this.m_remarkCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_remarkCtrl);
            m_tr_5.append(m_td_1);

            var m_linktr = $("<div class='submitForm-tr first-item last-item'></div>");
            m_linktr.append("<div style='height: 30px'><span class='lb-title list-title'>" + mlm.C1164 + mlm.C0463 + "</span></div>");
            this.m_linkerTable = $("<table id='viewSuppLinkerList'></table>");
            m_linktr.append(this.m_linkerTable);

            m_tableContainer.append(m_tr_1);
            m_tableContainer.append(m_tr_2);
            m_tableContainer.append(m_tr_3);
            m_tableContainer.append(m_tr_4);
            m_tableContainer.append(m_tr_5);
            m_tableContainer.append(m_linktr);

            m_suppContainer.append(m_tableContainer);
            m_tabs.append(m_suppContainer);

            var m_quotedpricetableCtrl = $("<div class='submitForm form-width-a'></div>");
            var m_quotedtr = $("<div class='submitForm-tr first-item last-item'></div>");
            m_quotedtr.append("<div style='height: 30px'><span class='lb-title list-title'>" + mlm.M0054 + mlm.C0463 + "</span></div>");
            var m_quotedTable = $("<table id='viewSuppQuotedList'></table>");
            m_quotedtr.append(m_quotedTable);
            m_quotedpricetableCtrl.append(m_quotedtr);
            m_quotedpriceContainer.append(m_quotedpricetableCtrl);

            m_tabs.append(m_quotedpriceContainer);
            this.ctrl.append(m_tabs);

            this.m_skuquotedctrl = $("<div id='viewSuppSkuQuotedFrm' style='display: none;'></div>");
            var m_skuquotedTable = $("<table id='viewSuppSkuQuotedList'></table>");
            this.m_skuquotedctrl.append(m_skuquotedTable);
            $(document).append(this.m_skuquotedctrl);
        },

        /* 展示配送服务 */
        show: function (supplier_id) {

            var thisObj = this;
            bizcontrol.viewsupplier.fn.actionObj = this;

            this.supplier_id = supplier_id;

            if (!this.viewSupplierFrm) {
                this.viewSupplierFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1069, { width: 925, position: ["auto", 5] });

                this.linkerList = new uicontrol.tableList("viewSuppLinkerList",
                                    { autoSeq: true,
                                        keyColumn: "SupplierLinker_Id",
                                        height: 50,
                                        columns: [{ display: mlm.C1164, name: "S_LinkerName", width: 100, align: 'left' },
                                                { display: mlm.C1169, name: "S_LTitle", width: 80, align: 'left' },
                                                { display: mlm.C0310, name: "S_LEmail", width: 180, align: 'left' },
                                                { display: mlm.C0311, name: "S_LTel", width: 100, align: 'left' },
                                                { display: mlm.C0073, name: "S_LRemark", width: 150, align: 'left', adjust: true, createCell: commoncore.func.constructRemarkCell}]
                                    });

                this.suppquotedList = new uicontrol.tableList("viewSuppQuotedList",
                                    { autoSeq: true,
                                        isPaging: true,
                                        keyColumn: "Product_Id",
                                        height: 300,
                                        pageQueryHandler: bizcontrol.viewsupplier.fn.queryPurchasePrice,
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructProdPicCell },
                                                { display: mlm.C0734, name: "ProdName", width: 270, align: 'left', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructProdNameCell },
                                                { display: mlm.C1064, name: "", width: 150, align: 'right', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructProdCostCell },
                                                { display: mlm.M0054, name: "", width: 150, align: 'right', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructQuoteInfoCell}]
                                    });

                this.supplierTabs = $("#viewSupplierTabs").tabs({ show: function (event, ui) {
                    if (ui.index == 1) {
                        thisObj.queryPurchasePrice(1, thisObj.suppquotedList.pageNumber);
                    }
                }
                });
            }

            $("#lkViewSuppInfo").trigger("click");

            var m_supplier = new pom.supplier();
            m_supplier.Supplier_Id = supplier_id;

            m_supplier.readSupplier(function (obj) {

                thisObj.supplier = obj;
                thisObj.m_suppNameCtrl.text(obj.SuppName);
                thisObj.m_countryCtrl.text(obj.OtherProps.GlobalAreaName);
                thisObj.m_emailCtrl.text(obj.S_Email);
                thisObj.m_webSiteCtrl.text(obj.S_WebSite);
                thisObj.m_telCtrl.text(obj.S_Tel);
                thisObj.m_faxCtrl.text(obj.S_Fax);
                thisObj.m_addressCtrl.text(obj.S_Address);
                thisObj.m_remarkCtrl.text(obj.S_Remark);

                thisObj.linkerList.bindDataSource(obj.Linkers);
                thisObj.suppquotedList.bindDataSource(null);

                thisObj.viewSupplierFrm.show();

            });
        },

        /*  */
        queryPurchasePrice: function (pageNum, pageCount) {
            var thisObj = bizcontrol.viewsupplier.fn.actionObj;

            var m_purchaseprice = new pom.purchaseprice();
            m_purchaseprice.Supplier_Id = thisObj.supplier_id;
            m_purchaseprice.Page = pageNum;
            m_purchaseprice.PageNum = pageCount;

            m_purchaseprice.queryQuotedProduct(function (source) {
                thisObj.suppquotedList.bindDataSource(source);
            });
        },
        /*  */
        _constructProdPicCell: function (key, cellValue) {
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

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 70);' onerror='commoncore.func.failLoadImg.call(this, 70);' onclick='viewProduct.call(this, \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /*  */
        _constructProdNameCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_css = "";
            if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
                m_css = "color: #840000"
            }

            var m_html_items = [];

            m_html_items.push("<div style='padding: 0px'><a style='" + m_css + "' onclick='viewProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a></div>");
            if (Number(m_obj.SkuProdCount) > 1) {
                m_html_items.push("<div style='margin: 2px 0px 0px 0px; padding: 0px; " + m_css + "' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.SkuProdCount + mlm.C1066 + "</div>");
            }

            return m_html_items.join("");
        },
        /*  */
        _constructProdCostCell: function (key, cellValue) {
            var m_arr = [];

            var m_css = "";
            if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
                m_css = "color: #840000"
            }

            if (this.keyObj.MaxCost && Number(this.keyObj.MaxCost) > 0) {
                if (Number(this.keyObj.MinCost) == Number(this.keyObj.MaxCost)) {
                    m_arr.push("<div style='padding: 0px; " + m_css + "'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinCost) + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px; " + m_css + "'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinCost) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MaxCost) + "</div>");
                }
            }
            return m_arr.join("");
        },
        /*  */
        _constructQuoteInfoCell: function (key, cellValue) {
            var m_css = "";
            if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
                m_css = "color: #840000"
            }

            var m_arr = [];
            if (this.keyObj.SuppQuoteds) {
                var m_rows = datastruct.convertion.strToObject(this.keyObj.SuppQuoteds);
                var i = 0;
                $.each(m_rows, function () {

                    var m_pricestr = "";
                    var m_minprice = this[3];
                    var m_maxprice = this[4];
                    if (m_maxprice && Number(m_maxprice) > 0) {
                        if (Number(m_minprice) == Number(m_maxprice)) {
                            m_arr.push("<a onclick='bizcontrol.viewsupplier.fn._viewSkuQuotedItem.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_minprice) + "</a>");
                        }
                        else {
                            m_arr.push("<a onclick='bizcontrol.viewsupplier.fn._viewSkuQuotedItem.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_minprice) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_maxprice) + "</a>");
                        }
                    }
                });
            }

            return m_arr.join("");
        },
        /* 查看Sku报价 */
        _viewSkuQuotedItem: function (product_id) {
            var m_obj = bizcontrol.viewsupplier.fn.actionObj;
            m_obj.product_id = product_id;

            if (!m_obj.viewSkuQuotedItemCtrl) {
                m_obj.viewSkuQuotedItemCtrl = uicontrol.dialog(m_obj.m_skuquotedctrl, "查看商品询价", { width: 900, position: ["auto", 25] });

                m_obj.viewSuppSkuQuotedList = new uicontrol.tableList("viewSuppSkuQuotedList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "SkuProduct_Id",
                                         height: 300,
                                         pageQueryHandler: bizcontrol.viewsupplier.fn.querySkuPurchasePrice,
                                         columns: [{ display: mlm.C0174, name: "SkuProps", width: 150, align: 'left' },
                                                   { display: mlm.C1153, name: "", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructSkuItemQuotedPriceCell },
                                                   { display: mlm.C1163, name: "", width: 100, align: 'right', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructSkuItemQuotedPeriodCell },
                                                   { display: mlm.C1152, name: "", width: 350, align: 'left', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructPurAddressCell}]
                                     });
            }

            m_obj.querySkuPurchasePrice(1, m_obj.viewSuppSkuQuotedList.pageNumber);

            m_obj.viewSkuQuotedItemCtrl.show();
        },
        /*  */
        _constructPurAddressCell: function (key, cellValue) {
            var m_arr = [];

            if (this.keyObj.PurAddress) {
                if (this.keyObj.PurAddress.toLowerCase().indexOf("http") > -1) {

                    var m_address = this.keyObj.PurAddress;
                    var m_len = m_address.getBytesCount();
                    if (m_len > 40) {
                        m_address = m_address.substringByBytes(40) + "...";
                    }

                    if (this.keyObj.GlobalAreaName) {
                        m_address += "-" + this.keyObj.GlobalAreaName;
                    }

                    m_arr.push("<a href='" + this.keyObj.PurAddress + "' target='_blank'>" + m_address + "</a>");
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

            return m_arr.join("");
        },
        /*  */
        querySkuPurchasePrice: function (pageNum, pageCount) {
            var m_obj = bizcontrol.viewsupplier.fn.actionObj;

            var m_purchaseprice = new pom.purchaseprice();
            m_purchaseprice.Supplier_Id = m_obj.supplier_id;
            m_purchaseprice.Product_Id = m_obj.product_id;
            m_purchaseprice.Page = pageNum;
            m_purchaseprice.PageNum = pageCount;

            m_purchaseprice.querySkuQuotedPrices(function (source) {
                var m_jsonobjs = datastruct.convertion.tableToJson(source);
                m_obj.viewSuppSkuQuotedList.bindDataSource(m_jsonobjs);

                $.each(m_jsonobjs, function () {
                    var m_itemCtrl = $("#lbSuppSkuQuotedRemark_v_" + this.QuoteKey);
                    m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
                });
            });
        },
        /* 构建Sku实际采购价格列 */
        _constructSkuItemQuotedPriceCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_remarkhtml = "";
            if (m_obj.Remark) {
                m_remarkhtml = " id='lbSuppSkuQuotedRemark_v_" + key + "' style='color: #840000'; tag='" + m_obj.Remark + "'";
            }

            return "<span " + m_remarkhtml + ">" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.QuotedPrice) + "</span>";
        },
        /* 构建Sku采购周期列 */
        _constructSkuItemQuotedPeriodCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            return "<span>" + this.keyObj.Period + " " + mlm.C0800 + "</span>";
        }
    };

    bizcontrol.viewsupplier.fn.init.prototype = bizcontrol.viewsupplier.fn;

})(window);