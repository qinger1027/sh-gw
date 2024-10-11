import request from "@/utils/request";

// 投保用户列表
export function loanInfoLIST(params?: any) {
  return request.post(`/api/manage/loan/info/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,{});
}