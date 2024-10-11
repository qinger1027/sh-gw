import request from "@/utils/request";

export function storeList(pageNum:any,pageSize:any,params:any) {
  return request.post(`/api/manage/store/list?pageNum=${pageNum}&pageSize=${pageSize}`,params);
}

export function storeSave(params: any) {
  return request.post(`/api/manage/store/save`, params);
}
export function storeDelete(params: any) {
  return request.post(`/api/manage/store/delete`, { id: params.id });
}
export function allCity() {
  return request.get(`/api/special/region/allCity`);
}
export function getAreas(bizId: number) {
  return request.get(`/api/special/region/item/${bizId}`);
}
export function storelistByType(type: any) {
  return request.get(`/api/manage/store/listByType?type=${type}`);
}
export function userStorelist() {
  return request.get(`/api/manage/user/store/list`);
}
// 获取门店保证金相关
export function storegetAmountInfo(id?:any) {
  return request.get(`/api/manage/store/getAmount?id=${id}`);
}
// 门店保证金充值
export function storerechargeAmount(params: any) {
  return request.post(`/api/manage/store/rechargeAmount`, params);
}
// 工单列表-筛选门店
export function storeFiltration() {
  return request.get(`/api/manage/store/filtration`);
}