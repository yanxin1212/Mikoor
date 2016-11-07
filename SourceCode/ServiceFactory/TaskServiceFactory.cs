using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.IService;
using ArkEC.SEMs.Service;

namespace ArkEC.SEMs.ServiceFactory
{
    public class TaskServiceFactory
    {
        public static ITaskService Create()
        {
            return new TaskService();
        }
    }
}
