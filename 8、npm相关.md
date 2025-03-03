# 8、npm相关

## 8.1 npm/npm私服发包

参考：https://juejin.cn/post/7367554378732945444
https://segmentfault.com/a/1190000039766438
https://zhuanlan.zhihu.com/p/412183990

首先，我们需要先将发包代码实现完成并完成对`package.json`文件相关配置项的配置。

`package.json`文件是`Node.js`项目中的一个重要文件，它包含了项目的配置信息。以下是`package.json`文件中常见的字段及其含义：

* `name`：项目的名称。
* `version`：项目的版本号，遵循语义化版本规范。
* `description`：项目的描述信息。
* `main`：项目的入口文件，默认是`index.js`。
* `scripts`：定义了可以通过`npm`运行的脚本命令。
* `keywords`：关键字，用于在`npm`上搜索项目。
* `author`：项目的作者信息。
* `license`：项目的许可证信息。
* `dependencies`：项目运行时依赖的包及其版本范围。
* `devDependencies`：开发过程中需要的工具包及其版本范围。

```json
// package.json 文件
{
  // 项目的名称
  "name": "@demo/test",
  // 是否为私有项目。false 表示该项目是公开的，可以被发布到公共的 npm 仓库。如果设置为 true，则项目不会被发布
  "private": false,
  // 项目的版本号
  "version": "1.0.0",
  // 指定项目的模块类型。默认为 CommonJS，module 表示项目使用 ES 模块（ESM），而不是 CommonJS 模块。这会影响如何导入和导出模块。
  "type": "module",
  // 指定项目的入口文件（CommonJS）。
  "main": "package/dist/demo.umd.cjs",
  // 指定项目的入口文件（ES 模块）。
  "module": "package/build/dist/demo.js",
  // 指定项目的 TypeScript 类型定义文件。
  "types": "package/build/types/index.d.ts",
  // 项目的简短描述。
  "description": "示例demo",
  // 项目的作者信息。
  "author": {
    "name": "demo",
    "email": "demo@163.com"
  },
  // 指定发布配置。
  "publishConfig": {
    // 指定发布的目标 npm 仓库地址
    "registry": "http://192.168.0.1:8888/repository/npm-hosted/",
    // 指定发布权限，public 表示公开项目，private 表示私有项目。
    "access": "public"
  },
  // 指定发布时包含的文件。
  "files": [
    "package/build/*",
    "readme.md",
    "log.md"
  ],
  // 定义项目中可以运行的脚本。
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "prepublish sign": "npm run \"build\" & npm publish"
  }
  // 以下省略依赖包等配置
}
```

### 8.1.1 npm发包

#### 8.1.1.1 注册npm账号

登录`npm`官网（[https://www.npmjs.com/]()），注册一个`npm`账号（然后注册完后，去你的邮箱根据提示进行操作，验证通过即可）

#### 8.1.1.2 在终端登录账号

在终端执行登录命令：`npm login`，输入npm官网的账号、密码

**注意：要设置`npm`源为`npm`官方源**

先查看当前`npm`源：

```shell
npm config get registry
```

设置淘宝镜像源：

```shell
npm config set registry https://registry.npm.taobao.org/
```

设置`npm`官方源：

```shell
npm config set registry https://registry.npmjs.org/
```

#### 8.1.1.3 发布

`npm`账号登录成功后，在终端里输入发布命令`npm publish`即可，此时`npm`账号绑定的邮箱会收到发包成功邮件，到此发包成功。

参考网址：https://segmentfault.com/a/1190000039766438

### 8.1.2 npm私服发包

#### 8.1.2.1 连接npm私服

设置`npm`源为`npm`私服地址。私服地址一般在`package.json`文件的`publishConfig`中的`registry`选项中，若没有请询问私服管理员

```shell
# 根据私服地址设置npm源
npm config set registry http://192.168.0.1:8888/repository/npm-hosted/
```

#### 8.1.2.2 在终端登录账号

在终端执行登录命令：`npm login`，输入你在`npm`私服的账号、密码

#### 8.1.2.3 发布

登录成功后，在终端里输入发布命令`npm publish`即可

**注意：发包到私服后，记得将`npm`源切换回官方/淘宝镜像**
