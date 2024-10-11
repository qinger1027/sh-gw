import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes, Layout } from "./router";

// 匹配views里面所有的.vue文件，动态引入
// const modules = import.meta.glob("@/layout/default/components/main/*.vue");
const view_modules = import.meta.glob("@/views/**/*.vue");
console.log(view_modules);

export function filterAsyncRoutes(menu: any) {
  const routeMap: any = [];
  menu.forEach((e: any) => {
    // 只将页面信息添加到路由中
    let component = loadRouteView(e.component);
    let route = {
      id: e.id,
      name: e.path,
      path: e.path,
      meta: { title: e.name, icon: e.icon },
      component: component,
      children: e.children ? filterAsyncRoutes(e.children) : null,
      isShow: e.isShow,
    };
    routeMap.push(route);
  });
  return routeMap;
}

const loadRouteView = (component: string) => {
  return component === "layout"
    ? Layout
    : view_modules[`/src/views/${component}.vue`];
};

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory("/"),
  routes: constantRoutes,
});

export default router;
