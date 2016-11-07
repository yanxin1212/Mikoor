using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.IService;
using ArkEC.SEMs.ServiceFactory;

namespace TaskRunner
{
    class Program
    {
        static void Main(string[] args)
        {
            TaskServiceFactory.Create().RunTask();
        }
    }
}
