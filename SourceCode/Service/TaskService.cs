using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using ArkEC.SEMs.IMapper;
using ArkEC.SEMs.IService;
using ArkEC.SEMs.MapperFactory;
using ArkEC.SEMs.Model;
using System.Reflection;

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
            if (TaskConfigMapper.Get("Task1") == null)
            {
                TaskConfig Task1 = CreateNewTaskConfig("Task1");
                Task1.Execution = ExecuteTaskOne;
                Task1.Interval = new TimeSpan(0, 0, 10);
                Task1.NextTime = DateTime.MinValue;
                Task1.Site = "www.1.com";
                TaskConfigMapper.Add(Task1);
            }
            if (TaskConfigMapper.Get("Task2") == null)
            {
                TaskConfig Task2 = CreateNewTaskConfig("Task2");
                Task2.Execution = ExecuteTaskTwo;
                Task2.Interval = new TimeSpan(0, 0, 8);
                Task2.NextTime = now.AddDays(-1).AddSeconds(3);
                Task2.Site = "www.2.com";
                TaskConfigMapper.Add(Task2);
            }
            if (TaskConfigMapper.Get("Task3") == null)
            {
                TaskConfig Task3 = CreateNewTaskConfig("Task3");
                Task3.Execution = ExecuteTaskThree;
                Task3.Interval = new TimeSpan(0, 0, 5);
                Task3.NextTime = now.AddSeconds(10);
                Task3.Site = "www.3.com";
                TaskConfigMapper.Add(Task3);
            }
        }

        void ITaskService.Execute()
        {
            List<TaskConfig> taskConfigList = TaskConfigMapper.Get();
            foreach (TaskConfig t in taskConfigList)
            {
                new Thread(t.Execute).Start();
            }
        }

        /// <summary>
        /// 创建任务配置
        /// </summary>
        /// <param name="name">名称</param>
        /// <returns>任务配置</returns>
        private static TaskConfig CreateNewTaskConfig(string name)
        {
            TaskConfig taskConfig = new TaskConfig();
            taskConfig.AfterExecution = SetTaskEnded;
            taskConfig.BeforeExecution = SetTaskStarted;
            taskConfig.TypeItem = typeof(TaskService);
            taskConfig.BizAssembly = taskConfig.TypeItem.Assembly;
            taskConfig.Creator = 0;
            taskConfig.EndedCount = 0;
            taskConfig.ErrorCount = 0;
            taskConfig.GenerateError = WriteErrorLog;
            taskConfig.ItemMethod = null;
            taskConfig.LastEndTime = DateTime.MinValue;
            taskConfig.LastStartTime = DateTime.MinValue;
            taskConfig.Name = name;
            taskConfig.Status = TaskConfigStatus.Unexecuted;
            taskConfig.TotalCount = 0;
            return taskConfig;
        }

        /// <summary>
        /// 标识任务为开始执行
        /// </summary>
        /// <param name="taskConfig">任务</param>
        private static void SetTaskStarted(TaskConfig taskConfig)
        {
            taskConfig.Status = TaskConfigStatus.Executing;
            taskConfig.LastStartTime = DateTime.Now;
            TaskConfigMapper.Update(taskConfig);
        }

        /// <summary>
        /// 标识任务为执行结束
        /// </summary>
        /// <param name="taskConfig">任务配置</param>
        private static void SetTaskEnded(TaskConfig taskConfig)
        {
            taskConfig.Status = TaskConfigStatus.Unexecuted;
            taskConfig.LastEndTime = DateTime.Now;
            TaskConfigMapper.Update(taskConfig);
        }

        /// <summary>
        /// 写异常日志
        /// </summary>
        /// <param name="taskConfig">任务配置</param>
        /// <param name="e">异常</param>
        private static void WriteErrorLog(TaskConfig taskConfig, Exception e)
        {
            Console.WriteLine("{0} Error: {1}", taskConfig.Name, e.Message);
        }

        /// <summary>
        /// 执行任务一
        /// </summary>
        private static void ExecuteTaskOne(TaskConfig taskConfig)
        {
            Console.WriteLine(string.Format("{0} Ran, Now {1}, Interval {2}", taskConfig.Name, DateTime.Now, taskConfig.Interval));
        }

        /// <summary>
        /// 执行任务二
        /// </summary>
        private static void ExecuteTaskTwo(TaskConfig taskConfig)
        {
            Console.WriteLine(string.Format("{0} Ran, Now {1}, Interval {2}", taskConfig.Name, DateTime.Now, taskConfig.Interval));
        }

        /// <summary>
        /// 执行任务三
        /// </summary>
        private static void ExecuteTaskThree(TaskConfig taskConfig)
        {
            Console.WriteLine(string.Format("{0} Ran, Now {1}, Interval {2}", taskConfig.Name, DateTime.Now, taskConfig.Interval));
        }
    }
}
