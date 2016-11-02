using System;
using System.Collections.Generic;
using System.Web;
using ArkEC.SEMs.BizObject.SYS;
using System.Text;
using ArkEC.SEMs.Business.SYS;
using ArkEC.CoreCom.Datastruct.Exceptions;
using ArkEC.CoreCom.WebHandler;

namespace ArkEC.SEMs.WebUI.bzm
{
    /// <summary>
    /// Summary description for MKAjaxHandler
    /// </summary>
    public class MKAjaxHandler : IHttpHandler
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            string responseStr = "";
            try
            {
                responseStr = BizHandler.HandlerRequest(context);
            }
            catch (Exception err)
            {
                string message = err.Message;
                if (err.InnerException != null)
                {
                    message = err.InnerException.Message;
                }
                BusinessException bizErr = err as BusinessException;
                if (err.InnerException != null && bizErr == null)
                {
                    bizErr = err.InnerException as BusinessException;
                }

                if (bizErr == null)
                {
                    #region 记录数据库

                    SysError sysError = new SysError();
                    if (context.Request.HttpMethod == "GET")
                    {
                        sysError.RequestContent = context.Request.QueryString["Param"];
                    }
                    else
                    {
                        sysError.RequestContent = context.Request.Form["Param"];
                    }

                    StringBuilder cookieStrs = new StringBuilder();
                    foreach (string cookiesitem in context.Request.Cookies)
                    {
                        cookieStrs.Append(cookiesitem + ":" + context.Request.Cookies[cookiesitem].Value).Append(",");
                    }

                    if (context.Request.Cookies.Count > 0)
                    {
                        sysError.RequestCookies = cookieStrs.Remove(cookieStrs.Length - 1, 1).ToString();
                    }

                    sysError.ErrorMessage = err.Source + ":" + message;
                    sysError.CreateTime = DateTime.Now;
                    sysError.OperaBrowser = context.Request.Browser.Browser + context.Request.Browser.Version;
                    sysError.OperaIp = context.Request.UserHostAddress;

                    SysErrorService.NewError(sysError);

                    #endregion
                }

                /* 文件上传动作 */
                if (context.Request.Files.Count > 0)
                {
                    responseStr = "{ Error: \"" + err.Source + "\", Message: \"" + HttpUtility.UrlEncode(message) + "\" }";
                    context.Response.Cookies.Add(new HttpCookie("Response", responseStr));
                }
                else
                {
                    responseStr = "{ Error: \"" + err.Source + "\", Message: \"" + message + "\" }";
                }
            }

            string jsonp = context.Request.Params["jscallback"];

            context.Response.Write(jsonp + "(" + responseStr + ")");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}