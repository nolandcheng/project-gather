/*
 * @Descripttion:
 * @Author:
 * @Date: 2021-05-26 11:09:59
 * @LastEditors: 成永豪
 * @LastEditTime: 2023-06-20 17:30:44
 */
import request from "@/utils/request"

export const test = (params) => {
  return request({
    url: "/api/xxx",
    method: "get",
    params,
  })
}
