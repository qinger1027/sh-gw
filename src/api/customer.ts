import request from "@/utils/request";

// C端用户列表
export function customerList(params?: any) {
  return request.get(`/api/manage/customer`);
}
// 用户信息保存
export function customerInfoSave(params?: any) {
  return request.post(`/api/manage/customer/info`,params);
}
// 修改工单信息-保存
export function updateApply(params: any) {
  return request.post(`/api/manage/apply/updateApply`, params);
}
