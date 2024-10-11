/**
 * Note: 路由配置项
 *
 * path: '/path'                    // 路由路径
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
	title: 'title'                  // 设置该路由在侧边栏的名字
	icon: 'icon-name'                // 设置该路由的图标
	activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
	query: '{"id": 1}'             // 访问路由的默认传递参数
	hidden: true                   // 当设置 true 的时候该路由不会在侧边栏出现 
    hideTab: true                   //当设置 true 的时候该路由不会在多标签tab栏出现
  }
 */
import type { RouteRecordRaw } from 'vue-router'

export const Layout = () => import("@/layout/index.vue"); 
export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        name: "404",
        component: () => import('@/views/error/404.vue'),
      },
    {
        path:'/',
        redirect:'/login'
    },
    {
        path: '/login',
        name:'login',
        component: () => import('@/views/account/login.vue')
    },
    {
        path: '/home',
        name:'home',
        component: Layout,
        meta:{title:"工作台"},
        children:[
            {
                path: '',
                name: 'home',
                component: () => import('@/views/home.vue'),
            }
        ]
    },
    // {
    //     path: '/authManage',
    //     component: Layout,
    //     // 重定向
    //     redirect:'/authManage/menu',
    //     meta:{title:"权限管理"},
    //     children:[
    //         {
    //             path: 'menu',
    //             name: 'menu',
    //             component: () => import('@/layout/default/components/main/menu.vue'),
    //             meta:{title:"菜单"}
    //         },
    //         {
    //             path: 'role',
    //             name: 'role',
    //             component: () => import('@/layout/default/components/main/role.vue'),
    //             meta:{title:"角色"}
    //         },
    //         {
    //             path: 'admin',
    //             component: () => import('@/layout/default/components/main/admin.vue'),
    //             name:'admin',
    //             meta:{title:"管理员"}
    //         }
    //     ]
    // },
    // {
    //     path: '/userManage',
    //     component: Layout,
    //     redirect:'/userManage/userlist',
    //     meta:{title:"用户管理"},
    //     children:[
    //         {
    //             path: 'userlist',
    //             name: 'userlist',
    //             component: () => import('@/layout/default/components/main/userlist.vue'),
    //             meta:{title:"用户列表"}
    //         },
    //         {
    //             path: 'userdetail',
    //             name: 'userdetail',
    //             component: () => import('@/layout/default/components/main/userdetail.vue'),
    //             meta:{title:"用户详情"}
    //         }
    //     ]
    // },
]

