<!-- 统一封装-通用型表单-基础单选框 -->
<template>
  <el-radio-group v-model="radioValue">
    <el-radio v-for="(item, index) of itemProps.list" :key="index" :label="item.value">{{
      item.label
    }}</el-radio>
  </el-radio-group>
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
    value: {},
  },
  computed: {
    radioValue: {
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
