import request, { baseURL } from "@/utils/request";
// 工单详情
export function queryApplyListSearch(params: any) {
  return request.post(`/api/manage/apply/queryApply`, params);
}

// 工单日志
export function queryApplyChangeLog(pageNum: any, pageSize: any,params?: any) {
  return request.post(`/api/manage/applyChangeLog/queryApplyChangeLog?pageSize=${pageSize}&pageNum=${pageNum}`,params);
}
// 工单分页列表
export function queryApplylist(pageNum: any, pageSize: any, params: any) {
  return request.post(
    `/api/manage/apply/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    params
  );
}
// 申请工单
export function applyOrderSave(params: any) {
  return request.post(`/api/manage/apply/apply`, params);
}

// 获取系统配置上传材料
export function applyGetMaterial() {
  return request.get(`/client/apply/get/material`);
}
// 上传文件
export function uploadFile() {
  return `${baseURL}/api/cos/upload`;
}
// 修改工单状态-通过
export function updateApplyPassStatus(params:any) {
  return request.post(`/api/manage/apply/data/review/pass`,params);
}
// 修改工单状态-拒绝
export function updateApplyRejectStatus(params:any) {
  return request.post(`/api/manage/apply/data/review/rejected`,params);
}
// 根据工单号查询客户信息
export function applyNoInfoDetail(params?:any) {
  return request.get(`/api/manage/customer/info/apply-no/${params.applyNo}`);
}
// 更新客户信息
export function updateApplyInfo(params?:any) {
  return request.put(`/api/manage/customer/info/${params.id}`,params);
}
// 准入接口查询
export function getApplyResult(params:any) {
  return request.post(`/api/manage/apply/allow/apply/result`,params);
}