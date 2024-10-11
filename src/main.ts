import "./assets/common/common.scss";
import "./assets/common/elementplus.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./permission";

const app = createApp(App);
// 创建pinia 实例
const pinia = createPinia();
app.use(pinia);
//   await router_fun();
app.use(router); //路由配置前添加动态路由 防止页面丢失
app.mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
