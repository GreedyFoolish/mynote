// vite.config.js
import {defineConfig} from "vite";
import path from "path";
// import { ViteAliases } from "vite-aliases"

export default defineConfig({

    // 指定项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
    root: process.cwd(), // 默认：process.cwd();

    // 开发或生产环境服务的公共基础路径。
    // 合法的值包括以下几种：1. 绝对 URL 路径名，例如 /foo/; 2.完整的 URL，例如 https://foo.com/; 3.空字符串或 ./（用于嵌入形式的开发）;
    base: "/", // 默认："/";

    mode: "development", // 默认："development" 用于开发，"production" 用于构建；在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。

    // 作为静态资源服务的文件夹；
    // 开发期间在 "/" 提供，构建期间会将整个目录内的文件原封不动（不会进行转换）的复制到 outDir 的根目录；
    // 如：要使用 public/icon.png ，在项目源码中直接 "/icon.png" 这样使用即可；
    // public 中的文件，不应该在 js 文件使用；如  import, require 使用等；因为 public 中的文件是作为静态使用的；不应该经过编译构建处理；
    // 关闭此项功能 设置：publicDir: false; 即可；
    publicDir: "public", // 默认："public"; 该值可以是文件系统的绝对路径，也可以是相对于项目根目录的相对路径。

    // 存储缓存文件的目录。
    // 想要重新生成缓存的话, 可使用 --force 命令；如： $ vite --force, $ vite preview --force;
    // 此选项的值可以是文件的绝对路径，也可以是以项目根目录为基准的相对路径；
    // 没有检测到 package.json 时， 默认为： .vite;
    cacheDir: "node_modules/.vite", // 默认："node_modules/.vite"；

    // 定义全局常量替换方式。
    // 其中每项在开发环境下会被定义在全局，如：window.<define.key>;
    // 而在构建时被静态替换。
    define: {
        // __KEY__: value // value 如果是字符串，需要JSON.stringify(value)
    },

    envDir: process.cwd(), // 默认：root 指定的路径; 用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。

    envPrefix: ["VITE_", "APP_", "ENV_"], // 默认：VITE_; 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。

    // 对 css 的行为进行配置
    css: {

        // 配置 css modules 的行为；
        // modules 的配置最终会给到 postcss-modules（https://github.com/css-modules/postcss-modules）， 进行处理； 可参考 postcss-modules 的配置；
        modules: {

            // scopeBehaviour：配置当前的模块化行为是模块化还是全局化 (有hash就是开启了模块化的一个标志, 因为他可以保证产生不同的hash值来控制我们的样式类名不被覆盖)
            scopeBehaviour: "local", // 默认：local; 可选: global | local;

            // globalModulePaths: 为全局模块定义路径。它是一个用正则表达式定义路径的数组；代表你不想参与到 css模块化的路径；
            // 如下：
            // globalModulePaths: ["./global/global.module.less", "./xxx.module.css", "./yyy"] 定义文件路径 或 文件夹路径；
            // globalModulePaths: [/.\/global\/style\//], // 使用正则表达式
            globalModulePaths: [/.\/global\/style\//],

            // generateScopedName: 通过插值字符串的形式，配置参考：interpolatename（https://github.com/webpack/loader-utils#interpolatename）
            // generateScopedName: "[name]__[local]___[hash:base64:5]",
            // generateScopeName: 通过 callback 函数的形式自定义生成的类名；提供的参数：name（类名）、filename（文件名）、css（css 块）
            // generateScopedName: (name, filename, css) => {
            //   console.log("name -> ", name)
            //   console.log("filename -> ", filename)
            //   console.log("css -> ", css)
            //   const path = require("path");
            //   const i = css.indexOf("." + name);
            //   const line = css.substr(0, i).split(/[\r\n]/).length;
            //   const file = path.basename(filename, ".css");
            //   return "_" + file + "_" + line + "_" + name;
            // },

            // 生成 hash 会根据你的类名 + 一些其他的字符串(文件名 + 它内部随机生成一个字符串)去进行生成, 如果你想要你生成 hash 更加的独特一点, 你可以配置 hashPrefix, 你配置的这个字符串会参与到最终的 hash 生成,
            // （hash: 只要你的字符串有一个字不一样, 那么生成的 hash 就完全不一样, 但是只要你的字符串完全一样, 生成的 hash 就会一样）
            hashPrefix: "prefix", // 默认："prefix";

            // localsConvention： 设置导出的样式 classnames 的 json 对象的 key 的展示形式；（驼峰 | 仅驼峰 | 中划线 | 仅中划线）；
            // 或者根据 originalClassName（原始类名）、generatedClassName（生成的唯一类名）、inputFile（输入类名的文件） 参数自定义类名；
            localsConvention: "camelCaseOnly", // 默认：null; 可选："camelCase" | "camelCaseOnly" | "dashes" | "dashesOnly";
            // localsConvention: (originalClassName, generatedClassName, inputFile) => {
            //   console.log("originalClassName -> ", originalClassName)
            //   console.log("generatedClassName -> ", generatedClassName)
            //   console.log("inputFile -> ", inputFile)
            //   return "test"
            // }，
        },

        // preprocessorOptions: 指定传递给 CSS 预处理器的选项; key + config;
        // key 代表预处理器的名; config: options 选项配置； 如下， less 预处理配置：
        // 所有预处理器选项还支持 additionalData 选项，可以用于为每个样式内容注入额外代码。
        preprocessorOptions: {

            // 整个的配置对象都会最终给到 less的执行参数（全局参数）中去，相当于 webpack 中给 less-loader 传递配置参数；
            less: {
                math: "always", // 较少进行数学计算，兼容更多数学计算的写法；
                globalVars: { // 配置 less 的全局变量
                    mainColor: "yellow"
                }
            }
        },

        // 在开发过程中是否启用 css 的 sourcemap;
        devSourcemap: true,

        // postcss: 配置postcss相关；使用此属性，postcss.config.js 文件会失效；所以只能二选一；
        // postcss: {},
    },

    resolve: {
        // 给路径定义别名
        // 当使用文件系统路径的别名时，请始终使用绝对路径。相对路径的别名值会原封不动地被使用，因此无法被正常解析。
        // 值将会被传递到 @rollup/plugin-alias 作为 entries 的选项。也可以是一个对象，或一个 { find, replacement, customResolver } 的数组。
        // [Note]: 重命名的路径不应该以 ‘/’ 结尾
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
        },

        // 将此 dedupe 设置中的库名，经过检索，只取一个版本的库（最外层的根库）；
        dedupe: [], // 默认：[];

        // 解决程序包中 情景导出 时的其他允许条件。
        // 默认允许的情景是：import，module，browser，default 和基于当前情景为 production/development。
        // 当然也可以自定义；
        conditions: [],

        // package.json 中，在解析包的入口点时尝试的字段列表。注意：这比从 exports 字段解析的情景导出优先级低：如果一个入口点从 exports 成功解析，resolve.mainFields 将被忽略。
        mainFields: ["module", "jsnext:main", "jsnext"], // 默认：["module", "jsnext:main", "jsnext"]；

        // 是否启用对 browser 字段的解析。
        // 在未来，resolve.mainFields 的默认值会变成 ["browser", "module", "jsnext:main", "jsnext"] 而这个选项将被移除。
        browserField: true, // 默认: true;

        // 导入时想要省略的扩展名的 后缀列表。
        // [NOTE]: 不建议忽略自定义的导入类型的扩展名（如: .vue 文件），因为它会影响 IDE 和类型支持。
        extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"], // 默认：[".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"]；

        // 启用此选项会使 Vite 通过原始文件路径（即不跟随符号链接的路径）而不是真正的文件路径（即跟随符号链接后的路径）确定文件身份。
        // preserveSymlinks: false 时, import myTestModule from "/@fs/Users/xxx/xxx/.../my-test-module/index.js"; // 符号链接后的路径
        // preserveSymlinks: true 时, import myTestModule from "/node_modules/.vite/deps/my-test-module.js?v=b98ad576"; // 使用原始文件路径；
        preserveSymlinks: false, // 默认: false;
    },

    // json 文件的处理
    json: {
        // 是否支持从 .json 文件中进行按名导入。
        namedExports: true, // 默认：true;

        // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候。
        // 开启此项，则会禁用按名导入。
        stringify: false, // 默认：false;
    },

    // 控制 esbuild 的转换
    // esbuild: {},
    esbuild: false,

    // 指定额外的 picomatch模式 作为静态资源处理
    // assetsInclude: ["**/*.gltf"],
    assetsInclude: "", // 类型： string | RegExp | (string | RegExp)[]

    // 调整控制台输出的级别，默认为 "info"。
    logLevel: "info", // 默认："info"; 类型： "info" | "warn" | "error" | "silent"

    // 自定义控制台 logger 记录
    // customLogger: {},

    // 触发终端输出时，是否清空终端上的信息
    clearScreen: false, // 默认：false； 类型： Boolean

    // 设置应用类型
    appType: "spa", // 默认： "spa"; 类型： "spa" | "mpa" | "custom"

    // 需要用到的插件数组。
    // 官方插件：https://cn.vitejs.dev/plugins/
    // 社区插件：https://github.com/vitejs/awesome-vite#plugins
    plugins: [
        // ViteAliases() // 自动根据项目目录进行 重命名操作的 插件；可替换 resolve.alias 的使用；
    ],

    // 开发服务器配置
    server: {

        // 指定服务器应该监听哪个 IP 地址, 将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
        host: "localhost", // 默认："localhost"; 类型：string | boolean;

        // 指定开发服务器端口；如果端口被占用，vite 会自动尝试下一个可用端口；
        port: 5173, // 默认：5173； 类型： number

        // 当端口被占用时，是否直接退出；
        strictPort: false, // 默认：false； 类型： boolean;

        // 启用 TLS + HTTP/2; 还可以借用插件 @vitejs/plugin-basic-ssl 或 vite-plugin-mkcert（推荐）做 https 的使用；
        https: true, // 默认： false; 类型：boolean | https.ServerOptions

        // 开发服务器启动时，自动在浏览器中打开应用程序；
        open: true, // 默认：true； 类型：boolean | string
        // open: "/docs/index.html",

        // 为开发服务器配置自定义代理规则。期望接收一个 { key: options } 对象。
        // 类型：Record<string, string | ProxyOptions>
        proxy: {
            // for example:
            // "/api": {
            //   target: "http://jsonplaceholder.typicode.com",
            //   changeOrigin: true,
            //   rewrite: (path) => path.replace(/^\/api/, ""),
            // },
        },

        // 为开发服务器配置 CORS。CorsOptions 参考 https://github.com/expressjs/cors#configuration-options
        cors: true, // 类型：boolean | CorsOptions

        // 指定服务器响应的 header。
        // 类型：OutgoingHttpHeaders
        headers: {},

        // 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。
        // 类型：boolean
        // 或类型： {
        //   protocol?: string,
        //   host?: string,
        //   port?: number,
        //   path?: string,
        //   timeout?: number,
        //   overlay?: boolean,
        //   clientPort?: number,
        //   server?: Server
        // },
        hmr: true,

        // 传递给 chokidar 的文件系统监听器选项。
        // github choidar： https://github.com/paulmillr/chokidar#api
        // Vite 服务器默认会忽略对 .git/ 和 node_modules/ 目录的监听。
        // 类型：object
        watch: {},

        // 以中间件模式创建 Vite 服务器。（不含 HTTP 服务器）
        // 类型："ssr" | "html";
        // 当前：Setting server.middlewareMode to "html" is deprecated, set server.middlewareMode to `true` instead
        // middlewareMode: true, // 默认： true;

        // 在 HTTP 请求中预留此文件夹，用于代理 Vite 作为子文件夹时使用。应该以 / 字符开始。
        // vite 作为服务器，被代理请求时使用
        base: "/x",

        fs: {
            // 限制为工作区 root 路径以外的文件的访问。
            // 类型： boolean
            strict: true, // 默认：true

            // 限制哪些文件可以通过 /@fs/ 路径提供服务。当 server.fs.strict 设置为 true 时，访问这个目录列表外的文件将会返回 403 结果。
            // 类型： string[]
            allow: [],

            // 用于限制 Vite 开发服务器提供敏感文件的黑名单。
            // 类型： string[]
            deny: [".env", ".env.*", "*.{pem,crt}"],
        },

        // 用于定义开发调试阶段生成资源的 origin。
        origin: "undefined", // 默认： undefined;

        // 是否忽略服务器 sourcemap 中的源文件，用于填充 x_google_ignoreList source map 扩展。
        // 类型： false | (sourcePath: string, sourcemapPath: string) => boolean
        sourcemapIgnoreList: (sourcePath) => sourcePath.includes("node_modules"), // 默认： (sourcePath) => sourcePath.includes("node_modules")
    },

    // 构建选项
    build: {
        // 设置最终构建的浏览器兼容目标
        target: "modules", // 默认： "modules"; 类型： string | string[]

        // 默认情况下，一个 模块预加载 polyfill 会被自动注入。
        // 类型：boolean | { polyfill?: boolean, resolveDependencies?: ResolveModulePreloadDependenciesFn }
        // 默认： { polyfill: true }
        modulePreload: {polyfill: true},

        // 已经废弃，使用 build.modulePreload.polyfill 替代
        // polyfillModulePreload: true, // 默认：true; 类型： boolean;

        // 指定输出路径
        outDir: "dist", // 默认： "dist"; 类型：string;

        // 指定生成静态资源的存放路径（相对于 build.outDir）。在 库模式 下不能使用；
        assetsDir: "assets", // 默认："assets"; 类型：string;

        // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
        assetsInlineLimit: 14096, // 默认：4096；类型：number;

        // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。
        cssCodeSplit: true, // 默认：true; 类型： boolean;

        // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，此处的 target 并非是用于 JavaScript 转写目标。
        // 应只在针对非主流浏览器时使用。
        cssTarget: ["es2020", "edge88", "firefox78", "chrome87", "safari14"], // 默认：与 build.target 一致；类型：string | string[];

        // 此选项允许用户覆盖 CSS 最小化压缩的配置，而不是使用默认的 build.minify，这样你就可以单独配置 JS 和 CSS 的最小化压缩方式。Vite 使用 esbuild 来最小化 CSS。
        cssMinify: "esbuild", // 默认：与 build.minify 一致； 类型：boolean;

        // 构建后是否生成 source map 文件
        sourcemap: false, // 默认：false; 类型：boolean | "inline" | "hidden";

        // 自定义底层的 Rollup 打包配置。
        // 这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并。
        // 参考：https://cn.rollupjs.org/configuration-options/
        // 参考：https://rollupjs.org/configuration-options/
        rollupOptions: {}, // 类型： RollupOptions;

        // 传递给 @rollup/plugin-commonjs 插件的选项。
        // @rollup/plugin-commonjs 插件: 一个Rollup插件，用于将CommonJS模块转换为ES6，这样它们就可以包含在Rollup包中
        // 参考：https://github.com/rollup/plugins/tree/master/packages/commonjs
        commonjsOptions: {}, // 类型：RollupCommonJSOptions；

        // 传递给 @rollup/plugin-dynamic-import-vars 插件的选项。
        // 插件 @rollup/plugin-dynamic-import-vars ： 一个rollup插件，支持rollup中 在动态导入中使用变量。
        // 参考：https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars
        dynamicImportVarsOptions: {}, // 类型：RollupDynamicImportVarsOptions

        // 构建为库
        // 类型：{
        //  entry: string | string[] | { [entryAlias: string]: string },
        //  name?: string,
        //  formats?: ("es" | "cjs" | "umd" | "iife")[],
        //  fileName?: string | ((format: ModuleFormat, entryName: string) => string)
        // }
        // lib: {
        //   entry: "./main4.js",
        //   name: "MyLib",
        //   formats: ["es", "umd"],
        //   fileName: "my.lib"
        // },

        // 当该值为 boolean 值时，设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 过的资源文件名和 hash 后版本的映射。可以为一些服务器框架渲染时提供正确的资源引入链接。
        // 当该值为一个字符串时，它将作为 manifest 文件的名字。
        manifest: false, // 默认：false; 类型： boolean | string;

        // 生成面向 SSR 的构建。
        // 1. 该值为字符串时，用于指定 SSR 的入口；
        // 2. 该值为 boolean 值时，如果为 true, 需要通过设置 rollupOptions.input 来指定 SSR 的入口。
        ssr: false, // 默认：false; 类型： boolean | string;

        // 指定使用哪种混淆器
        // 类型：boolean | "terser" | "esbuild"
        minify: "esbuild", // 默认："esbuild";

        // 传递给 Terser 的更多 minify 选项。如果 minify: "terser" 时，需配置此项，否则不需要
        // 参考 github: https://github.com/terser/terser
        // 参考 官网： https://terser.org/
        // terserOptions: {}

        // 设置为 false 来禁用将构建后的文件写入磁盘。
        // 这常用于 编程式地调用 build() 在写入磁盘之前，需要对构建后的文件进行进一步处理。
        write: true, // 默认： true; 类型： boolean;

        // 设置 Vite 在构建时是否清空该目录；
        // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。若 outDir 在根目录之外则会抛出一个警告避免意外删除掉重要的文件。可以设置该选项来关闭这个警告。
        // 类型：boolean
        emptyOutDir: true, // 默认：若 outDir 在 root 目录下，则为 true；

        // 默认情况下，Vite 会在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中。可以通过设置该选项为 false 来禁用该行为。
        copyPublicDir: true, // 默认：true; 类型：boolean;

        // 启用/禁用 gzip 压缩大小报告。
        reportCompressedSize: true, // 默认：true; 类型：boolean;

        // 规定触发警告的 chunk 大小（以 kb 为单位）。
        // 它将与未压缩的 chunk 大小进行比较，因为 JavaScript 大小本身与执行时间相关。
        chunkSizeWarningLimit: 500, // 默认： 500； 类型： number;

        // 构建监听设置，当项目发生修改变化时，会根据 watch 的配置，自动进行重新构建；
        // 设置为 {} 则会启用 rollup 的监听器。对于只在构建阶段或者集成流程使用的插件很常用。
        // 参考：https://rollupjs.org/configuration-options/#watch
        watch: null, // 默认： null; 类型： WatcherOptions | null;
    },

    // 预览选项
    preview: {
        // 为开发服务器指定 ip 地址。 设置为 0.0.0.0 或 true 会监听所有地址，包括局域网和公共地址。
        host: "localhost", // 默认：server.host; 类型：string | boolean;

        // 指定开发服务器端口。注意，如果设置的端口已被使用，Vite 将自动尝试下一个可用端口，所以这可能不是最终监听的服务器端口。
        port: 4173, // 默认： 4173； 类型： number;

        // 设置为 true 时，如果端口已被使用，则直接退出，而不会再进行后续端口的尝试。
        strictPort: false, // 默认：server.strictPort； 类型：boolean;

        // 启用 TLS + HTTP/2。注意，只有在与 server.proxy 选项 同时使用时，才会降级为 TLS。
        // 该值也可以传递给 https.createServer() 的 options 对象。
        https: false, // 默认： server.https; 类型：boolean | https.ServerOptions;

        // 开发服务器启动时，自动在浏览器中打开应用程序。
        // 当该值为字符串时，它将被用作 URL 的路径名。
        // 如果你想在你喜欢的某个浏览器打开该开发服务器，你可以设置环境变量 process.env.BROWSER （例如 firefox）。
        // 欲了解更多细节，请参阅 open 包的源码。
        // BROWSER 和 BROWSER_ARGS 是两个特殊的环境变量，你可以在 .env 文件中设置它们用以配置本选项。查看 open 这个包 了解更多详情。
        // open 这个包源码: https://github.com/sindresorhus/open#app
        open: true, // 默认：server.open; 类型：boolean | string;

        // 为开发服务器配置自定义代理规则。
        // 参考： https://github.com/http-party/node-http-proxy
        // 参考： https://github.com/http-party/node-http-proxy#options
        proxy: {}, // 默认：server.proxy; 类型： Record<string, string | ProxyOptions>；

        // 为开发服务器配置 CORS。此功能默认启用并支持任何来源。
        // 可传递一个 options 对象 来进行配置，或者传递 false 来禁用此行为。
        // 参考： https://github.com/expressjs/cors#configuration-options
        cors: true, // 默认：server.cors; 类型：boolean | CorsOptions;

        // 指明服务器返回的响应头。
        headers: {}, // 类型： OutgoingHttpHeaders；
    },

    // 优化选项
    optimizeDeps: {
        // 默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项（忽略了node_modules、build.outDir、__tests__ 和 coverage）。
        // 如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点。
        // 当显式声明了 optimizeDeps.entries 时默认只有 node_modules 和 build.outDir 文件夹会被忽略。如果还需忽略其他文件夹，你可以在模式列表中使用以 ! 为前缀的、用来匹配忽略项的模式。
        // 配置参考：https://github.com/mrmlnc/fast-glob
        entries: "index.html", // 默认：index.html; 类型：string | string[],

        // 在预构建中强制排除的依赖项。
        // 如使用 import lodash-es 时，设置 exclude: ["lodash-es"], 那么 lodash-es 就不会参加依赖预构建；网络请求针对 lodash-es 就会发出好多的请求；
        exclude: [], // 默认：[]; 类型：string[];

        // 默认情况下，不在 node_modules 中的 linked package 不会被预构建。
        // 使用此选项可强制预构建链接的包。
        include: [], // 默认：[]; 类型： string[];

        // 在依赖扫描和优化过程中传递给 esbuild 的选项。
        // 忽略了 external 选项，请使用 Vite 的 optimizeDeps.exclude 选项
        // plugins 与 Vite 的 dep 插件合并
        // 参考：https://esbuild.github.io/api/
        esbuildOptions: {}, // 类型：EsbuildBuildOptions;

        // 设置为 true 时， 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖。
        // 表现就是引用 lodash-es 时，每次启动开发服务器时，生成预构建包 lodash-es.js?v=6b6532a5 的 v 值都是不同的
        // 相反，设置为 false 时，每次启动开发服务器时，生成预构建包 lodash-es.js?v=6b6532a5 的 v 值都是相同的；证明每次都是用的同一份缓存；
        force: false, // 默认： false; 类型：boolean;

        // 禁用依赖优化，值为 true 将在构建和开发期间均禁用优化器。
        // 传 "build" 或 "dev" 将仅在其中一种模式下禁用优化器。
        // 默认情况下，仅在开发阶段启用依赖优化。
        disabled: "dev", // 默认："build"; 类型： boolean | "build" | "dev"

        // 依赖项的不同组合可能会导致其中一些以不同的方式进行预绑定。将这些包添加到 needsInterop 中可以通过避免整个页面的重新加载来加速冷启动。
        // 如果您的一个依赖项是这种情况，您将收到一个警告，建议将包名添加到配置中的此数组中。
        // 主要用于在 Vite 进行依赖性导入分析，这是由 importAnalysisPlugin 插件中的 transformCjsImport 函数负责的，它会对需要预编译且为 CommonJS 的依赖导入代码进行重写。
        needsInterop: [], // 默认：[]; 类型： string[];
    },

    // ssr 选项
    ssr: {
        // 列出的是要为 SSR 强制外部化的依赖
        external: [], // 类型：string[]；

        // 列出的是 防止被 SSR 外部化的依赖项。如果设为 true, 将没有依赖被外部化；
        noExternal: true, // 类型：string | RegExP | (string | RegExp)[] | true;

        // SSR 服务器的构建目标
        target: "node", // 默认： "node"; 类型："node" | "webworker";

        // SSR 服务器的构建语法格式。
        format: "esm", // 默认："node"; 类型："node" | "cjs";
    },

    // Worker 选项
    worker: {
        // worker 打包时的输出类型。
        format: "iife", // 默认："iife"; 类型："es" | "iife";

        // 应用于 worker 打包的 Vite 插件。
        // 注意 config.plugins 仅会在开发（dev）阶段应用于 worker，若要配置在构建（build）阶段应用于 worker 的插件则应该在本选项这里配置。
        plugins: [], // 类型：(Plugin | Plugin[])[];

        // 用于打包 worker 的 Rollup 配置项。
        // 配置参考：https://rollupjs.org/configuration-options/
        rollupOptions: {}, // 类型： RollupOptions;
    }

})
