
/* 设置初始化绑定事件（处于多语言考虑） */
mlm.bindLanguageEvent.push(loadSalePlatform);

/* 页面变量 */
window.pageVariable = {
    /* 商品分类-属性 */
    pdcProps: new datastruct.dictionary(),

    /* 关键属性控件列表 */
    queryPropValues: new datastruct.dictionary()
};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    //SMT授权指令
    window.security.authoriseSMT();

    $("#salePdcNavTag").click(initSalePdcNavProp);
    $("#btNewSalePdcNav").click(openNewSalePdcNavFrm);
    $("#btModifySalePdcNav").click(openModifySalePdcNavFrm);
    $("#btDeleteSalePdcNav").click(openDeleteSalePdcNavFrm);
    $("#btMoveup").click(moveupPdcNav);
    $("#btMovedown").click(movedownPdcNav);
    $("#btAddPdcProp").click(openNewPdcProp);
    $("#btQueryProd").click(openQueryProdFrm);
    $("#btNewProd").click(openNewSSProdFrm);
    $("#btUploadSSPic").click(openUploadPicFrm);
    $("#btClearSSPic").click(openDelUploadPicFrm);
    $("#btExportProdSeq").click(exportProductSeq); 
    $("#btImportProdSeq").click(openImportProdSeqFrm);
    $("#btRefreshProfit").click(refreshProfit);
    $("#btSyncSSProd").click(syncSSProducts);
    $("#btdownloadSMTProd").click(downloadSMTProd); 
    $("#btPublishSMTProd").click(openPublishSMTFrm);
    $("#btCheckSMTProd").click(checkSMTProd);
    $("#btCheckSMTKeyword").click(openImportCheckSMTKeywordFrm);

    $("#btExportProduct").click(exportProduct); 
    $("#btImportProduct").click(openImportProductFrm);
    $("#btImportProductByPic").click(importProductByPic);
    $("#btGenerateProdRemark").click(generateProdRemark);

    $("#btQueryProd, #btNewProd, #btOpereNav, #btAddPdcProp, #btClearSSPic, #btUploadSSPic, #btAddSSProp, #btViewSS_RemarkPic, #btBatchSetSalePrice, #btImportExpPrice, #btExportExpPrice, #btAddGiftItem, #btAddGift, #btSetSSProdBox, #btAddGbom, #btManageProdSeq, #btRefreshProfit, #btBatchModifyProd, #btSyncSSProd, #btdownloadSMTProd, #btCheckSMTProd, #btPublishSMTProd").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

    pageframe.control.multiButtion.init("btOpereNav", "dvNavOperes");
    pageframe.control.multiButtion.init("btManageProdSeq", "dvMProdSeq");
    pageframe.control.multiButtion.init("btBatchModifyProd", "dvBatchModifyProd");

    pageVariable.pdc_smtpropertyDict = new datastruct.dictionary();
    pageVariable.maxPvGuid = 1000000;
}
/* 用户权限控制 */
function authoriseUser() {
    if (!pageVariable.user) {
        pageVariable.user = userpopedom["user_" + m_usertoken];

        if (pageVariable.user.SysUser_Id == "1" || pageVariable.user.RoleIds.indexOf("#1#") > -1 || pageVariable.user.RoleIds.indexOf("#8#") > -1) {
            pageVariable.user.isauthorise = true;
        }
        else {
            pageVariable.user.isauthorise = false;
        }

        if (pageVariable.user.SysUser_Id == "1" || pageVariable.user.RoleIds.indexOf("#1#") > -1) {
            pageVariable.user.isadmin = true;
        }
        else {
            pageVariable.user.isadmin = false;
        }
    }

    return pageVariable.user.isauthorise;
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getContentHeight();
    $("#pdcTreeFrm, #productFrm, #salePdcNavTreeFrm, #salePdcNavFrm, #smtgroupFrm").css("height", mainFormHeight + 16);

    var m_width = $("#pdcTreeFrm")[0].offsetWidth;
    if (!m_width) {
        m_width = $("#salePdcNavTreeFrm")[0].offsetWidth;
    }
    m_width = m_width + 32;
    $("#productFrm, #salePdcNavFrm").css("width", pageframe.layout.width - m_width);

    if (pageVariable.productList) {
        var productFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.productList.resize(productFormHeight);
    }

    if (pageVariable.salePdcNavPropList) {
        pageVariable.salePdcNavPropList.resize(pageframe.layout.getTableHeightInForm() - 3);
    }
}

/* 加载销售平台 */
function loadSalePlatform() {

    pageVariable.viewExpServiceFrm = new bizcontrol.viewexpressservice();

    window.saleplatform.loadSaleSites(function () {

        /* 对销售平台为空的处理 */
        window.saleplatform.checkSalePlatform();

        initProductList();
        $("#lbPdcName").text("");

        if (pageVariable.salePdcNavPropList) {
            pageVariable.salePdcNavPropList.bindDataSource(null);
        }

        if (pageVariable.selQueryPdc) {
            pageVariable.selQueryPdc.pdcSource = null;
            pageVariable.selQueryPdc.shoppingSiteId = saleplatform.currSalePlatformId;
            pageVariable.selQueryPdc.salesite_id = saleplatform.currSaleSite_Id;
        }

        if (pageVariable.productList) {
            pageVariable.productList.bindDataSource(null);
        }

        $("#dvssprodNav").hide();

        if (!authoriseUser()) {
            $("#btNewProd, #btManageProdSeq, #salePdcNavTag, #btSyncSSProd, #btImportProductByPic, #btdownloadSMTProd, #btGenerateProdRemark, #btCheckSMTProd, #btPublishSMTProd, #btRefreshProfit, #btBatchModifyProd").hide();
            $("#salePdcNavTag, #smtgroupTag").hide();
            $("#dvssprodNav").show();
        }
        else {
            $("#salePdcNavTag, #smtgroupTag").show();
        }

        /* Mikoor官方站点 */
        if (saleplatform.currSalePlatformId == 8) {
            $("#btSyncSSProd").show();
            $("#btImportProductByPic, #btdownloadSMTProd, #btGenerateProdRemark, #btCheckSMTProd, #btPublishSMTProd").hide();
            $("#smtgroupTag, #dvSMTCategory_1").hide();

            //加载产品分类
            loadPdcs();
        }
        else {
            $("#btSyncSSProd").hide();

            //速卖通站点
            if (saleplatform.currSaleSite_Id == 11 || saleplatform.currSaleSite_Id == 23) {

                if (authoriseUser()) {
                    $("#btImportProductByPic").show();
                }
                else {
                    $("#btImportProductByPic").hide();
                }

                if (pageVariable.user.isadmin) {

                    $("#btImportProductByPic, #btdownloadSMTProd, #btGenerateProdRemark, #btCheckSMTProd, #btPublishSMTProd").show();
                    $("#smtgroupTag, #dvSMTCategory_1").show();
                    $("#dvSalePdcNav").hide();

                    pageframe.control.processCtrl.showOperaProcess();

                    var ss_product = new sm.ss_product();
                    ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
                    ss_product.SalePlatform_Id = saleplatform.currSalePlatformId;
                    ss_product.getSMTGroupAndProperty(function (source) {

                        pageVariable.smtgroupSource = new datastruct.dictionary();
                        pageVariable.smtpropertySource = {};
                        pageVariable.smtproperty = null;
                        pageVariable.pdcpropertySource = {};
                        pageVariable.smterrorpvalues = new datastruct.dictionary();
                        pageVariable.smtpvaluesDict = new datastruct.dictionary();
                        pageVariable.pvalueSource = source.PropValue;
                        pageVariable.pvalueDict = new datastruct.dictionary();
                        pageVariable.errorpropDict = new datastruct.dictionary();

                        $.each(source.SMTGroup, function () {
                            pageVariable.smtgroupSource.setItem(this.Key, null);
                        });

                        if (source.Property) {
                            pageVariable.pdcpropertySource = source.Property;
                        }

                        $.each(pageVariable.pvalueSource, function () {
                            $.each(this, function () {
                                pageVariable.pvalueDict.setItem(this.ProdProperty_Id + "-" + this.PValue, this);
                            });
                        });

                        pageVariable.smtpropertySource = source.SMTProperty;

                        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
                        pageVariable.smtgroupList = new uicontrol.tableList("smtgroupList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: mainFormHeight,
                                        keyColumn: "Key",
                                        columns: [{ display: "分组Id", name: "GroupId", width: 200, align: 'left' },
                                                   { display: "分组名称", name: "GroupName", width: 600, align: 'left'}]
                                    });

                        pageVariable.smtgroupList.bindDataSource(source.SMTGroup);

                        loadPdcs(function () {

                            refreshSMTGroupState();

                            $.each(source.ProdCategory, function () {
                                if (this.SMT_ProdCategory_Id) {
                                    checkSMTProperty(this.ProdCategory_Id, this.PdcName);
                                }
                            });

                            pageframe.control.processCtrl.hideOperaProcess();
                        });
                    }, function (err) {
                        if (err.Message && err.Message.indexOf("http://gw.api.alibaba.com") > -1) {
                            window.location = err.Message;
                        }
                        else {

                            pageframe.control.processCtrl.hideOperaProcess();

                            webhandler.ajaxHandler._errorEvent(err);
                        }
                    });
                }
                else {
                    $("#btdownloadSMTProd, #btGenerateProdRemark, #btCheckSMTProd, #btPublishSMTProd").hide();
                    $("#smtgroupTag, #dvSMTCategory_1").hide();
                    $("#dvSalePdcNav").show();

                    //加载产品分类
                    loadPdcs();
                }
            }
            else {
                $("#btImportProductByPic").hide();

                $("#btdownloadSMTProd, #btGenerateProdRemark, #btCheckSMTProd, #btPublishSMTProd").hide();
                $("#smtgroupTag, #dvSMTCategory_1").hide();

                //加载产品分类
                loadPdcs();
            }
        }
    });
}
/*  */
function refreshSMTGroupState() {
    if (saleplatform.currSaleSite_Id == 11 || saleplatform.currSaleSite_Id == 23) {
        var m_tempdcDict = new datastruct.dictionary();
        var m_pdcSource = pageVariable.salePdcNavTree._sourceObj;

        $.each(m_pdcSource, function () {

            if (!this.tag.SMT_ProdCategory_Id) {
                $("#pdcTree_sp_" + this.key).find("span").css("color", "red");
                $("#salePdcNavTree_sp_" + this.key).find("span").css("color", "red");
            }

            $.each(this.children, function () {
                var m_pgroupkey = this.tag.SMT_Group_Id;
                if (!pageVariable.smtgroupSource.containKey(m_pgroupkey) || !this.tag.SMT_ProdCategory_Id) {
                    $("#pdcTree_sp_" + this.key).find("span").css("color", "red");
                    $("#salePdcNavTree_sp_" + this.key).find("span").css("color", "red");
                }

                m_tempdcDict.setItem(this.tag.SMT_Group_Id, null);

                refreshPdcSMTState(this.children, m_pgroupkey, m_tempdcDict);
            });
        });

        $.each(pageVariable.smtgroupSource.arrKeys, function () {
            if (!m_tempdcDict.containKey(this)) {
                $("#row" + this).css("color", "red");
            }
            else {
                $("#row" + this).css("color", "");
            }
        });
    }
}
/*  */
function refreshPdcSMTState(pdcitems, pgroupkey, tempdcDict) {
    $.each(pdcitems, function () {

        var m_lkey = pgroupkey + "-" + this.tag.SMT_Group_Id;

        if (!pageVariable.smtgroupSource.containKey(m_lkey) || !this.tag.SMT_ProdCategory_Id) {
            $("#pdcTree_sp_" + this.key).find("span").css("color", "red");
            $("#salePdcNavTree_sp_" + this.key).find("span").css("color", "red");
        }

        tempdcDict.setItem(m_lkey, null);

        if (this.children) {
            refreshPdcSMTState(this.children, pgroupkey, tempdcDict);
        }
    });
}
/*  */
function checkSMTProperty(pdcid, pdcname) {
    var m_properties = pageVariable.pdcpropertySource[pdcid];
    if (!m_properties) {
        m_properties = [];
    }
    var m_propDict = new datastruct.dictionary();
    $.each(m_properties, function () {
        m_propDict.setItem(this.SMT_ProdProperty_Id, null);
    });

    if (pageVariable.smtpropertySource) {
        var m_smtarrtributestr = pageVariable.smtpropertySource[pdcid];
        if (m_smtarrtributestr) {
            if (!pageVariable.smtproperty) {
                pageVariable.smtproperty = {};
            }
            eval("pageVariable.smtproperty[" + pdcid + "] = " + m_smtarrtributestr + ";");
        }

        var losed_prop = "";
        var losed_value = "";
        var smtattributes = pageVariable.smtproperty[pdcid];
        var smtpvs = new datastruct.dictionary();
        var smtarributeDict = new datastruct.dictionary();
        if (smtattributes) {
            $.each(smtattributes.attributes, function () {

                var m_attrname = this.names.zh;
                var m_attrid = this.id;
                smtarributeDict.setItem(m_attrid, null);

                if (!m_propDict.containKey(this.id)) {
                    if (losed_prop) {
                        losed_prop = losed_prop + ", " + m_attrname + "(" + this.id + ")";
                    }
                    else {
                        losed_prop = this.names.zh + "(" + this.id + ")";
                    }
                }

                if (this.values) {
                    if (m_attrname == "品牌") {
                        $.each(this.values, function () {
                            if (this.names.en.toLowerCase() == "none") {
                                var m_pvstr = this.names.en.toLowerCase();
                                var m_key = pdcid + "-" + m_attrid + "-" + m_pvstr;
                                smtpvs.setItem(m_key, this.id);

                                pageVariable.smtpvaluesDict.setItem(m_key, this.id);
                            }
                        });
                    }
                    else if (m_attrname == "适合屏幕尺寸") {
                        $.each(this.values, function () {
                            var m_pvstr = this.names.en.toLowerCase().replace("\"", " inch");
                            var m_key = pdcid + "-" + m_attrid + "-" + m_pvstr;
                            smtpvs.setItem(m_key, this.id);

                            pageVariable.smtpvaluesDict.setItem(m_key, this.id);
                        });
                    }
                    else {
                        $.each(this.values, function () {
                            var m_pvstr = this.names.en.toLowerCase();
                            var m_key = pdcid + "-" + m_attrid + "-" + m_pvstr;
                            smtpvs.setItem(m_key, this.id);

                            pageVariable.smtpvaluesDict.setItem(m_key, this.id);
                        });
                    }
                }
            });
        }
    }

    var m_pvaluearr = pageVariable.pvalueSource[pdcid];
    if (m_pvaluearr) {
        $.each(m_pvaluearr, function () {
            if (this.SMT_PropValue_Id) {
                var m_pvstr = $.trim(this.PValue.toLowerCase());
                var m_pkey = pdcid + "-" + this.SMT_ProdProperty_Id + "-" + m_pvstr;

                if (smtpvs.containKey(m_pkey)) {
                    var m_smtpvid = smtpvs.getItem(m_pkey);
                    if (m_smtpvid != this.SMT_PropValue_Id) {
                        if (losed_value) {
                            losed_value = losed_value + ", " + this.PValue + "在速卖通代码[" + m_smtpvid + "]异常\r\n";
                        }
                        else {
                            losed_value = this.PValue + "在速卖通代码[" + m_smtpvid + "]异常\r\n";
                        }

                        pageVariable.smterrorpvalues.setItem(m_pkey, null);
                    }
                }
                else {
                    if (losed_value) {
                        losed_value = losed_value + ", " + this.PValue + "在速卖通属性中不存在\r\n";
                    }
                    else {
                        losed_value = this.PValue + "在速卖通属性中不存在\r\n";
                    }

                    pageVariable.smterrorpvalues.setItem(m_pkey, null);
                }
            }
        });
    }

    if (losed_prop) {
        pageframe.control.alertDialog.showAlertInfo(pdcname + "的属性[" + losed_prop + "]在系统中不存在");

        $("#pdcTree_sp_" + pdcid).find("span").css("color", "red");
        $("#salePdcNavTree_sp_" + pdcid).find("span").css("color", "red");
    }
    else {
        if (losed_value) {
            pageframe.control.alertDialog.showAlertInfo(losed_value);

            $("#pdcTree_sp_" + pdcid).find("span").css("color", "red");
            $("#salePdcNavTree_sp_" + pdcid).find("span").css("color", "red");
        }
    }
}

/* 加载商品种类 */
function loadPdcs(event) {

    var m_salepdcnav = new sm.salepdcnavigation();
    m_salepdcnav.SaleSite_Id = saleplatform.currSaleSite_Id;

    if (m_salepdcnav.SaleSite_Id > 0) {
        m_salepdcnav.querySalePdcNav(function (source) {
            pageVariable.pdcTree = new uicontrol.treeView($("#pdcTree"), source, selectPdcEvent,
                                                        { sourceFormat: "table",
                                                            keyColumn: "ProdCategory_Id", parentKeyColumn: "ParentPdc_Id", displayColumn: "PdcName",
                                                            constructDisplayTxt: constructPdcTreeCell
                                                        });
            pageVariable.pdcTree.loadSource();

            var m_width = $("#pdcTreeFrm")[0].offsetWidth + 35;
            $("#productFrm").css("width", pageframe.layout.width - m_width);

            pageVariable.salePdcNavTree = new uicontrol.treeView($("#salePdcNavTree"), source, loadSalePdcNavProp,
                                                        { sourceFormat: "table",
                                                            keyColumn: "ProdCategory_Id", parentKeyColumn: "ParentPdc_Id", displayColumn: "PdcName",
                                                            constructDisplayTxt: constructPdcNavCell
                                                        });
            pageVariable.salePdcNavTree.loadSource();

            if (event) {
                event();
            }

            setLayout();
        });
    }
}
/* 构建导航单元格 */
function constructPdcTreeCell(sourceItem) {
    var m_pdctxt = "";
    if (Number(sourceItem.tag.ProdCount) > 0) {
        m_pdctxt = "<span>" + sourceItem.tag.PdcName + "(" + sourceItem.tag.ProdCount + ")</span>";
    }
    else {
        m_pdctxt = "<span style='color: #999999'>" + sourceItem.tag.PdcName + "</span>";
    }

    return m_pdctxt;
}
/* 构建导航单元格 */
function constructPdcNavCell(sourceItem) {
    if (!sourceItem.tag.IsPdcMenu || sourceItem.tag.IsPdcMenu == "1") {
        return "<span>" + sourceItem.tag.PdcName + "</span>"; 
    }
    else {
        return "<span style='color: #999999'>" + sourceItem.tag.PdcName + "</span>"; 
    }
}

/* 初始化商品列表 */
function initProductList() {
    if (!pageVariable.productList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.productList = new uicontrol.tableList("productList",
                                    { isPaging: true,
                                        autoSeq: true,
                                        height: mainFormHeight,
                                        keyColumn: "SS_Product_Key",
                                        pageQueryHandler: queryProduct,
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: constructSSProdPicCell },
                                                   { display: mlm.C0734, name: "ProdName", width: 225, align: 'left', adjust: true, createCell: constructSSProdNameCell },
                                                   { display: mlm.C1063, name: "PdcName", width: 100, align: 'left', adjust: true, createCell: constructSSProdTypeCell },
                                                   { display: mlm.C1059, name: "", width: 160, align: 'left', adjust: true, createCell: constructSSProdPriceCell },
                                                   { display: mlm.C1257, name: "CMonthSaleCount", width: 60, align: 'right', adjust: true, createCell: constructQtyCell },
                                                   { display: mlm.C1258, name: "AllSaleCount", width: 60, align: 'right', adjust: true, createCell: constructQtyCell },
                                                   { display: mlm.C1259, name: "OnlineTimeStr", width: 80, align: 'center', adjust: true, createCell: constructOnlineTimeCell },
                                                   { display: mlm.C0019, name: "", width: 65, align: 'center', adjust: true, createCell: constructSSProdOperaCell}]
                                    });
    }
}
/* 构建商品图片列 */
function constructSSProdPicCell(key, cellValue) {
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

    return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 70);' onerror='commoncore.func.failLoadImg.call(this, 70);' onclick='viewSSProduct.call(this, \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
}
/* 构建销售商品名称列 */
function constructSSProdNameCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_css = getSSProdCss(m_obj);

    var m_items = [];
    m_items.push("<div style='padding: 0px'><a " + m_css + " onclick='viewSSProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue.replace(/\^/g, "\"").replace(/\~/g, "\'") + "</a></div>");
    if (Number(m_obj.AvailableUnitCount) > 1) {
        m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.AvailableUnitCount + mlm.C1066 + "</div>");
    }

    return m_items.join("");
}
/* 构建类别列 */
function constructSSProdTypeCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_css = getSSProdCss(m_obj);

    var m_items = [];
    var m_len = cellValue.getBytesCount();
    if (m_len > 30) {
        cellValue = cellValue.substringByBytes(30) + "...";
    }
    m_items.push("<div style='padding: 0px;'><span " + m_css + ">" + cellValue + "</span></div>");
    if (m_obj.Brand_Id) {
        m_items.push("<div style='margin: 5px 0px 0px 0px; padding: 0px' class='lb-symbol'><span " + m_css + ">" + m_obj.BrandName + "</span></div>");
    }

    return m_items.join("");
}
/* 构建商品定价列 */
function constructSSProdPriceCell(key, cellValue) {
    if (pageVariable.user.isauthorise) {
        var m_obj = this.keyObj;

        var m_css = getSSProdCss(m_obj);

        var m_arr = [];
        if (Number(this.keyObj.MinSalePrice) == Number(this.keyObj.MaxSalePrice)) {
            m_arr.push("<div style='padding: 0px;'><span " + m_css + ">" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinSalePrice) + "</span></div>");
        }
        else {
            m_arr.push("<div style='padding: 0px;'><span " + m_css + ">" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinSalePrice) + "-" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MaxSalePrice) + "</span></div>");
        }

        if (Number(this.keyObj.MinProfit) == -20000) {
            m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'><span " + m_css + ">" + mlm.C1008 + "</span></div>");
        }
        else {
            if (this.keyObj.MaxProfit) {

                var m_maxprofit = Number(this.keyObj.MaxProfit);
                var m_minprofit = Number(this.keyObj.MinProfit);
                if (m_maxprofit == -10000) {
                    m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1145 + "</div>");
                }
                else {
                    if (m_maxprofit != 0 || m_minprofit != 0) {
                        if (Number(this.keyObj.MinProfit) == m_maxprofit) {
                            m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1146 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinProfit) + "</div>");
                        }
                        else {
                            m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1146 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinProfit) + "-" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MaxProfit) + "</div>");
                        }
                    }
                }
            }
        }

        if (this.keyObj.MaxDiscount && Number(this.keyObj.MaxDiscount) > 0) {
            if (Number(this.keyObj.MaxDiscount) == 1) {
                if (Number(this.keyObj.MinDiscount) != Number(this.keyObj.MaxDiscount)) {
                    m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1058 + ": " + Number(this.keyObj.MinDiscount) * 100 + "%</div>");
                }
            }
            else {
                if (Number(this.keyObj.MinDiscount) == Number(this.keyObj.MaxDiscount)) {
                    m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1058 + ": " + Number(this.keyObj.MinDiscount) * 100 + "%</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>" + mlm.C1058 + ": " + Number(this.keyObj.MinDiscount) * 100 + "%-" + Number(this.keyObj.MaxDiscount) * 100 + "%</div>");
                }
            }
        }

        return m_arr.join("");
    }
}
/* 构造日期列 */
function constructOnlineTimeCell(key, cellValue) {
    if (this.keyObj.State == "2") {
        return commoncore.func.getTimeStrCell(cellValue)
    }
}
/* 构造数量列 */
function constructQtyCell(key, cellValue) {
    if (pageVariable.user.isauthorise) {
        var m_qty = Number(cellValue);
        if (m_qty > 0) {
            return "<a onclick='viewSaleStatFrm.call(this, \"" + this.keyObj.SS_Product_Id + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a>";
        }
    }
}
/* 创建商品操作设置列 */
function constructSSProdOperaCell(key, cellvalue) {

    var m_items = [];
    if (pageVariable.user.isadmin || (pageVariable.user.isauthorise && (this.keyObj.State == "1" || this.keyObj.State == "3"))) {

        var m_css = getSSProdCss(this.keyObj);

        //速卖通平台
        if (saleplatform.currSaleSite_Id == "11" || saleplatform.currSaleSite_Id == "23") {
            if (this.keyObj.State == "2" || this.keyObj.State == "4") {
                m_items.push("<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openModifySSProdFrm.call(this);'>" + mlm.C0061 + "</a>");
                m_items.push("<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openDelSSProdFrm.call(this);'>" + mlm.C0062 + "</a>");

                if (pageVariable.user.isadmin) {
                    m_items.push("<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='downloadSMTSingleProd.call(this);'>下载商品</a>");
                } 
            }
            else {
                m_items.push("<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openModifySSProdFrm.call(this);'>" + mlm.C0061 + "</a>");
                m_items.push("<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openDelSSProdFrm.call(this);'>" + mlm.C0062 + "</a>");
            }

            if (this.keyObj.SMT_Product_Id) {
                m_items.push("<a href='http://www.aliexpress.com/item/product/" + this.keyObj.SMT_Product_Id + ".html' target='blank' class='bt-link' " + m_css + ">浏览页面</a>");
                if (pageVariable.user.isadmin && this.keyObj.State == "4") {
                    m_items.push("<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openPublishSMTFrm.call(this);'>发布商品</a>");
                }
            }
            else {
                if (pageVariable.user.isadmin && this.keyObj.State == "2") {
                    m_items.push("<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openPublishSMTFrm.call(this);'>发布商品</a>");
                }
            }
        }
        else {
            m_items.push("<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openModifySSProdFrm.call(this);'>" + mlm.C0061 + "</a>");
            m_items.push("<a href='javascript:void(\"0\")' class='bt-link' " + m_css + " tag='" + key + "' onclick='openDelSSProdFrm.call(this);'>" + mlm.C0062 + "</a>");
        }
    }

    return m_items.join("");
}
/* 获取样式 */
function getSSProdCss(m_obj) {

    if (!m_obj.cssstyle) {
        var m_css = "";
        if (m_obj.State == "1") {
            m_css = "style='color: #747474; text-decoration: none'"
        }
        else if (m_obj.State == "3") {
            m_css = "style='color: #996633; text-decoration: none'"
        }
        else if (m_obj.State == "4") {
            if ((saleplatform.currSaleSite_Id == 11 || saleplatform.currSaleSite_Id == 23) && !m_obj.SMT_Product_Id) {
                m_css = "style='color: #DD0000; text-decoration: none'";
            }
            else {
                m_css = "style='color: blue; text-decoration: none'";
            } 
        }
        else {
            if ((saleplatform.currSaleSite_Id == 11 || saleplatform.currSaleSite_Id == 23) && !m_obj.SMT_Product_Id) {
                m_css = "style='color: #DD0000; text-decoration: none'";
            }
            else {
                m_css = "style='color: #000000; text-decoration: none'";
            }
        }

        if (m_obj.EnableFlag == "0") {
            m_css = "style='color: #747474; text-decoration: line-through'"
        }

        m_obj.cssstyle = m_css;
    }

    return m_obj.cssstyle;
}

/* 选择商品分类的事件 */
function selectPdcEvent() {
    if (pageVariable.selQueryPdc) {
        pageVariable.selQueryPdc.setPdc({ ProdCategory_Id: [pageVariable.pdcTree.selectedItem.key], PdcName: pageVariable.pdcTree.selectedItem.value });
    }

    queryProduct(1, pageVariable.productList.pageNumber);
}
/* 打开查询商品的窗体 */
function openQueryProdFrm() {
    if (!pageVariable.queryProdFrm) {
        pageVariable.queryProdFrm = new uicontrol.dialog("queryProdFrm", mlm.C0171, { width: 825, position: ["auto", 15] },
                                        function () { queryProduct(1, pageVariable.productList.pageNumber); });

        pageVariable.selQueryPdc = new bizcontrol.selectpdc($("#selQueryPdc"), true, null, null);
        pageVariable.selQueryPdc.shoppingSiteId = saleplatform.currSalePlatformId;
        pageVariable.selQueryPdc.salesite_id = saleplatform.currSaleSite_Id;
        pageVariable.selBrand_q = new bizcontrol.selectbrand($("#selBrand_q"));
        pageVariable.queryProdTabs = $("#queryProdTabs").tabs({ show: showQueryTabs });
        pageVariable.ulProdStates = new uicontrol.selectbox("ulProdStates", "radio");

        $("#btAddQueryProp").click(openAddQueryPropFrm);

        if (pageVariable.pdcTree.selectedItem) {
            pageVariable.selQueryPdc.setPdc({ ProdCategory_Id: [pageVariable.pdcTree.selectedItem.key], PdcName: pageVariable.pdcTree.selectedItem.value });
        }
    }

    var m_pdcKey = 0;
    if (pageVariable.pdcTree.selectedItem) {
        m_pdcKey = pageVariable.pdcTree.selectedItem.key;
    }
    else {
        $("#queryPropArea").empty();
    }

    var m_stateselectitem = pageVariable.ulProdStates.getSelectedItem();

    var items = [];
    items.push({ key: "0", value: mlm.C0403 });
    items.push({ key: "1", value: mlm.C0399 });

    if (saleplatform.currSaleSite_Id == 11 || saleplatform.currSaleSite_Id == 23) {
        
        items.push({ key: "2", value: mlm.C0350 });
        items.push({ key: "100", value: "发布,上载SMT" });
        items.push({ key: "101", value: "发布,未上载SMT" });
        items.push({ key: "4", value: "修订中" });
    }
    else {
        items.push({ key: "2", value: mlm.C0350 });
    }
    items.push({ key: "3", value: mlm.C1025 });
    pageVariable.ulProdStates.bindSource(items);

    if (m_stateselectitem) {
        pageVariable.ulProdStates.setSelectedItem([{ key: m_stateselectitem[0]}]);
    }


    pageVariable.queryProdFrm.pdcId = m_pdcKey;
    pageVariable.queryProdFrm.show();
}
/* 打开选择属性的窗体 */
function openAddQueryPropFrm() {
    if (!pageVariable.selectPropFrm) {
        pageVariable.selectPropFrm = new uicontrol.dialog("selectPropFrm", mlm.C0087, { width: 800, position: ["auto", 25] }, selectQueryPValue);

        $("#ddlSelProp").change(loadQueryPValue);
    }

    $("#dvSelProp").show();

    var m_currPropDict = new datastruct.dictionary();
    $.each(pageVariable.queryPropList.dataSource.items.arrValues, function () {
        m_currPropDict.setItem(this.ProdProperty_Id);
    });

    var m_prodproperty = new pdm.prodproperty();
    if (!pageVariable.allProperties) {
        m_prodproperty.getAllProdPropertys(function (tableSource) {
            pageVariable.allProperties = datastruct.convertion.tableToJson(tableSource);

            var m_propCtrl = $("#ddlSelProp");
            $.each(pageVariable.allProperties, function () {
                if (!m_currPropDict.containKey(this.ProdProperty_Id)) {
                    m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
                }
            });

            if (!$("#ddlSelProp").val()) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1112);
                return;
            }

            loadQueryPValue();
            pageVariable.selectPropFrm.show();
        });
    }
    else {
        var m_propCtrl = $("#ddlSelProp");
        m_propCtrl.empty();
        $.each(pageVariable.allProperties, function () {
            if (!m_currPropDict.containKey(this.ProdProperty_Id)) {
                m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
            }
        });

        if (!$("#ddlSelProp").val()) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1112);
            return;
        }

        loadQueryPValue();
        pageVariable.selectPropFrm.show();
    }

    pageVariable.selectPropFrm.action = "New";
}
/* 加载查询的属性值 */
function loadQueryPValue(selectStruct) {
    if (!pageVariable.selPValueList) {
        pageVariable.selPValueList = new uicontrol.tableList("selPValueList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 270,
                                        selectModel: "2",
                                        keyColumn: "PropValue_Id",
                                        columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 90, align: 'center', adjust: true, createCell: constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'left' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 180, align: 'left'}]
                                    });
    }

    var m_prodproperty = new pdm.prodproperty();
    m_prodproperty.ProdProperty_Id = $("#ddlSelProp").val();

    if (!pageVariable.queryPValueCache) {
        pageVariable.queryPValueCache = new datastruct.dictionary();
    }

    if (!pageVariable.queryPValueCache.containKey(m_prodproperty.ProdProperty_Id)) {

        m_prodproperty.queryPropValueByProd(function (tableSource) {

            pageVariable.selPValueList.bindDataSource(tableSource);
            pageVariable.queryPValueCache.setItem(m_prodproperty.ProdProperty_Id, tableSource);
            if (selectStruct) {
                pageVariable.selPValueList.setSelectedItems(selectStruct);
            }
        });
    }
    else {
        pageVariable.selPValueList.bindDataSource(pageVariable.queryPValueCache.getItem(m_prodproperty.ProdProperty_Id));
        if (selectStruct) {
            pageVariable.selPValueList.setSelectedItems(selectStruct);
        }
    }
}
/* 打开设置属性的窗体 */
function openModifyQueryPropFrm() {
    if (!pageVariable.selectPropFrm) {
        pageVariable.selectPropFrm = new uicontrol.dialog("selectPropFrm", mlm.C0087, { width: 800, position: ["auto", 25] }, selectQueryPValue);

        $("#ddlSelProp").change(loadQueryPValue);
    }

    var m_key = $(this).attr("tag");
    $("#dvSelProp").hide();
    var m_propvalue = pageVariable.queryPropList.getItem(m_key);
    var m_selectStruct = new datastruct.dictionary();
    if (m_propvalue) {
        var m_prodPValueIds = m_propvalue.ProdPValueIdRange ? m_propvalue.ProdPValueIdRange.split(",") : null;
        if (m_prodPValueIds) {
            $.each(m_prodPValueIds, function () {
                m_selectStruct.setItem(this);
            });
        }
    }

    var m_prodproperty = new pdm.prodproperty();
    if (!pageVariable.allProperties) {
        m_prodproperty.getAllProdPropertys(function (tableSource) {
            pageVariable.allProperties = datastruct.convertion.tableToJson(tableSource);

            var m_propCtrl = $("#ddlSelProp");
            $.each(pageVariable.allProperties, function () {
                m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
            });

            m_propCtrl.val(m_key);
            loadQueryPValue(m_selectStruct);
        });
    }
    else {
        var m_propCtrl = $("#ddlSelProp");
        m_propCtrl.empty();
        $.each(pageVariable.allProperties, function () {
            m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
        });

        m_propCtrl.val(m_key);
        loadQueryPValue(m_selectStruct);
    }

    pageVariable.selectPropFrm.action = "Modify";
    pageVariable.selectPropFrm.show();
}
/* 选择关键属性值 */
function selectQueryPValue() {

    var m_selectItems = pageVariable.selPValueList.getSelectedItems();
    var m_pvalueIds = [];
    var m_pvalues = [];
    $.each(m_selectItems, function () {
        m_pvalueIds.push(this.PropValue_Id);
        m_pvalues.push(this.PValue);
    });

    var m_propCtrl = $("#ddlSelProp");
    var m_obj = {};
    m_obj.ProdProperty_Id = m_propCtrl.val();
    m_obj.ProdPropName = m_propCtrl.find("option:selected").text();
    m_obj.ProdPValueIdRange = m_pvalueIds.join(",");
    m_obj.ProdPValueRange = m_pvalues.join(",");

    if (pageVariable.selectPropFrm.action == "New") {
        pageVariable.queryPropList.addData(m_obj.ProdProperty_Id, m_obj);
    }
    else {
        pageVariable.queryPropList.modifyData(m_obj.ProdProperty_Id, m_obj);
    }

    pageVariable.selectPropFrm.close();
}
/* 删除属性 */
function deleteQueryProp() {
    pageVariable.queryPropList.deleteData($(this).attr("tag"));
}

/* 展示查询Tab */
function showQueryTabs(event, ui) {
    if (ui.index == 1) {
        if (!pageVariable.queryPropList) {
            pageVariable.queryPropList = new uicontrol.tableList("queryPropList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ProdProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 90, align: 'left' },
                                                { display: mlm.C0071, name: "ProdPValueRange", width: 450, align: 'left', adjust: true, createCell: constructProdPropValueCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: createQueryOperaCell}]
                                    });
        }
        fillProps(pageVariable.queryPropList, pageVariable.selQueryPdc.pdcId);
    }
    else if (ui.index == 2) {
        if (!pageVariable.sortFieldList) {
            pageVariable.sortFieldList = new uicontrol.tableList("sortFieldList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "SortField",
                                        columns: [{ display: mlm.C1039, name: "SortFieldStr", width: 200, align: 'center' },
                                                { display: mlm.C1040, name: "SortStr", width: 250, align: 'center', adjust: true, createCell: constructProdPropValueCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, deletedFunc: "deleteSortField"}]
                                    });
        }
    }
}
/* 创建商品属性值单元格 */
function constructProdPropValueCell(key, cellValue) {
    if (!cellValue) {
        return "";
    }
    else {
        return cellValue;
    }
}
/* 创建属性设置列 */
function createQueryOperaCell(key, cellvalue) {
    return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openModifyQueryPropFrm.call(this);'>" + mlm.C0611 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='deleteQueryProp.call(this);'>" + mlm.C0062 + "</a>";
}
/* 加载属性 */
function fillProps(tableList, prodcategory_ids) {
    var m_prodcategory_ids = prodcategory_ids;

    var m_pdcproperty = new pdm.pdcproperty();
    m_pdcproperty.SS_ProdCategory_Ids = [];

    if (!(m_prodcategory_ids instanceof Array)) {
        m_pdcproperty.SS_ProdCategory_Ids = [m_prodcategory_ids];
    }
    else {
        $.each(m_prodcategory_ids, function () {
            m_pdcproperty.SS_ProdCategory_Ids.push(this.toString());
        });
    }

    m_pdcproperty.getPdcProps(function (retTable) {

        var m_tempStruct = new datastruct.dictionary();
        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        var m_items = [];

        $.each(m_jsonobjs, function () {
            if (pageVariable.handlerSSProdFrm) {
                if (pageVariable.handlerSSProdFrm.action == "New" || this.IsSku != "1") {
                    m_tempStruct.setItem(this.ProdProperty_Id, null);
                    m_items.push(this);
                }
            }
            else {
                m_tempStruct.setItem(this.ProdProperty_Id, null);
                m_items.push(this);
            }

        });

        $.each(tableList.dataSource.items.arrValues, function () {
            m_items.push(this);
        });

        $.each(m_items, function () {
            if (!tableList.getItem(this.ProdProperty_Id)) {
                tableList.addData(this.ProdProperty_Id, this);
            }
            else {
                var m_propitem = tableList.getItem(this.ProdProperty_Id);
                m_propitem.IsKeyAttribute = this.IsKeyAttribute;

                tableList.modifyData(m_propitem.ProdProperty_Id, m_propitem);
            }
        });
    });
}
/* 加载属性值 */
function loadPValues(prodproperty_id) {

    if (!prodproperty_id) {
        return;
    }

    var m_cachekey = m_cachekey = prodproperty_id + "-S" + (pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id == 0 ? -1 : pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id);
    var m_propvalue = pageVariable.ssPropList.getItem(prodproperty_id);

    var m_selectStruct = new datastruct.dictionary();

    if (m_propvalue) {
        var m_prodPValueIds = m_propvalue.ProdPValueIdRange ? m_propvalue.ProdPValueIdRange.split(",") : null;
        if (m_prodPValueIds) {
            $.each(m_prodPValueIds, function () {
                m_selectStruct.setItem(this);
            });
        }
    }

    if (!pageVariable.prodPValueCache.containKey(m_cachekey)) {
        var m_prodproperty = new pdm.prodproperty();
        m_prodproperty.ProdProperty_Id = prodproperty_id;
        if (Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) < 1000000) {
            m_prodproperty.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
        }
        m_prodproperty.queryPropValueByProd(function (tableSource) {
            pageVariable.prodPValueList.bindDataSource(tableSource);

            var m_objs = datastruct.convertion.tableToJson(tableSource);
            pageVariable.prodPValueCache.setItem(m_cachekey, m_objs);

            if (m_prodPValueIds) {
                pageVariable.prodPValueList.setSelectedItems(m_selectStruct);
            }
        });
    }
    else {
        var m_objs = pageVariable.prodPValueCache.getItem(m_cachekey);

        pageVariable.prodPValueList.bindDataSource(m_objs);

        if (m_prodPValueIds) {
            pageVariable.prodPValueList.setSelectedItems(m_selectStruct);
        }
    }
}
/* 获取商品查询条件 */
function getQueryCondition() {

    var m_conditionObj = {};

    m_conditionObj.keyWord = $.trim($("#txtKeyWord_q").val());
    m_conditionObj.skuProdCode = $.trim($("#txtSkuProdCode_q").val());

    m_conditionObj.pdcIds = [];
    if (pageVariable.selQueryPdc) {
        if (pageVariable.selQueryPdc.pdcId instanceof Array) {
            $.each(pageVariable.selQueryPdc.pdcId, function () {
                m_conditionObj.pdcIds.push(this.toString());
            });
        }
        else {
            if (pageVariable.selQueryPdc.pdcId) {
                m_conditionObj.pdcIds.push(pageVariable.selQueryPdc.pdcId.toString());
            }
        }
    }
    else {
        if (pageVariable.pdcTree.selectedItem) {
            m_conditionObj.pdcIds.push(pageVariable.pdcTree.selectedItem.key);
        }
    }

    m_conditionObj.brandId = 0;
    if (pageVariable.selBrand_q) {
        m_conditionObj.brandId = pageVariable.selBrand_q.brandId;
    }

    m_conditionObj.propValueIds = "";
    if (pageVariable.queryPropList) {
        var propValueIds = [];
        $.each(pageVariable.queryPropList.dataSource.items.arrValues, function () {
            if (this.ProdPValueIdRange) {
                $.each(this.ProdPValueIdRange.split(","), function () {
                    propValueIds.push(this);
                });
            }
        });

        if (propValueIds.length > 0) {
            m_conditionObj.propValueIds = propValueIds.join(",");
        }
    }

    if (pageVariable.ulProdStates) {
        m_conditionObj.prodState = pageVariable.ulProdStates.getSelectedItem()[0];
    }

    return m_conditionObj;
}
/* 查询商品 */
function queryProduct(pageNum, pageCount) {
    var m_conditionObj = getQueryCondition();

    var ss_product = new sm.ss_product();
    ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    ss_product.PdcIds = m_conditionObj.pdcIds;
    ss_product.BrandId = m_conditionObj.brandId;
    ss_product.Key = m_conditionObj.keyWord;
    ss_product.SkuProdCode = m_conditionObj.skuProdCode; 
    ss_product.PropValueIds = m_conditionObj.propValueIds;
    ss_product.ProdState = m_conditionObj.prodState;
    ss_product.Page = pageNum;
    ss_product.PageNum = pageCount;
    ss_product.querySSProducts(function (source) {
        pageVariable.productList.dataSource.page = pageNum;
        pageVariable.productList.bindDataSource(source);

        if (pageVariable.queryProdFrm) {
            pageVariable.queryProdFrm.close();
        }
    });
}

/* 初始化商品处理的窗体 */
function initHandlerSSProdFrm() {
    if (!pageVariable.handlerSSProdFrm) {
        pageVariable.handlerSSProdFrm = new uicontrol.dialog("handlerSSProdFrm", mlm.C1087, { width: 1125, position: ["auto", 10] }, function () {
            saveSSProd(function (retTable) {
                var m_jsonobj = datastruct.convertion.tableToJson(retTable)[0];

                if (pageVariable.handlerSSProdFrm.action == "New") {
                    pageVariable.productList.addData(m_jsonobj.SS_Product_Key, m_jsonobj);
                }
                else {
                    m_jsonobj.cssstyle = null;
                    pageVariable.productList.modifyData(m_jsonobj.SS_Product_Key, m_jsonobj);
                }

                pageVariable.apExpAreaTree = null;
                pageVariable.expAreaTree = null;

                if (pageVariable.m_viewSSProdCtrl) {
                    pageVariable.m_viewSSProdCtrl._activedobj.expAreaTree = null;
                    pageVariable.m_viewSSProdCtrl._activedobj.apAreaTree = null;
                }

                pageVariable.definedProps = {};
                pageVariable.handlerSSProdFrm.close();
            });
        });

        $("#btAddSSProp").click(openAddPropFrm);
        $("#btViewSS_RemarkPic").click(previewProdDesc); 
        $("#btBatchSetSalePrice").click(openSetSalePriceFrm);
        $("#btSetSSProdBox").click(openHandlerSSProdBox);
        $("#txtGiftWeight").change(changeGiftWeightLimit);
        $("#txtGiftCost").change(changeGiftCostLimit);
        $("#ssProdHtmlTool").change(function () {
            $(this).attr("tag", "submit");
        });

        $("#btExportExpPrice").click(exportExpServices);
        $("#btImportExpPrice").click(openImportExpServicesFrm);

        pageVariable.ddlStyleHtmlTag = new uicontrol.selectbox("ddlStyleHtmlTag", "radio");
        var items = [];
        items.push({ key: "1", value: "是" });
        items.push({ key: "0", value: "否" });
        pageVariable.ddlStyleHtmlTag.bindSource(items);
        pageVariable.ddlStyleHtmlTag.setSelectedItem([{ key: 1}]);

        var m_150_pic = $("#lk_150_Picname");
        var m_480_pic = $("#lk_480_Picname");
        var m_800_pic = $("#lk_800_Picname");

        var m_clickviewFunc = function () {

            m_480_pic.removeClass("lb-light-alert");
            m_150_pic.removeClass("lb-light-alert");
            m_800_pic.removeClass("lb-light-alert");

            $(this).addClass("lb-light-alert");

            $("#imgProdPic").attr("src", $(this).attr("tag"));
        };

        m_150_pic.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
        m_150_pic.click(m_clickviewFunc);

        m_480_pic.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
        m_480_pic.click(m_clickviewFunc);

        m_800_pic.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
        m_800_pic.click(m_clickviewFunc);

        pageVariable.selSSBrand = new bizcontrol.selectbrand($("#selSSBrand"));
        pageVariable.selPdcNav = new bizcontrol.selectpdc($("#selPdcNav"), true, null, null, function () {
            fillProps(pageVariable.ssPropList, pageVariable.selPdcNav.pdcId);
        });
        pageVariable.ssPicList = new uicontrol.simpleTableList("dvSSPicList",
                                                                { keyColumn: "Product_Pic_Id",
                                                                    isPaging: false,
                                                                    itemCss: "picture-item",
                                                                    constructTableFunc: constructPicTable,
                                                                    seqProp: "Seq",
                                                                    events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                        onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                        ondblclick: function () {
                                                                            var m_key = $(this).attr("tag");
                                                                            var m_obj = pageVariable.ssPicList.getItem(m_key);

                                                                            if (!pageVariable.viewProdPicFrm) {
                                                                                pageVariable.viewProdPicFrm = new uicontrol.dialog("viewProdPicFrm", mlm.C0648, { width: 1000, position: ["auto", 25] });
                                                                            }

                                                                            var m_picUrl = "";
                                                                            var m_browserUrl = "";
                                                                            var m_sourceUrl = "";
                                                                            if (m_obj.PicUrl.indexOf("http://") > -1) {
                                                                                m_picUrl = m_obj.PicUrl;
                                                                                m_browserUrl = m_obj.BrowsePicUrl;
                                                                                m_sourceUrl = m_obj.SourcePicUrl;
                                                                            }
                                                                            else {
                                                                                m_picUrl = window.webLocation + m_obj.PicUrl;
                                                                                m_browserUrl = window.webLocation + m_obj.BrowsePicUrl;
                                                                                m_sourceUrl = window.webLocation + m_obj.SourcePicUrl;
                                                                            }

                                                                            m_480_pic.text(m_picUrl);
                                                                            m_480_pic.attr("tag", m_picUrl);

                                                                            if (m_obj.BrowsePicUrl && m_obj.BrowsePicUrl != m_obj.PicUrl) {
                                                                                m_150_pic.text(m_browserUrl + " (150x150" + mlm.C0667 + ")");
                                                                                m_150_pic.attr("tag", m_browserUrl);
                                                                                m_150_pic.show();
                                                                            }
                                                                            else {
                                                                                m_150_pic.hide();
                                                                            }

                                                                            if (m_obj.SourcePicUrl && m_obj.SourcePicUrl != m_obj.PicUrl) {
                                                                                m_800_pic.text(m_sourceUrl + " (800x800" + mlm.C0667 + ")");
                                                                                m_800_pic.attr("tag", m_sourceUrl);
                                                                                m_800_pic.show();
                                                                            }
                                                                            else {
                                                                                m_800_pic.hide();
                                                                            }

                                                                            $("#imgProdPic").attr("src", m_picUrl);

                                                                            pageVariable.viewProdPicFrm.show();
                                                                        }
                                                                    }
                                                                });
    }

    if (!pageVariable.ssProdTabs) {
        pageVariable.ssProdTabs = $("#ssProdTabs").tabs({ show: showSSProdTab });
    }

    if (pageVariable.ssProdTabs) {
        $("#lbSSProdSymbol").trigger("click");
    }

    if (!pageVariable.ssPropList) {
        pageVariable.ssPropList = new uicontrol.tableList("ssPropList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ProdProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 250, align: 'left' },
                                                { display: mlm.C0070, name: "IsSku", width: 70, align: 'left', adjust: true, createCell: constructIsSkuCell },
                                                { display: "关键属性", name: "IsKeyAttribute", width: 70, align: 'center', adjust: true, createCell: constructIsKeyAttrCell },
                                                { display: mlm.C0071, name: "ProdPValueRange", width: 350, align: 'left', adjust: true, createCell: constructProdPropValueCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: createSSPropOperaCell}]
                                    });
    }

    if (pageVariable.expAreaTree) {
        pageVariable.expServiceList.bindDataSource(null);
        pageVariable.expAreaTree.clearSelectedItem();
    }

    if (pageVariable.apExpAreaTree) {
        pageVariable.prodProfitList.bindDataSource(null);
        pageVariable.apExpAreaTree.clearSelectedItem();
    }

    pageVariable.definedProps = {};
    pageVariable.prodPValueCache = new datastruct.dictionary();
    pageVariable.handlerSSProdFrm.max_gift_id = 1000000;
    pageVariable.handlerSSProdFrm.expchargedict = new datastruct.dictionary();

    pageVariable.handlerSSProdFrm.show();
}
/* 创建属性类型的单元格 */
function constructIsSkuCell(key, cellValue) {

    var m_retvalue = "";
    if (cellValue == "1") {
        m_retvalue = mlm.C0128;
    }
    else {
        m_retvalue = mlm.C0125;
    }

    return m_retvalue;
}
/* 创建关键属性的单元格 */
function constructIsKeyAttrCell(key, cellValue) {

    var m_retvalue = "";
    if (cellValue == "1") {
        m_retvalue = "是";
    }
    else {
        m_retvalue = "否";
    }

    return m_retvalue;
}
/*  */
function createSSPropOperaCell(key, cellvalue) {
    if (this.keyObj.IsKeyAttribute == "1") {
        return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openSetPropValueFrm.call(this);'>修改</a>";
    }
    else {

        return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openSetPropValueFrm.call(this);'>修改</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDeleteProdProp.call(this);'>" + mlm.C0062 + "</a>";
    }
}
/* 打开选择属性的窗体 */
function openAddPropFrm() {

    var m_currProps = pageVariable.ssPropList.dataSource.items.arrValues;
    $("#txtPropSeq").val(m_currProps.length + 1);

    var m_currPropDict = new datastruct.dictionary();
    $.each(m_currProps, function () {
        m_currPropDict.setItem(this.ProdProperty_Id);
    });

    var m_propCtrl = $("#ddlProp");
    if (!pageVariable.allProperties) {
        var m_prodproperty = new pdm.prodproperty();
        m_prodproperty.getAllProdPropertys(function (tableSource) {
            pageVariable.allProperties = datastruct.convertion.tableToJson(tableSource);

            var m_avaiProps = [];
            $.each(pageVariable.allProperties, function () {
                if (!m_currPropDict.containKey(this.ProdProperty_Id)) {
                    m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
                    m_avaiProps.push(this);
                }
            });

            m_propCtrl.change(function () {
                var m_prodproperty_id = m_propCtrl.val();
                loadPValues(m_prodproperty_id);
                pageVariable.handlerPropFrm.prodproperty_id = m_prodproperty_id;
            });

            if (m_avaiProps.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C0632);
                return;
            }

            var m_prodproperty_id = m_propCtrl.val();
            loadPValues(m_prodproperty_id);

            initPropValueFrm();

            pageVariable.handlerPropFrm.prodproperty_id = m_prodproperty_id;
            pageVariable.handlerPropFrm.setTitle(mlm.C0075);
            pageVariable.handlerPropFrm.action = "New";
        });
    }
    else {
        m_propCtrl.empty();
        var m_avaiProps = [];
        $.each(pageVariable.allProperties, function () {
            if (!m_currPropDict.containKey(this.ProdProperty_Id)) {
                m_propCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
                m_avaiProps.push(this);
            }
        });

        if (m_avaiProps.length == 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0632);
            return;
        }

        var m_prodproperty_id = m_propCtrl.val();
        loadPValues(m_propCtrl.val());

        initPropValueFrm();

        pageVariable.handlerPropFrm.prodproperty_id = m_prodproperty_id;
        pageVariable.handlerPropFrm.setTitle(mlm.C0075);
        pageVariable.handlerPropFrm.action = "New";
    }

    $("#dvPV_1").show();
    $("#dvPV_Seq").hide();
    $("#dvPV_2").removeClass("first-item");
}
/* 初始化属性值的窗体 */
function initPropValueFrm() {
    if (!pageVariable.handlerPropFrm) {
        pageVariable.handlerPropFrm = new uicontrol.dialog("handlerPropFrm", "", { width: 800, position: ["auto", 25] }, saveProdProp);

        pageVariable.handlerPropFrm.show();

        $("#btAddProdPValue").click(openNewPValueFrm);

        pageVariable.prodPValueList = new uicontrol.tableList("prodPValueList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 270,
                                        selectModel: "2",
                                        keyColumn: "PropValue_Id",
                                        columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 90, align: 'center', adjust: true, createCell: constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'left' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 180, align: 'left' },
                                                   { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: createPValueOperaCell}]
                                    });

        var m_propTypeCtrl = $("#ddlPropType");
        m_propTypeCtrl.append("<option value='1'>" + mlm.C0128 + "</option>");
        m_propTypeCtrl.append("<option value='2'>" + mlm.C0125 + "</option>");
    }
    else {
        pageVariable.handlerPropFrm.show();
    }
}
/* 构建属性值的操作列 */
function createPValueOperaCell(key, cellValue) {
    var m_obj = pageVariable.prodPValueList.getItem(key);
    if (!m_obj.SS_Product_Id || m_obj.SS_Product_Id == "0") {
        return "";
    }
    else {
        return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openModifyPValueFrm.call(this);'>" + mlm.C0061 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDeletePValueFrm.call(this);'>" + mlm.C0062 + "</a>";
    }
}
/* 打开添加商品属性值的窗体 */
function openNewPValueFrm() {
    if (!pageVariable.handlerPValueFrm) {
        pageVariable.handlerPValueFrm = new uicontrol.dialog("handlerPValueFrm", "", { width: 800, position: ["auto", 35] }, savePValue);
    }

    $("#txtPValue").val("");
    $("#txtPValueCode").val("");

    pageVariable.handlerPValueFrm.prodpvalue_id = 0;
    pageVariable.handlerPValueFrm.action = "New";
    pageVariable.handlerPValueFrm.setTitle(mlm.C0061 + mlm.C0608);
    pageVariable.handlerPValueFrm.show();
}
/* 打开修改商品属性值的窗体 */
function openModifyPValueFrm() {
    if (!pageVariable.handlerPValueFrm) {
        pageVariable.handlerPValueFrm = new uicontrol.dialog("handlerPValueFrm", "", { width: 800, position: ["auto", 35] }, savePValue);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.prodPValueList.getItem(m_key);
    $("#txtPValue").val(m_obj.PValue);
    $("#txtPValueCode").val(m_obj.PValueCode);

    pageVariable.handlerPValueFrm.prodpvalue_id = m_key;
    pageVariable.handlerPValueFrm.action = "Modify";
    pageVariable.handlerPValueFrm.setTitle(mlm.C0061 + mlm.C0608);
    pageVariable.handlerPValueFrm.show();
}
/* 保存商品属性值 */
function savePValue() {

    var m_pvalueStr = $.trim($("#txtPValue").val());
    if (!m_pvalueStr) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0620);
        return;
    }

    var m_pvalue = {};
    m_pvalue.ProdProperty_Id = pageVariable.handlerPropFrm.prodproperty_id;
    m_pvalue.PValue = m_pvalueStr;
    m_pvalue.PValueCode = $.trim($("#txtPValueCode").val());
    m_pvalue.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id == 0 ? -1 : pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
    var m_selectStruct = new datastruct.dictionary();
    var m_selectedItems = pageVariable.prodPValueList.getSelectedItems();
    $.each(m_selectedItems, function () {
        m_selectStruct.setItem(this.PropValue_Id, null);
    });

    if (pageVariable.handlerPValueFrm.action == "New") {

        pageVariable.maxPvGuid++;
        m_pvalue.PropValue_Id = pageVariable.maxPvGuid;

        pageVariable.prodPValueList.addData(m_pvalue.PropValue_Id, m_pvalue);

        m_selectStruct.setItem(m_pvalue.PropValue_Id);
        pageVariable.prodPValueList.setSelectedItems(m_selectStruct);
    }
    else {

        m_pvalue.PropValue_Id = pageVariable.handlerPValueFrm.prodpvalue_id;

        /*  修改前的数据 */
        var m_oldPValue = pageVariable.prodPValueList.getItem(m_pvalue.PropValue_Id).PValue;

        pageVariable.prodPValueList.modifyData(m_pvalue.PropValue_Id, m_pvalue);
        pageVariable.prodPValueList.setSelectedItems(m_selectStruct);
    }

    //待更新的属性值
    pageVariable.definedProps[m_pvalue.PropValue_Id] = m_pvalue;

    var m_cachekey = m_pvalue.ProdProperty_Id + "-S" + m_pvalue.SS_Product_Id;
    pageVariable.prodPValueCache.setItem(m_cachekey, pageVariable.prodPValueList.dataSource.items.arrValues);

    innerSaveProdProp();

    pageVariable.handlerPValueFrm.close();
}
/* 打开设置属性的窗体 */
function openSetPropValueFrm() {

    initPropValueFrm();

    $("#dvPV_1").hide();
    $("#dvPV_Seq").show();
    $("#dvPV_2").addClass("first-item");

    var m_key = $(this).attr("tag");
    loadPValues(m_key);

    var m_obj = pageVariable.ssPropList.getItem(m_key);
    $("#txtPropSeq").val(m_obj.Seq);

    pageVariable.handlerPropFrm.setTitle(mlm.C0611 + mlm.C0608);
    pageVariable.handlerPropFrm.prodproperty_id = m_key;
    pageVariable.handlerPropFrm.action = "Modify";

}
/* 打开删除商品属性值的窗体 */
function openDeletePValueFrm() {
    if (!pageVariable.delPValueFrm) {
        pageVariable.delPValueFrm = new uicontrol.confirmDelete(deleteProdPValue);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.prodPValueList.getItem(m_key);

    pageVariable.delPValueFrm.m_key = m_obj.ProdProperty_Id + "-" + m_obj.Product_Id;
    pageVariable.delPValueFrm.prodpvalue_id = m_key;
    pageVariable.delPValueFrm.showConfirm(mlm.C0464 + mlm.C0608 + "(" + m_obj.PValue + ") ?");
}
/* 删除商品属性值 */
function deleteProdPValue() {
    pageVariable.prodPValueList.deleteData(pageVariable.delPValueFrm.prodpvalue_id);

    innerSaveProdProp();
    pageVariable.prodPValueCache.setItem(pageVariable.delPValueFrm.m_key, pageVariable.prodPValueList.dataSource.items.arrValues);

    //从待更新的属性值中移除
    pageVariable.prodPValueCache.removeItem(pageVariable.delPValueFrm.m_key);

    pageVariable.delPValueFrm.close();
}
/* 保存商品属性值 */
function saveProdProp() {
    innerSaveProdProp();
    pageVariable.handlerPropFrm.close();
}
function innerSaveProdProp() {
    var m_property_id = pageVariable.handlerPropFrm.prodproperty_id;
    var m_pvalueIds = [];
    var m_pvalues = [];

    var m_selectItems = pageVariable.prodPValueList.getSelectedItems();
    $.each(m_selectItems, function () {
        m_pvalueIds.push(this.PropValue_Id);
        m_pvalues.push(this.PValue);
    });

    var m_obj = pageVariable.ssPropList.getItem(m_property_id);

    if (m_obj) {
        m_obj.ProdPValueIdRange = m_pvalueIds.join(",");
        m_obj.ProdPValueRange = m_pvalues.join(",");

        var m_itemsource = pageVariable.ssPropList.dataSource.items.arrValues;
        var m_seq = $("#txtPropSeq").val();

        if (m_seq > 0 && m_seq < m_itemsource.length) {
            var m_oldseq = m_obj.Seq;
            $.each(m_itemsource, function () {
                if (m_seq > 0 && this.Seq == m_seq) {
                    m_obj.Seq = this.Seq;
                    this.Seq = m_oldseq;
                    m_seq = 0;
                }
            });
            m_itemsource.sort(sortProdProp);
        }

        pageVariable.handlerSSProdFrm.ss_product.PropTable = m_itemsource;
        pageVariable.ssPropList.bindDataSource(m_itemsource);

    }
    else {
        var m_propCtrl = $("#ddlProp");

        m_obj = {};
        m_obj.ProdProperty_Id = m_propCtrl.val();
        m_obj.ProdPropName = m_propCtrl.find("option:selected").text();
        m_obj.IsSku = $("#ddlPropType").val();
        m_obj.ProdPValueIdRange = m_pvalueIds.join(",");
        m_obj.ProdPValueRange = m_pvalues.join(",");
        m_obj.Seq = $("#txtPropSeq").val();

        m_obj.sourceFrom = 2;

        pageVariable.ssPropList.addData(m_obj.ProdProperty_Id, m_obj);

        pageVariable.handlerSSProdFrm.ss_product.PropTable = pageVariable.ssPropList.dataSource.items.arrValues;
    }

    generateSSInnerProds();
    generateSSSalePrice();
}
/* 打开删除商品分类-属性的窗体 */
function openDeleteProdProp() {
    if (!pageVariable.delProdPropFrm) {
        pageVariable.delProdPropFrm = new uicontrol.confirmDelete(deleteProdProp);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.ssPropList.getItem(m_key);
    pageVariable.delProdPropFrm.PdcProperty_Id = m_key;
    pageVariable.delProdPropFrm.showConfirm(mlm.C0464 + mlm.C0165 + "(" + m_obj.ProdPropName + ") ?");
}
/* 删除商品属性 */
function deleteProdProp() {
    pageVariable.ssPropList.deleteData(pageVariable.delProdPropFrm.PdcProperty_Id);

    pageVariable.handlerSSProdFrm.ss_product.PropTable = pageVariable.ssPropList.dataSource.items.arrValues;
    
    generateSSInnerProds();
    generateSSSalePrice();

    pageVariable.delProdPropFrm.close();
}
/* 生成内部映射关系 */
function generateSSInnerProds() {
    var m_skuObjs = generateSkuObjs(pageVariable.handlerSSProdFrm.ss_product.PropTable);

    var i = 1000000;
    var m_innerTemp = new datastruct.dictionary();
    if (pageVariable.handlerSSProdFrm.ss_product.InnerProds) {
        $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
            m_innerTemp.setItem(this.PropValues, this);

            if (Number(this.SS_InnerProd_Id) > i) {
                i = Number(this.SS_InnerProd_Id) + 1;
            }
        });
    }

    var m_seq = 1;
    pageVariable.handlerSSProdFrm.ss_product.InnerProds = [];
    if (m_skuObjs.length > 0) {
        $.each(m_skuObjs, function () {

            var m_newitem = null;

            if (m_innerTemp.containKey(this.SkuKey)) {
                m_newitem = m_innerTemp.getItem(this.SkuKey);
                m_newitem.SkuProps = this.SkuProps;

                if (Number(m_newitem.SS_InnerProd_Id) > 1000000) {
                    m_newitem.SS_InnerProd_Id = i;
                }
            }
            else {
                m_newitem = {};
                m_newitem.SS_InnerProd_Id = i;
                m_newitem.SkuProduct_Ids = [];
                m_newitem.ProdCode = "";
                m_newitem.PropValues = this.SkuKey;
                m_newitem.SkuProps = this.SkuProps;
                m_newitem.BoxWeight = 0;
                m_newitem.PackageWeight = 0;
                m_newitem.BoxLength = 0;
                m_newitem.BoxWidth = 0;
                m_newitem.BoxHeight = 0;
            }

            m_newitem.Seq = m_seq;
            pageVariable.handlerSSProdFrm.ss_product.InnerProds.push(m_newitem);

            m_seq++;
            i++;
        });
    }
    else {
        var m_newitem = {};
        m_newitem.SS_InnerProd_Id = i;
        m_newitem.SkuProduct_Ids = [];
        m_newitem.ProdCode = "";
        m_newitem.PropValues = "default";
        m_newitem.SkuProps = "";
        m_newitem.BoxWeight = 0;
        m_newitem.PackageWeight = 0;
        m_newitem.BoxLength = 0;
        m_newitem.BoxWidth = 0;
        m_newitem.BoxHeight = 0;
        pageVariable.handlerSSProdFrm.ss_product.InnerProds.push(m_newitem);
    }

    pageVariable.rebindInnerProdList = true;
    pageVariable.rebindSalePriceList = true;

    pageVariable.isChangeSSProd = true;
}
/* 生成Sku对象 */
function generateSkuObjs(propObjs) {

    var m_skuObjs = [];

    /* 支持属性值组合按序号显示 */
    pageVariable.m_propSeqs = new datastruct.dictionary();

    /* 获取商品Sku属性和详细信息 */
    var m_skuProps = [];

    var i = 1;
    $.each(propObjs, function () {
        if (this.IsSku == "1") {
            m_skuProps.push(this);
        }

        pageVariable.m_propSeqs.setItem(this.ProdProperty_Id, i);
        i++;
    });
    /* Sku属性集合 */
    pageVariable.temp_skuProps = m_skuProps;

    if (!pageVariable.propSeqFunc) {
        /* 属性值排序算法 */
        pageVariable.propSeqFunc = function (a, b) {
            return Number(pageVariable.m_propSeqs.getItem(a.ProdProperty_Id)) > Number(pageVariable.m_propSeqs.getItem(b.ProdProperty_Id)) ? 1 : -1;
        };
        /* 属性Id排序算法 */
        pageVariable.compSeqFunc = function (a, b) {
            return Number(a) > Number(b) ? 1 : -1;
        };
    }

    /* Sku单元列表 */
    var m_skuObjects = [];
    if (m_skuProps.length > 0) {

        constructSkuProd(m_skuObjects, 0, {});

        var m_newitems = new datastruct.dictionary();
        $.each(m_skuObjects, function () {

            var m_objArr = [];
            /* 属性值顺序 */
            var m_valueArr = [];
            /* 属性Id顺序 */
            var m_keyArr = [];
            $.each(this, function () {
                m_objArr.push(this);
            });

            /* 属性排序 */
            m_objArr.sort(pageVariable.propSeqFunc);
            $.each(m_objArr, function () {
                m_keyArr.push(this.key);
                m_valueArr.push(this.value);
            });

            var m_pv_txt = m_keyArr.join("_");

            /* 关键属性产品的主键排序(关键) */
            m_keyArr.sort(pageVariable.compSeqFunc);
            var m_key = m_keyArr.join("_");

            /* 构建Sku单元 */
            var m_obj = {};
            m_obj.SkuKey = m_key;
            m_obj.PV_Txt = m_pv_txt;
            m_obj.SkuProps = m_valueArr.join("-");

            m_skuObjs.push(m_obj);
        });
    }

    return m_skuObjs;
}
/* 构造关键属性产品组合列表 */
function constructSkuProd(skuProds, currCount, propValue) {
    var m_prop = pageVariable.temp_skuProps[currCount];

    if (!m_prop.ProdPValueIdRange) {
        return;
    }

    var m_pvalueIds = m_prop.ProdPValueIdRange.split(",");
    var m_pvalues = m_prop.ProdPValueRange.split(",");
    var m_propValues = [];

    var i = 0;
    $.each(m_pvalueIds, function () {
        m_propValues.push({ key: m_pvalueIds[i], value: m_pvalues[i] });
        i++;
    });

    if (currCount == pageVariable.temp_skuProps.length - 1) {

        $.each(m_propValues, function () {
            var m_skuProd = {};
            this.ProdProperty_Id = m_prop.ProdProperty_Id;
            m_skuProd[m_prop.ProdProperty_Id] = this;
            $.extend(m_skuProd, propValue);

            skuProds.push(m_skuProd);
        });

        propValue = {};
        currCount = 0;
    }
    else {
        currCount++;
        $.each(m_propValues, function () {
            this.ProdProperty_Id = m_prop.ProdProperty_Id;
            propValue[m_prop.ProdProperty_Id] = this;

            constructSkuProd(skuProds, currCount, propValue);
        });
    }
}

/* 打开图片上传的窗体 */
function openUploadPicFrm() {
    if (!pageVariable.uploadPicFrm) {
        pageVariable.uploadPicFrm = new uicontrol.dialog("uploadPicFrm", mlm.C0252, { width: 800 }, uploadPic);
        pageVariable.prodPicFile = new uicontrol.file("prodPicFile");

        var m_picHandlerCtrl = $("#ddlPicHandler");
        m_picHandlerCtrl.append("<option value='1'>" + mlm.C1080 + "</option>");
        m_picHandlerCtrl.append("<option value='2'>" + mlm.C1081 + "(480px*480px" + mlm.C1082 + "150px*150px)" + "</option>");

        pageVariable.ulPicFrom = new uicontrol.selectbox("ulPicFrom", "radio", "changePicHandlerEvent");
        var items = [];
        items.push({ key: "0", value: mlm.C1135 });
        items.push({ key: "1", value: mlm.C1136 });
        pageVariable.ulPicFrom.bindSource(items);
        pageVariable.ulPicFrom.setSelectedItem([{ key: "0"}]);
    }

    pageVariable.uploadPicFrm.show();
}
/* 图片处理切换事件 */
function changePicHandlerEvent() {
    var m_pichandler = pageVariable.ulPicFrom.getSelectedItem()[0];
    if (m_pichandler == "0") {
        $("#dvPicUpload").show();
        $("#dvPicSetUrl").hide();
    }
    else {
        $("#dvPicUpload").hide();
        $("#dvPicSetUrl").show();
    }
}
/* 上传图片 */
function uploadPic() {
    var m_pichandler = pageVariable.ulPicFrom.getSelectedItem()[0];
    if (m_pichandler == "0") {
        if (!$("#prodPicFile").val()) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1083);
            return;
        }

        var m_ss_product = new sm.ss_product();
        m_ss_product.PicHandler = $("#ddlPicHandler").val();
        m_ss_product.SS_Product_Id = Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) > 1000000 ? "0" : pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
        m_ss_product.SalePlatform_Id = pageVariable.handlerSSProdFrm.ss_product.SalePlatform_Id.toString();
        m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id.toString();

        m_ss_product.uploadSSProdPic(pageVariable.prodPicFile, function (pics) {
            addPicsToSSPicList(pics);
            generateSSSkuPic();
        });
    }
    else {
        var m_picurl = $.trim($("#txtProdPicUrl").val());
        var m_browserpicurl = $.trim($("#txtBrowserPicUrl").val());
        var m_sourcepicurl = $.trim($("#txtSourcePicUrl").val());
        if (!m_picurl || !m_browserpicurl || !m_sourcepicurl) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1134 + mlm.C0713);
            return;
        }
        var pics = [{ PicUrl: m_picurl, BrowsePicUrl: m_browserpicurl, SourcePicUrl: m_sourcepicurl, OtherProps: {}}];
        addPicsToSSPicList(pics);
        generateSSSkuPic();
    }

    pageVariable.uploadPicFrm.close();
}
/* 构建商品图片的表格 */
function constructPicTable(dataItem) {

    var m_picKey = dataItem.Product_Pic_Id;
    var m_picUrl = "";
    if (dataItem.PicUrl.indexOf("http://") > -1) {
        m_picUrl = dataItem.PicUrl;
    }
    else {
        m_picUrl = window.webLocation + dataItem.PicUrl;
    }

    var m_ctrl = $("<div></div>");

    var m_html = [];
    m_html.push("<div class='product-pic'>");
    m_html.push("<img src='" + m_picUrl + "' class='product-pic-img' onload='commoncore.func.positionCenterImg.call(this);' onerror='commoncore.func.failLoadImg.call(this);' />");
    m_html.push("</div>");

    m_ctrl.append(m_html.join(""));

    var m_str = "";


    if (dataItem.OtherProps.RelPValues) {
        m_str = dataItem.OtherProps.RelPValues;
    }
    else {
        if (dataItem.IsMain == "1") {
            m_str = mlm.C0262;
        }
        else {
            m_str = mlm.C0263;
        }
    }

    var m_lb_ctrl = $("<div class='lb-gray-symbol' style='margin: 2px' tag='" + m_str + "'></div>");
    var m_len = m_str.getBytesCount();
    if (m_len > 12) {
        m_str = m_str.substringByBytes(12) + "...";
        m_lb_ctrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
    }

    m_lb_ctrl.text(m_str);
    m_ctrl.append(m_lb_ctrl);

    if (dataItem.DetailTag) {
        m_ctrl.append("<div class='lb-gray-symbol' style='margin: 2px'>[" + dataItem.DetailTag + "]</div>");
    }

    m_ctrl.append("<div><a href='javascript:void(\"0\")' class='bt-link' onclick='openModifyPicFrm(\"" + m_picKey + "\");'>" + mlm.C0061 + "</a><a href='javascript:void(\"0\")' class='bt-link' onclick='openDelPicFrm(\"" + m_picKey + "\");'>" + mlm.C0062 + "</a></div>");

    return m_ctrl;
}
/* 打开修改上传图片的窗体 */
function openModifyPicFrm(key) {

    if (!pageVariable.modifyPicFrm) {
        pageVariable.modifyPicFrm = new uicontrol.dialog("modifyPicFrm", mlm.C0264, { width: 825 }, modifyPic);

        var m_setRelPValueCtrl = $("#btSetRelPValue");
        m_setRelPValueCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
        m_setRelPValueCtrl.click(openSetRelPValueFrm);
        $("#txtRelPValue").change(function () {
            var m_value = $.trim($(this).val());
            if (!m_value) {
                $(this).attr("tag", "");
            }
            else {
                var m_selectItems = pageVariable.ssPropList.dataSource.items.arrValues;

                var m_pvStruct = new datastruct.dictionary();
                $.each(m_selectItems, function () {
                    if (this.IsSku == "1") {
                        var m_pvalueids = this.ProdPValueIdRange.split(",");
                        var m_pvalues = this.ProdPValueRange.split(",");

                        var m_prop = this;
                        var i = 0;
                        $.each(m_pvalueids, function () {
                            if (Number(this) > 1000000) {
                                return;
                            }

                            m_pvStruct.setItem(m_pvalues[i].toUpperCase(), this);
                            i++;
                        });
                    }
                });

                var m_pvaluearr = [];
                var m_pvalueidarr = [];

                var m_pvs = m_value.split(",");
                $.each(m_pvs, function () {

                    var m_str = $.trim(this);
                    if (m_pvStruct.containKey(m_str.toUpperCase())) {
                        m_pvaluearr.push(m_str);
                        m_pvalueidarr.push(m_pvStruct.getItem(m_str.toUpperCase()));
                    }
                });

                $(this).val(m_pvaluearr.join(","));
                $(this).attr("tag", m_pvalueidarr.join(","));
            }
        });
    }

    var m_pic = pageVariable.ssPicList.getItem(key);

    $("#txtPicSeq").val(m_pic.Seq);
    $("#txtDetailTag").val(m_pic.DetailTag);
    var m_relpvCtrl = $("#txtRelPValue");
    m_relpvCtrl.val(m_pic.OtherProps.RelPValues);

    if (m_pic.RelPValueIds) {
        m_relpvCtrl.attr("tag", m_pic.RelPValueIds.join(","));
    }
    else {
        m_relpvCtrl.attr("tag", "");
    }

    pageVariable.modifyPicFrm.tempUploadPic_Id = key;
    pageVariable.modifyPicFrm.show();
}
/* 修改上传图片 */
function modifyPic() {
    var m_pic = pageVariable.ssPicList.getItem(pageVariable.modifyPicFrm.tempUploadPic_Id);
    var m_rpvid = $("#txtRelPValue").attr("tag");
    if (m_rpvid) {
        m_pic.RelPValueIds = m_rpvid.split(",");
        m_pic.OtherProps.RelPValues = $("#txtRelPValue").val();
    }
    else {
        m_pic.RelPValueIds = [];
        m_pic.OtherProps.RelPValues = "";
    }

    var m_pics = pageVariable.ssPicList.dataSource.items.arrValues;
    var m_seq = Number($("#txtPicSeq").val());

    if (m_seq > 0 && m_seq < m_pics.length + 1) {
        $.each(m_pics, function () {
            var m_thisSeq = Number(this.Seq);
            if (m_thisSeq > Number(m_pic.Seq)) {
                this.Seq = m_thisSeq - 1;
            }
        });

        $.each(m_pics, function () {
            var m_thisSeq = Number(this.Seq);
            if (m_thisSeq > m_seq || m_thisSeq == m_seq) {
                this.Seq = m_thisSeq + 1;
            }
        });

        m_pic.Seq = m_seq;
        m_pic.DetailTag = $.trim($("#txtDetailTag").val());
        if (m_pic.DetailTag) {
            m_pic.IsDetailPic = 1;
        }
        else {
            m_pic.IsDetailPic = 0;
        }

        if (!pageVariable.picSeqFunc) {
            pageVariable.picSeqFunc = function (a, b) {
                return Number(a.Seq) > Number(b.Seq) ? 1 : -1;
            };
        }
        m_pics.sort(pageVariable.picSeqFunc);

        var i = 0;
        $.each(m_pics, function () {
            if (i == 0) {
                this.IsMain = 1;
            }
            else {
                this.IsMain = 2;
            }
            i++;
        });
    }

    pageVariable.prodPicSource = m_pics;
    pageVariable.handlerSSProdFrm.ss_product.ProdPics = pageVariable.prodPicSource;

    loadProdPicsFromPage();
    generateSSSkuPic();
    pageVariable.modifyPicFrm.close();
}
/* 打开删除单个图片的窗体 */
function openDelPicFrm(key) {
    if (!pageVariable.delSingleUploadPicFrm) {
        pageVariable.delSingleUploadPicFrm = new uicontrol.confirmDelete(deletePic);
    }

    pageVariable.delSingleUploadPicFrm.tempUploadPic_Id = key;
    pageVariable.delSingleUploadPicFrm.showConfirm(mlm.C0266);
}
/* 删除单个图片 */
function deletePic() {
    var m_deleted = pageVariable.ssPicList.getItem(pageVariable.delSingleUploadPicFrm.tempUploadPic_Id);
    pageVariable.ssPicList.deleteData(m_deleted);

    pageVariable.prodPicSource = pageVariable.ssPicList.dataSource.items.arrValues;
    pageVariable.handlerSSProdFrm.ss_product.ProdPics = pageVariable.prodPicSource;
    generateSSSkuPic();
    pageVariable.delSingleUploadPicFrm.close();
}
/* 打开删除图片列表的窗体 */
function openDelUploadPicFrm() {
    if (!pageVariable.delUploadPicFrm) {
        pageVariable.delUploadPicFrm = new uicontrol.confirmDelete(deleteUploadPics);
    }

    pageVariable.delUploadPicFrm.showConfirm(mlm.C0265);
}
/* 删除图片列表 */
function deleteUploadPics() {
    clearPicList();
    pageVariable.prodPicSource = null;
    pageVariable.handlerSSProdFrm.ss_product.ProdPics = pageVariable.prodPicSource;
    generateSSSkuPic();
    pageVariable.delUploadPicFrm.close();
}
/* 清理图片列表(商品编辑窗体) */
function clearPicList() {
    pageVariable.ssPicList.bindSource(null);

    //修改商品列表的略缩图
    if (pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id && Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) < 1000000) {
        var m_product = pageVariable.productList.getItem(pageVariable.handlerSSProdFrm.ss_product_key);
        m_product.BrowsePicUrl = "";
        pageVariable.productList.modifyData(pageVariable.handlerSSProdFrm.ss_product_key, m_product);
    }
}
/* 打开设置关联SKU相关属性的窗体 */
function openSetRelPValueFrm() {
    if (!pageVariable.setRelPValueFrm) {
        pageVariable.setRelPValueFrm = new uicontrol.dialog("setRelPValueFrm", mlm.C0611 + mlm.C1042, { width: 800 }, setRelPValue);

        pageVariable.setRelPValueFrm.show();
        pageVariable.relPValueList = new uicontrol.tableList("relPValueList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        selectModel: "2",
                                        keyColumn: "PropValue_Id",
                                        columns: [{ display: mlm.C0631, name: "ProdPropName", width: 120, align: 'center' },
                                                { display: mlm.C0608, name: "PValue", width: 200, align: 'center'}]
                                    });
    }
    else {
        pageVariable.setRelPValueFrm.show();
    }

    var m_skuProps = [];
    var m_props = pageVariable.ssPropList.dataSource.items.arrValues;
    var m_relpvalues = $("#txtRelPValue").attr("tag");

    $.each(m_props, function () {
        if (this.IsSku == "1" && this.ProdPValueIdRange) {
            var m_pvalueids = this.ProdPValueIdRange.split(",");
            var m_pvalues = this.ProdPValueRange.split(",");

            var m_prop = this;
            var i = 0;
            $.each(m_pvalueids, function () {
                if (Number(this) > 1000000) {
                    return;
                }

                m_skuProps.push({ PropValue_Id: this, PValue: m_pvalues[i], ProdPropName: m_prop.ProdPropName });
                i++;
            });
        }
    });

    pageVariable.relPValueList.bindDataSource(null);
    $.each(m_skuProps, function () {
        pageVariable.relPValueList.addData(this.PropValue_Id, this);
    });

    var m_selecteditems = new datastruct.dictionary();
    if (m_relpvalues) {
        m_relpvalues = m_relpvalues.split(",");
        $.each(m_relpvalues, function () {
            m_selecteditems.setItem(this);
        });

        pageVariable.relPValueList.setSelectedItems(m_selecteditems);
    }
}
/* 设置关联SKU相关属性 */
function setRelPValue() {

    var m_selectItems = pageVariable.relPValueList.getSelectedItems();

    var m_pvalueIds = [];
    var m_pvalues = [];
    $.each(m_selectItems, function () {
        m_pvalueIds.push(this.PropValue_Id);
        m_pvalues.push(this.PValue);
    });

    $("#txtRelPValue").val(m_pvalues.join(","));
    $("#txtRelPValue").attr("tag", m_pvalueIds.join(","));

    pageVariable.setRelPValueFrm.close();
}
/* 生成Sku商品图片 */
function generateSSSkuPic() {
    var m_pics = pageVariable.handlerSSProdFrm.ss_product.ProdPics;
    var m_fstPic = m_pics[0];

    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        var m_skuobj = this;

        var m_pvstr = "_" + m_skuobj.PropValues + "_";

        var _index = 100;
        $.each(m_pics, function () {
            if (this.RelPValueIds && this.RelPValueIds.length > 0) {
                var _i = m_pvstr.lastIndexOf("_" + this.RelPValueIds.join("_") + "_");
                if (_index == 100 && _i > -1 && _i < _index) {
                    _index = _i;
                    m_skuobj.Product_Pic_Id = this.Product_Pic_Id == "0" ? this.TempUploadPic_Id : this.Product_Pic_Id;
                    m_skuobj.BrowsePicUrl = this.BrowsePicUrl;
                }
            }
        });

        if (_index == 100) {
            if (m_fstPic) {
                m_skuobj.Product_Pic_Id = m_fstPic.Product_Pic_Id == "0" ? m_fstPic.TempUploadPic_Id : m_fstPic.Product_Pic_Id;
                m_skuobj.BrowsePicUrl = m_fstPic.BrowsePicUrl;
            }
            else {
                m_skuobj.Product_Pic_Id = 0;
                m_skuobj.BrowsePicUrl = "";
            }
        }
    });

    pageVariable.rebindInnerProdList = true;
}
/* 生成销售价格数据 */
function generateSSSalePrice() {
    var m_saleprices = pageVariable.handlerSSProdFrm.ss_product.SalePrices;
    var m_spdict = new datastruct.dictionary();
    var m_spiddict = new datastruct.dictionary();

    if (m_saleprices) {
        $.each(m_saleprices, function () {
            m_spdict.setItem(this.SkuProps, this);
            m_spiddict.setItem(this.SS_InnerProd_Id, this);
        });
    }

    pageVariable.handlerSSProdFrm.ss_product.SalePrices = [];
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        var m_key = this.SkuProps;

        var m_saleprice_item = m_spiddict.getItem(this.SS_InnerProd_Id);
        if (m_saleprice_item == null) {
            m_saleprice_item = {};
            m_saleprice_item.SS_InnerProd_Id = this.SS_InnerProd_Id;
            m_saleprice_item.ListPrice = 0;
            m_saleprice_item.Discount = 1;
            m_saleprice_item.SalePrice = 0;
            m_saleprice_item.PurchaseCost = 0;
            m_saleprice_item.TransCost = 0;
            m_saleprice_item.OtherCost = 0;
            m_saleprice_item.SkuProps = this.SkuProps;
        }
        else {
            m_saleprice_item.SkuProps = this.SkuProps;
            m_saleprice_item.SS_InnerProd_Id = this.SS_InnerProd_Id;
        }

        pageVariable.handlerSSProdFrm.ss_product.SalePrices.push(m_saleprice_item);
    });
}
/* 添加图片到列表中 */
function addPicsToSSPicList(pics) {
    if (pics) {
        var m_length = pics.length;

        $.each(pics, function () {
            this.Seq = pageVariable.ssPicList.dataSource.items.arrValues.length + 1;
            this.Product_Pic_Id = 1000000 + this.Seq;
            this.IsMain = this.Seq == "1" ? "1" : "2";
            pageVariable.ssPicList.addData(this);
        });

        pageVariable.prodPicSource = pageVariable.ssPicList.dataSource.items.arrValues;
        pageVariable.handlerSSProdFrm.ss_product.ProdPics = pageVariable.prodPicSource;

        if (Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) < 1000000 && m_length > 0) {
            //修改商品列表的略缩图
            var m_ss_product = pageVariable.productList.getItem(pageVariable.handlerSSProdFrm.ss_product_key);
            m_ss_product.BrowsePicUrl = pageVariable.prodPicSource[0].BrowsePicUrl;

            pageVariable.productList.modifyData(pageVariable.handlerSSProdFrm.ss_product_key, m_ss_product);
        }
    }
}
/* 打开设置商品定价的窗体 */
function openSetSalePriceFrm() {
    if (!pageVariable.handlerSalePriceFrm) {
        pageVariable.handlerSalePriceFrm = new uicontrol.dialog("handlerSalePriceFrm", mlm.C0611 + mlm.C1096, { width: 900, position: ["auto", 25] }, saveSalePrice);

        $("#txtListPrice, #txtDiscount").change(function () {
            var m_listprice = Number($("#txtListPrice").val());
            var m_discount = Number($("#txtDiscount").val()) / 100;

            $("#txtSalePrice").val((m_listprice * m_discount).toFixed(2));
        });
        $("#txtSalePrice").change(function () {
            var m_listprice = Number($("#txtListPrice").val());
            var m_saleprice = Number($("#txtSalePrice").val());

            $("#txtDiscount").val((m_saleprice / m_listprice).toFixed(2) * 100);
        });
    }

    pageVariable.handlerSalePriceFrm.show();

    var m_currcode = pageVariable.handlerSSProdFrm.ss_product.CurrCode.toString();
    $("#lbCurr_1, #lbCurr_2, #lbCurr_5").text(m_currcode);

    var m_key = $(this).attr("tag");
    if (m_key) {
        var m_obj = pageVariable.salePriceList.getItem(m_key);

        $("#dvSkuForPrice").show();

        $("#lbSKU").text(m_obj.SkuProps);
        $("#txtDiscount").val(Number(m_obj.Discount) * 100);
        $("#txtListPrice").val(Number(m_obj.ListPrice).toFixed(2));
        $("#txtSalePrice").val(Number(m_obj.SalePrice).toFixed(2));
        $("#txtSSTransCost").val((Number(m_obj.TransCost) * 100).toFixed(2));
        $("#txtSSOtherCost").val(Number(m_obj.OtherCost).toFixed(2));

        pageVariable.handlerSalePriceFrm.ss_saleprice = m_obj;
    }
    else {
        $("#dvSkuForPrice").hide();
        $("#txtDiscount").val("100");
        $("#txtListPrice").val("0.00");
        $("#txtSalePrice").val("0.00");
        $("#txtSSTransCost").val("0");
        $("#txtSSOtherCost").val("0.00");

        pageVariable.handlerSalePriceFrm.ss_saleprice = null;
    }
}
/* 保存商品价格 */
function saveSalePrice() {

    var m_discount = Number($("#txtDiscount").val()) / 100;
    var m_saleprice = Number($("#txtSalePrice").val());
    var m_listprice = Number($("#txtListPrice").val());
    if (m_saleprice > m_listprice) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1097);
        return false;
    }

    if (pageVariable.handlerSalePriceFrm.ss_saleprice) {
        pageVariable.handlerSalePriceFrm.ss_saleprice.SalePrice = m_saleprice;
        pageVariable.handlerSalePriceFrm.ss_saleprice.ListPrice = m_listprice;
        pageVariable.handlerSalePriceFrm.ss_saleprice.Discount = m_discount;
        pageVariable.handlerSalePriceFrm.ss_saleprice.OtherCost = $("#txtSSOtherCost").val();
        pageVariable.handlerSalePriceFrm.ss_saleprice.TransCost = Number($("#txtSSTransCost").val()) / 100;

        pageVariable.salePriceList.modifyData(pageVariable.handlerSalePriceFrm.ss_saleprice.SS_InnerProd_Id, pageVariable.handlerSalePriceFrm.ss_saleprice);
    }
    else {
        $.each(pageVariable.salePriceList.dataSource.items.arrValues, function () {
            this.SalePrice = m_saleprice;
            this.ListPrice = m_listprice;
            this.Discount = m_discount;
            this.OtherCost = $("#txtSSOtherCost").val();
            this.TransCost = Number($("#txtSSTransCost").val()) / 100;

            pageVariable.salePriceList.modifyData(this.SS_InnerProd_Id, this);
        });
    }

    pageVariable.handlerSalePriceFrm.close();

    pageVariable.isChangeSSProd = true;
}

/* 打开新增商品的窗体 */
function openNewSSProdFrm() {

    if (!pageVariable.pdcTree.selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1114);
        return;
    }

    initHandlerSSProdFrm();

    var m_stateCtrl = $("#ddlSSState");
    m_stateCtrl.empty();
    m_stateCtrl.append("<option value='1'>" + mlm.C0399 + "</option>");
    m_stateCtrl.append("<option value='2'>" + mlm.C0350 + "</option>");

    pageVariable.handlerSSProdFrm.ss_product_key = null;
    pageVariable.handlerSSProdFrm.ss_product = {};

    pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id = 1000001;
    pageVariable.handlerSSProdFrm.ss_product.ProdName = "";
    pageVariable.handlerSSProdFrm.ss_product.Unit = "";
    pageVariable.handlerSSProdFrm.ss_product.Tags = ""; 
    pageVariable.handlerSSProdFrm.ss_product.Remark = "";
    pageVariable.handlerSSProdFrm.ss_product.IsStyleHtmlTag = 0;
    pageVariable.handlerSSProdFrm.ss_product.PdcObjs = [];
    pageVariable.handlerSSProdFrm.ss_product.State = 1; 
    pageVariable.handlerSSProdFrm.ss_product.Brand_Id = 0;
    pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit = 0;
    pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit = 0;
    pageVariable.handlerSSProdFrm.ss_product.BrandName = "";
    pageVariable.handlerSSProdFrm.ss_product.WUnit = saleplatform.currObj.WUnit;
    pageVariable.handlerSSProdFrm.ss_product.PdcObjs = [];
    pageVariable.handlerSSProdFrm.ss_product.PdcObjs.push({ SS_ProdCategory_Id: pageVariable.pdcTree.selectedItem.key });
    pageVariable.handlerSSProdFrm.ss_product.SalePlatform_Id = saleplatform.currSalePlatformId;
    pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    pageVariable.handlerSSProdFrm.ss_product.SPfName = saleplatform.currObj.SPfName;
    pageVariable.handlerSSProdFrm.ss_product.SaleSiteName = saleplatform.currObj.SaleSiteName;
    pageVariable.handlerSSProdFrm.ss_product.SysWeightUnit_Id = saleplatform.currObj.SysWeightUnit_Id;
    pageVariable.handlerSSProdFrm.ss_product.SysCurrency_Id = saleplatform.currObj.SysCurrency_Id;
    pageVariable.handlerSSProdFrm.ss_product.CurrSymbol = saleplatform.currObj.CurrSymbol;
    pageVariable.handlerSSProdFrm.ss_product.CurrCode = saleplatform.currObj.CurrCode;
    pageVariable.handlerSSProdFrm.ss_product.OtherProps = {};
    pageVariable.handlerSSProdFrm.ss_product.OtherProps.PdcName = pageVariable.pdcTree.getTextValue(pageVariable.pdcTree.selectedItem.key, true);
    pageVariable.handlerSSProdFrm.ss_product.OtherProps.WeightRate = saleplatform.currObj.WeightRate;
    pageVariable.handlerSSProdFrm.ss_product.OtherProps.CurrRate = saleplatform.currObj.CurrRate;

    var m_pvid_temps = new datastruct.dictionary();
    pageVariable.handlerSSProdFrm.ss_product.DefinedProps = {};
    pageVariable.handlerSSProdFrm.ss_product.PropTable = [];
    pageVariable.handlerSSProdFrm.ss_product.ProdPics = [];
    pageVariable.handlerSSProdFrm.ss_product.InnerProds = [];
    pageVariable.handlerSSProdFrm.ss_product.SalePrices = [];
    pageVariable.handlerSSProdFrm.ss_product.ExpDict = new datastruct.dictionary();
    pageVariable.handlerSSProdFrm.ss_product.ExpServices = [];
    pageVariable.handlerSSProdFrm.ss_product.Gifts = [];

    var m_expfunc = function () {
        pageVariable.handlerSSProdFrm.ss_product.ExpServices = pageVariable.handlerSSProdFrm.ExpServiceSource;

        $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
            var m_globalservices = pageVariable.handlerSSProdFrm.ss_product.ExpDict.getItem(this.GlobalArea_Id);

            if (!m_globalservices) {
                m_globalservices = [];
                pageVariable.handlerSSProdFrm.ss_product.ExpDict.setItem(this.GlobalArea_Id, m_globalservices);
            }

            this.GlobalAreaNames = null;
            this.State = 1;
            m_globalservices.push(this);
        });
    };

    if (!pageVariable.handlerSSProdFrm.ExpServiceSource) {
        var m_expressservice = new sm.expressservice();
        m_expressservice.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
        m_expressservice.queryAreaExpressService(function (retTable) {

            pageVariable.handlerSSProdFrm.ExpServiceSource = datastruct.convertion.tableToJson(retTable);

            m_expfunc();
        });
    }
    else {
        m_expfunc();
    }

    generateSSInnerProds();
    generateSSSalePrice();

    fillProdForM();

    fillProps(pageVariable.ssPropList, pageVariable.selPdcNav.pdcId);

    pageVariable.expAreaTree = null;
    pageVariable.isChangeSSProd = false;
    pageVariable.handlerSSProdFrm.action = "New";
    pageVariable.handlerSSProdFrm.setTitle(mlm.C0170);
}
/* 打开修改商品的窗体 */
function openModifySSProdFrm() {
    initHandlerSSProdFrm();

    var m_key = $(this).attr("tag");
    pageVariable.handlerSSProdFrm.ss_product_key = m_key;
    pageVariable.handlerSSProdFrm.ss_product = pageVariable.productList.getItem(m_key);

    pageframe.control.processCtrl.showOperaProcess();

    var m_ss_product = new sm.ss_product();
    m_ss_product.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
    m_ss_product.readSS_Product(function (retObj) {

        fillUIObjFromProd(retObj);

        fillProdForM();
    });

    pageVariable.expAreaTree = null;
    pageVariable.isChangeSSProd = false;
    pageVariable.handlerSSProdFrm.action = "Modify";
    pageVariable.handlerSSProdFrm.setTitle(mlm.C0190);
}
/* 商品对象转换到ui对象 */
function fillUIObjFromProd(retObj, afterevent) {
    pageVariable.handlerSSProdFrm.ss_product = retObj;
    pageVariable.handlerSSProdFrm.ss_product = $.extend(pageVariable.handlerSSProdFrm.ss_product, retObj.OtherProps);

    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {

        $.each(this.SkuProducts, function () {
            if (this.OtherProps.SkuProps) {
                this.InnerProd = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName + " - [" + this.OtherProps.SkuProps + "]";
            }
            else {
                this.InnerProd = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName;
            }
            this.SkuProps = this.OtherProps.SkuProps;
            this.ProdCode = this.OtherProps.ProdCode;
            this.Product = this.OtherProps;
            this.Product_Id = this.OtherProps.Product_Id;
        });

        if (this.Product_Pic_Id != "0") {
            //            var m_pic = m_picdict.getItem(this.Product_Pic_Id);
            //            this.BrowsePicUrl = m_pic.BrowsePicUrl;

            this.BrowsePicUrl = this.OtherProps.BrowsePicUrl;
        }

        this.SkuProps = this.OtherProps.SkuProps;
    });

    $.each(pageVariable.handlerSSProdFrm.ss_product.SalePrices, function () {
        this.SkuProps = this.OtherProps.SkuProps;
    });

    $.each(pageVariable.handlerSSProdFrm.ss_product.Gifts, function () {
        $.each(this.Items, function () {
            if (this.OtherProps.SkuProps) {
                this.InnerProd = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName + " - [" + this.OtherProps.SkuProps + "]";
            }
            else {
                this.InnerProd = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName;
            }
            this.SkuProps = this.OtherProps.SkuProps;
            this.ProdCode = this.OtherProps.ProdCode;
            this.Product = this.OtherProps;
            this.Product_Id = this.OtherProps.Product_Id;
        });
        this.Weight = this.OtherProps.Weight;
        this.Cost = this.OtherProps.Cost;
    });

    var j = 1;
    $.each(pageVariable.handlerSSProdFrm.ss_product.PropTable, function () {
        this.Seq = j;
        j++;
    });
    var m_pdcIds = [];
    $.each(pageVariable.handlerSSProdFrm.ss_product.PdcObjs, function () {
        m_pdcIds.push(this.SS_ProdCategory_Id);
    });
    pageVariable.ssPropList.bindDataSource(pageVariable.handlerSSProdFrm.ss_product.PropTable);
    fillProps(pageVariable.ssPropList, m_pdcIds);

    pageVariable.handlerSSProdFrm.ss_product.ExpDict = new datastruct.dictionary();
    var m_ssprodexpservices = new datastruct.dictionary();
    $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
        m_ssprodexpservices.setItem(this.GlobalArea_Id + "-" + this.ExpressService_Id, this);
    });

    var m_expfunc = function () {
        pageVariable.handlerSSProdFrm.ss_product.ExpServices = pageVariable.handlerSSProdFrm.ExpServiceSource;

        $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
            var m_globalservices = pageVariable.handlerSSProdFrm.ss_product.ExpDict.getItem(this.GlobalArea_Id);

            if (!m_globalservices) {
                m_globalservices = [];
                pageVariable.handlerSSProdFrm.ss_product.ExpDict.setItem(this.GlobalArea_Id, m_globalservices);
            }

            var m_expservice = m_ssprodexpservices.getItem(this.GlobalArea_Id + "-" + this.ExpressService_Id);
            if (m_expservice) {
                this.FstCharge = m_expservice.FstCharge;
                this.IncreaseCharge = m_expservice.IncreaseCharge;
                this.State = m_expservice.State;
            }
            else {
                this.State = 1;
            }

            this.GlobalAreaNames = null;
            m_globalservices.push(this);
        });

        if (afterevent) {
            afterevent();
        }
        else {
            //隐藏进度
            pageframe.control.processCtrl.hideOperaProcess();
        }
    };

    if (!pageVariable.handlerSSProdFrm.ExpServiceSource) {
        var m_expressservice = new sm.expressservice();
        m_expressservice.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
        m_expressservice.queryAreaExpressService(function (retTable) {

            pageVariable.handlerSSProdFrm.ExpServiceSource = datastruct.convertion.tableToJson(retTable);

            m_expfunc();
        });
    }
    else {
        m_expfunc();
    }

    pageVariable.rebindInnerProdList = true;
    pageVariable.rebindSalePriceList = true;
}
/* 设置商品修改窗体的信息 */
function fillProdForM() {
    $("#txtSSProdName").val(pageVariable.handlerSSProdFrm.ss_product.ProdName.replace(/\^/g, "\"").replace(/\~/g, "\'"));
    $("#txtSSProdCode").val(pageVariable.handlerSSProdFrm.ss_product.ProdCode);
    $("#txtSSUnit").val(pageVariable.handlerSSProdFrm.ss_product.Unit);
    pageVariable.ddlStyleHtmlTag.setSelectedItem([{ key: pageVariable.handlerSSProdFrm.ss_product.IsStyleHtmlTag}]);

    if (!pageVariable.handlerSSProdFrm.ss_product.Remark) {
        $("#ssProdHtmlTool").attr("tag", "none"); 
        $("#ssProdHtmlTool").val("");
    }
    else {
        $("#ssProdHtmlTool").val(pageVariable.handlerSSProdFrm.ss_product.Remark.replace(/\^/g, "\"").replace(/\~/g, "\'"));
    }
    
    $("#ssProdTagsTool").val(pageVariable.handlerSSProdFrm.ss_product.Tags.replace(/\^/g, "\"").replace(/\~/g, "\'"));
    $("#ddlSSState").val(pageVariable.handlerSSProdFrm.ss_product.State);
    $("#txtGiftWeight").val(Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit).toFixed(3));
    $("#txtGiftCost").val(Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit).toFixed(2));
    pageVariable.selPdcNav.clear();

    var m_stateCtrl = $("#ddlSSState");
    m_stateCtrl.empty();
    //未发布
    if (pageVariable.handlerSSProdFrm.ss_product.State == 1) {
        m_stateCtrl.append("<option value='1'>" + mlm.C0399 + "</option>");
        m_stateCtrl.append("<option value='2'>" + mlm.C0350 + "</option>");
    }
    else if (pageVariable.handlerSSProdFrm.ss_product.State == 2) {
        m_stateCtrl.append("<option value='2'>" + mlm.C0350 + "</option>");
        m_stateCtrl.append("<option value='3'>" + mlm.C1025 + "</option>");
    }
    else if (pageVariable.handlerSSProdFrm.ss_product.State == 3) {
        m_stateCtrl.append("<option value='3'>" + mlm.C1025 + "</option>");
        m_stateCtrl.append("<option value='2'>" + mlm.C0350 + "</option>");
    }
    else if (pageVariable.handlerSSProdFrm.ss_product.State == 4) {
        m_stateCtrl.append("<option value='4'>" + "修订中" + "</option>");
        m_stateCtrl.append("<option value='3'>" + mlm.C1025 + "</option>");
    }

    $("#lbSSWUnit, #lbGiftWUnit, #lbExpWUnit").text(pageVariable.handlerSSProdFrm.ss_product.WUnit.toString());
    $("#lbCurr_6").text(pageVariable.handlerSSProdFrm.ss_product.CurrCode.toString());

    pageVariable.ssPropList.bindDataSource(pageVariable.handlerSSProdFrm.ss_product.PropTable);

    pageVariable.selPdcNav.pdcSource = null;
    pageVariable.selPdcNav.shoppingSiteId = pageVariable.handlerSSProdFrm.ss_product.SalePlatform_Id.toString();
    pageVariable.selPdcNav.salesite_id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id.toString();

    pageVariable.selSSBrand.setBrand({ Brand_Id: pageVariable.handlerSSProdFrm.ss_product.Brand_Id, BrandName: pageVariable.handlerSSProdFrm.ss_product.BrandName });

    if (pageVariable.handlerSSProdFrm.ss_product.PdcObjs.length > 0) {
        var m_pdcIds = [];
        $.each(pageVariable.handlerSSProdFrm.ss_product.PdcObjs, function () {
            m_pdcIds.push(this.SS_ProdCategory_Id);
        });
        pageVariable.selPdcNav.setPdc({ ProdCategory_Id: m_pdcIds, PdcName: pageVariable.handlerSSProdFrm.ss_product.OtherProps.PdcName });
    }

    $("#lbExpWeight").text("0.000");

    var m_expvolumnCtrl = $("#lbExpVolume");
    m_expvolumnCtrl.text("0");
    m_expvolumnCtrl.attr("tag", "0");

    pageVariable.ssPicList.bindSource(null);
    if (pageVariable.innerProdList) {
        pageVariable.innerProdList.bindDataSource(null);
    }
    if (pageVariable.expServiceList) {
        pageVariable.expServiceList.bindDataSource(null);
    }
    if (pageVariable.salePriceList) {
        pageVariable.salePriceList.bindDataSource(null);
    }
    if (pageVariable.prodProfitList) {
        pageVariable.prodProfitList.bindDataSource(null);
    }
    if (pageVariable.giftList) {
        pageVariable.giftList.bindDataSource(null);
        pageVariable.rebindGiftList = true;
    }
}
/* 打开删除商品的窗体 */
function openDelSSProdFrm() {
    if (!pageVariable.delSSProductFrm) {
        pageVariable.delSSProductFrm = new uicontrol.confirmDelete(deleteSSProd);
    }

    var m_key = $(this).attr("tag");
    var m_ss_product = pageVariable.productList.getItem(m_key);
    pageVariable.delSSProductFrm.ss_product_id = m_ss_product.SS_Product_Id;

    pageVariable.delSSProductFrm.showConfirm(mlm.C0192 + "(" + m_ss_product.ProdName + ")");
}
/* 设置属性到商品中 */
function setPropToProduct(m_product, m_props) {
    m_product.SKUProps = {};
    m_product.ExpandProps = {};

    var m_prodproperty_ids = [];
    $.each(m_props, function () {
        if (this.ProdPValueIdRange) {
            if (this.IsSku == "1") {
                m_product.SKUProps[this.ProdProperty_Id] = this.ProdPValueIdRange;
            }
            else {
                m_product.ExpandProps[this.ProdProperty_Id] = this.ProdPValueIdRange;
            }

            m_prodproperty_ids.push(this.ProdProperty_Id);
        }
    });
    if (m_prodproperty_ids.length > 0) {
        m_product.ProdProperty_Ids = ";" + m_prodproperty_ids.join(";") + ";";
    }
    m_product.DefinedProps = pageVariable.definedProps;
}
/* 修改销售信息 */
function saveSSProd(event, failevent) {

    var m_ss_product = new sm.ss_product();

    m_ss_product.SalePlatform_Id = pageVariable.handlerSSProdFrm.ss_product.SalePlatform_Id.toString();
    m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id.toString();

    m_ss_product.ProdName = $.trim($("#txtSSProdName").val()).replace(/"/g, "^").replace(/'/g, "~");

    if (!m_ss_product.ProdName) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0195);
        $("#lbSSProdSymbol").trigger("click");
        return false;
    }

    m_ss_product.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
    m_ss_product.ProdCode = $.trim($("#txtSSProdCode").val());
    m_ss_product.Unit = $.trim($("#txtSSUnit").val());
    m_ss_product.GiftCostLimit = $("#txtGiftCost").val();
    m_ss_product.GiftWeightLimit = $("#txtGiftWeight").val();

    var m_remarlctrl = $("#ssProdHtmlTool");
    if (m_remarlctrl.attr("tag") == "submit") {
        m_ss_product.Remark = $.trim(m_remarlctrl.val()).replace(/"/g, "^").replace(/'/g, "~");
    }
    else {
        m_ss_product.Remark = "-1";
    }
    m_ss_product.Tags = $.trim($("#ssProdTagsTool").val()).replace(/"/g, "^").replace(/'/g, "~");
    m_ss_product.ProdPics = pageVariable.handlerSSProdFrm.ss_product.ProdPics;
    m_ss_product.State = $("#ddlSSState").val();
    m_ss_product.Brand_Id = !pageVariable.selSSBrand.brandId ? 0 : pageVariable.selSSBrand.brandId;

    var m_selectedstylehtm = pageVariable.ddlStyleHtmlTag.getSelectedItem();
    if (m_selectedstylehtm) {
        m_ss_product.IsStyleHtmlTag = m_selectedstylehtm[0];
    }

    m_ss_product.PdcObjs = [];
    if (pageVariable.selPdcNav.pdcId instanceof Array) {
        $.each(pageVariable.selPdcNav.pdcId, function () {
            var m_pdcSeqItem = { SS_Product_Id: m_ss_product.SS_Product_Id, SS_ProdCategory_Id: Number(this) };
            m_ss_product.PdcObjs.push(m_pdcSeqItem);
        });
    }
    else {
        if (pageVariable.selPdcNav.pdcId) {
            var m_pdcSeqItem = { SS_Product_Id: m_ss_product.SS_Product_Id, SS_ProdCategory_Id: pageVariable.selPdcNav.pdcId };
            m_ss_product.PdcObjs.push(m_pdcSeqItem);
        }
    }

    if (m_ss_product.PdcObjs.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1088);
        $("#lbSSProdSymbol").trigger("click");
        return false;
    }

    var m_abort = false;
    var m_props = pageVariable.ssPropList.dataSource.items.arrValues;
    $.each(m_props, function () {
        if (m_abort) {
            return;
        }

        if (this.IsSku == "1") {
            var m_propValues = this.ProdPValueIdRange;
            if (!m_propValues || m_propValues.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(this.ProdPropName + mlm.C0193);
                $("#lbSSProdSymbol").trigger("click");
                m_abort = true;
            }
        }
    });

    if (m_abort) {
        return false;
    }

    setPropToProduct(m_ss_product, m_props);

    var m_availableprod = true;
    m_ss_product.InnerProds = {};
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        var m_newobj = $.extend(true, {}, this);

        if (!this.SkuProducts || this.SkuProducts.length == 0) {
            m_availableprod = false;
        }
        else {
            $.each(m_newobj.SkuProducts, function () {
                this.OtherProps = null;
                this.Product = null;
            });
        }
        m_newobj.OtherProps = null;
        m_ss_product.InnerProds[this.PropValues] = m_newobj;
    });

    if (!m_availableprod) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1089);
        return false;
    }

    m_ss_product.SalePrices = $.extend(true, [], pageVariable.handlerSSProdFrm.ss_product.SalePrices);

    var m_wv = calExpSrvWeightAndVolumn();
    m_ss_product.ExpServices = [];
    $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
        if (this.MaxWeight > m_wv.Weight && (this.State == 2 || Number(this.FstCharge) > 0 || Number(this.IncreaseCharge) > 0)) {
            var m_expitem = {};
            m_expitem.SS_ExpService_Id = this.SS_ExpService_Id;
            m_expitem.SS_Product_Id = this.SS_Product_Id;
            m_expitem.SalePlatform_Id = this.SalePlatform_Id;
            m_expitem.SaleSite_Id = this.SaleSite_Id;
            m_expitem.GlobalArea_Id = this.GlobalArea_Id;
            m_expitem.ExpressService_Id = this.ExpressService_Id;
            m_expitem.FstCharge = this.FstCharge;
            m_expitem.IncreaseCharge = this.IncreaseCharge;
            m_expitem.State = this.State;

            m_ss_product.ExpServices.push(m_expitem);
        }
    });

    m_ss_product.Gifts = [];
    $.each(pageVariable.handlerSSProdFrm.ss_product.Gifts, function () {
        $.each(this.Items, function () {
            this.OtherProps = null;
            this.Product = null;
        });
        this.OtherProps = null;

        m_ss_product.Gifts.push(this);
    });

    pageVariable.handlerSSProdFrm.ss_product.ExpDict = null;
    pageVariable.handlerSSProdFrm.ss_product.OtherProps = null;
    pageVariable.handlerSSProdFrm.ss_product.PropTable = null;

    if (pageVariable.handlerSSProdFrm.action == "New") {
        m_ss_product.newSS_Product(function (retObj) {
            if (event) {
                event(retObj);
            }
        }, function (err) {
            commoncore.func.dealError(err);
            if (failevent) {
                failevent();
            }
        });
    }
    else {
        m_ss_product.modifySS_Product(function (retObj) {
            if (event) {
                event(retObj);
            }
        }, function (err) {
            commoncore.func.dealError(err);
            if (failevent) {
                failevent();
            }
        });
    }

    pageVariable.isChangeSSProd = false;

    //清理属性缓存
    pageVariable.prodPValueCache.clear();

    return true;
}
/* 删除销售信息 */
function deleteSSProd() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SS_Product_Id = pageVariable.delSSProductFrm.ss_product_id;
    m_ss_product.deleteSS_Product(function () {

        $.each(pageVariable.productList.dataSource.items.arrValues, function () {
            if (this.SS_Product_Id == m_ss_product.SS_Product_Id) {
                pageVariable.productList.deleteData(this.SS_Product_Key, function (leavedItem) {
                    leavedItem.Seq = leavedItem.Seq - 1;
                });
            }
        });

        pageVariable.delSSProductFrm.close();
    });
}

/* 展示销售商品的Tab项 */
function showSSProdTab(event, ui) {
    if (ui.index == 1) {
        if (pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id < 1000001 && !pageVariable.handlerSSProdFrm.ss_product.isLoadProdPics) {

            pageVariable.handlerSSProdFrm.ss_product.isLoadProdPics = true;

            var m_ss_product = new sm.ss_product();
            m_ss_product.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
            m_ss_product.readSSProductPic(function (retObj) {
                pageVariable.handlerSSProdFrm.ss_product.ProdPics = retObj.ProdPics;
                loadSSProdPics();
            });
        }
        else {
            loadSSProdPics();
        }
    }
    else if (ui.index == 2) {
        if (pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id < 1000001 && !pageVariable.handlerSSProdFrm.ss_product.isLoadRemark) {

            pageVariable.handlerSSProdFrm.ss_product.isLoadRemark = true;

            var m_ss_product = new sm.ss_product();
            m_ss_product.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
            m_ss_product.readSSProductRemark(function (retObj) {
                pageVariable.handlerSSProdFrm.ss_product.Remark = retObj.Remark;
                $("#ssProdHtmlTool").val(retObj.Remark);
            });
        }
    }
    else if (ui.index == 3) {
        if (!pageVariable.innerProdList) {
            pageVariable.innerProdList = new uicontrol.tableList("innerProdList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 350,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: constructSkuProdPicCell },
                                                { display: mlm.C0174, name: "SkuProps", width: 120, align: 'left' },
                                                { display: mlm.C1205, name: "ProdCode", width: 120, align: 'center', adjust: true, createCell: constructSS_ProdCodeCell },
                                                { display: mlm.C1251, name: "", width: 100, align: 'left', adjust: true, createCell: constructSSBoxWV },
                                                { display: mlm.C1247, name: "PackageWeight", width: 75, align: 'right', adjust: true, createCell: constructSSPackageWeight },
                                                { display: mlm.M0012, name: "", width: 300, align: 'left', adjust: true, createCell: constructSS_SkuProdCell },
                                                { display: mlm.C0019, name: "", width: 90, align: 'center', adjust: true, createCell: constructSSInnerProdOperaCell}]
                                    });

            var m_itemarr = [];
            $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
                m_itemarr.push(this);
            });
            m_itemarr.sort(sortProdProp);
            pageVariable.innerProdList.bindDataSource(m_itemarr);

            pageVariable.rebindInnerProdList = false;
        }
        else {
            if (pageVariable.rebindInnerProdList) {
                var m_itemarr = [];
                $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
                    m_itemarr.push(this);
                });
                m_itemarr.sort(sortProdProp);
                pageVariable.innerProdList.bindDataSource(m_itemarr);

                pageVariable.rebindInnerProdList = false;
            }
        }
    }
    else if (ui.index == 4) {
        var m_wv = calExpSrvWeightAndVolumn();

        $("#lbExpWeight").text(Number(m_wv.Weight).toFixed(3));

        var m_expvolumnCtrl = $("#lbExpVolume");
        m_expvolumnCtrl.text(m_wv.BoxLength + "*" + m_wv.BoxWidth + "*" + m_wv.BoxHeight);
        m_expvolumnCtrl.attr("tag", Number(m_wv.BoxLength) * Number(m_wv.BoxWidth) * Number(m_wv.BoxHeight));

        var m_customCtrl = $("#lbCustomValue");
        m_customCtrl.attr("tag", Number(m_wv.CustomValue).toFixed(2));
        m_customCtrl.html(commoncore.func.getCurrHtml("$", Number(m_wv.CustomValue).toFixed(2)));

        loadExpAreaTree();
    }
    else if (ui.index == 5) {
        if (!pageVariable.salePriceList) {
            pageVariable.salePriceList = new uicontrol.tableList("salePriceList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 350,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0174, name: "SkuProps", width: 150, align: 'left' },
                                                { display: mlm.C1064, name: "PurchaseCost", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C1057, name: "OtherCost", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C1056, name: "TransCost", width: 80, align: 'right', adjust: true, createCell: constructSS_DiscountCell },
                                                { display: mlm.C0204, name: "ListPrice", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C1058, name: "Discount", width: 80, align: 'right', adjust: true, createCell: constructSS_DiscountCell },
                                                { display: mlm.C1059, name: "SalePrice", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, createCell: constructSSSalePricdOperaCell}]
                                    });

            loadSSSalePrice();
            pageVariable.rebindSalePriceList = false;
        }
        else {
            if (pageVariable.rebindSalePriceList) {
                loadSSSalePrice();
                pageVariable.rebindSalePriceList = false;
            }
        }
    }
    else if (ui.index == 6) {

        if (!pageVariable.giftList) {
            $("#btAddGift").click(openNewGiftFrm);

            pageVariable.giftList = new uicontrol.tableList("giftList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "SS_Gift_Id",
                                        columns: [{ display: mlm.C1062, name: "GiftName", width: 200, align: 'left', adjust: true, createCell: constructGiftNameCell },
                                                { display: mlm.M0012, name: "", width: 450, align: 'left', adjust: true, createCell: constructGiftItemCell },
                                                { display: mlm.C1247, name: "Weight", width: 75, align: 'right', adjust: true, createCell: constructGiftWeightCell },
                                                { display: mlm.M0017, name: "Cost", width: 75, align: 'right', adjust: true, createCell: constructGiftCostCell },
                                                { display: mlm.C0019, name: "", width: 70, align: 'center', adjust: true, createCell: constructGiftOperaCell}]
                                    });
            loadGifts();
            pageVariable.rebindGiftList = false;
        }
        else {
            if (pageVariable.rebindGiftList) {
                loadGifts();
                pageVariable.rebindGiftList = false;
            }
        }
    }
    else if (ui.index == 7) {

        /* 显示进度 */
        pageframe.control.processCtrl.showOperaProcess();

        if (pageVariable.isChangeSSProd) {

            var isok = saveSSProd(function (retObj) {
                var m_jsonobj = datastruct.convertion.tableToJson(retObj)[0];
                var m_ss_product = new sm.ss_product();
                m_ss_product.SS_Product_Id = m_jsonobj.SS_Product_Id;
                m_ss_product.readSS_Product(function (retObj) {

                    fillUIObjFromProd(retObj);

                    fillProdForM();

                    loadAPExpAreaTree();
                });

                if (pageVariable.handlerSSProdFrm.action == "New") {
                    pageVariable.productList.addData(m_jsonobj.SS_Product_Key, m_jsonobj);
                }

                pageVariable.handlerSSProdFrm.ss_product_key = m_jsonobj.SS_Product_Id;
                pageVariable.handlerSSProdFrm.ss_product = m_jsonobj;
                pageVariable.handlerSSProdFrm.action = "Modify";
                pageVariable.handlerSSProdFrm.setTitle(mlm.C0190);
            });

            if (!isok) {
                $("#lbSSProdSymbol").trigger("click");

                //隐藏进度
                pageframe.control.processCtrl.hideOperaProcess();
            }
        }
        else {
            loadAPExpAreaTree();
        }
    }
}
/* 构建商品图片列 */
function constructSkuProdPicCell(key, cellValue) {

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
}
/* 构建Sku编码列 */
function constructSS_ProdCodeCell(key, cellvalue) {
    if (!cellvalue) {
        cellvalue = mlm.C0142;
    }

    return "<input id='txtProdCode_" + key + "' tag='" + key + "' type='text' style='width: 110px' class='text-input' onclick='clickProdCode.call(this);' onblur='leaveProdCode.call(this);' onkeypress='uicontrol.func.checkInput(event);' value='" + cellvalue + "' onchange='changeSSProdCode.call(this);' />";
}
/* 构建包装盒重量&体积列 */
function constructSSBoxWV(key, cellvalue) {
    var m_arr = [];

    m_arr.push("<div style='padding: 0px'>" + Number(this.keyObj.BoxWeight).toFixed(3) + " " + pageVariable.handlerSSProdFrm.ss_product.WUnit + "</div>");
    m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px'>" + this.keyObj.BoxLength + "*" + this.keyObj.BoxWidth + "*" + this.keyObj.BoxHeight + " cm³</div>");

    return m_arr.join("");
} 
/* 构建商品重量 */
function constructSSPackageWeight(key, cellvalue) {
    return Number(cellvalue).toFixed(3) + " " + pageVariable.handlerSSProdFrm.ss_product.WUnit;
}
/* 点击商品编码 */
function clickProdCode() {
    var m_prodcode = $.trim($(this).val());
    if (m_prodcode == mlm.C0142) {
        $(this).val("");
    }
}
/* 离开商品编码 */
function leaveProdCode() {
    var m_prodcode = $.trim($(this).val());
    if (m_prodcode == "") {
        $(this).val(mlm.C0142);
    }
}
/* 改变商品编码事件 */
function changeSSProdCode() {
    var m_prodcode = $.trim($(this).val());
    if (m_prodcode == mlm.C0142) {
        m_prodcode = "";
    }
    var m_key = $(this).attr("tag");

    var m_obj = pageVariable.innerProdList.getItem(m_key);

    m_obj.ProdCode = m_prodcode;

}
/* 加载销售价格数据 */
function loadSSSalePrice() {
    var m_innerprods = new datastruct.dictionary();
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        m_innerprods.setItem(this.SS_InnerProd_Id, this);
    });
    pageVariable.salePriceList.bindDataSource(null);
    $.each(pageVariable.handlerSSProdFrm.ss_product.SalePrices, function () {
        pageVariable.salePriceList.addData(this.SS_InnerProd_Id, this);
    });
}
/* 构建内部商品列 */
function constructSS_SkuProdCell(key, cellvalue) {
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

            var m_product_id = this.Product_Id;
            if (!m_product_id) {
                m_product_id = this.OtherProps.Product_Id;
            }
            var m_skuproduct_id = this.SkuProduct_Id;
            if (!m_skuproduct_id) {
                m_skuproduct_id = this.OtherProps.SkuProduct_Id;
            }

            if (this.RelQty == "1") {
                m_strarr.push("<div " + m_style + "><a onclick='viewProduct.call(this, \"" + m_product_id + "\", \"" + m_skuproduct_id + "\")' href='javascript:void(\"0\");'>" + this.InnerProd + "</a></div>");
            }
            else {
                m_strarr.push("<div " + m_style + ">(" + this.RelQty + " " + this.Product.Unit + ") <a onclick='viewProduct.call(this, \"" + m_product_id + "\", \"" + m_skuproduct_id + "\")' href='javascript:void(\"0\");'>" + this.InnerProd + "</a></div>");
            }
            i++;
        });
        return m_strarr.join("");
    }
    else {
        return "";
    }
}
/* 构建映射关系操作列 */
function constructSSInnerProdOperaCell(key, cellvalue) {
    return "<div style='padding: 0px'><a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openHandlerSSInnerProdFrm.call(this);'>" + mlm.C1092 + "</a></div>" +
           "<div style='padding: 0px'><a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openHandlerSSProdBox.call(this);'>" + mlm.C1250 + "</a></div>";
}
/* 构建目录价操作列 */
function constructSS_PriceCell(key, cellvalue) {
    if (Number(cellvalue) > 0) {
        return commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue);
    }
}
/* 构建折扣操作列 */
function constructSS_DiscountCell(key, cellvalue) {
    var m_discount = Number(cellvalue);
    if (m_discount > 0) {
        return m_discount * 100 + "%";
    }
}
/* 构建商品价格操作列 */
function constructSSSalePricdOperaCell(key, cellvalue) {
    return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openSetSalePriceFrm.call(this);'>" + mlm.C0611 + "</a>";
}
/* 加载销售商品图片 */
function loadSSProdPics() {

    pageVariable.prodPicSource = pageVariable.handlerSSProdFrm.ss_product.ProdPics;

    loadProdPicsFromPage();
}
function loadProdPicsFromPage() {

    var pics = pageVariable.prodPicSource;
    var m_pvStruct = new datastruct.dictionary();
    var m_skuProps = [];

    var m_props = pageVariable.ssPropList.dataSource.items.arrValues;
    $.each(m_props, function () {
        if (this.IsSku == "1") {
            m_skuProps.push(this);
        }

        if (this.ProdPValueIdRange) {
            var m_pvids = this.ProdPValueIdRange.split(",");
            var m_pvs = this.ProdPValueRange.split(",");

            var i = 0;
            $.each(m_pvids, function () {
                m_pvStruct.setItem(this, m_pvs[i]);
                i++;
            });
        }
    });

    var m_picList = [];
    if (pics) {
        $.each(pics, function () {
            if (!this.TempUploadPic_Id) {
                this.TempUploadPic_Id = this.Product_Pic_Id;
            }

            if (this.RelPValueIds) {
                var m_relpv = [];
                var m_relpvids = this.RelPValueIds;
                $.each(m_relpvids, function () {

                    var m_str = this.toString();
                    if (m_str) {
                        if (m_pvStruct.containKey(m_str)) {
                            m_relpv.push(m_pvStruct.getItem(m_str));
                        }
                    }
                });

                this.OtherProps.RelPValues = m_relpv.join(",");
            }
            m_picList.push(this);
        });

        if (pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id && Number(pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id) < 1000000) {
            var m_ssprod = pageVariable.productList.getItem(pageVariable.handlerSSProdFrm.ss_product_key);
            if (pics.length > 0) {
                m_ssprod.BrowsePicUrl = pics[0].BrowsePicUrl;
            }
            else {
                m_ssprod.BrowsePicUrl = "";
            }
            pageVariable.productList.modifyData(pageVariable.handlerSSProdFrm.ss_product_key, m_ssprod);
        }
    }

    pageVariable.ssPicList.bindSource(m_picList);
}
/* 属性排序 */
function sortProdProp(prop1, prop2) {
    return Number(prop1.Seq) > Number(prop2.Seq) ? 1 : -1;
}
/* 加载快递区域树 */
function loadExpAreaTree() {

    if (!pageVariable.expAreaTree) {

        /* 显示进度 */
        pageframe.control.processCtrl.showOperaProcess();

        var globalarea = new othm.globalarea();
        globalarea.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id; 
        globalarea.queryGlobalAreaBySaleSite(function (source) {

            pageVariable.expAreaTree = new uicontrol.treeView($("#expAreaTree"), source, fillExpService,
                                                        { sourceFormat: "table",
                                                            keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                            constructDisplayTxt: constructGAreaTxt, isCollapse: true
                                                        });
            pageVariable.expAreaTree.loadSource();

            fillExpService();

            pageframe.control.processCtrl.hideOperaProcess();
        });
    }
}
/* 构建区域显示 */
function constructGAreaTxt(objitem) {
    var m_len = 0;
    var m_expobjs = pageVariable.handlerSSProdFrm.ss_product.ExpDict.getItem(objitem.tag.GlobalArea_Id);
    if (m_expobjs) {
        $.each(m_expobjs, function () {
            if (this.State == "1") {
                m_len++;
            }
        });
    }

    var m_id = "_exp_area_" + objitem.tag.GlobalArea_Id;
    if (m_len > 0) {
        return "<span id='" + m_id + "' tag='" + m_len + "'>" + objitem.tag.GlobalAreaName + "(" + m_len + ")" + "</span>";
    }
    else {
        return "<span id='" + m_id + "' tag='" + 0 + "' class='lb-symbol'>" + objitem.tag.GlobalAreaName + "</span>";
    }
}
/* 加载快递服务 */
function fillExpService() {
    if (!pageVariable.expServiceList) {
        pageVariable.expServiceList = new uicontrol.tableList("expServiceList",
                                     { autoSeq: true,
                                         keyColumn: "ExpressService_Id",
                                         height: 295,
                                         columns: [{ display: mlm.C0436, name: "ExpressServiceName", width: 200, align: 'left', adjust: true, createCell: constructESName },
                                                   { display: mlm.C0291, name: "GlobalAreaName", width: 90, align: 'left' },
                                                   { display: mlm.C0786, name: "ESType", width: 70, align: 'left', adjust: true, createCell: constructESTypeCell },
                                                   { display: mlm.C0845, name: "FstExpCost", width: 60, align: 'right', adjust: true, createCell: constructSSExpCostCell },
                                                   { display: mlm.C0846, name: "IncreaExpCost", width: 65, align: 'right', adjust: true, createCell: constructSSExpCostCell },
                                                   { display: mlm.C1020, name: "FstCharge", width: 85, align: 'center', adjust: true, createCell: constructSSExpChargeCell },
                                                   { display: mlm.C1021, name: "IncreaseCharge", width: 85, align: 'center', adjust: true, createCell: constructSSExpIncreaChargeCell },
                                                   { display: mlm.C0367, name: "State", width: 60, align: 'center', adjust: true, createCell: constructSSExpStateCell}]
                                     });
    }

    loadExpServiceList();
    calculateExpCharge();
}
/* 构件运费模式 */
function constructESTypeCell(key, cellValue) {
    if (cellValue == "1") {
        return mlm.C1014;
    }
    else if (cellValue == "2") {
        return mlm.C1015;
    }
    else {
        return mlm.C1016;
    }
}
/* 加载配送服务列表 */
function loadExpServiceList() {
    if (pageVariable.expAreaTree.selectedItem) {
        var m_globalareaid = pageVariable.expAreaTree.selectedItem.key;
        var m_globalservices = pageVariable.handlerSSProdFrm.ss_product.ExpDict.getItem(m_globalareaid);
        if (m_globalservices) {
            $.each(m_globalservices, function () {
                this.GlobalAreaName = pageVariable.expAreaTree.selectedItem.tag.GlobalAreaName;
            });
        }

        pageVariable.expServiceList.bindDataSource(null);
        if (m_globalservices) {
            $.each(m_globalservices, function () {
                if (Number(this.MaxWeight) >= Number($("#lbExpWeight").text())) {
                    pageVariable.expServiceList.addData(this.ExpressService_Id, this);
                }
            });
        }
    }
}
/* 查看配送服务 */
function openViewExpressServiceFrm(key) {
    pageVariable.viewExpServiceFrm.show(key);
}
/* 构造配送服务名称列 */
function constructESName(key, cellValue) {

    var m_arr = [];

    var m_obj = this.keyObj;
    m_arr.push("<a onclick='openViewExpressServiceFrm.call(this, \"" + m_obj.ExpressService_Id + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>");

    if (m_obj.WarehouseName) {
        m_arr.push("<div class='lb-symbol'>(" + m_obj.WarehouseName + ")</div>");
    }

    return m_arr.join("");
}
/* 构建费用成本列 */
function constructSSExpCostCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (m_obj.ESType == "2") {
        return commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue);
    }
}
/* 构建配送服务状态列 */
function constructSSExpStateCell(key, cellvalue) {
    if (cellvalue == "1") {
        return "<select class='dropdown-list' style='width: 55px' tag='" + key + "' onchange='changeExpState.call(this);'><option value='1' selected='selected'>" + mlm.C1018 + "</option><option value='2'>" + mlm.C1019 + "</option></select>"
    }
    else {
        return "<select class='dropdown-list' style='width: 55px' tag='" + key + "' onchange='changeExpState.call(this);'><option value='1'>" + mlm.C1018 + "</option><option value='2' selected='selected'>" + mlm.C1019 + "</option></select>"
    }
}
/* 构建首件报价列 */
function constructSSExpChargeCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (m_obj.ESType == "2") {
        if (!cellvalue) {
            cellvalue = "0.00";
        }
        else {
            cellvalue = Number(cellvalue).toFixed(2);
        }
        return pageVariable.handlerSSProdFrm.ss_product.CurrSymbol + " <input id='txtExpFstPrice_" + key + "' type='text' class='text-input' style='width: 45px' onchange='changeFstExpCharge.call(this);' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + cellvalue + "' />";
    }
}
/* 构建首件报价列 */
function constructSSExpIncreaChargeCell(key, cellvalue) {
    var m_obj = this.keyObj;

    if (m_obj.ESType == "2") {
        if (!cellvalue) {
            cellvalue = "0.00";
        }
        else {
            cellvalue = Number(cellvalue).toFixed(2);
        }
        return pageVariable.handlerSSProdFrm.ss_product.CurrSymbol + " <input id='txtExpFstPrice_" + key + "' type='text' class='text-input' style='width: 45px' onchange='changeIncreaExpCharge.call(this);' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + cellvalue + "' />";
    }
}
/* 改变首件费用事件 */
function changeFstExpCharge() {
    var m_key = $(this).attr("id").split("_")[1];
    var m_obj = pageVariable.expServiceList.getItem(m_key);
    m_obj.FstCharge = $(this).val();

    pageVariable.isChangeSSProd = true;
}
/* 改变额外费用事件 */
function changeIncreaExpCharge() {
    var m_key = $(this).attr("id").split("_")[1];
    var m_obj = pageVariable.expServiceList.getItem(m_key);
    m_obj.IncreaseCharge = $(this).val();

    pageVariable.isChangeSSProd = true;
}
/* 改变状态事件 */
function changeExpState() {
    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.expServiceList.getItem(m_key);
    m_obj.State = $(this).val();

    var m_areaCtrl = $("#_exp_area_" + m_obj.GlobalArea_Id);
    var m_len = Number(m_areaCtrl.attr("tag"));
    if (m_obj.State == "2") {
        m_areaCtrl.addClass("lb-symbol");
        m_len--;
    }
    else {
        m_areaCtrl.removeClass("lb-symbol");
        m_len++;
    }
    m_areaCtrl.attr("tag", m_len);
    if (m_len > 0) {
        m_areaCtrl.text(m_obj.GlobalAreaName + "(" + m_len + ")");
    }
    else {
        m_areaCtrl.text(m_obj.GlobalAreaName);
    }

    pageVariable.isChangeSSProd = true;
}
/* 运费测算 */
function calculateExpCharge() {
    if (!pageVariable.expAreaTree.selectedItem) {
        return;
    }
    var m_globalarea_id = pageVariable.expAreaTree.selectedItem.key;

    var m_func = function (expservices) {
        if (expservices) {
            $.each(expservices, function () {
                var m_item = pageVariable.expServiceList.getItem(this.ExpressService_Id);
                if (m_item) {
                    m_item.FstExpCost = this.FirstCharge;
                    m_item.IncreaExpCost = this.OtherCharge;

                    pageVariable.expServiceList.modifyData(m_item.ExpressService_Id, m_item);
                }
            });
        }
    };

    if (!pageVariable.handlerSSProdFrm.expchargedict.containKey(m_globalarea_id)) {
        var m_weight = Number($("#lbExpWeight").text());
        if (m_weight > 0 && pageVariable.expAreaTree.selectedItem) {
            var m_expressservice = new sm.expressservice();
            m_expressservice.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
            m_expressservice.SysWeightUnit_id = pageVariable.handlerSSProdFrm.ss_product.SysWeightUnit_Id;
            m_expressservice.SysCurrency_id = pageVariable.handlerSSProdFrm.ss_product.SysCurrency_Id;
            m_expressservice.Weight = m_weight;
            m_expressservice.Volumn = $("#lbExpVolume").attr("tag");
            m_expressservice.Tax = $("#lbCustomValue").attr("tag");

            m_expressservice.getCalFixExpress(function (retTable) {
                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                var m_expservicecosts = new datastruct.dictionary();
                $.each(m_jsonobjs, function () {
                    var m_expservices = pageVariable.handlerSSProdFrm.expchargedict.getItem(this.GlobalArea_Id);
                    if (!m_expservices) {
                        m_expservices = [];
                        pageVariable.handlerSSProdFrm.expchargedict.setItem(this.GlobalArea_Id, m_expservices);
                    }
                    m_expservices.push(this);
                });

                m_func(pageVariable.handlerSSProdFrm.expchargedict.getItem(m_globalarea_id));
            });
        }
    }
    else {
        m_func(pageVariable.handlerSSProdFrm.expchargedict.getItem(m_globalarea_id));
    }
}

/* 打开设置内部商品映射关系的窗体 */
function openHandlerSSInnerProdFrm() {
    if (!pageVariable.handlerSSInnerProdFrm) {
        pageVariable.handlerSSInnerProdFrm = new uicontrol.dialog("handlerSSInnerProdFrm", mlm.C1093, { width: 900, position: ["auto", 25] }, saveInnerProdRel);

        $("#btAddGbom").click(openSelectGbomFrm);

        pageVariable.handlerSSInnerProdFrm.show();

        pageVariable.gbomList = new uicontrol.tableList("gbomList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "SkuProduct_Id",
                                        columns: [{ display: mlm.M0012, name: "InnerProd", width: 350, align: 'left' },
                                                { display: mlm.C1094, name: "", width: 110, align: 'left', adjust: true, createCell: constructSS_RelQtyCell },
                                                { display: mlm.C1247, name: "Weight", width: 80, align: 'right', adjust: true, createCell: constructSSPackageWeight },
                                                { display: mlm.M0017, name: "Cost", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, deletedFunc: "openDelInnerProdRel"}]
                                    });
    }
    else {
        pageVariable.handlerSSInnerProdFrm.show();
    }

    var m_key = $(this).attr("tag");
    pageVariable.handlerSSInnerProdFrm.ss_innerprod_id = m_key;

    var m_skuProd = pageVariable.innerProdList.getItem(m_key);

    var m_prodstr = $.trim($("#txtSSProdName").val());
    if (m_skuProd.SkuProps) {
        m_prodstr = m_prodstr + " - [" + m_skuProd.SkuProps + "]";
    }
    $("#lbSSSkuProd").text(m_prodstr);

    var m_gbomSource = [];
    var i = 0;
    $.each(m_skuProd.SkuProduct_Ids, function () {
        var m_item = {};
        m_item.SkuProduct_Id = this;

        var m_skuitem = m_skuProd.SkuProducts[i];
        m_item.InnerProd = m_skuitem.InnerProd;
        m_item.Product_Id = m_skuitem.Product_Id;
        m_item.ProdCode = m_skuitem.ProdCode;
        m_item.SkuProps = m_skuitem.SkuProps;
        m_item.RelQty = m_skuitem.RelQty;
        m_item.Product = m_skuitem.Product;
        m_item.Weight = Number(m_skuitem.OtherProps.Weight) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.WeightRate);
        m_item.Cost = Number(m_skuitem.OtherProps.Cost) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.CurrRate);
        m_item.OtherProps = {};
        m_item.OtherProps.Weight = m_skuitem.OtherProps.Weight;
        m_item.OtherProps.Cost = m_skuitem.OtherProps.Cost;

        m_gbomSource.push(m_item);

        i++;
    });
    pageVariable.gbomList.bindDataSource(m_gbomSource);
}
/* 构建关联数量列 */
function constructSS_RelQtyCell(key, cellvalue) {

    var m_obj = pageVariable.gbomList.getItem(key);

    return "<input id='" + pageVariable.gbomList._ctrlId + "_txtRelQty_" + key + "' type='text' class='text-input' style='width: 65px' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + m_obj.RelQty + "' /> <span>" + m_obj.Product.Unit + "</span>";
}
/* 打开搜索内部商品的窗体 */
function openSelectGbomFrm() {
    if (!pageVariable.selectGbom) {
        pageVariable.selectGbom = new bizcontrol.selectproduct(addGbom);
    }

    var m_selecteditems = new datastruct.dictionary();
    var m_items = pageVariable.gbomList.dataSource.items.arrValues;
    $.each(m_items, function () {
        m_selecteditems.setItem(this.SkuProduct_Id, this);
        this.Cost = this.OtherProps.Cost;
    });
    pageVariable.selectGbom.show(m_selecteditems);
}
/* 添加内部商品 */
function addGbom(selectedskuprods) {
    pageVariable.gbomList.bindDataSource(null);
    $.each(selectedskuprods, function () {
        var m_gbom = {};
        if (this.SkuProps) {
            m_gbom.InnerProd = this.ProdCode + " - " + this.Product.ProdName + " - [" + this.SkuProps + "]";
        }
        else {
            m_gbom.InnerProd = this.ProdCode + " - " + this.Product.ProdName;
        }
        m_gbom.SkuProduct_Id = this.SkuProduct_Id;
        m_gbom.ProdCode = this.ProdCode;
        m_gbom.SkuProps = this.SkuProps;
        m_gbom.RelQty = 1;
        m_gbom.Product = this.Product;
        m_gbom.Product_Id = this.Product.Product_Id;
        m_gbom.Weight = Number(this.Product.Weight) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.WeightRate);
        m_gbom.Cost = Number(this.Cost) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.CurrRate);
        m_gbom.OtherProps = {};
        m_gbom.OtherProps.Weight = this.Product.Weight;
        m_gbom.OtherProps.Cost = this.Cost;

        pageVariable.gbomList.addData(m_gbom.SkuProduct_Id, m_gbom);
    });
}
/* 保存内部商品映射关系 */
function saveInnerProdRel() {

    var m_obj = pageVariable.innerProdList.getItem(pageVariable.handlerSSInnerProdFrm.ss_innerprod_id);

    m_obj.SkuProduct_Ids = [];
    m_obj.SkuProducts = [];
    m_obj.PackageWeight = 0;
    m_obj.Cost = 0;
    $.each(pageVariable.gbomList.dataSource.items.arrValues, function () {
        this.SkuProduct_Id = this.SkuProduct_Id.toString();
        m_obj.SkuProduct_Ids.push(this.SkuProduct_Id);

        var m_qtyCtrl = $("#" + pageVariable.gbomList._ctrlId + "_txtRelQty_" + this.SkuProduct_Id);
        this.RelQty = m_qtyCtrl.val();

        m_obj.PackageWeight += Number(this.RelQty) * Number(this.Weight);
        m_obj.Cost += Number(this.RelQty) * Number(this.Cost);

        m_obj.SkuProducts.push(this);
    });

    pageVariable.innerProdList.modifyData(m_obj.SS_InnerProd_Id, m_obj);

    //刷新商品重量、成本和利润
    refreshCalculateInfo();

    var m_saleprices = pageVariable.handlerSSProdFrm.ss_product.SalePrices;
    if (m_saleprices) {
        $.each(m_saleprices, function () {
            if (this.SS_InnerProd_Id == m_obj.SS_InnerProd_Id) {
                this.PurchaseCost = m_obj.Cost;
            }
        });
    }
    pageVariable.rebindSalePriceList = true;

    pageVariable.handlerSSInnerProdFrm.close();
}
/* 打开删除映射关系的窗体 */
function openDelInnerProdRel() {
    if (!pageVariable.delInnerProdRelFrm) {
        pageVariable.delInnerProdRelFrm = new uicontrol.confirmDelete(deleteInnerProdRel);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.gbomList.getItem(m_key);

    pageVariable.delInnerProdRelFrm.skuproduct_id = m_key;
    pageVariable.delInnerProdRelFrm.showConfirm(mlm.C0464 + mlm.C1095 + "(" + m_obj.InnerProd + ") ?");
}
/* 删除映射关系 */
function deleteInnerProdRel() {
    pageVariable.gbomList.deleteData(pageVariable.delInnerProdRelFrm.skuproduct_id);
    pageVariable.delInnerProdRelFrm.close();

    //刷新商品重量、成本和利润
    refreshCalculateInfo();
}

/* 加载赠品数据 */
function loadGifts() {
    pageVariable.giftList.bindDataSource(pageVariable.handlerSSProdFrm.ss_product.Gifts);
}

/* 构建赠品名称列 */
function constructGiftNameCell(key, cellvalue) {
    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) {
        m_fontstyle = "color: red;"
    }

    return "<span style='" + m_fontstyle + "'>" + cellvalue + "<span>";
}
/* 构建赠品重量列 */
function constructGiftWeightCell(key, cellvalue) {
    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) {
        m_fontstyle = "color: red;"
    }

    return "<span style='" + m_fontstyle + "'>" + Number(cellvalue).toFixed(2) + " " + pageVariable.handlerSSProdFrm.ss_product.WUnit + "<span>";
}
/* 构建赠品成本列 */
function constructGiftCostCell(key, cellvalue) {
    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) {
        m_fontstyle = "color: red;"
    }

    return "<span style='" + m_fontstyle + "'>" + commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue) + "<span>";
}
/* 构建赠品的内部详细信息列 */
function constructGiftItemCell(key, cellvalue) {
    var m_strs = [];
    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) { 
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
            m_strs.push("<div " + m_style + "><a style='" + m_fontstyle + "' onclick='viewProduct.call(this, \"" + this.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.InnerProd + " [" + this.Qty + this.Product.Unit + "]</a></div>");
        }
        else {
            m_strs.push("<div " + m_style + "><a style='" + m_fontstyle + "' onclick='viewProduct.call(this, \"" + this.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.InnerProd + "</a></div>");
        }
        i++;
    });

    return m_strs.join("");
}
/* 创建赠品操作设置列 */
function constructGiftOperaCell(key, cellvalue) {

    var m_obj = this.keyObj;

    var m_fontstyle = "";
    if (Number(m_obj.Weight) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit) ||
        Number(m_obj.Cost) > Number(pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit)) {
        m_fontstyle = "style='color: red;'"
    }

    return "<a href='javascript:void(\"0\")' class='bt-link' " + m_fontstyle + " tag='" + key + "' onclick='openModifyGiftFrm.call(this);'>" + mlm.C0061 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' " + m_fontstyle + " tag='" + key + "' onclick='openDelGiftFrm.call(this);'>" + mlm.C0062 + "</a>";
}
/* 初始化赠品窗体 */
function initHandlerGiftFrm() {
    if (!pageVariable.handlerGiftFrm) {
        pageVariable.handlerGiftFrm = new uicontrol.dialog("handlerGiftFrm", "", { width: 900, position: ["auto", 25] }, saveGift);

        $("#btAddGiftItem").click(openSelectGiftItemFrm);

        pageVariable.handlerGiftFrm.show();
        pageVariable.giftItemList = new uicontrol.tableList("giftItemList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "SkuProduct_Id",
                                        columns: [{ display: mlm.C1055, name: "InnerProd", width: 350, align: 'left' },
                                                { display: mlm.C1098, name: "", width: 120, align: 'left', adjust: true, createCell: constructSS_GiftQtyCell },
                                                { display: mlm.C1247, name: "Weight", width: 80, align: 'right', adjust: true, createCell: constructSSPackageWeight },
                                                { display: mlm.M0017, name: "Cost", width: 80, align: 'right', adjust: true, createCell: constructSS_PriceCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, deletedFunc: "openDelGiftItem"}]
                                    });
    }
    else {
        pageVariable.handlerGiftFrm.show();
    }
}
/* 构建赠品数量列 */
function constructSS_GiftQtyCell(key, cellvalue) {
    var m_obj = pageVariable.giftItemList.getItem(key);
    return "<input id='" + pageVariable.giftItemList._ctrlId + "_txtQty_" + key + "' type='text' class='text-input' style='width: 65px' onkeypress='uicontrol.func.checkInputNumber(event);' value='" + m_obj.Qty + "' /> <span>" + m_obj.Product.Unit + "</span>";
}
/* 打开新增赠品的窗体 */
function openNewGiftFrm() {

    initHandlerGiftFrm();

    $("#txtGiftName").val("");
    pageVariable.giftItemList.bindDataSource(null);

    pageVariable.handlerGiftFrm.ss_gift = null;
    pageVariable.handlerGiftFrm.ss_gift_id = 0;
    pageVariable.handlerGiftFrm.action = "New";
    pageVariable.handlerGiftFrm.setTitle(mlm.C0461 + mlm.C1061);
}
/* 打开修改赠品的窗体 */
function openModifyGiftFrm() {

    initHandlerGiftFrm();

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.giftList.getItem(m_key);

    $("#txtGiftName").val(m_obj.GiftName);

    $.each(m_obj.Items, function () {
        this.Weight = Number(this.OtherProps.Weight) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.WeightRate);
        this.Cost = Number(this.OtherProps.Cost) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.CurrRate);
    });

    pageVariable.giftItemList.bindDataSource(m_obj.Items);

    pageVariable.handlerGiftFrm.ss_gift = m_obj;
    pageVariable.handlerGiftFrm.ss_gift_id = m_key;
    pageVariable.handlerGiftFrm.action = "Modify";
    pageVariable.handlerGiftFrm.setTitle(mlm.C0061 + mlm.C1061);
}
/* 打开删除赠品的窗体 */
function openDelGiftFrm() {
    if (!pageVariable.delGiftFrm) {
        pageVariable.delGiftFrm = new uicontrol.confirmDelete(deleteGift);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.giftList.getItem(m_key);

    pageVariable.delGiftFrm.ss_gift_id = m_key;
    pageVariable.delGiftFrm.showConfirm(mlm.C0464 + mlm.C1061 + "(" + m_obj.GiftName + ") ?");
}
/* 删除赠品 */
function deleteGift() {
    pageVariable.giftList.deleteData(pageVariable.delGiftFrm.ss_gift_id);

    pageVariable.handlerSSProdFrm.ss_product.Gifts = pageVariable.giftList.dataSource.items.arrValues;

    pageVariable.delGiftFrm.close();
}
/* 保存赠品 */
function saveGift() {
    var m_giftname = $.trim($("#txtGiftName").val());
    if (!m_giftname) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1099);
        return;
    }

    var m_proddict = new datastruct.dictionary();
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        $.each(this.SkuProducts, function () {
            m_proddict.setItem(this.Product_Id, null);
        });
    });

    var m_gift = pageVariable.handlerGiftFrm.ss_gift;
    if (!m_gift) {
        m_gift = {};
    }
    var m_items = [];
    m_gift.Weight = 0;
    m_gift.Cost = 0;
    var m_iserroinfo = null;
    $.each(pageVariable.giftItemList.dataSource.items.arrValues, function () {

        if (m_proddict.containKey(this.Product_Id)) {
            m_iserroinfo = this.InnerProd;
        }

        if (!m_iserroinfo) {
            this.Qty = $("#" + pageVariable.giftItemList._ctrlId + "_txtQty_" + this.SkuProduct_Id).val();

            m_gift.Weight += Number(this.Qty) * Number(this.Weight);
            m_gift.Cost += Number(this.Qty) * Number(this.Cost);

            m_items.push(this);
        }
    });

    if (m_iserroinfo) {
        pageframe.control.alertDialog.showAlertInfo(m_iserroinfo + " " + mlm.C1265);
        return;
    }

    if (m_items.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1100);
        return;
    }

    m_gift.GiftName = m_giftname;
    m_gift.Items = m_items;

    if (pageVariable.handlerGiftFrm.action == "New") {
        m_gift.SS_Gift_Id = pageVariable.handlerSSProdFrm.max_gift_id;
        pageVariable.giftList.addData(m_gift.SS_Gift_Id, m_gift);

        pageVariable.handlerSSProdFrm.max_gift_id++;

        pageVariable.handlerSSProdFrm.ss_product.Gifts = pageVariable.giftList.dataSource.items.arrValues;
    }
    else {
        pageVariable.giftList.modifyData(m_gift.SS_Gift_Id, m_gift);
    }

    pageVariable.handlerGiftFrm.close();
}
/* 打开选择赠品的窗体 */
function openSelectGiftItemFrm() {
    if (!pageVariable.selectGiftItem) {
        pageVariable.selectGiftItem = new bizcontrol.selectproduct(addGiftItem);
    }

    var m_selecteditems = new datastruct.dictionary();
    var m_items = pageVariable.giftItemList.dataSource.items.arrValues;
    $.each(m_items, function () {
        m_selecteditems.setItem(this.SkuProduct_Id, this);
        this.Cost = this.OtherProps.Cost;
    });
    pageVariable.selectGiftItem.show(m_selecteditems);
}
/* 添加赠品 */
function addGiftItem(selectedskuprods) {
    pageVariable.giftItemList.bindDataSource(null);
    $.each(selectedskuprods, function () {
        var m_giftitem = {};
        m_giftitem.SkuProduct_Id = this.SkuProduct_Id;
        if (this.SkuProps) {
            m_giftitem.InnerProd = this.ProdCode + " - " + this.Product.ProdName + " - [" + this.SkuProps + "]";
        }
        else {
            m_giftitem.InnerProd = this.ProdCode + " - " + this.Product.ProdName;
        }
        m_giftitem.Qty = 1;
        m_giftitem.ProdCode = this.ProdCode;
        m_giftitem.SkuProps = this.SkuProps;
        m_giftitem.Product = this.Product;
        m_giftitem.Product_Id = this.Product.Product_Id;
        m_giftitem.Weight = Number(this.Product.Weight) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.WeightRate);
        m_giftitem.Cost = Number(this.Cost) * Number(pageVariable.handlerSSProdFrm.ss_product.OtherProps.CurrRate);
        m_giftitem.OtherProps = {};
        m_giftitem.OtherProps.Weight = this.Product.Weight;
        m_giftitem.OtherProps.Cost = this.Cost;

        pageVariable.giftItemList.addData(m_giftitem.SkuProduct_Id, m_giftitem);
    });
}
/* 打开删除赠品的窗体 */
function openDelGiftItem() {
    if (!pageVariable.delGiftItemFrm) {
        pageVariable.delGiftItemFrm = new uicontrol.confirmDelete(deleteGiftItem);
    }

    var m_key = $(this).attr("tag");
    var m_obj = pageVariable.giftItemList.getItem(m_key);

    pageVariable.delGiftItemFrm.skuproduct_id = m_key;
    pageVariable.delGiftItemFrm.showConfirm(mlm.C0464 + mlm.C1055 + "(" + m_obj.InnerProd + ") ?");
}
/* 删除赠品 */
function deleteGiftItem() {
    pageVariable.giftItemList.deleteData(pageVariable.delGiftItemFrm.skuproduct_id);
    pageVariable.delGiftItemFrm.close();
}
/* 赠品重量限制改变事件 */
function changeGiftWeightLimit() {
    var m_value = $(this).val();
    if (!m_value) {
        $(this).val("0.000");
    }

    pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit = m_value;

    //刷新商品重量、成本和利润
    refreshCalculateInfo();
}
/* 赠品成本限制改变事件 */
function changeGiftCostLimit() {
    var m_value = $(this).val();
    if (!m_value) {
        $(this).val("0.00");
    }

    pageVariable.handlerSSProdFrm.ss_product.GiftCostLimit = m_value;

    pageVariable.isChangeSSProd = true;
}

/* 加载利润区域树 */
function loadAPExpAreaTree() {

    if (!pageVariable.apExpAreaTree || !pageVariable.apExpAreaTree.salesite_id || pageVariable.apExpAreaTree.salesite_id != pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id) {

        var globalarea = new othm.globalarea();
        globalarea.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
        globalarea.queryGlobalAreaBySaleSite(function (source) {

            var m_expressservice = new sm.expressservice();
            m_expressservice.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
            m_expressservice.queryExpServiceCountByArea(function (retTable) {

                pageVariable.apExpAreaTree = new uicontrol.treeView($("#apExpAreaTree"), source, loadProdfit,
                                                        { sourceFormat: "table",
                                                            keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                            constructDisplayTxt: constructGAreaTxt, isCollapse: true
                                                        });
                pageVariable.apExpAreaTree.loadSource();
                pageVariable.apExpAreaTree.salesite_id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;

                pageVariable.prodProfitList = new uicontrol.tableList("prodProfitList",
                                     { isPaging: true,
                                         autoSeq: true,
                                         keyColumn: "SS_ProdProfit_V_Id",
                                         height: 360,
                                         pageQueryHandler: queryProdfit,
                                         columns: [{ display: mlm.C1141, name: "GlobalAreaNames", width: 160, align: 'left', adjust: true, createCell: constructGlobalAreaCell },
                                                   { display: mlm.C0174, name: "SkuProps", width: 100, align: 'left', adjust: true, createCell: constructProfitSkuCell },
                                                   { display: mlm.C0436, name: "ExpressServiceName", width: 180, align: 'left', adjust: true, createCell: constructESName },
                                                   { display: mlm.C1102, name: "FstProdProfit", width: 80, align: 'right', adjust: true, createCell: constructProfitCell },
                                                   { display: mlm.C1103, name: "SecondProdProfit", width: 110, align: 'right', adjust: true, createCell: constructOtherProfitCell },
                                                   { display: mlm.C1104, name: "ThirdProdProfit", width: 110, align: 'right', adjust: true, createCell: constructOtherProfitCell}]
                                     });

                loadProdfit();
            });
        });
    }
    else {
        loadProdfit();
    }
}
/* 构建区域列 */
function constructGlobalAreaCell(key, cellvalue) {
    var m_len = cellvalue.getBytesCount();
    if (m_len > 30) {
        var m_str = cellvalue.substringByBytes(30) + "...";
        return "<span id='lbPfGA_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
    }
    else {
        return cellvalue;
    }
}
/* 构建利润Sku列 */
function constructProfitSkuCell(key, cellvalue) {
    var m_len = cellvalue.getBytesCount();
    if (m_len > 30) {
        var m_str = cellvalue.substringByBytes(30) + "...";
        return "<span id='lbPfSku_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
    }
    else {
        return cellvalue;
    }
}
/* 加载商品利润 */
function loadProdfit() {
    queryProdfit(1, pageVariable.prodProfitList.pageNumber);
}
/* 查询利润 */
function queryProdfit(pageNum, pageCount) {
    var m_globalarea_id = null;
    if (pageVariable.apExpAreaTree.selectedItem) {
        m_globalarea_id = pageVariable.apExpAreaTree.selectedItem.key;
    }

    if (pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id < 1000000) {
        var m_ss_product = new sm.ss_product();
        m_ss_product.SS_Product_Id = pageVariable.handlerSSProdFrm.ss_product.SS_Product_Id;
        m_ss_product.GlobalArea_Id = m_globalarea_id;
        m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
        m_ss_product.Page = pageNum;
        m_ss_product.PageNum = pageCount;
        m_ss_product.queryProdProfit(function (retTable) {
            pageVariable.prodProfitList.bindDataSource(retTable);

            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            $.each(m_jsonobjs, function () {
                var m_itemCtrl = $("#lbPfGA_" + this.SS_ProdProfit_V_Id + ", #lbPfSku_" + this.SS_ProdProfit_V_Id);
                m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            });

            //隐藏进度
            pageframe.control.processCtrl.hideOperaProcess();
        });
    }
    else {
        pageVariable.prodProfitList.bindDataSource(null);
    }
}
/* 构建利润列 */
function constructProfitCell(key, cellvalue) {
    if (Number(cellvalue) == -20000) {
        return "<div style='padding: 0px; margin: 0px' class='lb-symbol'>" + mlm.C1008 + "</div>";
    }
    else {
        return commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue);
    }
}
/* 构建其他利润列 */
function constructOtherProfitCell(key, cellvalue) {
    if (Number(cellvalue) == -20000) {
        return "<div style='padding: 0px; margin: 0px' class='lb-symbol'>" + mlm.C1008 + "</div>";
    }
    else {
        if (Number(cellvalue) != 0) {

            var m_items = [];
            m_items.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue) + "</div>");

            if (Number(this.keyObj.FstProdProfit) > 0) {
                var m_rate = ((Number(cellvalue) - Number(this.keyObj.FstProdProfit)) / Number(this.keyObj.FstProdProfit) * 100).toFixed(2);
                m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1260 + ": " + m_rate + "%</div>");
            }

            return m_items.join("");
        }
        else {
            return commoncore.func.getCurrHtml(pageVariable.handlerSSProdFrm.ss_product.CurrSymbol, cellvalue);
        }
    }
}

/* 计算快递服务测算重量和体积 */
function calExpSrvWeightAndVolumn() {
    var m_mv = {};
    m_mv.Weight = Number(pageVariable.handlerSSProdFrm.ss_product.GiftWeightLimit);
    m_mv.Volumn = 0;
    m_mv.BoxLength = 0;
    m_mv.BoxWidth = 0;
    m_mv.BoxHeight = 0;

    var m_maxcustomvalue = 0;
    var m_maxinnerweight = 0;
    $.each(pageVariable.handlerSSProdFrm.ss_product.InnerProds, function () {
        if (this.SkuProducts) {
            var m_itemweight = Number(this.BoxWeight);
            var m_itemcustomvalue = 0;
            $.each(this.SkuProducts, function () {
                m_itemweight += Number(this.Product.Weight) * Number(this.RelQty);
                m_itemcustomvalue += Number(this.Product.CustomValue) * Number(this.RelQty);
            });

            if (m_maxinnerweight == 0 || m_itemweight > m_maxinnerweight) {
                m_maxinnerweight = m_itemweight;
            }

            if (m_maxcustomvalue == 0 || m_itemcustomvalue > m_maxcustomvalue) {
                m_maxcustomvalue = m_itemcustomvalue;
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

    m_mv.CustomValue = m_maxcustomvalue;
    m_mv.Weight = m_mv.Weight + m_maxinnerweight;

    return m_mv;
}
/* 设置商品包装 */
function openHandlerSSProdBox() {
    if (!pageVariable.handSSProdPackage) {
        pageVariable.handSSProdPackage = new uicontrol.dialog("handSSProdPackage", mlm.C1250, { width: 800 }, saveSSProdBox);
    }

    var m_key = $(this).attr("tag");
    var m_obj = null;
    if (m_key) {
        m_obj = pageVariable.innerProdList.getItem(m_key);
        $("#txtBoxWeight").val(Number(m_obj.BoxWeight).toFixed(3));
        $("#txtBoxLength").val(m_obj.BoxLength);
        $("#txtBoxWidth").val(m_obj.BoxWidth);
        $("#txtBoxHeight").val(m_obj.BoxHeight);
    }
    else {
        $("#txtBoxWeight").val("0.000");
        $("#txtBoxLength").val("10");
        $("#txtBoxWidth").val("10");
        $("#txtBoxHeight").val("10");
    }

    pageVariable.handSSProdPackage.innerprod = m_obj;
    pageVariable.handSSProdPackage.show();
}
/* 保存商品包装 */
function saveSSProdBox() {
    var m_obj = pageVariable.handSSProdPackage.innerprod;
    if (m_obj) {
        m_obj.BoxWeight = $("#txtBoxWeight").val();
        m_obj.BoxLength = $("#txtBoxLength").val();
        m_obj.BoxWidth = $("#txtBoxWidth").val();
        m_obj.BoxHeight = $("#txtBoxHeight").val();

        pageVariable.innerProdList.modifyData(m_obj.SS_InnerProd_Id, m_obj);
    }
    else {
        $.each(pageVariable.innerProdList.dataSource.items.arrValues, function () {
            this.BoxWeight = $("#txtBoxWeight").val();
            this.BoxLength = $("#txtBoxLength").val();
            this.BoxWidth = $("#txtBoxWidth").val();
            this.BoxHeight = $("#txtBoxHeight").val();

            pageVariable.innerProdList.modifyData(this.SS_InnerProd_Id, this);
        });
    }

    //刷新商品重量、成本和利润
    refreshCalculateInfo();
    pageVariable.handSSProdPackage.close();
}

/* 刷新站点商品的重量、成本和利润 */
function refreshCalculateInfo() {
    pageVariable.handlerSSProdFrm.expchargedict.clear();
    if (pageVariable.expServiceList) {
        pageVariable.expServiceList.bindDataSource(null);
    }
    if (pageVariable.expAreaTree) {
        pageVariable.expAreaTree.clearSelectedItem();
    }
    pageVariable.isChangeSSProd = true;

    var m_wv = calExpSrvWeightAndVolumn();

    $("#lbExpWeight").text(Number(m_wv.Weight).toFixed(3));
    $("#lbCustomValue").text(Number(m_wv.CustomeValue).toFixed(2));

    var m_expvolumnCtrl = $("#lbExpVolume");
    m_expvolumnCtrl.text(m_wv.BoxLength + "*" + m_wv.BoxWidth + "*" + m_wv.BoxHeight);
    m_expvolumnCtrl.attr("tag", Number(m_wv.BoxLength) * Number(m_wv.BoxWidth) * Number(m_wv.BoxHeight));
}

/* 查看商品信息 */
function viewSSProduct(prodKey) {
    if (!pageVariable.m_viewSSProdCtrl) {
        pageVariable.m_viewSSProdCtrl = new bizcontrol.viewssproduct();
    }
    if (pageVariable.m_viewSSProdCtrl.viewProdDialog) {
        pageVariable.m_viewSSProdCtrl.viewProdDialog.close();
    }
    pageVariable.m_viewSSProdCtrl.show(prodKey.split("-")[0]);
}
/* 查看商品信息 */
function viewProduct(prodKey, skuproduct_id) {
    if (!pageVariable.viewProdCtrl) {
        pageVariable.viewProdCtrl = new bizcontrol.viewproduct();
    }
    if (pageVariable.viewProdCtrl.viewProdDialog) {
        pageVariable.viewProdCtrl.viewProdDialog.close();
    }
    pageVariable.viewProdCtrl.show(prodKey.split("-")[0], skuproduct_id);
}

/* 导出商品序号 */
function exportProductSeq() {
    var m_ss_product = new sm.ss_product();

    if (pageVariable.pdcTree.selectedItem) {
        if (pageVariable.pdcTree.selectedItem.children.length > 0) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C1216);
            return;
        }

        m_ss_product.SSPdcId = pageVariable.pdcTree.selectedItem.key;
    }
    else {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0189);
        return;
    }
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_ss_product.exportSSProductSeq(function (paramObj) {
        window.open(paramObj);
    });
}
/* 打开导入商品序号的窗体 */
function openImportProdSeqFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importData);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.type = "productseq";
    pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C0041);

    pageVariable.handlerImportFrm.show();
}

/* 导出配送价格 */
function exportExpServices() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
    m_ss_product.Weight = $("#lbExpWeight").text();
    m_ss_product.Volumn = $("#lbExpVolume").attr("tag");
    m_ss_product.SysWeightUnit_id = pageVariable.handlerSSProdFrm.ss_product.SysWeightUnit_Id;
    m_ss_product.SysCurrency_id = pageVariable.handlerSSProdFrm.ss_product.SysCurrency_Id;
    m_ss_product.Tax = $("#lbCustomValue").attr("tag");
    m_ss_product.ExpServices = pageVariable.handlerSSProdFrm.ss_product.ExpServices;
    m_ss_product.exportProductExpServices(function (paramObj) {
        window.open(paramObj);
    });
}
/* 打开导入配送价格的窗体 */
function openImportExpServicesFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importData);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.type = "expservice";
    pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C1101);
    pageVariable.handlerImportFrm.show();
}
/* 打开导入商品的窗体 */
function openImportProductFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", "", { width: 800 }, importData);
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.type = "product";
    pageVariable.handlerImportFrm.setTitle(mlm.C0986 + mlm.C0734);

    pageVariable.handlerImportFrm.show();
}
/* 导入配送价格 */
function importData() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    if (pageVariable.handlerImportFrm.type == "expservice") {
        var m_ss_product = new sm.ss_product();
        m_ss_product.SaleSite_Id = pageVariable.handlerSSProdFrm.ss_product.SaleSite_Id;
        m_ss_product.importProductExpServices(pageVariable.importFile, function (retObj) {
            if (retObj.resultFile) {
                window.open(retObj.resultFile);
            }
            else {
                var m_dict = new datastruct.dictionary();
                $.each(retObj.returnTable, function () {
                    m_dict.setItem(this.GlobalArea_Id + "-" + this.ExpressService_Id, this);
                });


                $.each(pageVariable.handlerSSProdFrm.ss_product.ExpServices, function () {
                    var m_item = m_dict.getItem(this.GlobalArea_Id + "-" + this.ExpressService_Id);
                    if (m_item) {
                        this.FstCharge = m_item.FstCharge;
                        this.IncreaseCharge = m_item.IncreaseCharge;
                        this.State = m_item.State;
                    }
                });

                loadExpServiceList();
            }

            pageVariable.isChangeSSProd = true;

            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.type == "productseq") {
        var m_ss_product = new sm.ss_product();
        m_ss_product.importSSProductSeq(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }
            queryProduct(1, pageVariable.productList.pageNumber);
            pageVariable.handlerImportFrm.close();
        });
    }
    else if (pageVariable.handlerImportFrm.type == "product") {
        var m_ss_product = new sm.ss_product();
        m_ss_product.importSSProducts(pageVariable.importFile, function (retObj) {
            if (retObj) {
                window.open(retObj);
            }
            queryProduct(1, pageVariable.productList.pageNumber);
            pageVariable.handlerImportFrm.close();
        });
    }
}

/* 刷新利润 */
function refreshProfit() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_ss_product.refreshProdProfit(function () {
        queryProduct(1, pageVariable.productList.pageNumber);
    });
}

/* 导出商品 */
function exportProduct() {
    var m_conditionObj = getQueryCondition();

    var m_ss_product = new sm.ss_product();
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_ss_product.PdcIds = m_conditionObj.pdcIds;
    m_ss_product.BrandId = m_conditionObj.brandId;
    m_ss_product.Key = m_conditionObj.keyWord;
    m_ss_product.SkuProdCode = m_conditionObj.skuProdCode;
    m_ss_product.PropValueIds = m_conditionObj.propValueIds;
    m_ss_product.ProdState = m_conditionObj.prodState;

    m_ss_product.exportSSProducts(function (paramObj) {
        window.open(paramObj);
    });
}
/* 导出Wish商品 */
function exportWishNewProduct() {
    var m_conditionObj = getQueryCondition();

    var m_ss_product = new sm.ss_product();
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_ss_product.exportWishProduct(function (paramObj) {
        window.open(paramObj);
    });
}

/* 预览商品描述 */
function previewProdDesc() {
    var m_openfrm = window.open("_proddesc.htm", '', 'height=600, width=1180, top=60, left=30, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');

    m_openfrm.document.write($("#ssProdHtmlTool").val());
}

/* 初始化商品属性列表 */
function initSalePdcNavProp() {

    if (!pageVariable.salePdcNavPropList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 3;
        pageVariable.salePdcNavPropList = new uicontrol.tableList("salePdcNavPropList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: mainFormHeight,
                                        keyColumn: "PdcProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 120, align: 'left', adjust: true, createCell: constructProdPropNameCell },
                                                { display: mlm.C0070, name: "IsSku", width: 70, align: 'center', adjust: true, createCell: constructIsSkuCell },
                                                { display: mlm.C0126, name: "IsKeyAttribute", width: 60, align: 'center', adjust: true, createCell: constructIsKeyAttributeCell },
                                                { display: mlm.C0071, name: "PValueRange", width: 540, align: 'left', adjust: true, createCell: constructPValueRangeCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: constructPdcPropOperaCell}]
                                    });
    }
}
/* */
function constructProdPropNameCell(key, cellValue) {
    if (saleplatform.currSaleSite_Id == 11 || saleplatform.currSaleSite_Id == 23) {
        if (pageVariable.temp_smtpropDict && !pageVariable.temp_smtpropDict.containKey(this.keyObj.SMT_ProdProperty_Id)) {
            if (!this.keyObj.SMT_ProdProperty_Id) {
                return "<span style='color: blue'>" + cellValue + "</span>";
            }
            else {
                return "<span style='font-style: italic; color: #800000'>" + cellValue + "</span>";
            }
        }
        else {
            if (pageVariable.errorpropDict.containKey(this.keyObj.SS_ProdCategory_Id + "-" + this.keyObj.ProdProperty_Id)) {
                return "<span style='color: red'>" + cellValue + "</span>";
            }
            else {
                return cellValue;
            }
        }
    }
    else {
        return cellValue;
    }
}
/* */
function constructPValueRangeCell(key, cellValue) {
    var m_obj = this;
    //速卖通站点 
    if ((saleplatform.currSaleSite_Id == 11 || saleplatform.currSaleSite_Id == 23) && cellValue) {
        var m_arr = cellValue.split(",");
        if (m_arr) {
            var m_items = [];
            $.each(m_arr, function () {
                var m_pv = $.trim(this).toLowerCase();
                var m_key = m_obj.keyObj.SS_ProdCategory_Id + "-" + m_obj.keyObj.SMT_ProdProperty_Id + "-" + m_pv;
                if (pageVariable.smterrorpvalues.containKey(m_key)) {
                    m_items.push("<span style='color: red'>" + this + "</span>");
                }
                else {
                    if (pageVariable.smtpvaluesDict.containKey(m_key)) {
                        m_items.push("<span style='color: #000000'>" + this + "</span>");
                    }
                    else {
                        var m_pvalue = pageVariable.pvalueDict.getItem(m_obj.keyObj.ProdProperty_Id + "-" + this);
                        if (m_pvalue && m_pvalue.SMT_PropValue_Id) {
                            m_items.push("<span style='font-style: italic; color: #800000'>" + this + "</span>");
                        }
                        else {
                            m_items.push("<span style='color: blue'>" + this + "</span>");
                        }
                    }
                }
            });

            return m_items.join(",");
        }
    }
    else {
        return cellValue;
    }
}
/* 创建属性类型的单元格 */
function constructIsSkuCell(key, cellValue) {
    return getIsSkuStr(cellValue);
}
function getIsSkuStr(isSku) {
    var m_retvalue = "";
    if (isSku == "1") {
        m_retvalue = mlm.C0128;
    }
    else {
        m_retvalue = mlm.C0125;
    }

    return m_retvalue;
}
/* 创建关键属性的单元格 */
function constructIsKeyAttributeCell(key, cellValue) {
    return getIsKeyAttributeStr(cellValue);
}
function getIsKeyAttributeStr(isQuery) {
    var m_retvalue = "";
    if (isQuery == "1") {
        m_retvalue = mlm.C0108;
    }
    else {
        m_retvalue = mlm.C0109;
    }

    return m_retvalue;
}
/* 创建分类属性操作设置列 */
function constructPdcPropOperaCell(key, cellvalue) {

    if (this.keyObj.SS_ProdCategory_Id == pageVariable.salePdcNavTree.selectedItem.key) {
        return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openModifyPdcProp.call(this);'>" + mlm.C0061 + "</a>" +
           "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='openDeletePdcProp.call(this);'>" + mlm.C0062 + "</a>";
    }
}

/* 加载商品属性 */
function loadSalePdcNavProp() {

    if (pageVariable.salePdcNavTree.selectedItem) {

        var m_pdcproperty = new pdm.pdcproperty();
        $("#lbPdcName").html("(" + pageVariable.salePdcNavTree.selectedItem.value + ")");

        m_pdcproperty.SS_ProdCategory_Id = pageVariable.salePdcNavTree.selectedItem.key;

        m_pdcproperty.getPdcProps(function (source) {

            //速卖通站点
            if (saleplatform.currSaleSite_Id == 11 || saleplatform.currSaleSite_Id == 23) {
                var m_firstpdcid = m_pdcproperty.SS_ProdCategory_Id;
                var m_pdcindexs = pageVariable.salePdcNavTree.selectedItem.tag.PdcIndexs;
                if (m_pdcindexs) {
                    m_firstpdcid = m_pdcindexs.split(",")[0].replaceAll("#", "");
                }
                pageVariable.temp_smtpropDict = new datastruct.dictionary();

                if (pageVariable.smtproperty) {
                    var smtattributes = pageVariable.smtproperty[m_firstpdcid];
                    if (smtattributes) {
                        $.each(smtattributes.attributes, function () {
                            pageVariable.temp_smtpropDict.setItem(this.id, null);
                        });
                    }
                }
            }
            else {
                pageVariable.temp_smtpropDict = null;
            }

            pageVariable.salePdcNavPropList.bindDataSource(source);
        });
    }
}

/* 初始化商品分类导航的处理窗体 */
function initHandlerSalePdcNavFrm() {
    if (!pageVariable.handlerSalePdcNavFrm) {
        pageVariable.handlerSalePdcNavFrm = new uicontrol.dialog("handlerSalePdcNavFrm", "", { width: 800 }, saveSalePdcNav);

        pageVariable.ulNavType = new uicontrol.selectbox("ulNavType", "radio");
        pageVariable.ulNavType.bindSource([{ key: "1", value: mlm.C1046 }, { key: "2", value: mlm.C0627}]);

        pageVariable.ulNavType.setSelectedItem([{ key: "1"}]);
    }

    if (!pageVariable.selParentSalePdcNav) {
        pageVariable.selParentSalePdcNav = new bizcontrol.selectpdc($("#selParentSalePdcNav"), null, saleplatform.currSalePlatformId, saleplatform.currSaleSite_Id);
    }

    pageVariable.selParentSalePdcNav.shoppingSiteId = saleplatform.currSalePlatformId;
    pageVariable.selParentSalePdcNav.salesite_id = saleplatform.currSaleSite_Id;
}
/* 打开新增商品分类导航的窗体 */
function openNewSalePdcNavFrm() {

    initHandlerSalePdcNavFrm();

    $("#txtSalePdcNav").val("");
    var m_parentPdc = pageVariable.salePdcNavTree.selectedItem;
    if (m_parentPdc) {
        pageVariable.selParentSalePdcNav.setPdc({ ProdCategory_Id: m_parentPdc.key, PdcName: pageVariable.salePdcNavTree.getTextValue(m_parentPdc.key, true) });
    }

    pageVariable.handlerSalePdcNavFrm.prodcategory_Id = 0;
    pageVariable.handlerSalePdcNavFrm.action = "New";
    pageVariable.handlerSalePdcNavFrm.setTitle(mlm.C0461 + mlm.C1046);
    pageVariable.handlerSalePdcNavFrm.show();
}
/* 打开修改商品分类导航的窗体 */
function openModifySalePdcNavFrm() {

    initHandlerSalePdcNavFrm();

    var m_selectedItem = pageVariable.salePdcNavTree.selectedItem;
    if (!m_selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1124);
        return;
    }

    $("#txtSalePdcNav").val(m_selectedItem.tag.PdcName);
    $("#txtPicWidth").val(m_selectedItem.tag.BrowserPicWidth);
    $("#txtPicHeight").val(m_selectedItem.tag.BrowserPicHeight);
    $("#txtSMTPdc").val(m_selectedItem.tag.SMT_ProdCategory_Id);
    $("#txtSMTGroup").val(m_selectedItem.tag.SMT_Group_Id);

    pageVariable.ulNavType.setSelectedItem([{ key: m_selectedItem.tag.IsPdcMenu}]);

    var m_parentKey = pageVariable.salePdcNavTree.selectedItem.parentKey;
    pageVariable.selParentSalePdcNav.setPdc({ ProdCategory_Id: m_parentKey, PdcName: pageVariable.salePdcNavTree.getTextValue(m_parentKey, true) });

    pageVariable.handlerSalePdcNavFrm.prodcategory_Id = m_selectedItem.key;
    pageVariable.handlerSalePdcNavFrm.action = "Modify";
    pageVariable.handlerSalePdcNavFrm.setTitle(mlm.C0061 + mlm.C1046);
    pageVariable.handlerSalePdcNavFrm.show();
}
/* 打开删除商品分类导航的窗体 */
function openDeleteSalePdcNavFrm() {
    if (!pageVariable.delSalePdcNavFrm) {
        pageVariable.delSalePdcNavFrm = new uicontrol.confirmDelete(deleteSalePdcNav);
    }

    var m_pdc = pageVariable.salePdcNavTree.selectedItem;
    if (!m_pdc) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1124);
        return;
    }

    pageVariable.delSalePdcNavFrm.prodcategory_Id = m_pdc.key;
    pageVariable.delSalePdcNavFrm.showConfirm(mlm.C0100 + "(" + m_pdc.value + ") ?");
}
/* 保存商品分类导航 */
function saveSalePdcNav() {

    var m_pdcnav = $.trim($("#txtSalePdcNav").val());
    if (!m_pdcnav) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1046 + mlm.C0451);
        return;
    }

    var m_salepdcnavigation = new sm.salepdcnavigation();
    m_salepdcnavigation.ProdCategory_Id = pageVariable.handlerSalePdcNavFrm.prodcategory_Id;
    m_salepdcnavigation.ParentPdc_Id = pageVariable.selParentSalePdcNav.pdcId;
    m_salepdcnavigation.SalePlatform_Id = saleplatform.currSalePlatformId;
    m_salepdcnavigation.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salepdcnavigation.PdcName = m_pdcnav;
    m_salepdcnavigation.IsPdcMenu = pageVariable.ulNavType.getSelectedItemObj()[0].key;
    m_salepdcnavigation.BrowserPicWidth = $("#txtPicWidth").val();
    m_salepdcnavigation.BrowserPicHeight = $("#txtPicHeight").val();
    m_salepdcnavigation.SMT_ProdCategory_Id = $("#txtSMTPdc").val();
    m_salepdcnavigation.SMT_Group_Id = $("#txtSMTGroup").val();

    if (pageVariable.handlerSalePdcNavFrm.action == "New") {
        m_salepdcnavigation.newSalePdcNavigation(function (retObj) {

            var m_obj = [{ key: retObj.ProdCategory_Id, value: retObj.PdcName, parentKey: retObj.ParentPdc_Id, tag: retObj, children: []}];

            pageVariable.pdcTree.addChildItem(m_obj);
            pageVariable.salePdcNavTree.addChildItem(m_obj);

            pageVariable.handlerSalePdcNavFrm.close();

            if (pageVariable.selParentSalePdcNav) {
                pageVariable.selParentSalePdcNav.pdcSource = null;
            }
            if (pageVariable.selQueryPdc) {
                pageVariable.selQueryPdc.pdcSource = null;
            }

            //刷新速卖通分组状态
            refreshSMTGroupState();
        });
    }
    else {

        var m_oldParentPdcId = pageVariable.salePdcNavTree.selectedItem.parentKey;

        m_salepdcnavigation.modifySalePdcNavigation(function () {
            if (m_oldParentPdcId == m_salepdcnavigation.ParentPdc_Id) {

                var m_sourceObj = pageVariable.salePdcNavTree.getItem(m_salepdcnavigation.ProdCategory_Id).sourceItem;
                var m_modified_obj_1 = m_sourceObj.tag;
                m_modified_obj_1.IsPdcMenu = m_salepdcnavigation.IsPdcMenu;
                m_modified_obj_1.PdcName = m_salepdcnavigation.PdcName;
                m_modified_obj_1.SMT_ProdCategory_Id = m_salepdcnavigation.SMT_ProdCategory_Id;
                m_modified_obj_1.SMT_Group_Id = m_salepdcnavigation.SMT_Group_Id;
                pageVariable.salePdcNavTree.modifyChildItem(m_salepdcnavigation.ProdCategory_Id, m_salepdcnavigation.PdcName, m_modified_obj_1);

                var m_modified_obj_2 = pageVariable.pdcTree.getItem(m_salepdcnavigation.ProdCategory_Id).sourceItem.tag;
                m_modified_obj_2.IsPdcMenu = m_salepdcnavigation.IsPdcMenu;
                m_modified_obj_2.PdcName = m_salepdcnavigation.PdcName;
                m_modified_obj_2.BrowserPicWidth = m_salepdcnavigation.BrowserPicWidth;
                m_modified_obj_2.BrowserPicHeight = m_salepdcnavigation.BrowserPicHeight;
                m_modified_obj_2.SMT_ProdCategory_Id = m_salepdcnavigation.SMT_ProdCategory_Id;
                m_modified_obj_2.SMT_Group_Id = m_salepdcnavigation.SMT_Group_Id;
                pageVariable.pdcTree.modifyChildItem(m_salepdcnavigation.ProdCategory_Id, m_salepdcnavigation.PdcName, m_modified_obj_2);

                $("#lbPdcName").html("(" + m_salepdcnavigation.PdcName + ")");

                //刷新速卖通分组状态
                refreshSMTGroupState();
            }
            else {
                loadPdcs(function () {
                    pageVariable.pdcTree.selTvItem(m_salepdcnavigation.ProdCategory_Id);
                    pageVariable.salePdcNavTree.selTvItem(m_salepdcnavigation.ProdCategory_Id);

                    //刷新速卖通分组状态
                    refreshSMTGroupState();
                });
            }

            pageVariable.handlerSalePdcNavFrm.close();

            if (pageVariable.selParentSalePdcNav) {
                pageVariable.selParentSalePdcNav.pdcSource = null;
            }
            if (pageVariable.selQueryPdc) {
                pageVariable.selQueryPdc.pdcSource = null;
            }
        });
    }

}
/* 删除商品分类导航 */
function deleteSalePdcNav() {
    var m_salepdcnavigation = new sm.salepdcnavigation();
    m_salepdcnavigation.ProdCategory_Id = pageVariable.delSalePdcNavFrm.prodcategory_Id;
    m_salepdcnavigation.deleteSalePdcNavigation(function () {

        loadPdcs(refreshSMTGroupState);

        if (pageVariable.selParentSalePdcNav) {
            pageVariable.selParentSalePdcNav.pdcSource = null;
        }

        if (pageVariable.selQueryPdc) {
            pageVariable.selQueryPdc.pdcSource = null;
        }

        $("#lbPdcName").text("");

        pageVariable.delSalePdcNavFrm.close();
    });
}

/* 向上移动商品分类导航 */
function moveupPdcNav() {
    var m_pdc = pageVariable.salePdcNavTree.selectedItem;
    if (!m_pdc) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1124);
        return;
    }

    var m_salepdcnavigation = new sm.salepdcnavigation();
    m_salepdcnavigation.ProdCategory_Id = m_pdc.key;
    m_salepdcnavigation.Direction = "0";
    m_salepdcnavigation.modifyPdcNavSeq(function () {
        loadPdcs(function () { pageVariable.salePdcNavTree.selTvItem(m_pdc.key); });
    });
}
/* 向下移动商品分类导航 */
function movedownPdcNav() {
    var m_pdc = pageVariable.salePdcNavTree.selectedItem;
    if (!m_pdc) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1124);
        return;
    }

    var m_salepdcnavigation = new sm.salepdcnavigation();
    m_salepdcnavigation.ProdCategory_Id = m_pdc.key;
    m_salepdcnavigation.Direction = "1";
    m_salepdcnavigation.modifyPdcNavSeq(function () {
        loadPdcs(function () { pageVariable.salePdcNavTree.selTvItem(m_pdc.key); });
    });
}

/* 初始化商品分类-属性的窗体 */
function initPdcPropFrm(event) {

    if (!pageVariable.handlerPdcPropFrm) {
        pageVariable.handlerPdcPropFrm = new uicontrol.dialog("handlerPdcPropFrm", "", { width: 800, position: ["auto", 15] }, savePdcProp);

        var m_propTypeCtrl = $("#ddlPdcPropType");
        m_propTypeCtrl.append("<option value='1'>" + mlm.C0128 + "</option>");
        m_propTypeCtrl.append("<option value='2'>" + mlm.C0125 + "</option>");

        var m_dSQChoiceCtrl = $("#ddlSQChoice");
        m_dSQChoiceCtrl.append("<option value='1'>" + mlm.C0108 + "</option>");
        m_dSQChoiceCtrl.append("<option value='2'>" + mlm.C0109 + "</option>");
    }

    var m_PropsCtrl = $("#ddlPdcProp");
    if (!pageVariable.propSource) {
        var prodproperty = new pdm.prodproperty();
        prodproperty.getAllProdPropertys(function (source) {
            pageVariable.propSource = {};

            pageVariable.propSource.table = source;
            pageVariable.propSource.objs = datastruct.convertion.tableToJson(source);

            m_PropsCtrl.empty();
            $.each(pageVariable.propSource.objs, function () {
                m_PropsCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
            });

            if (event) {
                event();
            }

            pageVariable.handlerPdcPropFrm.show();
        });
    }
    else {
        if (pageVariable.propSource.objs.length > 0 && m_PropsCtrl.children().length == 0) {
            m_PropsCtrl.empty();
            $.each(pageVariable.propSource.objs, function () {
                m_PropsCtrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
            });
        }

        if (event) {
            event();
        }

        pageVariable.handlerPdcPropFrm.show();
    }
}
/* 构建属性值图片列 */
function constructPropPicCell(key, cellValue) {

    if ($.trim(cellValue)) {
        var m_src = window.webLocation + cellValue;
        return "<img class='product-list-img' src='" + m_src + "' />";
    }
    else {
        return "";
    }
}

/* 打开新增商品分类-属性的窗体 */
function openNewPdcProp() {

    var m_selectedItem = pageVariable.salePdcNavTree.selectedItem;
    if (!m_selectedItem) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1124);
        return;
    }

    if (!m_selectedItem.tag.IsPdcMenu) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1125);
        return;
    }

    $("#ddlPdcProp").attr("disabled", false);
    $("#txtPdcPropSeq").attr("disabled", "disabled").val(mlm.C0142);

    initPdcPropFrm();
    pageVariable.handlerPdcPropFrm.PdcProperty_Id = 0;

    pageVariable.handlerPdcPropFrm.action = "New";
    pageVariable.handlerPdcPropFrm.setTitle(mlm.C0244);
}
/* 打开修改商品分类-属性的窗体 */
function openModifyPdcProp() {

    var m_pdcProperty_Id = $(this).attr("tag");

    var m_pdcproperty = new pdm.pdcproperty();
    m_pdcproperty.PdcProperty_Id = m_pdcProperty_Id;
    m_pdcproperty.readPdcProperty(function (retObj) {

        initPdcPropFrm(function () {
            var m_propCtrl = $("#ddlPdcProp");
            m_propCtrl.val(retObj.ProdProperty_Id);
            m_propCtrl.attr("disabled", true);

            $("#txtPdcPropSeq").attr("disabled", false).val(retObj.Seq);
            pageVariable.handlerPdcPropFrm.seq = retObj.Seq;
            pageVariable.handlerPdcPropFrm.PdcProperty_Id = m_pdcProperty_Id;
            pageVariable.handlerPdcPropFrm.action = "Modify";
            pageVariable.handlerPdcPropFrm.setTitle(mlm.C0245);
        });
    });
}
/* 打开删除商品分类-属性的窗体 */
function openDeletePdcProp() {
    if (!pageVariable.delPdcPropFrm) {
        pageVariable.delPdcPropFrm = new uicontrol.confirmDelete(deletePdcProp);
    }

    pageVariable.delPdcPropFrm.PdcProperty_Id = $(this).attr("tag");

    pageVariable.delPdcPropFrm.showConfirm(mlm.C0242);
}
/* 保存商品属性 */
function savePdcProp() {
    var m_prodpropId = $("#ddlPdcProp").val();
    if (!m_prodpropId) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0623);
        return;
    }

    var m_pdcproperty = new pdm.pdcproperty();

    m_pdcproperty.PdcProperty_Id = pageVariable.handlerPdcPropFrm.PdcProperty_Id;
    m_pdcproperty.SS_ProdCategory_Id = pageVariable.salePdcNavTree.selectedItem.key;
    m_pdcproperty.ProdProperty_Id = m_prodpropId;
    m_pdcproperty.IsKeyAttribute = $("#ddlSQChoice").val();
    m_pdcproperty.IsSku = $("#ddlPdcPropType").val();

    if (pageVariable.handlerPdcPropFrm.action == "New") {

        var m_repeat = false;
        var m_currPdcProps = pageVariable.salePdcNavPropList.dataSource.items.arrValues;
        $.each(m_currPdcProps, function () {
            if (this.ProdProperty_Id == m_prodpropId) {
                m_repeat = true;
            }
        });

        if (m_repeat) {
            pageframe.control.alertDialog.showAlertInfo(mlm.C0624);
            return;
        }

        m_pdcproperty.newPdcProperty(function (retObj) {

            retObj.PValueRange = retObj.ProdProperty.OtherProps.PValueRange;
            retObj.SMT_ProdProperty_Id = retObj.ProdProperty.SMT_ProdProperty_Id;
            retObj.PValueIdRange = retObj.OtherProps.PValueIdRange;
            retObj.ProdPropName = retObj.OtherProps.ProdPropName;
            pageVariable.salePdcNavPropList.addData(retObj.PdcProperty_Id, retObj);

            //速卖通平台
            if (saleplatform.currSaleSite_Id == "11" || saleplatform.currSaleSite_Id == "23") {
                //检测速卖通属性
                var m_pdcid = pageVariable.salePdcNavTree.selectedItem.key;
                var m_proparr = pageVariable.pdcpropertySource[m_pdcid];
                if (!m_proparr) {
                    m_proparr = [];
                }
                m_proparr.push(retObj);
                pageVariable.pdcpropertySource[m_pdcid] = m_proparr;
                checkSMTProperty(m_pdcid, pageVariable.salePdcNavTree.selectedItem.tag.PdcName);
            }

            pageVariable.handlerPdcPropFrm.close();
        });
    }
    else {
        m_pdcproperty.Seq = $("#txtPdcPropSeq").val();
        m_pdcproperty.modifyPdcProperty(function (retObj) {

            if (pageVariable.handlerPdcPropFrm.seq == m_pdcproperty.Seq) {

                var m_modifieditem = pageVariable.salePdcNavPropList.getItem(m_pdcproperty.PdcProperty_Id);
                m_modifieditem.IsKeyAttribute = m_pdcproperty.IsKeyAttribute;
                m_modifieditem.IsSku = m_pdcproperty.IsSku;
                m_modifieditem.PValueRange = retObj.ProdProperty.OtherProps.PValueRange;
                m_modifieditem.PValueIdRange = retObj.OtherProps.PValueIdRange;

                pageVariable.salePdcNavPropList.modifyData(m_modifieditem.PdcProperty_Id, m_modifieditem);
            }
            else {
                loadSalePdcNavProp();
            }

            pageVariable.handlerPdcPropFrm.close();
        });
    }
}
/* 删除商品属性 */
function deletePdcProp() {
    var m_pdcproperty = new pdm.pdcproperty();

    m_pdcproperty.PdcProperty_Id = pageVariable.delPdcPropFrm.PdcProperty_Id;
    m_pdcproperty.deletePdcProperty(function () {

        var m_deletedobj = pageVariable.salePdcNavPropList.getItem(m_pdcproperty.PdcProperty_Id);

        pageVariable.salePdcNavPropList.deleteData(m_pdcproperty.PdcProperty_Id, function (leavedItem) {
            leavedItem.Seq = leavedItem.Seq - 1;
        });

        //检测速卖通属性
        var m_pdcid = pageVariable.salePdcNavTree.selectedItem.key;
        var m_proparr = pageVariable.pdcpropertySource[m_pdcid];
        var m_arr = [];
        $.each(m_proparr, function () {
            if (this.ProdProperty_Id != m_deletedobj.ProdProperty_Id) {
                m_arr.push(this);
            }
        });
        pageVariable.pdcpropertySource[m_pdcid] = m_arr;
        checkSMTProperty(m_pdcid, pageVariable.salePdcNavTree.selectedItem.tag.PdcName);

        pageVariable.delPdcPropFrm.close();
    });
}

/* 查看销售统计 */
function viewSaleStatFrm(ss_product_id) {
    if (!pageVariable.viewSaleStatFrm) {
        pageVariable.viewSaleStatFrm = new uicontrol.dialog("viewSaleStatFrm", mlm.C1275, { width: 900, position: ["auto", 15] });

        pageVariable.viewSaleStatFrm.show();
        pageVariable.salestatList = new uicontrol.tableList("salestatList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 400,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: constructSkuProdPicCell },
                                                   { display: mlm.C0734, name: "ProdName", width: 300, align: 'left', adjust: true, createCell: constructSSProdNameCell },
                                                   { display: mlm.C0174, name: "SkuProps", width: 100, align: 'left', adjust: true, createCell: constructStarCell },
                                                   { display: mlm.C1090, name: "SkuProdCode", width: 100, align: 'left', adjust: true, createCell: constructStarCell },
                                                   { display: mlm.C1257, name: "CMonthSaleCount", width: 60, align: 'right', adjust: true, createCell: constructStarQtyCell },
                                                   { display: mlm.C1258, name: "AllSaleCount", width: 60, align: 'right', adjust: true, createCell: constructStarQtyCell}]
                                    });
    }
    else {

        pageVariable.viewSaleStatFrm.show();
    }

    var m_product = new sm.ss_product();
    m_product.SS_Product_Id = ss_product_id;
    m_product.querySSProdSaleStat(function (retTable) {
        pageVariable.salestatList.bindDataSource(retTable);
    });
}
/*  */
function constructStarCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_css = "";
    if (m_obj.EnableFlag == "0") {
        m_css = "color: #DD0000"
    }

    return "<div style='padding: 0px; " + m_css + "'>" + cellValue + "</div>";
}
/*  */
function constructStarQtyCell(key, cellValue) {
    if (Number(cellValue) > 0) {
        var m_obj = this.keyObj;

        var m_css = "";
        if (m_obj.EnableFlag == "0") {
            m_css = "color: #DD0000"
        }

        return "<div style='padding: 0px; " + m_css + "'>" + commoncore.func.constructQtyCell(key, cellValue) + "</div>";
    }
}
/* 查看供应商 */
function openViewSuppFrm(key) {
    if (!pageVariable.openViewSuppFrmFrm) {
        pageVariable.openViewSuppFrmFrm = new bizcontrol.viewsupplier();
    }

    pageVariable.openViewSuppFrmFrm.show(key);
}
/*  */
function syncSSProducts() {

    var m_ss_product = new sm.ss_product(); 
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_ss_product.SalePlatform_Id = saleplatform.currSalePlatformId;
    m_ss_product.syncSSProducts(function (paramObj) { });
}
/*  */
function importProductByPic() {
    var m_ss_product = new sm.ss_product(); 
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_ss_product.SalePlatform_Id = saleplatform.currSalePlatformId;
    m_ss_product.importSSProductByPicture(function (paramObj) { });
}
/* 下载速卖通商品 */
function downloadSMTProd() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    if (pageVariable.pdcTree.selectedItem) {
        m_ss_product.SSPdcId = pageVariable.pdcTree.selectedItem.key;
    }

    m_ss_product.syncSMTProductList(function (paramObj) {
        if (paramObj.indexOf(".xls") > -1) {
            window.open(paramObj);
        }
        else {
            if (paramObj == "ok") {
                queryProduct(1, pageVariable.productList.pageNumber);
            }
            else {
                pageframe.control.alertDialog.showAlertInfo(paramObj);
            }
        }
    });
} 
function downloadSMTSingleProd() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_ss_product.SS_Product_Id = $(this).attr("tag");

    m_ss_product.syncSMTProductList(function (paramObj) {
        if (paramObj.indexOf(".xls") > -1) {
            window.open(paramObj);
        }
        else {
            if (paramObj == "ok") {
                var m_product = pageVariable.productList.getItem(m_ss_product.SS_Product_Id);
                m_product.State = 2;
                m_product.SMT_Product_Id = 999;
                m_product.cssstyle = null;
                pageVariable.productList.modifyData(m_ss_product.SS_Product_Id, m_product);
            }
            else {
                pageframe.control.alertDialog.showAlertInfo(paramObj);
            }
        }
    });
}

/* 生成商品备注 */
function generateProdRemark() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
    if (pageVariable.pdcTree.selectedItem) {
        m_ss_product.SSPdcId = pageVariable.pdcTree.selectedItem.key;
    }

    m_ss_product.generateSSProdRemark(function (paramObj) {
        if (paramObj.indexOf(".xls") > -1) {
            window.open(paramObj);
        }
        else {
            queryProduct(1, pageVariable.productList.pageNumber);
        }
    });
}
/* 打开发布速卖通窗体 */
function openPublishSMTFrm() {
    if (!pageVariable.publishSMTFrm) {
        pageVariable.publishSMTFrm = new uicontrol.dialog("publishSMTFrm", "发布商品", { width: 800 }, pulishSMT);
    }

    pageVariable.publishSMTFrm.ss_product_id = $(this).attr("tag");
    pageVariable.publishSMTFrm.show();
}
/* 发布速卖通商品 */
function pulishSMT() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SS_Product_Id = pageVariable.publishSMTFrm.ss_product_id;

    if (!m_ss_product.SS_Product_Id) {
        var m_conditionObj = getQueryCondition();

        m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;
        m_ss_product.PdcIds = m_conditionObj.pdcIds;
        m_ss_product.BrandId = m_conditionObj.brandId;
        m_ss_product.Key = m_conditionObj.keyWord;
        m_ss_product.SkuProdCode = m_conditionObj.skuProdCode;
        m_ss_product.PropValueIds = m_conditionObj.propValueIds;
        m_ss_product.ProdState = m_conditionObj.prodState;

        m_ss_product.batchPublishSMTProduct(function (paramObj) {

            queryProduct(1, pageVariable.productList.pageNumber);

            pageVariable.publishSMTFrm.close();
        });
    }
    else {
        m_ss_product.publishSMTProduct(function (paramObj) {

            var m_product = pageVariable.productList.getItem(m_ss_product.SS_Product_Id);

            m_product.SMT_Product_Id = paramObj;
            m_product.State = 2;
            m_product.cssstyle = null;

            pageVariable.productList.modifyData(m_product.SS_Product_Id, m_product);
            pageVariable.publishSMTFrm.close();
        });
    }

}

/* 检测速卖通商品 */
function checkSMTProd() {
    var m_ss_product = new sm.ss_product();
    m_ss_product.SaleSite_Id = saleplatform.currSaleSite_Id;

    m_ss_product.checkSMTProductProhibitedWords(function (paramObj) {
        if (paramObj.indexOf(".xls") > -1) {
            window.open(paramObj);
        }
        else {
            if (paramObj == "ok") {
                pageframe.control.alertDialog.showAlertInfo("所有产品都不存在违禁词");
            }
            else {
                pageframe.control.alertDialog.showAlertInfo(paramObj);
            }
        }
    });
}
/*  */
function openImportCheckSMTKeywordFrm() {
    if (!pageVariable.checkSMTKeywordFrm) {
        pageVariable.checkSMTKeywordFrm = new uicontrol.dialog("checkSMTKeywordFrm", "", { width: 800 }, checkProhibitedWords);
        pageVariable.chksmtkwFile = new uicontrol.file("chksmtkwFile");
    }

    pageVariable.checkSMTKeywordFrm.setTitle("检测关键词合法性(速卖通)");

    pageVariable.checkSMTKeywordFrm.show();
}
/*  */
function checkProhibitedWords() {
    if (!$("#chksmtkwFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    var m_ss_product = new sm.ss_product();
    m_ss_product.checkProhibitedWords(pageVariable.chksmtkwFile, function (retObj) {
        if (retObj) {
            window.open(retObj);
        }
        pageVariable.checkSMTKeywordFrm.close();
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* 浏览图宽度 */
    $("#lbPicWidth").text(mlm.C0407 + ":");
    /* 浏览图高度 */
    $("#lbPicHeight").text(mlm.C0408 + ":");

    /* 查询条件 */
    $("#lkProdQueryCond").text(mlm.C1034);
    /* 高级查询 */
    $("#lkAdvaQueryCond").text(mlm.C1035 + mlm.C1034);
    /* 排序条件 */
    $("#lbProdSortCond").text(mlm.C1036);
    /* 关键字 */
    $("#lbKeyWord_q").text(mlm.C0184 + ":");
    /* 所有分类 */
    $("#lbPdc_q").text(mlm.C1046);
    /* 品牌 */
    $("#lbBrandName_q, #lbSSBrandSymbol").text(mlm.C0112 + ":");
    /* 商品状态 */
    $("#lbProdState_q").text(mlm.C0398 + ":");
    /* 关键属性列表 */
    $("#lbQueryPropTitle").text(mlm.C1037 + mlm.C0463);
    /* 添加属性 */
    $("#btAddQueryProp").val(mlm.C0530 + mlm.C0631);
    /* 属性 */
    $("#lbSelPropSymbol").text(mlm.C0631 + ":");
    /* 属性值列表 */
    $("#lbSelQueryPropTitle").text(mlm.C0071);
    /* 站内商品信息 */
    $("#lbSSProdSymbol").text(mlm.C1030);
    /* 图片列表 */
    $("#lbSSProdPicSymbol").text(mlm.C0180 + mlm.C0463);
    /* 商品详细介绍 */
    $("#lbSSProdDescSymbol").text(mlm.C0173);
    /* 内部映射关系 */
    $("#lbInnerProdSymbol").text(mlm.C1043);
    /* 商品配送服务 */
    $("#lbExpServiceTitleSymbol").text(mlm.C0431);
    /* 商品销售定价 */
    $("#lbSalePriceTitleSymbol").text(mlm.C1044);
    /* 商品利润分析 */
    $("#lbAnalyProfitSymbol").text(mlm.C1045);
    /* 商品名称 */
    $("#lbSSProdNameSymbol").text(mlm.C0175 + ":");
    /* 商品名称 */
    $("#lbSSProdNameSymbol").text(mlm.C0175 + ":");
    /* 商品导航 */
    $("#lbPdcNavSymbol").text(mlm.C1046 + ":");
    /* 商品编码 */
    $("#lbSSProdCode").text(mlm.C0194 + ":");
    /* 单位 */
    $("#lbSSUnitSymbol").text(mlm.C1048 + ":");
    /* 包裹体积 */
    $("#lbBoxVolumnSymbol").text(mlm.C1031 + "(cm³):");
    /* 状态 */
    $("#lbSSStateSymbol").text(mlm.C0367 + ":");
    /* SKU属性及详细参数 */
    $("#lbSSPropsTitle").text(mlm.C0628);
    /* 图片列表 */
    $("#lbSSPicTitle").text(mlm.C0180 + mlm.C0463);
    /* 清理所有图片 */
    $("#btClearSSPic").val(mlm.C0251);
    /* 上传图片 */
    $("#btUploadSSPic").val(mlm.C0252);
    /* 商品详细介绍支持html代码，html代码请在专业网页编辑软件(例如：Dreamware)中进行编辑 */
    $("#lbSSProdDescAlert").text(mlm.C0253);
    /* 界面预览 */
    $("#btViewSS_RemarkPic").val(mlm.C0271);
    /* 内部映射关系列表 */
    $("#lbInnerProdTitle").text(mlm.C1043 + mlm.C0463);
    /* 销售定价列表 */
    $("#lbSalePriceTitle").text(mlm.C1049 + mlm.C0463);
    /* 统一设置 */
    $("#btBatchSetSalePrice").val(mlm.C1050);
    /* 配送服务列表 */
    $("#lbExpTitle").text(mlm.C0436 + mlm.C0463);
    /* 导入报价 */
    $("#btImportExpPrice").val(mlm.C0986 + mlm.C1051);
    /* 导出报价 */
    $("#btExportExpPrice").val(mlm.C0987 + mlm.C1051);
    /* 快递重量 */
    $("#lbSSWeightSymbol").text(mlm.C0250 + ":");
    /* 商品利润列表 */
    $("#lbProdProfitSymbol").text(mlm.C1052 + mlm.C0463);
    /* SKU单元 */
    $("#lbSKUSymbol").text(mlm.C0174 + ":");
    /* 交易成本 */
    $("#lbSSTransCostSymbol").text(mlm.C1056 + ":");
    /* 其他成本 */
    $("#lbSSOtherCostSymbol").text(mlm.C1057 + ":");
    /* 标准售价 */
    $("#lbListPriceSymbol").text(mlm.C0204 + ":");
    /* 折扣率 */
    $("#lbDiscountSymbol").text(mlm.C1058 + ":");
    /* 实际售价 */
    $("#lbSalePriceSymbol").text(mlm.C1059 + ":");
    /* 赠品选项 */
    $("#lbSSGiftTitle").text(mlm.C1060);
    /* 添加赠品 */
    $("#btAddGift").val(mlm.C0530 + mlm.C1061);
    /* 赠品描述 */
    $("#lbGiftSymbol").text(mlm.C1062 + ":");
    /* 内部商品列表 */
    $("#lbGiftItemTitle").text(mlm.C1055 + mlm.C0463);
    /* 添加商品 */
    $("#btAddGiftItem").val(mlm.C0530 + mlm.C0734); 
    /* 导入文件 */
    $("#lbImportFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
    /* 站内销售商品 */
    $("#lbSSSkuProdSymbol").text(mlm.C1053 + ":");
    /* 内部关联商品列表 */
    $("#lbGbomTitle").text(mlm.C1054 + mlm.C0463);
    /* 添加内部商品 */
    $("#btAddGbom").val(mlm.C0530 + mlm.C1055);
    /* 添加属性 */
    $("#btAddSSProp").val(mlm.C0530 + mlm.C0631);
    /* 商品属性 */
    $("#lbPropSymbol, #lbPdcPropSymbol").text(mlm.C0631 + ":");
    /* 属性类型 */
    $("#lbPropTypeSymbol, #lbPdcPropTypeSymbol").text(mlm.C0070 + ":");
    /* 序号 */
    $("#lbPropSeqSymbol, #lbPdcPropSeq").text(mlm.C0041 + ":");
    /* 关键属性 */
    $("#lbSupportQuerySymbol").text(mlm.C0126 + ":"); 
    /* 属性值列表 */
    $("#lbProdPValueSymbol").text(mlm.C0071);
    /* 添加属性值 */
    $("#btAddProdPValue").val(mlm.C0530 + mlm.C0608);
    /* 属性值 */
    $("#lbPValueSymbol").text(mlm.C0608 + ":");
    /* 属性值编码 */
    $("#lbPValueCodeSymbol").text(mlm.C0609 + ":");
    /* 图片 */
    $("#lbProdPic").text(mlm.C0180 + ":");
    /* 支持单张图片或zip格式的图片压缩包 */
    $("#lbProdPicAlert").text(mlm.C0256);
    /* 图片处理 */
    $("#lbPicHandlerSymbol").text(mlm.C1041 + ":");
    /* 序号 */
    $("#lbPicSeqSymbol").text(mlm.C0041);
    /* SKU相关属性值 */
    $("#lbRelPValueSymbol").text(mlm.C1042 + ":");
    /* 站点商品列表 */
    $("#lbSaleStrategyTag").text(mlm.C1033 + mlm.C0463);
    /* 商品导航 */
    $("#lbSalePdcNavTag").text(mlm.C1046);
    /* 销售区域 */
    $("#lbSaleSite_ComSymbol").text(mlm.C1011 + ":");
    /* 商品列表 */
    $("#lbProductTitle").text(mlm.C0168);
    /* 查询商品 */
    $("#btQueryProd").val(mlm.C0171);
    /* 新增商品 */
    $("#btNewProd").val(mlm.C0170);
    /* 商品搜索属性列表 */
    $("#lbSalePdcNavTitle").text(mlm.C1115);
    /* 维护商品导航 */
    $("#btOpereNav").val(mlm.C1116);
    /* 添加属性 */
    $("#btAddPdcProp").val(mlm.C0075);
    /* 新增导航 */
    $("#btNewSalePdcNav").text(mlm.C0461 + mlm.C1117);
    /* 修改导航 */
    $("#btModifySalePdcNav").text(mlm.C0061 + mlm.C1117);
    /* 删除导航 */
    $("#btDeleteSalePdcNav").text(mlm.C0062 + mlm.C1117);
    /* 上移导航 */
    $("#btMoveup").text(mlm.C0095 + mlm.C1117);
    /* 下移导航 */
    $("#btMovedown").text(mlm.C0096 + mlm.C1117);
    /* 商品导航 */
    $("#lbSalePdcNavSymbol").text(mlm.C1046 + ":");
    /* 上级商品导航 */
    $("#lbParentSalePdcNavSymbol").text(mlm.C1119 + mlm.C1046 + ":");
    /* 导航类型 */
    $("#lbNavTypeSymbol").text(mlm.C1120 + ":");

    /* 图片处理 */
    $("#lbPicFrom").text(mlm.C1137 + ":");
    /* 图片Url */
    $("#lbProdPicUrl").text(mlm.C0180 + "Url:");
    /* 略缩图Url */
    $("#lbBrowserPicUrl").text(mlm.C1138 + "Url:");
    /* 高清图Url */
    $("#lbSourcePicUrl").text(mlm.C1139 + "Url:");

    /* 商品SKU编码 */
    $("#lbSkuProdCode_q").text(mlm.C1205 + ":");
    /* 赠品 */
    $("#liGiftTitleSymbol").text(mlm.C1061);
    /* 设置商品包装 */
    $("#btSetSSProdBox").val(mlm.C1250);
    /* 包装重量 */
    $("#lbBoxWeightSymbol").text(mlm.C1252 + ":");
    /* （包装盒的净重，不包含商品重量） */
    $("#lbBoxWeightAlert").val(mlm.C1253);
    /* 重量限制 */
    $("#lbGiftWeightSymbol").text(mlm.C0798 + ":");
    /* 成本限制 */
    $("#lbGiftCostSymbol").text(mlm.C1254 + ":");
    /* 测算重量 */
    $("#lbExpWeightSymbol").text(mlm.C0806 + ":");
    /* 测算体积 */
    $("#lbExpVolumeSymbol").text(mlm.C1261 + "(cm³)" + ":");
    /* 报关价值 */
    $("#lbCustomValueSymbol").text(mlm.C1239 + ":");

    /* 商品排序 */
    $("#btManageProdSeq").val(mlm.C1215);
    /* 导出序号 */
    $("#btExportProdSeq").text(mlm.C0987 + mlm.C0041); 
    /* 导入序号 */
    $("#btImportProdSeq").text(mlm.C0986 + mlm.C0041);

    /* 销售统计列表 */
    $("#lbSaleStatTitle").text(mlm.C1276 + mlm.C0463 + ":");
    /* 商品排序 */
    $("#btRefreshProfit").val(mlm.C1508);
    /* 网站搜索关键字(Tags) */
    $("#lbSSProdTag").text(mlm.C1640);
    
    /* 批量处理 */
    $("#btBatchModifyProd").val(mlm.C1620);
    /* 导出商品 */
    $("#btExportProduct").text(mlm.C0987 + mlm.C0734);
    /* 导入商品 */
    $("#btImportProduct").text(mlm.C0986 + mlm.C0734);

    /* 必填 */
    $("#lbSymbol_1, #lbSymbol_2, #lbSymbol_4, #lbSymbol_6, #lbSymbol_7, #lbSymbol_8").text(mlm.C0049);

    /* ECMS-商品定价 */
    document.title = mlm.C0200;
}