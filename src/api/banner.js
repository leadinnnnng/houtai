import request from "@/utils/request";

export function getBannerApi() {
  return request({
    url: "/api/banner",
    method: "get",
  });
}