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
        /// <summary>
        /// 任务配置类映射器接口
        /// </summary>
        private static ITaskConfigMapper TaskConfigMapper { get; set; }

        /// <summary>
        /// 静态构造方法。初始化数据
        /// </summary>
        static TaskService()
        {
            DateTime now = DateTime.Now;
            TaskConfigMapper = TaskConfigMapperFactory.Create();
            TaskConfigMapper.Add(new TaskConfig { Name = "Task1", NextTime = DateTime.MinValue, Interval = new TimeSpan(0, 0, 10) });
            TaskConfigMapper.Add(new TaskConfig { Name = "Task2", NextTime = now.AddDays(-1).AddSeconds(3), Interval = new TimeSpan(0, 0, 8) });
            TaskConfigMapper.Add(new TaskConfig { Name = "Task3", NextTime = now.AddSeconds(10), Interval = new TimeSpan(0, 0, 5) });
        }

        void ITaskService.Execute()
        {
            List<TaskConfig> taskConfigList = TaskConfigMapper.Get();
            foreach (TaskConfig t in taskConfigList)
            {
                t.BeforeExecute = SetTaskStarted;
                t.AfterExecute = SetTaskEnded;
                t.GenerateError = WriteErrorLog;
                new Thread(t.Execute).Start();
            }
        }

        /// <summary>
        /// 标识任务为开始执行
        /// </summary>
        /// <param name="taskConfig">任务</param>
        private void SetTaskStarted(TaskConfig taskConfig)
        {
            taskConfig.Status = TaskConfigStatus.Executing;
            taskConfig.LatestStartTime = DateTime.Now;
            TaskConfigMapper.Update(taskConfig);
        }

        /// <summary>
        /// 标识任务为执行结束
        /// </summary>
        /// <param name="taskConfig">任务配置</param>
        private void SetTaskEnded(TaskConfig taskConfig)
        {
            taskConfig.Status = TaskConfigStatus.Unexecuted;
            taskConfig.LatestEndTime = DateTime.Now;
            TaskConfigMapper.Update(taskConfig);
        }

        /// <summary>
        /// 写异常日志
        /// </summary>
        /// <param name="taskConfig">任务配置</param>
        /// <param name="e">异常</param>
        private void WriteErrorLog(TaskConfig taskConfig, Exception e)
        {
            Console.WriteLine("{0} Error: {1}", taskConfig.Name, e.Message);
        }
    }
}
