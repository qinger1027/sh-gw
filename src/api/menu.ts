import request from "@/utils/request";

export function menuList() {
  return request.get(`/api/manage/menu/list`);
}

export function menuSave(params: any) {
  return request.post(`/api/manage/menu/save`, params);
}

// 权限menu
export function UserPermsMenu() {
  return request.get(`/passport/user/getUserPerms`);
}

// 更新菜单
export function menuUpdate(params: any) {
  return request.post(`/api/manage/menu/update`, params);
}