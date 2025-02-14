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
