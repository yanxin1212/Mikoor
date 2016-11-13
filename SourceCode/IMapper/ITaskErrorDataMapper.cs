using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.Model;

namespace ArkEC.SEMs.IMapper
{
    /// <summary>
    /// 任务异常数据映射器接口
    /// </summary>
    public interface ITaskErrorDataMapper
    {
        /// <summary>
        /// 新增任务异常数据
        /// </summary>
        /// <param name="obj">任务异常数据</param>
        void Add(TaskErrorData obj);
    }
}
