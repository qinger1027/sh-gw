import request from "@/utils/request";

// 获取签署文件列表
export function selectAgreenmentList(busiType:any,applyNo:any,params: any={}) {
  return request.post(`/api/manage/deal/selectAgreenmentList/${busiType}/${applyNo}`, params);
}