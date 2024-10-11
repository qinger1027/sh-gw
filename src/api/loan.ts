import request from "@/utils/request";
// 预借款申请
export function preloanApply(applyNo: any, params: any = {}) {
  return request.post(`/api/manage/deal/pre/loan/apply/${applyNo}`, params);
}
// 借款申请
export function loanApply(applyNo: any, params: any = {}) {
  return request.post(`/api/manage/deal/loan/apply/${applyNo}`, params);
}
