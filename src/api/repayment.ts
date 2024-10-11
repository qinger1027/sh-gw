import request from "@/utils/request";
// 还款计划
export function repaymentPlan(applyNo: any, params: any = {}) {
  return request.post(`/api/manage/deal/repayment/plan/${applyNo}`, params);
}
// 还款试算
export function repaymentCalculater(applyNo: any, params: any = {}) {
  return request.post(
    `/api/manage/deal/repayment/calculater/${applyNo}`,
    params
  );
}
// 主动还款
export function proactiveRepayment(applyNo: any, params: any = {}) {
  return request.post(
    `/api/manage/deal/proactive/repayment/${applyNo}`,
    params
  );
}
// 主动还款失败原因
export function repaymentReason(applyNo: any, stage: any, params: any = {}) {
  return request.post(
    `/api/manage/deal/repayment/reason/${applyNo}/${stage}`,
    params
  );
}
