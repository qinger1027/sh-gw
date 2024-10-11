import request from "@/utils/request";

// 新增文章选中分类
export function categorySelectList(params?: any) {
  return request.get(`/api/manage/cms/category/select/list`);
}
// 后台cms列表
export function cmsList(pageNum: any,pageSize: any,params?: any) {
  return request.post(`/api/manage/cms/brief/list?pageNum=${pageNum}&pageSize=${pageSize}`,params);
}
// 后台分类列表
export function cmscategoryList(params?: any) {
  return request.get(`/api/manage/cms/category/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`);
}
// 后台列表详细
export function cmsDetail(params?: any) {
  return request.get(`/api/manage/cms/detail?cmsId=${params.cmsId}&type=${params.type}`);
}
// 后端创建轮播
export function cmsSlideCreate(params?: any) {
  return request.post(`/api/manage/cms/slide/create`,params);
}
// 后端修改轮播
export function cmsSlideUpdate(params?: any) {
  return request.post(`/api/manage/cms/slide/update`,params);
}
// 后端创建文章
export function cmsArticleCreate(params?: any) {
  return request.post(`/api/manage/cms/article/create`,params);
}
// 后端更新文章
export function cmsArticleUpdate(params?: any) {
  return request.post(`/api/manage/cms/article/update`,params);
}
// 删除文章、轮播
export function cmsDelete(params?: any) {
  return request.delete(`/api/manage/cms/delete?cmsId=${params.cmsId}&type=${params.type}`,{});
}
// 后端创建分类
export function cmscategoryCreate(params?: any) {
  return request.post(`/api/manage/cms/category/create`,params);
}
// 后端更新分类
export function cmscategoryUpdate(params?: any) {
  return request.post(`/api/manage/cms/category/update`,params);
}
// 后台分类详细
export function cmscategoryDetail(params?: any) {
  return request.get(`/api/manage/cms/category/detail/${params.id}`);
}


// 配置
export function configList(params?: any) {
  return request.get(`/api/manage/config/list`);
}
export function configDetail(params?: any) {
  return request.get(`/api/manage/config/detail?id=${params.id}`);
}
// 保存配置信息
export function configSave(params?: any) {
  return request.post(`/api/manage/config/save`,params);
}
// 更新配置信息
export function updateConfig(params?: any) {
  return request.post(`/api/manage/config/update`,params);
}