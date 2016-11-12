using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

namespace ArkEC.SEMs.Model
{
    /// <summary>
    /// 任务配置
    /// </summary>
    public class TaskConfig
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
        /// 开始时间
        /// </summary>
        public uint StartTime { get; set; }

        /// <summary>
        /// 执行周期
        /// </summary>
        public TimeSpan Cycle { get; set; }

        /// <summary>
        /// 任务程序集
        /// </summary>
        public Assembly BizAssembly { get; set; }

        /// <summary>
        /// 执行类
        /// </summary>
        public Type TypeItem { get; set; }

        /// <summary>
        /// 获取待执行数据的程序
        /// </summary>
        public MethodInfo ItemMethod { get; set; }

        /// <summary>
        /// 任务执行程序
        /// </summary>
        public MethodInfo DoneMethod { get; set; }

        /// <summary>
        /// 任务异常信息构造程序
        /// </summary>
        public MethodInfo GenerateErrorInfoMethod { get; set; }

        /// <summary>
        /// 执行状态
        /// </summary>
        public string Status { get; set; }

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

        /// <summary>
        /// 任务创建人
        /// </summary>
        public uint Creator { get; set; }

        /// <summary>
        /// 运行
        /// </summary>
        public void Run()
        {
            Console.WriteLine("Task Running...");
        }
    }
}
