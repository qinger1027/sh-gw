import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"], //自动引入vue、vue-router、无需在页面中再次引入
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      // deep:true, //搜索子目录
      // dirs: ['src/components'],//按需加载的文件夹
      resolvers: [ElementPlusResolver()], //elementplus按需加载
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
 // 构建输出配置
  build: {
      outDir: './dist',
      target: 'modules',
      assetsDir: 'assets',
      assetsInlineLimit: 0,
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      // "/api": {
      //   // 请求接口中要替换的标识
      //   target: "http://192.168.20.187:9015", // 代理地址
      //   changeOrigin: true, // 是否允许跨域
      //   // secure: true,// 仅通过HTTPS传输
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
      "/testapi": {
        // 请求接口中要替换的标识
        target: `https://test-icash${6}.duxiaoman.com`, // 代理地址
        changeOrigin: true, // 是否允许跨域
        rewrite: (path) => path.replace(/^\/testapi/, ""),
        bypass(req: any, res: any, options: any) {
          const proxyURL = options.target + options.rewrite(req.url);
          req.headers['x-req-proxyURL'] = proxyURL // 设置未生效
          res.setHeader("x-req-proxyURL", proxyURL); // 设置响应头在浏览器中可见
        }
      },
    },
  },
});
