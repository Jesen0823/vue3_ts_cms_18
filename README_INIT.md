# 创建项目

### 一. 创建

局部安装的vue-cli版本：`npx vue create vue3_ts_cms_18`，否则`npm vue create vue3_ts_cms_18`

![createProject_2](./capture/createProject_2.jpg)

TypeScript的编译有两种方式，一种是typescript自带的tsc，

另一种是babel工具，babel可以帮助添加一些polyfill，代码补丁，一般选babel.

![createProject_3](./capture/createProject_3.jpg)

css预处理器，可以选Less，其他也可以：

![createProject_4](./capture/createProject_4.jpg)

代码优化：

![createProject_5](./capture/createProject_5.jpg)

创建项目的所有选项如下：

![createProject](./capture/createProject.jpg)

### 二. 配置

#### 2.1  editorconfig配置


EditorConfig有助于为不同IDE编辑器上处理同一项目的多个开发人员维护一致的编码风格

<img src="./capture/editorconfig.jpg" alt="editorconfig" style="zoom:50%;" />

创建`.editorconfig`文件，内容：

```apl
# http://editorconfig.org

root = true

charset = utf-8 #文件字符集
indent_style = space #缩进风格(tab|space)
indent_size = 2 # 缩进大小
end_of_line = lf # 换行类型(lf|cr|crlf)
insert_final_newline = true # 始终在文件末尾插入一个新行
trim_trailing_whitespace = true # 去除行首的任意空白字符

[*.md] # 所有md文件
max_line_length = off
trim_trailing_whitespace = false

```

#### 2.2.使用prettier工具

Prettier是一款强大的代码格式化工具，支持JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown等语言，基本上
前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1. 安装prettier
   `npm insta11 prettier -D `

2. 配置.prettierrc文件：
   - [x] useTabs：使用tab缩进还是空格缩进，选择false；
   - [x] tabWidth：tab是空格的情况下，是几个空格，选择2个；
   - [x] printWidth：当行字符的长度，推荐80，也有人喜欢100或者120；
   - [x] singleQuote：使用单引号还是双引号，选择true，使用单引号；
   - [x] trailingComma：在多行输入的尾逗号是否添加，设置为none：
   - [x] semi：语句未尾是否要加分号，默认值true，选择false表示不加：

```json
{
  "useTabs": false,
  "tabwidth": 2,
  "printwidth": 80,
  "singleQuote": true,
  "trai1ingComma": "none",
  "semi": false
}
```

3. 创建`.prettierignore`文件：

```apl
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4. 安装prettier插件

   ![prettier](./capture/prettier.jpg)

5 .测试prettier是否生效
    。测试一在代码中保存代码：
    。测试二：配置一次性修改的命令；在package.json中配置一个scripts:
    ```"prettier":"prettier --write ."```，执行 `npm run prettier`可以批量格式化文件。

#### 2.3. eslint代码检查

创建项目的时候已经选择了eslint，但是也应该安装插件

<img src="./capture/eslint.jpg" alt="eslint" style="zoom:50%;" />

有时候，prettier与eslint的规则会有冲突，需要解决冲突：

需要安装 `npm install eslint-plugin-prettier eslint-config-prettier -D`

编辑.eslintrc.js文件，添加`plugin:prettier/recommended`：

```json
extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
```

#### 2.4. gitHusky和eslint

虽然项目使用eslint了，但是不能保证组员提交代码之前都将eslint中的问题解决掉了：

也就是我们望保证代码仓库中的代码都是符合eslint规范的;
如果不符合eslint规范，那么自动通过规范进行修复;
那么我们需要在组员执行git commit命令的时候对其进行校验，支那么如何做到这一点呢？

可以通过Husky工具：

> husky是一个githook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、pre-push 
>
> 如何使用husky呢？
> 这里我们可以使用自动配置命令：
> `npx husky-init && npm install`
>
>  这里会做三件事：
> 1.安装husky相关的依赖：
>
> 2.创建.husky文件
>
> 3.在package.json添加`"prepare": "husky install"`

将.husky\pre-commit中改为执行lint命令：

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
```

