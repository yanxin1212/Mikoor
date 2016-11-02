(function (window) {

    window.jsdir = "/BZM/Scripts/MLM/Compress/";
    window.cssdir = "/BZM/Css/MLM/";
    window.webLocation = window.location.protocol + "//" + window.location.host + "/";

    /* 
    -----多语言函数----- 
    */
    window.mlm = {

        /* 默认语言 */
        defaultLanguage: "简体中文!zh-cn",

        /* 当前语言 */
        currLanguage: "",

        /* 所有语言种类 */
        languages: [],

        /* 语言种类绑定事件 */
        bindLanguageEvent: [],

        /* 初始化当前语言 */
        init: function () {

            var m_cookielan = runtime.clientRunSetting.getUserSetting("lanuage");
            if (!m_cookielan) {
                m_cookielan = mlm.defaultLanguage;
                runtime.clientRunSetting.storeUserSetting("lanuage", m_cookielan);
            }
            var m_arr = m_cookielan.split("!");
            mlm.currLanguage = { name: m_arr[0], code: m_arr[1] };
        },

        /* 设置语言资源 */
        setLanguageRes: function (lanSymbol) {
            runtime.clientRunSetting.storeUserSetting("lanuage", lanSymbol);

            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();

            location.reload();
        },

        /* 获取多语言 */
        getLanguages: function (event) {

            if (mlm.languages.length == 0) {
                var handlerObj = new webhandler.webTransferObj("GetSettingLanguages");
                var context = new webhandler.bizExeContext(function (retObj) {

                    var m_languages = datastruct.convertion.tableToJson(retObj);
                    mlm.languages = m_languages;

                    if (event) {
                        event();
                    }
                });
                webhandler.ajaxHandler.loadCacheData(handlerObj, context);
            }
            else {
                if (event) {
                    event();
                }
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----环境参数函数----- 
    */
    window.keycontext = {

        keyparam: {},

        /* 初始化当前环境 */
        init: function () {
            var m_keyparam = runtime.clientRunSetting.getRunningContext("keycontext");

            if (!m_keyparam) {

                var m_syskeyparam = new spm.syskeyparam();
                m_syskeyparam.readSysKeyParam(function (retObj) {
                    runtime.clientRunSetting.storeRunningContext("keycontext", retObj.SysWeightUnit_Id + "-" + retObj.OtherProps.WUnit);
                    keycontext.keyparam.WUnit = retObj.OtherProps.WUnit;
                    keycontext.keyparam.SysWeightUnit_Id = retObj.SysWeightUnit_Id;
                });
            }
            else {
                var m_items = m_keyparam.split("-");
                keycontext.keyparam.SysWeightUnit_Id = m_items[0];
                keycontext.keyparam.WUnit = m_items[1];
            }

            //默认人民币
            keycontext.keyparam.syscurrency = 1;
            keycontext.keyparam.syscurrsymbol = "￥";
            keycontext.keyparam.syscurrcode = "CNY";

            //默认人民币
            keycontext.keyparam.tax_syscurrency = 2;
            keycontext.keyparam.tax_syscurrsymbol = "$";
            keycontext.keyparam.tax_syscurrcode = "USD";
        }
    };
    /*-------------------------------*/

    /* 
    -----安全处理函数----- 
    */
    window.security = {

        /* 验证用户 */
        authoriseUser: function () {
            var m_usertoken = runtime.clientRunSetting.getRunningContext("usertoken");
            if (!m_usertoken) {
                window.location = "/bzm/login.htm";
                return;
            }

            var handlerObj = new webhandler.webTransferObj("AuthoriseUserToken");
            var context = new webhandler.bizExeContext(null, signOut);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        //SMT授权认证
        authoriseSMT: function () {

            var smt_code = commoncore.func.getUrlParam("code");
            if (smt_code) {
                var m_syskeyparam = new spm.syskeyparam();
                m_syskeyparam.SMTCode = smt_code;
                m_syskeyparam.authoriseSMT(function () { });
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----销售平台函数----- 
    */
    window.saleplatform = {

        /* 加载销售平台和销售区域 */
        loadSaleSites: function (afterLoadEvent) {

            saleplatform.salesiteCtrl = $("#ddlSalePlatform");
            var m_saleplatform = new sm.saleplatform();
            m_saleplatform.queryAvaiSaleSites(function (tableSource) {
                var m_shoppingSiteAreas = datastruct.convertion.tableToJson(tableSource);

                if (m_shoppingSiteAreas.length > 0) {

                    $.each(m_shoppingSiteAreas, function () {

                        this.Key = this.SalePlatform_Id;
                        this.Value = this.SPfName;
                        if (this.SaleSite_Id) {
                            this.Key = this.Key + "-" + this.SaleSite_Id;
                            this.Value = this.Value + "-" + this.SaleSiteName;
                        }
                        saleplatform.salesiteCtrl.append("<option value='" + this.Key + "'>" + this.Value + "</option>");
                    });

                    saleplatform.salesites = m_shoppingSiteAreas;

                    var m_ssArrs = saleplatform.salesiteCtrl.val().split("-");
                    saleplatform.currSalePlatformId = m_ssArrs[0];
                    if (m_ssArrs.length == 2) {
                        saleplatform.currSaleSite_Id = m_ssArrs[1];
                    }
                    else {
                        saleplatform.currSaleSite_Id = 0;
                    }

                    $.each(saleplatform.salesites, function () {
                        if (this.SalePlatform_Id == saleplatform.currSalePlatformId && this.SaleSite_Id == saleplatform.currSaleSite_Id) {
                            saleplatform.currObj = this;
                        }
                    });
                }

                if (afterLoadEvent) {
                    afterLoadEvent();
                }
            });

            saleplatform.salesiteCtrl.change(function () {

                var m_ssArrs = saleplatform.salesiteCtrl.val().split("-");
                saleplatform.currSalePlatformId = m_ssArrs[0];
                if (m_ssArrs.length == 2) {
                    saleplatform.currSaleSite_Id = m_ssArrs[1];
                }
                else {
                    saleplatform.currSaleSite_Id = 0;
                }

                $.each(saleplatform.salesites, function () {
                    if (this.SalePlatform_Id == saleplatform.currSalePlatformId && this.SaleSite_Id == saleplatform.currSaleSite_Id) {
                        saleplatform.currObj = this;
                    }
                });

                if (afterLoadEvent) {
                    afterLoadEvent();
                }
            });
        },

        /* 检测销售平台 */
        checkSalePlatform: function () {

            if (!saleplatform.salesites || saleplatform.salesites.length == 0) {
                if (!saleplatform.checkSalePlatformFrm) {
                    saleplatform.checkSalePlatformFrm = new uicontrol.dialog("checkSalePlatformFrm", mlm.C0356, { width: 800 }, function () {
                        window.location = "/bzm/bizui/saleplatform.htm";
                    }, true);
                }

                saleplatform.checkSalePlatformFrm.show();
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----页面通用函数----- 
    */
    window.commoncore = {};
    commoncore.func = {

        /* 处理异常 */
        dealError: function (error) {
            if (error.Message) {
                pageframe.control.alertDialog.showAlertInfo(error.Message);
            }
            else {
                pageframe.control.alertDialog.showAlertInfo(error);
            }
        },

        /* 添加字体样式（类型a） */
        addFontStyle_a: function () {
            var thisObj = $(this);
            thisObj.css("color", "#FFFFFF");
            thisObj.css("text-decoration", "underline");
        },

        /* 删除字体样式（类型a） */
        removeFontStyle_a: function () {
            var thisObj = $(this);
            thisObj.css("color", "#E3E3E3");
            thisObj.css("text-decoration", "none");
        },

        /* 添加字体样式（类型b） */
        addFontStyle_b: function () {
            var thisObj = $(this);
            thisObj.css("text-decoration", "underline");
        },

        /* 删除字体样式（类型b） */
        removeFontStyle_b: function () {
            var thisObj = $(this);
            thisObj.css("text-decoration", "none");
        },

        /* 添加按钮样式（类型a） */
        addBtStyle_a: function () {
            var thisObj = $(this);
            thisObj.css("background-color", "#333333");
        },

        /* 删除按钮样式（类型a） */
        removeBtStyle_a: function () {
            var thisObj = $(this);
            thisObj.css("background-color", "");
        },

        /* 生成属性控件 */
        generatePropCtrl: function (prop, valueItems, pvalueSource) {

            var htmlArr = [];

            if (!pvalueSource || pvalueSource == "1") {
                htmlArr.push("<ul>");

                var i = 0;
                $.each(valueItems, function () {
                    var m_id = i + "c_" + prop;
                    htmlArr.push("<li style='float: left; margin: 0px 5px 5px 0px'><input type='checkbox' id='" + m_id + "' value='" + this.key + "' name='" + prop + "' />");
                    htmlArr.push("<span style='cursor: pointer;' onmouseover='commoncore.func.addFontStyle_b.call(this);' onmouseout='commoncore.func.removeFontStyle_b.call(this);' onclick='commoncore.func.triggerInput(\"" + m_id + "\");'>" + this.value + "</span></li>");
                    i++;
                });

                htmlArr.push("</ul>");
            }
            else {
                var m_id = "c_" + prop;
                htmlArr.push("<textarea id='" + m_id + "' cols='20' rows='2' class='multitext-input' onkeypress='uicontrol.func.checkInput(event);'></textarea>");
            }

            return htmlArr.join("");
        },

        /* 触发选择事件 */
        triggerInput: function (ctrlId) {
            $("#" + ctrlId).click();
        },

        /* 构建数字列 */
        constructNumberCell: function (key, cellValue) {
            return Number(cellValue).toFixed(2);
        },

        /* 构建时间列 */
        constructDateTimeCell: function (key, cellValue) {
            if (cellValue) {
                return datastruct.convertion.convertToDateStr(cellValue);
            }
            else {
                return "";
            }
        },

        /* 构建数量列 */
        constructQtyCell: function (key, cellValue) {
            var m_qty = Number(cellValue);
            if (m_qty > 0) {
                return m_qty;
            }
        },

        /* 返回时间字符 */
        getTimeStrCell: function (timevalue) {
            if (timevalue) {
                var date = new Date(timevalue);
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            }
            else {
                return "";
            }
        },

        /* */
        getNowTime: function () {
            var m_now = new Date();

            var m_month = (Number(m_now.getMonth()) + 1);
            var m_day = Number(m_now.getDate());

            return datastruct.convertion.convertToDateByStr(m_now.getFullYear() + "-" + (m_month > 9 ? m_month : "0" + m_month) + "-" + (m_day > 9 ? m_day : "0" + m_day));
        },

        /* 构建当地时间列 */
        constructLocalTimeCell: function (key, cellValue) {
            var m_time = datastruct.convertion.convertToDateStr(cellValue);
            if (!commoncore.timezone) {
                commoncore.timezone = (new Date().getTimezoneOffset() / 60 * -1) * 3600000;
            }

            return new Date(m_time + commoncore.timezone).toLocaleString();
        },
        /* 转换为当地时间 */
        convertToLocalTime: function (time) {

            if (!commoncore.timezone) {
                commoncore.timezone = (new Date().getTimezoneOffset() / 60 * -1) * 3600000;
            }

            return new Date(time.getTime() + commoncore.timezone).toLocaleString();
        },

        /* 构建区域显示 */
        constructGAreaTxt: function (objitem) {
            if (Number(objitem.tag.SonAreaCount) == 0) {
                return objitem.tag.GlobalAreaName;
            }
            else {
                return objitem.tag.GlobalAreaName + "(" + objitem.tag.SonAreaCount + ")";
            }
        },

        /* 构建备注列 */
        constructRemarkCell: function (key, cellValue) {
            return cellValue.replace(/\^/g, "\"").replace(/\n/g, "<br>");
        },

        /* 获取货币的Html */
        getCurrHtml: function (currSymbol, price) {
            if (currSymbol == "￥") {
                return "<span style='margin: 0px 1px 0px 0px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + datastruct.convertion.convertToMoney(price) + "</span>";
            }
            else {
                return "<span style='margin: 0px 3px 0px 3px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + datastruct.convertion.convertToMoney(price) + "</span>";
            }
        },

        /* 获取精确货币的Html */
        getExactCurrHtml: function (currSymbol, price) {
            var m_price = Number(price);
            var m_pricestr = "";
            if (m_price < 1 && m_price > 0) {
                m_pricestr = Number(price).toFixed(3);
            }
            else {
                m_pricestr = Number(price).toFixed(2);
            }

            if (currSymbol == "￥") {

                return "<span style='margin: 0px 1px 0px 0px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + m_pricestr + "</span>";
            }
            else {
                return "<span style='margin: 0px 3px 0px 3px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + m_pricestr + "</span>";
            }
        },

        /* 获取精确货币的Html */
        getFullExactCurrHtml: function (currSymbol, price) {
            var m_price = Number(price).toFixed(3);

            if (currSymbol == "￥") {

                return "<span style='margin: 0px 1px 0px 0px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + m_price + "</span>";
            }
            else {
                return "<span style='margin: 0px 3px 0px 3px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + m_price + "</span>";
            }
        },

        /* 图片居中定位 */
        positionCenterImg: function (containerHeight, containerWidth) {
            var m_height = $(this)[0].offsetHeight;

            if (!containerHeight || Number(containerHeight) == 0) {
                containerHeight = 80;
            }
            var m_top = (containerHeight - m_height) / 2;
            if (Number(m_top) > -1 && m_height > 0) {
                $(this).css("margin", m_top + "px 0px 0px 0px");
            }
            else {
                $(this).css("margin", "0px");
            }
        },

        /* 图片加载失败 */
        failLoadImg: function () {
            var m_this = $(this);
            $(this).attr("src", window.webLocation + "BZM/Css/Images/nopic.png");
        },

        /* 展示完整名称 */
        showFullNameByTooltip: function () {
            return $(this).attr("tag");
        },

        /* 显示特殊字符 */
        showSpecialChar: function (str) {
            return str.replaceAll("%", "\"").replaceAll("@", "'");
        },

        /* 转换特殊字符 */
        convertSpecialChar: function (str) {
            return str.replaceAll("\"", "%").replaceAll("'", "@");
        },

        /* 计算快递运费 */
        calculateExpPrice: function (prodweight, fromweight, increaseweight, maxweight, fromprice, increaseprice) {
            if (prodweight > maxweight || prodweight == maxweight) {
                return -1;
            }

            if (prodweight < fromweight || prodweight == fromweight || increaseweight == 0) {
                return fromprice;
            }

            var m_overweight = prodweight - fromweight;
            var m_expprice = fromprice;

            var m_func = function () {
                if (m_overweight < increaseweight || m_overweight == increaseweight) {
                    m_expprice = m_expprice + increaseprice;
                    return;
                }

                m_overweight = m_overweight - increaseweight;
                m_expprice = m_expprice + increaseprice;

                m_func();
            };

            m_func();

            return m_expprice;
        },

        /* 获取显示的快递地址 */
        getRvAddressForView: function (obj) {
            var m_str = "";

            var m_addressStrs = [];

            if (obj.GlobalAreaName) {

                if (obj.GlobalAreaName == "中国") {

                    m_addressStrs.push(obj.RvFullName + ",");

                    if (obj.RvProvince) {
                        m_addressStrs.push(obj.RvProvince);
                    }

                    if (obj.RvCity) {
                        m_addressStrs.push(obj.RvCity);
                    }

                    var m_rvaddress = "";
                    if (obj.RvAddress_1) {
                        m_rvaddress = obj.RvAddress_1;
                    }
                    if (obj.RvAddress_2) {
                        m_rvaddress = m_rvaddress + " " + obj.RvAddress_2;
                    }
                    if (obj.RvPostCode) {
                        m_rvaddress = m_rvaddress + "(" + obj.RvPostCode + ")";
                    }
                    m_addressStrs.push(m_rvaddress);

                    m_str = m_addressStrs.join(" ");
                }
                else {

                    m_addressStrs.push(obj.RvFullName);

                    var m_rvaddress = "";
                    if (obj.RvAddress_1) {
                        m_rvaddress = obj.RvAddress_1;
                    }
                    if (obj.RvAddress_2) {
                        m_rvaddress = m_rvaddress + " " + obj.RvAddress_2;
                    }
                    m_addressStrs.push(m_rvaddress);

                    if (obj.RvCity) {
                        m_addressStrs.push(obj.RvCity);
                    }

                    var m_rvpp = "";
                    if (obj.RvProvince) {
                        m_rvpp = obj.RvProvince;
                    }
                    if (obj.RvPostCode) {
                        m_rvpp = m_rvpp + " " + obj.RvPostCode;
                    }

                    m_addressStrs.push(m_rvpp);

                    m_addressStrs.push(obj.GlobalAreaName);

                    m_str = m_addressStrs.join(",<br>");
                }
            }

            return m_str;
        },

        /* 获取URL参数 */
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
    };
    /*-------------------------------*/

    window.pageframe = {};
    /* 
    -----页面布局----- 
    */
    pageframe.layout = {

        /* 页面宽度 */
        width: 0,

        /* 页面头高度 */
        headHeight: 0,

        /* 主体内容高度 */
        contentHeight: 0,

        /* 业务菜单导航栏高度 */
        bizMenuHeight: 0,

        /* 重新布局事件列表 */
        resizeEventList: [],

        /* 设置页面布局 */
        setPageFrame: function () {

            var m_frame = $("#pageFrame");

            if (m_frame[0]) {
                var w_h;
                /* 兼容性处理 */
                if ($.browser.msie) {
                    w_h = document.documentElement.clientHeight;
                    /* 最小高度为600  */
                    if (document.documentElement.clientHeight < 600) {
                        w_h = 600;
                    }
                    w_h = w_h - 2;
                }
                else {
                    w_h = window.innerHeight;
                    /* 最小高度为600  */
                    if (window.innerHeight < 600) {
                        w_h = 600;
                    }
                    w_h = w_h - 3;
                }
                pageframe.layout.width = m_frame[0].offsetWidth;
                pageframe.layout.headHeight = $("#pageHeader")[0].offsetHeight;
                pageframe.layout.contentHeight = Number(w_h - pageframe.layout.headHeight - $("#pageFooter")[0].offsetHeight);
                $("#pageContent").css("height", pageframe.layout.contentHeight + "px");
            }
        },

        /* 获取页面中数据表的高度 */
        getTableHeightInForm: function () {
            return pageframe.layout.contentHeight - pageframe.layout.bizMenuHeight - 137;
        },

        /* 获取页面中内容的高度 */
        getContentHeight: function () {
            return pageframe.layout.contentHeight - pageframe.layout.bizMenuHeight - 77;
        }
    };
    /*-------------------------------*/

    /* 
    -----页面公用控件----- 
    */
    pageframe.control = {

        /* 信息提示 */
        alertDialog: {

            ctrl: null,

            textCtrl: null,

            /* 弹出提示窗体 */
            showAlertInfo: function (alertInfo) {

                if (!pageframe.control.alertDialog.ctrl) {
                    pageframe.control.alertDialog.ctrl = new uicontrol.dialog("alertDialog", mlm.C0014, { width: 600, height: 100 });
                    pageframe.control.alertDialog.textCtrl = $("#alertInfo");
                }

                pageframe.control.alertDialog.textCtrl.text(alertInfo);

                pageframe.control.alertDialog.ctrl.show();
            }
        },

        /* 询问提示 */
        askDialog: {
            ctrl: null,

            textCtrl: null,

            /* 弹出提示窗体 */
            showAlertInfo: function (alertInfo, confirmFunc) {

                if (!pageframe.control.askDialog.ctrl) {
                    pageframe.control.askDialog.ctrl = new uicontrol.dialog("askDialog", mlm.C0014, { width: 600, height: 300 }, function () {
                        confirmFunc();

                        pageframe.control.askDialog.ctrl.close();
                    });
                    pageframe.control.askDialog.textCtrl = $("#askInfo");
                }

                pageframe.control.askDialog.textCtrl.text(alertInfo);

                pageframe.control.askDialog.ctrl.show();
            }
        },

        /* 业务菜单导航栏 */
        bizMenuCtrl: {

            ctrl: null,

            /* 初始化菜单导航 */
            init: function () {
                var m_user = userpopedom["user_" + m_usertoken];

                pageframe.control.bizMenuCtrl.ctrl = $("#bizMenuBar");
                pageframe.layout.bizMenuHeight = pageframe.control.bizMenuCtrl.ctrl[0].offsetHeight;
                var m_menucontainer = $("#menuContainer");

                var m_ulmenuCtrl = $("<ul id='bizMenus'></ul>");
                $.each(m_user.menuPopedoms, function () {

                    var m_menuvalue = "";
                    if (this.href) {
                        m_menuvalue = "<a href='" + this.href + "'>" + this.value + "</a>";
                    }
                    else {
                        m_menuvalue = this.value;
                    }

                    var m_limenuId = "menu_" + this.menukey;
                    var m_limenuTag = m_limenuId + "List";
                    var m_limenuCtrl = $("<li id='" + m_limenuId + "' tag='" + m_limenuTag + "'>" + m_menuvalue + "</li>");
                    m_limenuCtrl.hover(pageframe.control.bizMenuCtrl.showMenus, pageframe.control.bizMenuCtrl.hideMenus);

                    m_ulmenuCtrl.append(m_limenuCtrl);
                    m_ulmenuCtrl.append("<li>|</li>");

                    pageframe.control.bizMenuCtrl.list[m_limenuId] = { ctrl: m_limenuCtrl };

                    if (this.sonMenus.length > 0) {

                        var m_sonContainer = $("<div id='" + m_limenuTag + "' class='sonBizMenus'></div>");
                        var m_sonul = $("<ul></ul>");

                        pageframe.control.bizMenuCtrl.list[m_limenuId].child = {};

                        /* 子菜单 */
                        $.each(this.sonMenus, function () {

                            var m_slimenuId = "menu_" + this.menukey;

                            var m_slimenuCtrl = $("<li id='" + m_slimenuId + "' href='" + this.href + "'>" + this.value + "</li>");
                            m_slimenuCtrl.hover(pageframe.control.bizMenuCtrl.addSonMenuStyle, pageframe.control.bizMenuCtrl.removeSonMenuStyle);

                            var m_href = this.href;
                            m_slimenuCtrl.click(function () {
                                if (m_href) {
                                    window.location = "/" + m_href;
                                }
                            });

                            m_sonul.append(m_slimenuCtrl);
                            pageframe.control.bizMenuCtrl.list[m_limenuId].child[m_slimenuId] = m_slimenuCtrl;
                        });

                        m_sonContainer.append(m_sonul);
                        m_menucontainer.append(m_sonContainer);

                        m_sonContainer.hover(function () { pageframe.control.bizMenuCtrl.showMenus.call(pageframe.control.bizMenuCtrl.list[m_limenuId].ctrl); },
                                function () { pageframe.control.bizMenuCtrl.hideMenus.call(pageframe.control.bizMenuCtrl.list[m_limenuId].ctrl); });
                    }
                });

                m_menucontainer.append(m_ulmenuCtrl);
            },

            /* 菜单列表 */
            list: {},

            /* 展示子菜单 */
            showMenus: function () {
                var thisObj = $(this);

                thisObj.css("background-color", "#0D95D7");
                thisObj.css("color", "#FFFFFF");

                var menuListId = thisObj.attr("tag");
                if (menuListId) {
                    var menuListCtrl = $("#" + menuListId);
                    menuListCtrl.css("display", "block");
                    menuListCtrl.css("top", pageframe.layout.headHeight + pageframe.layout.bizMenuHeight);

                    var m_left = thisObj[0].offsetLeft - 1;
                    if ($.browser.msie && $.browser.version == "7.0") {
                        m_left = m_left + $("#sysSymbol")[0].offsetWidth + 22;
                    }
                    menuListCtrl.css("left", m_left);
                }
            },

            /* 隐藏子菜单 */
            hideMenus: function () {
                var thisObj = $(this);
                thisObj.css("background-color", "");
                thisObj.css("color", "#E3E3E3");

                var menuListId = thisObj.attr("tag");
                if (menuListId) {
                    var menuListCtrl = $("#" + menuListId);
                    menuListCtrl.css("display", "none");
                }
            },

            /* 添加子菜单样式 */
            addSonMenuStyle: function () {
                var thisObj = $(this);
                thisObj.css("background-color", "#EFEFEF");
            },
            /* 隐藏子菜单样式 */
            removeSonMenuStyle: function () {
                var thisObj = $(this);
                thisObj.css("background-color", "");
            }
        },

        /* 按钮容器 */
        multiButtion: {
            init: function (btCtrl_id, btContainer_id) {

                var m_btCtrl = $("#" + btCtrl_id);

                var m_btContainerCtrl = $("#" + btContainer_id);
                m_btContainerCtrl.hover(function () {
                    pageVariable.showBtContainer = 1;
                }, function () {
                    pageVariable.showBtContainer = null;
                    m_btContainerCtrl.hide();
                    commoncore.func.removeBtStyle_a.call(m_btCtrl);
                });

                var m_lis = m_btContainerCtrl.find("li");
                m_lis.hover(function () { $(this).addClass("hover"); }, function () { $(this).removeClass("hover"); });
                m_lis.click(function () {
                    m_btContainerCtrl.hide();
                    commoncore.func.removeBtStyle_a.call(m_btCtrl);
                });

                m_btCtrl.hover(function () {
                    pageVariable.showBtContainer = null;
                    m_btContainerCtrl.show();

                    m_btContainerCtrl.css("min-width", m_btCtrl[0].offsetWidth);
                    m_btContainerCtrl.css("top", m_btCtrl.offset().top + m_btCtrl[0].offsetHeight);
                    m_btContainerCtrl.css("left", m_btCtrl.offset().left);
                    commoncore.func.addBtStyle_a.call(m_btCtrl);

                }, function () {
                    setTimeout(function () {
                        if (pageVariable.showBtContainer && pageVariable.showBtContainer == 1) {
                            m_btContainerCtrl.show();
                        }
                        else {
                            m_btContainerCtrl.hide();
                            commoncore.func.removeBtStyle_a.call(m_btCtrl);
                        }
                    }, 100);

                });
            }
        },

        /* 进度条 */
        processCtrl: {

            /* 展示进度 */
            showProcess: function () {

                $("#processBg").show();

                var processBar = $("#processBar");
                processBar.show();

                if (pageframe.layout.contentHeight == 0) {
                    var w_h;
                    var w_l;
                    /* 兼容性处理 */
                    if ($.browser.msie) {
                        w_h = document.documentElement.clientHeight;
                        /* 最小高度为600  */
                        if (document.documentElement.clientHeight < 600) {
                            w_h = 600;
                        }
                        w_h = w_h - 2;
                        w_l = document.documentElement.clientWidth;
                    }
                    else {
                        w_h = window.innerHeight;
                        w_l = window.innerWidth;
                        /* 最小高度为600  */
                        if (window.innerHeight < 600) {
                            w_h = 600;
                        }
                        w_h = w_h - 3;
                    }

                    processBar.css("top", w_h / 2 + "px");
                    processBar.css("left", (w_l - processBar[0].offsetWidth) / 2 + "px");
                }
                else {
                    processBar.css("top", pageframe.layout.contentHeight / 2 + "px");
                    processBar.css("left", (pageframe.layout.width - processBar[0].offsetWidth) / 2 + "px");
                }
            },

            /* 隐藏进度 */
            hideProcess: function () {
                $("#processBg").hide();
                $("#processBar").hide();
            },

            /* 展示进度 */
            showOperaProcess: function () {

                $("#processBg_opera").show();

                var processBar = $("#processBar_opera");
                processBar.show();

                if (pageframe.layout.contentHeight == 0) {
                    var w_h;
                    var w_l;
                    /* 兼容性处理 */
                    if ($.browser.msie) {
                        w_h = document.documentElement.clientHeight;
                        /* 最小高度为600  */
                        if (document.documentElement.clientHeight < 600) {
                            w_h = 600;
                        }
                        w_h = w_h - 2;
                        w_l = document.documentElement.clientWidth;
                    }
                    else {
                        w_h = window.innerHeight;
                        w_l = window.innerWidth;
                        /* 最小高度为600  */
                        if (window.innerHeight < 600) {
                            w_h = 600;
                        }
                        w_h = w_h - 3;
                    }

                    processBar.css("top", w_h / 2 + "px");
                    processBar.css("left", (w_l - processBar[0].offsetWidth) / 2 + "px");
                }
                else {
                    processBar.css("top", pageframe.layout.contentHeight / 2 + "px");
                    processBar.css("left", (pageframe.layout.width - processBar[0].offsetWidth) / 2 + "px");
                }
            },

            /* 隐藏进度 */
            hideOperaProcess: function () {
                $("#processBg_opera").hide();
                $("#processBar_opera").hide();
            }
        },

        /* 内容区域 */
        content: {

            /* 内容标签列表 */
            tagList: [],

            /* 切换内容标签 */
            switchTag: function () {

                var m_thisCtrlId = $(this).attr("tag");
                $.each(pageframe.control.content.tagList, function () {

                    var thisCtrl = $(this);

                    var m_contentCtrlId = thisCtrl.attr("tag");
                    var m_ctrl = $("#" + m_contentCtrlId);
                    if (m_thisCtrlId == m_contentCtrlId) {
                        thisCtrl.addClass("selected");
                        m_ctrl.show();
                    }
                    else {
                        thisCtrl.removeClass("selected");
                        m_ctrl.hide();
                    }
                });
            }
        }
    }
    /*-------------------------------*/
})(window);

/* 多语言初始化 */
mlm.init();

/* 加载多语言Css以及Javascript */
var file = cssdir + "ui-core-" + mlm.currLanguage.code + ".css";
document.write("<link type='text/css' rel='Stylesheet' href='" + file + "' />");
document.write("<script type='text/javascript' src='" + jsdir + "common_res_" + mlm.currLanguage.code + "-1.0.min.js" + "'></script>");

//获取用户指令
if (window.location.pathname.toLowerCase() != "/bzm/login.htm") {
    var m_usertoken = runtime.clientRunSetting.getRunningContext("usertoken");
    if (m_usertoken) {
        document.write("<script type='text/javascript' src='/BZM/Scripts/UserPopedom/" + m_usertoken + ".js'></script>");
    }
    else {
        window.location = "/bzm/login.htm";
    }
}

/* 页面初始化事件 */
$(window).ready(function () {

    /* 初始化Ajax请求 */
    webhandler.ajaxHandler.init("/bzm/BizAjaxHandler.ashx",
                                pageframe.control.processCtrl.showProcess,
                                commoncore.func.dealError,
                                pageframe.control.processCtrl.hideProcess);

    var m_pageframe = $("#pageFrame");

    if (m_pageframe.length == 1) {
        $("#pageWaittingArea").hide();
        $("#pageFrame").show();

        pageframe.layout.setPageFrame();
        pageframe.layout.resizeEventList.push(pageframe.layout.setPageFrame);

        if (m_usertoken) {
            var m_userinfoCtrl = $("#userInfo");
            m_userinfoCtrl.text(userpopedom["user_" + m_usertoken].FullName);
            m_userinfoCtrl.click(openMyInfoFrm);

            $("#btSendPwd, #btModifyPwd").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            $("#btModifyPwd").click(openModifyPwdFrm);
            $("#signOut").click(signOut);

            /* 初始化导航 */
            pageframe.control.bizMenuCtrl.init();

            /* 绑定内容标签切换事件 */
            var m_pageTag = $("#pageTitleTag");
            if (m_pageTag.length > 0) {
                pageframe.control.content.tagList = m_pageTag.find("li");
                $.each(pageframe.control.content.tagList, function () {
                    $(this).click(pageframe.control.content.switchTag);
                });
            }

            /* 验证用户 */
            security.authoriseUser();
        }

        $("#userInfo, #signOut, #language").hover(commoncore.func.addFontStyle_b, commoncore.func.removeFontStyle_b);

        var m_lanCtrl = $("#language");
        var languageCtrl = $("#ddlLanguage");

        m_lanCtrl.text(mlm.currLanguage.name);
        m_lanCtrl.click(function () {
            if (!pageVariable.switchLanguageFrm) {
                pageVariable.switchLanguageFrm = new uicontrol.dialog("switchLanguageFrm", mlm.C0619, { width: 800 }, function () {
                    mlm.setLanguageRes(languageCtrl.find("option:selected").text() + "!" + languageCtrl.val());
                });

                /* 获取多语言 */
                mlm.getLanguages(function () {
                    $.each(mlm.languages, function () {
                        languageCtrl.append("<option value='" + this.LRCode + "'>" + this.LRName + "</option>");
                    });

                    languageCtrl.val(mlm.currLanguage.code);
                });
            }

            pageVariable.switchLanguageFrm.show();
        });
    }

    /* 环境初始化 */
    keycontext.init();

    initPage();

    fillLanRes();
});
/* 初始化界面(虚方法，每个页面需要重写) */
function initPage() { };

/* 窗体大小改变事件 */
$(window).resize(function () {
    for (var eventItem in pageframe.layout.resizeEventList) {
        pageframe.layout.resizeEventList[eventItem]();
    }
});

/* 填充语言资源 */
function fillLanRes(data, textStates) {
    /* 注销 */
    $("#signOut").text(mlm.C0004);
    /* 用户名 */
    $("#lbUserName_my").text(mlm.C0309 + ":");
    /* 邮箱 */
    $("#lbEmail_my").text(mlm.C0310 + ":");
    /* 联系电话 */
    $("#lbTel_my").text(mlm.C0311 + ":");
    /* 其他联系方式 */
    $("#lbContactInfo_my").text(mlm.C0312 + ":");
    /* 密码 */
    $("#lbPwd_my").text(mlm.C0325 + ":");
    /* 旧密码 */
    $("#lbOldPwdSymbol").text(mlm.C0326 + ":");
    /* 新密码 */
    $("#lbNewPwdSymbol").text(mlm.C0327 + ":");
    /* 确认密码 */
    $("#lbConfirmPwdSymbol").text(mlm.C0328 + ":");
    /* 发送密码到邮箱 */
    $("#btSendPwd").val(mlm.C0329);
    /* 设置新密码 */
    $("#btModifyPwd").val(mlm.C0330);

    /* 请先创建销售平台！ */
    $("#lbCheckSSSymbol").text(mlm.C0357);

    /* 必填 */
    $("#lbGlobalSymbol_1, #lbGlobalSymbol_2, #lbGlobalSymbol_3").text(mlm.C0049);
    /* 选择语言 */
    $("#lbLanguage").text(mlm.C0007);

    fillPageLanRes();

    /* 执行绑定事件 */
    $.each(mlm.bindLanguageEvent, function () {
        this();
    });

    data = null;
}
/* 填充语言资源(虚方法，每个页面需要重写) */
function fillPageLanRes() { }

/* 查看个人信息 */
function openMyInfoFrm() {
    if (!pageVariable.myInfoFrm) {
        pageVariable.myInfoFrm = new uicontrol.dialog("myInfoFrm", mlm.C0319, { width: 800, position: ["auto", 60] }, null);
    }

    $("#viewUserName").text(userpopedom["user_" + m_usertoken].FullName);
    $("#viewEmail").text(userpopedom["user_" + m_usertoken].Email);
    $("#viewTel").text(userpopedom["user_" + m_usertoken].Tel);
    $("#viewContact").html(userpopedom["user_" + m_usertoken].ContactInfo);

    pageVariable.myInfoFrm.show();
}

/* 打开修改密码的窗体 */
function openModifyPwdFrm() {
    if (!pageVariable.handlerPwdFrm) {
        pageVariable.handlerPwdFrm = new uicontrol.dialog("handlerPwdFrm", mlm.C0320, { width: 800, position: ["auto", 60] }, savePwd);
    }

    $("#txtOldPwd").val("");
    $("#txtNewPwd").val("");
    $("#txtConfirmPwd").val("");

    pageVariable.handlerPwdFrm.show();
}

/* 设置新密码 */
function savePwd() {

    var m_oldPwd = $.trim($("#txtOldPwd").val());
    if (!m_oldPwd) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0321);
        return;
    }

    var m_newPwd = $.trim($("#txtNewPwd").val());
    if (!m_newPwd) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0322);
        return;
    }

    var m_confirmPwd = $.trim($("#txtConfirmPwd").val());
    if (m_newPwd != m_confirmPwd) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0323);
        return;
    }

    var handlerObj = new webhandler.webTransferObj("ModifyPwd", { OldPwd: m_oldPwd, NewPwd: m_newPwd });
    var context = new webhandler.bizExeContext(function (retObj) {

        pageVariable.handlerPwdFrm.close();

        pageframe.control.alertDialog.showAlertInfo(mlm.C0324);
    }, null);
    webhandler.ajaxHandler.bizRequest(handlerObj, context);
}

/* 注销用户 */
function signOut() {
    runtime.clientRunSetting.clearRunningContext();
    window.location = "/bzm/login.htm";
}