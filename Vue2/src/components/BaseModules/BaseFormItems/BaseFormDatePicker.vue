<!-- 统一封装-通用型表单-基础日期选择框 -->
<template>
  <el-date-picker
    v-model="dateValue"
    type="date"
    placeholder="请选择日期"
    :style="{ width: '100%' }"
  >
  </el-date-picker>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    // 表单项参数
    itemProps: {
      type: Object,
      return: () => {},
    },
    // 表单项数据
    value: {
      // type: Date,
      // default: "",
    },
  },
  computed: {
    dateValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
}
</script>
