import { editPassword, login, logout, userInfo } from "@/api/user";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import menulist from "@/assets/menulist";
import router, { filterAsyncRoutes } from "@/router";
import { ref, toRaw } from "vue";
import { UserPermsMenu } from "@/api/menu";
import { ElMessage } from "element-plus";
// import { menuList } from "@/api/menu";
// const menulList = menulist;
// let routes = ref();
export interface UserState {
  token: string;
  userInfo: any;
  routes: [];
  perms?: string[];
}
// 最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: "",
      // 用户信息
      userInfo: {},
      // 路由
      routes: [],
    };
  },
  getters: {},
  actions: {
    login(playload: any) {
      const { username, password } = playload;
      return new Promise((resolve, reject) => {
        login({
          username: username.trim(),
          password: password,
        })
          .then(async (res) => {
            let resData = res.data;
            if (resData.code == 200) {
              // 登录后存储等
              this.token = resData.data.token;
              localStorage.setItem("token", this.token);
              await userInfo().then((res: any) => {
                if (res.code === 200) {
                  this.userInfo = res.data;
                  localStorage.setItem(
                    "userInfo",
                    JSON.stringify(this.userInfo)
                  );
                }
              });
            } else {
              // 接口status不管是200还是500 && response.code不为200
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async logout() {
      let data = await logout();
      if (data.code == 200) {
        // this.$patch({
        //   userInfo: {},
        //   token:""
        // });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        this.routes = [];
        router.push("/login");
      }
    },
    async resetPassword(params: any) {
      let data = await editPassword(params);
      return data;
    },
    async getUserInfo() {
      let data = await UserPermsMenu();
      if (data.code === 200) {
        if (data.data.length === 0) {
          ElMessage({
            message: "暂时无页面权限，请联系管理员添加页面权限",
            type: "warning",
            duration: 3000, // 显示3秒后消失
          });
          return;
        } else {
          this.routes = await filterAsyncRoutes(data.data);
        }
      } else {
        router.push("/login");
      }
    },
  },
});
