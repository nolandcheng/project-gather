/*
 * @Descripttion: ant-design
 * @Author: Cheng
 * @Date: 2020-08-17 23:51:03
 * @LastEditors: Cheng
 * @LastEditTime: 2020-10-22 01:35:18
 */
import Vue from 'vue'

import {
  Message, 
  Switch, 
  Dropdown, 
  Menu, 
  Modal, 
  Radio, 
  Checkbox, 
  Divider, 
  Table, 
  Button, 
  Spin, 
  Input, 
  Card, 
  Select, 
  Icon, 
  ConfigProvider,
  FormModel,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Tree,
  TreeSelect,
  Pagination,
  Rate,
  Empty,
} from 'ant-design-vue'

const arr = [
  Switch, 
  Dropdown, 
  Menu, 
  Modal, 
  Radio, 
  Checkbox, 
  Divider, 
  Table, 
  Button, 
  Spin, 
  Input, 
  Card, 
  Select, 
  Icon, 
  ConfigProvider,
  FormModel,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Tree,
  TreeSelect,
  Pagination,
  Rate,
  Empty
]

arr.forEach(val => {
  Vue.use(val)
})
Message.config({
  duration: 1.5,
  maxCount: 3,
})
Vue.prototype.$message = Message;
Vue.prototype.$info = Modal.info
Vue.prototype.$confirm = Modal.confirm
