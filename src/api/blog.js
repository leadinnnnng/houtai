import request from "@/utils/request";

export function getBlog(page = 1, limit = 10) {
  return request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

export function delOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "delete",
  });
}
