import request from "@/utils/request"

export const test = (params) => {
  return request({
    url: "/api/xxx",
    method: "get",
    params,
  })
}
