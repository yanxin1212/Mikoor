/* 页面变量 */
window.pageVariable = {};

/* 初始化界面 */
function initPage() {

    var m_saleorder_id = $.getUrlVar("saleorder");

    var m_contentctrl = $("#dvPrint");

    var m_syskeyparam = new spm.syskeyparam();
    m_syskeyparam.getAllPrintTemplate(function (printtemplates) {

        var m_jsonobjs = datastruct.convertion.tableToJson(printtemplates);
        var m_templatedict = new datastruct.dictionary();
        $.each(m_jsonobjs, function () {
            m_templatedict.setItem(this.SysPrintTemplate_Id, this);
        });

        var m_saleorder = new sm.saleorder();
        m_saleorder.SaleOrder_Id = m_saleorder_id;
        m_saleorder.getSaleOrderForPrint(function (saleorders) {
            $.each(saleorders, function () {
                var m_sysprinttemplate_id = this.OtherProps.SysPrintTemplate_Id;

                var m_printtemplate = m_templatedict.getItem(m_sysprinttemplate_id);
                if (m_printtemplate) {
                    var m_content = m_printtemplate.Content;
                    m_content = m_content.replaceAll("@KEY@", this.SaleOrder_Id);

                    m_contentctrl.append(m_content);

                    var m_currsymbol = this.OtherProps.CurrSymbol;

                    $("#lbSOCode_" + this.SaleOrder_Id).text(this.SOCode);
                    $("#lbCustomerId_" + this.SaleOrder_Id).text(this.OtherProps.CustName);
                    $("#lbEmail_" + this.SaleOrder_Id).text(this.OtherProps.Email);
                    $("#lbTel_" + this.SaleOrder_Id).text(this.OtherProps.RvTel);
                    $("#lbAddress_" + this.SaleOrder_Id).html(commoncore.func.showSpecialChar(getRvAddressForView(this.OtherProps)));
                    $("#lbTotalPrice_" + this.SaleOrder_Id).html(commoncore.func.getCurrHtml(m_currsymbol, this.TotalPrice));

                    var m_productList = null;
                    if (m_sysprinttemplate_id == 2) {
                        m_productList = new uicontrol.tableList("productList_" + this.SaleOrder_Id,
                                     { autoSeq: false,
                                         height: 270,
                                         keyColumn: "SO_Product_Id",
                                         columns: [{ display: "序号", name: "Seq", width: 35, align: 'center' },
                                                   { display: "商品", name: "Description", width: 520, align: 'left' },
                                                   { display: "数量", name: "Qty", width: 50, align: 'right' },
                                                   { display: "单价", name: "Price", width: 75, align: 'right', adjust: true, createCell: constructPriceCell}]
                                     });
                    }
                    else {
                        m_productList = new uicontrol.tableList("productList_" + this.SaleOrder_Id,
                                     { autoSeq: false,
                                         height: 280,
                                         keyColumn: "SO_Product_Id",
                                         columns: [{ display: "Seq", name: "Seq", width: 35, align: 'center' },
                                                   { display: "Description", name: "Description", width: 520, align: 'left' },
                                                   { display: "Qty", name: "Qty", width: 50, align: 'right' },
                                                   { display: "Price", name: "Price", width: 75, align: 'right', adjust: true, createCell: constructPriceCell}]
                                     });
                    }
                    var m_i = 1;

                    var m_gifts = new datastruct.dictionary();
                    var m_soproducts = datastruct.convertion.strToObject(this.ProductJson);
                    $.each(m_soproducts, function () {
                        var m_proditem = {};
                        m_proditem.Seq = m_i;
                        m_proditem.SO_Product_Id = m_i;
                        m_i++;
                        m_proditem.Qty = this.Qty;
                        m_proditem.CurrSymbol = m_currsymbol;
                        m_proditem.Price = this.SalePrice;
                        m_proditem.Description = this.ProdCode + " - " + this.ProdName;
                        if (this.SkuProps) {
                            m_proditem.Description += " - [" + this.SkuProps + "]";
                        }

                        if (this.GiftName) {
                            var m_gift = m_gifts.getItem(this.GiftName);
                            if (!m_gift) {
                                m_gifts.setItem(this.GiftName, { Description: this.GiftName, Qty: 1, Price: commoncore.func.getCurrHtml(m_currsymbol, this.Price) });
                            }
                            else {
                                m_gift.Qty = Number(m_gift.Qty) + 1;
                            }
                        }

                        m_productList.addData(m_proditem.SO_Product_Id, m_proditem);
                    });

                    $.each(m_gifts.arrValues, function () {
                        this.Seq = m_i;
                        this.SO_Product_Id = m_i;
                        m_i++;
                        this.Description = "[Gift] - " + this.Description;
                        m_productList.addData(this.SO_Product_Id, this);
                    });

                    var m_expressobj = {};
                    m_expressobj.Seq = m_i;
                    m_expressobj.SO_Product_Id = m_i;
                    m_expressobj.Qty = "";
                    m_expressobj.Description = "[Express Service] - " + this.OtherProps.ExpressServiceName;
                    m_expressobj.CurrSymbol = m_currsymbol;
                    m_expressobj.Price = this.OtherProps.ExpServicePrice;
                    m_productList.addData(m_i, m_expressobj);

                    m_contentctrl.append("<div style='width: 100%; height: 10px'></div>")
                }
            });
        });
    });
}

/*  */
function constructPriceCell(key, cellValue) {
    return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
}
/* 获取发货地址 */
function getRvAddressForView(obj) {
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
}

/* 填充语言资源 */
function fillPageLanRes() {
}