using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.DomainModel;
using ArkEC.SEMs.IService;
using System.Threading;

namespace ArkEC.SEMs.Service
{
    public class TaskService : ITaskService
    {
        void ITaskService.RunTask()
        {
            List<TaskConfig> taskConfigList = GetTaskConfigList();
            foreach (TaskConfig t in taskConfigList)
            {
                new Thread(t.Run).Start();
            }
        }

        private List<TaskConfig> GetTaskConfigList()
        {
            return new List<TaskConfig> { new TaskConfig(), new TaskConfig() };
        }
    }
}
