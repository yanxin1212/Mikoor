using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArkEC.SEMs.Model;

namespace ArkEC.SEMs.IMapper
{
    /// <summary>
    /// 任务配置映射器接口
    /// </summary>
    public interface ITaskConfigMapper
    {
        /// <summary>
        /// 获取所有任务配置
        /// </summary>
        /// <returns>任务配置列表</returns>
        List<TaskConfig> Get();

        /// <summary>
        /// 新增任务配置
        /// </summary>
        /// <param name="obj">任务配置</param>
        void Add(TaskConfig obj);

        /// <summary>
        /// 修改任务配置
        /// </summary>
        /// <param name="obj">任务配置</param>
        void Update(TaskConfig obj);
    }
}
