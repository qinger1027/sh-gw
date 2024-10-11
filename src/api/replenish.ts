import request from "@/utils/request";
// 是否需要补录
export function replenishDetailList(params: any = {}) {
  return request.post(`/api/manage/apply/replenish/detail/List`, params);
}
// 补录列表
export function replenishList(params: any = {}) {
  return request.post(`/api/manage/deal/replenish/detail/List`, params);
}
// 补录-发送短信验证码
export function replenishsmsSendverify(applyNo: String, params: any = {}) {
  return request.post(`/api/manage/deal/replenish/sms/send/${applyNo}`, params);
}
// 补录-短信校验补录提交
export function replenishsmsSend(applyNo: String, params: any = {}) {
  return request.post(`/api/manage/deal/replenish/sms/verify/${applyNo}`, params);
}
// 补录-活体补录提交
export function replenishFaceCheck(applyNo: String, params: any = {}) {
  return request.post(`/api/manage/deal/replenish/faceCheck/${applyNo}`, params);
}
// 补录-待签署协议列表
export function replenishAgreementList(busiType: String, applyNo: String, params: any = {}) {
  return request.post(`/api/manage/deal/replenish/agreement/list/${busiType}/${applyNo}`, params);
}
// 补录-通用征信授权协议补录提交
export function replenishAgreementCredit(applyNo: String, params: any = {}) {
  return request.post(`/api/manage/deal/replenish/agreementCommon/${applyNo}`, params);
}
// 补录-借款协议补录提交
export function replenishAgreementLoan(applyNo: String, params: any = {}) {
  return request.post(`/api/manage/deal/replenish/agreementLoan/${applyNo}`, params);
}
