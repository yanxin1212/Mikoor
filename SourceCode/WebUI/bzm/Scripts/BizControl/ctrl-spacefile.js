(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----空间文件选择控件----- 
    */
    bizcontrol.spacefile = function (ctrlId, usedFor, selectedEvent) {
        var obj = new bizcontrol.spacefile.fn.init(ctrlId, usedFor, selectedEvent);
        return obj;
    };
    bizcontrol.spacefile.fn = {

        /* 构造函数 */
        init: function (ctrlId, usedFor, selectedEvent) {

            var m_this = this;

            this.ctrlId = ctrlId;
            this.usedFor = usedFor;
            this.selectedEvent = selectedEvent;
            this.selecteditems = new datastruct.dictionary();

            this.ctrl = $("<div style='display: none; '></div>");

            var m_operaContainer = $("<div class='submitForm spacefile-container'></div>");
            var m_operaTr = $("<div class='submitForm-tr first-item last-item'></div>");

            this.queryDepthCtrl = $("<select class='dropdown-list depthoption'></select>");
            this.keywordCtrl = $("<input type='text' class='text-long-input' onkeypress='uicontrol.func.checkInput(event);' />");
            var m_btQuery = $("<input type='button' class='normal-bt query-bt' value='" + mlm.C0643 + "' />");
            m_btQuery.click(function () {
                m_this.keyword = $.trim(m_this.keywordCtrl.val());
                m_this.fileSpaceFrm.spaceFilePage = 1;

                var m_queryDepth = m_this.queryDepthCtrl.val();
                if (m_queryDepth == "3") {
                    m_this.fileSpaceFrm.fileservicespace_dir_id = null;
                }
                m_this.queryDepth = m_queryDepth;

                m_this.fileList.bindSource(null);
                m_this.querySpaceFile();
            });
            m_btQuery.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

            m_operaTr.append(this.queryDepthCtrl);
            m_operaTr.append(this.keywordCtrl);
            m_operaTr.append(m_btQuery);

            if (this.usedFor == "1") {
                this.frmTitle = mlm.C0665;

                var m_btSelect = $("<input type='button' class='normal-bt' value='" + mlm.C0664 + "' />");
                m_btSelect.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
                m_btSelect.click(function () {
                    var m_files = m_this.selecteditems.arrValues;

                    if (m_files.length == 0) {
                        pageframe.control.alertDialog.showAlertInfo(mlm.C0666);
                        return;
                    }

                    if (m_this.selectedEvent) {
                        m_this.selectedEvent(m_files);
                    }

                    m_this.fileSpaceFrm.close();
                });
                m_operaTr.append(m_btSelect);
            }
            else {
                this.frmTitle = mlm.C0644;
            }

            m_operaContainer.append(m_operaTr);

            this.fileListCtrl = $("<div class='filelist'></div>");
            m_operaContainer.append(this.fileListCtrl);

            var m_moreContainer = $("<div class='more-container'></div>");
            var m_moreTr = $("<div class='more-tr'></div>");
            this.btQueryMore = $("<span class='bt-morepics'></span>");
            this.btQueryMore.hover(function () { $(this).addClass("over-load-bt"); }, function () { $(this).removeClass("over-load-bt"); });
            this.btQueryMore.click(function () {
                m_this.fileSpaceFrm.spaceFilePage++;
                m_this.querySpaceFile();
            });

            m_moreTr.append(this.btQueryMore);
            m_moreContainer.append(m_moreTr);
            m_operaContainer.append(m_moreContainer);

            this.viewCtrl = $("<div style='display: none; '></div>");
            var m_viewContainer = $("<div class='spacefile-view'>");
            this.dvPicUrl = $("<div class='picurl'></div>");
            this.imgPic = $("<img onerror='commoncore.func.failLoadImg.call(this);' />");

            m_viewContainer.append(this.dvPicUrl);
            m_viewContainer.append(this.imgPic);
            this.viewCtrl.append(m_viewContainer);

            this.ctrl.append(m_operaContainer);
            $(document).append(this.ctrl);
            $(document).append(this.viewCtrl);
        },

        /* 打开窗体 */
        openFrm: function (key, prodcodedirs) {

            if (!this.fileSpaceFrm) {
                this.fileSpaceFrm = new uicontrol.dialog(this.ctrl, this.frmTitle, { width: 1135, position: ["auto", 15] });

                this.queryDepthCtrl.append("<option value='1'>" + mlm.C0645 + "</option>");
                this.queryDepthCtrl.append("<option value='2'>" + mlm.C0646 + "</option>");
                this.queryDepthCtrl.append("<option value='3'>" + mlm.C0647 + "</option>");

                var m_thisobj = this;

                var m_viewFunc = function () {
                    if (!m_thisobj.vewPictureFrm) {
                        m_thisobj.vewPictureFrm = new uicontrol.dialog(m_thisobj.viewCtrl, mlm.C0648, { width: 1000, position: ["auto", 25] });
                    }

                    var m_key = $(this).attr("tag");
                    var m_obj = m_thisobj.fileList.getItem(m_key);

                    var m_root = "";
                    var m_url = "";
                    if (m_obj.DirId == "-1") {
                        m_root = window.webLocation + m_obj.RootPath + "/" + m_obj.DirPath + "/";
                    }
                    else {
                        m_root = m_obj.WebAddress + m_obj.RootPath + "/ecm-database/" + m_obj.DirPath + "/";
                    }

                    m_thisobj.dvPicUrl.empty();
                    var m_filename = m_root + m_obj.FileName;
                    var m_picUrl = $("<div style='cursor: pointer;' tag='" + m_filename + "'>" + m_filename + "</div>");
                    m_picUrl.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });

                    m_thisobj.dvPicUrl.append(m_picUrl);
                    m_picUrl.addClass("lb-light-alert");

                    var m_150_picUrl;
                    var m_800_picUrl;

                    var m_clickviewFunc = function () {

                        m_picUrl.removeClass("lb-light-alert");

                        if (m_150_picUrl) {
                            m_150_picUrl.removeClass("lb-light-alert");
                        }
                        if (m_800_picUrl) {
                            m_800_picUrl.removeClass("lb-light-alert");
                        }

                        $(this).addClass("lb-light-alert");

                        m_thisobj.imgPic.attr("src", $(this).attr("tag"));
                    };
                    m_picUrl.click(m_clickviewFunc);

                    if (m_obj.Has150x150 == "1") {
                        var m_150_filename = m_root + "150x150/" + m_obj.FileName;
                        m_150_picUrl = $("<div style='cursor: pointer;' tag='" + m_150_filename + "'>" + m_150_filename + " (150x150" + mlm.C0667 + ")</div>");
                        m_150_picUrl.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
                        m_150_picUrl.click(m_clickviewFunc);

                        m_thisobj.dvPicUrl.append(m_150_picUrl);
                    }


                    if (m_obj.Has800x800 == "1") {
                        m_800_filename = m_root + "800x800/" + m_obj.FileName;
                        m_800_picUrl = $("<div style='cursor: pointer;' tag='" + m_800_filename + "'> " + m_800_filename + " (800x800" + mlm.C0667 + ")</div>");
                        m_800_picUrl.hover(function () { commoncore.func.addFontStyle_b.call(this); }, function () { commoncore.func.removeFontStyle_b.call(this); });
                        m_800_picUrl.click(m_clickviewFunc);

                        m_thisobj.dvPicUrl.append(m_800_picUrl);
                    }

                    m_thisobj.imgPic.attr("src", m_filename);

                    m_thisobj.vewPictureFrm.show();
                };

                this.fileList = new uicontrol.simpleTableList(this.fileListCtrl,
                                                                { keyColumn: "Id",
                                                                    isPaging: false,
                                                                    constructTableFunc: this.constructFileTable,
                                                                    itemCss: "spacefile-item",
                                                                    events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                        onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                        onclick: function () {

                                                                            var m_this = this;
                                                                            var m_jq_this = $(this);
                                                                            var m_key = m_jq_this.attr("tag");
                                                                            var m_obj = m_thisobj.fileList.getItem(m_key);

                                                                            this._clickevent = setTimeout(function () {
                                                                                if (!m_this.dblclick) {
                                                                                    if (!m_this.selected) {
                                                                                        m_jq_this.css("background-color", "#F0F0F0");
                                                                                        m_jq_this.css("color", "#800000");

                                                                                        if (m_obj.FileType == "2") {
                                                                                            m_thisobj.selecteditems.setItem(m_key, m_obj);
                                                                                        }

                                                                                        m_this.selected = true;
                                                                                    }
                                                                                    else {
                                                                                        m_jq_this.css("background-color", "#FFFFFF");
                                                                                        m_jq_this.css("color", "#222222");

                                                                                        if (m_obj.FileType == "2") {
                                                                                            m_thisobj.selecteditems.removeItem(m_key);
                                                                                        }

                                                                                        m_this.selected = null;
                                                                                    }
                                                                                }

                                                                                m_this.dblclick = null;
                                                                            }, 200);

                                                                            return false;
                                                                        },
                                                                        ondblclick: function () {

                                                                            this.dblclick = true;
                                                                            clearTimeout(this._clickevent);
                                                                            this._clickevent = null;

                                                                            var m_key = $(this).attr("tag");
                                                                            var m_obj = m_thisobj.fileList.getItem(m_key);
                                                                            if (m_obj.FileType == "2") {
                                                                                m_viewFunc.call(this);
                                                                            }
                                                                            else {
                                                                                m_thisobj.keywordCtrl.val("");
                                                                                m_thisobj.keyword = "";

                                                                                if (m_key.indexOf("space") == 0) {
                                                                                    m_thisobj.fileSpaceFrm.fileservicespace_id = m_key.replace("space", "");
                                                                                    m_thisobj.fileSpaceFrm.fileservicespace_dir_id = 0;
                                                                                    m_thisobj.fileSpaceFrm.filespacename = m_obj.FileName;
                                                                                }
                                                                                else {
                                                                                    m_thisobj.fileSpaceFrm.fileservicespace_id = m_obj.FileServiceSpace_Id;
                                                                                    m_thisobj.fileSpaceFrm.fileservicespace_dir_id = m_key;
                                                                                    m_thisobj.fileSpaceFrm.prodcode = m_obj.FileName;
                                                                                }

                                                                                m_thisobj.fileSpaceFrm.spaceFilePage = 1;
                                                                                m_thisobj.queryDepth = "1";
                                                                                m_thisobj.queryDepthCtrl.val(m_thisobj.queryDepth);

                                                                                m_thisobj.querySpaceFile();
                                                                            }

                                                                            return false;
                                                                        }
                                                                    }
                                                                });
            }

            this.fileSpaceFrm.prodcodedirs = prodcodedirs;
            this.fileSpaceFrm.rootspace_id = key;
            this.fileSpaceFrm.fileservicespace_id = key;
            this.fileSpaceFrm.fileservicespace_dir_id = 0;
            this.fileSpaceFrm.spaceFilePage = 1;
            this.keyword = "";
            this.keywordCtrl.val("");

            this.queryDepth = "1";
            this.queryDepthCtrl.val(this.queryDepth);

            this.querySpaceFile();
        },

        /* 查询空间图片 */
        querySpaceFile: function () {
            var m_fileservicespace_dir_id = null;
            if (this.fileSpaceFrm.fileservicespace_dir_id) {
                m_fileservicespace_dir_id = this.fileSpaceFrm.fileservicespace_dir_id.toString().replace("dir", "");
            }

            var m_this = this;
            var m_fileservicespace = new sys.fileservicespace();
            m_fileservicespace.FileServiceSpace_Id = this.fileSpaceFrm.fileservicespace_id;
            m_fileservicespace.querySpaceFiles(m_fileservicespace_dir_id, this.keyword, this.queryDepth, this.fileSpaceFrm.prodcode, this.usedFor, this.fileSpaceFrm.prodcodedirs, this.fileSpaceFrm.spaceFilePage, 47, function (retTable) {

                m_this.selecteditems.clear();

                if (m_this.fileSpaceFrm.spaceFilePage == 1) {
                    m_this.fileList.bindSource([]);
                }

                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                m_fileservicespace_dir_id = Number(m_fileservicespace_dir_id);
                if (((m_this.fileSpaceFrm.fileservicespace_id && m_this.fileSpaceFrm.fileservicespace_id > 0) &&
                        (!m_fileservicespace_dir_id || m_fileservicespace_dir_id == 0) && !m_this.fileSpaceFrm.rootspace_id)
                        || m_fileservicespace_dir_id < 0) {
                    var m_space = {};
                    m_space.Id = "0";
                    m_space.DirId = "0";
                    m_space.FileServiceSpace_Id = "0";
                    m_space.FileName = "......";
                    m_space.FileType = "1";
                    m_this.fileList.addData(m_space);

                    if (m_fileservicespace_dir_id < 0) {
                        m_this.fileSpaceFrm.setTitle(m_this.frmTitle + "(" + m_this.fileSpaceFrm.prodcode + ")");
                    }
                    else {
                        m_this.fileSpaceFrm.setTitle(m_this.frmTitle + "(" + m_this.fileSpaceFrm.filespacename + ")");
                    }
                }
                else {
                    m_this.fileSpaceFrm.setTitle(m_this.frmTitle);
                }

                $.each(m_jsonobjs, function () {

                    if (m_this.fileSpaceFrm.spaceFilePage == 1 && this.Id == m_fileservicespace_dir_id) {
                        this.Id = "dir" + this.DirId;
                        m_this.fileSpaceFrm.setTitle(m_this.frmTitle + "(" + (m_this.fileSpaceFrm.filespacename ? m_this.fileSpaceFrm.filespacename + "//" : "") + (this.DirPath ? this.DirPath + "//" : "") + this.FileName + ")");
                        this.FileName = "......";
                    }
                    else {
                        if (this.FileType == "1") {
                            this.Id = "dir" + this.Id;
                        }
                        else if (this.FileType == "2") {
                            this.Id = "file" + this.Id;
                        } else {
                            this.Id = "space" + this.Id;
                        }
                    }

                    m_this.fileList.addData(this);
                });

                var m_totalcount = Number(retTable.TotalCount);
                var m_currcount = m_this.fileList.dataSource.items.arrValues.length;
                if (m_totalcount > m_currcount) {
                    m_this.btQueryMore.show();
                    m_this.btQueryMore.text(mlm.C0649 + "(" + m_currcount + "/" + m_totalcount + ")");
                }
                else {
                    m_this.btQueryMore.hide();
                }

                m_this.fileSpaceFrm.show();
            });
        },

        /* 构建图片元素 */
        constructFileTable: function (dataItem) {
            var m_picKey = dataItem.Id;

            var m_picUrl;
            var m_filename = dataItem.FileName;
            if (dataItem.FileType == "2") {
                if (dataItem.DirPath) {
                    if (dataItem.DirId == "-1") {
                        m_picUrl = window.webLocation + dataItem.RootPath + "/" + dataItem.DirPath + "/" + dataItem.FileName;
                    }
                    else {
                        m_picUrl = dataItem.WebAddress + dataItem.RootPath + "/ecm-database/" + dataItem.DirPath + "/" + dataItem.FileName;
                    }
                }
                else {
                    m_picUrl = dataItem.WebAddress + dataItem.RootPath + "/ecm-database/" + dataItem.FileName;
                }
            }
            else if (dataItem.FileType == "1") {
                if (m_filename == "......") {
                    m_picUrl = window.webLocation + "BZM/Css/Images/upfile.jpg";
                }
                else {
                    m_picUrl = window.webLocation + "BZM/Css/Images/filedir.jpg";
                }
            }
            else {
                m_picUrl = window.webLocation + "BZM/Css/Images/fileserver.jpg";
            }

            var m_ctrl = $("<div></div>");
            var m_container = $("<div class='item'></div>");
            var m_img = $("<img src='" + m_picUrl + "' class='pic-item' onload='commoncore.func.positionCenterImg.call(this);' onerror='commoncore.func.failLoadImg.call(this);' tag='" + m_picKey + "' />");
            m_container.append(m_img);

            var m_len = m_filename.getBytesCount();
            if (m_len > 30) {
                m_filename = m_filename.substringByBytes(30) + "...";
            }

            var m_name = $("<div id='lbFileName_" + m_picKey + "' class='name-item' tag='" + dataItem.FileName + "'>" + m_filename + "</div>");
            if (m_len > 30) {
                m_name.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            }

            m_ctrl.append(m_container);
            m_ctrl.append(m_name);

            m_ctrl.hover(function () { m_ctrl.css("border-color", "#800000"); }, function () { m_ctrl.css("border-color", "#c0c0c0"); });

            return m_ctrl;
        },

        /* 图片加载失败事件 */
        failLoadImg: function () {
            commoncore.func.failLoadImg.call(this);

            $("#lbFileName_" + $(this).attr("tag")).text(mlm.C0650);
        },

        /* 根据关键字查询 */
        querySpaceFileByKeyword: function () {
            this.keyword = $.trim(this.keywordCtrl.val());
            this.viewfileSpaceFrm.spaceFilePage = 1;

            var m_queryDepth = this.queryDepthCtrl.val();
            if (m_queryDepth == "3") {
                this.viewfileSpaceFrm.fileservicespace_dir_id = null;
            }
            this.queryDepth = m_queryDepth;

            this.fileList.bindSource(null);
            this.querySpaceFile();
        }
    };
    bizcontrol.spacefile.fn.init.prototype = bizcontrol.spacefile.fn;
    /*-------------------------------*/

})(window);