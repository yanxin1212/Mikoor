using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArkEC.SEMs.Model
{
    /// <summary>
    /// 任务异常数据
    /// </summary>
    public class TaskErrorData
    {
        /// <summary>
        /// 任务名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 站点
        /// </summary>
        public string Site { get; set; }

        /// <summary>
        /// 最近开始时间
        /// </summary>
        public DateTime LatestStartTime { get; set; }

        /// <summary>
        /// 最近结束时间
        /// </summary>
        public DateTime LatestEndTime { get; set; }

        /// <summary>
        /// 执行对象
        /// </summary>
        public string Target { get; set; }

        /// <summary>
        /// 异常数据
        /// </summary>
        public string Data { get; set; }
    }
}
