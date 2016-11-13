using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.Model;
using ArkEC.SEMs.IService;
using System.Threading;
using ArkEC.SEMs.MapperFactory;

namespace ArkEC.SEMs.Service
{
    /// <summary>
    /// 任务服务实现
    /// </summary>
    public class TaskService : ITaskService
    {
        void ITaskService.Execute()
        {
            List<TaskConfig> taskConfigList = TaskConfigMapperFactory.Create().GetTaskConfigList();
            foreach (TaskConfig t in taskConfigList)
            {
                new Thread(t.Execute).Start();
            }
        }
    }
}
