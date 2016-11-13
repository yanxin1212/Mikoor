using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.IMapper;
using ArkEC.SEMs.Model;

namespace ArkEC.SEMs.MySQLMapper
{
    /// <summary>
    /// 任务配置映射器实现
    /// </summary>
    public class TaskConfigMapper : ITaskConfigMapper
    {
        List<TaskConfig> ITaskConfigMapper.Get()
        {
            return RamDatabase.TaskConfigList;
        }

        void ITaskConfigMapper.Add(TaskConfig obj)
        {
            RamDatabase.TaskConfigList.Add(obj);
        }

        void ITaskConfigMapper.Update(TaskConfig obj)
        {
            RamDatabase.TaskConfigList.RemoveAll(x => x.Name == obj.Name);
            RamDatabase.TaskConfigList.Add(obj);
        }
    }

    /// <summary>
    /// 内存数据库，用于调试
    /// </summary>
    internal class RamDatabase
    {
        public static List<TaskConfig> TaskConfigList { get; set; }

        static RamDatabase()
        {
            TaskConfigList = new List<TaskConfig>();
        }
    }
}
