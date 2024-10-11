import { toRaw } from "vue";
import router from "./router";
import { useUserStore } from "./stores/modules/user";

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  const userStore = useUserStore();
  console.log(to, from);
  if (!token) {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      if (userStore.routes.length === 0) {
        await userStore.getUserInfo();
        const routes = userStore.routes;
        const arr_list = toRaw(routes);
        arr_list.forEach((route: any) => {
          router.addRoute(route);
        });
        if(arr_list.length === 0){
          next()
        }
        if (to.query) {
          next({ path: to.path, query: to.query });
        } else {
          next({ path: to.path });
        }
      } else {
        next();
      }
    }
  }
});
