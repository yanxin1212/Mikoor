using System;
using System.Collections.Generic;
using System.Web;
using ArkEC.CoreCom.WebHandler;
using ArkEC.CoreCom.Datastruct.Exceptions;
using ArkEC.CoreCom.Runtime;
using ArkEC.SEMs.Business.SPM;
using System.Runtime.InteropServices;
using ArkEC.CoreCom.CacheStore;
using ArkEC.SEMs.Business.UM;
using System.Web.SessionState;
using ArkEC.SEMs.BizObject.SYS;
using System.Text;
using ArkEC.SEMs.Business.SYS;
using ArkEC.SEMs.Business.SM;

namespace ArkEC.SEMs.WebUI.BZM
{
    /// <summary>
    /// Ajax的Web请求处理
    /// </summary>
    public class BizAjaxHandler : IHttpHandler
    {
        /// <summary>
        /// 处理请求
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            string responseStr = "";
            try
            {
                //验证用户权限
                string userToken = SysUserSerivce.AuthoriseUserToken();

                if (string.IsNullOrEmpty(userToken))
                {
                    throw new BusinessException("Log in expired");
                }

                RunSetting.SettingLanguages = SysKeyParamSerivce.GetSettingLanguages();
                responseStr = BizHandler.HandlerRequest(context);

                /* 文件上传动作 */
                if (context.Request.Files.Count > 0)
                {
                    SysResponseTaskService.CreateSysResponseTask(responseStr);
                }
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

            context.Response.Write(responseStr);
        }

        /// <summary>
        /// 
        /// </summary>
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}