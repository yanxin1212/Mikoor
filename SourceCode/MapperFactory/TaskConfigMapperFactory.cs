using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.IMapper;
using ArkEC.SEMs.MySQLMapper;

namespace ArkEC.SEMs.MapperFactory
{
    /// <summary>
    /// 任务配置映射器工厂
    /// </summary>
    public class TaskConfigMapperFactory
    {
        /// <summary>
        /// 创建任务配置映射器
        /// </summary>
        /// <returns></returns>
        public static ITaskConfigMapper Create()
        {
            return new TaskConfigMapper();
        }
    }
}
