import request from "@/utils/request";

// 下户列表
export function downAccountlist(params: any = {}) {
  return request.post(`/api/manage/apply/downAccount/list`, params);
}

// 下户
export function downAccountOperate(params: any = {}) {
  return request.post(`/api/manage/apply/downAccount`, params);
}
// 下户审核通过
export function downAccountPass(params: any = {}) {
  return request.post(`/api/manage/apply/downAccount/pass`, params);
}
// 下户审核拒绝
export function downAccountReject(params: any = {}) {
  return request.post(`/api/manage/apply/downAccount/rejected`, params);
}
// 店长复核通过
export function storeManagerReviewPass(params: any = {}) {
  return request.post(`/api/manage/apply/storeManager/review/pass`, params);
}
// 店长复核拒绝
export function storeManagerReviewReject(params: any = {}) {
  return request.post(`/api/manage/apply/storeManager/review/rejected`, params);
}
