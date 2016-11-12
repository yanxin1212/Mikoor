using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.Model;
using ArkEC.SEMs.IService;
using System.Threading;

namespace ArkEC.SEMs.Service
{
    public class TaskService : ITaskService
    {
        void ITaskService.Execute()
        {
            List<TaskConfig> taskConfigList = GetTaskConfigList();
            foreach (TaskConfig t in taskConfigList)
            {
                new Thread(t.Run).Start();
            }
        }

        /// <summary>
        /// 获取任务配置列表
        /// </summary>
        /// <returns></returns>
        private List<TaskConfig> GetTaskConfigList()
        {
            return new List<TaskConfig> { new TaskConfig(), new TaskConfig() };
        }
    }
}
