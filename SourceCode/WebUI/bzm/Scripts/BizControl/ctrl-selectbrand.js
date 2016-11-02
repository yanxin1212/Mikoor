(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品品牌选择控件----- 
    */
    bizcontrol.selectbrand = function (ctrl) {
        var obj = new bizcontrol.selectbrand.fn.init(ctrl);
        return obj;
    };
    bizcontrol.selectbrand.fn = {

        /* 构造函数 */
        init: function (ctrl) {
            this.ctrl = ctrl;
            this.brandNameTxt = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });

            var thisObj = this;
            this.btSelect.click(function () { thisObj.openSelectFrm(); });
            this.brandNameTxt.change(function () { thisObj.inputBrandName($.trim($(this).val())); });

            this._brandDialog = $("<div style='display: none;'></div>");
            this._brandList = $("<div id='group_" + this.ctrl.attr("id") + "'></div>");

            this._brandDialog.append(this._brandList);
            this.ctrl.append(this.brandNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._brandDialog);

            this.brandSource = null;
            this.brandId = 0;
            this.brandName = "";
        },

        /* 打开商品品牌的选择窗体 */
        openSelectFrm: function () {

            var thisObj = this;
            if (!this.brandDialog) {
                this.brandDialog = new uicontrol.dialog(this._brandDialog, mlm.C0156, { width: 910, height: 540, position: ["auto", 50] }, function () { thisObj.selectBrand(); });
            }

            if (!this.brandSource || !this.brandList) {
                this.brandList = new uicontrol.groupList(this._brandList,
                                                              { groupKey: "BrandType_Id", groupName: "BrandTypeName", itemKey: "Brand_Id", seqProp: "Seq",
                                                                  constructItemFunc: bizcontrol.selectbrand.fn.constructBrandItem
                                                              });

                var m_brand = new pdm.brand();
                m_brand.getAllBrands(function (brands) {
                    thisObj.brandSource = brands;
                    thisObj.brandList.bindSource(brands);

                    var m_lis = thisObj._brandList.find("li");
                    m_lis.css("cursor", "pointer");
                    $.each(m_lis, function () {
                        var m_liCtrl = $(this);
                        m_liCtrl.hover(function () { m_liCtrl.css("border-color", "#800000"); }, function () { m_liCtrl.css("border-color", "#c0c0c0"); });
                        m_liCtrl.click(function () {
                            m_lis.css("background-color", "#FFFFFF");
                            m_lis.css("color", "#222222");

                            m_liCtrl.css("background-color", "#F0F0F0");
                            m_liCtrl.css("color", "#800000");

                            thisObj.selectedBrand = { brandId: m_liCtrl.find("input[tag='brandId']").val(), brandName: m_liCtrl.find("span[tag='brandName']").html() };
                        });
                        m_liCtrl.dblclick(function () { thisObj.selectBrand(); });

                        if (thisObj.brandId == m_liCtrl.attr("tag")) {
                            m_liCtrl.css("background-color", "#F0F0F0");
                            m_liCtrl.css("color", "#800000");
                        }
                    });

                    thisObj.brandLiItem = m_lis;
                });
            }
            else {
                this.brandLiItem.css("background-color", "#FFFFFF");
                this.brandLiItem.css("color", "#222222");

                if (this.brandId) {
                    var selectedLi = this._brandList.find("li[tag='" + this.brandId + "']");
                    selectedLi.css("background-color", "#F0F0F0");
                    selectedLi.css("color", "#800000");
                }
            }

            this.brandDialog.show();
        },

        /* 创建品牌单元格 */
        constructBrandItem: function (brand) {
            var m_html = [];
            m_html.push("<img src='" + brand.LogoUrl + "' style='height: 60px' />");

            var m_website = "";
            if (brand.WebSite.indexOf("http://") > -1) {
                m_website = brand.WebSite;
            }
            else {
                m_website = "http://" + brand.WebSite;
            }

            m_html.push("<div class='brand-item'><span tag='brandName'>" + brand.BrandName.replace('-', '<br>') + "</span><input type='hidden' tag='brandId' value='" + brand.Brand_Id + "' /></div>");

            var brand = $(m_html.join(""));

            return brand;
        },

        /* 选择商品品牌 */
        selectBrand: function () {
            if (!this.selectedBrand) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C0157);
                return;
            }

            this.brandId = this.selectedBrand.brandId;
            this.brandName = this.selectedBrand.brandName;

            this.brandNameTxt.val(this.brandName.replace("<br>", "-"));
            this.brandDialog.close();
        },

        /* 输入商品品牌名称 */
        inputBrandName: function (brandName) {

            if (!brandName) {
                this.clear();
                return;
            }

            var thisObj = this;
            if (!this.brandJson) {
                var m_brand = new pdm.brand();
                m_brand.getAllBrands(function (source) {
                    thisObj.brandSource = source;
                    thisObj.brandJson = datastruct.convertion.tableToJson(source);
                    thisObj._getBrand(brandName);
                });
            }
            else {
                this._getBrand(brandName);
            }
        },

        /* 设置商品品牌 */
        setBrand: function (brand) {
            this.brandId = brand.Brand_Id;
            this.brandName = brand.BrandName;
            this.brandNameTxt.val(this.brandName);
        },

        /* 获取商品品牌对象 */
        _getBrand: function (brandName) {

            var m_brand = null;
            $.each(this.brandJson, function () {
                if (this.BrandName.indexOf(brandName) > -1) {
                    m_brand = this;
                    return false;
                }
            });

            if (!m_brand) {
                pageframe.control.alertDialog.showAlertInfo(brandName + mlm.C0158);
                this.clear();
                return;
            }

            this.brandId = m_brand.Brand_Id;
            this.brandName = m_brand.BrandName;

            this.brandNameTxt.val(this.brandName);
        },

        /* 清除控件值 */
        clear: function () {
            this.brandId = null;
            this.brandName = null;
            this.brandNameTxt.val("");
            this.selectedBrand = null;
        }
    };
    bizcontrol.selectbrand.fn.init.prototype = bizcontrol.selectbrand.fn;
    /*-------------------------------*/

})(window);