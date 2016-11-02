using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Common;
using ArkEC.CoreCom.Datastruct;
using ArkEC.CoreCom.Datastruct.Exceptions;
using ArkEC.SEMs.BizObject.UM;
using ArkEC.SEMs.DataAccess;
using ArkEC.SEMs.DataAccess.UM;
using ArkEC.SEMs.Business.MLM;
using ArkEC.CoreCom.Runtime;
using ArkEC.CoreCom.Security;
using ArkEC.CoreCom.CacheStore;
using System.Web;
using ArkEC.SEMs.DataAccess.OTHM;
using System.IO;

namespace ArkEC.SEMs.Business.UM
{
    /// <summary>
    /// 系统用户业务类
    /// </summary>
    public class SysUserSerivce
    {
        /// <summary>
        /// 新增系统用户
        /// </summary>
        /// <param name="sysuser">系统用户</param>
        public static SysUser NewSysUser(SysUser sysuser)
        {
            using (DbConnection conn = ConnFactory.CreateConn())
            {
                conn.Open();
                DbTransaction tran = null;
                try
                {
                    tran = conn.BeginTransaction();
                    ISysUserDA iface = UMDAFactory.CreateSysUserDA();

                    //随意产生密码
                    sysuser.Pwd = (new Random()).Next(10000, 1000000).ToString();

                    sysuser.SysUser_Id = CommonDataAccess.GetMaxKey(conn, tran, "SysUser", "SysUser_Id") + 1;
                    sysuser.UserToken = SecurityKeyHelper.Encrypt(sysuser.SysUser_Id.ToString()).Trim();

                    iface.Insert(conn, tran, sysuser);

                    //系统角色
                    if (sysuser.SysRole_Ids.Count > 0)
                    {
                        ISysRoleDA iroleface = UMDAFactory.CreateSysRoleDA();
                        iface.InsertRoles(conn, tran, sysuser.SysUser_Id, sysuser.SysRole_Ids);

                        //菜单
                        List<int> menu_ids = iface.GetRoleMenus(conn, tran, sysuser.SysRole_Ids);
                        iface.InsertMenus(conn, tran, sysuser.SysUser_Id, menu_ids);

                        //产品分类
                        List<int> prodcategory_ids = iface.GetRoleProdCategories(conn, tran, sysuser.SysRole_Ids);
                        sysuser.ProdCategory_Ids = prodcategory_ids;
                        iface.InsertProdCategoies(conn, tran, sysuser.SysUser_Id, prodcategory_ids);
                    }

                    //销售平台
                    if (sysuser.SaleSite_Ids.Count > 0)
                    {
                        iface.InsertSaleSite(conn, tran, sysuser.SysUser_Id, sysuser.SaleSite_Ids);
                    }

                    //生成用户指令脚本
                    GenerateUserTokenScript(conn, tran, sysuser);
                    
                    tran.Commit();
                }
                catch (Exception err)
                {
                    tran.Rollback();
                    throw err;
                }
            }
            return sysuser;
        }


        /// <summary>
        /// 修改系统用户
        /// </summary>
        /// <param name="paramObj"></param>
        public static void ModifySysUser(Dictionary<string, object> paramObj)
        {
            int sysuser_id = ObjectConvertion.ValueToInt(paramObj["SysUser_Id"]);

            using (DbConnection conn = ConnFactory.CreateConn())
            {
                conn.Open();
                DbTransaction tran = null;
                try
                {
                    tran = conn.BeginTransaction();
                    ISysUserDA iface = UMDAFactory.CreateSysUserDA();

                    SysUser sysuser = iface.Read(conn, tran, sysuser_id);

                    #region 接收参数

                    if (paramObj.ContainsKey("SysUser_Id"))
                    {
                        sysuser.SysUser_Id = ObjectConvertion.ValueToInt(paramObj["SysUser_Id"]);
                    }
                    if (paramObj.ContainsKey("FullName"))
                    {
                        sysuser.FullName = ObjectConvertion.ValueToString(paramObj["FullName"]);
                    }
                    if (paramObj.ContainsKey("Email"))
                    {
                        sysuser.Email = ObjectConvertion.ValueToString(paramObj["Email"]);
                    }
                    if (paramObj.ContainsKey("Pwd"))
                    {
                        sysuser.Pwd = ObjectConvertion.ValueToString(paramObj["Pwd"]);
                    }
                    if (paramObj.ContainsKey("Tel"))
                    {
                        sysuser.Tel = ObjectConvertion.ValueToString(paramObj["Tel"]);
                    }
                    if (paramObj.ContainsKey("Remark"))
                    {
                        sysuser.Remark = ObjectConvertion.ValueToString(paramObj["Remark"]);
                    }
                    if (paramObj.ContainsKey("SysRole_Ids"))
                    {
                        sysuser.SysRole_Ids = ObjectConvertion.JsonToObject<List<int>>(ObjectConvertion.ValueToString(paramObj["SysRole_Ids"]));
                    }
                    if (paramObj.ContainsKey("SaleSite_Ids"))
                    {
                        sysuser.SaleSite_Ids = ObjectConvertion.JsonToObject<List<int>>(ObjectConvertion.ValueToString(paramObj["SaleSite_Ids"]));
                    }

                    #endregion

                    //清理现有权限
                    iface.ClearMenus(conn, tran, sysuser.SysUser_Id);

                    //处理系统角色
                    iface.ClearRoles(conn, tran, sysuser.SysUser_Id);
                    if (sysuser.SysRole_Ids.Count > 0)
                    {
                        iface.InsertRoles(conn, tran, sysuser.SysUser_Id, sysuser.SysRole_Ids);

                        //菜单
                        List<int> menu_ids = iface.GetRoleMenus(conn, tran, sysuser.SysRole_Ids);
                        iface.InsertMenus(conn, tran, sysuser.SysUser_Id, menu_ids);
                    }

                    //销售平台
                    iface.ClearDataAUZ(conn, tran, sysuser.SysUser_Id);
                    if (sysuser.SaleSite_Ids.Count > 0)
                    {
                        iface.InsertSaleSite(conn, tran, sysuser.SysUser_Id, sysuser.SaleSite_Ids);
                    }

                    iface.Modify(conn, tran, sysuser);

                    //生成用户指令脚本
                    GenerateUserTokenScript(conn, tran, sysuser);

                    tran.Commit();
                }
                catch (Exception err)
                {
                    tran.Rollback();
                    throw err;
                }
            }
        }


        /// <summary>
        /// 删除系统用户
        /// </summary>
        /// <param name="paramObj"></param>
        public static void DeleteSysUser(Dictionary<string, object> paramObj)
        {
            int sysuser_id = ObjectConvertion.ValueToInt(paramObj["SysUser_Id"]);
            using (DbConnection conn = ConnFactory.CreateConn())
            {
                conn.Open();
                DbTransaction tran = null;
                try
                {
                    tran = conn.BeginTransaction();
                    ISysUserDA iface = UMDAFactory.CreateSysUserDA();

                    //处理系统角色
                    iface.ClearRoles(conn, tran, sysuser_id);

                    //销售平台
                    iface.ClearDataAUZ(conn, tran, sysuser_id);

                    //清理现有权限
                    iface.ClearMenus(conn, tran, sysuser_id);
                    iface.ClearProdCategory(conn, tran, sysuser_id);

                    iface.Delete(conn, tran, sysuser_id);
                    tran.Commit();
                }
                catch (Exception err)
                {
                    tran.Rollback();
                    throw err;
                }
            }
        }

        /// <summary>
        /// 读取系统用户
        /// </summary>
        /// <param name="paramObj"></param>
        /// <returns></returns>
        public static SysUser ReadSysUser(Dictionary<string, object> paramObj)
        {
            SysUser sysuUser = null;
            int sysuser_id = ObjectConvertion.ValueToInt(paramObj["SysUser_Id"]);

            using (DbConnection conn = ConnFactory.CreateConn())
            {
                conn.Open();
                ISysUserDA iface = UMDAFactory.CreateSysUserDA();
                sysuUser = iface.Read(conn, null, sysuser_id);

                sysuUser.SysRole_Ids = iface.GetRoles(conn, null, sysuser_id);
                sysuUser.SaleSite_Ids = iface.GetSaleSites(conn, null, sysuser_id);

            }

            return sysuUser;
        }

        /// <summary>
        /// 获取系统用户
        /// </summary>
        /// <param name="paramObj"></param>
        /// <returns></returns>
        public static DataTable QuerySysUsers(Dictionary<string, object> paramObj)
        {
            #region 接收参数

            int salesite_id = 0;
            if (paramObj.ContainsKey("SaleSite_Id"))
            {
                salesite_id = ObjectConvertion.ValueToInt(paramObj["SaleSite_Id"]);
            }

            int sysrole_id = 0;
            if (paramObj.ContainsKey("SysRole_Id"))
            {
                sysrole_id = ObjectConvertion.ValueToInt(paramObj["SysRole_Id"]);
            }

            #endregion

            using (DbConnection conn = ConnFactory.CreateConn())
            {
                return UMDAFactory.CreateSysUserDA().QuerySysUsers(conn, null, salesite_id, sysrole_id);
            }
        }

        /// <summary>
        /// 用户登陆
        /// </summary>
        /// <param name="paramObj"></param>
        /// <returns></returns>
        public static string UserLogin(string email, string password)
        {
            string userToken = "";

            using (DbConnection conn = ConnFactory.CreateConn())
            {
                conn.Open();

                ISysUserDA iuserface = UMDAFactory.CreateSysUserDA();

                SysUser user = iuserface.GetSysUser(conn, null, email, password);

                if (user != null)
                {
                    user.SysRole_Ids = iuserface.GetRoles(conn, null, user.SysUser_Id);
                    user.SaleSite_Ids = iuserface.GetSaleSites(conn, null, user.SysUser_Id);

                    //获取导航菜单
                    DataTable menuTable = iuserface.GetUserMenus(conn, null, user);
                    foreach (DataRow row in menuTable.Rows)
                    {
                        string menuUrl = ObjectConvertion.DbToString(row["MenuUrl"]);

                        if (!string.IsNullOrEmpty(menuUrl) && !user.Menus.Contains(menuUrl))
                        {
                            user.Menus.Add("/" + menuUrl);
                        }
                    }

                    userToken = SecurityKeyHelper.Encrypt(user.SysUser_Id.ToString());

                    WebCacheHelper.SetItem(CacheLifeCycleEnum.Global, userToken, user);
                }
            }

            return userToken;
        }

        /// <summary>
        /// 验证用户指令
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static string AuthoriseUserToken()
        {
            string result = "ok";

            string path = HttpContext.Current.Request.UrlReferrer.AbsolutePath;

            if (path.ToLower().IndexOf("login.") == -1)
            {
                Dictionary<string, string> setting = RunSetting.GetRunningContext();
                string userToken = setting["usertoken"].Trim();

                SysUser user = WebCacheHelper.GetItem(CacheLifeCycleEnum.Global, userToken) as SysUser;

                #region 防止文件操作后的Cache丢失

                if (user == null)
                {
                    using (DbConnection conn = ConnFactory.CreateConn())
                    {
                        conn.Open();

                        ISysUserDA iuserface = UMDAFactory.CreateSysUserDA();

                        user = iuserface.GetSysUser(conn, null, userToken);

                        if (user != null)
                        {
                            user.SysRole_Ids = iuserface.GetRoles(conn, null, user.SysUser_Id);
                            user.SaleSite_Ids = iuserface.GetSaleSites(conn, null, user.SysUser_Id);

                            //获取导航菜单
                            DataTable menuTable = iuserface.GetUserMenus(conn, null, user);
                            foreach (DataRow row in menuTable.Rows)
                            {
                                string menuUrl = ObjectConvertion.DbToString(row["MenuUrl"]);

                                if (!string.IsNullOrEmpty(menuUrl) && !user.Menus.Contains(menuUrl))
                                {
                                    user.Menus.Add("/" + menuUrl);
                                }
                            }

                            WebCacheHelper.SetItem(CacheLifeCycleEnum.Global, userToken, user);
                        }
                    }
                }

                #endregion

                if (user == null)
                {
                    result = "";
                }
                else
                {
                    //验证导航(过滤超级管理员)
                    if (!user.IsAdmin())
                    {
                        /* 非首页 */
                        if (string.Compare("/bzm/main.htm", path.ToLower()) != 0 && !user.Menus.Contains(path))
                        {
                            result = "";
                        }
                    }
                }
            }

            return result;
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="paramObj"></param>
        public static void ModifyPwd(Dictionary<string, object> paramObj)
        {
            string oldPwd = ObjectConvertion.ValueToString(paramObj["OldPwd"]);
            string newPwd = ObjectConvertion.ValueToString(paramObj["NewPwd"]);

            Dictionary<string, string> setting = RunSetting.GetRunningContext();
            string userToken = setting["usertoken"].Trim();

            SysUser user = WebCacheHelper.GetItem(CacheLifeCycleEnum.Global, userToken) as SysUser;
            if (user != null)
            {
                if (string.Compare(oldPwd, user.Pwd) != 0)
                {
                    throw new BusinessException(LanResourceCache.GetLanValue("E0032")); 
                }

                user.Pwd = newPwd;

                using (DbConnection conn = ConnFactory.CreateConn())
                {
                    conn.Open();
                    DbTransaction tran = null;
                    try
                    {
                        tran = conn.BeginTransaction();
                        ISysUserDA iface = UMDAFactory.CreateSysUserDA();

                        iface.Modify(conn, tran, user);

                        tran.Commit();
                    }
                    catch (Exception err)
                    {
                        tran.Rollback();
                        throw err;
                    }
                }
            }
        }

        /// <summary>
        /// 获取当前正在运行的用户
        /// </summary>
        /// <returns></returns>
        public static SysUser GetRunningUser()
        {
            SysUser sysuser = null;

            try
            {
                Dictionary<string, string> setting = RunSetting.GetRunningContext();
                if (setting != null && setting.ContainsKey("usertoken"))
                {
                    string userToken = setting["usertoken"].Trim();

                    sysuser = WebCacheHelper.GetItem(CacheLifeCycleEnum.Global, userToken) as SysUser;
                }
            }
            catch { }

            return sysuser;
        }

        #region 私有方法

        /// <summary>
        /// 生成用户指令脚本
        /// </summary>
        /// <param name="conn"></param>
        /// <param name="tran"></param>
        /// <param name="user"></param>
        private static void GenerateUserTokenScript(DbConnection conn, DbTransaction tran, SysUser user)
        {
            Dictionary<DataRow, List<DataRow>> menuList = new Dictionary<DataRow, List<DataRow>>();
            Dictionary<int, List<DataRow>> menuKeyList = new Dictionary<int, List<DataRow>>();

            DataTable menuTable = UMDAFactory.CreateSysUserDA().GetUserMenus(conn, tran, user);
            foreach (DataRow item in menuTable.Rows)
            {
                int key = ObjectConvertion.DbToInt(item["SysMenu_Id"]);
                int parentKey = ObjectConvertion.DbToInt(item["ParentMenu_Id"]);

                if (parentKey == 0)
                {
                    List<DataRow> sonMenuList = new List<DataRow>();

                    if (!menuKeyList.ContainsKey(key))
                    {
                        menuList.Add(item, sonMenuList);
                        menuKeyList.Add(key, sonMenuList);
                    }
                }
                else
                {
                    if (menuKeyList.ContainsKey(parentKey))
                    {
                        List<DataRow> sonMenuList = menuKeyList[parentKey];

                        sonMenuList.Add(item);
                    }
                }
            }

            string scriptPath = AppDomain.CurrentDomain.BaseDirectory + "BZM\\Scripts\\UserPopedom\\" + user.UserToken.Trim() + ".js";
            using (FileStream fs = File.Create(scriptPath))
            {
                using (StreamWriter sw = new StreamWriter(fs, Encoding.UTF8))
                {
                    sw.WriteLine("(function (window) {");

                    sw.WriteLine("    if (!window.userpopedom) {");
                    sw.WriteLine("        window.userpopedom = {};");
                    sw.WriteLine("    }");

                    sw.WriteLine("    userpopedom.user_" + user.UserToken + " = {");
                    sw.WriteLine("        SysUser_Id: '" + user.SysUser_Id + "',");
                    sw.WriteLine("        FullName: '" + user.FullName + "',");
                    sw.WriteLine("        RoleIds: '" + ObjectConvertion.CollectionToString(user.SysRole_Ids, '#') + "',");
                    sw.WriteLine("        ProdCategoryIds: '" + ObjectConvertion.CollectionToString(user.ProdCategory_Ids, '#') + "',");
                    sw.WriteLine("        Email: '" + user.Email + "',");
                    sw.WriteLine("        Tel: '" + user.Tel + "',");

                    sw.WriteLine("        menuPopedoms: [");

                    int i = 1;
                    foreach (KeyValuePair<DataRow, List<DataRow>> item in menuList)
                    {
                        sw.WriteLine("            { menukey: " + ObjectConvertion.DbToString(item.Key["SysMenu_Id"]) + ", value: mlm."
                                                               + ObjectConvertion.DbToString(item.Key["MenuName"]) + ", href: '"
                                                               + ObjectConvertion.DbToString(item.Key["MenuUrl"]) + "', sonMenus: [");

                        int j = 1;
                        foreach (DataRow sonItem in item.Value)
                        {
                            sw.WriteLine("                    { menukey: " + ObjectConvertion.DbToString(sonItem["SysMenu_Id"]) + ", value: mlm."
                                                                           + ObjectConvertion.DbToString(sonItem["MenuName"]) + ", href: '"
                                                                           + ObjectConvertion.DbToString(sonItem["MenuUrl"]) + "' }");

                            if (j != item.Value.Count)
                            {
                                sw.WriteLine("                    ,");
                            }

                            j++;
                        }

                        sw.WriteLine("                ]");

                        if (i == menuList.Count)
                        {
                            sw.WriteLine("            }");
                        }
                        else
                        {
                            sw.WriteLine("            },");
                        }
                        i++;
                    }

                    sw.WriteLine("        ]");

                    sw.WriteLine("    };");

                    sw.WriteLine("})(window);");
                }
            }
        }

        #endregion
    }
}
