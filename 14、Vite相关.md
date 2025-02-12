# 14、Vite相关

## 14.1 Vite常用配置

参考：https://cn.vitejs.dev/guide/
https://juejin.cn/post/7441241705537355828
https://juejin.cn/post/7241057752070799416

如官网所说，`Vite`是一种新型前端构建工具，能够显著提升前端开发体验，它主要由两部分组成：

* 一个开发服务器，它基于原生`ES`模块提供了丰富的内建功能，如速度快到惊人的模块热替换（`HMR`）。
* 一套构建指令，它使用`Rollup`打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

项目根目录下有一个`vite.config.js`或`vite.config.ts`文件，这是`Vite`的配置文件。

### 14.1.1 配置别名

配置`resolve.alias`，使用`@`符号代表`src`目录。

```typescript
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

按需导入：

```typescript
import {defineConfig} from 'vite'
import type {UserConfig, ConfigEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";

// https://cn.vitejs.dev/config/
export default ({mode}: ConfigEnv): UserConfig => {
  // 获取当前工作目录的路径
  const root: string = process.cwd();
  const pathResolve = (dir: string): string => {
    return resolve(root, ".", dir);
  };

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": pathResolve("src"),
      },
    },
  };
};
```

如果使用了`TypeScript`的话，需要在`tsconfig.json`中配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    //使用相对路径，当前根目录
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```

### 14.1.2 省略拓展名列表

不建议忽略自定义导入类型的扩展名`.vue`，会影响`IDE`和类型支持

```typescript
import {defineConfig} from "vite";

export default defineConfig({
  resolve: {
    //导入文件时省略的扩展名列表
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
    ],
  },
});
```

### 14.1.3 常用插件

在`plugins`中可以添加你的插件，它是一个数组。

* `@vitejs/plugin-vue-jsx`：`JSX`、`TSX`语法支持
* `vite-plugin-mock`：`Mock`支持
* `vite-plugin-svg-icons`：`svg`图标
* `unplugin-auto-import/vite`：按需自动导入
* `unplugin-vue-components/vite`：按需组件自动导入
* `unocss/vite`：原子化`css`

官方插件：https://cn.vitejs.dev/plugins/

社区插件：https://github.com/vitejs/awesome-vite#plugins

#### 14.1.3.1 gzip压缩打包

`GitHub`地址：https://github.com/vbenjs/vite-plugin-compression

```shell
npm i vite-plugin-compression -D
```

```typescript
//vite.config.ts
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    vue(),
    //默认压缩gzip，生产.gz文件
    viteCompression({
      deleteOriginFile: false, //压缩后是否删除源文件
    }),
  ],
});
```

一般来说，真正想使用`gzip`压缩来优化项目，还需要在`nginx`中开启`gzip`并进行相关配置，这一步交给后端来处理。

#### 14.1.3.2 打包分析可视化

`GitHub`地址：https://github.com/btd/rollup-plugin-visualizer

```shell
npm i rollup-plugin-visualizer -D
```

```typescript
//vite.config.ts
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {visualizer} from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true, //build后，是否自动打开分析页面，默认false
      gzipSize: true, //是否分析gzip大小
      brotliSize: true, //是否分析brotli大小
      //filename: 'stats.html'//分析文件命名
    }),
  ],
});
```

`npm build`后，分析图`html`文件会在根目录下生成，默认命名为`stats.html`。

#### 14.1.3.3 集成按需引入配置

```shell
npm i -D unplugin-vue-components unplugin-auto-import
```

以`ElementPlus`组件库为例子，在`vite.config.ts`中配置如下：

```typescript
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import {
  AntDesignVueResolver,
  ElementPlusResolver,
} from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        //AntDesignVueResolver({ importStyle: "less" }),
        ElementPlusResolver({importStyle: "sass"}),
      ],
      dts: "src/typings/components.d.ts", //自定义生成 components.d.ts 路径
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        //一些全局注册的hook等，无需局部引入
        {
          // "@/hooks/useMessage": ["useMessage"],
        },
      ],
      resolvers: [ElementPlusResolver()], //AntDesignVueResolver()
      dts: "src/typings/auto-imports.d.ts", //自定义生成 auto-imports.d.ts 路径
    }),
  ],
});
```

`unplugin-vue-components`会在`src/typings`文件夹下生成`components.d.ts`类型文件。

`unplugin-auto-import`会在`src/typings`文件夹下生成`auto-imports.d.ts`类型文件。

`unplugin-vue-components`插件会自动引入`UI`组件及`src`文件夹下的`components`组件，规则是`src/components/*.{vue}`。

请确保你的项目中拥有`src/typings`文件夹，或更改上述配置项的`dts`路径。

如果使用了`TypeScript`的话，需要在`tsconfig.json`中引入组件库的类型声明文件：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "types": [
      "node",
      "vite/client",
      "element-plus/global"
    ]
  }
}
```

### 14.1.4 环境变量

#### 14.1.4.1 基础配置

环境变量。顾名思义，在不同环境下呈现不同的变量值

`Vite`在一个特殊的`import.meta.env`对象上暴露环境变量，这些变量在构建时会被静态地替换掉。这里有一些在所有情况下都可以使用的内建变量：

* `import.meta.env.MODE`（`string`）：应用运行的模式。`development`表示开发环境，`production`表示生产环境。
* `import.meta.env.BASE_URL`（`string`）：部署应用时的基本`URL`。他由`base`配置项决定，默认为`/`。
* `import.meta.env.PROD`（`boolean`）：应用是否运行在生产环境（使用`NODE_ENV='production'`
  运行开发服务器或构建应用时使用`NODE_ENV='production'`）。
* `import.meta.env.DEV`（`boolean`）：应用是否运行在开发环境（永远与`import.meta.env.PROD`相反）。
* `import.meta.env.SSR`（`boolean`）：应用是否运行在`server`上。

#### 14.1.4.2 配置文件

在`Vite`中，只有以`VITE_`为前缀的变量才会交给`Vite`来处理，比如

```typescript
VITE_KEY = 123;
```

如果要改前缀的话，在`vite.config.ts`中设置`envPrefix` ，它可以是一个字符串或者字符串数组

定义环境变量，首先先创建几个环境变量存放的文件，一般是放在根目录下：

`Vite`也提供了`envDir`用来自定义环境文件存放目录

* 新建`.env`文件，表示通用的环境变量，优先级较低，会被其他环境文件覆盖
* 新建`.env.development`文件，表示开发环境下的环境变量
* 新建`.env.production`文件，表示生产环境下的环境变量

需要的话，你可以加入更多的环境，比如预发布环境`.env.staging`(它的配置一般与生产环境无异，只是`url`变化)
和测试环境`.env.testing`。

`.env`文件：

```env
// 网站标题
VITE_GLOB_APP_TITLE = clean Admin

// 在本地打开时的端口号
VITE_PROT = 8888
```

`.env.development`文件：

```env
// 本地环境

// API 请求URL
VITE_API_URL = ""
```

`.env.production`文件：

```env
// 生产环境

// API 请求URL
VITE_API_URL = ""
```

在默认情况下，运行的脚本`npm dev`命令是会加载`.env.development`中的环境变量，而脚本`build`命令是加载`.env.production`
中的环境变量。

了解更多请参阅：https://cn.vitejs.dev/guide/env-and-mode#modes

最常见的业务场景就是，前端与后端的接口联调，本地开发环境与线上环境用的接口地址不同，这时只需要定义不同环境文件的相同变量即可
也可以通过在`package.json`中改写脚本命令来自定义加载你想要的环境文件，关键词是`--mode`

```json
//package.json
{
  "scripts": {
    "dev": "vite --mode production"
    "build": "vue-tsc -b && vite build",
    "build:dev": "vue-tsc -b && vite build --mode development"
  }
}
```

如果使用了`TypeScript`的话，可以为环境变量提供智能提示。在`src/typings`目录下新建一个`env.d.ts`，写入以下内容：

```typescript
// 环境变量-类型提示
interface ImportMetaEnv {
  /** 全局标题 */
  readonly VITE_APP_TITLE: string;
  /** 本地开发-端口号 */
  readonly VITE_DEV_PORT: number;
  // 加入更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

记得在`tsconfig`文件中配置`include`引入类型声明文件，`typings`代表你的类型文件目录名称

```json
{
  // "compilerOptions": {},
  "include": [
    "typings/**/*.d.ts",
    "typings/**/*.ts"
  ]
}
```

#### 14.1.4.3 在配置中使用环境变量

环境变量通常可以从`process.env`获得。

注意`Vite`默认是不加载`.env`文件的，因为这些文件需要在执行完`Vite`配置后才能确定加载哪一个，举个例子，`root`和`envDir`
选项会影响加载行为。不过当你的确需要时，你可以使用`Vite`导出的`loadEnv`函数来加载指定的`.env`文件。

```typescript
import {defineConfig, loadEnv} from 'vite'

export default defineConfig(({mode}) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
```

`loadEnv`函数是用来加载`envDir`中的`.env`文件（一般是放在根目录下）。

* `mode`：当前环境模式，开发环境、生产环境等。
* `envDir`：`env`文件目录地址。
* `prefixes`：环境变量前缀，默认是`VITE_`。

此时加载的`env`文件内容为字符串，需要对内容进行处理（详见`processEnv.js`文件）。

### 14.1.5 CSS配置

参考：https://cn.vitejs.dev/config/shared-options#css-preprocessoroptions

以`scss`为例。手写确保你已经安装了`sass`。

```shell
npm install sass
```

创建`scss`文件。

```scss
// src/styles/variables.scss
$primary-color: #4e6ef2;
```

在`vite.config.js`中配置`preprocessorOptions`和`additionalData`：

```javascript
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
});
```

在`Vue`组件中使用全局变量时，不需要手动导入`variables.scss`，因为`additionalData`已经在每个`SCSS`文件中注入了这些变量。例如：

```vue
<!-- 注意：使用全局变量的组件，必须有 scss 的样式块，否则不会注入全局变量 -->
<template>
  <div class="container">
    <h1>Hello, Vite and SCSS!</h1>
  </div>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style scoped lang="scss">
  .container {
    color: $primary-color;
  }
</style>
```

### 14.1.6 依赖预构建配置

参考：https://cn.vitejs.dev/config/dep-optimization-options
https://cn.vitejs.dev/guide/dep-pre-bundling.html

在`Vite`中，依赖预构建是指将第三方依赖预先编译和优化，以便在开发过程中更快地构建和加载这些依赖。

这种预构建的方式有助于减少开发服务器在启动和重新加载时的延迟，并且可以利用现代浏览器的`ES`模块支持来更高效地加载模块。

预构建的优势：

* 更快地开发启动时间
* 更快的热更新
* 现代浏览器的`ES`模块支持

#### 14.1.6.1 预构建的目的

1、**`CommonJS`和`UMD`兼容性：** 在开发阶段中，`Vite`的开发服务器将所有代码视为原生`ES`模块。因此，`Vite`必须先将以`CommonJS`
或`UMD`形式提供的依赖项转换为`ES`模块。

在转换`CommonJS`依赖项时，`Vite`会进行智能导入分析，这样即使模块的导出是动态分配的（例如`React`），具名导入（`named imports`
）也能正常工作：

```javascript
// 符合预期
import React, {useState} from 'react'
```

2、**性能：** 为了提高后续页面的加载性能，`Vite`将那些具有许多内部模块的`ESM`依赖项转换为单个模块。

有些包将它们的`ES`模块构建为许多单独的文件，彼此导入。例如，`lodash-es`有超过`600`
个内置模块！当我们执行`import { debounce } from 'lodash-es'`时，浏览器同时发出`600`多个`HTTP`
请求。即使服务器能够轻松处理它们，但大量请求会导致浏览器端的网络拥塞，使页面加载变得明显缓慢。

通过将`lodash-es`预构建成单个模块，现在我们只需要一个`HTTP`请求。

**注意：依赖预构建仅适用于开发模式，并使用`esbuild`将依赖项转换为`ES`模块。在生产构建中，将使用`@rollup/plugin-commonjs`。**

#### 14.1.6.2 自定义行为

有时默认的依赖启发式算法`discovery heuristics`可能并不总是理想的。如果您想要明确地包含或排除依赖项，可以使用
[optimizeDeps](https://cn.vitejs.dev/config/dep-optimization-options#dep-optimization-options)配置项来进行设置。

* `optimizeDeps.include`：强制预构建链接的包。
* `optimizeDeps.exclude`：在预构建中强制排除的依赖项。

`optimizeDeps.include`或`optimizeDeps.exclude`的一个典型使用场景，是当`Vite`在源码中无法直接发现`import`
的时候。例如，`import`可能是插件转换的结果。这意味着`Vite`无法在初始扫描时发现`import`
。只有文件在浏览器请求加载并转换后才会发现。这将导致服务器在启动后立即重新打包。

`include`和`exclude`都可以用来处理这个问题。如果依赖项很大（包含很多内部模块）或是`CommonJS`
，那么你应该包含它；如果依赖项很小，并且已经是有效的`ESM`，则可以排除它，让浏览器直接加载它。

你可以通过`optimizeDeps.esbuildOptions`选项进一步自定义`esbuild`。例如，添加一个`esbuild`
插件来处理依赖项中的特殊文件，或者更改[build target](https://esbuild.github.io/api/#target)。

示例：

```javascript
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: [
      "qs",
      "echarts",
      "@vueuse/core",
      "nprogress",
      "lodash-es",
      "dayjs",
    ],
    exclude: [],
  },
});
```

#### 14.1.6.3 缓存

1、文件系统缓存

`Vite`将预构建的依赖项缓存到`node_modules/.vite`中。它会基于以下来源来决定是否需要重新运行预构建步骤：

* 包管理器的锁文件内容，例如`package-lock.json`，`yarn.lock`，`pnpm-lock.yaml`，或者`bun.lockb`。
* 补丁文件夹的修改时间。
* `vite.config.js`中的相关字段。
* `NODE_ENV`的值。

只有在上述其中一项发生更改时，才需要重新运行预构建。

如果出于某些原因（比如自己手写的依赖包进行了更新且重新下载依赖后，依赖缓存仍为旧依赖包）需要强制`Vite`
重新构建依赖项，你可以在启动开发服务器时指定`--force`选项，或手动删除`node_modules/.vite`缓存目录。

2、浏览器缓存

已预构建的依赖请求使用`HTTP`头`max-age=31536000`,`immutable`
进行强缓存，以提高开发工作时页面重新加载的性能。一旦被缓存，这些请求将永远不会再次访问开发服务器。如果安装了不同版本的依赖项（这反映在包管理器的`lockfile`
中），则会通过附加版本查询自动失效。如果你想通过本地编辑来调试依赖项，您可以：

1. 通过浏览器开发工具的`Network`选项卡暂时禁用缓存。
2. 重启`Vite`开发服务器指定`--force`选项，来重新构建依赖项。
3. 重新载入页面。

### 14.1.7 打包配置

生产环境去除`console.log`、`debugger`（`esbuild`模式）

```javascript
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  esbuild: {
    drop: ["debugger"],
    pure: ["console.log"],
  },
});
```

### 14.1.8 分包策略

分包策略是指将一个大型项目或应用按照一定的规则和逻辑拆分成多个独立的模块或包。这些模块可以是功能模块、业务模块、技术模块等。通过分包，可以实现代码的解耦、提高编译效率、优化资源加载速度、提升用户体验。

#### 14.1.8.1 分包的作用

分包是一种优化程序加载速度，性能的策略和操作

安装了很多依赖包的项目进行打包时，代码都打包成一个`js`文件。只修改其中的一些文件重新打包上线，浏览器会重新加载这个`js`
文件。但你只修改了项目其中一部分，却要把整个文件都重新加载一边，是否合理呢？特别是当项目越来越大时，你就会发现页面的加载速度越来越慢
所以，分包策略的作用在于：

* 减少代码体积和加载时间：当你的项目包含多个模块或者依赖项时，将它们分割成多个包可以减少单个包的体积。并且只重新加载修改的文件，减少加载时间。
* 提高缓存利用率：处理部分包而不是全部，分包可以提高浏览器的缓存命中率，从而减少不必要的网络请求，加快页面加载速度。
* 优化资源结构：对于大型项目或者复杂的应用程序，通过合理划分功能模块和依赖项，有利于管理项目的整理结构和维护。

#### 14.1.8.2 常见分包策略

分包策略根据项目不同，会呈现出不同的策略，这里提供一些通用的思路

1、按功能模块分包

将应用按照功能模块划分，如用户管理模块、订单管理模块等。例如，在一个电商应用中，可以将用户界面`UI`、数据模型、网络请求等分别分包。

2、按技术层分包

按照`MVC`、`MVVM`等设计模式分层，如`UI`层、业务逻辑层、数据层

3、按业务领域分包

适用于复杂业务场景，如订单管理、库存管理等

4、优化第三方库的加载

将第三方库（如`React`、`Vue`）单独打包并进行长期缓存，减少加载成本

5、利用浏览器缓存：

将不常变化的代码（如三方库、框架代码）与常变化的业务代码分离，前者可以长期缓存

**注意事项：**
分包的平衡性：避免分包过小导致过多`HTTP`请求，或分包过大导致加载时间过长。
避免过度分包：过度分包可能导致包数量过多，反而影响性能。

#### 14.1.8.3 Vite分包示例

分包需要一定的前端工程化及性能优化知识，参阅[Rollup](https://www.rollupjs.com/)

在`vite.config.js`中的简单分包：

```javascript
// manualChunks.js 文件
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
  /**
   * 根据依赖项详细信息进行分包
   * @param id 依赖项详细信息
   * @returns {string} 分包名
   */
  const manualChunks = (id) => {
    if (id.includes('node_modules')) {
      if (id.includes('lodash-es')) {
        return 'lodash-vendor'; // 将包含 lodash-es 的代码打包到 lodash-vendor chunk
      }
      if (id.includes('element-plus')) {
        return 'el-vendor'; // 将包含 element-plus 的代码打包到 el-vendor chunk
      }
      if (id.includes('@vue') || id.includes('vue')) {
        return 'vue-vendor'; // 将包含 @vue 和 vue 的代码打包到 vue-vendor chunk
      }
      return 'vendor'; // 其余内容打包到 vendor chunk
    }
  };

  return {
    plugins: [vue()],
    build: {
      chunkSizeWarningLimit: 1500, // 超出 chunk 大小警告阈值，默认500kb
      // Rollup 打包配置
      rollupOptions: {
        output: {
          entryFileNames: "assets/js/[name]-[hash:8].js", // 入口文件输出的文件的命名规则
          chunkFileNames: "assets/js/[name]-[hash:8].js", // 代码分割生成的 chunk 文件的命名规则
          assetFileNames: "assets/[ext]/[name]-[hash:8][extname]", // 静态资源的文件名和存放路径
          manualChunks, // 代码分割策略
        },
      },
    },
  }
});
```
