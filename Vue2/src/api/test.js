/*
 * @Descripttion:
 * @Author:
 * @Date: 2021-05-26 11:09:59
 * @LastEditors: Cheng
 * @LastEditTime: 2021-05-26 11:10:13
 */
import request from '@/utils/request'
// import qs from 'qs'

//
export const test = params => {
  return request({
    url: '/api/xxx',
    method: 'get',
    params
  })
}