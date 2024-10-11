import request from "@/utils/request";

export function roleList(params:any) {
  return request.post(`/api/manage/role/list`,params);
}

export function roleSave(params: any) {
  return request.post(`/api/manage/role/save`, params);
}

export function roleDelete(params: any) {
  return request.post(`/api/manage/role/delete`, params);
}

export function roleMenulist(params:any) {
  return request.get(`/api/manage/role/menu/list?roleId=${params.roleId}`);
}

export function menuAuthSave(params: any) {
  return request.post(`/api/manage/perm/save`, params);
}