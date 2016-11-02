using System;
using System.Collections.Generic;
using System.Web;
using ArkEC.SEMs.Business.SM;
using ArkEC.SEMs.Business.CM;
using ArkEC.SEMs.Business.PDM;

namespace ArkEC.SEMs.WebUI.bzm
{
    /// <summary>
    /// Summary description for SMTTask
    /// </summary>
    public class SMTTask : IHttpHandler
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.Params["Action"];

            if (action == "SyncSTMSaleOrderForTask")
            {
                context.Response.Write(SaleOrderSerivce.SyncSTMSaleOrderForTask());
            }
            else if (action == "SendSMTSOConfirmMessageForTask")
            {
                context.Response.Write(SaleOrderSerivce.SendSMTSOConfirmMessageForTask());
            }
            else if (action == "GenerateSMTShipLableForSMTTask")
            {
                context.Response.Write(SaleOrderSerivce.GenerateSMTShipLableForSMTTask());
            }
            else if (action == "GenerateSMTTrackingNumberForTask")
            {
                context.Response.Write(SaleOrderSerivce.GenerateSMTTrackingNumberForTask());
            }
            else if (action == "ModifyShipStateInSMTForTask")
            {
                context.Response.Write(SaleOrderSerivce.ModifyShipStateInSMTForTask());
            }
            else if (action == "EvaluationSMTOrderForTask")
            {
                context.Response.Write(SaleOrderSerivce.EvaluationSMTOrderForTask());
            }
            else if (action == "MKRefreshCustSource")
            {
                context.Response.Write(CustomerSerivce.MKRefreshCustSource());
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