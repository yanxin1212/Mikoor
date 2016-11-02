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
            if (!key) {
                return;
            }

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

            /* json的字符串数据 */
            if (str.indexOf("{") > -1 || str.indexOf("[") > -1) {
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
                for (var i = 0, len = obj.length; i < len; i++) {
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
                if (obj.indexOf("'") > -1) {
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
                    if (m_value) {
                        ret.push(item + ":" + datastruct.convertion.objectToStr(m_value));
                    }
                }
                retStr = "{" + ret.join(",") + "}"; ;
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

            return m_dataSource;
        }
    }
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
                    valueObj = datastruct.convertion.strToObject(unescape(arrObjs[1]));
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
        saveToLocalStorage: function (cacheName, timelimit) {
            for (var i = 0; i < this._cacheStorage.count; i++) {
                var keyvalueItem = this._cacheStorage.getKeyValueItem(i);

                if (!cacheName || cacheName == keyvalueItem.key) {

                    var expireStr = "";
                    if (timelimit) {
                        var exp = new Date();
                        exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
                        expireStr = "expires=" + exp.toGMTString();
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

        language: "language",

        /* 设置运行参数 */
        setRunParam: function (param, pvalue) {
            var obj = { key: param, value: pvalue };
            cachestore.clientCacheHelper.setItem("RunSetting", cachestore.cacheStructEnum.dictionary, obj);

            cachestore.clientCacheHelper.saveToLocalStorage("RunSetting", true);
        },

        /* 获取运行参数 */
        getRunParam: function (param) {
            var pvalue = cachestore.clientCacheHelper.getItem("RunSetting", param);

            if (!pvalue) {
                cachestore.clientCacheHelper.readCacheData("RunSetting");
            }
            pvalue = cachestore.clientCacheHelper.getItem("RunSetting", param);
            return pvalue;
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
                    if (retObj.Error) {
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
                }
            });
        },

        /* 加载缓存数据 */
        loadCacheData: function (transferObj, bizExeContext) {
            var param = datastruct.convertion.objectToStr(transferObj);

            $.ajax({
                url: this._handlerUrl,
                type: "post",
                async: true,
                cache: true,
                data: { Param: param },
                beforeSend: this._beforeSendEvent,
                error: this._errorEvent,
                complete: this._completeEvent,
                success: function (data, textStates) {

                    var retObj = datastruct.convertion.strToObject(data);

                    /* 异常标志Error */
                    if (retObj.Error) {
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
                }
            });
        },

        /* 动态加载Javascript脚本 */
        loadScript: function (jsfile, successEvent) {
            $.ajax({
                url: jsfile,
                dataType: "script",
                cache: true,
                success: successEvent
            });
        },

        /* 上传文件 */
        uploadFile: function (fileForm, iframe, bizExeContext) {

            /* 发送前事件 */
            if (this._beforeSendEvent) {
                this._beforeSendEvent();
            }

            var thisObj = this;
            iframe.everyTime("3s", function () {
                var responseStr = cachestore.clientCacheHelper.getItemFromCookie("Response");

                if (responseStr) {
                    cachestore.clientCacheHelper.removeItemInCookie("Response");

                    var retObj = datastruct.convertion.strToObject(responseStr);
                    /* 异常标志Error */
                    if (retObj.Error) {
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

                    /* 成功处理后事件 */
                    if (thisObj._completeEvent) {
                        thisObj._completeEvent();
                    }

                    iframe.stopTime();
                }
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

            if (key == 39) {
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
    uicontrol.dialog = function (ctrl, title, layout, submitFunc) {
        var obj = new uicontrol.dialog.fn.init(ctrl, title, layout, submitFunc);
        return obj;
    };
    uicontrol.dialog.fn = {
        /* 初始化函数 */
        init: function (ctrl, title, layout, submitFunc) {

            var m_buttons = {};
            if (submitFunc) {
                m_buttons[mlm.C0024] = submitFunc;
                m_buttons[mlm.C0023] = function () { m_ctrl.dialog("close"); };
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
                    buttons: m_buttons
                });
            }
            else {
                m_ctrl = ctrl.dialog({
                    resizable: false,
                    height: layout.height,
                    width: layout.width,
                    title: title,
                    modal: true,
                    autoOpen: false,
                    closeOnEscape: false,
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
    }
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
        pageNumber: 25,

        /* 初始化函数 */
        init: function (ctrlId, paramObj) {

            this.dataSource = { page: 1, totalCount: 0, items: null };

            this.isPaging = paramObj.isPaging;

            /* 是否支持分页 */
            if (!paramObj.isPaging) {
                paramObj.height = paramObj.height + 30;
            }
            this.keyColumn = paramObj.keyColumn;
            this.autoSeq = paramObj.autoSeq;
            this.columns = [];


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

            this._ctrlId = ctrlId;
            this.tableGrid = $("#" + ctrlId);

            this.dataGrid = $("#" + ctrlId).flexigrid({
                colModel: this.columns,
                usepager: paramObj.isPaging,
                width: paramObj.width,
                height: paramObj.height,
                singleSelect: true, //仅允许选择单行
                resizable: false,
                striped: true,
                useRp: false,
                dataType: "json"
            });

            /* 是否支持分页 */
            if (this.isPaging) {
                this._createPagingCtrl();
            }
        },

        /* 绑定数据源 */
        bindDataSource: function (source) {

            if (!source) {
                this.dataGrid.flexAddData({ rows: null });
                return;
            }

            var thisObj = this;

            var m_dataSource = new datastruct.dictionary();

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

            this.dataSource.totalCount = source.TotalCount;
            this.dataSource.items = m_dataSource;

            /* 是否支持分页 */
            if (this.isPaging) {
                this.totalCount.text(this.dataSource.totalCount);
                /* 设置总页数 */
                this._setTotalPageCount();
            }
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
                this._setTotalPageCount();
            }

            if (this.autoSeq) {
                dataRow._Seq = this.dataSource.items.count + this.pageNumber * (this.dataSource.page - 1) + 1;
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

            dataRow._Seq = this.dataSource.items.getItem(key)._Seq;

            var m_rowhtml = $(this._createRow(key, dataRow));
            if (dataRow._Seq % 2 == 0) {
                m_rowhtml.addClass("erow");
            }

            this.dataSource.items.setItem(key, dataRow);

            this.tableGrid.find("tr[id=row" + key + "]").replaceWith(m_rowhtml);
        },

        /* 删除数据 */
        deleteData: function (key) {
            /* 是否支持分页 */
            if (this.isPaging) {
                this.dataSource.totalCount = this.dataSource.totalCount + this.pageNumber * (this.dataSource.page - 1) - 1;
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
                    if (seq > deletedItem.Seq) {
                        m_seqCell.text(seq - 1);
                        thisObj.dataSource.items.getItem(m_key).Seq = seq - 1;
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
                this.pageQueryHandler(this.dataSource.page, this.totolPageCount);
            }
        },

        /* 下一页 */
        goToNext: function () {
            var m_currPage = this.dataSource.page + 1;

            this.lastBt.show();
            if (m_currPage == this.totolPageCount) {
                this.nextBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.totolPageCount);
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

        /* 创建列内容 */
        _createCellContent: function (col, rowItem) {

            var m_value = "";
            var m_key = rowItem[this.keyColumn];

            /* 判断列是否需要调整 */
            if (!col.adjust) {
                if (col.name == "_Seq") {
                    m_value = "<span id='" + this._ctrlId + "_seq'>" + rowItem[col.name] + "</span>";
                }
                else {
                    m_value = rowItem[col.name];
                }
            }
            else {
                var m_cellvalue = [];
                /* 修改列构造函数 */
                if (col.modifiedFunc) {
                    m_cellvalue.push("<a href='javascript:void(\"0\")' class='bt-link' tag='" + m_key + "' onclick='" + col.modifiedFunc + ".call(this);'>修改</a>");
                }
                /* 删除列构造函数 */
                if (col.deletedFunc) {
                    m_cellvalue.push("<a href='javascript:void(\"0\")' class='bt-link' tag='" + m_key + "' onclick='" + col.deletedFunc + ".call(this);'>删除</a>");
                }
                /* 自定义列构造函数 */
                if (col.createCell) {
                    m_cellvalue.push(col.createCell(m_key, rowItem[col.name]));
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
                    m_td = "<td align='center' style='display: none'>";
                }
                m_row.push(m_td);
                m_row.push("<div style='width: " + (Number($(this)[0].offsetWidth) - 12) + "px ;text-align: center;'>" + m_value + "</div>");
                m_row.push("</td>");
            });
            m_row.push("</tr>")

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
                    if (this.pageQueryHandler) {
                        this.pageQueryHandler(this.dataSource.page, this.totolPageCount);
                    }
                }
            });

            this.totalCount = $("<span class='p-lable'>" + this.dataSource.totalCount + "</span>");
            this.nextBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0038 + "</a>");
            this.pageNum = $("<span class='p-lable'></span>");

            /* 设置总页数 */
            this._setTotalPageCount();

            var thisObj = this;
            /* 绑定分页事件 */
            this.lastBt.click(function () { thisObj.goToLast(); });
            this.nextBt.click(function () { thisObj.goToNext(); });

            pagingArea.append("<span>" + mlm.C0039 + "</span>");
            pagingArea.append(this.totalCount);
            pagingArea.append("<span class='p-totalcount'>" + mlm.C0040 + "</span>");
            this.lastBt.hide();
            pagingArea.append(this.lastBt);
            pagingArea.append(this.pageTxt);
            pagingArea.append("/");
            pagingArea.append(this.pageNum);
            pagingArea.append(this.nextBt);

            $(this.dataGrid[0].grid.pDiv).append(pagingArea);
        },

        /* 设置总页数 */
        _setTotalPageCount: function () {
            this.totolPageCount = parseInt(this.dataSource.totalCount / this.pageNumber);
            if (this.totolPageCount * this.pageNumber > this.dataSource.totalCount || this.totolPageCount * this.pageNumber == this.dataSource.totalCount) {
                this.pageNum.text(this.totolPageCount);
            }
            else {
                this.totolPageCount++;
                this.pageNum.text(this.totolPageCount);
            }

            if (this.totolPageCount == 1) {
                this.nextBt.hide();
                this.lastBt.hide();
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
            if (!$.trim(fileCtrl.val())) {
                pageframe.control.alertDialog.showAlertInfo(mlm.E0003);
                return;
            }

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
        init: function (ctrlId, paramObj, source) {

            this.keyColumn = paramObj.keyColumn;
            this.dataSource = { page: 1, totalCount: 0, items: new datastruct.dictionary() };
            this.constructTableFunc = paramObj.constructTableFunc;
            this.isPaging = paramObj.isPaging;
            this.pageQueryHandler = paramObj.pageQueryHandler;

            this.ctrl = $("#" + ctrlId);
            this.ctrl.addClass("simple-table");

            var m_class = "content";
            if (paramObj.contentClass) {
                m_class += m_class + " " + paramObj.contentClass;
            }
            this.contentCtrl = $("<div class='" + m_class + "'></div>");
            this.ctrl.append(this.contentCtrl);

            /* 绑定数据 */
            this.bindSource(source);
        },

        /* 绑定数据源 */
        bindSource: function (source) {

            if (!source) {
                return;
            }

            var thisObj = this;

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

            this.dataSource.page = source.page;
            this.dataSource.totalCount = source.TotalCount;

            /* 创建内容 */
            this._createContent();
        },

        /* 创建内容区域 */
        _createContent: function () {
            this.ulCtrl = $("<ul></ul>");

            var thisObj = this;
            var liItems = [];
            $.each(this.dataSource.items.arrValues, function () {
                var liCtrl = $("<li></li>");

                if (thisObj.constructTableFunc) {
                    var liTable = thisObj.constructTableFunc(this);
                    liCtrl.append(liTable);
                }
                thisObj.ulCtrl.append(liCtrl);
            });

            this.contentCtrl.empty();
            this.contentCtrl.append(this.ulCtrl);
            this.resize();

            /* 支持分页 */
            if (this.isPaging) {

                /* 初次创建 */
                if (!this.pagingCtrl) {
                    this.pagingCtrl = $("<div class='paging-frame'></div>");
                    this._createPagingCtrl();
                    this.ctrl.append(this.pagingCtrl);
                }
            }
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
                    if (this.pageQueryHandler) {
                        this.pageQueryHandler(this.dataSource.page, this.totolPageCount);
                    }
                }
            });

            this.totalCount = $("<span class='p-lable'>" + this.dataSource.totalCount + "</span>");
            this.nextBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0038 + "</a>");
            var pageNum = $("<span class='p-lable'></span>");

            /* 设置总页数 */
            this.totolPageCount = parseInt(this.dataSource.totalCount / this.pageNumber);
            if (this.totolPageCount * this.pageNumber > this.dataSource.totalCount || this.totolPageCount * this.pageNumber == this.dataSource.TotalCount) {
                pageNum.text(this.totolPageCount);
            }
            else {
                this.totolPageCount++;
                pageNum.text(this.totolPageCount);
            }

            var thisObj = this;
            /* 绑定分页事件 */
            this.lastBt.click(function () { thisObj.goToLast(); });
            this.nextBt.click(function () { thisObj.goToNext(); });

            pagingArea.append("<span>" + mlm.C0039 + "</span>");
            pagingArea.append(this.totalCount);
            pagingArea.append("<span class='p-totalcount'>" + mlm.C0040 + "</span>");
            this.lastBt.hide();
            pagingArea.append(this.lastBt);
            pagingArea.append(this.pageTxt);
            pagingArea.append("/");
            pagingArea.append(pageNum);
            pagingArea.append(this.nextBt);

            this.pagingCtrl.append(pagingArea);
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
                this.pageQueryHandler(this.dataSource.page, this.totolPageCount);
            }
        },

        /* 下一页 */
        goToNext: function () {
            var m_currPage = this.dataSource.page + 1;

            this.lastBt.show();
            if (m_currPage == this.totolPageCount) {
                this.nextBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.totolPageCount);
            }
        },

        /* 设置布局 */
        resize: function () {
            var m_ctrl_height = this.ctrl[0].offsetHeight;
            if (m_ctrl_height) {
                this.contentCtrl.css("height", this.isPaging ? m_ctrl_height - 33 : m_ctrl_height);
            }
            else {
                this.contentCtrl.css("height", this.ulCtrl.css("height"));
            }
        }
    };
    uicontrol.simpleTableList.fn.init.prototype = uicontrol.simpleTableList.fn;
    /*-------------------------------*/

    /* 
    -----分组列表控件----- 
    */
    uicontrol.groupList = function (ctrlId, constructItem, source) {
        var obj = new uicontrol.groupList.fn.init(ctrlId, constructItem, source);
        return obj;
    };
    uicontrol.groupList.fn = {

        /* 构造函数 */
        init: function (ctrlId, constructItem, source) {
            this.dataSource = source;

            this.ctrl = $("#" + ctrlId);
            this.ctrl.addClass("group-table");
            this.constructItem = constructItem;

            this._createGroupList();
        },

        /* 绑定数据 */
        bindSource: function (source) {
            this.dataSource = source;

            this._createGroupList();
        },

        /* 重新设置布局 */
        resize: function () {

            if (!this.itemCtrls) {
                return;
            }

            $.each(this.itemCtrls.arrValues, function () {
                this.resize();
            });
        },

        /* 创建分组列表 */
        _createGroupList: function () {

            if (!this.dataSource) {
                this.ctrl.empty();

                if (this.itemCtrls) {
                    this.itemCtrls.clear();
                }
                return;
            }

            /* 元素条目控件 */
            this.itemCtrls = new datastruct.dictionary();

            var thisObj = this;
            $.each(this.dataSource, function () {
                var listItem = $("<div class='list-item'></div>");
                var titleArea = $("<div class='title-area'></div>");
                var operaBt = $("<span class='ui-icon ui-icon-circle-arrow-s' style='cursor: pointer;'></span>");

                var m_groupId = this.groupId;
                operaBt.click(function () {
                    /* 未展开 */
                    if (!operaBt.isExpend) {
                        operaBt.removeClass("ui-icon ui-icon-circle-arrow-s");
                        operaBt.addClass("ui-icon ui-icon-circle-arrow-e");
                        operaBt.isExpend = true;

                        thisObj.itemCtrls.getItem(m_groupId).ctrl.hide();
                    }
                    else {
                        operaBt.removeClass("ui-icon ui-icon-circle-arrow-e");
                        operaBt.addClass("ui-icon ui-icon-circle-arrow-s");
                        operaBt.isExpend = false;

                        thisObj.itemCtrls.getItem(m_groupId).ctrl.show();
                    }
                });
                operaBt.hover(function () { operaBt.addClass("hover-bt"); }, function () { operaBt.removeClass("hover-bt"); });

                titleArea.append(operaBt);
                titleArea.append("<span>" + this.groupName + "</span>");

                listItem.append(titleArea);

                var m_tableCtrlId = "table" + this.groupId;
                listItem.append("<div id='" + m_tableCtrlId + "'></div>")

                thisObj.ctrl.append(listItem);

                /* 数据表 */
                var tableCtrl = new uicontrol.simpleTableList(m_tableCtrlId, { keyColumn: "BrandId", isPaging: false, constructTableFunc: thisObj.constructItem },
                                                            this.items);
                thisObj.itemCtrls.setItem(this.groupId, tableCtrl);
            });
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
            var m_innerframe = $("<div class=\"submitForm\"></div>");
            var m_table = $("<div class=\"submitForm-tr first-item last-item\">");
            this.txtCtrl = $("<span></span>");
            m_table.append(this.txtCtrl);
            m_innerframe.append(m_table);
            m_frame.append(m_innerframe);

            $(document).append(m_frame);

            this.dialog = new uicontrol.dialog(m_frame, mlm.C0042, { width: 700, height: 140 }, submitFunc);
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