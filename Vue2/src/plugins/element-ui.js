import Vue from "vue"

import {
  Table,
  Form,
  FormItem,
  Cascader,
  DatePicker,
  Radio,
  Select,
  Button,
  Input,
  Message,
} from "element-ui"

const arr = [Table, Form, FormItem, Cascader, DatePicker, Radio, Select, Button, Input]

arr.forEach((val) => {
  Vue.use(val)
})

Vue.prototype.$message = Message
