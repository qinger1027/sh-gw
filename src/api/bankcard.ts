import request from "@/utils/request";

// 获取所属银行的列表
export function selectSupportBankCardList(applyNo:any) {
  return request.get(`/api/manage/deal/selectSupportBankCardList/${applyNo}`);
}
// 申请银行卡
export function bindbankCard(applyNo:any,params:any={}) {
  return request.post(`/api/manage/deal/bankCard/bindCard/${applyNo}`, params);
}
// 绑卡短信验证
export function bankCardsmsVerify(applyNo:any,params:any={}) {
  return request.post(`/api/manage/deal/bankCard/sms/verify/${applyNo}`, params);
}
// 已绑卡列表
export function bankCardList(applyNo:any,params:any={}) {
  return request.post(`/api/manage/deal/bankCard/bindlist/${applyNo}`, params);
}
