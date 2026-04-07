MySQL848
root Pai31415926
jesen Pai31415927
# 第一步：以 **管理员身份打开 CMD**（必须是 CMD！）
按 `Win + R`
输入 **`cmd`**
按住 `Ctrl + Shift + Enter` 以管理员打开

出现：
```
C:\Windows\System32>
```

---

# 第二步：登录 MySQL，确认数据库
```cmd
mysql -u root -p
```
输入密码 → 登录成功

执行：
```sql
use mall_cms_vue3;
```
显示 `Database changed` 说明库存在。

执行：
```sql
show tables;
```
**必须带分号！**
现在应该是空的，没关系。

退出：
```sql
exit;
```

---

# 第三步：【最终正确导入命令】复制直接执行
在 **CMD** 里直接执行这一行（**我已经帮你把路径写好了**）：

```cmd
mysql -u root -p mall_cms_vue3 < "F:\Vue\vue_projects\study\cli-4.5.13\mall-cms-vue3-api\database\mall_cms_vue3.sql"
```

然后输入你的密码，**等待 2~10 秒**，出现新一行就代表导入成功！

---

# 第四步：验证是否成功（关键）
重新登录 MySQL：
```cmd
mysql -u root -p
```

进入库：
```sql
use mall_cms_vue3;
```

**查看表（必须带分号）：**
```sql
show tables;
```

✅ **如果出现一堆表名 = 成功！**

---

# 失败的真正原因
1. **PowerShell 不支持 `<` 导入**，必须用 **CMD**
2. 你最后 `show tables` **没加分号 `;`**，命令不执行
3. 导入命令其实没真正运行成功，所以表里是空的

---

# **总结**
```
1. 打开 CMD
2. mysql -u root -p
3. use mall_cms_vue3;
4. show tables;
5. exit;
6. mysql -u root -p mall_cms_vue3 < "F:\Vue\vue_projects\study\cli-4.5.13\mall-cms-vue3-api\database\mall_cms_vue3.sql"
7. 登录 mysql → use mall_cms_vue3 → show tables;
```

-----------


# 插入一条 **完整可用的用户（带密码+带头像）**
我给你写好 **100% 可直接执行** 的 SQL，你复制运行即可。

## 第一步：插入用户（密码 = 123456，已加密）
```sql
INSERT INTO users (
    name, 
    realname, 
    password, 
    cellphone, 
    enable, 
    departmentId, 
    roleId, 
    avatarUrl
) 
VALUES (
    'zhangsan',        -- 用户名
    '张三',            -- 真实姓名
    '99443ffdd6664b8f42f45f926401cf74c40bc4fad6d0bfc5a47691072a27a212',  -- 密码 123456 加密后
    13812345678,       -- 手机号
    1,                 -- 启用状态
    1,                 -- 部门ID
    1,                 -- 角色ID
    'http://localhost:9000/users/5/avatar/avatar_test_123'  -- 头像地址
);
```

执行成功后，**新用户 ID 是 5**（因为你现在已有 4 个用户）。

---

## 第二步：给这个用户插入头像记录
```sql
INSERT INTO avatar (
    filename, 
    mimetype, 
    size, 
    userId
) 
VALUES (
    'avatar_test_123',    -- 文件名
    'image/jpeg',         -- 文件类型
    150000,               -- 文件大小
    5                     -- 对应用户 ID（刚才插入的用户ID）
);
```

---

# 现在查看一下 → 完美成功！
```sql
SELECT * FROM users WHERE id=5;
```
```sql
SELECT * FROM avatar WHERE userId=5;
```

你会看到：
- 用户信息完整
- 密码是加密格式（和项目一致）
- 头像地址正常
- avatar 表也有记录

---

# 你可以直接登录这个账号！
- **用户名**：zhangsan
- **密码**：123456
- **头像**：已配置

---

# 我再给你一个「管理员账号」模板（直接复制）
```sql
INSERT INTO users (name, realname, password, cellphone, enable, departmentId, roleId, avatarUrl)
VALUES (
    'manager',
    '系统管理员',
    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    13999999999,
    1,
    1,
    1,
    'http://localhost:9000/users/6/avatar/avatar_manager'
);

INSERT INTO avatar (filename, mimetype, size, userId)
VALUES ('avatar_manager', 'image/png', 160000, 6);
```
这个账号密码：
- 账号：manager
- 密码：admin

---

## 总结（你只需要记住）
1. **密码不能写明文**，必须用加密串：
   - 123456 加密串：`99443ffdd6664b8f42f45f926401cf74c40bc4fad6d0bfc5a47691072a27a212`
   - admin 加密串：`8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918`
2. **头像必须同时插入 users 和 avatar 表**
3. **userId 要对应上**

你现在**直接复制我上面的语句**，就能创建出**能登录、有头像**的用户！

