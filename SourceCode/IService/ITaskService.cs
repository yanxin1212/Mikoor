using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArkEC.SEMs.IService
{
    /// <summary>
    /// 任务服务接口
    /// </summary>
    public interface ITaskService
    {
        /// <summary>
        /// 运行任务
        /// </summary>
        void Execute();
    }
}
