using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.IMapper;

namespace ArkEC.SEMs.MySQLMapper
{
    /// <summary>
    /// 任务异常数据映射器实现
    /// </summary>
    public class TaskErrorDataMapper : ITaskErrorDataMapper
    {
        void ITaskErrorDataMapper.Add(Model.TaskErrorData obj)
        {
            RamDatabase.TaskErrorDataList.Add(obj);
        }
    }
}
