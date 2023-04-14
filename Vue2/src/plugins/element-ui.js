/*
 * @Descripttion: element-ui
 * @Author: Cheng
 * @Date: 2020-08-17 00:17:06
 * @LastEditors: Cheng
 * @LastEditTime: 2020-10-28 23:36:14
 */
import Vue from 'vue'

import {
  Button, Input, ColorPicker
} from 'element-ui'

const arr = [
  Button, Input, ColorPicker
]

arr.forEach(val => {
  Vue.use(val)
})