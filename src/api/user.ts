import request, { instance } from "@/utils/request";

// 登录
export function login(params: any) {
  return instance.post("/passport/user/login", params);
}

export function logout() {
  return request.get("/passport/user/logout");
}
export function userInfo() {
  return request.get("/passport/user/getUserInfo");
}

export function userList(params:any) {
  return request.post(`/api/manage/user/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,{});
}

export function createUser(params:any) {
  return request.post(`/api/manage/user/create`,params);
}
export function userRoleList() {
  return request.get(`/api/manage/user/role/list`);
}

export function userDetail(params:any) {
  return request.get(`/api/manage/user/detail?id=${params.id}`);
}
export function userEditSave(params:any) {
  return request.post(`/api/manage/user/save`,params);
}
export function userDelete(params:any) {
  return request.post(`/api/manage/user/delete`,params);
}
export function editPassword(params:any) {
  return request.put(`/passport/user/password`,params);
}