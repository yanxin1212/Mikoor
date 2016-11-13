using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.Model;

namespace ArkEC.SEMs.IMapper
{
    /// <summary>
    /// 任务历史执行记录映射器接口
    /// </summary>
    public interface ITaskExecutionHistoryMapper
    {
        /// <summary>
        /// 新增任务历史执行记录
        /// </summary>
        /// <param name="obj">任务历史执行记录</param>
        void Add(TaskExecutionHistory obj);
    }
}
