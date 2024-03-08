<!-- 统一封装-通用表单-基础输入框 -->
<template>
  <el-input
    v-model="inputValue"
    :placeholder="`${itemProps.label}`"
    :disabled="itemProps.disabled"
  ></el-input>
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
      default: "",
    },
  },
  computed: {
    inputValue: {
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
