using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.IService;
using ArkEC.SEMs.Service;

namespace ArkEC.SEMs.ServiceFactory
{
    /// <summary>
    /// 任务服务工厂
    /// </summary>
    public class TaskServiceFactory
    {
        /// <summary>
        /// 创建任务服务实例
        /// </summary>
        /// <returns></returns>
        public static ITaskService Create()
        {
            return new TaskService();
        }
    }
}
