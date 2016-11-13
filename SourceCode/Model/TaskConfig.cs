﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Threading;

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
        /// 下次执行时间
        /// </summary>
        public DateTime NextTime { get; set; }

        /// <summary>
        /// 执行间隔
        /// </summary>
        public TimeSpan Interval { get; set; }

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
        /// 执行状态
        /// </summary>
        public TaskConfigStatus Status { get; set; }

        /// <summary>
        /// 最近开始时间
        /// </summary>
        public DateTime LastStartTime { get; set; }

        /// <summary>
        /// 最近结束时间
        /// </summary>
        public DateTime LastEndTime { get; set; }

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
        /// 每次任务执行之前需要执行的方法
        /// </summary>
        public Action<TaskConfig> BeforeExecute { get; set; }

        /// <summary>
        /// 每次任务执行之后需要执行的方法
        /// </summary>
        public Action<TaskConfig> AfterExecute { get; set; }

        /// <summary>
        /// 任务异常信息构造程序
        /// </summary>
        public Action<TaskConfig, Exception> GenerateError { get; set; }

        /// <summary>
        /// 执行
        /// </summary>
        public void Execute()
        {
            Thread.Sleep(GetIntervalFromNowToNextTime());
            while (true)
            {
                try
                {
                    BeforeExecute(this);
                    ExecuteOneTime();
                    AfterExecute(this);
                }
                catch (Exception e)
                {
                    GenerateError(this, e);
                }
                Thread.Sleep(Interval);
            }
        }

        /// <summary>
        /// 获取从现在开始到下次执行时间的间隔
        /// </summary>
        /// <returns></returns>
        private TimeSpan GetIntervalFromNowToNextTime()
        {
            DateTime now = DateTime.Now;
            if (NextTime == DateTime.MinValue)
            {
                return TimeSpan.Zero;
            }
            else if (NextTime > now)
            {
                return NextTime - now;
            }
            else
            {
                long remainder = (now - NextTime).Ticks % Interval.Ticks;
                return remainder == 0 ? TimeSpan.Zero : Interval - new TimeSpan(remainder);
            }
        }

        /// <summary>
        /// 执行一次任务
        /// </summary>
        private void ExecuteOneTime()
        {
            Console.WriteLine(string.Format("{0} Ran, Now {1}, Interval {2}", Name, DateTime.Now, Interval));
        }
    }

    /// <summary>
    /// 任务配置状态
    /// </summary>
    public enum TaskConfigStatus
    {
        /// <summary>
        /// 执行中
        /// </summary>
        Executing = 0,

        /// <summary>
        /// 未执行
        /// </summary>
        Unexecuted = 1
    }
}
