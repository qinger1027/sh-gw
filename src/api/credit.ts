import request from "@/utils/request";

// 客户授信申请
export function creditApply(params: any) {
  return request.post(`/api/manage/deal/credit/apply/${params.applyNo}`, {});
}
// 授信查询
export function creditResult(params: any) {
  return request.post(`/api/manage/deal/credit/apply/result/${params.applyNo}`, {});
}
// 额度查询
export function getlimitQuery(params: any) {
  return request.post(`/api/manage/deal/limitQuery/${params.applyNo}`, {});
}
// 借款试算
export function getloanTrial(applyNo:any,params: any) {
  return request.post(`/api/manage/deal/loan/loanTrial/${applyNo}`, params);
}