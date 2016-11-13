using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArkEC.SEMs.Model
{
    /// <summary>
    /// 任务历史执行记录
    /// </summary>
    public class TaskExecutionHistory
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
        /// 任务总数
        /// </summary>
        public uint TotalCount { get; set; }

        /// <summary>
        /// 已执行数量
        /// </summary>
        public uint EndedCount { get; set; }

        /// <summary>
        /// 异常数量
        /// </summary>
        public uint ErrorCount { get; set; }
    }
}
