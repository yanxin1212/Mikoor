using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.IMapper;

namespace ArkEC.SEMs.MySQLMapper
{
    /// <summary>
    /// 任务历史执行记录映射器实现
    /// </summary>
    public class TaskExecutionHistoryMapper : ITaskExecutionHistoryMapper
    {
        void ITaskExecutionHistoryMapper.Add(Model.TaskExecutionHistory obj)
        {
            RamDatabase.TaskExecutionHistoryList.Add(obj);
        }
    }
}
