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

        TaskConfig ITaskConfigMapper.Get(string name)
        {
            return RamDatabase.TaskConfigList.Find(x => x.Name == name);
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
}
