using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.Model;

namespace ArkEC.SEMs.MySQLMapper
{
    /// <summary>
    /// 内存数据库，用于调试
    /// </summary>
    internal class RamDatabase
    {
        public static List<TaskConfig> TaskConfigList { get; set; }
        public static List<TaskExecutionHistory> TaskExecutionHistoryList { get; set; }
        public static List<TaskErrorData> TaskErrorDataList { get; set; }

        static RamDatabase()
        {
            TaskConfigList = new List<TaskConfig>();
            TaskExecutionHistoryList = new List<TaskExecutionHistory>();
            TaskErrorDataList = new List<TaskErrorData>();
        }
    }
}
