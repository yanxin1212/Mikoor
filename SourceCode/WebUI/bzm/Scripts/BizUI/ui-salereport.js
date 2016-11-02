
/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {
    setLayout();
    pageframe.layout.resizeEventList.push(setLayout);

    $("#btGenerateSR").click(generateSaleReport);
    $("#btQuerySiteSale, #btQuerySiteSaleQty, #btQuerySiteSaleProfit").click(openStatSaleSiteFrm);
    $("#btQueryASO").click(openQuerySAOFrm);
    $("#btExportASO").click(exportSaleAnalysisObjs);
    $("#btExportMarketingCost").click(exportMarketingCost);
    $("#btImportASO, #btImportMarketingCost, #btSMTSearchAnalysis").click(openImportFrm); 
    $("#btStatProdSale").click(openProdSaleStatFrm);
    $("#btExportProdSale").click(exportSaleAnalysis);
    $("#btSaleHourTime, #btSaleProfitbySite").click(openSaleHourTimeStatFrm); 
    $("#btTrackSaleAnalysis").click(openTrackSalaAnalysisFrm);
    $("#btExportTrackSaleAnalysis").click(exportTrackSaleAnalysis);
    $("#btGenerateSR, #btQuerySiteSale, #btExportASO, #btImportASO, #btQueryASO, #btStatProdSale, #btSaleHourTime, #btQuerySiteSaleQty, #btQuerySiteSaleProfit, #btSaleProfitbySite, #btExportMarketingCost, #btImportMarketingCost, #btExportProdSale, #btTrackSaleAnalysis, #btExportTrackSaleAnalysis, #btSMTSearchAnalysis").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

    $("#sitesalestatTag, #sitesaleqtystatTag, #sitesaleprofitstatTag").click(function () {
        $("#shopTitleTag").hide();
    });
    $("#asoTag").click(function () {
        if (!pageVariable.asoList) {
            loadSaleAnalysisObjList();
        }
        $("#shopTitleTag").show();
    });
    $("#prodsalestatTag").click(function () {
        if (!pageVariable.prodsalestatList) {
            loadProdSaleStatList();
        }
        $("#shopTitleTag").show();
    });
    $("#salehourtimestatTag, #saleprofitbysitestatTag, #tracksaleanalysisTag").click(function () {
        $("#shopTitleTag").show();
    });

    pageVariable.importSRFile = new uicontrol.file("importSRFile");

    pageVariable.ssstat_totime = new Date();
    pageVariable.ssstat_fromtime = new Date((new Date()).setDate(pageVariable.ssstat_totime.getDate() - 30));

    $("#txtSSStatFromTime").datepicker();
    $("#txtSSStatToTime").datepicker();

    $("#txtSSStatFromTime").val(pageVariable.ssstat_fromtime.getFullYear() + "-" + (pageVariable.ssstat_fromtime.getMonth() + 1) + "-" + pageVariable.ssstat_fromtime.getDate());
    $("#txtSSStatToTime").val(pageVariable.ssstat_totime.getFullYear() + "-" + (pageVariable.ssstat_totime.getMonth() + 1) + "-" + pageVariable.ssstat_totime.getDate());

    loadSalePlatform();

    $("#shopTitleTag").hide();
}

/* 设置页面布局 */
function setLayout() {
    var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
    if (pageVariable.asoList) {
        pageVariable.asoList.resize(mainFormHeight);
    }
    if (pageVariable.prodsalestatList) {
        pageVariable.prodsalestatList.resize(mainFormHeight);
    }
}
/* 加载销售平台 */
function loadSalePlatform() {

    window.saleplatform.loadSaleSites(function () {

        /* 对销售平台为空的处理 */
        window.saleplatform.checkSalePlatform();

        if (pageVariable.asoList) {
            pageVariable.asoList.bindDataSource(null);
        }
        if (pageVariable.prodsalestatList) {
            pageVariable.prodsalestatList.bindDataSource(null);
        }
        if (pageVariable.tracksaleanalysisTable) {
            pageVariable.tracksaleanalysisTable.bindDataSource(null);
        }

        pageVariable.saotypes = null;

        $("#dvSaleHourTimeGraph").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1674 + "...</span>...");
        $("#dvSaleAreaGraph").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1675 + "...</span>");
        $("#dvSalepricebysitearea").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1676 + "...</span>");
        $("#dvSaletoalprofitbysitearea").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1677 + "...</span>");
        $("#dvSaleprofitbysitearea").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1678 + "...</span>");
    });
}

/* 打开站点统计窗体 */
function openStatSaleSiteFrm() {
    if (!pageVariable.querySiteSaleStatFrm) {
        pageVariable.querySiteSaleStatFrm = new uicontrol.dialog("querySiteSaleStatFrm", mlm.C1696, { width: 800 }, function () {

            var m_type = pageVariable.querySiteSaleStatFrm.action;
            if (m_type == "sitesale") {
                loadSaleSiteStat();
            }
            else if (m_type == "sitesaleqty") {
                loadSaleSiteQtyStat();
            }
            else if (m_type == "sitesaleprofit") {
                loadSaleSiteProfitStat();
            }
        });

        pageVariable.ulSSStatSite = new uicontrol.selectbox("ulSSStatSite", "checkbox");

        var items = [];
        $.each(window.saleplatform.salesites, function () {
            items.push({ key: this.SaleSite_Id, value: this.SPfName + "-" + this.SaleSiteName });
        });

        pageVariable.ulSSStatSite.bindSource(items);
        pageVariable.ulSSStatSite.setSelectedItem(items);
    }

    pageVariable.querySiteSaleStatFrm.action = $(this).attr("tag");

    pageVariable.querySiteSaleStatFrm.show();
}
/* 全网销售额统计 */
function loadSaleSiteStat() {

    pageframe.control.processCtrl.showOperaProcess();

    var m_salesite_ids = pageVariable.ulSSStatSite.getSelectedItem();
    if (!m_salesite_ids || m_salesite_ids.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1342 + mlm.C0416);
    }

    $("#dvSSStatLabel_11").hide();
    $("#dvSSStatLabel_20").hide();
    $("#dvSSStatLabel_1").hide();
    $("#dvSSStatLabel_12").hide();

    $.each(m_salesite_ids, function () {
        $("#dvSSStatLabel_" + this).show();
    });

    var m_totalprice_11 = 0;
    var m_totalprice_20 = 0;
    var m_totalprice_1 = 0;
    var m_totalprice_12 = 0;

    var m_salereport = new sm.salereport();
    m_salereport.FromTime = $("#txtSSStatFromTime").val();
    m_salereport.ToTime = $("#txtSSStatToTime").val();
    m_salereport.SaleSite_Ids = m_salesite_ids;
    m_salereport.getStatTimeX(function (xtimes) {

        pageVariable.xTimeLables = xtimes;

        m_salereport.getSaleSiteStat(function (retTable) {

            var m_itemDict = new datastruct.dictionary();

            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            if (m_jsonobjs.length == 0) {
                pageVariable.querySiteSaleStatFrm.close();

                $("#dvSiteSaleGraph").empty();
                $("#dvSiteSaleGraph").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1697 + "...</span>");
                pageframe.control.processCtrl.hideOperaProcess();

                return;
            }
            $.each(m_jsonobjs, function () {
                var m_obj = m_itemDict.getItem(this.SaleSite_Id.toString());
                if (!m_obj) {
                    m_obj = {};
                    m_itemDict.setItem(this.SaleSite_Id.toString(), m_obj);
                }

                m_obj[this.SaleDateStr.toString()] = Math.round(Number(this.TotalPrice), 2);

                if (this.SaleSite_Id == 11) {
                    m_totalprice_11 += Math.round(Number(this.TotalPrice), 2);
                }
                else if (this.SaleSite_Id == 20) {
                    m_totalprice_20 += Math.round(Number(this.TotalPrice), 2);
                }
                if (this.SaleSite_Id == 1) {
                    m_totalprice_1 += Math.round(Number(this.TotalPrice), 2);
                }
                if (this.SaleSite_Id == 12) {
                    m_totalprice_12 += Math.round(Number(this.TotalPrice), 2);
                }
            });

            $("#lbSSStatTotalPrice_11").html(" (" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_totalprice_11) + ")");
            $("#lbSSStatTotalPrice_20").html(" (" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_totalprice_20) + ")");
            $("#lbSSStatTotalPrice_1").html(" (" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_totalprice_1) + ")");
            $("#lbSSStatTotalPrice_12").html(" (" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_totalprice_12) + ")");

            var m_dataColors = [];
            var m_chatarr = [];
            $.each(m_itemDict.arrKeys, function () {
                var m_chatitem = [];

                var m_key = this;
                var m_i = 1;
                $.each(pageVariable.xTimeLables, function () {
                    var m_value = m_itemDict.getItem(m_key)[this];
                    if (m_value) {
                        m_chatitem.push([m_i, m_value]);
                    }
                    else {
                        m_chatitem.push([m_i, 0]);
                    }
                    m_i++;
                });

                m_chatarr.push(m_chatitem);

                var m_color = "";
                if (this == 1) {
                    m_color = "green";
                }
                else if (this == 11) {
                    m_color = "black";
                }
                else if (this == 12) {
                    m_color = "gray";
                }
                else if (this == 20) {
                    m_color = "blue";
                }

                m_dataColors.push(m_color);
            });

            drawSiteChat("dvSiteSaleGraph", mlm.C1697, pageVariable.xTimeLables, m_chatarr, m_dataColors);

            if (pageVariable.querySiteSaleStatFrm) {
                pageVariable.querySiteSaleStatFrm.close();
            }
        });
    });
}
/* 全网销量统计 */
function loadSaleSiteQtyStat() {

    pageframe.control.processCtrl.showOperaProcess();

    var m_salesite_ids = pageVariable.ulSSStatSite.getSelectedItem();
    if (!m_salesite_ids || m_salesite_ids.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1342 + mlm.C0416);
    }

    $("#dvSSQtyStatLabel_11").hide();
    $("#dvSSQtyStatLabel_20").hide();
    $("#dvSSQtyStatLabel_1").hide();
    $("#dvSSQtyStatLabel_12").hide();

    $.each(m_salesite_ids, function () {
        $("#dvSSQtyStatLabel_" + this).show();
    });

    var m_salereport = new sm.salereport();
    m_salereport.FromTime = $("#txtSSStatFromTime").val();
    m_salereport.ToTime = $("#txtSSStatToTime").val();
    m_salereport.SaleSite_Ids = m_salesite_ids;
    m_salereport.getStatTimeX(function (xtimes) {

        pageVariable.xTimeLables = xtimes;

        m_salereport.getSaleSiteQtyStat(function (retTable) {

            var m_itemDict = new datastruct.dictionary();

            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            if (m_jsonobjs.length == 0) {
                pageVariable.querySiteSaleStatFrm.close();

                $("#dvSiteSaleQtyGraph").empty();
                $("#dvSiteSaleQtyGraph").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1696 + "...</span>");
                pageframe.control.processCtrl.hideOperaProcess();

                return;
            }

            var m_totalqty_11 = 0;
            var m_totalqty_20 = 0;
            var m_totalqty_1 = 0;
            var m_totalqty_12 = 0;

            $.each(m_jsonobjs, function () {
                var m_obj = m_itemDict.getItem(this.SaleSite_Id.toString());
                if (!m_obj) {
                    m_obj = {};
                    m_itemDict.setItem(this.SaleSite_Id.toString(), m_obj);
                }

                m_obj[this.SaleDateStr.toString()] = Math.round(Number(this.SaleOrderCount), 2);

                if (this.SaleSite_Id == 11) {
                    m_totalqty_11 += Math.round(Number(this.SaleOrderCount), 2);
                }
                else if (this.SaleSite_Id == 20) {
                    m_totalqty_20 += Math.round(Number(this.SaleOrderCount), 2);
                }
                if (this.SaleSite_Id == 1) {
                    m_totalqty_1 += Math.round(Number(this.SaleOrderCount), 2);
                }
                if (this.SaleSite_Id == 12) {
                    m_totalqty_12 += Math.round(Number(this.SaleOrderCount), 2);
                }
            });

            $("#lbSSQtyStat_11").html(" (" + m_totalqty_11 + ")");
            $("#lbSSQtyStat_20").html(" (" + m_totalqty_20 + ")");
            $("#lbSSQtyStat_1").html(" (" + m_totalqty_1 + ")");
            $("#lbSSQtyStat_12").html(" (" + m_totalqty_12 + ")");

            var m_dataColors = [];
            var m_chatarr = [];
            $.each(m_itemDict.arrKeys, function () {
                var m_chatitem = [];

                var m_key = this;
                var m_i = 1;
                $.each(pageVariable.xTimeLables, function () {
                    var m_value = m_itemDict.getItem(m_key)[this];
                    if (m_value) {
                        m_chatitem.push([m_i, m_value]);
                    }
                    else {
                        m_chatitem.push([m_i, 0]);
                    }
                    m_i++;
                });

                m_chatarr.push(m_chatitem);

                var m_color = "";
                if (this == 1) {
                    m_color = "green";
                }
                else if (this == 11) {
                    m_color = "black";
                }
                else if (this == 12) {
                    m_color = "gray";
                }
                else if (this == 20) {
                    m_color = "blue";
                }

                m_dataColors.push(m_color);
            });

            drawSiteChat("dvSiteSaleQtyGraph", mlm.C1696, pageVariable.xTimeLables, m_chatarr, m_dataColors);

            if (pageVariable.querySiteSaleStatFrm) {
                pageVariable.querySiteSaleStatFrm.close();
            }
        });
    });
}
/* 全网利润统计 */
function loadSaleSiteProfitStat() {

    pageframe.control.processCtrl.showOperaProcess();

    var m_salesite_ids = pageVariable.ulSSStatSite.getSelectedItem();
    if (!m_salesite_ids || m_salesite_ids.length == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1342 + mlm.C0416);
    }

    $("#dvSSProfitStatLabel_11").hide();
    $("#dvSSProfitStatLabel_20").hide();
    $("#dvSSProfitStatLabel_1").hide();
    $("#dvSSProfitStatLabel_12").hide();

    $.each(m_salesite_ids, function () {
        $("#dvSSProfitStatLabel_" + this).show();
    });

    var m_salereport = new sm.salereport();
    m_salereport.FromTime = $("#txtSSStatFromTime").val();
    m_salereport.ToTime = $("#txtSSStatToTime").val();
    m_salereport.SaleSite_Ids = m_salesite_ids;
    m_salereport.getStatTimeX(function (xtimes) {

        pageVariable.xTimeLables = xtimes;

        m_salereport.getSaleSiteProfitStat(function (retTable) {

            var m_itemDict = new datastruct.dictionary();

            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            if (m_jsonobjs.length == 0) {
                pageVariable.querySiteSaleStatFrm.close();

                $("#dvSiteSaleProfitGraph").empty();
                $("#dvSiteSaleProfitGraph").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1662 + mlm.C1668 + "...</span>");
                pageframe.control.processCtrl.hideOperaProcess();

                return;
            }

            var m_totalprofit_11 = 0;
            var m_totalprofit_20 = 0;
            var m_totalprofit_1 = 0;
            var m_totalprofit_12 = 0;

            $.each(m_jsonobjs, function () {
                var m_obj = m_itemDict.getItem(this.SaleSite_Id.toString());
                if (!m_obj) {
                    m_obj = {};
                    m_itemDict.setItem(this.SaleSite_Id.toString(), m_obj);
                }

                m_obj[this.SaleDate.toString()] = Math.round(Number(this.TotalProfit), 2);

                if (this.SaleSite_Id == 11) {
                    m_totalprofit_11 += Math.round(Number(this.TotalProfit), 2);
                }
                else if (this.SaleSite_Id == 20) {
                    m_totalprofit_20 += Math.round(Number(this.TotalProfit), 2);
                }
                if (this.SaleSite_Id == 1) {
                    m_totalprofit_1 += Math.round(Number(this.TotalProfit), 2);
                }
                if (this.SaleSite_Id == 12) {
                    m_totalprofit_12 += Math.round(Number(this.TotalProfit), 2);
                }
            });

            $("#lbSSProfitStat_11").html(" (" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_totalprofit_11) + ")");
            $("#lbSSProfitStat_20").html(" (" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_totalprofit_20) + ")");
            $("#lbSSProfitStat_1").html(" (" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_totalprofit_1) + ")");
            $("#lbSSProfitStat_12").html(" (" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_totalprofit_12) + ")");

            var m_dataColors = [];
            var m_chatarr = [];
            $.each(m_itemDict.arrKeys, function () {
                var m_chatitem = [];

                var m_key = this;
                var m_i = 1;
                $.each(pageVariable.xTimeLables, function () {
                    var m_value = m_itemDict.getItem(m_key)[this];
                    if (m_value) {
                        m_chatitem.push([m_i, m_value]);
                    }
                    else {
                        m_chatitem.push([m_i, 0]);
                    }
                    m_i++;
                });

                m_chatarr.push(m_chatitem);

                var m_color = "";
                if (this == 1) {
                    m_color = "green";
                }
                else if (this == 11) {
                    m_color = "black";
                }
                else if (this == 12) {
                    m_color = "gray";
                }
                else if (this == 20) {
                    m_color = "blue";
                }

                m_dataColors.push(m_color);
            });

            drawSiteChat("dvSiteSaleProfitGraph", mlm.C1662 + mlm.C1668, pageVariable.xTimeLables, m_chatarr, m_dataColors);

            if (pageVariable.querySiteSaleStatFrm) {
                pageVariable.querySiteSaleStatFrm.close();
            }
        });
    });
}

/* 打开销售时间点统计窗体 */
function openSaleHourTimeStatFrm() {
    if (!pageVariable.querySaleHourTimeFrm) {
        pageVariable.querySaleHourTimeFrm = new uicontrol.dialog("querySaleHourTimeFrm", mlm.C1698 + mlm.C1668, { width: 800 }, function () {
            var m_type = pageVariable.querySaleHourTimeFrm.action;

            if (m_type == "salehourtime") {
                loadSaleHourTimeStat();
            }
            else {
                loadSiteTotalSaleByAreaStat();
            }
        });

        $("#txtSHTFromTime").datepicker();
        $("#txtSHTToTimeTime").datepicker();

        pageVariable.chkSMTArea = new bizcontrol.selectglobalarea("chkSMTArea", null, null, commoncore.func.constructGAreaTxt);

        var m_totime = new Date();
        var m_fromtime = new Date((new Date()).setDate(m_totime.getDate() - 1));
        $("#txtSHTFromTime").val(m_fromtime.getFullYear() + "-" + (m_fromtime.getMonth() + 1) + "-" + m_fromtime.getDate());
        $("#txtSHTToTimeTime").val(m_totime.getFullYear() + "-" + (m_totime.getMonth() + 1) + "-" + m_totime.getDate());
    }

    pageVariable.querySaleHourTimeFrm.action = $(this).attr("tag");

    pageVariable.querySaleHourTimeFrm.show();
}
/* 销售时间点统计 */
function loadSaleHourTimeStat() {
    pageframe.control.processCtrl.showOperaProcess();

    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.ProdSaleStat_FromTime = $("#txtSHTFromTime").val();
    m_salereport.ProdSaleStat_ToTime = $("#txtSHTToTimeTime").val();

    var m_areaObj = pageVariable.chkSMTArea.getObj();

    if (m_salereport.SaleSite_Id == 20) {
        if (m_areaObj && m_areaObj.globalArea_Ids) {
            m_salereport.GlobalAreaNames = m_areaObj.globalAreaNames.split(',');
        }
    }
    else {
        if (m_areaObj && m_areaObj.globalArea_Ids) {
            m_salereport.GlobalAreaIds = m_areaObj.globalArea_Ids.split(',');
        }
    }

    m_salereport.getSAOOrderCountStatByHour(function (retTable) {

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        if (m_jsonobjs.length == 0) {
            pageVariable.querySaleHourTimeFrm.close();

            $("#dvSaleHourTimeGraph").empty();
            $("#dvSaleHourTimeGraph").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1674 + "...</span>");
            pageframe.control.processCtrl.hideOperaProcess();

            return;
        }

        var m_dict = new datastruct.dictionary();
        $.each(m_jsonobjs, function () {
            m_dict.setItem(this.SaleHour.toString(), this);
        });

        var m_ordercountarr = [];

        var m_colors = [];

        for (var m_i = 0; m_i < 24; m_i++) {
            var m_obj = m_dict.getItem(m_i.toString());
            if (m_obj) {
                m_ordercountarr.push([m_i.toString(), Number(m_obj.OrderCount)]);
            }
            else {
                m_ordercountarr.push([m_i.toString(), 0, 0]);
            }
        }

        m_colors.push("#4B4B4B");

        drawBarChat("dvSaleHourTimeGraph", mlm.C1674, m_ordercountarr, m_colors, 1120, 250);

        pageVariable.querySaleHourTimeFrm.close();
    });

    m_salereport.getSAOOrderCountStatByArea(function (retTable) {

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        if (m_jsonobjs.length == 0) {

            $("#dvSaleAreaGraph").empty();
            $("#dvSaleAreaGraph").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1675 + "...</span>");
            pageframe.control.processCtrl.hideOperaProcess();

            return;
        }
        var m_ordercountarr = [];
        $.each(m_jsonobjs, function () {
            m_ordercountarr.push([this.SaleArea, Number(this.OrderCount)]);
        });

        var m_colors = [];

        m_colors.push("#4B4B4B");

        drawBarChat("dvSaleAreaGraph", mlm.C1675, m_ordercountarr, m_colors, 1120, 250);

        pageVariable.querySaleHourTimeFrm.close();
    });
}
/* 站点销售额&利润统计 */
function loadSiteTotalSaleByAreaStat() {
    pageframe.control.processCtrl.showOperaProcess();

    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.ProdSaleStat_FromTime = $("#txtSHTFromTime").val();
    m_salereport.ProdSaleStat_ToTime = $("#txtSHTToTimeTime").val();

    var m_areaObj = pageVariable.chkSMTArea.getObj();

    if (m_salereport.SaleSite_Id == 20) {
        if (m_areaObj && m_areaObj.globalArea_Ids) {
            m_salereport.GlobalAreaNames = m_areaObj.globalAreaNames.split(',');
        }
    }
    else {
        if (m_areaObj && m_areaObj.globalArea_Ids) {
            m_salereport.GlobalAreaIds = m_areaObj.globalArea_Ids.split(',');
        }
    }

    m_salereport.getSAOTotalSaleStatByArea(function (retTable) {

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        if (m_jsonobjs.length == 0) {
            pageVariable.querySaleHourTimeFrm.close();

            $("#dvSalepricebysitearea").empty();
            $("#dvSalepricebysitearea").html("<span style='font-size: 12px; font-family: 微软雅黑'>" + mlm.C1676 + "...</span>");
            pageframe.control.processCtrl.hideOperaProcess();

            return;
        }

        var m_totalpricearr = [];
        var m_totalprofitarr = [];
        var m_avgprofitarr = [];
        $.each(m_jsonobjs, function () {
            m_totalpricearr.push([this.SaleArea, Number(this.TotalPrice)]);
            m_totalprofitarr.push([this.SaleArea, Number(this.TotalProfit)]);
            m_avgprofitarr.push([this.SaleArea, Number(this.AvgProfit)]);
        });

        var m_colors = [];
        m_colors.push("#4B4B4B");

        drawBarChat("dvSalepricebysitearea", mlm.C1676, m_totalpricearr, m_colors, 1120, 200);
        drawBarChat("dvSaletoalprofitbysitearea", mlm.C1677, m_totalprofitarr, m_colors, 1120, 200);
        drawBarChat("dvSaleprofitbysitearea", mlm.C1678, m_avgprofitarr, m_colors, 1120, 200);

        pageVariable.querySaleHourTimeFrm.close();
    });

}

/* 打开商品统计窗体 */
function openProdSaleStatFrm() {
    if (!pageVariable.queryProdSaleStatFrm) {
        pageVariable.queryProdSaleStatFrm = new uicontrol.dialog("queryProdSaleStatFrm", mlm.C1679 + mlm.C1668, { width: 800 }, function () {
            querySAOSaleStat(1, pageVariable.prodsalestatList.pageNumber);
        });

        pageVariable.chkProdSaleArea = new bizcontrol.selectglobalarea("chkProdSaleArea", null, null, commoncore.func.constructGAreaTxt);

        pageVariable.prodsalestat_totime = new Date();
        pageVariable.prodsalestat_fromtime = new Date((new Date()).setDate(pageVariable.ssstat_totime.getDate() - 7));
        pageVariable.his_prodsalestat_totime = new Date((new Date()).setDate(pageVariable.prodsalestat_fromtime.getDate() - 1));
        pageVariable.his_prodsalestat_fromtime = new Date((new Date()).setDate(pageVariable.his_prodsalestat_totime.getDate() - 7));

        $("#txtProdSaleFromTime").datepicker();
        $("#txtProdSaleToTime").datepicker();
        $("#txtProdSaleHisFromTime").datepicker();
        $("#txtProdSaleHisToTime").datepicker();

        $("#txtProdSaleFromTime").val(pageVariable.prodsalestat_fromtime.getFullYear() + "-" + (pageVariable.prodsalestat_fromtime.getMonth() + 1) + "-" + pageVariable.prodsalestat_fromtime.getDate());
        $("#txtProdSaleToTime").val(pageVariable.prodsalestat_totime.getFullYear() + "-" + (pageVariable.prodsalestat_totime.getMonth() + 1) + "-" + pageVariable.prodsalestat_totime.getDate());

        pageVariable.ulprodsalestat = new uicontrol.selectbox("ulprodsalestat", "radio");
        var m_sortitems = [];
        m_sortitems.push({ key: "TotalPrice", value: mlm.C1699 });
        m_sortitems.push({ key: "TotalQty", value: mlm.C1700 });
        m_sortitems.push({ key: "DayAvageQty", value: mlm.C1701 });
        m_sortitems.push({ key: "AvgSalePrice", value: mlm.C1702 });
        m_sortitems.push({ key: "TotalProfit", value: mlm.C1146 });
        m_sortitems.push({ key: "5", value: mlm.C1703 });

        pageVariable.ulprodsalestat.bindSource(m_sortitems);

        pageVariable.ulprodsalestat.setSelectedItem([{ key: "TotalPrice" }]);
    }

    loadSAOType("ddlProdSaleSAOType");

    pageVariable.queryProdSaleStatFrm.show();
}
/* 加载商品销量统计列表 */
function loadProdSaleStatList() {

    $("#shopTitleTag").show();

    if (!pageVariable.prodsalestatList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.prodsalestatList = new uicontrol.tableList("prodsalestatList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "SaleAnalysisObj_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: querySAOSaleStat,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: constructSAOStatPicCell },
                                                   { display: mlm.C1667, name: "SAOName", width: 300, align: 'left', adjust: true, createCell: constructSAOStatCell },
                                                   { display: mlm.C0772, name: "", width: 80, align: 'center', adjust: true, createCell: constructSaleAreaCell },
                                                   { display: mlm.C1701, name: "DayAvageQty", width: 60, align: 'right', adjust: true, createCell: constructSaleQtyCell },
                                                   { display: mlm.C1700, name: "TotalQty", width: 70, align: 'right', adjust: true, createCell: constructSaleQtyCell },
                                                   { display: mlm.C1699, name: "TotalPrice", width: 75, align: 'right', adjust: true, createCell: constructProdStatPriceCell },
                                                   { display: mlm.C1704, name: "TotalProfit", width: 75, align: 'right', adjust: true, createCell: constructProdProfitCell },
                                                   { display: mlm.C1705, name: "", width: 100, align: 'right', adjust: true, createCell: constructProdProfitRateCell },
                                                   { display: mlm.C1702, name: "AvgSalePrice", width: 100, align: 'right', adjust: true, createCell: constructAvgSalePriceCell }]
                                     });

    }
}
/*  */
function constructSAOStatPicCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_src = "";

    if (this.keyObj.ProdCount == "1") {
        if (cellValue.indexOf("http://") == -1) {
            m_src = window.webLocation + cellValue;
        }
        else {
            m_src = cellValue;
        }
        return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewSAODetalSale.call(this, \"" + this.keyObj.SaleAnalysisObj_Id + "\")' src='" + m_src + "' /></div>";
    }
    else if (Number(m_obj.ProdCount) > 1) {
        m_src = window.webLocation + "BZM/Css/Images/nopic.png";
        return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onclick='viewSAODetalSale.call(this, \"" + this.keyObj.SaleAnalysisObj_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this, 60);' /></div>";
    }
    else {
        m_src = window.webLocation + "BZM/Css/Images/nopic.png";
        return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this, 60);' /></div>";
    }
}
/*  */
function constructSAOStatCell(key, cellValue) {
    var m_obj = this.keyObj;

    if (m_obj.ProdCount == "1") {
        return "<a style='color: black; text-decoration: none' href='javascript:void(\"0\");' onclick='viewSAODetalSale.call(this, \"" + this.keyObj.SaleAnalysisObj_Id + "\")'>" + cellValue + "<a>";
    }
    else if (Number(m_obj.ProdCount) > 1) {
        return "<a style='color: blue; text-decoration: none' href='javascript:void(\"0\");' onclick='viewSAODetalSale.call(this, \"" + this.keyObj.SaleAnalysisObj_Id + "\")'>" + cellValue + "<a>";
    }
    else {
        return "<span style='color: gray'>" + cellValue + "<span>";
    }   
}
/* 构建区域列 */
function constructSaleAreaCell(key, cellValue) {
    var m_areastr = "";
    var m_areaObj = pageVariable.chkProdSaleArea.getObj();
    if (m_areaObj && m_areaObj.globalArea_Ids) {
        m_areastr = this.keyObj.SaleAreas;
    }
    else {
        m_areastr = mlm.C0421;
    }

    var m_len = m_areastr.getBytesCount();
    if (m_len > 20) {
        var m_str = m_areastr.substringByBytes(20) + "...";
        return "<span id='lbSaleArea_" + key + "' tag='" + m_areastr + "'>" + m_str + "</span>";
    }
    else {
        return m_areastr;
    }
}
/* 构建目录价列 */
function constructProdStatPriceCell(key, cellValue) {
    if (Number(cellValue) > 0) {
        return commoncore.func.getCurrHtml(saleplatform.currObj.CurrSymbol, cellValue);
    }
}
/* 构建销售均价列 */
function constructAvgSalePriceCell(key, cellValue) {
    var m_items = [];
    if (Number(cellValue) > 0) {
        m_items.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(saleplatform.currObj.CurrSymbol, cellValue) + "</div>");

        var m_rate = (Number(this.keyObj.AvgSalePrice) / Number(this.keyObj.ListPrice)).toFixed(2);
        if (m_rate != 1) {
            m_items.push("<div style='padding: 3px 0px 0px 0px; color: #666'>(" + mlm.C1058 + ": " + ((m_rate * 100).toFixed(0)) + "%)</div>");
        }
    }

    return m_items.join("");
}
/* 构建利润列 */
function constructProdProfitCell(key, cellValue) {
    if (Number(cellValue) > -9999) {
        return commoncore.func.getCurrHtml(saleplatform.currObj.CurrSymbol, cellValue);
    }
}
/* 构建利润率列 */
function constructProdProfitRateCell(key, cellValue) {
    var m_items = [];

    var m_totalprofit = Number(this.keyObj.TotalProfit);
    if (Number(this.keyObj.TotalQty) >0 && m_totalprofit > -9999) {
        m_items.push("<div style='padding: 0px;'>" + (((m_totalprofit / Number(this.keyObj.TotalPrice)) * 100).toFixed(0)) + "%</div>");
        m_items.push("<div style='padding: 3px 0px 0px 0px; color: #666'>(" + mlm.C1146 + ": " + commoncore.func.getCurrHtml(saleplatform.currObj.CurrSymbol, m_totalprofit / Number(this.keyObj.TotalQty)) + ")</div>");
    }

    return m_items.join("");
}
/* 查询分析对象 */
function querySAOSaleStat(pageNum, pageCount) {

    pageframe.control.processCtrl.showOperaProcess();

    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.Keyword = $.trim($("#txtProdSaleKey").val());
    m_salereport.SAOType = $("#ddlProdSaleSAOType").val();
    m_salereport.ProdSaleStat_FromTime = $("#txtProdSaleFromTime").val();
    m_salereport.ProdSaleStat_ToTime = $("#txtProdSaleToTime").val();

    if (pageVariable.chkProdSaleArea) {
        var m_areaObj = pageVariable.chkProdSaleArea.getObj();
        if (m_areaObj && m_areaObj.globalArea_Ids) {
            m_salereport.GlobalAreaIds = m_areaObj.globalArea_Ids.split(',');
        } 
    }
    m_salereport.SortField = pageVariable.ulprodsalestat.getSelectedItem()[0];

    m_salereport.Page = pageNum;
    m_salereport.PageNum = pageCount;

    m_salereport.querySAOSaleStat(function (retTable) {

        pageVariable.prodsalestatList.bindDataSource(retTable);

        var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
        $.each(m_jsonobjs, function () {
            var m_itemCtrl = $("#lbSaleArea_" + this.SaleAnalysisObj_Id);
            m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
        });

        if (pageVariable.queryProdSaleStatFrm) {
            pageVariable.queryProdSaleStatFrm.close();
        }

        pageframe.control.processCtrl.hideOperaProcess();
    });
}
/* 查看详细分析数据 */
function viewSAODetalSale(key, istrackfrm) {
    if (!pageVariable.viewSAOSaleDetailStatFrm) {
        pageVariable.viewSAOSaleDetailStatFrm = new uicontrol.dialog("viewSAOSaleDetailStatFrm", mlm.C1706, { width: 1200, position: ["auto", 15] }, null);

        pageVariable.saosaledetailstatTabs = $("#saosaledetailstatTabs").tabs({ show: showSAOSaleStatTab });
    }

    pageVariable.viewSAOSaleDetailStatFrm.istrackfrm = istrackfrm;

    pageVariable.viewSAOSaleDetailStatFrm.SaleAnalysisObj_Id = key;
    pageVariable.viewSAOSaleDetailStatFrm.areabar = null;
    pageVariable.viewSAOSaleDetailStatFrm.avgpriceline = null;
    pageVariable.viewSAOSaleDetailStatFrm.hourbar = null;
    pageVariable.viewSAOSaleDetailStatFrm.skuproduct = null;

    $("#lbSAODetalStatSaleSymbol").trigger("click");
    pageVariable.viewSAOSaleDetailStatFrm.show();

    pageframe.control.processCtrl.showOperaProcess();

    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.SaleAnalysisObj_Id = key;

    if (istrackfrm) {
        m_salereport.ProdSaleStat_FromTime = $("#txtFromTrackTime").val();
        m_salereport.ProdSaleStat_ToTime = $("#txtToTrackTime").val();
    }
    else {
        m_salereport.ProdSaleStat_FromTime = $("#txtProdSaleFromTime").val();
        m_salereport.ProdSaleStat_ToTime = $("#txtProdSaleToTime").val();
    }

    if (pageVariable.chkProdSaleArea) {
        var m_areaObj = pageVariable.chkProdSaleArea.getObj();
        if (m_areaObj && m_areaObj.globalArea_Ids) {
            m_salereport.GlobalAreaIds = m_areaObj.globalArea_Ids.split(',');
        } 
    }

    m_salereport.FromTime = m_salereport.ProdSaleStat_FromTime;
    m_salereport.ToTime = m_salereport.ProdSaleStat_ToTime;
    m_salereport.getStatTimeX(function (xtimes) {

        pageVariable.saodetalStatTimeLables = xtimes;

        m_salereport.querySAOSaleByDateStat(function (retTable) {

            var m_totalqtyarr = [];

            var m_totalpricearr = [];
            var m_totaltotalprofitarr = [];

            pageVariable.viewSAOSaleDetailStatFrm.avagpricearr = [];
            pageVariable.viewSAOSaleDetailStatFrm.avagprofitarr = [];

            var m_i = 1;
            var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
            $.each(m_jsonobjs, function () {
                m_totalqtyarr.push([m_i, Number(this.TotalQty)]);

                m_totalpricearr.push([m_i, Number(this.TotalPrice)]);
                m_totaltotalprofitarr.push([m_i, Number(this.TotalProfit)]);

                pageVariable.viewSAOSaleDetailStatFrm.avagpricearr.push([m_i, Number(this.AvgSalePrice)]);
                var m_profit = 0;
                if (Number(this.TotalQty) > 0) {
                    m_profit = Number((Number(this.TotalProfit) / Number(this.TotalQty)).toFixed(2));
                }
                pageVariable.viewSAOSaleDetailStatFrm.avagprofitarr.push([m_i, m_profit]);

                m_i++;
            });

            var dataArr = [];
            dataArr.push({ source: m_totalpricearr, color: "blue" });
            dataArr.push({ source: m_totaltotalprofitarr, color: "red" });

            var qtydataArr = [];
            qtydataArr.push({ source: m_totalqtyarr, color: "black" });

            if (pageVariable.prodsalestatList) {
                var m_saleanalysisobj = pageVariable.prodsalestatList.getItem(key);

                drawLineChat("dvSaodetailsaleQty", mlm.C1707 + " (" + mlm.C1709 + ": " + m_saleanalysisobj.TotalQty + ", " + mlm.C1701 + ": " + m_saleanalysisobj.DayAvageQty + ")", pageVariable.saodetalStatTimeLables, qtydataArr, 1150, 180);
                drawLineChat("dvSaodetailsaleSale", mlm.C1708 + " (" + mlm.C1699 +": " + saleplatform.currObj.CurrSymbol + " " + Number(m_saleanalysisobj.TotalPrice).toFixed(2)
                                                                        + ", "+ mlm.C1704 + ": " + saleplatform.currObj.CurrSymbol + " " + Number(m_saleanalysisobj.TotalProfit).toFixed(2)
                                                                        + ", " + mlm.C1705 + ": " + (((Number(m_saleanalysisobj.TotalProfit) / Number(m_saleanalysisobj.TotalPrice)) * 100).toFixed(0)) + "%"
                                                                        + ", " + mlm.C1710 +": " + saleplatform.currObj.CurrSymbol + " " + Number(m_saleanalysisobj.AvgSalePrice).toFixed(2)
                                                                        + ", " + mlm.C1146 + ": " + saleplatform.currObj.CurrSymbol + " " + (Number(m_saleanalysisobj.TotalProfit) / Number(m_saleanalysisobj.TotalQty)).toFixed(2) + ")", pageVariable.saodetalStatTimeLables, dataArr, 1150, 280);
            }
            else {
                drawLineChat("dvSaodetailsaleQty", mlm.C1707, pageVariable.saodetalStatTimeLables, qtydataArr, 1150, 180);
                drawLineChat("dvSaodetailsaleSale", mlm.C1708, pageVariable.saodetalStatTimeLables, dataArr, 1150, 280);
            }
        });
    });
}
/* 切换查看详细分析数据的Tab */
function showSAOSaleStatTab(event, ui) {
    if (ui.index == 1) {

        if (!pageVariable.viewSAOSaleDetailStatFrm.avgpriceline) {
            var pricedataArr = [];
            pricedataArr.push({ source: pageVariable.viewSAOSaleDetailStatFrm.avagpricearr, color: "blue" });
            pricedataArr.push({ source: pageVariable.viewSAOSaleDetailStatFrm.avagprofitarr, color: "red" });

            drawLineChat("dvSaodetailsalePrice", mlm.C1711, pageVariable.saodetalStatTimeLables, pricedataArr, 1150, 400);

            pageVariable.viewSAOSaleDetailStatFrm.avgpriceline = true;
        }
    }
    else if (ui.index == 2) {
        if (!pageVariable.viewSAOSaleDetailStatFrm.areabar) {
            pageframe.control.processCtrl.showOperaProcess();

            var m_salereport = new sm.salereport();

            m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
            m_salereport.SaleAnalysisObj_Id = pageVariable.viewSAOSaleDetailStatFrm.SaleAnalysisObj_Id;

            if (pageVariable.viewSAOSaleDetailStatFrm.istrackfrm) {
                m_salereport.ProdSaleStat_FromTime = $("#txtFromTrackTime").val();
                m_salereport.ProdSaleStat_ToTime = $("#txtToTrackTime").val();
            }
            else {
                m_salereport.ProdSaleStat_FromTime = $("#txtProdSaleFromTime").val();
                m_salereport.ProdSaleStat_ToTime = $("#txtProdSaleToTime").val();
            }

            if (pageVariable.chkProdSaleArea) {
                var m_areaObj = pageVariable.chkProdSaleArea.getObj();
                if (m_areaObj && m_areaObj.globalArea_Ids) {
                    m_salereport.GlobalAreaIds = m_areaObj.globalArea_Ids.split(',');
                }
            }

            m_salereport.querySAOSaleByAreaStat(function (retTable) {

                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                var m_totalqtyarr = [];
                var m_totalavagpricearr = [];
                var m_totalavagprofitarr = [];

                var m_colors = [];
                if (m_jsonobjs.length > 0) {
                    $.each(m_jsonobjs, function () {
                        m_totalqtyarr.push([this.SaleArea, Number(this.TotalQty)]);
                        m_totalavagpricearr.push([this.SaleArea, Number(this.AvgSalePrice)]);

                        var m_profit = 0;
                        if (Number(this.TotalQty) > 0) {
                            m_profit = Number((Number(this.TotalProfit) / Number(this.TotalQty)).toFixed(2));
                        }
                        m_totalavagprofitarr.push([this.SaleArea, m_profit]);
                    });
                    m_colors.push("#BBBBBB");

                    drawBarChat("dvSaodetailsaleArea", mlm.C1712, m_totalqtyarr, m_colors, 1100, 180);
                    drawBarChat("dvSaodetailavagpriceArea", mlm.C1710, m_totalavagpricearr, m_colors, 1100, 180);
                    drawBarChat("dvSaodetailavagprofitArea", mlm.C1713, m_totalavagprofitarr, m_colors, 1100, 180);
                }
                else {
                    pageframe.control.processCtrl.hideOperaProcess();
                }

                pageVariable.viewSAOSaleDetailStatFrm.areabar = true;
            });
        }
    }
    else if (ui.index == 3) {
        if (!pageVariable.viewSAOSaleDetailStatFrm.hourbar) {
            pageframe.control.processCtrl.showOperaProcess();

            var m_salereport = new sm.salereport();

            m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
            m_salereport.SaleAnalysisObj_Id = pageVariable.viewSAOSaleDetailStatFrm.SaleAnalysisObj_Id;

            if (pageVariable.viewSAOSaleDetailStatFrm.istrackfrm) {
                m_salereport.ProdSaleStat_FromTime = $("#txtFromTrackTime").val();
                m_salereport.ProdSaleStat_ToTime = $("#txtToTrackTime").val();
            }
            else {
                m_salereport.ProdSaleStat_FromTime = $("#txtProdSaleFromTime").val();
                m_salereport.ProdSaleStat_ToTime = $("#txtProdSaleToTime").val();
            }

            if (pageVariable.chkProdSaleArea) {
                var m_areaObj = pageVariable.chkProdSaleArea.getObj();
                if (m_areaObj && m_areaObj.globalArea_Ids) {
                    m_salereport.GlobalAreaIds = m_areaObj.globalArea_Ids.split(',');
                }
            }

            m_salereport.getSAOOrderCountStatByHour(function (retTable) {

                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                var m_dict = new datastruct.dictionary();
                $.each(m_jsonobjs, function () {
                    m_dict.setItem(this.SaleHour.toString(), this);
                });

                var m_ordercountarr = [];

                var m_colors = [];

                for (var m_i = 0; m_i < 24; m_i++) {
                    var m_obj = m_dict.getItem(m_i.toString());
                    if (m_obj) {
                        m_ordercountarr.push([m_i.toString(), Number(m_obj.OrderCount), Number(m_obj.TotalPrice)]);
                    }
                    else {
                        m_ordercountarr.push([m_i.toString(), 0, 0]);
                    }
                }

                m_colors.push("#4B4B4B");
                m_colors.push("#7A6FE3");

                drawBarChat("dvSaodetailsaleHourTime", mlm.C1674, m_ordercountarr, m_colors, 1100, 400);

                pageVariable.viewSAOSaleDetailStatFrm.hourbar = true;
            });
        }
    }
    else if (ui.index == 4) {
        if (!pageVariable.viewSAOSaleDetailStatFrm.skuproduct) {

            if (!pageVariable.saodetailsaleskuList) {
                pageVariable.saodetailsaleskuList = new uicontrol.tableList("saodetailsaleskuList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SS_InnerProd_Id",
                                         height: 350,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: constructSSInnerProdPicCell },
                                                   { display: mlm.C1162, name: "", width: 400, align: 'left', adjust: true, createCell: constructSSInnerProdCell },
                                                   { display: mlm.C1701, name: "DayAvageQty", width: 60, align: 'right', adjust: true, createCell: constructSaleQtyCell },
                                                   { display: mlm.C1700, name: "TotalQty", width: 70, align: 'right', adjust: true, createCell: constructSaleQtyCell },
                                                   { display: mlm.C1699, name: "TotalPrice", width: 75, align: 'right', adjust: true, createCell: constructProdStatPriceCell },
                                                   { display: mlm.C1704, name: "TotalProfit", width: 75, align: 'right', adjust: true, createCell: constructProdProfitCell },
                                                   { display: mlm.C1710, name: "AvgSalePrice", width: 100, align: 'right', adjust: true, createCell: constructAvgSalePriceCell}]
                                     });
            }

            pageframe.control.processCtrl.showOperaProcess();

            var m_salereport = new sm.salereport();
            m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
            m_salereport.SaleAnalysisObj_Id = pageVariable.viewSAOSaleDetailStatFrm.SaleAnalysisObj_Id;

            if (pageVariable.viewSAOSaleDetailStatFrm.istrackfrm) {
                m_salereport.ProdSaleStat_FromTime = $("#txtFromTrackTime").val();
                m_salereport.ProdSaleStat_ToTime = $("#txtToTrackTime").val();
            }
            else {
                m_salereport.ProdSaleStat_FromTime = $("#txtProdSaleFromTime").val();
                m_salereport.ProdSaleStat_ToTime = $("#txtProdSaleToTime").val();
            }

            if (pageVariable.chkProdSaleArea) {
                var m_areaObj = pageVariable.chkProdSaleArea.getObj();
                if (m_areaObj && m_areaObj.globalArea_Ids) {
                    m_salereport.GlobalAreaIds = m_areaObj.globalArea_Ids.split(',');
                }
            }

            m_salereport.querySAOSkuProdSaleStat(function (retTable) {

                pageVariable.saodetailsaleskuList.bindDataSource(retTable);

                pageVariable.viewSAOSaleDetailStatFrm.skuproduct = true;

                pageframe.control.processCtrl.hideOperaProcess();
            });
        }
    }
}
/* 构建商品图片列 */
function constructSSInnerProdPicCell(key, cellValue) {

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

    return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewSSProduct.call(this, \"" + this.keyObj.SS_Product_Id + "\", \"" + this.keyObj.SS_InnerProd_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
}
/* 构建Sku商品列 */
function constructSSInnerProdCell(key, cellValue) {
    var m_str = this.keyObj.ProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]";
    return "<div style='padding: 0px'><a onclick='viewSSProduct.call(this, \"" + this.keyObj.SS_Product_Id + "\", \"" + this.keyObj.SS_InnerProd_Id + "\")' href='javascript:void(\"0\");'>" + m_str.replace(/\^/g, "\"").replace(/\~/g, "\'") + "</a></div>";
}
/* 导出商品分析数据 */
function exportSaleAnalysis() {
    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.Keyword = $.trim($("#txtProdSaleKey").val());
    m_salereport.ProdSaleStat_FromTime = $("#txtProdSaleFromTime").val();
    m_salereport.ProdSaleStat_ToTime = $("#txtProdSaleToTime").val();
    m_salereport.SAOType = $("#ddlProdSaleSAOType").val();

    var m_areaObj = pageVariable.chkProdSaleArea.getObj();
    if (m_areaObj && m_areaObj.globalArea_Ids) {
        m_salereport.GlobalAreaIds = m_areaObj.globalArea_Ids.split(',');
    }
    m_salereport.SortField = pageVariable.ulprodsalestat.getSelectedItem()[0];
    m_salereport.exportSAOSaleStat(function (paramObj) {
        window.open(paramObj);
    });
}

/* 加载分析对象列表 */
function loadSaleAnalysisObjList() {
    
    $("#shopTitleTag").show();

    if (!pageVariable.asoList) {
        var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
        pageVariable.asoList = new uicontrol.tableList("asoList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "SaleAnalysisObj_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: querySaleAnalysisObjs,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: constructProdPicCell },
                                                   { display: mlm.C1667, name: "SAOName", width: 300, align: 'left', adjust: true, createCell: constructSAONameCell },
                                                   { display: mlm.C1690, name: "SAOType", width: 100, align: 'center' },
                                                   { display: mlm.C1714 + mlm.C1701, name: "TargetAvageSaleQty", width: 80, align: 'right', adjust: true, createCell: constructSaleQtyCell },
                                                   { display: mlm.C1714 + mlm.C1146, name: "TargetProfit", width: 90, align: 'right', adjust: true, createCell: constructProdProfitCell },
                                                   { display: mlm.C1714 + mlm.C1713, name: "TargetAvageProfit", width: 90, align: 'right', adjust: true, createCell: constructProdProfitCell },
                                                   { display: mlm.C0073, name: "Remark", width: 300, align: 'left'}]
                                     });

    }
}
/*  */
function constructProdPicCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_src = "";

    if (this.keyObj.ProdCount == "1") {
        if (cellValue.indexOf("http://") == -1) {
            m_src = window.webLocation + cellValue;
        }
        else {
            m_src = cellValue;
        }
        return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewSSProduct.call(this, \"" + this.keyObj.SS_Product_Id + "\")' src='" + m_src + "' /></div>";
    }
    else {
        m_src = window.webLocation + "BZM/Css/Images/nopic.png";
        return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this, 60);' /></div>";
    }
}
/*  */
function constructSAONameCell(key, cellValue) {
    var m_obj = this.keyObj;

    if (m_obj.ProdCount == "1") {
        return "<a style='color: black; text-decoration: none' href='javascript:void(\"0\");' onclick='viewSSProduct.call(this, \"" + this.keyObj.SS_Product_Id + "\")'>" + cellValue.replace(/\^/g, "\"").replace(/\~/g, "\'") + "<a>";
    }
    else if (Number(m_obj.ProdCount) > 1) {
        return "<a style='color: blue; text-decoration: none' href='javascript:void(\"0\");' onclick='viewASPProducts.call(this, \"" + this.keyObj.SaleAnalysisObj_Id + "\")'>" + cellValue.replace(/\^/g, "\"").replace(/\~/g, "\'") + "<a>";
    }
    else {
        return "<span style='color: gray'>" + cellValue + "<span>";
    }
}
/*  */
function constructSaleQtyCell(key, cellValue) {
    var m_qty = Number(cellValue);
    if (m_qty > 0) {
        return m_qty.toFixed(2);
    }
}
/* 查看分析对象的详细产品 */
function viewASPProducts(saleanalysisobj_id) {
    if (!pageVariable.viewSAOProdFrm) {
        pageVariable.viewSAOProdFrm = new uicontrol.dialog("viewSAOProdFrm", mlm.C0672 + mlm.C1667, { width: 800, position: ["auto", 50] });

        pageVariable.saoproductList = new uicontrol.tableList("saoproductList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "SS_Product_Id",
                                         height: 400,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: constructSSProdPicCell },
                                                   { display: mlm.C0734, name: "ProdName", width: 550, align: 'left', adjust: true, createCell: constructSSProdNameCell}]
                                     });
    }

    var m_salereport = new sm.salereport();
    m_salereport.SaleAnalysisObj_Id = saleanalysisobj_id;
    m_salereport.getSAOProduts(function (retTable) {
        pageVariable.saoproductList.bindDataSource(retTable);
    });

    pageVariable.viewSAOProdFrm.show();
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

    var m_items = [];
    m_items.push("<div style='padding: 0px'><a style='text-decoration: none; color: #000000' onclick='viewSSProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>[" + m_obj.ProdCode + "] - " + cellValue.replace(/\^/g, "\"").replace(/\~/g, "\'") + "</a></div>");
    if (Number(m_obj.AvailableUnitCount) > 1) {
        m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.AvailableUnitCount + mlm.C1066 + "</div>");
    }

    return m_items.join("");
}

/* 打开商品分析监控窗体 */
function openTrackSalaAnalysisFrm() {
    if (!pageVariable.queryTrackSaleAnalysisFrm) {
        pageVariable.queryTrackSaleAnalysisFrm = new uicontrol.dialog("queryTrackSaleAnalysisFrm", mlm.C1684, { width: 800 }, function () {

            var m_salereport = new sm.salereport();
            m_salereport.FromTime = $("#txtFromTrackTime").val();
            m_salereport.ToTime = $("#txtToTrackTime").val();
            m_salereport.TrackDays = $("#txtTrackDays").val();

            if (!m_salereport.FromTime) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1715);
                return;
            }

            if (!m_salereport.TrackDays || Number(m_salereport.TrackDays) == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1716);
                return;
            }

            pageframe.control.processCtrl.showOperaProcess();

            var m_comparefield = pageVariable.ulTracktype.getSelectedItem()[0];

            m_salereport.getTrackTimes(function (timeTable) {

                var m_columns = [];
                m_columns.push({ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: constructTrackSAOStatPicCell });
                m_columns.push({ display: mlm.C1667, name: "SAOName", width: 300, align: 'left', adjust: true, createCell: constructTrackSAOStatCell });

                if (m_comparefield == "DayAvageQtyRate") {
                    m_columns.push({ display: mlm.C1714 + mlm.C1701, name: "TargetAvageSaleQty", width: 90, align: 'right', adjust: true, createCell: constructSaleQtyCell });
                    $.each(timeTable, function () {
                        m_columns.push({ display: this, name: this + "-Key", width: 90, align: 'right', adjust: true, createCell: constructTrackSaleQtyCell });
                    });
                }
                else if (m_comparefield == "TotalProfitRate") {
                    m_columns.push({ display: mlm.C1714 + mlm.C1146, name: "TargetProfit", width: 90, align: 'right', adjust: true, createCell: constructProdProfitCell });
                    $.each(timeTable, function () {
                        m_columns.push({ display: this, name: this + "-Key", width: 90, align: 'right', adjust: true, createCell: constructTrackTotalPriceCell });
                    });
                }
                else {
                    m_columns.push({ display: mlm.C1714 + mlm.C1713, name: "TargetAvageProfit", width: 90, align: 'right', adjust: true, createCell: constructProdProfitCell });
                    $.each(timeTable, function () {
                        m_columns.push({ display: this, name: this + "-Key", width: 90, align: 'right', adjust: true, createCell: constructTrackAvagePriceCell });
                    });
                }

                $("#dvTrackSaleAnalysis").empty();
                $("#dvTrackSaleAnalysis").append("<table id='tracksaleanalysisTable'></table>");
                var mainFormHeight = pageframe.layout.getTableHeightInForm() - 8;
                pageVariable.tracksaleanalysisTable = new uicontrol.tableList("tracksaleanalysisTable",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "SaleAnalysisObj_Id",
                                         height: mainFormHeight,
                                         pageQueryHandler: tracksaleAnalysis,
                                         columns: m_columns
                                     });

                tracksaleAnalysis(1, pageVariable.tracksaleanalysisTable.pageNumber);
            });
        });

        $("#txtFromTrackTime").datepicker();
        $("#txtToTrackTime").datepicker();

        pageVariable.ulTracktype = new uicontrol.selectbox("ulTracktype", "radio");

        var items = [];
        items.push({ key: "DayAvageQtyRate", value: mlm.C1701 });
        items.push({ key: "TotalProfitRate", value: mlm.C1704 });
        items.push({ key: "AvageProfitRate", value: mlm.C1713 });

        pageVariable.ulTracktype.bindSource(items);
        pageVariable.ulTracktype.setSelectedItem([{ key: "DayAvageQtyRate" }]);
    }

    loadSAOType("ddlTrackSAOType");

    pageVariable.queryTrackSaleAnalysisFrm.show();
}
/*  */
function constructTrackSAOStatPicCell(key, cellValue) {
    var m_obj = this.keyObj;

    var m_src = "";

    if (this.keyObj.ProdCount == "1") {
        if (cellValue.indexOf("http://") == -1) {
            m_src = window.webLocation + cellValue;
        }
        else {
            m_src = cellValue;
        }
        return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewSAODetalSale.call(this, \"" + this.keyObj.SaleAnalysisObj_Id + "\", true)' src='" + m_src + "' /></div>";
    }
    else if (Number(m_obj.ProdCount) > 1) {
        m_src = window.webLocation + "BZM/Css/Images/nopic.png";
        return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onclick='viewSAODetalSale.call(this, \"" + this.keyObj.SaleAnalysisObj_Id + "\", true)' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this, 60);' /></div>";
    }
    else {
        m_src = window.webLocation + "BZM/Css/Images/nopic.png";
        return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this, 60);' /></div>";
    }
}
/*  */
function constructTrackSAOStatCell(key, cellValue) {
    var m_obj = this.keyObj;

    if (m_obj.ProdCount == "1") {
        return "<a style='color: black; text-decoration: none' href='javascript:void(\"0\");' onclick='viewSAODetalSale.call(this, \"" + this.keyObj.SaleAnalysisObj_Id + "\", true)'>" + cellValue + "<a>";
    }
    else if (Number(m_obj.ProdCount) > 1) {
        return "<a style='color: blue; text-decoration: none' href='javascript:void(\"0\");' onclick='viewSAODetalSale.call(this, \"" + this.keyObj.SaleAnalysisObj_Id + "\", true)'>" + cellValue + "<a>";
    }
    else {
        return "<span style='color: gray'>" + cellValue + "<span>";
    }
}
/* 商品分析监控 */
function tracksaleAnalysis(pageNum, pageCount) {

    pageframe.control.processCtrl.showOperaProcess();

    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.Keyword = $.trim($("#txtTrackSAOKey").val());
    m_salereport.SAOType = $("#ddlTrackSAOType").val();
    m_salereport.FromTime = $("#txtFromTrackTime").val();
    m_salereport.ToTime = $("#txtToTrackTime").val();
    m_salereport.TrackDays = $("#txtTrackDays").val();

    m_salereport.CompareField = pageVariable.ulTracktype.getSelectedItem()[0];

    m_salereport.Page = pageNum;
    m_salereport.PageNum = pageCount;

    m_salereport.trackSaleAnalysis(function (retTable) {
        pageVariable.tracksaleanalysisTable.bindDataSource(retTable);
        pageVariable.queryTrackSaleAnalysisFrm.close();

        pageframe.control.processCtrl.hideOperaProcess();
    });
}
/*  */
function constructTrackSaleQtyCell(key, cellValue) {
    var m_qty = Number(this.keyObj[cellValue + "-DayAvageQty"]).toFixed(2);
    var m_qtyrate = (Number(this.keyObj[cellValue + "-DayAvageQtyRate"]) * 100).toFixed(2);
    
    var m_fontcolor = "";
    if (m_qtyrate < 0) {
        m_fontcolor = "color: #007D00";
    }
    else if (m_qtyrate > 0) {
        m_fontcolor = "color: #DD0000";
    }

    var m_arr = [];
    m_arr.push("<div style='padding: 0px; " + m_fontcolor + "'>" + m_qtyrate + "%</div>");
    m_arr.push("<div style='padding: 0px; color: #5F5F5F'>(" + mlm.C1700 + ": " + m_qty + ")</div>");

    return m_arr.join("");
}
/*  */
function constructTrackTotalPriceCell(key, cellValue) {
    var m_profit = Number(this.keyObj[cellValue + "-TotalProfit"]).toFixed(2);
    var m_profitrate = (Number(this.keyObj[cellValue + "-TotalProfitRate"]) * 100).toFixed(2);

    var m_fontcolor = "";
    if (m_profitrate < 0) {
        m_fontcolor = "color: #007D00";
    }
    else if (m_profitrate > 0) {
        m_fontcolor = "color: #DD0000";
    }

    var m_arr = [];
    m_arr.push("<div style='padding: 0px; " + m_fontcolor + "'>" + m_profitrate + "%</div>");
    m_arr.push("<div style='padding: 0px; color: #5F5F5F'>(" + commoncore.func.getCurrHtml(saleplatform.currObj.CurrSymbol, m_profit) + ")</div>");

    return m_arr.join("");
}
/*  */
function constructTrackAvagePriceCell(key, cellValue) {

    var m_qty = Number(this.keyObj[cellValue + "-DayAvageQty"]);
    if (m_qty == 0) {
        return;
    }

    var m_profit = Number(this.keyObj[cellValue + "-AvageProfit"]).toFixed(2);
    var m_profitrate = (Number(this.keyObj[cellValue + "-AvageProfitRate"]) * 100).toFixed(2);

    var m_fontcolor = "";
    if (m_profitrate < 0) {
        m_fontcolor = "color: #007D00";
    }
    else if (m_profitrate > 0) {
        m_fontcolor = "color: #DD0000";
    }

    var m_arr = [];
    m_arr.push("<div style='padding: 0px; " + m_fontcolor + "'>" + m_profitrate + "%</div>");
    m_arr.push("<div style='padding: 0px; color: #5F5F5F'>(" + commoncore.func.getCurrHtml(saleplatform.currObj.CurrSymbol, m_profit) + ")</div>");

    return m_arr.join("");
}

/* 打开查询分析对象的窗体 */
function openQuerySAOFrm() {
    if (!pageVariable.querySAOFrm) {
        pageVariable.querySAOFrm = new uicontrol.dialog("querySAOFrm", mlm.C0562 + mlm.C1667, { width: 800 }, function () {
            querySaleAnalysisObjs(1, pageVariable.asoList.pageNumber);
        });
    }

    loadSAOType("ddlSAOType");

    pageVariable.querySAOFrm.show();
}
/* 加载分析类型 */
function loadSAOType(ctrlid) {

    var m_ctrl = $("#" + ctrlid);

    if (!pageVariable.saotypes) {
        var m_salereport = new sm.salereport();
        m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
        m_salereport.getSAOTypes(function (retTable) {

            pageVariable.saotypes = datastruct.convertion.tableToJson(retTable);

            m_ctrl.empty();
            $.each(pageVariable.saotypes, function () {
                m_ctrl.append("<option value='" + this.SAOType + "'>" + this.SAOType + "</option>");
            });
        });
    }
    else {
        m_ctrl.empty();
        $.each(pageVariable.saotypes, function () {
            m_ctrl.append("<option value='" + this.SAOType + "'>" + this.SAOType + "</option>");
        });
    }
}
/* 查询分析对象 */
function querySaleAnalysisObjs(pageNum, pageCount) {

    pageframe.control.processCtrl.showOperaProcess();

    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.Keyword = $("#txtSAOKeyword").val();
    m_salereport.SAOType = $("#ddlSAOType").val();
    m_salereport.Page = pageNum;
    m_salereport.PageNum = pageCount;

    m_salereport.querySaleAnalysisObjs(function (retTable) {

        pageVariable.asoList.bindDataSource(retTable);

        if (pageVariable.querySAOFrm) {
            pageVariable.querySAOFrm.close();
        }

        pageframe.control.processCtrl.hideOperaProcess();
    });
}
/* 导出商品分析对象 */
function exportSaleAnalysisObjs() {
    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.exportSaleAnalysisObjs(function (paramObj) {
        window.open(paramObj);
    });
}
/* 打开导入窗体 */
function openImportFrm() {
    if (!pageVariable.handlerImportFrm) {
        pageVariable.handlerImportFrm = new uicontrol.dialog("handlerImportFrm", mlm.C0986 + mlm.C1667, { width: 800 }, function () {
            if (pageVariable.handlerImportFrm.action == "saleanalysisobj") {
                importSaleAnalysisObjs();
            }
            else if (pageVariable.handlerImportFrm.action == "smtsearchanalysis") {
                smtsearchAnalysis();
            }
            else {
                importMarketingCost();
            }
        });
        pageVariable.importFile = new uicontrol.file("importFile");
    }

    pageVariable.handlerImportFrm.action = $(this).attr("tag");

    pageVariable.handlerImportFrm.show();
}
/* 导入商品分析对象 */
function importSaleAnalysisObjs() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.importSaleAnalysisObjs(pageVariable.importFile, function (retObj) {
        if (retObj) {
            window.open(retObj);
        }

        loadSaleAnalysisObjList();

        pageVariable.saotypes = null;

        pageVariable.handlerImportFrm.close();
    });
}
/* 速卖通搜索分析 */
function smtsearchAnalysis() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    var m_salereport = new sm.salereport();
    m_salereport.exportSMTSearchAnalysis(pageVariable.importFile, function (retObj) {
        if (retObj) {
            window.open(retObj);
        }

        pageVariable.handlerImportFrm.close();
    });
}

/* 绘制站点统计图表 */
function drawSiteChat(ctrlid, titile, labelxs, dataArr, dataColors) {
    pageVariable.salesiteChart = new JSChart(ctrlid, 'line');
    
    var m_xlength = 0;
    var m_i = 0;
    $.each(dataArr, function () {
        pageVariable.salesiteChart.setDataArray(this, dataColors[m_i]);
        $.each(this, function () {
            pageVariable.salesiteChart.setTooltip([this[0], ""]);
        });

        if (m_xlength == 0 || this.length > m_xlength) {
            m_xlength = this.length;
        }

        m_i++;
    });
    pageVariable.salesiteChart.setAxisValuesNumberX(m_xlength);

    pageVariable.salesiteChart.setTitle(titile);
    pageVariable.salesiteChart.setTooltipFontFamily("微软雅黑");
    pageVariable.salesiteChart.setTitleColor('#8E8E8E');
    pageVariable.salesiteChart.setTitleFontFamily('微软雅黑');
    pageVariable.salesiteChart.setTitleFontSize(11);
    pageVariable.salesiteChart.setAxisNameX('');
    pageVariable.salesiteChart.setAxisNameY('');
    pageVariable.salesiteChart.setAxisColor('#8420CA');
    pageVariable.salesiteChart.setAxisValuesColor('#949494');
    pageVariable.salesiteChart.setAxisPaddingLeft(50);
    pageVariable.salesiteChart.setAxisPaddingRight(50);
    pageVariable.salesiteChart.setAxisPaddingTop(50);
    pageVariable.salesiteChart.setAxisPaddingBottom(40);
    pageVariable.salesiteChart.setAxisValuesDecimals(2);
    pageVariable.salesiteChart.setAxisValuesAngle(30);
    pageVariable.salesiteChart.setAxisWidth(1);
    pageVariable.salesiteChart.setGridColor('#C5A2DE');
    pageVariable.salesiteChart.setLineColor('#BBBBBB');
    pageVariable.salesiteChart.setLineColor('#009933', 'green');
    pageVariable.salesiteChart.setLineColor('#9D9D9D', 'gray');
    pageVariable.salesiteChart.setLineColor('#7A6FE3', 'blue');
    pageVariable.salesiteChart.setLineColor('#4B4B4B', 'black');
    pageVariable.salesiteChart.setLineWidth(2);
    pageVariable.salesiteChart.setFlagColor('#BBBBBB');
    pageVariable.salesiteChart.setFlagRadius(4);
    pageVariable.salesiteChart.setShowXValues(false);
    pageVariable.salesiteChart.setGraphExtend(false);

    var m_j = 0;
    var m_k = 1;
    var m_lasttime = "";
    var m_separete = 1;
    if (m_xlength < 15) {
        m_separete = 1;
    }
    else if (m_xlength < 31) {
        m_separete = 3;
    }
    else {
        m_separete = 6;
    }
    $.each(labelxs, function () {

        if (m_j == 0 || m_j == m_separete) {
            pageVariable.salesiteChart.setLabelX([m_k, this.toString()]);
            m_j = 0;
            m_lasttime = this.toString();
        }
        m_j++;
        m_k++;
    });

    if (m_lasttime != labelxs[m_xlength - 1].toString()) {
        pageVariable.salesiteChart.setLabelX([m_xlength, labelxs[m_xlength - 1].toString()]);
    }

    pageVariable.salesiteChart.setSize(1200, 500);
    pageVariable.salesiteChart.draw();

    pageframe.control.processCtrl.hideOperaProcess();
}

/* 绘制曲线视图 */
function drawLineChat(ctrlid, title, labelxs, dataArr, width, height) {
    var chart = new JSChart(ctrlid, 'line');

    var m_xlength = 0;
    var m_i = 0;
    $.each(dataArr, function () {
        chart.setDataArray(this.source, this.color);
        $.each(this.source, function () {
            chart.setTooltip([this[0], ""]);
        });

        if (m_xlength == 0 || this.source.length > m_xlength) {
            m_xlength = this.source.length;
        }

        m_i++;
    });
    chart.setAxisValuesNumberX(m_xlength);

    chart.setTitle(title);
    chart.setTooltipFontFamily("微软雅黑");
    chart.setTitleColor('#8E8E8E');
    chart.setTitleFontFamily('微软雅黑');
    chart.setTitleFontSize(11);
    chart.setAxisNameX('');
    chart.setAxisNameY('');
    chart.setAxisColor('#8420CA');
    chart.setAxisValuesColor('#949494');
    chart.setAxisPaddingLeft(80);
    chart.setAxisPaddingRight(120);
    chart.setAxisPaddingTop(50);
    chart.setAxisPaddingBottom(40);
    chart.setAxisValuesDecimals(2);
    chart.setAxisValuesAngle(30);
    chart.setAxisWidth(1);
    chart.setGridColor('#C5A2DE');
    chart.setLineColor('#BBBBBB');
    chart.setLineColor('#FF5151', 'red');
    chart.setLineColor('#FFFF00', 'yellow');
    chart.setLineColor('#009933', 'green');
    chart.setLineColor('#BBBBBB', 'gray');
    chart.setLineColor('#7A6FE3', 'blue');
    chart.setLineColor('#4B4B4B', 'black');
    chart.setLineWidth(2);
    chart.setFlagColor('#BBBBBB');
    chart.setFlagRadius(4);
    chart.setShowXValues(false);
    chart.setGraphExtend(false);

    var m_j = 0;
    var m_k = 1;
    var m_lasttime = "";
    var m_separete = 1;
    if (m_xlength < 15) {
        m_separete = 1;
    }
    else if (m_xlength < 31) {
        m_separete = 3;
    }
    else {
        m_separete = 6;
    }
    $.each(labelxs, function () {

        if (m_j == 0 || m_j == m_separete) {
            chart.setLabelX([m_k, this.toString()]);
            m_j = 0;
            m_lasttime = this.toString();
        }
        m_j++;
        m_k++;
    });

    if (m_lasttime != labelxs[m_xlength - 1].toString()) {
        chart.setLabelX([m_xlength, labelxs[m_xlength - 1].toString()]);
    }

    chart.setSize(width, height);
    chart.draw();

    pageframe.control.processCtrl.hideOperaProcess();
}
/* 绘制柱状视图 */
function drawBarChat(ctrlid, title, dataArr, colorArr, width, height) {
    var myChart = new JSChart(ctrlid, 'bar');
    myChart.setDataArray(dataArr);
    var m_i = 1;
    $.each(colorArr, function () {
        myChart.setBarColor(colorArr[m_i - 1], m_i);
        m_i++;
    });

    myChart.setTitle(title);
    myChart.setFontFamily('微软雅黑');
    myChart.setTooltipFontFamily("微软雅黑");
    myChart.setTitleColor('#8E8E8E');
    myChart.setTitleFontFamily('微软雅黑');
    myChart.setAxisNameX('');
    myChart.setAxisNameY('');
    myChart.setAxisColor('#C4C4C4');
    myChart.setAxisNameFontSize(16);
    myChart.setAxisNameColor('#999');
    myChart.setAxisValuesColor('#7E7E7E');
    myChart.setAxisValuesAngle(30);
    myChart.setAxisWidth(1);
    myChart.setBarValuesColor('#7E7E7E');
    myChart.setAxisPaddingTop(40);
    myChart.setAxisPaddingRight(20);
    myChart.setAxisPaddingBottom(45);
    myChart.setTextPaddingLeft(80);
    myChart.setTitleFontSize(11);
    myChart.setBarBorderWidth(1);
    myChart.setBarBorderColor('#C4C4C4');
    myChart.setBarSpacingRatio(50);
    myChart.setBarOpacity(0.9);
    myChart.setFlagRadius(6);
    myChart.setTooltipPosition('nw');
    myChart.setTooltipOffset(3);
    myChart.setGrid(true);
    myChart.setGridColor('#C6C6C6');
    myChart.setSize(width, height);
    myChart.draw();

    pageframe.control.processCtrl.hideOperaProcess();
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

/* 生成销售统计分析数据 */
function generateSaleReport() {
    if (!$("#importSRFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1687 + mlm.C0193);
        return;
    }

    var m_salereport = new sm.salereport();
    m_salereport.generateSaleReport(pageVariable.importSRFile, function (retObj) {
        if (retObj) {
            window.open(retObj);
        }
    });
}

/* 导出营销成本对象 */
function exportMarketingCost() {
    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.exportMarketingCost(function (paramObj) {
        window.open(paramObj);
    });
}
/* 导入营销成本对象 */
function importMarketingCost() {
    if (!$("#importFile").val()) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0752 + mlm.C0193);
        return;
    }

    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.importMarketingCost(pageVariable.importFile, function (retObj) {
        if (retObj) {
            window.open(retObj);
        }

        pageVariable.handlerImportFrm.close();
    });
}

/* 导出销售分析跟踪 */
function exportTrackSaleAnalysis() {
    var m_salereport = new sm.salereport();
    m_salereport.SaleSite_Id = saleplatform.currSaleSite_Id;
    m_salereport.Keyword = $.trim($("#txtTrackSAOKey").val());
    m_salereport.SAOType = $("#ddlTrackSAOType").val();
    m_salereport.FromTime = $("#txtFromTrackTime").val();
    m_salereport.ToTime = $("#txtToTrackTime").val();
    m_salereport.TrackDays = $("#txtTrackDays").val();

    if (!m_salereport.FromTime) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1715);
        return;
    }

    if (!m_salereport.TrackDays || Number(m_salereport.TrackDays) == 0) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C1716);
        return;
    }

    m_salereport.CompareField = pageVariable.ulTracktype.getSelectedItem()[0];
    m_salereport.exportTrackSaleAnalysis(function (paramObj) {
        window.open(paramObj);
    });
}

/* 填充语言资源 */
function fillPageLanRes() {

    /* ECMS-销售统计分析 */
    document.title = "ECMS-" + mlm.C1653;

    /* 全网销售额 */
    $("#lbSiteSaleStatTag").text(mlm.C1660);
    /* 全网订单量 */
    $("#lbSiteSaleStatQtyTag").text(mlm.C1661);
    /* 全网利润 */
    $("#lbSiteSaleStatProfitTag").text(mlm.C1662);
    /* 站点订单量 */
    $("#lbSaleHourTimeTag").text(mlm.C1663);
    /* 站点销售额&利润 */
    $("#lbSaleProfitbySiteTag").text(mlm.C1664);
    /* 商品分析 */
    $("#lbProdSaleStatTag").text(mlm.C1665);
    /* 商品分析监控 */
    $("#lbTrackSaleAnalysisTag").text(mlm.C1666);
    /* 商品分析对象 */
    $("#lbASOTag, #lbASOTitle").text(mlm.C1667); 
    /* 其他 */
    $("#lbSaleStatTag").text(mlm.M0006);
    /* 全网销售额统计 */
    $("#lbSiteSaleStatTitle").text(mlm.C1660 + mlm.C1668);
    /* SMT-电子产品&配件 */
    $("#lbSSStatLabel_11Symobl, #lbSSQtyStat_11Symobl, #lbSSProfitStat_11Symobl").text(mlm.C1669);
    /* 淘宝-电子产品&配件 */
    $("#lbSSStatLabel_20Symobl, #lbSSQtyStat_20Symobl, #lbSSProfitStat_20Symobl").text(mlm.C1670);
    /* ebay-电子产品&配件 */
    $("#lbSSStatLabel_1Symobl, #lbSSQtyStat_1Symobl, #lbSSProfitStat_1Symobl").text(mlm.C1671);
    /* Wish-Mikoor */
    $("#lbSSStatLabel_12Symobl, #lbSSQtyStat_12Symobl, #lbSSProfitStat_12Symobl").text("Wish-Mikoor");
    /* 全网销售额统计视图 */
    $("#dvSiteSaleGraph").text(mlm.C1660 + mlm.C1668 + mlm.C1672 + "...");
    /* 全网订单量统计 */
    $("#lbSiteSaleQtyStatTitle").text(mlm.C1661 + mlm.C1668);
    /* 全网订单量统计视图 */
    $("#dvSiteSaleQtyGraph").text(mlm.C1661 + mlm.C1668 + mlm.C1672 + "...");
    /* 全网利润统计 */
    $("#lbSiteSaleProfitStatTitle").text(mlm.C1662 + mlm.C1668);
    /* 全网利润统计视图 */
    $("#dvSiteSaleProfitGraph").text(mlm.C1662 + mlm.C1668 + mlm.C1672 + "...");
    /* 站点订单量统计 */
    $("#lbSaleHourTimeSymbol").text(mlm.C1663 + mlm.C1668);
    /* 销售时间分布 */
    $("#dvSaleHourTimeGraph").text(mlm.C1674 + "...");
    /* 销售区域分布 */
    $("#dvSaleAreaGraph").text(mlm.C1675 + "...");
    /* 站点销售额&利润统计 */
    $("#lbSaleProfitbySiteSymbol").text(mlm.C1664 + mlm.C1668);
    /* 销售额区域分布 */
    $("#dvSalepricebysitearea").text(mlm.C1676 + "...");
    /* 总利润区域分布 */
    $("#dvSaletoalprofitbysitearea").text(mlm.C1677 + "...");
    /* 每件利润区域分布 */
    $("#dvSaleprofitbysitearea").text(mlm.C1678 + "...");
    /* 商品销量统计 */
    $("#lbProdSaleStat").text(mlm.C1679 + mlm.C1668);
    /* 商品分析监控 */
    $("#lbTrackSATitle").text(mlm.C1684);
    /* 销售统计分析 */
    $("#lbSaleStatTitle").text(mlm.C1653);
    /* 原数据文件 */
    $("#lbSaleReportTitle").text(mlm.C1687 + ":");
    /* 时间段 */
    $("#lbSSStatTimeSymbol, #lbSHTTimeSymbol, #lbProdSaleFromTimeSymbol, #lbFromTrackTimeSymbol").text(mlm.C1689 + ":");
    /* 站点 */
    $("#lbSSStatSiteSymbol").text(mlm.C0416 + ":");
    /* 区域 */
    $("#lbSHTAreaSymbol, #lbProdSaleAreaSymbol").text(mlm.C0772 + ":");
    /* 到 */
    $("#lbToSymbol, #lbToSymbol_1, #lbToSymbol_2, #lbToSymbol_3").text(mlm.C0412);
    /* 对象类型 */
    $("#lbProdSaleSAOTypeSymbol, #lbSAOTypeSymbol, #lbTrackSAOTypeSymbol").text(mlm.C1690 + ":");
    /* 关键字 */
    $("#lbProdSaleKeySymbol, #lbSAOKeywordSymbol, #lbTrackSAOKeySymbol").text(mlm.C0184 + ":");
    /* 排序字段 */
    $("#lbProdSaleSortSymbol").text(mlm.C1039 + ":");
    /* 销售分析 */
    $("#lbSAODetalStatSaleSymbol").text(mlm.C1691);
    /* 销售价格分析 */
    $("#lbSAODetalStatPriceSymbol").text(mlm.C1692);
    /* 区域分析 */
    $("#lbSAODetalStatAreaSymbol").text(mlm.C0772 + mlm.C1693);
    /* 时间段分析 */
    $("#lbSAODetalStatHourTimeSymbol").text(mlm.C1689 + mlm.C1693);
    /* 商品Sku分析 */
    $("#lbSAODetalStatSkuSymbol").text(mlm.C1162 + mlm.C1693);
    /* 监控类型 */
    $("#lbTrackType").text(mlm.C1694 + ":");
    /* 监控周期 */
    $("#lbTrackDaysSymbol").text(mlm.C1695 + ":");

    /* 数据统计 */
    $("#btQuerySiteSale, #btQuerySiteSaleQty, #btQuerySiteSaleProfit, #btSaleHourTime, #btSaleProfitbySite, #btStatProdSale").val(mlm.C1673);
    /* 导出统计数据 */
    $("#btExportProdSale").val(mlm.C1681 + mlm.C1680);
    /* 导出营销成本 */
    $("#btExportMarketingCost").val(mlm.C1681 + mlm.C1682);
    /* 导入营销成本 */
    $("#btImportMarketingCost").val(mlm.C1683 + mlm.C1682);
    /* 查询 */
    $("#btTrackSaleAnalysis, #btQueryASO").val(mlm.C0562); 
    /* 导出数据 */
    $("#btExportTrackSaleAnalysis, #btExportASO").val(mlm.C1681 + mlm.C1685);
    /* 导入数据 */
    $("#btImportASO").val(mlm.C1683 + mlm.C1685);
    /* 输出分析数据 */
    $("#btGenerateSR").val(mlm.C1686);

    /* 站点 */
    $("#lbSaleSite_ComSymbol").text(mlm.C1011 + ":");

    /* 导入文件 */
    $("#lbImportFileSymbol").text(mlm.C0752 + ":");
    /* 该文件只支持office excel 2003版本 */
    $("#lbimportAlert").text(mlm.C0753);
}