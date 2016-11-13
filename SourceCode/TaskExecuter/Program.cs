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
        static DateTime now = new DateTime(2016, 11, 15, 11, 24, 0);

        static void Main(string[] args)
        {
            TaskServiceFactory.Create().Execute();
        }
    }
}
