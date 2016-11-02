using System;
using System.Collections.Generic;
using System.Web;
using ArkEC.SEMs.Business.UM;
using ArkEC.SEMs.Business;

namespace ArkEC.SEMs.WebUI.BZM
{
    /// <summary>
    /// Summary description for BizLogin
    /// </summary>
    public class BizLogin : IHttpHandler
    {
        /// <summary>
        /// 处理请求
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                //CommonService.SyncDatabase();

                string param = context.Request.Form["Param"];
                string[] pvalues = param.Split(',');

                string email = pvalues[0];
                string pwd = pvalues[1];

                string userToken = SysUserSerivce.UserLogin(email, pwd);
                context.Response.Write(userToken);
            }
            catch (Exception err)
            {
                string message = err.Message;
                if (err.InnerException != null)
                {
                    message = err.InnerException.Message;
                }
                context.Response.Write("{ Error: \"" + err.Source + "\", Message: \"" + message + "\" }");
            }
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