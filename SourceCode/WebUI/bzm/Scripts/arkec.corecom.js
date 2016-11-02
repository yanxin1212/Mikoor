/*
* arkec.corecom.datastruct v1.0.0
*/
(function (window) {

    window.datastruct = {};

    /* 
    -----数据字典(key/value)结构----- 
    */
    datastruct.dictionary = function () {
        var obj = new datastruct.dictionary.fn.init();
        return obj;
    };
    datastruct.dictionary.fn = {

        /* 构造函数 */
        init: function () {

            /* 对象属性 */
            this.count = 0;
            this.arrKeys = new Array();
            this.arrValues = new Array();
            /*-------------------------------*/
        },

        /* 添加或修改元素 */
        setItem: function (key, value) {

            if (!this.containKey(key)) {
                this.arrKeys[this.count] = key;
                this.arrValues[this.count] = value;
                this.count++;
            }
            else {
                var index = this._getElementIndex(key);
                if (index > -1) {
                    this.arrKeys[index] = key;
                    this.arrValues[index] = value;
                }
            }
        },

        /* 删除元素 */
        removeItem: function (key) {
            var index = this._getElementIndex(key);

            if (index > -1) {
                this.arrKeys.splice(index, 1);
                this.arrValues.splice(index, 1);
                this.count--;
            }
        },

        /* 获取元素 */
        getItem: function (key) {
            var kvalue = null;

            var index = this._getElementIndex(key);
            if (index > -1) {
                kvalue = this.arrValues[index];
            }

            return kvalue;
        },

        /* 获取元素键值对 */
        getKeyValueItem: function (index) {
            var keyvalueItem = {};
            if (index > -1) {
                keyvalueItem.key = this.arrKeys[index];
                keyvalueItem.value = this.arrValues[index];
            }

            return keyvalueItem;
        },

        /* 清理所有元素 */
        clear: function () {
            if (this.count != 0) {
                this.arrKeys.splice(0, this.count);
                this.arrValues.splice(0, this.count);
                this.count = 0;
            }
        },

        /* 检测是否包含key */
        containKey: function (key) {
            var isContain = false;

            if (this._getElementIndex(key) > -1) {
                isContain = true;
            }

            return isContain;
        },

        /* 获取元素索引序号 */
        _getElementIndex: function (key) {
            var index = -1;

            var i;
            for (i = 0; i < this.arrKeys.length; i++) {
                if (this.arrKeys[i] == key) {
                    index = i;
                    break;
                }
            }

            return index;
        }
    };
    datastruct.dictionary.fn.init.prototype = datastruct.dictionary.fn;
    /*-------------------------------*/

    /* 
    -----数据结构转换类----- 
    */
    datastruct.convertion = {

        /* string转化为object */
        strToObject: function (str) {
            var jsonObj;

            if (typeof (str) == "string") {
                /* json的字符串数据 */
                if (str.indexOf("{") > -1 || str.indexOf("[") > -1) {
                    str = str.replace(/\r\n/gi, "");

                    try {
                        eval("jsonObj = " + str + ";");

                        /* 数据字典 */
                        if (jsonObj.struct && jsonObj.struct == "dictionary") {
                            var dict = new datastruct.dictionary();
                            for (var i = 0; i < jsonObj.items.length; i++) {
                                var itemObj = jsonObj.items[i];
                                dict.setItem(itemObj.key, itemObj.value);
                            }

                            jsonObj = dict;
                        }
                    }
                    catch (e) {
                        jsonObj = str;
                    }
                }
                else {
                    jsonObj = str;
                }
            }
            else {
                jsonObj = str;
            }

            return jsonObj;
        },

        /* 用js对象来填充业务对象 */
        fillToBizObj: function (obj, bizObj) {
            for (var prop in bizObj) {
                if (obj[prop]) {
                    bizObj[prop] = obj[prop];
                }
            }
        },

        /* 用js对象来填充业务对象 */
        fillToObj: function (obj, bizObj) {
            for (var prop in bizObj) {
                bizObj[prop] = obj[prop];
            }
        },

        /* object转化为string */
        objectToStr: function (obj) {
            var retStr = "";
            var ret = [];

            //不支持函数类型
            if (typeof (obj) == "function") {
                return;
            }

            //数组转换
            if (obj instanceof Array) {
                var len = obj.length;
                for (var i = 0; i < len; i++) {
                    if (obj[i]) {
                        ret.push(datastruct.convertion.objectToStr(obj[i]));
                    }
                }

                retStr = "[" + ret.join(",") + "]";
            }
            //数据字典dictionary转换
            else if (obj instanceof datastruct.dictionary.fn.init) {
                for (var i = 0; i < obj.count; i++) {

                    var keyvalueItem = obj.getKeyValueItem(i);

                    ret.push("{ key: '" + keyvalueItem.key + "', value: " + datastruct.convertion.objectToStr(keyvalueItem.value) + " }");
                }

                retStr = "{ struct: 'dictionary', items: [" + ret.join(",") + "] }";
            }
            //值类型转换
            else if (typeof (obj) != "object") {
                if (typeof (obj) == "string" && obj.indexOf("'") > -1) {
                    retStr = "\"" + obj + "\"";
                }
                else {
                    retStr = "'" + obj + "'";
                }
            }
            //对象转换
            else {
                for (var item in obj) {
                    var m_value = obj[item];
                    if (typeof (m_value) == "string" || m_value) {
                        m_value = datastruct.convertion.objectToStr(m_value);
                        if (m_value) {
                            ret.push(item + ":" + m_value);
                        }
                    }
                }
                retStr = "{" + ret.join(",") + "}";
            }

            return retStr;
        },

        /* string转化为html */
        strToHtml: function (str) {
            str = str.replace(/\n/g, "<br/>");
            str = str.replace(/\r/g, "");
            str = str.replace(/\s/g, "&nbsp;");

            return str;
        },

        /* html转化为string */
        htmlToStr: function (html) {
            html = html.replace(/\<br\/\>/g, "\n");
            html = html.replace(/&nbsp;/g, " ");

            return html;
        },

        /* 数据表转换为json */
        tableToJson: function (tableSource) {

            var m_dataSource = [];

            if (tableSource) {
                $.each(tableSource.Rows, function () {

                    var rowItem = this;
                    var m_keyvalue;
                    var itemObj = {};

                    var m_idx = 0;
                    $.each(tableSource.TableColumns, function () {

                        itemObj[this] = rowItem[m_idx];
                        m_idx++;
                    });

                    m_dataSource.push(itemObj);
                });
            }

            return m_dataSource;
        },

        /* json转化为数据表 */
        jsonToTable: function (jsonObjs) {

            var m_table = { TotalCount: 0, TableColumns: [], Rows: [] };

            if (jsonObjs.length > 0) {
                for (var p in jsonObjs[0]) {
                    m_table.TableColumns.push(p);
                }

                $.each(jsonObjs, function () {
                    m_table.TotalCount++;

                    var m_row = [];
                    $.each(this, function () {
                        m_row.push(this);
                    });

                    m_table.Rows.push(m_row);
                });
            }

            return m_table;
        },

        /* 货币类型转换 */
        convertToMoney: function (money) {

            if (!money) {
                money = "0";
            }
            money = money.toString();

            var m_prex = "";
            if (money.indexOf("-") == 0) {
                m_prex = "-";
                money = money.replace("-", "");
            }

            money = money.replace(/^(\d*)$/, "$1.");
            money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
            money = money.replace(".", ",");
            var re = /(\d)(\d{3},)/;
            while (re.test(money)) {
                money = money.replace(re, "$1,$2");
            }
            money = money.replace(/,(\d\d)$/, ".$1");
            return '' + m_prex + money.replace(/^\./, "0.");
        },

        /* 日期转换 */
        convertToDateStr: function (timeValue) {
            var m_date = new Date(Date.parse(timeValue));
            return m_date.getFullYear() + "-" + (Number(m_date.getMonth()) + 1) + "-" + m_date.getDate();
        }
    };
    /*-------------------------------*/

    /* 
    -----数据算法类----- 
    */
    datastruct.algorithm = {

        /* 移除数组元素 */
        removeArrayItem: function (arrList, keyProp, key) {
            var m_arr = [];

            $.each(arrList, function () {
                if (this[keyProp] != key) {
                    m_arr.push(this);
                }
            });

            return m_arr;
        }
    };
    /*-------------------------------*/

    /* 
    -----字符类扩展----- 
    */
    String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
        if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
            return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
        } else {
            return this.replace(reallyDo, replaceWith);
        }
    };

    String.prototype.getBytesCount = function () {
        var bytesCount = 0;
        if (this != null) {
            for (var i = 0; i < this.length; i++) {
                var c = this.charAt(i);
                if (/^[\u0000-\u00ff]$/.test(c)) {
                    bytesCount += 1;
                }
                else {
                    bytesCount += 2;
                }
            }
        }
        return bytesCount;
    };

    String.prototype.substringByBytes = function (subByteCount) {

        var m_str = this;
        if (this != null) {
            var bytesCount = 0;
            var m_subLen = 0;

            for (var i = 0; i < this.length; i++) {

                var c = this.charAt(i);
                if (/^[\u0000-\u00ff]$/.test(c)) {
                    bytesCount += 1;
                }
                else {
                    bytesCount += 2;
                }

                if (bytesCount > subByteCount) {
                    m_subLen = i;
                    break;
                }
            }

            m_str = this.substring(0, m_subLen);
        }
        return m_str;
    };

    String.prototype.lengthByBytes = function () {
    
        var bytesCount = 0;

        if (this != null) {
            for (var i = 0; i < this.length; i++) {

                var c = this.charAt(i);
                if (/^[\u0000-\u00ff]$/.test(c)) {
                    bytesCount += 1;
                }
                else {
                    bytesCount += 2;
                }
            }
        }

        return bytesCount;
    };
    /*-------------------------------*/

})(window);


(function (window) {

    window.cachestore = {};

    /* 
    -----缓存处理辅助类----- 
    */
    cachestore.clientCacheHelper = {

        /* 缓存存储结构 */
        _cacheStorage: new window.datastruct.dictionary(),

        /* 添加或修改缓存元素 */
        setItem: function (cacheName, cacheStruct, param) {
            if (cacheStruct == cachestore.cacheStructEnum.value) {
                this._cacheStorage.setItem(cacheName, param);
            }
            else {
                var valueDict;
                if (!this._cacheStorage.containKey(cacheName)) {
                    valueDict = new window.datastruct.dictionary();
                    this._cacheStorage.setItem(cacheName, valueDict);
                }
                else {
                    valueDict = this._cacheStorage.getItem(cacheName);
                }

                valueDict.setItem(param.key, param.value);
            }
        },

        /* 删除缓存数据类 */
        removeCache: function (cacheName) {
            this._cacheStorage.removeItem(cacheName);
        },

        /* 删除缓存数据条目（只支持数据字典结构） */
        removeCacheItem: function (cacheName, paramKey) {
            if (!this._cacheStorage.containKey(cacheName)) {
                return;
            }

            this._cacheStorage.getItem(cacheName).removeItem(paramKey);
        },

        /* 获取缓存元素 */
        getItem: function (cacheName, key) {
            if (!this._cacheStorage.containKey(cacheName)) {
                return;
            }

            var cacheObj = this._cacheStorage.getItem(cacheName);

            var itemValue = "";
            if (cacheObj instanceof window.datastruct.dictionary.fn.init) {
                itemValue = cacheObj.getItem(key);
            }
            else {
                itemValue = cacheObj;
            }

            return itemValue;
        },

        /* 获取元素从Cookie中 */
        getItemFromCookie: function (name) {
            if (!document.cookie) {
                return;
            }

            var valueObj;
            var arrCookies = document.cookie.split(";");
            for (var i = 0; i < arrCookies.length; i++) {

                var cookieItem = arrCookies[i];
                var arrObjs = cookieItem.split("=");

                /* 缓存对象名称在Cookie中存在 */
                if ($.trim(arrObjs[0]) == name) {
                    try{
                        valueObj = datastruct.convertion.strToObject(unescape(decodeURI(arrObjs[1].toString().replace(/\+/g, ' '))));
                    }
                    catch(error) {
                        valueObj = datastruct.convertion.strToObject(unescape(arrObjs[1].toString().replace(/\+/g, ' ')));
                    }
                }
            }
            return valueObj;
        },

        /* 从Cookie中移除元素 */
        removeItemInCookie: function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getItemFromCookie(name);
            if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        },

        /* 清除所有缓存 */
        clearCache: function () {
            this._cacheStorage.clear();
        },

        /* 读取缓存数据 */
        readCacheData: function (cacheName) {
            if (!document.cookie) {
                return;
            }

            var arrCookies = document.cookie.split(";");
            for (var i = 0; i < arrCookies.length; i++) {

                var cookieItem = arrCookies[i];
                var arrObjs = cookieItem.split("=");

                /* 缓存对象名称在Cookie中存在 */
                if ($.trim(arrObjs[0]) == cacheName) {

                    var valueObj = datastruct.convertion.strToObject(unescape(arrObjs[1]));

                    this._cacheStorage.setItem(cacheName, valueObj);

                    break;
                }
            }
        },

        /* 存储缓存数据 */
        saveToLocalStorage: function (cacheName, timelimit, date) {
            for (var i = 0; i < this._cacheStorage.count; i++) {
                var keyvalueItem = this._cacheStorage.getKeyValueItem(i);

                if (!cacheName || cacheName == keyvalueItem.key) {

                    var expireStr = "";
                    if (timelimit) {
                        if (!date) {
                            var exp = new Date();
                            exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
                            expireStr = "expires=" + exp.toGMTString();
                        }
                        else {
                            expireStr = "expires=" + date.toGMTString();
                        }
                    }

                    document.cookie = keyvalueItem.key + "=" + escape(datastruct.convertion.objectToStr(keyvalueItem.value)) + ";path=/;" + expireStr;
                }
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----缓存结构枚举----- 
    */
    cachestore.cacheStructEnum = {
        dictionary: 1,
        value: 2
    };
    /*-------------------------------*/

})(window);


(function (window) {

    window.runtime = {};

    /* 
    -----运行时设置参数----- 
    */
    window.runtime.clientRunSetting = {

        /* 存储用户设置的基本信息(长期性) */
        storeUserSetting: function (param, pvalue) {
            var obj = { key: param, value: pvalue };
            cachestore.clientCacheHelper.setItem("UserSetting", cachestore.cacheStructEnum.dictionary, obj);

            cachestore.clientCacheHelper.saveToLocalStorage("UserSetting", true);
        },
        getUserSetting: function (param) {
            var pvalue = cachestore.clientCacheHelper.getItem("UserSetting", param);
            if (!pvalue) {
                /* 从cookie中获取 */
                cachestore.clientCacheHelper.readCacheData("UserSetting");
            }
            pvalue = cachestore.clientCacheHelper.getItem("UserSetting", param);
            return pvalue;
        },

        /* 存储用户环境(登陆后产生) */
        storeRunningContext: function (param, pvalue) {
            var obj = { key: param, value: pvalue };
            cachestore.clientCacheHelper.setItem("RunningContext", cachestore.cacheStructEnum.dictionary, obj);

            cachestore.clientCacheHelper.saveToLocalStorage("RunningContext", false);
        },
        getRunningContext: function (param) {
            var pvalue = cachestore.clientCacheHelper.getItem("RunningContext", param);
            if (!pvalue) {
                /* 从cookie中获取 */
                cachestore.clientCacheHelper.readCacheData("RunningContext");
            }
            pvalue = cachestore.clientCacheHelper.getItem("RunningContext", param);
            return pvalue;
        },
        /* 清理用户环境(登陆后产生) */
        clearRunningContext: function () {
            cachestore.clientCacheHelper.saveToLocalStorage("RunningContext", true, new Date());
            cachestore.clientCacheHelper.removeCache("RunningContext");
        },

        /* 获取打开系统的初次时间 */
        getOpenTime: function () {
            var m_openTime = runtime.clientRunSetting.getRunningContext("clientOpenTime");
            if (!m_openTime) {
                var m_now = new Date();
                m_openTime = m_now.getTime();
                runtime.clientRunSetting.storeRunningContext("clientOpenTime", m_openTime);
            }

            return m_openTime;
        },

        /* 重新设定系统的初次时间 */
        reSetOpenTime: function () {
            cachestore.clientCacheHelper.removeCacheItem("RunningContext", "clientOpenTime");
            cachestore.clientCacheHelper.saveToLocalStorage("RunningContext", false);
        }
    }
    /*-------------------------------*/

})(window);


(function (window) {

    window.webhandler = {};

    /* 
    -----JavaScript和服务器的数据传输协议----- 
    */
    webhandler.webTransferObj = function (action, bizObj) {
        var obj = new webhandler.webTransferObj.fn.init(action, bizObj);
        return obj;
    };
    webhandler.webTransferObj.fn = {

        /* 构造函数 */
        init: function (action, bizObj) {
            this.Action = action;

            if (bizObj) {
                this.BizObj = datastruct.convertion.objectToStr(bizObj);
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----业务执行环境----- 
    */
    webhandler.bizExeContext = function (successEvent, errorEvent) {
        var obj = new webhandler.bizExeContext.fn.init(successEvent, errorEvent);
        return obj;
    };
    webhandler.bizExeContext.fn = {

        /* 构造函数 */
        init: function (successEvent, errorEvent) {
            this.successEvent = successEvent;
            this.errorEvent = errorEvent;
        }
    };
    /*-------------------------------*/

    /* 
    -----ajax请求处理类----- 
    */
    webhandler.ajaxHandler = {

        /* 统一请求的Web处理程序 */
        _handlerUrl: null,

        /* 发送请求前的事件 */
        _beforeSendEvent: null,

        /* 异常处理事件 */
        _errorEvent: null,

        /* 请求处理完成事件 */
        _completeEvent: null,

        /* 初始化请求事件 */
        init: function (handlerUrl, beforeSendEvent, errorEvent, completeEvent) {
            this._handlerUrl = handlerUrl;
            this._beforeSendEvent = beforeSendEvent;
            this._errorEvent = errorEvent;
            this._completeEvent = completeEvent;
        },

        /* 业务请求 */
        bizRequest: function (transferObj, bizExeContext) {

            var param = datastruct.convertion.objectToStr(transferObj);

            $.ajax({
                url: this._handlerUrl,
                type: "post",
                async: true,
                cache: false,
                data: { Param: param },
                beforeSend: this._beforeSendEvent,
                error: this._errorEvent,
                complete: this._completeEvent,
                success: function (data, textStates) {

                    var retObj = datastruct.convertion.strToObject(data);

                    /* 异常标志Error */
                    if (retObj.Error || (typeof(retObj) == "string" && retObj.indexOf("Error") > -1)) {

                        if (retObj.Message == "Log in expired") {
                            window.location = "/bzm/login.htm";
                            return;
                        }

                        if (bizExeContext.errorEvent) {
                            bizExeContext.errorEvent(retObj);
                        }
                        else {
                            if (webhandler.ajaxHandler._errorEvent) {
                                webhandler.ajaxHandler._errorEvent(retObj);
                            }
                        }
                    }
                    else {
                        if (bizExeContext.successEvent) {
                            bizExeContext.successEvent(retObj);
                        }
                    }

                    data = null;
                }
            });
        },

        /* 指定的业务请求 */
        specialBizRequest: function (handlerUrl, param, bizExeContext) {

            $.ajax({
                url: handlerUrl,
                type: "post",
                async: true,
                cache: false,
                data: { Param: param },
                beforeSend: this._beforeSendEvent,
                error: this._errorEvent,
                complete: this._completeEvent,
                success: function (data, textStates) {

                    var retObj = datastruct.convertion.strToObject(data);

                    /* 异常标志Error */
                    if (retObj.Error || (typeof(retObj) == "string" && retObj.indexOf("Error") > -1)) {
                        if (bizExeContext.errorEvent) {
                            bizExeContext.errorEvent(retObj);
                        }
                        else {
                            if (webhandler.ajaxHandler._errorEvent) {
                                webhandler.ajaxHandler._errorEvent(retObj);
                            }
                        }
                    }
                    else {
                        if (bizExeContext.successEvent) {
                            bizExeContext.successEvent(retObj);
                        }
                    }

                    data = null;
                }
            });
        },

        /* 加载缓存数据 */
        loadCacheData: function (transferObj, bizExeContext) {
            var param = datastruct.convertion.objectToStr(transferObj);

            $.ajax({
                url: this._handlerUrl + "?" + runtime.clientRunSetting.getOpenTime(),
                type: "get",
                async: true,
                cache: true,
                data: { Param: param },
                beforeSend: this._beforeSendEvent,
                error: this._errorEvent,
                complete: this._completeEvent,
                success: function (data, textStates) {

                    var retObj = "";
                    if(typeof(data) == "string"){
                        retObj = datastruct.convertion.strToObject(data);
                    }

                    /* 异常标志Error */
                    if (retObj.Error || (typeof(retObj) == "string" && retObj.indexOf("Error") > -1)) {
                        if (bizExeContext.errorEvent) {
                            bizExeContext.errorEvent(retObj);
                        }
                        else {
                            if (webhandler.ajaxHandler._errorEvent) {
                                webhandler.ajaxHandler._errorEvent(retObj);
                            }
                        }
                    }
                    else {
                        if (bizExeContext.successEvent) {
                            bizExeContext.successEvent(retObj);
                        }
                    }

                    data = null;
                }
            });
        },

        /* 动态加载Javascript脚本 */
        loadScript: function (jsfile, successEvent, errorEvent) {
            $.ajax({
                url: jsfile + "?" + runtime.clientRunSetting.getOpenTime(),
                dataType: "script",
                cache: true,
                success: successEvent,
                error: errorEvent
            });
        },

        /* 上传文件 */
        uploadFile: function (fileForm, iframe, bizExeContext) {

            /* 发送前事件 */
            if (this._beforeSendEvent) {
                this._beforeSendEvent();
            }

            var thisObj = this;
            iframe.everyTime("2s", function () {

                var transferObj = new webhandler.webTransferObj("GetSysResponse");
                var param = datastruct.convertion.objectToStr(transferObj);

                $.ajax({
                    url: thisObj._handlerUrl,
                    type: "post",
                    async: true,
                    cache: false,
                    data: { Param: param },
                    error: this._errorEvent,
                    success: function (data, textStates) {

                        if (data) {
                            var retObj = datastruct.convertion.strToObject(data);

                            /* 异常标志Error */
                            if (retObj.Error || (typeof(retObj) == "string" && retObj.indexOf("Error") > -1)) {

                                if (retObj.Message == "Log in expired") {
                                    window.location = "/bzm/login.htm";
                                    return;
                                }

                                if (bizExeContext.errorEvent) {
                                    bizExeContext.errorEvent(retObj);
                                }
                                else {
                                    if (webhandler.ajaxHandler._errorEvent) {
                                        webhandler.ajaxHandler._errorEvent(retObj);
                                    }
                                }
                            }
                            else {
                                if (bizExeContext.successEvent) {
                                    bizExeContext.successEvent(retObj);
                                }

                                iframe.stopTime();
                            }

                            if (thisObj._completeEvent) {
                                thisObj._completeEvent();
                            }
                        }

                        data = null;
                    }
                });
            });

            fileForm.submit();
        }
    }
    /*-------------------------------*/

})(window);


(function (window) {

    window.uicontrol = {};

    /* 
    -----通用控件函数----- 
    */
    uicontrol.func = {

        /* 检测input的数字（带小数）输入 */
        checkInputNumber: function (oEvent) {
            var e = oEvent || window.event;
            var key = e.keyCode || e.charCode;

            var ret = false;
            if (key == 46) {

                var s_value = "";
                /* 兼容性处理 */
                if ($.browser.msie) {
                    s_value = e.srcElement.value + ".00";
                }
                else {
                    s_value = e.currentTarget.value + ".00";
                }


                if (!isNaN(s_value)) {
                    ret = true;
                }
            }

            if ((key > 47 && key < 59) || key == 8 || key == 13 || ret) {

            }
            else {
                if (window.event)
                    window.event.returnValue = false;
                else {
                    e.preventDefault();
                }
            }
        },

        /* 检测input的数字输入 */
        checkInputInt: function (oEvent) {
            var e = oEvent || window.event;
            var key = e.keyCode || e.charCode;
            if ((key > 47 && key < 59) || key == 8 || key == 13) {

            }
            else {
                if (window.event)
                    window.event.returnValue = false;
                else {
                    e.preventDefault();
                }
            }
        },

        /* 检测input的输入 */
        checkInput: function (oEvent) {
            var e = oEvent || window.event;
            var key = e.keyCode || e.charCode;

            if (key == 39 || key == 34) {
                if (window.event)
                    window.event.returnValue = false;
                else {
                    e.preventDefault();
                }
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----对话框控件----- 
    */
    uicontrol.dialog = function (ctrl, title, layout, submitFunc, singleBt) {
        var obj = new uicontrol.dialog.fn.init(ctrl, title, layout, submitFunc, singleBt);
        return obj;
    };
    uicontrol.dialog.fn = {
        /* 初始化函数 */
        init: function (ctrl, title, layout, submitFunc, singleBt) {

            var m_buttons = {};

            if (singleBt) {
                m_buttons[mlm.C0024] = submitFunc;
            }
            else {
                if (submitFunc) {
                    m_buttons[mlm.C0024] = submitFunc;
                    m_buttons[mlm.C0023] = function () { m_ctrl.dialog("close"); };
                }
            }

            var m_position = ["auto", 100];
            if (layout.position) {
                m_position = layout.position;
            }

            var m_ctrl = null;
            if (typeof (ctrl) == "string") {

                this.titleCtrlId = ctrl + "_dltitle";
                var m_title = "<span id='" + this.titleCtrlId + "'>" + title + "</span>";

                m_ctrl = $("#" + ctrl).dialog({
                    resizable: false,
                    height: layout.height,
                    width: layout.width,
                    title: m_title,
                    modal: true,
                    autoOpen: false,
                    closeOnEscape: false,
                    position: m_position,
                    buttons: m_buttons
                });
            }
            else {
                this.titleCtrlId = $(ctrl).attr("id") + "_dltitle";
                var m_title = "<span id='" + this.titleCtrlId + "'>" + title + "</span>";

                m_ctrl = ctrl.dialog({
                    resizable: false,
                    height: layout.height,
                    width: layout.width,
                    title: m_title,
                    modal: true,
                    autoOpen: false,
                    closeOnEscape: false,
                    position: m_position,
                    buttons: m_buttons
                });
            }

            this.ctrl = m_ctrl;
        },

        /* 设置标题 */
        setTitle: function (title) {
            $("#" + this.titleCtrlId).text(title);
        },

        /* 打开对话框 */
        show: function () {
            this.ctrl.dialog("open");
        },

        /* 关闭对话框 */
        close: function () {
            this.ctrl.dialog("close");
        }
    };
    uicontrol.dialog.fn.init.prototype = uicontrol.dialog.fn;
    /*-------------------------------*/

    /* 
    -----数据表格控件----- 
    */
    uicontrol.tableList = function (ctrlId, paramObj) {
        var obj = new uicontrol.tableList.fn.init(ctrlId, paramObj);
        return obj;
    };
    uicontrol.tableList.fn = {

        /* 每页显示记录数 */
        pageNumber: 20,

        /* 初始化函数 */
        init: function (ctrlId, paramObj) {

            this.dataSource = { page: 1, totalCount: 0, items: new datastruct.dictionary() };

            this.isPaging = paramObj.isPaging;

            /* 是否支持分页 */
            if (!paramObj.isPaging) {
                paramObj.height = paramObj.height + 30;
            }
            this.keyColumn = paramObj.keyColumn;
            this.autoSeq = paramObj.autoSeq;
            this.selectModel = paramObj.selectModel;
            this.selectEvent = paramObj.selectEvent;
            this.isExpend = paramObj.isExpend;
            this.pageQueryHandler = function(pageNum, pageCount){
            
                this.ispageTrigger = true;
                 
                if(paramObj.pageQueryHandler){
                    paramObj.pageQueryHandler(pageNum, pageCount);
                }
            };
            this.columns = [];
            this._ctrlId = ctrlId;

            /* 自动排序 */
            if (this.autoSeq) {
                var thisObj = this;

                this.columns.push({ display: mlm.C0041, name: "_Seq", width: 50, align: 'center' });

                $.each(paramObj.columns, function () {
                    thisObj.columns.push(this);
                });
            }
            else {
                this.columns = paramObj.columns;
            }

            this.tableGrid = $("#" + ctrlId);

            var thisObj = this;

            this.dataGrid = $("#" + ctrlId).flexigrid({
                colModel: this.columns,
                usepager: paramObj.isPaging,
                width: paramObj.width,
                height: paramObj.height,
                singleSelect: true, //仅允许选择单行
                resizable: false,
                striped: true,
                useRp: false,
                title: paramObj.title,
                showTableToggleBtn: true,
                dataType: "json",
                onChangeSort: function (sortname, sortorder) { uicontrol.tableList.fn._sortItems.call(thisObj, sortname, sortorder); }
            });

            /* 是否支持分页 */
            if (this.isPaging) {
                $(this.dataGrid[0].grid.pDiv).empty();
                this._createPagingCtrl();
            }

            if (paramObj.title && !paramObj.isExpend) {
                $('div.ptogtitle', this.dataGrid[0].grid.mDiv).click();
            }
        },

        /* 绑定数据源 */
        bindDataSource: function (source, sourceitemcount) {
        
            if (!source) {
                this.dataSource = { page: 1, totalCount: 0, items: new datastruct.dictionary() };
                this.dataGrid.flexAddData({ rows: [] });
            }
            else{

            
                if(!this.ispageTrigger){
                    this.dataSource.page = 1;
                }

                var thisObj = this;

                var m_dataSource = new datastruct.dictionary();

                if (source.Rows) {
                    var k = 1 + this.pageNumber * (this.dataSource.page - 1);
                    $.each(source.Rows, function () {

                        var rowItem = this;
                        var m_keyvalue;
                        var itemObj = {};

                        /* 自动排序 */
                        if (thisObj.autoSeq) {
                            itemObj._Seq = k;
                        }

                        var m_idx = 0;
                        $.each(source.TableColumns, function () {

                            itemObj[this] = rowItem[m_idx];

                            if (this == thisObj.keyColumn) {
                                m_keyvalue = rowItem[m_idx];
                            }

                            m_idx++;
                        });

                        m_dataSource.setItem(m_keyvalue, itemObj);
                        k++;
                    });

                    this.dataSource.totalCount = source.TotalCount;
                    this.dataSource.items = m_dataSource;
                }
                else {
                    var k = 1;
                    $.each(source, function () {

                        /* 自动排序 */
                        if (thisObj.autoSeq) {
                            this._Seq = k;
                        }

                        m_dataSource.setItem(this[thisObj.keyColumn], this);
                        k++;
                    });

                    if(sourceitemcount){
                        this.dataSource.totalCount = sourceitemcount;
                    }
                    else {
                        this.dataSource.totalCount = source.length;
                    }
                    this.dataSource.items = m_dataSource;
                }

                var m_bindSource = { rows: [] };
                $.each(m_dataSource.arrValues, function (i, rowItem) {
                    var m_key = m_dataSource.arrKeys[i];
                    var m_rowObj = { id: m_key, cell: [] };

                    /* 循环列 */
                    $.each(thisObj.columns, function () {

                        var m_value = thisObj._createCellContent(this, rowItem);
                        m_rowObj.cell.push(m_value);
                    });

                    m_bindSource.rows.push(m_rowObj);
                });

                /* 绑定数据列表 */
                this.dataGrid.flexAddData(m_bindSource);
            }

            /* 是否支持分页 */
            if (this.isPaging) {
                /* 控制分页区域 */
                this._controlPagingCtrl();
            }

            this.ispageTrigger = false;
        },

        /* 添加数据 */
        addData: function (key, dataRow) {

            /* 是否支持分页 */
            if (this.isPaging) {

                this.tableGrid.find("tr").remove();
                this.dataSource.page = 1;
                this.dataSource.totalCount = 1;

                //设置分页区域
                this.pageTxt.val(this.dataSource.page);
                this.totalCount.text(this.dataSource.totalCount);
                this._controlPagingCtrl();

                if (this.autoSeq) {
                    dataRow._Seq = 1;
                }
            }
            else {
                this.dataSource.totalCount++;
                if (this.autoSeq) {
                    dataRow._Seq = this.dataSource.items.count + this.pageNumber * (this.dataSource.page - 1) + 1;
                }
            }

            this.dataSource.items.setItem(key, dataRow);
            var m_rowhtml = $(this._createRow(key, dataRow));

            if (this.dataSource.items.count % 2 == 0) {
                m_rowhtml.addClass("erow");
            }

            this.tableGrid.append(m_rowhtml);
        },

        /* 修改数据 */
        modifyData: function (key, dataRow) {

            if (!this.dataSource.items.containKey(key)) {
                return;
            }

            dataRow._Seq = this.dataSource.items.getItem(key)._Seq;
            this.dataSource.items.setItem(key, dataRow);

            var m_rowhtml = $(this._createRow(key, dataRow));
            if (dataRow._Seq % 2 == 0) {
                m_rowhtml.addClass("erow");
            }

            this.tableGrid.find("tr[id=row" + key + "]").replaceWith(m_rowhtml);
        },

        /* 删除数据 */
        deleteData: function (key, deleteEvent) {

            if (!this.dataSource.items.containKey(key)) {
                return;
            }
            
            this.dataSource.totalCount--;
            if (this.isPaging) {
                this.totalCount.text(this.dataSource.totalCount);
            }

            var deletedItem = this.dataSource.items.getItem(key);
            this.dataSource.items.removeItem(key);
            this.tableGrid.find("tr[id=row" + key + "]").remove();

            var thisObj = this;
            var m_rows = this.tableGrid.find("tr");
            var idx = 1;
            $.each(m_rows, function () {

                var m_thisRow = $(this);
                if (idx % 2 == 0) {
                    m_thisRow.addClass("erow");
                }
                else {
                    m_thisRow.removeClass("erow");
                }

                /* 自动排序 */
                if (thisObj.autoSeq) {
                    var m_key = m_thisRow.attr("id").substr(3);
                    var m_seqCell = m_thisRow.find("span[id='" + thisObj._ctrlId + "_seq']");
                    var seq = Number(m_seqCell.text());
                    if (seq > deletedItem._Seq) {
                        m_seqCell.text(seq - 1);
                        var m_item = thisObj.dataSource.items.getItem(m_key);
                        m_item._Seq = seq - 1;

                        if (deleteEvent) {
                            deleteEvent(m_item);
                        }
                    }
                }
                idx++;
            });
        },

        /* 获取数据的序号 */
        getItem: function (key) {
            return this.dataSource.items.getItem(key);
        },

        /* 获取数据的序号 */
        getItemSeq: function (key) {
            return this.dataSource.items.getItem(key)._Seq;
        },

        /* 上一页 */
        goToLast: function () {
            this.nextBt.show();

            var m_currPage = this.dataSource.page - 1;
            if (m_currPage == 1) {
                this.lastBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber);
            }
        },

        /* 下一页 */
        goToNext: function () {
            var m_currPage = Number(this.dataSource.page) + 1;

            this.lastBt.show();
            if (m_currPage == this.totolPageCount) {
                this.nextBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber, this.sortName, this.sortOrder);
            }
        },

        /* 重新设置大小 */
        resize: function (height) {

            /* 是否支持分页 */
            if (!this.isPaging) {
                height = height + 30;
            }
            this.dataGrid[0].grid.bDiv.style.height = height + 'px';
            this.dataGrid[0].p.height = height;
            this.dataGrid[0].grid.fixHeight(height);
        },

        /* 获取选中数据 */
        getSelectedItems: function () {

            var m_selectedItems = [];
            var thisObj = this;
            if (this.selectModel == "2") {
                var selectedItems = $("input[name='" + this._ctrlId + "_check']");
                $.each(selectedItems, function () {
                    if (this.checked) {
                        m_selectedItems.push(thisObj.dataSource.items.getItem($(this).val()));
                    }
                });
            }
            else if (this.selectModel == "1") {
                var selectedItems = $("input[name='" + this._ctrlId + "_radio']");
                $.each(selectedItems, function () {
                    if (this.checked) {
                        m_selectedItems = thisObj.dataSource.items.getItem($(this).val());
                    }
                });
            }

            return m_selectedItems;
        },

        /* 设置选择的数据 */
        setSelectedItems: function (selectedItems, exceptionItems) {
            if (selectedItems == "all") {
                var m_chkItems = $("input[name='" + this._ctrlId + "_check']");
                $.each(m_chkItems, function () {
                    if (!exceptionItems.containKey($(this).val())) {
                        $(this).attr("checked", 'true');
                    }
                });
            }
            else {
                
                if (this.selectModel == "2") {
                    var m_chkItems = $("input[name='" + this._ctrlId + "_check']");
                    $.each(m_chkItems, function () {
                        if (selectedItems.containKey($(this).val())) {
                            $(this).attr("checked", 'true');
                        }
                    });
                }
                else{
                    var m_chkItems = $("input[name='" + this._ctrlId + "_radio']");
                    $.each(m_chkItems, function () {
                        if (selectedItems.containKey($(this).val())) {
                            $(this).attr("checked", 'true');
                        }
                    });
                }
            }
        },

        /* 隐藏内容 */
        hideContent: function () {
            if (this.isExpend) {
                $('div.ptogtitle', this.dataGrid[0].grid.mDiv).click();
                this.isExpend = false;
            }
        },

        /* 重新设置排序 */
        reSetSort: function () {
            this.dataGrid.flexOptions({ sortname: "", sortorder: "" });
            $('.sasc', this.dataGrid[0].grid.hDiv).removeClass('sasc');
            $('.sorted', this.dataGrid[0].grid.hDiv).removeClass('sorted');
        },

        /* 开启批量操作模式 */
        openBatchModel: function () {
            this.selectModel = "2";
        },

        /* 取消批量操作模式 */
        cancelBatchModel: function () {
            this.selectModel = null;
        },

        /* 全选 */
        selectAll: function () {
            $("[name='" + this._ctrlId + "_check']").attr("checked", 'true');
        },

        /* 反选 */
        cancelAll: function () {
            $("[name='" + this._ctrlId + "_check']").removeAttr("checked");
        },

        /* 排序 */
        _sortItems: function (sortname, sortorder) {
            this.sortName = sortname;
            this.sortOrder = sortorder;

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber, this.sortName, this.sortOrder);
            }
        },

        /* 创建列内容 */
        _createCellContent: function (col, rowItem) {

            var m_value = "";
            var m_key = rowItem[this.keyColumn];
            col.keyObj = rowItem;

            /* 判断列是否需要调整 */
            if (!col.adjust) {
                if (col.name == "_Seq") {

                    /* 单选模式 */
                    if (this.selectModel == "1") {
                        m_value = "<input type='radio' name='" + this._ctrlId + "_radio' value='" + m_key + "' /><span id='" + this._ctrlId + "_seq'>" + rowItem[col.name] + "</span>";
                    }
                    else if (this.selectModel == "2") {
                        var m_event = "";
                        if (this.selectEvent) {
                            m_event = " onchange='" + this.selectEvent + ".call(this);' "
                        }

                        m_value = "<input type='checkbox' name='" + this._ctrlId + "_check' value='" + m_key + "' " + m_event + " /><span id='" + this._ctrlId + "_seq'>" + rowItem[col.name] + "</span>";
                    }
                    else {
                        m_value = "<span id='" + this._ctrlId + "_seq'>" + rowItem[col.name] + "</span>";
                    }
                }
                else {
                    m_value = rowItem[col.name];

                    if (col.allowNewLine) {
                        m_value = m_value.replace(/\^/g, "\"").replace(/\n/g, "<br>");
                    }
                }
            }
            else {
                var m_cellvalue = [];
                /* 修改列构造函数 */
                if (col.modifiedFunc) {
                    m_cellvalue.push("<a href='javascript:void(\"0\")' class='bt-link' tag='" + m_key + "' onclick='" + col.modifiedFunc + ".call(this);'>" + mlm.C0061 + "</a>");
                }
                /* 删除列构造函数 */
                if (col.deletedFunc) {
                    m_cellvalue.push("<a href='javascript:void(\"0\")' class='bt-link' tag='" + m_key + "' onclick='" + col.deletedFunc + ".call(this);'>" + mlm.C0062 + "</a>");
                }
                /* 自定义列构造函数 */
                if (col.createCell) {
                    m_cellvalue.push(col.createCell(m_key, rowItem[col.name], col.name));
                }

                m_value = m_cellvalue.join("");
            }

            return m_value;
        },

        /* 创建行 */
        _createRow: function (key, dataRow) {
            var thisObj = this;
            var m_row = ["<tr id='row" + key + "'>"];
            $.each(this.dataGrid[0].grid.hTable.rows[0].cells, function () {

                var index = this.axis.substr(3);

                var m_col = thisObj.columns[index];
                var m_value = thisObj._createCellContent(m_col, dataRow);

                var m_td = "<td align='center'>";
                if ($(this).css("display") == "none") {
                    m_td = "<td align='" + thisObj.columns[index].align + "' style='display: none'>";
                }
                m_row.push(m_td);
                m_row.push("<div style='width: " + (Number($(this)[0].offsetWidth) - 12) + "px ;text-align: " + thisObj.columns[index].align + "'>" + m_value + "</div>");
                m_row.push("</td>");
            });
            m_row.push("</tr>");

            return m_row.join("");
        },

        /* 创建分页区域 */
        _createPagingCtrl: function () {
            var pagingArea = $("<div class='p-area'></div>");

            var thisObj = this;
            this.lastBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0037 + "</a>");
            this.pageTxt = $("<input type='text' value='" + this.dataSource.page + "' class='p-txt' onkeypress='uicontrol.func.checkInputInt(event);' />");

            /* 页数改变事件 */
            this.pageTxt.change(function () {
                var m_num = $(this).val();
                if (m_num == 0 || m_num > thisObj.totolPageCount) {
                    $(this).val(thisObj.dataSource.page);
                }
                else {
                    thisObj.dataSource.page = m_num;

                    if (m_num == 1) {
                        thisObj.lastBt.hide();
                        thisObj.nextBt.show();
                    }
                    else if (m_num == thisObj.totolPageCount) {
                        thisObj.lastBt.show();
                        thisObj.nextBt.hide();
                    }
                    else {
                        thisObj.lastBt.show();
                        thisObj.nextBt.show();
                    }

                    /* 查询数据 */
                    if (thisObj.pageQueryHandler) {
                        thisObj.pageQueryHandler(thisObj.dataSource.page, thisObj.pageNumber);
                    }
                }
            });

            this.totalCount = $("<span class='p-lable'>" + this.dataSource.totalCount + "</span>");
            this.nextBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0038 + "</a>");
            this.pageNum = $("<span class='p-lable'>1</span>");

            var thisObj = this;
            /* 绑定分页事件 */
            this.lastBt.click(function () { thisObj.goToLast(); });
            this.nextBt.click(function () { thisObj.goToNext(); });

            pagingArea.append("<span>" + mlm.C0039 + "</span>");
            pagingArea.append(this.totalCount);
            pagingArea.append("<span class='p-totalcount'>" + mlm.C0040 + "</span>");
            pagingArea.append(this.lastBt);
            pagingArea.append(this.pageTxt);
            pagingArea.append("/");
            pagingArea.append(this.pageNum);
            pagingArea.append(this.nextBt);

            this.lastBt.hide();
            this.nextBt.hide();

            $(this.dataGrid[0].grid.pDiv).append(pagingArea);
        },

        /* 设置分页区域控件 */
        _controlPagingCtrl: function () {
            this.totalCount.text(this.dataSource.totalCount);

            /* 设置总页数 */
            this.totolPageCount = parseInt(this.dataSource.totalCount / this.pageNumber);
            if (this.totolPageCount * this.pageNumber > this.dataSource.totalCount || this.totolPageCount * this.pageNumber == this.dataSource.totalCount) {
                this.pageNum.text(this.totolPageCount);
            }
            else {
                this.totolPageCount++;
                this.pageNum.text(this.totolPageCount);
            }

            this.pageTxt.val(this.dataSource.page);

            /* 控制分页按钮 */
            if (this.dataSource.page == 1) {
                this.lastBt.hide();
            }
            else {
                this.lastBt.show();
            }
            if (this.totolPageCount == 0 || this.totolPageCount == this.dataSource.page) {
                this.nextBt.hide();
            }
            else {
                this.nextBt.show();
            }
        }
    };
    uicontrol.tableList.fn.init.prototype = uicontrol.tableList.fn;
    /*-------------------------------*/

    /* 
    -----文件上传控件----- 
    */
    uicontrol.file = function (ctrlId) {
        var obj = new uicontrol.file.fn.init(ctrlId);
        return obj;
    };
    uicontrol.file.fn = {

        /* 构造函数 */
        init: function (ctrlId) {

            this.ctrlId = ctrlId;

            var formId = 'fileform_' + ctrlId;
            var frameId = 'fileframe' + ctrlId;

            this.fileForm = $("#" + formId);
            if (this.fileForm.length == 0) {
                this.fileForm = $('<form action="" method="post" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
                this.fileForm.css('position', 'absolute');
                this.fileForm.css('top', '-1200px');
                this.fileForm.css('left', '-1200px');
                this.fileForm.appendTo('body');
                this.paramCtrl = $('<input type="hidden" name="Param" />');
                this.paramCtrl.appendTo(this.fileForm);

                var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
                if ($.browser.msie) {
                    iframeHtml += " src=\"javascript:false\"";
                }
                iframeHtml += ' />';
                this.iframe = $(iframeHtml);
                this.iframe.appendTo(document.body);

                this.fileForm.attr('target', frameId);
                this.fileForm.attr('method', 'POST');
            }
        },

        /* 上传文件 */
        uploadFile: function (transferObj, bizExeContext) {
            var fileCtrl = $('#' + this.ctrlId);

            fileCtrl.before(fileCtrl.clone());

            var fileId = 'filectrl_' + this.ctrlId;
            this.fileForm.find("#" + fileId).remove();

            fileCtrl.attr('id', fileId);
            fileCtrl.appendTo(this.fileForm);

            //设置上传Url
            this.fileForm.attr('action', webhandler.ajaxHandler._handlerUrl + "?Filename=" + this.ctrlId);

            //设置参数
            var paramObj = {};
            for (var item in transferObj) {
                paramObj[item] = transferObj[item];
            }
            var paramStr = datastruct.convertion.objectToStr(paramObj);

            this.paramCtrl.val(paramStr);

            /* 提交 */
            webhandler.ajaxHandler.uploadFile(this.fileForm, this.iframe, bizExeContext);
        }
    };
    uicontrol.file.fn.init.prototype = uicontrol.file.fn;
    /*-------------------------------*/

    /* 
    -----简单表格控件----- 
    */
    uicontrol.simpleTableList = function (ctrlId, paramObj, source) {
        var obj = new uicontrol.simpleTableList.fn.init(ctrlId, paramObj, source);
        return obj;
    };
    uicontrol.simpleTableList.fn = {

        /* 每页显示数 */
        pageNumber: 50,

        /* 构造函数 */
        init: function (ctrl, paramObj, source) {

            this.keyColumn = paramObj.keyColumn;
            this.dataSource = { page: 1, totalCount: 0, items: new datastruct.dictionary() };
            this.constructTableFunc = paramObj.constructTableFunc;
            this.isPaging = paramObj.isPaging;
            this.pageQueryHandler = paramObj.pageQueryHandler;
            this.sourceType = paramObj.sourceType;
            this.liList = new datastruct.dictionary();
            this.SeqProp = paramObj.seqProp;
            this.events = paramObj.events;
            this.itemCss = paramObj.itemCss;

            if (typeof(ctrl) == "string") {
                this.ctrl = $("#" + ctrl);
            }
            else{
                this.ctrl = ctrl;
            }
            
            this.ctrl.addClass("simple-table");

            var m_class = "content";
            if (paramObj.contentClass) {
                m_class = m_class + " " + paramObj.contentClass;
            }
            this.contentCtrl = $("<div class='" + m_class + "'></div>");
            this.ctrl.append(this.contentCtrl);

            /* 是否支持分页 */
            if (this.isPaging) {
                this.pagingCtrl = $("<div class='paging-frame'></div>");
                this.ctrl.append(this.pagingCtrl);
                this._createPagingCtrl();
            }

            /* 绑定数据 */
            this.bindSource(source);
        },

        /* 绑定数据源 */
        bindSource: function (source) {

            if (!source) {
                this.dataSource = { page: 1, totalCount: 0, items: new datastruct.dictionary() };
                if (this.ulCtrl) {
                    this.ulCtrl.empty();
                }
                return;
            }
            else{
                this.dataSource.items = new datastruct.dictionary();
                if (this.ulCtrl) {
                    this.ulCtrl.empty();
                }
            }

            var thisObj = this;

            if (source.Rows) {
                $.each(source.Rows, function () {

                    var rowItem = this;
                    var m_keyvalue;
                    var itemObj = {};
                    $.each(source.TableColumns, function (i, column) {
                        itemObj[column] = rowItem[i];

                        if (column == thisObj.keyColumn) {
                            m_keyvalue = rowItem[i];
                        }
                    });

                    thisObj.dataSource.items.setItem(m_keyvalue, itemObj);
                });
                this.dataSource.totalCount = source.TotalCount;
            }
            else {
                $.each(source, function () {
                    thisObj.dataSource.items.setItem(this[thisObj.keyColumn], this);
                });
                this.dataSource.totalCount = this.dataSource.items.count;
            }

            /* 创建内容 */
            this._createContent();
        },

        /* 添加元素 */
        addData: function (dataItem) {
            this._createRow(dataItem);

            this.dataSource.items.setItem(dataItem[this.keyColumn], dataItem);
            this.dataSource.totalCount++;
        },

        /* 修改元素 */
        modifyData: function (dataItem) {
            var m_newliCtrl = $("<li></li>");
            var m_key = dataItem[this.keyColumn];

            if (this.constructTableFunc) {
                var liTable = this.constructTableFunc(dataItem);
                m_newliCtrl.append(liTable);
            }

            this.liList.getItem(m_key).replaceWith(m_newliCtrl);

            this.dataSource.items.setItem(m_key, dataItem);
            this.liList.setItem(m_key, m_newliCtrl);
        },

        /* 删除元素 */
        deleteData: function (dataItem) {

            var m_key = dataItem[this.keyColumn];
            var m_deletedSeq = Number(dataItem[this.SeqProp]);
            var m_item = this.liList.getItem(m_key);

            if (m_item) {
                m_item.remove();

                this.dataSource.items.removeItem(m_key);
                this.liList.removeItem(m_key);

                this.dataSource.totalCount--;

                var thisObj = this;
                $.each(this.dataSource.items.arrValues, function () {

                    var m_seq = Number(this[thisObj.SeqProp]);
                    if (thisObj.SeqProp && m_seq > m_deletedSeq) {
                        this[thisObj.SeqProp] = m_seq - 1;
                    }
                });
            }
        },

        /* 获取元素 */
        getItem: function (key) {
            return this.dataSource.items.getItem(key);
        },

        /* 创建内容区域 */
        _createContent: function () {
            this.ulCtrl = $("<ul></ul>");

            var thisObj = this;
            var liItems = [];
            $.each(this.dataSource.items.arrValues, function () {
                thisObj._createRow(this);
            });

            this.contentCtrl.empty();
            this.contentCtrl.append(this.ulCtrl);
            this.resize();

            /* 是否支持分页 */
            if (this.isPaging) {
                /* 控制分页区域 */
                this._controlPagingCtrl();
            }
        },

        /* 创建行 */
        _createRow: function (dataItem) {
            var liCtrl = $("<li></li>");
            liCtrl.attr("tag", dataItem[this.keyColumn]);

            if (this.itemCss) {
                liCtrl.addClass(this.itemCss);
            }

            if (this.constructTableFunc) {
                var liTable = this.constructTableFunc(dataItem);
                liCtrl.append(liTable);
            }

            if (this.events) {   
                $.extend(liCtrl[0], this.events);
            }

            this.ulCtrl.append(liCtrl);

            this.liList.setItem(dataItem[this.keyColumn], liCtrl);
        },

        /* 创建分页区域 */
        _createPagingCtrl: function () {
            var pagingArea = $("<div class='p-area'></div>");

            var thisObj = this;
            this.lastBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0037 + "</a>");
            this.pageTxt = $("<input type='text' value='" + this.dataSource.page + "' class='p-txt' onkeypress='uicontrol.func.checkInputInt(event);' />");

            /* 页数改变事件 */
            this.pageTxt.change(function () {
                var m_num = $(this).val();
                if (m_num == 0 || m_num > thisObj.totolPageCount) {
                    $(this).val(thisObj.dataSource.page);
                }
                else {
                    thisObj.dataSource.page = m_num;

                    if (m_num == 1) {
                        thisObj.lastBt.hide();
                        thisObj.nextBt.show();
                    }
                    else if (m_num == thisObj.totolPageCount) {
                        thisObj.lastBt.show();
                        thisObj.nextBt.hide();
                    }
                    else {
                        thisObj.lastBt.show();
                        thisObj.nextBt.show();
                    }

                    /* 查询数据 */
                    if (thisObj.pageQueryHandler) {
                        thisObj.pageQueryHandler(thisObj.dataSource.page, thisObj.pageNumber);
                    }
                }
            });

            this.totalCount = $("<span class='p-lable'>" + this.dataSource.totalCount + "</span>");
            this.nextBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0038 + "</a>");
            this.pageNum = $("<span class='p-lable'>1</span>");

            var thisObj = this;
            /* 绑定分页事件 */
            this.lastBt.click(function () { thisObj.goToLast(); });
            this.nextBt.click(function () { thisObj.goToNext(); });

            pagingArea.append("<span>" + mlm.C0039 + "</span>");
            pagingArea.append(this.totalCount);
            pagingArea.append("<span class='p-totalcount'>" + mlm.C0040 + "</span>");
            pagingArea.append(this.lastBt);
            pagingArea.append(this.pageTxt);
            pagingArea.append("/");
            pagingArea.append(this.pageNum);
            pagingArea.append(this.nextBt);

            this.lastBt.hide();
            this.nextBt.hide();

            this.pagingCtrl.append(pagingArea);
        },

        /* 设置分页区域控件 */
        _controlPagingCtrl: function () {
            this.totalCount.text(this.dataSource.totalCount);

            /* 设置总页数 */
            this.totolPageCount = parseInt(this.dataSource.totalCount / this.pageNumber);
            if (this.totolPageCount * this.pageNumber > this.dataSource.totalCount || this.totolPageCount * this.pageNumber == this.dataSource.totalCount) {
                this.pageNum.text(this.totolPageCount);
            }
            else {
                this.totolPageCount++;
                this.pageNum.text(this.totolPageCount);
            }

            this.pageTxt.val(this.dataSource.page);

            /* 控制分页按钮 */
            if (this.dataSource.page == 1) {
                this.lastBt.hide();
            }
            else {
                this.lastBt.show();
            }
            if (this.totolPageCount == this.dataSource.page) {
                this.nextBt.hide();
            }
            else {
                this.nextBt.show();
            }
        },

        /* 上一页 */
        goToLast: function () {
            this.nextBt.show();

            var m_currPage = this.dataSource.page - 1;
            if (m_currPage == 1) {
                this.lastBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber);
            }
        },

        /* 下一页 */
        goToNext: function () {
            var m_currPage = Number(this.dataSource.page) + 1;

            this.lastBt.show();
            if (m_currPage == this.totolPageCount) {
                this.nextBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber);
            }
        },

        /* 设置布局 */
        resize: function () {
            var m_ctrl_height = this.ctrl[0].offsetHeight;
            if (m_ctrl_height) {
                this.contentCtrl.css("height", this.isPaging ? m_ctrl_height - 33 : m_ctrl_height);
            }
        }
    };
    uicontrol.simpleTableList.fn.init.prototype = uicontrol.simpleTableList.fn;
    /*-------------------------------*/

    /* 
    -----分组列表控件----- 
    */
    uicontrol.groupList = function (ctrlId, paramObj, source) {
        var obj = new uicontrol.groupList.fn.init(ctrlId, paramObj, source);
        return obj;
    };
    uicontrol.groupList.fn = {

        /* 构造函数 */
        init: function (ctrlObj, paramObj, source) {
            this.dataSource = source;

            if (typeof (ctrlObj) == "string") {
                this.ctrl = $("#" + ctrlObj);
            }
            else {
                this.ctrl = ctrlObj;
            }

            this.ctrl.addClass("group-table");
            this.groupKey = paramObj.groupKey;
            this.groupName = paramObj.groupName;
            this.itemKey = paramObj.itemKey;
            this.constructItemFunc = paramObj.constructItemFunc;
            this.SeqProp = paramObj.seqProp;
        },

        /* 绑定数据 */
        bindSource: function (source) {

            if (source) {
                var m_jsonObjs = datastruct.convertion.tableToJson(source);

                var thisObj = this;
                var m_groups = new datastruct.dictionary();
                $.each(m_jsonObjs, function () {
                    var m_key = this[thisObj.groupKey];

                    if (!m_groups.containKey(m_key)) {
                        var m_items = [];
                        m_items.push(this);
                        m_groups.setItem(m_key, m_items);
                    }
                    else {
                        var m_items = m_groups.getItem(m_key);
                        m_items.push(this);
                        m_groups.setItem(m_key, m_items);
                    }
                });

                this.dataSource = m_groups;
            }

            this._createGroupList();
        },

        /* 添加元素 */
        addData: function (dataItem) {
            var m_key = dataItem[this.groupKey];
            var m_ctrlObj = this.itemCtrls.getItem(m_key);

            if (m_ctrlObj) {
                m_ctrlObj.tableCtrl.addData(dataItem);
            }
            else {
                this._createGroupRow(m_key, [dataItem]);
            }
        },

        /* 修改元素 */
        modifyData: function (dataItem) {
            var m_key = dataItem[this.groupKey];
            var m_itemKey = dataItem[this.itemKey];

            var m_ctrlObj = this.itemCtrls.getItem(m_key);

            var m_simpleTable = m_ctrlObj.tableCtrl;
            m_simpleTable.modifyData(dataItem);

            this.itemCtrls.setItem(m_key, { ctrl: m_ctrlObj.ctrl, tableCtrl: m_simpleTable });
        },

        /* 删除元素 */
        deleteData: function (dataItem) {
            var m_key = dataItem[this.groupKey];
            var m_itemkey = dataItem[this.itemKey];

            var m_ctrlObj = this.itemCtrls.getItem(m_key);
            var m_simpleTable = m_ctrlObj.tableCtrl;

            $.each(this.itemCtrls.arrValues, function () {
                this.tableCtrl.deleteData(dataItem);
            });

            if (m_simpleTable.dataSource.totalCount == 0) {
                m_ctrlObj.ctrl.remove();
                this.itemCtrls.removeItem(m_key);
            }

            this.resize();
        },

        /* 获取分组元素 */
        getGroupItem: function (key) {
            var m_groupItem = this.itemCtrls.getItem(key);

            return m_groupItem;
        },

        /* 获取元素 */
        getItem: function (key, itemKey) {
            var m_groupCtrl = this.itemCtrls.getItem(key);
            if (m_groupCtrl) {
                var m_simpleTable = m_groupCtrl.tableCtrl;
                return m_simpleTable.getItem(itemKey);
            }
        },

        /* 重新设置布局 */
        resize: function () {

            if (!this.itemCtrls) {
                return;
            }

            $.each(this.itemCtrls.arrValues, function () {
                this.tableCtrl.resize();
            });
        },

        /* 创建分组列表 */
        _createGroupList: function () {

            this.ctrl.empty();
            if (this.itemCtrls) {
                this.itemCtrls.clear();
            }

            /* 元素条目控件 */
            this.itemCtrls = new datastruct.dictionary();

            for (var i = 0; i < this.dataSource.count; i++) {
                var m_key = this.dataSource.arrKeys[i];
                var m_valueItems = this.dataSource.arrValues[i];

                this._createGroupRow(m_key, m_valueItems);
            }
        },

        /* 创建分组行 */
        _createGroupRow: function (key, valueItems) {

            var m_name = valueItems[0][this.groupName];

            var listItem = $("<div class='list-item'></div>");
            var titleArea = $("<div class='title-area'></div>");
            var operaBt = $("<span class='ui-icon ui-icon-folder-open' style='cursor: pointer;'></span>");

            var thisObj = this;
            operaBt.click(function () {
                /* 未展开 */
                if (!operaBt.isExpend) {
                    operaBt.removeClass("ui-icon ui-icon-folder-open");
                    operaBt.addClass("ui-icon ui-icon-folder-collapsed");
                    operaBt.isExpend = true;

                    thisObj.itemCtrls.getItem(key).tableCtrl.ctrl.hide();
                }
                else {
                    operaBt.removeClass("ui-icon ui-icon-folder-collapsed");
                    operaBt.addClass("ui-icon ui-icon-folder-open");
                    operaBt.isExpend = false;

                    thisObj.itemCtrls.getItem(key).tableCtrl.ctrl.show();
                }
            });
            operaBt.hover(function () { operaBt.addClass("hover-bt"); }, function () { operaBt.removeClass("hover-bt"); });

            titleArea.append(operaBt);
            titleArea.append("<span>" + m_name + "</span>");

            listItem.append(titleArea);

            var m_tableCtrlId = this.ctrl.attr("id") + "table" + key;
            listItem.append("<div id='" + m_tableCtrlId + "'></div>");
            this.ctrl.append(listItem);

            /* 数据表 */
            var m_tableCtrl = new uicontrol.simpleTableList(m_tableCtrlId, { keyColumn: this.itemKey, sourceType: "json", seqProp: "Seq", isPaging: false, constructTableFunc: this.constructItemFunc },
                                                              valueItems);

            this.itemCtrls.setItem(key, { ctrl: listItem, tableCtrl: m_tableCtrl });
        }
    };
    uicontrol.groupList.fn.init.prototype = uicontrol.groupList.fn;
    /*-------------------------------*/

    /* 
    -----删除确认控件----- 
    */
    uicontrol.confirmDelete = function (submitFunc) {
        var obj = new uicontrol.confirmDelete.fn.init(submitFunc);
        return obj;
    };
    uicontrol.confirmDelete.fn = {

        /* 构造函数 */
        init: function (submitFunc) {
            var m_frame = $("<div></div>");
            var m_innerframe = $("<div class=\"submitForm form-width\"></div>");
            var m_table = $("<div class=\"submitForm-tr first-item last-item\">");
            this.txtCtrl = $("<span></span>");
            m_table.append(this.txtCtrl);
            m_innerframe.append(m_table);
            m_frame.append(m_innerframe);

            $(document).append(m_frame);

            var m_layout = { width: 800 };

            this.dialog = new uicontrol.dialog(m_frame, mlm.C0042, m_layout, submitFunc);
        },

        /* 确认提示 */
        showConfirm: function (confirmInfo) {
            this.txtCtrl.text(confirmInfo);
            this.dialog.show();
        },

        /* 关闭对话框 */
        close: function () {
            this.dialog.close();
        }
    };
    uicontrol.confirmDelete.fn.init.prototype = uicontrol.confirmDelete.fn;
    /*-------------------------------*/

    /* 
    -----树型控件----- 
    */
    uicontrol.treeView = function (ctrl, sourceObj, clickItemEvent, param) {
        return new uicontrol.treeView.fn.init(ctrl, sourceObj, clickItemEvent, param);
    };
    uicontrol.treeView.fn = {

        /* 控件 */
        _ctrl: null,

        /* 数据源对象 
        [{ key:"1", value:"AB", parentKey: 0, tag:null, children:[{ key:"3", value:"AB_1", parentKey:1, 
        tag:null, children:[] }] }, 
        { key:"2", value:"CD", parentKey: 0, tag:null, children:[] }] */
        _sourceObj: null,

        /* 文本单击事件 */
        _clickItemEvent: null,

        /* hashtable结构（用于存储树型控件中的节点对象uicontrol.treeView.Item） */
        _dict: null,

        /* 关键字数组 */
        _keys: [],

        /* 内部 构造函数(创建init函数对象) */
        init: function (ctrl, sourceObj, clickItemEvent, param) {
            this._ctrl = ctrl;
            this._ctrlId = this._ctrl.attr("id");

            this._dict = new datastruct.dictionary();
            this._clickItemEvent = clickItemEvent;
            this.selectedItem = null;
            this.nodeList = [];

            if (param) {
                this._operaModel = param.operaModel;
                this._displayModel = param.displayModel;
                this._sourceFormat = param.sourceFormat;
                this._keyColumn = param.keyColumn;
                this._parentKeyColumn = param.parentKeyColumn;
                this._dispayColumn = param.displayColumn;
                this._dbClickEvent = param.dbClickEvent;
                this._constructDisplayTxt = param.constructDisplayTxt;
                this._isCollapse = param.isCollapse;
                this._expandEvent = param.expandEvent;
                this._collapseEvent = param.collapseEvent;
                this._checkEvent = param.checkEvent;
                this._isForbitSynChild = param.isForbitSynChild;
            }

            if (this._sourceFormat && (this._sourceFormat == "table" || this._sourceFormat == "json")) {
            
                var m_jsonObjs;
                if(this._sourceFormat == "table"){
                    m_jsonObjs = datastruct.convertion.tableToJson(sourceObj);
                }
                else{
                    m_jsonObjs = sourceObj;
                }

                /* 元素临时缓存 */
                var m_itemCache = new datastruct.dictionary();
                var thisObj = this;
                this._sourceObj = [];

                $.each(m_jsonObjs, function () {

                    var m_key = this[thisObj._keyColumn];
                    var m_parentKey = this[thisObj._parentKeyColumn];
                    var m_item = { key: m_key, value: this[thisObj._dispayColumn], parentKey: m_parentKey, tag: this, children: [] };

                    m_itemCache.setItem(m_key, m_item);

                    if (!m_parentKey || m_parentKey == "0" || !m_itemCache.containKey(m_parentKey)) {
                        m_item.parentKey = "0";
                        thisObj._sourceObj.push(m_item);
                    }
                    else {
                        if (m_itemCache.containKey(m_parentKey)) {
                            m_itemCache.getItem(m_parentKey).children.push(m_item);
                        }
                    }
                });
            }
            else {
                this._sourceObj = sourceObj;
            }

            return this;
        },

        /* 加载数据源，并填充控件 */
        loadSource: function () {
            this._ctrl.empty();
            this._keys = [];

            uicontrol.treeView.event.createCtrlContent.call(this, this._ctrl, this._sourceObj, this._dict, this._clickItemEvent);

            uicontrol.treeView.event._changeSize.call(this);
        },

        /* 获取对象 */
        getItem: function (key) {
            return this._dict.getItem(key);
        },

        /* 获取完整的路径 */
        getItemFullName: function (key) {
            var m_obj = this._dict.getItem(key);

            var m_nameObj = { name: m_obj.sourceItem.value };
            this._resecurFullName(m_obj.sourceItem.parentKey, m_nameObj);

            return m_nameObj.name;
        },
        _resecurFullName: function (parentKey, fullNameObj, isbreak) {
            if (!isbreak && parentKey && parentKey > 0) {
                var m_parentObj = this._dict.getItem(parentKey);
                fullNameObj.name = m_parentObj.sourceItem.value + "-" + fullNameObj.name;

                this._resecurFullName(m_parentObj.sourceItem.parentKey, fullNameObj, true);
            }
        },

        /* 获取文本值 */
        getTextValue: function (key, needParentTxt) {
            var m_obj = this._dict.getItem(key);
            if (m_obj) {

                var m_name = m_obj.sourceItem.value;

                if (needParentTxt && m_obj.sourceItem && m_obj.sourceItem.parentKey > 0) {
                    m_name = this._dict.getItem(m_obj.sourceItem.parentKey).sourceItem.value + "-" + m_name;
                }

                return m_name;
            }
            else {
                return "";
            }
        },

        selTvItem: function (key) {
            var obj = this._dict.getItem(key);

            this._ctrl.find('span[type=text]').removeClass('tv_bt_click');
            if (obj) {
                obj.textCtrl.addClass('tv_bt_click');
                this.selectedItem = obj.sourceItem;
            }
        },

        clearSelectedItem: function () {
            this.selectedItem = null;
            this._ctrl.find('span[type=text]').removeClass('tv_bt_click');
        },

        clickItem: function (key) {
            this._dict.getItem(key).textCtrl.click();
        },

        /* 添加子节点 */
        addChildItem: function (sourceObj) {
            uicontrol.treeView.event.createCtrlContent.call(this, this._ctrl, sourceObj, this._dict, this._clickItemEvent);
            uicontrol.treeView.event._changeSize.call(this);

            var parentObj = this._dict.getItem(sourceObj[0].parentKey);
            if (parentObj) {
                parentObj.sourceItem.children.push(sourceObj[0]);
                parentObj.childCtrl.css("display", "block");
            }
        },

        /* 修改子节点 */
        modifyChildItem: function (key, value) {
            var m_obj = this._dict.getItem(key);
            var m_textCtrl = m_obj.textCtrl;
            if (m_textCtrl) {
               if(this._constructDisplayTxt){
                    value = this._constructDisplayTxt(m_obj.sourceItem);
                }

                m_textCtrl.html(value);

                if(this.selectedItem){
                    this.selectedItem.value = value;
                }
            }
        },

        /* 删除子节点 */
        deleteChildItem: function (key) {

            var m_obj = this._dict.getItem(key);
            var m_containerCtrl = m_obj.containerCtrl;

            var m_parentCtrl = m_containerCtrl.parent();
            var m_liCtrl = m_parentCtrl.parent();

            if (m_containerCtrl) {

                m_obj.childCtrl.remove();
                m_containerCtrl.remove();

                if (m_obj.sourceItem.parentKey == 0) {
                    m_parentCtrl.remove();
                }

                this.selectedItem = null;

                uicontrol.treeView.event._changeSize.call(this);
            }
        },

        /* 清除所有数据 */
        clearAllItems: function () {
            this._ctrl.empty();
            this._keys = [];
        },

        /* 获取所有关键字 */
        getAllKeys: function () {
            return this._keys;
        },

        /* 获取选择的数据 */
        getCheckedValues: function () {
            var values = [];

            var chkCtrls = this._ctrl.find('input[name=' + this._ctrlId + 'check]');
            $.each(chkCtrls, function (i, item) {
                if (item.checked) {
                    values.push($(item).val());
                }
            });

            return values;
        },

        /* 设置选择的数据 */
        setCheckedValues: function (values) {
            var tempCache = new datastruct.dictionary();

            if (values) {
                $.each(values, function (i, item) {
                    tempCache.setItem(item, null);
                });
            }

            var m_thisObj = this;

            var chkCtrls = this._ctrl.find('input[name=' + this._ctrlId + 'check]');
            $.each(chkCtrls, function (i, item) {
                if (tempCache.containKey($(item).val())) {
                    item.checked = true;
                }
                else {
                    item.checked = false;
                }

                m_thisObj._selCheckBox(item, $(item).val());
            });
        },

        /* 清理选择的数据 */
        clearCheckedValues: function (values) {
            var tempCache = new datastruct.dictionary();

            if (values) {
                $.each(values, function (i, item) {
                    tempCache.setItem(item, null);
                });
            }

            var m_thisObj = this;

            var chkCtrls = this._ctrl.find('input[name=' + this._ctrlId + 'check]');
            $.each(chkCtrls, function (i, item) {
                if (tempCache.containKey($(item).val())) {
                    item.checked = false;
                }

                m_thisObj._selCheckBox(item, $(item).val());
            });
        },

        /* 选择复选框 */
        _selCheckBox: function (chbCtrl, key) {

            var itemObj = this._dict.getItem(key);
            var childCtrls = itemObj.childCtrl.find('input[name=' + this._ctrlId + 'check]');

            if(!this._isForbitSynChild){
                $.each(childCtrls, function (i, item) {
                    item.checked = chbCtrl.checked;
                });
            }

            /* 选中 */
            if (chbCtrl.checked) {
                this._recurSetParentCheckBox($(chbCtrl).attr("parentKey"), chbCtrl.checked);
            }
        },

        _recurSetParentCheckBox: function (parentKey, checked) {

            if (parentKey != "0") {
                var itemObj = this._dict.getItem(parentKey);
                var ctrl = itemObj.chooseCtrl;

                if (!ctrl[0].checked) {
                    ctrl[0].checked = checked;
                    this._recurSetParentCheckBox($(ctrl).attr("parentKey"), checked);
                }
            }
        }
    };
    /* 内部子对象 */
    uicontrol.treeView.Item = function () {

        /* 子对象的容器 Table */
        this.containerCtrl = null;

        /* 扩展图标 Span */
        this.expendCtrl = null;

        /* 现实文本 Span */
        this.textCtrl = null;

        /* 选择框 */
        this.chooseCtrl = null;

        /* 下层 Div */
        this.childCtrl = null;

        /* 延迟加载数据的标志 */
        this.loadSymbol = false;

        /* 数据对象 */
        this.sourceItem = null;
    };
    /* 事件机制 */
    uicontrol.treeView.event = {
        /* 创建控件的内容 */
        createCtrlContent: function (ctrl, sourceObj, dict, clickItemEvent) {

            /* uicontrol.treeView对象 */
            var thisObj = this;
            if (!sourceObj) {
                return;
            }

            $.each(sourceObj, function (i, sourceItem) {

                /* 填充关键字数组 */
                thisObj._keys.push(sourceItem.key);

                var itemCtrl = new uicontrol.treeView.Item();
                itemCtrl.containerCtrl = $("<table></table>");

                /* 扩展图标 */
                itemCtrl.expendCtrl = $("<span style='cursor: pointer;'></span>");
                /* 无子集 */
                if (sourceItem.children.length === 0 || thisObj._isCollapse) {
                    itemCtrl.expendCtrl.addClass("ui-icon ui-icon-circle-triangle-e");
                }
                else {
                    itemCtrl.expendCtrl.addClass("ui-icon ui-icon-circle-triangle-s");
                }
                itemCtrl.expendCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });

                /* 文本显示控件 */
                var m_txt = sourceItem.value;
                if(thisObj._constructDisplayTxt){
                    m_txt = thisObj._constructDisplayTxt(sourceItem);
                }

                itemCtrl.textCtrl = $("<span id='" + thisObj._ctrlId + "_sp_" + sourceItem.key + "' style='cursor: pointer; margin: 5px;' type=text>" + m_txt + "</span>");
                if (thisObj._dbClickEvent) {
                    itemCtrl.textCtrl.dblclick(thisObj._dbClickEvent);
                }

                /* 选择控件 */
                if (thisObj._operaModel && thisObj._operaModel == "checkmodel") {
                    itemCtrl.chooseCtrl = $("<input name='" + this._ctrlId + "check' type='checkbox' value='" + sourceItem.key + "' parentkey='" + sourceItem.parentKey + "' />");

                    itemCtrl.chooseCtrl.click(function () {
                        thisObj._selCheckBox(this, sourceItem.key);

                        if (clickItemEvent) {
                            clickItemEvent.call(this, sourceItem);
                        }
                    });
                }
                else {
                    /* 单击事件 */
                    itemCtrl.textCtrl.click(function () {
                        ctrl.find('span[type=text]').removeClass('tv_bt_click');
                        $(this).addClass('tv_bt_click');
                        thisObj.selectedItem = sourceItem;

                        if (clickItemEvent) {
                            clickItemEvent.call(sourceItem);
                        }
                    });
                }

                if(thisObj._isCollapse){
                    /* 下级控件 */
                    itemCtrl.childCtrl = $("<div style='margin-left:16px; display: none'></div>");
                }
                else{
                    /* 下级控件 */
                    itemCtrl.childCtrl = $("<div style='margin-left:16px;'></div>");
                }

                var m_expendCtrl = itemCtrl.expendCtrl;
                var m_childCtrl = itemCtrl.childCtrl;
                /* 扩展事件 */
                itemCtrl.expendCtrl.click(function () {
                    if (m_childCtrl.css("display") === "none") {

                        /* 存在子集数据 */
                        if (sourceItem.children.length > 0) {
                            m_expendCtrl.removeClass("ui-icon ui-icon-circle-triangle-e");
                            m_expendCtrl.addClass("ui-icon ui-icon-circle-triangle-s");
                            m_childCtrl.css("display", "block");
                            
                            if(thisObj._expandEvent){
                                thisObj._expandEvent();
                            }
                        }
                    }
                    else {
                        m_expendCtrl.removeClass("ui-icon ui-icon-circle-triangle-s");
                        m_expendCtrl.addClass("ui-icon ui-icon-circle-triangle-e");
                        m_childCtrl.css("display", "none");

                        if(thisObj._collapseEvent){
                            thisObj._collapseEvent();
                        }
                    }
                });

                var trCtrl = $("<tr></tr>");
                var tdCtrl = $("<td class='treeview-td'></td>");
                tdCtrl.append(itemCtrl.expendCtrl);
                trCtrl.append(tdCtrl);

                tdCtrl = $("<td class='treeview-td'></td>");
                tdCtrl.append(itemCtrl.chooseCtrl);
                tdCtrl.append(itemCtrl.textCtrl);
                trCtrl.append(tdCtrl);

                itemCtrl.containerCtrl.append(trCtrl);

                itemCtrl.sourceItem = sourceItem;

                dict.setItem(sourceItem.key, itemCtrl);

                if (dict.containKey(sourceItem.parentKey)) {

                    var parentObj = dict.getItem(sourceItem.parentKey);
                    var parentCtrl = parentObj.childCtrl;

                    parentCtrl.append(itemCtrl.containerCtrl).append(itemCtrl.childCtrl);
                }
                else {
                    if (thisObj._displayModel && thisObj._displayModel == "inline") {
                        var liCtrl = $("<li class='treeview-pdcli'></li>");
                        liCtrl.append(itemCtrl.containerCtrl).append(itemCtrl.childCtrl);
                        ctrl.append(liCtrl);

                        thisObj.nodeList.push(liCtrl);
                    }
                    else {
                        ctrl.append(itemCtrl.containerCtrl).append(itemCtrl.childCtrl);
                    }
                }

                /* 递归 */
                uicontrol.treeView.event.createCtrlContent.call(thisObj, ctrl, sourceItem.children, dict, clickItemEvent);
            });
        },

        /* 改变大小 */
        _changeSize: function () {
            var maxHeight = 0;
            $.each(this.nodeList, function () {
                var m_height = Number(this[0].offsetHeight);

                if (m_height > maxHeight) {
                    maxHeight = m_height;
                }
            });

            $.each(this.nodeList, function () {
                var m_height = Number(this[0].offsetHeight);

                if (m_height < maxHeight) {
                    $(this).css("min-height", maxHeight - 12);
                }
            });
        }
    };
    uicontrol.treeView.fn.init.prototype = uicontrol.treeView.fn;
    /*-------------------------------*/

    /* 
    -----单选或复选选择控件----- 
    */
    uicontrol.selectbox = function (ctrlId, type, clickEvent) {
        var obj = new uicontrol.selectbox.fn.init(ctrlId, type, clickEvent);
        return obj;
    };
    uicontrol.selectbox.fn = {

        /* 构造函数 */
        init: function (ctrlObj, type, clickEvent) {

            if (typeof (ctrlObj) == "string") {
                this.ctrlId = ctrlObj;
                this.ctrl = $("#" + ctrlObj);
            }
            else {
                this.ctrlId = ctrlObj.attr("id");
                this.ctrl = ctrlObj;
            }

            this.type = type;
            this.clickEvent = clickEvent;
        },

        /* 绑定数据源 */
        bindSource: function (source) {
            var htmlArr = [];
            var i = 0;
            var thisObj = this;
            this.ctrl.empty();

            var m_eventHtml = "";
            if (this.clickEvent) {
                m_eventHtml = " onchange='" + thisObj.clickEvent + ".call(this);'";
            }

            if (source) {
                $.each(source, function () {
                    var m_id = i + "rd_" + thisObj.ctrlId;
                    htmlArr.push("<li style='float: left; margin: 0px 10px 0px 0px'><input type='" + thisObj.type + "' id=" + m_id + " tag='" + this.value + "' value='" + this.key + "' name='rd" + thisObj.ctrlId + "' " + m_eventHtml + " />");
                    htmlArr.push("<span style='cursor: pointer;' onmouseover='commoncore.func.addFontStyle_b.call(this);' onmouseout='commoncore.func.removeFontStyle_b.call(this);' onclick='commoncore.func.triggerInput(\"" + m_id + "\");'>" + this.value + "</span></li>");

                    if (this.otherHtml) {
                        htmlArr.push(this.otherHtml);
                    }

                    i++;
                });
            }

            this.ctrl.append(htmlArr.join(""));
        },

        /* 获取选择项 */
        getSelectedItem: function () {

            var m_selectItems = [];
            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                var m_this = $(this);
                if (m_this.attr("checked")) {
                    m_selectItems.push(m_this.val());
                }
            });

            return m_selectItems;
        },

        /* 获取选择项文本 */
        getSelectedItemText: function () {

            var m_selectItems = [];
            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                var m_this = $(this);
                if (m_this.attr("checked")) {
                    m_selectItems.push(m_this.attr("tag"));
                }
            });

            return m_selectItems;
        },

        /* 获取选择项对象 */
        getSelectedItemObj: function () {

            var m_selectItems = [];
            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                var m_this = $(this);
                if (m_this.attr("checked")) {
                    m_selectItems.push({ key: m_this.val(), value: m_this.attr("tag") });
                }
            });

            return m_selectItems;
        },

        /* 设置选择项 */
        setSelectedItem: function (items) {

            var m_tempCache = new datastruct.dictionary();

            if (items) {
                $.each(items, function () {
                    m_tempCache.setItem(this.key, this.value);
                });
            }
            var thisObj = this;

            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                var m_this = $(this);
                if (m_tempCache.containKey(m_this.val())) {
                    m_this.attr("checked", true);
                }
                else {
                    if (thisObj.type == "checkbox") {
                        m_this.attr("checked", false);
                    }
                }
            });
        },

        /* 全选 */
        selectAll: function () {
            if (this.type == "checkbox") {
                $("input[name='rd" + this.ctrlId + "']").attr("checked", true);
            }
        },

        /* 反选 */
        unSelectAll: function () {
            if (this.type == "checkbox") {
                $("input[name='rd" + this.ctrlId + "']").attr("checked", false);
            }
        },

        /* 清理选项 */
        clear: function () {
            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                $(this).attr("checked", false);
            });
        }
    };
    uicontrol.selectbox.fn.init.prototype = uicontrol.selectbox.fn;
    /*-------------------------------*/

    /* 
    -----图片滑动控件----- 
    */
    uicontrol.pictureSlip = function (ctrl, param) {
        var obj = new uicontrol.pictureSlip.fn.init(ctrl, param);
        return obj;
    };
    uicontrol.pictureSlip.fn = {

        /* 构造函数 */
        init: function (ctrl, param) {

            if (typeof (ctrl) == "string") {
                this.ctrl = $("#" + ctrl);
            }
            else {
                this.ctrl = ctrl;
            }

            var m_mainArea = $("<div style='height: 390px;'></div>");
            this.mainView = $("<img src='/BZM/Css/Images/nopic.png' style='cursor: pointer; max-height: 390px; max-width: 390px;' onload='commoncore.func.positionCenterImg.call(this, 390);' onerror='commoncore.func.failLoadImg.call(this);' />");
            m_mainArea.append(this.mainView);
            this.ctrl.append(m_mainArea);

            this.slipArea = $("<ul class='picSlip'></ul>");
            this.ctrl.append(this.slipArea);

            this.psParam = {};

            this.picDialog = $("<div id='" + this.ctrl.attr("id") + "_dialog'></div>");
            var m_leftArea = $("<div class='bigPicSlipView'></div>");
            this.bigPicImg = $("<img style='max-width: 550px; max-height: 550px' onload='commoncore.func.positionCenterImg.call(this, 550);' onerror='commoncore.func.failLoadImg.call(this);' />");
            m_leftArea.append(this.bigPicImg);

            var m_rightArea = $("<div class='bigPicSlip'  style='height: 550px'></div>");

            this.imgCtrlsInBigPic = $("<ul></ul>");
            m_rightArea.append(this.imgCtrlsInBigPic);

            this.picDialog.append(m_leftArea);
            this.picDialog.append(m_rightArea);

            $(document).append(this.picDialog);
            this.bigPicDialog = new uicontrol.dialog(this.picDialog, "", { width: 925, position: param.position });
        },

        /* 绑定图片数据 */
        bindSource: function (pictureSource, pictureTitle) {

            this.pictureTitle = pictureTitle;
            this.pictureSource = pictureSource;

            var thisObj = this;

            this.currPicIndex = 0;

            if(pictureSource.standardPics && pictureSource.standardPics.length > 0) {
                this.mainView.attr("src", pictureSource.standardPics[0].src);
                this.mainView.attr("tag", pictureSource.bigPics[0].src);
            }
            else{
                this.mainView.attr("src", "");
                this.mainView.attr("tag", "");
            }
            this.mainView.click(function () {

                thisObj.imgCtrlsInBigPic.empty();
                $.each(thisObj.pictureSource.smallPics, function (i, item) {
                    var m_b_li = $("<li class='img-li'></li>");
                    var m_b_img = $("<img class='small-img' src='" + item.src + "' bigtag='" + thisObj.pictureSource.bigPics[i].src + "' tag='" + thisObj.pictureSource.standardPics[i].src + "' style='max-width: 60px; max-height: 60px;' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this);' />");
                    m_b_li.append(m_b_img);
                    m_b_li.hover(function () {
                        $(this).css("border-color", "#A60000");

                        thisObj.bigPicImg.attr("src", thisObj.pictureSource.bigPics[i].src);

                    }, uicontrol.pictureSlip.fn._picMoveOut);

                    thisObj.imgCtrlsInBigPic.append(m_b_li);
                });
                thisObj.bigPicDialog.setTitle(thisObj.pictureTitle);
                thisObj.bigPicImg.attr("src", $(this).attr("tag"));
                thisObj.bigPicDialog.show();
            });

            thisObj.slipArea.empty();
            this.imgCtrls = [];
            if (pictureSource.smallPics.length > 5) {
                var m_li = $("<li></li>");
                thisObj.lastArrowBt = $("<div class='last-arrow'></div>");
                thisObj.lastArrowBt.mousedown(function () {
                    thisObj.lastArrowBt.addClass("down-last-arrow");

                    if (thisObj.currPicIndex < 0) {
                        return;
                    }
                    thisObj.currPicIndex = thisObj.currPicIndex - 2;
                    if (thisObj.currPicIndex < 0) {
                        thisObj.currPicIndex = 0;
                    }

                    /* 改变图片 */
                    $.each(thisObj.imgCtrlList, function (i, item) {
                        if (i == 0) {
                            thisObj.mainView.attr("src", pictureSource.standardPics[thisObj.currPicIndex + i].src);
                            thisObj.mainView.attr("tag", pictureSource.bigPics[thisObj.currPicIndex + i].src);
                        }

                        if (pictureSource.smallPics[thisObj.currPicIndex + i]) {
                            item.attr("src", pictureSource.smallPics[thisObj.currPicIndex + i].src);
                            item.attr("tag", pictureSource.standardPics[thisObj.currPicIndex + i].src);
                            item.attr("bigtag", pictureSource.bigPics[thisObj.currPicIndex + i].src);
                        }
                    });
                });
                thisObj.lastArrowBt.mouseup(function () {
                    thisObj.lastArrowBt.removeClass("down-last-arrow");
                });
                m_li.append(thisObj.lastArrowBt);
                thisObj.slipArea.append(m_li);
            }

            thisObj.imgCtrlList = [];
            $.each(pictureSource.smallPics, function (i, item) {

                var m_li = $("<li class='img-li'></li>");
                var m_img = $("<img class='small-img' src='" + item.src + "' bigtag='" + pictureSource.bigPics[i].src + "' tag='" + pictureSource.standardPics[i].src + "' style='max-width: 60px; max-height: 60px;' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this);' />");
                m_li.append(m_img);

                thisObj.imgCtrlList.push(m_img);

                m_li.hover(function () { $(this).css("border-color", "#A60000"); }, uicontrol.pictureSlip.fn._picMoveOut);
                m_img.hover(function () {
                    thisObj.mainView.attr("src", $(this).attr("tag"));
                    thisObj.mainView.attr("tag", $(this).attr("bigtag"));
                });

                /* 显示当前图片 */
                if (i < thisObj.currPicIndex + 5 && i > thisObj.currPicIndex - 1) {
                    thisObj.imgCtrls.push(m_img);
                    thisObj.slipArea.append(m_li);
                }
            });

            if (pictureSource.smallPics.length > 5) {
                var m_li = $("<li></li>");
                thisObj.nextArrowBt = $("<div class='next-arrow'></div>");
                thisObj.nextArrowBt.mousedown(function () {
                    thisObj.nextArrowBt.addClass("down-next-arrow");

                    if (thisObj.currPicIndex + 5 > pictureSource.smallPics.length) {
                        return;
                    }
                    thisObj.currPicIndex = thisObj.currPicIndex + 2;
                    if (thisObj.currPicIndex + 5 > pictureSource.smallPics.length) {
                        thisObj.currPicIndex = pictureSource.smallPics.length - 5;
                    }

                    /* 改变图片 */
                    $.each(thisObj.imgCtrlList, function (i, item) {
                        if (i == 0) {
                            thisObj.mainView.attr("src", pictureSource.standardPics[thisObj.currPicIndex + i].src);
                            thisObj.mainView.attr("tag", pictureSource.bigPics[thisObj.currPicIndex + i].src);
                        }

                        if (pictureSource.smallPics[thisObj.currPicIndex + i]) {
                            item.attr("src", pictureSource.smallPics[thisObj.currPicIndex + i].src);
                            item.attr("tag", pictureSource.standardPics[thisObj.currPicIndex + i].src);
                            item.attr("bigtag", pictureSource.bigPics[thisObj.currPicIndex + i].src);
                        }
                    });
                });
                thisObj.nextArrowBt.mouseup(function () {
                    thisObj.nextArrowBt.removeClass("down-next-arrow");
                });
                m_li.append(thisObj.nextArrowBt);
                thisObj.slipArea.append(m_li);
            }

        },

        /* 图片鼠标离开 */
        _picMoveOut: function () {
            $(this).css("border-color", "#ccc");
        }
    };
    uicontrol.pictureSlip.fn.init.prototype = uicontrol.pictureSlip.fn;
    /*-------------------------------*/

})(window);

/* JQuery定时器 */
jQuery.fn.extend({
    everyTime: function (interval, label, fn, times) {
        return this.each(function () {
            jQuery.timer.add(this, interval, label, fn, times);
        });
    },
    oneTime: function (interval, label, fn) {
        return this.each(function () {
            jQuery.timer.add(this, interval, label, fn, 1);
        });
    },
    stopTime: function (label, fn) {
        return this.each(function () {
            jQuery.timer.remove(this, label, fn);
        });
    }
});

jQuery.extend({
    timer: {
        global: [],
        guid: 1,
        dataKey: "jQuery.timer",
        regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
        powers: {
            // Yeah this is major overkill... 
            'ms': 1,
            'cs': 10,
            'ds': 100,
            's': 1000,
            'das': 10000,
            'hs': 100000,
            'ks': 1000000
        },
        timeParse: function (value) {
            if (value == undefined || value == null)
                return null;
            var result = this.regex.exec(jQuery.trim(value.toString()));
            if (result[2]) {
                var num = parseFloat(result[1]);
                var mult = this.powers[result[2]] || 1;
                return num * mult;
            } else {
                return value;
            }
        },
        add: function (element, interval, label, fn, times) {
            var counter = 0;

            if (jQuery.isFunction(label)) {
                if (!times)
                    times = fn;
                fn = label;
                label = interval;
            }

            interval = jQuery.timer.timeParse(interval);

            if (typeof interval != 'number' || isNaN(interval) || interval < 0)
                return;

            if (typeof times != 'number' || isNaN(times) || times < 0)
                times = 0;

            times = times || 0;

            var timers = jQuery.data(element, this.dataKey) || jQuery.data(element, this.dataKey, {});

            if (!timers[label])
                timers[label] = {};

            fn.timerID = fn.timerID || this.guid++;

            var handler = function () {
                if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
                    jQuery.timer.remove(element, label, fn);
            };

            handler.timerID = fn.timerID;

            if (!timers[label][fn.timerID])
                timers[label][fn.timerID] = window.setInterval(handler, interval);

            this.global.push(element);

        },
        remove: function (element, label, fn) {
            var timers = jQuery.data(element, this.dataKey), ret;

            if (timers) {

                if (!label) {
                    for (label in timers)
                        this.remove(element, label, fn);
                } else if (timers[label]) {
                    if (fn) {
                        if (fn.timerID) {
                            window.clearInterval(timers[label][fn.timerID]);
                            delete timers[label][fn.timerID];
                        }
                    } else {
                        for (var fn in timers[label]) {
                            window.clearInterval(timers[label][fn]);
                            delete timers[label][fn];
                        }
                    }

                    for (ret in timers[label]) break;
                    if (!ret) {
                        ret = null;
                        delete timers[label];
                    }
                }

                for (ret in timers) break;
                if (!ret)
                    jQuery.removeData(element, this.dataKey);
            }
        }
    }
});

jQuery(window).bind("unload", function () {
    jQuery.each(jQuery.timer.global, function (index, item) {
        jQuery.timer.remove(item);
    });
});

/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Cloudream (cloudream@gmail.com). */
jQuery(function ($) {
    $.datepicker.regional['zh-CN'] = {
        closeText: '关闭',
        prevText: '&#x3c;上月',
        nextText: '下月&#x3e;',
        currentText: '今天',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
		'七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六',
		'七', '八', '九', '十', '十一', '十二'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        weekHeader: '周',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '年'
    };
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});