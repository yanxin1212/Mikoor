using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.IService;

namespace ArkEC.SEMs.Service
{
    public class TaskService : ITaskService
    {
        void ITaskService.RunTask()
        {
            Console.WriteLine("Task Running...");
        }
    }
}
