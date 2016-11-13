using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using ArkEC.SEMs.IMapper;
using ArkEC.SEMs.IService;
using ArkEC.SEMs.MapperFactory;
using ArkEC.SEMs.Model;

namespace ArkEC.SEMs.Service
{
    /// <summary>
    /// 任务服务实现
    /// </summary>
    public class TaskService : ITaskService
    {
        static TaskService()
        {
            DateTime now = DateTime.Now;
            ITaskConfigMapper taskConfigMapper = TaskConfigMapperFactory.Create();
            taskConfigMapper.Add(new TaskConfig { Name = "Task1", NextTime = DateTime.MinValue, Interval = new TimeSpan(0, 0, 10) });
            taskConfigMapper.Add(new TaskConfig { Name = "Task2", NextTime = now.AddDays(-1).AddSeconds(3), Interval = new TimeSpan(0, 0, 8) });
            taskConfigMapper.Add(new TaskConfig { Name = "Task3", NextTime = now.AddSeconds(10), Interval = new TimeSpan(0, 0, 5) });
        }

        void ITaskService.Execute()
        {
            List<TaskConfig> taskConfigList = TaskConfigMapperFactory.Create().Get();
            foreach (TaskConfig t in taskConfigList)
            {
                new Thread(t.Execute).Start();
            }
        }
    }
}
