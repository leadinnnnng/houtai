import request from "@/utils/request";

// 查看文章分类
export function getBlogType() {
  return request.get("/api/blogtype");
}
// 添加一个文章分类
export function addOneBlogType(data) {
  return request({
    url: "/api/blogtype",
    method: "post",
    data,
  });
}
//   删除一个文章分类
export function delOneQBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: "delete",
  });
}
// 查找某一个文章分类
export function findOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: "get",
  });
}

//   修改文章分类
export function updateOneBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: "put",
    data: editInfo.data,
  });
}
