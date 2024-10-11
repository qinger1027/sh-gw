const menulist = [
  {
    id: "3",
    icon: "List",
    name: "工作台",
    path: "/home",
  },
  {
    id: "1",
    icon: "Lock",
    name: "权限管理",
    component: "layout",
    path: "/authManage",
    children: [
      {
        id: "1-1",
        icon: "Operation",
        name: "菜单",
        path: "menu",
        component: "menu",
      },
      {
        id: "1-2",
        icon: "Female",
        name: "角色",
        path: "role",
        component: "role",
      },
      // {
      //   id:'1-3',
      //   icon:'Avatar',
      //   name:'管理员',
      //   path:'admin',
      //   component: "admin"
      // }
    ],
  },
  {
    id: "2",
    icon: "User",
    name: "用户管理",
    component: "layout",
    path: "/userManage",
    children: [
      {
        id: "2-1",
        icon: "List",
        name: "用户列表",
        path: "userlist",
        component: "userlist",
      },
      {
        id: "2-2",
        icon: "Memo",
        name: "用户详情",
        path: "userdetail",
        component: "userdetail",
      },
    ],
  },
  {
    id: "6",
    icon: "User",
    name: "门户管理",
    component: "layout",
    path: "/gatewayManage",
    children: [
      {
        id: "6-1",
        icon: "List",
        name: "门户",
        path: "gateway",
        component: "gateway",
      },
    ],
  },
  {
    id: "7",
    icon: "User",
    name: "贷款管理",
    component: "layout",
    path: "/daikuan",
    children: [
      {
        id: "7-1",
        icon: "List",
        name: "借款记录",
        path: "jiekuan",
        component: "jiekuan",
      },
      {
        id: "7-2",
        icon: "List",
        name: "还款记录",
        path: "huankuanji",
        component: "huankuanji",
      },
      {
        id: "7-3",
        icon: "List",
        name: "当月应还",
        path: "dangyue",
        component: "dangyue",
      },
      {
        id: "7-4",
        icon: "List",
        name: "还款管理",
        path: "huankuan",
        component: "huankuan",
      },
      {
        id: "7-5",
        icon: "List",
        name: "提前结清核算",
        path: "huankuan",
        component: "huankuan",
      },
      {
        id: "7-6",
        icon: "List",
        name: "扣款管理",
        path: "huankuan",
        component: "huankuan",
      },
      {
        id: "7-7",
        icon: "List",
        name: "放款审核",
        path: "huankuan",
        component: "huankuan",
      },
    ]
  },
  {
    id: "8",
    icon: "User",
    name: "贷后管理",
    component: "layout",
    path: "/daihouManage",
    children: [
      {
        id: "8-1",
        icon: "List",
        name: "逾期统计",
        path: "yuqitongji",
        component: "yuqitongji",
      },
      {
        id: "8-2",
        icon: "List",
        name: "逾期明细",
        path: "yuqimingxi",
        component: "yuqimingxi",
      },
      {
        id: "8-3",
        icon: "List",
        name: "催收管理",
        path: "cuishou",
        component: "cuishou",
      },
      {
        id: "8-4",
        icon: "List",
        name: "业务对账",
        path: "yewu",
        component: "yewu",
      },
    ],
  },
];

export default menulist;
