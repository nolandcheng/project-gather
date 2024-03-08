<!-- 统一封装-通用型表单-基础下拉框 -->
<template>
  <el-select
    v-model="selectValue"
    :placeholder="`${itemProps.label}`"
    :style="{ width: '100%' }"
    clearable
    :multiple="itemProps.multiple"
    :disabled="itemProps.disabled"
  >
    <el-option
      v-for="(item, index) of itemProps.list"
      :key="index"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
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
    selectValue: {
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
